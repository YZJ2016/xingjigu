const STORAGE_KEY = "xingjigu_mes_start_check_v1";

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

const initialChecks = [
  {
    id: "D-004",
    orderId: "MO-202606-0001",
    product: "TCU-100 控制器",
    operation: "整机装配",
    line: "Line-A",
    team: "A1 班",
    station: "ASM-WS-03",
    owner: "沈浩",
    startWindow: "13:00-18:00",
    status: "待处理",
    gates: {
      dispatch: { label: "派工状态", desc: "任务已下达，等待班组接单确认", status: "待确认" },
      operator: { label: "人员资质", desc: "赵杰具备装配资质，补员待扫码", status: "待确认" },
      equipment: { label: "设备状态", desc: "电批在线，扭矩程序已加载", status: "通过" },
      material: { label: "物料齐套", desc: "外壳上盖缺 120 件，需拆批处理", status: "拦截" },
      sop: { label: "SOP 版本", desc: "SOP-ASM-016 V3.2 已推送", status: "通过" },
      quality: { label: "首件要求", desc: "变更后首件待质量确认", status: "待确认" },
      safety: { label: "安全点检", desc: "ESD 腕带在线", status: "通过" },
    },
    suggestions: ["协调线边补料或执行 680 + 120 拆批", "补员扫码后刷新人员资质", "质量确认首件抽检计划"],
  },
  {
    id: "D-002",
    orderId: "MO-202606-0001",
    product: "TCU-100 控制器",
    operation: "DIP 插件",
    line: "Line-A",
    team: "A1 班",
    station: "DIP-WS-01",
    owner: "钱佳",
    startWindow: "13:20-18:20",
    status: "可开工",
    gates: {
      dispatch: { label: "派工状态", desc: "任务已接单", status: "通过" },
      operator: { label: "人员资质", desc: "补员1、补员2 已完成资质校验", status: "通过" },
      equipment: { label: "设备状态", desc: "防错夹具 JIG-DIP-04 在线", status: "通过" },
      material: { label: "物料齐套", desc: "PCB、插件料已配送到位", status: "通过" },
      sop: { label: "SOP 版本", desc: "SOP-DIP-009 V2.8 已签收", status: "通过" },
      quality: { label: "首件要求", desc: "焊前目检任务已生成", status: "通过" },
      safety: { label: "安全点检", desc: "静电与工装点检通过", status: "通过" },
    },
    suggestions: ["可扫码开工", "开工后自动触发焊前目检记录"],
  },
  {
    id: "D-021",
    orderId: "MO-202606-0002",
    product: "车载传感器 S2",
    operation: "SMT 贴片",
    line: "Line-B",
    team: "B1 班",
    station: "SMT-WS-02",
    owner: "李敏",
    startWindow: "08:00-12:00",
    status: "已放行",
    gates: {
      dispatch: { label: "派工状态", desc: "加急任务已放行", status: "通过" },
      operator: { label: "人员资质", desc: "贴片操作员与检验员在线", status: "通过" },
      equipment: { label: "设备状态", desc: "贴片机、回流炉在线", status: "通过" },
      material: { label: "物料齐套", desc: "锡膏、料盘、钢网已校验", status: "通过" },
      sop: { label: "SOP 版本", desc: "SOP-SMT-021 V4.1 已签收", status: "通过" },
      quality: { label: "首件要求", desc: "首件 AOI 已预约", status: "通过" },
      safety: { label: "安全点检", desc: "炉温与防护点检通过", status: "通过" },
    },
    suggestions: ["已放行至工位终端", "首件结果回写后继续批量生产"],
  },
  {
    id: "D-031",
    orderId: "MO-202606-0003",
    product: "电源模块 P8",
    operation: "老化测试",
    line: "Line-C",
    team: "C1 班",
    station: "AGING-02",
    owner: "周强",
    startWindow: "14:00-22:00",
    status: "已拦截",
    gates: {
      dispatch: { label: "派工状态", desc: "任务变更待同步", status: "待确认" },
      operator: { label: "人员资质", desc: "周强具备老化资质", status: "通过" },
      equipment: { label: "设备状态", desc: "AGING-02 容量不足，通道占用冲突", status: "拦截" },
      material: { label: "物料齐套", desc: "待测品已到缓存区", status: "通过" },
      sop: { label: "SOP 版本", desc: "SOP-AGING-005 变更中", status: "待确认" },
      quality: { label: "首件要求", desc: "老化参数待质量复核", status: "待确认" },
      safety: { label: "安全点检", desc: "温度上限需复核", status: "待确认" },
    },
    suggestions: ["释放老化通道或拆批上架", "等待 SOP 变更完成后重新检查", "复核温度上限与老化曲线"],
  },
  {
    id: "D-111",
    orderId: "MO-202606-0011",
    product: "包装套件 K9",
    operation: "包装入库",
    line: "Line-C",
    team: "C1 班",
    station: "PACK-WS-02",
    owner: "罗琴",
    startWindow: "09:00-20:00",
    status: "待处理",
    gates: {
      dispatch: { label: "派工状态", desc: "夜班支援任务已生成", status: "通过" },
      operator: { label: "人员资质", desc: "夜班1 未完成交接确认", status: "待确认" },
      equipment: { label: "设备状态", desc: "打印机在线，扫码枪正常", status: "通过" },
      material: { label: "物料齐套", desc: "附件清单待复核", status: "待确认" },
      sop: { label: "SOP 版本", desc: "SOP-PACK-012 已过期", status: "拦截" },
      quality: { label: "首件要求", desc: "箱码模板待质量确认", status: "待确认" },
      safety: { label: "安全点检", desc: "包装台点检通过", status: "通过" },
    },
    suggestions: ["先更新包装 SOP 版本", "复核附件清单和箱码模板", "夜班人员完成交接确认"],
  },
];

let checks = structuredClone(initialChecks);
let logs = [];
let state = {
  activeCheckId: "D-004",
  search: "",
  status: "all",
  line: "all",
  team: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#checkModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "开工检查" ? " class=\"is-active\"" : "";
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

  $("#checkModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#checkModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const moduleId = link.dataset.module;
      const entry = link.dataset.entry;
      if (moduleId === "workbench") window.location.href = "../index.html";
      else if (moduleId === "orders" && entry === "生产订单") window.location.href = "../orders/production-orders.html";
      else if (moduleId === "orders" && entry === "订单评审") window.location.href = "../orders/order-reviews.html";
      else if (moduleId === "orders" && entry === "生产排程") window.location.href = "../orders/production-schedule.html";
      else if (moduleId === "orders" && entry === "产能负荷") window.location.href = "../orders/capacity-load.html";
      else if (moduleId === "orders" && entry === "交期预警") window.location.href = "../orders/delivery-warning.html";
      else if (moduleId === "orders" && entry === "计划调整") window.location.href = "../orders/plan-adjustment.html";
      else if (moduleId === "orders" && entry === "齐套检查") window.location.href = "../orders/kit-check.html";
      else if (moduleId === "dispatch" && entry === "派工单") window.location.href = "./dispatch-orders.html";
      else if (moduleId === "dispatch" && entry === "工序任务") window.location.href = "./operation-tasks.html";
      else if (moduleId === "dispatch" && entry === "班组任务") window.location.href = "./team-tasks.html";
      else if (moduleId === "dispatch" && entry === "任务下达") window.location.href = "./task-release.html";
      else if (moduleId === "dispatch" && entry === "任务变更") window.location.href = "./task-change.html";
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "./sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "./start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    checks = saved.checks || checks;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.checkState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ checks, logs, checkState: state }));
}

function getActiveCheck() {
  return checks.find((item) => item.id === state.activeCheckId) || checks[0];
}

function getVisibleChecks() {
  const keyword = state.search.trim().toLowerCase();
  return checks.filter((item) => {
    const text = `${item.id} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.owner}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const teamMatch = state.team === "all" || item.team === state.team;
    return keywordMatch && statusMatch && lineMatch && teamMatch;
  });
}

function renderAll() {
  syncDerivedStatuses();
  renderDetailPanelState();
  renderMetrics();
  renderCheckList();
  renderGateSummary();
  renderResources();
  renderCheckTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".check-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#checkDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const totalPassRate = checks.reduce((sum, item) => sum + getPassRate(item), 0);
  $("#metricReady").textContent = checks.filter((item) => item.status === "可开工").length;
  $("#metricPending").textContent = checks.filter((item) => item.status === "待处理").length;
  $("#metricBlocked").textContent = checks.filter((item) => item.status === "已拦截").length;
  $("#metricPassRate").textContent = `${Math.round(totalPassRate / checks.length)}%`;
}

function renderCheckList() {
  const visible = getVisibleChecks();
  $("#checkList").innerHTML = visible.length ? visible.map((item) => `
    <button class="task-card${item.id === state.activeCheckId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="task-card__top">
        <strong>${item.id} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="task-card__product">${item.product} · ${item.orderId}</span>
      <div class="task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${getPassRate(item)}%</span>
      </div>
      <div class="task-card__foot">
        <span>${item.team} · ${item.owner}</span>
        <span>${getBlockedText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有开工检查任务</strong><em>请调整筛选条件</em></div>`;

  $("#checkList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectCheck(card.dataset.id));
  });
}

function renderGateSummary() {
  const item = getActiveCheck();
  $("#activeCheckText").textContent = `${item.id} · ${item.station}`;
  $("#gateSummary").innerHTML = Object.values(item.gates).map((gate) => {
    const percent = gate.status === "通过" ? 100 : gate.status === "待确认" ? 55 : 18;
    return `
      <article class="gate-strip ${getGateClass(gate.status)}">
        <strong>${gate.label}</strong>
        <div class="gate-bar"><span style="width:${percent}%"></span></div>
        <em>${gate.status}</em>
      </article>
    `;
  }).join("");
}

function renderResources() {
  const item = getActiveCheck();
  const resourceKeys = ["operator", "equipment", "material", "quality"];
  $("#resourceBoard").innerHTML = resourceKeys.map((key) => {
    const gate = item.gates[key];
    return `
      <article class="resource-card ${getGateClass(gate.status)}">
        <span>${gate.label}</span>
        <strong>${gate.desc}</strong>
        <em>${gate.status}</em>
      </article>
    `;
  }).join("");
}

function renderCheckTable() {
  const visible = getVisibleChecks();
  $("#checkTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeCheckId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.orderId} / ${item.operation}</td>
      <td>${item.station}</td>
      <td>${item.team}</td>
      <td>${getPassRate(item)}%</td>
      <td>${getBlockedText(item)}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有开工检查任务</td></tr>`;

  $("#checkTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectCheck(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveCheck();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatchNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["产线", item.line],
    ["班组", item.team],
    ["工位", item.station],
    ["责任人", item.owner],
    ["开工窗口", item.startWindow],
    ["通过率", `${getPassRate(item)}%`],
    ["阻断项", getBlockedText(item)],
    ["状态", item.status],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = Object.values(item.gates).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  $("#actionSuggestionList").innerHTML = item.suggestions.map((suggestion, index) => `
    <div class="readiness-item ${index === 0 && item.status === "已拦截" ? "is-blocked" : "is-risk"}">
      <span>建议 ${index + 1}</span>
      <strong>${suggestion}</strong>
      <span>${item.status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveCheck();
  const scoped = logs.filter((log) => log.checkId === active.id).slice(0, 5);
  $("#checkLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.checkId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${getBlockedText(active)}</strong><em>等待开工检查动作</em></div>`;
}

function syncDerivedStatuses() {
  checks = checks.map((item) => {
    if (item.status === "已放行") return item;
    const gates = Object.values(item.gates);
  if (item.manualBlocked || gates.some((gate) => gate.status === "拦截")) return { ...item, status: "已拦截" };
    if (gates.every((gate) => gate.status === "通过")) return { ...item, status: "可开工" };
    return { ...item, status: "待处理" };
  });
}

function getPassRate(item) {
  const gates = Object.values(item.gates);
  const passed = gates.filter((gate) => gate.status === "通过").length;
  return Math.round((passed / gates.length) * 100);
}

function getBlockedText(item) {
  const blocked = Object.values(item.gates).filter((gate) => gate.status === "拦截").map((gate) => gate.label);
  const pending = Object.values(item.gates).filter((gate) => gate.status === "待确认").map((gate) => gate.label);
  if (blocked.length) return blocked.join("、");
  if (pending.length) return `待确认：${pending.join("、")}`;
  return "无阻断";
}

function getGateClass(status) {
  if (status === "通过") return "is-pass is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "可开工" || status === "已放行") return "green";
  if (status === "已拦截") return "red";
  if (status === "待处理") return "orange";
  return "blue";
}

function selectCheck(id) {
  state.activeCheckId = id;
  state.detailOpen = true;
  recordLog(id, "已打开开工检查详情");
  saveState();
  renderAll();
}

function updateCheck(id, patch, message) {
  const index = checks.findIndex((item) => item.id === id);
  if (index < 0) return;
  checks[index] = { ...checks[index], ...patch };
  state.activeCheckId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function updateGate(id, gateKey, patch, message) {
  const item = checks.find((check) => check.id === id);
  if (!item || !item.gates[gateKey]) return;
  const gates = { ...item.gates, [gateKey]: { ...item.gates[gateKey], ...patch } };
  updateCheck(id, { gates }, message);
}

function passAllGates(item, message) {
  const gates = Object.fromEntries(Object.entries(item.gates).map(([key, gate]) => [
    key,
    { ...gate, status: "通过", desc: gate.desc.replace("待", "已").replace("缺", "已补") },
  ]));
  updateCheck(item.id, { gates, status: "可开工", manualBlocked: false }, message);
}

function recordLog(checkId, action) {
  logs = [
    { checkId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 60);
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
  $("#checkSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#teamFilter").addEventListener("change", (event) => {
    state.team = event.target.value;
    saveState();
    renderAll();
  });
  $("#batchPassBtn").addEventListener("click", () => {
    syncDerivedStatuses();
    const targets = checks.filter((item) => item.status === "可开工");
    if (!targets.length) {
      showToast("没有可批量放行的开工任务");
      return;
    }
    targets.forEach((item) => {
      item.status = "已放行";
      recordLog(item.id, "已批量开工放行");
    });
    state.activeCheckId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已放行 ${targets.length} 个开工任务`);
  });
  $("#refreshCheckBtn").addEventListener("click", () => {
    recordLog(getActiveCheck().id, "已刷新开工检查项");
    saveState();
    renderLogs();
    showToast("开工检查已刷新");
  });
  $("#closeDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#recheckBtn").addEventListener("click", () => {
    recordLog(getActiveCheck().id, "已重新执行开工准入检查");
    saveState();
    renderLogs();
    showToast("准入检查已重新执行");
  });
  $("#confirmBtn").addEventListener("click", () => passAllGates(getActiveCheck(), "开工检查项已确认通过"));
  $("#releaseBtn").addEventListener("click", () => {
    const item = getActiveCheck();
    if (Object.values(item.gates).some((gate) => gate.status !== "通过")) {
      showToast("仍有检查项未通过，不能放行");
      return;
    }
    updateCheck(item.id, { status: "已放行" }, "任务已开工放行");
  });
  $("#materialBtn").addEventListener("click", () => updateGate(getActiveCheck().id, "material", { status: "通过", desc: "物料已补齐或完成拆批放行" }, "物料问题已处理"));
  $("#qualityBtn").addEventListener("click", () => updateGate(getActiveCheck().id, "quality", { status: "通过", desc: "首件确认计划已完成" }, "首件要求已确认"));
  $("#equipmentBtn").addEventListener("click", () => updateGate(getActiveCheck().id, "equipment", { status: "通过", desc: "设备已复位，参数重新绑定" }, "设备状态已复位"));
  $("#blockBtn").addEventListener("click", () => updateCheck(getActiveCheck().id, { status: "已拦截", manualBlocked: true }, "已人工拦截开工"));
  $("#resetCheckBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    checks = structuredClone(initialChecks);
    logs = [];
    state = { activeCheckId: "D-004", search: "", status: "all", line: "all", team: "all", detailOpen: true };
    $("#checkSearch").value = "";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    $("#teamFilter").value = "all";
    renderAll();
    showToast("开工检查演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#checkSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
$("#teamFilter").value = state.team;
bindEvents();
renderAll();
