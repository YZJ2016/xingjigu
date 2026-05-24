const pageConfig = window.QUALITY_DOWNSTREAM_PAGE || { id: "process", title: "过程检验", eyebrow: "质量检验 / 过程检验" };
const STORAGE_KEY = `xingjigu_mes_quality_downstream_${pageConfig.id}_v2`;

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

const knownRoutes = {
  workbench: { 生产总览: "../index.html" },
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "SOP 查看": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 员工登录: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  barcode: { 生产批次: "../barcode/production-batches.html", 产品序列号: "../barcode/product-serials.html", 物料标签: "../barcode/material-labels.html", 成品标签: "../barcode/finished-labels.html", 箱码托盘码: "../barcode/box-pallet-codes.html", 标签打印: "../barcode/label-printing.html", 补打申请: "../barcode/reprint-requests.html" },
  quality: { 来料检验: "./incoming-inspection.html", 首件检验: "./first-article.html", 巡检任务: "./patrol-tasks.html", 过程检验: "./process-inspection.html", 成品检验: "./final-inspection.html", 不良记录: "./defect-records.html", 返工评审: "./rework-review.html", 质量放行: "./release.html" },
};

const pageDefinitions = {
  process: {
    titleSuffix: "生产检验工作台",
    subtitle: "汇总工位过程记录、设备 PLC、测试工装和 SPC 趋势，超限时拦截工序报工或触发质量异常",
    user: "IPQC 过程质量员",
    metrics: ["过程检验", "待判定", "已放行", "超限 / 拦截"],
    columns: ["检验单", "工单 / 工序", "SN / 批次", "来源 / 设备", "SPC / 参数", "校验结果", "处置动作", "责任人"],
    tableTitle: "过程检验、SPC 与测试台参数",
    tableHint: "后台接收现场过程记录、PLC 和测试工装模拟回执，判定是否允许工序报工",
    cardTitle: "过程参数、报工拦截与异常闭环",
    simulationTitle: "模拟测试台 / PLC / 工位过程记录回执",
    simulationHint: "模拟外部测试工装、设备 PLC 或工位终端回传，后台只记录参数判定、拦截和质量异常",
    primaryStatus: "过程已放行",
    secondaryStatus: "超限已拦截",
    primaryMessage: "模拟测试台参数合格，已允许工序报工",
    secondaryMessage: "模拟 PLC 参数超限，已拦截工序报工并触发质量异常",
    links: [["工序报工", "../station/operation-report.html"], ["过程记录", "../station/process-record.html"], ["返工评审", "./rework-review.html"]],
  },
  final: {
    titleSuffix: "FQC 放行工作台",
    subtitle: "关联生产履历、首件、IPQC、过程参数、报工、不良、包装和成品标签，放行后衔接成品标签与入库",
    user: "FQC 检验员",
    metrics: ["FQC 批次", "待放行", "已放行", "拦截 / 返工"],
    columns: ["FQC 单", "工单 / 产品", "SN / 包装", "履历校验", "检验结论", "标签 / 入库", "处置动作", "责任人"],
    tableTitle: "成品检验与放行准入",
    tableHint: "FQC 以生产履历和过程质量为准入依据，合格后允许成品标签和入库衔接",
    cardTitle: "生产履历、FQC 放行和成品入库闭环",
    simulationTitle: "模拟 FQC / 包装工位 / 成品标签回执",
    simulationHint: "模拟外部 FQC 检验台、包装工位或标签系统回传，页面只登记放行、拦截和追溯引用",
    primaryStatus: "已放行入库",
    secondaryStatus: "FQC 已拦截",
    primaryMessage: "模拟 FQC 合格，已放行成品标签和入库准入",
    secondaryMessage: "模拟 FQC 拦截，包装标签冻结并进入返工评审",
    links: [["成品标签", "../barcode/finished-labels.html"], ["箱码托盘码", "../barcode/box-pallet-codes.html"], ["返工评审", "./rework-review.html"]],
  },
  release: {
    titleSuffix: "准入放行工作台",
    subtitle: "汇总 FQC 结论、NCR/MRB 状态、库存冻结、成品标签、包装层级和入库准入，质量人员签核后才允许成品入库或客户追溯报告引用",
    user: "质量放行工程师",
    metrics: ["放行批次", "待签核", "已放行", "拦截 / 冻结"],
    columns: ["放行单", "工单 / 产品", "SN / 包装", "质量依据", "放行结论", "标签 / 入库", "处置动作", "责任人"],
    tableTitle: "质量放行、冻结拦截与入库准入",
    tableHint: "后台只负责放行签核、拦截处置和追溯留痕，不替代现场 FQC、包装扫码或 WMS 入库动作",
    cardTitle: "FQC、NCR/MRB、标签和入库准入闭环",
    simulationTitle: "模拟 FQC / WMS / 标签系统放行回执",
    simulationHint: "模拟外部 FQC 检验台、WMS 冻结状态或标签系统回传，页面只登记签核、拦截和追溯引用",
    primaryStatus: "质量已放行",
    secondaryStatus: "质量已拦截",
    primaryMessage: "模拟质量签核通过，已允许成品标签和入库准入",
    secondaryMessage: "模拟质量签核拦截，已冻结入库准入并转异常闭环",
    links: [["成品检验", "./final-inspection.html"], ["库存冻结", "../warehouse/inventory-freeze.html"], ["成品入库", "../warehouse/finished-goods-receipt.html"]],
  },
  defect: {
    titleSuffix: "NCR 缺陷工作台",
    subtitle: "记录 SN、批次、工序、设备、人员和物料批次关联，支撑隔离、复判、让步、报废和返工评审入口",
    user: "质量工程师",
    metrics: ["NCR 记录", "待复判", "已闭环", "隔离 / MRB"],
    columns: ["NCR 单", "SN / 批次", "工序 / 设备", "缺陷现象", "追溯关联", "当前状态", "处置入口", "责任人"],
    tableTitle: "NCR / 缺陷记录与隔离处置",
    tableHint: "缺陷来源可来自过程检验、FQC、工位终端或测试台，处置结果回写追溯",
    cardTitle: "缺陷事实、隔离复判与处置入口",
    simulationTitle: "模拟复判 / 隔离库位 / 工位异常回执",
    simulationHint: "模拟外部检验复判、隔离库位或工位异常回传，后台只记录 NCR 状态、处置和追溯关联",
    primaryStatus: "复判已关闭",
    secondaryStatus: "隔离待 MRB",
    primaryMessage: "模拟复判确认误报，NCR 已关闭并保留追溯记录",
    secondaryMessage: "模拟缺陷批次隔离，已转入 MRB 返工评审入口",
    links: [["返工评审", "./rework-review.html"], ["过程检验", "./process-inspection.html"], ["成品检验", "./final-inspection.html"]],
  },
  rework: {
    titleSuffix: "MRB 返工评审工作台",
    subtitle: "评审不良品处置方式、返工路线、责任人和复检结果，衔接派工、工位作业和追溯回写",
    user: "MRB 评审员",
    metrics: ["MRB 单", "待评审", "复检合格", "待返工 / 报废"],
    columns: ["MRB 单", "来源 NCR", "处置方式", "返工路线", "责任人 / 工位", "复检结果", "追溯回写", "状态"],
    tableTitle: "MRB 处置、返工路线与复检闭环",
    tableHint: "返工评审不直接替代现场返工作业，而是下发路线、责任和复检要求",
    cardTitle: "评审决策、返工执行和追溯闭环",
    simulationTitle: "模拟返工工位 / 复检台 / 派工回执",
    simulationHint: "模拟外部返工工位、复检台或派工系统回传，后台只登记评审、复检和追溯回写",
    primaryStatus: "复检合格关闭",
    secondaryStatus: "已下发返工",
    primaryMessage: "模拟复检合格，MRB 已关闭并回写追溯",
    secondaryMessage: "模拟评审决定返工，已下发返工路线和责任工位",
    links: [["不良记录", "./defect-records.html"], ["任务下达", "../dispatch/task-release.html"], ["工位作业", "../station/process-record.html"]],
  },
};

const initialRows = {
  process: [
    { id: "PQC-20260620-001", order: "MO-202606-0001", dispatch: "D-002", operation: "DIP 插件", line: "Line-A", product: "智能温控控制器 TCU-100", sn: "SN-TCU100-000312", batch: "LOT-TCU100-20260620-001", equipment: "TEST-DIP-01", materialBatch: "SEN-L20260605", source: "工位过程记录 PR-260620-001 + 测试台 TEST-DIP-01", parameter: "焊点拉力 32N / 下限 28N；SPC Cpk 1.42", status: "过程已放行", action: "允许工序报工", owner: "IPQC 王珊", time: "2026-06-20 10:42", result: "参数合格，测试台电子签名 QC-028", next: "进入工序报工和后续 FQC 履历", risk: "无" },
    { id: "PQC-20260620-002", order: "MO-202606-0002", dispatch: "D-022", operation: "功能测试", line: "Line-B", product: "工业网关 GW-240", sn: "SN-GW240-000188", batch: "LOT-GW240-20260620-002", equipment: "ICT-02", materialBatch: "RES10K-L20260604", source: "设备 PLC 参数 + ICT 测试工装", parameter: "通讯响应 118ms / 上限 120ms；SPC 连续 6 点上升", status: "趋势预警", action: "加严抽检并通知工艺员", owner: "质量工程师 林澈", time: "2026-06-20 11:05", result: "单件合格但趋势接近上限", next: "巡检频次调整为每 30 分钟", risk: "若下一批超限将拦截报工" },
    { id: "PQC-20260620-003", order: "MO-202606-0008", dispatch: "D-082", operation: "老化测试", line: "Line-C", product: "智能电表采集器 MTR-80", sn: "SN-MTR80-000041", batch: "LOT-MTR80-20260620-001", equipment: "AGING-CH04", materialBatch: "PWRIC-L20260602", source: "老化设备 PLC 报警 + 工位终端异常", parameter: "电流漂移 9.8% / 上限 5%；CH-04", status: "超限已拦截", action: "拦截工序报工并生成 NCR-260620-04", owner: "IPQC 何洁", time: "2026-06-20 11:18", result: "同通道 3 台超限，影响范围待圈定", next: "进入不良记录和 MRB 评审", risk: "同通道 48 台需隔离复判" },
    { id: "PQC-20260620-004", order: "MO-202606-0012", dispatch: "D-123", operation: "程序烧录", line: "Line-B", product: "触控屏组件 HMI-7", sn: "SN-HMI7-000076", batch: "LOT-HMI7-20260620-001", equipment: "FLASH-03", materialBatch: "LCD-L20260608", source: "烧录工装 + SN 绑定记录", parameter: "程序 V2.6.1；CRC 一致；通讯复测待完成", status: "待复测", action: "保持报工待判定", owner: "IPQC 王珊", time: "2026-06-20 11:40", result: "一次通讯超时，等待复测回执", next: "复测通过后允许报工", risk: "程序版本必须进入追溯" },
  ],
  final: [
    { id: "FQC-20260620-001", order: "MO-202606-0002", dispatch: "PKG-021", operation: "包装入库", line: "Line-B", product: "工业网关 GW-240", sn: "SN-GW240-000001~000120", batch: "LOT-GW240-20260620-002", equipment: "FQC-BENCH-02", materialBatch: "BOX-GW-L20260612", source: "生产履历 + FAI-20260620-002 + IPQC-20260620-002 + 报工 D-022", parameter: "外观 AQL 抽 32；功能复测 10 台；标签版本 V2.1", status: "待放行", action: "等待 FQC 签核", owner: "FQC 孟可", time: "2026-06-20 14:10", result: "首件、过程参数、报工数量一致，包装标签待确认", next: "放行后生成成品标签和入库准入", risk: "客户 A 出货批次需全量 SN 绑定" },
    { id: "FQC-20260620-002", order: "MO-202606-0001", dispatch: "PKG-001", operation: "包装入库", line: "Line-A", product: "智能温控控制器 TCU-100", sn: "SN-TCU100-000001~000080", batch: "LOT-TCU100-20260620-001", equipment: "FQC-BENCH-01", materialBatch: "LBL-TCU-L20260615", source: "生产履历 + PQC-20260620-001 + 包装工位回执", parameter: "外观抽 20；功能抽 8；箱标等级 B 级以上", status: "已放行入库", action: "成品标签可打印 / WMS 可入库", owner: "FQC 赵宁", time: "2026-06-20 15:02", result: "FQC 合格，签核 QC-031，标签 SN 已绑定", next: "成品标签打印并同步入库单", risk: "无" },
    { id: "FQC-20260620-003", order: "MO-202606-0008", dispatch: "PKG-082", operation: "包装入库", line: "Line-C", product: "智能电表采集器 MTR-80", sn: "SN-MTR80-000001~000060", batch: "LOT-MTR80-20260620-001", equipment: "FQC-BENCH-03", materialBatch: "PWRIC-L20260602", source: "生产履历 + NCR-260620-04 + 老化测试回执", parameter: "老化异常未关闭；成品抽检 5 台电流漂移", status: "FQC 已拦截", action: "冻结成品标签并转 MRB", owner: "质量工程师 林澈", time: "2026-06-20 15:28", result: "过程异常未关闭，不允许入库", next: "进入返工评审并回写追溯", risk: "同批 60 台禁止发货" },
    { id: "FQC-20260620-004", order: "MO-202606-0011", dispatch: "PKG-111", operation: "包装入库", line: "Line-C", product: "客户 I 控制盒", sn: "SN-BOXI-000001~000200", batch: "LOT-BOXI-20260620-001", equipment: "SCAN-PKG-02", materialBatch: "BOXI-L20260614", source: "包装工位扫码 + 标签打印记录", parameter: "箱码 20 箱；条码等级 C 级 1 箱待确认", status: "标签待复核", action: "暂停该箱入库放行", owner: "FQC 何洁", time: "2026-06-20 15:45", result: "箱 07 条码等级 C，待重新扫描", next: "复核后放行或返工贴标", risk: "客户标签版本必须一致" },
  ],
  defect: [
    { id: "NCR-260620-04", order: "MO-202606-0008", dispatch: "D-082", operation: "老化测试", line: "Line-C", product: "智能电表采集器 MTR-80", sn: "SN-MTR80-000041", batch: "LOT-MTR80-20260620-001", equipment: "AGING-CH04", materialBatch: "PWRIC-L20260602", source: "PQC-20260620-003 + 老化设备 PLC 报警", parameter: "电流漂移 9.8%，同通道 3 台超限", status: "隔离待 MRB", action: "隔离 CH-04 影响范围并发起 MRB", owner: "质量工程师 林澈", time: "2026-06-20 11:26", result: "隔离 SN 000039~000086，共 48 台", next: "返工评审确认返工路线或报废", risk: "禁止 FQC 入库与成品标签放行" },
    { id: "NCR-260620-05", order: "MO-202606-0011", dispatch: "PKG-111", operation: "包装入库", line: "Line-C", product: "客户 I 控制盒", sn: "BOX-07", batch: "LOT-BOXI-20260620-001", equipment: "PRINTER-PKG-02", materialBatch: "BOXI-L20260614", source: "FQC 条码等级复核 + 包装扫描枪", parameter: "箱标条码等级 C，客户要求 B 级以上", status: "待复判", action: "隔离单箱并复判打印头状态", owner: "FQC 何洁", time: "2026-06-20 15:50", result: "暂不影响同批其他箱，等待复扫", next: "复判合格关闭，失败转返工贴标", risk: "客户标签版本追溯需保留" },
    { id: "NCR-260620-06", order: "MO-202606-0007", dispatch: "D-071", operation: "整机装配", line: "Line-C", product: "能耗采集终端 EMT-60", sn: "SN-EMT60-000019", batch: "LOT-EMT60-20260620-001", equipment: "ASM-JIG-03", materialBatch: "CASE-A-L20260610", source: "首件不合格 + 工位照片上传", parameter: "外壳间隙超上限 0.18 mm", status: "返工评审中", action: "等待 MRB 确认返工夹具和责任工位", owner: "质量主管 周妍", time: "2026-06-20 10:20", result: "派工 D-071 已锁定，影响 300 台待确认", next: "MRB 下发返工路线后重新首件", risk: "禁止批量装配" },
    { id: "NCR-260620-07", order: "MO-202606-0002", dispatch: "D-022", operation: "功能测试", line: "Line-B", product: "工业网关 GW-240", sn: "SN-GW240-000188", batch: "LOT-GW240-20260620-002", equipment: "ICT-02", materialBatch: "RES10K-L20260604", source: "测试台复测记录 + IPQC 趋势预警", parameter: "通讯响应复测 96ms，未复现异常", status: "复判已关闭", action: "保留趋势监控，不影响 FQC", owner: "IPQC 王珊", time: "2026-06-20 13:15", result: "复判为测试线缆接触不良，已更换线缆", next: "追溯保留，FQC 可引用", risk: "继续观察 ICT-02 稳定性" },
  ],
  rework: [
    { id: "MRB-260620-01", order: "NCR-260620-04", dispatch: "RW-082", operation: "返工复测", line: "Line-C", product: "智能电表采集器 MTR-80", sn: "SN-MTR80-000039~000086", batch: "LOT-MTR80-20260620-001", equipment: "RW-BENCH-01", materialBatch: "PWRIC-L20260602", source: "NCR-260620-04 + FQC-20260620-003 拦截", parameter: "处置方式：返工复测；路线：隔离库 -> 返工工位 -> 老化复检 -> FQC", status: "已下发返工", action: "下发返工派工 RW-082", owner: "MRB 评审员 周妍 / 返工班长 许磊", time: "2026-06-20 16:05", result: "48 台返工复测，3 台重点排查 CH-04", next: "复检合格后解冻 FQC，失败转报废评审", risk: "返工记录必须回写 SN 履历" },
    { id: "MRB-260620-02", order: "NCR-260620-06", dispatch: "RW-071", operation: "外壳返修", line: "Line-C", product: "能耗采集终端 EMT-60", sn: "SN-EMT60-000019", batch: "LOT-EMT60-20260620-001", equipment: "ASM-JIG-03", materialBatch: "CASE-A-L20260610", source: "首件不合格 NCR-260620-06", parameter: "处置方式：工艺调整后返工；路线：装配工位 -> 首件复验 -> 批量解锁", status: "待评审", action: "等待工艺员提交夹具调整确认", owner: "质量主管 周妍 / 工艺员 陈锐", time: "2026-06-20 10:45", result: "责任工位 ASM-WS-04，夹具定位需复核", next: "评审通过后下发返工任务", risk: "未关闭前派工 D-071 保持锁定" },
    { id: "MRB-260620-03", order: "NCR-260620-05", dispatch: "RW-111", operation: "返工贴标", line: "Line-C", product: "客户 I 控制盒", sn: "BOX-07", batch: "LOT-BOXI-20260620-001", equipment: "PRINTER-PKG-02", materialBatch: "BOXI-L20260614", source: "FQC 标签复核 NCR-260620-05", parameter: "处置方式：返工贴标；路线：包装工位 -> 标签补打 -> FQC 复扫", status: "复检合格关闭", action: "补打标签已复扫合格", owner: "FQC 何洁 / 包装班长 李娟", time: "2026-06-20 16:20", result: "条码等级 B，箱码 BOX-07 追溯已更新", next: "恢复成品入库准入", risk: "客户标签版本 V1.4 已锁定" },
    { id: "MRB-260620-04", order: "NCR-260620-08", dispatch: "SCR-001", operation: "报废评审", line: "Line-A", product: "智能温控控制器 TCU-100", sn: "SN-TCU100-000077", batch: "LOT-TCU100-20260620-001", equipment: "DIP-WS-03", materialBatch: "SEN-L20260605", source: "工位自检 + IPQC 复判", parameter: "处置方式：待判定；疑似 PCB 铜皮损伤", status: "报废待审批", action: "等待质量经理与生产经理审批", owner: "MRB 评审员 林澈", time: "2026-06-20 16:34", result: "返工风险高，需确认是否报废", next: "审批后冻结 SN 并回写物料损耗", risk: "需核算责任工序和物料批次" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.qualityDownstream || {});

if (!initialRows.release) {
  initialRows.release = initialRows.final.map((item, index) => ({
    ...item,
    id: item.id.replace("FQC", "QREL"),
    status: item.status === "已放行入库" ? "质量已放行" : item.status === "FQC 已拦截" ? "质量已拦截" : "待签核",
    action: item.status === "FQC 已拦截" ? "冻结入库准入并转异常闭环" : "复核 FQC、NCR/MRB、标签和 WMS 准入",
    source: `${item.source} + 质量放行签核规则`,
    result: index === 1 ? "质量签核通过，允许成品入库" : item.result,
    next: item.status === "FQC 已拦截" ? "进入异常处理、库存冻结和返工评审" : "签核通过后衔接成品入库和追溯报告",
    risk: item.status === "FQC 已拦截" ? "禁止成品入库和客户发货" : item.risk,
  }));
}

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true, openMenus: { quality: true } };
let logs = [];
let maintenanceRecords = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#qualityDownstreamMenu").innerHTML = modules.map((module) => {
    const openClass = state.openMenus?.[module.id] ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "quality" && item === pageConfig.title ? " class=\"is-active\"" : "";
      return `<a href="#${module.id}-${index}"${active} data-module="${module.id}" data-entry="${item}">${item}</a>`;
    }).join("");
    return `<section class="module-group${openClass}"><button class="module-button" type="button"><span class="module-icon" style="background:${module.color}">${module.mark}</span><span><span class="module-title">${module.title}</span><span class="module-layer">${module.layer}</span></span><span class="chevron">›</span></button><div class="submenu">${submenu}</div></section>`;
  }).join("");

  $("#qualityDownstreamMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".module-group");
      const moduleId = group.querySelector(".submenu a")?.dataset.module;
      group.classList.toggle("is-open");
      state.openMenus = { ...(state.openMenus || {}), [moduleId]: group.classList.contains("is-open") };
      saveState();
    });
  });
  $("#qualityDownstreamMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = knownRoutes[link.dataset.module]?.[link.dataset.entry];
      if (href) window.location.href = href;
      else showToast(`${link.dataset.entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = saved.rows || rows;
    logs = saved.logs || logs;
    maintenanceRecords = saved.maintenanceRecords || maintenanceRecords;
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  mergeFlowRows();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, logs, maintenanceRecords, state }));
}

function mergeFlowRows() {
  const flowRows = window.MES_BUSINESS_FLOW?.getQualityRows?.(pageConfig.id) || [];
  if (!flowRows.length) return;
  const existing = new Map(rows.map((item) => [item.id, item]));
  flowRows.forEach((item) => {
    if (!existing.has(item.id)) rows.push(item);
  });
  if (!rows.some((item) => item.id === state.activeId)) state.activeId = rows[0]?.id || "";
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
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(status) {
  if (/超限|拦截|隔离|MRB|报废|锁定|冻结|不合格|异常|待审批/.test(status)) return "red";
  if (/待|预警|复判|复测|复核|评审/.test(status)) return "orange";
  if (/放行|合格|关闭|已完成/.test(status)) return "green";
  return "blue";
}

function renderPageChrome() {
  const def = getDefinition();
  document.title = `星技谷 MES | ${pageConfig.title}`;
  $("#pageEyebrow").textContent = pageConfig.eyebrow;
  $("#pageTitle").textContent = `${pageConfig.title}${def.titleSuffix}`;
  $("#pageSubtitle").textContent = def.subtitle;
  $("#userRole").textContent = def.user;
  $("#tableTitle").textContent = def.tableTitle;
  $("#tableHint").textContent = def.tableHint;
  $("#cardTitle").textContent = def.cardTitle;
  $("#simulationTitle").textContent = def.simulationTitle;
  $("#simulationHint").textContent = def.simulationHint;
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "单据号"} / ${rows[0]?.sn || "SN"} / 模拟参数或判定`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线 / 区域</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
  $("#quickLinks").innerHTML = def.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /待|预警|复判|复测|复核|评审/.test(item.status)).length,
    visible.filter((item) => /放行|合格|关闭/.test(item.status)).length,
    visible.filter((item) => /超限|拦截|隔离|MRB|报废|冻结|锁定/.test(item.status) || /禁止|风险|影响/.test(item.risk)).length,
  ];
  $("#qualityMetrics").innerHTML = def.metrics.map((label, index) => `<article><span>${label}</span><strong>${values[index]}</strong><em>${index === 3 ? "需联动 NCR、MRB、标签、派工或追溯闭环" : "随筛选条件实时变化"}</em></article>`).join("");
}

function renderTable() {
  const visible = getVisibleRows();
  $("#qualityTableBody").innerHTML = visible.length ? visible.map((item) => `<tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="8"><div class="empty-action">当前筛选条件下没有${pageConfig.title}记录 <button type="button" data-maintenance-action="create">新增质量单据</button></div></td></tr>`;
  $("#qualityTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#qualityTableBody").querySelectorAll("[data-maintenance-action]").forEach((button) => {
    button.addEventListener("click", () => handleMaintenanceAction(button.dataset.maintenanceAction));
  });
}

function buildCells(item) {
  if (pageConfig.id === "process") return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.sn, item.batch), twoLine(item.source, item.equipment), item.parameter, pill(item.status), item.action, item.owner];
  if (pageConfig.id === "final") return [item.id, twoLine(item.order, item.product), twoLine(item.sn, item.batch), item.source, pill(item.status), item.next, item.action, item.owner];
  if (pageConfig.id === "defect") return [item.id, twoLine(item.sn, item.batch), twoLine(item.operation, item.equipment), item.parameter, `${item.materialBatch} / ${item.owner}`, pill(item.status), item.action, item.owner];
  return [item.id, item.order, item.parameter.split("；")[0], item.parameter.split("；")[1] || item.operation, item.owner, item.result, item.next, pill(item.status)];
}

function twoLine(main, sub) {
  return `<strong>${main}</strong><small>${sub}</small>`;
}

function pill(text) {
  return `<span class="pill pill--${statusStyle(text)}">${text}</span>`;
}

function renderCards() {
  const active = getActive();
  const cards = [
    ["来源事实", active.source, "保留来源系统、设备、终端、单据和时间戳"],
    ["校验结果", `${active.parameter} · ${active.result}`, "作为放行、拦截、隔离或评审依据"],
    ["闭环去向", active.next, "继续衔接派工、工位作业、标签、入库或追溯"],
  ];
  $("#qualityCards").innerHTML = cards.map(([label, value, hint]) => `<div class="quality-card"><span>${label}</span><strong>${value}</strong><em>${hint}</em></div>`).join("");
}

function renderDetail() {
  const active = getActive();
  $("#qualityDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.dispatch} · ${active.operation}`;
  $("#detailKv").innerHTML = [
    ["对象", `${active.product} · ${active.sn}`],
    ["批次关联", `${active.batch} / ${active.materialBatch}`],
    ["来源系统", active.source],
    ["责任人", active.owner],
    ["时间戳", active.time],
    ["风险说明", active.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = buildTimeline(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderLogs();
}

function buildTimeline(active) {
  return [
    ["任务触发", active.source],
    ["校验记录", active.result],
    ["状态时间", `${active.status} · ${active.time}`],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
    ["追溯引用", `${active.order} / ${active.dispatch} / ${active.sn} / ${active.batch}`],
  ];
}

function buildActions(active) {
  const map = {
    process: "过程检验合格允许报工；超限时拦截工序报工并生成 NCR 或质量异常。",
    final: "FQC 放行后允许成品标签和入库；拦截时冻结标签并进入 NCR/MRB。",
    defect: "NCR 支持隔离、复判、让步、报废和返工评审入口，结论回写 SN 履历。",
    rework: "MRB 下发返工路线、责任工位和复检要求，现场执行后回写追溯。",
  };
  return [
    ["当前处置", active.action],
    ["下游衔接", active.next],
    ["业务规则", map[pageConfig.id]],
    ["追溯范围", `${active.sn} / ${active.batch} / ${active.equipment} / ${active.materialBatch}`],
  ];
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 6).map((log) => `<div><span>${log.time}</span><strong>${log.text}</strong></div>`).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟外部回执或模拟处置记录</strong></div>`;
}

function renderAll() {
  mergeFlowRows();
  renderMetrics();
  renderTable();
  renderCards();
  renderMaintenancePanel();
  renderDetail();
}

function getMaintenanceRecipe() {
  const map = {
    process: ["过程检验任务", "录入并复核过程结论", "放行/拦截后关闭", "IPQC 过程质量员 王珊"],
    final: ["FQC 检验任务", "复核 FQC 放行结论", "放行/隔离后关闭", "FQC 检验员 孟可"],
    defect: ["NCR 不良记录", "复判并隔离/让步", "关闭 NCR 记录", "质量工程师 林澈"],
    rework: ["MRB 返工评审", "会签并下发返工路线", "复检验收关闭", "MRB 评审员 周妍"],
  };
  const [create, process, close, owner] = map[pageConfig.id] || map.defect;
  return { create, process, close, owner };
}

function getActiveMaintenance() {
  return maintenanceRecords[0];
}

function renderMaintenancePanel() {
  let panel = $("#qualityMaintenancePanel");
  if (!panel) {
    panel = document.createElement("section");
    panel.id = "qualityMaintenancePanel";
    panel.className = "quality-panel maintenance-panel";
    document.querySelector(".quality-left .simulation-box")?.before(panel);
  }
  const active = getActive();
  const recipe = getMaintenanceRecipe();
  const current = getActiveMaintenance();
  panel.innerHTML = `
    <div class="quality-panel__head">
      <div>
        <h3>${pageConfig.title}手工维护闭环</h3>
        <p>后台维护检验、NCR、MRB、复核和关闭结论；参数采集、包装复扫、返工执行均作为模拟回执或后台复核，不替代现场动作。</p>
      </div>
    </div>
    <div class="maintenance-flow">
      <button type="button" data-maintenance-action="create">新建 ${recipe.create}</button>
      <button type="button" data-maintenance-action="process"${current ? "" : " disabled"}>${recipe.process}</button>
      <button type="button" class="danger-action" data-maintenance-action="close"${current ? "" : " disabled"}>${recipe.close}</button>
    </div>
    <div class="maintenance-record">
      ${current ? `
        <div><span>维护单</span><strong>${current.id} · ${current.status}</strong></div>
        <div><span>关联单据</span><strong>${current.related}</strong></div>
        <div><span>责任/时间</span><strong>${current.owner} · ${current.time}</strong></div>
        <div><span>前后值摘要</span><strong>${current.before} -> ${current.after}</strong></div>
      ` : `<div><span>暂无维护单</span><strong>可基于 ${active?.id || pageConfig.title} 新建一条质量闭环单据</strong></div>`}
    </div>
    <div class="maintenance-log">
      ${maintenanceRecords.slice(0, 4).map((item) => `<div><span>${item.time}</span><strong>${item.id} ${item.action}：${item.status}</strong></div>`).join("") || `<div><span>操作记录</span><strong>新建、复核、会签、隔离、关闭会写入 localStorage 和统一治理事件</strong></div>`}
    </div>
  `;
  panel.querySelectorAll("[data-maintenance-action]").forEach((button) => {
    button.addEventListener("click", () => handleMaintenanceAction(button.dataset.maintenanceAction));
  });
}

function handleMaintenanceAction(action) {
  const active = getActive();
  if (!active) return;
  const recipe = getMaintenanceRecipe();
  const now = new Date().toLocaleString("zh-CN", { hour12: false });
  let record = getActiveMaintenance();
  if (action === "create") {
    record = {
      id: `QA-MAINT-${Date.now().toString().slice(-6)}`,
      action: recipe.create,
      status: "待复核",
      related: `${active.order} / ${active.dispatch} / ${active.id}`,
      owner: recipe.owner,
      time: now,
      before: `${active.status} / ${active.action}`,
      after: `已新建${recipe.create}`,
    };
    maintenanceRecords.unshift(record);
  } else {
    if (!record) return;
    if (action === "close" && !confirm(`确认${recipe.close}？质量追溯记录会继续保留。`)) return;
    record.action = action === "process" ? recipe.process : recipe.close;
    record.status = action === "process" ? "已复核/待关闭" : "已关闭";
    record.time = now;
    record.before = record.after;
    record.after = action === "process" ? `${recipe.process}完成，等待模拟现场回执或会签` : `${recipe.close}完成，SN/批次追溯已归档`;
  }
  window.MES_BUSINESS_FLOW?.applyQualityAction?.(active, action === "close" ? "qualityRelease" : "qualityBlock", {
    status: record.status,
    owner: record.owner,
    result: `${record.id} ${record.before} -> ${record.after}`,
  });
  window.MES_BUSINESS_FLOW?.applyGovernanceAction?.({ id: record.id, name: pageConfig.title, owner: record.owner, risk: active.risk }, "quality", record.action, {
    orderId: active.order,
    status: record.status,
    source: "质量检验后台维护",
    result: record.after,
    auditRef: record.related,
  });
  appendLog(`${record.id} ${record.action}：${record.before} -> ${record.after}，责任人 ${record.owner}`);
  saveState();
  renderAll();
  showToast("质量维护记录已保存");
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  active.time = new Date().toLocaleString("zh-CN", { hour12: false });
  if (status === getDefinition().primaryStatus) {
    applyPrimaryOutcome(active);
  } else {
    applySecondaryOutcome(active);
  }
  window.MES_BUSINESS_FLOW?.applyQualityAction?.(active, status === getDefinition().primaryStatus ? "qualityRelease" : "qualityBlock", {
    status,
    owner: active.owner,
    result: active.result || active.action,
  });
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderPageChrome();
  $("#statusFilter").value = state.status;
  $("#lineFilter").value = state.line;
  renderAll();
}

function applyPrimaryOutcome(active) {
  if (pageConfig.id === "process") {
    active.action = "允许工序报工";
    active.result = "模拟测试台参数合格，已写入过程质量履历";
    active.next = "进入工序报工和 FQC 履历";
  } else if (pageConfig.id === "final") {
    active.action = "成品标签可打印 / WMS 可入库";
    active.result = "模拟 FQC 合格，标签和入库准入已放行";
    active.next = "成品标签打印并同步入库单";
  } else if (pageConfig.id === "defect") {
    active.action = "复判关闭，保留追溯记录";
    active.result = "模拟复判确认已关闭 NCR";
    active.next = "追溯保留，相关批次恢复准入";
  } else {
    active.action = "MRB 关闭并回写追溯";
    active.result = "模拟复检合格，返工记录已签核";
    active.next = "恢复 FQC 或派工准入";
  }
}

function applySecondaryOutcome(active) {
  if (pageConfig.id === "process") {
    active.action = "拦截工序报工并生成 NCR";
    active.result = "模拟参数超限，已触发质量异常";
    active.next = "进入不良记录和 MRB 评审";
  } else if (pageConfig.id === "final") {
    active.action = "冻结成品标签并转 MRB";
    active.result = "模拟 FQC 拦截，不允许入库";
    active.next = "进入返工评审并回写追溯";
  } else if (pageConfig.id === "defect") {
    active.action = "隔离批次并转 MRB";
    active.result = "模拟缺陷复判不合格，影响范围已隔离";
    active.next = "返工评审确认让步、报废或返工";
  } else {
    active.action = "下发返工路线和责任工位";
    active.result = "模拟 MRB 决定返工，等待现场执行回执";
    active.next = "返工工位执行后进入复检";
  }
}

function appendLog(text) {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text });
}

function simulatePrimary() {
  const value = $("#simulationInput").value.trim();
  const def = getDefinition();
  updateActiveStatus(def.primaryStatus, `${getActive().id} 已接收${def.primaryMessage}${value ? `：${value}` : ""}`);
  $("#simulationInput").value = "";
  showToast("模拟外部回执已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone([...(window.MES_BUSINESS_FLOW?.getQualityRows?.(pageConfig.id) || []), ...initialRows[pageConfig.id]]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true, openMenus: { quality: true } };
  logs = [];
  maintenanceRecords = [];
  $("#searchInput").value = "";
  $("#simulationInput").value = "";
  renderPageChrome();
  $("#statusFilter").value = "all";
  $("#lineFilter").value = "all";
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
  $("#resetQualityBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulatePrimary);
  $("#primaryActionBtn").addEventListener("click", simulatePrimary);
  $("#secondaryActionBtn").addEventListener("click", () => {
    const def = getDefinition();
    updateActiveStatus(def.secondaryStatus, `${getActive().id} 已登记${def.secondaryMessage}`);
    showToast("模拟处置已登记");
  });
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
  mergeFlowRows();
  loadState();
  renderFrameMenu();
  renderPageChrome();
  $("#searchInput").value = state.search;
  $("#statusFilter").value = state.status;
  $("#lineFilter").value = state.line;
  bindEvents();
  window.addEventListener("mes-flow:changed", () => {
    mergeFlowRows();
    renderPageChrome();
    renderAll();
  });
  renderAll();
}

init();
