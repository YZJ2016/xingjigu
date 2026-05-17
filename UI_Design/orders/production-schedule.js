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
const lines = ["Line-A", "Line-B", "Line-C"];
const operationTemplates = [
  ["SMT 贴片", "08:00", "12:00", "SMT-01"],
  ["DIP 插件", "13:00", "18:00", "DIP-Line"],
  ["程序烧录", "06-21 08:00", "06-21 12:00", "Burn-01"],
  ["整机装配", "06-21 13:00", "06-21 18:00", "Assembly"],
  ["功能测试", "06-22 08:00", "06-22 14:00", "Test"],
  ["老化测试", "06-22 14:00", "06-23 06:00", "Aging-Room-1"],
  ["FQC 成品检验", "06-23 08:00", "06-23 12:00", "QC-Final"],
  ["包装入库", "06-23 13:00", "06-23 18:00", "Pack"],
];

let orders = structuredClone(initialOrders);
let integrationLogs = [];
let schedulePlans = {};
let state = {
  activeOrderId: "MO-202606-0005",
  search: "",
  schedule: "all",
  line: "all",
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
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    orders = saved.orders || orders;
    integrationLogs = saved.integrationLogs || integrationLogs;
    schedulePlans = saved.schedulePlans || schedulePlans;
    state = { ...state, ...(saved.scheduleState || {}) };
    if (!["all", "未排程", "待调整"].includes(state.schedule)) state.schedule = "all";
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, integrationLogs, schedulePlans, scheduleState: state }));
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || orders.find((order) => order.review === "已通过" && order.schedule !== "已确认") || orders[0];
}

function getPlan(order) {
  if (!schedulePlans[order.id] || typeof schedulePlans[order.id].dayOffset !== "number" || !schedulePlans[order.id].window) {
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
  const resources = {
    "Line-A": ["SMT-01", "DIP-Line-A", "Assembly-A", "Test-A", "Pack-A"],
    "Line-B": ["SMT-02", "DIP-Line-B", "Assembly-B", "Test-B", "Pack-B"],
    "Line-C": ["SMT-03", "DIP-Line-C", "Assembly-C", "Test-C", "Pack-C"],
  }[order.line] || ["SMT-01", "DIP-Line-A", "Assembly-A", "Test-A", "Pack-A"];

  return {
    strategy: hasGap ? "拆批生产" : "整批排程",
    batchPlan: secondBatch ? `${firstBatch} + ${secondBatch}` : `${order.qty}`,
    bottleneck: order.qty >= 1000 ? "老化测试" : "功能测试",
    release: order.schedule === "已确认" ? "可下发" : "待确认",
    dayOffset,
    duration,
    window: `${planDays[dayOffset]}-${planDays[Math.min(planDays.length - 1, dayOffset + duration - 1)]}`,
    constraints: [
      { label: "物料", desc: order.materialGap, status: hasGap ? "需确认" : "齐套" },
      { label: "设备", desc: hasEquipmentRisk ? `${order.line} 设备日历需确认` : `${order.line} 资源可用`, status: hasEquipmentRisk ? "需确认" : "可用" },
      { label: "交期", desc: `${order.due} 前完成包装入库`, status: order.risk === "交期" ? "需调整" : "可承诺" },
      { label: "质量", desc: "首件、功能测试、FQC 检验计划", status: order.risk === "质量" ? "需确认" : "已配置" },
    ],
    operations: operationTemplates.map(([name, start, end, resource], index) => ({
      name,
      start: start.includes("06-") ? shiftOperationDate(start, dayOffset) : `${planDays[dayOffset]} ${start}`,
      end: end.includes("06-") ? shiftOperationDate(end, dayOffset) : `${planDays[dayOffset]} ${end}`,
      resource: resource.includes("-") ? resource : `${resource}-${order.line.slice(-1)}`,
      qty: index < 2 && secondBatch ? firstBatch : order.qty,
      status: order.schedule === "已确认" ? "已确认" : (hasGap && index > 5 ? "待物料" : "建议"),
    })).map((item, index) => {
      if (index === 0) return { ...item, resource: resources[0] };
      if (index === 1) return { ...item, resource: resources[1] };
      if (index === 3) return { ...item, resource: resources[2] };
      if (index === 4) return { ...item, resource: resources[3] };
      if (index === 7) return { ...item, resource: resources[4] };
      return item;
    }),
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
  renderLogs();
}

function renderMetrics() {
  $("#metricUnplanned").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "未排程").length;
  $("#metricAdjust").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "待调整").length;
  $("#metricConfirmed").textContent = orders.filter((order) => order.review === "已通过" && order.schedule === "已确认").length;
  const load = Math.min(96, Math.round(orders.filter((order) => order.review === "已通过").reduce((sum, order) => sum + order.qty, 0) / 118));
  $("#metricBottleneck").textContent = `${load}%`;
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
  const rows = lines.map((line) => {
    const lineOrders = visible.filter((order) => order.line === line).sort((a, b) => getPlan(a).dayOffset - getPlan(b).dayOffset);
    const items = lineOrders.map((order, index) => {
      const plan = getPlan(order);
      const statusClass = order.schedule === "已确认" ? " is-confirmed" : order.schedule === "待调整" ? " is-risk" : "";
      return `
        <button class="gantt-item${statusClass}${order.id === state.activeOrderId ? " is-active" : ""}" type="button" data-order-id="${order.id}" style="--start:${plan.dayOffset + 1}; --span:${plan.duration}; --lane:${index % 3}">
          <strong>${order.id}</strong>
          <span>${order.product.split(" ")[0]} · ${plan.batchPlan}</span>
        </button>
      `;
    }).join("");
    return `<div class="timeline-row"><div class="timeline-line">${line}</div><div class="gantt-lane">${items}</div></div>`;
  }).join("");
  $("#timelineGrid").innerHTML = `
    <div class="timeline-head">
      <div>产线</div>
      ${planDays.map((day) => `<div>${day}</div>`).join("")}
    </div>
    ${rows}
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
    return `
      <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td>${order.line}</td>
        <td>${plan.batchPlan}</td>
        <td>${plan.window}</td>
        <td><span class="pill pill--green">${order.status === "已下达" ? "已下发" : "待下发"}</span></td>
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
  $("#operationTableBody").innerHTML = plan.operations.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.start}</td>
      <td>${item.end}</td>
      <td>${item.resource}</td>
      <td>${item.qty} 台</td>
      <td><span class="pill pill--${item.status === "已确认" ? "green" : item.status === "待物料" ? "orange" : "blue"}">${item.status}</span></td>
    </tr>
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
  saveState();
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

function bindEvents() {
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
    saveState();
    renderAll();
    showToast(`已生成 ${targets.length} 个排程建议`);
  });
  $("#confirmPlanBtn").addEventListener("click", () => confirmPlan(getActiveOrder()));
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
    orders = structuredClone(initialOrders);
    integrationLogs = [];
    schedulePlans = {};
    state = { activeOrderId: "MO-202606-0005", search: "", schedule: "all", line: "all" };
    $("#scheduleSearch").value = "";
    $("#scheduleFilter").value = "all";
    $("#lineFilter").value = "all";
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
renderAll();
