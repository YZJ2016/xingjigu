const pageConfig = window.QUALITY_PAGE || { id: "incoming", title: "来料检验", eyebrow: "质量检验 / 来料检验" };
const STORAGE_KEY = `xingjigu_mes_quality_upstream_${pageConfig.id}_v2`;

const modules = [
  { id: "workbench", title: "首页工作台", layer: "日常工作", color: "#007aff", mark: "首", items: ["生产总览", "今日待办", "异常提醒", "交期预警", "车间看板", "我的审批"] },
  { id: "orders", title: "订单与计划", layer: "计划部门", color: "#5856d6", mark: "计", items: ["生产订单", "订单评审", "生产排程", "产能负荷", "交期预警", "计划调整", "齐套检查"] },
  { id: "dispatch", title: "派工与生产任务", layer: "车间管理", color: "#34c759", mark: "任", items: ["派工单", "工序任务", "班组任务", "任务下达", "任务变更", "SOP 查看", "开工检查"] },
  { id: "station", title: "工位作业", layer: "现场操作", color: "#00a6a6", mark: "位", items: ["员工登录", "扫码开工", "工艺指导", "投料确认", "过程记录", "工序报工", "交接班"] },
  { id: "materials", title: "物料与线边库", layer: "物料管理", color: "#34c759", mark: "料", items: ["用料需求", "领料申请", "配送进度", "线边库存", "投料记录", "余料退回", "缺料预警"] },
  { id: "barcode", title: "条码与标签", layer: "现场标识", color: "#00a6a6", mark: "码", items: ["生产批次", "产品序列号", "物料标签", "成品标签", "箱码托盘码", "标签打印", "补打申请"] },
  { id: "quality", title: "质量检验", layer: "质量部门", color: "#ff3b30", mark: "质", items: ["来料检验", "首件检验", "巡检任务", "过程检验", "成品检验", "不良记录", "返工评审", "质量放行"] },
  { id: "equipment", title: "设备与保养", layer: "设备部门", color: "#ff9f0a", mark: "设", items: ["设备状态", "点检任务", "保养计划", "维修工单", "停机记录", "备件领用", "设备效率"] },
  { id: "process", title: "过程监控", layer: "生产现场", color: "#ff9f0a", mark: "控", items: ["实时产量", "设备运行", "工艺参数", "报警记录", "停机原因", "过程趋势", "电子看板"] },
  { id: "exceptions", title: "异常处理", layer: "现场协同", color: "#ff3b30", mark: "异", items: ["异常上报", "待处理异常", "停线申请", "缺料处理", "质量问题", "设备故障", "处理复盘"] },
  { id: "warehouse", title: "完工与入库", layer: "仓储协同", color: "#34c759", mark: "入", items: ["工序完工", "完工确认", "包装作业", "成品入库", "库存冻结", "退料入库", "单据同步"] },
  { id: "trace", title: "追溯查询", layer: "质量追溯", color: "#8e8e93", mark: "追", items: ["产品追溯", "批次追溯", "物料去向", "生产履历", "检验履历", "设备履历", "客户追溯报告"] },
  { id: "reports", title: "报表与看板", layer: "经营分析", color: "#8e8e93", mark: "表", items: ["生产日报", "良率分析", "交付达成", "设备效率", "停机损失", "物料损耗", "管理驾驶舱"] },
  { id: "basic", title: "基础资料", layer: "资料维护", color: "#007aff", mark: "基", items: ["产品资料", "物料资料", "BOM 清单", "工艺路线", "工序工位", "产线车间", "客户供应商"] },
  { id: "system", title: "系统设置", layer: "管理配置", color: "#6e6e73", mark: "系", items: ["人员账号", "角色权限", "审批设置", "单据同步", "消息提醒", "操作记录", "数据备份"] },
];

const knownRoutes = {
  workbench: { 生产总览: "../index.html" },
  orders: { 生产订单: "../orders/production-orders.html", 订单评审: "../orders/order-reviews.html", 生产排程: "../orders/production-schedule.html", 产能负荷: "../orders/capacity-load.html", 交期预警: "../orders/delivery-warning.html", 计划调整: "../orders/plan-adjustment.html", 齐套检查: "../orders/kit-check.html" },
  dispatch: { 派工单: "../dispatch/dispatch-orders.html", 工序任务: "../dispatch/operation-tasks.html", 班组任务: "../dispatch/team-tasks.html", 任务下达: "../dispatch/task-release.html", 任务变更: "../dispatch/task-change.html", "SOP 查看": "../dispatch/sop-view.html", 开工检查: "../dispatch/start-check.html" },
  station: { 员工登录: "../station/employee-login.html", 扫码开工: "../station/scan-start.html", 工艺指导: "../station/work-instruction.html", 投料确认: "../station/feeding-confirmation.html", 过程记录: "../station/process-record.html", 工序报工: "../station/operation-report.html", 交接班: "../station/shift-handover.html" },
  materials: { 用料需求: "../materials/material-requirements.html", 领料申请: "../materials/picking-requests.html", 配送进度: "../materials/delivery-progress.html", 线边库存: "../materials/line-side-inventory.html", 投料记录: "../materials/feeding-records.html", 余料退回: "../materials/return-materials.html", 缺料预警: "../materials/shortage-alerts.html" },
  barcode: { 生产批次: "../barcode/production-batches.html", 产品序列号: "../barcode/product-serials.html", 物料标签: "../barcode/material-labels.html", 成品标签: "../barcode/finished-labels.html", 箱码托盘码: "../barcode/box-pallet-codes.html", 标签打印: "../barcode/label-printing.html", 补打申请: "../barcode/reprint-requests.html" },
  quality: { 来料检验: "./incoming-inspection.html", 首件检验: "./first-article.html", 巡检任务: "./patrol-tasks.html", 过程检验: "./process-inspection.html", 成品检验: "./final-inspection.html", 不良记录: "./defect-records.html", 返工评审: "./rework-review.html" },
};

const pageDefinitions = {
  incoming: {
    subtitle: "接收 WMS、采购到货和供应商批次，完成抽样、判定、冻结或放行，并回写物料标签、线边库存和缺料预警",
    user: "IQC 检验员",
    metrics: ["到货批次", "待判定", "已放行", "冻结 / 缺料"],
    columns: ["检验单", "到货 / 供应商", "物料 / 批次", "抽样方案", "判定结果", "库存动作", "追溯衔接", "责任人"],
    tableTitle: "IQC 来料准入批次",
    tableHint: "后台记录 WMS/采购/供应商批次回执，检验结论驱动物料标签、库存冻结和线边准入",
    cardTitle: "IQC 放行、冻结与物料联动",
    simulationTitle: "模拟 WMS / 供应商批次到货回执",
    simulationHint: "模拟外部 WMS、采购到货或供应商批次回传，页面只做质量准入记录和状态联动",
    primaryStatus: "已放行",
    secondaryStatus: "冻结待 MRB",
    primaryMessage: "模拟 IQC 判定合格，已回写物料标签和 WMS 放行状态",
    secondaryMessage: "模拟 IQC 不合格，批次冻结并触发缺料预警复核",
    links: [["线边库存", "../materials/line-side-inventory.html"], ["缺料预警", "../materials/shortage-alerts.html"], ["投料确认", "../station/feeding-confirmation.html"]],
  },
  firstArticle: {
    subtitle: "换线、换型、换料或开工后触发 FAI 首件，检验员确认尺寸、外观、功能，合格后放行批量生产，不合格锁定派工并生成质量异常",
    user: "首件检验员",
    metrics: ["首件任务", "等待签核", "已放行", "锁定派工"],
    columns: ["首件单", "派工 / 工序", "产品 / 批次", "触发原因", "检验项目", "准入状态", "异常处置", "责任人"],
    tableTitle: "FAI 首件准入任务",
    tableHint: "接收开工、换线、换料和工位终端回执，决定派工单能否进入批量生产",
    cardTitle: "首件签核、批量放行与异常闭环",
    simulationTitle: "模拟工位终端 / 检验仪器首件回执",
    simulationHint: "模拟外部工位终端、AOI 或检验仪器回传，后台只登记首件结论、锁定和放行信号",
    primaryStatus: "已放行",
    secondaryStatus: "派工已锁定",
    primaryMessage: "模拟首件签核通过，已向派工单下发批量生产放行信号",
    secondaryMessage: "模拟首件不合格，派工锁定并生成质量异常",
    links: [["开工检查", "../dispatch/start-check.html"], ["扫码开工", "../station/scan-start.html"], ["过程记录", "../station/process-record.html"]],
  },
  patrol: {
    subtitle: "按产线、工序、频次和风险生成 IPQC 巡检计划，接收模拟 PDA/工位终端记录，异常自动生成 NCR 或停线建议",
    user: "IPQC 巡检员",
    metrics: ["巡检任务", "待执行", "已完成", "NCR / 停线"],
    columns: ["巡检单", "产线 / 工序", "派工 / 批次", "频次与风险", "现场记录", "巡检状态", "处置建议", "责任人"],
    tableTitle: "IPQC 过程巡检任务",
    tableHint: "巡检任务由频次、工序风险、设备报警或首件后续规则触发，异常进入 NCR 或停线建议",
    cardTitle: "巡检触发、现场回执与 NCR 闭环",
    simulationTitle: "模拟 PDA / 工位终端巡检记录回执",
    simulationHint: "模拟外部 PDA、工位终端或过程采集回传，后台只记录巡检结论、NCR 和停线建议",
    primaryStatus: "已完成",
    secondaryStatus: "已生成 NCR",
    primaryMessage: "模拟巡检记录合格，已写入工序质量履历",
    secondaryMessage: "模拟巡检发现异常，已生成 NCR 并建议车间主任评估停线",
    links: [["过程记录", "../station/process-record.html"], ["工序报工", "../station/operation-report.html"], ["任务下达", "../dispatch/task-release.html"]],
  },
};

const initialRows = {
  incoming: [
    { id: "IQC-20260620-001", order: "ASN-WMS-3908", dispatch: "PO-460021", operation: "WMS 收货暂存区", line: "IQC-A区", product: "温度传感器", materialNo: "MAT-SEN-T100", batch: "SEN-L20260605", supplier: "苏州恒温电子", sample: "AQL II / 抽 80", checks: "外观、丝印、阻值、有效期", status: "待判定", action: "待 IQC 判定", owner: "质量员 孟可", time: "2026-06-20 08:42", source: "WMS 到货 ASN-WMS-3908 + 采购 PO-460021", result: "抽样 80，已录入 62，缺陷 0", next: "合格后打印物料标签并允许线边配送", risk: "Line-A SMT 第二批温度传感器待齐套" },
    { id: "IQC-20260620-002", order: "ASN-WMS-3912", dispatch: "PO-460033", operation: "WMS 收货暂存区", line: "IQC-A区", product: "10K 电阻卷料", materialNo: "MAT-RES-10K", batch: "RES10K-L20260604", supplier: "华南精密电阻", sample: "AQL II / 抽 125", checks: "外观、阻值、包装防潮、COC", status: "已放行", action: "WMS 解冻 / 标签可用", owner: "质量员 赵宁", time: "2026-06-20 09:16", source: "供应商批次 COC + WMS 收货回执", result: "抽样 125，缺陷 0，电子签核 QC-017", next: "线边库 LS-B-03 可签收投料", risk: "已进入 MO-202606-0002 齐套检查" },
    { id: "IQC-20260620-003", order: "ASN-WMS-3916", dispatch: "PO-460041", operation: "WMS 收货暂存区", line: "IQC-B区", product: "电源芯片", materialNo: "MAT-PWR-IC60", batch: "PWRIC-L20260602", supplier: "青岛芯联", sample: "加严 / 抽 200", checks: "外观、脚位、上电测试、批次有效期", status: "冻结待 MRB", action: "WMS 冻结 / 禁止投产", owner: "质量主管 周妍", time: "2026-06-20 10:05", source: "IQC 检验记录 IR-8832 + WMS 冻结回执", result: "抽样 200，脚位氧化 7，判定不合格", next: "生成来料不合格通知并联动缺料预警", risk: "影响 MO-202606-0005 15:00 开工准入" },
    { id: "IQC-20260620-004", order: "ASN-WMS-3920", dispatch: "PO-460058", operation: "WMS 收货暂存区", line: "IQC-C区", product: "客户 I 包装盒", materialNo: "MAT-BOX-I", batch: "BOXI-L20260614", supplier: "杭州彩印包装", sample: "一般 / 抽 50", checks: "尺寸、印刷版本、条码等级", status: "让步待审批", action: "隔离库位 / 等待采购与质量审批", owner: "质量工程师 林澈", time: "2026-06-20 11:28", source: "采购到货 PO-460058 + 客户标签版本 V1.4", result: "抽样 50，印刷色差 2，客户急单申请让步", next: "审批后限定 MO-202606-0011 使用", risk: "让步范围必须写入追溯档案" },
  ],
  firstArticle: [
    { id: "FAI-20260620-001", order: "MO-202606-0001", dispatch: "D-001", operation: "SMT 贴片", line: "Line-A", product: "智能温控控制器 TCU-100", materialNo: "TCU-100", batch: "LOT-TCU100-20260620-001", supplier: "内部工序", sample: "首件 5 台", checks: "元件位置、焊点、极性、外观、关键尺寸", status: "等待签核", action: "批量生产暂停", owner: "首件检验员 赵宁", time: "2026-06-20 09:00", source: "扫码开工回执 + 派工单 D-001 + SOP-TCU-SMT V3.2", result: "AOI 首件 5 台已完成，人工外观待签核", next: "合格后向派工单 D-001 下发批量放行", risk: "首件未签核前禁止批量报工" },
    { id: "FAI-20260620-002", order: "MO-202606-0002", dispatch: "D-021", operation: "SMT 贴片", line: "Line-B", product: "工业网关 GW-240", materialNo: "GW-240", batch: "LOT-GW240-20260620-002", supplier: "内部工序", sample: "首件 5 台", checks: "元件方向、BGA 焊点、外观、ICT 功能", status: "已放行", action: "派工批量生产已解锁", owner: "首件检验员 孟可", time: "2026-06-20 09:22", source: "换型触发 + AOI-02 回执 + 检验员电子签核", result: "尺寸/外观/功能均合格，签核 QC-009", next: "IPQC 巡检频次切换为每 2 小时", risk: "已写入 LOT-GW240 批次履历" },
    { id: "FAI-20260620-003", order: "MO-202606-0007", dispatch: "D-071", operation: "整机装配", line: "Line-C", product: "能耗采集终端 EMT-60", materialNo: "EMT-60", batch: "LOT-EMT60-20260620-001", supplier: "内部工序", sample: "首件 3 台", checks: "外壳间隙、按键手感、通电功能、铭牌", status: "派工已锁定", action: "生成质量异常 QA-260620-07", owner: "质量工程师 林澈", time: "2026-06-20 10:14", source: "换料触发 + 工位终端上传首件照片", result: "外壳间隙超上限 0.18 mm，判定不合格", next: "锁定 D-071，等待工艺调整后重新首件", risk: "禁止后续 300 台批量装配" },
    { id: "FAI-20260620-004", order: "MO-202606-0012", dispatch: "D-121", operation: "程序烧录", line: "Line-B", product: "触控屏组件 HMI-7", materialNo: "HMI-7", batch: "LOT-HMI7-20260620-001", supplier: "内部工序", sample: "首件 2 台", checks: "程序版本、SN 绑定、通讯功能、标签读取", status: "待复测", action: "保持派工待放行", owner: "首件检验员 赵宁", time: "2026-06-20 11:36", source: "换程序版本 V2.6.1 触发", result: "SN 绑定通过，通讯响应一次超时，待复测", next: "复测合格后释放批量烧录", risk: "程序版本必须进入追溯记录" },
  ],
  patrol: [
    { id: "IPQC-20260620-001", order: "MO-202606-0001", dispatch: "D-002", operation: "DIP 插件", line: "Line-A", product: "智能温控控制器 TCU-100", materialNo: "TCU-100", batch: "LOT-TCU100-20260620-001", supplier: "内部工序", sample: "每 2 小时 / 抽 10 台", checks: "插件极性、焊点、桥连、工位温湿度", status: "待执行", action: "到点提醒 IPQC", owner: "IPQC 王珊", time: "2026-06-20 10:30", source: "首件放行后巡检计划 PLAN-IPQC-SMT-02", result: "等待模拟 PDA 巡检记录", next: "合格写入工序履历，异常生成 NCR", risk: "Line-A 刚完成换料，风险等级中" },
    { id: "IPQC-20260620-002", order: "MO-202606-0002", dispatch: "D-022", operation: "功能测试", line: "Line-B", product: "工业网关 GW-240", materialNo: "GW-240", batch: "LOT-GW240-20260620-002", supplier: "内部工序", sample: "高风险 / 抽 20 台", checks: "通电电流、RS485 响应、温升、外观", status: "已完成", action: "记录进入过程履历", owner: "IPQC 何洁", time: "2026-06-20 10:48", source: "过程采集趋势预警 + PDA 巡检回执", result: "抽检 20 台，温升均值 42.1℃，合格", next: "维持每小时巡检一次", risk: "趋势回落，继续监控" },
    { id: "IPQC-20260620-003", order: "MO-202606-0008", dispatch: "D-082", operation: "老化测试", line: "Line-C", product: "智能电表采集器 MTR-80", materialNo: "MTR-80", batch: "LOT-MTR80-20260620-001", supplier: "内部工序", sample: "设备报警触发 / 抽 12 台", checks: "老化通道、电流漂移、外壳温升、SN 绑定", status: "已生成 NCR", action: "建议暂停通道 CH-04", owner: "IPQC 王珊", time: "2026-06-20 11:12", source: "老化设备 PLC 报警 + 工位终端异常回执", result: "CH-04 电流漂移超限 3 台，NCR-260620-04", next: "停线建议给车间主任，设备员复核通道", risk: "需圈定同通道 48 台影响范围" },
    { id: "IPQC-20260620-004", order: "MO-202606-0011", dispatch: "D-111", operation: "包装入库", line: "Line-C", product: "客户 I 控制盒", materialNo: "BOX-I", batch: "LOT-BOXI-20260620-001", supplier: "内部工序", sample: "换标签 / 抽 30 件", checks: "箱标版本、条码等级、装箱数量、外观", status: "待复核", action: "包装暂停放行", owner: "IPQC 何洁", time: "2026-06-20 11:55", source: "标签打印版本变更 + 包装工位终端回执", result: "条码等级一箱 C 级，待复核打印头状态", next: "复核后决定返工贴标或放行", risk: "客户标签版本需保持一致" },
  ],
};

Object.assign(initialRows, window.MES_MASTER_DATA?.demoRows?.qualityUpstream || {});

let rows = structuredClone(initialRows[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true, openMenus: { quality: true } };
let logs = [];
let maintenanceRecords = [];

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#qualityModuleMenu").innerHTML = modules.map((module) => {
    const openClass = state.openMenus?.[module.id] ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "quality" && item === pageConfig.title ? " class=\"is-active\"" : "";
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

  $("#qualityModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".module-group");
      group.classList.toggle("is-open");
      state.openMenus = { ...(state.openMenus || {}), [button.dataset.module]: group.classList.contains("is-open") };
      saveState();
    });
  });
  $("#qualityModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goMenu(link.dataset.module, link.dataset.entry);
    });
  });
}

function goMenu(moduleId, entry) {
  const href = knownRoutes[moduleId]?.[entry];
  if (href) window.location.href = href;
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
  const flowRows = window.MES_BUSINESS_FLOW?.getQualityRows?.(pageConfig.id) || [];
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
    const text = `${item.id} ${item.order} ${item.dispatch} ${item.operation} ${item.line} ${item.product} ${item.materialNo} ${item.batch} ${item.supplier} ${item.status} ${item.action} ${item.owner} ${item.source} ${item.result} ${item.risk}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && lineMatch;
  });
}

function statusStyle(status) {
  if (/冻结|锁定|NCR|不合格|暂停|异常|停线|禁止/.test(status)) return "red";
  if (/待|等待|复测|复核|让步/.test(status)) return "orange";
  if (/已放行|已完成|合格|解锁/.test(status)) return "green";
  return "blue";
}

function renderPageChrome() {
  const def = getDefinition();
  document.title = `星技谷 MES | ${pageConfig.title}`;
  $("#pageEyebrow").textContent = pageConfig.eyebrow;
  $("#pageTitle").textContent = `${pageConfig.title}准入工作台`;
  $("#pageSubtitle").textContent = def.subtitle;
  $("#userRole").textContent = def.user;
  $("#tableTitle").textContent = def.tableTitle;
  $("#tableHint").textContent = def.tableHint;
  $("#cardTitle").textContent = def.cardTitle;
  $("#simulationTitle").textContent = def.simulationTitle;
  $("#simulationHint").textContent = def.simulationHint;
  $("#simulationInput").placeholder = `${def.simulationTitle}，例如 ${rows[0]?.id || "检验单"} / ${rows[0]?.batch || "批次号"} / 模拟判定值`;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((item) => item.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#lineFilter").innerHTML = `<option value="all">全部产线 / 区域</option>${[...new Set(rows.map((item) => item.line))].map((line) => `<option value="${line}">${line}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
  $("#quickLinks").innerHTML = def.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
}

function renderMetrics() {
  const def = getDefinition();
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((item) => /待|等待|复测|复核|让步/.test(item.status)).length,
    visible.filter((item) => /已放行|已完成|合格/.test(item.status)).length,
    visible.filter((item) => /冻结|锁定|NCR|异常|停线|禁止/.test(item.status) || /缺料|影响|风险/.test(item.risk)).length,
  ];
  $("#qualityMetrics").innerHTML = def.metrics.map((label, index) => `
    <article>
      <span>${label}</span>
      <strong>${values[index]}</strong>
      <em>${index === 3 ? "需联动派工、物料、异常或追溯闭环" : "随筛选条件实时变化"}</em>
    </article>
  `).join("");
}

function renderTable() {
  const visible = getVisibleRows();
  $("#qualityTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeId ? "is-active" : ""}" data-id="${item.id}">
      ${buildCells(item).map((cell) => `<td>${cell}</td>`).join("")}
    </tr>
  `).join("") : `<tr><td colspan="8"><div class="empty-action">当前筛选条件下没有${pageConfig.title}记录 <button type="button" data-maintenance-action="create">新增检验任务</button></div></td></tr>`;
  $("#qualityTableBody").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeId = row.dataset.id;
      state.detailOpen = true;
      saveState();
      renderAll();
    });
  });
  $("#qualityTableBody").querySelectorAll("[data-maintenance-action]").forEach((button) => {
    button.addEventListener("click", () => handleMaintenanceAction(button.dataset.maintenanceAction));
  });
}

function buildCells(item) {
  if (pageConfig.id === "incoming") {
    return [item.id, twoLine(item.order, `${item.dispatch} · ${item.supplier}`), twoLine(item.product, `${item.materialNo} · ${item.batch}`), item.sample, pill(item.status), item.action, item.next, item.owner];
  }
  if (pageConfig.id === "firstArticle") {
    return [item.id, twoLine(item.dispatch, `${item.order} · ${item.operation}`), twoLine(item.product, item.batch), triggerReason(item), item.checks, pill(item.status), item.action, item.owner];
  }
  return [item.id, twoLine(item.line, item.operation), twoLine(item.dispatch, item.batch), item.sample, item.result, pill(item.status), item.action, item.owner];
}

function triggerReason(item) {
  if (item.source.includes("换型")) return "换型触发";
  if (item.source.includes("换料")) return "换料触发";
  if (item.source.includes("换程序")) return "换程序触发";
  return "开工触发";
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
    ["上游来源", active.source, "保留来源系统、单据、设备或终端回执"],
    ["准入校验", `${active.sample} · ${active.checks}`, active.result],
    ["闭环结果", active.next, "继续传递给派工、物料、异常中心或追溯档案"],
  ];
  $("#qualityCards").innerHTML = cards.map(([label, value, hint]) => `
    <div class="quality-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </div>
  `).join("");
}

function renderDetail() {
  const active = getActive();
  $("#qualityDetail").classList.toggle("is-hidden", !state.detailOpen);
  $("#openDetailBtn").hidden = state.detailOpen;
  if (!active) return;
  $("#detailStatus").className = `pill pill--${statusStyle(active.status)}`;
  $("#detailStatus").textContent = active.status;
  $("#detailTitle").textContent = active.id;
  $("#detailSubtitle").textContent = `${active.order} · ${active.dispatch} · ${active.operation}`;
  $("#detailKv").innerHTML = [
    ["对象批次", `${active.product} · ${active.batch}`],
    ["来源系统", active.source],
    ["检验规则", `${active.sample} · ${active.checks}`],
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
    ["任务触发", active.source],
    ["检验记录", active.result],
    ["责任确认", `${active.owner} 已接收 ${active.id}`],
    ["状态时间", `${active.status} · ${active.time}`],
    ["追溯引用", `${active.order} / ${active.dispatch} / ${active.batch}`],
  ];
}

function buildActions(active) {
  const result = [
    ["当前处置", active.action],
    ["下游衔接", active.next],
    ["异常路径", getExceptionPath(active)],
  ];
  if (pageConfig.id === "incoming") result.push(["物料联动", "物料标签、WMS 库存状态、线边库准入和缺料预警引用同一 IQC 结论"]);
  if (pageConfig.id === "firstArticle") result.push(["派工联动", "首件合格下发批量放行；首件不合格锁定派工并进入质量异常"]);
  if (pageConfig.id === "patrol") result.push(["过程联动", "巡检记录进入工序质量履历，异常生成 NCR 或停线建议"]);
  return result;
}

function getExceptionPath(active) {
  if (/冻结|锁定|NCR|不合格|暂停|异常|停线/.test(active.status)) return "质量异常 / NCR / MRB 已保留扩展入口，等待责任人闭环";
  if (/待|等待|复测|复核|让步/.test(active.status)) return "等待签核或复核，超时可升级质量主管";
  return "当前已满足准入门，继续进入下游追溯和过程监控";
}

function renderLogs() {
  $("#logList").innerHTML = logs.length ? logs.slice(0, 5).map((log) => `
    <div><span>${log.time}</span><strong>${log.text}</strong></div>
  `).join("") : `<div><span>暂无</span><strong>当前页面尚未产生模拟外部回执或模拟异常处置记录</strong></div>`;
}

function renderAll() {
  mergeFlowRows();
  renderMetrics();
  renderTable();
  renderCards();
  renderMaintenancePanel();
  renderDetail();
}

function getMaintenanceRecipe() {
  const map = {
    incoming: ["IQC 检验任务", "录入并复核结论", "放行/冻结后关闭", "IQC 检验员 孟可"],
    firstArticle: ["首件检验任务", "复核首件结论并放行", "驳回/放行关闭", "首件检验员 赵宁"],
    patrol: ["IPQC 巡检任务", "补录巡检并转 NCR", "关闭巡检任务", "IPQC 王珊"],
  };
  const [create, process, close, owner] = map[pageConfig.id] || map.incoming;
  return { create, process, close, owner };
}

function getActiveMaintenance() {
  return maintenanceRecords[0];
}

function renderMaintenancePanel() {
  let panel = $("#qualityMaintenancePanel");
  if (!panel) {
    panel = document.createElement("section");
    panel.id = "qualityMaintenancePanel";
    panel.className = "quality-panel maintenance-panel";
    document.querySelector(".quality-left .simulation-box")?.before(panel);
  }
  const active = getActive();
  const recipe = getMaintenanceRecipe();
  const current = getActiveMaintenance();
  panel.innerHTML = `
    <div class="quality-panel__head">
      <div>
        <h3>${pageConfig.title}手工维护闭环</h3>
        <p>后台维护检验任务、结论复核、放行/隔离和关闭记录；采样、PDA 巡检、仪器测试均作为模拟回执或后台复核依据。</p>
      </div>
    </div>
    <div class="maintenance-flow">
      <button type="button" data-maintenance-action="create">新建 ${recipe.create}</button>
      <button type="button" data-maintenance-action="process"${current ? "" : " disabled"}>${recipe.process}</button>
      <button type="button" class="danger-action" data-maintenance-action="close"${current ? "" : " disabled"}>${recipe.close}</button>
    </div>
    <div class="maintenance-record">
      ${current ? `
        <div><span>维护单</span><strong>${current.id} · ${current.status}</strong></div>
        <div><span>关联单据</span><strong>${current.related}</strong></div>
        <div><span>责任/时间</span><strong>${current.owner} · ${current.time}</strong></div>
        <div><span>前后值摘要</span><strong>${current.before} -> ${current.after}</strong></div>
      ` : `<div><span>暂无维护单</span><strong>可基于 ${active?.id || pageConfig.title} 新建一条质量管理任务</strong></div>`}
    </div>
    <div class="maintenance-log">
      ${maintenanceRecords.slice(0, 4).map((item) => `<div><span>${item.time}</span><strong>${item.id} ${item.action}：${item.status}</strong></div>`).join("") || `<div><span>操作记录</span><strong>新建、复核、放行、驳回、关闭会写入 localStorage 和统一治理事件</strong></div>`}
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
      id: `QA-MAINT-${Date.now().toString().slice(-6)}`,
      action: recipe.create,
      status: "待复核",
      related: `${active.order} / ${active.dispatch} / ${active.id}`,
      owner: recipe.owner,
      time: now,
      before: `${active.status} / ${active.action}`,
      after: `已新建${recipe.create}`,
    };
    maintenanceRecords.unshift(record);
  } else {
    if (!record) return;
    if (action === "close" && !confirm(`确认${recipe.close}？质量记录会保留追溯和审计，不能无痕删除。`)) return;
    record.action = action === "process" ? recipe.process : recipe.close;
    record.status = action === "process" ? "已复核/待关闭" : "已关闭";
    record.time = now;
    record.before = record.after;
    record.after = action === "process" ? `${recipe.process}完成，结论等待放行或隔离` : `${recipe.close}完成，追溯记录已归档`;
  }
  window.MES_BUSINESS_FLOW?.applyQualityAction?.(active, action === "process" ? "qualityRelease" : "qualityBlock", {
    status: record.status,
    owner: record.owner,
    result: `${record.id} ${record.before} -> ${record.after}`,
  });
  window.MES_BUSINESS_FLOW?.applyGovernanceAction?.({ id: record.id, name: pageConfig.title, owner: record.owner, risk: active.risk }, "quality", record.action, {
    orderId: active.order,
    status: record.status,
    source: "质量检验后台维护",
    result: record.after,
    auditRef: record.related,
  });
  appendLog(`${record.id} ${record.action}：${record.before} -> ${record.after}，责任人 ${record.owner}`);
  saveState();
  renderAll();
  showToast("质量维护记录已保存");
}

function updateActiveStatus(status, message) {
  const active = getActive();
  if (!active) return;
  active.status = status;
  active.time = new Date().toLocaleString("zh-CN", { hour12: false });
  if (pageConfig.id === "incoming" && status.includes("放行")) {
    active.action = "WMS 解冻 / 物料标签可打印";
    active.next = "线边库可签收，投料防错引用 IQC 合格";
    active.result = "模拟抽样判定合格，电子签核已记录";
  } else if (pageConfig.id === "incoming") {
    active.action = "WMS 冻结 / 禁止投产";
    active.next = "生成来料不合格通知并联动缺料预警";
    active.result = "模拟抽样判定不合格，等待 MRB";
  }
  if (pageConfig.id === "firstArticle" && status.includes("放行")) {
    active.action = "派工批量生产已解锁";
    active.next = "批量生产放行，IPQC 巡检计划已确认";
    active.result = "模拟尺寸、外观、功能均合格，电子签核已记录";
  } else if (pageConfig.id === "firstArticle") {
    active.action = "生成质量异常并锁定派工";
    active.next = "等待工艺调整后重新首件";
    active.result = "模拟首件不合格，禁止批量生产";
  }
  if (pageConfig.id === "patrol" && status.includes("完成")) {
    active.action = "记录进入过程履历";
    active.next = "巡检合格，维持当前频次";
    active.result = "模拟 PDA 巡检记录合格，已写入工序履历";
  } else if (pageConfig.id === "patrol") {
    active.action = "建议停线评估 / 责任人复核";
    active.next = "NCR 已生成，等待车间主任与质量工程师闭环";
    active.result = "模拟巡检发现异常，已生成 NCR";
  }
  window.MES_BUSINESS_FLOW?.applyQualityAction?.(active, status === getDefinition().primaryStatus ? "qualityRelease" : "qualityBlock", {
    status,
    owner: active.owner,
    result: active.result || active.action,
  });
  appendLog(message || `${active.id} 状态更新为 ${status}`);
  saveState();
  renderPageChrome();
  $("#statusFilter").value = state.status;
  $("#lineFilter").value = state.line;
  renderAll();
}

function appendLog(text) {
  logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), text });
}

function simulateStatus() {
  const value = $("#simulationInput").value.trim();
  const def = getDefinition();
  updateActiveStatus(def.primaryStatus, `${getActive().id} 已接收${def.primaryMessage}${value ? `：${value}` : ""}`);
  $("#simulationInput").value = "";
  showToast("模拟外部回执已记录");
}

function resetPage() {
  localStorage.removeItem(STORAGE_KEY);
  rows = structuredClone([...(window.MES_BUSINESS_FLOW?.getQualityRows?.(pageConfig.id) || []), ...initialRows[pageConfig.id]]);
  state = { activeId: rows[0]?.id || "", search: "", status: "all", line: "all", detailOpen: true, openMenus: { quality: true } };
  logs = [];
  maintenanceRecords = [];
  $("#searchInput").value = "";
  $("#simulationInput").value = "";
  renderFrameMenu();
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
  $("#resetQualityBtn").addEventListener("click", resetPage);
  $("#simulateBtn").addEventListener("click", simulateStatus);
  $("#primaryActionBtn").addEventListener("click", simulateStatus);
  $("#secondaryActionBtn").addEventListener("click", () => {
    const def = getDefinition();
    updateActiveStatus(def.secondaryStatus, `${getActive().id} 已登记${def.secondaryMessage}`);
    showToast("模拟异常处置已登记");
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
  mergeFlowRows();
  loadState();
  state.openMenus = { quality: true, ...(state.openMenus || {}) };
  renderFrameMenu();
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
