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
const resources = [
  { id: "Line-A", name: "Line-A", type: "line", label: "装配产线", dailyHours: 12, calendar: "CAL-LINE-A-202606", source: "APS 产能日历 / 产线车间", owner: "计划主管 李敏", exceptions: { "06-21": -2, "06-22": -1 }, note: "白班 08:00-20:00；老化房保养不释放装配产能" },
  { id: "Line-B", name: "Line-B", type: "line", label: "装配产线", dailyHours: 14, calendar: "CAL-LINE-B-202606", source: "APS + 设备保养计划", owner: "计划主管 李敏", exceptions: { "06-20": -2, "06-24": 2 }, note: "白班 08:00-20:00 / 加班 20:00-22:00；测试故障复测扣减" },
  { id: "Line-C", name: "Line-C", type: "line", label: "装配产线", dailyHours: 10, calendar: "CAL-LINE-C-202606", source: "MES 资源模型", owner: "包装主管 李娟", exceptions: { "06-23": -2 }, note: "白班 08:00-18:00；客户稽核预留窗口扣减" },
  { id: "Test-A", name: "功能测试", type: "bottleneck", label: "测试工位", dailyHours: 14, calendar: "CAL-TEST-A-202606", source: "工序工位 / 测试台 API", owner: "测试工程师 周启", exceptions: { "06-22": -1 }, note: "Test-A 测试台 2 工位并行，程序切换计入换型" },
  { id: "Test-B", name: "功能测试 B", type: "bottleneck", label: "测试工位", dailyHours: 12, calendar: "CAL-TEST-B-202606", source: "工序工位 / 设备保养计划", owner: "设备工程师 周启", exceptions: { "06-20": -2, "06-24": 2 }, note: "Test-B2 故障复测窗口暂不释放；加班需车间主任确认" },
  { id: "Aging-Room-1", name: "老化房", type: "bottleneck", label: "瓶颈资源", dailyHours: 16, calendar: "CAL-AGING-202606", source: "APS 产能日历 / 老化房 HMI", owner: "设备员 赵宁", exceptions: { "06-21": -2 }, note: "按老化批次占用房间小时，容量 800 台/批" },
  { id: "QC-Final", name: "FQC", type: "bottleneck", label: "质量检验", dailyHours: 12, calendar: "CAL-QC-FINAL-202606", source: "QMS 抽样计划 / 检验终端", owner: "质量工程师 孟可", exceptions: { "06-23": -1 }, note: "按抽样方案和放行复核折算检验工时" },
];

const lineOperations = {
  "Line-A": [
    { code: "SMT", name: "SMT 贴片", station: "SMT-WS-01", setup: 1.2, cycleMin: 0.42, parallel: 1, source: "工艺路线 + SMT 节拍" },
    { code: "DIP", name: "DIP 插件", station: "DIP-A-02", setup: 0.8, cycleMin: 0.36, parallel: 1, source: "工艺路线 + 工位节拍" },
    { code: "烧录", name: "程序烧录", station: "BURN-A-01", setup: 0.6, cycleMin: 0.18, parallel: 2, source: "烧录设备 API" },
    { code: "装配", name: "整机装配", station: "ASM-A-01", setup: 1, cycleMin: 0.52, parallel: 2, source: "装配工位标准工时" },
    { code: "包装", name: "包装入库", station: "PACK-A-01", setup: 0.4, cycleMin: 0.16, parallel: 1, source: "包装工位标准工时" },
  ],
  "Line-B": [
    { code: "SMT", name: "SMT 贴片", station: "SMT-B-01", setup: 1, cycleMin: 0.38, parallel: 1, source: "工艺路线 + SMT-B 节拍" },
    { code: "DIP", name: "DIP 插件", station: "DIP-B-01", setup: 0.7, cycleMin: 0.32, parallel: 1, source: "插件工位标准工时" },
    { code: "烧录", name: "程序烧录", station: "BURN-B-01", setup: 0.5, cycleMin: 0.16, parallel: 2, source: "烧录设备 API" },
    { code: "装配", name: "整机装配", station: "ASM-B-01", setup: 0.8, cycleMin: 0.44, parallel: 2, source: "装配工位标准工时" },
    { code: "包装", name: "包装入库", station: "PACK-B-01", setup: 0.4, cycleMin: 0.14, parallel: 1, source: "包装工位标准工时" },
  ],
  "Line-C": [
    { code: "装配", name: "装配", station: "ASM-C-01", setup: 0.7, cycleMin: 0.5, parallel: 1, source: "装配工位标准工时" },
    { code: "包装", name: "包装", station: "PACK-C-02", setup: 0.4, cycleMin: 0.18, parallel: 1, source: "包装工位标准工时" },
  ],
};

const bottleneckOperations = {
  测试: { resourceByLine: { "Line-A": "Test-A", "Line-B": "Test-B", "Line-C": "Test-A" }, setup: 0.7, cycleMin: 0.82, parallel: 2, reworkRate: 0.04, source: "测试程序版本 + 测试台 API" },
  功能测试: { resourceByLine: { "Line-A": "Test-A", "Line-B": "Test-B", "Line-C": "Test-A" }, setup: 0.7, cycleMin: 0.82, parallel: 2, reworkRate: 0.04, source: "测试程序版本 + 测试台 API" },
  老化: { resourceId: "Aging-Room-1", setup: 0.5, chamberCapacity: 800, holdHours: 8, source: "老化曲线规格 + 老化房 HMI" },
  FQC: { resourceId: "QC-Final", setup: 0.6, sampleRate: 0.12, cycleMin: 4, recheckRate: 0.03, source: "QMS 抽样方案 + FQC 检验终端" },
};

let orders = structuredClone(window.MES_MASTER_DATA?.orders || initialOrders);
let schedulePlans = {};
let integrationLogs = [];
let capacityConfig = { calendarOverrides: [], resourceConstraints: {}, balanceAdvices: [] };
let state = {
  activeResourceId: "Aging-Room-1",
  search: "",
  resourceType: "all",
  load: "all",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "产能负荷" ? " class=\"is-active\"" : "";
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
    const flowState = window.MES_BUSINESS_FLOW?.read?.();
    if (flowState?.orders) {
      orders = flowState.orders;
      integrationLogs = flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time }));
    }
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    orders = flowState?.orders || saved.orders || orders;
    schedulePlans = saved.schedulePlans || schedulePlans;
    integrationLogs = flowState?.logs ? flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) : saved.integrationLogs || integrationLogs;
    capacityConfig = { ...capacityConfig, ...(saved.capacityConfig || {}) };
    state = { ...state, ...(saved.capacityState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, schedulePlans, integrationLogs, capacityConfig, capacityState: state }));
}

function getPlan(order) {
  if (!schedulePlans[order.id] || typeof schedulePlans[order.id].dayOffset !== "number" || !schedulePlans[order.id].window) {
    schedulePlans[order.id] = buildPlan(order);
  }
  return schedulePlans[order.id];
}

function buildPlan(order) {
  const dayOffset = getOrderDayOffset(order);
  const duration = getOrderDuration(order);
  const hasGap = order.kit !== "齐套" || order.risk === "缺料";
  const firstBatch = hasGap ? Math.max(order.qty - 200, Math.ceil(order.qty * 0.72)) : order.qty;
  const secondBatch = Math.max(order.qty - firstBatch, 0);
  return {
    batchPlan: secondBatch ? `${firstBatch} + ${secondBatch}` : `${order.qty}`,
    dayOffset,
    duration,
    window: `${planDays[dayOffset]}-${planDays[Math.min(planDays.length - 1, dayOffset + duration - 1)]}`,
  };
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

function getProductCode(order) {
  if (order.productCode) return order.productCode;
  const product = window.MES_MASTER_DATA?.products?.find((item) => order.product?.includes(item.code) || item.name === order.product);
  return product?.code || order.product?.match(/[A-Z]{2,4}-\d+/)?.[0] || "";
}

function getRoutingSteps(order) {
  const routing = window.MES_MASTER_DATA?.routingByProduct?.(getProductCode(order));
  return (routing?.steps || defaultRoutingSteps(order)).split(">").map((item) => item.trim()).filter(Boolean);
}

function defaultRoutingSteps(order) {
  if (order.line === "Line-C") return "装配>测试>FQC>包装";
  if (order.line === "Line-B") return "SMT>烧录>功能测试>FQC>包装";
  return "SMT>DIP>烧录>装配>测试>老化>FQC>包装";
}

function getEffectiveHours(resource, day) {
  const overrides = (capacityConfig.calendarOverrides || []).filter((item) => item.resourceId === resource.id && item.day === day && item.status !== "已撤回");
  const maintainedDelta = overrides.reduce((sum, item) => sum + Number(item.hoursDelta || 0), 0);
  return Math.max(0, resource.dailyHours + (resource.exceptions?.[day] || 0) + maintainedDelta);
}

function getAvailableHours(resource) {
  return planDays.reduce((sum, day) => sum + getEffectiveHours(resource, day), 0);
}

function getBatchQty(order) {
  const plan = getPlan(order);
  const batchText = plan.batchPlan || order.batchPlan || "";
  const firstBatch = Number(String(batchText).match(/\d+/)?.[0]);
  if (Number.isFinite(firstBatch) && firstBatch > 0) return Math.min(order.qty, firstBatch);
  return order.qty;
}

function roundHours(value) {
  return Math.round(value * 10) / 10;
}

function calcOperationHours(order, operation) {
  const constrained = getConstrainedOperation(operation);
  const batchQty = getBatchQty(order);
  if (constrained.chamberCapacity) {
    const batches = Math.max(1, Math.ceil(batchQty / constrained.chamberCapacity));
    return roundHours(constrained.setup + (batches * constrained.holdHours));
  }
  const adjustedQty = constrained.reworkRate ? Math.ceil(batchQty * (1 + constrained.reworkRate)) : batchQty;
  const sampledQty = constrained.sampleRate ? Math.max(1, Math.ceil(adjustedQty * constrained.sampleRate)) : adjustedQty;
  return roundHours(constrained.setup + ((sampledQty * constrained.cycleMin) / 60 / (constrained.parallel || 1)));
}

function getConstrainedOperation(operation) {
  const resourceId = operation.resourceId || "";
  const constraint = resourceId ? capacityConfig.resourceConstraints?.[resourceId] : null;
  if (!constraint) return operation;
  return {
    ...operation,
    parallel: Number(constraint.parallel || operation.parallel || 1),
    chamberCapacity: Number(constraint.chamberCapacity || operation.chamberCapacity || 0) || operation.chamberCapacity,
    holdHours: Number(constraint.holdHours || operation.holdHours || 0) || operation.holdHours,
    sampleRate: Number(constraint.sampleRate || operation.sampleRate || 0) || operation.sampleRate,
    source: `${operation.source} + 计划资源约束`,
  };
}

function getOperationAllocations(order) {
  const steps = getRoutingSteps(order);
  const allocations = [];
  steps.forEach((step) => {
    if (step === "FQC") {
      const operation = { ...bottleneckOperations.FQC };
      allocations.push({ resourceId: operation.resourceId, step, station: "QC-FINAL", hours: calcOperationHours(order, operation), source: operation.source });
      return;
    }
    const bottleneck = bottleneckOperations[step];
    if (bottleneck) {
      const resourceId = bottleneck.resourceId || bottleneck.resourceByLine?.[order.line] || "Test-A";
      const operation = { ...bottleneck, resourceId };
      const station = step.includes("测试") || step === "测试" ? `${resourceId}-01` : resourceId;
      allocations.push({ resourceId, step, station, hours: calcOperationHours(order, operation), source: operation.source });
      return;
    }
    const lineOp = (lineOperations[order.line] || []).find((item) => item.code === step || item.name.includes(step) || step.includes(item.code));
    if (lineOp) {
      allocations.push({ resourceId: order.line, step, station: lineOp.station, hours: calcOperationHours(order, lineOp), source: lineOp.source });
    }
  });
  if (!allocations.some((item) => item.resourceId === order.line)) {
    const fallback = (lineOperations[order.line] || lineOperations["Line-A"])[0];
    allocations.unshift({ resourceId: order.line, step: fallback.code, station: fallback.station, hours: calcOperationHours(order, fallback), source: fallback.source });
  }
  return allocations;
}

function getResourceOrderAllocation(order, resource) {
  const allocations = getOperationAllocations(order).filter((item) => item.resourceId === resource.id);
  if (!allocations.length) return null;
  const hours = roundHours(allocations.reduce((sum, item) => sum + item.hours, 0));
  return {
    order,
    hours,
    steps: allocations.map((item) => item.step),
    stations: allocations.map((item) => item.station),
    sources: [...new Set(allocations.map((item) => item.source))],
  };
}

function getOrderHours(order, resource) {
  return getResourceOrderAllocation(order, resource)?.hours || 0;
}

function getScheduledOrders() {
  return orders.filter((order) => order.review === "已通过" && order.schedule !== "未排程");
}

function getResourceLoads(resource) {
  const loads = planDays.map((day) => ({ day, used: 0, available: getEffectiveHours(resource, day), orders: [], operations: [] }));
  getScheduledOrders().forEach((order) => {
    const plan = getPlan(order);
    const allocation = getResourceOrderAllocation(order, resource);
    if (!allocation?.hours) return;
    const perDay = Math.ceil((allocation.hours / plan.duration) * 10) / 10;
    for (let index = plan.dayOffset; index < Math.min(planDays.length, plan.dayOffset + plan.duration); index += 1) {
      loads[index].used += perDay;
      loads[index].orders.push(order);
      loads[index].operations.push({ orderId: order.id, steps: allocation.steps, stations: allocation.stations, hours: perDay });
    }
  });
  return loads.map((item) => ({ ...item, used: roundHours(item.used), percent: item.available ? Math.round((item.used / item.available) * 100) : 0, status: getLoadStatus(item.available ? item.used / item.available : 0) }));
}

function getLoadStatus(rate) {
  if (rate > 1) return "over";
  if (rate >= 0.86) return "tight";
  if (rate < 0.55) return "idle";
  return "normal";
}

function getVisibleResources() {
  return resources.filter((resource) => {
    const typeMatch = state.resourceType === "all" || resource.type === state.resourceType;
    const loadMatch = state.load === "all" || getResourceLoads(resource).some((item) => item.status === state.load);
    return typeMatch && loadMatch;
  });
}

function getActiveResource() {
  return getVisibleResources().find((resource) => resource.id === state.activeResourceId) || getVisibleResources()[0] || resources.find((resource) => resource.id === state.activeResourceId) || resources[0];
}

function renderAll() {
  renderMetrics();
  renderMatrix();
  renderOrderTable();
  renderDetail();
}

function renderMetrics() {
  const allLoads = resources.flatMap((resource) => getResourceLoads(resource));
  const average = allLoads.length ? Math.round(allLoads.reduce((sum, item) => sum + item.percent, 0) / allLoads.length) : 0;
  const overload = allLoads.filter((item) => item.status === "over").length;
  const bottleneck = resources.map((resource) => {
    const peak = Math.max(...getResourceLoads(resource).map((item) => item.percent));
    return { resource, peak };
  }).sort((a, b) => b.peak - a.peak)[0];
  const slack = resources.reduce((sum, resource) => {
    return sum + getResourceLoads(resource).reduce((inner, item) => inner + Math.max(0, item.available - item.used), 0);
  }, 0);
  $("#metricAvgLoad").textContent = `${average}%`;
  $("#metricOverload").textContent = overload;
  $("#metricBottleneck").textContent = bottleneck ? bottleneck.resource.name : "-";
  $("#metricSlack").textContent = `${slack}h`;
}

function renderMatrix() {
  const visible = getVisibleResources();
  $("#loadMatrix").innerHTML = `
    <div class="load-head">
      <div>资源</div>
      ${planDays.map((day) => `<div>${day}</div>`).join("")}
    </div>
    ${visible.map((resource) => {
      const loads = getResourceLoads(resource);
      return `
        <div class="load-row">
          <button class="load-resource${resource.id === state.activeResourceId ? " is-active" : ""}" type="button" data-resource-id="${resource.id}">
            <strong>${resource.name}</strong>
            <span>${resource.label} · ${resource.calendar}</span>
          </button>
          ${loads.map((item) => `
            <div class="load-cell is-${item.status}">
              <strong>${item.percent}%</strong>
              <span>${item.used}/${item.available}h · ${item.orders.length} 单</span>
              <div class="load-bar" style="--load:${item.percent}%"><i></i></div>
            </div>
          `).join("")}
        </div>
      `;
    }).join("")}
  `;

  $("#loadMatrix").querySelectorAll("[data-resource-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeResourceId = button.dataset.resourceId;
      saveState();
      renderAll();
    });
  });
}

function renderOrderTable() {
  const keyword = state.search.trim().toLowerCase();
  const resource = getActiveResource();
  if (!resource || !getVisibleResources().length) {
    $("#loadOrderBody").innerHTML = `<tr><td colspan="6">当前筛选条件下没有资源负荷数据</td></tr>`;
    return;
  }
  const rows = getScheduledOrders().filter((order) => {
    const allocation = getResourceOrderAllocation(order, resource);
    const text = `${order.id} ${order.product} ${order.customer} ${order.line} ${resource.name} ${allocation?.steps.join(" ") || ""} ${allocation?.stations.join(" ") || ""}`.toLowerCase();
    return getOrderHours(order, resource) > 0 && (!keyword || text.includes(keyword));
  });
  $("#loadOrderBody").innerHTML = rows.length ? rows.map((order) => {
    const plan = getPlan(order);
    const allocation = getResourceOrderAllocation(order, resource);
    const hours = allocation.hours;
    const planAvailable = planDays.slice(plan.dayOffset, Math.min(planDays.length, plan.dayOffset + plan.duration)).reduce((sum, day) => sum + getEffectiveHours(resource, day), 0);
    const impact = Math.round((hours / Math.max(1, planAvailable)) * 100);
    return `
      <tr>
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td><strong>${allocation.steps.join(" / ")}</strong><span>${allocation.stations.join("、")}</span></td>
        <td>${plan.window}</td>
        <td>${hours}h</td>
        <td><span class="pill pill--${impact > 85 ? "red" : impact > 65 ? "orange" : "green"}">${impact}%</span></td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="6">当前资源或筛选条件下没有订单占用</td></tr>`;
}

function renderDetail() {
  const resource = getActiveResource();
  if (!resource || !getVisibleResources().length) {
    $("#detailResourceType").textContent = "资源";
    $("#detailResourceName").textContent = "暂无匹配资源";
    $("#detailResourceMeta").textContent = "请调整资源类型或负荷状态筛选";
    $("#detailGrid").innerHTML = "";
    $("#dailyLoadList").innerHTML = "";
    $("#constraintList").innerHTML = "";
    $("#suggestionList").innerHTML = "";
    return;
  }
  const loads = getResourceLoads(resource);
  const peak = loads.reduce((max, item) => item.percent > max.percent ? item : max, loads[0]);
  const average = Math.round(loads.reduce((sum, item) => sum + item.percent, 0) / loads.length);
  $("#detailResourceType").textContent = resource.type === "line" ? "产线" : "关键资源";
  $("#detailResourceName").textContent = resource.name;
  $("#detailResourceMeta").textContent = `${resource.label} · ${resource.source}`;
  $("#detailGrid").innerHTML = [
    ["平均负荷", `${average}%`],
    ["峰值日期", peak.day],
    ["峰值负荷", `${peak.percent}%`],
    ["超载天数", `${loads.filter((item) => item.status === "over").length} 天`],
    ["有效产能", `${getAvailableHours(resource)}h`],
    ["占用订单", `${new Set(loads.flatMap((item) => item.orders.map((order) => order.id))).size} 单`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#dailyLoadList").innerHTML = loads.map((item) => `
    <div>
      <span>${item.day}</span>
      <strong>${item.used}/${item.available}h · ${item.operations.flatMap((operation) => operation.steps).join("、") || "无占用"}</strong>
      <em>${getStatusText(item.status)}</em>
    </div>
  `).join("");

  $("#constraintList").innerHTML = getConstraints(resource, loads).map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");

  $("#suggestionList").innerHTML = getSuggestions(resource, loads).map((item) => `
    <div>
      <span>${item.type}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner}</em>
    </div>
  `).join("");
}

function getStatusText(status) {
  if (status === "over") return "超载";
  if (status === "tight") return "偏紧";
  if (status === "idle") return "富余";
  return "正常";
}

function getConstraints(resource, loads) {
  const peak = loads.reduce((max, item) => item.percent > max.percent ? item : max, loads[0]);
  const maintainedDays = (capacityConfig.calendarOverrides || []).filter((item) => item.resourceId === resource.id && item.status !== "已撤回").map((item) => item.day);
  const exceptionDays = [...new Set([...planDays.filter((day) => resource.exceptions?.[day]), ...maintainedDays])];
  const topSteps = loads.flatMap((item) => item.operations).flatMap((item) => item.steps);
  const constraint = capacityConfig.resourceConstraints?.[resource.id];
  return [
    { label: "峰值", desc: `${peak.day} 达到 ${peak.percent}%`, status: peak.status === "over" ? "需调整" : "可控" },
    { label: "日历", desc: `${resource.calendar}，基准 ${resource.dailyHours}h/日`, status: exceptionDays.length ? `${exceptionDays.join("、")} 例外` : "正常" },
    { label: "约束", desc: constraint?.summary || resource.note, status: constraint?.owner || resource.owner },
    { label: "工序", desc: [...new Set(topSteps)].join("、") || "无占用", status: resource.type === "bottleneck" ? "重点看护" : "可跨线均衡" },
  ];
}

function getSuggestions(resource, loads) {
  const over = loads.find((item) => item.status === "over");
  const idle = loads.find((item) => item.status === "idle");
  if (over) {
    const maintainedAdvice = (capacityConfig.balanceAdvices || []).find((item) => item.resourceId === resource.id && item.status !== "已关闭");
    return [
      ...(maintainedAdvice ? [{ type: "已登记", desc: maintainedAdvice.summary, owner: maintainedAdvice.owner }] : []),
      { type: "移峰", desc: `${over.day} 超载，建议将低优先级订单后移 1 天`, owner: "计划" },
      { type: "拆批", desc: "大批量订单拆为首批生产和补料后续批", owner: "计划 / 物料" },
      { type: "加班", desc: `临时扩展 ${resource.name} 可用产能`, owner: "车间" },
    ];
  }
  if (idle) {
    const maintainedAdvice = (capacityConfig.balanceAdvices || []).find((item) => item.resourceId === resource.id && item.status !== "已关闭");
    return [
      ...(maintainedAdvice ? [{ type: "已登记", desc: maintainedAdvice.summary, owner: maintainedAdvice.owner }] : []),
      { type: "补产", desc: `${idle.day} 产能富余，可承接待调整订单`, owner: "计划" },
      { type: "提前", desc: "将已确认低风险订单提前释放备料", owner: "计划 / 仓储" },
    ];
  }
  const maintainedAdvice = (capacityConfig.balanceAdvices || []).find((item) => item.resourceId === resource.id && item.status !== "已关闭");
  return [
    ...(maintainedAdvice ? [{ type: "已登记", desc: maintainedAdvice.summary, owner: maintainedAdvice.owner }] : []),
    { type: "维持", desc: "当前负荷均衡，按已生成排程版本推送派工准备指令", owner: "计划" },
    { type: "监控", desc: "持续跟踪缺料和设备保养窗口", owner: "计划 / 设备" },
  ];
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
  $("#capacitySearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#resourceFilter").addEventListener("change", (event) => {
    state.resourceType = event.target.value;
    const visible = getVisibleResources();
    if (visible.length && !visible.some((resource) => resource.id === state.activeResourceId)) state.activeResourceId = visible[0].id;
    saveState();
    renderAll();
  });
  $("#loadFilter").addEventListener("change", (event) => {
    state.load = event.target.value;
    const visible = getVisibleResources();
    if (visible.length && !visible.some((resource) => resource.id === state.activeResourceId)) state.activeResourceId = visible[0].id;
    saveState();
    renderAll();
  });
  $("#focusOverloadBtn").addEventListener("click", () => {
    state.load = "over";
    $("#loadFilter").value = "over";
    const visible = getVisibleResources();
    if (visible.length) state.activeResourceId = visible[0].id;
    saveState();
    renderAll();
    showToast(visible.length ? "已定位超载资源" : "当前没有超载资源");
  });
  $("#balanceBtn").addEventListener("click", () => {
    const resource = getActiveResource();
    const overDays = getResourceLoads(resource).filter((item) => item.status === "over").length;
    showToast(overDays ? `已将 ${resource.name} 的移峰和拆批建议写入计划调整候选` : `${resource.name} 当前负荷可控`);
  });
  $("#resetCapacityPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    schedulePlans = {};
    integrationLogs = [];
    capacityConfig = { calendarOverrides: [], resourceConstraints: {}, balanceAdvices: [] };
    state = { activeResourceId: "Aging-Room-1", search: "", resourceType: "all", load: "all" };
    $("#capacitySearch").value = "";
    $("#resourceFilter").value = "all";
    $("#loadFilter").value = "all";
    renderAll();
    showToast("负荷演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#capacitySearch").value = state.search;
$("#resourceFilter").value = state.resourceType;
$("#loadFilter").value = state.load;
bindEvents();
renderAll();
