const STORAGE_KEY = "xingjigu_mes_production_orders_v2";

const modules = window.MES_NAV_MODULES || [];

const initialOrders = [
  { id: "MO-202606-0001", product: "智能温控控制器 TCU-100", customer: "A 客户", qty: 1000, done: 428, due: "2026-06-30", line: "Line-A", status: "已下达", priority: "高", risk: "缺料", review: "已通过", schedule: "已确认", kit: "缺 200 件", batchPlan: "800 + 200", planner: "周计划", materialGap: "温度传感器缺 200 件" },
  { id: "MO-202606-0002", product: "工业网关 GW-240", customer: "B 客户", qty: 600, done: 315, due: "2026-06-28", line: "Line-B", status: "生产中", priority: "高", risk: "交期", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "600", planner: "李计划", materialGap: "齐套" },
  { id: "MO-202606-0003", product: "边缘采集器 ECU-80", customer: "C 客户", qty: 1200, done: 760, due: "2026-07-02", line: "Line-C", status: "生产中", priority: "中", risk: "设备", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "1200", planner: "周计划", materialGap: "老化房容量接近上限" },
  { id: "MO-202606-0004", product: "智能传感节点 SEN-20", customer: "A 客户", qty: 2000, done: 1280, due: "2026-07-05", line: "Line-A", status: "待检", priority: "中", risk: "质量", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "2000", planner: "王计划", materialGap: "齐套" },
  { id: "MO-202606-0005", product: "电源控制模块 PCM-60", customer: "D 客户", qty: 900, done: 120, due: "2026-06-27", line: "Line-B", status: "待备料", priority: "紧急", risk: "缺料", review: "已通过", schedule: "待调整", kit: "缺 160 件", batchPlan: "500 + 400", planner: "李计划", materialGap: "电源芯片缺 160 件" },
  { id: "MO-202606-0006", product: "显示控制面板 HMI-70", customer: "E 客户", qty: 500, done: 0, due: "2026-07-01", line: "Line-C", status: "待评审", priority: "中", risk: "资料", review: "待评审", schedule: "未排程", kit: "待检查", batchPlan: "未拆批", planner: "待分配", materialGap: "检验要求未确认" },
  { id: "MO-202606-0007", product: "无线采集终端 WDT-30", customer: "F 客户", qty: 1500, done: 980, due: "2026-07-03", line: "Line-A", status: "生产中", priority: "中", risk: "正常", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "1500", planner: "王计划", materialGap: "齐套" },
  { id: "MO-202606-0008", product: "智能继电控制器 RLY-12", customer: "G 客户", qty: 750, done: 470, due: "2026-06-29", line: "Line-B", status: "生产中", priority: "高", risk: "设备", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "750", planner: "李计划", materialGap: "SMT-02 需保养确认" },
  { id: "MO-202606-0009", product: "环境监测模块 ENV-45", customer: "H 客户", qty: 1100, done: 220, due: "2026-07-06", line: "Line-C", status: "已排程", priority: "中", risk: "正常", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "1100", planner: "周计划", materialGap: "齐套" },
  { id: "MO-202606-0010", product: "伺服驱动板 SRV-90", customer: "B 客户", qty: 420, done: 260, due: "2026-06-26", line: "Line-A", status: "生产中", priority: "紧急", risk: "交期", review: "已通过", schedule: "待调整", kit: "齐套", batchPlan: "420", planner: "王计划", materialGap: "齐套" },
  { id: "MO-202606-0011", product: "温湿度采集器 THS-10", customer: "I 客户", qty: 1800, done: 1480, due: "2026-07-08", line: "Line-C", status: "包装中", priority: "低", risk: "正常", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "1800", planner: "周计划", materialGap: "齐套" },
  { id: "MO-202606-0012", product: "工业触控终端 HMI-100", customer: "J 客户", qty: 320, done: 80, due: "2026-06-30", line: "Line-B", status: "待首检", priority: "高", risk: "质量", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "320", planner: "李计划", materialGap: "首件尺寸项待确认" },
];

const planDays = ["06-20", "06-21", "06-22", "06-23", "06-24", "06-25", "06-26"];
const statusTime = "2026-06-20 10:30";
let orders = structuredClone(window.MES_BUSINESS_FLOW?.read?.().orders || window.MES_MASTER_DATA?.orders || initialOrders);
let schedulePlans = {};
let integrationLogs = [];
let kitChecks = {};
let backendState = window.MES_BACKEND?.read?.() || null;
let state = { activeOrderId: "MO-202606-0005", search: "", kit: "all", line: "all", detailOpen: true };

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "齐套检查" ? " class=\"is-active\"" : "";
      return `<a href="#${module.id}-${index}"${active} data-module="${module.id}" data-entry="${item}">${item}</a>`;
    }).join("");
    return `
      <section class="module-group${openClass}">
        <button class="module-button" type="button" data-module="${module.id}">
          <span class="module-icon" style="background:${module.color}">${module.mark}</span>
          <span>
            <span class="module-title">${module.title}</span>
            <span class="module-layer">${module.layer}</span>
          </span>
          <span class="chevron">›</span>
        </button>
        <div class="submenu">${submenu}</div>
      </section>
    `;
  }).join("");

  $("#orderModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#orderModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const moduleId = link.dataset.module;
      const entry = link.dataset.entry;
      if (moduleId === "workbench") window.location.href = "../index.html";
      else if (moduleId === "orders" && entry === "生产订单") window.location.href = "./production-orders.html";
      else if (moduleId === "orders" && entry === "订单评审") window.location.href = "./order-reviews.html";
      else if (moduleId === "orders" && entry === "生产排程") window.location.href = "./production-schedule.html";
      else if (moduleId === "orders" && entry === "产能负荷") window.location.href = "./capacity-load.html";
      else if (moduleId === "orders" && entry === "交期预警") window.location.href = "./delivery-warning.html";
      else if (moduleId === "orders" && entry === "计划调整") window.location.href = "./plan-adjustment.html";
      else if (moduleId === "orders" && entry === "齐套检查") window.location.href = "./kit-check.html";
      else if (moduleId === "dispatch" && entry === "派工单") window.location.href = "../dispatch/dispatch-orders.html";
      else if (moduleId === "dispatch" && entry === "工序任务") window.location.href = "../dispatch/operation-tasks.html";
      else if (moduleId === "dispatch" && entry === "班组任务") window.location.href = "../dispatch/team-tasks.html";
      else if (moduleId === "dispatch" && entry === "任务下达") window.location.href = "../dispatch/task-release.html";
      else if (moduleId === "dispatch" && entry === "任务变更") window.location.href = "../dispatch/task-change.html";
      else if (moduleId === "dispatch" && entry === "工艺文件与作业指导") window.location.href = "../dispatch/sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
      else if (moduleId === "station" && entry === "工位身份回执") window.location.href = "../station/employee-login.html";
      else if (moduleId === "station" && entry === "扫码开工") window.location.href = "../station/scan-start.html";
      else if (moduleId === "station" && entry === "工艺指导") window.location.href = "../station/work-instruction.html";
      else if (moduleId === "station" && entry === "投料确认") window.location.href = "../station/feeding-confirmation.html";
      else if (moduleId === "station" && entry === "过程记录") window.location.href = "../station/process-record.html";
      else if (moduleId === "station" && entry === "工序报工") window.location.href = "../station/operation-report.html";
      else if (moduleId === "station" && entry === "交接班") window.location.href = "../station/shift-handover.html";
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    backendState = window.MES_BACKEND?.read?.() || backendState;
    const flowState = window.MES_BUSINESS_FLOW?.read?.();
    if (flowState?.orders) {
      orders = backendState?.orders || flowState.orders;
      schedulePlans = flowState.schedules || {};
      kitChecks = backendState?.kitChecks || flowState.kitChecks || {};
      integrationLogs = backendState?.auditLogs?.map((item) => ({ orderId: item.orderId, action: item.action + "：" + item.result, time: item.time })) || flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time }));
    }
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    orders = backendState?.orders || flowState?.orders || orders;
    schedulePlans = flowState?.schedules || schedulePlans;
    kitChecks = backendState?.kitChecks || flowState?.kitChecks || kitChecks;
    integrationLogs = backendState?.auditLogs?.map((item) => ({ orderId: item.orderId, action: item.action + "：" + item.result, time: item.time })) || (flowState?.logs ? flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) : saved.integrationLogs || integrationLogs);
    state = { ...state, ...(saved.kitState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const shape = window.MES_BUSINESS_FLOW?.getOrderStoreShape?.("kitState", state);
  if (shape) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shape));
    return;
  }
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, integrationLogs, kitState: state }));
}

function getPlan(order) {
  const storedPlan = schedulePlans[order.id];
  if (storedPlan?.window && !["待 APS 计算", "待排程"].includes(storedPlan.window)) return storedPlan;
  if (!schedulePlans[order.id] || typeof schedulePlans[order.id].dayOffset !== "number" || !schedulePlans[order.id].window) {
    const dayOffset = getOrderDayOffset(order);
    const duration = getOrderDuration(order);
    schedulePlans[order.id] = { dayOffset, duration, window: `${planDays[dayOffset]}-${planDays[Math.min(planDays.length - 1, dayOffset + duration - 1)]}` };
  }
  return schedulePlans[order.id];
}

function getOrderDayOffset(order) {
  const match = order.id.match(/(\d+)$/);
  const numeric = match ? Number(match[1]) : 1;
  const base = { "Line-A": 0, "Line-B": 1, "Line-C": 2 }[order.line] || 0;
  return Math.min(planDays.length - 1, (numeric + base) % 5);
}

function getOrderDuration(order) {
  if (order.qty >= 1500) return 3;
  if (order.qty >= 800 || order.risk !== "正常") return 2;
  return 1;
}

function getKitCheck(order) {
  const backendRecord = backendState?.kitChecks?.[order.id] || window.MES_BACKEND?.runKitCheck?.(backendState || window.MES_BACKEND.read(), order.id, { persist: false, audit: false });
  if (backendRecord) {
    return {
      status: normalizeKitStatus(backendRecord.status),
      owner: backendRecord.owner,
      materials: backendRecord.materials,
      locked: backendRecord.materials.some((item) => item.locked > 0),
      substituteApplied: backendRecord.materials.some((item) => item.qualityGate?.includes("替代")),
      result: backendRecord.result,
      stage: backendRecord.stage,
      checkedAt: backendRecord.checkedAt,
    };
  }
  const base = buildKitCheck(order);
  const stored = kitChecks[order.id];
  if (!stored) return base;
  const status = normalizeKitStatus(stored.status) || base.status;
  const confirmed = status === "齐套" && Number(stored.gap || 0) === 0;
  return {
    ...base,
    ...stored,
    status,
    owner: stored.owner || base.owner,
    materials: confirmed ? base.materials.map((item) => ({ ...item, available: Math.max(item.available, item.need), gap: 0 })) : base.materials,
    locked: Boolean(stored.locked || confirmed),
  };
}

function normalizeKitStatus(status) {
  if (!status) return "";
  if (status.includes("齐套已确认") || status === "齐套") return "齐套";
  if (status.includes("缺口") || status.includes("缺料")) return "缺料";
  if (status.includes("替代")) return "待替代";
  if (status.includes("复核") || status.includes("检查")) return "待检查";
  return status;
}

function buildKitCheck(order) {
  const shortageQty = getShortageQty(order);
  const materials = getMaterials(order, shortageQty);
  const status = order.kit === "齐套" ? "齐套" : shortageQty > 0 ? (order.risk === "缺料" ? "缺料" : "待替代") : "待检查";
  return {
    status,
    owner: shortageQty > 0 ? "物料员" : "计划员",
    materials,
    locked: false,
    substituteApplied: false,
  };
}

function getShortageQty(order) {
  const match = `${order.kit} ${order.materialGap}`.match(/缺\s*(\d+)/);
  if (match) return Number(match[1]);
  if (order.risk === "缺料") return Math.max(80, Math.round(order.qty * 0.18));
  if (order.kit === "待检查") return Math.max(40, Math.round(order.qty * 0.12));
  return 0;
}

function getMaterials(order, shortageQty) {
  const backendRecord = backendState?.kitChecks?.[order.id];
  if (backendRecord?.materials?.length) return backendRecord.materials;
  const masterMaterials = window.MES_MASTER_DATA?.getBomMaterials?.(order.productCode || order.product, order.qty);
  if (masterMaterials?.length) {
    return masterMaterials.map((item) => {
      const shortageName = order.materialGap || order.kit || "";
      const isShortageMaterial = shortageName.includes(item.name) || shortageName.includes(item.materialNo);
      const targetGap = isShortageMaterial && shortageQty > 0 ? shortageQty : item.gap;
      const available = Math.max(0, item.need - targetGap - item.transit);
      return enrichMaterial(order, { ...item, available, gap: Math.max(0, item.need - available - item.transit) });
    });
  }
  const base = [
    { materialNo: "MAT-PCB-TCU", name: "PCB 主板", need: order.qty, available: order.qty + 80, transit: 0, eta: "库存可用", substitute: "无", operation: "10 SMT 贴片", station: "SMT-WS-01" },
    { materialNo: order.product.includes("电源") ? "MAT-PWR-IC60" : "MAT-SEN-T100", name: order.product.includes("电源") ? "电源芯片" : "温度传感器", need: order.qty, available: Math.max(0, order.qty - shortageQty), transit: shortageQty ? Math.ceil(shortageQty * 0.7) : 0, eta: shortageQty ? "06-22 下午" : "库存可用", substitute: shortageQty ? "可评估替代批" : "无", operation: "20 DIP 插件", station: order.line === "Line-B" ? "DIP-B-01" : "DIP-A-02" },
    { materialNo: "MAT-CASE-TOP", name: "外壳组件", need: order.qty, available: order.qty + 120, transit: 0, eta: "库存可用", substitute: "无", operation: "40 整机装配", station: order.line === "Line-C" ? "ASM-C-01" : "ASM-A-01" },
    { materialNo: "MAT-BOX-A", name: "包装材料", need: order.qty, available: order.qty + 60, transit: 0, eta: "库存可用", substitute: "无", operation: "80 包装", station: "PACK-A-01" },
  ];
  return base.map((item) => enrichMaterial(order, { ...item, gap: Math.max(0, item.need - item.available - item.transit) }));
}

function enrichMaterial(order, item) {
  const available = Math.max(0, item.available || 0);
  const transit = Math.max(0, item.transit || 0);
  const gap = Math.max(0, item.gap || item.need - available - transit);
  const firstBatch = Math.max(0, Math.min(order.qty, available));
  const materialStatus = getMaterialStatus(item, gap);
  const process = inferMaterialProcess(order, item);
  return {
    unit: "PCS",
    source: "PLM BOM + WMS 库存 + QMS IQC",
    operation: item.operation || process.operation,
    station: item.station || process.station,
    batchControl: item.batchControl || (item.name.includes("螺丝") ? "可选批次" : "批次必扫"),
    antiError: item.antiError || "料号 + 批次 + IQC + 线边库位校验",
    batch: getMaterialBatch(item),
    qualityGate: getQualityGate(item, gap),
    ownerAction: getOwnerAction(item, gap),
    impact: getMaterialImpact(order, gap, firstBatch),
    firstBatch,
    statusTime,
    ...item,
    available,
    transit,
    gap,
    materialStatus,
  };
}

function inferMaterialProcess(order, item) {
  const text = `${item.materialNo || ""} ${item.name || ""}`;
  if (/PCB|电阻|驱动芯片|DRV|SMT/.test(text)) return { operation: "10 SMT 贴片", station: order.line === "Line-B" ? "SMT-B-01" : "SMT-WS-01" };
  if (/传感器|电源芯片|PWR|SEN/.test(text)) return { operation: "20 DIP 插件", station: order.line === "Line-B" ? "DIP-B-01" : "DIP-A-02" };
  if (/显示屏|外壳|螺丝|CASE|DISPLAY|SCREW/.test(text)) return { operation: "40 整机装配", station: order.line === "Line-C" ? "ASM-C-01" : order.line === "Line-B" ? "ASM-B-01" : "ASM-A-01" };
  if (/包装|BOX/.test(text)) return { operation: "80 包装", station: order.line === "Line-C" ? "PACK-C-02" : "PACK-A-01" };
  return { operation: "20 DIP 插件", station: order.line === "Line-B" ? "DIP-B-01" : "DIP-A-02" };
}

function getMaterialBatch(item) {
  const batches = {
    "MAT-SEN-T100": "SEN-L20260605",
    "MAT-PWR-IC60": "PWRIC-L20260602",
    "MAT-PCB-TCU": "PCB-L20260608",
    "MAT-CASE-TOP": "CASE-TOP-L20260612",
    "MAT-CASE-BOT": "CASE-BOT-L20260612",
    "MAT-DISPLAY-24": "DSP-L20260610",
    "MAT-BOX-A": "BOXA-L20260614",
  };
  return batches[item.materialNo] || `${(item.materialNo || "MAT").replace("MAT-", "")}-L202606`;
}

function getQualityGate(item, gap) {
  if ((item.eta || "").includes("MRB") || (item.substitute || "").includes("待审批")) return "QMS：冻结 / 待 MRB";
  if (gap > 0) return "IQC 合格批不足";
  return "IQC 合格，可锁库";
}

function getMaterialStatus(item, gap) {
  if ((item.eta || "").includes("MRB") || (item.substitute || "").includes("待审批")) return "冻结待放行";
  if (gap > 0) return "缺口待处理";
  if ((item.transit || 0) > 0) return "在途待签收";
  return "可投批次";
}

function getOwnerAction(item, gap) {
  if ((item.substitute || "").includes("待审批")) return "质量 + 物料：MRB / 替代料审批";
  if (gap > 0) return "采购催料 / 物料拆批 / 计划调整";
  if ((item.transit || 0) > 0) return "WMS 到货签收后复核齐套";
  return "物料员锁库并转领料申请";
}

function getMaterialImpact(order, gap, firstBatch) {
  if (gap > 0 && firstBatch > 0) return `首批 ${firstBatch} 台可放行，余量待补料`;
  if (gap > 0) return "当前工序不可放行";
  if (order.risk === "资料") return "资料确认后可进入开工准入";
  return "可生成领料申请";
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || getFilteredOrders()[0] || orders[0];
}

function getFilteredOrders() {
  const keyword = state.search.trim().toLowerCase();
  return orders.filter((order) => {
    const kit = getKitCheck(order);
    const text = `${order.id} ${order.product} ${order.customer} ${order.materialGap} ${kit.materials.map((item) => item.name).join(" ")}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const kitMatch = state.kit === "all" || kit.status === state.kit;
    const lineMatch = state.line === "all" || order.line === state.line;
    return keywordMatch && kitMatch && lineMatch;
  });
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderMaterialTable();
  renderDetail();
  renderLogs();
  renderDetailVisibility();
}

function renderMetrics() {
  const checks = orders.map(getKitCheck);
  $("#metricPendingKit").textContent = checks.filter((item) => item.status === "待检查").length;
  $("#metricShortage").textContent = checks.filter((item) => item.status === "缺料").length;
  $("#metricReadyKit").textContent = checks.filter((item) => item.status === "齐套").length;
  $("#metricSubstitute").textContent = checks.filter((item) => item.status === "待替代").length;
}

function renderTable() {
  const visible = getFilteredOrders();
  $("#kitTableBody").innerHTML = visible.length ? visible.map((order) => {
    const kit = getKitCheck(order);
    const gap = kit.materials.reduce((sum, item) => sum + item.gap, 0);
    return `
      <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td>${order.line}</td>
        <td>${getPlan(order).window}</td>
        <td><span class="pill pill--${getKitStyle(kit.status)}">${kit.status}</span></td>
        <td>${gap ? `${gap} 件` : "无缺口"}</td>
        <td>${kit.owner}</td>
        <td><div class="kit-action-cell"><button class="kit-confirm-button" type="button" data-action="confirm" data-order-id="${order.id}" title="确认齐套" aria-label="确认 ${order.id} 齐套">✓</button></div></td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="8">当前筛选条件下没有齐套检查记录</td></tr>`;

  $("#kitTableBody").querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#kitTableBody").querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeOrderId = button.dataset.orderId;
      state.detailOpen = true;
      confirmKit(button.dataset.orderId);
    });
  });
}

function renderDetailVisibility() {
  $("#kitLayout").classList.toggle("is-detail-closed", !state.detailOpen);
  $("#kitDetailPanel").classList.toggle("is-closed", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
}

function renderMaterialTable() {
  const rows = getFilteredOrders().flatMap((order) => {
    return getKitCheck(order).materials.filter((item) => item.gap > 0 || item.transit > 0).map((item) => ({ order, item }));
  });
  $("#materialTableBody").innerHTML = rows.length ? rows.map(({ order, item }) => `
    <tr>
      <td class="material-name-cell"><strong>${item.name}</strong><span>${item.materialNo || order.id}</span></td>
      <td>${item.source}</td>
      <td>${item.operation}<span class="cell-subtext">${item.station}</span></td>
      <td>${item.need} ${item.unit || "PCS"}</td>
      <td>${item.available}</td>
      <td>${item.transit}<span class="cell-subtext">${item.eta}</span></td>
      <td><span class="pill pill--${item.gap ? "red" : "orange"}">${item.gap ? `${item.gap} 件` : "待签收"}</span></td>
      <td>${item.impact}</td>
      <td>${item.ownerAction}</td>
    </tr>
  `).join("") : `<tr><td colspan="9">当前筛选范围内没有缺料或在途物料</td></tr>`;
}

function renderDetail() {
  const order = getActiveOrder();
  const kit = getKitCheck(order);
  const gap = kit.materials.reduce((sum, item) => sum + item.gap, 0);
  $("#detailKitStatus").textContent = kit.status;
  $("#detailOrderId").textContent = order.id;
  $("#detailProduct").textContent = order.product;
  $("#detailGrid").innerHTML = [
    ["客户", order.customer],
    ["数量", `${order.qty} 台`],
    ["产线", order.line],
    ["计划窗口", getPlan(order).window],
    ["齐套", kit.status],
    ["缺口", gap ? `${gap} 件` : "无缺口"],
    ["批次", order.batchPlan],
    ["风险", order.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#bomList").innerHTML = kit.materials.map((item) => `
    <div class="bom-card">
      <span>${item.operation}</span>
      <strong>${item.name}<small>${item.materialNo || ""} · ${item.batchControl} · ${item.antiError}</small></strong>
      <b>需求 ${item.need} / 可用 ${item.available} / 在途 ${item.transit}<small>${item.batch} · ${item.qualityGate}</small></b>
      <em class="${item.gap ? "is-short" : item.transit ? "is-pending" : ""}">${item.gap ? `缺 ${item.gap}` : item.transit ? "在途" : "齐套"}</em>
    </div>
  `).join("");

  $("#supplyList").innerHTML = kit.materials.filter((item) => item.gap || item.transit || item.substitute !== "无").map((item) => `
    <div class="supply-card">
      <span>${item.materialStatus}</span>
      <strong>${item.name}<small>承诺：${item.eta} · 替代：${item.substitute}</small></strong>
      <b>${item.ownerAction}<small>${item.impact} · ${item.statusTime}</small></b>
      <em class="${item.gap ? "is-pending" : ""}">${item.gap ? "需闭环" : "可覆盖"}</em>
    </div>
  `).join("") || `<div class="supply-card"><span>无</span><strong>当前订单无需补料或替代料<small>库存已满足计划窗口需求</small></strong><b>转领料申请<small>WMS 锁库后由线边库签收</small></b><em>齐套</em></div>`;
}

function getKitStyle(status) {
  if (status === "齐套") return "green";
  if (status === "缺料") return "red";
  if (status === "待替代") return "orange";
  return "blue";
}

function confirmKit(orderId) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  const record = window.MES_BACKEND?.confirmKit?.(orderId, order.planner || "物料员 吴琳");
  loadState();
  if (record?.gap > 0) {
    saveState();
    renderAll();
    showToast("仍存在缺口，不能确认齐套");
    return;
  }
  updateOrder(orderId, { kit: "齐套", risk: order.risk === "缺料" ? "正常" : order.risk, materialGap: "齐套" }, "齐套检查已确认", { skipFlow: true });
}

function updateOrder(orderId, patch, message, options = {}) {
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) return;
  orders[index] = { ...orders[index], ...patch };
  state.activeOrderId = orderId;
  if (!options.skipFlow) window.MES_BUSINESS_FLOW?.upsertOrder?.(orders[index], { action: message });
  recordIntegration(orderId, message);
  loadState();
  saveState();
  renderAll();
  showToast(message);
}

function recordIntegration(orderId, action) {
  const existing = integrationLogs.some((log) => log.orderId === orderId && log.action.includes(action));
  if (existing) return;
  integrationLogs = [{ orderId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) }, ...integrationLogs].slice(0, 50);
}

function renderLogs() {
  const order = getActiveOrder();
  const logs = integrationLogs.filter((log) => !order || log.orderId === order.id).slice(0, 4);
  $("#kitLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>齐套检查动作会在这里留下记录</strong><em>待处理</em></div>`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

window.addEventListener("plan-maintenance:changed", () => {
  loadState();
  renderAll();
});

function bindEvents() {
  $("#kitSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#kitFilter").addEventListener("change", (event) => {
    state.kit = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#confirmKitBtn").addEventListener("click", () => confirmKit(getActiveOrder().id));
  $("#applySubstituteBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    window.MES_BACKEND?.approveSubstitute?.(order.id, "质量员 孟可");
    loadState();
    saveState();
    renderAll();
    showToast("替代料审批已写入模拟后端");
  });
  $("#splitBatchBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    window.MES_BACKEND?.splitBatch?.(order.id, "计划员 周计划");
    loadState();
    saveState();
    renderAll();
    showToast("拆批建议已写入模拟后端");
  });
  $("#escalateBuyerBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    window.MES_BACKEND?.escalateShortage?.(order.id, "物料异常协调员 何敏");
    loadState();
    updateOrder(order.id, { risk: "缺料", kit: "缺料待补", materialGap: "采购到货承诺需升级确认" }, "已登记采购协同请求", { skipFlow: true });
  });
  $("#lockMaterialBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    window.MES_BACKEND?.lockInventory?.(order.id, "物料员 吴琳");
    loadState();
    saveState();
    renderAll();
    showToast("已生成锁库请求，等待 WMS 回执或 MES 库存保留复核");
  });
  $("#releaseScheduleBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    if (getKitCheck(order).status !== "齐套") {
      showToast("请先确认齐套再放行排程");
      return;
    }
    window.MES_BACKEND?.releaseSchedule?.(order.id, "计划员 周计划");
    loadState();
    updateOrder(order.id, { schedule: order.schedule === "未排程" ? "待排程" : order.schedule }, "齐套已同步排程与备料", { skipFlow: true });
  });
  $("#batchKitBtn").addEventListener("click", () => {
    const targets = orders.filter((order) => getKitCheck(order).status === "待检查" && order.risk === "正常");
    targets.forEach((order) => confirmKit(order.id));
    showToast(targets.length ? `已确认 ${targets.length} 个低风险订单齐套` : "没有可批量确认的低风险订单");
  });
  $("#resetKitPageBtn").addEventListener("click", () => {
    const flowState = window.MES_BUSINESS_FLOW?.reset?.();
    window.MES_BACKEND?.reset?.();
    orders = structuredClone(flowState?.orders || window.MES_MASTER_DATA?.orders || initialOrders);
    schedulePlans = {};
    integrationLogs = [];
    kitChecks = {};
    state = { activeOrderId: "MO-202606-0005", search: "", kit: "all", line: "all", detailOpen: true };
    $("#kitSearch").value = "";
    $("#kitFilter").value = "all";
    $("#lineFilter").value = "all";
    renderAll();
    showToast("齐套演示已重置");
  });
  $("#closeDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailVisibility();
  });
  $("#openDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailVisibility();
  });
}

loadState();
renderFrameMenu();
$("#kitSearch").value = state.search;
$("#kitFilter").value = state.kit;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
