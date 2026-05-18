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
const resources = [
  { id: "Line-A", name: "Line-A", type: "line", label: "装配产线", dailyHours: 20 },
  { id: "Line-B", name: "Line-B", type: "line", label: "装配产线", dailyHours: 18 },
  { id: "Line-C", name: "Line-C", type: "line", label: "装配产线", dailyHours: 18 },
  { id: "Test-A", name: "功能测试", type: "bottleneck", label: "测试工位", dailyHours: 14 },
  { id: "Aging-Room-1", name: "老化房", type: "bottleneck", label: "瓶颈资源", dailyHours: 16 },
  { id: "QC-Final", name: "FQC", type: "bottleneck", label: "质量检验", dailyHours: 12 },
];

let orders = structuredClone(initialOrders);
let schedulePlans = {};
let integrationLogs = [];
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
    state = { ...state, ...(saved.capacityState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, orders, schedulePlans, integrationLogs, capacityState: state }));
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

function getOrderHours(order, resource) {
  const base = Math.max(2, Math.round(order.qty / 120));
  if (resource.type === "line") return order.line === resource.id ? base + (order.priority === "紧急" ? 2 : 0) : 0;
  if (resource.id === "Test-A") return Math.max(1, Math.round(order.qty / 180));
  if (resource.id === "Aging-Room-1") return order.qty >= 800 ? Math.max(4, Math.round(order.qty / 110)) : Math.max(2, Math.round(order.qty / 220));
  if (resource.id === "QC-Final") return Math.max(1, Math.round(order.qty / 260));
  return 0;
}

function getScheduledOrders() {
  return orders.filter((order) => order.review === "已通过" && order.schedule !== "未排程");
}

function getResourceLoads(resource) {
  const loads = planDays.map((day) => ({ day, used: 0, orders: [] }));
  getScheduledOrders().forEach((order) => {
    const plan = getPlan(order);
    const totalHours = getOrderHours(order, resource);
    if (!totalHours) return;
    const perDay = Math.ceil(totalHours / plan.duration);
    for (let index = plan.dayOffset; index < Math.min(planDays.length, plan.dayOffset + plan.duration); index += 1) {
      loads[index].used += perDay;
      loads[index].orders.push(order);
    }
  });
  return loads.map((item) => ({ ...item, percent: Math.round((item.used / resource.dailyHours) * 100), status: getLoadStatus(item.used / resource.dailyHours) }));
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
    return sum + getResourceLoads(resource).reduce((inner, item) => inner + Math.max(0, resource.dailyHours - item.used), 0);
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
            <span>${resource.label} · ${resource.dailyHours}h/日</span>
          </button>
          ${loads.map((item) => `
            <div class="load-cell is-${item.status}">
              <strong>${item.percent}%</strong>
              <span>${item.used}/${resource.dailyHours}h · ${item.orders.length} 单</span>
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
    const text = `${order.id} ${order.product} ${order.customer} ${order.line} ${resource.name}`.toLowerCase();
    return getOrderHours(order, resource) > 0 && (!keyword || text.includes(keyword));
  });
  $("#loadOrderBody").innerHTML = rows.length ? rows.map((order) => {
    const plan = getPlan(order);
    const hours = getOrderHours(order, resource);
    const impact = Math.round((hours / (resource.dailyHours * plan.duration)) * 100);
    return `
      <tr>
        <td class="order-no">${order.id}</td>
        <td class="product-cell"><strong>${order.product}</strong><span>${order.customer} · ${order.qty} 台</span></td>
        <td>${resource.name}</td>
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
  $("#detailResourceMeta").textContent = `${resource.label} · 标准可用 ${resource.dailyHours}h/日`;
  $("#detailGrid").innerHTML = [
    ["平均负荷", `${average}%`],
    ["峰值日期", peak.day],
    ["峰值负荷", `${peak.percent}%`],
    ["超载天数", `${loads.filter((item) => item.status === "over").length} 天`],
    ["偏紧天数", `${loads.filter((item) => item.status === "tight").length} 天`],
    ["占用订单", `${new Set(loads.flatMap((item) => item.orders.map((order) => order.id))).size} 单`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#dailyLoadList").innerHTML = loads.map((item) => `
    <div>
      <span>${item.day}</span>
      <strong>${item.used}/${resource.dailyHours}h · ${item.orders.map((order) => order.id).join("、") || "无订单"}</strong>
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
  return [
    { label: "峰值", desc: `${peak.day} 达到 ${peak.percent}%`, status: peak.status === "over" ? "需调整" : "可控" },
    { label: "班次", desc: `${resource.dailyHours}h/日，白班为主`, status: peak.percent > 90 ? "可加班" : "正常" },
    { label: "瓶颈", desc: resource.type === "bottleneck" ? "需优先保护关键资源" : "可跨线均衡", status: resource.type === "bottleneck" ? "重点看护" : "可调整" },
  ];
}

function getSuggestions(resource, loads) {
  const over = loads.find((item) => item.status === "over");
  const idle = loads.find((item) => item.status === "idle");
  if (over) {
    return [
      { type: "移峰", desc: `${over.day} 超载，建议将低优先级订单后移 1 天`, owner: "计划" },
      { type: "拆批", desc: "大批量订单拆为首批生产和补料后续批", owner: "计划 / 物料" },
      { type: "加班", desc: `临时扩展 ${resource.name} 可用产能`, owner: "车间" },
    ];
  }
  if (idle) {
    return [
      { type: "补产", desc: `${idle.day} 产能富余，可承接待调整订单`, owner: "计划" },
      { type: "提前", desc: "将已确认低风险订单提前释放备料", owner: "计划 / 仓储" },
    ];
  }
  return [
    { type: "维持", desc: "当前负荷均衡，按确认排程下发派工准备", owner: "计划" },
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
    showToast(overDays ? `已生成 ${resource.name} 的移峰和拆批建议` : `${resource.name} 当前负荷可控`);
  });
  $("#resetCapacityPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    orders = structuredClone(initialOrders);
    schedulePlans = {};
    integrationLogs = [];
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
