const STORAGE_KEY = "xingjigu_mes_team_tasks_v1";

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

const initialTeamTasks = [
  { id: "TEAM-A1-001", team: "A1 班", line: "Line-A", orderId: "MO-202606-0001", dispatchId: "D-001", operation: "SMT 贴片", station: "SMT-WS-01", leader: "钱佳", members: ["王海", "刘洋", "周敏"], memberSources: ["白班排班表", "技能矩阵", "白班排班表"], required: 3, assigned: 3, load: 86, status: "执行中", shift: "白班", window: "08:00-12:00", skill: "SMT 贴片资质", risk: "正常", output: "428 / 800", handover: "11:58 移交 DIP", handoverOwner: "钱佳", sla: "12:10 前完成交接", recoveryCheck: "下道 DIP 签收后关闭", note: "人员齐套，贴片节拍稳定" },
  { id: "TEAM-A1-002", team: "A1 班", line: "Line-A", orderId: "MO-202606-0001", dispatchId: "D-002", operation: "DIP 插件", station: "DIP-WS-01", leader: "钱佳", members: ["待分配", "待分配"], required: 2, assigned: 0, load: 42, status: "待接收", shift: "白班", window: "13:00-18:00", skill: "DIP 插件资质", risk: "人员待确认", output: "0 / 800", handover: "等待 SMT 批次", note: "需确认下午班人员和工装" },
  { id: "TEAM-A1-003", team: "A1 班", line: "Line-A", orderId: "MO-202606-0001", dispatchId: "D-004", operation: "整机装配", station: "ASM-WS-03", leader: "钱佳", members: ["赵杰"], memberSources: ["白班排班表"], required: 3, assigned: 1, load: 74, status: "人员异常", shift: "白班", window: "13:00-18:00", skill: "装配与扭矩资质", risk: "缺 2 名装配人员", output: "0 / 800", handover: "待物料齐套", handoverOwner: "钱佳", sla: "30 分钟内完成人员恢复", recoveryCheck: "补员工牌/NFC 回执 + 扭矩资质复核", note: "外壳上盖缺料且装配人员不足" },
  { id: "TEAM-B1-001", team: "B1 班", line: "Line-B", orderId: "MO-202606-0002", dispatchId: "D-021", operation: "SMT 贴片", station: "SMT-WS-02", leader: "何伟", members: ["李敏", "陈涛", "许宁"], required: 3, assigned: 3, load: 91, status: "执行中", shift: "白班", window: "08:30-12:30", skill: "SMT 贴片资质", risk: "加急", output: "315 / 600", handover: "12:35 移交测试", note: "客户 B 加急，测试工位已预留" },
  { id: "TEAM-C1-001", team: "C1 班", line: "Line-C", orderId: "MO-202606-0003", dispatchId: "D-031", operation: "老化测试", station: "AGING-01", leader: "罗琴", members: ["周强", "吴平"], required: 2, assigned: 2, load: 96, status: "人员异常", shift: "白班", window: "10:00-18:00", skill: "老化测试资质", risk: "设备容量占满", output: "760 / 1200", handover: "待设备组释放老化架", note: "人员到位但设备容量限制任务推进" },
  { id: "TEAM-A1-004", team: "A1 班", line: "Line-A", orderId: "MO-202606-0004", dispatchId: "D-041", operation: "FQC 成品检验", station: "QC-Final", leader: "钱佳", members: ["QC-001"], required: 1, assigned: 1, load: 58, status: "待接收", shift: "白班", window: "14:00-18:00", skill: "FQC 检验资质", risk: "样本待确认", output: "0 / 2000", handover: "检验后移交包装", note: "等待质量组确认抽样数量" },
  { id: "TEAM-C1-002", team: "C1 班", line: "Line-C", orderId: "MO-202606-0011", dispatchId: "D-111", operation: "包装入库", station: "PACK-WS-02", leader: "罗琴", members: ["陈洁", "马岚"], required: 2, assigned: 2, load: 79, status: "待交接", shift: "白班", window: "09:00-17:30", skill: "包装与箱码复核", risk: "正常", output: "1480 / 1800", handover: "尾批交夜班包装", note: "包装材料齐套，等待尾批 FQC 放行" },
  { id: "TEAM-EQ-001", team: "设备组", line: "Line-C", orderId: "MO-202606-0003", dispatchId: "D-031", operation: "老化架释放", station: "AGING-01", leader: "设备主管", members: ["田工"], required: 1, assigned: 1, load: 68, status: "执行中", shift: "白班", window: "14:00-16:00", skill: "设备维修资质", risk: "需 16:00 前恢复", output: "处理 1 项", handover: "恢复后通知 C1 班", note: "老化架占用清理中" },
];

let teamTasks = structuredClone(initialTeamTasks);
let logs = [];
let state = {
  activeTaskId: "TEAM-A1-001",
  search: "",
  team: "all",
  status: "all",
  line: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#teamModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "班组任务" ? " class=\"is-active\"" : "";
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

  $("#teamModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#teamModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    teamTasks = saved.teamTasks || teamTasks;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.teamState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ teamTasks, logs, teamState: state }));
}

function getActiveTask() {
  return teamTasks.find((item) => item.id === state.activeTaskId) || teamTasks[0];
}

function hydrateFromLedger() {
  const rows = window.MES_DISPATCH_LEDGER?.getRows?.();
  if (!rows?.length) return;
  teamTasks = teamTasks.map((task) => {
    const ledger = rows.find((row) => row.dispatchId === task.dispatchId);
    if (!ledger) return task;
    return {
      ...task,
      line: ledger.resources?.line || task.line,
      station: ledger.resources?.station || task.station,
      output: `${ledger.execution?.outputQty ?? task.output.split(" / ")[0]} / ${(ledger.plan?.qty ?? task.output.split(" / ")[1]) || ""}`,
      handoverOwner: task.handoverOwner || task.leader,
      sla: task.sla || getDefaultSla(task),
      recoveryCheck: task.recoveryCheck || getDefaultRecoveryCheck(task),
    };
  });
}

function getVisibleTasks() {
  const keyword = state.search.trim().toLowerCase();
  return teamTasks.filter((item) => {
    const text = `${item.id} ${item.team} ${item.orderId} ${item.dispatchId} ${item.operation} ${item.station} ${item.members.join(" ")}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const teamMatch = state.team === "all" || item.team === state.team;
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && teamMatch && statusMatch && lineMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderTaskList();
  renderTeamLoad();
  renderMembers();
  renderTaskTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".team-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#teamDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  $("#metricPending").textContent = teamTasks.filter((item) => item.status === "待接收").length;
  $("#metricRunning").textContent = teamTasks.filter((item) => item.status === "执行中").length;
  $("#metricHandover").textContent = teamTasks.filter((item) => item.status === "待交接").length;
  $("#metricPeopleRisk").textContent = teamTasks.filter((item) => item.status === "人员异常").length;
}

function renderTaskList() {
  const visible = getVisibleTasks();
  $("#teamTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="task-card${item.id === state.activeTaskId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="task-card__top">
        <strong>${item.id} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="task-card__product">${item.team} · ${item.orderId} · ${item.dispatchId}</span>
      <div class="task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.assigned}/${item.required} 人</span>
        <span>${item.window}</span>
      </div>
      <div class="mini-progress"><span style="width:${item.load}%"></span></div>
      <div class="task-card__foot">
        <span>负荷 ${item.load}%</span>
        <span>${item.risk}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有班组任务</strong><em>请调整筛选条件</em></div>`;

  $("#teamTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectTask(card.dataset.id));
  });
}

function renderTeamLoad() {
  const teams = ["A1 班", "B1 班", "C1 班", "设备组"].map((team) => {
    const list = teamTasks.filter((item) => item.team === team);
    const load = Math.round(list.reduce((sum, item) => sum + item.load, 0) / Math.max(1, list.length));
    const risk = list.filter((item) => item.status === "人员异常").length;
    return { team, load, count: list.length, risk };
  });
  const active = getActiveTask();
  $("#teamLoadBoard").innerHTML = teams.map((item) => `
    <article class="team-load-card${item.team === active.team ? " is-active" : ""}">
      <span>${item.team}</span>
      <strong>${item.load}%</strong>
      <em>${item.count} 项任务 · ${item.risk} 项异常</em>
    </article>
  `).join("");
}

function renderMembers() {
  const active = getActiveTask();
  const assignments = getAssignmentDetails(active);
  $("#activeTeamText").textContent = `${active.team} · ${active.shift}`;
  $("#memberBoard").innerHTML = assignments.map((assignment, index) => {
    const empty = assignment.name.includes("待");
    return `
      <article class="member-card">
        <div class="member-card__top">
          <span>${index + 1} 号位</span>
          <span>${empty ? "待定" : assignment.source}</span>
        </div>
        <strong>${assignment.name}</strong>
        <em>${empty ? active.skill : `${active.station} · ${assignment.skill} · ${assignment.shift}`}</em>
      </article>
    `;
  }).join("");
}

function renderTaskTable() {
  const visible = getVisibleTasks();
  $("#teamTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeTaskId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.team} / ${item.line}</td>
      <td>${item.orderId} · ${item.operation}</td>
      <td>${item.station}</td>
      <td>${item.assigned} / ${item.required}</td>
      <td>${item.load}%</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有班组任务</td></tr>`;

  $("#teamTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectTask(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveTask();
  const closure = getHandoverClosure(item);
  $("#detailStatus").textContent = item.status;
  $("#detailTaskNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.team} · ${item.operation}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["派工单", item.dispatchId],
    ["产线", item.line],
    ["工位", item.station],
    ["班次", item.shift],
    ["班组长", item.leader],
    ["人员", `${item.assigned} / ${item.required}`],
    ["负荷", `${item.load}%`],
    ["窗口", item.window],
    ["产出", item.output],
    ["责任人/SLA", `${closure.owner} / ${closure.sla}`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  $("#assignmentList").innerHTML = [
    ["人员", getAssignmentSummary(item), item.assigned >= item.required ? "通过" : "待确认"],
    ["资质", `${item.skill} · 来源 ${getAssignmentSources(item)}`, item.risk.includes("资质") ? "待确认" : "通过"],
    ["交接", `${item.handover} · ${closure.owner}`, item.status === "待交接" ? "待确认" : "记录中"],
    ["SLA", closure.sla, item.status === "人员异常" ? "需处理" : "记录中"],
    ["恢复验证", closure.recoveryCheck, item.status === "人员异常" ? "待确认" : "记录中"],
    ["说明", item.note, item.status === "人员异常" ? "需处理" : "记录中"],
  ].map(([label, value, status]) => `
    <div class="readiness-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveTask();
  const scoped = logs.filter((log) => log.taskId === active.id).slice(0, 5);
  $("#teamLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.taskId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.note}</strong><em>等待班组动作</em></div>`;
}

function buildGateItems(item) {
  return [
    { label: "任务状态", desc: item.status === "人员异常" ? "需重新分配人员或资源" : "状态允许班组处理", status: item.status === "人员异常" ? "拦截" : "通过" },
    { label: "人员齐套", desc: `${item.assigned} / ${item.required} 人`, status: item.assigned >= item.required ? "通过" : "待确认" },
    { label: "资质匹配", desc: `${item.skill} · ${getAssignmentSources(item)}`, status: item.risk.includes("资质") ? "待确认" : "通过" },
    { label: "工位可用", desc: `${item.station} · ${item.window}`, status: item.risk.includes("设备") ? "待确认" : "通过" },
    { label: "交接要求", desc: item.handover, status: item.status === "待交接" ? "待确认" : "通过" },
    { label: "人员异常闭环", desc: getHandoverClosure(item).recoveryCheck, status: item.status === "人员异常" ? "待确认" : "通过" },
  ];
}

function getAssignmentDetails(item) {
  return item.members.map((member, index) => ({
    name: member,
    source: item.memberSources?.[index] || (member.includes("待") ? "待模拟回执" : "白班排班表"),
    skill: item.skill,
    shift: item.shift,
  }));
}

function getAssignmentSummary(item) {
  return getAssignmentDetails(item).map((assignment) => `${assignment.name}(${assignment.source})`).join("、");
}

function getAssignmentSources(item) {
  return [...new Set(getAssignmentDetails(item).map((assignment) => assignment.source))].join("、");
}

function getDefaultSla(item) {
  if (item.status === "人员异常") return "30 分钟内恢复人员齐套";
  if (item.status === "待交接") return "15 分钟内完成下道签收";
  return `${item.window} 内完成任务节点`;
}

function getDefaultRecoveryCheck(item) {
  if (item.status === "人员异常") return "班组长复核资质与工位绑定";
  if (item.status === "待交接") return "下道任务签收 + 数量复核";
  return "执行中持续记录人员回执";
}

function getHandoverClosure(item) {
  return {
    owner: item.handoverOwner || item.leader,
    sla: item.sla || getDefaultSla(item),
    recoveryCheck: item.recoveryCheck || getDefaultRecoveryCheck(item),
  };
}

function getGateClass(status) {
  if (["通过", "记录中"].includes(status)) return "is-pass is-ready";
  if (["拦截", "需处理"].includes(status)) return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "执行中" || status === "已完成") return "green";
  if (status === "人员异常") return "red";
  if (status === "待交接") return "orange";
  return "blue";
}

function selectTask(id) {
  state.activeTaskId = id;
  state.detailOpen = true;
  saveState();
  renderAll();
}

function updateTask(id, patch, message) {
  const index = teamTasks.findIndex((item) => item.id === id);
  if (index < 0) return;
  teamTasks[index] = { ...teamTasks[index], ...patch };
  if (patch.status === "执行中") window.MES_BUSINESS_FLOW?.applyDispatchAction?.(teamTasks[index].orderId, "release", { owner: teamTasks[index].leader || "班组长" });
  if (patch.status === "人员异常") window.MES_BUSINESS_FLOW?.applyDispatchAction?.(teamTasks[index].orderId, "hold", { owner: teamTasks[index].leader || "班组长", reason: message });
  syncLedger(teamTasks[index], patch, message);
  state.activeTaskId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function syncLedger(item, patch, message, options = {}) {
  const ledger = window.MES_DISPATCH_LEDGER;
  if (!ledger) return;
  const statusMap = { "执行中": "生产中", "待交接": "已完工", "人员异常": "异常锁定", "已完成": "已交接", "待接收": "待接单" };
  const source = options.source || "MES 后台静态演示";
  if (patch.status && statusMap[patch.status]) {
    const result = ledger.updateStatus?.(item.dispatchId, statusMap[patch.status], {
      action: message,
      owner: item.leader,
      source,
      team: item.team,
      result: options.result || "通过",
    });
    if (result?.ok) return;
  }
  ledger.appendRecord?.(item.dispatchId, message, {
    owner: item.leader,
    source,
    result: options.result || "记录",
  });
}

function recordLog(taskId, action) {
  logs = [
    { taskId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
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
  $("#teamSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#teamFilter").addEventListener("change", (event) => {
    state.team = event.target.value;
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
  $("#acceptTeamBtn").addEventListener("click", () => {
    const targets = teamTasks.filter((item) => item.status === "待接收" && item.assigned >= item.required);
    if (!targets.length) {
      showToast("没有人员齐套的待接收任务");
      return;
    }
    targets.forEach((item) => {
      item.status = "执行中";
      recordLog(item.id, "班组批量接收任务，人员回执已核对");
      syncLedger(item, { status: "执行中" }, "班组批量接收任务，人员回执已核对");
    });
    state.activeTaskId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已接收 ${targets.length} 项班组任务`);
  });
  $("#handoverSheetBtn").addEventListener("click", () => {
    const item = getActiveTask();
    recordLog(item.id, `已生成班组交接清单，责任人 ${getHandoverClosure(item).owner}，SLA ${getHandoverClosure(item).sla}`);
    syncLedger(item, {}, "已生成班组交接清单，等待模拟工牌/NFC 交接回执");
    saveState();
    renderLogs();
    showToast("交接清单已生成");
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
  $("#checkTeamBtn").addEventListener("click", () => {
    const item = getActiveTask();
    recordLog(item.id, "已刷新班组校验");
    saveState();
    renderLogs();
    showToast("班组校验已刷新");
  });
  $("#acceptBtn").addEventListener("click", () => {
    const item = getActiveTask();
    if (item.assigned < item.required) {
      showToast("人员未齐套，不能接收");
      return;
    }
    updateTask(item.id, { status: "执行中" }, "班组已接收任务，人员资质与工位绑定通过");
  });
  $("#assignBtn").addEventListener("click", () => {
    const item = getActiveTask();
    const pool = [
      { name: "韩磊", source: "模拟工牌回执", skill: "技能矩阵：装配与扭矩资质" },
      { name: "沈倩", source: "模拟 NFC 回执", skill: "技能矩阵：DIP 插件资质" },
      { name: "陆晨", source: "模拟班次调拨", skill: "白班支援名单" },
    ];
    const memberSources = item.members.map((member, index) => member.includes("待") ? pool[index % pool.length].source : item.memberSources?.[index] || "白班排班表");
    const members = item.members.map((member, index) => member.includes("待") ? `${pool[index % pool.length].name}(${pool[index % pool.length].skill})` : member);
    updateTask(item.id, {
      members,
      memberSources,
      assigned: item.required,
      risk: item.risk.includes("人员") ? "正常" : item.risk,
      recoveryCheck: "模拟人员回执已复核，资质与班次来源已归档",
    }, "模拟人员回执通过，人员资质与班次来源已归档");
  });
  $("#startBtn").addEventListener("click", () => updateTask(getActiveTask().id, { status: "执行中" }, "班组任务已开始执行"));
  $("#handoverBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, {
      status: "已完成",
      handoverOwner: item.leader,
      sla: "交接回执已在 SLA 内完成",
      recoveryCheck: "模拟工牌/NFC 交接回执通过，下道签收与数量复核完成",
    }, "模拟工牌/NFC 交接回执通过，班组交接已闭环");
  });
  $("#peopleRiskBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, {
      status: "人员异常",
      risk: "人员缺勤或资质待确认",
      sla: "30 分钟内恢复人员齐套",
      recoveryCheck: "需模拟工牌/NFC 回执并复核技能矩阵",
    }, "已标记人员异常，责任人和恢复验证已记录");
  });
  $("#rebalanceBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, { load: Math.max(45, item.load - 18), status: item.assigned >= item.required ? "执行中" : "待接收", risk: item.assigned >= item.required ? "正常" : item.risk }, "已完成班组负荷均衡，人员来源保持可追溯");
  });
  $("#resetTeamBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    window.MES_DISPATCH_LEDGER?.reset?.();
    teamTasks = structuredClone(initialTeamTasks);
    logs = [];
    state = { activeTaskId: "TEAM-A1-001", search: "", team: "all", status: "all", line: "all", detailOpen: true };
    $("#teamSearch").value = "";
    $("#teamFilter").value = "all";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    renderAll();
    showToast("班组演示已重置");
  });
}

loadState();
hydrateFromLedger();
renderFrameMenu();
$("#teamSearch").value = state.search;
$("#teamFilter").value = state.team;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
