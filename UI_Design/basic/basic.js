const pageConfig = window.BASIC_PAGE || { id: "products", title: "产品资料", eyebrow: "基础资料 / 产品资料" };
const STORAGE_KEY = `xingjigu_mes_basic_${pageConfig.id}_v1`;

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
    columns: ["产品编码", "产品 / 客户", "版本 / 来源", "关键引用", "执行状态", "下游校验", "责任人", "时间戳"],
    tableTitle: "产品主数据与执行版本",
    tableHint: "来自 ERP/PLM 的产品资料经 MES 审批后，供订单评审、BOM、工艺、标签和追溯引用",
    cardTitle: "产品资料驱动关系",
    simulationTitle: "模拟 ERP / PLM 产品同步",
    simulationHint: "模拟外部主数据同步，不代表后台直接修改 ERP 或 PLM 原始资料",
  },
  materials: {
    subtitle: "维护料号、批次规则、IQC 策略、替代关系和库存口径，支撑 BOM、齐套、投料和追溯",
    user: "物料主数据员",
    metrics: ["物料档案", "批次管控", "待补规则", "影响投料"],
    columns: ["物料编码", "物料 / 类型", "批次与检验", "替代 / 供应", "执行状态", "下游校验", "责任人", "时间戳"],
    tableTitle: "物料主数据与批次规则",
    tableHint: "物料资料会传递给 WMS、IQC、线边库存、投料防错和成本核销",
    cardTitle: "物料资料驱动关系",
    simulationTitle: "模拟 ERP / WMS 物料同步",
    simulationHint: "模拟外部物料、库存或供应商规则回传，后台只做校验和审批记录",
  },
  bom: {
    subtitle: "按产品版本维护制造 BOM、用量、损耗率、替代料和生效范围，是物料需求与投料防错的共同依据",
    user: "BOM 工程师",
    metrics: ["BOM 版本", "已发布", "待评估", "缺口风险"],
    columns: ["BOM 编号", "产品 / 版本", "关键物料", "用量 / 损耗", "执行状态", "影响范围", "责任人", "时间戳"],
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
    columns: ["路线编号", "产品 / 版本", "工序链", "SOP / 检验", "执行状态", "现场约束", "责任人", "时间戳"],
    tableTitle: "工艺路线与执行标准",
    tableHint: "工艺路线决定 APS 资源计算、派工单工序、工位终端指导、过程采集和质量触发",
    cardTitle: "工艺路线驱动关系",
    simulationTitle: "模拟 PLM 工艺路线发布",
    simulationHint: "模拟外部工艺版本发布，不代表后台直接编辑 PLM 工艺文件",
  },
  stations: {
    subtitle: "维护工序、工位、设备、终端、人员资质和开工准入规则，连接后台派工和现场执行",
    user: "车间工艺员",
    metrics: ["工位绑定", "可执行", "待复核", "准入拦截"],
    columns: ["工位编码", "工序 / 产线", "设备 / 终端", "人员资质", "执行状态", "开工准入", "责任人", "时间戳"],
    tableTitle: "工序工位与资源绑定",
    tableHint: "后台维护工位资源模型，现场动作仍由工位终端、扫码枪、工牌/NFC、HMI 或 PLC 产生回执",
    cardTitle: "工序工位驱动关系",
    simulationTitle: "模拟设备 / 工位终端回执",
    simulationHint: "模拟设备 API、PLC 或工位终端状态回传，后台只更新准入状态和履历",
  },
  workshops: {
    subtitle: "维护工厂、车间、产线、班组、班次、产能日历和数据权限，支撑排程与现场看板",
    user: "车间主任",
    metrics: ["产线资源", "可排程", "日历待审", "负荷风险"],
    columns: ["资源编码", "车间 / 产线", "班次 / 日历", "能力约束", "执行状态", "排程影响", "责任人", "时间戳"],
    tableTitle: "产线车间与产能模型",
    tableHint: "资源模型向 APS、产能负荷、派工、电子看板和班次交接提供统一现场结构",
    cardTitle: "产线车间驱动关系",
    simulationTitle: "模拟 APS / 设备日历同步",
    simulationHint: "模拟排程或设备停机日历同步，后台不直接控制现场产线",
  },
  partners: {
    subtitle: "维护客户优先级、标签要求、供应商质量等级和追溯口径，影响订单、检验、包装和交付",
    user: "业务资料管理员",
    metrics: ["伙伴档案", "已生效", "待复核", "影响交付"],
    columns: ["伙伴编码", "客户 / 供应商", "等级 / 要求", "关联物料产品", "执行状态", "业务影响", "责任人", "时间戳"],
    tableTitle: "客户供应商与业务规则",
    tableHint: "客户和供应商资料承接 ERP/QMS 规则，向订单评审、IQC、成品标签和客户追溯报告传递约束",
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
    { id: "MAT-SEN-T100", name: "温度传感器", version: "批次必管", source: "ERP 物料 + WMS 库存", status: "已发布", ref: "IQC 合格后可投 / FIFO", impact: "TCU-100 需求缺 200 件", owner: "物料主数据员 吴琳", time: "06-18 09:35", scope: "BOM-TCU-100-V3.2", risk: "缺口影响 Line-A 第二批开工", downstream: "齐套检查、领料申请、线边库存、投料记录" },
    { id: "MAT-PCB-TCU", name: "PCB 主板", version: "批次必管", source: "ERP 物料 + IQC 规则", status: "已发布", ref: "供应商 S-PCB-01 / AQL Ⅱ", impact: "SMT 首站投料防错", owner: "物料主数据员 吴琳", time: "06-18 10:05", scope: "TCU-100 / GW-240", risk: "批次与 SN 谱系必须绑定", downstream: "物料标签、投料确认、批次追溯" },
    { id: "MAT-PWR-IC60", name: "电源芯片", version: "客户指定批次", source: "ERP 物料 + QMS 冻结", status: "冻结待复核", ref: "PWRIC-L20260602", impact: "MO-202606-0005 缺料预警", owner: "质量员 孟可", time: "06-18 11:18", scope: "PCM-60 / Line-B", risk: "冻结批次不可投料，需替代料审批", downstream: "缺料处理、来料检验、库存冻结" },
    { id: "MAT-BOX-I", name: "客户 I 包装盒", version: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "已发布", ref: "BOXI-L20260614", impact: "MO-202606-0011 包装入库", owner: "包装工程师 李娟", time: "06-18 13:50", scope: "客户 I / PACK-C-02", risk: "多领余料需退回核销", downstream: "成品标签、包装作业、余料退回" },
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
    { id: "SMT-WS-01", name: "SMT 贴片工位", version: "Line-A", source: "设备 API + 工位终端", status: "可执行", ref: "SMT-01 / 扫码枪 / Feeder 绑定", impact: "D-001 开工准入通过", owner: "车间工艺员 许诺", time: "06-18 08:55", scope: "SMT 贴片 / TCU-100", risk: "需校验首件放行和料站绑定", downstream: "扫码开工、投料确认、过程记录、设备履历" },
    { id: "DIP-A-02", name: "DIP 插件工位", version: "Line-A", source: "MES 维护 + 班组签收", status: "待接单", ref: "DIP-Line-A / 工牌 NFC", impact: "D-002 13:00 计划开工", owner: "班组长 郑峰", time: "06-18 09:18", scope: "DIP 插件 / TCU-100", risk: "等待 SMT 批次转入", downstream: "班组任务、工序报工、交接班" },
    { id: "TEST-B-01", name: "功能测试工位", version: "Line-B", source: "测试台 API", status: "负荷偏高", ref: "Test-B / 参数自动采集", impact: "GW-240 排队 2 个任务", owner: "设备工程师 周启", time: "06-18 10:32", scope: "功能测试 / GW-240", risk: "测试工位排队影响交期", downstream: "过程参数、过程检验、设备效率" },
    { id: "QC-FINAL", name: "FQC 成品检验位", version: "共用资源", source: "QMS 抽样方案", status: "待规范确认", ref: "AQL / FQC 规范", impact: "HMI-70 阻止排程", owner: "质量工程师 孟可", time: "06-18 14:30", scope: "FQC / 多产品", risk: "检验项目缺失会拦截入库", downstream: "成品检验、完工确认、客户追溯报告" },
  ],
  workshops: [
    { id: "FAC-EAST-01", name: "华东一厂 · 电子装配车间", version: "2026 白班日历", source: "MES 资源模型", status: "已生效", ref: "Line-A / Line-B / Line-C", impact: "全部订单按车间权限展示", owner: "车间主任 陈伟", time: "06-18 08:20", scope: "电子装配车间", risk: "支持多产线并行和班次交接", downstream: "首页工作台、生产排程、电子看板" },
    { id: "LINE-A", name: "Line-A 电子装配线", version: "白班 08:00-20:00", source: "APS 产能日历", status: "可排程", ref: "SMT-01 / DIP-Line-A / Pack-A", impact: "MO-202606-0001 与 0010 共用资源", owner: "计划主管 李敏", time: "06-18 08:35", scope: "TCU-100 / SRV-90", risk: "老化房为跨线瓶颈", downstream: "产能负荷、派工单、设备运行" },
    { id: "LINE-B", name: "Line-B 模块装配线", version: "白班 + 加班窗口", source: "APS + 设备保养计划", status: "负荷预警", ref: "Test-B / Assembly-B", impact: "GW-240 与 PCM-60 交期冲突", owner: "计划主管 李敏", time: "06-18 10:16", scope: "GW-240 / PCM-60 / HMI-100", risk: "功能测试与物料冻结双风险", downstream: "交期预警、缺料处理、设备效率" },
    { id: "LINE-C", name: "Line-C 包装与装配线", version: "白班 08:00-20:00", source: "MES 资源模型", status: "可排程", ref: "Assembly-C / Pack-C", impact: "MO-202606-0011 包装中", owner: "包装主管 李娟", time: "06-18 13:26", scope: "THS-10 / ENV-45 / HMI-70", risk: "HMI-70 工艺资料待签收", downstream: "包装作业、成品入库、交接班" },
  ],
  partners: [
    { id: "CUS-A", name: "A 客户", version: "优先级高", source: "ERP 客户资料", status: "已生效", ref: "客户标签模板 A-V1.4", impact: "MO-202606-0001 按高优先级排程", owner: "业务资料管理员 沈清", time: "06-18 09:02", scope: "TCU-100 / 成品标签", risk: "标签补打需审批", downstream: "订单评审、成品标签、客户追溯报告" },
    { id: "CUS-B", name: "B 客户", version: "交期敏感", source: "ERP 客户资料", status: "已生效", ref: "OTD 重点监控", impact: "GW-240 与 SRV-90 交期预警", owner: "计划主管 李敏", time: "06-18 10:08", scope: "GW-240 / SRV-90", risk: "交期压缩需计划调整", downstream: "交期预警、计划调整、交付达成" },
    { id: "SUP-SEN-01", name: "传感器供应商 S-01", version: "A级供应商", source: "QMS 供应商档案", status: "待到货复核", ref: "SEN-L20260605 / IQC 加严", impact: "TCU-100 缺 200 件", owner: "采购跟单 袁青", time: "06-18 11:10", scope: "温度传感器", risk: "到货延迟影响第二批开工", downstream: "来料检验、缺料预警、批次追溯" },
    { id: "SUP-PWR-02", name: "电源芯片供应商 P-02", version: "质量观察", source: "QMS 冻结规则", status: "冻结待复核", ref: "PWRIC-L20260602", impact: "PCM-60 指定批次冻结", owner: "质量员 孟可", time: "06-18 11:42", scope: "电源芯片 / D 客户", risk: "需 MRB 或替代料审批", downstream: "来料检验、库存冻结、缺料处理" },
  ],
};

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
    const text = `${item.id} ${item.name} ${item.version} ${item.source} ${item.status} ${item.ref} ${item.impact} ${item.owner} ${item.scope} ${item.risk} ${item.downstream}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const sourceMatch = state.source === "all" || item.source.includes(state.source);
    return keywordMatch && statusMatch && sourceMatch;
  });
}

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(status) {
  if (/缺|冻结|拦截|阻止|风险|负荷|不通过/.test(status)) return "red";
  if (/待|评估|复核|预警|签收|审批|观察/.test(status)) return "orange";
  if (/已|可|生效|发布|通过/.test(status)) return "green";
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "资料编码"} / ${rows[0]?.version || "版本号"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  const sourceOptions = ["ERP", "PLM", "WMS", "QMS", "MES", "APS", "设备"];
  $("#sourceFilter").innerHTML = `<option value="all">全部来源</option>${sourceOptions.map((source) => `<option value="${source}">${source}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /已|可|生效|发布/.test(item.status)).length,
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
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#basicTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function buildCells(item) {
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

function renderCards() {
  const active = getActive();
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

function getBoundaryText() {
  if (pageConfig.id === "stations") return "工位终端、扫码枪、工牌/NFC、设备 HMI 或 PLC 产生模拟现场回执";
  if (pageConfig.id === "workshops") return "APS、设备保养和班次日历提供资源状态，MES 不直接控制产线";
  if (pageConfig.id === "materials") return "ERP/WMS/IQC 提供物料事实，MES 维护生产投料校验口径";
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
  $("#detailKv").innerHTML = [
    ["资料范围", active.scope],
    ["上游来源", active.source],
    ["关键引用", active.ref],
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
    ["同步接收", `${active.source} 已同步 ${active.id}`],
    ["校验结果", active.status.includes("已") || active.status.includes("可") ? "编码、版本、生效范围、责任人校验通过" : "存在待审批、待签收或影响评估事项"],
    ["审批留痕", `${active.owner} 于 ${active.time} 维护 / 复核`],
    ["追溯引用", `${active.id} / ${active.version} 将写入订单、批次或工位履历`],
  ];
}

function buildActions(active) {
  const actions = [
    ["发布控制", active.status.includes("已") || active.status.includes("可") ? "允许下游订单和现场任务引用当前版本" : "阻止或提示下游使用，需完成审批后发布"],
    ["影响评估", active.impact],
    ["异常闭环", /缺|冻结|待|评估|风险|负荷/.test(active.risk + active.status) ? "需生成资料异常、质量复核、计划调整或缺料处置" : "当前无阻断项，继续保留版本履历"],
    ["下游联动", active.downstream],
  ];
  if (pageConfig.id === "bom") actions.push(["用料校验", "齐套检查、领料申请和投料确认必须引用同一 BOM 版本"]);
  if (pageConfig.id === "routing") actions.push(["现场签收", "SOP、参数规格和检验触发规则需下发到工位终端"]);
  if (pageConfig.id === "stations") actions.push(["准入校验", "开工前校验人员资质、设备状态、工位绑定和终端签收"]);
  return actions;
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong></div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟同步或影响评估记录</strong></div>`;
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
  if (status === "已发布") active.impact = "已允许下游执行引用";
  if (status === "影响评估中") active.impact = "已生成资料影响评估任务";
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderAll();
}

function appendLog(text) {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text });
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  updateActiveStatus("已发布", `${getActive().id} 已记录${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
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
  $("#sourceFilter").addEventListener("change", (event) => {
    state.source = event.target.value;
    saveState();
    renderAll();
  });
  $("#resetBasicBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", simulateStatus);
  $("#secondaryActionBtn").addEventListener("click", () => {
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
