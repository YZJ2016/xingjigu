const pageConfig = window.TRACE_PAGE || { id: "product", title: "产品追溯", eyebrow: "追溯查询 / 产品追溯" };
const STORAGE_KEY = `xingjigu_mes_trace_${pageConfig.id}_v1`;

const modules = [
  { id: "workbench", title: "首页工作台", layer: "日常工作", color: "#007aff", mark: "首", items: ["生产总览", "今日待办", "异常提醒", "交期预警", "车间看板", "我的审批"] },
  { id: "orders", title: "订单与计划", layer: "计划部门", color: "#5856d6", mark: "计", items: ["生产订单", "订单评审", "生产排程", "产能负荷", "交期预警", "计划调整", "齐套检查"] },
  { id: "dispatch", title: "派工与生产任务", layer: "车间管理", color: "#34c759", mark: "任", items: ["派工单", "工序任务", "班组任务", "任务下达", "任务变更", "SOP 查看", "开工检查"] },
  { id: "station", title: "工位作业", layer: "现场操作", color: "#00a6a6", mark: "位", items: ["员工登录", "扫码开工", "工艺指导", "投料确认", "过程记录", "工序报工", "交接班"] },
  { id: "materials", title: "物料与线边库", layer: "物料管理", color: "#34c759", mark: "料", items: ["用料需求", "领料申请", "配送进度", "线边库存", "投料记录", "余料退回", "缺料预警"] },
  { id: "barcode", title: "条码与标签", layer: "现场标识", color: "#00a6a6", mark: "码", items: ["生产批次", "产品序列号", "物料标签", "成品标签", "箱码托盘码", "标签打印", "补打申请"] },
  { id: "quality", title: "质量检验", layer: "质量部门", color: "#ff3b30", mark: "质", items: ["来料检验", "首件检验", "巡检任务", "过程检验", "成品检验", "不良记录", "返工评审", "质量放行"] },
  { id: "equipment", title: "设备与保养", layer: "设备部门", color: "#ff9f0a", mark: "设", items: ["设备状态", "点检计划", "保养计划", "维修工单", "停机记录", "备件领用", "设备效率"] },
  { id: "process", title: "过程监控", layer: "生产现场", color: "#ff9f0a", mark: "控", items: ["实时产量", "设备运行", "工艺参数", "报警记录", "停机原因", "过程趋势", "电子看板"] },
  { id: "exceptions", title: "异常处理", layer: "现场协同", color: "#ff3b30", mark: "异", items: ["异常上报", "待处理异常", "停线申请", "缺料处理", "质量问题", "设备故障", "处理复盘"] },
  { id: "warehouse", title: "完工与入库", layer: "仓储协同", color: "#34c759", mark: "入", items: ["工序完工", "完工确认", "包装作业", "成品入库", "库存冻结", "退料入库", "单据同步"] },
  { id: "trace", title: "追溯查询", layer: "质量追溯", color: "#8e8e93", mark: "追", items: ["产品追溯", "批次追溯", "物料去向", "生产履历", "检验履历", "设备履历", "客户追溯报告"] },
  { id: "reports", title: "报表与看板", layer: "经营分析", color: "#8e8e93", mark: "表", items: ["生产日报", "良率分析", "交付达成", "设备效率", "停机损失", "物料损耗", "管理驾驶舱"] },
  { id: "basic", title: "基础资料", layer: "资料维护", color: "#007aff", mark: "基", items: ["产品资料", "物料资料", "BOM 清单", "工艺路线", "工序工位", "产线车间", "客户供应商"] },
  { id: "system", title: "系统设置", layer: "管理配置", color: "#6e6e73", mark: "系", items: ["人员账号", "角色权限", "审批设置", "单据同步", "消息提醒", "操作记录", "数据备份"] },
];

const tracePages = {
  产品追溯: "product-trace.html",
  批次追溯: "batch-trace.html",
  物料去向: "material-flow.html",
  生产履历: "production-history.html",
  检验履历: "inspection-history.html",
  设备履历: "equipment-history.html",
  客户追溯报告: "customer-report.html",
};

const pageDefinitions = {
  product: { subtitle: "质量工程师按 SN 或成品批次反查工单、物料、工序、检验、设备和出货客户", user: "质量工程师", metrics: ["产品档案", "证据完整", "待复核", "影响风险"], columns: ["SN / 成品批次", "工单 / 产品", "客户 / 出货", "质量结论", "关键证据", "状态", "来源", "责任人"], tableTitle: "产品追溯查询结果", tableHint: "产品追溯用于客户投诉、质量复核和单件履历抽查，后台只查询和归档证据", chainTitle: "产品全链证据", simulationTitle: "模拟客户投诉或审计查询触发", simulationHint: "模拟客户投诉、审计员或质量工程师输入 SN，不代表后台执行现场生产动作" },
  batch: { subtitle: "按原料批次或成品批次双向追踪工单、投料消耗、成品去向和库存冻结范围", user: "质量追溯员", metrics: ["批次链路", "已闭环", "待复核", "冻结建议"], columns: ["批次号", "批次类型", "工单 / 产品", "投入 / 产出", "影响范围", "状态", "来源", "责任人"], tableTitle: "批次谱系查询结果", tableHint: "批次追溯围绕 lot_genealogy 串联原料、工单、成品和客户去向", chainTitle: "批次谱系证据", simulationTitle: "模拟供应商批次异常查询触发", simulationHint: "模拟供应商批次问题、客户召回或内部稽核触发查询，不替代库存实物冻结" },
  material: { subtitle: "物料员和质量员按物料批次查询领料、配送、线边签收、投料消耗、余料和成品去向", user: "物料追溯员", metrics: ["物料批次", "已核销", "待退料", "冻结/拦截"], columns: ["物料批次", "料号 / 名称", "去向工单", "线边 / 工位", "消耗与余料", "状态", "来源", "责任人"], tableTitle: "物料去向查询结果", tableHint: "物料去向用于确认某批物料进入哪些工单、工位、成品批次和异常单", chainTitle: "物料流向证据", simulationTitle: "模拟 WMS 或供应商批次查询触发", simulationHint: "模拟 WMS、IQC 或供应商异常传入查询条件，不代表后台移动实物物料" },
  production: { subtitle: "车间主任按工单、SN 或批次查询工序执行、人员、工位、参数、报工和交接记录", user: "车间主任", metrics: ["生产履历", "参数完整", "待补录", "异常锁定"], columns: ["履历对象", "工序 / 工位", "人员 / 班次", "参数记录", "报工结果", "状态", "来源", "责任人"], tableTitle: "生产履历查询结果", tableHint: "生产履历汇聚工位终端、扫码枪、HMI、PLC 和报工记录形成可审计证据", chainTitle: "生产执行证据", simulationTitle: "模拟工位终端履历补传触发", simulationHint: "模拟工位 HMI、扫码枪或 PLC 补传查询线索，不代表后台直接补做生产动作" },
  inspection: { subtitle: "质量员按 SN、批次或检验单查询 IQC、FAI、IPQC、FQC、NCR 和放行记录", user: "质量员", metrics: ["检验履历", "合格放行", "待判定", "NCR/MRB"], columns: ["检验对象", "检验类型", "关联工单", "检验结论", "不良 / NCR", "状态", "来源", "责任人"], tableTitle: "检验履历查询结果", tableHint: "检验履历用于证明质量放行依据、异常处置和复检闭环", chainTitle: "质量证据链", simulationTitle: "模拟 QMS 或客户稽核查询触发", simulationHint: "模拟 QMS、客户稽核或内部复核输入查询条件，不替代检验员现场判定" },
  equipment: { subtitle: "设备员按设备、工单或批次查询运行参数、报警、点检、维修、停机和校准记录", user: "设备员", metrics: ["设备履历", "运行正常", "待复核", "异常关联"], columns: ["设备 / 工装", "关联工单", "运行参数", "报警 / 停机", "维修点检", "状态", "来源", "责任人"], tableTitle: "设备履历查询结果", tableHint: "设备履历把 PLC、SCADA、点检、维修和生产批次绑定，用于质量追因和 TPM 改善", chainTitle: "设备状态证据", simulationTitle: "模拟 PLC/SCADA 查询触发", simulationHint: "模拟 PLC、SCADA 或设备 API 传入查询线索，不代表后台控制设备运行" },
  customer: { subtitle: "质量经理汇总客户投诉、出货批次、产品 SN、质量证据、影响范围和对外报告审批状态", user: "质量经理", metrics: ["追溯报告", "已发布", "待审批", "召回/冻结"], columns: ["报告编号", "客户 / 投诉", "出货批次", "影响范围", "报告内容", "状态", "来源", "责任人"], tableTitle: "客户追溯报告", tableHint: "客户追溯报告输出前必须包含查询快照、影响范围、处置结论和审批留痕", chainTitle: "客户报告证据", simulationTitle: "模拟客户投诉单查询触发", simulationHint: "模拟客户投诉、客诉系统或审计要求触发报告生成，不代表后台直接对外发送报告" },
};

const initialRows = {
  product: [
    { id: "SN-TCU100-000428", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", batch: "FG-TCU100-20260623-001", status: "证据完整", source: "SN 档案 + FQC 放行 QC-041", owner: "质量工程师 许宁", scope: "同批 428 台，已定位箱码 BOX-TCU100-022", evidence: "SMT 参数、投料批次、FQC 抽检、包装箱码", action: "可生成客户追溯报告" },
    { id: "SN-GW240-000315", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", batch: "FG-GW240-20260622-001", status: "待复核", source: "客户投诉单 CUS-202606-018", owner: "质量经理 孟可", scope: "同箱 20 台，关联老化测试通道 T-06", evidence: "测试曲线缺 1 段需复核", action: "补拉测试台归档数据" },
    { id: "SN-HMI100-000080", order: "MO-202606-0012", line: "Line-B", product: "工业触控终端 HMI-100", customer: "J 客户", batch: "FG-HMI100-20260621-001", status: "隔离锁定", source: "首件尺寸待确认 FAI-121", owner: "质量员 孟可", scope: "首件 80 台禁止包装", evidence: "FAI 未放行、成品标签隔离", action: "等待首件复判" },
    { id: "SN-THS10-001492", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", batch: "FG-THS10-20260623-001", status: "异常关联", source: "包装扫码异常 BOX-THS10-074", owner: "包装班长 李娟", scope: "箱码绑定被拦截，影响 1 箱", evidence: "FQC 未完成、箱码扫描拦截", action: "转质量复核后再包装" },
  ],
  batch: [
    { id: "LOT-TCU100-20260620-001", type: "生产批次", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "已闭环", source: "派工 D-001 + lot_genealogy", owner: "追溯员 林澈", scope: "产出 FG-TCU100-20260623-001，已完成 428 台", evidence: "PCB-L20260601、SEN-L20260605、DSP-L20260603", action: "支持正反向追溯" },
    { id: "SEN-L20260605", type: "原料批次", order: "MO-202606-0001", line: "Line-A", product: "温度传感器", customer: "A 客户", status: "冻结建议", source: "供应商 8D 通知 SQ-029", owner: "质量工程师 许宁", scope: "已投 428 件，线边余量 192 件", evidence: "IQC 合格、投料确认、线边低水位", action: "建议冻结线边余量并圈定成品" },
    { id: "FG-GW240-20260622-001", type: "成品批次", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", status: "待复核", source: "客户投诉 CUS-018", owner: "质量经理 孟可", scope: "已出货 240 台，库存 75 台", evidence: "FQC 放行、包装层级、出货单", action: "复核老化测试记录" },
    { id: "PWRIC-L20260602", type: "原料批次", order: "MO-202606-0005", line: "Line-B", product: "电源芯片", customer: "D 客户", status: "冻结拦截", source: "IQC 冻结回执", owner: "质量员 孟可", scope: "未投料，影响 PCM-60 备料", evidence: "物料标签冻结、齐套检查缺口", action: "禁止投料并通知采购" },
  ],
  material: [
    { id: "SEN-L20260605", material: "温度传感器", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "低水位待补", source: "WMS 出库 + 线边签收", owner: "物料员 吴琳", scope: "领料 620，已投 428，线边 192", evidence: "IQC 合格、PDA 签收、投料扫描", action: "补料到货前关注断料风险" },
    { id: "PCB-L20260601", material: "PCB 半成品", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "已核销", source: "SMT 投料记录 FR-001", owner: "班组长 周扬", scope: "已投 428，报工核销 428", evidence: "投料防错通过、报工数量一致", action: "进入成品批次谱系" },
    { id: "BOXI-L20260614", material: "客户 I 包装盒", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", status: "余料待退", source: "包装投料差异", owner: "包装班长 李娟", scope: "多领 30 件，待退料入库", evidence: "包装领料、箱码绑定、余料称重", action: "提交余料退回" },
    { id: "PWRIC-L20260602", material: "电源芯片", order: "MO-202606-0005", line: "Line-B", product: "电源控制模块 PCM-60", customer: "D 客户", status: "冻结拦截", source: "IQC 冻结标签", owner: "质量员 孟可", scope: "冻结 740 件，未进入工位", evidence: "WMS 冻结、线边不可投、缺料预警", action: "等待供应商复判" },
  ],
  production: [
    { id: "HIS-TCU100-SMT-001", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "参数完整", source: "SMT-01 PLC + 工位 HMI", owner: "班组长 周扬", scope: "SN 000001-000428，炉温曲线已归档", evidence: "开工准入、投料、过程参数、报工", action: "可供 FQC 和客户追溯引用" },
    { id: "HIS-GW240-TEST-006", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", status: "待补录", source: "测试台 T-06 数据补传", owner: "测试员 罗晨", scope: "SN 000301-000320 测试曲线缺段", evidence: "测试开始/结束时间、通道号、结果", action: "补拉设备测试归档" },
    { id: "HIS-HMI100-FAI-121", order: "MO-202606-0012", line: "Line-B", product: "工业触控终端 HMI-100", customer: "J 客户", status: "异常锁定", source: "首件未放行", owner: "质量员 孟可", scope: "80 台首件前生产记录锁定", evidence: "FAI 待判、报工拦截", action: "复判后释放或返工" },
    { id: "HIS-THS10-PACK-074", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", status: "异常关联", source: "包装扫码枪回执", owner: "包装班长 李娟", scope: "BOX-THS10-074 绑定失败", evidence: "SN 001492 未 FQC、箱码拦截", action: "转质量复核" },
  ],
  inspection: [
    { id: "QC-041-FQC", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "合格放行", source: "FQC 抽检任务 QC-041", owner: "质量员 许宁", scope: "抽样 50 件，放行 428 台", evidence: "FAI、IPQC、SPC、FQC 结论", action: "可打印成品标签" },
    { id: "CUS-018-NCR", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", status: "NCR处理中", source: "客户投诉 CUS-018", owner: "质量经理 孟可", scope: "疑似测试间歇不良 20 台", evidence: "NCR、老化测试、FQC 放行", action: "MRB 评审影响范围" },
    { id: "FAI-121-HMI", order: "MO-202606-0012", line: "Line-B", product: "工业触控终端 HMI-100", customer: "J 客户", status: "待判定", source: "首件检验 FAI-121", owner: "质量员 孟可", scope: "尺寸项未确认，首件 80 台隔离", evidence: "首件尺寸、工艺版本、人员签名", action: "复判后决定放行或返工" },
    { id: "IPQC-THS10-074", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", status: "复核中", source: "包装前抽检", owner: "质量员 叶琳", scope: "SN 001492 待补 FQC", evidence: "IPQC 合格、FQC 缺记录", action: "补检后恢复箱码绑定" },
  ],
  equipment: [
    { id: "EQ-SMT-01", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "运行正常", source: "PLC 炉温曲线 + SCADA", owner: "设备员 蒋岳", scope: "SMT 贴片 08:20-12:10 运行稳定", evidence: "炉温曲线、报警 0、点检 OK", action: "生产履历可引用" },
    { id: "EQ-TEST-T06", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", status: "待复核", source: "测试台 T-06 数据缺段", owner: "设备工程师 戴然", scope: "影响 SN 000301-000320", evidence: "测试通道日志、网络断连报警", action: "补拉数据并确认测试有效性" },
    { id: "EQ-ASM-C01", order: "MO-202606-0003", line: "Line-C", product: "边缘采集器 ECU-80", customer: "C 客户", status: "保养已验收", source: "保养工单 PM-033", owner: "设备员 蒋岳", scope: "装配 C01 保养后恢复生产", evidence: "点检、保养、试运行、验收签名", action: "OEE 恢复监控" },
    { id: "EQ-PACK-C03", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", status: "异常关联", source: "包装扫码枪断连", owner: "设备员 韩越", scope: "BOX-THS10-074 绑定失败", evidence: "PDA 离线缓存、补传日志", action: "确认补传顺序" },
  ],
  customer: [
    { id: "TR-RPT-A-20260623", order: "MO-202606-0001", line: "Line-A", product: "智能温控控制器 TCU-100", customer: "A 客户", status: "待审批", source: "客户 A 稽核要求", owner: "质量经理 孟可", scope: "FG-TCU100-20260623-001，428 台", evidence: "SN、批次、FQC、包装、出货快照", action: "质量经理审批后对外提供" },
    { id: "TR-RPT-B-20260622", order: "MO-202606-0002", line: "Line-B", product: "工业网关 GW-240", customer: "B 客户", status: "复核中", source: "投诉单 CUS-018", owner: "客户质量工程师 许宁", scope: "同箱 20 台，同批 315 台", evidence: "NCR、测试曲线、出货层级", action: "等待 MRB 结论" },
    { id: "TR-RPT-J-20260621", order: "MO-202606-0012", line: "Line-B", product: "工业触控终端 HMI-100", customer: "J 客户", status: "禁止发布", source: "首件未放行", owner: "质量员 孟可", scope: "首件 80 台隔离，未出货", evidence: "FAI 待判、标签隔离", action: "不得生成对外放行报告" },
    { id: "TR-RPT-I-20260623", order: "MO-202606-0011", line: "Line-C", product: "温湿度采集器 THS-10", customer: "I 客户", status: "已发布", source: "客户 I 出货资料", owner: "质量经理 孟可", scope: "尾批 320 台，客户模板已签收", evidence: "FQC、箱码、托盘码、WMS 入库", action: "报告快照已归档" },
  ],
};

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];
const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#traceModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "trace" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "trace" && item === pageConfig.title ? " class=\"is-active\"" : "";
      return `<a href="#${module.id}-${index}"${active} data-module="${module.id}" data-entry="${item}">${item}</a>`;
    }).join("");
    return `<section class="module-group${openClass}"><button class="module-button" type="button" data-module="${module.id}"><span class="module-icon" style="background:${module.color}">${module.mark}</span><span><span class="module-title">${module.title}</span><span class="module-layer">${module.layer}</span></span><span class="chevron">›</span></button><div class="submenu">${submenu}</div></section>`;
  }).join("");
  $("#traceModuleMenu").querySelectorAll(".module-button").forEach((button) => button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open")));
  $("#traceModuleMenu").querySelectorAll(".submenu a").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    goMenu(link.dataset.module, link.dataset.entry);
  }));
}

function goMenu(moduleId, entry) {
  const maps = {
    orders: ["生产订单", "../orders/production-orders.html"], dispatch: ["派工单", "../dispatch/dispatch-orders.html"], station: ["过程记录", "../station/process-record.html"], materials: ["投料记录", "../materials/feeding-records.html"], barcode: ["生产批次", "../barcode/production-batches.html"], quality: ["成品检验", "../quality/final-inspection.html"], equipment: ["设备状态", "../equipment/equipment-status.html"], process: ["过程趋势", "../monitoring/process-trends.html"], exceptions: ["质量问题", "../exceptions/quality-issues.html"], warehouse: ["库存冻结", "../warehouse/inventory-freeze.html"],
  };
  if (moduleId === "workbench") window.location.href = "../index.html";
  else if (moduleId === "trace" && tracePages[entry]) window.location.href = `./${tracePages[entry]}`;
  else if (maps[moduleId]) window.location.href = maps[moduleId][1];
  else showToast(`${entry} 页面待建设`);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = saved.rows || rows;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, logs, state }));
}

function getDefinition() {
  return pageDefinitions[pageConfig.id];
}

function getVisibleRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((item) => {
    const text = Object.values(item).join(" ").toLowerCase();
    return (!keyword || text.includes(keyword)) && (state.status === "all" || item.status === state.status) && (state.line === "all" || item.line === state.line);
  });
}

function getActive() {
  const visible = getVisibleRows();
  return visible.find((item) => item.id === state.activeId) || visible[0] || rows.find((item) => item.id === state.activeId) || rows[0];
}

function statusStyle(status) {
  if (/异常|冻结|拦截|隔离|禁止|NCR/.test(status)) return "red";
  if (/待|复核|补录|审批|建议|处理中/.test(status)) return "orange";
  if (/完整|已|合格|正常|核销|闭环/.test(status)) return "green";
  return "blue";
}

function renderPageChrome() {
  const def = getDefinition();
  document.title = `星技谷 MES | ${pageConfig.title}`;
  $("#pageEyebrow").textContent = pageConfig.eyebrow;
  $("#pageTitle").textContent = `${pageConfig.title}工作台`;
  $("#pageSubtitle").textContent = def.subtitle;
  $("#userRole").textContent = def.user;
  $("#tableTitle").textContent = def.tableTitle;
  $("#tableHint").textContent = def.tableHint;
  $("#chainTitle").textContent = def.chainTitle;
  $("#simulationTitle").textContent = def.simulationTitle;
  $("#simulationHint").textContent = def.simulationHint;
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "SN"} / ${rows[0]?.order || "工单号"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /完整|已|合格|正常|核销|闭环/.test(item.status)).length,
    visible.filter((item) => /待|复核|补录|审批|处理中/.test(item.status)).length,
    visible.filter((item) => /异常|冻结|拦截|隔离|禁止|NCR/.test(item.status)).length,
  ];
  $("#traceMetrics").innerHTML = def.metrics.map((label, index) => `<article><span>${label}</span><strong>${values[index]}</strong><em>${index === 3 ? "需冻结、复核或异常闭环" : "随筛选条件实时变化"}</em></article>`).join("");
}

function renderTable() {
  const visible = getVisibleRows();
  $("#traceTableBody").innerHTML = visible.length ? visible.map((item) => `<tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#traceTableBody").querySelectorAll("tr[data-id]").forEach((row) => row.addEventListener("click", () => {
    state.activeId = row.dataset.id;
    state.detailOpen = true;
    saveState();
    renderAll();
  }));
}

function buildCells(item) {
  if (pageConfig.id === "product") return [item.id, twoLine(item.order, item.product), twoLine(item.customer, item.batch), "FQC / 履历关联", item.evidence, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "batch") return [item.id, item.type, twoLine(item.order, item.product), item.evidence, item.scope, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "material") return [item.id, twoLine(item.material, item.product), item.order, item.line, item.scope, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "production") return [item.id, twoLine(item.order, item.product), item.line, item.evidence, item.scope, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "inspection") return [item.id, "IQC / FAI / IPQC / FQC", twoLine(item.order, item.product), item.status, item.evidence, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "equipment") return [item.id, twoLine(item.order, item.product), item.evidence, item.scope, item.action, pill(item.status), item.source, item.owner];
  return [item.id, twoLine(item.customer, item.source), item.batch || item.order, item.scope, item.evidence, pill(item.status), item.source, item.owner];
}

function twoLine(main, sub) {
  return `<strong>${main}</strong><small>${sub}</small>`;
}

function pill(text) {
  return `<span class="pill pill--${statusStyle(text)}">${text}</span>`;
}

function renderCards() {
  const active = getActive();
  $("#traceCards").innerHTML = [
    ["状态来源", active.source, "记录外部系统、现场终端或业务单据来源"],
    ["影响范围", active.scope, "圈定同批、同箱、同工序、同设备或同客户对象"],
    ["责任闭环", active.action, "明确复核、冻结、补采、审批或报告输出动作"],
  ].map(([label, value, hint]) => `<div class="trace-card"><span>${label}</span><strong>${value}</strong><em>${hint}</em></div>`).join("");
}

function renderDetail() {
  const active = getActive();
  $("#traceDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.product} · ${active.customer}`;
  $("#detailKv").innerHTML = [
    ["对象编码", active.id],
    ["生产工单", active.order],
    ["产品客户", `${active.product} · ${active.customer}`],
    ["产线", active.line],
    ["来源", active.source],
    ["责任人", active.owner],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#evidenceList").innerHTML = buildEvidence(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderLogs();
}

function buildEvidence(active) {
  return [
    ["来源系统", active.source],
    ["证据摘要", active.evidence],
    ["影响范围", active.scope],
    ["查询归档", `${pageConfig.title} · traceability_query_log 快照`],
  ];
}

function buildActions(active) {
  return [
    ["后台动作", "查询、圈定、归档、复核和报告审批"],
    ["现场边界", "不替代扫码、投料、检验、设备控制或仓储实物作业"],
    ["闭环结果", active.action],
  ];
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `<div><span>${log.time}</span><strong>${log.text}</strong></div>`).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟查询触发或复核记录</strong></div>`;
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderCards();
  renderDetail();
}

function appendLog(text) {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text });
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderPageChrome();
  renderAll();
}

function simulateQuery() {
  const value = $("#simulationInput").value.trim();
  updateActiveStatus(pageConfig.id === "customer" ? "待审批" : "待复核", `${getActive().id} 已记录${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟查询触发已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone(initialRows[pageConfig.id]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
  logs = [];
  $("#searchInput").value = "";
  $("#statusFilter").value = "all";
  $("#lineFilter").value = "all";
  $("#simulationInput").value = "";
  renderPageChrome();
  renderAll();
  showToast(`${pageConfig.title}演示已重置`);
}

function showToast(text) {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.remove(), 2200);
}

function bindEvents() {
  $("#searchInput").addEventListener("input", (event) => {
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
  $("#resetTraceBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateQuery);
  $("#primaryTraceBtn").addEventListener("click", () => updateActiveStatus("证据完整", `${getActive().id} 已生成追溯快照并写入查询日志`));
  $("#secondaryTraceBtn").addEventListener("click", () => updateActiveStatus("待复核", `${getActive().id} 已登记影响范围复核任务`));
  $("#closeDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetail();
  });
  $("#openDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetail();
  });
}

function init() {
  renderFrameMenu();
  loadState();
  renderPageChrome();
  $("#searchInput").value = state.search;
  $("#statusFilter").value = state.status;
  $("#lineFilter").value = state.line;
  bindEvents();
  renderAll();
}

init();
