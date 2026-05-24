const STORAGE_KEY = "xingjigu_mes_operation_report_v1";

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

const initialReports = [
  {
    id: "OR-004",
    dispatchNo: "D-004",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "整机装配",
    line: "Line-A",
    station: "ASM-WS-03",
    equipment: "电批 EC-ASM-03",
    operator: "赵杰",
    employeeId: "E1003",
    team: "A1 班",
    shift: "白班",
    processBatch: "LOT-TCU100-20260620-001",
    planQty: 800,
    wipQty: 800,
    goodQty: 0,
    defectQty: 0,
    scrapQty: 0,
    laborHours: 0,
    standardHours: 6.4,
    status: "待报工",
    erpStatus: "未生成",
    qualityStatus: "首件通过，IPQC 正常",
    materialStatus: "投料已确认",
    processStatus: "扭矩待回传",
    reportTime: "",
    gates: { start: "通过", material: "通过", process: "待确认", quality: "通过", quantity: "待确认", erp: "待确认" },
    timeline: [
      { step: "人员绑定", time: "08:00", status: "通过", desc: "赵杰绑定 ASM-WS-03" },
      { step: "扫码开工", time: "08:12", status: "通过", desc: "D-004 建立开工履历" },
      { step: "投料确认", time: "10:05", status: "通过", desc: "外壳、铭牌、螺钉批次已绑定" },
      { step: "过程记录", time: "待回传", status: "待确认", desc: "等待电批扭矩曲线" },
    ],
  },
  {
    id: "OR-002",
    dispatchNo: "D-002",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "DIP 插件",
    line: "Line-A",
    station: "DIP-WS-01",
    equipment: "防错夹具 JIG-DIP-04",
    operator: "钱佳",
    employeeId: "E1011",
    team: "A1 班",
    shift: "白班",
    processBatch: "LOT-TCU100-20260620-001",
    planQty: 800,
    wipQty: 800,
    goodQty: 790,
    defectQty: 8,
    scrapQty: 2,
    laborHours: 4.6,
    standardHours: 4.4,
    status: "ERP 待回传",
    erpStatus: "待回传",
    qualityStatus: "焊前目检通过，不良 8 台待返修",
    materialStatus: "用料核销完成",
    processStatus: "极性确认 OK",
    reportTime: "11:35",
    gates: { start: "通过", material: "通过", process: "通过", quality: "通过", quantity: "通过", erp: "待确认" },
    timeline: [
      { step: "人员绑定", time: "08:02", status: "通过", desc: "钱佳绑定 DIP-WS-01" },
      { step: "扫码开工", time: "08:12", status: "通过", desc: "D-002 开工成功" },
      { step: "投料确认", time: "08:18", status: "通过", desc: "CN1/CN2 批次绑定" },
      { step: "工序报工", time: "11:35", status: "待确认", desc: "等待 ERP 完工回传" },
    ],
  },
  {
    id: "OR-005",
    dispatchNo: "D-005",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "功能测试",
    line: "Line-A",
    station: "TEST-WS-01",
    equipment: "测试台 TEST-A-01",
    operator: "孙磊",
    employeeId: "E1052",
    team: "A1 班",
    shift: "白班",
    processBatch: "LOT-TCU100-20260620-001",
    planQty: 790,
    wipQty: 790,
    goodQty: 0,
    defectQty: 0,
    scrapQty: 0,
    laborHours: 0,
    standardHours: 5.8,
    status: "校验拦截",
    erpStatus: "未生成",
    qualityStatus: "RS485 响应时间 SPC 预警未复核",
    materialStatus: "上道 WIP 已转入",
    processStatus: "过程预警未关闭",
    reportTime: "",
    gates: { start: "通过", material: "通过", process: "拦截", quality: "待确认", quantity: "待确认", erp: "待确认" },
    timeline: [
      { step: "扫码开工", time: "09:02", status: "通过", desc: "测试台绑定 SN" },
      { step: "过程记录", time: "09:18", status: "拦截", desc: "RS485 响应时间趋势上升" },
      { step: "质量复核", time: "待处理", status: "待确认", desc: "等待质量员判定" },
      { step: "工序报工", time: "未开放", status: "拦截", desc: "禁止提交报工" },
    ],
  },
  {
    id: "OR-111",
    dispatchNo: "D-111",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    operation: "包装入库",
    line: "Line-C",
    station: "PACK-WS-02",
    equipment: "Pack-C",
    operator: "陈洁",
    employeeId: "E1082",
    team: "C1 班",
    shift: "白班",
    processBatch: "LOT-THS10-20260621-001",
    planQty: 120,
    wipQty: 120,
    goodQty: 120,
    defectQty: 0,
    scrapQty: 0,
    laborHours: 1.8,
    standardHours: 1.6,
    status: "已报工",
    erpStatus: "已同步",
    qualityStatus: "FQC 放行前置校验通过",
    materialStatus: "包装盒余料已核销",
    processStatus: "箱码复核 OK",
    reportTime: "10:18",
    gates: { start: "通过", material: "通过", process: "通过", quality: "通过", quantity: "通过", erp: "通过" },
    timeline: [
      { step: "投料确认", time: "09:46", status: "通过", desc: "包装盒差异已核销" },
      { step: "箱码复核", time: "10:02", status: "通过", desc: "箱码与 SN 集合一致" },
      { step: "工序报工", time: "10:18", status: "通过", desc: "120 台包装完成" },
      { step: "ERP 回传", time: "10:19", status: "通过", desc: "完工实绩已同步" },
    ],
  },
];

const initialHistory = [
  { id: "RH-001", reportId: "OR-111", time: "10:19", action: "ERP 回传", dispatchNo: "D-111", operation: "包装入库", station: "PACK-WS-02", owner: "系统", qty: "120 / 0 / 0", hours: "1.8h", result: "完工数量、工时和用料已回传 ERP" },
  { id: "RH-002", reportId: "OR-002", time: "11:35", action: "工序报工", dispatchNo: "D-002", operation: "DIP 插件", station: "DIP-WS-01", owner: "钱佳", qty: "790 / 8 / 2", hours: "4.6h", result: "报工已生成，等待 ERP 回传" },
  { id: "RH-003", reportId: "OR-005", time: "09:20", action: "报工拦截", dispatchNo: "D-005", operation: "功能测试", station: "TEST-WS-01", owner: "质量员", qty: "0 / 0 / 0", hours: "0h", result: "过程预警未关闭，禁止报工" },
  { id: "RH-004", reportId: "OR-004", time: "10:12", action: "待报工", dispatchNo: "D-004", operation: "整机装配", station: "ASM-WS-03", owner: "赵杰", qty: "0 / 0 / 0", hours: "0h", result: "等待过程记录完成后提交报工" },
];

let reports = structuredClone(initialReports);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeReportId: "OR-004",
  search: "",
  status: "all",
  line: "all",
  operation: "all",
  detailOpen: true,
  reason: "报工数量大于可报 WIP",
  owner: "班组长",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#reportModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "工序报工" ? " class=\"is-active\"" : "";
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

  $("#reportModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#reportModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    reports = saved.reports || reports;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.reportState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ reports, history, logs, reportState: state }));
}

function getActiveReport() {
  return reports.find((item) => item.id === state.activeReportId) || reports[0];
}

function getVisibleReports() {
  const keyword = state.search.trim().toLowerCase();
  return reports.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.operator} ${item.status} ${item.processBatch}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const operationMatch = state.operation === "all" || item.operation === state.operation;
    return keywordMatch && statusMatch && lineMatch && operationMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderTaskList();
  renderTerminal();
  renderGateFlow();
  renderTimelineCards();
  renderTraceCards();
  renderHistory();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".report-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#reportDetailPanel").hidden = !isOpen;
  $("#showReportDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const visible = getVisibleReports();
  $("#metricSubmitted").textContent = visible.filter((item) => item.status === "已报工").length;
  $("#metricWaiting").textContent = visible.filter((item) => item.status === "待报工").length;
  $("#metricBlocked").textContent = visible.filter((item) => item.status === "校验拦截").length;
  $("#metricErpPending").textContent = visible.filter((item) => item.status === "ERP 待回传").length;
}

function renderTaskList() {
  const visible = getVisibleReports();
  $("#reportTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="report-task-card${item.id === state.activeReportId ? " is-active" : ""}${item.status === "已报工" ? " is-submitted" : ""}${item.status === "ERP 待回传" ? " is-risk" : ""}${item.status === "校验拦截" ? " is-blocked" : ""}" type="button" data-id="${item.id}">
      <div class="report-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="report-task-card__role">${item.product}</span>
      <div class="report-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.operator} · ${item.employeeId}</span>
      </div>
      <div class="report-task-card__foot">
        <span>WIP ${item.wipQty} / 合格 ${item.goodQty}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有工序报工任务</strong><em>请调整筛选条件</em></div>`;

  $("#reportTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectReport(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveReport();
  $("#terminalTitle").textContent = active.station;
  $("#terminalStation").textContent = active.station;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalQty").textContent = `${active.goodQty} / ${active.defectQty} / ${active.scrapQty}`;
  $("#terminalQtyHint").textContent = `合格 / 不良 / 报废 · WIP ${active.wipQty}`;
}

function renderGateFlow() {
  const active = getActiveReport();
  const gates = [
    ["start", "开工履历", `${active.operator} / ${active.shift}`],
    ["material", "用料核销", active.materialStatus],
    ["process", "过程记录", active.processStatus],
    ["quality", "质量状态", active.qualityStatus],
    ["quantity", "数量规则", `${active.goodQty + active.defectQty + active.scrapQty}/${active.wipQty}`],
    ["erp", "ERP 回传", active.erpStatus],
  ];
  $("#reportGateFlow").innerHTML = gates.map(([key, label, desc]) => {
    const status = active.gates[key];
    return `
      <article class="report-gate-item ${getGateClass(status)}">
        <span>${label}</span>
        <strong>${desc}</strong>
        <em>${status}</em>
      </article>
    `;
  }).join("");
}

function renderTimelineCards() {
  const active = getActiveReport();
  $("#timelineCards").innerHTML = active.timeline.map((item) => `
    <article class="timeline-card ${getTimelineClass(item.status)}">
      <span>${item.time}</span>
      <strong>${item.step}</strong>
      <b>${item.status}</b>
      <p>${item.desc}</p>
      <em>${active.dispatchNo} · ${active.station}</em>
    </article>
  `).join("");
}

function renderTraceCards() {
  const active = getActiveReport();
  const reportQty = active.goodQty + active.defectQty + active.scrapQty;
  const cards = [
    ["WIP 结转", active.status === "已报工" || active.status === "ERP 待回传" ? `已扣减 ${reportQty}` : `可报 ${active.wipQty}`, "报工后触发下道工序或完工确认"],
    ["质量去向", active.defectQty ? `不良 ${active.defectQty} 台待处理` : "暂无不良", "不良进入返修、报废或质量评审"],
    ["工时反馈", `${active.laborHours || active.standardHours}h / 标准 ${active.standardHours}h`, "反向修正 APS 与标准工时模型"],
    ["ERP 接口", active.erpStatus, "完工数量、工时、用料和工单状态回传"],
  ];
  $("#traceCards").innerHTML = cards.map(([label, value, hint]) => `
    <article class="trace-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");
}

function renderHistory() {
  const visibleIds = new Set(getVisibleReports().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.reportId)).slice(0, 30);
  $("#reportHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.reportId === state.activeReportId ? "is-active" : ""}" data-id="${item.reportId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.dispatchNo} / ${item.operation}</td>
      <td>${item.station} / ${item.owner}</td>
      <td>${item.qty}</td>
      <td>${item.hours}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有报工履历</td></tr>`;

  $("#reportHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectReport(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveReport();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["生产批次", item.processBatch],
    ["工序", item.operation],
    ["工位", item.station],
    ["设备", item.equipment],
    ["操作员", `${item.operator} · ${item.employeeId}`],
    ["班组", `${item.team} · ${item.shift}`],
    ["计划 / WIP", `${item.planQty} / ${item.wipQty}`],
    ["合格 / 不良 / 报废", `${item.goodQty} / ${item.defectQty} / ${item.scrapQty}`],
    ["实际 / 标准工时", `${item.laborHours}h / ${item.standardHours}h`],
    ["报工时间", item.reportTime || "未报工"],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["开工履历", item.gates.start, `${item.dispatchNo} 已建立开工记录`],
    ["用料核销", item.gates.material, item.materialStatus],
    ["过程记录", item.gates.process, item.processStatus],
    ["质量状态", item.gates.quality, item.qualityStatus],
    ["数量规则", item.gates.quantity, `报工数量 ${item.goodQty + item.defectQty + item.scrapQty} / WIP ${item.wipQty}`],
    ["ERP 回传", item.gates.erp, item.erpStatus],
  ];
  $("#gateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#reportReasonSelect").value = state.reason;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveReport();
  const scoped = logs.filter((log) => log.reportId === active.id).slice(0, 5);
  $("#reportLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.status}</strong><em>后台记录报工回执、校验拦截和 ERP 同步结果</em></div>`;
}

function getGateText(item) {
  const blocked = Object.values(item.gates).filter((value) => value === "拦截").length;
  const pending = Object.values(item.gates).filter((value) => value === "待确认").length;
  if (blocked) return `拦截 ${blocked} 项`;
  if (pending) return `待确认 ${pending} 项`;
  return "校验通过";
}

function getGateClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getTimelineClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已报工") return "green";
  if (status === "校验拦截") return "red";
  if (status === "ERP 待回传") return "orange";
  return "blue";
}

function selectReport(id) {
  state.activeReportId = id;
  state.detailOpen = true;
  recordLog(id, "已打开工序报工详情", "后台切换到当前派工单报工任务");
  saveState();
  renderAll();
}

function updateReport(id, patch, message) {
  const index = reports.findIndex((item) => item.id === id);
  if (index < 0) return;
  reports[index] = { ...reports[index], ...patch };
  const next = reports[index];
  const action = patch.status === "校验拦截" ? "reportBlock" : patch.status === "已报工" || patch.status === "ERP 待回传" ? "operationReport" : "reportReview";
  window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, action, {
    dispatchId: next.dispatchNo,
    station: next.station,
    equipment: next.equipment,
    status: next.status,
    owner: next.operator || state.owner,
    goodQty: next.goodQty,
    result: message,
  });
  state.activeReportId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function getInputNumber(selector, fallback) {
  const value = Number($(selector).value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function submitReport(item, message) {
  if (Object.values(item.gates).some((gate) => gate === "拦截")) {
    showToast("存在报工拦截项，不能提交");
    return;
  }
  const goodQty = getInputNumber("#goodQtyInput", item.goodQty || item.wipQty);
  const defectQty = getInputNumber("#defectQtyInput", item.defectQty);
  const scrapQty = getInputNumber("#scrapQtyInput", item.scrapQty);
  const laborHours = getInputNumber("#laborHourInput", item.laborHours || item.standardHours);
  const total = goodQty + defectQty + scrapQty;
  if (total > item.wipQty) {
    blockReport(item, "报工数量大于可报 WIP", state.owner);
    return;
  }
  const nextStatus = item.operation === "包装入库" ? "已报工" : "ERP 待回传";
  const gates = { ...item.gates, quantity: "通过", erp: nextStatus === "已报工" ? "通过" : "待确认" };
  appendHistory(item, {
    action: "工序报工",
    qty: `${goodQty} / ${defectQty} / ${scrapQty}`,
    hours: `${laborHours}h`,
    owner: item.operator,
    result: nextStatus === "已报工" ? "报工完成并已同步 ERP" : "报工已生成，等待 ERP 完工回传",
  });
  updateReport(item.id, {
    status: nextStatus,
    goodQty,
    defectQty,
    scrapQty,
    laborHours,
    reportTime: nowTime(),
    erpStatus: nextStatus === "已报工" ? "已同步" : "待回传",
    gates,
    timeline: [
      ...item.timeline.filter((step) => step.step !== "工序报工" && step.step !== "ERP 回传"),
      { step: "工序报工", time: nowTime(), status: "通过", desc: `合格 ${goodQty}，不良 ${defectQty}，报废 ${scrapQty}` },
      { step: "ERP 回传", time: nextStatus === "已报工" ? nowTime() : "待回传", status: nextStatus === "已报工" ? "通过" : "待确认", desc: nextStatus === "已报工" ? "完工实绩已同步" : "等待接口回传" },
    ],
  }, message);
  ["#goodQtyInput", "#defectQtyInput", "#scrapQtyInput", "#laborHourInput"].forEach((selector) => {
    $(selector).value = "";
  });
}

function blockReport(item, reason, owner) {
  const gates = { ...item.gates };
  if (reason.includes("数量") || reason.includes("WIP")) gates.quantity = "拦截";
  else if (reason.includes("过程")) gates.process = "拦截";
  else if (reason.includes("质量")) gates.quality = "拦截";
  else if (reason.includes("用料")) gates.material = "拦截";
  else gates.erp = "拦截";
  appendHistory(item, {
    action: "报工拦截",
    qty: `${item.goodQty} / ${item.defectQty} / ${item.scrapQty}`,
    hours: `${item.laborHours}h`,
    owner,
    result: reason,
  });
  updateReport(item.id, {
    status: "校验拦截",
    gates,
    erpStatus: reason.includes("ERP") ? "回传失败" : item.erpStatus,
    timeline: [
      ...item.timeline,
      { step: "报工拦截", time: nowTime(), status: "拦截", desc: reason },
    ].slice(-5),
  }, "已登记报工拦截");
}

function retryErp(item) {
  appendHistory(item, {
    action: "ERP 回传",
    qty: `${item.goodQty} / ${item.defectQty} / ${item.scrapQty}`,
    hours: `${item.laborHours}h`,
    owner: "系统",
    result: "完工数量、工时、用料和工单状态已回传 ERP",
  });
  updateReport(item.id, {
    status: "已报工",
    erpStatus: "已同步",
    gates: { ...item.gates, erp: "通过" },
    timeline: [
      ...item.timeline.filter((step) => step.step !== "ERP 回传"),
      { step: "ERP 回传", time: nowTime(), status: "通过", desc: "完工实绩已同步" },
    ],
  }, "ERP 完工回传已同步");
}

function releaseReport(item) {
  appendHistory(item, {
    action: "处置放行",
    qty: `${item.goodQty} / ${item.defectQty} / ${item.scrapQty}`,
    hours: `${item.laborHours}h`,
    owner: state.owner,
    result: "报工异常已处置，允许重新提交或重试接口",
  });
  updateReport(item.id, {
    status: item.erpStatus === "回传失败" || item.status === "ERP 待回传" ? "ERP 待回传" : "待报工",
    gates: Object.fromEntries(Object.entries(item.gates).map(([key, value]) => [key, value === "拦截" ? "通过" : value])),
    timeline: [
      ...item.timeline,
      { step: "处置放行", time: nowTime(), status: "通过", desc: "异常已闭环" },
    ].slice(-5),
  }, "报工异常已处置放行");
}

function appendHistory(item, patch) {
  history = [
    {
      id: `RH-${Date.now()}`,
      reportId: item.id,
      time: patch.time || nowTime(),
      action: patch.action,
      dispatchNo: item.dispatchNo,
      operation: item.operation,
      station: item.station,
      owner: patch.owner || item.operator,
      qty: patch.qty || `${item.goodQty} / ${item.defectQty} / ${item.scrapQty}`,
      hours: patch.hours || `${item.laborHours}h`,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(reportId, action, result) {
  logs = [
    { reportId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
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
  $("#reportSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#reportStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#reportLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#reportOperationFilter").addEventListener("change", (event) => {
    state.operation = event.target.value;
    saveState();
    renderAll();
  });
  $("#reportReasonSelect").addEventListener("change", (event) => {
    state.reason = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  $("#syncReportBtn").addEventListener("click", () => submitReport(getActiveReport(), "已同步模拟现场报工回执"));
  $("#simulateErpBtn").addEventListener("click", () => retryErp(getActiveReport()));
  $("#simulateBlockBtn").addEventListener("click", () => blockReport(getActiveReport(), state.reason, state.owner));
  $("#nextReportBtn").addEventListener("click", () => {
    const index = reports.findIndex((item) => item.id === state.activeReportId);
    state.activeReportId = reports[(index + 1) % reports.length].id;
    saveState();
    renderAll();
    showToast(`已切换到 ${getActiveReport().dispatchNo}`);
  });
  $("#refreshReportBtn").addEventListener("click", () => {
    recordLog(getActiveReport().id, "已刷新工序报工监控", "已重新读取模拟现场回执、质量、用料和 ERP 状态");
    saveState();
    renderLogs();
    showToast("工序报工监控已刷新");
  });
  $("#closeReportDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showReportDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#recheckReportBtn").addEventListener("click", () => {
    recordLog(getActiveReport().id, "已重新执行报工校验", getGateText(getActiveReport()));
    saveState();
    renderLogs();
    showToast("报工校验已重新执行");
  });
  $("#detailSubmitBtn").addEventListener("click", () => submitReport(getActiveReport(), "已从详情同步模拟报工回执"));
  $("#erpRetryBtn").addEventListener("click", () => retryErp(getActiveReport()));
  $("#detailBlockBtn").addEventListener("click", () => blockReport(getActiveReport(), state.reason, state.owner));
  $("#releaseBlockBtn").addEventListener("click", () => releaseReport(getActiveReport()));
  $("#batchSubmitBtn").addEventListener("click", () => {
    reports = reports.map((item) => {
      if (item.status !== "待报工" || Object.values(item.gates).some((gate) => gate === "拦截")) return item;
      const goodQty = item.goodQty || item.wipQty;
      const laborHours = item.laborHours || item.standardHours;
      return {
        ...item,
        status: "ERP 待回传",
        goodQty,
        defectQty: item.defectQty,
        scrapQty: item.scrapQty,
        laborHours,
        reportTime: nowTime(),
        erpStatus: "待回传",
        gates: { ...item.gates, quantity: "通过", erp: "待确认" },
      };
    });
    recordLog(state.activeReportId, "已批量同步模拟待报工回执", "符合校验门的待报工任务已生成模拟实绩回执");
    saveState();
    renderAll();
    showToast("已批量同步模拟待报工回执");
  });
  $("#resetReportBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    reports = structuredClone(initialReports);
    history = structuredClone(initialHistory);
    logs = [];
    state = { activeReportId: "OR-004", search: "", status: "all", line: "all", operation: "all", detailOpen: true, reason: "报工数量大于可报 WIP", owner: "班组长" };
    $("#reportSearch").value = "";
    $("#reportStatusFilter").value = "all";
    $("#reportLineFilter").value = "all";
    $("#reportOperationFilter").value = "all";
    ["#goodQtyInput", "#defectQtyInput", "#scrapQtyInput", "#laborHourInput"].forEach((selector) => {
      $(selector).value = "";
    });
    renderAll();
    showToast("工序报工演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#reportSearch").value = state.search;
$("#reportStatusFilter").value = state.status;
$("#reportLineFilter").value = state.line;
$("#reportOperationFilter").value = state.operation;
bindEvents();
renderAll();
