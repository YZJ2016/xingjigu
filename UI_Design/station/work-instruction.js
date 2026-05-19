const STORAGE_KEY = "xingjigu_mes_work_instruction_v1";

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

const initialInstructions = [
  {
    id: "WI-004",
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
    sopNo: "SOP-TCU-ASM",
    version: "V4.0",
    effectiveAt: "2026-06-20 08:00",
    status: "待下发",
    currentStep: 0,
    deliveredAt: "",
    signedAt: "",
    deviation: "",
    gates: { sop: "通过", drawing: "通过", parameter: "待确认", quality: "通过" },
    assets: [
      { type: "SOP", name: "SOP-TCU-ASM V4.0", status: "通过", desc: "整机装配指导已发布到 ASM-WS-03", source: "PLM", owner: "工艺工程师 陈工", approveStatus: "已审批", publishedAt: "2026-06-20 08:00", effectiveRange: "TCU-100 / 整机装配 / ASM-WS-03", syncStatus: "待终端签收", changeReason: "新增外壳定位防错点" },
      { type: "图纸", name: "DWG-TCU-CASE R6", status: "通过", desc: "外壳与端子朝向图已锁定", source: "PLM 图纸库", owner: "结构工程师 刘工", approveStatus: "已审批", publishedAt: "2026-06-19 17:40", effectiveRange: "TCU-100 外壳组件 / 装配段", syncStatus: "已同步", changeReason: "端子方向标注更新" },
      { type: "参数", name: "电批程序 P-ASM-16", status: "待确认", desc: "扭矩 0.42 N·m，需终端复核", source: "设备参数库", owner: "工艺工程师 陈工", approveStatus: "已审批", publishedAt: "2026-06-20 08:05", effectiveRange: "ASM-WS-03 / 电批 EC-ASM-03", syncStatus: "终端待复核", changeReason: "螺钉批次切换后扭矩窗口调整", parameters: [
        { name: "锁付扭矩", target: "0.42", lower: "0.39", upper: "0.45", unit: "N·m", source: "电批控制器", required: "强制" },
        { name: "锁付角度", target: "180", lower: "165", upper: "195", unit: "deg", source: "电批控制器", required: "强制" },
        { name: "复判次数", target: "1", lower: "0", upper: "1", unit: "次", source: "MES 规则", required: "提示" },
      ] },
      { type: "质量", name: "扭矩抽检 QP-ASM-04", status: "通过", desc: "首件后每 50 台抽检 1 台", source: "QMS 检验规范", owner: "质量工程师 何工", approveStatus: "已审批", publishedAt: "2026-06-20 08:00", effectiveRange: "整机装配 / 首件与 IPQC", syncStatus: "已同步", changeReason: "客户审计要求增加扭矩抽检频次" },
    ],
    steps: [
      { title: "核对外壳批次与工单", desc: "确认外壳上盖、底壳和铭牌批次与 D-004 派工单一致。", tool: "扫码枪采集项", check: "物料批次匹配", status: "当前" },
      { title: "装入主控板并定位", desc: "主控板沿定位柱放入底壳，端子方向朝向操作员左侧。", tool: "定位治具 JIG-ASM-02", check: "方向防错", status: "待执行" },
      { title: "锁付四角螺钉", desc: "使用电批程序 P-ASM-16，按对角顺序锁付四颗 M2.5 螺钉。", tool: "电批 EC-ASM-03", check: "扭矩曲线采集", status: "待执行" },
      { title: "贴附铭牌并目检", desc: "铭牌贴附后检查条码清晰度、方向和壳体划伤。", tool: "目检记录项", check: "外观首件项", status: "待执行" },
    ],
  },
  {
    id: "WI-002",
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
    sopNo: "SOP-TCU-DIP",
    version: "V2.8",
    effectiveAt: "2026-06-18 14:00",
    status: "签收完成",
    currentStep: 2,
    deliveredAt: "08:05",
    signedAt: "08:10",
    deviation: "",
    gates: { sop: "通过", drawing: "通过", parameter: "通过", quality: "通过" },
    assets: [
      { type: "SOP", name: "SOP-TCU-DIP V2.8", status: "通过", desc: "插件顺序与极性防错已同步", source: "PLM", owner: "工艺工程师 陈工", approveStatus: "已审批", publishedAt: "2026-06-18 14:00", effectiveRange: "TCU-100 / DIP 插件 / DIP-WS-01", syncStatus: "已签收", changeReason: "新增 CN2 极性图片" },
      { type: "图纸", name: "DWG-TCU-DIP R3", status: "通过", desc: "器件方向图可用", source: "PLM 图纸库", owner: "电子工程师 王工", approveStatus: "已审批", publishedAt: "2026-06-18 13:30", effectiveRange: "TCU-100 PCB 插件段", syncStatus: "已同步", changeReason: "端子方向图补充" },
      { type: "工装", name: "JIG-DIP-04 点检", status: "通过", desc: "夹具点检已通过", source: "工装台账", owner: "设备员 田工", approveStatus: "已点检", publishedAt: "2026-06-18 07:50", effectiveRange: "DIP-WS-01 / JIG-DIP-04", syncStatus: "已同步", changeReason: "班前点检合格" },
      { type: "质量", name: "焊前目检记录", status: "通过", desc: "IPQC 巡检已配置", source: "QMS 检验规范", owner: "质量员 QC-002", approveStatus: "已审批", publishedAt: "2026-06-18 14:00", effectiveRange: "DIP 插件 / 焊前目检", syncStatus: "已同步", changeReason: "巡检表单字段调整" },
    ],
    steps: [
      { title: "确认 PCB 批次", desc: "核对 PCB 标签与上道 SMT 转入批次一致。", tool: "批次扫码项", check: "批次一致", status: "完成" },
      { title: "按顺序插入端子", desc: "先插 CN1，再插 CN2，极性缺口朝右。", tool: "DIP 防错夹具", check: "极性防错", status: "完成" },
      { title: "焊前目检", desc: "确认无浮高、漏插和方向反。", tool: "目检记录项", check: "IPQC 巡检", status: "当前" },
    ],
  },
  {
    id: "WI-005",
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
    sopNo: "SOP-TCU-TEST",
    version: "V3.5",
    effectiveAt: "2026-06-19 10:30",
    status: "版本拦截",
    currentStep: 0,
    deliveredAt: "",
    signedAt: "",
    deviation: "测试治具参数版本未匹配",
    gates: { sop: "通过", drawing: "通过", parameter: "拦截", quality: "待确认" },
    assets: [
      { type: "SOP", name: "SOP-TCU-TEST V3.5", status: "通过", desc: "测试流程已发布", source: "PLM", owner: "测试工程师 孙工", approveStatus: "已审批", publishedAt: "2026-06-19 10:30", effectiveRange: "TCU-100 / 功能测试 / TEST-WS-01", syncStatus: "已同步", changeReason: "新增通信稳定性测试" },
      { type: "参数", name: "TEST-PARA-202606", status: "拦截", desc: "终端仍加载 V3.4 参数", source: "测试参数库", owner: "测试工程师 孙工", approveStatus: "已审批", publishedAt: "2026-06-19 10:30", effectiveRange: "TEST-A-01 / D-005", syncStatus: "终端版本不一致", changeReason: "客户 B 通信阈值更新", parameters: [
        { name: "RS485 响应时间", target: "80", lower: "0", upper: "120", unit: "ms", source: "测试台 TEST-A-01", required: "强制" },
        { name: "温控精度", target: "0.3", lower: "0", upper: "0.5", unit: "degC", source: "测试台 TEST-A-01", required: "强制" },
        { name: "老化前复测", target: "1", lower: "1", upper: "1", unit: "次", source: "MES 规则", required: "强制" },
      ] },
      { type: "固件", name: "TCU-20260620", status: "通过", desc: "烧录版本已锁定", source: "固件发布库", owner: "软件工程师 周工", approveStatus: "已审批", publishedAt: "2026-06-20 08:00", effectiveRange: "TCU-100 全批次", syncStatus: "已同步", changeReason: "修复通信重连逻辑" },
      { type: "质量", name: "首件测试项目", status: "待确认", desc: "需质量员确认测试样本", source: "QMS 检验规范", owner: "质量工程师 何工", approveStatus: "待确认", publishedAt: "2026-06-19 10:35", effectiveRange: "功能测试首件", syncStatus: "等待质量确认", changeReason: "测试参数变化触发首件复核" },
    ],
    steps: [
      { title: "读取产品序列号", desc: "测试台读取 SN 并绑定当前 D-005 派工单。", tool: "测试台扫码项", check: "SN 归属", status: "当前" },
      { title: "执行通信测试", desc: "加载 TEST-PARA-202606 后执行 RS485 通信测试。", tool: "测试台 TEST-A-01", check: "参数版本", status: "拦截" },
      { title: "上传测试曲线", desc: "测试结果与曲线绑定序列号进入过程履历。", tool: "设备回传项", check: "曲线完整", status: "待执行" },
    ],
  },
  {
    id: "WI-111",
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
    sopNo: "SOP-THS-PACK",
    version: "V1.6",
    effectiveAt: "2026-06-16 09:00",
    status: "偏离待处理",
    currentStep: 1,
    deliveredAt: "09:15",
    signedAt: "09:18",
    deviation: "客户标签模板临时切换待确认",
    gates: { sop: "通过", drawing: "待确认", parameter: "通过", quality: "通过" },
    assets: [
      { type: "SOP", name: "SOP-THS-PACK V1.6", status: "通过", desc: "包装流程已下发", source: "PLM", owner: "工艺工程师 林工", approveStatus: "已审批", publishedAt: "2026-06-16 09:00", effectiveRange: "THS-10 / 包装入库 / PACK-WS-02", syncStatus: "已签收", changeReason: "新增客户 J 包装要求" },
      { type: "标签", name: "LBL-THS-CUST-J", status: "待确认", desc: "客户标签模板待工艺员确认", source: "标签模板库", owner: "工艺工程师 林工", approveStatus: "待确认", publishedAt: "2026-06-21 09:05", effectiveRange: "客户 J / THS-10 / 包装", syncStatus: "待重新下发", changeReason: "客户临时切换标签模板" },
      { type: "箱码", name: "BOX-RULE-THS", status: "通过", desc: "箱码规则可用", source: "条码规则中心", owner: "物流工程师 邓工", approveStatus: "已审批", publishedAt: "2026-06-16 09:00", effectiveRange: "每箱 20 台 / PACK-WS-02", syncStatus: "已同步", changeReason: "按客户装箱数配置" },
      { type: "质量", name: "箱码复核记录", status: "通过", desc: "扫码复核已配置", source: "QMS 检验规范", owner: "质量员 QC-006", approveStatus: "已审批", publishedAt: "2026-06-16 09:00", effectiveRange: "包装箱码复核", syncStatus: "已同步", changeReason: "增加箱码与 SN 集合校验" },
    ],
    steps: [
      { title: "核对成品批次", desc: "确认 FQC 放行批次与包装任务一致。", tool: "成品扫码项", check: "FQC 放行", status: "完成" },
      { title: "打印并贴附客户标签", desc: "按客户 J 标签模板贴附，位置距边 8 mm。", tool: "标签打印项", check: "标签模板", status: "当前" },
      { title: "箱码复核", desc: "每箱 20 台，箱码与序列号集合绑定。", tool: "箱码扫描项", check: "箱码规则", status: "待执行" },
    ],
  },
];

const initialHistory = [
  { id: "IH-001", instructionId: "WI-002", time: "08:10", action: "签收回执", dispatchNo: "D-002", operation: "DIP 插件", station: "DIP-WS-01", equipment: "防错夹具 JIG-DIP-04", owner: "钱佳", version: "SOP-TCU-DIP V2.8", result: "已确认插件顺序、极性防错和焊前目检要求" },
  { id: "IH-002", instructionId: "WI-005", time: "08:42", action: "版本拦截", dispatchNo: "D-005", operation: "功能测试", station: "TEST-WS-01", equipment: "测试台 TEST-A-01", owner: "设备员", version: "SOP-TCU-TEST V3.5", result: "测试参数仍为 V3.4，禁止继续测试" },
  { id: "IH-003", instructionId: "WI-111", time: "09:24", action: "偏离呼叫", dispatchNo: "D-111", operation: "包装入库", station: "PACK-WS-02", equipment: "Pack-C", owner: "陈洁", version: "SOP-THS-PACK V1.6", result: "客户标签模板切换，等待工艺员确认" },
  { id: "IH-004", instructionId: "WI-004", time: "09:35", action: "终端加载", dispatchNo: "D-004", operation: "整机装配", station: "ASM-WS-03", equipment: "电批 EC-ASM-03", owner: "赵杰", version: "SOP-TCU-ASM V4.0", result: "后台已下发装配指导，等待现场签收回执" },
];

let instructions = structuredClone(initialInstructions);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeInstructionId: "WI-004",
  search: "",
  status: "all",
  line: "all",
  operation: "all",
  detailOpen: true,
  activeAssetType: "SOP",
  deviationReason: "物料外观与指导图不一致",
  owner: "工艺员",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#instructionModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "工艺指导" ? " class=\"is-active\"" : "";
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

  $("#instructionModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#instructionModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    instructions = saved.instructions || instructions;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.instructionState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ instructions, history, logs, instructionState: state }));
}

function getActiveInstruction() {
  return instructions.find((item) => item.id === state.activeInstructionId) || instructions[0];
}

function getVisibleInstructions() {
  const keyword = state.search.trim().toLowerCase();
  return instructions.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.operator} ${item.sopNo} ${item.version}`.toLowerCase();
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
  renderSteps();
  renderAssets();
  renderAssetDetail();
  renderTraceCards();
  renderHistory();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".instruction-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#instructionDetailPanel").hidden = !isOpen;
  $("#showInstructionDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const visible = getVisibleInstructions();
  $("#metricSigned").textContent = visible.filter((item) => item.status === "签收完成").length;
  $("#metricPending").textContent = visible.filter((item) => item.status === "待下发" || item.status === "已下发").length;
  $("#metricDeviation").textContent = visible.filter((item) => item.status === "偏离待处理").length;
  $("#metricBlocked").textContent = visible.filter((item) => item.status === "版本拦截").length;
}

function renderTaskList() {
  const visible = getVisibleInstructions();
  $("#instructionTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="instruction-task-card${item.id === state.activeInstructionId ? " is-active" : ""}${item.status === "签收完成" ? " is-signed" : ""}${item.status === "偏离待处理" ? " is-risk" : ""}${item.status === "版本拦截" ? " is-blocked" : ""}" type="button" data-id="${item.id}">
      <div class="instruction-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="instruction-task-card__role">${item.product}</span>
      <div class="instruction-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.operator} · ${item.employeeId}</span>
      </div>
      <div class="instruction-task-card__foot">
        <span>${item.sopNo} ${item.version}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有工艺指导任务</strong><em>请调整筛选条件</em></div>`;

  $("#instructionTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectInstruction(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveInstruction();
  $("#terminalTitle").textContent = active.station;
  $("#terminalDispatch").textContent = active.dispatchNo;
  $("#terminalTask").textContent = `${active.operation} · ${active.station}`;
  $("#terminalOperator").textContent = `${active.operator} · ${active.employeeId}`;
  $("#terminalShift").textContent = `${active.team} · ${active.shift}`;
  $("#terminalStep").textContent = active.status;
  $("#terminalStepHint").textContent = getTerminalHint(active);
}

function renderSteps() {
  const active = getActiveInstruction();
  $("#stepList").innerHTML = active.steps.map((step, index) => {
    const status = index < active.currentStep ? "完成" : index === active.currentStep ? step.status : step.status;
    const classes = [
      index === active.currentStep ? "is-current" : "",
      status === "完成" ? "is-done" : "",
      status === "拦截" ? "is-blocked" : "",
    ].filter(Boolean).join(" ");
    return `
      <article class="step-item ${classes}">
        <div class="step-item__head">
          <span>步骤 ${String(index + 1).padStart(2, "0")}</span>
          <strong>${step.title}</strong>
          <span class="pill pill--${getStepStyle(status)}">${status}</span>
        </div>
        <p>${step.desc}</p>
        <div class="step-item__tags">
          <span>${step.tool}</span>
          <span>${step.check}</span>
        </div>
      </article>
    `;
  }).join("");
}

function renderAssets() {
  const active = getActiveInstruction();
  $("#assetCards").innerHTML = active.assets.map((asset) => `
    <button class="asset-card ${getGateClass(asset.status)}${asset.type === getActiveAsset(active).type ? " is-active" : ""}" type="button" data-asset-type="${asset.type}">
      <span>${asset.type}</span>
      <strong>${asset.name}</strong>
      <em>${asset.desc}</em>
      <em>${asset.status}</em>
    </button>
  `).join("");

  $("#assetCards").querySelectorAll("[data-asset-type]").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeAssetType = card.dataset.assetType;
      state.detailOpen = true;
      recordLog(active.id, "已查看工艺资料详情", `${card.dataset.assetType} 明细已展开`);
      saveState();
      renderAll();
    });
  });
}

function renderAssetDetail() {
  const active = getActiveInstruction();
  const asset = getActiveAsset(active);
  $("#assetDetailTitle").textContent = `${asset.type} 详情`;
  $("#assetDetailMeta").textContent = `${asset.name} · ${asset.status}`;
  $("#assetDetailGrid").innerHTML = [
    ["资料名称", asset.name],
    ["资料类型", asset.type],
    ["来源系统", asset.source || "MES"],
    ["资料责任人", asset.owner || "未指定"],
    ["审批状态", asset.approveStatus || asset.status],
    ["发布时间", asset.publishedAt || active.effectiveAt],
    ["适用范围", asset.effectiveRange || `${active.product} / ${active.operation} / ${active.station}`],
    ["终端同步", asset.syncStatus || asset.status],
    ["变更原因", asset.changeReason || "无"],
    ["当前说明", asset.desc],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const parameters = asset.parameters || [];
  $("#parameterTableWrap").hidden = parameters.length === 0;
  $("#parameterTableBody").innerHTML = parameters.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.target}</td>
      <td>${item.lower}</td>
      <td>${item.upper}</td>
      <td>${item.unit}</td>
      <td>${item.source}</td>
      <td>${item.required}</td>
    </tr>
  `).join("");
}

function renderTraceCards() {
  const active = getActiveInstruction();
  const cards = [
    ["首件确认", active.gates.quality === "通过" ? "检验规则已绑定" : "等待质量确认", "首件结果决定批量生产放行"],
    ["过程参数", active.gates.parameter === "通过" ? "采集项已锁定" : active.gates.parameter, "扭矩、测试值和设备信号进入履历"],
    ["投料确认", active.status === "签收完成" ? "可继续投料防错" : "先完成签收回执", "物料批次与当前工步关联"],
    ["工序报工", active.currentStep >= active.steps.length - 1 ? "可进入完工报工" : "等待执行进度回传", "产出、不良和工时回传派工单"],
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
  const visibleIds = new Set(getVisibleInstructions().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.instructionId)).slice(0, 30);
  $("#instructionHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.instructionId === state.activeInstructionId ? "is-active" : ""}" data-id="${item.instructionId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.dispatchNo} / ${item.operation}</td>
      <td>${item.station} / ${item.equipment}</td>
      <td>${item.owner}</td>
      <td>${item.version}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有工艺指导履历</td></tr>`;

  $("#instructionHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectInstruction(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveInstruction();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["工序", item.operation],
    ["产线", item.line],
    ["工位", item.station],
    ["设备", item.equipment],
    ["操作员", `${item.operator} · ${item.employeeId}`],
    ["班组", `${item.team} · ${item.shift}`],
    ["SOP", `${item.sopNo} ${item.version}`],
    ["生效时间", item.effectiveAt],
    ["下发时间", item.deliveredAt || "未下发"],
    ["签收时间", item.signedAt || "未签收"],
    ["偏离记录", item.deviation || "无"],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["SOP 版本", item.gates.sop, `${item.sopNo} ${item.version}`],
    ["图纸版本", item.gates.drawing, getAssetText(item, "图纸") || getAssetText(item, "标签")],
    ["参数程序", item.gates.parameter, getAssetText(item, "参数") || getAssetText(item, "工装")],
    ["质量要求", item.gates.quality, getAssetText(item, "质量")],
  ];
  $("#versionGateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#deviationReasonSelect").value = state.deviationReason;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveInstruction();
  const scoped = logs.filter((log) => log.instructionId === active.id).slice(0, 5);
  $("#instructionLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.deviation || "工艺指导已下发"}</strong><em>等待终端签收回执或偏离处理</em></div>`;
}

function getAssetText(item, type) {
  const asset = item.assets.find((entry) => entry.type === type);
  return asset ? `${asset.name} · ${asset.desc}` : "未配置";
}

function getActiveAsset(item) {
  return item.assets.find((asset) => asset.type === state.activeAssetType) || item.assets[0];
}

function getTerminalHint(item) {
  if (item.status === "待下发") return "后台尚未下发到现场终端";
  if (item.status === "已下发") return `已下发 ${item.deliveredAt || ""}，等待现场签收回执`;
  if (item.status === "签收完成") return `签收 ${item.signedAt || ""}，执行进度 ${item.currentStep + 1}/${item.steps.length}`;
  if (item.status === "偏离待处理") return item.deviation || "现场偏离待工艺员处理";
  return getGateText(item);
}

function getGateText(item) {
  const blocked = Object.values(item.gates).filter((value) => value === "拦截").length;
  const pending = Object.values(item.gates).filter((value) => value === "待确认").length;
  if (blocked) return `拦截 ${blocked} 项`;
  if (pending) return `待确认 ${pending} 项`;
  return "版本通过";
}

function getGateClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "签收完成") return "green";
  if (status === "版本拦截") return "red";
  if (status === "偏离待处理") return "orange";
  return "blue";
}

function getStepStyle(status) {
  if (status === "完成") return "green";
  if (status === "拦截") return "red";
  if (status === "当前") return "blue";
  return "orange";
}

function selectInstruction(id) {
  state.activeInstructionId = id;
  const item = instructions.find((entry) => entry.id === id);
  if (item && !item.assets.some((asset) => asset.type === state.activeAssetType)) {
    state.activeAssetType = item.assets[0]?.type || "SOP";
  }
  state.detailOpen = true;
  recordLog(id, "已打开工艺指导详情", "后台切换到当前派工单");
  saveState();
  renderAll();
}

function updateInstruction(id, patch, message) {
  const index = instructions.findIndex((item) => item.id === id);
  if (index < 0) return;
  instructions[index] = { ...instructions[index], ...patch };
  const next = instructions[index];
  const action = patch.status === "签收完成" ? "instructionSign" : patch.status === "偏离待处理" ? "instructionDeviation" : patch.status === "已下发" ? "instructionDeliver" : "instructionReview";
  window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, action, {
    dispatchId: next.dispatchNo,
    station: next.station,
    equipment: next.equipment,
    status: next.status,
    owner: next.operator || state.owner || "工艺员",
    result: next.deviation || message,
  });
  state.activeInstructionId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function deliverInstruction(item, message) {
  if (Object.values(item.gates).some((gate) => gate === "拦截")) {
    showToast("存在版本拦截项，不能下发到工位终端");
    return;
  }
  const gates = { ...item.gates, parameter: item.gates.parameter === "待确认" ? "通过" : item.gates.parameter };
  const assets = item.assets.map((asset) => asset.status === "待确认" ? { ...asset, status: "通过" } : asset);
  appendHistory(item, {
    action: "指导下发",
    owner: "工艺员",
    result: "SOP、图纸、参数和质量要求已下发到工位终端",
  });
  updateInstruction(item.id, { status: "已下发", deliveredAt: nowTime(), gates, assets }, message);
}

function syncSignReceipt(item) {
  if (item.status === "待下发") {
    showToast("需先下发到工位终端后才能同步签收回执");
    return;
  }
  if (item.status === "版本拦截") {
    showToast("存在版本拦截项，不能同步签收回执");
    return;
  }
  appendHistory(item, {
    action: "签收回执",
    owner: item.operator,
    result: "现场终端已回传签收，SOP、图纸、参数和质量要求已确认",
  });
  updateInstruction(item.id, { status: "签收完成", signedAt: nowTime() }, "已同步签收回执");
}

function completeCurrentStep(item) {
  if (item.status !== "签收完成") {
    showToast("需先下发并收到签收回执后才能同步执行进度");
    return;
  }
  const steps = item.steps.map((step, index) => {
    if (index < item.currentStep || index === item.currentStep) return { ...step, status: "完成" };
    if (index === item.currentStep + 1) return { ...step, status: "当前" };
    return step;
  });
  const nextStep = Math.min(item.currentStep + 1, item.steps.length - 1);
  appendHistory(item, {
    action: "执行进度回传",
    owner: item.operator,
    result: `已完成步骤 ${String(item.currentStep + 1).padStart(2, "0")}，过程记录已关联派工单`,
  });
  updateInstruction(item.id, { currentStep: nextStep, steps }, "已同步现场执行进度");
}

function raiseDeviation(item, reason, owner) {
  const gates = { ...item.gates };
  if (reason.includes("图纸") || reason.includes("外观")) gates.drawing = "待确认";
  if (reason.includes("扭矩") || reason.includes("参数")) gates.parameter = "待确认";
  if (reason.includes("检验")) gates.quality = "待确认";
  appendHistory(item, { action: "偏离呼叫", owner, result: reason });
  updateInstruction(item.id, { status: "偏离待处理", gates, deviation: `${reason}，责任人：${owner}` }, "已登记偏离处理");
}

function releaseDeviation(item) {
  const gates = Object.fromEntries(Object.entries(item.gates).map(([key, value]) => [key, value === "拦截" || value === "待确认" ? "通过" : value]));
  const assets = item.assets.map((asset) => asset.status === "拦截" || asset.status === "待确认" ? { ...asset, status: "通过" } : asset);
  appendHistory(item, { action: "偏离解除", owner: state.owner, result: "工艺员已确认偏离处理结果，允许继续作业" });
  updateInstruction(item.id, { status: item.signedAt ? "签收完成" : "待下发", gates, assets, deviation: "" }, "偏离处理已关闭");
}

function refreshVersion(item) {
  const gates = { ...item.gates, parameter: "通过", drawing: item.gates.drawing === "拦截" ? "通过" : item.gates.drawing };
  const assets = item.assets.map((asset) => asset.status === "拦截" ? { ...asset, status: "通过", desc: `${asset.desc}，已重新同步` } : asset);
  appendHistory(item, { action: "版本刷新", owner: "工艺员", result: "后台已重新同步最新 SOP、图纸和参数到终端" });
  updateInstruction(item.id, { status: item.status === "版本拦截" ? "待下发" : item.status, gates, assets }, "已重新同步版本");
}

function appendHistory(item, patch) {
  history = [
    {
      id: `IH-${Date.now()}`,
      instructionId: item.id,
      time: patch.time || nowTime(),
      action: patch.action,
      dispatchNo: item.dispatchNo,
      operation: item.operation,
      station: item.station,
      equipment: item.equipment,
      owner: patch.owner || item.operator,
      version: `${item.sopNo} ${item.version}`,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(instructionId, action, result) {
  logs = [
    { instructionId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
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
  $("#instructionSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#instructionStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#instructionLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#instructionOperationFilter").addEventListener("change", (event) => {
    state.operation = event.target.value;
    saveState();
    renderAll();
  });
  $("#deviationReasonSelect").addEventListener("change", (event) => {
    state.deviationReason = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  $("#signInstructionBtn").addEventListener("click", () => deliverInstruction(getActiveInstruction(), "已下发到工位终端"));
  $("#completeStepBtn").addEventListener("click", () => syncSignReceipt(getActiveInstruction()));
  $("#deviationBtn").addEventListener("click", () => raiseDeviation(getActiveInstruction(), state.deviationReason, state.owner));
  $("#refreshVersionBtn").addEventListener("click", () => refreshVersion(getActiveInstruction()));
  $("#refreshInstructionBtn").addEventListener("click", () => {
    recordLog(getActiveInstruction().id, "已刷新工艺指导监控", "重新读取当前派工、版本、终端签收和偏离状态");
    saveState();
    renderLogs();
    showToast("工艺指导监控已刷新");
  });
  $("#closeInstructionDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showInstructionDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#recheckInstructionBtn").addEventListener("click", () => {
    recordLog(getActiveInstruction().id, "已重新执行版本准入校验", getGateText(getActiveInstruction()));
    saveState();
    renderLogs();
    showToast("版本准入校验已重新执行");
  });
  $("#detailSignBtn").addEventListener("click", () => deliverInstruction(getActiveInstruction(), "已从详情下发到终端"));
  $("#detailStepBtn").addEventListener("click", () => syncSignReceipt(getActiveInstruction()));
  $("#detailDeviationBtn").addEventListener("click", () => raiseDeviation(getActiveInstruction(), state.deviationReason, state.owner));
  $("#releaseDeviationBtn").addEventListener("click", () => releaseDeviation(getActiveInstruction()));
  $("#batchSignBtn").addEventListener("click", () => {
    instructions = instructions.map((item) => {
      if (item.status === "版本拦截") return item;
      const gates = Object.fromEntries(Object.entries(item.gates).map(([key, value]) => [key, value === "待确认" ? "通过" : value]));
      const assets = item.assets.map((asset) => asset.status === "待确认" ? { ...asset, status: "通过" } : asset);
      return { ...item, status: item.status === "签收完成" ? item.status : "已下发", deliveredAt: item.deliveredAt || nowTime(), gates, assets };
    });
    recordLog(state.activeInstructionId, "已批量下发到工位终端", "除版本拦截任务外，其余指导已下发并等待终端回执");
    saveState();
    renderAll();
    showToast("已批量下发到工位终端");
  });
  $("#resetInstructionBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    instructions = structuredClone(initialInstructions);
    history = structuredClone(initialHistory);
    logs = [];
    state = { activeInstructionId: "WI-004", search: "", status: "all", line: "all", operation: "all", detailOpen: true, activeAssetType: "SOP", deviationReason: "物料外观与指导图不一致", owner: "工艺员" };
    $("#instructionSearch").value = "";
    $("#instructionStatusFilter").value = "all";
    $("#instructionLineFilter").value = "all";
    $("#instructionOperationFilter").value = "all";
    renderAll();
    showToast("工艺指导演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#instructionSearch").value = state.search;
$("#instructionStatusFilter").value = state.status;
$("#instructionLineFilter").value = state.line;
$("#instructionOperationFilter").value = state.operation;
bindEvents();
renderAll();
