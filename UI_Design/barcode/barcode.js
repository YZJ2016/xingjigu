const pageConfig = window.BARCODE_PAGE || { id: "batch", title: "生产批次", eyebrow: "条码与标签 / 生产批次" };
const STORAGE_KEY = `xingjigu_mes_barcode_${pageConfig.id}_v1`;

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

const barcodePages = {
  生产批次: "production-batches.html",
  产品序列号: "product-serials.html",
  物料标签: "material-labels.html",
  成品标签: "finished-labels.html",
  箱码托盘码: "box-pallet-codes.html",
  标签打印: "label-printing.html",
  补打申请: "reprint-requests.html",
};

const pageDefinitions = {
  batch: {
    subtitle: "派工单下达后生成生产批次号，绑定工单、工序、BOM、SOP 和后续 SN 范围",
    user: "条码管理员",
    metrics: ["批次档案", "待启用", "已下发", "冻结/作废"],
    columns: ["批次号", "工单 / 派工", "产品 / 工序", "编码规则", "数量 / SN 范围", "状态", "来源", "责任人"],
    tableTitle: "生产批次档案",
    tableHint: "批次号在开工前生成，后续扫码开工、投料、过程记录和追溯都引用该批次",
    cardTitle: "批次、SN 和追溯衔接",
    simulationTitle: "模拟派工批次下发回执",
    simulationHint: "模拟派工或工位终端接收批次号，不代表后台直接开工生产",
  },
  serial: {
    subtitle: "按生产批次生成 SN 范围，跟踪 SN 分配、绑定、作废、返工和追溯状态",
    user: "SN 管理员",
    metrics: ["SN 段", "已绑定", "待绑定", "作废/隔离"],
    columns: ["SN 段", "生产批次", "产品 / 工位", "数量", "绑定状态", "校验结果", "追溯引用", "责任人"],
    tableTitle: "产品序列号管理",
    tableHint: "SN 贯穿装配、测试、老化、FQC、包装和客户追溯",
    cardTitle: "SN、工位和质量证据",
    simulationTitle: "模拟工位 SN 扫码回执",
    simulationHint: "模拟扫码枪或工位 HMI 回传 SN 绑定结果，后台只记录校验和追溯状态",
  },
  material: {
    subtitle: "为来料批次、线边料盒和投料对象生成物料标签，服务投料防错和批次追溯",
    user: "物料标签员",
    metrics: ["物料标签", "待打印", "已签收", "冻结标签"],
    columns: ["标签号", "物料 / 批次", "工单 / 库位", "模板版本", "数量", "状态", "质量/库存来源", "责任人"],
    tableTitle: "物料标签与批次标识",
    tableHint: "物料标签来自 WMS/IQC/线边库，投料时校验料号、批次、有效期和冻结状态",
    cardTitle: "物料标签、防错和线边库",
    simulationTitle: "模拟 WMS / IQC 标签回传",
    simulationHint: "模拟 WMS、IQC 或 PDA 回传标签状态，不代表后台移动实物物料",
  },
  finished: {
    subtitle: "FQC 放行后生成成品批次标签和客户标签，连接成品入库与客户追溯",
    user: "成品标签员",
    metrics: ["成品标签", "待放行", "已打印", "客户模板"],
    columns: ["标签号", "成品批次", "产品 / 客户", "模板版本", "数量", "状态", "放行来源", "责任人"],
    tableTitle: "成品标签管理",
    tableHint: "成品标签必须引用质量放行、成品批次、箱码托盘码和客户标签规则",
    cardTitle: "质量放行、入库和客户标签",
    simulationTitle: "模拟 FQC / WMS 放行回执",
    simulationHint: "模拟质量或仓储系统回传标签放行状态，不替代真实贴标作业",
  },
  package: {
    subtitle: "包装时绑定 SN、箱码和托盘码，形成产品、箱、托、出货批次层级关系",
    user: "包装标签员",
    metrics: ["箱码", "托盘码", "待绑定", "异常绑定"],
    columns: ["包装码", "工单 / 批次", "绑定对象", "层级关系", "数量", "状态", "扫码来源", "责任人"],
    tableTitle: "箱码托盘码绑定",
    tableHint: "通过模拟包装扫码回执记录 SN 到箱、箱到托盘的层级绑定",
    cardTitle: "包装层级和出货追溯",
    simulationTitle: "模拟包装扫码绑定回执",
    simulationHint: "模拟扫码枪/PDA 回传箱码托盘码绑定，不代表后台直接完成实物包装",
  },
  printing: {
    subtitle: "集中监控打印任务、模板版本、打印机状态、首打记录和作废控制",
    user: "打印管理员",
    metrics: ["打印任务", "队列中", "已打印", "打印异常"],
    columns: ["打印任务", "标签类型", "模板 / 打印机", "对象编码", "份数", "状态", "首打/补打", "责任人"],
    tableTitle: "标签打印任务",
    tableHint: "打印只记录任务、模板、设备、时间戳和回执，现场贴标仍由工位或仓储执行",
    cardTitle: "模板、打印机和审计",
    simulationTitle: "模拟打印机任务回执",
    simulationHint: "模拟打印机或标签服务回传成功/失败状态，保留模板版本和操作者",
  },
  reprint: {
    subtitle: "补打必须有权限、原因、审批和原标签作废/关联记录，防止标签滥用",
    user: "标签审批员",
    metrics: ["补打申请", "待审批", "已批准", "已驳回"],
    columns: ["申请单", "原标签 / 对象", "补打原因", "审批状态", "新标签", "风险校验", "审计要求", "责任人"],
    tableTitle: "标签补打申请",
    tableHint: "补打申请联动权限、原因、审批、作废和打印审计",
    cardTitle: "补打权限和审计闭环",
    simulationTitle: "模拟审批 / 打印回执",
    simulationHint: "模拟审批人、打印机或标签服务回传，补打仍需保留原因和审计记录",
  },
};

const initialRows = {
  batch: [
    { id: "LOT-TCU100-20260620-001", order: "MO-202606-0001", dispatch: "D-001", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "SMT 贴片", codeType: "生产批次", template: "RULE-LOT-TCU-V3", qty: 800, range: "SN 000001-000800", status: "已下发", source: "派工单 D-001 + BOM V3.2", owner: "条码员 林澈", next: "产品序列号", risk: "开工扫码、投料和过程记录均引用该批次" },
    { id: "LOT-PCM60-20260620-002", order: "MO-202606-0005", dispatch: "D-052", line: "Line-B", product: "电源控制模块 PCM-60", operation: "备料确认", codeType: "生产批次", template: "RULE-LOT-PCM-V2", qty: 500, range: "SN 000001-000500", status: "待启用", source: "计划调整 PA-016", owner: "条码员 袁青", next: "等待齐套放行", risk: "电源芯片缺料，批次暂不下发工位" },
    { id: "LOT-GW240-20260620-003", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "整机装配", codeType: "生产批次", template: "RULE-LOT-GW-V4", qty: 600, range: "SN 000001-000600", status: "生产中", source: "任务下达 D-021", owner: "班组长 郑峰", next: "过程记录", risk: "SN 已开始绑定测试通道" },
    { id: "LOT-THS10-20260620-004", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "包装入库", codeType: "成品批次", template: "RULE-FG-THS-V1", qty: 1800, range: "FG 001-090", status: "待入库标签", source: "FQC 放行 QC-221", owner: "包装班长 李娟", next: "成品标签", risk: "需客户 I 标签模板" },
  ],
  serial: [
    { id: "SN-TCU100-000001-000800", order: "MO-202606-0001", dispatch: "D-001", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "SMT / DIP / 装配", codeType: "产品 SN", template: "RULE-SN-TCU-V5", qty: 800, range: "000001-000800", status: "部分绑定", source: "生产批次 LOT-TCU100-20260620-001", owner: "工位终端", next: "过程记录 / FQC", risk: "已绑定 428 个，待绑定 372 个" },
    { id: "SN-GW240-000001-000600", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "整机装配", codeType: "产品 SN", template: "RULE-SN-GW-V3", qty: 600, range: "000001-000600", status: "已绑定", source: "模拟工位扫码回执", owner: "班组长 郑峰", next: "老化测试", risk: "SN 与测试通道已关联" },
    { id: "SN-HMI100-000001-000320", order: "MO-202606-0012", dispatch: "D-121", line: "Line-B", product: "工业触控终端 HMI-100", operation: "首件检验", codeType: "产品 SN", template: "RULE-SN-HMI-V2", qty: 320, range: "000001-000320", status: "隔离", source: "首件尺寸待确认", owner: "质量员 孟可", next: "质量放行后启用", risk: "禁止流入包装" },
    { id: "SN-THS10-001481-001800", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "包装入库", codeType: "产品 SN", template: "RULE-SN-THS-V1", qty: 320, range: "001481-001800", status: "待包装绑定", source: "包装派工 D-111", owner: "包装班长 李娟", next: "箱码托盘码", risk: "尾批入库前需绑定箱码" },
  ],
  material: [
    { id: "ML-SEN-L20260605", order: "MO-202606-0001", dispatch: "D-001", line: "Line-A", product: "温度传感器", operation: "SMT 投料", codeType: "物料标签", template: "TPL-MAT-IQC-V4", qty: 620, range: "SEN-L20260605", status: "线边已签收", source: "WMS 出库 + IQC 合格", owner: "物料员 吴琳", next: "投料确认", risk: "低水位，预计 16:10 断料" },
    { id: "ML-RES10K-L20260604", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "10K 电阻卷料", operation: "SMT 贴片", codeType: "物料标签", template: "TPL-MAT-REEL-V2", qty: 4800, range: "RES10K-L20260604", status: "可投料", source: "模拟料站绑定回执", owner: "班组长 郑峰", next: "投料记录", risk: "同工序顺序投料" },
    { id: "ML-PWRIC-L20260602", order: "MO-202606-0005", dispatch: "D-052", line: "Line-B", product: "电源芯片", operation: "备料确认", codeType: "物料标签", template: "TPL-MAT-IQC-V4", qty: 740, range: "PWRIC-L20260602", status: "冻结标签", source: "IQC 冻结回执", owner: "质量员 孟可", next: "缺料预警", risk: "冻结标签不可投料" },
    { id: "ML-BOXI-L20260614", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "客户 I 包装盒", operation: "包装入库", codeType: "物料标签", template: "TPL-MAT-PACK-V1", qty: 1800, range: "BOXI-L20260614", status: "余料待退", source: "包装投料差异", owner: "包装班长 李娟", next: "余料退回", risk: "多领 30 件待核销" },
  ],
  finished: [
    { id: "FG-LBL-TCU100-001", order: "MO-202606-0001", dispatch: "D-041", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "FQC 放行", codeType: "成品标签", template: "TPL-FG-A-V6", qty: 428, range: "FG-TCU100-20260623-001", status: "待 FQC 放行", source: "FQC 抽检任务 QC-041", owner: "质量员 许宁", next: "成品入库", risk: "质量未放行前禁止打印客户标签" },
    { id: "FG-LBL-GW240-001", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "包装入库", codeType: "成品标签", template: "TPL-FG-B-V3", qty: 315, range: "FG-GW240-20260622-001", status: "已打印", source: "FQC 放行 QC-109", owner: "包装班长 郑峰", next: "箱码绑定", risk: "客户 B 标签版本已签收" },
    { id: "FG-LBL-THS10-001", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "包装入库", codeType: "成品标签", template: "TPL-FG-I-V1", qty: 1480, range: "FG-THS10-20260623-001", status: "客户模板待确认", source: "客户 I 标签要求", owner: "包装班长 李娟", next: "标签打印", risk: "模板审批未完成" },
    { id: "FG-LBL-HMI100-001", order: "MO-202606-0012", dispatch: "D-121", line: "Line-B", product: "工业触控终端 HMI-100", operation: "首件检验", codeType: "成品标签", template: "TPL-FG-J-V2", qty: 80, range: "FG-HMI100-20260621-001", status: "隔离", source: "首件尺寸待确认", owner: "质量员 孟可", next: "质量放行", risk: "禁止出标签" },
  ],
  package: [
    { id: "BOX-TCU100-20260623-001", order: "MO-202606-0001", dispatch: "D-041", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "包装入库", codeType: "箱码", template: "RULE-BOX-A-V5", qty: 20, range: "SN 000001-000020", status: "待绑定", source: "包装派工 D-041", owner: "包装员 叶晨", next: "托盘码 PALLET-001", risk: "等待 FQC 放行" },
    { id: "BOX-GW240-20260622-006", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "包装入库", codeType: "箱码", template: "RULE-BOX-B-V2", qty: 20, range: "SN 000101-000120", status: "已绑定", source: "模拟包装扫码回执", owner: "包装班长 郑峰", next: "PALLET-GW240-001", risk: "箱内 SN 与工单一致" },
    { id: "PALLET-GW240-20260622-001", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "成品入库", codeType: "托盘码", template: "RULE-PALLET-B-V2", qty: 10, range: "BOX 001-010", status: "已绑定", source: "模拟 PDA 托盘绑定", owner: "仓管员 谢然", next: "成品入库", risk: "托盘标签已打印" },
    { id: "BOX-THS10-20260623-074", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "包装入库", codeType: "箱码", template: "RULE-BOX-I-V1", qty: 20, range: "SN 001481-001500", status: "异常绑定", source: "模拟扫码枪回执", owner: "包装班长 李娟", next: "异常处置", risk: "SN 001492 未完成 FQC" },
  ],
  printing: [
    { id: "PRN-20260620-001", order: "MO-202606-0001", dispatch: "D-001", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "批次标签打印", codeType: "生产批次标签", template: "TPL-LOT-TCU-V3 / Zebra-A01", qty: 2, range: "LOT-TCU100-20260620-001", status: "已打印", source: "首次打印", owner: "条码员 林澈", next: "工位签收", risk: "首打记录已留痕" },
    { id: "PRN-20260620-002", order: "MO-202606-0001", dispatch: "D-001", line: "Line-A", product: "温度传感器", operation: "物料标签打印", codeType: "物料标签", template: "TPL-MAT-IQC-V4 / Zebra-M02", qty: 4, range: "SEN-L20260605", status: "队列中", source: "WMS 出库", owner: "物料员 吴琳", next: "线边签收", risk: "等待打印机空闲" },
    { id: "PRN-20260620-003", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "成品标签打印", codeType: "客户标签", template: "TPL-FG-I-V1 / Zebra-C03", qty: 90, range: "FG-THS10-20260623-001", status: "模板待审批", source: "客户 I 标签要求", owner: "包装班长 李娟", next: "补模板审批", risk: "禁止提前打印" },
    { id: "PRN-20260620-004", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "箱码打印", codeType: "箱码托盘码", template: "TPL-BOX-B-V2 / Zebra-B01", qty: 16, range: "BOX-GW240-006", status: "打印异常", source: "模拟打印机回执", owner: "打印管理员 戴然", next: "重新排队", risk: "碳带不足" },
  ],
  reprint: [
    { id: "RP-20260620-001", order: "MO-202606-0001", dispatch: "D-041", line: "Line-A", product: "智能温控控制器 TCU-100", operation: "成品标签补打", codeType: "补打申请", template: "TPL-FG-A-V6", qty: 1, range: "FG-LBL-TCU100-001", status: "待审批", source: "标签破损", owner: "生产经理 陈", next: "审批后打印", risk: "需作废原标签并保留原因" },
    { id: "RP-20260620-002", order: "MO-202606-0002", dispatch: "D-021", line: "Line-B", product: "工业网关 GW-240", operation: "箱码补打", codeType: "补打申请", template: "TPL-BOX-B-V2", qty: 1, range: "BOX-GW240-006", status: "已批准", source: "打印机断纸", owner: "包装主管 韩越", next: "标签打印", risk: "原打印任务 PRN-004 已关联" },
    { id: "RP-20260620-003", order: "MO-202606-0011", dispatch: "D-111", line: "Line-C", product: "温湿度采集器 THS-10", operation: "客户标签补打", codeType: "补打申请", template: "TPL-FG-I-V1", qty: 10, range: "FG-THS10-20260623-001", status: "已驳回", source: "原因不充分", owner: "质量经理 孟可", next: "补充原因", risk: "客户模板未审批" },
    { id: "RP-20260620-004", order: "MO-202606-0005", dispatch: "D-052", line: "Line-B", product: "电源控制模块 PCM-60", operation: "物料标签补打", codeType: "补打申请", template: "TPL-MAT-IQC-V4", qty: 2, range: "PWRIC-L20260602", status: "权限拦截", source: "冻结批次", owner: "质量员 孟可", next: "冻结解除后申请", risk: "冻结标签禁止补打" },
  ],
};

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];
const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#barcodeModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "barcode" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "barcode" && item === pageConfig.title ? " class=\"is-active\"" : "";
      return `<a href="#${module.id}-${index}"${active} data-module="${module.id}" data-entry="${item}">${item}</a>`;
    }).join("");
    return `
      <section class="module-group${openClass}">
        <button class="module-button" type="button" data-module="${module.id}">
          <span class="module-icon" style="background:${module.color}">${module.mark}</span>
          <span><span class="module-title">${module.title}</span><span class="module-layer">${module.layer}</span></span>
          <span class="chevron">›</span>
        </button>
        <div class="submenu">${submenu}</div>
      </section>
    `;
  }).join("");

  $("#barcodeModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#barcodeModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
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
  else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
  else if (moduleId === "station" && entry === "扫码开工") window.location.href = "../station/scan-start.html";
  else if (moduleId === "station" && entry === "工艺指导") window.location.href = "../station/work-instruction.html";
  else if (moduleId === "station" && entry === "投料确认") window.location.href = "../station/feeding-confirmation.html";
  else if (moduleId === "station" && entry === "过程记录") window.location.href = "../station/process-record.html";
  else if (moduleId === "station" && entry === "工序报工") window.location.href = "../station/operation-report.html";
  else if (moduleId === "station" && entry === "交接班") window.location.href = "../station/shift-handover.html";
  else if (moduleId === "materials" && entry === "用料需求") window.location.href = "../materials/material-requirements.html";
  else if (moduleId === "materials" && entry === "领料申请") window.location.href = "../materials/picking-requests.html";
  else if (moduleId === "materials" && entry === "配送进度") window.location.href = "../materials/delivery-progress.html";
  else if (moduleId === "materials" && entry === "线边库存") window.location.href = "../materials/line-side-inventory.html";
  else if (moduleId === "materials" && entry === "投料记录") window.location.href = "../materials/feeding-records.html";
  else if (moduleId === "materials" && entry === "余料退回") window.location.href = "../materials/return-materials.html";
  else if (moduleId === "materials" && entry === "缺料预警") window.location.href = "../materials/shortage-alerts.html";
  else if (moduleId === "barcode" && barcodePages[entry]) window.location.href = `./${barcodePages[entry]}`;
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
    const text = `${item.id} ${item.order} ${item.dispatch} ${item.line} ${item.product} ${item.operation} ${item.codeType} ${item.template} ${item.range} ${item.status} ${item.source} ${item.owner} ${item.risk}`.toLowerCase();
    return (!keyword || text.includes(keyword)) && (state.status === "all" || item.status === state.status) && (state.line === "all" || item.line === state.line);
  });
}

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(status) {
  if (/异常|冻结|作废|隔离|拦截|驳回|失败/.test(status)) return "red";
  if (/待|队列|审批|模板|部分|权限/.test(status)) return "orange";
  if (/已|生产中|可/.test(status)) return "green";
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
  $("#cardTitle").textContent = def.cardTitle;
  $("#simulationTitle").textContent = def.simulationTitle;
  $("#simulationHint").textContent = def.simulationHint;
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "标签号"} / ${rows[0]?.range || "编码范围"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /待|队列|部分|审批|模板/.test(item.status)).length,
    visible.filter((item) => /已|生产中/.test(item.status)).length,
    visible.filter((item) => /异常|冻结|作废|隔离|拦截|驳回|失败|权限/.test(item.status)).length,
  ];
  $("#barcodeMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "需审批、作废或异常闭环" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderTable() {
  const visible = getVisibleRows();
  $("#barcodeTableBody").innerHTML = visible.length ? visible.map((item) => {
    return `
      <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
        ${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}
      </tr>
    `;
  }).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#barcodeTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function buildCells(item) {
  if (pageConfig.id === "batch") return [item.id, twoLine(item.order, item.dispatch), twoLine(item.product, item.operation), item.template, `${item.qty} / ${item.range}`, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "serial") return [item.id, item.source.replace("生产批次 ", ""), twoLine(item.product, item.operation), item.qty, pill(item.status), item.risk, item.next, item.owner];
  if (pageConfig.id === "material") return [item.id, twoLine(item.product, item.range), twoLine(item.order, item.operation), item.template, item.qty, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "finished") return [item.id, item.range, twoLine(item.product, item.order), item.template, item.qty, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "package") return [item.id, twoLine(item.order, item.range), item.product, item.codeType, item.qty, pill(item.status), item.source, item.owner];
  if (pageConfig.id === "printing") return [item.id, item.codeType, twoLine(item.template, item.operation), item.range, item.qty, pill(item.status), item.source, item.owner];
  return [item.id, twoLine(item.range, item.product), item.source, pill(item.status), item.next, item.risk, "原因/审批/作废留痕", item.owner];
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
    ["编码来源", active.source, "保留派工、质量、WMS、包装或审批来源"],
    ["现场边界", getBoundaryText(), "后台记录规则、回执、校验和审计"],
    ["下游衔接", active.next, "继续传递给开工、投料、包装、入库或追溯"],
  ];
  $("#barcodeCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="barcode-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  if (pageConfig.id === "printing") return "打印机或标签服务产生模拟任务回执";
  if (pageConfig.id === "reprint") return "审批人、打印机和标签服务产生模拟补打回执";
  if (["serial", "package"].includes(pageConfig.id)) return "扫码枪、PDA 或工位 HMI 产生模拟扫码回执";
  if (["material", "finished"].includes(pageConfig.id)) return "WMS、IQC、FQC 或仓储系统产生模拟标签回执";
  return "派工、编码规则和工位终端产生模拟下发回执";
}

function renderDetail() {
  const active = getActive();
  $("#barcodeDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.dispatch} · ${active.operation}`;
  $("#detailKv").innerHTML = [
    ["对象编码", `${active.codeType} · ${active.range}`],
    ["产品工序", `${active.product} · ${active.operation}`],
    ["模板规则", active.template],
    ["数量", `${active.qty}`],
    ["责任人", active.owner],
    ["风险说明", active.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = buildTimeline(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderLogs();
}

function buildTimeline(active) {
  return [
    ["规则生成", active.template],
    ["来源单据", active.source],
    ["状态时间", `${active.status} · 当前演示时点`],
    ["追溯占位", `${active.order} / ${active.dispatch} / ${active.id}`],
  ];
}

function buildActions(active) {
  const rows = [
    ["上游联动", pageConfig.id === "batch" ? "派工单、BOM、编码规则" : "批次、SN、质量放行、WMS 或包装回执"],
    ["校验要求", active.risk],
    ["下游结果", active.next],
  ];
  if (pageConfig.id === "reprint") rows.push(["补打审计", "权限、原因、审批、新旧标签关系和作废记录必须留痕"]);
  if (pageConfig.id === "printing") rows.push(["打印审计", "首打、补打、作废、打印机回执和模板版本必须留痕"]);
  if (pageConfig.id === "package") rows.push(["层级追溯", "SN 绑定箱码，箱码绑定托盘码，托盘码绑定出货批次"]);
  return rows;
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong></div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟回执或人工处置记录</strong></div>`;
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderCards();
  renderDetail();
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  if (pageConfig.id === "batch" && status.includes("下发")) active.next = "产品序列号";
  if (pageConfig.id === "serial" && status.includes("绑定")) active.next = "过程记录 / FQC";
  if (pageConfig.id === "material" && status.includes("签收")) active.next = "投料确认";
  if (pageConfig.id === "finished" && status.includes("打印")) active.next = "成品入库";
  if (pageConfig.id === "package" && status.includes("绑定")) active.next = "成品入库 / 出货追溯";
  if (pageConfig.id === "printing" && status.includes("打印")) active.next = "现场签收 / 贴标";
  if (pageConfig.id === "reprint" && status.includes("批准")) active.next = "标签打印";
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderAll();
}

function appendLog(text) {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text });
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  const statusMap = {
    batch: "已下发",
    serial: "已绑定",
    material: "线边已签收",
    finished: "已打印",
    package: "已绑定",
    printing: "已打印",
    reprint: "已批准",
  };
  updateActiveStatus(statusMap[pageConfig.id], `${getActive().id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟回执已记录");
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
  $("#resetBarcodeBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", () => simulateStatus());
  $("#secondaryActionBtn").addEventListener("click", () => {
    updateActiveStatus(pageConfig.id === "reprint" ? "权限拦截" : "作废待审", `${getActive().id} 已登记标签异常处置，等待责任人闭环`);
    showToast("异常处置已登记");
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
