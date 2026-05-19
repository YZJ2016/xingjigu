const STORAGE_KEY = "xingjigu_mes_process_record_v1";

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

const initialRecords = [
  {
    id: "PR-004-TQ",
    dispatchNo: "D-004",
    orderId: "MO-202606-0001",
    serialNo: "SN-TCU100-000421",
    product: "智能温控控制器 TCU-100",
    operation: "整机装配",
    line: "Line-A",
    station: "ASM-WS-03",
    equipment: "电批 EC-ASM-03",
    operator: "赵杰",
    employeeId: "E1003",
    parameter: "锁付扭矩",
    source: "设备 PLC",
    value: "",
    unit: "N·m",
    lower: 0.39,
    target: 0.42,
    upper: 0.45,
    status: "待回传",
    sampleTime: "",
    processBatch: "LOT-TCU100-20260620-001",
    materialBatch: "CASE-A-L20260610",
    sopVersion: "SOP-TCU-ASM V4.0",
    spc: "等待首件后进入 SPC",
    alarm: "",
    gates: { start: "通过", material: "通过", parameter: "待确认", equipment: "通过", quality: "待确认", trace: "待确认" },
    parameters: [
      { name: "锁付扭矩", value: "", lower: 0.39, target: 0.42, upper: 0.45, unit: "N·m", source: "设备 PLC", status: "待确认", rule: "每颗螺钉强制采集" },
      { name: "锁付角度", value: "", lower: 165, target: 180, upper: 195, unit: "deg", source: "设备 PLC", status: "待确认", rule: "与扭矩曲线绑定" },
      { name: "锁付结果", value: "待回传", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "工位 HMI", status: "待确认", rule: "NG 禁止流转" },
      { name: "壳体目检", value: "待录入", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "人工录入", status: "待确认", rule: "首件与巡检引用" },
    ],
  },
  {
    id: "PR-002-DIP",
    dispatchNo: "D-002",
    orderId: "MO-202606-0001",
    serialNo: "LOT-TCU-DIP-20260620-001",
    product: "智能温控控制器 TCU-100",
    operation: "DIP 插件",
    line: "Line-A",
    station: "DIP-WS-01",
    equipment: "防错夹具 JIG-DIP-04",
    operator: "钱佳",
    employeeId: "E1011",
    parameter: "插件极性确认",
    source: "工位 HMI",
    value: "OK",
    unit: "OK/NG",
    lower: 0,
    target: 1,
    upper: 1,
    status: "正常",
    sampleTime: "08:32",
    processBatch: "LOT-TCU100-20260620-001",
    materialBatch: "CN1-L20260605",
    sopVersion: "SOP-TCU-DIP V2.8",
    spc: "无异常趋势",
    alarm: "",
    gates: { start: "通过", material: "通过", parameter: "通过", equipment: "通过", quality: "通过", trace: "通过" },
    parameters: [
      { name: "插件极性确认", value: "OK", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "工位 HMI", status: "通过", rule: "防错夹具联动" },
      { name: "焊前目检", value: "OK", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "人工录入", status: "通过", rule: "IPQC 抽检引用" },
      { name: "夹具到位信号", value: "1", lower: 1, target: 1, upper: 1, unit: "bit", source: "设备 PLC", status: "通过", rule: "未到位禁止提交" },
    ],
  },
  {
    id: "PR-005-TEST",
    dispatchNo: "D-005",
    orderId: "MO-202606-0001",
    serialNo: "SN-TCU100-000388",
    product: "智能温控控制器 TCU-100",
    operation: "功能测试",
    line: "Line-A",
    station: "TEST-WS-01",
    equipment: "测试台 TEST-A-01",
    operator: "孙磊",
    employeeId: "E1052",
    parameter: "RS485 响应时间",
    source: "测试台",
    value: "118",
    unit: "ms",
    lower: 0,
    target: 80,
    upper: 120,
    status: "预警",
    sampleTime: "09:18",
    processBatch: "LOT-TCU100-20260620-001",
    materialBatch: "PCB-L20260601",
    sopVersion: "SOP-TCU-TEST V3.5",
    spc: "连续 5 台接近上限",
    alarm: "测试响应时间趋势上升",
    gates: { start: "通过", material: "通过", parameter: "待确认", equipment: "通过", quality: "待确认", trace: "通过" },
    parameters: [
      { name: "RS485 响应时间", value: "118", lower: 0, target: 80, upper: 120, unit: "ms", source: "测试台", status: "待确认", rule: "连续接近上限触发 SPC 预警" },
      { name: "温控精度", value: "0.42", lower: 0, target: 0.3, upper: 0.5, unit: "degC", source: "测试台", status: "通过", rule: "首件与抽检引用" },
      { name: "通信稳定性", value: "OK", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "测试台", status: "通过", rule: "NG 禁止流转" },
    ],
  },
  {
    id: "PR-021-SMT",
    dispatchNo: "D-021",
    orderId: "MO-202606-0002",
    serialNo: "LOT-PMU200-20260620-002",
    product: "智能电源模块 PMU-200",
    operation: "SMT 贴片",
    line: "Line-B",
    station: "SMT-WS-02",
    equipment: "贴片机 SMT-02",
    operator: "李敏",
    employeeId: "E1017",
    parameter: "贴片偏移 X",
    source: "设备 PLC",
    value: "0.18",
    unit: "mm",
    lower: -0.12,
    target: 0,
    upper: 0.12,
    status: "已拦截",
    sampleTime: "09:27",
    processBatch: "LOT-PMU200-20260620-002",
    materialBatch: "RES10K-L20260604",
    sopVersion: "SOP-PMU-SMT V3.1",
    spc: "超出规格上限",
    alarm: "贴片机视觉偏移报警",
    gates: { start: "通过", material: "通过", parameter: "拦截", equipment: "拦截", quality: "待确认", trace: "通过" },
    parameters: [
      { name: "贴片偏移 X", value: "0.18", lower: -0.12, target: 0, upper: 0.12, unit: "mm", source: "设备 PLC", status: "拦截", rule: "超限自动拦截当前板" },
      { name: "贴片偏移 Y", value: "0.08", lower: -0.12, target: 0, upper: 0.12, unit: "mm", source: "设备 PLC", status: "通过", rule: "AOI 复判引用" },
      { name: "吸嘴真空", value: "72", lower: 70, target: 82, upper: 95, unit: "kPa", source: "设备 PLC", status: "待确认", rule: "低于下限触发设备点检" },
    ],
  },
  {
    id: "PR-111-PACK",
    dispatchNo: "D-111",
    orderId: "MO-202606-0011",
    serialNo: "SN-THS10-000091",
    product: "温湿度采集器 THS-10",
    operation: "包装入库",
    line: "Line-C",
    station: "PACK-WS-02",
    equipment: "Pack-C",
    operator: "陈洁",
    employeeId: "E1082",
    parameter: "箱码复核",
    source: "人工录入",
    value: "OK",
    unit: "OK/NG",
    lower: 0,
    target: 1,
    upper: 1,
    status: "正常",
    sampleTime: "10:02",
    processBatch: "LOT-THS10-20260621-001",
    materialBatch: "BOXJ-L20260614",
    sopVersion: "SOP-THS-PACK V1.6",
    spc: "箱码与 SN 集合一致",
    alarm: "",
    gates: { start: "通过", material: "通过", parameter: "通过", equipment: "通过", quality: "通过", trace: "通过" },
    parameters: [
      { name: "箱码复核", value: "OK", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "人工录入", status: "通过", rule: "箱码与 SN 集合一致" },
      { name: "标签清晰度", value: "OK", lower: 0, target: 1, upper: 1, unit: "OK/NG", source: "人工录入", status: "通过", rule: "客户标签复核" },
      { name: "装箱数量", value: "20", lower: 20, target: 20, upper: 20, unit: "PCS", source: "工位 HMI", status: "通过", rule: "固定箱规" },
    ],
  },
];

const initialHistory = [
  { id: "PH-001", recordId: "PR-002-DIP", time: "08:32", action: "过程回传", source: "工位 HMI", parameter: "插件极性确认", value: "OK", station: "DIP-WS-01", dispatchNo: "D-002", owner: "钱佳", result: "极性防错确认通过，过程履历已绑定" },
  { id: "PH-002", recordId: "PR-005-TEST", time: "09:18", action: "SPC 预警", source: "测试台", parameter: "RS485 响应时间", value: "118 ms", station: "TEST-WS-01", dispatchNo: "D-005", owner: "质量员", result: "连续 5 台接近上限，等待工艺确认" },
  { id: "PH-003", recordId: "PR-021-SMT", time: "09:27", action: "过程拦截", source: "设备 PLC", parameter: "贴片偏移 X", value: "0.18 mm", station: "SMT-WS-02", dispatchNo: "D-021", owner: "设备员", result: "超出规格上限，当前板禁止流转" },
  { id: "PH-004", recordId: "PR-004-TQ", time: "10:12", action: "待回传", source: "设备 PLC", parameter: "锁付扭矩", value: "待回传", station: "ASM-WS-03", dispatchNo: "D-004", owner: "赵杰", result: "等待电批控制器回传扭矩曲线" },
];

let records = structuredClone(initialRecords);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeRecordId: "PR-004-TQ",
  search: "",
  status: "all",
  line: "all",
  source: "all",
  detailOpen: true,
  taskDrawerOpen: true,
  processSource: "设备 PLC",
  reason: "参数超过规格上限",
  owner: "工艺员",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#processModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "过程记录" ? " class=\"is-active\"" : "";
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

  $("#processModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#processModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    records = saved.records || records;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.processState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ records, history, logs, processState: state }));
}

function getActiveRecord() {
  return records.find((item) => item.id === state.activeRecordId) || records[0];
}

function getVisibleRecords() {
  const keyword = state.search.trim().toLowerCase();
  return records.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.serialNo} ${item.product} ${item.operation} ${item.station} ${item.equipment} ${item.parameter} ${item.operator}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const sourceMatch = state.source === "all" || item.source === state.source;
    return keywordMatch && statusMatch && lineMatch && sourceMatch;
  });
}

function renderAll() {
  renderPanelState();
  renderMetrics();
  renderTaskList();
  renderTerminal();
  renderGateFlow();
  renderParameterCards();
  renderTraceCards();
  renderHistory();
  renderDetail();
  renderLogs();
}

function renderPanelState() {
  const detailOpen = state.detailOpen !== false;
  const taskDrawerOpen = state.taskDrawerOpen !== false;
  $(".process-layout").classList.toggle("is-detail-closed", !detailOpen);
  $(".process-layout").classList.toggle("is-task-drawer-closed", !taskDrawerOpen);
  $("#processSideRail").hidden = !taskDrawerOpen;
  $("#processDetailPanel").hidden = !detailOpen || !taskDrawerOpen;
  $("#showProcessDetailBtn").hidden = detailOpen || !taskDrawerOpen;
  $("#showProcessTaskDrawerBtn").hidden = taskDrawerOpen;
}

function renderMetrics() {
  const visible = getVisibleRecords();
  $("#metricNormal").textContent = visible.filter((item) => item.status === "正常").length;
  $("#metricWaiting").textContent = visible.filter((item) => item.status === "待回传").length;
  $("#metricWarning").textContent = visible.filter((item) => item.status === "预警").length;
  $("#metricBlocked").textContent = visible.filter((item) => item.status === "已拦截").length;
}

function renderTaskList() {
  const visible = getVisibleRecords();
  $("#processTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="process-task-card${item.id === state.activeRecordId ? " is-active" : ""}${item.status === "正常" ? " is-normal" : ""}${item.status === "预警" ? " is-warning" : ""}${item.status === "已拦截" ? " is-blocked" : ""}" type="button" data-id="${item.id}">
      <div class="process-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="process-task-card__role">${item.parameter} · ${item.equipment}</span>
      <div class="process-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.source}</span>
      </div>
      <div class="process-task-card__foot">
        <span>值 ${formatValue(item)} / 目标 ${item.target} ${item.unit}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有过程采集任务</strong><em>请调整筛选条件</em></div>`;

  $("#processTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectRecord(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveRecord();
  $("#terminalTitle").textContent = active.station;
  $("#terminalStation").textContent = active.station;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalParameter").textContent = active.parameter;
  $("#terminalSpec").textContent = `${active.lower}-${active.upper} ${active.unit} · ${active.source}`;
  document.querySelectorAll("[data-process-source]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.processSource === state.processSource);
  });
}

function renderGateFlow() {
  const active = getActiveRecord();
  const gates = [
    ["start", "开工履历", `${active.dispatchNo} / ${active.operator}`],
    ["material", "投料批次", active.materialBatch],
    ["parameter", "参数规格", `${active.lower}-${active.upper} ${active.unit}`],
    ["equipment", "设备状态", active.equipment],
    ["quality", "质量联动", active.spc],
    ["trace", "追溯绑定", active.serialNo],
  ];
  $("#processGateFlow").innerHTML = gates.map(([key, label, desc]) => {
    const status = active.gates[key];
    return `
      <article class="process-gate-item ${getGateClass(status)}">
        <span>${label}</span>
        <strong>${desc}</strong>
        <em>${status}</em>
      </article>
    `;
  }).join("");
}

function renderParameterCards() {
  const active = getActiveRecord();
  $("#parameterCards").innerHTML = active.parameters.map((parameter) => `
    <article class="parameter-card ${getParameterClass(parameter.status)}">
      <span>${parameter.source}</span>
      <strong>${parameter.name}</strong>
      <b>${parameter.value || "待回传"} ${parameter.unit}</b>
      <p>规格 ${parameter.lower}-${parameter.upper}，目标 ${parameter.target} ${parameter.unit}</p>
      <p>${parameter.rule}</p>
      <em>${parameter.status}</em>
    </article>
  `).join("");
}

function renderTraceCards() {
  const active = getActiveRecord();
  const cards = [
    ["SN / 批次", active.serialNo, `生产批次 ${active.processBatch}`],
    ["物料批次", active.materialBatch, "过程参数与投料批次强绑定"],
    ["SPC 状态", active.spc, active.status === "预警" ? "需工艺或质量复核" : "用于过程稳定性判断"],
    ["后续报工", active.status === "已拦截" ? "禁止流转待处置" : "可作为报工校验依据", "完工数量、不良原因和质量放行引用"],
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
  const visibleIds = new Set(getVisibleRecords().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.recordId)).slice(0, 30);
  $("#processHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.recordId === state.activeRecordId ? "is-active" : ""}" data-id="${item.recordId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.source}</td>
      <td>${item.parameter} / ${item.value}</td>
      <td>${item.station} / ${item.dispatchNo}</td>
      <td>${item.owner}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有过程记录履历</td></tr>`;

  $("#processHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectRecord(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveRecord();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["SN / 批次", item.serialNo],
    ["产品", item.product],
    ["工序", item.operation],
    ["工位", item.station],
    ["设备", item.equipment],
    ["参数", item.parameter],
    ["来源", item.source],
    ["规格", `${item.lower}-${item.upper} ${item.unit}`],
    ["当前值", formatValue(item)],
    ["采样时间", item.sampleTime || "未回传"],
    ["SOP 版本", item.sopVersion],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["开工履历", item.gates.start, `${item.dispatchNo} 已建立开工记录`],
    ["投料批次", item.gates.material, item.materialBatch],
    ["参数规格", item.gates.parameter, `${item.parameter} ${item.lower}-${item.upper} ${item.unit}`],
    ["设备状态", item.gates.equipment, item.alarm || item.equipment],
    ["质量联动", item.gates.quality, item.spc],
    ["追溯绑定", item.gates.trace, item.serialNo],
  ];
  $("#gateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#processReasonSelect").value = state.reason;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveRecord();
  const scoped = logs.filter((log) => log.recordId === active.id).slice(0, 5);
  $("#processLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.alarm || "等待现场设备、HMI 或人工记录回传"}</strong><em>后台记录采集、预警、拦截和放行结果</em></div>`;
}

function formatValue(item) {
  return item.value === "" ? "待回传" : `${item.value} ${item.unit}`;
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

function getParameterClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "正常") return "green";
  if (status === "已拦截") return "red";
  if (status === "预警") return "orange";
  return "blue";
}

function selectRecord(id) {
  state.activeRecordId = id;
  state.detailOpen = true;
  state.taskDrawerOpen = true;
  recordLog(id, "已打开过程记录详情", "后台切换到当前工位采集任务");
  saveState();
  renderAll();
}

function updateRecord(id, patch, message) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) return;
  records[index] = { ...records[index], ...patch };
  const next = records[index];
  window.MES_BUSINESS_FLOW?.applyProcessAction?.(next.orderId, patch.status === "已拦截" ? "processBlock" : "processCollect", {
    dispatchId: next.dispatchNo,
    source: next.source,
    equipment: next.equipment,
    parameter: next.parameter,
    value: formatValue(next),
    status: next.status,
    owner: state.owner || next.operator,
    result: next.alarm || next.spc || message,
  });
  state.activeRecordId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function syncProcessRecord(item, message) {
  const raw = $("#processValueInput").value.trim();
  const value = raw || String(item.target);
  const numeric = Number(value);
  const isNumeric = !Number.isNaN(numeric) && item.unit !== "OK/NG";
  const outOfSpec = isNumeric && (numeric < item.lower || numeric > item.upper);
  const nearLimit = isNumeric && !outOfSpec && (numeric > item.upper - (item.upper - item.lower) * 0.18 || numeric < item.lower + (item.upper - item.lower) * 0.18);
  const status = outOfSpec ? "已拦截" : nearLimit ? "预警" : "正常";
  const gates = {
    ...item.gates,
    parameter: outOfSpec ? "拦截" : nearLimit ? "待确认" : "通过",
    equipment: outOfSpec ? "拦截" : item.gates.equipment === "拦截" ? "待确认" : "通过",
    quality: nearLimit || outOfSpec ? "待确认" : "通过",
    trace: "通过",
  };
  const result = outOfSpec ? "采集值超出规格，当前工序已拦截" : nearLimit ? "采集值接近规格边界，已触发 SPC 预警" : "采集值在规格窗口内，过程履历已绑定";
  appendHistory(item, {
    action: outOfSpec ? "过程拦截" : nearLimit ? "SPC 预警" : "过程回传",
    source: state.processSource,
    value: `${value} ${item.unit}`,
    owner: item.operator,
    result,
  });
  updateRecord(item.id, {
    value,
    source: state.processSource,
    status,
    sampleTime: nowTime(),
    spc: nearLimit ? "接近规格边界，等待复核" : outOfSpec ? "超出规格窗口" : "无异常趋势",
    alarm: outOfSpec ? state.reason : "",
    gates,
    parameters: item.parameters.map((parameter) => parameter.name === item.parameter ? { ...parameter, value, source: state.processSource, status: outOfSpec ? "拦截" : nearLimit ? "待确认" : "通过" } : parameter),
  }, message);
  $("#processValueInput").value = "";
}

function markWarning(item) {
  appendHistory(item, {
    action: "SPC 预警",
    source: state.processSource,
    value: formatValue(item),
    owner: state.owner,
    result: `${state.reason}，等待工艺或质量复核`,
  });
  updateRecord(item.id, {
    status: "预警",
    spc: state.reason,
    alarm: state.reason,
    gates: { ...item.gates, parameter: "待确认", quality: "待确认" },
    parameters: item.parameters.map((parameter) => parameter.name === item.parameter ? { ...parameter, status: "待确认" } : parameter),
  }, "已登记 SPC 预警");
}

function blockRecord(item, reason, owner) {
  const gates = { ...item.gates, parameter: "拦截", quality: "待确认" };
  if (reason.includes("设备")) gates.equipment = "拦截";
  appendHistory(item, {
    action: "过程拦截",
    source: state.processSource,
    value: $("#processValueInput").value.trim() || formatValue(item),
    owner,
    result: `${reason}，当前工序禁止流转`,
  });
  updateRecord(item.id, {
    status: "已拦截",
    alarm: reason,
    spc: reason,
    gates,
    parameters: item.parameters.map((parameter) => parameter.name === item.parameter ? { ...parameter, status: "拦截" } : parameter),
  }, "已拦截当前过程记录");
}

function releaseRecord(item) {
  appendHistory(item, {
    action: "处置放行",
    source: "后台处置",
    value: formatValue(item),
    owner: state.owner,
    result: "异常已处置，允许现场重新采集或继续流转",
  });
  updateRecord(item.id, {
    status: "正常",
    alarm: "",
    spc: "异常已处置，等待后续 SPC 监控",
    gates: Object.fromEntries(Object.keys(item.gates).map((key) => [key, "通过"])),
    parameters: item.parameters.map((parameter) => parameter.status === "拦截" || parameter.status === "待确认" ? { ...parameter, status: "通过" } : parameter),
  }, "过程异常已处置放行");
}

function appendHistory(item, patch) {
  history = [
    {
      id: `PH-${Date.now()}`,
      recordId: item.id,
      time: patch.time || nowTime(),
      action: patch.action,
      source: patch.source || state.processSource,
      parameter: item.parameter,
      value: patch.value || formatValue(item),
      station: item.station,
      dispatchNo: item.dispatchNo,
      owner: patch.owner || item.operator,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(recordId, action, result) {
  logs = [
    { recordId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
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
  $("#processSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#processStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#processLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#processSourceFilter").addEventListener("change", (event) => {
    state.source = event.target.value;
    saveState();
    renderAll();
  });
  $("#processReasonSelect").addEventListener("change", (event) => {
    state.reason = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  document.querySelectorAll("[data-process-source]").forEach((button) => {
    button.addEventListener("click", () => {
      state.processSource = button.dataset.processSource;
      saveState();
      renderAll();
      showToast(`已切换为模拟${state.processSource}回传`);
    });
  });
  $("#syncProcessBtn").addEventListener("click", () => syncProcessRecord(getActiveRecord(), "已同步现场过程采集回执"));
  $("#simulateAlarmBtn").addEventListener("click", () => blockRecord(getActiveRecord(), "设备报警未复位", "设备员"));
  $("#manualJudgeBtn").addEventListener("click", () => {
    const item = getActiveRecord();
    appendHistory(item, { action: "人工判定", source: "人工录入", value: $("#processValueInput").value.trim() || "OK", owner: state.owner, result: "人工判定已进入过程履历，等待质量复核引用" });
    recordLog(item.id, "已登记人工判定", "人工记录已绑定当前派工单和 SN/批次");
    saveState();
    renderAll();
    showToast("人工判定已登记");
  });
  $("#nextProcessBtn").addEventListener("click", () => {
    const index = records.findIndex((item) => item.id === state.activeRecordId);
    state.activeRecordId = records[(index + 1) % records.length].id;
    saveState();
    renderAll();
    showToast(`已切换到 ${getActiveRecord().parameter}`);
  });
  $("#refreshProcessBtn").addEventListener("click", () => {
    recordLog(getActiveRecord().id, "已刷新过程采集监控", "已重新读取设备、HMI、质量和追溯状态");
    saveState();
    renderLogs();
    showToast("过程采集监控已刷新");
  });
  $("#closeProcessDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderPanelState();
    showToast("详情面板已关闭");
  });
  $("#showProcessDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderPanelState();
    showToast("详情面板已打开");
  });
  $("#closeProcessTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = false;
    saveState();
    renderPanelState();
    showToast("过程采集任务抽屉已隐藏");
  });
  $("#showProcessTaskDrawerBtn").addEventListener("click", () => {
    state.taskDrawerOpen = true;
    saveState();
    renderPanelState();
    showToast("过程采集任务抽屉已打开");
  });
  $("#recheckProcessBtn").addEventListener("click", () => {
    recordLog(getActiveRecord().id, "已重新执行过程采集校验", getGateText(getActiveRecord()));
    saveState();
    renderLogs();
    showToast("过程采集校验已重新执行");
  });
  $("#detailSyncBtn").addEventListener("click", () => syncProcessRecord(getActiveRecord(), "已从详情同步过程采集回执"));
  $("#warningBtn").addEventListener("click", () => markWarning(getActiveRecord()));
  $("#blockProcessBtn").addEventListener("click", () => blockRecord(getActiveRecord(), state.reason, state.owner));
  $("#releaseProcessBtn").addEventListener("click", () => releaseRecord(getActiveRecord()));
  $("#batchAcknowledgeBtn").addEventListener("click", () => {
    records = records.map((item) => {
      if (item.status !== "预警" && item.status !== "已拦截") return item;
      return {
        ...item,
        status: "正常",
        alarm: "",
        spc: "批量确认完成，后续继续 SPC 监控",
        gates: Object.fromEntries(Object.keys(item.gates).map((key) => [key, "通过"])),
        parameters: item.parameters.map((parameter) => parameter.status === "拦截" || parameter.status === "待确认" ? { ...parameter, status: "通过" } : parameter),
      };
    });
    recordLog(state.activeRecordId, "已批量确认采集异常", "预警和拦截项已确认，后续继续监控");
    saveState();
    renderAll();
    showToast("已批量确认采集异常");
  });
  $("#resetProcessBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    records = structuredClone(initialRecords);
    history = structuredClone(initialHistory);
    logs = [];
    state = { activeRecordId: "PR-004-TQ", search: "", status: "all", line: "all", source: "all", detailOpen: true, taskDrawerOpen: true, processSource: "设备 PLC", reason: "参数超过规格上限", owner: "工艺员" };
    $("#processSearch").value = "";
    $("#processStatusFilter").value = "all";
    $("#processLineFilter").value = "all";
    $("#processSourceFilter").value = "all";
    $("#processValueInput").value = "";
    renderAll();
    showToast("过程记录演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#processSearch").value = state.search;
$("#processStatusFilter").value = state.status;
$("#processLineFilter").value = state.line;
$("#processSourceFilter").value = state.source;
bindEvents();
renderAll();
