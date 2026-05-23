const STORAGE_KEY = "xingjigu_mes_production_orders_v2";

const modules = [
  { id: "workbench", title: "首页工作台", layer: "日常工作", color: "#007aff", mark: "首", items: ["生产总览", "今日待办", "异常提醒", "交期预警", "车间看板", "我的审批"] },
  { id: "orders", title: "订单与计划", layer: "计划部门", color: "#5856d6", mark: "计", items: ["生产订单", "订单评审", "生产排程", "产能负荷", "交期预警", "计划调整", "齐套检查"] },
  { id: "dispatch", title: "派工与生产任务", layer: "车间管理", color: "#34c759", mark: "任", items: ["派工单", "工序任务", "班组任务", "任务下达", "任务变更", "SOP 查看", "开工检查"] },
  { id: "station", title: "工位作业", layer: "现场操作", color: "#00a6a6", mark: "位", items: ["员工登录", "扫码开工", "工艺指导", "投料确认", "过程记录", "工序报工", "交接班"] },
  { id: "materials", title: "物料与线边库", layer: "物料管理", color: "#34c759", mark: "料", items: ["用料需求", "领料申请", "配送进度", "线边库存", "投料记录", "余料退回", "缺料预警"] },
  { id: "barcode", title: "条码与标签", layer: "现场标识", color: "#00a6a6", mark: "码", items: ["生产批次", "产品序列号", "物料标签", "成品标签", "箱码托盘码", "标签打印", "补打申请"] },
  { id: "quality", title: "质量检验", layer: "质量部门", color: "#ff3b30", mark: "质", items: ["来料检验", "首件检验", "巡检任务", "过程检验", "成品检验", "不良记录", "返工评审", "质量放行"] },
  { id: "equipment", title: "设备与保养", layer: "设备部门", color: "#ff9f0a", mark: "设", items: ["设备状态", "点检任务", "保养计划", "维修工单", "停机记录", "备件领用", "设备效率"] },
  { id: "process", title: "过程监控", layer: "生产现场", color: "#ff9f0a", mark: "控", items: ["实时产量", "设备运行", "工艺参数", "报警记录", "停机原因", "过程趋势", "电子看板"] },
  { id: "exceptions", title: "异常处理", layer: "现场协同", color: "#ff3b30", mark: "异", items: ["异常上报", "待处理异常", "停线申请", "缺料处理", "质量问题", "设备故障", "处理复盘"] },
  { id: "warehouse", title: "完工与入库", layer: "仓储协同", color: "#34c759", mark: "入", items: ["工序完工", "完工确认", "包装作业", "成品入库", "库存冻结", "退料入库", "单据同步"] },
  { id: "trace", title: "追溯查询", layer: "质量追溯", color: "#8e8e93", mark: "追", items: ["产品追溯", "批次追溯", "物料去向", "生产履历", "检验履历", "设备履历", "客户追溯报告"] },
  { id: "reports", title: "报表与看板", layer: "经营分析", color: "#8e8e93", mark: "表", items: ["生产日报", "良率分析", "交付达成", "设备效率", "停机损失", "物料损耗", "管理驾驶舱"] },
  { id: "basic", title: "基础资料", layer: "资料维护", color: "#007aff", mark: "基", items: ["产品资料", "物料资料", "BOM 清单", "工艺路线", "工序工位", "产线车间", "客户供应商"] },
  { id: "system", title: "系统设置", layer: "管理配置", color: "#6e6e73", mark: "系", items: ["人员账号", "角色权限", "审批设置", "单据同步", "消息提醒", "操作记录", "数据备份"] },
];

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
  { id: "MO-202606-0014", product: "工业网关 GW-240", customer: "B 客户", qty: 480, done: 0, due: "2026-07-04", line: "Line-B", status: "已排程", priority: "中", risk: "正常", review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "480", planner: "李计划", materialGap: "齐套" },
];

const planStartDate = "2026-06-20";
const planEndDate = "2026-07-31";
const planDays = ["06-20", "06-21", "06-22", "06-23", "06-24", "06-25", "06-26"];
const lines = ["Line-A", "Line-B", "Line-C"];
const timeOptions = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];
const timeOptionGroups = [
  { label: "白班", range: "06:00-17:00", values: timeOptions.slice(0, 12) },
  { label: "晚班", range: "18:00-23:00", values: timeOptions.slice(12) },
];
const resourcePools = {
  "Line-A": { SMT: "SMT-01", DIP: "DIP-Line-A", Assembly: "Assembly-A", Test: "Test-A", Aging: "Aging-Room-1", FQC: "QC-Final-A", Pack: "Pack-A" },
  "Line-B": { SMT: "SMT-02", DIP: "DIP-Line-B", Assembly: "Assembly-B", Test: "Test-B2", Aging: "Aging-Room-2", FQC: "QC-Final-B", Pack: "Pack-B" },
  "Line-C": { SMT: "SMT-03", DIP: "DIP-Line-C", Assembly: "Assembly-C", Test: "Test-C", Aging: "Aging-Room-1", FQC: "QC-Final-C", Pack: "Pack-C" },
};
const operationTemplates = [
  { key: "SMT", name: "SMT 贴片", startHour: 8, hours: 4, qtyRate: 520 },
  { key: "DIP", name: "DIP 插件", startHour: 13, hours: 5, qtyRate: 420 },
  { key: "Burn", name: "程序烧录", startHour: 8, hours: 4, qtyRate: 360, offset: 1 },
  { key: "Assembly", name: "整机装配", startHour: 13, hours: 5, qtyRate: 320, offset: 1 },
  { key: "Test", name: "功能测试", startHour: 8, hours: 6, qtyRate: 260, offset: 2 },
  { key: "Aging", name: "老化测试", startHour: 14, hours: 16, qtyRate: 120, offset: 2 },
  { key: "FQC", name: "FQC 成品检验", startHour: 8, hours: 4, qtyRate: 500, offset: 3 },
  { key: "Pack", name: "包装入库", startHour: 13, hours: 5, qtyRate: 600, offset: 3 },
];

let orders = structuredClone(window.MES_MASTER_DATA?.orders || initialOrders);
let integrationLogs = [];
let schedulePlans = {};
let state = {
  activeOrderId: "MO-202606-0005",
  search: "",
  schedule: "all",
  line: "all",
  timelineScale: "week",
  timelineView: "product",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "生产排程" ? " class=\"is-active\"" : "";
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
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "../dispatch/sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
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
    integrationLogs = flowState?.logs ? flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) : saved.integrationLogs || integrationLogs;
    schedulePlans = saved.schedulePlans || schedulePlans;
    state = { ...state, ...(saved.scheduleState || {}) };
    if (!["all", "未排程", "待调整"].includes(state.schedule)) state.schedule = "all";
    if (!["week", "month", "quarter", "half", "year"].includes(state.timelineScale)) state.timelineScale = "week";
    if (!["product", "line", "operation"].includes(state.timelineView)) state.timelineView = "product";
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, integrationLogs, schedulePlans, scheduleState: state }));
}

function getFlowScheduleStatus(order) {
  if (order.schedule === "已确认") return "已发布";
  if (order.schedule === "待调整") return "待约束确认";
  if (order.schedule === "未排程") return order.review === "已通过" ? "待排程" : "等待评审";
  return order.schedule || "待排程";
}

function syncScheduleFlow(orderIds, action) {
  const flowState = window.MES_BUSINESS_FLOW?.read?.();
  if (!flowState) return;
  const ids = Array.isArray(orderIds) ? orderIds : [orderIds];
  ids.forEach((orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;
    const plan = getPlan(order);
    const existingIndex = flowState.orders.findIndex((item) => item.id === order.id);
    if (existingIndex >= 0) flowState.orders[existingIndex] = { ...flowState.orders[existingIndex], ...order };
    else flowState.orders.unshift({ ...order });
    flowState.schedules[order.id] = {
      ...(flowState.schedules[order.id] || {}),
      orderId: order.id,
      status: getFlowScheduleStatus(order),
      batchPlan: plan.batchPlan,
      route: flowState.schedules[order.id]?.route || "SMT>DIP>烧录>装配>测试>老化>FQC>包装",
      line: order.line,
      window: plan.window,
      strategy: plan.strategy,
      bottleneck: plan.bottleneck,
      release: plan.release,
      constraints: plan.constraints,
      operations: plan.operations,
      version: plan.version,
      publishStatus: plan.publishStatus,
      conflicts: plan.conflicts,
      kitSummary: plan.kitSummary,
      linkages: plan.linkages,
    };
    if (order.schedule === "已确认") {
      flowState.dispatches[order.id] = {
        ...(flowState.dispatches[order.id] || {}),
        orderId: order.id,
        status: order.status === "已下达" ? "已下达" : "派工准备",
        route: flowState.schedules[order.id].route,
      };
      flowState.barcodeBatches[order.id] = {
        ...(flowState.barcodeBatches[order.id] || {}),
        orderId: order.id,
        status: order.status === "已下达" ? "等待现场使用" : "等待派工下发",
      };
    }
    flowState.logs = [{
      id: `FLOW-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      orderId: order.id,
      stage: "生产排程",
      action,
      owner: order.planner || "计划员",
      result: `${order.schedule}，${plan.window}，${plan.batchPlan}`,
      refs: [order.line, plan.bottleneck].filter(Boolean),
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    }, ...(flowState.logs || [])].slice(0, 160);
  });
  window.MES_BUSINESS_FLOW.write(flowState);
}

function syncPageStore() {
  const shape = window.MES_BUSINESS_FLOW?.getOrderStoreShape?.("scheduleState", state);
  if (!shape) {
    saveState();
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...shape, schedulePlans: { ...shape.schedulePlans, ...schedulePlans }, scheduleState: state }));
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || orders.find((order) => order.review === "已通过" && order.schedule !== "已确认") || orders[0];
}

function getProductCode(order) {
  if (order.productCode) return order.productCode;
  const product = window.MES_MASTER_DATA?.products?.find((item) => order.product?.includes(item.code));
  return product?.code || String(order.product || "").split(" ").at(-1) || "";
}

function getRoutingSteps(order) {
  const routing = window.MES_MASTER_DATA?.routingByProduct?.(getProductCode(order));
  const rawSteps = String(routing?.steps || "SMT>DIP>烧录>装配>测试>老化>FQC>包装").split(">").filter(Boolean);
  return rawSteps.map((step) => {
    if (/SMT|贴片/.test(step)) return "SMT";
    if (/DIP|插件/.test(step)) return "DIP";
    if (/烧录|程序/.test(step)) return "Burn";
    if (/装配/.test(step)) return "Assembly";
    if (/测试/.test(step)) return "Test";
    if (/老化/.test(step)) return "Aging";
    if (/FQC|检验/.test(step)) return "FQC";
    if (/包装|入库/.test(step)) return "Pack";
    return "Assembly";
  });
}

function getOrderMaterials(order) {
  return window.MES_MASTER_DATA?.getBomMaterials?.(getProductCode(order), order.qty) || [];
}

function getKitSummary(order, firstBatchQty) {
  const materials = getOrderMaterials(order);
  const totalNeed = materials.reduce((sum, item) => sum + item.need, 0);
  const totalAvailable = materials.reduce((sum, item) => sum + item.available + item.transit, 0);
  const totalGap = materials.reduce((sum, item) => sum + item.gap, 0);
  const gapItems = materials.filter((item) => item.gap > 0);
  const firstBatchReady = !gapItems.length || firstBatchQty <= Math.max(0, order.qty - totalGap);
  return {
    totalNeed,
    totalAvailable,
    totalGap,
    firstBatchReady,
    status: totalGap > 0 ? "缺口待处理" : "齐套可排",
    eta: gapItems[0]?.eta || "库存可用",
    items: gapItems.length ? gapItems : materials.slice(0, 3),
  };
}

function formatDayTime(dayIndex, hour) {
  const day = planDays[Math.min(planDays.length - 1, Math.max(0, dayIndex))];
  const normalizedHour = Math.max(0, Math.min(23, hour));
  return `${day} ${String(normalizedHour).padStart(2, "0")}:00`;
}

function getOperationTemplate(key) {
  return operationTemplates.find((item) => item.key === key) || operationTemplates[3];
}

function getOperationResource(order, key) {
  const pool = resourcePools[order.line] || resourcePools["Line-A"];
  if (key === "Burn") return `Burn-${order.line.slice(-1)}`;
  return pool[key] || pool.Assembly;
}

function getOperationStatus(order, key, hasMaterialGap) {
  if (order.schedule === "已确认") return "已确认";
  if (hasMaterialGap && ["DIP", "Assembly", "Pack"].includes(key)) return "待物料";
  if (order.risk === "设备" && ["Test", "Aging"].includes(key)) return "待设备";
  if (order.risk === "质量" && ["FQC", "Test"].includes(key)) return "待质量";
  return "建议";
}

function buildOperations(order, dayOffset, firstBatchQty, hasMaterialGap) {
  const steps = getRoutingSteps(order);
  return steps.map((key, index) => {
    const template = getOperationTemplate(key);
    const offset = typeof template.offset === "number" ? template.offset : index;
    const dayIndex = Math.min(planDays.length - 1, dayOffset + offset);
    const adjustedHours = Math.max(template.hours, Math.ceil(firstBatchQty / template.qtyRate) * 2);
    return {
      name: template.name,
      start: formatDayTime(dayIndex, template.startHour),
      end: formatDayTime(dayIndex, template.startHour + Math.min(10, adjustedHours)),
      resource: getOperationResource(order, key),
      qty: key === "Pack" && hasMaterialGap ? firstBatchQty : Math.min(order.qty, firstBatchQty),
      status: getOperationStatus(order, key, hasMaterialGap),
      routeStep: key,
      standard: `${template.qtyRate} 台/班参考节拍`,
      owner: key === "FQC" ? "质量员" : key === "Aging" || key === "Test" ? "设备员" : "车间计划员",
    };
  });
}

function getPlanVersion(order) {
  const suffix = order.schedule === "已确认" ? "V1" : order.schedule === "待调整" ? "D2" : "D1";
  return `SCH-${order.id}-${suffix}`;
}

function getPlanPublishStatus(order) {
  if (order.status === "已下达") return "已同步派工";
  if (order.schedule === "已确认") return "已发布";
  if (order.schedule === "待调整") return "草案待会签";
  return "草案";
}

function getConfirmedLinkageStatus(order) {
  if (order.status === "已下达") return { label: "已下发", style: "green" };
  if (["生产中", "待首检", "待检", "包装中"].includes(order.status)) return { label: "现场已接收", style: "green" };
  if (order.schedule === "已确认") return { label: "派工准备", style: "blue" };
  return { label: "待发布", style: "orange" };
}

function getPlanConflicts(order, dayOffset, duration, operations, kitSummary) {
  const conflicts = [];
  const related = orders.filter((item) => item.id !== order.id && item.review === "已通过" && item.schedule !== "未排程");
  operations.forEach((operation) => {
    const conflictOrders = related.filter((item) => {
      const targetOffset = getOrderDayOffset(item);
      const targetDuration = getOrderDuration(item);
      const targetResources = getRoutingSteps(item).map((key) => getOperationResource(item, key));
      return targetOffset <= dayOffset + duration - 1
        && targetOffset + targetDuration - 1 >= dayOffset
        && targetResources.includes(operation.resource);
    });
    if (conflictOrders.length) {
      conflicts.push({
        label: operation.resource,
        desc: `${operation.name} 与 ${conflictOrders.map((item) => item.id).slice(0, 2).join(" / ")} 占用重叠`,
        status: "需调整",
      });
    }
  });
  if (kitSummary.totalGap > 0) {
    conflicts.push({ label: "物料齐套", desc: `缺口 ${kitSummary.totalGap} 件，首批 ${kitSummary.firstBatchReady ? "可排" : "不可排"}`, status: "需物料会签" });
  }
  if (order.risk === "设备") conflicts.push({ label: "设备日历", desc: `${order.line} 关键设备保养或故障窗口待确认`, status: "需设备会签" });
  if (order.risk === "交期" || order.priority === "紧急") conflicts.push({ label: "交期承诺", desc: `${order.due} 前完成包装入库，需确认插单影响`, status: "需计划确认" });
  return conflicts.length ? conflicts.slice(0, 5) : [{ label: "资源占用", desc: "未发现同资源同窗口硬冲突", status: "可排" }];
}

function getPlanLinkages(order) {
  return [
    { label: "派工", desc: order.schedule === "已确认" ? "可生成工序任务和班组任务" : "等待排程发布", status: order.status === "已下达" ? "已下发" : order.schedule === "已确认" ? "待下发" : "未触发" },
    { label: "备料", desc: `${order.kit} / ${order.materialGap}`, status: order.kit === "齐套" ? "可锁库" : "待齐套" },
    { label: "检验", desc: "首件、过程检验、FQC 计划随工序窗口生成", status: order.risk === "质量" ? "需质量确认" : "已准备" },
    { label: "条码", desc: `生产批次 LOT-${getProductCode(order)}-${order.id.slice(-4)}`, status: order.schedule === "已确认" ? "待派工下发" : "等待计划" },
  ];
}

function getPlan(order) {
  const plan = schedulePlans[order.id];
  if (!plan
    || typeof plan.dayOffset !== "number"
    || !plan.window
    || !plan.version
    || !plan.publishStatus
    || !Array.isArray(plan.operations)
    || !Array.isArray(plan.conflicts)
    || !plan.kitSummary
    || !Array.isArray(plan.linkages)) {
    schedulePlans[order.id] = buildPlan(order);
  }
  return schedulePlans[order.id];
}

function buildPlan(order) {
  const hasGap = order.kit !== "齐套" || order.risk === "缺料";
  const hasEquipmentRisk = order.risk === "设备";
  const dayOffset = getOrderDayOffset(order);
  const duration = getOrderDuration(order);
  const firstBatch = hasGap ? Math.max(order.qty - 200, Math.ceil(order.qty * 0.72)) : order.qty;
  const secondBatch = Math.max(order.qty - firstBatch, 0);
  const kitSummary = getKitSummary(order, firstBatch);
  const operations = buildOperations(order, dayOffset, firstBatch, hasGap);
  const conflicts = getPlanConflicts(order, dayOffset, duration, operations, kitSummary);
  const window = formatPlanWindowFromOperations(operations);

  return {
    version: getPlanVersion(order),
    publishStatus: getPlanPublishStatus(order),
    strategy: hasGap ? "拆批生产" : "整批排程",
    batchPlan: secondBatch ? `${firstBatch} + ${secondBatch}` : `${order.qty}`,
    bottleneck: order.qty >= 1000 ? "老化测试" : "功能测试",
    release: order.schedule === "已确认" ? "可下发" : "待确认",
    dayOffset,
    duration,
    window,
    kitSummary,
    conflicts,
    linkages: getPlanLinkages(order),
    constraints: [
      { label: "物料", desc: `${kitSummary.status}，${order.materialGap}`, status: hasGap ? "需确认" : "齐套" },
      { label: "设备", desc: hasEquipmentRisk ? `${order.line} 设备日历需确认` : `${order.line} 资源可用`, status: hasEquipmentRisk ? "需确认" : "可用" },
      { label: "交期", desc: `${order.due} 前完成包装入库`, status: order.risk === "交期" ? "需调整" : "可承诺" },
      { label: "质量", desc: "首件、功能测试、FQC 检验计划", status: order.risk === "质量" ? "需确认" : "已配置" },
    ],
    operations,
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

function shiftOperationDate(value, offset) {
  const match = value.match(/06-(\d{2}) (.+)/);
  if (!match) return value;
  const index = Math.max(0, Number(match[1]) - 20 + offset);
  return `${planDays[Math.min(planDays.length - 1, index)]} ${match[2]}`;
}

function getTimelineScale() {
  return {
    week: { label: "周", unit: "日", columns: 7, columnMin: 112, headers: ["06-20", "06-21", "06-22", "06-23", "06-24", "06-25", "06-26"] },
    month: { label: "月", unit: "周", columns: 4, columnMin: 180, headers: ["第 1 周", "第 2 周", "第 3 周", "第 4 周"] },
    quarter: { label: "季度", unit: "月", columns: 3, columnMin: 220, headers: ["6 月", "7 月", "8 月"] },
    half: { label: "半年", unit: "月", columns: 6, columnMin: 150, headers: ["6 月", "7 月", "8 月", "9 月", "10 月", "11 月"] },
    year: { label: "年度", unit: "季度", columns: 4, columnMin: 180, headers: ["Q2", "Q3", "Q4", "Q1"] },
  }[state.timelineScale] || {
    label: "周",
    unit: "日",
    columns: 7,
    columnMin: 112,
    headers: planDays,
  };
}

function parsePlanDayIndex(value) {
  const minutes = parsePlanTimeToMinutes(value);
  return Number.isFinite(minutes) ? Math.max(0, Math.floor(minutes / 1440)) : 0;
}

function toTimelineColumn(dayIndex) {
  if (state.timelineScale === "week") return Math.min(6, Math.max(0, dayIndex));
  if (state.timelineScale === "month") return Math.min(3, Math.floor(Math.max(0, dayIndex) / 7));
  if (state.timelineScale === "quarter") return Math.min(2, Math.floor(Math.max(0, dayIndex) / 30));
  if (state.timelineScale === "half") return Math.min(5, Math.floor(Math.max(0, dayIndex) / 30));
  if (state.timelineScale === "year") return Math.min(3, Math.floor(Math.max(0, dayIndex) / 90));
  return Math.min(6, Math.max(0, dayIndex));
}

function getOperationRange(operations) {
  const starts = operations.map((item) => parsePlanDayIndex(item.start));
  const ends = operations.map((item) => parsePlanDayIndex(item.end));
  return {
    startDay: Math.min(...starts),
    endDay: Math.max(...ends),
  };
}

function formatPlanWindowFromOperations(operations) {
  const range = getOperationRange(operations);
  return `${formatPlanDayLabel(range.startDay)}-${formatPlanDayLabel(range.endDay)}`;
}

function isValidPlanTime(value) {
  const minutes = parsePlanTimeToMinutes(value);
  return Number.isFinite(minutes)
    && minutes >= 0
    && minutes <= parseDateInputToDayIndex(planEndDate) * 1440 + 23 * 60 + 59;
}

function parseDateInputToDayIndex(value) {
  const match = String(value || "").match(/^2026-(\d{2})-(\d{2})$/);
  if (!match) return Number.NaN;
  const base = new Date(`${planStartDate}T00:00:00`);
  const target = new Date(`2026-${match[1]}-${match[2]}T00:00:00`);
  return Math.round((target - base) / 86400000);
}

function formatPlanDayLabel(dayIndex) {
  const date = new Date(`${planStartDate}T00:00:00`);
  date.setDate(date.getDate() + Math.max(0, dayIndex));
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parsePlanTimeToMinutes(value) {
  const match = String(value || "").match(/(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return Number.NaN;
  const dayIndex = parseDateInputToDayIndex(`2026-${match[1]}-${match[2]}`);
  if (!Number.isFinite(dayIndex)) return Number.NaN;
  return dayIndex * 1440 + Number(match[3]) * 60 + Number(match[4]);
}

function formatPlanTimeFromMinutes(minutes) {
  const maxMinutes = parseDateInputToDayIndex(planEndDate) * 1440 + 23 * 60;
  const safeMinutes = Math.min(maxMinutes, Math.max(0, minutes));
  const dayIndex = Math.floor(safeMinutes / 1440);
  const minuteOfDay = safeMinutes % 1440;
  return `${formatPlanDayLabel(dayIndex)} ${String(Math.floor(minuteOfDay / 60)).padStart(2, "0")}:${String(minuteOfDay % 60).padStart(2, "0")}`;
}

function toPlanDateInputValue(value) {
  const match = String(value || "").match(/(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return planStartDate;
  return `2026-${match[1]}-${match[2]}`;
}

function toPlanTimeInputValue(value) {
  const match = String(value || "").match(/(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return "08:00";
  return `${match[3]}:${match[4]}`;
}

function fromDateAndTimeInputValues(dateValue, timeValue) {
  const dateMatch = String(dateValue || "").match(/^2026-(\d{2})-(\d{2})$/);
  const timeMatch = String(timeValue || "").match(/^(\d{2}):(\d{2})$/);
  if (!dateMatch || !timeMatch) return "";
  return `${dateMatch[1]}-${dateMatch[2]} ${timeMatch[1]}:${timeMatch[2]}`;
}

function comparePlanTime(start, end) {
  return parsePlanTimeToMinutes(end) - parsePlanTimeToMinutes(start);
}

function getPlanTimeInput(index, field, part) {
  return document.querySelector(`[data-operation-index="${index}"][data-time-field="${field}"][data-part="${part}"]`);
}

function setPlanTimeInputs(index, field, value) {
  const dateInput = getPlanTimeInput(index, field, "date");
  const timeInput = getPlanTimeInput(index, field, "time");
  if (dateInput) dateInput.value = toPlanDateInputValue(value);
  if (timeInput) timeInput.value = toPlanTimeInputValue(value);
}

function readOperationInputs(operations) {
  return operations.map((operation, index) => {
    const next = { ...operation };
    ["start", "end"].forEach((field) => {
      const dateInput = getPlanTimeInput(index, field, "date");
      const timeInput = getPlanTimeInput(index, field, "time");
      next[field] = fromDateAndTimeInputValues(dateInput?.value, timeInput?.value);
    });
    return next;
  });
}

function previewOperationTimes(nextOperations) {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  const range = getOperationRange(nextOperations);
  schedulePlans[order.id] = {
    ...plan,
    operations: nextOperations,
    dayOffset: range.startDay,
    duration: Math.max(1, range.endDay - range.startDay + 1),
    window: formatPlanWindowFromOperations(nextOperations),
    publishStatus: order.schedule === "已确认" ? "草案已调整待再发布" : "草案待会签",
    release: "待确认",
  };
  renderTimeline();
  renderConfirmedPlans();
  renderVersionAndRisks();
  renderDetail();
}

function shiftFollowingOperationTimes(changedInput) {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  const index = Number(changedInput.dataset.operationIndex);
  const field = changedInput.dataset.timeField;
  const nextOperations = readOperationInputs(plan.operations);
  const baseOperation = plan.operations[index];
  const nextOperation = nextOperations[index];
  const originalMinutes = parsePlanTimeToMinutes(baseOperation?.[field]);
  const changedMinutes = parsePlanTimeToMinutes(nextOperation?.[field]);
  if (!Number.isFinite(originalMinutes) || !Number.isFinite(changedMinutes) || !isValidPlanTime(nextOperation?.[field])) return;
  if (field === "end" && comparePlanTime(nextOperation.start, nextOperation.end) <= 0) {
    showToast(`${nextOperation.name} 的结束时间必须晚于开始时间`);
    setPlanTimeInputs(index, "end", baseOperation.end);
    return;
  }

  const delta = changedMinutes - originalMinutes;
  if (!delta) return;

  if (field === "start") {
    const originalEndMinutes = parsePlanTimeToMinutes(baseOperation.end);
    nextOperation.end = formatPlanTimeFromMinutes(originalEndMinutes + delta);
    setPlanTimeInputs(index, "end", nextOperation.end);
  }

  for (let nextIndex = index + 1; nextIndex < nextOperations.length; nextIndex += 1) {
    nextOperations[nextIndex].start = formatPlanTimeFromMinutes(parsePlanTimeToMinutes(plan.operations[nextIndex].start) + delta);
    nextOperations[nextIndex].end = formatPlanTimeFromMinutes(parsePlanTimeToMinutes(plan.operations[nextIndex].end) + delta);
    setPlanTimeInputs(nextIndex, "start", nextOperations[nextIndex].start);
    setPlanTimeInputs(nextIndex, "end", nextOperations[nextIndex].end);
  }

  previewOperationTimes(nextOperations);
}

function getOperationRowLabel(operation) {
  return `${operation.name} / ${operation.resource}`;
}

function getTimelineRows(visibleOrders) {
  if (state.timelineView === "operation") {
    const labels = [];
    visibleOrders.forEach((order) => {
      getPlan(order).operations.forEach((operation) => {
        const label = getOperationRowLabel(operation);
        if (!labels.includes(label)) labels.push(label);
      });
    });
    return labels;
  }
  if (state.timelineView === "line") return lines;
  return visibleOrders.map((order) => `${order.product.split(" ")[0]} / ${order.id}`);
}

function getProductRowOrder(rowLabel, visibleOrders) {
  return visibleOrders.find((order) => rowLabel.endsWith(order.id));
}

function buildProductTimelineItem(order) {
  const plan = getPlan(order);
  const range = getOperationRange(plan.operations);
  return {
    order,
    start: range.startDay,
    end: range.endDay,
    title: order.id,
    desc: `${order.line} · ${plan.batchPlan}`,
    status: order.schedule,
  };
}

function buildLineTimelineItem(order) {
  const plan = getPlan(order);
  const range = getOperationRange(plan.operations);
  return {
    order,
    start: range.startDay,
    end: range.endDay,
    title: order.id,
    desc: `${order.product.split(" ")[0]} · ${plan.batchPlan}`,
    status: order.schedule,
  };
}

function getTimelineRowHeader() {
  if (state.timelineView === "operation") return "工序 / 资源";
  if (state.timelineView === "line") return "产线";
  return "产品 / 工单";
}

function getTimelineViewLabel() {
  if (state.timelineView === "operation") return "工序资源占用";
  if (state.timelineView === "line") return "产线负荷跨度";
  return "产品订单跨度";
}

function getTimelineItemsForRow(rowLabel, visibleOrders) {
  if (state.timelineView === "operation") {
    return visibleOrders.flatMap((order) => {
      const plan = getPlan(order);
      return plan.operations
        .filter((operation) => getOperationRowLabel(operation) === rowLabel)
        .map((operation) => {
          const start = parsePlanDayIndex(operation.start);
          const end = parsePlanDayIndex(operation.end);
          return {
            order,
            start,
            end,
            title: `${order.id} · ${operation.name}`,
            desc: `${operation.resource} · ${operation.qty} 台`,
            status: operation.status,
          };
        });
    });
  }
  if (state.timelineView === "line") {
    return visibleOrders.filter((order) => order.line === rowLabel).map(buildLineTimelineItem);
  }
  const order = getProductRowOrder(rowLabel, visibleOrders);
  return order ? [buildProductTimelineItem(order)] : [];
}

function getTimelineItemClass(item) {
  if (item.order.schedule === "已确认" && !String(item.status).includes("待")) return " is-confirmed";
  if (item.order.schedule === "待调整" || String(item.status).includes("待")) return " is-risk";
  return "";
}

function getFilteredOrders() {
  const keyword = state.search.trim().toLowerCase();
  return orders.filter((order) => {
    const text = `${order.id} ${order.product} ${order.customer} ${order.planner}`.toLowerCase();
    const scheduleMatch = state.schedule === "all" || order.schedule === state.schedule;
    const lineMatch = state.line === "all" || order.line === state.line;
    const keywordMatch = !keyword || text.includes(keyword);
    return order.review === "已通过" && order.schedule !== "已确认" && scheduleMatch && lineMatch && keywordMatch;
  });
}

function renderAll() {
  renderMetrics();
  renderCandidateList();
  renderTimeline();
  renderConfirmedPlans();
  renderDetail();
  renderOperations();
  renderVersionAndRisks();
  renderLinkages();
  renderLogs();
}

function renderMetrics() {
  $("#metricUnplanned").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "未排程").length;
  $("#metricAdjust").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "待调整").length;
  $("#metricConfirmed").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "已确认").length;
  const load = Math.min(96, Math.round(orders.filter((order) => order.review === "已通过").reduce((sum, order) => sum + order.qty, 0) / 118));
  $("#metricBottleneck").textContent = `${load}%`;
}

function renderTimelineControls() {
  document.querySelectorAll("[data-scale]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scale === state.timelineScale);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.timelineView);
  });
}

function renderCandidateList() {
  const visible = getFilteredOrders();
  $("#candidateList").innerHTML = visible.length ? visible.map((order) => `
    <article class="candidate-card${order.id === state.activeOrderId ? " is-active" : ""}" data-order-id="${order.id}">
      <div class="candidate-card__top">
        <strong>${order.id}</strong>
        <span class="pill pill--${getScheduleStyle(order)}">${order.schedule}</span>
      </div>
      <span>${order.product}</span>
      <em>${order.customer} · ${order.qty} 台 · ${order.line} · ${order.due}</em>
    </article>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前没有未排程或待调整订单</strong><em>查看已确认计划</em></div>`;

  $("#candidateList").querySelectorAll("[data-order-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeOrderId = card.dataset.orderId;
      saveState();
      renderAll();
    });
  });
}

function renderTimeline() {
  const visible = orders.filter((order) => order.review === "已通过" && order.schedule !== "未排程");
  const scale = getTimelineScale();
  const rowLabels = getTimelineRows(visible);
  const rows = rowLabels.map((rowLabel) => {
    const rowItems = getTimelineItemsForRow(rowLabel, visible).sort((a, b) => a.start - b.start);
    const items = rowItems.map((item, index) => {
      const startColumn = toTimelineColumn(item.start);
      const endColumn = toTimelineColumn(item.end);
      const span = Math.max(1, endColumn - startColumn + 1);
      const statusClass = getTimelineItemClass(item);
      return `
        <button class="gantt-item${statusClass}${item.order.id === state.activeOrderId ? " is-active" : ""}" type="button" data-order-id="${item.order.id}" style="--start:${startColumn + 1}; --span:${span}; --lane:${index % 4}">
          <strong>${item.title}</strong>
          <span>${item.desc}</span>
        </button>
      `;
    }).join("");
    return `<div class="timeline-row"><div class="timeline-line">${rowLabel}</div><div class="gantt-lane">${items}</div></div>`;
  }).join("");
  $("#timelineGrid").innerHTML = `
    <div class="timeline-head" style="--columns:${scale.columns}; --column-min:${scale.columnMin}px">
      <div>${getTimelineRowHeader()}</div>
      ${scale.headers.map((day) => `<div>${day}</div>`).join("")}
    </div>
    <div class="timeline-scale-note">当前视图：${scale.label} / ${getTimelineViewLabel()}，甘特条由工序级计划开始和结束时间汇总</div>
    <div class="timeline-body" style="--columns:${scale.columns}; --column-min:${scale.columnMin}px">
      ${rows}
    </div>
  `;

  $("#timelineGrid").querySelectorAll("[data-order-id]").forEach((item) => {
    item.addEventListener("click", () => {
      state.activeOrderId = item.dataset.orderId;
      saveState();
      renderAll();
    });
  });
}

function renderConfirmedPlans() {
  const confirmed = orders.filter((order) => {
    const keyword = state.search.trim().toLowerCase();
    const text = `${order.id} ${order.product} ${order.customer} ${order.planner}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const lineMatch = state.line === "all" || order.line === state.line;
    return order.review === "已通过" && order.schedule === "已确认" && keywordMatch && lineMatch;
  });
  $("#confirmedTableBody").innerHTML = confirmed.length ? confirmed.map((order) => {
    const plan = getPlan(order);
    const linkage = getConfirmedLinkageStatus(order);
    return `
      <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td>${order.line}</td>
        <td>${plan.batchPlan}</td>
        <td>${plan.window} · ${plan.version}</td>
        <td class="confirmed-linkage-cell"><span class="schedule-status-badge schedule-status-badge--${linkage.style}">${linkage.label}</span></td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="6">当前筛选条件下没有已确认计划</td></tr>`;

  $("#confirmedTableBody").querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      saveState();
      renderAll();
    });
  });
}

function renderDetail() {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  $("#detailScheduleStatus").textContent = order.schedule;
  $("#detailOrderId").textContent = order.id;
  $("#detailProduct").textContent = order.product;
  $("#detailGrid").innerHTML = [
    ["客户", order.customer],
    ["数量", `${order.qty} 台`],
    ["交期", order.due],
    ["产线", order.line],
    ["优先级", order.priority],
    ["计划员", order.planner],
    ["评审", order.review],
    ["齐套", order.kit],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#strategyList").innerHTML = [
    ["版本", plan.version, plan.publishStatus],
    ["策略", plan.strategy, order.schedule === "已确认" ? "已锁定" : "建议"],
    ["批次", plan.batchPlan, plan.release],
    ["瓶颈", plan.bottleneck, "重点看护"],
  ].map(([label, value, status]) => `<div><span>${label}</span><strong>${value}</strong><em>${status}</em></div>`).join("");

  $("#constraintList").innerHTML = plan.constraints.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");
}

function renderOperations() {
  const order = getActiveOrder();
  const plan = getPlan(order);
  $("#operationTableBody").innerHTML = plan.operations.map((item, index) => `
    <tr>
      <td>${item.name}</td>
      <td>
        <div class="operation-time-group">
          <input class="operation-time-input operation-date-input" type="date" min="${planStartDate}" max="${planEndDate}" data-operation-index="${index}" data-time-field="start" data-part="date" value="${toPlanDateInputValue(item.start)}" aria-label="${item.name} 计划开始日期" />
          <input class="operation-time-input operation-clock-input" type="text" inputmode="none" readonly data-operation-index="${index}" data-time-field="start" data-part="time" value="${toPlanTimeInputValue(item.start)}" aria-label="${item.name} 计划开始时间" />
        </div>
      </td>
      <td>
        <div class="operation-time-group">
          <input class="operation-time-input operation-date-input" type="date" min="${planStartDate}" max="${planEndDate}" data-operation-index="${index}" data-time-field="end" data-part="date" value="${toPlanDateInputValue(item.end)}" aria-label="${item.name} 计划结束日期" />
          <input class="operation-time-input operation-clock-input" type="text" inputmode="none" readonly data-operation-index="${index}" data-time-field="end" data-part="time" value="${toPlanTimeInputValue(item.end)}" aria-label="${item.name} 计划结束时间" />
        </div>
      </td>
      <td>${item.resource}<br><span class="muted-cell">${item.standard}</span></td>
      <td>${item.qty} 台</td>
      <td><span class="pill pill--${item.status === "已确认" ? "green" : item.status.includes("待") ? "orange" : "blue"}">${item.status}</span></td>
    </tr>
  `).join("");
  bindTimePickers();
}

function closeTimePicker() {
  document.querySelector(".time-picker-popover")?.remove();
  document.querySelectorAll(".operation-clock-input.is-picker-open").forEach((input) => input.classList.remove("is-picker-open"));
}

function openTimePicker(input) {
  closeTimePicker();
  const rect = input.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.className = "time-picker-popover";
  input.classList.add("is-picker-open");
  popover.innerHTML = `
    <div class="time-picker-popover__head">
      <div>
        <strong>选择计划时间</strong>
        <span>${input.dataset.timeField === "start" ? "计划开始" : "计划结束"} · ${input.value || "未选择"}</span>
      </div>
      <button type="button" data-time-picker-close aria-label="关闭时间选择器">×</button>
    </div>
    <div class="time-picker-shifts">
      ${timeOptionGroups.map((group) => `
        <section class="time-picker-shift">
          <div class="time-picker-shift__title">
            <span>${group.label}</span>
            <em>${group.range}</em>
          </div>
          <div class="time-picker-grid">
            ${group.values.map((time) => `<button type="button" class="${time === input.value ? "is-active" : ""}" data-time-value="${time}">${time}</button>`).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
  document.body.appendChild(popover);
  const pickerRect = popover.getBoundingClientRect();
  const left = Math.min(window.innerWidth - pickerRect.width - 12, Math.max(12, rect.left + rect.width - pickerRect.width));
  const belowTop = rect.bottom + 10;
  const aboveTop = rect.top - pickerRect.height - 10;
  const top = belowTop + pickerRect.height > window.innerHeight - 12 && aboveTop > 12 ? aboveTop : Math.min(window.innerHeight - pickerRect.height - 12, belowTop);
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(12, top)}px`;
  popover.style.setProperty("--anchor-left", `${Math.min(pickerRect.width - 24, Math.max(24, rect.left + rect.width / 2 - left))}px`);
  popover.querySelectorAll("[data-time-value]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.timeValue;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      closeTimePicker();
    });
  });
  popover.querySelector("[data-time-picker-close]").addEventListener("click", closeTimePicker);
}

function bindTimePickers() {
  document.querySelectorAll(".operation-time-input").forEach((input) => {
    input.addEventListener("change", () => shiftFollowingOperationTimes(input));
  });
  document.querySelectorAll(".operation-clock-input").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
      openTimePicker(input);
    });
  });
}

function saveOperationTimes() {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  const nextOperations = plan.operations.map((operation) => ({ ...operation }));
  for (const operation of nextOperations) {
    const index = nextOperations.indexOf(operation);
    for (const field of ["start", "end"]) {
      const dateInput = document.querySelector(`[data-operation-index="${index}"][data-time-field="${field}"][data-part="date"]`);
      const timeInput = document.querySelector(`[data-operation-index="${index}"][data-time-field="${field}"][data-part="time"]`);
      const value = fromDateAndTimeInputValues(dateInput?.value, timeInput?.value);
      if (!isValidPlanTime(value)) {
        showToast(`请选择 ${planStartDate} 至 ${planEndDate} 范围内的工序时间`);
        (dateInput || timeInput)?.focus();
        return;
      }
      operation[field] = value;
    }
  }
  const invalid = nextOperations.find((operation) => comparePlanTime(operation.start, operation.end) <= 0);
  if (invalid) {
    showToast(`${invalid.name} 的结束时间必须晚于开始时间`);
    return;
  }
  const range = getOperationRange(nextOperations);
  schedulePlans[order.id] = {
    ...plan,
    operations: nextOperations,
    dayOffset: range.startDay,
    duration: Math.max(1, range.endDay - range.startDay + 1),
    window: formatPlanWindowFromOperations(nextOperations),
    publishStatus: order.schedule === "已确认" ? "草案已调整待再发布" : "草案待会签",
    release: "待确认",
  };
  state.activeOrderId = order.id;
  recordIntegration(order.id, "工序计划时间已调整，已重算订单窗口和甘特图跨度");
  syncScheduleFlow(order.id, "编辑工序时间");
  syncPageStore();
  renderAll();
  showToast("工序时间已保存，排程窗口和甘特图已重算");
}

function renderVersionAndRisks() {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  $("#versionList").innerHTML = [
    ["排程版本", plan.version, plan.publishStatus],
    ["计划窗口", plan.window, `${plan.duration} 天跨度`],
    ["责任人", order.planner, new Date().toLocaleString("zh-CN", { hour12: false })],
    ["来源", `ERP 工单 ${order.id} + MES APS 规则排程`, "内部排程"],
    ["发布边界", "确认排程后才允许派工、备料、检验和条码下发", plan.release],
  ].map(([label, value, status]) => `
    <div>
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${status}</em>
    </div>
  `).join("");

  $("#conflictList").innerHTML = plan.conflicts.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");

  const kit = plan.kitSummary;
  $("#kitList").innerHTML = `
    <div class="kit-summary">
      <span>${kit.status}</span>
      <strong>需求 ${kit.totalNeed} / 可用含在途 ${kit.totalAvailable} / 缺口 ${kit.totalGap}</strong>
      <em>${kit.eta}</em>
    </div>
    ${kit.items.map((item) => `
      <div>
        <span>${item.materialNo || "物料"}</span>
        <strong>${item.name} · 需 ${item.need} / 可用 ${item.available} / 缺 ${item.gap}</strong>
        <em>${item.gap > 0 ? item.eta : "可锁库"}</em>
      </div>
    `).join("")}
  `;
}

function renderLinkages() {
  const order = getActiveOrder();
  if (!order) return;
  const plan = getPlan(order);
  $("#linkageList").innerHTML = plan.linkages.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");
}

function renderLogs() {
  const order = getActiveOrder();
  const logs = integrationLogs.filter((log) => !order || log.orderId === order.id).slice(0, 4);
  $("#scheduleLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>排程动作会在这里留下最近记录</strong><em>待处理</em></div>`;
}

function updateOrder(orderId, patch, message) {
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) return;
  orders[index] = { ...orders[index], ...patch };
  schedulePlans[orderId] = buildPlan(orders[index]);
  state.activeOrderId = orderId;
  recordIntegration(orderId, message);
  syncScheduleFlow(orderId, message);
  loadState();
  syncPageStore();
  renderAll();
  showToast(message);
}

function recordIntegration(orderId, action) {
  integrationLogs = [
    { orderId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...integrationLogs,
  ].slice(0, 40);
}

function getScheduleStyle(order) {
  if (order.schedule === "已确认") return "green";
  if (order.schedule === "待调整") return "orange";
  return "blue";
}

function confirmPlan(order) {
  const nextStatus = ["待排程", "已排程"].includes(order.status) ? "已排程" : order.status;
  updateOrder(order.id, { schedule: "已确认", status: nextStatus, batchPlan: getPlan(order).batchPlan }, "生产排程已确认，可同步派工与备料");
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
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".time-picker-popover") && !event.target.classList.contains("operation-clock-input")) closeTimePicker();
  });
  window.addEventListener("scroll", closeTimePicker, true);
  $("#scheduleSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#scheduleFilter").addEventListener("change", (event) => {
    state.schedule = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  document.querySelectorAll("[data-scale]").forEach((button) => {
    button.addEventListener("click", () => {
      state.timelineScale = button.dataset.scale;
      saveState();
      renderTimeline();
      renderTimelineControls();
    });
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.timelineView = button.dataset.view;
      saveState();
      renderTimeline();
      renderTimelineControls();
    });
  });
  $("#autoPlanBtn").addEventListener("click", () => {
    const targets = orders.filter((order) => order.review === "已通过" && order.schedule === "未排程");
    if (!targets.length) {
      showToast("没有未排程订单需要生成建议");
      return;
    }
    targets.forEach((order) => {
      order.schedule = order.risk === "正常" ? "已确认" : "待调整";
      order.status = order.schedule === "已确认" ? "已排程" : "待排程";
      schedulePlans[order.id] = buildPlan(order);
      recordIntegration(order.id, order.schedule === "已确认" ? "自动排程已确认" : "已生成排程建议，等待约束确认");
    });
    state.activeOrderId = targets[0].id;
    syncScheduleFlow(targets.map((order) => order.id), "生成排程建议");
    loadState();
    syncPageStore();
    renderAll();
    showToast(`已生成 ${targets.length} 个排程建议`);
  });
  $("#confirmPlanBtn").addEventListener("click", () => confirmPlan(getActiveOrder()));
  $("#saveOperationTimesBtn").addEventListener("click", saveOperationTimes);
  $("#splitBatchBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    updateOrder(order.id, { schedule: "待调整", batchPlan: getPlan(order).batchPlan }, "订单已按物料和瓶颈资源拆分批次");
  });
  $("#resolveConstraintBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    updateOrder(order.id, { risk: "正常", kit: "齐套", materialGap: "齐套", schedule: "已确认", status: "已排程" }, "排程约束已确认，计划已锁定");
  });
  $("#markMaterialBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { risk: "缺料", kit: "缺料待补", schedule: "待调整", materialGap: "关键物料到货时间待确认" }, "已标记物料约束"));
  $("#markEquipmentBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { risk: "设备", schedule: "待调整", materialGap: `${getActiveOrder().line} 关键设备占用待确认` }, "已标记设备占用约束"));
  $("#releaseDispatchBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    if (order.schedule !== "已确认") {
      showToast("请先确认排程再下发派工准备");
      return;
    }
    updateOrder(order.id, { status: order.status === "已排程" ? "已下达" : order.status }, "已同步派工、备料和检验准备");
  });
  $("#rollbackPlanBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { schedule: "待调整", status: "待排程" }, "排程已退回待调整"));
  $("#resetSchedulePageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    const flowState = window.MES_BUSINESS_FLOW?.reset?.();
    orders = structuredClone(flowState?.orders || window.MES_MASTER_DATA?.orders || initialOrders);
    integrationLogs = [];
    schedulePlans = {};
    state = { activeOrderId: "MO-202606-0005", search: "", schedule: "all", line: "all", timelineScale: "week", timelineView: "product" };
    $("#scheduleSearch").value = "";
    $("#scheduleFilter").value = "all";
    $("#lineFilter").value = "all";
    syncPageStore();
    renderTimelineControls();
    renderAll();
    showToast("排程演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#scheduleSearch").value = state.search;
$("#scheduleFilter").value = state.schedule;
$("#lineFilter").value = state.line;
bindEvents();
renderTimelineControls();
renderAll();
