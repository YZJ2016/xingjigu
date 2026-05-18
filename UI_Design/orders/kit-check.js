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
let orders = structuredClone(initialOrders);
let schedulePlans = {};
let integrationLogs = [];
let kitChecks = {};
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
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "../dispatch/sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
      else if (moduleId === "station" && entry === "扫码开工") window.location.href = "../station/scan-start.html";
      else if (moduleId === "station" && entry === "工艺指导") window.location.href = "../station/work-instruction.html";
      else if (moduleId === "station" && entry === "投料确认") window.location.href = "../station/feeding-confirmation.html";
      else if (moduleId === "station" && entry === "过程记录") window.location.href = "../station/process-record.html";
      else if (moduleId === "station" && entry === "工序报工") window.location.href = "../station/operation-report.html";
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
    kitChecks = saved.kitChecks || kitChecks;
    state = { ...state, ...(saved.kitState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, schedulePlans, integrationLogs, kitChecks, kitState: state }));
}

function getPlan(order) {
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
  if (!kitChecks[order.id]) kitChecks[order.id] = buildKitCheck(order);
  return kitChecks[order.id];
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
  const base = [
    { name: "PCB 主板", need: order.qty, available: order.qty + 80, transit: 0, eta: "库存可用", substitute: "无" },
    { name: order.product.includes("电源") ? "电源芯片" : "温度传感器", need: order.qty, available: Math.max(0, order.qty - shortageQty), transit: shortageQty ? Math.ceil(shortageQty * 0.7) : 0, eta: shortageQty ? "06-22 下午" : "库存可用", substitute: shortageQty ? "可评估替代批" : "无" },
    { name: "外壳组件", need: order.qty, available: order.qty + 120, transit: 0, eta: "库存可用", substitute: "无" },
    { name: "包装材料", need: order.qty, available: order.qty + 60, transit: 0, eta: "库存可用", substitute: "无" },
  ];
  return base.map((item) => ({ ...item, gap: Math.max(0, item.need - item.available - item.transit) }));
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
      <td>${item.name}</td>
      <td>${item.need}</td>
      <td>${item.available}</td>
      <td>${item.transit}</td>
      <td>${item.gap}</td>
      <td>${item.eta}</td>
      <td>${item.gap ? "催料 / 拆批" : item.substitute}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选范围内没有缺料或在途物料</td></tr>`;
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
    <div>
      <span>${item.name}</span>
      <strong>需求 ${item.need} / 可用 ${item.available} / 在途 ${item.transit}</strong>
      <em class="${item.gap ? "is-short" : item.transit ? "is-pending" : ""}">${item.gap ? `缺 ${item.gap}` : item.transit ? "在途" : "齐套"}</em>
    </div>
  `).join("");

  $("#supplyList").innerHTML = kit.materials.filter((item) => item.gap || item.transit || item.substitute !== "无").map((item) => `
    <div>
      <span>${item.name}</span>
      <strong>${item.eta} · ${item.substitute}</strong>
      <em class="${item.gap ? "is-pending" : ""}">${item.gap ? "需跟进" : "可覆盖"}</em>
    </div>
  `).join("") || `<div><span>无</span><strong>当前订单无需补料或替代料</strong><em>齐套</em></div>`;
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
  kitChecks[orderId] = {
    ...getKitCheck(order),
    status: "齐套",
    materials: getKitCheck(order).materials.map((item) => ({ ...item, available: Math.max(item.available, item.need), gap: 0 })),
    locked: true,
  };
  updateOrder(orderId, { kit: "齐套", risk: order.risk === "缺料" ? "正常" : order.risk, materialGap: "齐套" }, "齐套检查已确认");
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
    kitChecks[order.id] = {
      ...getKitCheck(order),
      status: "齐套",
      substituteApplied: true,
      materials: getKitCheck(order).materials.map((item) => ({ ...item, gap: 0, available: Math.max(item.available, item.need) })),
    };
    updateOrder(order.id, { kit: "齐套", risk: order.risk === "缺料" ? "正常" : order.risk, materialGap: "替代料已确认" }, "替代料已启用并确认齐套");
  });
  $("#splitBatchBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    updateOrder(order.id, { batchPlan: `${Math.ceil(order.qty * 0.7)} + ${order.qty - Math.ceil(order.qty * 0.7)}`, schedule: "待调整" }, "已建议按齐套数量拆批");
  });
  $("#escalateBuyerBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { risk: "缺料", kit: "缺料待补", materialGap: "采购到货承诺需升级确认" }, "缺料已升级给采购"));
  $("#lockMaterialBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    kitChecks[order.id] = { ...getKitCheck(order), locked: true };
    recordIntegration(order.id, "库存已锁定给当前订单");
    saveState();
    renderAll();
    showToast("库存已锁定");
  });
  $("#releaseScheduleBtn").addEventListener("click", () => {
    const order = getActiveOrder();
    if (getKitCheck(order).status !== "齐套") {
      showToast("请先确认齐套再放行排程");
      return;
    }
    updateOrder(order.id, { schedule: order.schedule === "未排程" ? "待调整" : order.schedule }, "齐套已同步排程与备料");
  });
  $("#batchKitBtn").addEventListener("click", () => {
    const targets = orders.filter((order) => getKitCheck(order).status === "待检查" && order.risk === "正常");
    targets.forEach((order) => confirmKit(order.id));
    showToast(targets.length ? `已确认 ${targets.length} 个低风险订单齐套` : "没有可批量确认的低风险订单");
  });
  $("#resetKitPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
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
