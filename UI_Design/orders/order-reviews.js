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

let orders = structuredClone(initialOrders);
let integrationLogs = [];
let reviewMaterials = {};
let state = {
  activeOrderId: "MO-202606-0006",
  search: "",
  review: "all",
  risk: "all",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "订单评审" ? " class=\"is-active\"" : "";
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
    integrationLogs = saved.integrationLogs || integrationLogs;
    reviewMaterials = saved.reviewMaterials || reviewMaterials;
    state = { ...state, ...(saved.reviewState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, integrationLogs, reviewMaterials, reviewState: state }));
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || orders.find((order) => order.review !== "已通过") || orders[0];
}

function getReviewScope(order) {
  const materials = getReviewMaterials(order);
  const gates = [
    { label: "产品主数据", desc: order.product, status: order.review === "已通过" ? "通过" : "待确认" },
    { label: "BOM 与工艺", desc: "BOM、工艺路线、标准工时", status: getMaterialGateStatus(materials, ["bom", "route"]) },
    { label: "交期承诺", desc: `${order.customer} · ${order.due}`, status: order.risk === "交期" ? "需计划确认" : "可承诺" },
    { label: "物料齐套", desc: `${order.kit} · ${order.materialGap}`, status: order.risk === "缺料" ? "需物料会签" : "通过" },
    { label: "质量要求", desc: "首件 / IPQC / FQC", status: getMaterialGateStatus(materials, ["quality"]) },
    { label: "设备能力", desc: `${order.line} 产能与设备日历`, status: order.risk === "设备" ? "需设备确认" : "通过" },
  ];
  const blocked = gates.filter((gate) => !["通过", "已发布", "可承诺", "已配置"].includes(gate.status));
  return { gates, blocked };
}

function getReviewMaterials(order) {
  if (!reviewMaterials[order.id]) {
    const dataRisk = order.risk === "资料";
    const qualityRisk = order.risk === "质量";
    reviewMaterials[order.id] = [
      { id: "order", name: "订单资料", desc: `${order.customer} / ${order.qty} 台 / ${order.due}`, owner: "计划", status: "已确认" },
      { id: "product", name: "产品资料", desc: `${order.product} / 当前有效版本`, owner: "基础资料", status: dataRisk ? "待确认" : "已确认" },
      { id: "bom", name: "BOM", desc: "BOM-2026.06 / 用量与替代料", owner: "工艺", status: dataRisk ? "待补充" : "已确认" },
      { id: "route", name: "工艺路线", desc: `${order.line} / SMT-DIP-测试-包装`, owner: "工艺", status: dataRisk ? "待确认" : "已确认" },
      { id: "sop", name: "SOP / 图纸", desc: "作业指导书、包装规范、标签规则", owner: "工艺", status: dataRisk ? "待补充" : "已确认" },
      { id: "quality", name: "检验标准", desc: "首件、过程检验、成品放行要求", owner: "质量", status: dataRisk || qualityRisk ? "待确认" : "已确认" },
      { id: "material", name: "物料资料", desc: order.materialGap, owner: "物料", status: order.risk === "缺料" ? "待确认" : "已确认" },
      { id: "equipment", name: "设备能力", desc: `${order.line} 设备日历与保养窗口`, owner: "设备", status: order.risk === "设备" ? "待确认" : "已确认" },
    ];
  }
  return reviewMaterials[order.id];
}

function getMaterialGateStatus(materials, ids) {
  const scoped = materials.filter((item) => ids.includes(item.id));
  return scoped.every((item) => item.status === "已确认") ? "已配置" : "需确认";
}

function getFilteredOrders() {
  const keyword = state.search.trim().toLowerCase();
  return orders.filter((order) => {
    const text = `${order.id} ${order.product} ${order.customer} ${order.planner}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const reviewMatch = state.review === "all" || order.review === state.review;
    const riskMatch = state.risk === "all" || order.risk === state.risk;
    return keywordMatch && reviewMatch && riskMatch;
  });
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderDetail();
  renderLogs();
}

function renderMetrics() {
  $("#metricPending").textContent = orders.filter((order) => order.review !== "已通过").length;
  $("#metricDataRisk").textContent = orders.filter((order) => order.risk === "资料").length;
  $("#metricCountersign").textContent = orders.filter((order) => ["缺料", "质量", "设备", "交期"].includes(order.risk)).length;
  $("#metricReady").textContent = orders.filter((order) => order.review === "已通过" && order.schedule !== "已确认").length;
}

function renderTable() {
  const visible = getFilteredOrders();
  $("#reviewTableBody").innerHTML = visible.length
    ? visible.map((order) => {
      const { blocked } = getReviewScope(order);
      const conclusion = order.review === "已通过"
        ? "已通过，可进入排程或下达"
        : blocked.length ? blocked.map((item) => item.label).join("、") : "资料齐备，待确认";
      return `
        <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
          <td class="order-no">${order.id}</td>
          <td class="product-cell"><strong>${order.product}</strong><span>${order.qty} 台 · ${order.line} · ${order.due}</span></td>
          <td>${order.customer}</td>
          <td><span class="pill pill--${order.review === "已通过" ? "green" : "orange"}">${order.review}</span></td>
          <td><span class="pill pill--${getRiskStyle(order.risk)}">${order.risk}</span></td>
          <td>${order.planner}</td>
          <td>${conclusion}</td>
          <td>
            <div class="table-actions">
              <button type="button" data-action="pass" data-order-id="${order.id}">通过</button>
              <button type="button" data-action="return" data-order-id="${order.id}">退回</button>
            </div>
          </td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="8">当前筛选条件下没有订单评审记录</td></tr>`;

  document.querySelectorAll("#reviewTableBody tr[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      saveState();
      renderAll();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeOrderId = button.dataset.orderId;
      if (button.dataset.action === "pass") passOrder(button.dataset.orderId);
      if (button.dataset.action === "return") returnOrder(button.dataset.orderId);
    });
  });
}

function renderDetail() {
  const order = getActiveOrder();
  if (!order) return;
  const { gates } = getReviewScope(order);
  $("#detailReviewStatus").textContent = order.review;
  $("#detailOrderId").textContent = order.id;
  $("#detailProduct").textContent = order.product;
  $("#detailGrid").innerHTML = [
    ["客户", order.customer],
    ["数量", `${order.qty} 台`],
    ["交期", order.due],
    ["产线", order.line],
    ["优先级", order.priority],
    ["计划员", order.planner],
    ["排程", order.schedule],
    ["齐套", order.kit],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  renderReviewMaterials(order);

  $("#gateChecklist").innerHTML = gates.map((gate) => `
    <div>
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <em>${gate.status}</em>
    </div>
  `).join("");

  $("#countersignList").innerHTML = getCountersigns(order).map((item) => `
    <div>
      <span>${item.owner}</span>
      <strong>${item.desc}</strong>
      <em>${item.status}</em>
    </div>
  `).join("");
}

function renderReviewMaterials(order) {
  $("#reviewMaterialList").innerHTML = getReviewMaterials(order).map((item) => `
    <div>
      <span>${item.name}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner} · ${item.status}</em>
      <button type="button" data-material-action="${item.status === "已确认" ? "flag" : "confirm"}" data-material-id="${item.id}">
        ${item.status === "已确认" ? "标记问题" : "确认"}
      </button>
    </div>
  `).join("");

  $("#reviewMaterialList").querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => updateMaterialStatus(order.id, button.dataset.materialId, button.dataset.materialAction));
  });
}

function getCountersigns(order) {
  return [
    { owner: "计划", desc: `${order.due} 交期与 ${order.line} 产能`, status: order.risk === "交期" ? "需确认" : "已确认" },
    { owner: "物料", desc: order.materialGap, status: order.risk === "缺料" ? "需会签" : "已确认" },
    { owner: "工艺", desc: "BOM、工艺路线、作业指导书", status: order.risk === "资料" ? "待补充" : "已确认" },
    { owner: "质量", desc: "首件、过程检验、成品放行要求", status: ["资料", "质量"].includes(order.risk) ? "需确认" : "已确认" },
    { owner: "设备", desc: `${order.line} 设备能力和保养窗口`, status: order.risk === "设备" ? "需确认" : "已确认" },
  ];
}

function renderLogs() {
  const order = getActiveOrder();
  const logs = integrationLogs.filter((log) => !order || log.orderId === order.id).slice(0, 4);
  $("#reviewLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>评审动作会在这里留下最近记录</strong><em>待处理</em></div>`;
}

function passOrder(orderId) {
  confirmAllMaterials(orderId, false);
  updateOrder(orderId, { review: "已通过", status: "待排程", risk: getOrder(orderId).risk === "资料" ? "正常" : getOrder(orderId).risk }, "订单评审已通过，转入待排程");
}

function returnOrder(orderId) {
  flagCoreMaterials(orderId);
  updateOrder(orderId, { review: "待评审", status: "待评审", risk: "资料", schedule: "未排程", planner: getOrder(orderId).planner === "待分配" ? "周计划" : getOrder(orderId).planner, materialGap: "生产资料需补充确认" }, "订单已退回补充生产资料");
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

function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}

function recordIntegration(orderId, action) {
  integrationLogs = [
    { orderId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...integrationLogs,
  ].slice(0, 30);
}

function updateMaterialStatus(orderId, materialId, action) {
  const materials = getReviewMaterials(getOrder(orderId));
  reviewMaterials[orderId] = materials.map((item) => {
    if (item.id !== materialId) return item;
    return { ...item, status: action === "confirm" ? "已确认" : "待补充" };
  });
  const issue = reviewMaterials[orderId].some((item) => item.status !== "已确认");
  updateOrder(orderId, { review: issue ? "待评审" : getOrder(orderId).review, risk: issue ? "资料" : getOrder(orderId).risk }, action === "confirm" ? "评审资料已确认" : "评审资料已标记问题");
}

function confirmAllMaterials(orderId, showMessage = true) {
  reviewMaterials[orderId] = getReviewMaterials(getOrder(orderId)).map((item) => ({ ...item, status: "已确认" }));
  if (showMessage) updateOrder(orderId, { risk: getOrder(orderId).risk === "资料" ? "正常" : getOrder(orderId).risk }, "评审资料已全部确认");
}

function flagCoreMaterials(orderId) {
  reviewMaterials[orderId] = getReviewMaterials(getOrder(orderId)).map((item) => (
    ["bom", "route", "sop", "quality"].includes(item.id) ? { ...item, status: "待补充" } : item
  ));
}

function getRiskStyle(risk) {
  if (risk === "正常") return "green";
  if (["缺料", "交期", "质量"].includes(risk)) return "red";
  return "orange";
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
  $("#reviewSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#reviewFilter").addEventListener("change", (event) => {
    state.review = event.target.value;
    saveState();
    renderAll();
  });
  $("#riskFilter").addEventListener("change", (event) => {
    state.risk = event.target.value;
    saveState();
    renderAll();
  });
  $("#passActiveBtn").addEventListener("click", () => passOrder(getActiveOrder().id));
  $("#returnActiveBtn").addEventListener("click", () => returnOrder(getActiveOrder().id));
  $("#confirmMaterialsBtn").addEventListener("click", () => confirmAllMaterials(getActiveOrder().id));
  $("#markDataBtn").addEventListener("click", () => {
    flagCoreMaterials(getActiveOrder().id);
    updateOrder(getActiveOrder().id, { review: "待评审", status: "待评审", risk: "资料", materialGap: "BOM / 工艺 / 检验要求待补充" }, "已标记资料问题");
  });
  $("#markMaterialBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { review: "待评审", status: "待评审", risk: "缺料", kit: "待确认", materialGap: "关键物料齐套时间待确认" }, "已标记缺料会签"));
  $("#markQualityBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { review: "待评审", status: "待评审", risk: "质量", materialGap: "检验标准或首件要求待确认" }, "已标记质量会签"));
  $("#moveScheduleBtn").addEventListener("click", () => updateOrder(getActiveOrder().id, { review: "已通过", status: "待排程", schedule: "未排程" }, "订单已转入待排程"));
  $("#batchPassBtn").addEventListener("click", () => {
    const targets = orders.filter((order) => order.review !== "已通过" && ["正常", "资料"].includes(order.risk));
    if (!targets.length) {
      showToast("没有可批量通过的低风险订单");
      return;
    }
    targets.forEach((order) => {
      order.review = "已通过";
      order.status = "待排程";
      if (order.risk === "资料") order.risk = "正常";
      recordIntegration(order.id, "低风险订单批量评审通过");
    });
    state.activeOrderId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已批量通过 ${targets.length} 个订单`);
  });
  $("#resetReviewPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    integrationLogs = [];
    reviewMaterials = {};
    state = { activeOrderId: "MO-202606-0006", search: "", review: "all", risk: "all" };
    $("#reviewSearch").value = "";
    $("#reviewFilter").value = "all";
    $("#riskFilter").value = "all";
    renderAll();
    showToast("评审演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#reviewSearch").value = state.search;
$("#reviewFilter").value = state.review;
$("#riskFilter").value = state.risk;
bindEvents();
renderAll();
