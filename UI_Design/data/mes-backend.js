window.MES_BACKEND = (() => {
  const STORAGE_KEY = "xingjigu_mes_backend_v1";

  function clone(value) {
    return structuredClone(value);
  }

  function now() {
    return new Date().toLocaleString("zh-CN", { hour12: false });
  }

  function readFlowOrders() {
    return clone(window.MES_BUSINESS_FLOW?.read?.().orders || window.MES_MASTER_DATA?.orders || []);
  }

  function materialBatch(materialNo) {
    const batches = {
      "MAT-SEN-T100": "SEN-L20260605",
      "MAT-PWR-IC60": "PWRIC-L20260602",
      "MAT-PCB-TCU": "PCB-L20260608",
      "MAT-CASE-TOP": "CASE-TOP-L20260612",
      "MAT-CASE-BOT": "CASE-BOT-L20260612",
      "MAT-DISPLAY-24": "DSP-L20260610",
      "MAT-BOX-A": "BOXA-L20260614",
      "MAT-RES-10K": "RES10K-L20260609",
      "MAT-BOX-B": "BOXB-L20260614",
    };
    return batches[materialNo] || `${String(materialNo || "MAT").replace("MAT-", "")}-L202606`;
  }

  function defaultInventory(orders) {
    const rows = {};
    orders.forEach((order) => {
      const materials = window.MES_MASTER_DATA?.getBomMaterials?.(order.productCode || order.product, order.qty) || [];
      materials.forEach((item) => {
        if (rows[item.materialNo]) return;
        const frozen = item.eta?.includes("MRB") || item.substitute?.includes("待审批") ? Math.max(0, item.available - Math.floor(item.available * 0.82)) : 0;
        rows[item.materialNo] = {
          materialNo: item.materialNo,
          material: item.name,
          batch: materialBatch(item.materialNo),
          total: item.available + item.transit + frozen,
          available: item.available,
          allocated: 0,
          locked: 0,
          frozen,
          pendingIqc: item.eta?.includes("IQC") ? item.transit : 0,
          rejected: 0,
          transit: item.transit || 0,
          lineSide: 0,
          safety: Math.ceil((item.need || order.qty) * 0.05),
          eta: item.eta || "库存可用",
          qualityStatus: frozen > 0 ? "冻结待 MRB" : "IQC 合格",
          substitute: item.substitute || "无",
        };
      });
    });
    return rows;
  }

  function initialState() {
    const orders = readFlowOrders();
    return {
      version: 1,
      orders,
      inventory: defaultInventory(orders),
      reservations: {},
      kitChecks: {},
      shortageExceptions: {},
      approvals: {},
      auditLogs: [],
    };
  }

  function hydrate(state) {
    const flowOrders = readFlowOrders();
    state.orders = flowOrders;
    state.inventory ||= {};
    state.reservations ||= {};
    state.kitChecks ||= {};
    state.shortageExceptions ||= {};
    state.approvals ||= {};
    state.auditLogs ||= [];
    const defaults = defaultInventory(flowOrders);
    Object.entries(defaults).forEach(([materialNo, row]) => {
      state.inventory[materialNo] = { ...row, ...(state.inventory[materialNo] || {}) };
    });
    flowOrders.forEach((order) => runKitCheck(state, order.id, { persist: false, audit: false }));
    return state;
  }

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return hydrate(saved || initialState());
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return hydrate(initialState());
    }
  }

  function write(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("mes-backend:changed", { detail: state }));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    const state = hydrate(initialState());
    write(state);
    return state;
  }

  function addAudit(state, orderId, action, result, owner = "物料员 吴琳", refs = []) {
    state.auditLogs = [{
      id: `AUD-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      action,
      owner,
      result,
      refs,
      time: now(),
    }, ...state.auditLogs].slice(0, 200);
  }

  function orderById(state, orderId) {
    return state.orders.find((order) => order.id === orderId);
  }

  function productCodeOf(order) {
    return order.productCode || window.MES_MASTER_DATA?.products?.find((item) => order.product?.includes(item.code))?.code || order.product;
  }

  function shortageHint(order) {
    const match = `${order.kit} ${order.materialGap}`.match(/缺\s*(\d+)/);
    if (match) return Number(match[1]);
    if (order.risk === "缺料") return Math.max(80, Math.round(order.qty * 0.18));
    return 0;
  }

  function processOf(order, item) {
    const text = `${item.materialNo || ""} ${item.name || ""}`;
    if (/PCB|电阻|驱动芯片|DRV|SMT/.test(text)) return { operation: "10 SMT 贴片", station: order.line === "Line-B" ? "SMT-B-01" : "SMT-WS-01" };
    if (/传感器|电源芯片|PWR|SEN/.test(text)) return { operation: "20 DIP 插件", station: order.line === "Line-B" ? "DIP-B-01" : "DIP-A-02" };
    if (/显示屏|外壳|螺丝|CASE|DISPLAY|SCREW/.test(text)) return { operation: "40 整机装配", station: order.line === "Line-C" ? "ASM-C-01" : order.line === "Line-B" ? "ASM-B-01" : "ASM-A-01" };
    if (/包装|BOX/.test(text)) return { operation: "80 包装", station: order.line === "Line-C" ? "PACK-C-02" : "PACK-A-01" };
    return { operation: "20 DIP 插件", station: order.line === "Line-B" ? "DIP-B-01" : "DIP-A-02" };
  }

  function expandBom(state, order) {
    const materials = window.MES_MASTER_DATA?.getBomMaterials?.(productCodeOf(order), order.qty) || [];
    const hintedShortage = shortageHint(order);
    return materials.map((line) => {
      const inventory = state.inventory[line.materialNo] || {};
      const reservation = state.reservations[order.id]?.[line.materialNo] || 0;
      const shortageTarget = hintedShortage && `${order.materialGap || ""}`.includes(line.name) ? hintedShortage : 0;
      const usable = Math.max(0, (inventory.available ?? line.available ?? 0) - (inventory.allocated || 0) - (inventory.locked || 0) - (inventory.safety || 0));
      const available = Math.max(0, Math.min(usable + reservation, line.need - shortageTarget));
      const transit = inventory.transit ?? line.transit ?? 0;
      const gap = Math.max(0, line.need - available - transit);
      const process = processOf(order, line);
      const qualityGate = inventory.qualityStatus || (gap > 0 ? "IQC 合格批不足" : "IQC 合格");
      const hasApprovalGap = (line.substitute || inventory.substitute || "").includes("待审批") || qualityGate.includes("MRB");
      return {
        ...line,
        source: "PLM BOM + WMS 库存 + QMS IQC",
        available,
        transit,
        gap,
        locked: reservation,
        batch: inventory.batch || materialBatch(line.materialNo),
        qualityGate,
        substitute: inventory.substitute || line.substitute || "无",
        operation: line.operation || process.operation,
        station: line.station || process.station,
        unit: line.unit || "PCS",
        batchControl: line.batchControl || "批次必扫",
        antiError: line.antiError || "料号 + 批次 + IQC + 线边库位校验",
        materialStatus: hasApprovalGap ? "冻结待放行" : gap > 0 ? "缺口待处理" : transit > 0 ? "在途待签收" : reservation > 0 ? "已锁库" : "可投批次",
        ownerAction: hasApprovalGap ? "质量 + 物料：MRB / 替代料审批" : gap > 0 ? "采购催料 / 物料拆批 / 计划调整" : transit > 0 ? "WMS 到货签收后复核齐套" : "物料员锁库并转领料申请",
        impact: gap > 0 ? `首批 ${Math.max(0, Math.min(order.qty, available))} 台可放行，余量待补料` : "可生成领料申请",
        statusTime: now(),
      };
    });
  }

  function statusOf(order, materials) {
    const gap = materials.reduce((sum, item) => sum + item.gap, 0);
    const waitingApproval = materials.some((item) => item.materialStatus === "冻结待放行");
    if (gap > 0) return waitingApproval ? "待替代" : "缺料";
    if (order.kit === "齐套" || materials.every((item) => item.locked > 0 || item.available >= item.need)) return "齐套";
    return "待检查";
  }

  function runKitCheck(state, orderId, options = {}) {
    const order = orderById(state, orderId);
    if (!order) return null;
    const materials = expandBom(state, order);
    const gap = materials.reduce((sum, item) => sum + item.gap, 0);
    const status = statusOf(order, materials);
    const record = {
      id: `KIT-${order.id}`,
      orderId: order.id,
      status,
      stage: "排程前齐套初判",
      owner: gap > 0 ? "物料员 吴琳" : "计划员 周计划",
      materials,
      gap,
      result: gap > 0 ? "阻止直接排程，需拆批/补料/替代审批" : "允许进入排程候选池，排程后需锁库复核",
      checkedAt: now(),
    };
    state.kitChecks[order.id] = record;
    if (gap > 0) {
      state.shortageExceptions[order.id] = {
        id: `EX-SHORT-${order.id.slice(-4)}`,
        orderId: order.id,
        type: "缺料异常",
        status: "待处理",
        owner: "物料异常协调员 何敏",
        sla: "4 小时内给出补料或拆批结论",
        impact: record.result,
        createdAt: now(),
      };
    }
    if (options.audit) addAudit(state, order.id, "执行齐套检查", record.result, options.owner || record.owner, [record.id]);
    if (options.persist) write(state);
    return record;
  }

  function lockInventory(orderId, owner = "物料员 吴琳") {
    const state = read();
    const record = runKitCheck(state, orderId, { persist: false });
    if (!record) return null;
    state.reservations[orderId] ||= {};
    record.materials.forEach((item) => {
      const lockQty = Math.max(0, Math.min(item.need, item.available));
      state.reservations[orderId][item.materialNo] = lockQty;
      state.inventory[item.materialNo].locked = (state.inventory[item.materialNo].locked || 0) + lockQty;
    });
    const nextRecord = runKitCheck(state, orderId, { persist: false });
    addAudit(state, orderId, "锁定库存", "已生成 WMS 锁库请求，等待出库/线边签收回执", owner, [nextRecord.id]);
    write(state);
    return nextRecord;
  }

  function confirmKit(orderId, owner = "物料员 吴琳") {
    const state = read();
    const order = orderById(state, orderId);
    if (!order) return null;
    const record = runKitCheck(state, orderId, { persist: false });
    if (record.gap > 0) {
      addAudit(state, orderId, "确认齐套被拦截", "仍存在缺口，需补料、拆批或替代审批", owner, [record.id]);
      write(state);
      return record;
    }
    order.kit = "齐套";
    order.materialGap = "齐套";
    if (order.risk === "缺料") order.risk = "正常";
    record.status = "齐套";
    record.result = "允许进入排程候选池，排程后执行锁库复核";
    state.kitChecks[orderId] = record;
    window.MES_BUSINESS_FLOW?.upsertOrder?.(order, { action: "齐套检查确认" });
    addAudit(state, orderId, "确认齐套", record.result, owner, [record.id]);
    write(state);
    return record;
  }

  function approveSubstitute(orderId, owner = "质量员 孟可") {
    const state = read();
    const record = runKitCheck(state, orderId, { persist: false });
    if (!record) return null;
    record.materials.filter((item) => item.substitute && item.substitute !== "无").forEach((item) => {
      state.approvals[`${orderId}:${item.materialNo}`] = {
        id: `SUB-${orderId.slice(-4)}-${item.materialNo}`,
        orderId,
        materialNo: item.materialNo,
        status: "已批准",
        owner,
        scope: "仅限当前工单与当前生产批次",
        traceRule: "替代料批次需进入成品 SN 追溯",
        approvedAt: now(),
      };
      state.inventory[item.materialNo].qualityStatus = "替代料已批准";
      state.inventory[item.materialNo].frozen = 0;
      state.inventory[item.materialNo].available += item.gap;
    });
    const nextRecord = runKitCheck(state, orderId, { persist: false });
    addAudit(state, orderId, "替代料审批", "替代料已批准并重新计算齐套结果", owner, [nextRecord.id]);
    write(state);
    return nextRecord;
  }

  function splitBatch(orderId, owner = "计划员 周计划") {
    const state = read();
    const order = orderById(state, orderId);
    const record = runKitCheck(state, orderId, { persist: false });
    if (!order || !record) return null;
    const readyQty = record.materials.reduce((min, item) => Math.min(min, item.available + item.transit), order.qty);
    order.batchPlan = `${readyQty} + ${Math.max(0, order.qty - readyQty)}`;
    order.schedule = "待调整";
    window.MES_BUSINESS_FLOW?.upsertOrder?.(order, { action: "齐套拆批建议" });
    addAudit(state, orderId, "拆批建议", `首批 ${readyQty} 台进入排程候选，剩余等待补料`, owner, [record.id]);
    write(state);
    return record;
  }

  function escalateShortage(orderId, owner = "物料异常协调员 何敏") {
    const state = read();
    const record = runKitCheck(state, orderId, { persist: false });
    if (!record) return null;
    state.shortageExceptions[orderId] = {
      ...(state.shortageExceptions[orderId] || {}),
      id: `EX-SHORT-${orderId.slice(-4)}`,
      orderId,
      type: "缺料异常",
      status: "已升级",
      owner,
      sla: "4 小时内给出补料或拆批结论",
      impact: record.result,
      updatedAt: now(),
    };
    addAudit(state, orderId, "缺料升级", "已生成缺料异常并通知采购/物料/计划", owner, [state.shortageExceptions[orderId].id]);
    write(state);
    return record;
  }

  function releaseSchedule(orderId, owner = "计划员 周计划") {
    const state = read();
    const order = orderById(state, orderId);
    const record = runKitCheck(state, orderId, { persist: false });
    if (!order || !record) return null;
    if (record.gap > 0) {
      addAudit(state, orderId, "排程放行被拦截", "齐套缺口未关闭，不允许直接排程锁定", owner, [record.id]);
      write(state);
      return record;
    }
    order.schedule = "待排程";
    window.MES_BUSINESS_FLOW?.upsertOrder?.(order, { action: "齐套放行排程" });
    addAudit(state, orderId, "放行排程", "齐套初判通过，进入 APS 排程候选池", owner, [record.id]);
    write(state);
    return record;
  }

  function logs(orderId) {
    return read().auditLogs.filter((item) => !orderId || item.orderId === orderId);
  }

  return { read, write, reset, runKitCheck, lockInventory, confirmKit, approveSubstitute, splitBatch, escalateShortage, releaseSchedule, logs };
})();
