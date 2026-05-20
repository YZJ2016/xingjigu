const pageConfig = window.REPORT_PAGE || { id: "daily", title: "生产日报", eyebrow: "报表与看板 / 生产日报" };
const STORAGE_KEY = `xingjigu_mes_reports_${pageConfig.id}_v2`;

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

const reportPages = {
  生产日报: "production-daily.html",
  良率分析: "yield-analysis.html",
  交付达成: "delivery-attainment.html",
  设备效率: "equipment-efficiency.html",
  停机损失: "downtime-loss.html",
  物料损耗: "material-loss.html",
  管理驾驶舱: "management-cockpit.html",
};

const pageDefinitions = {
  daily: {
    subtitle: "生产经理和计划员按日查看订单、派工、报工、异常、入库和同步口径，确认日报能否对外发布给 BI 与经营层",
    user: "生产经理",
    metricLabels: ["日报状态", "计划完成", "报工回传", "异常未闭环"],
    columns: ["日报对象", "产线 / 班次", "数据来源", "计划 / 完成", "质量 / OEE", "异常与缺口", "发布状态", "责任人"],
    tableTitle: "生产日报发布清单",
    tableHint: "日报汇聚 ERP 工单、MES 报工、质量放行、设备状态和 WMS 入库，不替代现场报工动作",
    insightTitle: "日报口径、缺口和追溯引用",
    simulationTitle: "模拟 BI 拉取日报快照",
    simulationHint: "模拟外部 BI 或管理驾驶舱读取 MES 日报，不表示后台直接改写生产实绩",
  },
  yield: {
    subtitle: "质量工程师按产品、工序和批次分析良率，串联 IQC、首件、IPQC、过程检验、FQC 和 NCR 闭环",
    user: "质量工程师",
    metricLabels: ["综合良率", "首件通过", "过程拦截", "NCR 未闭环"],
    columns: ["分析对象", "工序 / 批次", "数据来源", "投入 / 良品", "不良代码", "良率", "处置状态", "责任人"],
    tableTitle: "良率分析明细",
    tableHint: "质量结果来自检验任务、过程参数、报工和追溯记录，可下钻不良与返工评审",
    insightTitle: "良率波动、责任工序和质量闭环",
    simulationTitle: "模拟 QMS / 检验终端回传复判结果",
    simulationHint: "模拟外部质量复判或检验终端回执，后台只更新分析口径和闭环状态",
  },
  delivery: {
    subtitle: "计划主管按客户订单监控交付达成，串联 ERP 交期、MES 完工、WMS 入库和未闭环风险",
    user: "计划主管",
    metricLabels: ["OTD", "准时订单", "延期风险", "已入库待同步"],
    columns: ["客户订单", "生产订单", "ERP 交期", "MES 完工", "WMS 入库", "风险原因", "达成状态", "责任人"],
    tableTitle: "交付达成跟踪",
    tableHint: "交付口径以 ERP 交期为目标，以 MES 完工与 WMS 入库回执作为事实来源",
    insightTitle: "交付风险、处置建议和计划联动",
    simulationTitle: "模拟 ERP / WMS 交付回执",
    simulationHint: "模拟 ERP 出货计划或 WMS 入库回执，不表示后台直接发货或入库",
  },
  equipment: {
    subtitle: "设备主管按产线、设备和班次拆解 OEE 三分项，联动停机记录、维修历史、质量结果和 TPM 改善",
    user: "设备主管",
    metricLabels: ["综合 OEE", "可用率", "性能率", "质量率"],
    columns: ["设备 / 班次", "产线 / 工序", "状态来源", "计划 / 停机", "产量表现", "OEE 三分项", "改善闭环", "责任人"],
    tableTitle: "设备效率报表",
    tableHint: "报表从设备状态日志、报工产量和质量结果聚合，可跳转设备 TPM 页面继续处置",
    insightTitle: "OEE 影响项和 TPM 改善建议",
    simulationTitle: "模拟 OEE 报表重算",
    simulationHint: "模拟状态日志、产量和质量结果重新聚合，不代表后台直接修改设备实绩",
  },
  downtime: {
    subtitle: "车间主任和设备员按原因代码分析停机损失，区分 PLC 事实、班组补录、维修归因和计划重排影响",
    user: "车间主任",
    metricLabels: ["停机损失", "待归因", "重复故障", "影响订单"],
    columns: ["停机原因", "设备 / 工单", "停机来源", "时长 / 损失", "OEE 扣减", "归因状态", "改善动作", "责任人"],
    tableTitle: "停机损失归因",
    tableHint: "停机事实来自 PLC/SCADA，原因归因需班组、设备和维修共同确认后进入复盘",
    insightTitle: "停机 TOP、损失换算和复盘闭环",
    simulationTitle: "模拟 PLC 停机日志补传",
    simulationHint: "模拟设备状态日志或班组 HMI 补录，不表示后台直接控制设备启停",
  },
  material: {
    subtitle: "物料员和成本会计按 BOM、投料、防错、余料退回和 WMS 回执分析用料差异与损耗归因",
    user: "物料成本员",
    metricLabels: ["损耗率", "超耗工单", "待核销", "追溯缺口"],
    columns: ["物料 / 批次", "生产订单", "BOM 标准", "实际投料", "余料 / 报废", "损耗差异", "核销状态", "责任人"],
    tableTitle: "物料损耗分析",
    tableHint: "实际消耗来自投料确认、报工核销、余料退回和 WMS 出入库，支撑成本和追溯",
    insightTitle: "超耗原因、批次追溯和核销闭环",
    simulationTitle: "模拟 WMS / 电子秤核销回执",
    simulationHint: "模拟 WMS、PDA 或电子秤回传余料与报废，不表示后台直接执行仓储作业",
  },
  cockpit: {
    subtitle: "厂长和运营负责人跨订单、质量、设备、物料、异常和交付查看经营驾驶舱，定位需要当日协调的管理动作",
    user: "运营负责人",
    metricLabels: ["综合达成", "交付风险", "质量损失", "设备瓶颈"],
    columns: ["经营主题", "范围 / 对象", "可信来源", "当前值", "目标 / 阈值", "风险解释", "管理动作", "责任人"],
    tableTitle: "管理驾驶舱指标池",
    tableHint: "驾驶舱仅展示 MES 已校验的生产事实和风险，不替代各现场终端执行动作",
    insightTitle: "管理关注、跨部门协同和复盘入口",
    simulationTitle: "模拟经营驾驶舱刷新",
    simulationHint: "模拟 BI 驾驶舱读取 MES 聚合指标，不表示后台直接调整计划、质量或设备结果",
  },
};

const initialRows = {
  daily: [
    { id: "DAY-20260620-A", name: "Line-A 白班生产日报", line: "Line-A", shift: "白班", order: "MO-202606-0001 / MO-202606-0004", source: "ERP 工单 + MES 报工 + WMS 入库", plan: "计划 1,420 / 完成 1,188", quality: "良率 98.6% / OEE 86.4%", status: "待发布", statusStyle: "orange", risk: "温度传感器缺料 200 件", owner: "生产经理 陈伟", updated: "2026-06-20 17:42", trace: "日报快照 RPT-DAY-A-0620", next: "缺料事项关闭后发布" },
    { id: "DAY-20260620-B", name: "Line-B 白班生产日报", line: "Line-B", shift: "白班", order: "MO-202606-0002 / MO-202606-0012", source: "MES 报工 + 测试台 API + FQC", plan: "计划 920 / 完成 395", quality: "良率 97.1% / OEE 82.3%", status: "需复核", statusStyle: "red", risk: "测试台 B2 故障未完成归因", owner: "车间主任 李航", updated: "2026-06-20 17:36", trace: "异常 EX-EQ-0203", next: "维修验收后重算日报" },
    { id: "DAY-20260620-C", name: "Line-C 白班生产日报", line: "Line-C", shift: "白班", order: "MO-202606-0003 / MO-202606-0011", source: "SCADA + MES 报工 + 包装回执", plan: "计划 1,600 / 完成 1,404", quality: "良率 99.1% / OEE 88.2%", status: "可发布", statusStyle: "green", risk: "老化房 16:40 可能排队", owner: "生产主管 吴敏", updated: "2026-06-20 17:45", trace: "oee_daily / 包装履历", next: "同步管理驾驶舱" },
    { id: "DAY-20260620-N", name: "夜班交接日报准备", line: "全部产线", shift: "夜班", order: "MO-202606-0010 / MO-202606-0005", source: "排程计划 + 未闭环风险", plan: "计划 740 / 待开工", quality: "待首件 / 设备待确认", status: "待生成", statusStyle: "blue", risk: "交期压缩与关键料未齐套", owner: "夜班主管 胡青", updated: "2026-06-20 18:00", trace: "班次交接 SH-0620-N", next: "夜班开工检查" },
  ],
  yield: [
    { id: "YLD-TCU-FAI", name: "TCU-100 首件与过程良率", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "FAI + IPQC + FQC", plan: "投入 428 / 良品 422", quality: "不良 6 / 良率 98.6%", status: "观察", statusStyle: "orange", risk: "焊点虚焊 3 件集中在 DIP", owner: "质量工程师 赵颖", updated: "2026-06-20 16:58", trace: "NCR-QA-0620-01", next: "DIP 工位参数复核" },
    { id: "YLD-GW-TEST", name: "GW-240 功能测试良率", line: "Line-B", shift: "白班", order: "MO-202606-0002", source: "测试台 API + FQC", plan: "投入 315 / 良品 306", quality: "通信失败 7 / 良率 97.1%", status: "NCR 未闭环", statusStyle: "red", risk: "测试台故障与产品不良需区分", owner: "质量主管 周雅", updated: "2026-06-20 16:44", trace: "TEST-B2 / NCR-QA-0620-04", next: "复判后关闭或转返工" },
    { id: "YLD-ECU-AGING", name: "ECU-80 老化测试良率", line: "Line-C", shift: "白班", order: "MO-202606-0003", source: "老化房 SCADA + FQC", plan: "投入 760 / 良品 753", quality: "温漂 5 / 良率 99.1%", status: "可放行", statusStyle: "green", risk: "温区偏差需设备校准", owner: "质量工程师 何思", updated: "2026-06-20 17:12", trace: "aging_batch AG-0620-C", next: "设备履历引用" },
    { id: "YLD-HMI-FAI", name: "HMI-100 首件尺寸复判", line: "Line-B", shift: "白班", order: "MO-202606-0012", source: "首件检验 + 工艺规格", plan: "投入 80 / 待放行", quality: "尺寸项待判定", status: "拦截", statusStyle: "red", risk: "未放行不可批量生产", owner: "质量员 孙琳", updated: "2026-06-20 15:50", trace: "FAI-HMI-0620", next: "MRB 评审或工艺修正" },
  ],
  delivery: [
    { id: "DEL-A-TCU", name: "A 客户 TCU-100 交付", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "ERP 交期 + MES 完工 + WMS 入库", plan: "交期 2026-06-30 / 完成 428", quality: "FQC 放行 422 / 入库 0", status: "有风险", statusStyle: "orange", risk: "关键料第二批未到货", owner: "计划员 林溪", updated: "2026-06-20 17:40", trace: "齐套检查 KIT-0001", next: "采购到货后重排尾批" },
    { id: "DEL-B-GW", name: "B 客户 GW-240 交付", line: "Line-B", shift: "白班", order: "MO-202606-0002", source: "ERP 订单 + MES 测试进度", plan: "交期 2026-06-28 / 完成 315", quality: "测试排队 2 小时", status: "延期预警", statusStyle: "red", risk: "测试台 B2 故障影响瓶颈", owner: "计划主管 蒋锐", updated: "2026-06-20 17:28", trace: "交期预警 DW-240620-02", next: "协调备用测试台" },
    { id: "DEL-B-SRV", name: "B 客户 SRV-90 当日交付", line: "Line-A", shift: "白班", order: "MO-202606-0010", source: "ERP 交付计划 + 包装回执", plan: "交期 2026-06-26 / 完成 260", quality: "待 FQC 尾批", status: "紧急", statusStyle: "red", risk: "当天出货窗口 19:00", owner: "计划员 程诺", updated: "2026-06-20 17:30", trace: "客户出货计划 SO-B-0626", next: "优先 FQC 与包装" },
    { id: "DEL-I-THS", name: "I 客户 THS-10 交付", line: "Line-C", shift: "白班", order: "MO-202606-0011", source: "MES 包装 + WMS 入库", plan: "交期 2026-07-08 / 完成 1480", quality: "FQC 已放行", status: "准时", statusStyle: "green", risk: "尾批包装等待箱码绑定", owner: "仓储主管 王宁", updated: "2026-06-20 17:35", trace: "包装层级 PKG-C-111", next: "WMS 入库回执" },
  ],
  equipment: [
    { id: "RPT-OEE-SMT01", name: "SMT 贴片机 1 白班 OEE", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "PLC 状态 + 报工产量 + FQC", plan: "计划 480 / 停机 28 分钟", quality: "A 94.2% / P 92.8% / Q 98.7%", status: "OEE 86.4%", statusStyle: "green", risk: "供料器短停影响性能率", owner: "设备主管 袁立", updated: "2026-06-20 17:20", trace: "oee_daily SMT-01", next: "点检复核供料器" },
    { id: "RPT-OEE-DIPA1", name: "DIP 波峰焊线 OEE", line: "Line-A", shift: "白班", order: "MO-202606-0004", source: "PLC 停机 + 维修工单", plan: "计划 420 / 停机 47 分钟", quality: "A 88.9% / P 91.6% / Q 98.1%", status: "OEE 79.8%", statusStyle: "orange", risk: "喷雾阀故障重复出现", owner: "设备员 周诚", updated: "2026-06-20 17:18", trace: "DT-240620-01", next: "预防保养升级" },
    { id: "RPT-OEE-TESTB2", name: "功能测试台 B2 OEE", line: "Line-B", shift: "白班", order: "MO-202606-0002", source: "测试台 API + 停机归因", plan: "计划 390 / 停机 72 分钟", quality: "A 74.8% / P 86.0% / Q 97.2%", status: "OEE 62.5%", statusStyle: "red", risk: "通信故障拉低可用率", owner: "维修员 吴启", updated: "2026-06-20 17:02", trace: "MR-240620-03", next: "维修验收后重算" },
    { id: "RPT-OEE-AGING", name: "老化房 1 瓶颈效率", line: "Line-C", shift: "白班", order: "MO-202606-0003", source: "SCADA + 通道占用", plan: "计划 480 / 停机 12 分钟", quality: "A 96.8% / P 92.0% / Q 99.0%", status: "OEE 88.2%", statusStyle: "green", risk: "通道占用 92%，排队风险", owner: "设备主管 袁立", updated: "2026-06-20 17:24", trace: "aging_channel_log", next: "APS 瓶颈预警" },
  ],
  downtime: [
    { id: "LOSS-DIP-VALVE", name: "喷雾阀堵塞停机损失", line: "Line-A", shift: "白班", order: "MO-202606-0004", source: "PLC 状态日志 + 维修验收", plan: "停机 25 分钟 / 损失 42 台", quality: "OEE 扣减 5.9%", status: "已归因", statusStyle: "green", risk: "重复故障需预防保养升级", owner: "设备员 周诚", updated: "2026-06-20 15:10", trace: "MR-240620-01", next: "复盘经验归档" },
    { id: "LOSS-TEST-COMM", name: "测试台通信故障损失", line: "Line-B", shift: "白班", order: "MO-202606-0002", source: "测试台 API + 报警 ALM-204", plan: "停机 18 分钟 / 排队 2 小时", quality: "OEE 扣减 12.3%", status: "待归因", statusStyle: "red", risk: "需区分设备故障与产品测试失败", owner: "维修员 吴启", updated: "2026-06-20 16:20", trace: "EX-EQ-0203", next: "维修完成后归因" },
    { id: "LOSS-SMT-MATERIAL", name: "SMT 换料等待损失", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "班组 HMI 模拟补录", plan: "停机 7 分钟 / 损失 30 片", quality: "OEE 扣减 1.5%", status: "待复核", statusStyle: "orange", risk: "原因代码需设备员复核", owner: "班组长 郑峰", updated: "2026-06-20 10:22", trace: "DT-240620-03", next: "复核是否计入物料等待" },
    { id: "LOSS-AGING-CBM", name: "老化房温控校准计划停机", line: "Line-C", shift: "白班", order: "MO-202606-0003", source: "保养计划 + SCADA", plan: "计划停机 60 分钟", quality: "APS 已扣产能", status: "计划停机", statusStyle: "blue", risk: "若延误影响 ECU-80 老化排队", owner: "保养员 梁溪", updated: "2026-06-20 17:00", trace: "PM-20260620-03", next: "验收后恢复产能" },
  ],
  material: [
    { id: "MAT-SEN-L20260605", name: "温度传感器批次损耗", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "BOM + 投料确认 + 线边库", plan: "标准 428 / 实投 432", quality: "报废 3 / 余料 1", status: "待核销", statusStyle: "orange", risk: "缺料 200 件同时影响尾批", owner: "物料员 高宁", updated: "2026-06-20 16:40", trace: "投料记录 FEED-0001", next: "余料退回后核销" },
    { id: "MAT-PCBA-GW240", name: "GW-240 主板批次差异", line: "Line-B", shift: "白班", order: "MO-202606-0002", source: "扫码投料 + 不良隔离", plan: "标准 315 / 实投 318", quality: "隔离 7 / 返工 2", status: "超耗预警", statusStyle: "red", risk: "通信失败需确认是否物料批次相关", owner: "质量物料专员 罗文", updated: "2026-06-20 16:55", trace: "NCR-QA-0620-04", next: "批次追溯圈定影响范围" },
    { id: "MAT-PACK-THS", name: "THS-10 包材损耗", line: "Line-C", shift: "白班", order: "MO-202606-0011", source: "包装作业 + WMS 出库", plan: "标准 1480 / 实耗 1492", quality: "破损 8 / 余料 4", status: "可核销", statusStyle: "green", risk: "包装箱破损已拍照留证", owner: "仓储员 田悦", updated: "2026-06-20 17:10", trace: "PKG-C-111", next: "成本归集" },
    { id: "MAT-FEEDER-SMT", name: "SMT 供料器损耗关联", line: "Line-A", shift: "白班", order: "MO-202606-0001", source: "设备点检 + 投料记录", plan: "标准损耗 0.5% / 当前 0.9%", quality: "抛料偏高", status: "待改善", statusStyle: "orange", risk: "供料器振动可能导致抛料", owner: "设备员 周诚", updated: "2026-06-20 17:05", trace: "IP-20260620-01", next: "设备点检复核" },
  ],
  cockpit: [
    { id: "CKP-DELIVERY", name: "交付达成经营主题", line: "全部产线", shift: "白班", order: "重点客户 A/B/I", source: "ERP 订单 + MES 完工 + WMS 入库", plan: "OTD 91.6% / 目标 95%", quality: "延期风险 3 单", status: "需协调", statusStyle: "red", risk: "测试瓶颈与关键料未齐套", owner: "运营负责人 许航", updated: "2026-06-20 18:00", trace: "管理驾驶舱快照 CKP-0620", next: "计划、设备、物料联合处置" },
    { id: "CKP-QUALITY", name: "质量损失经营主题", line: "全部产线", shift: "白班", order: "TCU-100 / GW-240 / HMI-100", source: "FAI + IPQC + FQC + NCR", plan: "综合良率 98.2% / 目标 98.8%", quality: "NCR 未闭环 2 项", status: "观察", statusStyle: "orange", risk: "测试失败与首件尺寸待复判", owner: "质量负责人 周雅", updated: "2026-06-20 17:55", trace: "质量日报 QA-0620", next: "MRB 与返工评审" },
    { id: "CKP-EQUIPMENT", name: "设备瓶颈经营主题", line: "Line-B / Line-C", shift: "白班", order: "MO-202606-0002 / MO-202606-0003", source: "PLC + 维修 + OEE", plan: "OEE 84.1% / 目标 86%", quality: "停机损失 112 分钟", status: "瓶颈", statusStyle: "red", risk: "测试台 B2 与老化房通道占用", owner: "设备负责人 袁立", updated: "2026-06-20 17:50", trace: "OEE-0620", next: "维修验收与瓶颈排程" },
    { id: "CKP-MATERIAL", name: "物料损耗经营主题", line: "Line-A / Line-B", shift: "白班", order: "MO-202606-0001 / MO-202606-0002", source: "BOM + 投料 + WMS", plan: "损耗率 0.82% / 目标 0.6%", quality: "超耗工单 2 单", status: "待核销", statusStyle: "orange", risk: "缺料与不良隔离共同影响成本", owner: "物料成本员 高宁", updated: "2026-06-20 17:46", trace: "MAT-0620", next: "余料退回与批次追溯" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.reports || {});

let rows = structuredClone(initialRows[pageConfig.id]).map(normalizeFlowReportRow);
let state = { activeId: rows[0]?.id || "", search: "", line: "all", shift: "all", status: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function hydrateRowsFromBusinessFlow() {
  const flowRows = window.MES_BUSINESS_FLOW?.getReportRows?.(pageConfig.id) || [];
  if (!flowRows.length) return;
  const existing = new Set(rows.map((row) => row.id));
  rows = [...flowRows.filter((row) => !existing.has(row.id)).map(normalizeFlowReportRow), ...rows];
}

function normalizeFlowReportRow(row) {
  const now = new Date().toLocaleString("zh-CN", { hour12: false });
  return {
    ...row,
    name: row.name || row.title || "业务流派生报表项",
    line: row.line || "全部产线",
    shift: row.shift || "白班",
    order: row.order || row.orderId || "关联订单待同步",
    source: row.source || "MES_BUSINESS_FLOW",
    plan: row.plan || row.value || "计划/完成口径待复核",
    quality: row.quality || row.metric || "质量/OEE 口径待复核",
    status: row.status || "待复核",
    statusStyle: row.statusStyle || "orange",
    risk: row.risk || row.impact || "风险摘要待复核",
    owner: row.owner || "报表复核员",
    updated: row.updated || row.time || now,
    trace: row.trace || row.id || "业务流事件",
    next: row.next || row.action || "等待复核发布",
  };
}

function renderAppShell() {
  $("#reportsApp").innerHTML = `
    <header class="topbar">
      <div>
        <div class="eyebrow">${pageConfig.eyebrow}</div>
        <h1>${pageConfig.title}</h1>
        <p>${getDefinition().subtitle}</p>
      </div>
      <div class="topbar-actions">
        <button id="simulateTopBtn" class="primary-action" type="button">${getReportGovernanceAction().primary}</button>
        <button id="resetReportsBtn" class="secondary-action" type="button">重置演示</button>
        <a class="secondary-link" href="./management-cockpit.html">管理驾驶舱</a>
        <a class="secondary-link" href="../index.html">返回首页</a>
        <div class="user-chip"><span class="avatar">表</span><span>${getDefinition().user}</span></div>
      </div>
    </header>
    <section class="reports-toolbar" aria-label="报表筛选">
      <label>搜索<input id="searchInput" type="search" placeholder="订单、产线、责任人、异常、追溯编号" /></label>
      <label>产线<select id="lineFilter"></select></label>
      <label>班次<select id="shiftFilter"></select></label>
      <label>状态<select id="statusFilter"></select></label>
    </section>
    <section id="reportsKpis" class="reports-kpis"></section>
    <section class="reports-layout">
      <div class="reports-left">
        <section class="reports-panel">
          <div class="reports-panel__head">
            <div><h3>${getDefinition().tableTitle}</h3><p>${getDefinition().tableHint}</p></div>
            <button id="openDetailBtn" type="button" hidden>打开详情</button>
          </div>
          <div class="reports-table-wrap">
            <table class="reports-table">
              <thead id="tableHead"></thead>
              <tbody id="tableBody"></tbody>
            </table>
          </div>
        </section>
        <section class="reports-panel">
          <div class="reports-panel__head">
            <div><h3>${getDefinition().insightTitle}</h3><p>保留来源系统、责任人、时间戳、追溯引用和下一步闭环入口</p></div>
          </div>
          <div id="insightList" class="reports-insights"></div>
        </section>
        <section class="reports-simulation">
          <div class="reports-simulation__head">
            <div><h3>${getDefinition().simulationTitle}</h3><p>${getDefinition().simulationHint}</p></div>
          </div>
          <div class="reports-simulation__form">
            <input id="simulationInput" type="text" />
            <button id="simulateBtn" type="button">记录模拟回执</button>
            <button id="secondaryActionBtn" type="button">${getReportGovernanceAction().secondary}</button>
          </div>
        </section>
      </div>
      <aside class="reports-side">
        <section id="detailPanel" class="reports-detail" aria-hidden="false">
          <div class="reports-detail__head">
            <div><span id="detailStatus" class="pill"></span><h3 id="detailTitle"></h3><p id="detailSubtitle"></p></div>
            <button id="closeDetailBtn" class="icon-button" type="button" aria-label="关闭详情">×</button>
          </div>
          <div id="detailKv" class="reports-kv"></div>
        </section>
        <section class="reports-detail"><h3>口径履历</h3><div id="timelineList" class="reports-timeline"></div></section>
        <section class="reports-detail"><h3>处置与下钻</h3><div id="actionList" class="reports-actions"></div></section>
        <section class="reports-detail"><h3>模拟记录</h3><div id="logList" class="reports-logs"></div></section>
      </aside>
    </section>
  `;
}

function renderMenu() {
  $("#reportsModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "reports" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "reports" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#reportsModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#reportsModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  if (moduleId === "workbench") window.location.href = "../index.html";
  else if (moduleId === "reports" && reportPages[entry]) window.location.href = `./${reportPages[entry]}`;
  else if (moduleId === "orders" && entry === "生产订单") window.location.href = "../orders/production-orders.html";
  else if (moduleId === "orders" && entry === "交期预警") window.location.href = "../orders/delivery-warning.html";
  else if (moduleId === "quality" && entry === "不良记录") window.location.href = "../quality/defect-records.html";
  else if (moduleId === "equipment" && entry === "设备效率") window.location.href = "../equipment/equipment-efficiency.html";
  else if (moduleId === "equipment" && entry === "停机记录") window.location.href = "../equipment/downtime-records.html";
  else if (moduleId === "materials" && entry === "投料记录") window.location.href = "../materials/feeding-records.html";
  else if (moduleId === "trace" && entry === "批次追溯") window.location.href = "../traceability/batch-trace.html";
  else flashLog(`${entry} 页面待建设，可从首页导航继续扩展`);
}

function getDefinition() {
  return pageDefinitions[pageConfig.id];
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = (saved.rows || rows).map(normalizeFlowReportRow);
    logs = saved.logs || logs;
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, logs, state }));
}

function getVisibleRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((row) => {
    const text = Object.values(row).join(" ").toLowerCase();
    return (!keyword || text.includes(keyword)) &&
      (state.line === "all" || row.line === state.line || row.line === "全部产线") &&
      (state.shift === "all" || row.shift === state.shift) &&
      (state.status === "all" || row.status === state.status);
  });
}

function getActive() {
  return rows.find((row) => row.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function renderFilters() {
  fillSelect("#lineFilter", [["all", "全部产线"], ...unique(rows.map((row) => row.line).filter((line) => line !== "全部产线")).map((value) => [value, value])], state.line);
  fillSelect("#shiftFilter", [["all", "全部班次"], ...unique(rows.map((row) => row.shift)).map((value) => [value, value])], state.shift);
  fillSelect("#statusFilter", [["all", "全部状态"], ...unique(rows.map((row) => row.status)).map((value) => [value, value])], state.status);
  $("#searchInput").value = state.search;
  $("#simulationInput").value = `${pageConfig.title} ${new Date().toLocaleString("zh-CN", { hour12: false })} 模拟刷新回执`;
}

function fillSelect(selector, options, value) {
  const select = $(selector);
  select.innerHTML = options.map(([optionValue, label]) => `<option value="${optionValue}">${label}</option>`).join("");
  select.value = value;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function renderKpis() {
  const labels = getDefinition().metricLabels;
  const visible = getVisibleRows();
  const riskCount = visible.filter((row) => ["red", "orange"].includes(row.statusStyle)).length;
  const greenCount = visible.filter((row) => row.statusStyle === "green").length;
  const values = getKpiValues(visible, riskCount, greenCount);
  $("#reportsKpis").innerHTML = labels.map((label, index) => `
    <article class="reports-card">
      <span>${label}</span>
      <strong>${values[index].value}</strong>
      <em>${values[index].hint}</em>
    </article>
  `).join("");
}

function getKpiValues(visible, riskCount, greenCount) {
  const base = [
    { value: `${greenCount}/${visible.length || 0}`, hint: "已满足发布或放行口径" },
    { value: `${Math.max(visible.length - riskCount, 0)}`, hint: "无红色阻断项" },
    { value: `${riskCount}`, hint: "需责任人跟进" },
    { value: `${logs.length}`, hint: "本页模拟刷新记录" },
  ];
  if (pageConfig.id === "cockpit") return [
    { value: "87.6", hint: "综合生产经营得分" },
    { value: `${riskCount}`, hint: "交付、设备、物料跨域风险" },
    { value: "1.8%", hint: "质量损失估算占比" },
    { value: "Line-B", hint: "测试台为当前瓶颈" },
  ];
  return base;
}

function renderTable() {
  const def = getDefinition();
  $("#tableHead").innerHTML = `<tr>${def.columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  const visible = getVisibleRows();
  $("#tableBody").innerHTML = visible.map((row) => `
    <tr class="${row.id === state.activeId ? "is-active" : ""}" data-id="${row.id}">
      <td><strong>${row.name}</strong><small>${row.id}</small></td>
      <td><strong>${row.line}</strong><small>${row.shift}</small></td>
      <td><strong>${row.source}</strong><small>${row.updated}</small></td>
      <td><strong>${row.plan}</strong><small>${row.order}</small></td>
      <td><strong>${row.quality}</strong><small>${row.trace}</small></td>
      <td><strong>${row.risk}</strong><small>${row.next}</small></td>
      <td><span class="pill pill--${row.statusStyle}">${row.status}</span></td>
      <td><strong>${row.owner}</strong><small>${row.updated}</small></td>
    </tr>
  `).join("");

  $("#tableBody").querySelectorAll("tr").forEach((tr) => {
    tr.addEventListener("click", () => {
      state.activeId = tr.dataset.id;
      state.detailOpen = true;
      saveState();
      renderContent();
    });
  });
}

function renderInsights() {
  $("#insightList").innerHTML = rows.slice(0, 3).map((row) => `
    <article class="reports-insight">
      <span>${row.line} · ${row.shift}</span>
      <strong>${row.risk}</strong>
      <em>${row.next}</em>
      <span>责任人：${row.owner}</span>
      <span>追溯：${row.trace}</span>
    </article>
  `).join("");
}

function renderDetail() {
  const row = getActive();
  const panel = $("#detailPanel");
  panel.setAttribute("aria-hidden", state.detailOpen ? "false" : "true");
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!row) return;
  $("#detailStatus").className = `pill pill--${row.statusStyle}`;
  $("#detailStatus").textContent = row.status;
  $("#detailTitle").textContent = row.name;
  $("#detailSubtitle").textContent = `${row.order} · ${row.updated}`;
  $("#detailKv").innerHTML = [
    ["数据来源", row.source],
    ["计划与实绩", row.plan],
    ["质量或效率", row.quality],
    ["风险解释", row.risk],
    ["责任人", row.owner],
    ["追溯引用", row.trace],
  ].map(([label, value]) => `<div><span>${label}</span><strong title="${value}">${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = [
    ["数据抽取", row.source],
    ["口径校验", `${row.plan}；${row.quality}`],
    ["业务复核", `${row.owner} 于 ${row.updated} 复核`],
    ["闭环结果", row.next],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = getActions(row).map((action) => `<div><span>${action[0]}</span><strong>${action[1]}</strong></div>`).join("") + renderReportManualActions();
  $("#actionList").querySelectorAll("[data-report-manual]").forEach((button) => {
    button.addEventListener("click", () => runReportManualAction(button.dataset.reportManual));
  });
}

function getActions(row) {
  return [
    ["下钻追溯", row.trace],
    ["异常处置", row.risk],
    ["责任交接", `${row.owner} 负责 ${row.next}`],
    ["非主干治理", getReportGovernanceAction(row).hint],
  ];
}

function getReportGovernanceAction(row = getActive()) {
  const publish = /可发布|已复核|准时|可放行/.test(row?.status || "");
  const risky = /延期|风险|损耗|瓶颈|NCR|超耗|需复核|红|故障|待归因/.test(`${row?.status || ""} ${row?.risk || ""}`);
  const map = {
    daily: { primary: publish ? "发布日报快照" : "模拟日报刷新", secondary: publish ? "撤回日报发布" : "登记日报复核", status: publish ? "已发布" : "复核中", type: "日报发布治理", result: publish ? "生产日报已发布给 BI，口径锁定并保留撤回入口" : "生产日报已登记复核结论，待异常关闭后发布", hint: "支持日报发布、撤回、BI 读取状态和复核签名" },
    yield: { primary: "锁定良率口径", secondary: risky ? "下钻 NCR/MRB" : "登记质量复核", status: risky ? "NCR下钻中" : "口径已锁定", type: "良率口径治理", result: risky ? "已下钻不良、NCR/MRB 和返工闭环，并反写质量异常" : "良率分析口径已锁定，供经营驾驶舱引用", hint: "支持良率口径锁定、质量异常下钻和复核签名" },
    delivery: { primary: "锁定交付口径", secondary: risky ? "反写交付风险" : "登记交付复核", status: risky ? "风险已反写" : "口径已锁定", type: "交付风险反写", result: risky ? "延期/入库待同步风险已反写异常中心和订单风险" : "交付达成口径已锁定，等待 BI 读取", hint: "支持交付风险反写计划调整、异常中心和订单风险" },
    equipment: { primary: "重算 OEE 口径", secondary: risky ? "下钻设备瓶颈" : "登记 OEE 复核", status: risky ? "瓶颈已反写" : "OEE已锁定", type: "OEE下钻治理", result: risky ? "设备瓶颈已反写设备异常和停机复盘" : "OEE 三分项口径已锁定", hint: "支持 OEE 口径锁定、设备瓶颈下钻和 TPM 改善反写" },
    downtime: { primary: "锁定停机损失", secondary: risky ? "下钻停机归因" : "登记归因复核", status: risky ? "归因中" : "损失已锁定", type: "停机损失治理", result: risky ? "停机损失已下钻到 PLC 日志、班组补录和维修归因" : "停机损失已锁定并进入复盘", hint: "支持停机损失锁定、归因复核和改善闭环" },
    material: { primary: "锁定损耗口径", secondary: risky ? "反写损耗异常" : "登记核销复核", status: risky ? "损耗异常已反写" : "损耗已锁定", type: "物料损耗治理", result: risky ? "超耗/待核销风险已反写异常中心和物料核销" : "物料损耗口径已锁定，供成本归集", hint: "支持损耗口径锁定、余料核销和成本差异反写" },
    cockpit: { primary: "发布驾驶舱快照", secondary: risky ? "生成管理协调项" : "登记经营复核", status: risky ? "协调项已生成" : "驾驶舱已发布", type: "经营驾驶舱治理", result: risky ? "跨部门管理协调项已生成，反写交付、质量、设备或物料责任人" : "管理驾驶舱快照已发布给经营层", hint: "支持驾驶舱发布、跨部门协调项和指标下钻" },
  };
  return map[pageConfig.id] || { primary: "模拟报表刷新", secondary: "登记复核结论", status: "已复核", type: "报表治理", result: "报表复核已登记", hint: "登记发布、复核、撤回和下钻动作" };
}

function applyReportGovernanceAction(mode = "secondary") {
  const row = getActive();
  if (!row) return;
  const config = getReportGovernanceAction(row);
  row.status = config.status;
  row.statusStyle = /反写|下钻|归因|复核|协调/.test(config.status) ? "orange" : "green";
  row.updated = new Date().toLocaleString("zh-CN", { hour12: false });
  row.next = config.result;
  window.MES_BUSINESS_FLOW?.applyReportAction?.(row, pageConfig.id, mode === "primary" ? config.primary : config.secondary, {
    status: row.status,
    result: config.result,
    owner: row.owner,
    governanceType: config.type,
    approvalStatus: row.status,
  });
  recordSimulation(`${row.name} 已执行${mode === "primary" ? config.primary : config.secondary}：${row.status}`);
}

function renderReportManualActions() {
  return `
    <div class="manual-audit">
      <span>报表复核发布</span>
      <strong>只维护快照、批注、复核、发布、撤回、导出和改善项，不修改报工/入库/检验/设备原始事实</strong>
      <div class="manual-action-row">
        ${getReportManualActions().map((action) => `<button type="button" class="${action.danger ? "danger-action" : ""}" data-report-manual="${action.key}">${action.label}</button>`).join("")}
      </div>
    </div>
  `;
}

function getReportManualActions() {
  const map = {
    daily: [{ key: "snapshot", label: "生成日报" }, { key: "review", label: "复核" }, { key: "publish", label: "发布/撤回", danger: true }, { key: "export", label: "导出" }],
    yield: [{ key: "saveView", label: "保存筛选" }, { key: "comment", label: "添加批注" }, { key: "improve", label: "生成改善项" }, { key: "export", label: "导出" }],
    delivery: [{ key: "saveView", label: "保存视图" }, { key: "assign", label: "分派行动" }, { key: "export", label: "导出" }, { key: "warning", label: "转交期预警" }],
    equipment: [{ key: "comment", label: "添加批注" }, { key: "tpm", label: "生成 TPM 行动" }, { key: "export", label: "导出" }, { key: "repair", label: "转维修/复盘" }],
    downtime: [{ key: "reviewReason", label: "复核归因" }, { key: "review", label: "生成复盘" }, { key: "export", label: "导出" }],
    material: [{ key: "reviewLoss", label: "复核超耗" }, { key: "assign", label: "分派改善" }, { key: "export", label: "导出" }, { key: "feeding", label: "转投料/退料" }],
    cockpit: [{ key: "config", label: "配置关注指标" }, { key: "meeting", label: "生成管理动作" }, { key: "export", label: "导出快照" }, { key: "publish", label: "发布会议版本", danger: true }],
  };
  return map[pageConfig.id] || [{ key: "snapshot", label: "生成快照" }, { key: "review", label: "复核" }, { key: "export", label: "导出" }];
}

function runReportManualAction(key) {
  const row = getActive();
  if (!row) return;
  const action = getReportManualActions().find((item) => item.key === key) || { label: key };
  if (action.danger && !window.confirm(`${action.label}会改变发布/撤回状态但不改原始业务事实。确认处理 ${row.id}？`)) return;
  const statusMap = {
    snapshot: "快照已生成", review: "已复核", publish: /已发布|驾驶舱已发布/.test(row.status) ? "撤回待审批" : "已发布",
    export: "已导出", saveView: "视图已保存", comment: "已批注", improve: "改善项已生成", assign: "行动已分派",
    warning: "交期预警已生成", tpm: "TPM行动已生成", repair: "维修复盘中", reviewReason: "归因已复核",
    reviewLoss: "超耗已复核", feeding: "投退料复核中", config: "关注已配置", meeting: "管理动作已生成",
  };
  row.status = statusMap[key] || row.status;
  row.statusStyle = /发布|复核|导出|保存|配置/.test(row.status) ? "green" : "orange";
  row.updated = new Date().toLocaleString("zh-CN", { hour12: false });
  row.next = `${action.label}已登记：复核结论、快照版本、责任人、批注和改善项留痕；原始事实只读`;
  window.MES_BUSINESS_FLOW?.applyReportAction?.(row, pageConfig.id, action.label, {
    status: row.status,
    result: row.next,
    owner: row.owner,
    governanceType: "报表看板复核发布",
    approvalStatus: row.status,
  });
  recordSimulation(`${row.name} ${action.label}已登记：${row.status}`);
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.map((log) => `<div><span>${log.time}</span><strong>${log.text}</strong></div>`).join("") : "<div><span>暂无</span><strong>模拟刷新或复核后会在此留痕</strong></div>";
}

function renderContent() {
  renderKpis();
  renderTable();
  renderInsights();
  renderDetail();
  renderLogs();
}

function bindEvents() {
  $("#searchInput").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderContent();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderContent();
  });
  $("#shiftFilter").addEventListener("change", (event) => {
    state.shift = event.target.value;
    saveState();
    renderContent();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderContent();
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
  $("#simulateBtn").addEventListener("click", () => recordSimulation($("#simulationInput").value || `${pageConfig.title} 模拟刷新`));
  $("#simulateTopBtn").addEventListener("click", () => applyReportGovernanceAction("primary"));
  $("#secondaryActionBtn").addEventListener("click", () => applyReportGovernanceAction("secondary"));
  $("#resetReportsBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    rows = structuredClone(initialRows[pageConfig.id]);
    hydrateRowsFromBusinessFlow();
    state = { activeId: rows[0]?.id || "", search: "", line: "all", shift: "all", status: "all", detailOpen: true };
    logs = [];
    renderFilters();
    renderContent();
  });
}

function recordSimulation(text) {
  const row = getActive();
  if (row) {
    window.MES_BUSINESS_FLOW?.applyReportAction?.(row, pageConfig.id, "模拟报表刷新", {
      status: row.status,
      result: text,
      owner: row.owner,
    });
  }
  logs.unshift({ time: new Date().toLocaleString("zh-CN", { hour12: false }), text: `${text}；当前对象：${row ? row.id : "未选择"}` });
  logs = logs.slice(0, 8);
  saveState();
  renderContent();
}

function flashLog(text) {
  logs.unshift({ time: new Date().toLocaleString("zh-CN", { hour12: false }), text });
  logs = logs.slice(0, 8);
  saveState();
  renderLogs();
}

loadState();
hydrateRowsFromBusinessFlow();
renderMenu();
renderAppShell();
renderFilters();
bindEvents();
renderContent();
