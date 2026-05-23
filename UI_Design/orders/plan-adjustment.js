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
];

const planDays = ["06-20", "06-21", "06-22", "06-23", "06-24", "06-25", "06-26"];
let orders = structuredClone(window.MES_MASTER_DATA?.orders || initialOrders);
let schedulePlans = {};
let integrationLogs = [];
let adjustments = {};
let state = {
  activeOrderId: "MO-202606-0005",
  search: "",
  reason: "all",
  line: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "计划调整" ? " class=\"is-active\"" : "";
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
    schedulePlans = saved.schedulePlans || schedulePlans;
    integrationLogs = flowState?.logs ? flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) : saved.integrationLogs || integrationLogs;
    adjustments = saved.adjustments || adjustments;
    state = { ...state, ...(saved.adjustmentState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, schedulePlans, integrationLogs, adjustments, adjustmentState: state }));
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
  return {
    dayOffset,
    duration,
    window: `${planDays[dayOffset]}-${planDays[Math.min(planDays.length - 1, dayOffset + duration - 1)]}`,
    batchPlan: order.batchPlan || `${order.qty}`,
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

function getAdjustment(order) {
  if (!adjustments[order.id]) adjustments[order.id] = buildAdjustment(order);
  return adjustments[order.id];
}

function buildAdjustment(order) {
  const plan = getPlan(order);
  const reason = getAdjustReason(order);
  const shift = reason === "交期" || order.priority === "紧急" ? -1 : 1;
  const nextOffset = Math.max(0, Math.min(planDays.length - 1, plan.dayOffset + shift));
  const nextDuration = reason === "缺料" ? Math.min(3, plan.duration + 1) : plan.duration;
  return {
    status: order.schedule === "已确认" && order.risk === "正常" ? "可确认" : "待会签",
    reason,
    beforeOffset: plan.dayOffset,
    beforeDuration: plan.duration,
    afterOffset: nextOffset,
    afterDuration: nextDuration,
    countersign: getCountersignStatus(order),
    impact: getImpact(order, nextOffset, nextDuration),
  };
}

function getAdjustReason(order) {
  if (order.risk === "缺料") return "缺料";
  if (order.risk === "设备") return "设备";
  if (order.risk === "质量") return "质量";
  if (order.risk === "交期" || order.priority === "紧急") return "交期";
  if (order.schedule === "待调整") return "产能";
  return "产能";
}

function getCountersignStatus(order) {
  return [
    { owner: "计划", desc: `${order.line} 排程窗口和交期承诺`, status: "已确认" },
    { owner: "物料", desc: order.materialGap, status: order.risk === "缺料" ? "待确认" : "已确认" },
    { owner: "设备", desc: `${order.line} 设备日历`, status: order.risk === "设备" ? "待确认" : "已确认" },
    { owner: "质量", desc: "首件、过程检验、成品放行", status: order.risk === "质量" ? "待确认" : "已确认" },
  ];
}

function getImpact(order, offset, duration) {
  const related = orders.filter((item) => item.id !== order.id && item.line === order.line && item.review === "已通过");
  const overlap = related.filter((item) => {
    const plan = getPlan(item);
    return rangesOverlap(offset, offset + duration - 1, plan.dayOffset, plan.dayOffset + plan.duration - 1);
  });
  return [
    { label: "交期", desc: `${order.due} 承诺交付`, status: offset < getPlan(order).dayOffset ? "提前" : "后移" },
    { label: "产线", desc: `${order.line} 调整到 ${formatWindow(offset, duration)}`, status: overlap.length ? `${overlap.length} 单冲突` : "无冲突" },
    { label: "物料", desc: order.materialGap, status: order.risk === "缺料" ? "待补料" : "可支持" },
    { label: "派工", desc: "需同步派工、备料、检验计划", status: order.status === "已下达" ? "需重发" : "待同步" },
  ];
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA <= endB && startB <= endA;
}

function formatWindow(offset, duration) {
  return `${planDays[offset]}-${planDays[Math.min(planDays.length - 1, offset + duration - 1)]}`;
}

function getAdjustmentOrders() {
  return orders.filter((order) => order.review === "已通过" && (order.schedule === "待调整" || order.risk !== "正常" || order.priority === "紧急"));
}

function getFilteredAdjustments() {
  const keyword = state.search.trim().toLowerCase();
  return getAdjustmentOrders().filter((order) => {
    const adjustment = getAdjustment(order);
    const text = `${order.id} ${order.product} ${order.customer} ${adjustment.reason} ${order.materialGap}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const reasonMatch = state.reason === "all" || adjustment.reason === state.reason;
    const lineMatch = state.line === "all" || order.line === state.line;
    return keywordMatch && reasonMatch && lineMatch;
  });
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || getFilteredAdjustments()[0] || getAdjustmentOrders()[0] || orders[0];
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderCompare();
  renderDetail();
  renderLogs();
  renderDetailVisibility();
}

function renderMetrics() {
  const targets = getAdjustmentOrders();
  $("#metricPendingAdjust").textContent = targets.filter((order) => order.schedule === "待调整").length;
  $("#metricCountersign").textContent = targets.filter((order) => getAdjustment(order).countersign.some((item) => item.status !== "已确认")).length;
  $("#metricReady").textContent = targets.filter((order) => !getAdjustment(order).countersign.some((item) => item.status !== "已确认")).length;
  $("#metricImpacted").textContent = new Set(targets.flatMap((order) => getAdjustment(order).impact.filter((item) => item.status.includes("冲突")).map(() => order.id))).size;
}

function renderTable() {
  const visible = getFilteredAdjustments();
  $("#adjustmentTableBody").innerHTML = visible.length ? visible.map((order) => {
    const adjustment = getAdjustment(order);
    const plan = getPlan(order);
    const blocked = adjustment.countersign.some((item) => item.status !== "已确认");
    return `
      <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td>${formatWindow(plan.dayOffset, plan.duration)}</td>
        <td>${formatWindow(adjustment.afterOffset, adjustment.afterDuration)}</td>
        <td>${adjustment.reason}</td>
        <td><span class="adjustment-impact-cell" title="${adjustment.impact.map((item) => `${item.label}:${item.status}`).join(" / ")}">${adjustment.impact.map((item) => item.status).join(" / ")}</span></td>
        <td><span class="pill pill--${blocked ? "orange" : "green"}">${blocked ? "待会签" : "可确认"}</span></td>
        <td><div class="table-actions"><button type="button" data-action="approve" data-order-id="${order.id}">确认</button></div></td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="8">当前筛选条件下没有计划调整单</td></tr>`;

  $("#adjustmentTableBody").querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#adjustmentTableBody").querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeOrderId = button.dataset.orderId;
      state.detailOpen = true;
      approveAdjustment(button.dataset.orderId);
    });
  });
}

function renderDetailVisibility() {
  $("#adjustmentLayout").classList.toggle("is-detail-closed", !state.detailOpen);
  $("#adjustmentDetailPanel").classList.toggle("is-closed", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
}

function renderCompare() {
  const order = getActiveOrder();
  const plan = getPlan(order);
  const adjustment = getAdjustment(order);
  $("#compareBoard").innerHTML = [
    { title: "调整前", offset: plan.dayOffset, duration: plan.duration, line: order.line, batch: plan.batchPlan || order.batchPlan, status: order.schedule },
    { title: "调整后", offset: adjustment.afterOffset, duration: adjustment.afterDuration, line: order.line, batch: getAfterBatch(order, adjustment), status: adjustment.status },
  ].map((item) => `
    <div class="compare-column">
      <h4>${item.title}</h4>
      ${[
        ["计划窗口", formatWindow(item.offset, item.duration)],
        ["产线", item.line],
        ["批次", item.batch],
        ["状态", item.status],
      ].map(([label, value]) => `<div class="compare-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}
    </div>
  `).join("");
}

function renderDetail() {
  const order = getActiveOrder();
  const adjustment = getAdjustment(order);
  $("#detailAdjustmentStatus").textContent = adjustment.status;
  $("#detailOrderId").textContent = order.id;
  $("#detailProduct").textContent = order.product;
  $("#detailGrid").innerHTML = [
    ["客户", order.customer],
    ["数量", `${order.qty} 台`],
    ["交期", order.due],
    ["产线", order.line],
    ["原因", adjustment.reason],
    ["风险", order.risk],
    ["排程", order.schedule],
    ["齐套", order.kit],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#impactList").innerHTML = adjustment.impact.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");

  $("#countersignList").innerHTML = adjustment.countersign.map((item) => `
    <div>
      <span>${item.owner}</span>
      <strong>${item.desc}</strong>
      <em class="${item.status === "已确认" ? "" : "is-pending"}">${item.status}</em>
    </div>
  `).join("");
}

function getAfterBatch(order, adjustment) {
  if (adjustment.reason === "缺料" && !String(order.batchPlan).includes("+")) return `${Math.ceil(order.qty * 0.7)} + ${order.qty - Math.ceil(order.qty * 0.7)}`;
  return order.batchPlan;
}

function approveAdjustment(orderId) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  const adjustment = getAdjustment(order);
  if (adjustment.countersign.some((item) => item.status !== "已确认")) {
    showToast("请先完成会签与影响校验");
    return;
  }
  schedulePlans[order.id] = {
    ...getPlan(order),
    dayOffset: adjustment.afterOffset,
    duration: adjustment.afterDuration,
    window: formatWindow(adjustment.afterOffset, adjustment.afterDuration),
    batchPlan: getAfterBatch(order, adjustment),
  };
  updateOrder(order.id, { schedule: "已确认", status: order.status === "待排程" ? "已排程" : order.status, batchPlan: getAfterBatch(order, adjustment), risk: order.risk === "交期" ? "正常" : order.risk }, "调整方案已同步排程准备，待派工重发校验");
}

function updateOrder(orderId, patch, message) {
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) return;
  orders[index] = { ...orders[index], ...patch };
  state.activeOrderId = orderId;
  recordIntegration(orderId, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordIntegration(orderId, action) {
  integrationLogs = [
    { orderId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...integrationLogs,
  ].slice(0, 50);
}

function renderLogs() {
  const order = getActiveOrder();
  const logs = integrationLogs.filter((log) => !order || log.orderId === order.id).slice(0, 4);
  $("#adjustmentLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>计划调整动作会在这里留下记录</strong><em>待处理</em></div>`;
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

function bindEvents() {
  $("#adjustmentSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#reasonFilter").addEventListener("change", (event) => {
    state.reason = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#createAdjustmentBtn").addEventListener("click", () => {
    getAdjustmentOrders().forEach((order) => {
      adjustments[order.id] = buildAdjustment(order);
      recordIntegration(order.id, "模拟生成计划调整建议，等待会签与影响校验");
    });
    saveState();
    renderAll();
    showToast("模拟调整建议已生成");
  });
  $("#approveAdjustmentBtn").addEventListener("click", () => approveAdjustment(getActiveOrder().id));
  $("#confirmCountersignBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    adjustments[order.id] = {
      ...getAdjustment(order),
      status: "可确认",
      countersign: getAdjustment(order).countersign.map((item) => ({ ...item, status: "已确认" })),
    };
    recordIntegration(order.id, "模拟计划调整会签已完成，影响校验通过");
    saveState();
    renderAll();
    showToast("模拟会签与影响校验已完成");
  });
  $("#moveEarlierBtn").addEventListener("click", () => shiftActiveAdjustment(-1));
  $("#moveLaterBtn").addEventListener("click", () => shiftActiveAdjustment(1));
  $("#splitBatchBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    const adjustment = getAdjustment(order);
    adjustments[order.id] = { ...adjustment, reason: "缺料", afterDuration: Math.min(3, adjustment.afterDuration + 1), status: "待会签" };
    recordIntegration(order.id, "已维护为拆批调整方案");
    saveState();
    renderAll();
    showToast("已维护为拆批调整方案");
  });
  $("#rollbackAdjustBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { schedule: "待调整" }, "调整申请已回退并保留原计划"));
  $("#resetAdjustmentPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    schedulePlans = {};
    integrationLogs = [];
    adjustments = {};
    state = { activeOrderId: "MO-202606-0005", search: "", reason: "all", line: "all", detailOpen: true };
    $("#adjustmentSearch").value = "";
    $("#reasonFilter").value = "all";
    $("#lineFilter").value = "all";
    renderAll();
    showToast("调整演示已重置");
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

function shiftActiveAdjustment(days) {
  const order = getActiveOrder();
  const adjustment = getAdjustment(order);
  const nextOffset = Math.max(0, Math.min(planDays.length - 1, adjustment.afterOffset + days));
  adjustments[order.id] = { ...adjustment, afterOffset: nextOffset, impact: getImpact(order, nextOffset, adjustment.afterDuration) };
  recordIntegration(order.id, days < 0 ? "调整方案建议提前 1 天" : "调整方案建议后移 1 天");
  saveState();
  renderAll();
  showToast(days < 0 ? "方案已提前 1 天" : "方案已后移 1 天");
}

window.addEventListener("plan-maintenance:changed", () => {
  loadState();
  renderAll();
});

loadState();
renderFrameMenu();
$("#adjustmentSearch").value = state.search;
$("#reasonFilter").value = state.reason;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
