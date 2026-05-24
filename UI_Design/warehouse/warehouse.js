const pageConfig = window.WAREHOUSE_PAGE || { id: "operation", title: "工序完工", eyebrow: "完工与入库 / 工序完工" };
const STORAGE_KEY = `xingjigu_mes_warehouse_${pageConfig.id}_v2`;

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

const warehousePages = {
  工序完工: "operation-completion.html",
  完工确认: "completion-confirmation.html",
  包装作业: "packaging.html",
  成品入库: "finished-goods-receipt.html",
  库存冻结: "inventory-freeze.html",
  退料入库: "return-receipt.html",
  单据同步: "document-sync.html",
};

const navPages = {
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "SOP 查看": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 员工登录: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  barcode: { 生产批次: "../barcode/production-batches.html", 产品序列号: "../barcode/product-serials.html", 物料标签: "../barcode/material-labels.html", 成品标签: "../barcode/finished-labels.html", 箱码托盘码: "../barcode/box-pallet-codes.html", 标签打印: "../barcode/label-printing.html", 补打申请: "../barcode/reprint-requests.html" },
  quality: { 来料检验: "../quality/incoming-inspection.html", 首件检验: "../quality/first-article.html", 巡检任务: "../quality/patrol-tasks.html", 过程检验: "../quality/process-inspection.html", 成品检验: "../quality/final-inspection.html", 不良记录: "../quality/defect-records.html", 返工评审: "../quality/rework-review.html" },
  equipment: { 设备状态: "../equipment/equipment-status.html", 点检计划: "../equipment/inspection-plan.html", 保养计划: "../equipment/maintenance-plan.html", 维修工单: "../equipment/repair-orders.html", 停机记录: "../equipment/downtime-records.html", 备件领用: "../equipment/spare-parts.html", 设备效率: "../equipment/equipment-efficiency.html" },
  process: { 实时产量: "../monitoring/realtime-output.html", 设备运行: "../monitoring/device-runtime.html", 工艺参数: "../monitoring/process-parameters.html", 报警记录: "../monitoring/alarm-records.html", 停机原因: "../monitoring/downtime-reasons.html", 过程趋势: "../monitoring/process-trends.html", 电子看板: "../monitoring/electronic-board.html" },
  exceptions: { 异常上报: "../exceptions/exception-report.html", 待处理异常: "../exceptions/pending-exceptions.html", 停线申请: "../exceptions/line-stop.html", 缺料处理: "../exceptions/material-shortage.html", 质量问题: "../exceptions/quality-issues.html", 设备故障: "../exceptions/equipment-faults.html", 处理复盘: "../exceptions/review.html" },
};

const pageDefinitions = {
  operation: {
    subtitle: "接收工位终端和设备采集的工序完工回执，校验数量、工时、用料和质量状态，触发下道工序或末道完工确认",
    user: "车间主任 / 报工审核员",
    metrics: ["完工回执", "待确认", "已结转", "异常拦截"],
    columns: ["完工单", "工单 / 派工", "工序 / 工位", "良品 / 不良 / 报废", "来源回执", "校验结果", "状态", "责任人"],
    tableTitle: "工序完工回执",
    tableHint: "后台确认现场模拟报工回执，不替代工位扫码报工动作",
    cardTitle: "报工、WIP 与下道工序",
    simulationTitle: "模拟工位终端完工回执",
    simulationHint: "模拟工位 HMI、扫码枪、PLC 或测试台回传完工数据，后台只做校验、确认和追溯记录",
    primary: "确认工序完工",
  },
  confirmation: {
    subtitle: "按完工校验门复核所有工序、FQC、NCR、用料核销、批次谱系和成品标签，决定是否允许进入包装入库",
    user: "生产主管 / 质量放行员",
    metrics: ["待确认工单", "校验通过", "待补资料", "拦截项"],
    columns: ["确认单", "工单 / 成品批次", "完工数量", "校验门", "FQC 结果", "用料核销", "状态", "责任人"],
    tableTitle: "工单完工确认",
    tableHint: "完工确认是入库前管理动作，现场生产动作已由工位终端产生回执",
    cardTitle: "完工校验门",
    simulationTitle: "模拟 FQC / 用料核销回执",
    simulationHint: "模拟 FQC、投料核销、NCR 关闭或标签系统回传，不表示后台直接完成现场检验",
    primary: "通过完工确认",
  },
  packaging: {
    subtitle: "监控包装工位按 SN、成品标签、箱码和托盘码完成层级绑定，保留客户标签版本和包材批次追溯",
    user: "包装班长 / 标签管理员",
    metrics: ["包装任务", "待绑定", "已成托", "异常拦截"],
    columns: ["包装单", "工单 / 成品批次", "包装层级", "SN 范围", "包材批次", "标签版本", "状态", "责任人"],
    tableTitle: "包装作业与层级绑定",
    tableHint: "后台监控包装回执、标签版本和箱托关系，不替代包装工位扫码",
    cardTitle: "SN、箱码与托盘码",
    simulationTitle: "模拟包装工位扫码回执",
    simulationHint: "模拟包装台扫码枪、标签打印机或工位终端回传，不代表后台直接包装实物",
    primary: "确认包装完成",
  },
  receipt: {
    subtitle: "MES 生成成品入库指令，跟踪 WMS 扫码上架回执、库位建议、箱托校验和成品批次状态",
    user: "成品仓管员 / 仓储主管",
    metrics: ["入库指令", "待上架", "已入库", "回执异常"],
    columns: ["入库单", "工单 / 成品批次", "数量 / 箱托", "建议库位", "WMS 回执", "质量状态", "状态", "责任人"],
    tableTitle: "成品入库指令",
    tableHint: "后台跟踪 WMS 模拟扫码入库和上架结果，不替代仓库实物上架",
    cardTitle: "入库、上架与批次状态",
    simulationTitle: "模拟 WMS 扫码上架回执",
    simulationHint: "模拟 WMS、PDA、库位码和箱托码回传，后台只更新单据状态和追溯引用",
    primary: "确认入库回执",
  },
  freeze: {
    subtitle: "按质量异常、客户投诉、追溯召回或 WMS 回执冻结成品和退料批次，控制出库、投产和单据同步风险",
    user: "质量员 / 仓储主管",
    metrics: ["冻结单", "待复判", "已冻结", "待解冻"],
    columns: ["冻结单", "批次 / 库位", "冻结范围", "来源事件", "拦截规则", "复判结果", "状态", "责任人"],
    tableTitle: "库存冻结与解冻跟踪",
    tableHint: "后台维护库存状态、拦截和审批记录，实物隔离由仓库现场执行",
    cardTitle: "冻结、复判与放行",
    simulationTitle: "模拟 WMS / QMS 冻结回执",
    simulationHint: "模拟 WMS、QMS、客户投诉或追溯系统回传，不表示后台直接移动或隔离实物",
    primary: "同步冻结状态",
  },
  return: {
    subtitle: "接收余料退回、换线退料和冻结退料入库回执，核销用料差异并回写 WMS 库存账务",
    user: "退料审核员 / 原料仓管员",
    metrics: ["退料入库单", "待称重", "已核销", "差异待审"],
    columns: ["退料入库单", "工单 / 来源", "物料 / 余料标签", "申请 / 实收", "称重来源", "WMS 回执", "状态", "责任人"],
    tableTitle: "退料入库与核销",
    tableHint: "关联余料退回、投料差异和 WMS 入库回执，后台不替代现场称重和签收",
    cardTitle: "余料、称重与库存回写",
    simulationTitle: "模拟 PDA / 电子秤入库回执",
    simulationHint: "模拟现场 PDA、电子秤和 WMS 入库回传，后台只记录核销状态",
    primary: "核销退料入库",
  },
  sync: {
    subtitle: "跟踪 MES 与 ERP、WMS 的完工、入库、退料、冻结和工单关闭单据同步，保留失败重试和对账依据",
    user: "系统管理员 / 业务对账员",
    metrics: ["同步单", "待重试", "已同步", "对账差异"],
    columns: ["同步单", "业务单据", "目标系统", "同步内容", "最近回执", "重试 / 对账", "状态", "责任人"],
    tableTitle: "完工入库单据同步",
    tableHint: "用于跨系统状态一致性治理，避免重复入库、完工未入账或成本无法核算",
    cardTitle: "ERP、WMS 与补偿记录",
    simulationTitle: "模拟 ERP / WMS 接口回执",
    simulationHint: "模拟 ERP、WMS 或集成平台回传，不直接修改外部系统真实账务",
    primary: "重发同步单据",
  },
};

const initialRows = {
  operation: [
    { id: "OC-0001", order: "MO-202606-0001", dispatch: "D-001", product: "智能温控控制器 TCU-100", operation: "SMT 贴片", station: "SMT-WS-01", line: "Line-A", batch: "WIP-TCU100-20260620-A01", qty: 428, bad: 6, scrap: 1, pack: "下道 DIP 待接收", location: "SMT 暂存区", status: "待确认", owner: "车间主任 王磊", source: "模拟工位 HMI 报工 11:35", check: "数量未超派工，首件合格，用料差异待核销", next: "触发 DIP 派工接收", risk: "温度传感器余量偏低", time: "06-20 11:35" },
    { id: "OC-0002", order: "MO-202606-0002", dispatch: "D-021", product: "工业网关 GW-240", operation: "SMT 贴片", station: "SMT-WS-02", line: "Line-B", batch: "WIP-GW240-20260620-B01", qty: 315, bad: 3, scrap: 0, pack: "测试工序排队", location: "Line-B 周转车", status: "已结转", owner: "报工审核员 林珊", source: "模拟 PLC 产量脉冲 + HMI 确认", check: "SPC 正常，WIP 已转测试", next: "测试工序排队", risk: "测试工位占用", time: "06-20 10:22" },
    { id: "OC-0003", order: "MO-202606-0011", dispatch: "D-111", product: "温湿度采集器 THS-10", operation: "包装入库", station: "PACK-WS-02", line: "Line-C", batch: "FG-THS10-20260620-C01", qty: 1480, bad: 0, scrap: 0, pack: "74 箱 / 7 托", location: "PACK-C-02", status: "待完工确认", owner: "包装班长 李娟", source: "模拟包装终端报工", check: "包装盒余料 130 件待退", next: "完工确认", risk: "余料待核销", time: "06-20 15:48" },
    { id: "OC-0004", order: "MO-202606-0012", dispatch: "D-121", product: "工业触控终端 HMI-100", operation: "首件后装配", station: "ASM-WS-04", line: "Line-B", batch: "WIP-HMI100-20260620-B02", qty: 80, bad: 8, scrap: 1, pack: "待复判", location: "质量隔离车", status: "异常拦截", owner: "质量员 周倩", source: "模拟测试台 NG 回传", check: "首件尺寸项未关闭，NCR 待复判", next: "质量问题处理", risk: "不可转下道", time: "06-20 13:20" },
  ],
  confirmation: [
    { id: "CC-0001", order: "MO-202606-0011", dispatch: "D-111", product: "温湿度采集器 THS-10", operation: "末道完工", station: "PACK-WS-02", line: "Line-C", batch: "FG-THS10-20260620-C01", qty: 1480, bad: 0, scrap: 0, pack: "74 箱 / 7 托", location: "成品待入库区", status: "待确认", owner: "生产主管 赵航", source: "工序完工 OC-0003", check: "FQC 合格，标签已生成，用料核销待退料", next: "包装层级复核", risk: "余料差异需同步退料", time: "06-20 16:00" },
    { id: "CC-0002", order: "MO-202606-0004", dispatch: "D-041", product: "智能传感节点 SEN-20", operation: "FQC 检验", station: "QC-FINAL-01", line: "Line-A", batch: "FG-SEN20-20260620-A02", qty: 1280, bad: 12, scrap: 2, pack: "64 箱 / 6 托", location: "FQC 放行区", status: "校验通过", owner: "质量放行员 陈澄", source: "FQC 放行单 FQC-8821", check: "所有工序完工，NCR 已关闭，批次谱系完整", next: "生成入库指令", risk: "无", time: "06-20 14:40" },
    { id: "CC-0003", order: "MO-202606-0001", dispatch: "D-008", product: "智能温控控制器 TCU-100", operation: "包装入库", station: "PACK-WS-01", line: "Line-A", batch: "FG-TCU100-20260620-A01", qty: 800, bad: 6, scrap: 1, pack: "40 箱 / 4 托", location: "待 FQC", status: "待补资料", owner: "质量主管 孟可", source: "末道报工草稿", check: "IPQC 巡检记录缺一次签名，成品标签待复核", next: "补齐检验履历", risk: "不可生成入库指令", time: "06-20 12:10" },
    { id: "CC-0004", order: "MO-202606-0012", dispatch: "D-121", product: "工业触控终端 HMI-100", operation: "装配完工", station: "ASM-WS-04", line: "Line-B", batch: "WIP-HMI100-20260620-B02", qty: 80, bad: 8, scrap: 1, pack: "未包装", location: "质量隔离车", status: "拦截", owner: "生产主管 赵航", source: "NCR-240620-09", check: "NCR 未关闭，首件尺寸项未复判", next: "返工评审", risk: "禁止入库", time: "06-20 13:35" },
  ],
  packaging: [
    { id: "PKG-0001", order: "MO-202606-0011", dispatch: "D-111", product: "温湿度采集器 THS-10", operation: "包装作业", station: "PACK-WS-02", line: "Line-C", batch: "FG-THS10-20260620-C01", qty: 1480, bad: 0, scrap: 0, pack: "74 箱 / 7 托", location: "成品待入库区", status: "待绑定", owner: "包装班长 李娟", source: "模拟包装工位扫码", check: "SN 已绑定 1400 台，余 80 台待装箱", next: "成品入库", risk: "尾箱不足 20 台需生成散箱标识", time: "06-20 16:12" },
    { id: "PKG-0002", order: "MO-202606-0004", dispatch: "D-041", product: "智能传感节点 SEN-20", operation: "包装作业", station: "PACK-WS-01", line: "Line-A", batch: "FG-SEN20-20260620-A02", qty: 1280, bad: 0, scrap: 0, pack: "64 箱 / 6 托", location: "成品待入库区", status: "已成托", owner: "标签管理员 沈悦", source: "模拟标签打印机回执", check: "箱码托盘码层级完整，客户标签 V1.4 生效", next: "生成 WMS 入库指令", risk: "无", time: "06-20 15:05" },
    { id: "PKG-0003", order: "MO-202606-0001", dispatch: "D-008", product: "智能温控控制器 TCU-100", operation: "包装作业", station: "PACK-WS-01", line: "Line-A", batch: "FG-TCU100-20260620-A01", qty: 800, bad: 0, scrap: 0, pack: "40 箱 / 4 托", location: "包装暂存", status: "标签待复核", owner: "标签管理员 沈悦", source: "成品标签系统", check: "客户 A 标签模板版本与订单要求不一致", next: "标签复核", risk: "错贴标签风险", time: "06-20 12:45" },
    { id: "PKG-0004", order: "MO-202606-0008", dispatch: "D-081", product: "智能继电控制器 RLY-12", operation: "包装作业", station: "PACK-WS-03", line: "Line-B", batch: "FG-RLY12-20260620-B01", qty: 470, bad: 0, scrap: 0, pack: "23 箱 / 2 托", location: "包装线 B", status: "异常拦截", owner: "包装班长 郑峰", source: "模拟扫码枪回执", check: "SN 与箱码重复绑定 1 条", next: "补打申请 / 标签作废", risk: "追溯层级断链", time: "06-20 11:50" },
  ],
  receipt: [
    { id: "GR-0001", order: "MO-202606-0011", dispatch: "D-111", product: "温湿度采集器 THS-10", operation: "成品入库", station: "FG-WH-01", line: "Line-C", batch: "FG-THS10-20260620-C01", qty: 1480, bad: 0, scrap: 0, pack: "74 箱 / 7 托", location: "FG-C-01-02", status: "待上架", owner: "成品仓管员 谢然", source: "MES 入库指令", check: "FQC 合格，箱托层级完整，库位容量可用", next: "模拟 WMS 上架", risk: "尾箱需单独库位标识", time: "06-20 16:30" },
    { id: "GR-0002", order: "MO-202606-0004", dispatch: "D-041", product: "智能传感节点 SEN-20", operation: "成品入库", station: "FG-WH-02", line: "Line-A", batch: "FG-SEN20-20260620-A02", qty: 1280, bad: 0, scrap: 0, pack: "64 箱 / 6 托", location: "FG-A-03-01", status: "已入库", owner: "仓储主管 孙奕", source: "模拟 WMS 上架回执", check: "WMS 入库单 WR-8841 已回传", next: "ERP 完工回传", risk: "无", time: "06-20 15:28" },
    { id: "GR-0003", order: "MO-202606-0001", dispatch: "D-008", product: "智能温控控制器 TCU-100", operation: "成品入库", station: "FG-WH-01", line: "Line-A", batch: "FG-TCU100-20260620-A01", qty: 800, bad: 0, scrap: 0, pack: "40 箱 / 4 托", location: "FG-A-01-02", status: "待放行", owner: "质量员 陈澄", source: "完工确认待补资料", check: "标签模板复核未完成", next: "等待完工确认", risk: "禁止入库", time: "06-20 13:10" },
    { id: "GR-0004", order: "MO-202606-0008", dispatch: "D-081", product: "智能继电控制器 RLY-12", operation: "成品入库", station: "FG-WH-02", line: "Line-B", batch: "FG-RLY12-20260620-B01", qty: 470, bad: 0, scrap: 0, pack: "23 箱 / 2 托", location: "FG-B-02-05", status: "回执异常", owner: "仓储主管 孙奕", source: "WMS 返回箱码重复", check: "箱码 BOX-RLY12-014 已存在", next: "包装异常复核", risk: "重复入库风险", time: "06-20 12:16" },
  ],
  freeze: [
    { id: "FRZ-0001", order: "MO-202606-0008", dispatch: "D-081", product: "智能继电控制器 RLY-12", operation: "库存冻结", station: "FG-WH-02", line: "Line-B", batch: "FG-RLY12-20260620-B01", qty: 470, bad: 0, scrap: 0, pack: "23 箱 / 2 托", location: "FG-B-02-05", status: "已冻结", owner: "质量员 周倩", source: "包装箱码重复异常", check: "禁止出库，禁止 ERP 入账，等待标签复核", next: "标签作废或解冻审批", risk: "追溯层级重复", time: "06-20 12:20" },
    { id: "FRZ-0002", order: "MO-202606-0012", dispatch: "D-121", product: "工业触控终端 HMI-100", operation: "库存冻结", station: "隔离区 QI-B", line: "Line-B", batch: "WIP-HMI100-20260620-B02", qty: 80, bad: 8, scrap: 1, pack: "未包装", location: "QI-B-01", status: "待复判", owner: "质量主管 孟可", source: "NCR-240620-09", check: "尺寸复判未关闭，批次禁止入库", next: "返工评审", risk: "客户 J 首件风险", time: "06-20 13:45" },
    { id: "FRZ-0003", order: "MO-202606-0005", dispatch: "D-052", product: "电源控制模块 PCM-60", operation: "退料冻结", station: "RM-WH-03", line: "Line-B", batch: "PWRIC-L20260602", qty: 160, bad: 0, scrap: 0, pack: "原料周转箱 2 箱", location: "RM-B-04-01", status: "待解冻", owner: "仓储主管 马岩", source: "IQC 让步评审通过", check: "仅允许指定工单投料，需 WMS 解冻回执", next: "同步 WMS 解冻", risk: "错误投料风险", time: "06-20 09:40" },
    { id: "FRZ-0004", order: "MO-202606-0004", dispatch: "D-041", product: "智能传感节点 SEN-20", operation: "成品冻结", station: "FG-WH-02", line: "Line-A", batch: "FG-SEN20-20260620-A02", qty: 40, bad: 0, scrap: 0, pack: "2 箱", location: "FG-A-03-01", status: "已解冻", owner: "质量员 陈澄", source: "抽检复判合格", check: "冻结解除并保留复判记录", next: "允许出库", risk: "无", time: "06-20 15:50" },
  ],
  return: [
    { id: "RR-0001", order: "MO-202606-0011", dispatch: "D-111", product: "温湿度采集器 THS-10", operation: "包装余料退库", station: "RM-WH-02", line: "Line-C", batch: "BOXI-L20260614", qty: 130, bad: 0, scrap: 0, pack: "余料标签 RT-0001", location: "PKG-MAT-C-02", status: "待称重", owner: "原料仓管员 梁启", source: "投料差异 FD-0003", check: "申请 130 件，待电子秤和 WMS 签收", next: "模拟电子秤入库", risk: "多领 30 件需核销", time: "06-20 16:10" },
    { id: "RR-0002", order: "MO-202606-0002", dispatch: "D-021", product: "工业网关 GW-240", operation: "换线退料", station: "RM-WH-01", line: "Line-B", batch: "RES10K-L20260604", qty: 250, bad: 0, scrap: 0, pack: "尾料标签 RT-0003", location: "RM-B-02-01", status: "已核销", owner: "退料审核员 何敏", source: "模拟电子秤回传", check: "实收 248 件，差异 2 件已审批", next: "WMS 库存已回写", risk: "无", time: "06-20 11:08" },
    { id: "RR-0003", order: "MO-202606-0005", dispatch: "D-052", product: "电源控制模块 PCM-60", operation: "冻结退料", station: "RM-WH-03", line: "Line-B", batch: "PWRIC-L20260602", qty: 160, bad: 0, scrap: 0, pack: "冻结批次 1 托", location: "RM-B-04-01", status: "差异待审", owner: "质量员 孟可", source: "IQC 冻结", check: "WMS 实收 158 件，差异 2 件待复核", next: "冻结复判", risk: "关联缺料预警", time: "06-20 12:05" },
    { id: "RR-0004", order: "MO-202606-0004", dispatch: "D-041", product: "智能传感节点 SEN-20", operation: "完工余料", station: "RM-WH-02", line: "Line-A", batch: "CASE-A-L20260610", qty: 42, bad: 0, scrap: 0, pack: "余料标签 RT-0002", location: "RM-A-05-02", status: "待签收", owner: "仓管员 谢然", source: "完工确认 CC-0002", check: "包装完工后退回外壳上盖余料", next: "WMS 入库签收", risk: "无", time: "06-20 14:52" },
  ],
  sync: [
    { id: "SYNC-0001", order: "MO-202606-0004", dispatch: "GR-0002", product: "智能传感节点 SEN-20", operation: "ERP 完工回传", station: "ERP", line: "Line-A", batch: "FG-SEN20-20260620-A02", qty: 1280, bad: 12, scrap: 2, pack: "64 箱 / 6 托", location: "ERP 工单", status: "已同步", owner: "业务对账员 陆洋", source: "MES 完工入库单", check: "完工数量、工时、用料和工单状态已入账", next: "成本核算", risk: "无", time: "06-20 15:31" },
    { id: "SYNC-0002", order: "MO-202606-0011", dispatch: "GR-0001", product: "温湿度采集器 THS-10", operation: "WMS 入库同步", station: "WMS", line: "Line-C", batch: "FG-THS10-20260620-C01", qty: 1480, bad: 0, scrap: 0, pack: "74 箱 / 7 托", location: "FG-C-01-02", status: "待重试", owner: "系统管理员 邹宁", source: "WMS 上架回执超时", check: "MES 已生成入库指令，WMS 未返回最终上架", next: "重发入库指令", risk: "MES 与 WMS 状态不一致", time: "06-20 16:42" },
    { id: "SYNC-0003", order: "MO-202606-0008", dispatch: "FRZ-0001", product: "智能继电控制器 RLY-12", operation: "库存冻结同步", station: "WMS", line: "Line-B", batch: "FG-RLY12-20260620-B01", qty: 470, bad: 0, scrap: 0, pack: "23 箱 / 2 托", location: "FG-B-02-05", status: "对账差异", owner: "业务对账员 陆洋", source: "冻结单 FRZ-0001", check: "MES 冻结成功，WMS 仍显示可出库", next: "人工复核并重发", risk: "误出库风险", time: "06-20 12:24" },
    { id: "SYNC-0004", order: "MO-202606-0002", dispatch: "RR-0002", product: "工业网关 GW-240", operation: "退料入库同步", station: "WMS", line: "Line-B", batch: "RES10K-L20260604", qty: 248, bad: 0, scrap: 0, pack: "尾料标签 RT-0003", location: "RM-B-02-01", status: "已同步", owner: "系统管理员 邹宁", source: "退料入库 RR-0002", check: "WMS 库存和 MES 用料差异已核销", next: "日终对账", risk: "无", time: "06-20 11:12" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.warehouse || {});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#warehouseModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "warehouse" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "warehouse" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#warehouseModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#warehouseModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  if (moduleId === "workbench") window.location.href = "../index.html";
  else if (moduleId === "warehouse" && warehousePages[entry]) window.location.href = `./${warehousePages[entry]}`;
  else if (navPages[moduleId]?.[entry]) window.location.href = navPages[moduleId][entry];
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

function hydrateRowsFromBusinessFlow() {
  const completionRows = window.MES_BUSINESS_FLOW?.read ? getWarehouseFlowRows() : [];
  if (!completionRows.length) return;
  const existing = new Set(rows.map((item) => item.id));
  rows = [...completionRows.filter((item) => !existing.has(item.id)), ...rows];
}

function getWarehouseFlowRows() {
  const flow = window.MES_BUSINESS_FLOW?.read?.();
  if (!flow?.completionEvents?.length) return [];
  const stageByPage = {
    operation: "工序完工",
    confirmation: "完工确认",
    packaging: "包装作业",
    receipt: "成品入库",
    freeze: "库存冻结",
    return: "退料入库",
    sync: "单据同步",
  };
  return flow.completionEvents
    .filter((event) => event.stage === stageByPage[pageConfig.id] || pageConfig.id === "sync")
    .slice(0, 12)
    .map((event) => {
      const order = flow.orders.find((item) => item.id === event.orderId) || {};
      return {
        id: event.businessId || event.id,
        order: event.orderId,
        dispatch: event.dispatchId || "统一业务流",
        product: order.product || "业务流产品",
        operation: event.stage,
        station: event.location || "统一业务流",
        line: order.line || "全部产线",
        batch: event.batch || "批次待关联",
        qty: event.qty || order.done || 0,
        bad: 0,
        scrap: 0,
        pack: event.packageLevel || "包装层级待关联",
        location: event.location || "库位待回执",
        status: event.status,
        owner: event.owner,
        source: event.source,
        check: event.result,
        next: event.stage === "成品入库" ? "单据同步 / 追溯查询 / 经营报表" : "继续推进完工入库闭环",
        risk: /异常|拦截|冻结|差异/.test(`${event.status} ${event.result}`) ? event.result : "无",
        time: event.time,
      };
    });
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
    const text = `${item.id} ${item.order} ${item.dispatch} ${item.product} ${item.operation} ${item.station} ${item.line} ${item.batch} ${item.status} ${item.owner} ${item.source} ${item.check} ${item.risk}`.toLowerCase();
    return (!keyword || text.includes(keyword)) && (state.status === "all" || item.status === state.status) && (state.line === "all" || item.line === state.line);
  });
}

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(status) {
  if (/异常|拦截|冻结|差异|失败|禁止|风险/.test(status)) return "red";
  if (/待|重试|复判|补|签收|上架|绑定|放行/.test(status)) return "orange";
  if (/已|通过|入库|核销|同步|结转|解冻|成托/.test(status)) return "green";
  return "blue";
}

function renderPageChrome() {
  const def = getDefinition();
  document.title = `星技谷 MES | ${pageConfig.title}`;
  $("#pageEyebrow").textContent = pageConfig.eyebrow;
  $("#pageTitle").textContent = `${pageConfig.title}工作台`;
  $("#pageSubtitle").textContent = def.subtitle;
  $("#userRole").textContent = def.user;
  $("#primaryActionBtn").textContent = def.primary;
  $("#tableTitle").textContent = def.tableTitle;
  $("#tableHint").textContent = def.tableHint;
  $("#cardTitle").textContent = def.cardTitle;
  $("#simulationTitle").textContent = def.simulationTitle;
  $("#simulationHint").textContent = def.simulationHint;
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "单据号"} / ${rows[0]?.batch || "批次号"}`;
  $("#secondaryActionBtn").textContent = getGovernanceAction().button;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /待|重试|复判|绑定|上架|补|签收/.test(item.status)).length,
    visible.filter((item) => /已|通过|入库|核销|同步|结转|成托/.test(item.status)).length,
    visible.filter((item) => /异常|拦截|冻结|差异|失败|风险/.test(`${item.status} ${item.risk}`)).length,
  ];
  $("#warehouseMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "需责任人闭环并保留追溯引用" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderBusinessFocus() {
  let focus = $("#warehouseFocus");
  if (!focus) {
    focus = document.createElement("section");
    focus.id = "warehouseFocus";
    focus.className = "warehouse-focus";
    $("#warehouseMetrics").after(focus);
  }
  const active = getActive();
  const visible = getVisibleRows();
  const blocked = visible.filter((item) => /异常|拦截|冻结|差异|待|重试|补/.test(`${item.status} ${item.risk} ${item.check}`)).slice(0, 4);
  const modeMap = {
    operation: ["完工回执校验门", "校验数量、工时、用料、质量和 WIP 结转，决定是否流转下道或完工确认"],
    confirmation: ["入库前校验门", "复核工序、FQC、NCR、SPC、用料核销、成品标签和未关闭异常"],
    packaging: ["包装层级追溯", "按 SN、箱码、托盘码、包材批次和客户标签版本形成层级关系"],
    receipt: ["WMS 入库回执", "按 MES 入库指令、WMS 模拟上架、库位建议和箱托校验闭环"],
    freeze: ["冻结 / 解冻控制", "按质量异常、追溯召回、客户投诉和 WMS 回执管理出库与投产拦截"],
    return: ["退料入库核销", "按余料标签、模拟称重、WMS 入库和用料差异完成退料闭环"],
    sync: ["ERP / WMS 对账补偿", "按完工、入库、退料、冻结和工单关闭同步任务处理重试与差异"],
  };
  const [title, hint] = modeMap[pageConfig.id] || modeMap.operation;
  focus.innerHTML = `
    <div class="warehouse-focus__head">
      <div>
        <span>本页业务重点</span>
        <h2>${title}</h2>
        <p>${hint}</p>
      </div>
      <strong>${active?.order || "未选中"} · ${active?.batch || "批次待选"}</strong>
    </div>
    <div class="warehouse-focus__grid">
      <article class="warehouse-gate">
        <span>${pageConfig.id === "packaging" ? "层级绑定" : pageConfig.id === "sync" ? "同步节点" : "校验门"}</span>
        ${buildGateItems(active).map(([label, value, state]) => `
          <div>
            <b class="warehouse-gate__mark warehouse-gate__mark--${state}"></b>
            <strong>${label}</strong>
            <em>${value}</em>
          </div>
        `).join("")}
      </article>
      <article class="warehouse-lane">
        <span>${pageConfig.id === "receipt" ? "入库流转" : pageConfig.id === "freeze" ? "冻结范围" : "业务流转"}</span>
        ${visible.slice(0, 4).map((item) => `
          <div>
            <strong>${item.id}</strong>
            <em>${laneLabel(item)}</em>
            <small>${item.status}</small>
          </div>
        `).join("")}
      </article>
      <article class="warehouse-exception-stack">
        <span>待闭环事项</span>
        ${blocked.length ? blocked.map((item) => `
          <div>
            <strong>${item.id}</strong>
            <em>${item.risk || item.check}</em>
            <small>${item.owner}</small>
          </div>
        `).join("") : `<div><strong>当前无阻断事项</strong><em>继续等待下游模拟回执</em><small>${active?.owner || "责任人"} 跟踪</small></div>`}
      </article>
    </div>
  `;
}

function buildGateItems(active) {
  if (!active) return [["单据", "未选中", "warn"]];
  const riskState = /异常|拦截|冻结|差异|禁止|待补/.test(`${active.status} ${active.risk} ${active.check}`) ? "warn" : "ok";
  if (pageConfig.id === "packaging") {
    return [["SN 范围", active.location, riskState], ["箱托层级", active.pack, riskState], ["标签版本", active.check, riskState]];
  }
  if (pageConfig.id === "receipt") {
    return [["入库指令", active.source, riskState], ["库位建议", active.location, riskState], ["箱托校验", active.check, riskState]];
  }
  if (pageConfig.id === "freeze") {
    return [["冻结范围", active.location, riskState], ["来源事件", active.source, riskState], ["复判/解冻", active.next, riskState]];
  }
  if (pageConfig.id === "sync") {
    return [["目标系统", active.station, riskState], ["回执状态", active.status, riskState], ["对账依据", active.check, riskState]];
  }
  return [["数量校验", `良品 ${active.qty} / 不良 ${active.bad} / 报废 ${active.scrap}`, riskState], ["质量/用料", active.check, riskState], ["下游放行", active.next, riskState]];
}

function laneLabel(item) {
  if (pageConfig.id === "sync") return `${item.operation} -> ${item.station}`;
  if (pageConfig.id === "receipt") return `${item.batch} -> ${item.location}`;
  if (pageConfig.id === "return") return `${item.source} -> ${item.location}`;
  return `${item.operation} -> ${item.next}`;
}

function renderTable() {
  const visible = getVisibleRows();
  $("#warehouseTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
      ${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#warehouseTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function buildCells(item) {
  if (pageConfig.id === "operation") return [item.id, twoLine(item.order, item.dispatch), twoLine(item.operation, item.station), `${item.qty} / ${item.bad} / ${item.scrap}`, item.source, item.check, pill(item.status), item.owner];
  if (pageConfig.id === "confirmation") return [item.id, twoLine(item.order, item.batch), `${item.qty} PCS`, item.check, item.source, item.risk, pill(item.status), item.owner];
  if (pageConfig.id === "packaging") return [item.id, twoLine(item.order, item.batch), item.pack, item.location, item.batch, item.check, pill(item.status), item.owner];
  if (pageConfig.id === "receipt") return [item.id, twoLine(item.order, item.batch), `${item.qty} / ${item.pack}`, item.location, item.source, item.check, pill(item.status), item.owner];
  if (pageConfig.id === "freeze") return [item.id, twoLine(item.batch, item.location), `${item.qty} PCS`, item.source, item.check, item.next, pill(item.status), item.owner];
  if (pageConfig.id === "return") return [item.id, twoLine(item.order, item.source), twoLine(item.product, item.batch), `${item.qty} / ${Math.max(item.qty - item.scrap, 0)}`, item.source, item.check, pill(item.status), item.owner];
  return [item.id, twoLine(item.order, item.dispatch), item.station, item.operation, item.source, item.next, pill(item.status), item.owner];
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
    ["状态来源", active.source, "保留工位终端、质量、WMS、ERP 或集成平台回执"],
    ["后台边界", getBoundaryText(), "后台处理配置、监控、校验、审核和补偿记录"],
    ["下游闭环", active.next, "继续衔接包装、入库、冻结、同步、追溯或异常处理"],
  ];
  $("#warehouseCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="warehouse-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  if (["operation", "packaging"].includes(pageConfig.id)) return "现场扫码枪、工位 HMI、PLC 或标签打印机产生模拟回执";
  if (["receipt", "return", "freeze"].includes(pageConfig.id)) return "WMS、PDA、电子秤或仓库现场产生模拟回执";
  if (pageConfig.id === "confirmation") return "质量放行、用料核销和标签系统产生模拟校验结果";
  return "ERP、WMS 和集成平台产生模拟接口回执";
}

function renderDetail() {
  const active = getActive();
  $("#warehouseDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.product}`;
  $("#detailKv").innerHTML = [
    ["业务对象", `${active.operation} · ${active.station}`],
    ["批次库位", `${active.batch} · ${active.location}`],
    ["数量口径", `良品 ${active.qty} / 不良 ${active.bad} / 报废 ${active.scrap}`],
    ["包装层级", active.pack],
    ["责任人", active.owner],
    ["时间戳", active.time || "业务流回执时间待同步"],
    ["风险说明", active.risk],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = [
    ["来源生成", active.source],
    ["校验结果", active.check],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
    ["追溯引用", `${active.order} / ${active.dispatch} / ${active.batch}`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("") + renderManualActions(active);
  $("#actionList").querySelectorAll("[data-manual-action]").forEach((button) => {
    button.addEventListener("click", () => runManualAction(button.dataset.manualAction));
  });
  $("#quickLinks").innerHTML = buildQuickLinks().map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  renderLogs();
}

function buildActions(active) {
  const actions = [
    ["当前动作", getDefinition().primary],
    ["异常处置", /异常|拦截|冻结|差异|风险|禁止/.test(`${active.status} ${active.risk}`) ? "生成异常、冻结、复判、补偿或人工审核记录" : "无关键拦截，继续等待下游回执"],
    ["下游结果", active.next],
    ["非主干维护", getGovernanceAction(active).hint],
  ];
  if (pageConfig.id === "sync") actions.push(["对账依据", "保留请求批次、回执时间、重试次数和业务责任人"]);
  if (pageConfig.id === "confirmation") actions.push(["校验门", "所有工序、FQC、NCR、SPC、用料、标签和异常必须关闭"]);
  if (pageConfig.id === "freeze") actions.push(["拦截范围", "冻结批次禁止出库、投产或 ERP 入账，解冻需审批"]);
  return actions;
}

function getGovernanceAction(active = getActive()) {
  const map = {
    operation: { button: "补录工时差异", status: "差异待审", type: "工序完工补录", result: "已生成工时/数量差异补录审批，保留前后值和责任人", hint: "支持报工数量、工时和 WIP 结转差异补录审批" },
    confirmation: { button: "提交放行审批", status: "审批中", type: "完工确认审批", result: "已提交完工放行审批，FQC、用料核销、标签和异常关闭作为签核依据", hint: "支持完工放行、退回补资料和校验门审批留痕" },
    packaging: { button: "撤回包装层级", status: "撤回待复核", type: "包装层级撤回", result: "已撤回箱码/托盘码层级，需标签管理员复核旧码作废和新码关联", hint: "支持箱码托盘码撤回、补打关联和客户标签版本复核" },
    receipt: { button: "撤回入库指令", status: "撤回待复核", type: "入库指令撤回", result: "已撤回 MES 入库指令，等待 WMS 库位回滚和质量复核", hint: "支持成品入库撤回、WMS 回执失败重试和账实补偿" },
    freeze: { button: active?.status === "待解冻" ? "提交解冻审批" : "提交冻结审批", status: active?.status === "待解冻" ? "解冻审批中" : "冻结审批中", type: "冻结解冻审批", result: "已提交冻结/解冻审批，影响出库、投产、ERP 入账和客户追溯报告", hint: "支持库存冻结、解冻、复判和审批链留痕" },
    return: { button: "提交差异审批", status: "差异审批中", type: "退料差异审批", result: "已提交退料实收差异审批，等待电子秤、PDA 和 WMS 回执复核", hint: "支持退料实收差异、报废、余料核销和成本归集审批" },
    sync: { button: active?.status === "对账差异" ? "关闭对账差异" : "重试同步单据", status: active?.status === "对账差异" ? "差异关闭待复核" : "重试中", type: "ERP/WMS补偿", result: "已登记 ERP/WMS 同步重试或对账差异关闭，保留请求批次、回执和责任人", hint: "支持 ERP/WMS 重试、补偿、对账差异关闭和日终锁账依据" },
  };
  return map[pageConfig.id] || { button: "登记维护动作", status: "维护中", type: "完工入库维护", result: "已登记维护动作", hint: "登记补偿、审批、撤回或关闭动作" };
}

function applyGovernanceAction() {
  const active = getActive();
  if (!active) return;
  const config = getGovernanceAction(active);
  const before = `${active.status} / ${active.next}`;
  active.status = config.status;
  active.next = config.result;
  window.MES_BUSINESS_FLOW?.applyCompletionAction?.(active, pageConfig.id, config.button, {
    status: config.status,
    result: config.result,
    owner: active.owner,
    governanceType: config.type,
    approvalStatus: config.status,
    beforeAfter: `${before} -> ${active.status} / ${active.next}`,
  });
  appendLog(`${active.id} 已执行${config.button}：${config.result}`);
  saveState();
  renderPageChrome();
  renderAll();
  showToast(`${config.button}已登记`);
}

function buildQuickLinks() {
  const links = {
    operation: [["工序报工", "../station/operation-report.html"], ["完工确认", "./completion-confirmation.html"]],
    confirmation: [["包装作业", "./packaging.html"], ["成品检验", "../quality/final-inspection.html"]],
    packaging: [["箱码托盘码", "../barcode/box-pallet-codes.html"], ["成品入库", "./finished-goods-receipt.html"]],
    receipt: [["单据同步", "./document-sync.html"], ["库存冻结", "./inventory-freeze.html"]],
    freeze: [["异常处理", "../exceptions/pending-exceptions.html"], ["单据同步", "./document-sync.html"]],
    return: [["余料退回", "../materials/return-materials.html"], ["投料记录", "../materials/feeding-records.html"]],
    sync: [["成品入库", "./finished-goods-receipt.html"], ["完工确认", "./completion-confirmation.html"]],
  };
  return links[pageConfig.id] || [];
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 8).map((log) => `<div><span>${log.time}</span><strong>${log.text}</strong>${log.beforeAfter ? `<em>${log.beforeAfter}</em>` : ""}</div>`).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟回执或人工处置记录</strong></div>`;
}

function renderManualActions(active) {
  return `
    <div class="manual-audit">
      <span>入库强审计动作</span>
      <strong>不直接修改 WMS/ERP 账务；仅维护申请、审批、补偿、撤回、关闭和复核结论</strong>
      <div class="manual-action-row">
        ${getManualActions(active).map((action) => `<button type="button" class="${action.danger ? "danger-action" : ""}" data-manual-action="${action.key}">${action.label}</button>`).join("")}
      </div>
    </div>
  `;
}

function getManualActions(active = getActive()) {
  const map = {
    operation: [{ key: "review", label: "完工复核" }, { key: "reject", label: "驳回异常完工", danger: true }, { key: "compensate", label: "触发补偿" }],
    confirmation: [{ key: "reviewGate", label: "复核校验门" }, { key: "release", label: "放行审批" }, { key: "reject", label: "驳回补资料", danger: true }],
    packaging: [{ key: "newPack", label: "新建包装任务" }, { key: "reviewBind", label: "复核箱托绑定" }, { key: "withdraw", label: "撤回层级", danger: true }],
    receipt: [{ key: "instruction", label: "生成入库指令" }, { key: "retryWms", label: "重推 WMS" }, { key: "closeReceipt", label: "关闭入库单", danger: true }],
    freeze: [{ key: "newFreeze", label: "新建冻结" }, { key: "approveUnfreeze", label: "审批解冻", danger: true }, { key: "closeFreeze", label: "关闭冻结", danger: true }],
    return: [{ key: "newReturn", label: "新建退料入库" }, { key: "reviewDiff", label: "复核差异" }, { key: "closeReturn", label: "关闭退料", danger: true }],
    sync: [{ key: "retry", label: "重试" }, { key: "compensate", label: "补偿申请", danger: true }, { key: "closeDiff", label: "关闭差异", danger: true }, { key: "export", label: "导出对账" }],
  };
  return [...(map[pageConfig.id] || []), { key: "history", label: "查看履历" }];
}

function runManualAction(key) {
  const active = getActive();
  if (!active) return;
  const action = getManualActions(active).find((item) => item.key === key) || { label: key };
  if (action.danger && !confirmDanger(action.label, active.id)) return;
  const before = `${active.status} / ${active.next}`;
  const statusMap = {
    review: "复核中", reject: "已驳回", compensate: "补偿申请中", reviewGate: "校验复核中", release: "放行审批中",
    newPack: "包装草稿", reviewBind: "绑定复核中", withdraw: "撤回待复核", instruction: "指令已生成", retryWms: "WMS重推中",
    closeReceipt: "关闭待复核", newFreeze: "冻结审批中", approveUnfreeze: "解冻审批中", closeFreeze: "冻结关闭待复核",
    newReturn: "退料草稿", reviewDiff: "差异复核中", closeReturn: "退料关闭待复核", retry: "重试中", closeDiff: "差异关闭待复核",
    export: "已导出", history: active.status,
  };
  active.status = statusMap[key] || active.status;
  active.next = `${action.label}已登记：保留责任人、时间戳、关联单据、前后值和外部回执占位`;
  const beforeAfter = `前：${before}；后：${active.status} / ${active.next}`;
  window.MES_BUSINESS_FLOW?.applyCompletionAction?.(active, pageConfig.id, action.label, {
    status: active.status,
    result: active.next,
    owner: active.owner,
    governanceType: "完工入库强审计",
    approvalStatus: active.status,
    beforeAfter,
  });
  appendLog(`${active.id} ${action.label}已登记`, beforeAfter);
  saveState();
  renderPageChrome();
  renderAll();
  showToast(`${action.label}已留痕`);
}

function confirmDanger(label, id) {
  return window.confirm(`${label}属于冻结、解冻、撤回、关闭或补偿类危险动作，将写入审计记录。确认处理 ${id}？`);
}

function renderAll() {
  renderMetrics();
  renderBusinessFocus();
  renderTable();
  renderCards();
  renderDetail();
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  const nextMap = {
    operation: "已触发下道工序或完工确认",
    confirmation: "已允许包装或生成入库准备",
    packaging: "包装层级已进入成品入库",
    receipt: "WMS 入库状态已回写单据同步",
    freeze: "冻结状态已同步 WMS 并保留审批记录",
    return: "退料入库已回写 WMS 库存和用料差异",
    sync: "同步回执已更新并进入日终对账",
  };
  active.next = nextMap[pageConfig.id] || active.next;
  window.MES_BUSINESS_FLOW?.applyCompletionAction?.(active, pageConfig.id, message || getDefinition().primary, {
    status,
    result: active.next,
    owner: active.owner,
  });
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderAll();
}

function appendLog(text, beforeAfter = "") {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text, beforeAfter });
  logs = logs.slice(0, 20);
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  const statusMap = {
    operation: "已结转",
    confirmation: "校验通过",
    packaging: "已成托",
    receipt: "已入库",
    freeze: "已冻结",
    return: "已核销",
    sync: "已同步",
  };
  updateActiveStatus(statusMap[pageConfig.id], `${getActive().id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟回执已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone(initialRows[pageConfig.id]);
  hydrateRowsFromBusinessFlow();
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
  $("#resetWarehouseBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", simulateStatus);
  $("#secondaryActionBtn").addEventListener("click", () => {
    applyGovernanceAction();
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
  hydrateRowsFromBusinessFlow();
  renderPageChrome();
  $("#searchInput").value = state.search;
  $("#statusFilter").value = state.status;
  $("#lineFilter").value = state.line;
  bindEvents();
  renderAll();
}

init();
