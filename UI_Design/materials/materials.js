const pageConfig = window.MATERIAL_PAGE || { id: "requirements", title: "用料需求", eyebrow: "物料与线边库 / 用料需求" };
const STORAGE_KEY = `xingjigu_mes_materials_${pageConfig.id}_v2`;

const modules = window.MES_NAV_MODULES || [];

const materialPages = {
  用料需求: "material-requirements.html",
  领料申请: "picking-requests.html",
  配送进度: "delivery-progress.html",
  线边库存: "line-side-inventory.html",
  投料记录: "feeding-records.html",
  余料退回: "return-materials.html",
  缺料预警: "shortage-alerts.html",
};

const pageDefinitions = {
  requirements: {
    subtitle: "排程、派工和 BOM 生成工序级物料需求，向领料、配送和开工检查传递可执行口径",
    user: "物料计划员",
    metrics: ["需求行", "缺口行", "已锁库", "待转领料"],
    columns: ["需求单", "工单 / 工序", "物料 / 批次规则", "需求时间", "需求 / 可用", "缺口", "状态", "责任人"],
    tableTitle: "工序级用料需求",
    tableHint: "来源于生产排程、派工单和 BOM 版本，支持转领料与催料",
    cardTitle: "需求来源与下游联动",
    simulationTitle: "模拟 APS / 派工需求刷新",
    simulationHint: "模拟外部排程或派工变更后重新计算需求，不代表后台直接执行生产动作",
  },
  picking: {
    subtitle: "MES 生成领料指令，兼容有 WMS 的出库回执和无 WMS 的 MES 库存出库登记，物料员跟踪审批、拣货差异和线边配送",
    user: "仓储协调员",
    metrics: ["申请单", "待审批", "拣货中", "异常驳回"],
    columns: ["申请单", "工单 / 派工", "物料", "申请 / 已发", "WMS 状态", "单据来源", "异常", "责任人"],
    tableTitle: "领料申请与 WMS 回执",
    tableHint: "有 WMS 时接收模拟出库回执；无 WMS 时登记 MES 领料出库记录，均不替代仓库实物拣货",
    cardTitle: "审批、拣货与出库链路",
    simulationTitle: "模拟 WMS 回执 / MES 出库登记",
    simulationHint: "模拟 WMS、PDA 或无 WMS 场景的 MES 库存出库登记，页面只记录状态、批次、库位、责任人和差异",
  },
  delivery: {
    subtitle: "从仓库发料到线边签收，跟踪配送单、到站库位、超时和异常处置",
    user: "配送协调员",
    metrics: ["配送单", "在途", "已签收", "超时异常"],
    columns: ["配送单", "工单 / 产线", "物料批次", "起点 / 终点", "计划 / 实际", "配送状态", "签收来源", "责任人"],
    tableTitle: "配送进度监控",
    tableHint: "接收仓库 PDA、AGV 或人工配送模拟回执，支撑线边库签收",
    cardTitle: "配送、签收和异常链路",
    simulationTitle: "模拟 PDA / AGV 配送回执",
    simulationHint: "模拟外部配送设备或 PDA 回传，不表示后台直接移动实物",
  },
  inventory: {
    subtitle: "监控线边库位、批次、IQC、冻结、有效期和补料建议，支撑工位开工与投料",
    user: "线边库管理员",
    metrics: ["库位批次", "低水位", "冻结批次", "待补料"],
    columns: ["库位", "工单 / 工位", "物料 / 批次", "账面 / 可用", "质量状态", "有效期", "库存状态", "责任人"],
    tableTitle: "线边库存批次",
    tableHint: "后台监控、冻结和发起补料，不替代现场扫码投料",
    cardTitle: "库位、质量和补料联动",
    simulationTitle: "模拟线边库 PDA 盘点回传",
    simulationHint: "模拟 PDA/NFC/电子标签回传盘点状态，后台只登记回执和差异",
  },
  feeding: {
    subtitle: "接收工位投料确认回执，校验料号、批次、IQC、库位和用量，形成追溯引用",
    user: "物料追溯员",
    metrics: ["投料笔数", "已放行", "拦截", "差异待核销"],
    columns: ["投料记录", "派工 / 工位", "物料 / 批次", "扫码对象", "投料量", "校验结果", "追溯引用", "责任人"],
    tableTitle: "投料回执与批次消耗",
    tableHint: "来自工位终端、扫码枪、PDA 和称重设备的模拟回传",
    cardTitle: "投料、防错和追溯链路",
    simulationTitle: "模拟工位投料回执同步",
    simulationHint: "模拟扫码枪/PDA/称重设备回传，后台只做校验、拦截和记录",
  },
  returns: {
    subtitle: "完工、换线或用料差异触发余料退回，兼容 WMS 入库回执和无 WMS 的 MES 退料入库登记，完成标签、称重、签收和核销",
    user: "退料审核员",
    metrics: ["退料单", "待称重", "待签收", "已核销"],
    columns: ["退料单", "工单 / 来源", "物料 / 余料标签", "申请 / 实收", "退回原因", "WMS 回执", "核销状态", "责任人"],
    tableTitle: "余料退回与核销",
    tableHint: "关联投料差异、完工报工、仓库入库回执或 MES 手工库存记录",
    cardTitle: "退料、称重和核销链路",
    simulationTitle: "模拟 PDA / 电子秤 / MES 退料入库回执",
    simulationHint: "模拟现场 PDA、电子秤、WMS 入库或无 WMS 的 MES 退料入库登记，后台只记录核销状态和追溯引用",
  },
  shortage: {
    subtitle: "综合排程、库存、配送和线边消耗触发缺料预警，协同调拨、替代料、排程调整和异常闭环",
    user: "物料异常协调员",
    metrics: ["预警", "影响工单", "4 小时内断料", "已升级"],
    columns: ["预警单", "影响工单 / 工序", "缺口物料", "预计断料", "缺口", "处置动作", "异常闭环", "责任人"],
    tableTitle: "缺料预警与处置",
    tableHint: "向异常处理、计划调整和采购到货跟进传递同一缺料事实",
    cardTitle: "预警、处置和闭环链路",
    simulationTitle: "模拟库存 / 配送消耗刷新",
    simulationHint: "模拟库存、配送或线边消耗回传后重算断料时间，不直接调整排程",
  },
};

const initialRows = {
  requirements: [
    { id: "MR-0001", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT 贴片", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "按排程锁定批次", qty: 1000, available: 800, gap: 200, time: "06-20 10:30", status: "缺口待催料", owner: "物料员 吴琳", source: "生产排程 APS + BOM TCU-100 V3.2", next: "转领料申请", risk: "影响 Line-A DIP 开工准入" },
    { id: "MR-0002", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT 贴片", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "先进先出 + IQC 合格", qty: 4800, available: 5000, gap: 0, time: "06-20 13:00", status: "已锁库", owner: "物料员 周青", source: "派工单 D-021 + BOM GW-240 V2.1", next: "等待拣货", risk: "可覆盖首批 600 台" },
    { id: "MR-0003", order: "MO-202606-0005", dispatch: "D-052", operation: "备料确认", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "客户 D 指定批次", qty: 900, available: 740, gap: 160, time: "06-20 15:00", status: "缺口待替代", owner: "物料主管 何敏", source: "计划调整 + BOM PCM-60 V1.8", next: "发起替代料评估", risk: "影响紧急订单交期" },
    { id: "MR-0004", order: "MO-202606-0011", dispatch: "D-111", operation: "包装入库", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "按客户标签版本", qty: 1800, available: 1830, gap: 0, time: "06-20 16:20", status: "待转领料", owner: "物料员 陈洁", source: "包装派工 + 标签版本 V1.4", next: "生成领料申请", risk: "多领 30 件需余料退回" },
  ],
  picking: [
    { id: "PK-0001", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT 贴片", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", qty: 800, available: 620, gap: 180, time: "06-20 09:40", status: "拣货中", owner: "仓管员 梁启", source: "MES 领料指令 MR-0001", next: "模拟 WMS 出库", risk: "二批待采购到货" },
    { id: "PK-0002", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT 贴片", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260604", qty: 4800, available: 4800, gap: 0, time: "06-20 10:10", status: "已出库", owner: "仓管员 谢然", source: "WMS 出库单 WO-3912", next: "进入配送", risk: "无" },
    { id: "PK-0003", order: "MO-202606-0005", dispatch: "D-052", operation: "备料确认", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 740, available: 0, gap: 160, time: "06-20 11:30", status: "异常驳回", owner: "物料主管 何敏", source: "WMS 库存冻结回执", next: "替代料审批", risk: "指定批次冻结 160 件" },
    { id: "PK-0004", order: "MO-202606-0011", dispatch: "D-111", operation: "包装入库", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 1800, available: 0, gap: 0, time: "06-20 14:20", status: "待审批", owner: "仓储主管 孙奕", source: "包装派工 D-111", next: "审批后拣货", risk: "标签版本需复核" },
  ],
  delivery: [
    { id: "DL-0001", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT 贴片", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", qty: 620, available: 620, gap: 180, time: "计划 10:50 / 实际 --", status: "在途", owner: "配送员 罗峰", source: "WMS 出库 WO-3908", next: "线边 LS-A-01 签收", risk: "超过 20 分钟升级" },
    { id: "DL-0002", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT 贴片", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260604", qty: 4800, available: 4800, gap: 0, time: "计划 10:30 / 实际 10:26", status: "已签收", owner: "班组长 郑峰", source: "模拟 PDA 签收", next: "进入线边库存", risk: "已绑定 SMT-FEEDER-12" },
    { id: "DL-0003", order: "MO-202606-0005", dispatch: "D-052", operation: "备料确认", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 740, available: 0, gap: 160, time: "计划 12:00 / 实际 --", status: "异常停滞", owner: "仓库主管 马岩", source: "冻结批次未放行", next: "缺料预警", risk: "影响 15:00 开工" },
    { id: "DL-0004", order: "MO-202606-0011", dispatch: "D-111", operation: "包装入库", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 1800, available: 1800, gap: 0, time: "计划 15:20 / 实际 15:18", status: "已签收", owner: "包装班长 李娟", source: "模拟 AGV 到站回执", next: "包装工位签收", risk: "余料需完工退回" },
  ],
  inventory: [
    { id: "LS-A-01-02", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT-WS-01", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", qty: 620, available: 600, gap: 200, time: "有效期 2026-12-31", status: "低水位", owner: "线边库管 吴琳", source: "模拟 PDA 签收 + WMS 出库", next: "触发补料", risk: "预计 16:10 断料" },
    { id: "SMT-FEEDER-12", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT-WS-02", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260604", qty: 4800, available: 4550, gap: 0, time: "有效期 2027-01-20", status: "可投料", owner: "班组长 郑峰", source: "模拟料站绑定回执", next: "投料确认", risk: "无" },
    { id: "LS-B-03-01", order: "MO-202606-0005", dispatch: "D-052", operation: "备料区", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 740, available: 0, gap: 160, time: "有效期 2026-09-30", status: "冻结", owner: "质量员 孟可", source: "IQC 冻结回执", next: "等待放行或替代", risk: "不可投料" },
    { id: "PACK-C-02", order: "MO-202606-0011", dispatch: "D-111", operation: "PACK-WS-02", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 1800, available: 130, gap: 0, time: "有效期 2026-08-15", status: "余料待退", owner: "包装班长 李娟", source: "完工报工差异", next: "余料退回", risk: "多领 30 件待核销" },
  ],
  feeding: [
    { id: "FD-0001", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT-WS-01", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", qty: 400, available: 400, gap: 0, time: "10:58", status: "已放行", owner: "操作员 刘洋", source: "模拟扫码枪批次回传", next: "批次谱系追溯", risk: "料号、批次、IQC、库位通过" },
    { id: "FD-0002", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT-WS-02", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260528", qty: 0, available: 0, gap: 0, time: "09:12", status: "已拦截", owner: "班组长 郑峰", source: "模拟批次标签扫码", next: "解除拦截后重扫", risk: "批次与派工锁定不一致" },
    { id: "FD-0003", order: "MO-202606-0011", dispatch: "D-111", operation: "PACK-WS-02", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 1670, available: 130, gap: 0, time: "15:40", status: "差异待核销", owner: "包装班长 李娟", source: "模拟电子秤回传", next: "余料退回", risk: "余料 130 件待退库" },
    { id: "FD-0004", order: "MO-202606-0005", dispatch: "D-052", operation: "ASM-WS-04", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 0, available: 0, gap: 160, time: "待回执", status: "待投料", owner: "物料员 何敏", source: "线边冻结批次", next: "缺料处置", risk: "冻结批次不可投料" },
  ],
  returns: [
    { id: "RT-0001", order: "MO-202606-0011", dispatch: "D-111", operation: "PACK-WS-02", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 130, available: 130, gap: 0, time: "16:10", status: "待签收", owner: "仓管员 谢然", source: "投料差异 FD-0003", next: "模拟 WMS 入库", risk: "需核销多领 30 件" },
    { id: "RT-0002", order: "MO-202606-0004", dispatch: "D-041", operation: "FQC 检验", line: "Line-A", material: "外壳上盖", materialNo: "MAT-CASE-A", batch: "CASE-A-L20260610", qty: 42, available: 42, gap: 0, time: "11:20", status: "已核销", owner: "仓储主管 孙奕", source: "完工确认", next: "追溯已引用", risk: "无" },
    { id: "RT-0003", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT-WS-02", line: "Line-B", material: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260604", qty: 250, available: 250, gap: 0, time: "10:55", status: "待称重", owner: "班组长 郑峰", source: "换线退料", next: "模拟电子秤称重", risk: "需确认尾料重量" },
    { id: "RT-0004", order: "MO-202606-0005", dispatch: "D-052", operation: "备料区", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 160, available: 0, gap: 160, time: "待处理", status: "冻结待退", owner: "质量员 孟可", source: "IQC 冻结", next: "冻结退库审核", risk: "关联缺料预警" },
  ],
  shortage: [
    { id: "SA-0001", order: "MO-202606-0001", dispatch: "D-001", operation: "DIP 插件", line: "Line-A", material: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", qty: 200, available: 0, gap: 200, time: "预计 16:10 断料", status: "已升级", owner: "物料主管 何敏", source: "排程需求 + 线边消耗", next: "调拨或采购催料", risk: "影响 Line-A 第二批开工" },
    { id: "SA-0002", order: "MO-202606-0005", dispatch: "D-052", operation: "备料确认", line: "Line-B", material: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", qty: 160, available: 0, gap: 160, time: "预计 15:00 无法开工", status: "待替代审批", owner: "计划主管 李敏", source: "WMS 冻结 + 齐套检查", next: "替代料审批 / 排程调整", risk: "紧急订单交期风险" },
    { id: "SA-0003", order: "MO-202606-0011", dispatch: "D-111", operation: "包装入库", line: "Line-C", material: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", qty: 0, available: 130, gap: 0, time: "无断料", status: "已解除", owner: "包装班长 李娟", source: "配送签收 + 余料退回", next: "完工核销", risk: "余料待退，不影响生产" },
    { id: "SA-0004", order: "MO-202606-0012", dispatch: "D-121", operation: "首件检验", line: "Line-B", material: "触控屏组件", materialNo: "MAT-HMI-LCD", batch: "LCD-L20260608", qty: 40, available: 20, gap: 20, time: "预计 18:30 断料", status: "观察中", owner: "物料员 周青", source: "线边低水位 + 排程剩余量", next: "班内调拨", risk: "首件后续批量可能受影响" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.materials || {});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true };
let logs = [];
let maintenanceRecords = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#materialsModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "materials" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "materials" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#materialsModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#materialsModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
  else if (moduleId === "materials" && materialPages[entry]) window.location.href = `./${materialPages[entry]}`;
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
  const flowRows = window.MES_BUSINESS_FLOW?.getMaterialRows?.(pageConfig.id) || [];
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
    const text = `${item.id} ${item.order} ${item.dispatch} ${item.operation} ${item.line} ${item.material} ${item.materialNo} ${item.batch} ${item.status} ${item.owner} ${item.source} ${item.risk}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && lineMatch;
  });
}

function statusStyle(status) {
  if (/缺|异常|拦截|冻结|升级|驳回|超时/.test(status)) return "red";
  if (/待|在途|观察|审批|称重|签收|替代|催料/.test(status)) return "orange";
  if (/已|齐套|可投料|放行|解除|核销|出库/.test(status)) return "green";
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
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "单据号"} / ${rows[0]?.batch || "批次号"}`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => item.status.includes("待") || item.status.includes("在途") || item.status.includes("观察")).length,
    visible.filter((item) => item.status.includes("已") || item.status.includes("可投料")).length,
    visible.filter((item) => item.gap > 0 || /缺|异常|冻结|拦截|升级|驳回/.test(item.status)).length,
  ];
  $("#materialsMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "需跨计划、仓储或异常中心协同" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderBusinessFocus() {
  let focus = $("#materialsFocus");
  if (!focus) {
    focus = document.createElement("section");
    focus.id = "materialsFocus";
    focus.className = "materials-focus";
    $("#materialsMetrics").after(focus);
  }
  const active = getActive();
  const visible = getVisibleRows();
  const shortageRows = visible.filter((item) => item.gap > 0 || /缺|异常|冻结|拦截|低水位|驳回/.test(`${item.status} ${item.risk}`));
  const pathRows = visible.slice(0, 4);
  const slotRows = rows.filter((item) => item.line === active?.line).slice(0, 4);
  const modeMap = {
    requirements: ["需求缺口矩阵", "按工序需求、可用量和缺口判断是否转领料、调拨或缺料预警"],
    picking: ["领料与拣货队列", "按审批、WMS 回执和异常驳回跟踪领料单据，不替代仓库出库"],
    delivery: ["仓库到线边路径", "按配送起点、到站库位、超时和签收来源监控物料移动"],
    inventory: ["线边库位状态", "按库位、批次、IQC、冻结、有效期和低水位判断可投状态"],
    feeding: ["投料防错看板", "按扫码批次、BOM、IQC、库位和用量校验投料回执"],
    returns: ["退料核销链路", "按余料标签、模拟称重、WMS 入库和用料差异完成核销"],
    shortage: ["缺料影响分析", "按排程、库存、配送和线边消耗评估断料时间与责任闭环"],
  };
  const [title, hint] = modeMap[pageConfig.id] || modeMap.requirements;
  focus.innerHTML = `
    <div class="materials-focus__head">
      <div>
        <span>本页业务重点</span>
        <h2>${title}</h2>
        <p>${hint}</p>
      </div>
      <strong>${active?.order || "未选中"} · ${active?.line || "全部产线"}</strong>
    </div>
    <div class="materials-focus__grid">
      <article class="materials-gap-map">
        <span>缺口与影响</span>
        ${shortageRows.length ? shortageRows.slice(0, 3).map((item) => `
          <div>
            <strong>${item.material}</strong>
            <em>${item.gap > 0 ? `缺口 ${item.gap} 件` : item.status}</em>
            <small>${item.order} · ${item.risk}</small>
          </div>
        `).join("") : `<div><strong>当前筛选无关键缺口</strong><em>继续监控</em><small>刷新后仍保留需求、配送和投料回执</small></div>`}
      </article>
      <article class="materials-route-map">
        <span>${pageConfig.id === "delivery" ? "配送路径" : pageConfig.id === "inventory" ? "库位状态" : "单据路径"}</span>
        ${pathRows.map((item) => `
          <div>
            <b>${item.id}</b>
            <strong>${routeLabel(item)}</strong>
            <em>${item.status}</em>
          </div>
        `).join("")}
      </article>
      <article class="materials-slot-map">
        <span>库位 / 批次防错</span>
        ${slotRows.map((item) => `
          <div>
            <strong>${item.batch}</strong>
            <small>${lineLocation(item.line)} · ${item.source}</small>
          </div>
        `).join("")}
      </article>
    </div>
  `;
}

function routeLabel(item) {
  if (pageConfig.id === "delivery") return `仓库 -> ${lineLocation(item.line)} -> ${item.operation}`;
  if (pageConfig.id === "returns") return `${item.operation} -> 模拟称重 -> WMS 入库`;
  if (pageConfig.id === "feeding") return `${item.operation} -> 防错校验 -> 追溯引用`;
  if (pageConfig.id === "shortage") return `${item.source} -> ${item.next}`;
  return `${item.source} -> ${item.next}`;
}

function renderTable() {
  const visible = getVisibleRows();
  $("#materialsTableBody").innerHTML = visible.length ? visible.map((item) => {
    const cells = buildCells(item);
    return `
      <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
        ${cells.map((cell) => `<td>${cell}</td>`).join("")}
      </tr>
    `;
  }).join("") : `<tr><td colspan="8"><div class="empty-action">当前筛选条件下没有${pageConfig.title}记录 <button type="button" data-maintenance-action="create">新增维护单据</button></div></td></tr>`;
  $("#materialsTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#materialsTableBody").querySelectorAll("[data-maintenance-action]").forEach((button) => {
    button.addEventListener("click", () => handleMaintenanceAction(button.dataset.maintenanceAction));
  });
}

function buildCells(item) {
  if (pageConfig.id === "requirements") {
    return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.material, `${item.materialNo} · ${item.batch}`), item.time, `${item.qty} / ${item.available}`, `${item.gap} 件`, pill(item.status), item.owner];
  }
  if (pageConfig.id === "picking") {
    return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.material, item.batch), `${item.qty} / ${item.available}`, pill(item.status), item.source, item.risk, item.owner];
  }
  if (pageConfig.id === "delivery") {
    return [item.id, twoLine(item.order, `${item.line} · ${item.operation}`), twoLine(item.material, item.batch), `仓库 / ${lineLocation(item.line)}`, item.time, pill(item.status), item.source, item.owner];
  }
  if (pageConfig.id === "inventory") {
    return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.material, item.batch), `${item.qty} / ${item.available}`, item.source.includes("IQC") ? "IQC 冻结" : "IQC 合格", item.time, pill(item.status), item.owner];
  }
  if (pageConfig.id === "feeding") {
    return [item.id, twoLine(item.dispatch, `${item.operation}`), twoLine(item.material, item.batch), item.source, `${item.qty} PCS`, pill(item.status), item.next, item.owner];
  }
  if (pageConfig.id === "returns") {
    return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.material, item.batch), `${item.qty} / ${item.available}`, item.source, item.next, pill(item.status), item.owner];
  }
  return [item.id, twoLine(item.order, `${item.dispatch} · ${item.operation}`), twoLine(item.material, item.batch), item.time, `${item.gap} 件`, item.next, pill(item.status), item.owner];
}

function twoLine(main, sub) {
  return `<strong>${main}</strong><small>${sub}</small>`;
}

function pill(text) {
  return `<span class="pill pill--${statusStyle(text)}">${text}</span>`;
}

function lineLocation(line) {
  return { "Line-A": "LS-A-01", "Line-B": "LS-B-03", "Line-C": "PACK-C-02" }[line] || "线边库";
}

function renderCards() {
  const active = getActive();
  const cards = [
    ["上游来源", active.source, "保留排程、派工、BOM 或 WMS 回执来源"],
    ["现场边界", getBoundaryText(), "后台记录配置、监控、回执和异常处置"],
    ["下游衔接", active.next, "继续传递给开工检查、投料、异常或追溯"],
  ];
  $("#materialsCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="materials-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function getBoundaryText() {
  if (["feeding", "returns", "inventory"].includes(pageConfig.id)) return "现场扫码枪、PDA、NFC、电子秤或工位终端产生模拟回执";
  if (["picking", "delivery"].includes(pageConfig.id)) return "仓库 WMS、PDA、AGV 或人工配送产生模拟回执";
  return "排程、派工和 BOM 生成需求，后台不执行现场投料";
}

function renderDetail() {
  const active = getActive();
  $("#materialsDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.dispatch} · ${active.operation}`;
  $("#detailKv").innerHTML = [
    ["物料批次", `${active.material} · ${active.batch}`],
    ["产线工位", `${active.line} · ${active.operation}`],
    ["数量口径", `需求 ${active.qty} / 可用 ${active.available} / 缺口 ${active.gap}`],
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
    ["来源生成", active.source],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
    ["业务状态", `${active.status} · ${active.time}`],
    ["追溯占位", `${active.order} / ${active.dispatch} / ${active.batch}`],
  ];
}

function buildActions(active) {
  const common = [
    ["查看上游", pageConfig.id === "requirements" ? "生产排程 / 派工单 / BOM 版本" : "用料需求 / 领料申请 / 配送单"],
    ["异常处置", active.gap > 0 ? "可生成缺料异常、催料、调拨或替代料审批" : "当前无关键缺口，继续监控回执"],
    ["下游结果", active.next],
  ];
  if (pageConfig.id === "shortage") common.push(["计划联动", "必要时跳转计划调整并保留缺料预警依据"]);
  if (pageConfig.id === "feeding") common.push(["追溯联动", "批次消耗进入产品批次谱系和过程记录"]);
  if (pageConfig.id === "returns") common.push(["核销联动", "退料数量回写用料差异和 WMS 库存"]);
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
    requirements: ["补充需求", "生成领料建议", "关闭需求差异", "物料计划员 吴琳"],
    picking: ["领料申请", "审批并重推 WMS", "关闭领料差异", "仓储主管 孙奕"],
    delivery: ["配送异常", "改派并后台复核", "关闭签收异常", "配送协调员 罗峰"],
    inventory: ["库位调拨建议", "审批冻结/解冻", "关闭盘点差异", "线边库管理员 吴琳"],
    feeding: ["投料差异复核", "登记放行依据", "关闭用量差异", "物料追溯员 陈洁"],
    returns: ["退料申请", "复核称重差异", "关闭退料核销", "退料审核员 谢然"],
    shortage: ["缺料预警", "分派替代料审批", "关闭缺料预警", "物料异常协调员 何敏"],
  };
  const [create, process, close, owner] = map[pageConfig.id] || map.picking;
  return { create, process, close, owner };
}

function getActiveMaintenance() {
  return maintenanceRecords[0];
}

function renderMaintenancePanel() {
  let panel = $("#materialsMaintenancePanel");
  if (!panel) {
    panel = document.createElement("section");
    panel.id = "materialsMaintenancePanel";
    panel.className = "materials-panel maintenance-panel";
    document.querySelector(".materials-left .simulation-box")?.before(panel);
  }
  const active = getActive();
  const recipe = getMaintenanceRecipe();
  const current = getActiveMaintenance();
  panel.innerHTML = `
    <div class="materials-panel__head">
      <div>
        <h3>${pageConfig.title}手工维护闭环</h3>
        <p>后台只维护申请、审批、复核和差异关闭；现场投料、签收、称重、WMS 出入库均保留为模拟回执或外部回传。</p>
      </div>
    </div>
    <div class="maintenance-flow">
      <button type="button" data-maintenance-action="create">新增/生成 ${recipe.create}</button>
      <button type="button" data-maintenance-action="process"${current ? "" : " disabled"}>${recipe.process}</button>
      <button type="button" class="danger-action" data-maintenance-action="close"${current ? "" : " disabled"}>${recipe.close}</button>
    </div>
    <div class="maintenance-record">
      ${current ? `
        <div><span>维护单</span><strong>${current.id} · ${current.status}</strong></div>
        <div><span>关联单据</span><strong>${current.related}</strong></div>
        <div><span>责任/时间</span><strong>${current.owner} · ${current.time}</strong></div>
        <div><span>前后值摘要</span><strong>${current.before} -> ${current.after}</strong></div>
      ` : `
        <div><span>暂无维护单</span><strong>可基于 ${active?.id || pageConfig.title} 新增一条管理类单据</strong></div>
      `}
    </div>
    <div class="maintenance-log">
      ${maintenanceRecords.slice(0, 4).map((item) => `<div><span>${item.time}</span><strong>${item.id} ${item.action}：${item.status}</strong></div>`).join("") || `<div><span>操作记录</span><strong>新增、审批、重推、关闭会写入本页 localStorage 和统一治理事件</strong></div>`}
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
      id: `MAT-MAINT-${Date.now().toString().slice(-6)}`,
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
    if (action === "close" && !confirm(`确认${recipe.close}？该动作会保留审计记录，不能无痕删除。`)) return;
    record.action = action === "process" ? recipe.process : recipe.close;
    record.status = action === "process" ? "已审批/已下达" : "已关闭";
    record.time = now;
    record.before = record.after;
    record.after = action === "process" ? `${recipe.process}完成，等待模拟外部回执` : `${recipe.close}完成，差异已验收`;
  }
  window.MES_BUSINESS_FLOW?.applyMaterialAction?.(active.order, action === "close" ? "returnClose" : action === "process" ? "pickingReview" : "requestPick", {
    owner: record.owner,
    status: record.status,
    label: `${pageConfig.title}手工维护`,
    reason: `${record.id} ${record.before} -> ${record.after}`,
  });
  window.MES_BUSINESS_FLOW?.applyGovernanceAction?.({ id: record.id, name: pageConfig.title, owner: record.owner, risk: active.risk }, "materials", record.action, {
    orderId: active.order,
    status: record.status,
    source: "物料与线边库后台维护",
    result: record.after,
    auditRef: record.related,
  });
  appendLog(`${record.id} ${record.action}：${record.before} -> ${record.after}，责任人 ${record.owner}`);
  saveState();
  renderAll();
  showToast("物料维护记录已保存");
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  const actionMap = {
    requirements: status.includes("领料") ? "requestPick" : "refreshRequirement",
    picking: status.includes("出库") ? "requestPick" : "pickingReview",
    delivery: status.includes("签收") ? "deliverySign" : "deliveryReview",
    inventory: status.includes("补料") ? "requestReplenish" : "inventoryReview",
    feeding: status.includes("放行") ? "feedingRelease" : "feedingReview",
    returns: status.includes("核销") ? "returnClose" : "returnReview",
    shortage: "shortage",
  };
  window.MES_BUSINESS_FLOW?.applyMaterialAction?.(active.order, actionMap[pageConfig.id], {
    owner: active.owner,
    status,
    label: getDefinition().tableTitle,
    reason: active.risk,
  });
  active.status = status;
  if (pageConfig.id === "requirements" && status.includes("领料")) active.next = "已生成领料申请";
  if (pageConfig.id === "picking" && status.includes("出库")) active.next = "进入配送进度";
  if (pageConfig.id === "delivery" && status.includes("签收")) active.next = "进入线边库存";
  if (pageConfig.id === "inventory" && status.includes("补料")) active.next = "已发起补料申请";
  if (pageConfig.id === "feeding" && status.includes("放行")) active.next = "批次谱系追溯";
  if (pageConfig.id === "returns" && status.includes("核销")) active.next = "WMS 入库已核销";
  if (pageConfig.id === "shortage" && status.includes("升级")) active.next = "异常处理中心闭环";
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
    requirements: "已转领料",
    picking: "已出库",
    delivery: "已签收",
    inventory: "已发起补料",
    feeding: "已放行",
    returns: "已核销",
    shortage: "已升级",
  };
  updateActiveStatus(statusMap[pageConfig.id], `${getActive().id} 已接收${getDefinition().simulationTitle}${value ? `：${value}` : ""}`);
  showToast("模拟回执已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone(window.MES_BUSINESS_FLOW?.getMaterialRows?.(pageConfig.id) || initialRows[pageConfig.id]);
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
  $("#resetMaterialsBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", () => simulateStatus());
  $("#secondaryActionBtn").addEventListener("click", () => {
    updateActiveStatus(pageConfig.id === "shortage" ? "待替代审批" : "异常待处理", `${getActive().id} 已登记异常处置，等待责任人闭环`);
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
