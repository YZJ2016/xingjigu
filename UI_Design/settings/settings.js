const pageConfig = window.SETTINGS_PAGE || { id: "accounts", title: "人员账号", eyebrow: "系统设置 / 人员账号" };
const STORAGE_KEY = `xingjigu_mes_settings_${pageConfig.id}_v1`;

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
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "SOP 查看": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 员工登录: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  barcode: { 生产批次: "../barcode/production-batches.html", 产品序列号: "../barcode/product-serials.html", 物料标签: "../barcode/material-labels.html", 成品标签: "../barcode/finished-labels.html", 箱码托盘码: "../barcode/box-pallet-codes.html", 标签打印: "../barcode/label-printing.html", 补打申请: "../barcode/reprint-requests.html" },
  quality: { 来料检验: "../quality/incoming-inspection.html", 首件检验: "../quality/first-article.html", 巡检任务: "../quality/patrol-tasks.html", 过程检验: "../quality/process-inspection.html", 成品检验: "../quality/final-inspection.html", 不良记录: "../quality/defect-records.html", 返工评审: "../quality/rework-review.html" },
  equipment: { 设备状态: "../equipment/equipment-status.html", 点检计划: "../equipment/inspection-plan.html", 保养计划: "../equipment/maintenance-plan.html", 维修工单: "../equipment/repair-orders.html", 停机记录: "../equipment/downtime-records.html", 备件领用: "../equipment/spare-parts.html", 设备效率: "../equipment/equipment-efficiency.html" },
  process: { 实时产量: "../monitoring/realtime-output.html", 设备运行: "../monitoring/device-runtime.html", 工艺参数: "../monitoring/process-parameters.html", 报警记录: "../monitoring/alarm-records.html", 停机原因: "../monitoring/downtime-reasons.html", 过程趋势: "../monitoring/process-trends.html", 电子看板: "../monitoring/electronic-board.html" },
  exceptions: { 异常上报: "../exceptions/exception-report.html", 待处理异常: "../exceptions/pending-exceptions.html", 停线申请: "../exceptions/line-stop.html", 缺料处理: "../exceptions/material-shortage.html", 质量问题: "../exceptions/quality-issues.html", 设备故障: "../exceptions/equipment-faults.html", 处理复盘: "../exceptions/review.html" },
  warehouse: { 工序完工: "../warehouse/operation-completion.html", 完工确认: "../warehouse/completion-confirmation.html", 包装作业: "../warehouse/packaging.html", 成品入库: "../warehouse/finished-goods-receipt.html", 库存冻结: "../warehouse/inventory-freeze.html", 退料入库: "../warehouse/return-receipt.html", 单据同步: "../warehouse/document-sync.html" },
  trace: { 产品追溯: "../traceability/product-trace.html", 批次追溯: "../traceability/batch-trace.html", 物料去向: "../traceability/material-flow.html", 生产履历: "../traceability/production-history.html", 检验履历: "../traceability/inspection-history.html", 设备履历: "../traceability/equipment-history.html", 客户追溯报告: "../traceability/customer-report.html" },
  reports: { 生产日报: "../reports/production-daily.html", 良率分析: "../reports/yield-analysis.html", 交付达成: "../reports/delivery-attainment.html", 设备效率: "../reports/equipment-efficiency.html", 停机损失: "../reports/downtime-loss.html", 物料损耗: "../reports/material-loss.html", 管理驾驶舱: "../reports/management-cockpit.html" },
  basic: { 产品资料: "../basic/product-master.html", 物料资料: "../basic/material-master.html", "BOM 清单": "../basic/bom-list.html", 工艺路线: "../basic/routing.html", 工序工位: "../basic/operation-stations.html", 产线车间: "../basic/workshops.html", 客户供应商: "../basic/partners.html" },
  system: { 人员账号: "personnel-accounts.html", 角色权限: "role-permissions.html", 审批设置: "approval-settings.html", 单据同步: "document-sync.html", 消息提醒: "message-alerts.html", 操作记录: "operation-logs.html", 数据备份: "data-backup.html" },
};

const pageDefinitions = {
  accounts: {
    subtitle: "系统管理员维护员工身份、终端绑定、班组数据范围和账号状态，现场登录仍由工位终端、扫码枪或工牌/NFC 回传",
    user: "系统管理员",
    metricLabels: ["账号总数", "可登录", "需复核", "锁定拦截"],
    columns: ["账号 / 员工", "岗位 / 班组", "身份来源", "终端与范围", "状态", "最近校验", "责任人", "时间戳"],
    tableTitle: "人员账号与现场身份准入",
    tableHint: "账号配置用于控制 MES 后台、工位终端、PDA 和电子签名身份边界，不替代现场刷卡登录动作",
    cardTitle: "账号配置影响链路",
    simulationTitle: "模拟 HR / 工牌 NFC 身份同步",
    simulationHint: "模拟外部 HR、门禁或工牌/NFC 回传身份状态，后台只登记准入校验和审计记录",
  },
  roles: {
    subtitle: "权限管理员按角色、菜单按钮、数据范围和接口权限维护 RBAC，保证计划、质量、设备、仓储和 IT 各自可操作边界",
    user: "权限管理员",
    metricLabels: ["角色模型", "授权生效", "待会签", "越权拦截"],
    columns: ["角色 / 场景", "授权对象", "数据范围", "关键按钮", "状态", "校验结果", "责任人", "时间戳"],
    tableTitle: "角色权限与数据范围",
    tableHint: "角色权限会联动审批、电子签名、操作审计和菜单按钮可见性，关键动作必须可追责",
    cardTitle: "权限控制覆盖点",
    simulationTitle: "模拟权限校验请求",
    simulationHint: "模拟业务模块发起权限校验，不表示后台绕过审批或直接放行生产动作",
  },
  approvals: {
    subtitle: "流程管理员配置主数据发布、质量放行、库存冻结、接口补偿和返工报废等审批流，保留节点责任与电子签名记录",
    user: "流程管理员",
    metricLabels: ["流程模板", "运行中", "待发布", "超时节点"],
    columns: ["审批流 / 业务", "触发条件", "审批节点", "签名要求", "状态", "关联单据", "责任人", "时间戳"],
    tableTitle: "审批设置与电子签名规则",
    tableHint: "审批设置定义关键业务的放行路径，现场或业务模块只接收审批结果与签名验证结果",
    cardTitle: "审批驱动业务闭环",
    simulationTitle: "模拟审批引擎回执",
    simulationHint: "模拟审批服务或电子签名校验结果，不表示后台直接替代审批人签核",
  },
  sync: {
    subtitle: "接口管理员维护 ERP、PLM、WMS、QMS、BI 单据同步策略，跟踪幂等键、重试、死信、补偿和日终对账",
    user: "接口管理员",
    metricLabels: ["接口目录", "今日成功", "待补偿", "对账差异"],
    columns: ["接口 / 单据", "来源到目标", "触发业务", "幂等与重试", "状态", "最近消息", "责任人", "时间戳"],
    tableTitle: "单据同步与接口可靠性",
    tableHint: "单据同步负责跨系统状态一致，异常时进入补偿和对账，不直接修改外部系统账务事实",
    cardTitle: "单据同步闭环",
    simulationTitle: "模拟 ERP / WMS 单据回执",
    simulationHint: "模拟外部系统消息回传、失败重试或死信修复，不表示后台直接入账或出入库",
  },
  messages: {
    subtitle: "系统管理员按异常等级、班次、角色、产线和业务状态配置站内信、短信、企业微信和电子看板提醒",
    user: "消息管理员",
    metricLabels: ["提醒规则", "已启用", "待复核", "超时升级"],
    columns: ["提醒规则", "触发来源", "接收角色", "渠道与 SLA", "状态", "最近触发", "责任人", "时间戳"],
    tableTitle: "消息提醒与异常升级",
    tableHint: "消息规则用于通知计划、质量、设备、仓储和班组协同，不替代现场异常处置和审批动作",
    cardTitle: "消息触达闭环",
    simulationTitle: "模拟消息通道回执",
    simulationHint: "模拟企业微信、短信或电子看板投递回执，不表示后台直接完成异常处理",
  },
  logs: {
    subtitle: "审计员按用户、业务对象、字段变更和客户端来源查询操作记录，支撑客户稽核、体系审核和责任追溯",
    user: "审计员",
    metricLabels: ["今日记录", "关键操作", "失败拦截", "待归档"],
    columns: ["操作记录", "业务对象", "操作来源", "前后值摘要", "结果", "追溯引用", "责任人", "时间戳"],
    tableTitle: "操作记录与审计证据",
    tableHint: "操作记录覆盖登录、查询、导出、新增、修改、审批和接口补偿，关键字段变更保留前后值",
    cardTitle: "审计证据链",
    simulationTitle: "模拟审计检索请求",
    simulationHint: "模拟审计查询或归档任务，不表示后台删除或改写原始操作记录",
  },
  backup: {
    subtitle: "运维管理员配置在线库、历史库、时序数据、接口消息和审计日志的备份、归档、恢复演练与告警阈值",
    user: "运维管理员",
    metricLabels: ["备份策略", "最近成功", "待演练", "告警项"],
    columns: ["备份对象", "数据来源", "策略 / RPO", "保留与归档", "状态", "最近结果", "责任人", "时间戳"],
    tableTitle: "数据备份、归档与恢复演练",
    tableHint: "备份设置保障 MES 多年运行后的数据可用性，恢复演练需形成记录和责任闭环",
    cardTitle: "数据治理闭环",
    simulationTitle: "模拟备份调度回执",
    simulationHint: "模拟备份作业、归档任务或恢复演练回执，不表示后台直接访问生产数据库",
  },
};

const initialRows = {
  accounts: [
    { id: "USR-PLN-001", name: "计划主管 李敏", area: "计划部 / 全车间", source: "HR 员工主档 + MES 账号", scope: "后台工作台 / 订单与计划 / Line-A-B", status: "可登录", statusStyle: "green", check: "电子签名有效，最后登录 08:42", owner: "系统管理员 许航", time: "2026-06-20 08:45", trace: "sys_user / employee_id E1024", next: "每月权限复核", risk: "可执行排程确认与计划调整会签" },
    { id: "USR-QA-018", name: "质量工程师 孟可", area: "质量部 / FQC", source: "HR 在职 + QMS 资质", scope: "质量检验 / 库存冻结 / 返工评审", status: "需复核", statusStyle: "orange", check: "FQC 放行资质 06-25 到期", owner: "权限管理员 赵岚", time: "2026-06-20 09:12", trace: "qualification QA-FQC-018", next: "复核后继续允许质量放行", risk: "资质过期将拦截成品检验签核" },
    { id: "USR-WIP-044", name: "班组长 郑峰", area: "Line-A / 白班", source: "工牌 NFC + 班组排班", scope: "工位终端 / 班组任务 / 交接班", status: "可登录", statusStyle: "green", check: "模拟工牌 NFC 最近回传 09:30", owner: "车间主任 陈伟", time: "2026-06-20 09:31", trace: "badge NFC-A044", next: "班次结束自动退出", risk: "只能确认本班组任务和交接事项" },
    { id: "USR-MAT-027", name: "仓储员 田悦", area: "仓储部 / 成品库", source: "HR 员工主档 + PDA 设备绑定", scope: "完工入库 / 退料入库 / 包装签收", status: "锁定", statusStyle: "red", check: "PDA 登录失败 5 次，已锁定", owner: "系统管理员 许航", time: "2026-06-20 10:06", trace: "audit_log AUD-240620-77", next: "主管确认后解锁并重置设备令牌", risk: "锁定期间不可做 WMS 模拟回执确认" },
  ],
  roles: [
    { id: "ROLE-PLAN-MGR", name: "计划主管角色", area: "订单与计划 / 报表", source: "RBAC 模型", scope: "工厂级订单数据，Line-A/B/C 排程视图", status: "已生效", statusStyle: "green", check: "排程确认、计划调整、交期预警可操作", owner: "权限管理员 赵岚", time: "2026-06-20 08:50", trace: "sys_role_permission PLAN-MGR", next: "月度权限复核", risk: "不可修改质量放行和库存冻结" },
    { id: "ROLE-QA-RELEASE", name: "质量放行角色", area: "质量检验 / 完工确认", source: "审批 + 电子签名", scope: "FQC、NCR、MRB 和成品放行数据", status: "待会签", statusStyle: "orange", check: "新增库存解冻按钮需质量经理会签", owner: "质量负责人 周雅", time: "2026-06-20 09:18", trace: "approval FLOW-RBAC-0619", next: "会签通过后发布", risk: "未发布前继续使用旧权限点" },
    { id: "ROLE-EQ-MAINT", name: "设备维修角色", area: "设备与保养 / 异常处理", source: "RBAC + 数据权限", scope: "Line-A/B 设备、维修工单、停机归因", status: "已生效", statusStyle: "green", check: "可接收设备故障派单，不可关闭生产订单", owner: "设备主管 袁立", time: "2026-06-20 09:40", trace: "scope_rule workshop in A,B", next: "新增测试台 B3 后补授权", risk: "维修验收需班组长共同确认" },
    { id: "ROLE-IF-COMP", name: "接口补偿角色", area: "单据同步 / 操作记录", source: "IT 授权 + 审批流", scope: "ERP/WMS 死信消息补偿，不含业务数据修改", status: "越权拦截", statusStyle: "red", check: "人员账号缺少二次认证设备", owner: "IT 运维 何澈", time: "2026-06-20 10:22", trace: "permission_check DENY-240620", next: "绑定 MFA 后重新申请", risk: "补偿操作必须写入审计与审批记录" },
  ],
  approvals: [
    { id: "FLOW-MDM-PUBLISH", name: "主数据发布审批", area: "产品 / BOM / 工艺路线", source: "基础资料变更", scope: "提交人 > 工艺 > 质量 > 计划发布", status: "运行中", statusStyle: "green", check: "电子签名必填，影响订单自动带出", owner: "流程管理员 许航", time: "2026-06-20 08:32", trace: "approval_task MDM-240620", next: "通过后生成执行快照", risk: "未审批资料不可进入开工检查" },
    { id: "FLOW-QA-RELEASE", name: "质量放行审批", area: "首件 / FQC / 让步接收", source: "检验任务结果", scope: "质量员 > 质量工程师 > 质量经理", status: "已发布", statusStyle: "green", check: "不合格让步必须二次签名", owner: "质量负责人 周雅", time: "2026-06-20 09:05", trace: "electronic_signature QA-REL", next: "放行结果回写完工确认", risk: "签名失败时拦截入库" },
    { id: "FLOW-STOCK-FREEZE", name: "库存冻结解冻审批", area: "WMS 库存 / 质量异常", source: "库存冻结单", scope: "仓储 > 质量 > 计划知会", status: "待发布", statusStyle: "orange", check: "新增客户投诉触发条件", owner: "仓储主管 王宁", time: "2026-06-20 09:48", trace: "FLOW-STOCK-V2", next: "试运行 3 天后发布", risk: "解冻审批未发布时只能人工会签" },
    { id: "FLOW-IF-COMP", name: "接口补偿审批", area: "ERP / WMS / PLM 死信", source: "integration_message", scope: "接口管理员 > 业务责任人 > IT 复核", status: "超时节点", statusStyle: "red", check: "ERP 完工回传补偿超过 SLA", owner: "接口管理员 陶然", time: "2026-06-20 10:18", trace: "dead_letter DLM-893", next: "升级给 IT 运维经理", risk: "补偿未闭环会导致 ERP 工单未关闭" },
  ],
  sync: [
    { id: "IF-ERP-MO-IN", name: "ERP 生产订单入站", area: "ERP -> MES", source: "ERP 工单下达", scope: "production_order / idempotent_key", status: "正常", statusStyle: "green", check: "今日 42 笔成功，重复推送 2 笔已去重", owner: "接口管理员 陶然", time: "2026-06-20 10:00", trace: "integration_message IF-ERP-MO", next: "日终对账", risk: "工单入站后触发主数据校验" },
    { id: "IF-PLM-BOM", name: "PLM BOM 工艺同步", area: "PLM -> MES", source: "PLM 发布消息", scope: "BOM / routing / SOP 快照", status: "重试中", statusStyle: "orange", check: "RT-HMI-70-V1.0 附件校验超时", owner: "工艺工程师 林澈", time: "2026-06-20 10:15", trace: "retry_count 2 / next 10:25", next: "重试失败转死信", risk: "未成功前 HMI-70 开工检查拦截" },
    { id: "IF-WMS-RCV", name: "WMS 成品入库回执", area: "MES -> WMS -> MES", source: "成品入库单", scope: "finished_goods_lot / wms_receipt_no", status: "有差异", statusStyle: "red", check: "MES 12 箱，WMS 回执 11 箱", owner: "仓储主管 王宁", time: "2026-06-20 10:28", trace: "interface_reconcile REC-0620-03", next: "仓库复核箱码托盘码", risk: "差异关闭前不可回传 ERP 入库" },
    { id: "IF-ERP-CLOSE", name: "ERP 完工回传", area: "MES -> ERP", source: "工序完工 + 入库确认", scope: "good_qty / actual_time / material_issue", status: "死信待补偿", statusStyle: "red", check: "ERP 成本中心缺失，已进入补偿池", owner: "接口管理员 陶然", time: "2026-06-20 10:44", trace: "dead_letter DLM-893", next: "补成本中心后重新投递", risk: "影响工单关闭及时率" },
  ],
  messages: [
    { id: "MSG-SHORTAGE", name: "缺料预警升级", area: "物料与线边库", source: "缺料预警 + 齐套检查", scope: "物料员、计划员、采购跟单", status: "已启用", statusStyle: "green", check: "SLA 30 分钟未处理推送主管", owner: "消息管理员 叶青", time: "2026-06-20 08:58", trace: "notification_rule MAT-SHORT", next: "关联计划调整入口", risk: "提醒不关闭业务异常，只推动责任人处理" },
    { id: "MSG-EQ-DOWN", name: "设备故障停线提醒", area: "设备与保养 / 异常处理", source: "PLC/SCADA 报警", scope: "维修员、设备主管、车间主任", status: "已启用", statusStyle: "green", check: "红色报警立即推电子看板与企业微信", owner: "设备主管 袁立", time: "2026-06-20 09:10", trace: "alarm ALM-204", next: "维修工单响应后降级", risk: "停线审批仍需审批流确认" },
    { id: "MSG-QA-HOLD", name: "质量拦截通知", area: "质量检验 / 工位作业", source: "FAI/IPQC/FQC 不合格", scope: "质量员、班组长、计划员", status: "待复核", statusStyle: "orange", check: "新增客户 A 标签异常模板", owner: "质量负责人 周雅", time: "2026-06-20 09:52", trace: "message_template QA-HOLD-V2", next: "模板复核后启用", risk: "防止继续投料、报工或入库" },
    { id: "MSG-IF-DEAD", name: "接口死信告警", area: "单据同步", source: "dead_letter_message", scope: "接口管理员、业务责任人、IT 运维", status: "超时升级", statusStyle: "red", check: "ERP 完工回传死信超过 60 分钟", owner: "IT 运维 何澈", time: "2026-06-20 10:46", trace: "DLM-893", next: "升级给 IT 运维经理", risk: "补偿前跨系统状态不一致" },
  ],
  logs: [
    { id: "AUD-240620-001", name: "质量放行电子签名", area: "成品检验 FQC-0620-18", source: "后台工作台 / 质量工程师", scope: "结论：待放行 -> 已放行", status: "成功", statusStyle: "green", check: "签名设备与账号匹配", owner: "质量工程师 孟可", time: "2026-06-20 09:24", trace: "electronic_signature SIG-8891", next: "归入检验履历", risk: "客户稽核可追溯签名记录" },
    { id: "AUD-240620-077", name: "PDA 登录失败锁定", area: "仓储员账号 USR-MAT-027", source: "PDA / 成品库 Wi-Fi", scope: "失败次数 4 -> 5", status: "失败拦截", statusStyle: "red", check: "账号已锁定并通知主管", owner: "仓储员 田悦", time: "2026-06-20 10:06", trace: "client_ip PDA-FG-03", next: "主管确认后解锁", risk: "锁定期间不可确认入库回执" },
    { id: "AUD-240620-088", name: "接口死信补偿申请", area: "ERP 完工回传 DLM-893", source: "接口管理员后台", scope: "补偿状态：待处理 -> 审批中", status: "成功", statusStyle: "green", check: "已触发 FLOW-IF-COMP 审批", owner: "接口管理员 陶然", time: "2026-06-20 10:50", trace: "approval_task COMP-893", next: "审批通过后重新投递", risk: "补偿全程留痕，不直接改 ERP" },
    { id: "AUD-240620-096", name: "权限越权访问拦截", area: "库存冻结解冻按钮", source: "后台工作台 / 计划员", scope: "按钮权限 denied", status: "已拦截", statusStyle: "orange", check: "角色无质量/仓储解冻权限", owner: "计划员 程诺", time: "2026-06-20 11:02", trace: "permission_check RBAC-096", next: "如需操作提交授权申请", risk: "防止跨职责解除质量冻结" },
  ],
  backup: [
    { id: "BK-ONLINE-DB", name: "MES 在线业务库", area: "订单、派工、质量、入库", source: "在线库 + 日志备份", scope: "全量每日 02:00 / 日志 15 分钟", status: "最近成功", statusStyle: "green", check: "RPO 15 分钟，最近完成 02:18", owner: "运维管理员 何澈", time: "2026-06-20 02:18", trace: "backup_job BK-ONLINE-0620", next: "周日恢复演练", risk: "覆盖核心业务交易数据" },
    { id: "BK-TSDB", name: "设备时序参数归档", area: "PLC/SCADA 过程参数", source: "时序库 + 对象存储", scope: "热数据 90 天，冷归档 5 年", status: "归档中", statusStyle: "orange", check: "Line-B 测试台参数积压 12 万点", owner: "设备数据员 周启", time: "2026-06-20 10:20", trace: "archive_task TS-0620", next: "积压清理后校验抽样查询", risk: "影响过程趋势和设备履历查询速度" },
    { id: "BK-AUDIT-LOG", name: "审计日志合规归档", area: "操作记录 / 电子签名", source: "audit_log + field_change_log", scope: "保留 10 年，不可篡改存储", status: "已生效", statusStyle: "green", check: "今日增量 8,426 条", owner: "审计员 赵岚", time: "2026-06-20 10:40", trace: "archive_policy AUDIT-10Y", next: "月末导出稽核抽样", risk: "支撑客户稽核和体系审核" },
    { id: "BK-RESTORE-DRILL", name: "ERP 回传链路恢复演练", area: "单据同步 / 接口消息", source: "integration_message + dead_letter", scope: "演练 RTO 2 小时", status: "待演练", statusStyle: "red", check: "上次演练 2026-05-12，超过周期", owner: "IT 运维 何澈", time: "2026-06-20 11:05", trace: "drill_plan DR-ERP-0624", next: "06-24 夜班窗口执行", risk: "演练缺失会影响上线稳定性评估" },
  ],
};

const maintenanceDefinitions = {
  accounts: { createLabel: "新增人员", noun: "人员账号" },
  roles: {
    createLabel: "新增角色",
    noun: "角色权限",
    idPrefix: "ROLE-NEW",
    statusOptions: ["已生效", "待会签", "越权拦截", "停用"],
    sourceOptions: ["RBAC 模型", "审批 + 电子签名", "RBAC + 数据权限", "IT 授权 + 审批流"],
    defaults: {
      status: "待会签",
      source: "RBAC 模型",
      owner: "权限管理员 赵岚",
      trace: "sys_role_permission / draft",
      check: "新增角色待权限管理员复核，关键按钮暂不生效",
      risk: "未发布前不影响现有用户权限，禁止绕过审批和电子签名",
      next: "完成数据范围、按钮权限和授权用户复核后发布",
    },
    fields: ["角色编码", "角色名称 / 场景", "授权对象", "权限来源", "数据范围", "状态", "权限校验", "责任人", "审计引用", "授权边界", "下一步闭环"],
    primary: { label: "会签发布", status: "已生效", check: "权限会签通过，菜单、按钮、数据范围和电子签名边界已发布", next: "进入月度权限复核，越权访问继续写入审计记录" },
    disable: { offLabel: "停用角色", onLabel: "启用角色", offStatus: "停用", onStatus: "待会签", offCheck: "角色已停用，新授权不再生效，历史操作记录保留", onCheck: "角色已重新启用申请，需完成会签后发布" },
  },
  approvals: {
    createLabel: "新增流程",
    noun: "审批流程",
    idPrefix: "FLOW-NEW",
    statusOptions: ["运行中", "已发布", "待发布", "超时节点", "停用"],
    sourceOptions: ["基础资料变更", "检验任务结果", "库存冻结单", "integration_message", "后台流程配置"],
    defaults: {
      status: "待发布",
      source: "后台流程配置",
      owner: "流程管理员 许航",
      trace: "approval_template / draft",
      check: "新增审批流待节点责任人和电子签名规则复核",
      risk: "未发布前不影响现行业务放行路径，不替代审批人签核",
      next: "完成节点、会签、超时升级和签名要求后发布",
    },
    fields: ["流程编码", "审批流 / 业务", "触发条件", "触发来源", "审批节点", "状态", "签名要求", "责任人", "关联单据", "放行风险", "下一步闭环"],
    primary: { label: "发布流程", status: "已发布", check: "审批节点、会签规则、电子签名和超时升级已校验通过", next: "发布后由业务单据触发，不替代审批人签核" },
    disable: { offLabel: "停用流程", onLabel: "启用流程", offStatus: "停用", onStatus: "待发布", offCheck: "审批流版本已停用，运行中单据保留原流程履历", onCheck: "审批流已重新启用申请，需试运行校验后发布" },
  },
  messages: {
    createLabel: "新增规则",
    noun: "消息提醒",
    idPrefix: "MSG-NEW",
    statusOptions: ["已启用", "待复核", "超时升级", "停用"],
    sourceOptions: ["缺料预警 + 齐套检查", "PLC/SCADA 报警", "FAI/IPQC/FQC 不合格", "dead_letter_message", "后台消息规则"],
    defaults: {
      status: "待复核",
      source: "后台消息规则",
      owner: "消息管理员 叶青",
      trace: "notification_rule / draft",
      check: "新增提醒规则待渠道、接收角色和 SLA 复核",
      risk: "提醒只推动责任人处理，不代表业务异常已关闭",
      next: "完成模板、渠道、接收角色和升级策略后启用",
    },
    fields: ["规则编码", "提醒规则", "触发来源", "规则来源", "接收角色 / 渠道", "状态", "最近触发", "责任人", "投递引用", "触达边界", "下一步闭环"],
    primary: { label: "启用规则", status: "已启用", check: "提醒模板、接收角色、渠道和 SLA 升级已复核通过", next: "继续跟踪投递回执，提醒不替代异常处理" },
    disable: { offLabel: "停用规则", onLabel: "启用规则", offStatus: "停用", onStatus: "待复核", offCheck: "提醒规则已停用，历史投递回执保留", onCheck: "提醒规则已重新启用申请，需测试投递后生效" },
  },
  sync: {
    createLabel: "新增接口配置",
    noun: "单据同步",
    idPrefix: "IF-NEW",
    statusOptions: ["正常", "重试中", "有差异", "死信待补偿", "停用"],
    sourceOptions: ["ERP 工单下达", "PLM 发布消息", "成品入库单", "工序完工 + 入库确认", "后台接口配置"],
    defaults: {
      status: "重试中",
      source: "后台接口配置",
      owner: "接口管理员 陶然",
      trace: "integration_message / draft",
      check: "新增接口配置待映射、幂等键、重试策略和对账口径复核",
      risk: "未启用前不向 ERP/WMS/PLM/QMS 写入任何外部账务或主数据",
      next: "完成模拟联调、审批和对账校验后启用",
    },
    fields: ["接口编码", "接口 / 单据", "来源到目标", "触发来源", "触发业务 / 映射", "状态", "最近消息", "责任人", "消息引用", "补偿边界", "下一步闭环"],
    primary: { label: "申请补偿", status: "死信待补偿", check: "已生成接口补偿申请，等待审批流和业务责任人复核", next: "审批通过后仅重推消息，不直接修改 ERP/WMS 账务" },
    disable: { offLabel: "停用接口", onLabel: "启用接口", offStatus: "停用", onStatus: "重试中", offCheck: "接口已停用，未完成消息保留在补偿池并进入对账", onCheck: "接口已重新启用申请，需模拟对账通过后恢复投递" },
  },
  backup: {
    createLabel: "新增备份策略",
    noun: "备份策略",
    idPrefix: "BK-NEW",
    statusOptions: ["最近成功", "归档中", "已生效", "待演练", "停用"],
    sourceOptions: ["在线库 + 日志备份", "时序库 + 对象存储", "audit_log + field_change_log", "integration_message + dead_letter", "后台备份策略"],
    defaults: {
      status: "待演练",
      source: "后台备份策略",
      owner: "运维管理员 何澈",
      trace: "backup_policy / draft",
      check: "新增备份策略待 RPO/RTO、保留周期、恢复演练和告警阈值复核",
      risk: "演示页面只记录策略与演练结论，不直接访问生产数据库",
      next: "完成恢复演练计划审批后发布策略",
    },
    fields: ["策略编码", "备份对象", "数据来源", "策略来源", "策略 / RPO", "状态", "最近结果", "责任人", "作业引用", "恢复风险", "下一步闭环"],
    primary: { label: "发起演练", status: "待演练", check: "恢复演练申请已生成，需运维窗口和业务责任人共同确认", next: "演练完成后记录 RTO、抽样校验和回退结论" },
    disable: { offLabel: "停用策略", onLabel: "启用策略", offStatus: "停用", onStatus: "待演练", offCheck: "备份策略已停用，历史备份和归档任务保留", onCheck: "备份策略已重新启用申请，需恢复演练后生效" },
  },
};

const governanceDefinitions = {
  accounts: {
    title: "身份准入治理",
    guard: "账号锁定、离职停用、终端令牌重置和电子签名范围变更都会约束开工、检验、入库、补偿等关键动作",
    actions: ["权限复核", "锁定准入", "移交待办"],
    matrix: [
      { id: "GOV-ACC-LOGIN", control: "后台与工位终端登录准入", module: "工位作业 / 派工与生产任务", rule: "HR 在职 + 班组排班 + 工牌/NFC 绑定", approver: "系统管理员 许航", status: "已启用", evidence: "login_policy ACC-LOGIN-V3", next: "模拟准入测试" },
      { id: "GOV-ACC-SIGN", control: "电子签名资格复核", module: "质量放行 / 库存冻结 / 接口补偿", rule: "岗位资质 + 二次认证 + 有效期", approver: "质量负责人 周雅", status: "待复核", evidence: "signature_scope QA-FQC-018", next: "提交审批复核" },
      { id: "GOV-ACC-HANDOVER", control: "离职停用待办移交", module: "审批 / 消息 / 操作记录", rule: "停用前移交未闭环审批、异常和待办", approver: "权限管理员 赵岚", status: "已启用", evidence: "handover_policy HR-OFFBOARD", next: "月度抽样" },
    ],
  },
  roles: {
    title: "权限边界治理",
    guard: "角色发布后才影响菜单、按钮、数据范围和接口权限；越权访问写入操作记录并反向提示审批配置",
    actions: ["会签发布", "权限模拟校验", "越权拦截复核"],
    matrix: [
      { id: "GOV-RBAC-FREEZE", control: "库存冻结/解冻按钮权限", module: "完工与入库 / 质量检验", rule: "仓储发起，质量审批，计划知会", approver: "权限管理员 赵岚", status: "待会签", evidence: "button_scope STOCK-FREEZE", next: "提交会签发布" },
      { id: "GOV-RBAC-REPRINT", control: "追溯标签补打权限", module: "条码与标签 / 补打申请", rule: "条码管理员申请，质量复核，新旧标签关系必填", approver: "质量负责人 周雅", status: "已生效", evidence: "button_scope LABEL-REPRINT", next: "模拟越权校验" },
      { id: "GOV-RBAC-COMP", control: "接口补偿操作权限", module: "单据同步 / 操作记录", rule: "接口管理员 + IT 复核 + 审批任务", approver: "IT 运维 何澈", status: "越权拦截", evidence: "permission_check DENY-240620", next: "绑定 MFA 后复核" },
    ],
  },
  approvals: {
    title: "审批放行治理",
    guard: "主数据发布、质量放行、库存冻结、标签补打、接口补偿和数据恢复必须经过审批与电子签名",
    actions: ["发布流程", "超时升级", "签名校验"],
    matrix: [
      { id: "GOV-APR-MDM", control: "主数据发布审批模板", module: "基础资料 / 开工检查", rule: "工艺、质量、计划依次签核，发布执行快照", approver: "流程管理员 许航", status: "运行中", evidence: "approval_template MDM-PUBLISH", next: "版本影响评估" },
      { id: "GOV-APR-STOCK", control: "冻结/解冻审批模板", module: "库存冻结 / 追溯查询", rule: "仓储提交，质量复判，计划确认排程影响", approver: "仓储主管 王宁", status: "待发布", evidence: "approval_template STOCK-FREEZE-V2", next: "试运行发布" },
      { id: "GOV-APR-RESTORE", control: "恢复演练审批模板", module: "数据备份 / 单据同步", rule: "运维窗口 + 业务抽样 + 回退结论", approver: "IT 运维 何澈", status: "待复核", evidence: "approval_template RESTORE-DRILL", next: "签名校验" },
    ],
  },
  sync: {
    title: "接口一致性治理",
    guard: "ERP/WMS/PLM/QMS/BI 同步只管理消息、重试、死信、补偿和对账，不直接修改外部系统账务事实",
    actions: ["申请补偿", "模拟重推", "关闭对账差异"],
    matrix: [
      { id: "GOV-IF-WMS", control: "WMS 入库回执对账", module: "成品入库 / 单据同步", rule: "箱托层级一致后才允许 ERP 入库回传", approver: "仓储主管 王宁", status: "有差异", evidence: "interface_reconcile REC-0620-03", next: "关闭对账差异" },
      { id: "GOV-IF-ERP", control: "ERP 完工回传补偿", module: "工序完工 / ERP 工单关闭", rule: "死信补偿需审批，重推消息不改 ERP 账务", approver: "接口管理员 陶然", status: "死信待补偿", evidence: "dead_letter DLM-893", next: "申请补偿" },
      { id: "GOV-IF-PLM", control: "PLM 工艺附件同步", module: "基础资料 / SOP 查看", rule: "附件哈希校验通过后下发工位终端", approver: "工艺工程师 林澈", status: "重试中", evidence: "retry_count 2 / next 10:25", next: "模拟重推" },
    ],
  },
  messages: {
    title: "消息升级治理",
    guard: "提醒规则只推动责任人处理，不能把消息送达视为异常、审批、维修或入库已经闭环",
    actions: ["启用规则", "测试发送", "升级责任人"],
    matrix: [
      { id: "GOV-MSG-SHORT", control: "缺料预警升级矩阵", module: "齐套检查 / 缺料处理", rule: "30 分钟未接单升级物料主管和计划员", approver: "消息管理员 叶青", status: "已启用", evidence: "notification_rule MAT-SHORT", next: "模拟测试发送" },
      { id: "GOV-MSG-EQ", control: "设备红色报警通知", module: "设备故障 / 电子看板", rule: "PLC/SCADA 红色报警推维修员、车间主任、电子看板", approver: "设备主管 袁立", status: "已启用", evidence: "alarm_rule EQ-DOWN", next: "升级责任人" },
      { id: "GOV-MSG-QA", control: "质量拦截提醒模板", module: "首件 / FQC / 库存冻结", rule: "质量不合格触发班组、计划、仓储协同提醒", approver: "质量负责人 周雅", status: "待复核", evidence: "message_template QA-HOLD-V2", next: "启用规则" },
    ],
  },
  logs: {
    title: "审计证据治理",
    guard: "操作记录只能查询、筛选、导出申请、归档和标记稽核样本，不允许编辑或删除原始审计记录",
    actions: ["标记稽核样本", "申请导出", "归档任务"],
    matrix: [
      { id: "GOV-AUD-SIGN", control: "电子签名审计样本", module: "质量放行 / 返工评审", rule: "签名前后值、签名设备、账号和时间戳不可篡改", approver: "审计员 赵岚", status: "已生效", evidence: "audit_sample SIG-8891", next: "标记稽核样本" },
      { id: "GOV-AUD-EXPORT", control: "客户稽核导出申请", module: "追溯报告 / 操作记录", rule: "导出需审批，包含查询条件和报告版本快照", approver: "质量负责人 周雅", status: "待审批", evidence: "export_request AUD-EXPORT", next: "申请导出" },
      { id: "GOV-AUD-ARCHIVE", control: "审计日志合规归档", module: "操作记录 / 数据备份", rule: "保留 10 年，不允许页面编辑或删除原始记录", approver: "IT 运维 何澈", status: "归档中", evidence: "archive_policy AUDIT-10Y", next: "归档任务" },
    ],
  },
  backup: {
    title: "备份恢复治理",
    guard: "备份策略和恢复演练只登记 RPO/RTO、抽样校验和责任闭环，不在演示页直接访问生产数据库",
    actions: ["发起演练", "确认恢复结果", "告警配置"],
    matrix: [
      { id: "GOV-BK-ONLINE", control: "在线业务库备份策略", module: "订单 / 派工 / 质量 / 入库", rule: "全量每日 02:00，日志 15 分钟，RPO 15 分钟", approver: "运维管理员 何澈", status: "最近成功", evidence: "backup_job BK-ONLINE-0620", next: "周日恢复演练" },
      { id: "GOV-BK-TSDB", control: "设备时序数据归档", module: "过程监控 / 设备履历", rule: "热数据 90 天，冷归档 5 年，抽样可查询", approver: "设备数据员 周启", status: "归档中", evidence: "archive_task TS-0620", next: "告警配置" },
      { id: "GOV-BK-DRILL", control: "ERP 回传链路恢复演练", module: "单据同步 / 报表与看板", rule: "演练 RTO 2 小时，必须记录抽样和回退结论", approver: "IT 运维 何澈", status: "待演练", evidence: "drill_plan DR-ERP-0624", next: "发起演练" },
    ],
  },
};

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", source: "all", detailOpen: true, matrixId: "" };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function getDefinition() {
  return pageDefinitions[pageConfig.id];
}

function isAccountsPage() {
  return pageConfig.id === "accounts";
}

function isMaintenancePage() {
  return Boolean(maintenanceDefinitions[pageConfig.id]);
}

function getMaintenanceDefinition() {
  return maintenanceDefinitions[pageConfig.id] || null;
}

function getGovernanceDefinition() {
  return governanceDefinitions[pageConfig.id] || governanceDefinitions.accounts;
}

function getGovernanceMatrix() {
  return getGovernanceDefinition().matrix || [];
}

function getActiveMatrixItem() {
  const matrix = getGovernanceMatrix();
  return matrix.find((item) => item.id === state.matrixId) || matrix[0] || null;
}

function getGovernanceEvents() {
  return window.MES_BUSINESS_FLOW?.read?.().governanceEvents || [];
}

function getGovernanceStats() {
  const events = getGovernanceEvents();
  const pageEvents = events.filter((event) => event.pageId === pageConfig.id);
  const approvals = events.filter((event) => /审批|会签|签名|放行|补偿|冻结|解冻|补打|恢复/.test(`${event.action} ${event.status} ${event.result}`)).length;
  const risky = events.filter((event) => /锁定|停用|作废|撤回|死信|差异|失败|越权|演练/.test(`${event.action} ${event.status} ${event.result}`)).length;
  return { total: events.length, page: pageEvents.length, approvals, risky };
}

function writeGovernanceEvent(action, row = getActiveRow(), payload = {}) {
  if (!window.MES_BUSINESS_FLOW?.applyGovernanceAction || !row) return null;
  return window.MES_BUSINESS_FLOW.applyGovernanceAction(row, pageConfig.id, action, {
    status: row.status,
    owner: row.owner,
    result: payload.result || row.check,
    impact: payload.impact || row.risk,
    approvalStatus: payload.approvalStatus || "",
    auditRef: payload.auditRef || row.trace,
    ...payload,
  });
}

function buildMatrixGovernanceRow(item) {
  return {
    id: item.id,
    name: item.control,
    status: item.status,
    source: item.rule,
    owner: item.approver,
    trace: item.evidence,
    risk: `${item.module}：${item.rule}`,
    scope: item.module,
    check: `${item.control} · ${item.status}`,
  };
}

function getNowText() {
  return new Date().toLocaleString("zh-CN", { hour12: false });
}

function getStatusStyle(status) {
  if (["可登录", "已生效", "已发布", "正常", "已启用", "成功", "最近成功"].includes(status)) return "green";
  if (["锁定", "离职停用", "越权拦截", "失败拦截", "超时节点", "有差异", "死信待补偿", "待演练"].includes(status)) return "red";
  return "orange";
}

function getNextAccountId() {
  const next = rows.reduce((max, row) => {
    const match = row.id.match(/^USR-(?:NEW-)?(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 100) + 1;
  return `USR-NEW-${String(next).padStart(3, "0")}`;
}

function getNextGenericId(prefix) {
  const next = rows.reduce((max, row) => {
    const match = row.id.match(/(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 100) + 1;
  return `${prefix}-${String(next).padStart(3, "0")}`;
}

function renderFrameMenu() {
  $("#settingsModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "system" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "system" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#settingsModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#settingsModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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

function renderAppShell() {
  $("#settingsApp").innerHTML = `
    <header class="topbar">
      <div>
        <div class="eyebrow">${pageConfig.eyebrow}</div>
        <h1>${pageConfig.title}</h1>
        <p>${getDefinition().subtitle}</p>
      </div>
      <div class="topbar-actions">
        ${isMaintenancePage() ? `<button id="createMaintenanceBtn" class="primary-action" type="button">${getMaintenanceDefinition().createLabel}</button>` : ""}
        <button id="simulateTopBtn" class="primary-action" type="button">模拟状态回执</button>
        <button id="resetSettingsBtn" class="secondary-action" type="button">重置演示</button>
        <a class="secondary-link" href="./operation-logs.html">操作记录</a>
        <a class="secondary-link" href="../index.html">返回首页</a>
        <div class="user-chip"><span class="avatar">系</span><span>${getDefinition().user}</span></div>
      </div>
    </header>
    <section class="settings-toolbar" aria-label="系统设置筛选">
      <label>搜索<input id="searchInput" type="search" placeholder="账号、角色、接口、单据、责任人、追溯编号" /></label>
      <label>状态<select id="statusFilter"></select></label>
      <label>来源<select id="sourceFilter"></select></label>
      <label>详情面板<select id="detailFilter"><option value="open">打开</option><option value="closed">收起</option></select></label>
    </section>
    <section id="settingsKpis" class="settings-kpis"></section>
    <section class="settings-governance" aria-label="跨流程系统治理">
      <div class="settings-governance__summary">
        <span>第五轮系统治理</span>
        <h3>${getGovernanceDefinition().title}</h3>
        <p>${getGovernanceDefinition().guard}</p>
      </div>
      <div id="governanceStats" class="settings-governance__stats"></div>
      <div class="settings-governance__actions">
        ${getGovernanceDefinition().actions.map((action) => `<button type="button" data-governance-action="${action}">${action}</button>`).join("")}
      </div>
    </section>
    <section class="settings-layout">
      <div class="settings-left">
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div><h3>${getDefinition().tableTitle}</h3><p>${getDefinition().tableHint}</p></div>
            <button id="openDetailBtn" type="button" hidden>打开详情</button>
          </div>
          <div class="settings-table-wrap">
            <table class="settings-table">
              <thead id="tableHead"></thead>
              <tbody id="tableBody"></tbody>
            </table>
          </div>
        </section>
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div><h3>${getDefinition().cardTitle}</h3><p>保留来源系统、校验结果、责任人、时间戳、单据或追溯引用和下一步闭环动作</p></div>
          </div>
          <div id="settingsCards" class="settings-cards"></div>
        </section>
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div>
              <h3>细粒度治理配置矩阵</h3>
              <p>把按钮权限、审批流模板、消息规则、接口补偿、审计导出和备份演练落到具体业务页面与控制项。</p>
            </div>
          </div>
          <div id="governanceMatrix" class="settings-matrix"></div>
        </section>
        <section class="settings-simulation">
          <div class="settings-simulation__head">
            <div><h3>${getDefinition().simulationTitle}</h3><p>${getDefinition().simulationHint}</p></div>
          </div>
          <div class="settings-simulation__form">
            <input id="simulationInput" type="text" />
            <button id="simulateBtn" type="button">记录模拟回执</button>
            <button id="secondaryActionBtn" type="button">登记复核结果</button>
          </div>
        </section>
      </div>
      <aside class="settings-side">
        <section id="detailPanel" class="settings-detail" aria-hidden="false">
          <div class="settings-detail__head">
            <div><span id="detailStatus" class="pill"></span><h3 id="detailTitle"></h3><p id="detailSubtitle"></p></div>
            <button id="closeDetailBtn" class="icon-button" type="button" aria-label="关闭详情">×</button>
          </div>
          <dl id="detailKv" class="settings-kv"></dl>
        </section>
        <section class="settings-detail"><h3>履历与责任链</h3><div id="timelineList" class="settings-timeline"></div></section>
        <section class="settings-detail"><h3>联动闭环</h3><div id="linkList" class="settings-list"></div></section>
        <section class="settings-detail"><h3>跨流程治理记录</h3><div id="governanceList" class="settings-list"></div></section>
        <section class="settings-detail"><h3>模拟操作记录</h3><div id="logList" class="settings-list"></div></section>
      </aside>
    </section>
    ${isAccountsPage() ? renderAccountDialog() : ""}
    ${!isAccountsPage() && isMaintenancePage() ? renderGenericMaintenanceDialog() : ""}
    ${renderConfirmDialog()}
    <div id="toast" class="settings-toast" hidden></div>
  `;
}

function renderGenericMaintenanceDialog() {
  const maintenance = getMaintenanceDefinition();
  const [idLabel, nameLabel, areaLabel, sourceLabel, scopeLabel, statusLabel, checkLabel, ownerLabel, traceLabel, riskLabel, nextLabel] = maintenance.fields;
  return `
    <div id="genericDialog" class="settings-modal" hidden>
      <div class="settings-modal__panel" role="dialog" aria-modal="true" aria-labelledby="genericDialogTitle">
        <div class="settings-modal__head">
          <div>
            <h3 id="genericDialogTitle">${maintenance.createLabel}</h3>
            <p>${maintenance.noun}由后台维护配置、状态和责任链；审批、电子签名、消息投递等外部或人工动作只记录结果，不在后台代替执行。</p>
          </div>
          <button id="closeGenericDialogBtn" class="icon-button" type="button" aria-label="关闭维护弹窗">×</button>
        </div>
        <form id="genericForm" class="account-form">
          <input id="genericEditingId" type="hidden" />
          <label>${idLabel}<input id="genericIdInput" type="text" required /></label>
          <label>${nameLabel}<input id="genericNameInput" type="text" required /></label>
          <label>${areaLabel}<input id="genericAreaInput" type="text" required /></label>
          <label>${sourceLabel}<select id="genericSourceInput">${maintenance.sourceOptions.map((option) => `<option>${option}</option>`).join("")}</select></label>
          <label>${scopeLabel}<input id="genericScopeInput" type="text" required /></label>
          <label>${statusLabel}<select id="genericStatusInput">${maintenance.statusOptions.map((option) => `<option>${option}</option>`).join("")}</select></label>
          <label>${ownerLabel}<input id="genericOwnerInput" type="text" required /></label>
          <label>${traceLabel}<input id="genericTraceInput" type="text" required /></label>
          <label class="account-form__wide">${checkLabel}<input id="genericCheckInput" type="text" required /></label>
          <label class="account-form__wide">${riskLabel}<input id="genericRiskInput" type="text" required /></label>
          <label class="account-form__wide">${nextLabel}<input id="genericNextInput" type="text" required /></label>
          <div class="settings-modal__actions">
            <button id="cancelGenericDialogBtn" class="secondary-action" type="button">取消</button>
            <button class="primary-action" type="submit">保存${maintenance.noun}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAccountDialog() {
  return `
    <div id="accountDialog" class="settings-modal" hidden>
      <div class="settings-modal__panel" role="dialog" aria-modal="true" aria-labelledby="accountDialogTitle">
        <div class="settings-modal__head">
          <div>
            <h3 id="accountDialogTitle">新增人员账号</h3>
            <p>后台维护账号、岗位、班组、数据范围和终端绑定；现场登录仍由工位终端、扫码枪或工牌/NFC 回传。</p>
          </div>
          <button id="closeAccountDialogBtn" class="icon-button" type="button" aria-label="关闭人员账号维护弹窗">×</button>
        </div>
        <form id="accountForm" class="account-form">
          <input id="accountEditingId" type="hidden" />
          <label>账号编号<input id="accountIdInput" name="id" type="text" required /></label>
          <label>员工姓名与岗位<input id="accountNameInput" name="name" type="text" required placeholder="例如：计划员 陈诺" /></label>
          <label>部门 / 班组<input id="accountAreaInput" name="area" type="text" required placeholder="例如：计划部 / Line-A 白班" /></label>
          <label>身份来源<select id="accountSourceInput" name="source">
            <option>HR 员工主档 + MES 账号</option>
            <option>HR 在职 + QMS 资质</option>
            <option>工牌 NFC + 班组排班</option>
            <option>HR 员工主档 + PDA 设备绑定</option>
            <option>模拟 HR 新员工同步 + MES 待开通</option>
          </select></label>
          <label>终端与数据范围<input id="accountScopeInput" name="scope" type="text" required placeholder="例如：后台工作台 / 订单与计划 / Line-A" /></label>
          <label>账号状态<select id="accountStatusInput" name="status">
            <option>可登录</option>
            <option>需复核</option>
            <option>锁定</option>
            <option>离职停用</option>
          </select></label>
          <label>责任人<input id="accountOwnerInput" name="owner" type="text" required placeholder="例如：系统管理员 许航" /></label>
          <label>工牌/NFC/PDA 绑定<input id="accountTraceInput" name="trace" type="text" required placeholder="例如：badge NFC-A099 / PDA-FG-02" /></label>
          <label class="account-form__wide">准入校验<input id="accountCheckInput" name="check" type="text" required placeholder="例如：新员工待权限复核，暂不允许质量放行签核" /></label>
          <label class="account-form__wide">业务影响<input id="accountRiskInput" name="risk" type="text" required placeholder="例如：只允许查看本班组任务，不可审批库存冻结" /></label>
          <label class="account-form__wide">下一步闭环<input id="accountNextInput" name="next" type="text" required placeholder="例如：班组长确认后启用账号并写入操作记录" /></label>
          <div class="settings-modal__actions">
            <button id="cancelAccountDialogBtn" class="secondary-action" type="button">取消</button>
            <button class="primary-action" type="submit">保存账号</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderConfirmDialog() {
  return `
    <div id="confirmDialog" class="settings-confirm" hidden>
      <section class="settings-confirm__panel" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
        <div class="settings-confirm__head">
          <span id="confirmTone" class="settings-confirm__badge">确认</span>
          <button id="confirmCloseBtn" class="icon-button" type="button" aria-label="关闭确认弹窗">×</button>
        </div>
        <h3 id="confirmTitle">确认操作</h3>
        <p id="confirmMessage"></p>
        <div id="confirmMeta" class="settings-confirm__meta"></div>
        <div class="settings-confirm__actions">
          <button id="confirmCancelBtn" class="secondary-action" type="button">取消</button>
          <button id="confirmOkBtn" class="primary-action" type="button">确认</button>
        </div>
      </section>
    </div>
  `;
}

function populateFilters() {
  const statusOptions = ["all", ...new Set(rows.map((row) => row.status))];
  $("#statusFilter").innerHTML = statusOptions.map((item) => `<option value="${item}">${item === "all" ? "全部状态" : item}</option>`).join("");
  const sourceOptions = ["all", ...new Set(rows.map((row) => row.source.split(/[+/]/)[0].trim()))];
  $("#sourceFilter").innerHTML = sourceOptions.map((item) => `<option value="${item}">${item === "all" ? "全部来源" : item}</option>`).join("");
  $("#statusFilter").value = state.status;
  $("#sourceFilter").value = state.source;
  $("#searchInput").value = state.search;
  $("#detailFilter").value = state.detailOpen ? "open" : "closed";
}

function getFilteredRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((row) => {
    const text = Object.values(row).join(" ").toLowerCase();
    const sourceRoot = row.source.split(/[+/]/)[0].trim();
    return (!keyword || text.includes(keyword)) && (state.status === "all" || row.status === state.status) && (state.source === "all" || sourceRoot === state.source);
  });
}

function renderKpis() {
  const labels = getDefinition().metricLabels;
  const total = rows.length;
  const healthy = rows.filter((row) => ["可登录", "已生效", "已发布", "正常", "已启用", "成功", "最近成功"].includes(row.status)).length;
  const warning = rows.filter((row) => row.statusStyle === "orange").length;
  const blocked = rows.filter((row) => row.statusStyle === "red").length;
  const values = [total, healthy, warning, blocked];
  $("#settingsKpis").innerHTML = labels.map((label, index) => `
    <article class="settings-kpi">
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <p>${index === 0 ? "当前页面样例记录" : index === 1 ? "已进入可执行或可引用状态" : index === 2 ? "需要责任人复核确认" : "已触发拦截、补偿或演练"}</p>
    </article>
  `).join("");
}

function renderGovernanceStats() {
  const stats = getGovernanceStats();
  $("#governanceStats").innerHTML = [
    ["统一治理事件", stats.total],
    ["本页写入", stats.page],
    ["审批/签名约束", stats.approvals],
    ["风险拦截/演练", stats.risky],
  ].map(([label, value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("");
}

function renderGovernanceMatrix() {
  const matrix = getGovernanceMatrix();
  if (!state.matrixId && matrix[0]) state.matrixId = matrix[0].id;
  $("#governanceMatrix").innerHTML = matrix.map((item) => `
    <article class="settings-matrix__item ${item.id === state.matrixId ? "is-active" : ""}" data-matrix-id="${item.id}">
      <div class="settings-matrix__main">
        <span class="settings-matrix__code">${item.id}</span>
        <strong>${item.control}</strong>
        <p>${item.module}</p>
      </div>
      <div class="settings-matrix__rule">
        <span>${item.rule}</span>
        <small>${item.evidence}</small>
      </div>
      <div class="settings-matrix__owner">
        <span class="pill ${getStatusStyle(item.status)}">${item.status}</span>
        <small>${item.approver}</small>
      </div>
      <div class="settings-matrix__actions">
        <button type="button" data-settings-matrix-action="${item.next}" data-id="${item.id}">${item.next}</button>
        <button type="button" data-settings-matrix-action="影响评估" data-id="${item.id}">影响评估</button>
      </div>
    </article>
  `).join("");
  $("#governanceMatrix").querySelectorAll("[data-matrix-id]").forEach((itemEl) => {
    itemEl.addEventListener("click", (event) => {
      if (event.target.closest("[data-settings-matrix-action]")) return;
      state.matrixId = itemEl.dataset.matrixId;
      saveState();
      renderAll();
    });
  });
  $("#governanceMatrix").querySelectorAll("[data-settings-matrix-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      applyMatrixGovernanceAction(button.dataset.id, button.dataset.settingsMatrixAction);
    });
  });
}

function renderTable() {
  const columns = [...getDefinition().columns, "治理动作"];
  $("#tableHead").innerHTML = `<tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  const list = getFilteredRows();
  if (!list.find((row) => row.id === state.activeId)) state.activeId = list[0]?.id || rows[0]?.id || "";
  $("#tableBody").innerHTML = list.map((row) => `
    <tr class="${row.id === state.activeId ? "is-active" : ""}" data-id="${row.id}">
      <td><strong>${row.id}</strong><small>${row.name}</small></td>
      <td>${row.area}</td>
      <td>${row.source}</td>
      <td>${row.scope}</td>
      <td><span class="pill ${row.statusStyle}">${row.status}</span></td>
      <td>${row.check}</td>
      <td>${row.owner}</td>
      <td>${row.time}</td>
      <td>${isMaintenancePage() ? (isAccountsPage() ? renderAccountRowActions(row) : renderGenericRowActions(row)) : renderGovernanceRowActions(row)}</td>
    </tr>
  `).join("") || `<tr><td colspan="${columns.length}">暂无匹配记录，请调整筛选条件。</td></tr>`;

  $("#tableBody").querySelectorAll("tr[data-id]").forEach((rowEl) => {
    rowEl.addEventListener("click", () => {
      state.activeId = rowEl.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  if (isAccountsPage()) bindAccountRowActions();
  if (!isAccountsPage() && isMaintenancePage()) bindGenericRowActions();
  if (!isMaintenancePage()) bindGovernanceRowActions();
}

function renderAccountRowActions(row) {
  const lockLabel = row.status === "锁定" ? "解锁" : "锁定";
  const activeLabel = row.status === "离职停用" ? "启用" : "离职停用";
  return `
    <div class="settings-row-actions">
      <button type="button" data-account-action="edit" data-id="${row.id}">编辑</button>
      <button type="button" data-account-action="review" data-id="${row.id}">权限复核</button>
      <button type="button" data-account-action="lock" data-id="${row.id}">${lockLabel}</button>
      <button class="danger-action" type="button" data-account-action="disable" data-id="${row.id}">${activeLabel}</button>
    </div>
  `;
}

function bindAccountRowActions() {
  $("#tableBody").querySelectorAll("[data-account-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeId = button.dataset.id;
      const action = button.dataset.accountAction;
      if (action === "edit") openAccountDialog(button.dataset.id);
      if (action === "review") reviewAccount(button.dataset.id);
      if (action === "lock") toggleAccountLock(button.dataset.id);
      if (action === "disable") toggleAccountDisable(button.dataset.id);
    });
  });
}

function renderGenericRowActions(row) {
  const maintenance = getMaintenanceDefinition();
  const activeLabel = row.status === maintenance.disable.offStatus ? maintenance.disable.onLabel : maintenance.disable.offLabel;
  return `
    <div class="settings-row-actions">
      <button type="button" data-generic-action="edit" data-id="${row.id}">编辑</button>
      <button type="button" data-generic-action="copy" data-id="${row.id}">复制</button>
      <button type="button" data-generic-action="primary" data-id="${row.id}">${maintenance.primary.label}</button>
      <button class="danger-action" type="button" data-generic-action="disable" data-id="${row.id}">${activeLabel}</button>
    </div>
  `;
}

function bindGenericRowActions() {
  $("#tableBody").querySelectorAll("[data-generic-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeId = button.dataset.id;
      const action = button.dataset.genericAction;
      if (action === "edit") openGenericDialog(button.dataset.id);
      if (action === "copy") copyGenericRow(button.dataset.id);
      if (action === "primary") applyGenericPrimaryAction(button.dataset.id);
      if (action === "disable") toggleGenericDisable(button.dataset.id);
    });
  });
}

function renderGovernanceRowActions(row) {
  const firstAction = getGovernanceDefinition().actions[0] || "登记复核";
  return `
    <div class="settings-row-actions">
      <button type="button" data-governance-row-action="review" data-id="${row.id}">${firstAction}</button>
      <button type="button" data-governance-row-action="evidence" data-id="${row.id}">查看证据</button>
    </div>
  `;
}

function bindGovernanceRowActions() {
  $("#tableBody").querySelectorAll("[data-governance-row-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeId = button.dataset.id;
      const action = button.dataset.governanceRowAction === "evidence" ? "标记稽核样本" : getGovernanceDefinition().actions[0];
      applyGovernanceQuickAction(action);
    });
  });
}

function renderCards() {
  const active = getActiveRow();
  $("#settingsCards").innerHTML = [
    { title: "状态来源", body: active.source, meta: active.check },
    { title: "业务影响", body: active.risk, meta: active.scope },
    { title: "下一步闭环", body: active.next, meta: active.trace },
  ].map((card) => `
    <article class="settings-card">
      <strong>${card.title}</strong>
      <p>${card.body}</p>
      <small>${card.meta}</small>
    </article>
  `).join("");
}

function getActiveRow() {
  return rows.find((row) => row.id === state.activeId) || rows[0];
}

function renderDetail() {
  const active = getActiveRow();
  $("#detailPanel").hidden = !state.detailOpen;
  $("#openDetailBtn").hidden = state.detailOpen;
  $("#detailFilter").value = state.detailOpen ? "open" : "closed";
  $("#detailStatus").className = `pill ${active.statusStyle}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.name;
  $("#detailSubtitle").textContent = `${active.id} · ${active.area}`;
  $("#detailKv").innerHTML = [
    ["来源", active.source],
    ["范围", active.scope],
    ["校验", active.check],
    ["责任人", active.owner],
    ["时间戳", active.time],
    ["追溯引用", active.trace],
    ["风险说明", active.risk],
    ["下一步", active.next],
  ].map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("");
  $("#timelineList").innerHTML = [
    ["配置生效", `${active.owner} 于 ${active.time} 更新，状态为 ${active.status}`],
    ["校验回执", active.check],
    ["审计留痕", `${active.trace} 已写入操作记录或业务履历`],
  ].map(([title, body]) => `<article><strong>${title}</strong><span>${body}</span></article>`).join("");
  $("#linkList").innerHTML = [
    ["上游输入", active.source],
    ["下游控制", active.scope],
    ["异常处理", active.next],
  ].map(([title, body]) => `<article><strong>${title}</strong><span>${body}</span></article>`).join("");
}

function renderLogs() {
  const visibleLogs = logs.slice(-5).reverse();
  $("#logList").innerHTML = visibleLogs.length
    ? visibleLogs.map((log) => `<article><strong>${log.action}</strong><span>${log.time} · ${log.note}</span></article>`).join("")
    : `<article><strong>暂无模拟记录</strong><span>页面会保存模拟回执、复核结果和重置前的演示状态。</span></article>`;
}

function renderGovernanceList() {
  const active = getActiveRow();
  const allEvents = getGovernanceEvents();
  const events = (pageConfig.id === "logs"
    ? allEvents
    : allEvents.filter((event) => event.pageId === pageConfig.id || event.businessObject === active?.id || event.auditRef === active?.trace)
  ).slice(0, 5);
  $("#governanceList").innerHTML = events.length
    ? events.map((event) => `<article><strong>${event.action} · ${event.businessObject}</strong><span>${event.time} · ${event.owner} · ${event.result}</span></article>`).join("")
    : `<article><strong>等待治理动作</strong><span>新增、编辑、审批、补偿、归档、演练和危险确认会写入 MES_BUSINESS_FLOW.governanceEvents。</span></article>`;
}

function renderAll() {
  renderKpis();
  renderGovernanceStats();
  renderGovernanceMatrix();
  renderTable();
  renderCards();
  renderDetail();
  renderGovernanceList();
  renderLogs();
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
  $("#detailFilter").addEventListener("change", (event) => {
    state.detailOpen = event.target.value === "open";
    saveState();
    renderAll();
  });
  $("#closeDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderAll();
  });
  $("#openDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderAll();
  });
  if (isAccountsPage()) bindAccountMaintenanceEvents();
  if (!isAccountsPage() && isMaintenancePage()) bindGenericMaintenanceEvents();
  document.querySelectorAll("[data-governance-action]").forEach((button) => {
    button.addEventListener("click", () => applyGovernanceQuickAction(button.dataset.governanceAction));
  });
  $("#simulateBtn").addEventListener("click", () => addSimulationLog("模拟回执", $("#simulationInput").value || getDefinition().simulationTitle));
  $("#simulateTopBtn").addEventListener("click", () => addSimulationLog("模拟状态回执", getActiveRow().name));
  $("#secondaryActionBtn").addEventListener("click", () => addSimulationLog("复核结果", `${getActiveRow().id} 已登记责任复核`));
  $("#resetSettingsBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    rows = structuredClone(initialRows[pageConfig.id]);
    state = { activeId: rows[0]?.id || "", search: "", status: "all", source: "all", detailOpen: true };
    logs = [];
    populateFilters();
    renderAll();
    showToast("系统设置演示数据已重置");
  });
  bindConfirmDialog();
}

function bindConfirmDialog() {
  $("#confirmCancelBtn").addEventListener("click", closeConfirmDialog);
  $("#confirmCloseBtn").addEventListener("click", closeConfirmDialog);
  $("#confirmDialog").addEventListener("click", (event) => {
    if (event.target.id === "confirmDialog") closeConfirmDialog();
  });
}

function bindAccountMaintenanceEvents() {
  $("#createMaintenanceBtn").addEventListener("click", () => openAccountDialog());
  $("#closeAccountDialogBtn").addEventListener("click", closeAccountDialog);
  $("#cancelAccountDialogBtn").addEventListener("click", closeAccountDialog);
  $("#accountDialog").addEventListener("click", (event) => {
    if (event.target.id === "accountDialog") closeAccountDialog();
  });
  $("#accountForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveAccountFromForm();
  });
}

function bindGenericMaintenanceEvents() {
  $("#createMaintenanceBtn").addEventListener("click", () => openGenericDialog());
  $("#closeGenericDialogBtn").addEventListener("click", closeGenericDialog);
  $("#cancelGenericDialogBtn").addEventListener("click", closeGenericDialog);
  $("#genericDialog").addEventListener("click", (event) => {
    if (event.target.id === "genericDialog") closeGenericDialog();
  });
  $("#genericForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveGenericFromForm();
  });
}

function openAccountDialog(accountId = "") {
  const account = rows.find((row) => row.id === accountId);
  $("#accountDialogTitle").textContent = account ? "编辑人员账号" : "新增人员账号";
  $("#accountEditingId").value = account?.id || "";
  $("#accountIdInput").value = account?.id || getNextAccountId();
  $("#accountIdInput").readOnly = Boolean(account);
  $("#accountNameInput").value = account?.name || "";
  $("#accountAreaInput").value = account?.area || "";
  $("#accountSourceInput").value = account?.source || "HR 员工主档 + MES 账号";
  $("#accountScopeInput").value = account?.scope || "";
  $("#accountStatusInput").value = account?.status || "需复核";
  $("#accountOwnerInput").value = account?.owner || "系统管理员 许航";
  $("#accountTraceInput").value = account?.trace || "sys_user / badge 待绑定";
  $("#accountCheckInput").value = account?.check || "新增账号待权限复核，暂未开放关键业务签核";
  $("#accountRiskInput").value = account?.risk || "账号启用前不可执行开工准入、质量放行或库存冻结等关键动作";
  $("#accountNextInput").value = account?.next || "完成岗位、班组、终端和角色复核后启用";
  $("#accountDialog").hidden = false;
  $("#accountNameInput").focus();
}

function closeAccountDialog() {
  $("#accountDialog").hidden = true;
}

function saveAccountFromForm() {
  const editingId = $("#accountEditingId").value;
  const id = $("#accountIdInput").value.trim();
  const existing = rows.find((row) => row.id === id);
  if (!editingId && existing) {
    showToast("账号编号已存在，请更换编号");
    return;
  }
  const account = {
    id,
    name: $("#accountNameInput").value.trim(),
    area: $("#accountAreaInput").value.trim(),
    source: $("#accountSourceInput").value,
    scope: $("#accountScopeInput").value.trim(),
    status: $("#accountStatusInput").value,
    statusStyle: getStatusStyle($("#accountStatusInput").value),
    check: $("#accountCheckInput").value.trim(),
    owner: $("#accountOwnerInput").value.trim(),
    time: getNowText(),
    trace: $("#accountTraceInput").value.trim(),
    next: $("#accountNextInput").value.trim(),
    risk: $("#accountRiskInput").value.trim(),
  };
  if (!account.id || !account.name || !account.area || !account.scope || !account.owner) {
    showToast("请补齐账号、姓名、部门、范围和责任人");
    return;
  }
  if (editingId) {
    rows = rows.map((row) => row.id === editingId ? account : row);
    addAuditLog("编辑人员账号", `${account.id} 已更新岗位、范围或终端绑定`);
    writeGovernanceEvent("编辑人员账号", account, { result: "账号岗位、终端绑定或签名范围已更新，关键动作需重新校验" });
  } else {
    rows.unshift(account);
    addAuditLog("新增人员账号", `${account.id} 已创建，状态为 ${account.status}`);
    writeGovernanceEvent("新增人员账号", account, { approvalStatus: "待权限复核", result: "新增账号进入权限复核，不替代现场工牌/NFC 登录" });
  }
  state.activeId = account.id;
  state.detailOpen = true;
  closeAccountDialog();
  populateFilters();
  saveState();
  renderAll();
  showToast(`${account.id} 已保存`);
}

function openGenericDialog(rowId = "", options = {}) {
  const maintenance = getMaintenanceDefinition();
  const row = rowId ? rows.find((item) => item.id === rowId) : null;
  const source = options.copyFrom || row;
  $("#genericDialogTitle").textContent = row ? `编辑${maintenance.noun}` : maintenance.createLabel;
  $("#genericEditingId").value = row?.id || "";
  $("#genericIdInput").value = row?.id || options.copyId || getNextGenericId(maintenance.idPrefix);
  $("#genericIdInput").readOnly = Boolean(row);
  $("#genericNameInput").value = source?.name ? (options.copyFrom ? `${source.name} 复制` : source.name) : "";
  $("#genericAreaInput").value = source?.area || "";
  $("#genericSourceInput").value = source?.source || maintenance.defaults.source;
  $("#genericScopeInput").value = source?.scope || "";
  $("#genericStatusInput").value = source?.status || maintenance.defaults.status;
  $("#genericOwnerInput").value = source?.owner || maintenance.defaults.owner;
  $("#genericTraceInput").value = source?.trace || maintenance.defaults.trace;
  $("#genericCheckInput").value = source?.check || maintenance.defaults.check;
  $("#genericRiskInput").value = source?.risk || maintenance.defaults.risk;
  $("#genericNextInput").value = source?.next || maintenance.defaults.next;
  $("#genericDialog").hidden = false;
  $("#genericNameInput").focus();
}

function closeGenericDialog() {
  $("#genericDialog").hidden = true;
}

function saveGenericFromForm() {
  const maintenance = getMaintenanceDefinition();
  const editingId = $("#genericEditingId").value;
  const id = $("#genericIdInput").value.trim();
  const existing = rows.find((row) => row.id === id);
  if (!editingId && existing) {
    showToast(`${maintenance.noun}编码已存在，请更换编号`);
    return;
  }
  const row = {
    id,
    name: $("#genericNameInput").value.trim(),
    area: $("#genericAreaInput").value.trim(),
    source: $("#genericSourceInput").value,
    scope: $("#genericScopeInput").value.trim(),
    status: $("#genericStatusInput").value,
    statusStyle: getStatusStyle($("#genericStatusInput").value),
    check: $("#genericCheckInput").value.trim(),
    owner: $("#genericOwnerInput").value.trim(),
    time: getNowText(),
    trace: $("#genericTraceInput").value.trim(),
    next: $("#genericNextInput").value.trim(),
    risk: $("#genericRiskInput").value.trim(),
  };
  if (!row.id || !row.name || !row.area || !row.scope || !row.owner) {
    showToast("请补齐编码、名称、对象、范围和责任人");
    return;
  }
  if (editingId) {
    rows = rows.map((item) => item.id === editingId ? row : item);
    addAuditLog(`编辑${maintenance.noun}`, `${row.id} 已更新配置、范围或责任链`);
    writeGovernanceEvent(`编辑${maintenance.noun}`, row, { result: `${maintenance.noun}配置、范围或责任链已更新` });
  } else {
    rows.unshift(row);
    addAuditLog(`新增${maintenance.noun}`, `${row.id} 已创建，状态为 ${row.status}`);
    writeGovernanceEvent(`新增${maintenance.noun}`, row, { approvalStatus: row.status.includes("待") ? "待审批/复核" : "", result: `${maintenance.noun}已创建并进入系统治理链路` });
  }
  state.activeId = row.id;
  state.detailOpen = true;
  closeGenericDialog();
  populateFilters();
  saveState();
  renderAll();
  showToast(`${row.id} 已保存`);
}

function copyGenericRow(rowId) {
  const maintenance = getMaintenanceDefinition();
  const row = rows.find((item) => item.id === rowId);
  if (!row) return;
  openGenericDialog("", { copyFrom: row, copyId: getNextGenericId(maintenance.idPrefix) });
}

function applyGenericPrimaryAction(rowId) {
  const maintenance = getMaintenanceDefinition();
  updateGenericRow(rowId, {
    status: maintenance.primary.status,
    statusStyle: getStatusStyle(maintenance.primary.status),
    check: maintenance.primary.check,
    next: maintenance.primary.next,
  }, maintenance.primary.label, `${rowId} 已完成${maintenance.primary.label}`);
}

function toggleGenericDisable(rowId) {
  const maintenance = getMaintenanceDefinition();
  const row = rows.find((item) => item.id === rowId);
  if (!row) return;
  if (row.status === maintenance.disable.offStatus) {
    updateGenericRow(rowId, {
      status: maintenance.disable.onStatus,
      statusStyle: getStatusStyle(maintenance.disable.onStatus),
      check: maintenance.disable.onCheck,
      next: maintenance.defaults.next,
    }, maintenance.disable.onLabel, `${rowId} 已重新启用申请`);
    return;
  }
  openConfirmDialog({
    tone: "red",
    title: `${maintenance.disable.offLabel} ${row.name}`,
    message: `${maintenance.disable.offLabel}后不会删除历史审计、审批或投递记录；已被业务引用的配置保留原始履历。`,
    meta: [`编码：${row.id}`, `当前状态：${row.status}`, `责任人：${row.owner}`],
    okText: maintenance.disable.offLabel,
    onConfirm: () => updateGenericRow(rowId, {
      status: maintenance.disable.offStatus,
      statusStyle: getStatusStyle(maintenance.disable.offStatus),
      check: maintenance.disable.offCheck,
      next: "保留历史履历，后续如需恢复需重新复核",
    }, maintenance.disable.offLabel, `${rowId} 已停用并保留历史履历`),
  });
}

function updateGenericRow(rowId, patch, action, note) {
  let updatedRow = null;
  rows = rows.map((row) => {
    if (row.id !== rowId) return row;
    updatedRow = { ...row, ...patch, time: getNowText() };
    return updatedRow;
  });
  state.activeId = rowId;
  state.detailOpen = true;
  addAuditLog(action, note);
  writeGovernanceEvent(action, updatedRow, { result: note, approvalStatus: /发布|启用|补偿|演练/.test(action) ? "已进入治理约束" : "" });
  populateFilters();
  saveState();
  renderAll();
  showToast(`${action}已写入操作记录`);
}

function applyGovernanceQuickAction(action) {
  const active = getActiveRow();
  if (!active) return;
  const highRisk = /锁定|停用|补偿|演练|归档|导出|关闭|拦截/.test(action);
  const commit = () => {
    const note = `${active.id} ${action}已登记，责任人 ${active.owner}，关联 ${active.trace}`;
    addAuditLog(action, note);
    writeGovernanceEvent(action, active, {
      approvalStatus: /审批|会签|签名|补偿|恢复|演练/.test(action) ? "待审批/复核" : "已记录",
      result: `${action}已作为跨流程治理约束写入统一业务流`,
    });
    saveState();
    renderAll();
    showToast(`${action}已写入统一业务流`);
  };
  if (highRisk) {
    openConfirmDialog({
      tone: "red",
      title: `${action} ${active.name}`,
      message: "该动作会影响跨流程权限、审批、消息、接口、审计或恢复能力，静态演示只记录治理结果，不替代真实外部系统动作。",
      meta: [`对象：${active.id}`, `责任人：${active.owner}`, `追溯引用：${active.trace}`],
      okText: `确认${action}`,
      onConfirm: commit,
    });
    return;
  }
  commit();
}

function applyMatrixGovernanceAction(itemId, action) {
  const item = getGovernanceMatrix().find((entry) => entry.id === itemId);
  if (!item) return;
  state.matrixId = item.id;
  const row = buildMatrixGovernanceRow(item);
  const risky = /停用|补偿|演练|归档|导出|关闭|拦截|冻结|解冻|补打|恢复/.test(action);
  const commit = () => {
    const result = `${item.control} ${action}已登记；覆盖 ${item.module}，规则：${item.rule}`;
    addAuditLog(action, `${item.id} ${result}`);
    writeGovernanceEvent(action, row, {
      status: item.status,
      owner: item.approver,
      auditRef: item.evidence,
      approvalStatus: /审批|会签|签名|补偿|演练|发布|导出/.test(action) ? "待审批/复核" : "已记录",
      result,
      impact: `${item.module} 将按该治理控制项重新校验按钮权限、审批流、消息规则或审计策略`,
    });
    saveState();
    renderAll();
    showToast(`${item.control} ${action}已写入统一业务流`);
  };
  if (risky) {
    openConfirmDialog({
      tone: "red",
      title: `${action} ${item.control}`,
      message: "这是细粒度系统治理动作，会影响具体业务页面的按钮权限、审批流、消息升级、审计导出或恢复演练。静态演示只记录治理配置和校验结论。",
      meta: [`控制项：${item.id}`, `覆盖页面：${item.module}`, `责任人：${item.approver}`],
      okText: `确认${action}`,
      onConfirm: commit,
    });
    return;
  }
  commit();
}

function reviewAccount(accountId) {
  updateAccount(accountId, {
    status: "可登录",
    statusStyle: "green",
    check: "权限复核通过，岗位、班组、终端绑定和电子签名范围已确认",
    next: "进入月度权限复核，关键操作继续写入审计记录",
  }, "权限复核", "已完成权限复核并允许登录");
}

function toggleAccountLock(accountId) {
  const account = rows.find((row) => row.id === accountId);
  if (!account) return;
  if (account.status === "锁定") {
    updateAccount(accountId, {
      status: "需复核",
      statusStyle: "orange",
      check: "主管确认后已解除锁定，仍需权限管理员复核",
      next: "完成权限复核后恢复可登录",
    }, "账号解锁", "已解除锁定并转入复核");
    return;
  }
  openConfirmDialog({
    tone: "red",
    title: `锁定 ${account.name}`,
    message: "锁定后该账号不能登录后台、PDA 或参与电子签名。该动作会写入操作记录，历史生产履历不会被删除。",
    meta: [`账号：${account.id}`, `范围：${account.scope}`, `责任人：${account.owner}`],
    okText: "确认锁定",
    onConfirm: () => updateAccount(accountId, {
      status: "锁定",
      statusStyle: "red",
      check: "管理员手工锁定，等待主管确认和令牌复位",
      next: "主管确认原因后执行解锁或离职停用",
    }, "锁定账号", "账号已锁定并记录原因待补充"),
  });
}

function toggleAccountDisable(accountId) {
  const account = rows.find((row) => row.id === accountId);
  if (!account) return;
  if (account.status === "离职停用") {
    updateAccount(accountId, {
      status: "需复核",
      statusStyle: "orange",
      check: "离职停用已撤回，需重新确认 HR 在职、班组和终端绑定",
      next: "复核通过后可重新启用",
    }, "启用账号", "离职停用已撤回并转复核");
    return;
  }
  openConfirmDialog({
    tone: "red",
    title: `离职停用 ${account.name}`,
    message: "停用后该账号不能登录后台、PDA 或参与电子签名。已被生产履历引用的操作记录会保留，不会物理删除。",
    meta: [`账号：${account.id}`, `当前状态：${account.status}`, "后续：移交未闭环审批和待办"],
    okText: "确认停用",
    onConfirm: () => updateAccount(accountId, {
      status: "离职停用",
      statusStyle: "red",
      check: "HR 离职或岗位移出，已停用 MES 登录、PDA 和电子签名权限",
      next: "保留历史履历，移交未闭环审批和待办",
    }, "离职停用", "账号已停用，历史追溯记录保留"),
  });
}

function openConfirmDialog({ tone = "orange", title, message, meta = [], okText = "确认", onConfirm }) {
  $("#confirmTone").className = `settings-confirm__badge ${tone}`;
  $("#confirmTone").textContent = tone === "red" ? "高风险操作" : "需要确认";
  $("#confirmTitle").textContent = title;
  $("#confirmMessage").textContent = message;
  $("#confirmMeta").innerHTML = meta.map((item) => `<span>${item}</span>`).join("");
  $("#confirmOkBtn").textContent = okText;
  $("#confirmOkBtn").onclick = () => {
    closeConfirmDialog();
    onConfirm?.();
  };
  $("#confirmDialog").hidden = false;
  $("#confirmCancelBtn").focus();
}

function closeConfirmDialog() {
  $("#confirmDialog").hidden = true;
  $("#confirmOkBtn").onclick = null;
}

function updateAccount(accountId, patch, action, note) {
  let updatedAccount = null;
  rows = rows.map((row) => {
    if (row.id !== accountId) return row;
    updatedAccount = { ...row, ...patch, time: getNowText() };
    return updatedAccount;
  });
  state.activeId = accountId;
  state.detailOpen = true;
  addAuditLog(action, `${accountId} ${note}`);
  writeGovernanceEvent(action, updatedAccount, { result: `${accountId} ${note}`, approvalStatus: /锁定|停用|复核/.test(action) ? "已记录审计约束" : "" });
  populateFilters();
  saveState();
  renderAll();
  showToast(`${action}已写入操作记录`);
}

function addAuditLog(action, note) {
  logs.push({ action, note, time: getNowText() });
}

function addSimulationLog(action, note) {
  logs.push({ action, note, time: getNowText() });
  const active = getActiveRow();
  active.check = `${action}：${note}`;
  active.time = getNowText();
  writeGovernanceEvent(action, active, { result: `${action}：${note}` });
  saveState();
  renderAll();
  showToast(`${action}已写入模拟操作记录`);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

renderFrameMenu();
loadState();
renderAppShell();
populateFilters();
bindEvents();
renderAll();
