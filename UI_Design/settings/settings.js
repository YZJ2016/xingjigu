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

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", source: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function getDefinition() {
  return pageDefinitions[pageConfig.id];
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
        <section class="settings-detail"><h3>模拟操作记录</h3><div id="logList" class="settings-list"></div></section>
      </aside>
    </section>
    <div id="toast" class="settings-toast" hidden></div>
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

function renderTable() {
  $("#tableHead").innerHTML = `<tr>${getDefinition().columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
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
    </tr>
  `).join("") || `<tr><td colspan="8">暂无匹配记录，请调整筛选条件。</td></tr>`;

  $("#tableBody").querySelectorAll("tr[data-id]").forEach((rowEl) => {
    rowEl.addEventListener("click", () => {
      state.activeId = rowEl.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
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

function renderAll() {
  renderKpis();
  renderTable();
  renderCards();
  renderDetail();
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
}

function addSimulationLog(action, note) {
  logs.push({ action, note, time: new Date().toLocaleString("zh-CN", { hour12: false }) });
  const active = getActiveRow();
  active.check = `${action}：${note}`;
  active.time = new Date().toLocaleString("zh-CN", { hour12: false });
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
