window.MES_BUSINESS_FLOW = (() => {
  const STORAGE_KEY = "xingjigu_mes_business_flow_v1";

  function clone(value) {
    return structuredClone(value);
  }

  function initialState() {
    const master = window.MES_MASTER_DATA || {};
    const orders = clone(master.orders || []);
    const state = {
      orders,
      reviews: {},
      schedules: {},
      kitChecks: {},
      dispatches: {},
      materialRequirements: {},
      materialRequests: {},
      barcodeBatches: {},
      barcodeEvents: [],
      stationEvents: [],
      processEvents: [],
      qualityEvents: [],
      exceptionEvents: [],
      equipmentEvents: [],
      completionEvents: [],
      traceQueryEvents: [],
      reportEvents: [],
      governanceEvents: [],
      exceptions: {},
      masterDataChanges: [],
      traceEvents: {},
      logs: [],
      version: 1,
    };
    orders.forEach((order) => ensureFlowForOrder(state, order, "基础资料生成初始业务链路"));
    return state;
  }

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      const state = saved || initialState();
      const masterOrders = window.MES_MASTER_DATA?.orders || [];
      masterOrders.forEach((order) => {
        if (!state.orders.some((item) => item.id === order.id)) state.orders.push(clone(order));
      });
      hydrateState(state);
      return state;
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return initialState();
    }
  }

  function write(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("mes-flow:changed", { detail: state }));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    const state = initialState();
    write(state);
    return state;
  }

  function nextOrderId(state) {
    const max = state.orders.reduce((value, order) => {
      const match = String(order.id).match(/MO-202606-(\d+)/);
      return match ? Math.max(value, Number(match[1])) : value;
    }, 0);
    return `MO-202606-${String(max + 1).padStart(4, "0")}`;
  }

  function productCodeOf(order) {
    if (order.productCode) return order.productCode;
    const product = window.MES_MASTER_DATA?.products?.find((item) => order.product?.includes(item.code));
    return product?.code || String(order.product || "").split(" ").at(-1) || "";
  }

  function addLog(state, orderId, stage, action, owner, result, refs = []) {
    state.logs = [{
      id: `FLOW-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      stage,
      action,
      owner,
      result,
      refs,
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    }, ...(state.logs || [])].slice(0, 160);
  }

  function hydrateState(state) {
    state.orders ||= [];
    state.reviews ||= {};
    state.schedules ||= {};
    state.kitChecks ||= {};
    state.dispatches ||= {};
    state.materialRequirements ||= {};
    state.materialRequests ||= {};
    state.barcodeBatches ||= {};
    state.barcodeEvents ||= [];
    state.stationEvents ||= [];
    state.processEvents ||= [];
    state.qualityEvents ||= [];
    state.exceptionEvents ||= [];
    state.equipmentEvents ||= [];
    state.completionEvents ||= [];
    state.traceQueryEvents ||= [];
    state.reportEvents ||= [];
    state.governanceEvents ||= [];
    state.exceptions ||= {};
    state.masterDataChanges ||= [];
    state.traceEvents ||= {};
    state.logs ||= [];
    state.orders.forEach((order) => {
      if (!state.reviews[order.id] || !state.schedules[order.id] || !state.kitChecks[order.id] || !state.dispatches[order.id] || !state.materialRequirements[order.id]) {
        ensureFlowForOrder(state, order, "补齐统一业务链路");
      }
    });
  }

  function ensureFlowForOrder(state, order, trigger = "订单进入 MES") {
    const productCode = productCodeOf(order);
    const product = window.MES_MASTER_DATA?.productByCode?.(productCode);
    const bom = window.MES_MASTER_DATA?.bomByProduct?.(productCode);
    const routing = window.MES_MASTER_DATA?.routingByProduct?.(productCode);
    const materials = window.MES_MASTER_DATA?.getBomMaterials?.(productCode, order.qty) || [];
    const hasDataIssue = [product?.status, bom?.status, routing?.status].some((status) => status && status !== "已发布");
    const hasMaterialGap = materials.some((item) => item.gap > 0);

    const previousReview = state.reviews[order.id];
    const previousSchedule = state.schedules[order.id];
    const previousDispatch = state.dispatches[order.id];
    const previousKit = state.kitChecks[order.id];

    state.reviews[order.id] = {
      ...previousReview,
      orderId: order.id,
      status: previousReview?.status && previousReview.status !== "待补资料" ? previousReview.status : hasDataIssue ? "待补资料" : "待评审",
      gates: [
        { key: "product", label: "产品主数据", ref: product?.id || productCode, status: product?.status === "已发布" ? "通过" : "待补资料" },
        { key: "bom", label: "制造 BOM", ref: bom?.id || "待关联 BOM", status: bom?.status === "已发布" ? "通过" : "待补资料" },
        { key: "routing", label: "工艺路线", ref: routing?.id || "待关联路线", status: routing?.status === "已发布" ? "通过" : "待补资料" },
        { key: "quality", label: "检验规范", ref: product?.inspection || "待配置", status: product?.inspection?.includes("待") ? "待质量确认" : "通过" },
        { key: "label", label: "标签规则", ref: product?.labelTemplate || "待配置", status: product?.labelTemplate ? "通过" : "待补资料" },
      ],
    };
    state.schedules[order.id] = {
      ...previousSchedule,
      orderId: order.id,
      status: previousSchedule?.status && previousSchedule.status !== "等待评审" ? previousSchedule.status : order.review === "已通过" ? "待排程" : "等待评审",
      batchPlan: hasMaterialGap ? `${Math.max(0, order.qty - materials.reduce((sum, item) => sum + item.gap, 0))} + 缺口` : `${order.qty}`,
      route: routing?.steps || "待工艺路线",
      line: order.line,
      window: "待 APS 计算",
    };
    state.kitChecks[order.id] = {
      ...previousKit,
      orderId: order.id,
      status: previousKit?.status === "齐套已确认" ? previousKit.status : hasMaterialGap ? "缺口待处理" : "齐套待复核",
      materials,
      gap: materials.reduce((sum, item) => sum + item.gap, 0),
      result: hasMaterialGap ? "生成缺料事实，阻止直接开工" : "物料口径满足排程初判",
    };
    state.dispatches[order.id] = {
      ...previousDispatch,
      orderId: order.id,
      status: previousDispatch?.status || "等待排程发布",
      route: routing?.steps || "",
      tasks: [],
    };
    state.materialRequirements[order.id] = materials.map((item, index) => ({
      id: `MR-${order.id.slice(-4)}-${String(index + 1).padStart(2, "0")}`,
      order: order.id,
      materialNo: item.materialNo,
      material: item.name,
      need: item.need,
      available: item.available,
      gap: item.gap,
      status: item.gap > 0 ? "缺口待处理" : "可锁库",
    }));
    state.barcodeBatches[order.id] = {
      id: `LOT-${productCode}-${order.id.slice(-4)}`,
      orderId: order.id,
      status: "等待派工发布",
      productCode,
      labelTemplate: product?.labelTemplate || "待配置",
    };
    if (hasMaterialGap) {
      state.exceptions[order.id] = {
        id: `EX-SHORT-${order.id.slice(-4)}`,
        type: "缺料异常",
        status: "待处理",
        impact: order.materialGap || "BOM 物料缺口",
      };
    }
    addLog(state, order.id, "订单接收", trigger, order.planner || "计划员", "已生成评审、排程、齐套、派工准备和追溯占位", [product?.id, bom?.id, routing?.id].filter(Boolean));
  }

  function upsertOrder(order, meta = {}) {
    const state = read();
    const existingIndex = state.orders.findIndex((item) => item.id === order.id);
    const normalized = { ...order, productCode: order.productCode || productCodeOf(order) };
    if (existingIndex >= 0) state.orders[existingIndex] = { ...state.orders[existingIndex], ...normalized };
    else state.orders.unshift(normalized);
    ensureFlowForOrder(state, normalized, meta.action || (existingIndex >= 0 ? "订单变更" : "ERP/MES 新增订单"));
    write(state);
    return normalized;
  }

  function copyOrder(sourceId, owner = "周计划") {
    const state = read();
    const source = state.orders.find((item) => item.id === sourceId);
    if (!source) return null;
    const id = nextOrderId(state);
    const order = {
      ...clone(source),
      id,
      done: 0,
      status: "待评审",
      review: "待评审",
      schedule: "未排程",
      planner: owner,
      batchPlan: "未拆批",
      materialGap: "复制订单，待重新校验",
    };
    state.orders.unshift(order);
    ensureFlowForOrder(state, order, `复制 ${sourceId} 生成新工单`);
    addLog(state, id, "订单复制", "复制订单", owner, `已从 ${sourceId} 复制并进入主数据校验`, [sourceId]);
    write(state);
    return order;
  }

  function applyAction(orderId, action, payload = {}) {
    const state = read();
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    if (action === "submitReview") {
      order.status = "待评审";
      order.review = "待评审";
      state.reviews[orderId] = { ...(state.reviews[orderId] || {}), orderId, status: "评审中" };
      addLog(state, orderId, "订单评审", "提交评审", payload.owner || order.planner, "已进入订单评审，不跳过主数据、BOM、工艺、质量和齐套校验");
    }
    if (action === "approveReview") {
      order.status = "待排程";
      order.review = "已通过";
      state.reviews[orderId] = { ...(state.reviews[orderId] || {}), orderId, status: "已通过" };
      state.schedules[orderId] = { ...(state.schedules[orderId] || {}), orderId, status: "待排程" };
      addLog(state, orderId, "订单评审", "评审通过", payload.owner || order.planner, "已推送 APS 排程池");
    }
    if (action === "publishPlan") {
      order.status = "已排程";
      order.schedule = "已确认";
      state.schedules[orderId] = { ...(state.schedules[orderId] || {}), orderId, status: "已发布", window: payload.window || "06-20 08:00-06-23 18:00" };
      state.dispatches[orderId] = { ...(state.dispatches[orderId] || {}), orderId, status: "派工准备", route: state.schedules[orderId].route };
      state.barcodeBatches[orderId] = { ...(state.barcodeBatches[orderId] || {}), orderId, status: "等待派工下发" };
      addLog(state, orderId, "生产排程", "发布排程", payload.owner || order.planner, "已生成派工准备、批次编码和物料需求");
    }
    if (action === "confirmKit") {
      order.kit = "齐套";
      order.materialGap = "齐套";
      if (order.risk === "缺料") order.risk = "正常";
      state.kitChecks[orderId] = { ...(state.kitChecks[orderId] || {}), orderId, status: "齐套已确认", gap: 0, result: "允许进入开工检查" };
      addLog(state, orderId, "齐套检查", "确认齐套", payload.owner || order.planner, "已放行到开工检查，现场仍需扫码准入");
    }
    write(state);
    return order;
  }

  function applyMasterDataAction(area, row, action, payload = {}) {
    const state = read();
    const record = {
      id: `MD-${Date.now()}`,
      area,
      ref: row?.id || payload.ref || "主数据",
      name: row?.name || payload.name || "",
      action,
      status: payload.status || row?.status || "待审批",
      owner: payload.owner || row?.owner || "主数据管理员",
      impact: payload.impact || row?.risk || "待评估下游订单、BOM、工艺、标签和追溯影响",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.masterDataChanges = [record, ...(state.masterDataChanges || [])].slice(0, 120);
    const affected = state.orders.filter((order) => {
      const productCode = productCodeOf(order);
      return [row?.id, row?.name, row?.scope, row?.ref].some((value) => value && String(value).includes(productCode));
    });
    affected.forEach((order) => {
      ensureFlowForOrder(state, order, `${record.ref} ${action}`);
      addLog(state, order.id, "主数据校验", action, record.owner, `${record.ref} 已变更，重新计算订单准入`, [record.ref]);
    });
    write(state);
    return record;
  }

  function buildDispatchTasks(order, schedule) {
    const steps = String(schedule?.route || "SMT>DIP>测试>FQC>包装").split(">").filter(Boolean);
    return steps.map((step, index) => ({
      id: `D-${order.id.slice(-4)}-${String(index + 1).padStart(2, "0")}`,
      orderId: order.id,
      operation: step,
      qty: order.qty,
      status: "待接单",
      station: order.line,
      source: "排程发布生成",
    }));
  }

  function flowStatusToDispatchStatus(dispatchStatus, index) {
    if (dispatchStatus === "已下达") return index === 0 ? "待接单" : "待下达";
    if (dispatchStatus === "已挂起") return "异常锁定";
    if (dispatchStatus === "派工准备") return "待下达";
    return "待下达";
  }

  function parsePlanWindow(windowText) {
    const text = String(windowText || "待 APS 计算");
    const parts = text.match(/^(.+?)\s*-\s*(\d{2}-\d{2}\s+\d{2}:\d{2}|.+)$/);
    return parts ? [parts[1], parts[2]] : [text, text];
  }

  function getDispatchRows() {
    const state = read();
    return state.orders.flatMap((order) => {
      const schedule = state.schedules[order.id] || {};
      const dispatch = state.dispatches[order.id] || {};
      const tasks = dispatch.tasks?.length ? dispatch.tasks : buildDispatchTasks(order, schedule);
      const routeSteps = String(schedule.route || dispatch.route || "").split(">").filter(Boolean);
      const [planStart, planEnd] = parsePlanWindow(schedule.window);
      return tasks.map((task, index) => ({
        id: task.id || `D-${order.id.slice(-4)}-${String(index + 1).padStart(2, "0")}`,
        orderId: order.id,
        product: order.product,
        customer: order.customer,
        operation: task.operation || routeSteps[index] || "工序任务",
        seq: String((index + 1) * 10),
        qty: task.qty || order.qty,
        done: index === 0 ? order.done || 0 : 0,
        line: order.line,
        workstation: task.station || order.line || "待分配工位",
        equipment: task.equipment || "按工艺路线匹配",
        team: task.team || `${String(order.line || "Line").replace("Line-", "") || "A"}1 班`,
        operator: task.operator || "待接单",
        planStart,
        planEnd,
        status: task.status || flowStatusToDispatchStatus(dispatch.status, index),
        priority: order.priority,
        mode: "推式",
        sop: `SOP-${productCodeOf(order) || "MES"}-${index + 1}`,
        inspection: index === 0 ? "首件 + IPQC" : "IPQC / 工序自检",
        material: state.kitChecks[order.id]?.gap > 0 ? state.kitChecks[order.id].result : "齐套",
        next: tasks[index + 1]?.id || (index === tasks.length - 1 ? "入库" : "下道工序"),
        progressNote: `${dispatch.status || "等待排程发布"} · ${schedule.status || "等待评审"}`,
      }));
    });
  }

  function getRequirementRows(order, requirements) {
    return requirements.map((item, index) => ({
      id: item.id,
      order: order.id,
      dispatch: `D-${order.id.slice(-4)}-${String(index + 1).padStart(2, "0")}`,
      operation: index === 0 ? "备料确认" : "工序备料",
      line: order.line,
      material: item.material,
      materialNo: item.materialNo,
      batch: item.gap > 0 ? "待锁定可用批次" : "按 FIFO + IQC 合格",
      qty: item.need,
      available: item.available,
      gap: item.gap,
      time: "随排程窗口",
      status: item.status,
      owner: "物料员 吴琳",
      source: `统一业务流：${order.id} / BOM / 排程`,
      next: item.gap > 0 ? "缺料预警" : "转领料申请",
      risk: item.gap > 0 ? `${item.material} 缺 ${item.gap} 件` : "物料口径满足当前排程",
    }));
  }

  function projectMaterialRow(pageId, row, index) {
    const idPrefix = { picking: "PK", delivery: "DL", inventory: "LS", feeding: "FD", returns: "RT", shortage: "SA" }[pageId] || "MR";
    const statusMap = {
      picking: row.gap > 0 ? "待审批" : "待拣货",
      delivery: row.gap > 0 ? "异常停滞" : "待配送",
      inventory: row.gap > 0 ? "低水位" : "可投料",
      feeding: row.gap > 0 ? "待投料" : "待放行",
      returns: "待核销",
      shortage: row.gap > 0 ? "已升级" : "已解除",
    };
    return {
      ...row,
      id: `${idPrefix}-${row.order.slice(-4)}-${String(index + 1).padStart(2, "0")}`,
      status: statusMap[pageId] || row.status,
      source: pageId === "requirements" ? row.source : `统一业务流：由 ${row.id} 推进到${statusMap[pageId] || row.status}`,
      next: pageId === "picking" ? "进入配送进度" : pageId === "delivery" ? "线边签收" : pageId === "inventory" ? "投料确认" : pageId === "feeding" ? "批次谱系追溯" : pageId === "returns" ? "WMS 入库核销" : row.next,
    };
  }

  function getMaterialRows(pageId = "requirements") {
    const state = read();
    const requirementRows = state.orders.flatMap((order) => getRequirementRows(order, state.materialRequirements[order.id] || []));
    if (pageId === "requirements") return requirementRows;
    if (pageId === "shortage") return requirementRows.filter((row) => row.gap > 0).map((row, index) => projectMaterialRow(pageId, row, index));
    return requirementRows.map((row, index) => projectMaterialRow(pageId, row, index));
  }

  function applyDispatchAction(orderId, action, payload = {}) {
    const state = read();
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const schedule = state.schedules[orderId] || {};
    const dispatch = state.dispatches[orderId] || { orderId, route: schedule.route || "", tasks: [] };
    if (action === "generate" || action === "release") {
      dispatch.tasks = dispatch.tasks?.length ? dispatch.tasks : buildDispatchTasks(order, schedule);
      dispatch.status = action === "release" ? "已下达" : "派工准备";
      if (action === "release") order.status = "已下达";
      state.barcodeBatches[orderId] = { ...(state.barcodeBatches[orderId] || {}), orderId, status: action === "release" ? "已下发到工位" : "等待派工下发" };
      addLog(state, orderId, "派工与生产任务", action === "release" ? "任务下达" : "生成派工", payload.owner || "车间计划员", "已按排程和工艺路线生成工序任务，等待现场接单/开工回执");
    }
    if (action === "hold") {
      dispatch.status = "已挂起";
      addLog(state, orderId, "派工与生产任务", "挂起派工", payload.owner || "车间主任", payload.reason || "等待异常处理");
    }
    state.dispatches[orderId] = dispatch;
    write(state);
    return dispatch;
  }

  function applyMaterialAction(orderId, action, payload = {}) {
    const state = read();
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const requirements = state.materialRequirements[orderId] || [];
    const request = {
      id: `MAT-${action}-${orderId.slice(-4)}-${Date.now().toString().slice(-4)}`,
      orderId,
      action,
      status: payload.status || (action === "requestPick" ? "待 WMS 拣货" : "处理中"),
      owner: payload.owner || "物料员 吴琳",
      items: requirements,
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.materialRequests[orderId] = [request, ...(state.materialRequests[orderId] || [])].slice(0, 30);
    if (action === "confirmKit") {
      state.kitChecks[orderId] = { ...(state.kitChecks[orderId] || {}), orderId, status: "齐套已确认", gap: 0, result: "物料复核通过，允许开工检查" };
      order.kit = "齐套";
      order.materialGap = "齐套";
      if (order.risk === "缺料") order.risk = "正常";
    }
    if (action === "shortage") {
      state.kitChecks[orderId] = { ...(state.kitChecks[orderId] || {}), orderId, status: "缺口待处理", result: payload.reason || "缺料预警已确认" };
      state.exceptions[orderId] = { id: `EX-SHORT-${orderId.slice(-4)}`, type: "缺料异常", status: "待处理", impact: payload.reason || order.materialGap || "物料缺口" };
      order.risk = "缺料";
    }
    addLog(state, orderId, "物料与线边库", payload.label || action, request.owner, `${request.status}，关联 ${requirements.length} 条工序级需求`);
    write(state);
    return request;
  }

  function applyBarcodeAction(row = {}, action = "barcodeReview", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const batch = state.barcodeBatches[orderId] || { orderId, id: row.id || `LOT-${productCodeOf(order)}-${orderId.slice(-4)}` };
    const status = payload.status || row.status || "已记录";
    const event = {
      id: `BC-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: row.dispatch || payload.dispatchId || "",
      code: row.id || payload.code || batch.id,
      codeType: row.codeType || payload.codeType || "条码标签",
      action,
      status,
      owner: payload.owner || row.owner || "条码管理员",
      result: payload.result || row.risk || "条码事件已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.barcodeEvents = [event, ...(state.barcodeEvents || [])].slice(0, 160);
    state.barcodeBatches[orderId] = {
      ...batch,
      id: batch.id || event.code,
      orderId,
      productCode: productCodeOf(order),
      status: action === "batchRelease" || status.includes("下发") ? "已下发到工位" : status,
      labelTemplate: row.template || batch.labelTemplate || "按产品主数据模板",
      lastCode: event.code,
    };
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 80);
    addLog(state, orderId, "条码与标签", action, event.owner, `${event.codeType} ${event.status}，已关联派工、工位和追溯`, [event.code]);
    write(state);
    return event;
  }

  function applyStationAction(orderId, action = "stationReview", payload = {}) {
    const state = read();
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `ST-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: payload.dispatchId || payload.dispatchNo || "",
      station: payload.station || "",
      equipment: payload.equipment || "",
      action,
      status: payload.status || "已记录",
      owner: payload.owner || payload.operator || "班组长",
      result: payload.result || payload.reason || "工位回执已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.stationEvents = [event, ...(state.stationEvents || [])].slice(0, 180);
    if (action === "scanStart") {
      order.status = payload.status?.includes("首件") ? "首件待确认" : "生产中";
      state.dispatches[orderId] = { ...(state.dispatches[orderId] || {}), orderId, status: "生产中", startedAt: event.time };
      state.barcodeBatches[orderId] = { ...(state.barcodeBatches[orderId] || {}), orderId, status: "已用于开工" };
    }
    if (action === "startBlock" || action === "feedingBlock" || payload.status === "已拦截") {
      state.exceptions[orderId] = {
        id: `EX-ST-${orderId.slice(-4)}`,
        type: action === "feedingBlock" ? "投料拦截" : "开工准入拦截",
        status: "待处理",
        impact: event.result,
      };
    }
    if (action === "feedingConfirm") {
      state.materialRequests[orderId] = [{
        id: `MAT-FEED-${orderId.slice(-4)}-${Date.now().toString().slice(-4)}`,
        orderId,
        action: "feedingRelease",
        status: "投料已确认",
        owner: event.owner,
        items: state.materialRequirements[orderId] || [],
        time: event.time,
      }, ...(state.materialRequests[orderId] || [])].slice(0, 30);
    }
    if (action === "operationReport") {
      order.done = Math.min(order.qty || payload.goodQty || 0, (order.done || 0) + (Number(payload.goodQty) || 0));
      order.status = order.done >= order.qty ? "工序完工" : "生产中";
    }
    if (action === "handoverRisk" || action === "reportBlock" || action === "instructionDeviation" || action === "loginLock") {
      state.exceptions[orderId] = {
        id: `EX-ST-${orderId.slice(-4)}`,
        type: "工位作业异常",
        status: "待处理",
        impact: event.result,
      };
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 80);
    addLog(state, orderId, "工位作业", action, event.owner, event.result, [event.dispatchId, event.station].filter(Boolean));
    write(state);
    return event;
  }

  function applyProcessAction(orderId, action = "processCollect", payload = {}) {
    const state = read();
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `PR-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: payload.dispatchId || payload.dispatch || "",
      source: payload.source || "模拟 PLC / SCADA / HMI 回执",
      equipment: payload.equipment || "",
      parameter: payload.parameter || payload.item || "",
      value: payload.value || "",
      action,
      status: payload.status || "已采集",
      owner: payload.owner || "过程监控员",
      result: payload.result || payload.action || "过程采集已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.processEvents = [event, ...(state.processEvents || [])].slice(0, 220);
    if (/拦截|报警|故障|停机|超限|失控/.test(`${event.status} ${event.result}`)) {
      state.exceptions[orderId] = {
        id: `EX-PR-${orderId.slice(-4)}`,
        type: "过程采集异常",
        status: "待处理",
        impact: `${event.parameter || event.equipment} ${event.status}`,
      };
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 80);
    addLog(state, orderId, "过程监控", action, event.owner, `${event.source}：${event.status}`, [event.dispatchId, event.equipment].filter(Boolean));
    write(state);
    return event;
  }

  function getBarcodeRows(pageId = "batch") {
    const state = read();
    return state.orders.map((order, index) => {
      const batch = state.barcodeBatches[order.id] || {};
      const code = productCodeOf(order) || `ORD-${order.id.slice(-4)}`;
      const base = {
        order: order.id,
        dispatch: state.dispatches[order.id]?.tasks?.[0]?.id || `D-${order.id.slice(-4)}-01`,
        line: order.line,
        product: order.product,
        operation: state.dispatches[order.id]?.tasks?.[0]?.operation || "首道工序",
        qty: order.qty,
        source: "统一业务流：订单 / 派工 / 条码规则",
        owner: "条码员 林澈",
        risk: batch.status || "等待派工或标签回执",
      };
      const suffix = String(index + 1).padStart(3, "0");
      if (pageId === "serial") return { ...base, id: `SN-${code}-${order.id.slice(-4)}`, codeType: "产品 SN", template: `RULE-SN-${code}`, range: `000001-${String(order.qty).padStart(6, "0")}`, status: batch.status === "已用于开工" ? "部分绑定" : "待绑定", next: "过程记录 / FQC" };
      if (pageId === "material") return { ...base, id: `ML-${code}-${order.id.slice(-4)}`, product: state.materialRequirements[order.id]?.[0]?.material || "工序物料", codeType: "物料标签", template: "TPL-MAT-IQC", range: state.materialRequirements[order.id]?.[0]?.materialNo || "待锁批次", status: state.kitChecks[order.id]?.gap > 0 ? "冻结标签" : "可投料", next: "投料确认" };
      if (pageId === "finished") return { ...base, id: `FG-LBL-${code}-${suffix}`, codeType: "成品标签", template: batch.labelTemplate || "按客户模板", range: `FG-${code}-${suffix}`, status: "待 FQC 放行", next: "成品入库" };
      if (pageId === "package") return { ...base, id: `BOX-${code}-${suffix}`, codeType: "箱码", template: "RULE-BOX", range: "SN 待绑定", status: "待绑定", next: "箱码托盘码" };
      if (pageId === "printing") return { ...base, id: `PRN-${order.id.slice(-4)}-${suffix}`, codeType: "标签打印任务", template: batch.labelTemplate || "按模板队列", range: batch.lastCode || batch.id || `LOT-${code}-${order.id.slice(-4)}`, status: batch.status?.includes("下发") ? "已打印" : "队列中", next: "现场签收" };
      if (pageId === "reprint") return { ...base, id: `RP-${order.id.slice(-4)}-${suffix}`, codeType: "补打申请", template: batch.labelTemplate || "待审批模板", range: batch.lastCode || batch.id || `LOT-${code}-${order.id.slice(-4)}`, status: "待审批", next: "审批后打印" };
      return { ...base, id: batch.id || `LOT-${code}-20260620-${suffix}`, codeType: "生产批次", template: batch.labelTemplate || `RULE-LOT-${code}`, range: `SN 000001-${String(order.qty).padStart(6, "0")}`, status: batch.status || "待启用", next: "产品序列号" };
    });
  }

  function getMonitoringRows(pageId = "output") {
    const state = read();
    return state.processEvents.slice(0, 20).map((event) => ({
      id: event.id,
      primary: `${event.orderId} / ${event.dispatchId || "派工待关联"}`,
      item: event.parameter || event.equipment || event.action,
      line: state.orders.find((order) => order.id === event.orderId)?.line || "全部产线",
      station: event.station || event.equipment || "现场采集点",
      equipment: event.equipment || "采集设备",
      order: event.orderId,
      dispatch: event.dispatchId || "派工待关联",
      source: event.source,
      value: event.value || event.result,
      standard: "来自统一业务流过程事件",
      status: event.status,
      action: event.result,
      owner: event.owner,
      time: event.time,
      batch: state.barcodeBatches[event.orderId]?.id || "批次待关联",
      trace: `MES_BUSINESS_FLOW.processEvents / ${pageId}`,
    }));
  }

  function applyQualityAction(row = {}, action = "qualityReview", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `QA-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: row.dispatch || payload.dispatchId || "",
      sourceId: row.id || payload.sourceId || "",
      action,
      status: payload.status || row.status || "已记录",
      owner: payload.owner || row.owner || "质量员",
      result: payload.result || row.result || row.action || "质量事件已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.qualityEvents = [event, ...(state.qualityEvents || [])].slice(0, 180);
    if (/不合格|冻结|拦截|NCR|MRB|返工|隔离|停线/.test(`${event.status} ${event.result}`)) {
      state.exceptions[orderId] = {
        id: `EX-QA-${orderId.slice(-4)}`,
        type: "质量异常",
        status: "待处理",
        impact: event.result,
      };
      order.risk = "质量";
    }
    if (/放行|合格|关闭|已完成/.test(`${event.status} ${event.result}`)) {
      order.quality = order.quality || 98;
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 100);
    addLog(state, orderId, "质量检验", action, event.owner, event.result, [event.dispatchId, event.sourceId].filter(Boolean));
    write(state);
    return event;
  }

  function applyExceptionAction(row = {}, action = "exceptionReview", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `EXE-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: row.dispatch || payload.dispatchId || "",
      sourceId: row.id || payload.sourceId || "",
      action,
      status: payload.status || row.status || "已记录",
      owner: payload.owner || row.owner || "异常协调员",
      result: payload.result || row.action || row.risk || "异常事件已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.exceptionEvents = [event, ...(state.exceptionEvents || [])].slice(0, 180);
    state.exceptions[orderId] = {
      ...(state.exceptions[orderId] || { id: `EX-${orderId.slice(-4)}`, type: "现场异常" }),
      status: /验证|闭环|已验收/.test(event.status) ? "已闭环" : "处理中",
      impact: event.result,
    };
    if (/停线|缺料|质量|设备/.test(`${event.result} ${event.status}`)) order.risk = /已缓解|已验证|闭环/.test(event.status) ? order.risk : "异常";
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 100);
    addLog(state, orderId, "异常处理", action, event.owner, event.result, [event.dispatchId, event.sourceId].filter(Boolean));
    write(state);
    return event;
  }

  function applyEquipmentAction(row = {}, action = "equipmentReview", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `EQ-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: row.dispatch || payload.dispatchId || "",
      equipment: row.equipment || row.item || payload.equipment || "",
      sourceId: row.id || payload.sourceId || "",
      action,
      status: payload.status || row.status || "已记录",
      owner: payload.owner || row.owner || "设备员",
      result: payload.result || row.next || row.risk || "设备事件已进入统一业务流",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.equipmentEvents = [event, ...(state.equipmentEvents || [])].slice(0, 180);
    if (/故障|停机|异常|低库存/.test(`${event.status} ${event.result}`)) {
      state.exceptions[orderId] = {
        id: `EX-EQ-${orderId.slice(-4)}`,
        type: "设备异常",
        status: "待处理",
        impact: event.result,
      };
      order.risk = "设备";
    }
    if (/验收|完成|已归因|已重算/.test(event.status)) {
      state.dispatches[orderId] = { ...(state.dispatches[orderId] || {}), orderId, equipmentStatus: "已复核" };
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 100);
    addLog(state, orderId, "设备与保养", action, event.owner, event.result, [event.dispatchId, event.equipment].filter(Boolean));
    write(state);
    return event;
  }

  function getQualityRows(pageId = "process") {
    const state = read();
    return [...(state.processEvents || []), ...(state.stationEvents || [])]
      .filter((event) => /拦截|预警|首件|参数|投料|报工|质量|过程/.test(`${event.action} ${event.status} ${event.result}`))
      .slice(0, 20)
      .map((event) => ({
        id: `QA-${event.id}`,
        order: event.orderId,
        dispatch: event.dispatchId || "派工待关联",
        line: state.orders.find((order) => order.id === event.orderId)?.line || "全部产线",
        item: event.parameter || event.action,
        source: event.source || "统一业务流",
        status: /拦截|不合格|超限/.test(`${event.status} ${event.result}`) ? "待质量判定" : "待复核",
        action: event.result,
        result: event.result,
        owner: "质量员 唐宁",
        time: event.time,
        next: pageId === "final" ? "FQC 放行/拦截" : "过程检验 / NCR",
      }));
  }

  function getExceptionRows(pageId = "pending") {
    const state = read();
    return Object.values(state.exceptions || {}).map((exception) => {
      const orderId = Object.keys(state.exceptions || {}).find((key) => state.exceptions[key] === exception) || "";
      const order = state.orders.find((item) => item.id === orderId) || {};
      return {
        id: exception.id,
        order: orderId,
        dispatch: state.dispatches[orderId]?.tasks?.[0]?.id || "派工待关联",
        line: order.line || "全部产线",
        item: exception.type,
        source: "统一业务流异常事实",
        status: exception.status || "待处理",
        action: exception.impact || "等待责任人响应",
        owner: pageId === "equipment" ? "设备员" : pageId === "quality" ? "质量员" : "异常协调员",
        time: new Date().toLocaleString("zh-CN", { hour12: false }),
        next: "派单、临时措施、验证和复盘",
      };
    });
  }

  function getEquipmentRows(pageId = "status") {
    const state = read();
    return (state.processEvents || [])
      .filter((event) => event.equipment || /设备|PLC|SCADA|停机|报警/.test(`${event.source} ${event.result}`))
      .slice(0, 20)
      .map((event) => ({
        id: `EQ-${event.id}`,
        order: event.orderId,
        dispatch: event.dispatchId || "派工待关联",
        line: state.orders.find((order) => order.id === event.orderId)?.line || "全部产线",
        item: event.equipment || event.parameter || "设备点位",
        equipment: event.equipment || "设备待关联",
        source: event.source,
        status: /故障|报警|停机|拦截/.test(`${event.status} ${event.result}`) ? "异常待处理" : "待复核",
        next: event.result,
        owner: "设备员 周诚",
        time: event.time,
        risk: event.result,
      }));
  }

  function completionStageText(pageId) {
    return {
      operation: "工序完工",
      confirmation: "完工确认",
      packaging: "包装作业",
      receipt: "成品入库",
      freeze: "库存冻结",
      return: "退料入库",
      sync: "单据同步",
    }[pageId] || "完工入库";
  }

  function applyCompletionAction(row = {}, pageId = "operation", action = "completionReview", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const stage = completionStageText(pageId);
    const event = {
      id: `WH-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      dispatchId: row.dispatch || payload.dispatchId || "",
      businessId: row.id || payload.businessId || "",
      stage,
      action,
      status: payload.status || row.status || "已记录",
      qty: Number(row.qty || payload.qty || 0),
      goodQty: Math.max(Number(row.qty || 0) - Number(row.bad || 0) - Number(row.scrap || 0), 0),
      batch: row.batch || payload.batch || "",
      packageLevel: row.pack || payload.packageLevel || "",
      location: row.location || payload.location || "",
      source: payload.source || row.source || "完工入库页面回执",
      owner: payload.owner || row.owner || "完工入库责任人",
      result: payload.result || row.next || row.check || "完工入库状态已进入统一业务流",
      governanceType: payload.governanceType || "",
      approvalStatus: payload.approvalStatus || "",
      beforeAfter: payload.beforeAfter || "",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.completionEvents = [event, ...(state.completionEvents || [])].slice(0, 180);
    if (event.governanceType) {
      state.governanceEvents = [event, ...(state.governanceEvents || [])].slice(0, 180);
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 120);
    if (pageId === "operation") {
      order.done = Math.max(order.done || 0, event.qty || 0);
      order.status = event.status.includes("结转") || event.status.includes("完工") ? "工序完工" : order.status;
    }
    if (pageId === "confirmation" && /通过|允许|确认/.test(event.status)) order.status = "完工已确认";
    if (pageId === "packaging" && /成托|包装/.test(event.status)) order.status = "包装完成";
    if (pageId === "receipt" && /入库/.test(event.status)) {
      order.status = "已入库";
      order.done = Math.max(order.done || 0, event.qty || order.qty || 0);
    }
    if (/撤回/.test(action)) {
      order.status = "入库撤回待复核";
      order.risk = "成品入库指令撤回，需仓储和质量确认账实状态";
    }
    if (/重试|对账差异/.test(action)) {
      order.risk = /关闭/.test(action) ? "接口对账差异已关闭" : "ERP/WMS 回执待补偿";
    }
    if (pageId === "freeze" || /冻结|拦截|差异|异常/.test(`${event.status} ${event.result}`)) {
      state.exceptions[orderId] = {
        id: `EX-WH-${orderId.slice(-4)}`,
        type: `${stage}异常`,
        status: pageId === "freeze" ? "库存已冻结" : "待处理",
        impact: event.result,
      };
    }
    addLog(state, orderId, "完工与入库", stage, event.owner, `${event.businessId || event.batch} ${event.status}，已衔接追溯、ERP/WMS 同步和经营报表`, [event.businessId, event.batch].filter(Boolean));
    write(state);
    return event;
  }

  function getTraceRows(pageId = "product") {
    const state = read();
    return (state.completionEvents || []).slice(0, 30).map((event) => {
      const order = state.orders.find((item) => item.id === event.orderId) || {};
      const evidence = [
        event.stage,
        event.dispatchId,
        event.batch,
        event.packageLevel,
        event.location,
      ].filter(Boolean).join(" / ");
      const status = /冻结|拦截|异常|差异/.test(`${event.status} ${event.result}`) ? "异常关联" : pageId === "customer" ? "待审批" : "证据完整";
      return {
        id: pageId === "customer" ? `TR-RPT-${event.orderId.slice(-4)}-${event.id.slice(-4)}` : event.batch || event.businessId || event.id,
        type: event.stage.includes("入库") ? "成品批次" : "生产批次",
        material: event.stage.includes("退料") ? event.batch : "成品 / 包材批次",
        order: event.orderId,
        line: order.line || "全部产线",
        product: order.product || "业务流产品",
        customer: order.customer || "客户待关联",
        batch: event.batch,
        status,
        source: `统一业务流：${event.stage} ${event.status}`,
        owner: event.owner,
        scope: event.packageLevel || event.result,
        evidence,
        action: status === "异常关联" ? "圈定影响范围并转异常/冻结复核" : "可生成追溯快照并供报表引用",
      };
    });
  }

  function applyTraceAction(row = {}, pageId = "product", action = "traceSnapshot", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return null;
    const event = {
      id: `TR-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      queryType: pageId,
      target: row.id || payload.target || "",
      action,
      status: payload.status || row.status || "已生成快照",
      source: payload.source || row.source || "追溯查询页面",
      owner: payload.owner || row.owner || "追溯员",
      result: payload.result || row.action || "追溯查询已归档",
      governanceType: payload.governanceType || "",
      approvalStatus: payload.approvalStatus || "",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.traceQueryEvents = [event, ...(state.traceQueryEvents || [])].slice(0, 140);
    if (event.governanceType) {
      state.governanceEvents = [event, ...(state.governanceEvents || [])].slice(0, 180);
    }
    state.traceEvents[orderId] = [event, ...(state.traceEvents[orderId] || [])].slice(0, 120);
    if (/冻结建议|影响范围|召回|禁止发布/.test(`${action} ${event.status} ${event.result}`)) {
      state.exceptions[orderId] = {
        id: `EX-TR-${orderId.slice(-4)}`,
        type: "追溯影响范围复核",
        status: "待处理",
        impact: `${event.target} ${event.result}`,
      };
      order.risk = "追溯复核影响库存冻结、客户报告和异常处置";
    }
    addLog(state, orderId, "追溯查询", action, event.owner, `${event.target} ${event.status}，证据链已供客户报告和经营分析引用`, [event.target]);
    write(state);
    return event;
  }

  function getReportRows(pageId = "daily") {
    const state = read();
    return (state.completionEvents || []).slice(0, 30).map((event) => {
      const order = state.orders.find((item) => item.id === event.orderId) || {};
      const risky = /冻结|拦截|异常|差异|重试/.test(`${event.status} ${event.result}`);
      return {
        id: `RPT-${pageId.toUpperCase()}-${event.id.slice(-6)}`,
        name: `${order.line || "全部产线"} ${event.stage}业务流快照`,
        line: order.line || "全部产线",
        shift: "业务流",
        order: event.orderId,
        source: `MES_BUSINESS_FLOW：${event.stage}`,
        plan: `订单 ${order.qty || event.qty || 0} / 完工 ${event.qty || order.done || 0}`,
        quality: `${event.status} / ${event.batch || "批次待关联"}`,
        status: risky ? "需复核" : "可发布",
        statusStyle: risky ? "orange" : "green",
        risk: risky ? event.result : "完工、入库、追溯口径一致",
        owner: event.owner,
        updated: event.time,
        trace: event.batch || event.businessId || event.id,
        next: risky ? "责任人复核后重算报表" : "同步 BI / 管理驾驶舱",
      };
    });
  }

  function applyReportAction(row = {}, pageId = "daily", action = "reportRefresh", payload = {}) {
    const state = read();
    const orderId = row.order || row.orderId || payload.orderId;
    const event = {
      id: `RP-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId,
      reportType: pageId,
      target: row.id || payload.target || "",
      action,
      status: payload.status || row.status || "已刷新",
      source: payload.source || row.source || "报表与看板页面",
      owner: payload.owner || row.owner || "报表复核人",
      result: payload.result || row.next || "报表口径已写入统一业务流",
      governanceType: payload.governanceType || "",
      approvalStatus: payload.approvalStatus || "",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.reportEvents = [event, ...(state.reportEvents || [])].slice(0, 140);
    if (event.governanceType) {
      state.governanceEvents = [event, ...(state.governanceEvents || [])].slice(0, 180);
    }
    if (orderId) {
      const order = state.orders.find((item) => item.id === orderId);
      if (/异常下钻|延期|损耗|瓶颈|风险/.test(`${action} ${event.status} ${event.result}`)) {
        state.exceptions[orderId] = {
          id: `EX-RP-${orderId.slice(-4)}`,
          type: "报表经营风险",
          status: "待处理",
          impact: `${event.target} ${event.result}`,
        };
        if (order) order.risk = "报表风险已反写异常中心和订单风险";
      }
      if (/发布|锁定/.test(action) && order) order.reportStatus = event.status;
      addLog(state, orderId, "报表与看板", action, event.owner, `${event.target} ${event.status}，来源口径已锁定`, [event.target]);
    }
    write(state);
    return event;
  }

  function applyGovernanceAction(row = {}, pageId = "settings", action = "governanceReview", payload = {}) {
    const state = read();
    const relatedOrderId = payload.orderId || row.orderId || "";
    const event = {
      id: `GV-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId: relatedOrderId,
      pageId,
      businessObject: row.id || payload.businessObject || "系统治理对象",
      businessName: row.name || payload.businessName || "",
      action,
      status: payload.status || row.status || "已记录",
      source: payload.source || row.source || "系统设置后台",
      owner: payload.owner || row.owner || "系统管理员",
      approvalStatus: payload.approvalStatus || "",
      auditRef: payload.auditRef || row.trace || "",
      result: payload.result || row.check || "系统治理动作已写入统一业务流",
      impact: payload.impact || row.risk || row.scope || "跨流程治理约束已更新",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    state.governanceEvents = [event, ...(state.governanceEvents || [])].slice(0, 220);
    state.logs = [{
      id: `FLOW-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId: relatedOrderId,
      stage: "系统治理",
      action,
      owner: event.owner,
      result: `${event.businessObject} ${event.status}：${event.result}`,
      refs: [event.auditRef, event.businessObject].filter(Boolean),
      time: event.time,
    }, ...(state.logs || [])].slice(0, 180);
    if (/权限|角色|锁定|账号|电子签名|审批/.test(`${action} ${event.status} ${event.result}`)) {
      state.orders.forEach((order) => {
        if (order.status && !["已入库", "已关闭"].includes(order.status)) {
          order.governanceRisk = "系统治理约束已更新，关键动作需重新校验权限、审批或电子签名";
        }
      });
    }
    write(state);
    return event;
  }

  function getOrderStoreShape(pageStateKey, pageState = {}) {
    const state = read();
    return {
      orders: clone(state.orders),
      integrationLogs: clone(state.logs.map((item) => ({ orderId: item.orderId, action: `${item.stage}：${item.action} - ${item.result}`, time: item.time }))),
      reviewMaterials: clone(state.reviews),
      schedulePlans: clone(state.schedules),
      kitChecks: clone(state.kitChecks),
      [pageStateKey]: pageState,
    };
  }

  return { STORAGE_KEY, read, write, reset, upsertOrder, copyOrder, applyAction, applyMasterDataAction, applyDispatchAction, applyMaterialAction, applyBarcodeAction, applyStationAction, applyProcessAction, applyQualityAction, applyExceptionAction, applyEquipmentAction, applyCompletionAction, applyTraceAction, applyReportAction, applyGovernanceAction, ensureFlowForOrder, getOrderStoreShape, getDispatchRows, getMaterialRows, getBarcodeRows, getMonitoringRows, getQualityRows, getExceptionRows, getEquipmentRows, getTraceRows, getReportRows };
})();
