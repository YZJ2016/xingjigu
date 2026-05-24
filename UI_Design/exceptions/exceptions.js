const pageConfig = window.EXCEPTION_PAGE || { id: "pending", title: "待处理异常", eyebrow: "异常处理 / 待处理异常" };
const STORAGE_KEY = `xingjigu_mes_exceptions_${pageConfig.id}_v2`;

const modules = window.MES_NAV_MODULES || [];

const exceptionPages = {
  异常上报: "exception-report.html",
  待处理异常: "pending-exceptions.html",
  停线申请: "line-stop.html",
  缺料处理: "material-shortage.html",
  质量问题: "quality-issues.html",
  设备故障: "equipment-faults.html",
  处理复盘: "review.html",
};

const pageDefinitions = {
  report: {
    subtitle: "班组长、质量员、设备员和物料员统一登记来自工位终端、PDA、Andon、PLC 与人工确认的异常事实",
    user: "异常受理员",
    metrics: ["上报单", "待分级", "已派单", "需停线"],
    columns: ["异常单", "来源 / 类型", "关联单据", "发生位置", "严重度", "分级状态", "联动建议", "责任人"],
    tableTitle: "异常上报入口",
    tableHint: "后台只接收和分级异常事实，不替代现场扫码、PDA、HMI 或设备报警动作",
    cardTitle: "来源、分级和派单",
    simulationTitle: "模拟现场异常上报回执",
    simulationHint: "模拟工位终端、PDA、Andon、扫码枪或 PLC 报警回传，后台只形成异常事件和处置任务",
  },
  pending: {
    subtitle: "生产主管按 SLA 统筹设备、质量、缺料、人员和工艺异常，跟踪响应、升级、处置和恢复验证",
    user: "异常协调员",
    metrics: ["待办", "超时风险", "处理中", "待验证"],
    columns: ["异常单", "类型 / 严重度", "关联单据", "响应 SLA", "当前状态", "处置任务", "业务联动", "责任人"],
    tableTitle: "待处理异常队列",
    tableHint: "统一查看未关闭异常，支持责任确认、临时措施、升级和关闭前恢复验证",
    cardTitle: "SLA、升级和恢复验证",
    simulationTitle: "模拟责任人移动端回执",
    simulationHint: "模拟责任人在移动端、PDA 或站内任务中确认响应，后台只记录状态和时间戳",
  },
  lineStop: {
    subtitle: "车间主任和质量/设备主管审批停线范围，记录锁定对象、恢复条件、排程影响和解除验证",
    user: "停线审批人",
    metrics: ["停线单", "待审批", "已锁定", "待恢复"],
    columns: ["停线申请", "触发异常", "锁定范围", "申请原因", "审批状态", "恢复条件", "排程影响", "责任人"],
    tableTitle: "停线申请与恢复",
    tableHint: "停线来自质量、设备、工艺或安全风险，后台负责授权、记录和恢复校验",
    cardTitle: "授权、锁定和恢复",
    simulationTitle: "模拟现场停线 / 恢复信号回传",
    simulationHint: "模拟 Andon、PLC、班组长 HMI 或主管审批回传，不表示后台直接启停产线",
  },
  shortage: {
    subtitle: "物料异常协调员基于缺料预警处理调拨、替代料、采购催料和计划调整，保持同一异常事实闭环",
    user: "物料异常协调员",
    metrics: ["缺料异常", "影响工单", "待替代", "已缓解"],
    columns: ["缺料事件", "物料 / 批次", "影响工单", "缺口与断料", "当前状态", "处置动作", "排程联动", "责任人"],
    tableTitle: "缺料异常处置",
    tableHint: "缺料事实来自 APS、WMS、MES 库存记录、线边库和配送回执，联动调拨、替代料审批和排程调整",
    cardTitle: "调拨、替代和重排",
    simulationTitle: "模拟 WMS / MES 库存 / 线边库缺料回执",
    simulationHint: "模拟 WMS、PDA、MES 库存记录、线边库或采购到货回传，后台只记录处置方案、责任和联动结果",
  },
  quality: {
    subtitle: "质量员按 SN、批次、工序和不良代码跟踪 NCR、隔离、MRB、停线建议、返工和 CAPA",
    user: "质量异常负责人",
    metrics: ["质量异常", "隔离中", "MRB 待判", "CAPA"],
    columns: ["质量事件", "不良对象", "关联单据", "发现来源", "当前状态", "围堵措施", "质量联动", "责任人"],
    tableTitle: "质量问题闭环",
    tableHint: "质量异常来自首件、巡检、过程检验、FQC 或 SPC，必须由质量角色签核，并保留隔离、NCR/MRB 和追溯证据",
    cardTitle: "隔离、MRB 和 CAPA",
    simulationTitle: "模拟 IPQC / QMS 判定回执",
    simulationHint: "模拟 IPQC PDA、检验台或 QMS 判定回传，不表示后台直接完成现场检验",
  },
  equipment: {
    subtitle: "设备主管按报警、扫码报修、点检异常和停机记录派维修、验收试运行，并回写 OEE 与复盘",
    user: "设备异常负责人",
    metrics: ["设备故障", "待到场", "维修中", "停机分钟"],
    columns: ["设备故障", "设备 / 报警", "关联单据", "停机影响", "维修状态", "备件与试运行", "OEE 联动", "责任人"],
    tableTitle: "设备故障处置",
    tableHint: "设备故障来自 PLC、SCADA、设备 API、点检或扫码报修，闭环到维修工单和停机归因",
    cardTitle: "报警、维修和验收",
    simulationTitle: "模拟 PLC / 维修移动端回执",
    simulationHint: "模拟 PLC/SCADA、扫码报修或维修移动端回传，后台不直接维修设备",
  },
  review: {
    subtitle: "生产、质量、设备和物料负责人对重大或重复异常做 RCA、CAPA、TPM 改善和有效性验证",
    user: "异常复盘负责人",
    metrics: ["CAPA/8D 单", "RCA 待补", "措施执行", "关闭/升级"],
    columns: ["CAPA/8D 单", "来源异常 / 严重度", "RCA 根因", "纠正措施", "预防措施", "期限 / 状态", "验证结果", "责任人"],
    tableTitle: "CAPA / RCA / 8D 改善闭环",
    tableHint: "重大或重复异常必须记录 RCA、纠正措施、预防措施、责任人、期限、验证证据和关闭/升级结果",
    cardTitle: "RCA、纠正预防和有效性验证",
    simulationTitle: "模拟 CAPA / 8D 验证回执",
    simulationHint: "模拟质量、设备、生产或客户代表提交验证结果，后台只记录 CAPA 证据、关闭和升级履历",
  },
};

const initialRows = {
  report: [
    { id: "EX-RPT-240620-01", type: "设备异常", severity: "停线", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "模拟 PLC 报警 SMT-FEEDER-ERR", status: "待分级", sla: "5 分钟内分级", owner: "异常受理员 赵晴", impact: "SMT 供料器异常，建议停线锁定 D-001", action: "生成设备故障与停线申请", trace: "exception_event.event_type=equipment" },
    { id: "EX-RPT-240620-02", type: "质量异常", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "模拟 IPQC PDA 上报", status: "已派单", sla: "10 分钟响应", owner: "质量员 孟可", impact: "功能测试不良连续 3 件，需隔离待判", action: "触发 NCR 与批次隔离", trace: "defect_record NCR-240620-07" },
    { id: "EX-RPT-240620-03", type: "缺料异常", severity: "高", line: "Line-B", station: "ASM-WS-04", order: "MO-202606-0005", dispatch: "D-052", source: "WMS 冻结 + 齐套检查", status: "待派单", sla: "15 分钟响应", owner: "物料主管 何敏", impact: "电源芯片缺 160 件，15:00 无法开工", action: "调拨、替代料或排程调整", trace: "shortage_alert SA-0002" },
    { id: "EX-RPT-240620-04", type: "工艺异常", severity: "中", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "模拟 HMI 参数偏离上报", status: "已受理", sla: "20 分钟确认", owner: "工艺员 林澈", impact: "老化温区偏差 1.8 摄氏度，需确认工艺窗口", action: "工艺复核与过程检验", trace: "process_parameter_log AGING-01" },
  ],
  pending: [
    { id: "EX-240620-001", type: "设备异常", severity: "停线", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 报警 + 异常中心", status: "处理中", sla: "剩余 6 分钟", owner: "维修员 吴启", impact: "供料器异常，Line-A SMT 暂停", action: "到场确认、更换供料器、试运行", trace: "维修工单 MR-240620-04" },
    { id: "EX-240620-002", type: "质量异常", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "IPQC 巡检 + 测试台数据", status: "待验证", sla: "验证截止 11:50", owner: "质量员 孟可", impact: "隔离 SN 段 GW240-0618-120 至 138", action: "NCR 复判、MRB 处置、解除或返工", trace: "NCR-240620-07" },
    { id: "EX-240620-003", type: "缺料异常", severity: "高", line: "Line-B", station: "ASM-WS-04", order: "MO-202606-0005", dispatch: "D-052", source: "缺料预警 SA-0002", status: "超时风险", sla: "已等待 13 分钟", owner: "计划主管 李敏", impact: "紧急订单 PCM-60 可能延误", action: "替代料审批与计划调整", trace: "plan_adjustment PA-240620-02" },
    { id: "EX-240620-004", type: "人员异常", severity: "中", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "模拟工牌/NFC 资质拦截", status: "待响应", sla: "剩余 18 分钟", owner: "班组长 郑峰", impact: "焊接资质过期，开工准入未通过", action: "换人或主管放行审核", trace: "start_check gate-operator" },
  ],
  lineStop: [
    { id: "LS-240620-01", type: "设备停线", severity: "停线", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "EX-240620-001", status: "已锁定", sla: "10:30-待恢复", owner: "车间主任 陈伟", impact: "锁定 SMT-WS-01 与 D-001，APS 标记不可派工", action: "维修试运行通过后解除", trace: "line_stop LS-240620-01" },
    { id: "LS-240620-02", type: "质量停线", severity: "停线", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "NCR-240620-07", status: "待审批", sla: "申请 11:18", owner: "质量主管 罗岚", impact: "建议暂停功能测试台 B2 批量过站", action: "MRB 初判后决定恢复或返工", trace: "quality_hold GW240-0618" },
    { id: "LS-240620-03", type: "工艺停线", severity: "高", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "过程参数超限", status: "待恢复", sla: "恢复验证中", owner: "工艺主管 林澈", impact: "老化房 2 号温区暂停进站", action: "温控校准、过程检验复核", trace: "process_hold AGING-01" },
    { id: "LS-240620-04", type: "安全停线", severity: "停线", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0004", dispatch: "D-041", source: "班组长模拟 HMI 上报", status: "已恢复", sla: "停线 12 分钟", owner: "EHS 兼设备员 周诚", impact: "喷雾阀泄漏确认完成", action: "安全复核、维修验收、恢复生产", trace: "downtime_record DT-240620-01" },
  ],
  shortage: [
    { id: "EX-MAT-240620-01", type: "缺料异常", severity: "高", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "排程需求 + 线边消耗", status: "调拨中", sla: "预计 14:00 缓解", owner: "物料主管 何敏", impact: "温度传感器缺 200 件，影响第二批 DIP", action: "跨线调拨 120 件，采购催料 80 件", trace: "shortage_alert SA-0001" },
    { id: "EX-MAT-240620-02", type: "冻结缺料", severity: "高", line: "Line-B", station: "ASM-WS-04", order: "MO-202606-0005", dispatch: "D-052", source: "WMS 冻结 + IQC", status: "待替代审批", sla: "15:00 前决策", owner: "计划主管 李敏", impact: "电源芯片 PWRIC-L20260602 冻结 160 件", action: "替代料评估或计划调整", trace: "material_lot hold PWRIC-L20260602" },
    { id: "EX-MAT-240620-03", type: "配送异常", severity: "中", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "模拟 AGV 到站超时", status: "已缓解", sla: "超时 8 分钟", owner: "配送员 罗峰", impact: "10K 电阻卷料配送延迟，未造成停线", action: "人工配送补偿并更新签收", trace: "delivery DL-0001" },
    { id: "EX-MAT-240620-04", type: "低水位", severity: "中", line: "Line-C", station: "PACK-WS-02", order: "MO-202606-0011", dispatch: "D-111", source: "线边库 PDA 盘点", status: "观察中", sla: "班内补料", owner: "线边库管 吴琳", impact: "包装盒余量 130 件，当前不影响尾批", action: "完工后余料退回与补料建议", trace: "line_side_inventory PACK-C-02" },
  ],
  quality: [
    { id: "EX-QLT-240620-01", type: "过程不良", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "模拟 IPQC PDA + 测试台数据", status: "MRB 待判", sla: "12:00 前判定", owner: "质量员 孟可", impact: "连续 3 件通信测试失败，隔离 SN 段 19 件", action: "NCR、MRB、返工评审或让步", trace: "NCR-240620-07" },
    { id: "EX-QLT-240620-02", type: "首件不合格", severity: "停线", line: "Line-A", station: "DIP-WS-02", order: "MO-202606-0001", dispatch: "D-002", source: "首件检验 FAI", status: "已停线", sla: "首件复检中", owner: "质量主管 罗岚", impact: "DIP 插件批量生产入口锁定", action: "返修首件、工艺复核、复检放行", trace: "first_article FAI-240620-02" },
    { id: "EX-QLT-240620-03", type: "SPC 失控", severity: "高", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "过程参数 SPC 判异", status: "围堵中", sla: "20 分钟内复核", owner: "工艺员 林澈", impact: "老化温度趋势超限，待确认影响批次", action: "隔离待判、参数复核、过程检验", trace: "spc_rule xbar-r" },
    { id: "EX-QLT-240620-04", type: "来料不良", severity: "中", line: "Line-B", station: "备料区", order: "MO-202606-0005", dispatch: "D-052", source: "IQC 冻结", status: "供应商确认", sla: "当班完成初判", owner: "SQE 何敏", impact: "电源芯片批次冻结导致缺料", action: "供应商 8D、替代料审批", trace: "incoming_inspection IQC-240620-09" },
  ],
  equipment: [
    { id: "EX-EQ-240620-01", type: "设备故障", severity: "停线", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "PLC 报警 SMT-FEEDER-ERR", status: "维修中", sla: "响应 6 分钟 / 到场 11 分钟", owner: "维修员 吴启", impact: "供料器异常，停机 25 分钟预估", action: "更换供料器、试运行、班组验收", trace: "repair_order MR-240620-04" },
    { id: "EX-EQ-240620-02", type: "测试台通信", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "测试台 API ALM-204", status: "待到场", sla: "剩余 4 分钟", owner: "维修员 梁溪", impact: "GW-240 测试排队增加", action: "检查网关通信板与测试程序", trace: "alarm_event ALM-204" },
    { id: "EX-EQ-240620-03", type: "点检异常", severity: "中", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "班前点检异常", status: "待派工", sla: "15 分钟内派单", owner: "设备主管 袁立", impact: "供料器 12 振动偏高，可能发展为停线", action: "临时点检复核与备件预领", trace: "inspection_plan IP-20260620-01" },
    { id: "EX-EQ-240620-04", type: "温控偏差", severity: "中", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "SCADA 温度趋势", status: "已验收", sla: "校准 18 分钟", owner: "设备员 黄宁", impact: "老化房 2 号温区偏差已恢复", action: "校准探头、保养记录、过程复检", trace: "downtime_record DT-240620-04" },
  ],
  review: [
    { id: "CAPA-240620-01", type: "设备故障 8D", severity: "高", line: "Line-A", station: "SMT-WS-01", order: "MO-202606-0001", dispatch: "D-001", source: "EX-EQ-240620-01 / DT-240620-02", status: "措施执行中", sla: "2026-06-22 17:00 前验证", owner: "设备主管 袁立", impact: "供料器异常停线 25 分钟，影响 80 台产出", action: "纠正：更换供料器轴承并复测；预防：点检频次提升和备件安全库存调整", trace: "exception_capa CAPA-240620-01", rootCause: "供料器轴承磨损未被班前点检阈值识别，振动趋势预警未升级维修", correction: "更换供料器轴承，复核 SMT-01 12 号位振动值，补录维修验收", prevention: "点检标准增加振动趋势阈值，供料器轴承安全库存从 2 提至 4", dueAt: "2026-06-22 17:00", verificationResult: "待连续 2 班次无同类报警后关闭" },
    { id: "CAPA-240620-02", type: "质量 NCR 8D", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "NCR-240620-07 / JIG-ICT-GW240-02", status: "RCA 待补", sla: "2026-06-20 17:00 前完成 RCA", owner: "质量主管 罗岚", impact: "测试不良 19 件隔离，返工工时预计 2.5 小时", action: "补齐 5Why、测试治具校准复核和复测验证计划", trace: "defect_record NCR-240620-07", rootCause: "待确认：测试治具针床接触、程序版本和校准到期共同影响", correction: "隔离影响 SN 段，切换备用治具并完成复测", prevention: "治具校准到期前 3 天触发开工准入预警，测试程序版本纳入首件确认", dueAt: "2026-06-20 17:00", verificationResult: "RCA 未签核，禁止关闭 CAPA" },
    { id: "CAPA-240620-03", type: "缺料预防 CAPA", severity: "中", line: "Line-B", station: "ASM-WS-04", order: "MO-202606-0005", dispatch: "D-052", source: "EX-MAT-240620-02 / IQC 冻结", status: "待验证", sla: "下批订单首件前验证", owner: "物料主管 何敏", impact: "冻结批次导致紧急订单开工延迟", action: "纠正：替代料评审；预防：IQC 冻结联动安全库存和替代料清单", trace: "material_shortage SA-0002", rootCause: "IQC 冻结信息未及时同步齐套检查，指定批次安全库存策略缺失", correction: "完成替代料审批并重排 D-052 开工时间", prevention: "客户指定料维护冻结联动规则，齐套检查读取 QMS 冻结状态", dueAt: "2026-06-25 09:00", verificationResult: "待下批 PCM-60 齐套检查验证" },
    { id: "CAPA-240620-04", type: "工艺停线 8D", severity: "停线", line: "Line-C", station: "AGING-C", order: "MO-202606-0003", dispatch: "D-033", source: "LS-240620-03 / CAL-AGING-TEMP-01", status: "已关闭", sla: "复发观察 3 班次", owner: "工艺主管 林澈", impact: "温区偏差暂停进站 18 分钟", action: "温控点检纳入班前准入，SPC 阈值复核，校准证据已补齐", trace: "process_trend AGING-01", rootCause: "温度探头标准器校准过期，恢复验证仍引用旧证据", correction: "停用过期标准器，使用有效标准器重新校准老化房温区", prevention: "校准有效期纳入开工准入和恢复验证门禁", dueAt: "2026-06-21 12:00", verificationResult: "连续 3 班次温区偏差小于 0.5 摄氏度，CAPA 已关闭" },
  ],
};

const masterExceptionRows = window.MES_MASTER_DATA?.demoRows?.exceptions || {};
Object.entries(masterExceptionRows).forEach(([key, value]) => {
  initialRows[key] = key === "review" ? [...(initialRows[key] || []), ...value] : value;
});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#exceptionModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "exceptions" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "exceptions" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#exceptionModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#exceptionModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  const maps = {
    orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
    dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "工艺文件与作业指导": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
    station: { 工位身份回执: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
    materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
    exceptions: Object.fromEntries(Object.entries(exceptionPages).map(([name, file]) => [name, `./${file}`])),
    quality: { 首件检验: "../quality/first-article.html", 巡检任务: "../quality/patrol-tasks.html", 过程检验: "../quality/process-inspection.html", 成品检验: "../quality/final-inspection.html", 不良记录: "../quality/defect-records.html", 返工评审: "../quality/rework-review.html", 来料检验: "../quality/incoming-inspection.html" },
    equipment: { 设备状态: "../equipment/equipment-status.html", 点检计划: "../equipment/inspection-plan.html", 保养计划: "../equipment/maintenance-plan.html", 维修工单: "../equipment/repair-orders.html", 停机记录: "../equipment/downtime-records.html", 备件领用: "../equipment/spare-parts.html", 设备效率: "../equipment/equipment-efficiency.html" },
    process: { 报警记录: "../monitoring/alarm-records.html", 停机原因: "../monitoring/downtime-reasons.html", 设备运行: "../monitoring/device-runtime.html", 工艺参数: "../monitoring/process-parameters.html", 实时产量: "../monitoring/realtime-output.html", 过程趋势: "../monitoring/process-trends.html", 电子看板: "../monitoring/electronic-board.html" },
  };
  if (moduleId === "workbench") window.location.href = "../index.html";
  else if (maps[moduleId]?.[entry]) window.location.href = maps[moduleId][entry];
  else showToast(`${entry} 页面待建设`);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = (saved.rows || rows).map(normalizeFlowExceptionRow);
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
  const flowRows = window.MES_BUSINESS_FLOW?.getExceptionRows?.(pageConfig.id) || [];
  if (!flowRows.length) return;
  const existing = new Map(rows.map((item) => [item.id, item]));
  flowRows.forEach((item) => {
    if (!existing.has(item.id)) rows.push(normalizeFlowExceptionRow(item));
  });
  if (!rows.some((item) => item.id === state.activeId)) state.activeId = rows[0]?.id || "";
}

function normalizeFlowExceptionRow(item) {
  return {
    ...item,
    type: item.type || "业务联动异常",
    severity: item.severity || "中",
    order: item.order || item.orderId || "关联工单待同步",
    dispatch: item.dispatch || item.dispatchId || "关联派工待同步",
    line: item.line || "关联产线待同步",
    station: item.station || "关联工位待同步",
    source: item.source || "统一业务流派生",
    status: item.status || "待处理",
    action: item.action || item.next || "等待责任人处置",
    owner: item.owner || "异常协调员",
    impact: item.impact || item.risk || "影响范围待复核",
    sla: item.sla || "待评估",
    trace: item.trace || item.id || "业务流事件",
  };
}

function getDefinition() {
  return pageDefinitions[pageConfig.id];
}

function getVisibleRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((item) => {
    const text = `${item.id} ${item.type} ${item.severity} ${item.line} ${item.station} ${item.order} ${item.dispatch} ${item.source} ${item.status} ${item.owner} ${item.impact} ${item.action} ${item.trace}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && lineMatch;
  });
}

function getActive() {
  return rows.find((item) => item.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function statusStyle(text) {
  if (/停线|超时|故障|异常|待判|待派|待分级|待审批|待到场|待替代|已停线/.test(text)) return "red";
  if (/处理中|观察|围堵|执行|调拨|恢复|审批|验证|待响应|待恢复/.test(text)) return "orange";
  if (/已|完成|缓解|解除|验收/.test(text)) return "green";
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "异常单"} / ${rows[0]?.station || "工位"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
  ensureFocusPanel();
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    metricTwo(visible),
    metricThree(visible),
    metricFour(visible),
  ];
  $("#exceptionMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "随异常状态和业务联动结果变化" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function ensureFocusPanel() {
  if ($("#exceptionFocusPanel")) return;
  $("#exceptionMetrics").insertAdjacentHTML("afterend", `<section id="exceptionFocusPanel" class="exception-focus"></section>`);
}

function renderFocusPanel() {
  ensureFocusPanel();
  const active = getActive();
  const visible = getVisibleRows();
  const renderers = {
    report: renderReportFocus,
    pending: renderPendingFocus,
    lineStop: renderLineStopFocus,
    shortage: renderShortageFocus,
    quality: renderQualityFocus,
    equipment: renderEquipmentFocus,
    review: renderReviewFocus,
  };
  $("#exceptionFocusPanel").className = `exception-focus exception-focus--${pageConfig.id}`;
  $("#exceptionFocusPanel").innerHTML = renderers[pageConfig.id](active, visible) + renderFocusMeta(active);
  $("#exceptionFocusPanel").querySelectorAll("[data-focus-id]").forEach((item) => {
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
    <div class="focus-meta" aria-label="当前异常闭环摘要">
      <article><span>异常来源</span><strong>${active.source}</strong></article>
      <article><span>责任人与 SLA</span><strong>${active.owner} · ${active.sla}</strong></article>
      <article><span>影响对象</span><strong>${active.order} / ${active.dispatch} · ${active.station}</strong></article>
      <article><span>追溯与边界</span><strong>${active.trace} · 模拟回执不替代现场处置</strong></article>
    </div>
  `;
}

function renderReportFocus(active, visible) {
  const sources = ["设备异常", "质量异常", "缺料异常", "工艺异常"];
  return `
    <div class="focus-head"><div><h2>异常来源分级</h2><p>把工位终端、PDA、Andon、PLC 和人工确认的事实先分级再派单。</p></div>${pill(active.severity)}</div>
    <div class="source-grid">${sources.map((source) => {
      const item = visible.find((row) => row.type === source);
      return sourceTile(item, source);
    }).join("")}</div>
  `;
}

function renderPendingFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>SLA 处置队列</h2><p>按剩余时间、当前状态和责任人组织响应、升级、恢复验证和关闭前校验。</p></div><strong>${active.sla}</strong></div>
    <div class="sla-board">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${statusStyle(item.status)} ${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.sla}</span><strong>${item.id}</strong><em>${item.type} · ${item.owner}</em>${pill(item.status)}
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有待处理异常")}</div>
  `;
}

function renderLineStopFocus(active, visible) {
  const gates = ["申请", "审批", "锁定", "恢复验证"];
  return `
    <div class="focus-head"><div><h2>停线授权门</h2><p>停线和恢复必须保留触发异常、锁定范围、审批责任和排程影响。</p></div>${pill(active.status)}</div>
    <div class="line-stop-gates">${gates.map((gate, index) => `
      <article class="${index <= getLineStopStep(active.status) ? "is-current" : ""}">
        <span>${gate}</span><strong>${index === 0 ? active.source : index === 1 ? active.owner : index === 2 ? active.impact : active.action}</strong>
      </article>
    `).join("")}</div>
    <div class="focus-strip">${visible.map((item) => focusChip(item, `${item.line} · ${item.status}`)).join("")}</div>
  `;
}

function renderShortageFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>缺料处置路径</h2><p>把断料影响、调拨、替代料、采购催料和计划调整放到同一事实链上。</p></div><strong>${active.line}</strong></div>
    <div class="shortage-path">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.id}</span><strong>${item.impact}</strong><em>${item.action}</em>${pill(item.status)}
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有缺料处置记录")}</div>
  `;
}

function renderQualityFocus(active, visible) {
  const lanes = [
    ["围堵隔离", /围堵|隔离|停线|MRB|待判/],
    ["复判处置", /供应商|MRB|返工|让步|复检/],
    ["CAPA 入口", /CAPA|8D|纠正|预防|工艺/],
  ];
  return `
    <div class="focus-head"><div><h2>质量围堵与 MRB</h2><p>突出不良对象、隔离范围、MRB 判定、返工/让步和 CAPA 闭环。</p></div>${pill(active.status)}</div>
    <div class="quality-lanes">${lanes.map(([title, rule]) => `
      <section><h3>${title}</h3>${visible.filter((item) => rule.test(item.status + item.action + item.impact)).map((item) => focusChip(item, `${item.type} · ${item.owner}`)).join("") || "<p>暂无记录</p>"}</section>
    `).join("")}</div>
  `;
}

function renderEquipmentFocus(active, visible) {
  return `
    <div class="focus-head"><div><h2>维修响应闭环</h2><p>从 PLC/SCADA/扫码报修到维修到场、备件、试运行、验收和 OEE 回写。</p></div><strong>${active.owner}</strong></div>
    <div class="repair-board">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${statusStyle(item.status)} ${item.id === state.activeId ? "is-active" : ""}">
        <span>${item.station}</span><strong>${item.status}</strong><em>${item.action}</em><small>${item.sla}</small>
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有设备故障记录")}</div>
  `;
}

function renderReviewFocus(active, visible) {
  const steps = ["RCA", "CAPA", "执行", "有效性验证"];
  return `
    <div class="focus-head"><div><h2>RCA / CAPA 复盘</h2><p>重大或重复异常要沉淀根因、纠正预防、责任人和复发验证。</p></div>${pill(active.status)}</div>
    <div class="review-board">${visible.length ? visible.map((item) => `
      <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
        <div>${steps.map((step, index) => `<span class="${index <= getReviewStep(item.status) ? "is-done" : ""}">${step}</span>`).join("")}</div>
        <strong>${item.id}</strong><em>${item.action}</em>
      </article>
    `).join("") : emptyFocus("当前筛选条件下没有复盘记录")}</div>
  `;
}

function sourceTile(item, fallback) {
  if (!item) return `<article><span>${fallback}</span><strong>暂无</strong><em>等待模拟外部异常回执</em></article>`;
  return `
    <article data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}">
      <span>${item.type}</span><strong>${item.id}</strong><em>${item.source}</em>${pill(item.status)}
    </article>
  `;
}

function focusChip(item, hint) {
  return `<button type="button" data-focus-id="${item.id}" class="${item.id === state.activeId ? "is-active" : ""}"><span>${item.id}</span><strong>${hint}</strong>${pill(item.status)}</button>`;
}

function emptyFocus(text) {
  return `<article class="focus-empty"><strong>${text}</strong><em>请调整搜索、状态或产线筛选</em></article>`;
}

function getLineStopStep(status) {
  if (/已恢复|待恢复/.test(status)) return 3;
  if (/已锁定|已停线/.test(status)) return 2;
  if (/审批|已审批/.test(status)) return 1;
  return 0;
}

function getReviewStep(status) {
  if (/已验证|已关闭/.test(status)) return 3;
  if (/待验证|执行|改善/.test(status)) return 2;
  if (/CAPA|措施/.test(status)) return 1;
  return 0;
}

function metricTwo(items) {
  if (pageConfig.id === "equipment") return items.filter((item) => /待到场|待派/.test(item.status)).length;
  if (pageConfig.id === "review") return items.filter((item) => /RCA 待补/.test(item.status)).length;
  return items.filter((item) => /待|超时|MRB|隔离/.test(item.status)).length;
}

function metricThree(items) {
  if (pageConfig.id === "lineStop") return items.filter((item) => /锁定|停线/.test(item.status)).length;
  if (pageConfig.id === "shortage") return items.filter((item) => /替代/.test(item.status + item.action)).length;
  return items.filter((item) => /处理|维修|执行|围堵|调拨/.test(item.status + item.action)).length;
}

function metricFour(items) {
  if (pageConfig.id === "equipment") return items.reduce((sum, item) => sum + (item.severity === "停线" ? 25 : /停机/.test(item.impact) ? 18 : 0), 0);
  return items.filter((item) => /停线|验证|已缓解|已验证|CAPA|恢复/.test(item.severity + item.status + item.action)).length;
}

function renderTable() {
  const visible = getVisibleRows();
  $("#exceptionTableBody").innerHTML = visible.length ? visible.map((item) => {
    const cells = buildCells(item);
    return `
      <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
        ${cells.map((cell) => `<td>${cell}</td>`).join("")}
      </tr>
    `;
  }).join("") : `<tr><td colspan="8">当前筛选条件下没有${pageConfig.title}记录</td></tr>`;
  $("#exceptionTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
}

function buildCells(item) {
  if (pageConfig.id === "report") return [item.id, twoLine(item.source, item.type), twoLine(item.order, item.dispatch), `${item.line} / ${item.station}`, pill(item.severity), pill(item.status), item.action, item.owner];
  if (pageConfig.id === "pending") return [item.id, twoLine(item.type, item.severity), twoLine(item.order, item.dispatch), item.sla, pill(item.status), item.action, item.impact, item.owner];
  if (pageConfig.id === "lineStop") return [item.id, item.source, `${item.line} / ${item.station}`, item.impact, pill(item.status), item.action, item.trace, item.owner];
  if (pageConfig.id === "shortage") return [item.id, twoLine(item.type, item.trace), twoLine(item.order, item.dispatch), item.impact, pill(item.status), item.action, item.trace, item.owner];
  if (pageConfig.id === "quality") return [item.id, twoLine(item.type, item.trace), twoLine(item.order, item.dispatch), item.source, pill(item.status), item.impact, item.action, item.owner];
  if (pageConfig.id === "equipment") return [item.id, twoLine(item.station, item.source), twoLine(item.order, item.dispatch), item.impact, pill(item.status), item.action, item.trace, item.owner];
  if (pageConfig.id === "review") return [item.id, twoLine(item.source, item.severity), item.rootCause || item.impact, item.correction || item.action, item.prevention || item.trace, twoLine(item.dueAt || item.sla, pill(item.status)), item.verificationResult || item.action, item.owner];
  return [item.id, item.source, item.impact, item.type, pill(item.status), item.action, item.trace, item.owner];
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
    ["状态来源", active.source, "保留现场终端、设备、质量、物料或人工确认的来源证据"],
    ["后台边界", getBoundaryText(), "后台负责受理、派单、审批、追踪、验证和追溯"],
    ["闭环结果", active.action, "联动停线、冻结、维修、NCR、重排、CAPA 或复盘"],
  ];
  $("#exceptionCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="exception-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  if (pageConfig.id === "lineStop") return "模拟停线/恢复信号和审批回执，后台不直接启停产线";
  if (pageConfig.id === "shortage") return "模拟 WMS、线边库和采购到货回执，后台不移动实物物料";
  if (pageConfig.id === "quality") return "模拟 IPQC、检验台或 QMS 判定回执，后台不替代现场检验";
  if (pageConfig.id === "equipment") return "模拟 PLC、SCADA 或维修移动端回执，后台不直接维修设备";
  if (pageConfig.id === "review") return "模拟 CAPA 验证回执，后台沉淀复盘结论和知识";
  return "模拟现场终端、PDA、Andon 或设备信号回传，后台不替代现场动作";
}

function renderDetail() {
  const active = getActive();
  $("#exceptionDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.type} · ${active.line} · ${active.station}`;
  $("#detailKv").innerHTML = [
    ["严重等级", active.severity],
    ["关联单据", `${active.order} / ${active.dispatch}`],
    ["来源", active.source],
    ["SLA/时间", active.sla],
    ["责任人", active.owner],
    ["影响说明", active.impact],
    ...(pageConfig.id === "review" ? [["RCA 根因", active.rootCause], ["关闭期限", active.dueAt]] : []),
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#timelineList").innerHTML = buildTimeline(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#actionList").innerHTML = buildActions(active).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("") + renderManualActions(active);
  $("#actionList").querySelectorAll("[data-manual-action]").forEach((button) => {
    button.addEventListener("click", () => runManualAction(button.dataset.manualAction));
  });
  renderLogs();
}

function buildTimeline(active) {
  if (pageConfig.id === "review") {
    return [
      ["来源事件", active.source],
      ["RCA 根因", active.rootCause || "待补充"],
      ["纠正措施", active.correction || "待制定"],
      ["预防措施", active.prevention || "待制定"],
      ["期限与状态", `${active.dueAt || active.sla} · ${active.status}`],
      ["验证结果", active.verificationResult || "待验证"],
      ["追溯引用", active.trace],
    ];
  }
  return [
    ["异常触发", active.source],
    ["分级派单", `${active.severity} · ${active.owner}`],
    ["当前状态", `${active.status} · ${active.sla}`],
    ["追溯引用", active.trace],
  ];
}

function buildActions(active) {
  if (pageConfig.id === "review") {
    return [
      ["当前处置", active.action],
      ["RCA", active.rootCause || "待责任人补齐 5Why / 鱼骨图结论"],
      ["纠正措施", active.correction || "待制定纠正措施"],
      ["预防措施", active.prevention || "待制定预防措施"],
      ["有效性验证", active.verificationResult || "关闭前需验证措施有效性"],
      ["关闭/升级规则", /已关闭|已验证/.test(active.status) ? "已形成关闭证据，继续复发观察" : "逾期或验证失败需升级责任主管"],
    ];
  }
  const result = [
    ["生产联动", `${active.order} / ${active.dispatch} / ${active.station}`],
    ["临时措施", active.action],
    ["恢复验证", /已|缓解|验证|验收/.test(active.status) ? "已形成恢复或有效性验证记录" : "关闭前需验证质量、设备、物料、排程和现场状态"],
  ];
  if (/停线/.test(active.severity + active.status)) result.push(["停线影响", "需同步 APS 产能日历、停机记录和班次交接"]);
  if (/质量|NCR|MRB|CAPA/.test(active.type + active.action + active.trace)) result.push(["质量衔接", "保留隔离、复判、返工或让步接收入口"]);
  if (/设备|维修|PLC|SCADA/.test(active.type + active.action + active.source)) result.push(["设备衔接", "回写维修工单、试运行验收、停机归因和 OEE"]);
  if (/缺料|WMS|调拨|替代/.test(active.type + active.action + active.source)) result.push(["物料衔接", "同步线边库、WMS、采购到货、替代料和计划调整"]);
  return result;
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 8).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong>${log.beforeAfter ? `<em>${log.beforeAfter}</em>` : ""}</div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟回执或临时措施记录</strong></div>`;
}

function renderAll() {
  mergeFlowRows();
  renderMetrics();
  renderFocusPanel();
  renderTable();
  renderCards();
  renderDetail();
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  if (status.includes("已响应")) active.sla = "已记录响应时间";
  if (status.includes("已审批")) active.action = "审批通过，等待现场恢复验证";
  if (status.includes("已缓解")) active.action = "临时措施已生效，进入关闭验证";
  if (status.includes("已验证")) active.action = "验证通过，进入复盘或归档";
  window.MES_BUSINESS_FLOW?.applyExceptionAction?.(active, /已验证|已验收/.test(status) ? "exceptionClose" : "exceptionAdvance", {
    status,
    owner: active.owner,
    result: active.action || active.risk,
  });
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderAll();
}

function renderManualActions(active) {
  const actions = getManualActions(active);
  return `
    <div class="manual-audit">
      <span>强审计维护</span>
      <strong>责任人、时间戳、关联单据、前后值摘要和操作记录写入 localStorage</strong>
      <div class="manual-action-row">
        ${actions.map((action) => `<button type="button" class="${action.danger ? "danger-action" : ""}" data-manual-action="${action.key}">${action.label}</button>`).join("")}
      </div>
    </div>
  `;
}

function getManualActions(active = getActive()) {
  const common = [
    { key: "edit", label: "编辑处置说明" },
    { key: "history", label: "查看履历" },
  ];
  const map = {
    report: [{ key: "new", label: "新建异常" }, { key: "dispatch", label: "派单" }, { key: "withdraw", label: "撤回草稿", danger: true }],
    pending: [{ key: "accept", label: "接单" }, { key: "transfer", label: "转派" }, { key: "escalate", label: "升级" }, { key: "close", label: "恢复验证关闭", danger: true }],
    lineStop: [{ key: "newStop", label: "新建停线申请" }, { key: "approve", label: "审批锁定" }, { key: "release", label: "解除停线", danger: true }],
    shortage: [{ key: "dispatch", label: "派单催料" }, { key: "compensate", label: "调拨/替代补偿" }, { key: "close", label: "关闭缺料", danger: true }],
    quality: [{ key: "contain", label: "隔离围堵" }, { key: "mrb", label: "MRB 审批" }, { key: "close", label: "关闭 CAPA", danger: true }],
    equipment: [{ key: "dispatch", label: "派维修" }, { key: "acceptance", label: "试运行验收" }, { key: "close", label: "验收关闭", danger: true }],
    review: [{ key: "newReview", label: "新建 CAPA/8D" }, { key: "rca", label: "补齐 RCA" }, { key: "capa", label: "分派纠正预防" }, { key: "verifyCapa", label: "验证措施" }, { key: "archive", label: "关闭/归档 CAPA", danger: true }],
  };
  return [...(map[pageConfig.id] || []), ...common].filter((action) => action.key !== "close" || !/已关闭|已归档/.test(active?.status || ""));
}

function runManualAction(key) {
  const active = getActive();
  if (!active) return;
  const action = getManualActions(active).find((item) => item.key === key) || { label: key };
  if (action.danger && !confirmDanger(action.label, active.id)) return;
  const before = `${active.status} / ${active.action}`;
  const result = buildManualResult(key, action.label);
  active.status = result.status || active.status;
  active.action = result.action || active.action;
  const beforeAfter = `前：${before}；后：${active.status} / ${active.action}`;
  window.MES_BUSINESS_FLOW?.applyExceptionAction?.(active, `manual-${key}`, {
    status: active.status,
    owner: active.owner,
    result: active.action,
    beforeAfter,
    document: `${active.order} / ${active.dispatch}`,
  });
  appendLog(`${active.id} ${action.label}已登记，责任人：${active.owner}`, beforeAfter);
  saveState();
  renderAll();
  showToast(`${action.label}已留痕`);
}

function buildManualResult(key, label) {
  const statusMap = {
    new: "草稿", dispatch: "已派单", withdraw: "已撤回", accept: "已响应", transfer: "已转派", escalate: "已升级",
    close: "已关闭", newStop: "待审批", approve: "已审批", release: "已解除", compensate: "补偿中",
    contain: "围堵中", mrb: "MRB 审批中", acceptance: "待验收", newReview: "CAPA 草稿", rca: "RCA 已补齐", capa: "措施执行中", verifyCapa: "待验证", archive: "已关闭",
    edit: "人工复核", history: undefined,
  };
  const active = getActive();
  if (pageConfig.id === "review" && key === "rca" && active) active.rootCause = active.rootCause && !active.rootCause.includes("待确认") ? active.rootCause : "已补齐 5Why：准入规则未覆盖校准/治具风险，责任部门已签核";
  if (pageConfig.id === "review" && key === "capa" && active) {
    active.correction = active.correction || "纠正措施已分派到责任班组";
    active.prevention = active.prevention || "预防措施已纳入准入规则和点检标准";
  }
  if (pageConfig.id === "review" && key === "verifyCapa" && active) active.verificationResult = "模拟验证通过，等待责任主管关闭";
  return { status: statusMap[key], action: `${label}：已记录原因、责任人、期限、关联单据和 CAPA/8D 证据` };
}

function confirmDanger(label, id) {
  return window.confirm(`${label}属于危险动作，将写入审计记录且不可无痕删除。确认处理 ${id}？`);
}

function nextStatus() {
  const map = {
    report: "已派单",
    pending: "已响应",
    lineStop: "已审批",
    shortage: "已缓解",
    quality: "MRB 已判定",
    equipment: "已验收",
    review: "已验证",
  };
  return map[pageConfig.id] || "已处理";
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  updateActiveStatus(nextStatus(), `${getActive().id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟回执已记录");
}

function registerMeasure() {
  const active = getActive();
  if (!active) return;
  active.action = pageConfig.id === "shortage" ? "已登记调拨/替代料临时措施，等待验证" : "已登记围堵、隔离、维修或现场确认临时措施";
  window.MES_BUSINESS_FLOW?.applyExceptionAction?.(active, "temporaryMeasure", {
    status: active.status,
    owner: active.owner,
    result: active.action,
  });
  appendLog(`${active.id} 已登记临时措施，责任人：${active.owner}`);
  saveState();
  renderAll();
  showToast("临时措施已登记");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone([...(window.MES_BUSINESS_FLOW?.getExceptionRows?.(pageConfig.id) || []), ...initialRows[pageConfig.id]]);
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

function appendLog(text, beforeAfter = "") {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text, beforeAfter });
  logs = logs.slice(0, 20);
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
  $("#resetExceptionsBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", simulateStatus);
  $("#secondaryActionBtn").addEventListener("click", registerMeasure);
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
