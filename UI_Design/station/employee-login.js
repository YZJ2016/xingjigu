const STORAGE_KEY = "xingjigu_mes_employee_login_v3";

const modules = window.MES_NAV_MODULES || [
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

const initialEmployees = [
  { id: "E1003", name: "赵杰", role: "装配操作员", team: "A1 班", line: "Line-A", station: "ASM-WS-03", operation: "整机装配", dispatchNo: "D-004", orderId: "MO-202606-0001", shift: "白班", status: "待登录", qualification: "待复核", loginTime: "", lastSeen: "", gates: { identity: "通过", qualification: "待确认", station: "通过", shift: "通过" } },
  { id: "E1011", name: "钱佳", role: "DIP 操作员", team: "A1 班", line: "Line-A", station: "DIP-WS-01", operation: "DIP 插件", dispatchNo: "D-002", orderId: "MO-202606-0001", shift: "白班", status: "已登录", qualification: "有效", loginTime: "08:02", lastSeen: "10:26", gates: { identity: "通过", qualification: "通过", station: "通过", shift: "通过" } },
  { id: "E1017", name: "李敏", role: "SMT 操作员", team: "B1 班", line: "Line-B", station: "SMT-WS-02", operation: "SMT 贴片", dispatchNo: "D-021", orderId: "MO-202606-0002", shift: "白班", status: "已登录", qualification: "有效", loginTime: "07:58", lastSeen: "10:28", gates: { identity: "通过", qualification: "通过", station: "通过", shift: "通过" } },
  { id: "E1024", name: "周强", role: "老化测试员", team: "C1 班", line: "Line-C", station: "AGING-02", operation: "老化测试", dispatchNo: "D-031", orderId: "MO-202606-0003", shift: "白班", status: "资质异常", qualification: "参数资质过期", loginTime: "", lastSeen: "", gates: { identity: "通过", qualification: "拦截", station: "通过", shift: "通过" } },
  { id: "E1036", name: "罗琴", role: "包装操作员", team: "C1 班", line: "Line-C", station: "PACK-WS-02", operation: "包装入库", dispatchNo: "D-111", orderId: "MO-202606-0011", shift: "白班", status: "待登录", qualification: "有效", loginTime: "", lastSeen: "", gates: { identity: "通过", qualification: "通过", station: "通过", shift: "待确认" } },
  { id: "E1042", name: "陈伟", role: "补员", team: "A1 班", line: "Line-A", station: "ASM-WS-03", operation: "整机装配", dispatchNo: "D-004", orderId: "MO-202606-0001", shift: "白班", status: "离线", qualification: "有效", loginTime: "", lastSeen: "昨日 19:44", gates: { identity: "通过", qualification: "通过", station: "待确认", shift: "通过" } },
];

const initialHistory = [
  { id: "H-001", employeeId: "E1011", employeeName: "钱佳", action: "绑定工位", station: "DIP-WS-01", line: "Line-A", team: "A1 班", dispatchNo: "D-002", operation: "DIP 插件", orderId: "MO-202606-0001", time: "08:02", reason: "班前到岗", handoverTo: "无", result: "允许开工" },
  { id: "H-002", employeeId: "E1017", employeeName: "李敏", action: "绑定工位", station: "SMT-WS-02", line: "Line-B", team: "B1 班", dispatchNo: "D-021", operation: "SMT 贴片", orderId: "MO-202606-0002", time: "07:58", reason: "班前到岗", handoverTo: "无", result: "允许开工" },
  { id: "H-005", employeeId: "E1017", employeeName: "李敏", action: "首件等待", station: "SMT-WS-02", line: "Line-B", team: "B1 班", dispatchNo: "D-021", operation: "SMT 贴片", orderId: "MO-202606-0002", time: "09:20", reason: "AOI 首件待判", handoverTo: "质量员", result: "暂停批量生产" },
  { id: "H-006", employeeId: "E1011", employeeName: "钱佳", action: "退出工位", station: "DIP-WS-01", line: "Line-A", team: "A1 班", dispatchNo: "D-002", operation: "DIP 插件", orderId: "MO-202606-0001", time: "11:35", reason: "任务完成", handoverTo: "无", result: "工序待报工确认" },
  { id: "H-003", employeeId: "E1042", employeeName: "陈伟", action: "退出工位", station: "ASM-WS-03", line: "Line-A", team: "A1 班", dispatchNo: "D-004", operation: "整机装配", orderId: "MO-202606-0001", time: "昨日 19:44", reason: "换班交接", handoverTo: "赵杰", result: "待接班确认" },
  { id: "H-004", employeeId: "E1024", employeeName: "周强", action: "拦截绑定", station: "AGING-02", line: "Line-C", team: "C1 班", dispatchNo: "D-031", operation: "老化测试", orderId: "MO-202606-0003", time: "08:11", reason: "参数资质过期", handoverTo: "班组长", result: "禁止开工" },
];

const initialEquipmentEvents = [
  { id: "EQ-001", station: "ASM-WS-03", equipment: "电批 EC-ASM-03", line: "Line-A", time: "08:00", status: "待机", event: "班前点检通过", owner: "赵杰", result: "允许绑定人员" },
  { id: "EQ-002", station: "ASM-WS-03", equipment: "电批 EC-ASM-03", line: "Line-A", time: "10:18", status: "运行", event: "扭矩程序 P-ASM-16 已加载", owner: "赵杰", result: "参数可追溯" },
  { id: "EQ-003", station: "SMT-WS-02", equipment: "贴片机 SMT-02", line: "Line-B", time: "08:05", status: "运行", event: "贴片任务 D-021 开始", owner: "李敏", result: "产出计数开启" },
  { id: "EQ-004", station: "SMT-WS-02", equipment: "AOI-02", line: "Line-B", time: "09:20", status: "等待", event: "首件 AOI 待判", owner: "质量员", result: "批量生产暂停" },
  { id: "EQ-005", station: "AGING-02", equipment: "老化柜 AGING-02", line: "Line-C", time: "08:11", status: "拦截", event: "老化参数资质过期", owner: "周强", result: "禁止开工" },
  { id: "EQ-006", station: "DIP-WS-01", equipment: "防错夹具 JIG-DIP-04", line: "Line-A", time: "11:35", status: "待机", event: "DIP 任务完成，等待报工", owner: "钱佳", result: "工位可释放" },
];

let employees = structuredClone(initialEmployees);
let history = structuredClone(initialHistory);
let equipmentEvents = structuredClone(initialEquipmentEvents);
let logs = [];
let state = {
  activeEmployeeId: "E1003",
  search: "",
  status: "all",
  line: "all",
  team: "all",
  detailOpen: true,
  taskDrawerOpen: true,
  terminalStation: "ASM-WS-03",
  authMethod: "模拟员工码",
  exitReason: "换班交接",
  handoverTo: "E1042",
  intervalType: "employee",
  intervalEmployeeId: "E1017",
  intervalEquipment: "SMT-WS-02",
  intervalStart: "08:00",
  intervalEnd: "12:00",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#stationModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "员工登录" ? " class=\"is-active\"" : "";
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

  $("#stationModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#stationModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "../dispatch/sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "./employee-login.html";
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
    employees = saved.employees || employees;
    history = saved.history || history;
    equipmentEvents = saved.equipmentEvents || equipmentEvents;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.loginState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ employees, history, equipmentEvents, logs, loginState: state }));
}

function getActiveEmployee() {
  return employees.find((item) => item.id === state.activeEmployeeId) || employees[0];
}

function getVisibleEmployees() {
  const keyword = state.search.trim().toLowerCase();
  return employees.filter((item) => {
    const text = `${item.id} ${item.name} ${item.role} ${item.station} ${item.operation} ${item.dispatchNo}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const teamMatch = state.team === "all" || item.team === state.team;
    return keywordMatch && statusMatch && lineMatch && teamMatch;
  });
}

function renderAll() {
  syncDerivedStatuses();
  renderPanelState();
  renderMetrics();
  renderLoginList();
  renderTerminal();
  renderCoverage();
  renderHandoverOptions();
  renderLoginTable();
  renderIntervalControls();
  renderIntervalTrace();
  renderDetail();
  renderLogs();
}

function renderPanelState() {
  const detailOpen = state.detailOpen !== false;
  const taskDrawerOpen = state.taskDrawerOpen !== false;
  $(".login-layout").classList.toggle("is-detail-closed", !detailOpen);
  $(".login-layout").classList.toggle("is-task-drawer-closed", !taskDrawerOpen);
  $("#loginSideRail").hidden = !taskDrawerOpen;
  $("#loginDetailPanel").hidden = !detailOpen || !taskDrawerOpen;
  $("#showLoginDetailBtn").hidden = detailOpen || !taskDrawerOpen;
  $("#showLoginTaskDrawerBtn").hidden = taskDrawerOpen;
}

function renderMetrics() {
  const visible = getVisibleEmployees();
  const stationCount = new Set(visible.map((item) => item.station)).size;
  const onlineStations = new Set(visible.filter((item) => item.status === "已登录").map((item) => item.station)).size;
  $("#metricOnline").textContent = visible.filter((item) => item.status === "已登录").length;
  $("#metricWaiting").textContent = visible.filter((item) => item.status === "待登录" || item.status === "离线").length;
  $("#metricRisk").textContent = visible.filter((item) => item.status === "资质异常").length;
  $("#metricCoverage").textContent = `${Math.round((onlineStations / Math.max(1, stationCount)) * 100)}%`;
}

function renderLoginList() {
  const visible = getVisibleEmployees();
  $("#loginList").innerHTML = visible.length ? visible.map((item) => `
    <button class="login-card${item.id === state.activeEmployeeId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="login-card__top">
        <strong>${item.name} · ${item.id}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${getStatusText(item.status)}</span>
      </div>
      <span class="login-card__role">${item.role} · ${item.operation}</span>
      <div class="login-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.dispatchNo}</span>
      </div>
      <div class="login-card__foot">
        <span>${item.team} · ${item.shift}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有待确认人员</strong><em>请调整筛选条件</em></div>`;

  $("#loginList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectEmployee(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveEmployee();
  const stationOnline = employees.filter((item) => item.station === state.terminalStation && item.status === "已登录");
  $("#terminalStation").textContent = state.terminalStation;
  $("#terminalStationText").textContent = state.terminalStation;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalBindingStatus").textContent = stationOnline.length
    ? `${stationOnline.map((item) => item.name).join("、")} 已绑定到 ${state.terminalStation}`
    : "等待人员确认";
  document.querySelectorAll("[data-auth-method]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.authMethod === state.authMethod);
  });
}

function renderCoverage() {
  const stations = [...new Set(employees.map((item) => item.station))];
  $("#coverageBoard").innerHTML = stations.map((station) => {
    const scoped = employees.filter((item) => item.station === station);
    const online = scoped.filter((item) => item.status === "已登录");
    const pending = scoped.filter((item) => item.status === "待登录" || item.status === "离线");
    const risk = scoped.find((item) => item.status === "资质异常");
    const latest = history.find((item) => item.station === station);
    const primary = online[0] || risk || pending[0] || scoped[0];
    const cls = risk ? "is-blocked" : online.length ? "is-ready" : "is-risk";
    return `
      <button class="coverage-card station-card ${cls}${station === state.terminalStation ? " is-active" : ""}" type="button" data-station="${station}">
        <div class="coverage-card__top">
          <span>${station}</span>
          <span>${online.length}/${scoped.length} 已绑定</span>
        </div>
        <strong>${online.length ? online.map((item) => item.name).join("、") : "等待人员确认"}</strong>
        <div class="station-card__meta">
          <span>${primary.line}</span>
          <span>${primary.dispatchNo}</span>
          <span>${primary.operation}</span>
        </div>
        <div class="station-card__foot">
          <span>待确认 ${pending.length}</span>
          <span>${risk ? risk.qualification : "准入待开工"}</span>
        </div>
        <em>${latest ? `${latest.action} · ${latest.reason} · ${latest.time}` : "暂无上下工位履历"}</em>
      </button>
    `;
  }).join("");

  $("#coverageBoard").querySelectorAll("[data-station]").forEach((card) => {
    card.addEventListener("click", () => selectStation(card.dataset.station));
  });
}

function selectStation(station) {
  const scoped = employees.filter((item) => item.station === station);
  const selected = scoped.find((item) => item.status === "已登录") || scoped.find((item) => item.status === "资质异常") || scoped[0];
  state.terminalStation = station;
  if (selected) state.activeEmployeeId = selected.id;
  state.detailOpen = true;
  state.taskDrawerOpen = true;
  saveState();
  renderAll();
  showToast(`已切换到 ${station} 工位视角`);
}

function renderLoginTable() {
  const visibleIds = new Set(getVisibleEmployees().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.employeeId)).slice(0, 30);
  $("#loginTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.employeeId === state.activeEmployeeId ? "is-active" : ""}" data-id="${item.employeeId}">
      <td class="order-no">${item.employeeName} / ${item.employeeId}</td>
      <td>${item.action}</td>
      <td>${item.station}</td>
      <td>${item.dispatchNo} / ${item.operation}</td>
      <td>${item.time}</td>
      <td>${item.reason}</td>
      <td>${item.handoverTo}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有上下工位履历</td></tr>`;

  $("#loginTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectEmployee(row.dataset.id));
  });
}

function renderHandoverOptions() {
  const active = getActiveEmployee();
  const options = employees
    .filter((item) => item.id !== active.id && item.station === active.station)
    .map((item) => `<option value="${item.id}">${item.name} · ${item.id}</option>`);
  const fallback = employees
    .filter((item) => item.id !== active.id)
    .slice(0, 4)
    .map((item) => `<option value="${item.id}">${item.name} · ${item.id}</option>`);
  $("#handoverToSelect").innerHTML = [`<option value="">无交接对象</option>`, ...(options.length ? options : fallback)].join("");
  $("#exitReasonSelect").value = state.exitReason || "换班交接";
  $("#handoverToSelect").value = state.handoverTo || "";
}

function renderIntervalControls() {
  $("#intervalTypeSelect").value = state.intervalType || "employee";
  $("#intervalEmployeeSelect").innerHTML = employees.map((item) => `<option value="${item.id}">${item.name} · ${item.id}</option>`).join("");
  $("#intervalEquipmentSelect").innerHTML = [...new Set(equipmentEvents.map((item) => item.station))]
    .map((station) => {
      const event = equipmentEvents.find((item) => item.station === station);
      return `<option value="${station}">${station} · ${event.equipment}</option>`;
    })
    .join("");
  $("#intervalEmployeeSelect").value = state.intervalEmployeeId || getActiveEmployee().id;
  $("#intervalEquipmentSelect").value = state.intervalEquipment || state.terminalStation;
  $("#intervalStartInput").value = state.intervalStart || "08:00";
  $("#intervalEndInput").value = state.intervalEnd || "12:00";
}

function renderIntervalTrace() {
  const start = timeToMinutes(state.intervalStart || "08:00");
  const end = timeToMinutes(state.intervalEnd || "12:00");
  const inRange = (item) => {
    const value = timeToMinutes(item.time);
    return value >= start && value <= end;
  };
  const isEmployee = state.intervalType !== "equipment";
  const records = isEmployee
    ? history.filter((item) => item.employeeId === state.intervalEmployeeId && inRange(item))
    : equipmentEvents.filter((item) => item.station === state.intervalEquipment && inRange(item));
  const riskCount = records.filter((item) => /异常|故障|拦截|暂停|等待|过期/.test(`${item.action || ""}${item.status || ""}${item.reason || ""}${item.result || ""}`)).length;
  const subject = isEmployee
    ? employees.find((item) => item.id === state.intervalEmployeeId)
    : equipmentEvents.find((item) => item.station === state.intervalEquipment);

  $("#intervalSummary").innerHTML = [
    ["查询对象", isEmployee ? `${subject?.name || ""} · ${state.intervalEmployeeId}` : `${state.intervalEquipment} · ${subject?.equipment || ""}`, isEmployee ? "人员上下工位履历" : "设备/工位状态履历"],
    ["时间区间", `${state.intervalStart} - ${state.intervalEnd}`, "本班演示时间"],
    ["记录数", records.length, "区间内命中记录"],
    ["异常/等待", riskCount, "需班组长关注"],
  ].map(([label, value, hint]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");

  $("#intervalResultList").innerHTML = records.length ? records.map((item) => {
    const blocked = /故障|拦截|过期|禁止/.test(`${item.action || ""}${item.status || ""}${item.reason || ""}${item.result || ""}`);
    const risk = /等待|暂停|异常/.test(`${item.action || ""}${item.status || ""}${item.reason || ""}${item.result || ""}`);
    if (isEmployee) {
      return `
        <article class="interval-result ${blocked ? "is-blocked" : risk ? "is-risk" : ""}">
          <span>${item.time}</span>
          <strong>${item.action}</strong>
          <span>${item.station} · ${item.dispatchNo} · ${item.operation}</span>
          <em>${item.reason} · ${item.result}</em>
        </article>
      `;
    }
    return `
      <article class="interval-result ${blocked ? "is-blocked" : risk ? "is-risk" : ""}">
        <span>${item.time}</span>
        <strong>${item.status} · ${item.equipment}</strong>
        <span>${item.station} · ${item.line} · ${item.owner}</span>
        <em>${item.event} · ${item.result}</em>
      </article>
    `;
  }).join("") : `<div class="integration-item"><span>暂无</span><strong>当前时间区间没有记录</strong><em>请调整人员、设备或时间范围</em></div>`;
}

function renderDetail() {
  const item = getActiveEmployee();
  $("#detailStatus").textContent = getStatusText(item.status);
  $("#detailName").textContent = item.name;
  $("#detailTitle").textContent = `${item.id} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工号", item.id],
    ["岗位", item.role],
    ["班组", item.team],
    ["产线", item.line],
    ["工位", item.station],
    ["工序", item.operation],
    ["派工单", item.dispatchNo],
    ["工单", item.orderId],
    ["班次", item.shift],
    ["资质", item.qualification],
    ["绑定时间", item.loginTime || "未绑定"],
    ["最后在线", item.lastSeen || "无"],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["身份识别", item.gates.identity],
    ["工序资质", item.gates.qualification],
    ["工位匹配", item.gates.station],
    ["班次匹配", item.gates.shift],
  ];
  $("#loginGateList").innerHTML = gates.map(([label, status]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${getGateDesc(label, status, item)}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveEmployee();
  const scoped = logs.filter((log) => log.employeeId === active.id).slice(0, 5);
  $("#loginLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.employeeId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${getGateText(active)}</strong><em>等待工位身份确认</em></div>`;
}

function syncDerivedStatuses() {
  employees = employees.map((item) => {
    if (item.locked) return { ...item, status: "资质异常" };
    if (item.status === "已登录") return item;
    if (Object.values(item.gates).some((gate) => gate === "拦截")) return { ...item, status: "资质异常" };
    return item;
  });
}

function getGateText(item) {
  const blocked = Object.entries(item.gates).filter(([, value]) => value === "拦截").map(([key]) => gateName(key));
  const pending = Object.entries(item.gates).filter(([, value]) => value === "待确认").map(([key]) => gateName(key));
  if (blocked.length) return `拦截：${blocked.join("、")}`;
  if (pending.length) return `待确认：${pending.join("、")}`;
  return "校验通过";
}

function gateName(key) {
  return { identity: "身份", qualification: "资质", station: "工位", shift: "班次" }[key] || key;
}

function getGateClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已登录") return "green";
  if (status === "资质异常") return "red";
  if (status === "待登录") return "orange";
  return "blue";
}

function getStatusText(status) {
  if (status === "已登录") return "已绑定";
  if (status === "待登录") return "待确认";
  return status;
}

function getGateDesc(label, status, item) {
  if (label === "身份识别") return status === "通过" ? `${item.name} 与${state.authMethod} ${item.id} 匹配` : "身份介质未识别";
  if (label === "工序资质") return status === "通过" ? `${item.operation} 资质有效` : item.qualification;
  if (label === "工位匹配") return status === "通过" ? `${item.station} 已绑定派工单 ${item.dispatchNo}` : "当前终端工位待确认";
  return status === "通过" ? `${item.shift} 班次匹配` : "班次或交接信息待确认";
}

function selectEmployee(id) {
  state.activeEmployeeId = id;
  state.detailOpen = true;
  state.taskDrawerOpen = true;
  state.terminalStation = getActiveEmployee().station;
  recordLog(id, "已打开工位身份确认详情");
  saveState();
  renderAll();
}

function updateEmployee(id, patch, message) {
  const index = employees.findIndex((item) => item.id === id);
  if (index < 0) return;
  employees[index] = { ...employees[index], ...patch };
  const next = employees[index];
  const action = patch.locked ? "loginLock" : patch.status === "已登录" ? "employeeLogin" : patch.status === "待登录" ? "qualificationPass" : "employeeStatus";
  window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, action, {
    dispatchId: next.dispatchNo,
    station: next.station,
    equipment: next.equipment,
    status: next.status,
    owner: next.name,
    result: message,
  });
  state.activeEmployeeId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function loginEmployee(employee, message) {
  if (Object.values(employee.gates).some((gate) => gate !== "通过")) {
    showToast("仍有身份校验未通过，不能绑定工位");
    return;
  }
  updateEmployee(employee.id, {
    status: "已登录",
    loginTime: nowTime(),
    lastSeen: nowTime(),
    locked: false,
  }, message);
  appendHistory(employee, {
    action: "绑定工位",
    reason: state.authMethod,
    handoverTo: "无",
    result: "身份通过，允许进入开工准入",
  });
  appendEquipmentEvent(employee, {
    status: "运行",
    event: `${employee.name} 已绑定工位`,
    result: "人员身份与工位上下文已建立",
  });
  saveState();
  renderAll();
}

function passQualification(employee, message) {
  const gates = { ...employee.gates, qualification: "通过", station: "通过", shift: "通过" };
  updateEmployee(employee.id, { gates, qualification: "有效", locked: false, status: "待登录" }, message);
}

function recordLog(employeeId, action) {
  logs = [
    { employeeId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 70);
}

function appendHistory(employee, patch) {
  history = [
    {
      id: `H-${Date.now()}`,
      employeeId: employee.id,
      employeeName: employee.name,
      action: patch.action,
      station: employee.station,
      line: employee.line,
      team: employee.team,
      dispatchNo: employee.dispatchNo,
      operation: employee.operation,
      orderId: employee.orderId,
      time: patch.time || new Date().toLocaleString("zh-CN", { hour12: false }),
      reason: patch.reason || "现场操作",
      handoverTo: patch.handoverTo || "无",
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function appendEquipmentEvent(employee, patch) {
  equipmentEvents = [
    {
      id: `EQ-${Date.now()}`,
      station: employee.station,
      equipment: patch.equipment || `${employee.station} 终端`,
      line: employee.line,
      time: patch.time || nowTime(),
      status: patch.status || "运行",
      event: patch.event,
      owner: patch.owner || employee.name,
      result: patch.result || "已记录",
    },
    ...equipmentEvents,
  ].slice(0, 80);
}

function getHandoverName() {
  const id = state.handoverTo || "";
  if (!id) return "无";
  const employee = employees.find((item) => item.id === id);
  return employee ? `${employee.name} · ${employee.id}` : "无";
}

function exitEmployee(employee, reason, message) {
  appendHistory(employee, {
    action: "退出工位",
    reason,
    handoverTo: reason === "任务完成" || reason === "临时离岗" ? "无" : getHandoverName(),
    result: reason === "任务完成" ? "工序待报工确认" : reason === "换班交接" ? "等待接班确认" : "已解除工位绑定",
  });
  appendEquipmentEvent(employee, {
    status: reason === "设备停机" ? "停机" : "待机",
    event: `${employee.name} 因${reason}退出工位`,
    result: reason === "设备停机" ? "设备异常待处理" : "工位人员绑定已解除",
  });
  updateEmployee(employee.id, { status: "离线", lastSeen: nowTime(), loginTime: "" }, message);
}

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function timeToMinutes(value) {
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  if (!match) return -1;
  return Number(match[1]) * 60 + Number(match[2]);
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
  $("#loginSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#loginStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#loginLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#loginTeamFilter").addEventListener("change", (event) => {
    state.team = event.target.value;
    saveState();
    renderAll();
  });
  $("#exitReasonSelect").addEventListener("change", (event) => {
    state.exitReason = event.target.value;
    saveState();
  });
  $("#handoverToSelect").addEventListener("change", (event) => {
    state.handoverTo = event.target.value;
    saveState();
  });
  $("#intervalTypeSelect").addEventListener("change", (event) => {
    state.intervalType = event.target.value;
    saveState();
    renderIntervalTrace();
  });
  $("#intervalEmployeeSelect").addEventListener("change", (event) => {
    state.intervalEmployeeId = event.target.value;
    saveState();
    renderIntervalTrace();
  });
  $("#intervalEquipmentSelect").addEventListener("change", (event) => {
    state.intervalEquipment = event.target.value;
    saveState();
    renderIntervalTrace();
  });
  $("#intervalStartInput").addEventListener("change", (event) => {
    state.intervalStart = event.target.value;
    saveState();
    renderIntervalTrace();
  });
  $("#intervalEndInput").addEventListener("change", (event) => {
    state.intervalEnd = event.target.value;
    saveState();
    renderIntervalTrace();
  });
  $("#batchLoginBtn").addEventListener("click", () => {
    const targets = employees.filter((item) => item.status !== "已登录" && Object.values(item.gates).every((gate) => gate === "通过"));
    if (!targets.length) {
      showToast("没有可同步绑定回执的推荐人员");
      return;
    }
    targets.forEach((item) => {
      item.status = "已登录";
      item.loginTime = nowTime();
      item.lastSeen = nowTime();
      recordLog(item.id, `已同步${state.authMethod}现场绑定回执`);
    });
    state.activeEmployeeId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已同步 ${targets.length} 名人员绑定回执`);
  });
  $("#scanLoginBtn").addEventListener("click", () => {
    const code = $("#scanInput").value.trim().toUpperCase();
    const employee = employees.find((item) => item.id === code);
    if (!employee) {
      showToast("未识别员工码");
      return;
    }
    state.activeEmployeeId = employee.id;
    state.terminalStation = employee.station;
    loginEmployee(employee, `已同步${state.authMethod}现场身份绑定回执`);
    $("#scanInput").value = "";
  });
  document.querySelectorAll("[data-auth-method]").forEach((button) => {
    button.addEventListener("click", () => {
      state.authMethod = button.dataset.authMethod;
      saveState();
      renderTerminal();
      showToast(`已切换为${state.authMethod}`);
    });
  });
  $("#switchStationBtn").addEventListener("click", () => {
    const stations = [...new Set(employees.map((item) => item.station))];
    const index = stations.indexOf(state.terminalStation);
    state.terminalStation = stations[(index + 1) % stations.length];
    saveState();
    renderTerminal();
    showToast(`已切换到 ${state.terminalStation}`);
  });
  $("#logoutActiveBtn").addEventListener("click", () => exitEmployee(getActiveEmployee(), state.exitReason, `已登记现场退出回执：${state.exitReason}`));
  $("#faultExitBtn").addEventListener("click", () => {
    const active = getActiveEmployee();
    state.exitReason = "设备停机";
    appendHistory(active, { action: "设备故障代退出", reason: "设备停机", handoverTo: "班组长", result: "已代退出，关联设备异常待处理" });
    appendEquipmentEvent(active, { status: "停机", event: "设备故障触发代退出回执", owner: "班组长", result: "人员已代退出，设备异常待处理" });
    updateEmployee(active.id, { status: "离线", lastSeen: nowTime(), loginTime: "" }, "已执行设备故障代退出");
  });
  $("#makeupRecordBtn").addEventListener("click", () => {
    const active = getActiveEmployee();
    appendHistory(active, { action: "补录上下工位", reason: state.exitReason, handoverTo: getHandoverName(), result: "补录记录已留痕，待班组长复核" });
    recordLog(active.id, "已补录上下工位记录");
    saveState();
    renderAll();
    showToast("上下工位补录已记录");
  });
  $("#refreshLoginBtn").addEventListener("click", () => {
    recordLog(getActiveEmployee().id, "已刷新人员到岗监控");
    saveState();
    renderLogs();
    showToast("人员到岗监控已刷新");
  });
  $("#closeLoginDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderPanelState();
    showToast("详情面板已关闭");
  });
  $("#showLoginDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderPanelState();
    showToast("详情面板已打开");
  });
  $("#closeLoginTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = false;
    saveState();
    renderPanelState();
    showToast("人员到岗任务抽屉已隐藏");
  });
  $("#showLoginTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = true;
    saveState();
    renderPanelState();
    showToast("人员到岗任务抽屉已打开");
  });
  $("#recheckLoginBtn").addEventListener("click", () => {
    recordLog(getActiveEmployee().id, "已重新执行身份校验");
    saveState();
    renderLogs();
    showToast("身份校验已重新执行");
  });
  $("#loginBtn").addEventListener("click", () => loginEmployee(getActiveEmployee(), "已同步现场身份绑定回执"));
  $("#logoutBtn").addEventListener("click", () => exitEmployee(getActiveEmployee(), state.exitReason, `已登记现场退出回执：${state.exitReason}`));
  $("#qualifyBtn").addEventListener("click", () => passQualification(getActiveEmployee(), "人员资质已复核通过"));
  $("#replaceBtn").addEventListener("click", () => {
    const active = getActiveEmployee();
    appendHistory(active, { action: "换人到岗", reason: "换人支援", handoverTo: getHandoverName(), result: "待新人员身份确认" });
    updateEmployee(active.id, { status: "待登录", loginTime: "", lastSeen: "换人待到岗" }, "已登记换人到岗");
  });
  $("#handoverBtn").addEventListener("click", () => {
    const active = getActiveEmployee();
    appendHistory(active, { action: "交接确认", reason: state.exitReason, handoverTo: getHandoverName(), result: "交接信息已留痕" });
    recordLog(active.id, `已记录${state.exitReason}交接`);
    saveState();
    renderAll();
    showToast("交接记录已保存");
  });
  $("#lockBtn").addEventListener("click", () => {
    const active = getActiveEmployee();
    appendHistory(active, { action: "锁定工位", reason: "异常锁定", handoverTo: "班组长", result: "禁止开工，需复核" });
    updateEmployee(active.id, { status: "资质异常", locked: true }, "已锁定当前工位开工准入");
  });
  $("#resetLoginBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    employees = structuredClone(initialEmployees);
    history = structuredClone(initialHistory);
    equipmentEvents = structuredClone(initialEquipmentEvents);
    logs = [];
    state = { activeEmployeeId: "E1003", search: "", status: "all", line: "all", team: "all", detailOpen: true, taskDrawerOpen: true, terminalStation: "ASM-WS-03", authMethod: "模拟员工码", exitReason: "换班交接", handoverTo: "E1042", intervalType: "employee", intervalEmployeeId: "E1017", intervalEquipment: "SMT-WS-02", intervalStart: "08:00", intervalEnd: "12:00" };
    $("#loginSearch").value = "";
    $("#loginStatusFilter").value = "all";
    $("#loginLineFilter").value = "all";
    $("#loginTeamFilter").value = "all";
    $("#scanInput").value = "";
    renderAll();
    showToast("人员到岗监控演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#loginSearch").value = state.search;
$("#loginStatusFilter").value = state.status;
$("#loginLineFilter").value = state.line;
$("#loginTeamFilter").value = state.team;
bindEvents();
renderAll();
