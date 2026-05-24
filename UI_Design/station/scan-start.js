const STORAGE_KEY = "xingjigu_mes_scan_start_v1";

const modules = window.MES_NAV_MODULES || [];

const initialTasks = [
  {
    id: "ST-004",
    dispatchNo: "D-004",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "整机装配",
    seq: 40,
    line: "Line-A",
    station: "ASM-WS-03",
    equipment: "电批 EC-ASM-03",
    operator: "赵杰",
    employeeId: "E1003",
    team: "A1 班",
    shift: "白班",
    planQty: 800,
    inputQty: 0,
    startedQty: 0,
    code: "D-004",
    batchCode: "B-TCU100-0621-A",
    serialCode: "SN-TCU100-000001",
    status: "待扫码",
    startTime: "",
    firstPiece: "待触发",
    gates: { identity: "通过", dispatch: "通过", material: "通过", equipment: "通过", quality: "待确认" },
    notes: "员工已绑定工位，等待模拟扫码枪回传派工单码后记录开工回执",
  },
  {
    id: "ST-002",
    dispatchNo: "D-002",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "DIP 插件",
    seq: 20,
    line: "Line-A",
    station: "DIP-WS-01",
    equipment: "防错夹具 JIG-DIP-04",
    operator: "钱佳",
    employeeId: "E1011",
    team: "A1 班",
    shift: "白班",
    planQty: 800,
    inputQty: 800,
    startedQty: 800,
    code: "D-002",
    batchCode: "B-TCU100-0620-DIP",
    serialCode: "SN-TCU100-DIP-000001",
    status: "生产中",
    startTime: "08:12",
    firstPiece: "IPQC 巡检已配置",
    gates: { identity: "通过", dispatch: "通过", material: "通过", equipment: "通过", quality: "通过" },
    notes: "已接收模拟扫码开工回执并形成 DIP 工序 WIP",
  },
  {
    id: "ST-005",
    dispatchNo: "D-005",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "功能测试",
    seq: 50,
    line: "Line-A",
    station: "TEST-WS-01",
    equipment: "测试台 TEST-A-01",
    operator: "孙磊",
    employeeId: "E1052",
    team: "A1 班",
    shift: "白班",
    planQty: 800,
    inputQty: 0,
    startedQty: 0,
    code: "D-005",
    batchCode: "B-TCU100-0622-TEST",
    serialCode: "SN-TCU100-TEST-000001",
    status: "已拦截",
    startTime: "",
    firstPiece: "测试治具待复核",
    gates: { identity: "通过", dispatch: "通过", material: "通过", equipment: "拦截", quality: "待确认" },
    notes: "测试台点检未完成，后台拦截模拟扫码开工回执",
  },
  {
    id: "ST-111",
    dispatchNo: "D-111",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    operation: "包装入库",
    seq: 80,
    line: "Line-C",
    station: "PACK-WS-02",
    equipment: "Pack-C",
    operator: "罗琴",
    employeeId: "E1036",
    team: "C1 班",
    shift: "白班",
    planQty: 1800,
    inputQty: 1480,
    startedQty: 0,
    code: "D-111",
    batchCode: "B-THS10-0621-PACK",
    serialCode: "SN-THS10-000001",
    status: "待扫码",
    startTime: "",
    firstPiece: "箱码复核待触发",
    gates: { identity: "待确认", dispatch: "通过", material: "通过", equipment: "通过", quality: "通过" },
    notes: "接班人员未完成身份确认，等待模拟工牌/NFC 和扫码枪回执",
  },
];

const initialHistory = [
  { id: "SH-001", taskId: "ST-002", time: "08:12", action: "模拟扫码开工回执", scanType: "模拟派工单码", scanCode: "D-002", station: "DIP-WS-01", equipment: "防错夹具 JIG-DIP-04", dispatchNo: "D-002", operation: "DIP 插件", owner: "钱佳", result: "模拟开工回执通过，WIP 800 台进入 DIP 工序" },
  { id: "SH-002", taskId: "ST-005", time: "08:36", action: "模拟开工拦截", scanType: "模拟设备信号", scanCode: "TEST-A-01", station: "TEST-WS-01", equipment: "测试台 TEST-A-01", dispatchNo: "D-005", operation: "功能测试", owner: "设备员", result: "设备点检未完成，后台拦截模拟开工回执" },
  { id: "SH-003", taskId: "ST-004", time: "09:05", action: "模拟准入校验", scanType: "模拟派工单码", scanCode: "D-004", station: "ASM-WS-03", equipment: "电批 EC-ASM-03", dispatchNo: "D-004", operation: "整机装配", owner: "赵杰", result: "身份、派工、物料、设备通过，等待模拟扫码枪开工回执" },
];

let tasks = structuredClone(initialTasks);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeTaskId: "ST-004",
  search: "",
  status: "all",
  line: "all",
  operation: "all",
  detailOpen: true,
  taskDrawerOpen: true,
  scanMode: "模拟派工单码",
  blockReason: "条码不属于当前派工单",
  owner: "班组长",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#scanModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "扫码开工" ? " class=\"is-active\"" : "";
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

  $("#scanModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#scanModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
      else if (moduleId === "dispatch" && entry === "派工单") window.location.href = "../dispatch/dispatch-orders.html";
      else if (moduleId === "dispatch" && entry === "工序任务") window.location.href = "../dispatch/operation-tasks.html";
      else if (moduleId === "dispatch" && entry === "班组任务") window.location.href = "../dispatch/team-tasks.html";
      else if (moduleId === "dispatch" && entry === "任务下达") window.location.href = "../dispatch/task-release.html";
      else if (moduleId === "dispatch" && entry === "任务变更") window.location.href = "../dispatch/task-change.html";
      else if (moduleId === "dispatch" && entry === "工艺文件与作业指导") window.location.href = "../dispatch/sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
      else if (moduleId === "station" && entry === "工位身份回执") window.location.href = "./employee-login.html";
      else if (moduleId === "station" && entry === "扫码开工") window.location.href = "./scan-start.html";
      else if (moduleId === "station" && entry === "工艺指导") window.location.href = "./work-instruction.html";
      else if (moduleId === "station" && entry === "投料确认") window.location.href = "./feeding-confirmation.html";
      else if (moduleId === "station" && entry === "过程记录") window.location.href = "./process-record.html";
      else if (moduleId === "station" && entry === "工序报工") window.location.href = "./operation-report.html";
      else if (moduleId === "station" && entry === "交接班") window.location.href = "./shift-handover.html";
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    tasks = saved.tasks || tasks;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.scanState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, history, logs, scanState: state }));
}

function getActiveTask() {
  return tasks.find((item) => item.id === state.activeTaskId) || tasks[0];
}

function getVisibleTasks() {
  const keyword = state.search.trim().toLowerCase();
  return tasks.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.operator} ${item.code} ${item.batchCode} ${item.serialCode}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const operationMatch = state.operation === "all" || item.operation === state.operation;
    return keywordMatch && statusMatch && lineMatch && operationMatch;
  });
}

function renderAll() {
  renderPanelState();
  renderMetrics();
  renderTaskList();
  renderTerminal();
  renderGateFlow();
  renderHistory();
  renderTraceCards();
  renderDetail();
  renderLogs();
}

function renderPanelState() {
  const detailOpen = state.detailOpen !== false;
  const taskDrawerOpen = state.taskDrawerOpen !== false;
  $(".scan-layout").classList.toggle("is-detail-closed", !detailOpen);
  $(".scan-layout").classList.toggle("is-task-drawer-closed", !taskDrawerOpen);
  $("#scanSideRail").hidden = !taskDrawerOpen;
  $("#scanDetailPanel").hidden = !detailOpen || !taskDrawerOpen;
  $("#showScanDetailBtn").hidden = detailOpen || !taskDrawerOpen;
  $("#showScanTaskDrawerBtn").hidden = taskDrawerOpen;
}

function renderMetrics() {
  const visible = getVisibleTasks();
  $("#metricStarted").textContent = visible.filter((item) => item.status === "生产中").length;
  $("#metricWaiting").textContent = visible.filter((item) => item.status === "待扫码").length;
  $("#metricBlocked").textContent = visible.filter((item) => item.status === "已拦截").length;
  $("#metricFirstPiece").textContent = visible.filter((item) => item.status === "首件待确认" || item.firstPiece.includes("待")).length;
}

function renderTaskList() {
  const visible = getVisibleTasks();
  $("#scanTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="scan-task-card${item.id === state.activeTaskId ? " is-active" : ""}${item.status === "生产中" ? " is-started" : ""}${item.status === "已拦截" ? " is-blocked" : ""}" type="button" data-id="${item.id}">
      <div class="scan-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="scan-task-card__role">${item.product}</span>
      <div class="scan-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.operator} · ${item.employeeId}</span>
      </div>
      <div class="scan-task-card__foot">
        <span>计划 ${item.planQty} / 进站 ${item.inputQty}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有扫码开工任务</strong><em>请调整筛选条件</em></div>`;

  $("#scanTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectTask(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveTask();
  $("#terminalTitle").textContent = active.station;
  $("#terminalStation").textContent = active.station;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalOperator").textContent = `${active.operator} · ${active.employeeId}`;
  $("#terminalShift").textContent = `${active.team} · ${active.shift}`;
  document.querySelectorAll("[data-scan-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scanMode === state.scanMode);
  });
}

function renderGateFlow() {
  const active = getActiveTask();
  const gates = [
    ["identity", "人员身份", `${active.operator} 已绑定 ${active.station}`],
    ["dispatch", "派工任务", `${active.dispatchNo} / 工序 ${active.seq}`],
    ["material", "进站物料", active.inputQty ? `进站 ${active.inputQty} 台` : "等待上道或首批进站"],
    ["equipment", "设备状态", active.equipment],
    ["quality", "质量准入", active.firstPiece],
  ];
  $("#gateFlow").innerHTML = gates.map(([key, label, desc]) => {
    const status = active.gates[key];
    return `
      <article class="gate-flow-item ${getGateClass(status)}">
        <span>${label}</span>
        <strong>${desc}</strong>
        <em>${status}</em>
      </article>
    `;
  }).join("");
}

function renderHistory() {
  const visibleIds = new Set(getVisibleTasks().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.taskId)).slice(0, 30);
  $("#scanHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.taskId === state.activeTaskId ? "is-active" : ""}" data-id="${item.taskId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.scanType} / ${item.scanCode}</td>
      <td>${item.station} / ${item.equipment}</td>
      <td>${item.dispatchNo} / ${item.operation}</td>
      <td>${item.owner}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有扫码开工履历</td></tr>`;

  $("#scanHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectTask(row.dataset.id));
  });
}

function renderTraceCards() {
  const active = getActiveTask();
  const cards = [
    ["投料确认", active.status === "生产中" ? "可进入投料防错" : "等待扫码开工", "绑定物料批次、料盒、余料与用料核销"],
    ["过程记录", active.status === "生产中" ? "采集待启动" : "待建立工序履历", "记录扭矩、测试值、设备参数和人工判定"],
    ["首件确认", active.firstPiece, "首件结果将决定是否允许批量生产"],
    ["工序报工", active.startedQty ? `已开工 ${active.startedQty} 台` : "暂无可报工数量", "完工数量、不良数量和工时回传"],
  ];
  $("#traceCards").innerHTML = cards.map(([label, value, hint]) => `
    <article class="trace-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");
}

function renderDetail() {
  const item = getActiveTask();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["工序", `${item.seq} · ${item.operation}`],
    ["产线", item.line],
    ["工位", item.station],
    ["设备", item.equipment],
    ["操作员", `${item.operator} · ${item.employeeId}`],
    ["班组", `${item.team} · ${item.shift}`],
    ["计划数量", item.planQty],
    ["进站数量", item.inputQty],
    ["开工时间", item.startTime || "未开工"],
    ["当前条码", getExpectedCode(item)],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["人员身份", item.gates.identity, `${item.operator} 工位身份已确认`],
    ["派工匹配", item.gates.dispatch, `${item.dispatchNo} 属于 ${item.station}`],
    ["物料进站", item.gates.material, item.inputQty ? `可用 WIP ${item.inputQty} 台` : "等待上道流转"],
    ["设备就绪", item.gates.equipment, item.equipment],
    ["质量准入", item.gates.quality, item.firstPiece],
  ];
  $("#gateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#blockReasonSelect").value = state.blockReason;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveTask();
  const scoped = logs.filter((log) => log.taskId === active.id).slice(0, 5);
  $("#scanLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.notes}</strong><em>等待模拟现场扫码回执或设备信号</em></div>`;
}

function getExpectedCode(item) {
  if (state.scanMode === "模拟工单码") return item.orderId;
  if (state.scanMode === "模拟产品序列号") return item.serialCode;
  if (state.scanMode === "模拟批次条码") return item.batchCode;
  return item.dispatchNo;
}

function getGateText(item) {
  const blocked = Object.values(item.gates).filter((value) => value === "拦截").length;
  const pending = Object.values(item.gates).filter((value) => value === "待确认").length;
  if (blocked) return `拦截 ${blocked} 项`;
  if (pending) return `待确认 ${pending} 项`;
  return "准入通过";
}

function getGateClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "生产中") return "green";
  if (status === "已拦截") return "red";
  if (status === "首件待确认") return "orange";
  return "blue";
}

function selectTask(id) {
  state.activeTaskId = id;
  state.detailOpen = true;
  state.taskDrawerOpen = true;
  recordLog(id, "已打开扫码开工任务详情", "后台切换到当前派工单");
  saveState();
  renderAll();
}

function updateTask(id, patch, message) {
  const index = tasks.findIndex((item) => item.id === id);
  if (index < 0) return;
  tasks[index] = { ...tasks[index], ...patch };
  const next = tasks[index];
  if (patch.status === "生产中" || patch.status === "首件待确认") {
    window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, "scanStart", {
      dispatchId: next.dispatchNo,
      station: next.station,
      equipment: next.equipment,
      status: next.status,
      owner: next.operator,
      result: message,
    });
  }
  if (patch.status === "已拦截") {
    window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, "startBlock", {
      dispatchId: next.dispatchNo,
      station: next.station,
      equipment: next.equipment,
      status: next.status,
      owner: state.owner,
      reason: next.notes || message,
    });
  }
  state.activeTaskId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function startTask(task, message) {
  const invalid = Object.values(task.gates).some((gate) => gate === "拦截");
  if (invalid) {
    showToast("存在准入拦截项，不能同步模拟开工回执");
    return;
  }
  if (task.gates.identity !== "通过" || task.gates.dispatch !== "通过") {
    showToast("人员或派工未确认，不能同步模拟开工回执");
    return;
  }
  const gates = { ...task.gates, quality: task.gates.quality === "待确认" ? "待确认" : "通过" };
  const nextStatus = gates.quality === "待确认" ? "首件待确认" : "生产中";
  appendHistory(task, {
    action: "模拟扫码开工回执",
    scanType: state.scanMode,
    scanCode: getExpectedCode(task),
    owner: task.operator,
    result: nextStatus === "首件待确认" ? "开工成功，批量生产等待首件确认" : `开工成功，WIP ${task.inputQty || task.planQty} 台进入工序`,
  });
  updateTask(task.id, {
    status: nextStatus,
    startTime: nowTime(),
    startedQty: task.inputQty || task.planQty,
    inputQty: task.inputQty || task.planQty,
    gates,
    firstPiece: gates.quality === "待确认" ? "首件待确认，等待质量员判定" : task.firstPiece,
    notes: "已同步模拟现场开工回执，人员、设备、派工和条码已建立过程履历",
  }, message);
}

function blockTask(task, reason, owner) {
  const gates = { ...task.gates };
  if (reason.includes("人员")) gates.identity = "拦截";
  else if (reason.includes("物料")) gates.material = "拦截";
  else if (reason.includes("设备")) gates.equipment = "拦截";
  else if (reason.includes("首件")) gates.quality = "拦截";
  else gates.dispatch = "拦截";
  appendHistory(task, {
    action: "开工拦截",
    scanType: state.scanMode,
    scanCode: $("#scanCodeInput").value.trim() || getExpectedCode(task),
    owner,
    result: reason,
  });
  updateTask(task.id, { status: "已拦截", gates, notes: `${reason}，责任人：${owner}` }, "已拦截当前模拟扫码开工回执");
}

function releaseTask(task) {
  const gates = Object.fromEntries(Object.entries(task.gates).map(([key, value]) => [key, value === "拦截" ? "通过" : value]));
  updateTask(task.id, { status: "待扫码", gates, notes: "拦截已解除，等待模拟现场重新扫码回执" }, "开工拦截已解除");
}

function appendHistory(task, patch) {
  history = [
    {
      id: `SH-${Date.now()}`,
      taskId: task.id,
      time: patch.time || nowTime(),
      action: patch.action,
      scanType: patch.scanType || state.scanMode,
      scanCode: patch.scanCode || getExpectedCode(task),
      station: task.station,
      equipment: task.equipment,
      dispatchNo: task.dispatchNo,
      operation: task.operation,
      owner: patch.owner || task.operator,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(taskId, action, result) {
  logs = [
    { taskId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 70);
}

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
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
  $("#scanSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#scanStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#scanLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#scanOperationFilter").addEventListener("change", (event) => {
    state.operation = event.target.value;
    saveState();
    renderAll();
  });
  $("#blockReasonSelect").addEventListener("change", (event) => {
    state.blockReason = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  document.querySelectorAll("[data-scan-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.scanMode = button.dataset.scanMode;
      saveState();
      renderAll();
      showToast(`已切换为${state.scanMode}`);
    });
  });
  $("#scanStartBtn").addEventListener("click", () => {
    const task = getActiveTask();
    const code = $("#scanCodeInput").value.trim();
    const expected = getExpectedCode(task);
    if (code && code !== expected) {
      blockTask(task, "条码不属于当前派工单", "班组长");
      return;
    }
    startTask(task, "已同步模拟现场扫码开工回执");
    $("#scanCodeInput").value = "";
  });
  $("#simulateDeviceBtn").addEventListener("click", () => {
    const task = getActiveTask();
    appendHistory(task, { action: "模拟设备就绪信号", scanType: "模拟设备信号", scanCode: task.equipment, owner: task.operator, result: "模拟设备就绪信号已绑定当前派工单，后台未控制设备启停" });
    window.MES_BUSINESS_FLOW?.applyStationAction?.(task.orderId, "deviceStartSignal", {
      dispatchId: task.dispatchNo,
      station: task.station,
      equipment: task.equipment,
      status: "设备信号已绑定",
      owner: task.operator,
      result: "模拟设备就绪信号已绑定当前派工单，后台未控制设备启停",
    });
    recordLog(task.id, "已同步模拟现场设备就绪信号", "设备信号与开工记录已关联，后台未控制设备启停");
    saveState();
    renderAll();
    showToast("模拟设备就绪信号已同步");
  });
  $("#simulateBlockBtn").addEventListener("click", () => blockTask(getActiveTask(), state.blockReason, state.owner));
  $("#switchTaskBtn").addEventListener("click", () => {
    const index = tasks.findIndex((item) => item.id === state.activeTaskId);
    state.activeTaskId = tasks[(index + 1) % tasks.length].id;
    saveState();
    renderAll();
    showToast(`已切换到 ${getActiveTask().dispatchNo}`);
  });
  $("#refreshScanBtn").addEventListener("click", () => {
    recordLog(getActiveTask().id, "已刷新扫码开工监控", "已重新读取模拟现场扫码回执和准入状态");
    saveState();
    renderLogs();
    showToast("扫码开工监控已刷新");
  });
  $("#closeScanDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderPanelState();
    showToast("详情面板已关闭");
  });
  $("#showScanDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderPanelState();
    showToast("详情面板已打开");
  });
  $("#closeScanTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = false;
    saveState();
    renderPanelState();
    showToast("开工回执任务抽屉已隐藏");
  });
  $("#showScanTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = true;
    saveState();
    renderPanelState();
    showToast("开工回执任务抽屉已打开");
  });
  $("#recheckScanBtn").addEventListener("click", () => {
    recordLog(getActiveTask().id, "已重新执行扫码开工准入校验", getGateText(getActiveTask()));
    saveState();
    renderLogs();
    showToast("扫码准入校验已重新执行");
  });
  $("#detailStartBtn").addEventListener("click", () => startTask(getActiveTask(), "已从详情同步模拟开工回执"));
  $("#firstPieceBtn").addEventListener("click", () => {
    const task = getActiveTask();
    updateTask(task.id, { status: "首件待确认", firstPiece: "首件待确认，等待质量员判定", gates: { ...task.gates, quality: "待确认" } }, "已转入首件确认");
  });
  $("#detailBlockBtn").addEventListener("click", () => blockTask(getActiveTask(), state.blockReason, state.owner));
  $("#releaseBlockBtn").addEventListener("click", () => releaseTask(getActiveTask()));
  $("#batchReadyBtn").addEventListener("click", () => {
    tasks = tasks.map((item) => {
      if (item.status !== "已拦截") return item;
      const gates = Object.fromEntries(Object.entries(item.gates).map(([key]) => [key, "通过"]));
      return { ...item, status: "待扫码", gates, notes: "已处理准入异常，允许模拟现场重新扫码回执" };
    });
    recordLog(state.activeTaskId, "已批量解除准入拦截", "拦截项已转为通过");
    saveState();
    renderAll();
    showToast("已批量解除准入拦截");
  });
  $("#resetScanBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    tasks = structuredClone(initialTasks);
    history = structuredClone(initialHistory);
    logs = [];
    state = { activeTaskId: "ST-004", search: "", status: "all", line: "all", operation: "all", detailOpen: true, taskDrawerOpen: true, scanMode: "模拟派工单码", blockReason: "条码不属于当前派工单", owner: "班组长" };
    $("#scanSearch").value = "";
    $("#scanStatusFilter").value = "all";
    $("#scanLineFilter").value = "all";
    $("#scanOperationFilter").value = "all";
    $("#scanCodeInput").value = "";
    renderAll();
    showToast("扫码开工监控演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#scanSearch").value = state.search;
$("#scanStatusFilter").value = state.status;
$("#scanLineFilter").value = state.line;
$("#scanOperationFilter").value = state.operation;
bindEvents();
renderAll();
