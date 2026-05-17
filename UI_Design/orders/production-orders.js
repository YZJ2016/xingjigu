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
let state = {
  activeOrderId: "MO-202606-0001",
  search: "",
  status: "all",
  line: "all",
  risk: "all",
  page: 1,
  pageSize: 5,
  editingOrderId: null,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "生产订单" ? " class=\"is-active\"" : "";
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
    button.addEventListener("click", () => {
      const group = button.closest(".module-group");
      group.classList.toggle("is-open");
    });
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
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, integrationLogs, state }));
}

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || orders[0];
}

function createEmptyOrder() {
  const nextNumber = orders.reduce((max, order) => {
    const match = order.id.match(/MO-202606-(\d+)/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0) + 1;
  return {
    id: `MO-202606-${String(nextNumber).padStart(4, "0")}`,
    product: "",
    customer: "",
    qty: 100,
    done: 0,
    due: "2026-07-10",
    line: "Line-A",
    status: "待评审",
    priority: "中",
    risk: "正常",
    review: "待评审",
    schedule: "未排程",
    kit: "待检查",
    batchPlan: "未拆批",
    planner: "待分配",
    materialGap: "待检查",
  };
}

function getFilteredOrders() {
  const keyword = state.search.trim().toLowerCase();
  return orders.filter((order) => {
    const text = `${order.id} ${order.product} ${order.customer} ${order.line}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || order.status === state.status;
    const lineMatch = state.line === "all" || order.line === state.line;
    const riskMatch = state.risk === "all" || order.risk === state.risk;
    return keywordMatch && statusMatch && lineMatch && riskMatch;
  });
}

function getPagination(visibleOrders = getFilteredOrders()) {
  const total = visibleOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  const start = (state.page - 1) * state.pageSize;
  return {
    total,
    totalPages,
    start,
    end: Math.min(total, start + state.pageSize),
    pageOrders: visibleOrders.slice(start, start + state.pageSize),
  };
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderPagination();
  renderDetail();
  renderIntegrations();
}

function renderMetrics() {
  const visible = getFilteredOrders();
  $("#metricTotal").textContent = visible.length;
  $("#metricReview").textContent = visible.filter((order) => order.review !== "已通过").length;
  $("#metricSchedule").textContent = visible.filter((order) => order.schedule !== "已确认").length;
  $("#metricRisk").textContent = visible.filter((order) => ["缺料", "交期"].includes(order.risk)).length;
}

function renderTable() {
  const visible = getFilteredOrders();
  const pagination = getPagination(visible);
  $("#orderTableBody").innerHTML = visible.length
    ? pagination.pageOrders.map((order) => {
      const progress = Math.round((order.done / order.qty) * 100);
      return `
        <tr class="${order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${order.id}">
          <td class="order-no">${order.id}</td>
          <td class="product-cell"><strong>${order.product}</strong><span>${order.planner} · ${order.review} · ${order.schedule}</span></td>
          <td>${order.customer}</td>
          <td>${order.done} / ${order.qty}</td>
          <td><span class="pill pill--blue">${order.status}</span></td>
          <td>${order.due}</td>
          <td>${order.line}</td>
          <td><span class="pill pill--${getRiskStyle(order.risk)}">${order.risk}</span></td>
          <td class="progress">${progress}%<span><i style="width:${progress}%"></i></span></td>
          <td>
            <div class="table-actions">
              <button type="button" data-action="edit" data-order-id="${order.id}">编辑</button>
              <button class="danger-action" type="button" data-action="delete" data-order-id="${order.id}">删除</button>
            </div>
          </td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="10">当前筛选条件下没有生产订单</td></tr>`;

  document.querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      if (row.dataset.action) return;
      state.activeOrderId = row.dataset.orderId;
      saveState();
      renderAll();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (button.dataset.action === "edit") openOrderForm(button.dataset.orderId);
      if (button.dataset.action === "delete") deleteOrder(button.dataset.orderId);
    });
  });
}

function renderPagination() {
  const pagination = getPagination();
  $("#paginationInfo").textContent = pagination.total
    ? `共 ${pagination.total} 条 · 第 ${pagination.start + 1}-${pagination.end} 条 · 第 ${state.page} / ${pagination.totalPages} 页`
    : "共 0 条";
  $("#pageSizeSelect").value = String(state.pageSize);
  $("#prevPageBtn").disabled = state.page <= 1;
  $("#nextPageBtn").disabled = state.page >= pagination.totalPages;
  $("#pageButtons").innerHTML = Array.from({ length: pagination.totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="${page === state.page ? "is-active" : ""}" type="button" data-page="${page}">${page}</button>`;
  }).join("");
  $("#pageButtons").querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      state.page = Number(button.dataset.page);
      saveState();
      renderAll();
    });
  });
}

function renderDetail() {
  const order = getActiveOrder();
  if (!order) {
    $("#detailStatus").textContent = "无订单";
    $("#detailOrderId").textContent = "暂无生产订单";
    $("#detailProduct").textContent = "请新增订单或重置演示数据";
    $("#detailGrid").innerHTML = "";
    $("#reviewChecklist").innerHTML = "";
    $("#schedulePlan").innerHTML = "";
    $("#integrationList").innerHTML = "";
    return;
  }
  $("#detailStatus").textContent = order.status;
  $("#detailOrderId").textContent = order.id;
  $("#detailProduct").textContent = order.product;
  $("#detailGrid").innerHTML = [
    ["客户", order.customer],
    ["计划数量", `${order.qty} 台`],
    ["完成数量", `${order.done} 台`],
    ["承诺交期", order.due],
    ["产线", order.line],
    ["优先级", order.priority],
    ["计划员", order.planner],
    ["风险", order.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#reviewChecklist").innerHTML = [
    ["产品主数据", order.review === "已通过" ? "通过" : "待确认", order.product],
    ["BOM 与工艺", order.review === "已通过" ? "已发布" : "待工艺确认", "版本 V2026.06"],
    ["工位设备能力", order.review === "已通过" ? "通过" : "待检查", order.line],
    ["检验计划", order.risk === "资料" ? "待确认" : "已配置", "首件 / IPQC / FQC"],
    ["编码与标签", order.review === "已通过" ? "已启用" : "待检查", "工单、批次、SN"],
  ].map(([label, status, desc]) => `<div><span>${label}</span><strong>${desc}</strong><em>${status}</em></div>`).join("");

  $("#schedulePlan").innerHTML = [
    ["订单批次", `${order.batchPlan} 台`, order.kit],
    ["SMT 贴片", "06-20 08:00-12:00", `${order.line} / SMT`],
    ["DIP 插件", "06-20 13:00-18:00", `${order.line} / DIP`],
    ["测试老化", order.risk === "设备" ? "需避开设备高峰" : "06-22 08:00-06-23 06:00", "Test / Aging"],
    ["包装入库", "06-23 13:00-18:00", "Pack / WMS"],
  ].map(([step, time, resource]) => `<div><span>${step}</span><strong>${time}</strong><em>${resource}</em></div>`).join("");
}

function getIntegrationItems(order) {
  return [
    {
      target: "ERP",
      desc: "同步工单主数据、客户交期、计划数量",
      status: ["待评审", "待排程"].includes(order.status) ? "待同步" : "已同步",
    },
    {
      target: "APS 排程",
      desc: `${order.line} 产能负荷、批次计划、交期优先级`,
      status: order.schedule === "已确认" ? "已更新" : "待排程",
    },
    {
      target: "物料与线边库",
      desc: `${order.kit}，${order.materialGap}`,
      status: order.kit === "齐套" ? "齐套" : "需跟进",
    },
    {
      target: "派工与生产任务",
      desc: "工序任务、班组任务、任务下达状态",
      status: ["已下达", "生产中", "待首检", "待检", "包装中"].includes(order.status) ? "可下达" : "待订单确认",
    },
    {
      target: "质量检验",
      desc: "首件、过程检验、成品放行计划",
      status: ["质量", "资料"].includes(order.risk) ? "需确认" : "已准备",
    },
    {
      target: "WMS / 成品入库",
      desc: "完工数量、包装批次、入库预约",
      status: ["包装中", "待检"].includes(order.status) ? "待入库" : "未触发",
    },
  ];
}

function renderIntegrations() {
  const order = getActiveOrder();
  if (!order) return;
  const latestLog = integrationLogs.find((log) => log.orderId === order.id);
  $("#integrationList").innerHTML = `
    <div class="integration-summary">
      <span>最近联动</span>
      <strong>${latestLog ? latestLog.action : "暂无变更触发"}</strong>
      <em>${latestLog ? latestLog.time : "修改订单后生成联动记录"}</em>
    </div>
    ${getIntegrationItems(order).map((item) => `
      <div class="integration-item">
        <span>${item.target}</span>
        <strong>${item.desc}</strong>
        <em>${item.status}</em>
      </div>
    `).join("")}
  `;
}

function getRiskStyle(risk) {
  if (risk === "正常") return "green";
  if (risk === "缺料" || risk === "交期" || risk === "质量") return "red";
  return "orange";
}

function bindEvents() {
  $("#createOrderBtn").addEventListener("click", () => openOrderForm());
  $("#editActiveOrderBtn").addEventListener("click", () => openOrderForm(state.activeOrderId));
  $("#deleteActiveOrderBtn").addEventListener("click", () => deleteOrder(state.activeOrderId));
  $("#orderFormClose").addEventListener("click", closeOrderForm);
  $("#orderFormCancel").addEventListener("click", closeOrderForm);
  $("#orderFormBackdrop").addEventListener("click", (event) => {
    if (event.target.id === "orderFormBackdrop") closeOrderForm();
  });
  $("#orderForm").addEventListener("submit", saveOrderForm);
  $("#orderSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    state.page = 1;
    saveState();
    renderAll();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    state.page = 1;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    state.page = 1;
    saveState();
    renderAll();
  });
  $("#riskFilter").addEventListener("change", (event) => {
    state.risk = event.target.value;
    state.page = 1;
    saveState();
    renderAll();
  });
  $("#pageSizeSelect").addEventListener("change", (event) => {
    state.pageSize = Number(event.target.value);
    state.page = 1;
    saveState();
    renderAll();
  });
  $("#prevPageBtn").addEventListener("click", () => {
    state.page = Math.max(1, state.page - 1);
    saveState();
    renderAll();
  });
  $("#nextPageBtn").addEventListener("click", () => {
    state.page += 1;
    saveState();
    renderAll();
  });
  $("#resetOrderPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    integrationLogs = [];
    state = { activeOrderId: "MO-202606-0001", search: "", status: "all", line: "all", risk: "all", page: 1, pageSize: 5, editingOrderId: null };
    $("#orderSearch").value = "";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    $("#riskFilter").value = "all";
    $("#pageSizeSelect").value = "5";
    renderAll();
    showToast("订单演示已重置");
  });
  $("#syncErpBtn").addEventListener("click", () => {
    showToast("已模拟同步 ERP 工单，未发现重复幂等键");
  });
  $("#reviewPassBtn").addEventListener("click", () => updateActiveOrder({ review: "已通过", status: "待排程", risk: getActiveOrder().risk === "资料" ? "正常" : getActiveOrder().risk }, "订单评审已通过"));
  $("#scheduleConfirmBtn").addEventListener("click", () => updateActiveOrder({ review: "已通过", schedule: "已确认", status: getActiveOrder().status === "待排程" ? "已排程" : getActiveOrder().status }, "排程已确认"));
  $("#kitReadyBtn").addEventListener("click", () => updateActiveOrder({ kit: "齐套", materialGap: "齐套", risk: getActiveOrder().risk === "缺料" ? "正常" : getActiveOrder().risk }, "齐套状态已更新"));
  $("#priorityBtn").addEventListener("click", () => updateActiveOrder({ priority: "紧急", schedule: "待调整" }, "已设为加急并进入计划调整"));
  $("#createRiskBtn").addEventListener("click", () => updateActiveOrder({ risk: "交期", schedule: "待调整" }, "计划风险已登记"));
}

function updateActiveOrder(patch, message) {
  const index = orders.findIndex((order) => order.id === state.activeOrderId);
  if (index < 0) return;
  orders[index] = { ...orders[index], ...patch };
  recordIntegration(orders[index].id, message);
  saveState();
  renderAll();
  showToast(message);
}

function openOrderForm(orderId) {
  const order = orderId ? orders.find((item) => item.id === orderId) : createEmptyOrder();
  if (!order) {
    showToast("未找到要编辑的生产订单");
    return;
  }
  state.editingOrderId = orderId || null;
  $("#orderFormTitle").textContent = orderId ? "编辑订单" : "新增订单";
  $("#formOrderId").value = order.id;
  $("#formOrderId").disabled = Boolean(orderId);
  $("#formProduct").value = order.product;
  $("#formCustomer").value = order.customer;
  $("#formQty").value = order.qty;
  $("#formDone").value = order.done;
  $("#formDue").value = order.due;
  $("#formLine").value = order.line;
  $("#formStatus").value = order.status;
  $("#formPriority").value = order.priority;
  $("#formRisk").value = order.risk;
  $("#formPlanner").value = order.planner;
  $("#formBatchPlan").value = order.batchPlan;
  $("#formKit").value = order.kit;
  $("#formMaterialGap").value = order.materialGap;
  $("#orderFormBackdrop").hidden = false;
}

function closeOrderForm() {
  state.editingOrderId = null;
  $("#orderFormBackdrop").hidden = true;
  $("#formOrderId").disabled = false;
}

function saveOrderForm(event) {
  event.preventDefault();
  const qty = Number($("#formQty").value);
  const done = Number($("#formDone").value);
  const status = $("#formStatus").value;
  const order = {
    id: $("#formOrderId").value.trim(),
    product: $("#formProduct").value.trim(),
    customer: $("#formCustomer").value.trim(),
    qty,
    done: Math.min(done, qty),
    due: $("#formDue").value,
    line: $("#formLine").value,
    status,
    priority: $("#formPriority").value,
    risk: $("#formRisk").value,
    review: ["待评审", "待排程"].includes(status) ? "待评审" : "已通过",
    schedule: ["待评审", "待排程"].includes(status) ? "未排程" : "已确认",
    kit: $("#formKit").value.trim(),
    batchPlan: $("#formBatchPlan").value.trim(),
    planner: $("#formPlanner").value.trim(),
    materialGap: $("#formMaterialGap").value.trim(),
  };
  if (!order.id || !order.product || !order.customer || !order.due || !order.planner) {
    showToast("请补齐订单必填信息");
    return;
  }
  if (qty < 1 || done < 0) {
    showToast("数量必须为有效数字");
    return;
  }
  const existingIndex = orders.findIndex((item) => item.id === order.id);
  if (!state.editingOrderId && existingIndex >= 0) {
    showToast("工单号已存在");
    return;
  }
  const isEdit = Boolean(state.editingOrderId);
  if (isEdit) {
    const index = orders.findIndex((item) => item.id === state.editingOrderId);
    if (index < 0) return;
    orders[index] = order;
  } else {
    orders.unshift(order);
    state.page = 1;
  }
  state.activeOrderId = order.id;
  recordIntegration(order.id, isEdit ? "订单变更已推送联动" : "新增订单已推送联动");
  closeOrderForm();
  saveState();
  renderAll();
  showToast(isEdit ? "生产订单已更新" : "生产订单已新增");
}

function deleteOrder(orderId) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("未找到要删除的生产订单");
    return;
  }
  const confirmed = window.confirm(`确认删除 ${order.id}？删除后可通过重置演示恢复初始数据。`);
  if (!confirmed) return;
  recordIntegration(order.id, "删除订单已通知下游模块");
  orders = orders.filter((item) => item.id !== orderId);
  if (state.activeOrderId === orderId) {
    state.activeOrderId = orders[0]?.id || "";
  }
  state.page = Math.min(state.page, getPagination().totalPages);
  saveState();
  renderAll();
  showToast("生产订单已删除");
}

function recordIntegration(orderId, action) {
  integrationLogs = [
    {
      orderId,
      action,
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    },
    ...integrationLogs.filter((log) => log.orderId !== orderId),
  ].slice(0, 20);
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

loadState();
renderFrameMenu();
$("#orderSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
$("#riskFilter").value = state.risk;
$("#pageSizeSelect").value = String(state.pageSize);
bindEvents();
renderAll();
