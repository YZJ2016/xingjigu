const STORAGE_KEY = "xingjigu_mes_shift_handover_v1";

const modules = window.MES_NAV_MODULES || [
  { id: "workbench", title: "首页工作台", layer: "日常工作", color: "#007aff", mark: "首", items: ["生产总览", "今日待办", "异常提醒", "交期预警", "车间看板", "我的审批"] },
  { id: "orders", title: "订单与计划", layer: "计划部门", color: "#5856d6", mark: "计", items: ["生产订单", "订单评审", "生产排程", "产能负荷", "交期预警", "计划调整", "齐套检查"] },
  { id: "dispatch", title: "派工与生产任务", layer: "车间管理", color: "#34c759", mark: "任", items: ["派工单", "工序任务", "班组任务", "任务下达", "任务变更", "SOP 查看", "开工检查"] },
  { id: "station", title: "工位作业", layer: "现场回执", color: "#00a6a6", mark: "位", items: ["员工登录", "扫码开工", "工艺指导", "投料确认", "过程记录", "工序报工", "交接班"] },
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

const initialHandovers = [
  {
    id: "HO-004",
    dispatchNo: "D-004",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "整机装配",
    line: "Line-A",
    station: "ASM-WS-03",
    equipment: "电批 EC-ASM-03",
    batch: "LOT-TCU100-20260620-001",
    fromShift: "白班",
    toShift: "夜班",
    shiftType: "白班转夜班",
    outOperator: "赵杰",
    outEmployeeId: "E1003",
    inOperator: "吴敏",
    inEmployeeId: "E1068",
    team: "A1 班 → A2 班",
    wipQty: 420,
    goodQty: 360,
    defectQty: 12,
    pendingQty: 48,
    status: "待交出",
    outConfirm: "待确认",
    inConfirm: "待确认",
    handoverTime: "19:48",
    source: "模拟工位终端",
    gates: { people: "待确认", station: "通过", dispatch: "通过", wip: "通过", exception: "待确认", signature: "待确认" },
    checklist: [
      { label: "WIP 数量", value: "420 台在制", status: "通过", desc: "尾数 48 台待夜班继续装配" },
      { label: "过程记录", value: "扭矩曲线已回传", status: "通过", desc: "SN 追溯记录完整" },
      { label: "质量事项", value: "12 台不良待复核", status: "待确认", desc: "质量员已接收复核任务" },
      { label: "工装设备", value: "电批点检正常", status: "通过", desc: "设备员 19:40 点检完成" },
    ],
    risks: [
      { type: "质量复核待跟进", owner: "质量员", status: "待跟进", desc: "12 台外壳锁附痕迹需夜班复核" },
    ],
  },
  {
    id: "HO-005",
    dispatchNo: "D-005",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "功能测试",
    line: "Line-A",
    station: "TEST-WS-01",
    equipment: "测试台 TEST-A-01",
    batch: "LOT-TCU100-20260620-001",
    fromShift: "白班",
    toShift: "夜班",
    shiftType: "白班转夜班",
    outOperator: "孙磊",
    outEmployeeId: "E1052",
    inOperator: "黄琳",
    inEmployeeId: "E1071",
    team: "A1 班 → A2 班",
    wipQty: 310,
    goodQty: 260,
    defectQty: 8,
    pendingQty: 42,
    status: "异常移交",
    outConfirm: "已确认",
    inConfirm: "待确认",
    handoverTime: "19:36",
    source: "模拟测试台回传",
    gates: { people: "通过", station: "通过", dispatch: "通过", wip: "通过", exception: "拦截", signature: "待确认" },
    checklist: [
      { label: "测试实绩", value: "260 合格 / 8 不良", status: "通过", desc: "测试数据已绑定 SN" },
      { label: "SPC 状态", value: "RS485 响应时间预警", status: "拦截", desc: "未完成质量复核前不允许报工" },
      { label: "设备状态", value: "测试台可运行", status: "通过", desc: "治具计数器已复位" },
      { label: "接班动作", value: "接班人未刷卡", status: "待确认", desc: "等待夜班接收异常" },
    ],
    risks: [
      { type: "质量复核待跟进", owner: "接班班组长", status: "待跟进", desc: "SPC 预警需夜班首批复测 20 台" },
      { type: "尾数报工待补录", owner: "孙磊", status: "待补录", desc: "白班尾数 42 台未报工" },
    ],
  },
  {
    id: "HO-111",
    dispatchNo: "D-111",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    operation: "包装入库",
    line: "Line-C",
    station: "PACK-WS-02",
    equipment: "Pack-C",
    batch: "LOT-THS10-20260621-001",
    fromShift: "白班",
    toShift: "夜班",
    shiftType: "临时换人",
    outOperator: "陈洁",
    outEmployeeId: "E1082",
    inOperator: "马岚",
    inEmployeeId: "E1085",
    team: "C1 班内部",
    wipQty: 0,
    goodQty: 120,
    defectQty: 0,
    pendingQty: 0,
    status: "已闭环",
    outConfirm: "已确认",
    inConfirm: "已确认",
    handoverTime: "10:30",
    source: "模拟 PDA 签收",
    gates: { people: "通过", station: "通过", dispatch: "通过", wip: "通过", exception: "通过", signature: "通过" },
    checklist: [
      { label: "工序状态", value: "已报工", status: "通过", desc: "120 台包装入库已同步 ERP" },
      { label: "箱码复核", value: "SN 集合一致", status: "通过", desc: "箱码和托盘码已绑定" },
      { label: "余料处理", value: "包装盒已核销", status: "通过", desc: "线边余料已退回" },
      { label: "双人确认", value: "交接闭环", status: "通过", desc: "交接记录可追溯" },
    ],
    risks: [],
  },
  {
    id: "HO-208",
    dispatchNo: "D-208",
    orderId: "MO-202606-0020",
    product: "智能网关 GW-20",
    operation: "老化测试",
    line: "Line-B",
    station: "AGING-WS-04",
    equipment: "老化柜 AG-B-04",
    batch: "LOT-GW20-20260622-003",
    fromShift: "夜班",
    toShift: "白班",
    shiftType: "夜班转白班",
    outOperator: "林泽",
    outEmployeeId: "E1090",
    inOperator: "何佳",
    inEmployeeId: "E1039",
    team: "B2 班 → B1 班",
    wipQty: 96,
    goodQty: 0,
    defectQty: 0,
    pendingQty: 96,
    status: "待接收",
    outConfirm: "已确认",
    inConfirm: "待确认",
    handoverTime: "07:52",
    source: "模拟设备信号",
    gates: { people: "通过", station: "通过", dispatch: "通过", wip: "通过", exception: "待确认", signature: "待确认" },
    checklist: [
      { label: "老化批次", value: "96 台在柜", status: "通过", desc: "预计 10:40 完成" },
      { label: "设备温区", value: "2 区温度波动", status: "待确认", desc: "设备员需接班后复核" },
      { label: "电表读数", value: "已回传", status: "通过", desc: "设备信号已绑定派工单" },
      { label: "接班动作", value: "接班人未刷卡", status: "待确认", desc: "等待白班接收" },
    ],
    risks: [
      { type: "设备点检未完成", owner: "设备员", status: "待跟进", desc: "2 区温度波动需复核后继续老化" },
    ],
  },
];

const initialHistory = [
  { id: "HH-001", handoverId: "HO-111", time: "10:30", action: "交接闭环", dispatchNo: "D-111", operation: "包装入库", station: "PACK-WS-02", shift: "临时换人", people: "陈洁 → 马岚", source: "模拟 PDA 签收", result: "双人确认，箱码和余料均已闭环" },
  { id: "HH-002", handoverId: "HO-005", time: "19:36", action: "异常移交", dispatchNo: "D-005", operation: "功能测试", station: "TEST-WS-01", shift: "白班转夜班", people: "孙磊 → 黄琳", source: "模拟测试台回传", result: "SPC 预警和尾数报工移交夜班" },
  { id: "HH-003", handoverId: "HO-208", time: "07:52", action: "交班确认", dispatchNo: "D-208", operation: "老化测试", station: "AGING-WS-04", shift: "夜班转白班", people: "林泽 → 何佳", source: "模拟设备信号", result: "老化批次在柜，等待接班确认" },
  { id: "HH-004", handoverId: "HO-004", time: "19:48", action: "待交出", dispatchNo: "D-004", operation: "整机装配", station: "ASM-WS-03", shift: "白班转夜班", people: "赵杰 → 吴敏", source: "模拟工位终端", result: "等待交班人确认尾数和质量事项" },
];

let handovers = structuredClone(initialHandovers);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeHandoverId: "HO-004",
  search: "",
  status: "all",
  line: "all",
  shift: "all",
  detailOpen: true,
  riskType: "质量复核待跟进",
  owner: "接班班组长",
  confirmMode: "模拟交班人工牌",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#handoverModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "交接班" ? " class=\"is-active\"" : "";
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

  $("#handoverModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#handoverModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    handovers = saved.handovers || handovers;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.handoverState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ handovers, history, logs, handoverState: state }));
}

function getActiveHandover() {
  return handovers.find((item) => item.id === state.activeHandoverId) || handovers[0];
}

function getVisibleHandovers() {
  const keyword = state.search.trim().toLowerCase();
  return handovers.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.outOperator} ${item.inOperator} ${item.status} ${item.batch} ${item.risks.map((risk) => risk.type).join(" ")}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const shiftMatch = state.shift === "all" || item.shiftType === state.shift;
    return keywordMatch && statusMatch && lineMatch && shiftMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderTaskList();
  renderTerminal();
  renderGateFlow();
  renderChecklist();
  renderRiskCards();
  renderHistory();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".handover-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#handoverDetailPanel").hidden = !isOpen;
  $("#showHandoverDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const visible = getVisibleHandovers();
  $("#metricPending").textContent = visible.filter((item) => item.status === "待交出").length;
  $("#metricReceiving").textContent = visible.filter((item) => item.status === "待接收").length;
  $("#metricRisk").textContent = visible.filter((item) => item.status === "异常移交" || item.risks.some((risk) => risk.status !== "已闭环")).length;
  $("#metricClosed").textContent = visible.filter((item) => item.status === "已闭环").length;
}

function renderTaskList() {
  const visible = getVisibleHandovers();
  $("#handoverTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="handover-task-card${item.id === state.activeHandoverId ? " is-active" : ""}${item.status === "已闭环" ? " is-closed" : ""}${item.status === "待接收" ? " is-risk" : ""}${item.status === "异常移交" ? " is-blocked" : ""}" type="button" data-id="${item.id}">
      <div class="handover-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="handover-task-card__role">${item.product}</span>
      <div class="handover-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.shiftType}</span>
      </div>
      <div class="handover-task-card__foot">
        <span>${item.outOperator} → ${item.inOperator}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有交接任务</strong><em>请调整筛选条件</em></div>`;

  $("#handoverTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectHandover(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveHandover();
  $("#terminalTitle").textContent = active.station;
  $("#terminalStation").textContent = active.station;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalPeople").textContent = `${active.outOperator} → ${active.inOperator}`;
  $("#terminalShift").textContent = `${active.shiftType} · ${active.team}`;
}

function renderGateFlow() {
  const active = getActiveHandover();
  const gates = [
    ["people", "人员身份", `${active.outEmployeeId} / ${active.inEmployeeId}`],
    ["station", "工位绑定", active.station],
    ["dispatch", "派工任务", `${active.dispatchNo} / ${active.operation}`],
    ["wip", "WIP 交接", `${active.wipQty} 台在制`],
    ["exception", "异常事项", active.risks.length ? `${active.risks.length} 项待移交` : "无未闭环异常"],
    ["signature", "双人确认", `${active.outConfirm} / ${active.inConfirm}`],
  ];
  $("#handoverGateFlow").innerHTML = gates.map(([key, label, desc]) => {
    const status = active.gates[key];
    return `
      <article class="handover-gate-item ${getGateClass(status)}">
        <span>${label}</span>
        <strong>${desc}</strong>
        <em>${status}</em>
      </article>
    `;
  }).join("");
}

function renderChecklist() {
  const active = getActiveHandover();
  $("#handoverChecklist").innerHTML = active.checklist.map((item) => `
    <article class="handover-check-item ${getGateClass(item.status)}">
      <div>
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.desc}</p>
      </div>
      <span>${item.status}</span>
    </article>
  `).join("");
}

function renderRiskCards() {
  const active = getActiveHandover();
  $("#handoverRiskCards").innerHTML = active.risks.length ? active.risks.map((risk) => `
    <article class="handover-risk-card ${risk.status === "已闭环" ? "is-ready" : "is-risk"}">
      <span>${risk.type}</span>
      <strong>${risk.owner}</strong>
      <b>${risk.status}</b>
      <p>${risk.desc}</p>
      <em>${active.dispatchNo} · ${active.station}</em>
    </article>
  `).join("") : `<article class="handover-risk-card is-ready"><span>无未闭环事项</span><strong>交接清单完整</strong><b>可闭环</b><p>当前派工单没有待移交异常，接班确认后形成交接履历。</p><em>${active.dispatchNo} · ${active.station}</em></article>`;
}

function renderHistory() {
  const visibleIds = new Set(getVisibleHandovers().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.handoverId)).slice(0, 30);
  $("#handoverHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.handoverId === state.activeHandoverId ? "is-active" : ""}" data-id="${item.handoverId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.dispatchNo} / ${item.operation}</td>
      <td>${item.station} / ${item.shift}</td>
      <td>${item.people}</td>
      <td>${item.source}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有交接履历</td></tr>`;

  $("#handoverHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectHandover(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveHandover();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["生产批次", item.batch],
    ["工序", item.operation],
    ["工位 / 设备", `${item.station} / ${item.equipment}`],
    ["产线", item.line],
    ["交班人", `${item.outOperator} · ${item.outEmployeeId}`],
    ["接班人", `${item.inOperator} · ${item.inEmployeeId}`],
    ["班组", item.team],
    ["班次", item.shiftType],
    ["WIP / 待续作", `${item.wipQty} / ${item.pendingQty}`],
    ["交接时间", item.handoverTime],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["人员身份", item.gates.people, `${item.outOperator} 与 ${item.inOperator} 双人确认`],
    ["工位绑定", item.gates.station, item.station],
    ["派工任务", item.gates.dispatch, `${item.dispatchNo} 绑定 ${item.operation}`],
    ["WIP 数量", item.gates.wip, `${item.wipQty} 台在制，${item.pendingQty} 台待续作`],
    ["异常事项", item.gates.exception, item.risks.length ? `${item.risks.length} 项未闭环` : "无未闭环异常"],
    ["双签留痕", item.gates.signature, `${item.outConfirm} / ${item.inConfirm}`],
  ];
  $("#gateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#detailRiskSelect").value = state.riskType;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveHandover();
  const scoped = logs.filter((log) => log.handoverId === active.id).slice(0, 5);
  $("#handoverLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.status}</strong><em>后台记录交出、接收、异常移交和双签结果</em></div>`;
}

function getGateText(item) {
  const blocked = Object.values(item.gates).filter((value) => value === "拦截").length;
  const pending = Object.values(item.gates).filter((value) => value === "待确认").length;
  if (blocked) return `拦截 ${blocked} 项`;
  if (pending) return `待确认 ${pending} 项`;
  return "校验通过";
}

function getGateClass(status) {
  if (status === "通过" || status === "已闭环") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已闭环") return "green";
  if (status === "异常移交") return "red";
  if (status === "待接收") return "orange";
  return "blue";
}

function selectHandover(id) {
  state.activeHandoverId = id;
  state.detailOpen = true;
  recordLog(id, "已打开交接班详情", "后台切换到当前工位交接任务");
  saveState();
  renderAll();
}

function updateHandover(id, patch, message) {
  const index = handovers.findIndex((item) => item.id === id);
  if (index < 0) return;
  handovers[index] = { ...handovers[index], ...patch };
  const next = handovers[index];
  const action = patch.status === "异常移交" ? "handoverRisk" : patch.status === "已闭环" ? "handoverClose" : "handoverConfirm";
  window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, action, {
    dispatchId: next.dispatchNo,
    station: next.station,
    equipment: next.equipment,
    status: next.status,
    owner: `${next.outOperator} / ${next.inOperator}`,
    result: message,
  });
  state.activeHandoverId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function confirmOut(item) {
  const gates = { ...item.gates, people: "通过" };
  const status = item.inConfirm === "已确认" ? getCloseStatus(item) : "待接收";
  if (status === "已闭环") gates.signature = "通过";
  appendHistory(item, { action: "交班确认", source: state.confirmMode, result: `${item.outOperator} 已确认 WIP、异常和设备状态` });
  updateHandover(item.id, {
    outConfirm: "已确认",
    status,
    gates,
    checklist: markChecklist(item.checklist, "交班动作", "交班人已确认", "通过", "模拟工牌/NFC 已留痕"),
  }, "交班确认已记录");
}

function confirmIn(item) {
  const gates = { ...item.gates, people: "通过" };
  const status = item.outConfirm === "已确认" ? getCloseStatus(item) : "待交出";
  if (status === "已闭环") gates.signature = "通过";
  appendHistory(item, { action: "接班确认", source: state.confirmMode, result: `${item.inOperator} 已接收 WIP、异常和续作事项` });
  updateHandover(item.id, {
    inConfirm: "已确认",
    status,
    gates,
    checklist: markChecklist(item.checklist, "接班动作", "接班人已确认", "通过", "模拟工牌/NFC 已留痕"),
  }, "接班确认已记录");
}

function addRisk(item, riskType, owner) {
  const nextRisk = { type: riskType, owner, status: "待跟进", desc: `${riskType} 已移交给 ${owner}，接班后继续处置` };
  appendHistory(item, { action: "异常移交", source: state.confirmMode, result: `${riskType} 已指定 ${owner} 跟进` });
  updateHandover(item.id, {
    status: "异常移交",
    risks: [nextRisk, ...item.risks].slice(0, 5),
    gates: { ...item.gates, exception: "拦截", signature: "待确认" },
    checklist: markChecklist(item.checklist, "异常移交", riskType, "拦截", `责任人 ${owner}`),
  }, "异常移交已登记");
}

function closeRisks(item) {
  const risks = item.risks.map((risk) => ({ ...risk, status: "已闭环" }));
  const status = item.outConfirm === "已确认" && item.inConfirm === "已确认" ? "已闭环" : item.inConfirm === "已确认" ? "待交出" : "待接收";
  appendHistory(item, { action: "闭环移交事项", source: "后台处置", result: "未闭环事项已确认处置并保留追溯记录" });
  updateHandover(item.id, {
    risks,
    status,
    gates: {
      ...item.gates,
      exception: "通过",
      signature: status === "已闭环" ? "通过" : item.gates.signature,
    },
    checklist: item.checklist.map((entry) => entry.status === "拦截" || entry.status === "待确认" ? { ...entry, status: "通过", desc: `${entry.desc}；已闭环` } : entry),
  }, "移交事项已闭环");
}

function getCloseStatus(item) {
  const hasOpenRisk = item.risks.some((risk) => risk.status !== "已闭环");
  return hasOpenRisk || item.gates.exception === "拦截" ? "异常移交" : "已闭环";
}

function markChecklist(checklist, label, value, status, desc) {
  const exists = checklist.some((item) => item.label === label);
  const nextItem = { label, value, status, desc };
  return exists ? checklist.map((item) => item.label === label ? nextItem : item) : [...checklist, nextItem].slice(-5);
}

function appendHistory(item, patch) {
  history = [
    {
      id: `HH-${Date.now()}`,
      handoverId: item.id,
      time: patch.time || nowTime(),
      action: patch.action,
      dispatchNo: item.dispatchNo,
      operation: item.operation,
      station: item.station,
      shift: item.shiftType,
      people: `${item.outOperator} → ${item.inOperator}`,
      source: patch.source || item.source,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(handoverId, action, result) {
  logs = [
    { handoverId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
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
  $("#handoverSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#handoverStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#handoverLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#handoverShiftFilter").addEventListener("change", (event) => {
    state.shift = event.target.value;
    saveState();
    renderAll();
  });
  $("#handoverConfirmMode").addEventListener("change", (event) => {
    state.confirmMode = event.target.value;
    saveState();
  });
  $("#handoverRiskSelect").addEventListener("change", (event) => {
    state.riskType = event.target.value;
    $("#detailRiskSelect").value = event.target.value;
    saveState();
  });
  $("#detailRiskSelect").addEventListener("change", (event) => {
    state.riskType = event.target.value;
    $("#handoverRiskSelect").value = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  $("#outConfirmBtn").addEventListener("click", () => confirmOut(getActiveHandover()));
  $("#inConfirmBtn").addEventListener("click", () => confirmIn(getActiveHandover()));
  $("#riskHandoverBtn").addEventListener("click", () => addRisk(getActiveHandover(), state.riskType, state.owner));
  $("#nextHandoverBtn").addEventListener("click", () => {
    const index = handovers.findIndex((item) => item.id === state.activeHandoverId);
    state.activeHandoverId = handovers[(index + 1) % handovers.length].id;
    saveState();
    renderAll();
    showToast(`已切换到 ${getActiveHandover().dispatchNo}`);
  });
  $("#refreshHandoverBtn").addEventListener("click", () => {
    recordLog(getActiveHandover().id, "已刷新交接监控", "已重新读取人员、工位、WIP、异常和双签状态");
    saveState();
    renderLogs();
    showToast("交接监控已刷新");
  });
  $("#closeHandoverDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showHandoverDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#recheckHandoverBtn").addEventListener("click", () => {
    recordLog(getActiveHandover().id, "已重新执行交接校验", getGateText(getActiveHandover()));
    saveState();
    renderLogs();
    showToast("交接校验已重新执行");
  });
  $("#detailOutBtn").addEventListener("click", () => confirmOut(getActiveHandover()));
  $("#detailInBtn").addEventListener("click", () => confirmIn(getActiveHandover()));
  $("#detailRiskBtn").addEventListener("click", () => addRisk(getActiveHandover(), state.riskType, state.owner));
  $("#closeRiskBtn").addEventListener("click", () => closeRisks(getActiveHandover()));
  $("#batchHandoverBtn").addEventListener("click", () => {
    handovers = handovers.map((item) => {
      if (item.status === "已闭环" || item.status === "异常移交") return item;
      return {
        ...item,
        outConfirm: "已确认",
        status: item.inConfirm === "已确认" ? getCloseStatus(item) : "待接收",
        gates: { ...item.gates, people: "通过" },
      };
    });
    recordLog(state.activeHandoverId, "已批量生成交接单", "待交出任务已形成交班确认记录");
    saveState();
    renderAll();
    showToast("已批量生成交接单");
  });
  $("#resetHandoverBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    handovers = structuredClone(initialHandovers);
    history = structuredClone(initialHistory);
    logs = [];
    state = {
      activeHandoverId: "HO-004",
      search: "",
      status: "all",
      line: "all",
      shift: "all",
      detailOpen: true,
      riskType: "质量复核待跟进",
      owner: "接班班组长",
      confirmMode: "模拟交班人工牌",
    };
    $("#handoverSearch").value = "";
    $("#handoverStatusFilter").value = "all";
    $("#handoverLineFilter").value = "all";
    $("#handoverShiftFilter").value = "all";
    $("#handoverCardInput").value = "";
    $("#handoverConfirmMode").value = state.confirmMode;
    $("#handoverRiskSelect").value = state.riskType;
    renderAll();
    showToast("交接班演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#handoverSearch").value = state.search;
$("#handoverStatusFilter").value = state.status;
$("#handoverLineFilter").value = state.line;
$("#handoverShiftFilter").value = state.shift;
$("#handoverConfirmMode").value = state.confirmMode;
$("#handoverRiskSelect").value = state.riskType;
bindEvents();
renderAll();
