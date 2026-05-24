const pageConfig = window.EQUIPMENT_PAGE || { id: "status", title: "设备状态", eyebrow: "设备与保养 / 设备状态" };
const STORAGE_KEY = `xingjigu_mes_equipment_${pageConfig.id}_v2`;

const modules = window.MES_NAV_MODULES || [];

const equipmentPages = {
  设备状态: "equipment-status.html",
  工装夹具: "tooling-fixtures.html",
  量检具校准: "calibration.html",
  点检计划: "inspection-plan.html",
  点检任务: "inspection-plan.html",
  保养计划: "maintenance-plan.html",
  维修工单: "repair-orders.html",
  停机记录: "downtime-records.html",
  备件领用: "spare-parts.html",
  设备效率: "equipment-efficiency.html",
};

const pageDefinitions = {
  status: {
    subtitle: "设备员和车间主任按产线监控 PLC/SCADA 状态、当前工单、报警、开工准入和 OEE 影响",
    user: "设备监控员",
    metrics: ["设备数", "运行中", "异常/故障", "需联动"],
    columns: ["设备", "产线 / 工位", "状态来源", "当前工单", "运行状态", "OEE / 时长", "异常与准入", "责任人"],
    tableTitle: "设备实时状态",
    tableHint: "来自 PLC、SCADA、设备 API 和人工确认，后台只监控状态与处置闭环",
    cardTitle: "状态来源与生产联动",
    simulationTitle: "模拟 PLC / SCADA 状态回传",
    simulationHint: "模拟外部设备信号回传，不表示后台直接控制设备启停",
  },
  inspection: {
    subtitle: "班组长和设备员按班次下发点检计划，接收现场 PDA/扫码点检回执并跟踪漏检、异常和复核",
    user: "设备点检员",
    metrics: ["计划项", "待点检", "已完成", "异常项"],
    columns: ["点检计划", "设备 / 工位", "点检项目", "计划时间", "回执来源", "执行状态", "异常说明", "责任人"],
    tableTitle: "班前与班中点检计划",
    tableHint: "后台管理点检标准、计划和回执，不替代现场设备点检动作",
    cardTitle: "点检、漏检和异常闭环",
    simulationTitle: "模拟 PDA / 工牌扫码点检回执",
    simulationHint: "模拟现场 PDA、扫码枪或工牌/NFC 回传点检结果，后台只做记录、预警和复核",
  },
  maintenance: {
    subtitle: "预防保养按日历、运行时长和生产计数触发，形成保养窗口、执行确认、验收和 APS 产能日历联动",
    user: "保养计划员",
    metrics: ["保养单", "待执行", "已验收", "影响排程"],
    columns: ["保养计划", "设备 / 产线", "触发依据", "窗口时间", "执行内容", "状态", "APS 联动", "责任人"],
    tableTitle: "预防保养计划",
    tableHint: "计划停机窗口同步排程，保养完成后回写设备状态和验收记录",
    cardTitle: "保养触发、执行与验收",
    simulationTitle: "模拟保养执行回执",
    simulationHint: "模拟维修工移动端或设备 HMI 回传保养结果，后台只记录验收和状态恢复",
  },
  repair: {
    subtitle: "设备故障由报警、扫码报修或异常中心触发，按技能矩阵派单，记录响应、维修、备件和验收",
    user: "维修调度员",
    metrics: ["维修单", "待响应", "维修中", "超时风险"],
    columns: ["维修工单", "设备 / 故障", "报修来源", "响应 / 到场", "维修状态", "备件", "生产影响", "责任人"],
    tableTitle: "维修工单闭环",
    tableHint: "故障报修、派单、维修、试运行和验收全程留痕，并回写异常中心",
    cardTitle: "报修、派单和验收链路",
    simulationTitle: "模拟扫码报修 / 维修回执",
    simulationHint: "模拟现场扫码报修、设备报警或维修移动端回传，不表示后台直接维修设备",
  },
  downtime: {
    subtitle: "停机记录按 PLC 状态、班组补录和维修结果归因，支撑 OEE、停机损失、复盘和计划重排",
    user: "停机分析员",
    metrics: ["停机笔数", "故障停机", "待归因", "影响分钟"],
    columns: ["停机记录", "设备 / 工单", "停机来源", "开始 / 时长", "原因代码", "归因状态", "OEE 影响", "责任人"],
    tableTitle: "停机记录与原因归因",
    tableHint: "从设备状态日志沉淀停机事实，归因后进入 OEE 和异常复盘",
    cardTitle: "停机事实、归因和改善",
    simulationTitle: "模拟设备状态日志回传",
    simulationHint: "模拟 PLC/SCADA 停机事件回传，后台只做归因、复核和指标扣减",
  },
  spares: {
    subtitle: "维修和保养领用备件需绑定工单、设备、安装时间；有 WMS 时接收出库回执，无 WMS 时登记 MES 备件出库和安装记录，支撑成本、库存和追溯",
    user: "备件管理员",
    metrics: ["领用单", "待审批", "已出库", "低库存"],
    columns: ["备件领用", "维修 / 保养单", "备件 / 批次", "申请 / 实发", "WMS 回执", "安装设备", "成本归集", "责任人"],
    tableTitle: "备件领用与安装追溯",
    tableHint: "备件消耗绑定维修保养工单，驱动 WMS 出库回执或 MES 备件出库登记、成本归集和补采购",
    cardTitle: "领用、出库和安装闭环",
    simulationTitle: "模拟 WMS 出库回执 / MES 备件登记",
    simulationHint: "模拟 WMS、PDA、扫码枪或 MES 备件出库登记回传备件出库与安装结果，后台只做核销和追溯",
  },
  efficiency: {
    subtitle: "按设备、产线和班次拆解 OEE 三分项，联动停机记录、维修历史、良品率和改善建议",
    user: "设备效率分析员",
    metrics: ["设备 OEE", "可用率", "性能率", "质量率"],
    columns: ["设备 / 班次", "产线 / 工序", "计划 / 停机", "产量表现", "质量结果", "OEE", "改善方向", "责任人"],
    tableTitle: "设备效率分析",
    tableHint: "OEE = 可用率 x 性能率 x 质量率，可下钻停机、维修和质量原因",
    cardTitle: "OEE 三分项和改善闭环",
    simulationTitle: "模拟 OEE 口径快照重算",
    simulationHint: "模拟状态日志、产量和质量结果重新生成 OEE 口径快照，不代表后台直接修改原始设备实绩",
  },
  tooling: {
    subtitle: "设备员和工艺员维护工装、夹具、测试治具台账，按绑定工序、寿命、点检和校准状态影响开工准入",
    user: "工装管理员",
    metrics: ["工装台账", "可用", "寿命/校准风险", "准入联动"],
    columns: ["工装 / 编号", "类型 / 绑定工序", "工位 / 工单", "状态来源", "寿命 / 校准", "当前状态", "开工准入影响", "责任人"],
    tableTitle: "工装夹具与测试治具台账",
    tableHint: "后台维护工装状态、寿命计数、绑定工序和准入规则，现场扫码装夹只作为模拟回执记录",
    cardTitle: "工装状态、寿命和准入闭环",
    simulationTitle: "模拟现场扫码装夹 / 治具计数回执",
    simulationHint: "模拟工位终端、扫码枪或测试治具回传，不表示后台直接执行装夹或测试",
  },
  calibration: {
    subtitle: "质量和设备人员管理检具、量具、测试台校准状态、有效期、证书证据和检验引用，过期时拦截开工或质量判定",
    user: "计量校准管理员",
    metrics: ["量检具", "校准有效", "到期/过期", "质量引用"],
    columns: ["量检具 / 编号", "类型 / 使用范围", "关联工序", "证据来源", "有效期 / 证书", "当前状态", "检验与准入影响", "责任人"],
    tableTitle: "量检具、检具与测试台校准状态",
    tableHint: "校准证据可被首件、过程检验、FQC、OQC 和开工准入引用；后台只登记模拟校准回执和证据",
    cardTitle: "校准证据、有效期和质量引用",
    simulationTitle: "模拟校准证书 / 计量系统回执",
    simulationHint: "模拟外部计量系统、校准机构或检验台回传，不替代真实校准实验室作业",
  },
};

const initialRows = {
  status: [
    { id: "EQ-SMT-01", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 状态 + SCADA 采集", status: "运行中", statusDetail: "炉温稳定，节拍 8.4s", duration: "运行 186 分钟", oee: 86.4, downtime: 0, owner: "设备员 周诚", risk: "供料器振动值接近预警线", next: "观察供料器并准备点检", trace: "equipment_state_log / 当前班次" },
    { id: "EQ-DIP-A1", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "设备 API + 班组确认", status: "待机", statusDetail: "等待 SMT 批次转入", duration: "待机 42 分钟", oee: 79.8, downtime: 12, owner: "班组长 郑峰", risk: "13:00 前需完成开工准入", next: "开工检查", trace: "派工单 D-002 / 设备准入" },
    { id: "EQ-TEST-B2", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", status: "故障", statusDetail: "通信超时 ALM-204", duration: "故障 18 分钟", oee: 62.5, downtime: 18, owner: "维修员 吴启", risk: "影响 GW-240 测试排队", next: "自动触发维修工单", trace: "alarm_event ALM-204" },
    { id: "EQ-AGING-01", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 温度/通道采集", status: "满载", statusDetail: "通道占用 92%", duration: "运行 244 分钟", oee: 88.2, downtime: 0, owner: "设备主管 袁立", risk: "16:40 可能排队", next: "同步 APS 瓶颈预警", trace: "oee_daily / 通道履历" },
  ],
  inspection: [
    { id: "IP-20260620-01", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "班前点检计划", status: "异常待复核", statusDetail: "供料器 12 振动偏高", duration: "08:00 / 已回执", oee: 0, downtime: 0, owner: "设备员 周诚", risk: "需维修员复核是否换件", next: "生成临时点检复核", trace: "点检表 TPM-SMT-V2.3" },
    { id: "IP-20260620-02", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "班中点检计划", status: "待点检", statusDetail: "锡炉温度、喷雾压力、输送链", duration: "计划 12:30", oee: 0, downtime: 0, owner: "班组长 郑峰", risk: "漏检将拦截 13:00 开工", next: "模拟 PDA 点检回执", trace: "开工准入门" },
    { id: "IP-20260620-03", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "故障后复检计划", status: "待复检", statusDetail: "网口、治具针床、测试程序版本", duration: "维修后 10 分钟内", oee: 0, downtime: 0, owner: "维修员 吴启", risk: "未复检不可恢复派工", next: "维修验收", trace: "维修工单 MR-240620-03" },
    { id: "IP-20260620-04", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "周期点检计划", status: "已完成", statusDetail: "温控、风机、电流、门禁联锁通过", duration: "10:20 / 已签名", oee: 0, downtime: 0, owner: "设备员 黄宁", risk: "无", next: "继续运行监控", trace: "模拟工牌/NFC 签名" },
  ],
  maintenance: [
    { id: "PM-20260620-01", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "运行 480 小时触发", status: "待执行", statusDetail: "供料器清洁、轨道润滑、相机校准", duration: "窗口 19:30-20:10", oee: 0, downtime: 40, owner: "保养员 许锐", risk: "需避开 TCU-100 白班尾批", next: "同步 APS 产能日历", trace: "maintenance_order preventive" },
    { id: "PM-20260620-02", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "日历周期 7 天", status: "已验收", statusDetail: "喷嘴清洁、锡渣清理、链速校验", duration: "06:40-07:18", oee: 0, downtime: 38, owner: "设备主管 袁立", risk: "已恢复可用", next: "开工检查引用", trace: "验收人：车间主任 陈伟" },
    { id: "PM-20260620-03", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "温控偏差趋势触发", status: "影响排程", statusDetail: "温度探头校准与风道清洁", duration: "建议 17:00-18:00", oee: 0, downtime: 60, owner: "保养员 梁溪", risk: "可能影响 ECU-80 老化排队", next: "计划调整评估", trace: "CBM 阈值预警" },
    { id: "PM-20260621-01", equipment: "包装封箱机 C1", equipmentNo: "PACK-C1", line: "Line-C", station: "PACK-WS-02", order: "MO-202606-0011", dispatch: "D-111", source: "生产计数 1800 箱触发", status: "待确认", statusDetail: "胶带轮、传感器、压箱机构", duration: "夜班前 20 分钟", oee: 0, downtime: 20, owner: "设备员 黄宁", risk: "需确认包装尾批完成时间", next: "班次交接", trace: "计数器 PACK-C1" },
  ],
  repair: [
    { id: "MR-240620-03", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "设备报警 ALM-204", status: "维修中", statusDetail: "网关通信模块超时，已到场", duration: "响应 6 分钟 / 到场 11 分钟", oee: 0, downtime: 18, owner: "维修员 吴启", risk: "GW-240 测试排队增加", next: "更换通信板后试运行", trace: "异常事件 EX-EQ-0203" },
    { id: "MR-240620-04", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "点检异常 IP-20260620-01", status: "待派工", statusDetail: "供料器 12 振动偏高", duration: "待响应 9 分钟", oee: 0, downtime: 0, owner: "设备主管 袁立", risk: "若超阈值将触发停机", next: "按技能矩阵派维修员", trace: "点检异常转维修" },
    { id: "MR-240620-01", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0004", dispatch: "D-041", source: "班组扫码报修", status: "已验收", statusDetail: "喷雾阀堵塞清理完成", duration: "MTTR 25 分钟", oee: 0, downtime: 25, owner: "维修员 宋博", risk: "停机损失已归因", next: "归档维修经验", trace: "备件未消耗 / 试运行通过" },
    { id: "MR-240620-05", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "温度偏差预警", status: "待响应", statusDetail: "2 号温区偏差 1.8 摄氏度", duration: "待响应 4 分钟", oee: 0, downtime: 0, owner: "维修员 梁溪", risk: "影响老化测试证据完整性", next: "现场确认探头", trace: "SCADA 温度趋势" },
  ],
  downtime: [
    { id: "DT-240620-01", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0004", dispatch: "D-041", source: "PLC 状态日志", status: "已归因", statusDetail: "喷雾阀堵塞 / 设备故障", duration: "09:15 / 25 分钟", oee: 0, downtime: 25, owner: "设备员 周诚", risk: "OEE 可用率扣减", next: "维修经验归档", trace: "维修工单 MR-240620-01" },
    { id: "DT-240620-02", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", status: "待归因", statusDetail: "通信超时停机", duration: "11:42 / 18 分钟", oee: 0, downtime: 18, owner: "维修员 吴启", risk: "需确认故障代码与根因", next: "维修完成后归因", trace: "ALM-204" },
    { id: "DT-240620-03", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "班组补录", status: "待复核", statusDetail: "换料等待 / 非计划停机", duration: "10:08 / 7 分钟", oee: 0, downtime: 7, owner: "班组长 郑峰", risk: "原因代码需设备员复核", next: "复核停机原因", trace: "工位 HMI 模拟补录" },
    { id: "DT-240620-04", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 计划停机", status: "计划停机", statusDetail: "温控校准窗口", duration: "17:00 / 60 分钟", oee: 0, downtime: 60, owner: "保养员 梁溪", risk: "APS 已扣除产能", next: "保养计划联动", trace: "PM-20260620-03" },
  ],
  spares: [
    { id: "SP-240620-01", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "维修工单 MR-240620-03", status: "待出库", statusDetail: "通信板 TEST-COM-02", duration: "申请 1 / 实发 0", oee: 0, downtime: 0, owner: "备件员 林蔚", risk: "库存 2 件，低于安全库存 3 件", next: "模拟 WMS 出库", trace: "spare_part_usage 待生成" },
    { id: "SP-240620-02", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "点检异常 MR-240620-04", status: "待审批", statusDetail: "供料器轴承 FEED-BR-12", duration: "申请 2 / 实发 0", oee: 0, downtime: 0, owner: "设备主管 袁立", risk: "需确认是否预防更换", next: "维修主管审批", trace: "备件批次 FEED202606" },
    { id: "SP-240620-03", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0004", dispatch: "D-041", source: "保养计划 PM-20260620-02", status: "已出库", statusDetail: "喷嘴清洁套件 DIP-NZ-KIT", duration: "申请 1 / 实发 1", oee: 0, downtime: 0, owner: "备件员 林蔚", risk: "成本已归集", next: "安装记录已绑定", trace: "WMS 出库 WO-SP-912" },
    { id: "SP-240620-04", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "保养计划 PM-20260620-03", status: "低库存", statusDetail: "温度探头 TEMP-PB-01", duration: "申请 2 / 可用 1", oee: 0, downtime: 0, owner: "采购跟进 何敏", risk: "不足 1 件，需采购补充", next: "ERP 采购申请", trace: "备件库存低水位" },
  ],
  efficiency: [
    { id: "OEE-240620-SMT01", equipment: "SMT 贴片机 1", equipmentNo: "SMT-01", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "状态日志 + 产量 + 质量", status: "改善观察", statusDetail: "可用率 94.2% / 性能率 92.8% / 质量率 98.7%", duration: "计划 480 / 停机 28 分钟", oee: 86.4, downtime: 28, owner: "设备主管 袁立", risk: "供料器短停影响性能率", next: "点检复核供料器", trace: "oee_daily 2026-06-20 白班" },
    { id: "OEE-240620-DIPA1", equipment: "DIP 波峰焊线", equipmentNo: "DIP-A1", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0004", dispatch: "D-041", source: "状态日志 + 报工", status: "待改善", statusDetail: "可用率 88.9% / 性能率 91.6% / 质量率 98.1%", duration: "计划 420 / 停机 47 分钟", oee: 79.8, downtime: 47, owner: "设备员 周诚", risk: "喷雾阀故障重复出现", next: "预防保养升级", trace: "停机 TOP1：喷雾阀堵塞" },
    { id: "OEE-240620-TESTB2", equipment: "功能测试台 B2", equipmentNo: "TEST-B2", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API + FQC 结果", status: "异常下钻", statusDetail: "可用率 74.8% / 性能率 86.0% / 质量率 97.2%", duration: "计划 390 / 停机 72 分钟", oee: 62.5, downtime: 72, owner: "维修员 吴启", risk: "通信故障拉低可用率", next: "维修工单闭环后重算", trace: "MR-240620-03 / DT-240620-02" },
    { id: "OEE-240620-AGING01", equipment: "老化房 1", equipmentNo: "AGING-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA + 通道占用", status: "瓶颈资源", statusDetail: "可用率 96.8% / 性能率 92.0% / 质量率 99.0%", duration: "计划 480 / 停机 12 分钟", oee: 88.2, downtime: 12, owner: "设备主管 袁立", risk: "通道占用高，影响排程", next: "APS 瓶颈预警", trace: "通道履历 / 老化批次" },
  ],
  tooling: [
    { id: "TOOL-SMT-FDR-12", equipment: "SMT 供料器 12 位", equipmentNo: "FDR-12", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "工装台账 + 模拟扫码枪绑定", status: "待点检", statusDetail: "工装 / SMT 贴片 / 寿命 18600/20000 次", duration: "校准有效至 2026-07-15", oee: 0, downtime: 0, owner: "设备员 周诚", risk: "班前点检未完成将拦截 SMT 开工准入", next: "完成点检后允许 D-001 开工", trace: "tooling_asset TOOL-SMT-FDR-12 / start_check gate-tooling" },
    { id: "FIX-DIP-TCU-A02", equipment: "TCU DIP 定位夹具 A02", equipmentNo: "FIX-A02", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "工艺路线 RT-TCU-100-V2.6 + 工装台账", status: "可用", statusDetail: "夹具 / DIP 插件 / 寿命 8200/15000 次", duration: "校准有效至 2026-08-10", oee: 0, downtime: 0, owner: "工艺员 林澈", risk: "绑定工序、版本和工位一致", next: "开工检查可引用夹具版本和签收记录", trace: "routing RT-TCU-100-V2.6 / fixture_binding" },
    { id: "JIG-ICT-GW240-02", equipment: "GW-240 ICT 测试治具 02", equipmentNo: "ICT-JIG-02", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API + 治具计数器", status: "校准到期", statusDetail: "测试治具 / 功能测试 / 寿命 29600/30000 次", duration: "校准到期 2026-06-20", oee: 0, downtime: 0, owner: "计量员 许宁", risk: "校准到期，阻止新批次功能测试开工", next: "登记模拟校准回执或更换备用治具", trace: "calibration_due CAL-ICT-02 / NCR-240620-07" },
    { id: "FIX-ASM-HMI-01", equipment: "HMI 外壳压合夹具 01", equipmentNo: "ASM-FIX-01", line: "Line-C", station: "ASM-C-01", order: "MO-202606-0012", dispatch: "D-123", source: "工装台账 + 首件检验反馈", status: "维修中", statusDetail: "夹具 / 装配压合 / 寿命 12400/18000 次", duration: "维修预计 14:30 完成", oee: 0, downtime: 25, owner: "维修员 梁溪", risk: "压合定位偏差，批量装配保持锁定", next: "维修验收和首件复验通过后解锁", trace: "MRB-260620-02 / fixture_repair" },
  ],
  calibration: [
    { id: "CAL-TORQUE-030", equipment: "数显扭矩扳手 0-30N", equipmentNo: "GAUGE-TQ-030", line: "Line-C", station: "ASM-C-01", order: "MO-202606-0012", dispatch: "D-123", source: "计量台账 + 校准证书 CERT-TQ-2605", status: "校准有效", statusDetail: "量具 / 装配扭矩 / 证书 CERT-TQ-2605", duration: "有效期至 2026-11-30", oee: 0, downtime: 0, owner: "计量员 许宁", risk: "首件和巡检可引用校准证据", next: "扭矩记录写入过程检验履历", trace: "calibration_record CERT-TQ-2605" },
    { id: "CAL-CALIPER-150", equipment: "数显卡尺 0-150mm", equipmentNo: "GAUGE-DC-150", line: "IQC-A区", station: "IQC-A", order: "ASN-CASE-TOP-L20260612", dispatch: "IQC-0004", source: "外部校准机构回执 CERT-DC-2604", status: "即将到期", statusDetail: "量具 / IQC 尺寸抽检 / 证书 CERT-DC-2604", duration: "有效期至 2026-06-25", oee: 0, downtime: 0, owner: "IQC 孟可", risk: "到期前未复校将影响 IQC 和首件尺寸判定", next: "排入 06-24 校准计划", trace: "incoming_inspection IQC-240620-09" },
    { id: "CAL-FQC-BENCH-02", equipment: "FQC 功能检验台 02", equipmentNo: "FQC-BENCH-02", line: "Line-B", station: "FQC-B", order: "MO-202606-0002", dispatch: "PKG-021", source: "FQC 检验台自检 + 计量证据", status: "校准有效", statusDetail: "测试台 / FQC 与 OQC 引用 / 证书 CERT-FQC-2606", duration: "有效期至 2026-09-18", oee: 0, downtime: 0, owner: "FQC 孟可", risk: "FQC 放行和 OQC 客户报告可引用", next: "出货检验报告引用证书号", trace: "FQC-20260620-001 / OQC-20260620-001" },
    { id: "CAL-AGING-TEMP-01", equipment: "老化房温度探头标准器", equipmentNo: "STD-TEMP-01", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 温控偏差 + 校准计划", status: "校准过期", statusDetail: "标准器 / 老化温控校准 / 证书 CERT-TEMP-2506", duration: "有效期已过 2026-06-18", oee: 0, downtime: 60, owner: "设备员 黄宁", risk: "过期标准器不可用于老化房恢复验证", next: "生成校准异常并保持老化进站拦截", trace: "LS-240620-03 / process_hold AGING-01" },
  ],
};

const masterEquipmentRows = window.MES_MASTER_DATA?.demoRows?.equipment || {};
Object.entries(masterEquipmentRows).forEach(([key, value]) => {
  initialRows[key] = /^(tooling|calibration)$/.test(key) ? [...(initialRows[key] || []), ...value] : value;
});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];
let maintenanceRecords = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#equipmentModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "equipment" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "equipment" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#equipmentModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#equipmentModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
  else if (moduleId === "dispatch" && entry === "工艺文件与作业指导") window.location.href = "../dispatch/sop-view.html";
  else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "../dispatch/start-check.html";
  else if (moduleId === "station" && entry === "工位身份回执") window.location.href = "../station/employee-login.html";
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
  else if (moduleId === "equipment" && equipmentPages[entry]) window.location.href = `./${equipmentPages[entry]}`;
  else showToast(`${entry} 页面待建设`);
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
  const flowRows = window.MES_BUSINESS_FLOW?.getEquipmentRows?.(pageConfig.id) || [];
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

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function getVisibleRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((item) => {
    const text = `${item.id} ${item.equipment} ${item.equipmentNo} ${item.line} ${item.station} ${item.order} ${item.dispatch} ${item.source} ${item.status} ${item.statusDetail} ${item.owner} ${item.risk} ${item.next}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && lineMatch;
  });
}

function statusStyle(status) {
  if (/故障|异常|超时|低库存|待归因|待复核|待改善/.test(status)) return "red";
  if (/待|观察|瓶颈|满载|影响|计划停机|审批|维修中/.test(status)) return "orange";
  if (/已|运行|完成|验收|出库/.test(status)) return "green";
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.equipmentNo || "设备编号"} / ${rows[0]?.id || "单据号"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = pageConfig.id === "efficiency"
    ? [
        average(visible.map((item) => item.oee)),
        average(visible.map((item) => item.oee ? Math.min(98, item.oee + 7.8) : 0)),
        average(visible.map((item) => item.oee ? Math.min(98, item.oee + 4.1) : 0)),
        average(visible.map((item) => item.oee ? Math.min(99.5, item.oee + 12.3) : 0)),
      ].map((value) => `${value}%`)
    : [
        visible.length,
        visible.filter((item) => /运行|已完成|已验收|已出库/.test(item.status)).length,
        visible.filter((item) => /故障|异常|待归因|待复核|低库存|超时/.test(item.status)).length,
        visible.filter((item) => item.downtime > 0 || /影响|瓶颈|升级|排程/.test(item.risk + item.next + item.status)).length,
      ];
  $("#equipmentMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "联动排程、异常、维修或成本追溯" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderBusinessFocus() {
  let focus = $("#equipmentFocus");
  if (!focus) {
    focus = document.createElement("section");
    focus.id = "equipmentFocus";
    focus.className = "equipment-focus";
    $("#equipmentMetrics").after(focus);
  }
  const active = getActive();
  const visible = getVisibleRows();
  const critical = visible.filter((item) => /故障|异常|待|低库存|影响|瓶颈|待归因|待复核/.test(`${item.status} ${item.risk} ${item.next}`)).slice(0, 4);
  const modeMap = {
    status: ["设备状态矩阵", "按 PLC/SCADA 状态、工单占用、报警和开工准入识别设备可用性"],
    inspection: ["点检日历与漏检拦截", "按班前、班中、故障后复检管理点检回执和准入风险"],
    maintenance: ["保养窗口日历", "按运行时长、计数和 CBM 阈值同步 APS 产能窗口"],
    repair: ["维修响应闭环", "按报警、扫码报修、到场、备件、试运行和验收跟踪维修工单"],
    downtime: ["停机归因矩阵", "按 PLC 停机事实、班组补录和维修结果沉淀 OEE 扣减依据"],
    spares: ["备件领用与安装追溯", "按维修/保养工单、WMS 出库、安装设备和成本归集闭环"],
    efficiency: ["OEE 三分项", "按可用率、性能率、质量率下钻停机、维修和质量原因"],
    tooling: ["工装夹具准入矩阵", "按工装状态、绑定工序、寿命计数和校准风险判断派工开工准入"],
    calibration: ["量检具校准有效性", "按证书、有效期、使用范围和质量引用判断检验结果是否可采信"],
  };
  const [title, hint] = modeMap[pageConfig.id] || modeMap.status;
  focus.innerHTML = `
    <div class="equipment-focus__head">
      <div>
        <span>本页业务重点</span>
        <h2>${title}</h2>
        <p>${hint}</p>
      </div>
      <strong>${active?.equipment || "未选中"} · ${active?.line || "全部产线"}</strong>
    </div>
    <div class="equipment-focus__grid">
      <article class="equipment-state-map">
        <span>${pageConfig.id === "efficiency" ? "OEE 三分项" : "设备状态"}</span>
        ${visible.slice(0, 4).map((item) => `
          <div class="equipment-state-map__row">
            <b class="equipment-dot equipment-dot--${statusStyle(item.status)}"></b>
            <strong>${item.equipment}</strong>
            <em>${item.status}</em>
            <small>${item.duration}</small>
          </div>
        `).join("")}
      </article>
      <article class="equipment-calendar">
        <span>${pageConfig.id === "maintenance" ? "保养窗口" : pageConfig.id === "inspection" ? "点检窗口" : "响应窗口"}</span>
        ${visible.slice(0, 4).map((item) => `
          <div>
            <strong>${timeLabel(item.duration)}</strong>
            <em>${item.id}</em>
            <small>${item.next}</small>
          </div>
        `).join("")}
      </article>
      <article class="equipment-risk-stack">
        <span>闭环风险</span>
        ${critical.length ? critical.map((item) => `
          <div>
            <strong>${item.id}</strong>
            <em>${item.risk}</em>
            <small>${item.owner}</small>
          </div>
        `).join("") : `<div><strong>当前无阻断风险</strong><em>继续接收设备模拟回执</em><small>${active?.owner || "设备员"} 负责复核</small></div>`}
      </article>
    </div>
  `;
}

function timeLabel(duration) {
  const text = String(duration || "");
  return text.includes("/") ? text.split("/")[0].trim() : text;
}

function average(values) {
  const valid = values.filter((value) => Number(value) > 0);
  if (!valid.length) return "0.0";
  return (valid.reduce((sum, value) => sum + Number(value), 0) / valid.length).toFixed(1);
}

function renderTable() {
  const visible = getVisibleRows();
  $("#equipmentTableBody").innerHTML = visible.length ? visible.map((item) => {
    const cells = buildCells(item);
    return `
      <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
        ${cells.map((cell) => `<td>${cell}</td>`).join("")}
      </tr>
    `;
  }).join("") : `<tr><td colspan="8"><div class="empty-action">当前筛选条件下没有${pageConfig.title}记录 <button type="button" data-maintenance-action="create">新增维护单据</button></div></td></tr>`;
  $("#equipmentTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#equipmentTableBody").querySelectorAll("[data-maintenance-action]").forEach((button) => {
    button.addEventListener("click", () => handleMaintenanceAction(button.dataset.maintenanceAction));
  });
}

function buildCells(item) {
  if (pageConfig.id === "status") {
    return [twoLine(item.equipment, item.equipmentNo), `${item.line} / ${item.station}`, item.source, twoLine(item.order, item.dispatch), pill(item.status), `${item.oee}% / ${item.duration}`, item.risk, item.owner];
  }
  if (pageConfig.id === "inspection") {
    return [item.id, twoLine(item.equipment, `${item.line} / ${item.station}`), item.statusDetail, item.duration, item.source, pill(item.status), item.risk, item.owner];
  }
  if (pageConfig.id === "maintenance") {
    return [item.id, twoLine(item.equipment, `${item.line} / ${item.station}`), item.source, item.duration, item.statusDetail, pill(item.status), item.next, item.owner];
  }
  if (pageConfig.id === "repair") {
    return [item.id, twoLine(item.equipment, item.statusDetail), item.source, item.duration, pill(item.status), spareText(item), item.risk, item.owner];
  }
  if (pageConfig.id === "downtime") {
    return [item.id, twoLine(item.equipment, `${item.order} / ${item.dispatch}`), item.source, item.duration, item.statusDetail, pill(item.status), `${item.downtime} 分钟`, item.owner];
  }
  if (pageConfig.id === "spares") {
    return [item.id, item.source, twoLine(item.statusDetail, item.trace), item.duration, pill(item.status), item.equipment, item.risk, item.owner];
  }
  if (pageConfig.id === "tooling") {
    return [twoLine(item.equipment, item.equipmentNo), twoLine(item.statusDetail.split(" / ")[0], item.statusDetail.split(" / ")[1] || item.station), twoLine(item.station, `${item.order} / ${item.dispatch}`), item.source, twoLine(item.statusDetail.split(" / ")[2] || "寿命待维护", item.duration), pill(item.status), item.risk, item.owner];
  }
  if (pageConfig.id === "calibration") {
    return [twoLine(item.equipment, item.equipmentNo), twoLine(item.statusDetail.split(" / ")[0], item.statusDetail.split(" / ")[1] || item.station), twoLine(item.station, `${item.order} / ${item.dispatch}`), item.source, twoLine(item.duration, item.statusDetail.split(" / ")[2] || item.trace), pill(item.status), item.risk, item.owner];
  }
  return [twoLine(item.equipment, item.equipmentNo), `${item.line} / ${item.station}`, item.duration, item.source, item.statusDetail, `${item.oee}%`, item.next, item.owner];
}

function twoLine(main, sub) {
  return `<strong>${main}</strong><small>${sub}</small>`;
}

function pill(text) {
  return `<span class="pill pill--${statusStyle(text)}">${text}</span>`;
}

function spareText(item) {
  if (item.id === "MR-240620-03") return "通信板 1 件待出库";
  if (item.id === "MR-240620-04") return "供料器轴承待评估";
  return "未消耗关键备件";
}

function renderCards() {
  const active = getActive();
  const cards = [
    ["状态来源", active.source, "保留 PLC、SCADA、HMI、PDA、WMS 或人工复核来源"],
    ["后台边界", getBoundaryText(), "后台负责配置、监控、派单、审核、验收和追溯"],
    ["业务闭环", active.next, "结果回写派工准入、异常中心、APS、OEE 或成本归集"],
  ];
  $("#equipmentCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="equipment-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  if (pageConfig.id === "status" || pageConfig.id === "downtime" || pageConfig.id === "efficiency") return "模拟 PLC/SCADA/设备 API 回传状态，后台不直接控制设备";
  if (pageConfig.id === "inspection") return "模拟 PDA、扫码枪、工牌/NFC 点检回执，后台不替代现场点检";
  if (pageConfig.id === "spares") return "模拟 WMS、PDA、扫码枪出库和安装回执，后台不移动实物备件";
  if (pageConfig.id === "tooling") return "模拟工位终端、扫码枪或测试治具计数回执，后台不替代现场装夹和测试";
  if (pageConfig.id === "calibration") return "模拟计量系统、校准机构或检验台回执，后台不替代真实校准";
  return "模拟维修移动端或 HMI 回执，后台不直接执行维修保养动作";
}

function renderDetail() {
  const active = getActive();
  $("#equipmentDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.equipment} · ${active.line} · ${active.station}`;
  $("#detailKv").innerHTML = [
    ["设备编号", active.equipmentNo],
    ["关联单据", `${active.order} / ${active.dispatch}`],
    ["来源系统", active.source],
    ["时间与时长", active.duration],
    ["责任人", active.owner],
    ["风险说明", active.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = buildTimeline(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderLogs();
}

function buildTimeline(active) {
  return [
    ["来源接收", active.source],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
    ["业务状态", `${active.status} · ${active.duration}`],
    ["追溯引用", active.trace],
  ];
}

function buildActions(active) {
  const common = [
    ["生产联动", `${active.order} / ${active.dispatch} / ${active.station}`],
    ["异常处置", /故障|异常|低库存|待归因|待复核/.test(active.status + active.risk) ? "需派单、复核、验收或升级异常中心" : "当前无阻断，继续监控状态和回执"],
    ["下游结果", active.next],
  ];
  if (pageConfig.id === "maintenance") common.push(["排程联动", "保养窗口回写 APS 产能日历，避免误派工"]);
  if (pageConfig.id === "repair") common.push(["验收要求", "维修完成后需试运行、班组确认和异常关闭"]);
  if (pageConfig.id === "efficiency") common.push(["改善建议", "从停机 TOP、维修历史和质量结果下钻改善"]);
  return common;
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong></div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟回执或人工处置记录</strong></div>`;
}

function renderAll() {
  mergeFlowRows();
  renderMetrics();
  renderBusinessFocus();
  renderTable();
  renderCards();
  renderMaintenancePanel();
  renderDetail();
}

function getMaintenanceRecipe() {
  const map = {
    status: ["设备台账补充", "状态复核并锁定准入", "停用/解除锁定验收", "设备管理员 周诚"],
    inspection: ["点检计划", "发布点检并复核漏检", "关闭点检异常", "设备点检员 黄宁"],
    maintenance: ["保养计划", "生成保养工单并审批窗口", "验收关闭保养", "保养计划员 许锐"],
    repair: ["维修工单", "派工接单并申请备件", "试运行验收关闭", "维修调度员 吴启"],
    downtime: ["停机归因补录", "复核 OEE 扣减口径", "关闭停机复盘", "停机分析员 周诚"],
    spares: ["备件领用申请", "审批并发起 WMS 出库", "登记安装并关闭", "备件管理员 林蔚"],
    efficiency: ["TPM 改善项", "分派责任并复核 OEE", "关闭改善验收", "设备效率分析员 袁立"],
    tooling: ["工装夹具台账变更", "复核绑定工序和寿命状态", "验收工装准入", "工装管理员 周诚"],
    calibration: ["量检具校准任务", "登记模拟校准证据", "关闭校准准入风险", "计量校准管理员 许宁"],
  };
  const [create, process, close, owner] = map[pageConfig.id] || map.repair;
  return { create, process, close, owner };
}

function getActiveMaintenance() {
  return maintenanceRecords[0];
}

function renderMaintenancePanel() {
  let panel = $("#equipmentMaintenancePanel");
  if (!panel) {
    panel = document.createElement("section");
    panel.id = "equipmentMaintenancePanel";
    panel.className = "equipment-panel maintenance-panel";
    document.querySelector(".equipment-left .simulation-box")?.before(panel);
  }
  const active = getActive();
  const recipe = getMaintenanceRecipe();
  const current = getActiveMaintenance();
  panel.innerHTML = `
    <div class="equipment-panel__head">
      <div>
        <h3>${pageConfig.title}手工维护闭环</h3>
        <p>后台维护台账、计划、派单、复核和验收；设备运行、点检、维修、WMS 出库只记录模拟回执，不直接控制设备或移动备件。</p>
      </div>
    </div>
    <div class="maintenance-flow">
      <button type="button" data-maintenance-action="create">新增 ${recipe.create}</button>
      <button type="button" data-maintenance-action="process"${current ? "" : " disabled"}>${recipe.process}</button>
      <button type="button" class="danger-action" data-maintenance-action="close"${current ? "" : " disabled"}>${recipe.close}</button>
    </div>
    <div class="maintenance-record">
      ${current ? `
        <div><span>维护单</span><strong>${current.id} · ${current.status}</strong></div>
        <div><span>关联单据</span><strong>${current.related}</strong></div>
        <div><span>责任/时间</span><strong>${current.owner} · ${current.time}</strong></div>
        <div><span>前后值摘要</span><strong>${current.before} -> ${current.after}</strong></div>
      ` : `<div><span>暂无维护单</span><strong>可基于 ${active?.id || pageConfig.title} 新建设备管理单据</strong></div>`}
    </div>
    <div class="maintenance-log">
      ${maintenanceRecords.slice(0, 4).map((item) => `<div><span>${item.time}</span><strong>${item.id} ${item.action}：${item.status}</strong></div>`).join("") || `<div><span>操作记录</span><strong>新增、发布、派工、验收会写入 localStorage 和统一治理事件</strong></div>`}
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
      id: `EQ-MAINT-${Date.now().toString().slice(-6)}`,
      action: recipe.create,
      status: "待处理",
      related: `${active.order} / ${active.dispatch} / ${active.id}`,
      owner: recipe.owner,
      time: now,
      before: `${active.status} / ${active.next}`,
      after: `已发起${recipe.create}`,
    };
    maintenanceRecords.unshift(record);
  } else {
    if (!record) return;
    if (action === "close" && !confirm(`确认${recipe.close}？验收关闭会保留设备审计记录。`)) return;
    record.action = action === "process" ? recipe.process : recipe.close;
    record.status = action === "process" ? "处理中/已审批" : "已验收关闭";
    record.time = now;
    record.before = record.after;
    record.after = action === "process" ? `${recipe.process}完成，等待现场模拟回执` : `${recipe.close}完成，设备履历已归档`;
  }
  window.MES_BUSINESS_FLOW?.applyEquipmentAction?.(active, action === "close" ? "equipmentClose" : "equipmentAdvance", {
    status: record.status,
    owner: record.owner,
    result: `${record.id} ${record.before} -> ${record.after}`,
  });
  window.MES_BUSINESS_FLOW?.applyGovernanceAction?.({ id: record.id, name: pageConfig.title, owner: record.owner, risk: active.risk, trace: active.trace }, "equipment", record.action, {
    orderId: active.order,
    status: record.status,
    source: "设备与保养后台维护",
    result: record.after,
    auditRef: record.related,
  });
  appendLog(`${record.id} ${record.action}：${record.before} -> ${record.after}，责任人 ${record.owner}`);
  saveState();
  renderAll();
  showToast("设备维护记录已保存");
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  if (pageConfig.id === "status" && status.includes("故障")) active.next = "自动触发维修工单";
  if (pageConfig.id === "inspection" && status.includes("完成")) active.next = "开工准入通过";
  if (pageConfig.id === "maintenance" && status.includes("验收")) active.next = "设备恢复可用并回写 APS";
  if (pageConfig.id === "repair" && status.includes("验收")) active.next = "关闭异常并恢复生产";
  if (pageConfig.id === "downtime" && status.includes("归因")) active.next = "进入 OEE 和复盘";
  if (pageConfig.id === "spares" && status.includes("出库")) active.next = "绑定安装记录并归集成本";
  if (pageConfig.id === "efficiency" && status.includes("重算")) active.next = "刷新 OEE 三分项和改善建议";
  if (pageConfig.id === "tooling" && status.includes("准入复核通过")) active.next = "开工准入读取工装版本、寿命和绑定工序";
  if (pageConfig.id === "calibration" && status.includes("校准有效")) active.next = "首件、过程检验、FQC 和 OQC 可引用校准证据";
  window.MES_BUSINESS_FLOW?.applyEquipmentAction?.(active, /验收|完成|归因|重算/.test(status) ? "equipmentClose" : "equipmentAdvance", {
    status,
    owner: active.owner,
    result: active.next || active.risk,
  });
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
    status: "故障预警",
    inspection: "已完成",
    maintenance: "已验收",
    repair: "已验收",
    downtime: "已归因",
    spares: "已出库",
    efficiency: "已重算",
    tooling: "准入复核通过",
    calibration: "校准有效",
  };
  updateActiveStatus(statusMap[pageConfig.id], `${getActive().id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟回执已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone([...(window.MES_BUSINESS_FLOW?.getEquipmentRows?.(pageConfig.id) || []), ...initialRows[pageConfig.id]]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
  logs = [];
  maintenanceRecords = [];
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
  $("#resetEquipmentBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", () => simulateStatus());
  $("#secondaryActionBtn").addEventListener("click", () => {
    updateActiveStatus(pageConfig.id === "spares" ? "低库存" : "异常待处理", `${getActive().id} 已登记异常处置，等待设备责任人闭环`);
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
  mergeFlowRows();
  loadState();
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
