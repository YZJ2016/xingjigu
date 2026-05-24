const pageConfig = window.MONITORING_PAGE || { id: "output", title: "实时产量", eyebrow: "过程监控 / 实时产量" };
const STORAGE_KEY = `xingjigu_mes_monitoring_${pageConfig.id}_v2`;

const modules = window.MES_NAV_MODULES || [];

const pageLinks = {
  process: {
    实时产量: "./realtime-output.html",
    设备运行: "./device-runtime.html",
    工艺参数: "./process-parameters.html",
    报警记录: "./alarm-records.html",
    停机原因: "./downtime-reasons.html",
    过程趋势: "./process-trends.html",
    电子看板: "./electronic-board.html",
  },
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "工艺文件与作业指导": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 工位身份回执: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  barcode: { 生产批次: "../barcode/production-batches.html", 产品序列号: "../barcode/product-serials.html", 物料标签: "../barcode/material-labels.html", 成品标签: "../barcode/finished-labels.html", 箱码托盘码: "../barcode/box-pallet-codes.html", 标签打印: "../barcode/label-printing.html", 补打申请: "../barcode/reprint-requests.html" },
  quality: { 来料检验: "../quality/incoming-inspection.html", 首件检验: "../quality/first-article.html", 巡检任务: "../quality/patrol-tasks.html", 过程检验: "../quality/process-inspection.html", 成品检验: "../quality/final-inspection.html", 不良记录: "../quality/defect-records.html", 返工评审: "../quality/rework-review.html" },
  equipment: { 设备状态: "../equipment/equipment-status.html", 点检计划: "../equipment/inspection-plan.html", 保养计划: "../equipment/maintenance-plan.html", 维修工单: "../equipment/repair-orders.html", 停机记录: "../equipment/downtime-records.html", 备件领用: "../equipment/spare-parts.html", 设备效率: "../equipment/equipment-efficiency.html" },
};

const pageDefinitions = {
  output: {
    subtitle: "车间主任和计划员按产线监控产量脉冲、报工差异、节拍偏差和 ERP 实绩回传前的业务校验",
    user: "过程监控员",
    metrics: ["计划数量", "实时产出", "节拍偏差", "待处理"],
    columns: ["工单 / 派工", "产线 / 工位", "来源", "实时产量", "节拍 / 达成", "状态", "闭环动作", "责任人"],
    tableTitle: "实时产量采集",
    tableHint: "来自 PLC 计数、工位 HMI 和工序报工回执，MES 负责绑定工单、派工单、批次和时间戳",
    cardTitle: "产量、报工和计划闭环",
    simulationTitle: "模拟 PLC / 工位 HMI 产量回传",
    simulationHint: "模拟外部设备或工位终端产量信号，不表示后台直接报工或修改实绩",
  },
  runtime: {
    subtitle: "设备员和班组长监控设备运行、待机、故障、满载和准入状态，异常时联动维修、开工检查和排程",
    user: "设备监控员",
    metrics: ["设备点位", "运行中", "异常设备", "联动事项"],
    columns: ["设备", "产线 / 工位", "状态来源", "当前工单", "运行状态", "时长 / OEE", "风险说明", "责任人"],
    tableTitle: "设备运行监控",
    tableHint: "SCADA/PLC 管实时控制，MES 管生产业务语义、状态记录和异常闭环",
    cardTitle: "设备状态和生产准入",
    simulationTitle: "模拟 PLC / SCADA 运行状态回传",
    simulationHint: "模拟外部设备状态信号，不表示后台直接控制设备启停",
  },
  parameters: {
    subtitle: "工艺员和质量员按工单、SN、批次跟踪关键工艺参数，超限时拦截报工并触发过程检验或 NCR",
    user: "工艺工程师",
    metrics: ["参数点", "合格点", "预警点", "拦截点"],
    columns: ["参数记录", "工单 / SN", "设备 / 工位", "参数值", "规格限", "状态", "质量动作", "责任人"],
    tableTitle: "工艺参数明细",
    tableHint: "参数来自 PLC、测试台、工位 HMI 或人工复核，并绑定批次、设备、SOP 版本和采集时间",
    cardTitle: "参数规格、SPC 和质量联动",
    simulationTitle: "模拟 PLC / 测试台参数回传",
    simulationHint: "模拟外部采集参数，不表示后台直接编辑工艺参数或检验结论",
  },
  alarms: {
    subtitle: "过程监控接收设备报警、参数超限和通道异常，按等级生成异常事件、维修任务、质量拦截或停线建议",
    user: "异常调度员",
    metrics: ["报警数", "处理中", "高等级", "已闭环"],
    columns: ["报警事件", "设备 / 工单", "报警来源", "等级", "触发时间", "状态", "派单与联动", "责任人"],
    tableTitle: "报警记录",
    tableHint: "报警代码进入统一事件模型，需保留来源、等级、响应人、时间戳和闭环结果",
    cardTitle: "报警分级和异常闭环",
    simulationTitle: "模拟 SCADA / 设备 API 报警回传",
    simulationHint: "模拟外部报警信号，不表示后台直接制造或关闭现场报警",
  },
  downtime: {
    subtitle: "停机分析员按 PLC 状态日志、班组补录和维修结果做停机归因，驱动 OEE 扣减、复盘和计划重排",
    user: "停机分析员",
    metrics: ["停机笔数", "待归因", "影响分钟", "已复核"],
    columns: ["停机事件", "设备 / 工单", "来源", "开始 / 时长", "原因代码", "状态", "OEE / 排程影响", "责任人"],
    tableTitle: "停机归因记录",
    tableHint: "停机事实先来自设备状态日志，原因代码经班组和设备责任人复核后进入 OEE 与改善",
    cardTitle: "停机事实、原因和改善",
    simulationTitle: "模拟 PLC / 班组 HMI 停机回执",
    simulationHint: "模拟外部停机或现场补录回传，不表示后台直接停机",
  },
  trends: {
    subtitle: "质量员和工艺员查看过程参数、产量节拍和设备状态趋势，识别 SPC 漂移、瓶颈和质量风险",
    user: "过程质量员",
    metrics: ["趋势项", "稳定项", "预警项", "失控项"],
    columns: ["趋势对象", "工单 / 批次", "数据来源", "趋势窗口", "判异结果", "状态", "处置建议", "责任人"],
    tableTitle: "过程趋势与 SPC",
    tableHint: "趋势来自时序参数、产量、设备状态和质量结果聚合，支撑预警而不是事后补录",
    cardTitle: "趋势预警和质量改善",
    simulationTitle: "模拟时序参数聚合",
    simulationHint: "模拟采集链路聚合趋势，不表示后台直接修改原始时序数据",
  },
  board: {
    subtitle: "车间主任用电子看板发布与现场签收汇总产量、设备、参数、报警和停机状态，面向现场大屏发布但保留后台追溯入口",
    user: "车间主任",
    metrics: ["看板块", "正常块", "预警块", "需跟进"],
    columns: ["看板模块", "产线 / 区域", "数据来源", "显示指标", "刷新频率", "状态", "现场提示", "责任人"],
    tableTitle: "电子看板发布与现场签收状态",
    tableHint: "看板展示来自 MES 聚合数据，需记录刷新 ACK 和现场签收；现场动作仍由工位终端、PDA、扫码枪、HMI 或设备信号产生",
    cardTitle: "看板发布、签收和追溯入口",
    simulationTitle: "模拟看板刷新 ACK / 现场签收回执",
    simulationHint: "模拟电子看板终端刷新 ACK 或现场签收状态，不表示后台直接执行现场生产动作",
  },
};

const initialRows = {
  output: [
    { id: "OUT-LineA-SMT", primary: "MO-202606-0001 / D-001", item: "SMT 贴片产量", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 产量脉冲 + 工序报工", value: "428 / 800 台", standard: "达成 53.5% / 节拍 8.4s", status: "生产中", action: "节拍正常，继续采集并等待报工校验", owner: "班组长 郑峰", time: "11:36:28", batch: "LOT-TCU100-20260620-001", trace: "production_output_log / operation_report_draft" },
    { id: "OUT-LineB-TEST", primary: "MO-202606-0002 / D-024", item: "功能测试通过数", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", value: "315 / 600 台", standard: "达成 52.5% / 排队 38 台", status: "节拍预警", action: "联动设备运行和交期预警", owner: "车间主任 陈伟", time: "11:35:12", batch: "LOT-GW240-20260620-002", trace: "test_result_log / delivery_warning" },
    { id: "OUT-LineC-AGING", primary: "MO-202606-0003 / D-033", item: "老化入通道数", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 通道计数", value: "760 / 1200 台", standard: "通道占用 92%", status: "瓶颈预警", action: "同步 APS 瓶颈提醒", owner: "设备主管 袁立", time: "11:34:45", batch: "LOT-ECU80-20260620-003", trace: "aging_channel_log / capacity_load" },
    { id: "OUT-LineA-PACK", primary: "MO-202606-0011 / D-111", item: "包装尾批计数", line: "Line-C", station: "PACK-WS-02", equipment: "PACK-C1", order: "MO-202606-0011", dispatch: "D-111", source: "工位 HMI + 扫码枪", value: "1480 / 1800 台", standard: "达成 82.2% / 尾批待入库", status: "待报工", action: "等待 FQC 放行后进入完工确认", owner: "包装组 何晴", time: "11:33:21", batch: "LOT-THS10-20260621-001", trace: "packing_count_log / finished_label" },
  ],
  runtime: [
    { id: "RUN-SMT-01", primary: "SMT 贴片机 1", item: "SMT-01", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 状态 + SCADA 采集", value: "运行 186 分钟", standard: "OEE 86.4% / 节拍 8.4s", status: "运行中", action: "开工准入保持通过", owner: "设备员 周诚", time: "11:36:05", batch: "LOT-TCU100-20260620-001", trace: "equipment_state_log / start_gate" },
    { id: "RUN-DIP-A1", primary: "DIP 波峰焊线", item: "DIP-A1", line: "Line-A", station: "DIP-WS-02", equipment: "DIP-A1", order: "MO-202606-0001", dispatch: "D-002", source: "设备 API + 班组确认", value: "待机 42 分钟", standard: "等待 SMT 批次转入", status: "待机", action: "13:00 前完成开工检查", owner: "班组长 郑峰", time: "11:31:18", batch: "LOT-TCU100-20260620-001", trace: "dispatch D-002 / start_check" },
    { id: "RUN-TEST-B2", primary: "功能测试台 B2", item: "TEST-B2", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", value: "故障 18 分钟", standard: "通信超时 ALM-204", status: "故障", action: "自动触发维修工单", owner: "维修员 吴启", time: "11:29:42", batch: "LOT-GW240-20260620-002", trace: "alarm_event ALM-204 / MR-240620-03" },
    { id: "RUN-AGING-01", primary: "老化房 1", item: "AGING-01", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 温度/通道采集", value: "运行 244 分钟", standard: "通道占用 92% / OEE 88.2%", status: "满载", action: "同步 APS 瓶颈预警", owner: "设备主管 袁立", time: "11:27:50", batch: "LOT-ECU80-20260620-003", trace: "oee_daily / aging_channel_log" },
  ],
  parameters: [
    { id: "PAR-SMT-TEMP", primary: "回流焊温区 T3", item: "炉温 246.8 摄氏度", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 温控采集", value: "246.8 摄氏度", standard: "规格 240-250 摄氏度", status: "合格", action: "参数进入批次追溯", owner: "工艺员 李敏", time: "11:36:11", batch: "SN-TCU100-0428", trace: "process_parameter_log / SOP SMT-V2.3" },
    { id: "PAR-DIP-TIN", primary: "DIP 锡炉温度", item: "锡炉 263.5 摄氏度", line: "Line-A", station: "DIP-WS-02", equipment: "DIP-A1", order: "MO-202606-0001", dispatch: "D-002", source: "设备 API", value: "263.5 摄氏度", standard: "规格 255-265 摄氏度", status: "接近上限", action: "工艺员复核，暂不拦截", owner: "工艺员 李敏", time: "11:32:40", batch: "LOT-TCU100-20260620-001", trace: "SPC warning / process_inspection" },
    { id: "PAR-TEST-VOLT", primary: "GW-240 输出电压", item: "12.42 V", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", value: "12.42 V", standard: "规格 11.8-12.3 V", status: "超限拦截", action: "拦截报工并触发过程检验", owner: "质量员 唐宁", time: "11:28:13", batch: "SN-GW240-0315", trace: "NCR draft / parameter_limit" },
    { id: "PAR-AGING-HUM", primary: "老化房湿度", item: "46.5%RH", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 环境采集", value: "46.5%RH", standard: "规格 40-60%RH", status: "合格", action: "持续进入老化批次履历", owner: "质量员 唐宁", time: "11:26:58", batch: "LOT-ECU80-20260620-003", trace: "aging_environment_log" },
  ],
  alarms: [
    { id: "ALM-204", primary: "测试台通信超时", item: "功能测试台 B2", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", value: "高等级", standard: "11:24:02 触发", status: "维修中", action: "维修工单 MR-240620-03 已派发", owner: "维修员 吴启", time: "11:24:02", batch: "LOT-GW240-20260620-002", trace: "alarm_event / exception_event" },
    { id: "ALM-SMT-FEEDER", primary: "供料器振动预警", item: "SMT-01 供料器 12", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 振动采集", value: "中等级", standard: "11:19:32 触发", status: "待复核", action: "生成临时点检复核", owner: "设备员 周诚", time: "11:19:32", batch: "LOT-TCU100-20260620-001", trace: "inspection_plan / alarm_code" },
    { id: "ALM-AGING-TEMP", primary: "老化温区偏移", item: "老化房 1 温区 2", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 趋势报警", value: "中等级", standard: "11:12:08 触发", status: "观察中", action: "过程趋势持续监控", owner: "工艺员 李敏", time: "11:12:08", batch: "LOT-ECU80-20260620-003", trace: "spc_trend / process_trend" },
    { id: "ALM-PACK-SCAN", primary: "箱码重复扫描", item: "包装工位 PACK-WS-02", line: "Line-C", station: "PACK-WS-02", equipment: "PACK-C1", order: "MO-202606-0011", dispatch: "D-111", source: "扫码枪回执", value: "低等级", standard: "11:06:50 触发", status: "已闭环", action: "重复箱码已作废并生成补打申请", owner: "包装组 何晴", time: "11:06:50", batch: "BOX-THS10-20260621-018", trace: "label_reprint / audit_log" },
  ],
  downtime: [
    { id: "DT-TEST-204", primary: "测试台通信停机", item: "TEST-B2", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API", value: "11:24 / 18 分钟", standard: "设备故障 / ALM-204", status: "待归因", action: "维修完成后复核原因代码", owner: "维修员 吴启", time: "11:24:02", batch: "LOT-GW240-20260620-002", trace: "downtime_record / repair_order" },
    { id: "DT-SMT-MAT", primary: "SMT 换料等待", item: "SMT-01", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "班组 HMI 模拟补录", value: "10:08 / 7 分钟", standard: "换料等待 / 非计划停机", status: "待复核", action: "设备员复核是否计入设备停机", owner: "班组长 郑峰", time: "10:08:20", batch: "LOT-TCU100-20260620-001", trace: "station_hmi_log / reason_code" },
    { id: "DT-DIP-VALVE", primary: "喷雾阀堵塞", item: "DIP-A1", line: "Line-A", station: "DIP-WS-02", equipment: "DIP-A1", order: "MO-202606-0004", dispatch: "D-041", source: "PLC 状态日志 + 维修验收", value: "09:15 / 25 分钟", standard: "设备故障 / 已归因", status: "已归因", action: "进入 OEE 扣减和维修复盘", owner: "设备员 周诚", time: "09:15:00", batch: "LOT-SEN20-20260620-004", trace: "MR-240620-01 / oee_daily" },
    { id: "DT-AGING-PM", primary: "老化温控校准", item: "AGING-01", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 计划停机", value: "17:00 / 60 分钟", standard: "计划保养 / APS 已扣除", status: "计划停机", action: "保养完成后恢复设备产能", owner: "保养员 梁溪", time: "17:00:00", batch: "LOT-ECU80-20260620-003", trace: "PM-20260620-03 / capacity_calendar" },
  ],
  trends: [
    { id: "TRD-SMT-TEMP", primary: "回流焊温度趋势", item: "T3 / T4 温区", line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 时序参数", value: "近 30 分钟", standard: "均值稳定，CPK 1.52", status: "稳定", action: "继续归档批次质量证据", owner: "工艺员 李敏", time: "11:36:00", batch: "LOT-TCU100-20260620-001", trace: "spc_data / process_parameter_log" },
    { id: "TRD-DIP-TIN", primary: "锡炉温度漂移", item: "DIP-A1 锡炉", line: "Line-A", station: "DIP-WS-02", equipment: "DIP-A1", order: "MO-202606-0001", dispatch: "D-002", source: "设备 API 时序", value: "近 45 分钟", standard: "连续 6 点上升", status: "趋势预警", action: "工艺员复核参数窗口", owner: "工艺员 李敏", time: "11:30:00", batch: "LOT-TCU100-20260620-001", trace: "spc_rule / process_inspection" },
    { id: "TRD-TEST-VOLT", primary: "输出电压失控", item: "GW-240 测试项", line: "Line-B", station: "TEST-WS-02", equipment: "TEST-B2", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API + FQC", value: "近 20 件", standard: "2 件超上限", status: "失控拦截", action: "暂停该测试项报工，生成 NCR", owner: "质量员 唐宁", time: "11:28:00", batch: "LOT-GW240-20260620-002", trace: "ncr_record / spc_exception" },
    { id: "TRD-AGING-LOAD", primary: "老化通道占用趋势", item: "AGING-01", line: "Line-C", station: "AGING-C", equipment: "AGING-01", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 通道履历", value: "近 2 小时", standard: "峰值 92%", status: "瓶颈预警", action: "建议 APS 调整入老化节奏", owner: "车间主任 陈伟", time: "11:25:00", batch: "LOT-ECU80-20260620-003", trace: "capacity_load / board_metric" },
  ],
  board: [
    { id: "BRD-LineA", primary: "Line-A 生产监控屏", item: "产量 + 设备 + 异常", line: "Line-A", station: "车间大屏 A", equipment: "BOARD-A", order: "MO-202606-0001", dispatch: "多派工", source: "MES 聚合指标", value: "产量 428 / OEE 86.4%", standard: "刷新 30 秒", status: "正常发布", action: "班组已签收白班目标", owner: "车间主任 陈伟", time: "11:36:30", batch: "当前班次", trace: "dashboard_publish_log / shift_target" },
    { id: "BRD-LineB", primary: "Line-B 异常提示屏", item: "测试台报警 + 交期", line: "Line-B", station: "车间大屏 B", equipment: "BOARD-B", order: "MO-202606-0002", dispatch: "D-024", source: "报警记录 + 交期预警", value: "ALM-204 / 交期高风险", standard: "刷新 15 秒", status: "预警发布", action: "提示班组长跟进维修和重排", owner: "班组长 刘洋", time: "11:35:40", batch: "LOT-GW240-20260620-002", trace: "alarm_event / delivery_warning" },
    { id: "BRD-LineC", primary: "Line-C 瓶颈看板", item: "老化通道 + 包装尾批", line: "Line-C", station: "车间大屏 C", equipment: "BOARD-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA + 报工草稿", value: "通道占用 92%", standard: "刷新 30 秒", status: "瓶颈提示", action: "提醒计划员关注老化排队", owner: "计划员 许晨", time: "11:34:10", batch: "LOT-ECU80-20260620-003", trace: "capacity_load / electronic_board" },
    { id: "BRD-QC", primary: "质量过程看板", item: "参数预警 + 检验待办", line: "全部产线", station: "质量办公室", equipment: "BOARD-QC", order: "多工单", dispatch: "多派工", source: "过程检验 + SPC", value: "1 项失控 / 2 项预警", standard: "刷新 60 秒", status: "待跟进", action: "质量员确认过程检验任务", owner: "质量主管 唐宁", time: "11:33:00", batch: "当前班次", trace: "quality_task / spc_exception" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.monitoring || {});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#monitoringModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "process" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "process" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#monitoringModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#monitoringModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  if (moduleId === "workbench") {
    window.location.href = "../index.html";
    return;
  }
  const target = pageLinks[moduleId]?.[entry];
  if (target) window.location.href = target;
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
  mergeFlowRows();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, logs, state }));
}

function mergeFlowRows() {
  const flowRows = window.MES_BUSINESS_FLOW?.getMonitoringRows?.(pageConfig.id) || [];
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
    const text = `${item.id} ${item.primary} ${item.item} ${item.line} ${item.station} ${item.equipment} ${item.order} ${item.dispatch} ${item.source} ${item.value} ${item.standard} ${item.status} ${item.action} ${item.owner} ${item.batch} ${item.trace}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line || (state.line === "全部产线" && item.line === "全部产线");
    return keywordMatch && statusMatch && lineMatch;
  });
}

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(status) {
  if (/故障|超限|失控|拦截|高等级/.test(status)) return "red";
  if (/预警|待|瓶颈|接近|维修中|计划停机|满载|观察/.test(status)) return "orange";
  if (/合格|稳定|正常|已|运行中/.test(status)) return "green";
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.equipment || rows[0]?.id || "采集点"} / ${rows[0]?.order || "工单号"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
  ensureFocusPanel();
}

function renderMetrics() {
  const visible = getVisibleRows();
  const values = buildMetricValues(visible);
  $("#monitoringMetrics").innerHTML = getDefinition().metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "需联动质量、设备、排程或异常闭环" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function ensureFocusPanel() {
  if ($("#monitoringFocusPanel")) return;
  $("#monitoringMetrics").insertAdjacentHTML("afterend", `<section id="monitoringFocusPanel" class="monitoring-focus"></section>`);
}

function renderFocusPanel() {
  ensureFocusPanel();
  const active = getActive();
  const visible = getVisibleRows();
  const renderers = {
    output: renderOutputFocus,
    runtime: renderRuntimeFocus,
    parameters: renderParameterFocus,
    alarms: renderAlarmFocus,
    downtime: renderDowntimeFocus,
    trends: renderTrendFocus,
    board: renderBoardFocus,
  };
  $("#monitoringFocusPanel").className = `monitoring-focus monitoring-focus--${pageConfig.id}`;
  $("#monitoringFocusPanel").innerHTML = renderers[pageConfig.id](active, visible) + renderFocusMeta(active);
  $("#monitoringFocusPanel").querySelectorAll("[data-focus-id]").forEach((item) => {
    item.addEventListener("click", () => {
      state.activeId = item.dataset.focusId;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function renderFocusMeta(active) {
  return `
    <div class="focus-meta" aria-label="当前监控对象闭环摘要">
      <article><span>状态来源</span><strong>${active.source}</strong></article>
      <article><span>责任人与时间</span><strong>${active.owner} · ${active.time}</strong></article>
      <article><span>关联单据</span><strong>${active.order} / ${active.dispatch}</strong></article>
      <article><span>追溯与边界</span><strong>${active.trace} · 模拟回执不替代现场控制</strong></article>
    </div>
  `;
}

function renderOutputFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>产量节拍达成</h2><p>按产线把 PLC 脉冲、HMI 计数和报工草稿绑定到工单，不在后台直接报工。</p></div>${pill(active.status)}</div>
    <div class="output-lanes">${visible.length ? visible.map((item) => {
      const percent = getRatioPercent(item.value);
      return `
        <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
          <span>${item.line} · ${item.station}</span>
          <strong>${item.value}</strong>
          <div class="progress"><i style="width:${percent}%"></i></div>
          <em>${item.standard} · ${item.action}</em>
        </article>
      `;
    }).join("") : emptyFocus("当前筛选条件下没有产量节拍记录")}</div>
  `;
}

function renderRuntimeFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>设备状态矩阵</h2><p>突出运行、待机、故障、满载和开工准入影响；后台只记录模拟状态回执。</p></div><strong>${active.equipment}</strong></div>
    <div class="runtime-map">${visible.length ? visible.map((item) => `
      <button type="button" data-focus-id="${item.id}" class="${statusStyle(item.status)} ${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.equipment}</span><strong>${item.status}</strong><em>${item.value}</em>
      </button>
    `).join("") : emptyFocus("当前筛选条件下没有设备状态记录")}</div>
  `;
}

function renderParameterFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>参数规格门</h2><p>按规格限识别合格、接近上限和超限拦截，联动过程检验与报工拦截。</p></div>${pill(active.status)}</div>
    <div class="parameter-gates">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.primary}</span><strong>${item.value}</strong><em>${item.standard}</em>${pill(item.status)}
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有参数规格记录")}</div>
  `;
}

function renderAlarmFocus(active, visible) {
  const levels = ["高等级", "中等级", "低等级"];
  return `
    <div class="focus-head"><div><h2>报警分级流</h2><p>按等级、派单、响应和关闭结果组织报警，不在后台制造或关闭现场报警。</p></div><strong>${active.time}</strong></div>
    <div class="alarm-flow">${levels.map((level) => `
      <section><h3>${level}</h3>${visible.filter((item) => item.value === level).map((item) => focusItem(item, `${item.primary} · ${item.status}`)).join("") || "<p>暂无报警</p>"}</section>
    `).join("")}</div>
  `;
}

function renderDowntimeFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>停机原因归因</h2><p>区分 PLC 停机事实、班组模拟补录、维修验收和 OEE/排程影响。</p></div>${pill(active.status)}</div>
    <div class="downtime-bars">${visible.length ? visible.map((item) => {
      const minutes = Math.max(extractMinutes(item.value), /计划停机/.test(item.status) ? 60 : 8);
      return `
        <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
          <div><span>${item.equipment}</span><strong>${item.value}</strong></div>
          <div class="bar"><i style="width:${Math.min(minutes * 2, 100)}%"></i></div>
          <em>${item.standard} · ${item.action}</em>
        </article>
      `;
    }).join("") : emptyFocus("当前筛选条件下没有停机归因记录")}</div>
  `;
}

function renderTrendFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>SPC 趋势预警</h2><p>用时序窗口、判异结果和处置建议突出趋势页，不改写原始采集数据。</p></div>${pill(active.status)}</div>
    <div class="trend-cards">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${statusStyle(item.status)} ${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.value}</span><strong>${item.primary}</strong><em>${item.standard}</em><small>${item.action}</small>
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有 SPC 趋势记录")}</div>
  `;
}

function renderBoardFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>电子看板发布屏</h2><p>面向现场大屏发布产量、设备、异常和质量状态，保留刷新、签收和追溯入口。</p></div><strong>${active.standard}</strong></div>
    <div class="board-wall">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.station}</span><strong>${item.value}</strong><em>${item.item}</em>${pill(item.status)}
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有看板发布记录")}</div>
  `;
}

function focusItem(item, text) {
  return `<button type="button" data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}"><strong>${item.id}</strong><span>${text}</span><em>${item.action}</em></button>`;
}

function emptyFocus(text) {
  return `<article class="focus-empty"><strong>${text}</strong><em>请调整搜索、状态或产线筛选</em></article>`;
}

function getRatioPercent(text) {
  const match = text.match(/(\d+)\s*\/\s*(\d+)/);
  if (!match) return 0;
  return Math.min(100, Math.round((Number(match[1]) / Number(match[2])) * 100));
}

function buildMetricValues(visible) {
  if (pageConfig.id === "output") {
    const planned = visible.reduce((sum, item) => sum + extractQty(item.value, 1), 0);
    const actual = visible.reduce((sum, item) => sum + extractQty(item.value, 0), 0);
    return [planned, actual, visible.filter((item) => /预警|瓶颈/.test(item.status)).length, visible.filter((item) => /待|预警|瓶颈/.test(item.status + item.action)).length];
  }
  if (pageConfig.id === "downtime") {
    const minutes = visible.reduce((sum, item) => sum + extractMinutes(item.value), 0);
    return [visible.length, visible.filter((item) => /待/.test(item.status)).length, `${minutes}分`, visible.filter((item) => /已|计划/.test(item.status)).length];
  }
  if (pageConfig.id === "parameters" || pageConfig.id === "trends") {
    return [visible.length, visible.filter((item) => /合格|稳定/.test(item.status)).length, visible.filter((item) => /预警|接近|瓶颈/.test(item.status)).length, visible.filter((item) => /拦截|失控|超限/.test(item.status)).length];
  }
  return [visible.length, visible.filter((item) => /运行|正常|合格|稳定|已/.test(item.status)).length, visible.filter((item) => /故障|预警|待|瓶颈|满载/.test(item.status)).length, visible.filter((item) => /联动|触发|复核|拦截|跟进|重排|维修/.test(item.action)).length];
}

function extractQty(text, index) {
  const match = text.match(/(\d+)\s*\/\s*(\d+)/);
  return match ? Number(match[index + 1]) : 0;
}

function extractMinutes(text) {
  const match = text.match(/(\d+)\s*分钟/);
  return match ? Number(match[1]) : 0;
}

function renderTable() {
  const visible = getVisibleRows();
  $("#monitoringTableBody").innerHTML = visible.length ? visible.map((item) => {
    const cells = buildCells(item);
    return `
      <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
        ${cells.map((cell) => `<td>${cell}</td>`).join("")}
      </tr>
    `;
  }).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#monitoringTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function buildCells(item) {
  if (pageConfig.id === "output") return [twoLine(item.primary, item.batch), `${item.line} / ${item.station}`, item.source, item.value, item.standard, pill(item.status), item.action, item.owner];
  if (pageConfig.id === "runtime") return [twoLine(item.primary, item.item), `${item.line} / ${item.station}`, item.source, twoLine(item.order, item.dispatch), pill(item.status), `${item.value} / ${item.standard}`, item.action, item.owner];
  if (pageConfig.id === "parameters") return [twoLine(item.primary, item.id), twoLine(item.order, item.batch), `${item.equipment} / ${item.station}`, item.value, item.standard, pill(item.status), item.action, item.owner];
  if (pageConfig.id === "alarms") return [twoLine(item.id, item.primary), twoLine(item.equipment, item.order), item.source, item.value, item.standard, pill(item.status), item.action, item.owner];
  if (pageConfig.id === "downtime") return [twoLine(item.id, item.primary), twoLine(item.equipment, item.order), item.source, item.value, item.standard, pill(item.status), item.action, item.owner];
  if (pageConfig.id === "trends") return [twoLine(item.primary, item.item), twoLine(item.order, item.batch), item.source, item.value, item.standard, pill(item.status), item.action, item.owner];
  return [twoLine(item.primary, item.item), `${item.line} / ${item.station}`, item.source, item.value, item.standard, pill(item.status), item.action, item.owner];
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
    ["状态来源", active.source, "保留 PLC、SCADA、设备 API、工位 HMI、PDA、扫码枪或人工复核来源"],
    ["后台边界", getBoundaryText(), "后台负责监控、校验、派单、审核、复核、发布和追溯"],
    ["业务闭环", active.action, "结果回写派工、质量、设备、异常、排程、OEE 或追溯档案"],
  ];
  $("#monitoringCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="monitoring-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  const map = {
    output: "模拟 PLC、HMI 或报工草稿回传，后台不直接执行现场报工",
    runtime: "模拟 PLC/SCADA/设备 API 状态回传，后台不直接控制设备启停",
    parameters: "模拟 PLC、测试台或 HMI 参数回传，后台不直接编辑原始参数",
    alarms: "模拟 SCADA 或设备 API 报警回传，后台不直接制造或关闭现场报警",
    downtime: "模拟 PLC 停机日志或班组 HMI 补录，后台不直接停机",
    trends: "模拟时序数据聚合，后台不直接改写原始采集明细",
    board: "模拟电子看板终端刷新，后台不替代现场终端动作",
  };
  return map[pageConfig.id];
}

function renderDetail() {
  const active = getActive();
  $("#monitoringDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.primary} · ${active.line} · ${active.station}`;
  $("#detailKv").innerHTML = [
    ["关联工单", `${active.order} / ${active.dispatch}`],
    ["设备工位", `${active.equipment} / ${active.station}`],
    ["生产批次", active.batch],
    ["采集时间", active.time],
    ["责任人", active.owner],
    ["追溯引用", active.trace],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = [
    ["采集接入", active.source],
    ["业务绑定", `${active.order} / ${active.dispatch} / ${active.batch}`],
    ["校验结果", `${active.status} · ${active.standard}`],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = [
    ["当前动作", active.action],
    ["异常处置", /故障|预警|拦截|待|失控|瓶颈/.test(active.status + active.action) ? "需进入异常、质量、设备或排程闭环" : "当前无阻断，继续监控并归档"],
    ["下游引用", active.trace],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("") + renderReviewActions(active);
  $("#actionList").querySelectorAll("[data-monitoring-action]").forEach((button) => {
    button.addEventListener("click", () => runReviewAction(button.dataset.monitoringAction));
  });
  renderLogs();
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong>${log.snapshot ? `<em>${log.snapshot}</em>` : ""}</div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟回执或人工复核记录</strong></div>`;
}

function renderReviewActions() {
  return `
    <div class="manual-audit">
      <span>监控复核与发布</span>
      <strong>只维护复核结论、批注、快照、派单和看板发布状态，不改 PLC/SCADA/时序原始事实</strong>
      <div class="manual-action-row">
        ${getReviewActions().map((action) => `<button type="button" class="${action.danger ? "danger-action" : ""}" data-monitoring-action="${action.key}">${action.label}</button>`).join("")}
      </div>
    </div>
  `;
}

function getReviewActions() {
  const map = {
    output: [{ key: "mark", label: "标记异常" }, { key: "reportReview", label: "发起报工复核" }, { key: "exception", label: "转异常处理" }],
    runtime: [{ key: "confirmDiff", label: "确认状态差异" }, { key: "repair", label: "生成维修工单" }, { key: "closeFalse", label: "关闭误报", danger: true }],
    parameters: [{ key: "rejudge", label: "参数复判" }, { key: "spec", label: "确认规格版本" }, { key: "inspection", label: "转过程检验" }],
    alarms: [{ key: "assign", label: "报警派单" }, { key: "escalate", label: "升级" }, { key: "closeAlarm", label: "关闭报警", danger: true }],
    downtime: [{ key: "reason", label: "停机原因复核" }, { key: "merge", label: "合并停机段" }, { key: "review", label: "转复盘" }],
    trends: [{ key: "comment", label: "趋势批注" }, { key: "improve", label: "生成改善项" }, { key: "export", label: "导出趋势快照" }],
    board: [{ key: "config", label: "看板发布配置" }, { key: "publish", label: "发布/撤回", danger: true }, { key: "refresh", label: "模拟刷新" }],
  };
  return [...(map[pageConfig.id] || []), { key: "snapshot", label: "生成复核快照" }];
}

function runReviewAction(key) {
  const active = getActive();
  if (!active) return;
  const action = getReviewActions().find((item) => item.key === key) || { label: key };
  if (action.danger && !window.confirm(`${action.label}会改变复核/发布状态但不改原始采集事实，确认处理 ${active.id}？`)) return;
  const statusMap = {
    mark: "异常已标记", reportReview: "报工复核中", exception: "已转异常", confirmDiff: "差异已确认", repair: "维修派单中",
    closeFalse: "误报关闭待复核", rejudge: "参数复判中", spec: "规格已确认", inspection: "过程检验中", assign: "已派单",
    escalate: "已升级", closeAlarm: "报警关闭待复核", reason: "原因已复核", merge: "停机段待合并", review: "复盘中",
    comment: "已批注", improve: "改善项已生成", export: "快照已导出", config: "发布配置已保存", publish: "发布状态已更新",
    refresh: "模拟刷新完成", snapshot: "快照已生成",
  };
  active.status = statusMap[key] || active.status;
  active.action = `${action.label}已登记：责任人 ${active.owner}，关联 ${active.order}/${active.dispatch}，原始事实保持只读`;
  const snapshot = `${pageConfig.title} ${active.id} · ${new Date().toLocaleString("zh-CN", { hour12: false })}`;
  window.MES_BUSINESS_FLOW?.applyProcessAction?.(active.order, `monitoring-manual-${key}`, {
    dispatchId: active.dispatch,
    source: "后台复核维护",
    equipment: active.equipment,
    parameter: active.item || active.primary,
    value: active.value,
    status: active.status,
    owner: active.owner,
    result: active.action,
    snapshot,
  });
  appendLog(`${active.id} ${action.label}已登记`, snapshot);
  saveState();
  renderPageChrome();
  renderAll();
  showToast(`${action.label}已留痕`);
}

function renderAll() {
  mergeFlowRows();
  renderMetrics();
  renderFocusPanel();
  renderTable();
  renderCards();
  renderDetail();
}

function simulateStatus() {
  const active = getActive();
  const value = $("#simulationInput").value.trim();
  const statusMap = {
    output: "已采集",
    runtime: active.status === "故障" ? "维修中" : "运行中",
    parameters: /超限|拦截/.test(active.status) ? "超限拦截" : "合格",
    alarms: /已闭环/.test(active.status) ? "已闭环" : "处理中",
    downtime: "已归因",
    trends: /失控/.test(active.status) ? "失控拦截" : "趋势预警",
    board: "正常发布",
  };
  active.status = statusMap[pageConfig.id];
  if (pageConfig.id === "output") active.action = "采集值已进入报工草稿，等待工序报工校验";
  if (pageConfig.id === "runtime") active.action = active.status === "维修中" ? "维修工单已接收，等待试运行" : "设备运行状态已回写开工准入";
  if (pageConfig.id === "alarms") active.action = "报警事件已更新响应人和处置时限";
  if (pageConfig.id === "downtime") active.action = "原因代码已复核并进入 OEE 扣减";
  if (pageConfig.id === "board") active.action = "看板刷新成功，班组签收状态已记录";
  window.MES_BUSINESS_FLOW?.applyProcessAction?.(active.order, `monitoring-${pageConfig.id}`, {
    dispatchId: active.dispatch,
    source: active.source,
    equipment: active.equipment,
    parameter: active.item || active.primary,
    value: active.value,
    status: active.status,
    owner: active.owner,
    result: active.action,
  });
  appendLog(`${active.id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  $("#simulationInput").value = "";
  saveState();
  renderPageChrome();
  renderAll();
  showToast("模拟回执已记录");
}

function appendLog(text, snapshot = "") {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text, snapshot });
  logs = logs.slice(0, 20);
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone([...(window.MES_BUSINESS_FLOW?.getMonitoringRows?.(pageConfig.id) || []), ...initialRows[pageConfig.id]]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
  logs = [];
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
  $("#resetMonitoringBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", simulateStatus);
  $("#secondaryActionBtn").addEventListener("click", () => {
    const active = getActive();
    active.status = /合格|稳定|正常|运行/.test(active.status) ? "人工复核" : active.status;
    active.action = "已登记人工复核，等待责任人确认闭环结果";
    window.MES_BUSINESS_FLOW?.applyProcessAction?.(active.order, `monitoring-review-${pageConfig.id}`, {
      dispatchId: active.dispatch,
      source: "后台人工复核",
      equipment: active.equipment,
      parameter: active.item || active.primary,
      value: active.value,
      status: active.status,
      owner: active.owner,
      result: active.action,
    });
    appendLog(`${active.id} 已登记人工复核，责任人：${active.owner}`);
    saveState();
    renderPageChrome();
    renderAll();
    showToast("人工复核已登记");
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
