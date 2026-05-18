const STORAGE_KEY = "xingjigu_mes_production_orders_v1";

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
const baseDate = new Date("2026-06-20T00:00:00");
let orders = structuredClone(initialOrders);
let schedulePlans = {};
let integrationLogs = [];
let state = {
  activeOrderId: "MO-202606-0005",
  search: "",
  level: "all",
  reason: "all",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "交期预警" ? " class=\"is-active\"" : "";
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
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    orders = saved.orders || orders;
    schedulePlans = saved.schedulePlans || schedulePlans;
    integrationLogs = saved.integrationLogs || integrationLogs;
    state = { ...state, ...(saved.deliveryWarningState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, schedulePlans, integrationLogs, deliveryWarningState: state }));
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

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function daysBetween(start, end) {
  return Math.ceil((end - start) / 86400000);
}

function getWarning(order) {
  const plan = getPlan(order);
  const dueDate = new Date(`${order.due}T00:00:00`);
  const finishDate = addDays(baseDate, plan.dayOffset + plan.duration + getDelayDays(order));
  const buffer = daysBetween(finishDate, dueDate);
  const reasons = getReasons(order, buffer);
  const level = buffer < 0 || order.priority === "紧急" || reasons.some((item) => item.type === "缺料") ? "高" : buffer <= 2 || reasons.length > 1 ? "中" : "低";
  return { order, plan, dueDate, finishDate, buffer, reasons, level };
}

function getDelayDays(order) {
  let days = 0;
  if (order.schedule === "待调整" || order.schedule === "未排程") days += 2;
  if (order.review !== "已通过") days += 2;
  if (order.risk === "缺料") days += 2;
  if (order.risk === "设备") days += 1;
  if (order.risk === "质量") days += 1;
  if (order.priority === "紧急") days -= 1;
  return Math.max(0, days);
}

function getReasons(order, buffer) {
  const reasons = [];
  if (order.review !== "已通过") reasons.push({ type: "评审", desc: "订单评审或资料准入未完成", owner: "计划 / 工艺" });
  if (order.schedule !== "已确认") reasons.push({ type: "产能", desc: "排程未锁定或仍待调整", owner: "计划" });
  if (order.risk === "缺料" || order.kit !== "齐套") reasons.push({ type: "缺料", desc: order.materialGap, owner: "物料" });
  if (order.risk === "设备") reasons.push({ type: "设备", desc: `${order.line} 设备日历或保养窗口待确认`, owner: "设备" });
  if (order.risk === "质量") reasons.push({ type: "质量", desc: "首件或检验要求可能影响放行", owner: "质量" });
  if (buffer < 0) reasons.push({ type: "交期", desc: `预计晚于承诺交期 ${Math.abs(buffer)} 天`, owner: "计划" });
  if (!reasons.length) reasons.push({ type: "正常", desc: "当前排程可覆盖承诺交期", owner: "计划" });
  return reasons;
}

function getWarnings() {
  return orders.map(getWarning).sort((a, b) => {
    const levelRank = { 高: 0, 中: 1, 低: 2 };
    return levelRank[a.level] - levelRank[b.level] || a.buffer - b.buffer;
  });
}

function getFilteredWarnings() {
  const keyword = state.search.trim().toLowerCase();
  return getWarnings().filter((warning) => {
    const text = `${warning.order.id} ${warning.order.product} ${warning.order.customer} ${warning.reasons.map((item) => item.type + item.desc).join(" ")}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const levelMatch = state.level === "all" || warning.level === state.level;
    const reasonMatch = state.reason === "all" || warning.reasons.some((item) => item.type === state.reason);
    return keywordMatch && levelMatch && reasonMatch;
  });
}

function getActiveWarning() {
  return getWarnings().find((warning) => warning.order.id === state.activeOrderId) || getFilteredWarnings()[0] || getWarnings()[0];
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderTimeline();
  renderDetail();
  renderLogs();
}

function renderMetrics() {
  const warnings = getWarnings();
  $("#metricHighRisk").textContent = warnings.filter((warning) => warning.level === "高").length;
  $("#metricMediumRisk").textContent = warnings.filter((warning) => warning.level === "中").length;
  $("#metricDueWeek").textContent = warnings.filter((warning) => daysBetween(baseDate, warning.dueDate) <= 7).length;
  const avg = Math.round(warnings.reduce((sum, warning) => sum + warning.buffer, 0) / warnings.length);
  $("#metricBuffer").textContent = `${avg}天`;
}

function renderTable() {
  const visible = getFilteredWarnings();
  $("#warningTableBody").innerHTML = visible.length ? visible.map((warning) => `
    <tr class="${warning.order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${warning.order.id}">
      <td class="order-no">${warning.order.id}</td>
      <td class="product-cell"><strong>${warning.order.product}</strong><span>${warning.order.customer} · ${warning.order.qty} 台</span></td>
      <td>${formatDate(warning.dueDate)}</td>
      <td>${formatDate(warning.finishDate)}</td>
      <td class="buffer-cell${warning.buffer < 0 ? " is-negative" : ""}">${warning.buffer >= 0 ? "+" : ""}${warning.buffer} 天</td>
      <td><span class="pill pill--${getLevelStyle(warning.level)}">${warning.level}</span></td>
      <td>${warning.reasons.map((item) => item.type).join(" / ")}</td>
      <td><div class="table-actions"><button type="button" data-action="follow" data-order-id="${warning.order.id}">跟进</button></div></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有交期预警</td></tr>`;

  $("#warningTableBody").querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      saveState();
      renderAll();
    });
  });
  $("#warningTableBody").querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeOrderId = button.dataset.orderId;
      recordIntegration(button.dataset.orderId, "交期预警已标记跟进");
      saveState();
      renderAll();
      showToast("交期预警已标记跟进");
    });
  });
}

function renderTimeline() {
  const visible = getFilteredWarnings().slice(0, 12);
  $("#deliveryTimeline").innerHTML = `
    <div class="timeline-warning-row timeline-warning-head">
      <div>类型</div>
      ${planDays.map((day) => `<div>${day}</div>`).join("")}
    </div>
    ${["预计完工", "承诺交期"].map((label) => `
      <div class="timeline-warning-row">
        <div class="timeline-warning-label">${label}</div>
        ${planDays.map((day) => {
          const items = visible.filter((warning) => formatDate(label === "预计完工" ? warning.finishDate : warning.dueDate) === day);
          return `<div class="timeline-warning-cell">${items.map((warning) => `
            <button class="warning-chip ${warning.level === "高" ? "is-high" : warning.level === "中" ? "is-medium" : ""}${warning.order.id === state.activeOrderId ? " is-active" : ""}" type="button" data-order-id="${warning.order.id}">
              ${warning.order.id} · ${warning.level}
            </button>
          `).join("")}</div>`;
        }).join("")}
      </div>
    `).join("")}
  `;

  $("#deliveryTimeline").querySelectorAll("[data-order-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeOrderId = button.dataset.orderId;
      saveState();
      renderAll();
    });
  });
}

function renderDetail() {
  const warning = getActiveWarning();
  if (!warning) return;
  $("#detailWarningLevel").textContent = `${warning.level}风险`;
  $("#detailOrderId").textContent = warning.order.id;
  $("#detailProduct").textContent = warning.order.product;
  $("#detailGrid").innerHTML = [
    ["客户", warning.order.customer],
    ["承诺交期", formatDate(warning.dueDate)],
    ["预计完工", formatDate(warning.finishDate)],
    ["交期缓冲", `${warning.buffer >= 0 ? "+" : ""}${warning.buffer} 天`],
    ["产线", warning.order.line],
    ["排程", warning.order.schedule],
    ["齐套", warning.order.kit],
    ["优先级", warning.order.priority],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#reasonList").innerHTML = warning.reasons.map((item) => `
    <div>
      <span>${item.type}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner}</em>
    </div>
  `).join("");

  $("#actionList").innerHTML = getActions(warning).map((item) => `
    <div>
      <span>${item.type}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner}</em>
    </div>
  `).join("");
}

function getActions(warning) {
  const actions = [];
  if (warning.reasons.some((item) => item.type === "缺料")) actions.push({ type: "催料", desc: "确认关键物料到货时间，必要时拆批生产", owner: "物料" });
  if (warning.reasons.some((item) => item.type === "产能")) actions.push({ type: "排程", desc: "调整排程窗口或申请产线加班", owner: "计划" });
  if (warning.reasons.some((item) => item.type === "设备")) actions.push({ type: "设备", desc: "确认保养窗口，释放关键设备能力", owner: "设备" });
  if (warning.reasons.some((item) => item.type === "质量")) actions.push({ type: "质量", desc: "提前确认首件和检验放行要求", owner: "质量" });
  if (warning.buffer < 0) actions.push({ type: "客户", desc: "评估交付承诺调整或分批发运", owner: "计划 / 销售" });
  if (!actions.length) actions.push({ type: "监控", desc: "保持当前排程，跟踪齐套和完工节点", owner: "计划" });
  return actions;
}

function getLevelStyle(level) {
  if (level === "高") return "red";
  if (level === "中") return "orange";
  return "green";
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
  const warning = getActiveWarning();
  const logs = integrationLogs.filter((log) => !warning || log.orderId === warning.order.id).slice(0, 4);
  $("#warningLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>预警处置动作会在这里留下记录</strong><em>待处理</em></div>`;
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
  $("#warningSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#levelFilter").addEventListener("change", (event) => {
    state.level = event.target.value;
    saveState();
    renderAll();
  });
  $("#reasonFilter").addEventListener("change", (event) => {
    state.reason = event.target.value;
    saveState();
    renderAll();
  });
  $("#refreshWarningBtn").addEventListener("click", () => {
    renderAll();
    showToast("交期预警已刷新");
  });
  $("#confirmFollowBtn").addEventListener("click", () => {
    const warning = getActiveWarning();
    recordIntegration(warning.order.id, "交期预警已确认跟进");
    saveState();
    renderLogs();
    showToast("交期预警已确认跟进");
  });
  $("#expediteBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { priority: "紧急", risk: "交期" }, "订单已设为加急并纳入交期跟进"));
  $("#materialEscalateBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { risk: "缺料", kit: "缺料待补", materialGap: "关键物料到货需升级确认" }, "缺料风险已升级给物料"));
  $("#capacityEscalateBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { schedule: "待调整", risk: "交期" }, "已申请产能协调并退回排程调整"));
  $("#qualityHoldBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { risk: "质量", materialGap: "检验放行要求需质量会签" }, "质量会签已发起"));
  $("#resetWarningPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    schedulePlans = {};
    integrationLogs = [];
    state = { activeOrderId: "MO-202606-0005", search: "", level: "all", reason: "all" };
    $("#warningSearch").value = "";
    $("#levelFilter").value = "all";
    $("#reasonFilter").value = "all";
    renderAll();
    showToast("预警演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#warningSearch").value = state.search;
$("#levelFilter").value = state.level;
$("#reasonFilter").value = state.reason;
bindEvents();
renderAll();
