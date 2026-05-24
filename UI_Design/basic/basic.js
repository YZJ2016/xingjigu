const pageConfig = window.BASIC_PAGE || { id: "products", title: "产品资料", eyebrow: "基础资料 / 产品资料" };
const STORAGE_VERSION = pageConfig.id === "partners" ? "v4" : pageConfig.id === "workshops" ? "v4" : "v3";
const STORAGE_KEY = `xingjigu_mes_basic_${pageConfig.id}_${STORAGE_VERSION}`;

const modules = window.MES_NAV_MODULES || [
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

const pageMaps = {
  basic: {
    产品资料: "product-master.html",
    物料资料: "material-master.html",
    "BOM 清单": "bom-list.html",
    工艺路线: "routing.html",
    工序工位: "operation-stations.html",
    产线车间: "workshops.html",
    客户供应商: "partners.html",
  },
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "SOP 查看": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 员工登录: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  quality: { 来料检验: "../quality/incoming-inspection.html", 首件检验: "../quality/first-article.html", 巡检任务: "../quality/patrol-tasks.html", 过程检验: "../quality/process-inspection.html", 成品检验: "../quality/final-inspection.html", 不良记录: "../quality/defect-records.html", 返工评审: "../quality/rework-review.html" },
  equipment: { 设备状态: "../equipment/equipment-status.html", 点检计划: "../equipment/inspection-plan.html", 保养计划: "../equipment/maintenance-plan.html", 维修工单: "../equipment/repair-orders.html", 停机记录: "../equipment/downtime-records.html", 备件领用: "../equipment/spare-parts.html", 设备效率: "../equipment/equipment-efficiency.html" },
};

const pageDefinitions = {
  products: {
    subtitle: "维护产品编码、版本、客户要求、标签策略和检验引用，是 ERP 工单进入 MES 校验的第一道门",
    user: "主数据工程师",
    metrics: ["产品档案", "已发布", "待审批", "影响订单"],
    columns: ["产品编码", "产品 / 客户", "版本 / 来源", "关键引用", "产品版本状态", "下游校验", "责任人", "时间戳"],
    tableTitle: "产品主数据与执行版本",
    tableHint: "来自 ERP/PLM 的产品资料经 MES 审批后，供订单评审、BOM、工艺、标签和追溯引用",
    cardTitle: "影响关系 / 下游引用检查",
    simulationTitle: "模拟 ERP / PLM 产品同步",
    simulationHint: "模拟外部主数据同步，不代表后台直接修改 ERP 或 PLM 原始资料",
  },
  materials: {
    subtitle: "维护料号、批次规则、IQC 策略、替代关系和合格供应商引用，支撑 BOM、齐套、投料和追溯",
    user: "物料主数据员",
    metrics: ["物料档案", "可投料", "待补规则", "影响投料"],
    columns: ["物料编码", "物料 / 类型", "批次与检验", "合格供应商", "投料准入状态", "下游校验", "责任人", "时间戳"],
    tableTitle: "物料主数据、批次规则与供应商引用",
    tableHint: "物料资料维护料号、批次和检验口径，并引用客户供应商中的合格供方档案；库存、领料和线边执行仍进入物料与线边库",
    cardTitle: "物料资料驱动关系",
    simulationTitle: "模拟 ERP / WMS 物料同步",
    simulationHint: "模拟外部物料、库存或供应商规则回传，后台只做校验和审批记录",
  },
  bom: {
    subtitle: "按产品版本维护制造 BOM、用量、损耗率、替代料和生效范围，是物料需求与投料防错的共同依据",
    user: "BOM 工程师",
    metrics: ["BOM 版本", "已发布", "待评估", "缺口风险"],
    columns: ["BOM 编号", "产品 / 版本", "关键物料", "用量 / 损耗", "BOM版本状态", "影响范围", "责任人", "时间戳"],
    tableTitle: "制造 BOM 与用料口径",
    tableHint: "PLM 发布后由 MES 评估生效，向齐套检查、领料申请、投料确认和损耗分析传递同一口径",
    cardTitle: "BOM 驱动关系",
    simulationTitle: "模拟 PLM BOM 变更同步",
    simulationHint: "模拟 PLM 工程变更或 BOM 发布消息，页面只登记校验、审批和影响评估",
  },
  routing: {
    subtitle: "维护产品工艺路线、工序顺序、标准工时、SOP、参数规格和质量触发规则",
    user: "工艺工程师",
    metrics: ["路线版本", "已发布", "待签收", "开工拦截"],
    columns: ["路线编号", "产品 / 版本", "工序链", "SOP / 检验", "工艺版本状态", "现场约束", "责任人", "时间戳"],
    tableTitle: "工艺路线与执行标准",
    tableHint: "工艺路线决定 APS 资源计算、派工单工序、工位终端指导、过程采集和质量触发",
    cardTitle: "工艺路线驱动关系",
    simulationTitle: "模拟 PLM 工艺路线发布",
    simulationHint: "模拟外部工艺版本发布，不代表后台直接编辑 PLM 工艺文件",
  },
  stations: {
    subtitle: "维护工位档案、设备终端、人员资质、开工准入、数据采集和现场显示内容，连接后台派工和现场执行",
    user: "车间工艺员",
    metrics: ["工位绑定", "已启用", "待复核", "准入拦截"],
    columns: ["工位编码", "工位 / 工序", "设备 / 终端", "人员资质", "工位状态", "开工准入", "责任人", "时间戳"],
    tableTitle: "工位档案与开工准入配置",
    tableHint: "后台维护工位档案、设备终端绑定和准入规则，现场动作仍由工位终端、扫码枪、工牌/NFC、HMI 或 PLC 产生回执",
    cardTitle: "工序工位驱动关系",
    simulationTitle: "模拟设备 / 工位终端回执",
    simulationHint: "模拟设备 API、PLC 或工位终端状态回传，后台只更新准入状态和履历",
  },
  workshops: {
    subtitle: "维护工厂、车间、产线、班组、班次、产能日历和数据权限，支撑排程与现场看板",
    user: "车间主任",
    metrics: ["产线资源", "可排程", "日历待审", "负荷风险"],
    columns: ["资源编码", "车间 / 产线", "班次 / 日历", "能力约束", "资源排程状态", "排程影响", "责任人", "时间戳"],
    tableTitle: "产线车间与产能模型",
    tableHint: "资源模型向 APS、产能负荷、派工、电子看板和班次交接提供统一现场结构",
    cardTitle: "产线车间驱动关系",
    simulationTitle: "模拟 APS / 设备日历同步",
    simulationHint: "模拟排程或设备停机日历同步，后台不直接控制现场产线",
  },
  partners: {
    subtitle: "按客户与供应商分型维护业务伙伴档案；供应商侧聚焦供货资质、可供物料、批次追溯和来料检验策略引用",
    user: "业务资料管理员",
    metrics: ["伙伴档案", "业务生效", "待复核", "供应风险"],
    columns: ["伙伴编码", "角色 / 名称", "状态 / 资质", "规则引用范围", "业务准入状态", "业务影响", "责任人", "时间戳"],
    tableTitle: "客户供应商与业务规则",
    tableHint: "客户侧传递订单、标签和交付要求；供应商侧传递合格供方、可供物料、IQC 策略和批次追溯约束",
    cardTitle: "客户供应商驱动关系",
    simulationTitle: "模拟 ERP / QMS 伙伴同步",
    simulationHint: "模拟客户优先级或供应商质量等级同步，页面只记录 MES 生效与影响范围",
  },
};

const initialRows = {
  products: [
    { id: "PRD-TCU-100", name: "智能温控控制器 TCU-100", version: "V3.2", source: "PLM 发布 + ERP 物料", status: "已发布", ref: "BOM-TCU-100-V3.2 / RT-TCU-100-V2.6", impact: "MO-202606-0001 可排程", owner: "主数据工程师 赵岚", time: "06-18 09:12", scope: "A 客户 / Line-A / 电子装配", risk: "资料齐套，支持开工准入", downstream: "订单评审、BOM、工艺路线、成品标签、产品追溯" },
    { id: "PRD-GW-240", name: "工业网关 GW-240", version: "V2.1", source: "ERP 新增 + PLM 工艺", status: "已发布", ref: "BOM-GW-240-V2.1 / RT-GW-240-V1.8", impact: "MO-202606-0002 生产中", owner: "主数据工程师 赵岚", time: "06-18 10:40", scope: "B 客户 / Line-B", risk: "客户优先级高，标签模板已确认", downstream: "生产订单、派工单、箱码托盘码" },
    { id: "PRD-HMI-70", name: "显示控制面板 HMI-70", version: "V1.0", source: "PLM 首版", status: "待质量确认", ref: "检验规范待审批", impact: "MO-202606-0006 阻止排程", owner: "质量工程师 孟可", time: "06-18 14:05", scope: "E 客户 / Line-C", risk: "FQC 检验要求未确认", downstream: "订单评审、生产排程、成品检验" },
    { id: "PRD-SRV-90", name: "伺服驱动板 SRV-90", version: "V1.4", source: "PLM 变更 ECN-2406", status: "影响评估中", ref: "BOM 替代料待签核", impact: "MO-202606-0010 需确认旧批次", owner: "工艺工程师 林澈", time: "06-18 15:20", scope: "B 客户 / Line-A", risk: "版本切换会影响在制批次追溯", downstream: "BOM 清单、投料确认、客户追溯报告" },
  ],
  materials: [
    { id: "MAT-SEN-T100", name: "温度传感器", version: "批次必管", source: "ERP 物料 + WMS 库存", status: "可投料", ref: "IQC 合格后可投 / FIFO", impact: "TCU-100 需求缺 200 件", owner: "物料主数据员 吴琳", time: "06-18 09:35", scope: "BOM-TCU-100-V3.2", risk: "缺口影响 Line-A 第二批开工", downstream: "齐套检查、领料申请、线边库存、投料记录" },
    { id: "MAT-PCB-TCU", name: "PCB 主板", version: "批次必管", source: "ERP 物料 + IQC 规则", status: "可投料", ref: "供应商 S-PCB-01 / AQL Ⅱ", impact: "SMT 首站投料防错", owner: "物料主数据员 吴琳", time: "06-18 10:05", scope: "TCU-100 / GW-240", risk: "批次与 SN 谱系必须绑定", downstream: "物料标签、投料确认、批次追溯" },
    { id: "MAT-PWR-IC60", name: "电源芯片", version: "客户指定批次", source: "ERP 物料 + QMS 冻结", status: "冻结待复核", ref: "PWRIC-L20260602", impact: "MO-202606-0005 缺料预警", owner: "质量员 孟可", time: "06-18 11:18", scope: "PCM-60 / Line-B", risk: "冻结批次不可投料，需替代料审批", downstream: "缺料处理、来料检验、库存冻结" },
    { id: "MAT-BOX-I", name: "客户 I 包装盒", version: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "可投料", ref: "BOXI-L20260614", impact: "MO-202606-0011 包装入库", owner: "包装工程师 李娟", time: "06-18 13:50", scope: "客户 I / PACK-C-02", risk: "多领余料需退回核销", downstream: "成品标签、包装作业、余料退回" },
  ],
  bom: [
    { id: "BOM-TCU-100-V3.2", name: "智能温控控制器 TCU-100", version: "V3.2", source: "PLM 发布 ECN-20260612", status: "已发布", ref: "7 个关键物料 / 损耗 1.5%", impact: "MO-202606-0001 齐套检查通过 800 台", owner: "BOM 工程师 王珂", time: "06-18 09:50", scope: "A 客户 / Line-A / 2026-06-18 生效", risk: "温度传感器二批待到货", downstream: "用料需求、领料申请、投料防错、物料损耗" },
    { id: "BOM-GW-240-V2.1", name: "工业网关 GW-240", version: "V2.1", source: "PLM 发布", status: "已发布", ref: "12 个物料 / 2 个替代料", impact: "MO-202606-0002 已下达", owner: "BOM 工程师 王珂", time: "06-18 10:28", scope: "B 客户 / Line-B", risk: "10K 电阻卷料替代料已批准", downstream: "生产排程、线边库存、投料记录" },
    { id: "BOM-PCM-60-V1.8", name: "电源控制模块 PCM-60", version: "V1.8", source: "PLM + 客户指定批次", status: "待替代审批", ref: "电源芯片指定批次", impact: "MO-202606-0005 不能开工", owner: "物料主管 何敏", time: "06-18 11:35", scope: "D 客户 / Line-B", risk: "冻结批次导致 160 件缺口", downstream: "齐套检查、缺料处理、计划调整" },
    { id: "BOM-SRV-90-V1.4", name: "伺服驱动板 SRV-90", version: "V1.4", source: "PLM 变更待评估", status: "影响评估中", ref: "驱动芯片替代料", impact: "MO-202606-0010 在制批次需锁旧版", owner: "工艺工程师 林澈", time: "06-18 15:28", scope: "B 客户 / Line-A", risk: "切换窗口影响追溯一致性", downstream: "任务变更、投料确认、客户报告" },
  ],
  routing: [
    { id: "RT-TCU-100-V2.6", name: "TCU-100 标准路线", version: "V2.6", source: "PLM 工艺发布", status: "已发布", ref: "SMT>DIP>烧录>装配>测试>老化>FQC>包装", impact: "D-001 至 D-008 派工生成", owner: "工艺工程师 林澈", time: "06-18 09:58", scope: "Line-A / TCU-100 / SOP-TCU-2.6", risk: "老化测试为瓶颈资源", downstream: "生产排程、工序任务、工艺指导、检验履历" },
    { id: "RT-GW-240-V1.8", name: "GW-240 标准路线", version: "V1.8", source: "PLM 工艺发布", status: "已发布", ref: "SMT>烧录>功能测试>FQC>包装", impact: "MO-202606-0002 生产中", owner: "工艺工程师 林澈", time: "06-18 10:44", scope: "Line-B / GW-240", risk: "功能测试工位排队", downstream: "产能负荷、过程检验、报工" },
    { id: "RT-HMI-70-V1.0", name: "HMI-70 首版路线", version: "V1.0", source: "PLM 首版", status: "待现场签收", ref: "装配参数和 FQC 规范待确认", impact: "MO-202606-0006 待排程", owner: "车间工艺员 许诺", time: "06-18 14:22", scope: "Line-C / 显示控制面板", risk: "终端 SOP 未签收，开工检查拦截", downstream: "SOP 查看、开工检查、成品检验" },
    { id: "RT-SRV-90-V1.4", name: "SRV-90 加急路线", version: "V1.4", source: "PLM ECN-2406", status: "影响评估中", ref: "老化测试缩短需质量签核", impact: "MO-202606-0010 交期压缩", owner: "质量工程师 孟可", time: "06-18 15:42", scope: "Line-A / B 客户", risk: "检验放行条件未完成", downstream: "首件检验、计划调整、质量放行" },
  ],
  stations: [
    { id: "SMT-WS-01", name: "SMT 贴片工位", version: "Line-A", source: "设备 API + 工位终端", status: "工位启用", ref: "SMT-01 / 扫码枪 / Feeder 绑定", impact: "D-001 开工准入通过", owner: "车间工艺员 许诺", time: "06-18 08:55", scope: "SMT 贴片 / TCU-100", risk: "需校验首件放行和料站绑定", downstream: "扫码开工、投料确认、过程记录、设备履历" },
    { id: "DIP-A-02", name: "DIP 插件工位", version: "Line-A", source: "MES 维护 + 班组签收", status: "待转序接收", ref: "DIP-Line-A / 工牌 NFC", impact: "D-002 13:00 计划开工", owner: "班组长 郑峰", time: "06-18 09:18", scope: "DIP 插件 / TCU-100", risk: "等待 SMT 批次转入", downstream: "班组任务、工序报工、交接班" },
    { id: "TEST-B-01", name: "功能测试工位", version: "Line-B", source: "测试台 API", status: "负荷预警", ref: "Test-B / 参数自动采集", impact: "GW-240 排队 2 个任务", owner: "设备工程师 周启", time: "06-18 10:32", scope: "功能测试 / GW-240", risk: "测试工位排队影响交期", downstream: "过程参数、过程检验、设备效率" },
    { id: "QC-FINAL", name: "FQC 成品检验位", version: "共用资源", source: "QMS 抽样方案", status: "待规范确认", ref: "AQL / FQC 规范", impact: "HMI-70 阻止排程", owner: "质量工程师 孟可", time: "06-18 14:30", scope: "FQC / 多产品", risk: "检验项目缺失会拦截入库", downstream: "成品检验、完工确认、客户追溯报告" },
  ],
  workshops: [
    { id: "FAC-EAST-01", level: "车间", name: "华东一厂 · 电子装配车间", version: "白班 08:00-20:00 / 夜班 20:00-08:00", calendarId: "CAL-WKS-EC-202606", parentCalendar: "工厂工作日历", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "车间基准日历", source: "MES 资源模型", status: "资源启用", ref: "Line-A / Line-B / Line-C", capacityModel: "车间每日 36h 基准，产线可继承或覆盖", exceptions: "06-22 夜班检修窗口 02:00-04:00", impact: "全部订单按车间权限展示", owner: "车间主任 陈伟", time: "06-18 08:20", scope: "车间 / 华东一厂 · 电子装配车间", risk: "车间日历只定义车间可生产窗口，产线仍需独立确认班次、停线和瓶颈资源", downstream: "首页工作台、生产排程、电子看板" },
    { id: "LINE-A", level: "产线", workshop: "电子装配车间", name: "Line-A 电子装配线", version: "白班 08:00-20:00", calendarId: "CAL-LINE-A-202606", parentCalendar: "CAL-WKS-EC-202606", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间白班，覆盖老化瓶颈窗口", source: "APS 产能日历", status: "可排程", ref: "SMT-01 / DIP-Line-A / Burn-01 / Assembly-A / Test-A / Aging-Room-1 / QC-Final / Pack-A", capacityModel: "首批 800 台；老化房 1 为瓶颈资源；线边库 LS-A 已启用", exceptions: "06-21 18:00-20:00 Aging-Room-1 预留保养，不占用装配工位", impact: "MO-202606-0001 与 0010 共用资源", owner: "计划主管 李敏", time: "06-18 08:35", scope: "产线 / TCU-100 / SRV-90", risk: "TCU-100 首批可排程，但老化测试需锁定容量和时长", downstream: "产能负荷、派工单、设备运行" },
    { id: "LINE-B", level: "产线", workshop: "电子装配车间", name: "Line-B 模块装配线", version: "白班 08:00-20:00 / 加班 20:00-22:00", calendarId: "CAL-LINE-B-202606", parentCalendar: "CAL-WKS-EC-202606", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间日历，追加加班窗口", source: "APS + 设备保养计划", status: "负荷预警", ref: "SMT-B / Test-B / Assembly-B / Pack-B", capacityModel: "测试台 B2 为瓶颈；加班窗口需车间主任确认", exceptions: "06-20 15:00-17:00 Test-B2 故障复测，APS 暂不释放", impact: "GW-240 与 PCM-60 交期冲突", owner: "计划主管 李敏", time: "06-18 10:16", scope: "产线 / GW-240 / PCM-60 / HMI-100", risk: "功能测试与物料冻结双风险", downstream: "交期预警、缺料处理、设备效率" },
    { id: "LINE-C", level: "产线", workshop: "电子装配车间", name: "Line-C 包装与装配线", version: "白班 08:00-18:00", calendarId: "CAL-LINE-C-202606", parentCalendar: "CAL-WKS-EC-202606", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间日历，缩短包装线班次", source: "MES 资源模型", status: "可排程", ref: "Assembly-C / Aging-C / Pack-C", capacityModel: "包装节拍优先，HMI-70 资料未签收时不释放", exceptions: "06-23 16:00-18:00 包装线客户稽核预留", impact: "MO-202606-0011 包装中", owner: "包装主管 李娟", time: "06-18 13:26", scope: "产线 / THS-10 / ENV-45 / HMI-70", risk: "HMI-70 工艺资料待签收", downstream: "包装作业、成品入库、交接班" },
  ],
  partners: [
    { id: "CUS-A", partnerType: "客户", name: "A 客户", version: "优先级高", source: "ERP 客户资料", status: "业务生效", qualification: "年度框架订单有效", qualityLevel: "交付优先级 A", ref: "客户标签模板 A-V1.4", supplyScope: "TCU-100 / 客户 A 包装盒", traceRule: "按成品 SN、箱码、托盘码生成客户追溯报告", iqcPolicy: "不适用，客户侧引用 FQC / OQC 要求", impact: "MO-202606-0001 按高优先级排程", owner: "业务资料管理员 沈清", time: "06-18 09:02", scope: "客户 / TCU-100 / 成品标签", risk: "标签补打需审批", downstream: "订单评审、成品标签、客户追溯报告" },
    { id: "CUS-B", partnerType: "客户", name: "B 客户", version: "交期敏感", source: "ERP 客户资料", status: "业务生效", qualification: "重点客户有效", qualityLevel: "OTD 重点监控", ref: "OTD 重点监控 / 客户 B 标签模板", supplyScope: "GW-240 / SRV-90", traceRule: "按订单交付批次生成受控追溯资料", iqcPolicy: "不适用，客户侧引用 OQC 放行策略", impact: "GW-240 与 SRV-90 交期预警", owner: "计划主管 李敏", time: "06-18 10:08", scope: "客户 / GW-240 / SRV-90", risk: "交期压缩需计划调整", downstream: "交期预警、计划调整、交付达成" },
    { id: "SUP-SEN-01", partnerType: "供应商", name: "传感器供应商 S-01", version: "A级供应商", source: "QMS 供应商档案", status: "待到货复核", qualification: "合格供方 / 资质有效至 2026-12-31", qualityLevel: "A级 / 近 3 批 IQC 合格率 98.8%", ref: "IQC-SEN-AQL-II / SEN-L20260605", supplyScope: "MAT-SEN-T100 温度传感器；可供 TCU-100、SEN-20", traceRule: "供应商批次 + 来料批次必填，投料后绑定工单、工序和成品 SN", iqcPolicy: "正常检验；逾期到货自动转加严复核", impact: "TCU-100 第二批缺 200 件，需跟踪到货和 IQC 放行", owner: "采购跟单 袁青", time: "06-18 11:10", scope: "供应商 / 温度传感器 / TCU-100", risk: "到货延迟影响第二批开工", downstream: "来料检验、缺料预警、批次追溯" },
    { id: "SUP-PWR-02", partnerType: "供应商", name: "电源芯片供应商 P-02", version: "质量观察", source: "QMS 冻结规则", status: "冻结待复核", qualification: "临时放行需 MRB 审批", qualityLevel: "观察级 / 近期失效率超阈值", ref: "MRB-PWR-202606 / PWRIC-L20260602", supplyScope: "MAT-PWR-IC60 电源芯片；仅限 PCM-60 指定批次", traceRule: "客户指定批次 + MRB 放行号必填，冻结批次禁止进入投料准入", iqcPolicy: "加严检验；功能项全检后才允许库存解冻", impact: "PCM-60 指定批次冻结，影响 MO-202606-0005 备料", owner: "质量员 孟可", time: "06-18 11:42", scope: "供应商 / 电源芯片 / D 客户", risk: "需 MRB 或替代料审批", downstream: "来料检验、库存冻结、缺料处理" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.basicRows || {});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", source: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#basicModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "basic" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "basic" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#basicModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#basicModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  if (moduleId === "workbench") window.location.href = "../index.html";
  else if (pageMaps[moduleId]?.[entry]) window.location.href = pageMaps[moduleId][entry];
  else showToast(`${entry} 页面待建设`);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = mergeRowsWithInitial(saved.rows || [], initialRows[pageConfig.id] || []);
    logs = saved.logs || logs;
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function mergeRowsWithInitial(savedRows, latestRows) {
  const savedMap = new Map(savedRows.map((row) => [row.id, row]));
  const merged = latestRows.map((row) => savedMap.has(row.id) ? { ...row, ...savedMap.get(row.id) } : row);
  const customRows = savedRows.filter((row) => !latestRows.some((latest) => latest.id === row.id));
  return [...merged, ...customRows];
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
    const text = `${item.id} ${item.name} ${item.version} ${item.source} ${item.status} ${item.ref} ${item.impact} ${item.owner} ${item.scope} ${item.risk} ${item.downstream} ${item.factory || ""} ${item.workshop || ""} ${item.line || ""} ${item.operation || ""} ${item.equipment || ""} ${item.terminal || ""} ${item.qualification || ""} ${item.dataCapture || ""} ${item.display || ""}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const sourceMatch = state.source === "all" || item.source.includes(state.source);
    return keywordMatch && statusMatch && sourceMatch;
  });
}

function getActive() {
  const visible = getVisibleRows();
  return visible.find((item) => item.id === state.activeId) || visible[0] || rows.find((item) => item.id === state.activeId) || rows[0];
}

function statusStyle(status) {
  if (/缺|冻结|拦截|阻止|风险|负荷|不通过/.test(status)) return "red";
  if (/待|评估|复核|预警|签收|审批|观察/.test(status)) return "orange";
  if (/已|可|生效|发布|通过|启用|业务生效/.test(status)) return "green";
  return "blue";
}

function isReleasedStatus(status = "") {
  return /已|可|生效|发布|通过|启用|业务生效/.test(status);
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "资料编码"} / ${rows[0]?.version || "版本号"}`;
  $("#primaryActionBtn").textContent = pageConfig.id === "stations" ? "确认工位启用" : "发布到执行";
  $("#secondaryActionBtn").textContent = pageConfig.id === "stations" ? "登记维护状态" : "登记影响评估";
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  const sourceOptions = ["ERP", "PLM", "WMS", "QMS", "MES", "APS", "设备"];
  $("#sourceFilter").innerHTML = `<option value="all">全部来源</option>${sourceOptions.map((source) => `<option value="${source}">${source}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}<th>维护动作</th></tr>`;
  ensureMaintenanceActions();
  syncFilterControls();
}

function syncFilterControls() {
  if ($("#searchInput")) $("#searchInput").value = state.search;
  if ($("#statusFilter")) {
    const statusExists = [...$("#statusFilter").options].some((option) => option.value === state.status);
    if (!statusExists) state.status = "all";
    $("#statusFilter").value = state.status;
  }
  if ($("#sourceFilter")) $("#sourceFilter").value = state.source;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => isReleasedStatus(item.status)).length,
    visible.filter((item) => /待|评估|复核|签收|审批/.test(item.status)).length,
    visible.filter((item) => /缺|冻结|风险|阻止|负荷|拦截|待/.test(item.risk + item.impact + item.status)).length,
  ];
  $("#basicMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "影响下游订单、派工、物料或质量闭环" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderTable() {
  const visible = getVisibleRows();
  $("#basicTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
      ${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}
      <td>${buildRowActions(item)}</td>
    </tr>
  `).join("") : `<tr><td colspan="9">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#basicTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#basicTableBody").querySelectorAll(".basic-row-actions").forEach((actions) => {
    actions.addEventListener("click", (event) => event.stopPropagation());
  });
  $("#basicTableBody").querySelectorAll("[data-basic-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      handleRowAction(button.dataset.basicAction, button.dataset.id);
    });
  });
}

function buildCells(item) {
  if (pageConfig.id === "stations") {
    return [
      item.id,
      twoLine(item.name, `${item.operation || item.scope} / ${item.line || item.version}`),
      twoLine(item.equipment || getRefPart(item, 0), item.terminal || item.source),
      item.qualification || "资质待维护",
      pill(item.status),
      item.impact,
      item.owner,
      item.time,
    ];
  }
  if (pageConfig.id === "partners") {
    const role = getPartnerType(item);
    const ruleScope = role === "供应商"
      ? `${item.supplyScope || item.scope} / ${item.iqcPolicy || item.ref}`
      : `${item.ref} / ${item.traceRule || item.scope}`;
    return [
      item.id,
      twoLine(role, item.name),
      twoLine(item.status, item.qualification || item.version),
      ruleScope,
      pill(item.status),
      item.impact,
      item.owner,
      item.time,
    ];
  }
  if (pageConfig.id === "materials") {
    return [
      item.id,
      twoLine(item.name, item.materialType || item.scope),
      twoLine(item.version, item.ref),
      twoLine(item.supplierName || "供应商待维护", `${item.supplierId || "无供应商编码"} / ${item.supplierStatus || "状态待同步"}`),
      pill(item.status),
      item.impact,
      item.owner,
      item.time,
    ];
  }
  return [
    item.id,
    twoLine(item.name, item.scope),
    twoLine(item.version, item.source),
    item.ref,
    pill(item.status),
    item.impact,
    item.owner,
    item.time,
  ];
}

function twoLine(main, sub) {
  return `<strong>${main}</strong><small>${sub}</small>`;
}

function pill(text) {
  return `<span class="pill pill--${statusStyle(text)}">${text}</span>`;
}

function buildRowActions(item) {
  if (pageConfig.id === "stations") return buildStationRowActions(item);
  const disabled = /停用/.test(item.status);
  const buttons = [["edit", "编辑"]];
  if (disabled) {
    buttons.push(["enable", "启用"]);
    return buildRowActionMenu(item, buttons);
  }
  buttons.push(["copy", "复制版本"]);
  if (canResyncProduct(item)) buttons.push(["resync", "重新同步产品"]);
  if (/草稿|撤回|待|评估|复核|签收|观察/.test(item.status)) buttons.push(["approve", "提交审批"]);
  if (!/已发布|已生效|可执行|可排程|工位启用|可投料|资源启用|业务生效/.test(item.status)) buttons.push(["publish", "发布"]);
  if (/草稿|未生效|待审批|影响评估中/.test(item.status)) buttons.push(["withdraw", "撤回"]);
  buttons.push([disabled ? "enable" : "disable", disabled ? "启用" : "停用"]);
  return buildRowActionMenu(item, buttons);
}

function buildStationRowActions(item) {
  const disabled = /停用/.test(item.status);
  const buttons = [["edit", "编辑"]];
  if (disabled) {
    buttons.push(["enable", "启用"]);
    return buildRowActionMenu(item, buttons);
  }
  buttons.push(["copy", "复制工位"]);
  if (/待点检|待转序接收|维护中|负荷预警/.test(item.status)) buttons.push(["approve", "提交点检"]);
  if (!/工位启用/.test(item.status)) buttons.push(["publish", "确认启用"]);
  buttons.push(["disable", "停用"]);
  return buildRowActionMenu(item, buttons);
}

function buildRowActionMenu(item, buttons) {
  const [primary, ...more] = buttons;
  const menu = more.map(([action, label]) => `
    <button class="${action === "disable" || action === "withdraw" ? "danger-action" : ""}" type="button" data-basic-action="${action}" data-id="${item.id}">${label}</button>
  `).join("");
  return `
    <div class="basic-row-actions">
      <button type="button" data-basic-action="${primary[0]}" data-id="${item.id}">${primary[1]}</button>
      ${more.length ? `
        <details class="basic-action-menu">
          <summary>更多</summary>
          <div class="basic-action-menu__list">${menu}</div>
        </details>
      ` : ""}
    </div>
  `;
}

function renderCards() {
  const active = getActive();
  if (pageConfig.id === "products") {
    renderProductImpactChecks(active);
    return;
  }
  if (pageConfig.id === "stations") {
    renderStationCards(active);
    return;
  }
  if (pageConfig.id === "workshops") {
    renderWorkshopCards(active);
    return;
  }
  if (pageConfig.id === "partners") {
    renderPartnerCards(active);
    return;
  }
  if (pageConfig.id === "materials") {
    renderMaterialCards(active);
    return;
  }
  $("#basicCards").className = "basic-card-grid";
  const cards = [
    ["上游来源", active.source, "保留 ERP、PLM、WMS、QMS 或设备回传来源"],
    ["执行边界", getBoundaryText(), "后台管理资料生效、版本下发、校验和异常处置"],
    ["下游衔接", active.downstream, "资料版本进入计划、现场执行、质量、仓储和追溯"],
  ];
  $("#basicCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="basic-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderWorkshopCards(active) {
  const checks = getWorkshopAccessChecks(active);
  const passed = checks.filter((check) => check.status === "通过").length;
  $("#basicCards").className = "workshop-check-grid";
  $("#basicCards").innerHTML = [
    ["日历层级", `${active.level || "资源"} · ${active.calendarId || active.id}`, active.parentCalendar ? `上级日历：${active.parentCalendar}` : "车间基准日历"],
    ["班次窗口", active.version, active.calendarRange || "覆盖日期待维护"],
    ["产能模型", active.capacityModel || active.ref, active.exceptions || "无例外窗口"],
    ["TCU-100 准入", `${passed}/${checks.length} 项通过`, checks.find((check) => check.status !== "通过")?.desc || "Line-A 首批排程资源已具备"],
  ].map(([label, value, hint]) => `
    <div class="basic-card workshop-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderStationCards(active) {
  const accessRules = getStationAccessRules(active);
  const passed = accessRules.filter((rule) => !/待|未|异常|拦截|离线|缺/.test(rule)).length;
  $("#basicCards").className = "station-card-grid";
  const cards = [
    ["工位归属", `${active.factory || "华东一厂"} / ${active.workshop || "电子装配车间"} / ${active.line || active.version}`, "用于数据权限、排程资源和现场看板定位"],
    ["设备终端", `${active.equipment || getRefPart(active, 0)} / ${active.terminal || getRefPart(active, 1)}`, active.equipmentStatus || "状态随设备 API 或人工点检回传"],
    ["人员资质", active.qualification || "资质待维护", "开工前由工牌/NFC、班组任务或权限资质配置校验"],
    ["准入规则", `${passed}/${accessRules.length || 0} 项可通过`, active.impact || "待开工检查复核"],
    ["采集方式", active.dataCapture || getBoundaryText(), "所有现场动作均为模拟回执或外部设备信号"],
    ["追溯结果", active.trace || active.downstream, "工位履历会绑定工单、工序、设备、人员和时间戳"],
  ];
  $("#basicCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="basic-card station-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderPartnerCards(active) {
  const role = getPartnerType(active);
  $("#basicCards").className = "basic-card-grid partner-card-grid";
  const cards = role === "供应商" ? [
    ["供应商状态与资质", `${active.status} / ${active.qualification || active.version}`, active.qualityLevel || "质量等级待维护"],
    ["可供物料范围", active.supplyScope || active.scope, "这里维护合格供方范围，不维护库存、领料或线边库"],
    ["批次追溯规则", active.traceRule || active.ref, "用于来料批次、投料记录、生产履历和反向追溯"],
    ["来料检验策略", active.iqcPolicy || active.ref, "引用 QMS/IQC 策略，MES 只记录执行准入口径"],
  ] : [
    ["客户状态与要求", `${active.status} / ${active.qualification || active.version}`, active.qualityLevel || "客户等级待维护"],
    ["产品与标签范围", active.supplyScope || active.scope, "客户侧维护标签、交付和报告要求"],
    ["追溯报告口径", active.traceRule || active.ref, "用于出货随附资料、客诉和客户稽核"],
    ["质量放行引用", active.iqcPolicy || "引用 FQC / OQC 策略", "不在客户档案中执行现场检验动作"],
  ];
  $("#basicCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="basic-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderMaterialCards(active) {
  $("#basicCards").className = "basic-card-grid material-card-grid";
  const cards = [
    ["物料批次与检验", `${active.version} / ${active.ref}`, "物料自身的批次管控、IQC 口径和投料准入规则"],
    ["合格供应商引用", `${active.supplierName || "供应商待维护"} / ${active.supplierId || "无编码"}`, active.supplierQualification || "供应商资质待维护"],
    ["供应商质量等级", `${active.supplierStatus || "状态待同步"} / ${active.supplierQualityLevel || "质量等级待维护"}`, "来自客户供应商档案，不在物料资料里直接维护供应商资质"],
    ["供应商追溯与 IQC", active.supplierTraceRule || active.supplierIqcPolicy || "规则待维护", active.supplierIqcPolicy || "IQC 策略待维护"],
  ];
  $("#basicCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="basic-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderBomLines() {
  if (pageConfig.id !== "bom" || !$("#bomLinesPanel")) return;
  const active = getActive();
  const lines = getBomLines(active);
  const totalNeedPer = lines.reduce((sum, line) => sum + Number(line.needPer || 0), 0);
  const controlledCount = lines.filter((line) => /批次|指定/.test(line.batchControl || "")).length;
  const shortageCount = lines.filter((line) => getBomLineGap(line, active) > 0).length;
  const substituteCount = lines.filter((line) => line.substitute && line.substitute !== "无").length;
  $("#bomLinesHint").textContent = active
    ? `${active.id} · ${active.name} · 当前版本 ${active.version}，明细来自 PLM 发布后 MES 执行快照`
    : "查看当前 BOM 版本的子项物料、用量、工序、批次管控和投料防错要求";
  $("#bomLinesSummary").innerHTML = [
    ["子项物料", `${lines.length} 项`],
    ["单台标准用量", `${totalNeedPer || "-"} PCS`],
    ["批次管控", `${controlledCount} 项`],
    ["缺口风险", `${shortageCount} 项`],
    ["替代料", `${substituteCount} 项`],
  ].map(([label, value]) => `<span><em>${label}</em><strong>${value}</strong></span>`).join("");
  $("#bomLinesBody").innerHTML = lines.length ? lines.map((line) => `
    <tr>
      <td>${twoLine(line.materialNo, line.name)}</td>
      <td>${twoLine(line.usageRule || `${line.needPer || "-"} ${line.unit || "PCS"}/台`, `损耗 ${line.lossRate || "按 BOM 版本"}`)}</td>
      <td>${twoLine(line.operation || "工序待维护", line.station || "工位待绑定")}</td>
      <td>${pill(line.batchControl || "按物料规则")}</td>
      <td>${line.substitute || "无"}</td>
      <td>${buildBomInventoryCell(line, active)}</td>
      <td>${twoLine(line.antiError || "料号、批次、数量校验", getBomMaterialMasterText(line))}</td>
    </tr>
  `).join("") : `
    <tr>
      <td colspan="7">
        <div class="basic-empty">
          <strong>当前 BOM 版本还没有结构化物料明细</strong>
          <span>请在 BOM 维护中补齐子项物料、用量、工序、防错规则和替代料摘要；物料规格本身仍在物料资料菜单维护。</span>
        </div>
      </td>
    </tr>
  `;
}

function getBomMaterialMasterText(line) {
  const material = (window.MES_MASTER_DATA?.materials || []).find((item) => item.id === line.materialNo);
  if (!material) return "缺物料资料，禁止发布为可执行 BOM";
  return `物料资料已建档：${material.batchRule} / ${material.status}`;
}

function getBomLines(active) {
  const masterLines = window.MES_MASTER_DATA?.bomLines?.[active?.id];
  if (Array.isArray(masterLines)) return masterLines;
  return [];
}

function getBomLineGap(line, active) {
  const available = Number(line.available || 0);
  const transit = Number(line.transit || 0);
  const required = Number(line.required || line.need || getBomRequiredQty(active) * Number(line.needPer || 0));
  return Math.max(0, required - available - transit);
}

function getBomRequiredQty(active) {
  const bomHeader = (window.MES_MASTER_DATA?.bomHeaders || []).find((item) => item.id === active?.id);
  const order = (window.MES_MASTER_DATA?.orders || []).find((item) => item.productCode === bomHeader?.productCode);
  return Number(order?.qty || 1000);
}

function buildBomInventoryCell(line, active) {
  const gap = getBomLineGap(line, active);
  const status = gap ? `缺 ${gap}` : "可支持";
  return `
    <strong>${Number(line.available || 0)} ${line.unit || "PCS"} / ${status}</strong>
    <small>${line.eta || "到货时间待确认"}</small>
  `;
}

function renderProductImpactChecks(active) {
  const checks = buildProductImpactChecks(active);
  $("#basicCards").className = "basic-impact-grid";
  $("#basicCards").innerHTML = checks.map((check) => `
    <article class="impact-check impact-check--${check.tone}${check.variant ? ` impact-check--${check.variant}` : ""}">
      <div class="impact-check__head">
        <span>${check.title}</span>
        ${pill(check.status)}
      </div>
      <strong>${check.primary}</strong>
      <p>${check.detail}</p>
      ${check.body || ""}
      <div class="impact-check__meta">${check.meta.map((item) => `<em>${item}</em>`).join("")}</div>
      <div class="impact-check__links">${check.links.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}</div>
    </article>
  `).join("");
}

function buildProductImpactChecks(active) {
  const context = getProductImpactContext(active);
  const orderSummary = buildOrderReferenceSummary(context.orders);
  const bomStatus = context.bom?.status || "未关联";
  const routingStatus = context.routing?.status || "未关联";
  const labelStatus = context.labelConfirmed ? "已确认" : "待确认";
  const inspectionStatus = context.inspectionConfirmed ? "已配置" : "待确认";
  const conclusion = buildProductAccessConclusion(context, active);

  return [
    {
      variant: "orders",
      title: "订单引用",
      status: context.orders.length ? "已关联" : "未关联",
      tone: context.orders.length ? "blue" : "orange",
      primary: orderSummary.primary,
      detail: orderSummary.detail,
      body: orderSummary.body,
      meta: orderSummary.meta,
      links: [{ label: "订单评审", href: "../orders/order-reviews.html" }],
    },
    {
      title: "BOM 发布",
      status: bomStatus,
      tone: statusStyle(bomStatus),
      primary: context.bom?.id || context.product?.bom || "未关联 BOM",
      detail: context.bom ? `${context.bom.productName || active.name} / ${context.bom.version || active.version}` : "未找到可供齐套检查和投料防错引用的制造 BOM。",
      meta: [context.bom?.risk || "需维护制造 BOM、生效范围和损耗口径"],
      links: [{ label: "BOM 清单", href: "./bom-list.html" }],
    },
    {
      title: "工艺路线",
      status: routingStatus,
      tone: statusStyle(routingStatus),
      primary: context.routing?.id || context.product?.routing || "未关联工艺路线",
      detail: context.routing ? `${context.routing.steps || "工序链待维护"} / ${context.routing.sop || "SOP 待引用"}` : "未找到可供派工、工位指导和开工检查引用的工艺路线。",
      meta: [context.routing?.risk || "需维护工序顺序、SOP 引用和现场签收状态"],
      links: [{ label: "工艺路线", href: "./routing.html" }, { label: "开工检查", href: "../dispatch/start-check.html" }],
    },
    {
      title: "标签模板",
      status: labelStatus,
      tone: context.labelConfirmed ? "green" : "orange",
      primary: context.product?.labelTemplate || getRefPart(active, 2) || "未配置标签模板",
      detail: context.labelConfirmed ? "客户成品标签模板已可被成品标签、标签打印和包装入库引用。" : "客户标签模板未确认，成品标签打印和补打审批需拦截。",
      meta: [context.product?.customer || getProductCode(active), "来源 ERP 客户规则 / MES 标签版本"],
      links: [{ label: "成品标签", href: "../barcode/finished-labels.html" }],
    },
    {
      title: "检验规范",
      status: inspectionStatus,
      tone: context.inspectionConfirmed ? "green" : "orange",
      primary: context.product?.inspection || "未配置检验规范",
      detail: context.inspectionConfirmed ? "首件、过程检验或 FQC 规范已具备下游引用条件。" : "检验规范仍待质量确认，订单评审、排程或质量放行需提示阻断。",
      meta: [context.product?.owner || active.owner, context.product?.time || active.time],
      links: [{ label: "成品检验", href: "../quality/final-inspection.html" }, { label: "订单评审", href: "../orders/order-reviews.html" }],
    },
    {
      title: "准入结论",
      status: conclusion.status,
      tone: conclusion.tone,
      primary: conclusion.primary,
      detail: conclusion.detail,
      meta: conclusion.meta,
      links: [{ label: "开工检查", href: "../dispatch/start-check.html" }, { label: "订单评审", href: "../orders/order-reviews.html" }],
    },
  ];
}

function buildOrderReferenceSummary(orders) {
  if (!orders.length) {
    return {
      primary: "未关联生产订单",
      detail: "当前产品版本尚未被 ERP 工单引用，可先维护资料后进入订单评审。",
      body: "",
      meta: ["待订单下达"],
    };
  }
  const blocked = orders.filter((order) => /待评审|未排程|待排程|阻止|缺|冻结/.test(`${order.review || ""} ${order.schedule || ""} ${order.status || ""} ${order.materialGap || ""} ${order.risk || ""}`));
  const executable = Math.max(0, orders.length - blocked.length);
  const totalQty = orders.reduce((sum, order) => sum + Number(order.qty || 0), 0);
  const doneQty = orders.reduce((sum, order) => sum + Number(order.done || 0), 0);
  const earliestDue = orders.map((order) => order.due).filter(Boolean).sort()[0] || "待确认";
  const priorities = [...new Set(orders.map((order) => order.priority).filter(Boolean))].join("、") || "常规";
  const riskSummary = [...new Set(orders.map((order) => order.materialGap || order.risk).filter(Boolean))];
  return {
    primary: `${orders.length} 个订单引用`,
    detail: `${executable} 个可继续执行 / ${blocked.length} 个需复核`,
    body: `
      <div class="impact-order-summary">
        <span>总需求 <strong>${totalQty}</strong></span>
        <span>已完成 <strong>${doneQty}</strong></span>
        <span>最早交期 <strong>${earliestDue}</strong></span>
        <span>优先级 <strong>${priorities}</strong></span>
        <span>需复核 <strong>${blocked.length}</strong></span>
      </div>
    `,
    meta: riskSummary.length ? riskSummary : ["无阻断项"],
  };
}

function getProductImpactContext(active) {
  const master = window.MES_MASTER_DATA || {};
  const productCode = getProductCode(active);
  const product = (master.products || []).find((item) => item.id === active.id || item.code === productCode || active.name.includes(item.code));
  const code = product?.code || productCode;
  const orders = (master.orders || []).filter((order) => order.productCode === code || order.product === active.name);
  const bom = (master.bomHeaders || []).find((item) => item.id === product?.bom || item.id === getRefPart(active, 0) || item.productCode === code);
  const routing = (master.routings || []).find((item) => item.id === product?.routing || item.id === getRefPart(active, 1) || item.productCode === code);
  const label = product?.labelTemplate || getRefPart(active, 2);
  const inspection = product?.inspection || "";
  return {
    product,
    productCode: code,
    orders,
    bom,
    routing,
    labelConfirmed: Boolean(label) && !/待|未/.test(label),
    inspectionConfirmed: Boolean(inspection) && !/待|未|需.*签核|审批/.test(inspection),
  };
}

function buildProductAccessConclusion(context, active) {
  const texts = [
    active.status,
    active.risk,
    context.bom?.status,
    context.bom?.risk,
    context.routing?.status,
    context.routing?.risk,
    context.product?.inspection,
  ].join(" ");
  const orderBlock = context.orders.some((order) => /待评审|未排程/.test(`${order.review || ""} ${order.schedule || ""} ${order.status || ""}`));
  const missingBase = !context.bom || !context.routing || !context.labelConfirmed || !context.inspectionConfirmed;
  const hardBlock = orderBlock || missingBase || /阻止|拦截|冻结|影响评估|待质量|待现场|待替代|未确认|待审批|待签收|需.*签核/.test(texts);
  if (hardBlock) {
    return {
      status: "阻断待处置",
      tone: "red",
      primary: "排程或开工前需完成资料闭环",
      detail: "当前产品版本存在资料、BOM、工艺路线、标签或检验规范未闭环项，下游只能查看，不能作为现场执行依据。",
      meta: ["生成资料影响评估", "责任人复核后再发布执行快照"],
    };
  }
  const softRisks = context.orders.map((order) => order.materialGap || order.risk).filter((item) => item && !/齐套|正常/.test(item));
  if (softRisks.length || /缺料|交期|瓶颈/.test(texts)) {
    return {
      status: "可引用有风险",
      tone: "orange",
      primary: "产品资料可用于排程和开工准入",
      detail: "主数据版本已具备引用条件，但订单、物料或资源侧仍有风险，需要在齐套检查、排程或开工检查中继续跟踪。",
      meta: softRisks.length ? softRisks : ["保留缺料、交期或瓶颈资源提示"],
    };
  }
  return {
    status: "可执行引用",
    tone: "green",
    primary: "允许下游排程、派工、标签和追溯引用",
    detail: "产品、BOM、工艺路线、标签模板和检验规范均已具备 MES 执行版本条件。",
    meta: ["写入订单评审", "写入生产批次与追溯履历"],
  };
}

function getProductCode(active) {
  if (!active) return "";
  if (active.id?.startsWith("PRD-")) return active.id.replace("PRD-", "");
  const match = active.name?.match(/[A-Z]+-\d+/);
  return match?.[0] || active.id || "";
}

function getRefPart(active, index) {
  return active?.ref?.split("/").map((item) => item.trim())[index] || "";
}

function getBoundaryText() {
  if (pageConfig.id === "stations") return "工位终端、扫码枪、工牌/NFC、设备 HMI 或 PLC 产生模拟现场回执";
  if (pageConfig.id === "workshops") return "APS、设备保养和班次日历提供资源状态，MES 不直接控制产线";
  if (pageConfig.id === "materials") return "ERP/WMS/IQC 提供物料事实，MES 维护生产投料校验口径";
  if (pageConfig.id === "partners") return "ERP/QMS 提供客户和供应商事实，MES 维护执行引用、准入、生效和追溯口径";
  return "PLM/ERP 提供定义，MES 负责发布到现场执行版本并留痕";
}

function renderDetail() {
  const active = getActive();
  $("#basicDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.name} · ${active.version}`;
  const detailRows = pageConfig.id === "stations" ? [
    ["工厂/车间/产线", `${active.factory || "华东一厂"} / ${active.workshop || "电子装配车间"} / ${active.line || active.version}`],
    ["绑定设备", `${active.equipment || getRefPart(active, 0)} / ${active.equipmentStatus || "状态待回传"}`],
    ["绑定终端", active.terminal || getRefPart(active, 1)],
    ["人员资质要求", active.qualification || "资质待维护"],
    ["数据采集方式", active.dataCapture || "模拟扫码枪/HMI/PDA/设备回传"],
    ["现场显示内容", active.display || "任务卡、SOP、物料清单、检验要求和异常提示"],
    ["风险说明", active.risk],
  ] : pageConfig.id === "workshops" ? [
    ["资源层级", active.level || "资源"],
    ["日历编码", active.calendarId || "待维护"],
    ["上级日历", active.parentCalendar || "无"],
    ["班次窗口", active.version],
    ["覆盖日期", active.calendarRange || "待维护"],
    ["继承/覆盖规则", active.calendarMode || "待维护"],
    ["产能模型", active.capacityModel || active.ref],
    ["例外窗口", active.exceptions || "无"],
    ["责任人", active.owner],
    ["风险说明", active.risk],
  ] : pageConfig.id === "partners" ? [
    ["伙伴角色", getPartnerType(active)],
    ["业务状态", active.status],
    ["资质/要求", active.qualification || active.version],
    ["质量等级", active.qualityLevel || active.version],
    [getPartnerType(active) === "供应商" ? "可供物料范围" : "产品/标签范围", active.supplyScope || active.scope],
    ["批次追溯规则", active.traceRule || active.ref],
    ["来料/放行策略", active.iqcPolicy || active.ref],
    ["责任人", active.owner],
    ["时间戳", active.time],
    ["风险说明", active.risk],
  ] : pageConfig.id === "materials" ? [
    ["物料类型", active.materialType || active.scope],
    ["批次/检验规则", active.ref],
    ["供应商编码", active.supplierId || "待维护"],
    ["供应商名称", active.supplierName || "供应商待维护"],
    ["供应商状态", active.supplierStatus || "状态待同步"],
    ["供应商资质", active.supplierQualification || "资质待维护"],
    ["供应商质量等级", active.supplierQualityLevel || "质量等级待维护"],
    ["供应商追溯规则", active.supplierTraceRule || "追溯规则待维护"],
    ["来料检验策略", active.supplierIqcPolicy || active.ref],
    ["责任人", active.owner],
    ["时间戳", active.time],
    ["风险说明", active.risk],
  ] : [
    ["资料范围", active.scope],
    ["上游来源", active.source],
    ["关键引用", active.ref],
    ["责任人", active.owner],
    ["时间戳", active.time],
    ["风险说明", active.risk],
  ];
  $("#detailKv").innerHTML = detailRows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  const timelineTitle = $("#timelineList")?.closest(".basic-detail")?.querySelector("h3");
  if (timelineTitle) timelineTitle.textContent = pageConfig.id === "stations" ? "工位维护履历" : "版本与审批履历";
  $("#timelineList").innerHTML = buildTimeline(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderQuickLinks(active);
  renderLogs();
}

function renderQuickLinks(active) {
  const quickLinks = $(".quick-links");
  if (!quickLinks) return;
  const links = getQuickLinks(active);
  quickLinks.innerHTML = links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
}

function getQuickLinks(active) {
  if (pageConfig.id === "partners" && getPartnerType(active) === "供应商") {
    return [
      ["来料检验", "../quality/incoming-inspection.html"],
      ["缺料预警", "../materials/shortage-alerts.html"],
      ["批次追溯", "../traceability/batch-trace.html"],
    ];
  }
  if (pageConfig.id === "partners") {
    return [
      ["订单评审", "../orders/order-reviews.html"],
      ["成品标签", "../barcode/finished-labels.html"],
      ["客户追溯报告", "../traceability/customer-report.html"],
    ];
  }
  if (pageConfig.id === "materials") {
    return [
      ["客户供应商", "./partners.html"],
      ["来料检验", "../quality/incoming-inspection.html"],
      ["物料去向", "../traceability/material-flow.html"],
    ];
  }
  return [
    ["成品标签", "../barcode/finished-labels.html"],
    ["客户追溯报告", "../traceability/customer-report.html"],
    ["交付达成", "../reports/delivery-attainment.html"],
  ];
}

function buildTimeline(active) {
  if (pageConfig.id === "stations") {
    return [
      ["状态来源", `${active.source} 已维护 ${active.id}`],
      ["准入校验", /工位启用/.test(active.status) ? "工位档案、设备终端、人员资质和准入规则可被开工检查引用" : "需完成点检、转序接收、维护解除或负荷确认"],
      ["维护留痕", `${active.owner} 于 ${active.time} 维护 / 复核`],
      ["追溯引用", `${active.id} / ${active.line || active.version} 将写入工单、工序、设备和人员履历`],
    ];
  }
  if (pageConfig.id === "partners") {
    const role = getPartnerType(active);
    return [
      ["状态来源", `${active.source} 已同步 ${active.id}`],
      ["准入校验", role === "供应商" ? `${active.qualification || active.version}，${active.iqcPolicy || "IQC 策略待维护"}` : `${active.qualification || active.version}，客户标签和报告口径已校验`],
      ["维护留痕", `${active.owner} 于 ${active.time} 维护 / 复核`],
      ["追溯引用", role === "供应商" ? `${active.id} 将写入来料批次、IQC、投料和反向追溯` : `${active.id} 将写入订单、包装标签和客户追溯报告`],
    ];
  }
  if (pageConfig.id === "materials") {
    return [
      ["状态来源", `${active.source} 已同步 ${active.id}`],
      ["供应商引用", `${active.supplierId || "待维护"} / ${active.supplierName || "供应商待维护"}`],
      ["准入校验", `${active.status}；${active.supplierStatus || "供应商状态待同步"}；${active.supplierIqcPolicy || active.ref}`],
      ["维护留痕", `${active.owner} 于 ${active.time} 维护 / 复核`],
      ["追溯引用", `${active.id} 将与 ${active.supplierId || "供应商"}、来料批次、投料记录和成品谱系关联`],
    ];
  }
  return [
    ["同步接收", `${active.source} 已同步 ${active.id}`],
    ["校验结果", isReleasedStatus(active.status) ? "编码、版本、生效范围、责任人校验通过" : "存在待审批、待签收或影响评估事项"],
    ["审批留痕", `${active.owner} 于 ${active.time} 维护 / 复核`],
    ["追溯引用", `${active.id} / ${active.version} 将写入订单、批次或工位履历`],
  ];
}

function buildActions(active) {
  if (pageConfig.id === "stations") {
    return [
      ["准入控制", /工位启用/.test(active.status) ? "允许派工和开工检查引用该工位，现场动作仍由终端、扫码枪、HMI 或设备信号产生" : "阻止或提示现场开工引用，需完成点检、维护解除或转序接收"],
      ["准入结果", active.impact],
      ["异常闭环", /缺|冻结|待|风险|负荷|维护|预警/.test(active.risk + active.status) ? "需生成工位异常、设备点检、班组交接或计划调整记录" : "当前无阻断项，继续保留工位履历"],
      ["下游联动", active.downstream],
      ["准入校验", "开工前校验人员资质、设备状态、工位绑定、班组班次和终端签收"],
    ];
  }
  if (pageConfig.id === "partners") return buildPartnerActions(active);
  if (pageConfig.id === "materials") return buildMaterialActions(active);
  const actions = [
    ["发布控制", isReleasedStatus(active.status) ? "允许下游订单和现场任务引用当前版本" : "阻止或提示下游使用，需完成审批后发布"],
    ["影响评估", active.impact],
    ["异常闭环", /缺|冻结|待|评估|风险|负荷/.test(active.risk + active.status) ? "需生成资料异常、质量复核、计划调整或缺料处置" : "当前无阻断项，继续保留版本履历"],
    ["下游联动", active.downstream],
  ];
  if (pageConfig.id === "bom") actions.push(["用料校验", "齐套检查、领料申请和投料确认必须引用同一 BOM 版本"]);
  if (pageConfig.id === "bom") actions.push(["明细维护入口", "维护制造用量、损耗率、替代料和版本明细摘要，不编辑 PLM 设计 BOM"]);
  if (pageConfig.id === "routing") actions.push(["现场签收", "SOP、参数规格和检验触发规则需下发到工位终端"]);
  if (pageConfig.id === "routing") actions.push(["明细维护入口", "维护工序顺序、标准工时、SOP 引用和检验触发摘要，不编辑 PLM 工艺文件"]);
  if (pageConfig.id === "workshops") actions.push(["资源准入", "产线、班组、班次和产能日历发布后才允许 APS 排程与现场看板引用"]);
  return actions;
}

function buildPartnerActions(active) {
  const role = getPartnerType(active);
  if (role === "供应商") {
    return [
      ["准入控制", isReleasedStatus(active.status) ? "允许 IQC、投料准入和追溯查询引用该供应商规则" : "供应商规则存在复核或冻结事项，需阻止或提示下游使用"],
      ["供货范围", active.supplyScope || active.scope],
      ["来料检验", active.iqcPolicy || "IQC 策略待维护"],
      ["批次追溯", active.traceRule || active.ref],
      ["异常闭环", /缺|冻结|待|风险|观察/.test(active.risk + active.status + active.version) ? "需生成缺料、MRB、库存冻结或供应商质量复核记录" : "当前无阻断项，持续沉淀供应商批次质量表现"],
      ["下游联动", active.downstream],
    ];
  }
  return [
    ["准入控制", isReleasedStatus(active.status) ? "允许订单评审、标签打印和客户追溯报告引用该客户规则" : "客户资料存在复核事项，需阻止或提示下游使用"],
    ["客户要求", active.ref],
    ["报告口径", active.traceRule || "客户报告口径待维护"],
    ["质量放行", active.iqcPolicy || "引用 FQC / OQC 策略"],
    ["异常闭环", /缺|冻结|待|风险|压缩/.test(active.risk + active.status) ? "需生成计划调整、标签审批或客户资料复核记录" : "当前无阻断项，继续保留客户规则履历"],
    ["下游联动", active.downstream],
  ];
}

function buildMaterialActions(active) {
  return [
    ["投料准入", isReleasedStatus(active.status) ? "允许齐套检查、领料申请和投料防错引用该物料规则" : "物料处于待放行、替代评估或冻结状态，下游需阻止或提示"],
    ["供应商关联", `${active.supplierName || "供应商待维护"}（${active.supplierId || "无编码"}）`],
    ["供方资质", active.supplierQualification || "需在客户供应商中维护合格供方资质"],
    ["来料检验", active.supplierIqcPolicy || active.ref],
    ["批次追溯", active.supplierTraceRule || "供应商批次和来料批次规则待维护"],
    ["边界说明", "物料资料只引用合格供应商和检验追溯规则，不处理库存、领料、配送或线边库执行"],
    ["下游联动", active.downstream],
  ];
}

function getPartnerType(item = {}) {
  return item.partnerType || (item.id?.startsWith("SUP-") ? "供应商" : item.id?.startsWith("CUS-") ? "客户" : item.scope?.split("/")?.[0]?.trim() || "业务伙伴");
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}<em>${log.owner || getDefinition().user} · ${log.scope || pageConfig.title}</em></strong></div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生维护、模拟同步或影响评估记录</strong></div>`;
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderBomLines();
  renderRoutingLayers();
  renderStationProfile();
  renderWorkshopCalendar();
  renderCards();
  renderDetail();
}

function renderWorkshopCalendar() {
  if (pageConfig.id !== "workshops") return;
  ensureWorkshopCalendarPanel();
  const active = getActive();
  const calendarRows = getWorkshopCalendarRows();
  const calendarDates = getWorkshopCalendarDates();
  const checks = getWorkshopAccessChecks(active);
  $("#workshopCalendarHint").textContent = "按资源和日期查看车间基准日历、产线继承/覆盖、加班、停线、保养和瓶颈资源占用；APS 按最终产线日历计算。";
  $("#workshopCalendarSummary").innerHTML = [
    ["车间日历", calendarRows.filter((item) => item.level === "车间").length],
    ["产线日历", calendarRows.filter((item) => item.level === "产线").length],
    ["覆盖 06-20 至 06-23", calendarRows.filter((item) => item.range.includes("2026-06-20") && item.range.includes("2026-06-23")).length],
    ["存在例外窗口", calendarRows.filter((item) => item.exceptions && item.exceptions !== "无").length],
  ].map(([label, value]) => `<span><em>${label}</em><strong>${value}</strong></span>`).join("");
  $("#workshopCalendarGrid").style.setProperty("--calendar-days", calendarDates.length);
  $("#workshopCalendarGrid").innerHTML = `
    <div class="workshop-calendar-corner">
      <strong>资源 / 日历</strong>
      <span>点击资源查看详情</span>
    </div>
    ${calendarDates.map((date) => `<div class="workshop-calendar-day"><strong>${date.label}</strong><span>${date.week}</span></div>`).join("")}
    ${calendarRows.map((item) => `
      <button class="workshop-calendar-resource${item.id === active?.id ? " is-active" : ""}" type="button" data-id="${item.id}">
        <span>${item.level}</span>
        <strong>${item.name}</strong>
        <em>${item.calendarId}</em>
      </button>
      ${calendarDates.map((date) => buildWorkshopCalendarCell(item, date)).join("")}
    `).join("")}
  `;
  $("#workshopCalendarGrid").querySelectorAll("[data-id]").forEach((node) => {
    node.addEventListener("click", () => {
      state.activeId = node.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#workshopAccessList").innerHTML = checks.map((check) => `
    <article class="workshop-access-item workshop-access-item--${check.status === "通过" ? "green" : "orange"}">
      <div><span>${check.label}</span>${pill(check.status)}</div>
      <strong>${check.desc}</strong>
      <em>${check.trace}</em>
    </article>
  `).join("");
}

function ensureWorkshopCalendarPanel() {
  if ($("#workshopCalendarPanel")) return;
  const tablePanel = $(".basic-panel");
  const panel = document.createElement("section");
  panel.id = "workshopCalendarPanel";
  panel.className = "basic-panel workshop-calendar-panel";
  panel.innerHTML = `
    <div class="basic-panel__head">
      <div>
        <h3>资源日历矩阵与排程准入</h3>
        <p id="workshopCalendarHint"></p>
      </div>
      <a class="secondary-link" href="../orders/production-schedule.html">查看排程</a>
    </div>
    <div id="workshopCalendarSummary" class="workshop-calendar-summary"></div>
    <div class="workshop-calendar-wrap">
      <div id="workshopCalendarGrid" class="workshop-calendar-grid"></div>
    </div>
    <div class="workshop-calendar-legend">
      <span><i class="is-base"></i>车间基准</span>
      <span><i class="is-inherit"></i>继承车间</span>
      <span><i class="is-override"></i>产线覆盖</span>
      <span><i class="is-exception"></i>例外占用</span>
      <span><i class="is-risk"></i>排程风险</span>
    </div>
    <div class="workshop-access">
      <div class="station-section-title">
        <h4>TCU-100 首批 800 台排程前检查</h4>
        <span>基础资料 / 产线车间</span>
      </div>
      <div id="workshopAccessList" class="workshop-access-list"></div>
    </div>
  `;
  tablePanel.insertAdjacentElement("afterend", panel);
}

function getWorkshopCalendarDates() {
  return [
    { key: "2026-06-20", label: "06-20", week: "周六" },
    { key: "2026-06-21", label: "06-21", week: "周日" },
    { key: "2026-06-22", label: "06-22", week: "周一" },
    { key: "2026-06-23", label: "06-23", week: "周二" },
  ];
}

function buildWorkshopCalendarCell(item, date) {
  const cell = getWorkshopCalendarCell(item, date);
  return `
    <button class="workshop-calendar-cell workshop-calendar-cell--${cell.tone}${item.id === state.activeId ? " is-active-row" : ""}" type="button" data-id="${item.id}" aria-label="${item.name} ${date.label} ${cell.title}">
      <span>${cell.source}</span>
      <strong>${cell.title}</strong>
      <em>${cell.event}</em>
      <small>${cell.capacity}</small>
    </button>
  `;
}

function getWorkshopCalendarCell(item, date) {
  if (item.id === "FAC-EAST-01") {
    return {
      tone: date.key === "2026-06-22" ? "exception" : "base",
      source: "车间基准",
      title: "白班 + 夜班",
      event: date.key === "2026-06-22" ? "夜班 02:00-04:00 检修" : "基准生产窗口有效",
      capacity: "36h / 车间",
    };
  }
  if (item.id === "LINE-A") {
    const isMaintenance = date.key === "2026-06-21";
    return {
      tone: isMaintenance ? "exception" : "override",
      source: "继承白班",
      title: "白班 08:00-20:00",
      event: isMaintenance ? "18:00-20:00 老化房保养" : "TCU-100 首批可排程",
      capacity: "800 台首批 / 老化瓶颈",
    };
  }
  if (item.id === "LINE-B") {
    const isFault = date.key === "2026-06-20";
    return {
      tone: isFault ? "risk" : "override",
      source: "追加加班",
      title: "白班 + 20:00-22:00",
      event: isFault ? "Test-B2 15:00-17:00 复测" : "加班需车间主任确认",
      capacity: "测试台 B2 瓶颈",
    };
  }
  if (item.id === "LINE-C") {
    const isAudit = date.key === "2026-06-23";
    return {
      tone: isAudit ? "exception" : "inherit",
      source: "缩短班次",
      title: "白班 08:00-18:00",
      event: isAudit ? "16:00-18:00 客户稽核预留" : "包装节拍优先",
      capacity: "包装 / 装配",
    };
  }
  return {
    tone: "inherit",
    source: item.level || "资源",
    title: item.shift || item.version,
    event: item.exceptions || item.mode,
    capacity: item.capacity,
  };
}

function getWorkshopCalendarRows() {
  return rows.map((item) => ({
    id: item.id,
    level: item.level || (item.id.startsWith("LINE-") ? "产线" : "车间"),
    name: item.name,
    calendarId: item.calendarId || item.id,
    parentCalendar: item.parentCalendar || "工厂工作日历",
    shift: item.version,
    range: item.calendarRange || "覆盖日期待维护",
    mode: item.calendarMode || "继承规则待维护",
    capacity: item.capacityModel || item.ref,
    exceptions: item.exceptions || "无",
    status: item.status,
  }));
}

function getWorkshopAccessChecks(active) {
  const lineA = rows.find((item) => item.id === "LINE-A") || active;
  const workshop = rows.find((item) => item.id === "FAC-EAST-01") || active;
  const range = `${lineA?.calendarRange || ""} ${workshop?.calendarRange || ""}`;
  return [
    { label: "车间启用", status: /资源启用|可排程/.test(workshop?.status || "") ? "通过" : "待复核", desc: `${workshop?.name || "车间"} 状态为 ${workshop?.status || "待维护"}`, trace: "作为订单工厂、车间、权限范围合法来源" },
    { label: "Line-A 启用", status: /可排程|资源启用/.test(lineA?.status || "") ? "通过" : "待复核", desc: `${lineA?.name || "Line-A"} 状态为 ${lineA?.status || "待维护"}`, trace: "作为 TCU-100 工单目标产线和派工资源" },
    { label: "日期覆盖", status: /2026-06-20/.test(range) && /2026-06-23/.test(range) ? "通过" : "待复核", desc: lineA?.calendarRange || "产线日历覆盖范围待维护", trace: "APS 可计算计划开始、计划结束和设备占用" },
    { label: "班次规则", status: /08:00-20:00/.test(lineA?.version || "") ? "通过" : "待复核", desc: lineA?.version || "班次未配置", trace: "白班窗口用于首批 800 台工序级排程" },
    { label: "瓶颈资源", status: /老化|Aging/.test(`${lineA?.capacityModel || ""} ${lineA?.ref || ""}`) ? "通过" : "待复核", desc: lineA?.capacityModel || "瓶颈资源待维护", trace: "老化测试容量会限制首批完工时间" },
    { label: "工位与线边库", status: /SMT-01/.test(lineA?.ref || "") && /Pack-A/.test(lineA?.ref || "") && /LS-A/.test(lineA?.capacityModel || "") ? "通过" : "待复核", desc: lineA?.ref || "绑定工位待维护", trace: "支撑领料、线边签收、开工检查和追溯" },
  ];
}

function renderRoutingLayers() {
  if (pageConfig.id !== "routing" || !$("#routingOverview")) return;
  const active = getActive();
  const detail = getRoutingDetail(active);
  const blockedCount = detail.steps.filter((step) => /拦截|待|未|风险|瓶颈/.test(`${step.access} ${step.handoff} ${step.status}`)).length;
  const signedCount = detail.standards.filter((standard) => /已签收|已下发|可引用|已生效/.test(standard.signoff)).length;
  $("#routingOverviewHint").textContent = `${active.id} · ${active.name} · 当前版本 ${active.version}，MES 展示 PLM 发布后的现场执行快照`;
  $("#routingOverview").innerHTML = [
    ["适用产品", detail.product, detail.scope],
    ["工序数量", `${detail.steps.length} 道`, `${blockedCount ? `${blockedCount} 道存在准入或转序风险` : "工序链完整，可供派工展开"}`],
    ["执行标准", `${detail.standards.length} 项`, `${signedCount} 项已完成现场签收或可引用`],
    ["下发状态", detail.release, detail.trace],
  ].map(([label, value, hint]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");

  $("#routingSteps").innerHTML = detail.steps.length ? detail.steps.map((step) => `
    <article class="routing-step">
      <div class="routing-step__seq">${String(step.seq).padStart(2, "0")}</div>
      <div class="routing-step__body">
        <div class="routing-step__head">
          <div><strong>${step.name}</strong><span>${step.workCenter} / ${step.station}</span></div>
          ${pill(step.status)}
        </div>
        <div class="routing-step__grid">
          <span><em>设备/终端</em><strong>${step.equipment}</strong></span>
          <span><em>标准工时</em><strong>${step.stdTime}</strong></span>
          <span><em>准入校验</em><strong>${step.access}</strong></span>
          <span><em>转序条件</em><strong>${step.handoff}</strong></span>
        </div>
      </div>
    </article>
  `).join("") : `
    <div class="basic-empty"><strong>当前路线还没有结构化工序明细</strong><span>请补齐工序顺序、工作中心、工位设备、准入校验和转序条件；MES 只维护执行快照，不编辑 PLM 原始工艺文件。</span></div>
  `;

  $("#routingStandards").innerHTML = detail.standards.length ? detail.standards.map((standard) => `
    <article class="routing-standard routing-standard--${statusStyle(standard.signoff)}">
      <div class="routing-standard__head">
        <div><span>${standard.type}</span><strong>${standard.no}</strong></div>
        ${pill(standard.signoff)}
      </div>
      <p>${standard.name}</p>
      <div class="routing-standard__meta">
        <span>来源：${standard.source}</span>
        <span>版本：${standard.version}</span>
        <span>范围：${standard.scope}</span>
        <span>引用：${standard.trace}</span>
      </div>
    </article>
  `).join("") : `
    <div class="basic-empty"><strong>当前路线还没有执行标准引用</strong><span>需要绑定 SOP、参数规格、检验规范或图纸版本后，才能支持开工检查、工艺指导和质量放行。</span></div>
  `;
}

function renderStationProfile() {
  if (pageConfig.id !== "stations" || !$("#stationProfile")) return;
  const active = getActive();
  if (!active) {
    $("#stationProfile").innerHTML = `<div class="basic-empty"><strong>当前没有工位档案</strong><span>请新增工位并维护设备、终端、资质和开工准入规则。</span></div>`;
    return;
  }
  const accessRules = getStationAccessRules(active);
  const captureItems = splitStationText(active.dataCapture || "模拟扫码枪/HMI/PDA/设备回传");
  const displayItems = splitStationText(active.display || "任务卡、SOP、物料清单、检验要求、异常提示");
  $("#stationProfile").innerHTML = `
    <div class="station-profile">
      <section class="station-profile__hero">
        <div>
          <span>${active.operation || "工序待维护"}</span>
          <h4>${active.name}</h4>
          <p>${active.factory || "华东一厂"} / ${active.workshop || "电子装配车间"} / ${active.line || active.version}</p>
        </div>
        ${pill(active.status)}
      </section>
      <section class="station-profile__grid">
        ${buildStationKv("工位编码", active.id)}
        ${buildStationKv("工位名称", active.name)}
        ${buildStationKv("绑定设备", `${active.equipment || getRefPart(active, 0)} / ${active.equipmentStatus || "状态待回传"}`)}
        ${buildStationKv("绑定终端", active.terminal || getRefPart(active, 1))}
        ${buildStationKv("人员资质", active.qualification || "资质待维护")}
        ${buildStationKv("责任人/时间", `${active.owner} / ${active.time}`)}
      </section>
      <section class="station-access">
        <div class="station-section-title">
          <h4>开工准入规则</h4>
          <span>${accessRules.length} 项校验</span>
        </div>
        <div class="station-access__list">
          ${accessRules.map((rule) => {
            const blocked = /待|未|异常|拦截|离线|缺/.test(rule);
            return `<div class="station-access__item ${blocked ? "is-warning" : "is-pass"}"><span>${blocked ? "待" : "过"}</span><strong>${rule}</strong></div>`;
          }).join("")}
        </div>
      </section>
      <section class="station-profile__twocol">
        <div>
          <div class="station-section-title"><h4>数据采集方式</h4><span>模拟现场回执</span></div>
          <div class="station-chip-list">${captureItems.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
        <div>
          <div class="station-section-title"><h4>现场显示内容</h4><span>工位终端/HMI</span></div>
          <div class="station-chip-list">${displayItems.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
      </section>
      <section class="station-trace">
        <div>
          <span>追溯关联</span>
          <strong>${active.trace || "后续生产履历可绑定工序、工位、设备、人员和时间"}</strong>
        </div>
        <div>
          <span>下游闭环</span>
          <strong>${active.downstream}</strong>
        </div>
      </section>
    </div>
  `;
}

function getStationAccessRules(active) {
  if (Array.isArray(active?.accessRules)) return active.accessRules;
  const fallback = [
    `${active?.impact || "派工单已下达"}`,
    `${active?.qualification || "人员资质"} 有效`,
    `${active?.equipment || "设备"} 状态可用`,
    "SOP 版本已签收",
    "物料齐套或前序状态满足准入",
  ];
  return fallback.filter(Boolean);
}

function splitStationText(text) {
  return String(text)
    .split(/[、，,+/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildStationKv(label, value) {
  return `<div><span>${label}</span><strong>${value || "待维护"}</strong></div>`;
}

function getRoutingDetail(active) {
  const masterRouting = (window.MES_MASTER_DATA?.routings || []).find((item) => item.id === active?.id);
  const productCode = masterRouting?.productCode || active?.scope?.split("/")?.[0]?.trim() || getProductCode(active);
  const steps = getRoutingSteps(active, masterRouting);
  return {
    product: `${productCode || active?.name || "产品待关联"} / ${active.version}`,
    scope: active.scope,
    release: /已发布/.test(active.status) ? "已发布到执行" : active.status,
    trace: `责任人 ${active.owner} / ${active.time} / ${active.downstream}`,
    steps,
    standards: getRoutingStandards(active, masterRouting, steps),
  };
}

function getRoutingSteps(active, masterRouting) {
  const routeSteps = window.MES_MASTER_DATA?.routingSteps?.[active?.id];
  if (Array.isArray(routeSteps)) return routeSteps;
  const names = (masterRouting?.steps || active?.ref?.split("/")?.[0] || "").split(">").map((item) => item.trim()).filter(Boolean);
  const stationMap = {
    SMT: ["SMT 中心", "SMT-WS-01", "SMT-01 / 扫码枪 / Feeder 绑定", "首件放行 + 料站绑定"],
    DIP: ["DIP 插件线", "DIP-A-02", "DIP-A1 / 工牌 NFC / HMI", "上道 SMT 批次转入"],
    烧录: ["程序烧录区", "PRG-A-01", "烧录治具 / 程序版本校验", "程序版本与产品 SN 匹配"],
    装配: ["整机装配线", "ASM-A-01", "装配工位终端 / 扭矩工具", "BOM 物料批次和外观件版本校验"],
    测试: ["功能测试区", "TEST-B-01", "测试台 API / 参数自动采集", "测试程序版本和参数规格有效"],
    功能测试: ["功能测试区", "TEST-B-01", "测试台 API / 参数自动采集", "测试程序版本和参数规格有效"],
    老化: ["老化房", "AGING-A-01", "老化柜 / 温度曲线采集", "老化时长与温度曲线达标"],
    FQC: ["成品检验区", "QC-FINAL", "QMS 抽样方案 / 检验台", "FQC 检验合格或质量放行"],
    包装: ["包装线", "PACK-A-01", "包装工位 / 标签打印机", "成品标签和箱码托盘码绑定"],
  };
  return names.map((name, index) => {
    const matchedKey = Object.keys(stationMap).find((key) => name.includes(key));
    const [workCenter, station, equipment, access] = stationMap[matchedKey] || ["工序中心待维护", "工位待绑定", "终端/设备待绑定", "准入规则待维护"];
    const isRisk = /待现场签收|影响评估|待质量|拦截/.test(active.status + active.risk);
    return {
      seq: index + 1,
      name,
      workCenter,
      station,
      equipment,
      stdTime: index === 0 ? "18 分/批" : matchedKey === "老化" ? "240 分/批" : "12 分/批",
      access,
      handoff: index === names.length - 1 ? "完工确认后进入包装/入库" : `合格后转 ${names[index + 1]}`,
      status: isRisk && index >= Math.max(0, names.length - 2) ? "待复核" : "可执行",
    };
  });
}

function getRoutingStandards(active, masterRouting, steps) {
  const routeStandards = window.MES_MASTER_DATA?.routingStandards?.[active?.id];
  if (Array.isArray(routeStandards)) return routeStandards;
  const sop = masterRouting?.sop || active?.ref?.split("/")?.map((item) => item.trim()).find((item) => item.includes("SOP")) || "SOP 待绑定";
  const productCode = masterRouting?.productCode || active?.scope?.split("/")?.[0]?.trim() || "产品";
  const isBlocked = /待现场签收|待质量|影响评估|拦截|未/.test(active.status + active.risk);
  return [
    { type: "电子 SOP", no: sop, name: `${productCode} 工位作业指导书`, source: "PLM 文档库", version: active.version, scope: steps.map((step) => step.name).slice(0, 4).join("、") || "全路线", signoff: isBlocked ? "待现场签收" : "已签收", trace: "工艺指导 / 派工单任务卡" },
    { type: "工艺参数", no: `PAR-${productCode}-${active.version}`, name: "关键参数上下限、测试程序和老化曲线", source: "PLM 参数规格 + 设备程序库", version: active.version, scope: "测试、老化、过程监控", signoff: isBlocked ? "待复核" : "可引用", trace: "过程记录 / 工艺参数趋势" },
    { type: "检验规范", no: `QCP-${productCode}-${active.version}`, name: "首件、过程检验、FQC 检验计划", source: "QMS / PLM 检验规范", version: active.version, scope: "首件、IPQC、FQC", signoff: /待质量|影响评估/.test(active.status + active.risk) ? "待质量签核" : "已生效", trace: "首件检验 / 成品检验" },
    { type: "图纸/包装", no: `DWG-${productCode}-${active.version}`, name: "装配图纸、铭牌位置和包装规范", source: "PLM 图纸 + 客户标签规则", version: active.version, scope: "装配、FQC、包装", signoff: isBlocked ? "待下发" : "已下发", trace: "工位签收 / 客户追溯报告" },
  ];
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  active.time = formatNow();
  if (status === "已发布" || status === "工位启用" || status === "可投料" || status === "资源启用" || status === "可排程" || status === "业务生效") {
    active.impact = pageConfig.id === "stations" ? "已允许开工检查引用" : "已允许下游执行引用";
  }
  if (status === "影响评估中") active.impact = "已生成资料影响评估任务";
  if (status === "维护中") active.impact = "已登记工位维护，维护解除前不允许现场开工引用";
  appendLog(message || `${active.id} 状态更新为 ${status}`, active);
  saveState();
  renderAll();
}

function appendLog(text, row = getActive()) {
  logs.unshift({
    time: formatNow(),
    text,
    owner: row?.owner || getDefinition().user,
    scope: row?.scope || row?.impact || pageConfig.title,
  });
  logs = logs.slice(0, 30);
}

function formatNow() {
  const now = new Date();
  const date = now.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }).replace(/\//g, "-");
  const time = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${date} ${time}`;
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  const nextStatus = getPublishedStatus();
  const message = pageConfig.id === "stations"
    ? `${getActive().id} 已记录${getDefinition().simulationTitle}${value ? `：${value}` : ""}，MES 仅形成工位状态回执和准入履历`
    : `${getActive().id} 已记录${getDefinition().simulationTitle}${value ? `：${value}` : ""}，MES 仅形成执行快照和审批留痕`;
  updateActiveStatus(nextStatus, message);
  showToast("模拟同步已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone(initialRows[pageConfig.id]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", source: "all", detailOpen: true };
  logs = [];
  $("#searchInput").value = "";
  $("#statusFilter").value = "all";
  $("#sourceFilter").value = "all";
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

function ensureMaintenanceActions() {
  if (!$("#addMasterDataBtn")) {
    const primary = $("#primaryActionBtn");
    const addButton = document.createElement("button");
    addButton.id = "addMasterDataBtn";
    addButton.className = "primary-action";
    addButton.type = "button";
    addButton.textContent = `新增${pageConfig.title}`;
    primary.parentElement.insertBefore(addButton, primary);

    const importButton = document.createElement("button");
    importButton.id = "mockImportBtn";
    importButton.className = "secondary-action";
    importButton.type = "button";
    importButton.textContent = "导入模拟";
    primary.parentElement.insertBefore(importButton, primary);
  }
  if (!$("#masterDataDialog")) mountMaintenanceDialogs();
}

function mountMaintenanceDialogs() {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div id="masterDataDialog" class="basic-modal" hidden>
      <section class="basic-modal__panel" role="dialog" aria-modal="true" aria-labelledby="masterDataDialogTitle">
        <div class="basic-modal__head">
          <div>
            <h3 id="masterDataDialogTitle">维护${pageConfig.title}</h3>
            <p>MES 维护执行快照、生效范围和审批留痕，不直接改写 ERP/PLM/WMS/QMS 原始档案。</p>
          </div>
          <button id="closeMasterDataDialogBtn" class="icon-button" type="button" aria-label="关闭维护弹窗">×</button>
        </div>
        <form id="masterDataForm" class="basic-form">
          <input id="editingRowId" type="hidden" />
          <div class="basic-form-grid">
            <label>编码<input id="formId" required /></label>
            <label>名称<input id="formName" required /></label>
            <label>版本 / 分组<input id="formVersion" required /></label>
            <label>来源<select id="formSource" required></select></label>
            <label>状态<select id="formStatus"></select></label>
            <label>关键引用<input id="formRef" required /></label>
            <label>影响范围<input id="formImpact" required /></label>
            <label>责任人<input id="formOwner" required /></label>
            <label>生效范围<textarea id="formScope" rows="2" required></textarea></label>
            <label>风险与准入<textarea id="formRisk" rows="2" required></textarea></label>
            <label class="span-2">下游引用<textarea id="formDownstream" rows="2" required></textarea></label>
          </div>
          <div class="basic-form-note" id="formDomainNote"></div>
          <div class="basic-modal__actions">
            <button id="cancelMasterDataDialogBtn" class="secondary-action" type="button">取消</button>
            <button class="primary-action" type="submit">保存维护</button>
          </div>
        </form>
      </section>
    </div>
    <div id="basicConfirmDialog" class="basic-confirm" hidden>
      <section class="basic-confirm__panel" role="dialog" aria-modal="true" aria-labelledby="basicConfirmTitle">
        <div class="basic-confirm__head">
          <span id="basicConfirmTone" class="basic-confirm__badge">需要确认</span>
          <button id="basicConfirmCloseBtn" class="icon-button" type="button" aria-label="关闭确认弹窗">×</button>
        </div>
        <h3 id="basicConfirmTitle">确认操作</h3>
        <p id="basicConfirmMessage"></p>
        <div id="basicConfirmMeta" class="basic-confirm__meta"></div>
        <div class="basic-confirm__actions">
          <button id="basicConfirmCancelBtn" class="secondary-action" type="button">取消</button>
          <button id="basicConfirmOkBtn" class="primary-action" type="button">确认</button>
        </div>
      </section>
    </div>
  `;
  document.body.append(...wrapper.children);
  $("#formStatus").innerHTML = getStatusOptions().map((status) => `<option value="${status}">${status}</option>`).join("");
  $("#formSource").innerHTML = getSourceOptions().map((source) => `<option value="${source}">${source}</option>`).join("");
  $("#formDomainNote").textContent = getFormDomainNote();
}

function getStatusOptions() {
  const options = {
    products: ["草稿", "待审批", "影响评估中", "已发布", "停用"],
    materials: ["可投料", "待IQC放行", "替代料评估中", "冻结待复核", "停用"],
    bom: ["草稿", "待审批", "影响评估中", "已发布", "停用"],
    routing: ["草稿", "待审批", "待现场签收", "影响评估中", "已发布", "停用"],
    stations: ["工位启用", "待点检", "待转序接收", "维护中", "负荷预警", "停用"],
    workshops: ["资源启用", "可排程", "日历待复核", "负荷预警", "停用"],
    partners: ["业务生效", "待资料复核", "待到货复核", "冻结待复核", "停用"],
  };
  return [...new Set([...(options[pageConfig.id] || ["草稿", "待审批", "已发布", "停用"]), ...rows.map((row) => row.status)])];
}

function getSourceOptions(extra = "") {
  const defaults = {
    products: ["ERP 物料主数据", "PLM 产品定义", "ERP 物料 + PLM 产品", "ERP 新增 + PLM 工艺", "PLM 发布 + ERP 物料", "PLM 变更 ECN", "MES 手工维护"],
    materials: ["ERP 物料主数据", "ERP 物料 + WMS 库存", "ERP 物料 + IQC 规则", "ERP 物料 + QMS 冻结", "MES 手工维护"],
    bom: ["PLM 发布", "PLM 工程变更", "PLM 变更待评估", "MES 手工维护"],
    routing: ["PLM 工艺发布", "PLM 首版", "PLM ECN 变更", "MES 手工维护"],
    stations: ["MES 维护 + 设备/终端状态", "设备 API + 工位终端", "测试台 API", "QMS 抽样方案"],
    workshops: ["MES 资源模型", "APS 产能日历", "APS + 设备保养计划", "MES 手工维护"],
    partners: ["ERP 客户资料", "QMS 供应商档案", "ERP / QMS 伙伴同步", "MES 手工维护"],
  };
  return [...new Set([...(defaults[pageConfig.id] || ["MES 手工维护"]), ...rows.map((row) => row.source), extra].filter(Boolean))];
}

function getFormDomainNote() {
  const notes = {
    bom: "BOM 明细入口只维护制造用量摘要、损耗率、替代料和版本明细摘要，不作为 PLM 设计 BOM 编辑器。",
    routing: "工艺路线明细入口只维护工序链、SOP 引用、参数规格和现场签收摘要，不作为 PLM 工艺文件编辑器。",
    products: "产品版本状态描述产品资料从草稿、审批、影响评估到已发布的生命周期；已发布后才允许订单评审、BOM、工艺路线、标签和追溯引用。",
    materials: "投料准入状态描述物料是否允许进入齐套检查、领料和投料；可投料、待IQC放行、替代料评估中、冻结待复核比通用审批状态更贴近现场。",
    bom: "BOM版本状态描述制造 BOM 从草稿、审批、影响评估到已发布的生命周期；已发布后才允许齐套、领料和投料防错引用。",
    routing: "工艺版本状态描述工艺路线从草稿、审批、现场签收到已发布的生命周期；现场签收和质量触发未完成时不允许开工准入通过。",
    stations: "工序工位状态描述现场资源是否可被引用，例如工位启用、待点检、待转序接收、维护中、负荷预警；草稿、待审批、影响评估中属于资料发布生命周期，不作为工位状态使用。",
    workshops: "资源排程状态描述车间、产线、班组和日历是否可被 APS、派工和现场看板引用，例如资源启用、可排程、日历待复核、负荷预警。",
    partners: "业务准入状态描述客户或供应商规则是否可被订单评审、IQC、标签和追溯引用，例如业务生效、待资料复核、待到货复核、冻结待复核。",
    workshops: "产线车间需维护车间、产线、班组、班次和产能日历；MES 不直接控制现场产线。",
    partners: "客户供应商需维护标签要求、供应商质量等级和追溯口径，并保留 ERP/QMS 模拟同步来源。",
  };
  return notes[pageConfig.id] || "维护结果发布后只作为 MES 执行版本和下游校验口径，外部系统同步均为模拟记录。";
}

function handleRowAction(action, id) {
  const row = rows.find((item) => item.id === id);
  if (!row) return;
  state.activeId = row.id;
  if (action === "edit") openMasterDataDialog(row);
  if (action === "copy") copyVersion(row);
  if (action === "approve") submitApproval(row);
  if (action === "resync") resyncProductVersion(row);
  if (action === "publish") publishRow(row);
  if (action === "withdraw") withdrawRow(row);
  if (action === "disable") toggleRow(row, false);
  if (action === "enable") toggleRow(row, true);
}

function openMasterDataDialog(row = null) {
  const isEdit = Boolean(row);
  $("#masterDataDialogTitle").textContent = `${isEdit ? "编辑" : "新增"}${pageConfig.title}`;
  $("#editingRowId").value = row?.id || "";
  $("#formId").value = row?.id || buildNextId();
  $("#formId").disabled = isEdit;
  $("#formName").value = row?.name || "";
  $("#formVersion").value = row?.version || "V1.0";
  const selectedSource = row?.source || "MES 手工维护";
  $("#formSource").innerHTML = getSourceOptions(selectedSource).map((source) => `<option value="${source}">${source}</option>`).join("");
  $("#formSource").value = selectedSource;
  $("#formStatus").value = row?.status || (pageConfig.id === "stations" ? "待点检" : "草稿");
  $("#formRef").value = row?.ref || getDefaultRef();
  $("#formImpact").value = row?.impact || (pageConfig.id === "stations" ? "待点检复核，暂不允许开工引用" : "待提交审批，暂不允许下游执行引用");
  $("#formOwner").value = row?.owner || getDefinition().user;
  $("#formScope").value = row?.scope || getDefaultScope();
  $("#formRisk").value = row?.risk || "需完成编码、版本、生效范围和下游影响校验";
  $("#formDownstream").value = row?.downstream || getDefaultDownstream();
  $("#masterDataDialog").hidden = false;
  $("#formName").focus();
}

function closeMasterDataDialog() {
  $("#masterDataDialog").hidden = true;
  $("#masterDataForm").reset();
  $("#formId").disabled = false;
}

function saveMasterDataForm(event) {
  event.preventDefault();
  const editingId = $("#editingRowId").value;
  const next = {
    id: $("#formId").value.trim(),
    name: $("#formName").value.trim(),
    version: $("#formVersion").value.trim(),
    source: $("#formSource").value,
    status: $("#formStatus").value,
    ref: $("#formRef").value.trim(),
    impact: $("#formImpact").value.trim(),
    owner: $("#formOwner").value.trim(),
    time: formatNow(),
    scope: $("#formScope").value.trim(),
    risk: $("#formRisk").value.trim(),
    downstream: $("#formDownstream").value.trim(),
  };
  if (!next.id || !next.name) return;
  const duplicate = rows.some((row) => row.id === next.id && row.id !== editingId);
  if (duplicate) {
    showToast("编码已存在，请更换主数据编码");
    return;
  }
  if (editingId) {
    rows = rows.map((row) => (row.id === editingId ? next : row));
    appendLog(`${next.id} 已编辑，更新执行快照、影响范围和审批责任人`, next);
  } else {
    rows.unshift(next);
    appendLog(pageConfig.id === "stations" ? `${next.id} 已新增，状态为待点检，等待设备、终端和准入规则复核` : `${next.id} 已新增，状态为草稿，等待提交审批`, next);
  }
  window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, next, editingId ? "编辑主数据" : "新增主数据", { status: next.status, owner: next.owner, impact: next.impact });
  state.activeId = next.id;
  closeMasterDataDialog();
  saveState();
  renderPageChrome();
  renderAll();
  showToast(`${pageConfig.title}已保存`);
}

function copyVersion(row) {
  const copy = {
    ...row,
    id: `${row.id}-COPY-${String(Date.now()).slice(-4)}`,
    version: nextVersion(row.version),
    status: pageConfig.id === "stations" ? "待点检" : "草稿",
    impact: pageConfig.id === "stations" ? "复制工位配置待点检，确认前不允许开工引用" : "复制版本待评估，未发布前不允许现场执行引用",
    risk: pageConfig.id === "stations" ? `${row.risk}；复制工位需复核设备、终端和准入规则` : `${row.risk}；复制版本需重新审批`,
    time: formatNow(),
  };
  rows.unshift(copy);
  state.activeId = copy.id;
  appendLog(pageConfig.id === "stations" ? `${row.id} 已复制为 ${copy.id}，形成待复核工位档案` : `${row.id} 已复制为 ${copy.id}，形成未生效版本`, copy);
  saveState();
  renderPageChrome();
  renderAll();
  showToast(pageConfig.id === "stations" ? "复制工位已生成" : "复制版本已生成");
}

function submitApproval(row) {
  row.status = pageConfig.id === "stations" ? "待点检" : "待审批";
  row.time = formatNow();
  row.impact = pageConfig.id === "stations" ? "已提交工位复核，点检和准入确认前不允许现场开工引用" : "已提交审批，发布前下游仅可查看不可执行引用";
  appendLog(pageConfig.id === "stations" ? `${row.id} 已提交工位复核，等待设备、终端和准入规则确认` : `${row.id} 已提交审批，等待责任人复核生效范围和下游影响`, row);
  window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, pageConfig.id === "stations" ? "提交工位点检" : "提交审批", { status: row.status, owner: row.owner, impact: row.impact });
  saveState();
  renderPageChrome();
  renderAll();
  showToast(pageConfig.id === "stations" ? "工位点检已提交" : "审批已提交");
}

function resyncProductVersion(row) {
  if (!canResyncProduct(row)) {
    showToast("MES 本地维护版本不需要重新同步");
    return;
  }
  const upstream = getUpstreamProductRow(row);
  openConfirmDialog({
    title: `重新同步 ${row.id}？`,
    message: "当上游 ERP/PLM 推送 MES 失败时，MES 可按当前选择的产品版本主动拉取最新资料，完成校验后更新 MES 执行快照和下游引用检查；该动作不直接改写上游系统。",
    okText: "重新同步产品",
    meta: [
      `当前版本：${row.version}`,
      `拉取来源：${upstream?.source || row.source || "ERP / PLM"}`,
      `引用对象：${upstream ? `${upstream.bom} / ${upstream.routing} / ${upstream.labelTemplate}` : row.ref}`,
    ],
    onConfirm: () => {
      if (upstream) applyUpstreamProductSnapshot(row, upstream);
      row.time = formatNow();
      appendLog(`${row.id} 已重新同步：MES 主动拉取 ${row.version} 最新产品资料并重算下游引用检查`, row);
      window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, "重新同步产品", { status: row.status, owner: row.owner, impact: row.impact });
      saveState();
      renderPageChrome();
      renderAll();
      showToast("重新同步产品已完成");
    },
  });
}

function canResyncProduct(row) {
  if (pageConfig.id !== "products" || !row) return false;
  if (/-COPY-|PRD-(NEW|IMP)-/.test(row.id)) return false;
  if (/MES 手工|手工维护|模拟导入|本地维护|复制版本/.test(row.source || "")) return false;
  if (!/(ERP|PLM)/.test(row.source || "")) return false;
  return Boolean(getUpstreamProductRow(row));
}

function getUpstreamProductRow(row) {
  const master = window.MES_MASTER_DATA || {};
  const productCode = getProductCode(row);
  return (master.products || []).find((item) => item.id === row.id || item.code === productCode || row.name.includes(item.code));
}

function applyUpstreamProductSnapshot(row, upstream) {
  const linkedOrders = (window.MES_MASTER_DATA?.orders || []).filter((order) => order.productCode === upstream.code);
  row.name = upstream.name;
  row.version = upstream.version;
  row.source = `${upstream.source} + MES 主动拉取`;
  row.status = upstream.status;
  row.ref = `${upstream.bom} / ${upstream.routing} / ${upstream.labelTemplate}`;
  row.impact = `${linkedOrders[0]?.id || "待关联工单"} ${/待|评估|冻结/.test(upstream.status + upstream.risk) ? "需复核" : "可排程"}`;
  row.owner = upstream.owner;
  row.scope = `${upstream.customer} / ${upstream.line} / 电子装配`;
  row.risk = upstream.risk;
  row.downstream = upstream.downstream;
}

function publishRow(row) {
  if (pageConfig.id === "stations") {
    publishStationRow(row);
    return;
  }
  openConfirmDialog({
    title: `确认发布 ${row.id}？`,
    message: `发布后 ${pageConfig.title} 将作为 MES 执行快照下发给计划、现场终端、质量或仓储校验；外部 ERP/PLM/QMS/WMS 原始资料不会被改写。`,
    okText: "确认发布",
    meta: [row.name, row.scope, row.downstream],
    onConfirm: () => {
      row.status = getPublishedStatus();
      row.time = formatNow();
      row.impact = "已允许下游执行引用";
      appendLog(`${row.id} 已发布到执行，影响范围：${row.scope}`, row);
      window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, "发布到执行", { status: row.status, owner: row.owner, impact: row.impact });
      saveState();
      renderPageChrome();
      renderAll();
      showToast("已发布到执行");
    },
  });
}

function publishStationRow(row) {
  openConfirmDialog({
    title: `确认启用 ${row.id}？`,
    message: "确认后该工位可被派工、开工检查和现场终端引用；现场开工仍必须通过人员资质、设备状态、物料和工序顺序校验。",
    okText: "确认启用",
    meta: [row.name, row.scope, row.downstream],
    onConfirm: () => {
      row.status = getPublishedStatus();
      row.time = formatNow();
      row.impact = "已允许开工检查引用";
      appendLog(`${row.id} 已确认工位启用，影响范围：${row.scope}`, row);
      window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, "确认工位启用", { status: row.status, owner: row.owner, impact: row.impact });
      saveState();
      renderPageChrome();
      renderAll();
      showToast("工位已启用");
    },
  });
}

function withdrawRow(row) {
  openConfirmDialog({
    title: `确认撤回 ${row.id}？`,
    message: "撤回仅适用于未生效版本；撤回后下游订单、派工、工位终端和质量检验不能引用该版本。",
    okText: "确认撤回",
    tone: "red",
    meta: [row.name, row.status, row.impact],
    onConfirm: () => {
      row.status = "已撤回";
      row.time = formatNow();
      row.impact = "未生效版本已撤回，下游不可引用";
      appendLog(`${row.id} 未生效版本已撤回`, row);
      window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, "撤回版本", { status: row.status, owner: row.owner, impact: row.impact });
      saveState();
      renderPageChrome();
      renderAll();
      showToast("版本已撤回");
    },
  });
}

function toggleRow(row, enabled) {
  const nextStatus = enabled ? (pageConfig.id === "stations" ? "待点检" : "待审批") : "停用";
  openConfirmDialog({
    title: `${enabled ? "确认启用" : "确认停用"} ${row.id}？`,
    message: enabled
      ? (pageConfig.id === "stations" ? `启用后仍需完成点检和准入复核，${pageConfig.title} 不会立即被现场开工引用。` : `启用后仍需重新审批，${pageConfig.title} 不会立即被现场执行引用。`)
      : `停用后该资料不能被新订单、派工、现场终端、PDA 或质量/仓储校验继续引用，历史追溯记录保留。`,
    okText: enabled ? "确认启用" : "确认停用",
    tone: enabled ? "blue" : "red",
    meta: [row.name, row.scope, row.downstream],
    onConfirm: () => {
      row.status = nextStatus;
      row.time = formatNow();
      row.impact = enabled ? (pageConfig.id === "stations" ? "已恢复为待点检，确认前不可开工引用" : "已恢复为待审批，发布前不可执行引用") : "已停用，阻止新业务引用";
      appendLog(`${row.id} 已${enabled ? (pageConfig.id === "stations" ? "启用并进入待点检" : "启用并进入待审批") : "停用"}，影响范围：${row.scope}`, row);
      window.MES_BUSINESS_FLOW?.applyMasterDataAction?.(pageConfig.id, row, enabled ? (pageConfig.id === "stations" ? "启用待点检" : "启用待审批") : "停用主数据", { status: row.status, owner: row.owner, impact: row.impact });
      saveState();
      renderPageChrome();
      renderAll();
      showToast(enabled ? (pageConfig.id === "stations" ? "已启用，等待点检" : "已启用，等待审批") : "已停用");
    },
  });
}

function mockImport() {
  const row = {
    id: buildNextId("IMP"),
    name: `模拟导入${pageConfig.title}`,
    version: "V1.0",
    source: getMockSourceLabel(),
    status: pageConfig.id === "stations" ? "待点检" : "待审批",
    ref: getDefaultRef(),
    impact: pageConfig.id === "stations" ? "模拟导入待点检，暂不允许开工引用" : "模拟导入待审批，暂不允许下游执行引用",
    owner: getDefinition().user,
    time: formatNow(),
    scope: getDefaultScope(),
    risk: pageConfig.id === "stations" ? "模拟外部同步工位资料需完成点检和准入复核" : "模拟外部同步资料需完成影响评估",
    downstream: getDefaultDownstream(),
  };
  rows.unshift(row);
  state.activeId = row.id;
  appendLog(pageConfig.id === "stations" ? `${row.id} 已完成导入模拟，等待工位点检和准入复核` : `${row.id} 已完成导入模拟，等待审批和执行发布`, row);
  saveState();
  renderPageChrome();
  renderAll();
  showToast("导入模拟已记录");
}

function openConfirmDialog({ title, message, okText, meta = [], tone = "blue", onConfirm }) {
  $("#basicConfirmTone").className = `basic-confirm__badge ${tone}`;
  $("#basicConfirmTone").textContent = tone === "red" ? "高风险操作" : "需要确认";
  $("#basicConfirmTitle").textContent = title;
  $("#basicConfirmMessage").textContent = message;
  $("#basicConfirmMeta").innerHTML = meta.map((item) => `<span>${item}</span>`).join("");
  $("#basicConfirmOkBtn").textContent = okText;
  $("#basicConfirmOkBtn").onclick = () => {
    closeConfirmDialog();
    onConfirm?.();
  };
  $("#basicConfirmDialog").hidden = false;
  $("#basicConfirmCancelBtn").focus();
}

function closeConfirmDialog() {
  $("#basicConfirmDialog").hidden = true;
  $("#basicConfirmOkBtn").onclick = null;
}

function getPublishedStatus() {
  if (pageConfig.id === "stations") return "工位启用";
  if (pageConfig.id === "materials") return "可投料";
  if (pageConfig.id === "workshops") return "资源启用";
  if (pageConfig.id === "partners") return "业务生效";
  return "已发布";
}

function nextVersion(version) {
  const match = String(version).match(/V(\d+)(?:\.(\d+))?/i);
  if (!match) return `${version}-副本`;
  return `V${match[1]}.${Number(match[2] || 0) + 1}`;
}

function buildNextId(prefix = "NEW") {
  const pagePrefix = { products: "PRD", materials: "MAT", bom: "BOM", routing: "RT", stations: "WS", workshops: "LINE", partners: "PART" }[pageConfig.id] || "MD";
  return `${pagePrefix}-${prefix}-${String(Date.now()).slice(-5)}`;
}

function getMockSourceLabel() {
  const sources = {
    products: "模拟 ERP / PLM 同步",
    materials: "模拟 ERP / WMS / QMS 同步",
    bom: "模拟 PLM BOM 同步",
    routing: "模拟 PLM 工艺同步",
    stations: "模拟设备 / 工位终端回执",
    workshops: "模拟 APS / 设备日历同步",
    partners: "模拟 ERP / QMS 伙伴同步",
  };
  return sources[pageConfig.id] || "模拟外部系统同步";
}

function getDefaultRef() {
  const refs = {
    bom: "版本明细摘要：关键物料 / 损耗率 / 替代料",
    routing: "明细维护入口：工序链 / SOP 引用 / 检验触发",
    stations: "设备 / 终端 / 班组 / 班次 / 开工准入",
    workshops: "车间 / 产线 / 班组 / 班次 / 产能日历",
    partners: "客户标签要求 / 供应商质量等级 / 追溯口径",
  };
  return refs[pageConfig.id] || "编码 / 版本 / 生效范围 / 客户要求";
}

function getDefaultScope() {
  return "华东一厂 · 电子装配车间 / 待指定产品、产线或客户范围";
}

function getDefaultDownstream() {
  const downstream = {
    products: "订单评审、BOM、工艺路线、成品标签、产品追溯",
    materials: "BOM、齐套检查、领料申请、投料确认、批次追溯",
    bom: "用料需求、领料申请、投料防错、物料损耗",
    routing: "派工单、工位指导、过程采集、首件检验",
    stations: "扫码开工、投料确认、过程记录、设备履历",
    workshops: "生产排程、产能负荷、电子看板、班次交接",
    partners: "订单评审、来料检验、成品标签、客户追溯报告",
  };
  return downstream[pageConfig.id] || "计划、现场执行、质量、仓储和追溯";
}

function bindEvents() {
  ensureMaintenanceActions();
  $("#addMasterDataBtn").addEventListener("click", () => openMasterDataDialog());
  $("#mockImportBtn").addEventListener("click", mockImport);
  $("#masterDataForm").addEventListener("submit", saveMasterDataForm);
  $("#closeMasterDataDialogBtn").addEventListener("click", closeMasterDataDialog);
  $("#cancelMasterDataDialogBtn").addEventListener("click", closeMasterDataDialog);
  $("#masterDataDialog").addEventListener("click", (event) => {
    if (event.target.id === "masterDataDialog") closeMasterDataDialog();
  });
  $("#basicConfirmCancelBtn").addEventListener("click", closeConfirmDialog);
  $("#basicConfirmCloseBtn").addEventListener("click", closeConfirmDialog);
  $("#basicConfirmDialog").addEventListener("click", (event) => {
    if (event.target.id === "basicConfirmDialog") closeConfirmDialog();
  });
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
  $("#sourceFilter").addEventListener("change", (event) => {
    state.source = event.target.value;
    saveState();
    renderAll();
  });
  $("#resetBasicBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", () => publishRow(getActive()));
  $("#secondaryActionBtn").addEventListener("click", () => {
    if (pageConfig.id === "stations") {
      updateActiveStatus("维护中", `${getActive().id} 已登记工位维护，等待设备、终端和准入规则复核`);
      showToast("维护状态已登记");
      return;
    }
    updateActiveStatus("影响评估中", `${getActive().id} 已登记影响评估，等待责任人审批和下游确认`);
    showToast("影响评估已登记");
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
  $("#sourceFilter").value = state.source;
  bindEvents();
  renderAll();
}

init();
