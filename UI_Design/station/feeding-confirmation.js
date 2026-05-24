const STORAGE_KEY = "xingjigu_mes_feeding_confirmation_v1";

const modules = window.MES_NAV_MODULES || [];

const initialFeedings = [
  {
    id: "FD-004-A",
    dispatchNo: "D-004",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "整机装配",
    line: "Line-A",
    station: "ASM-WS-03",
    equipment: "电批 EC-ASM-03",
    operator: "赵杰",
    employeeId: "E1003",
    materialNo: "MAT-CASE-A",
    materialName: "外壳上盖",
    demandQty: 800,
    feedQty: 0,
    unit: "PCS",
    lockedBatch: "CASE-A-L20260610",
    scannedBatch: "",
    containerCode: "BOX-CASE-A-016",
    sideLocation: "LS-A-03-02",
    status: "待投料",
    iqc: "合格",
    freeze: "未冻结",
    shelfLife: "2026-12-31",
    picked: "已签收",
    variance: "",
    gates: { dispatch: "通过", bom: "通过", batch: "待确认", quality: "通过", location: "通过", usage: "待确认" },
    materials: [
      { no: "MAT-CASE-A", name: "外壳上盖", batch: "CASE-A-L20260610", demand: 800, available: 820, status: "待确认", location: "LS-A-03-02", quality: "IQC 合格", rule: "锁定批次，禁止替代" },
      { no: "MAT-CASE-B", name: "外壳底壳", batch: "CASE-B-L20260611", demand: 800, available: 800, status: "通过", location: "LS-A-03-03", quality: "IQC 合格", rule: "与上盖同供应商批次族" },
      { no: "MAT-LABEL-TCU", name: "铭牌标签", batch: "LBL-L20260612", demand: 800, available: 900, status: "通过", location: "LS-A-04-01", quality: "模板已审批", rule: "客户 A 标签版本 R6" },
      { no: "MAT-SCREW-M25", name: "M2.5 螺钉", batch: "SCR-L20260609", demand: 3200, available: 3500, status: "通过", location: "LS-A-05-01", quality: "来料合格", rule: "按 4 PCS/台核销" },
    ],
  },
  {
    id: "FD-002-A",
    dispatchNo: "D-002",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    operation: "DIP 插件",
    line: "Line-A",
    station: "DIP-WS-01",
    equipment: "防错夹具 JIG-DIP-04",
    operator: "钱佳",
    employeeId: "E1011",
    materialNo: "MAT-CN1-5P",
    materialName: "5P 接线端子 CN1",
    demandQty: 800,
    feedQty: 800,
    unit: "PCS",
    lockedBatch: "CN1-L20260605",
    scannedBatch: "CN1-L20260605",
    containerCode: "TRAY-CN1-008",
    sideLocation: "LS-A-01-01",
    status: "已确认",
    iqc: "合格",
    freeze: "未冻结",
    shelfLife: "2027-01-15",
    picked: "已签收",
    variance: "",
    gates: { dispatch: "通过", bom: "通过", batch: "通过", quality: "通过", location: "通过", usage: "通过" },
    materials: [
      { no: "MAT-CN1-5P", name: "5P 接线端子 CN1", batch: "CN1-L20260605", demand: 800, available: 0, status: "通过", location: "LS-A-01-01", quality: "IQC 合格", rule: "极性方向防错" },
      { no: "MAT-CN2-3P", name: "3P 接线端子 CN2", batch: "CN2-L20260606", demand: 800, available: 30, status: "通过", location: "LS-A-01-02", quality: "IQC 合格", rule: "同工序顺序投料" },
      { no: "MAT-PCB-TCU", name: "TCU 主控板", batch: "PCB-L20260601", demand: 800, available: 800, status: "通过", location: "上道 SMT 转入", quality: "AOI 合格", rule: "半成品批次绑定" },
    ],
  },
  {
    id: "FD-021-A",
    dispatchNo: "D-021",
    orderId: "MO-202606-0002",
    product: "智能电源模块 PMU-200",
    operation: "SMT 贴片",
    line: "Line-B",
    station: "SMT-WS-02",
    equipment: "贴片机 SMT-02",
    operator: "李敏",
    employeeId: "E1017",
    materialNo: "MAT-RES-10K",
    materialName: "10K 电阻卷料",
    demandQty: 4800,
    feedQty: 0,
    unit: "PCS",
    lockedBatch: "RES10K-L20260604",
    scannedBatch: "RES10K-L20260528",
    containerCode: "REEL-10K-238",
    sideLocation: "SMT-FEEDER-12",
    status: "已拦截",
    iqc: "合格",
    freeze: "未冻结",
    shelfLife: "2028-05-30",
    picked: "待复核",
    variance: "扫描批次与排程锁定批次不一致",
    gates: { dispatch: "通过", bom: "通过", batch: "拦截", quality: "通过", location: "待确认", usage: "待确认" },
    materials: [
      { no: "MAT-RES-10K", name: "10K 电阻卷料", batch: "RES10K-L20260604", demand: 4800, available: 5000, status: "拦截", location: "SMT-FEEDER-12", quality: "IQC 合格", rule: "按排程锁定批次投料" },
      { no: "MAT-CAP-104", name: "104 电容卷料", batch: "CAP104-L20260602", demand: 2400, available: 2500, status: "通过", location: "SMT-FEEDER-18", quality: "IQC 合格", rule: "FEFO" },
      { no: "MAT-IC-PMU", name: "PMU 主芯片", batch: "ICPMU-L20260601", demand: 600, available: 600, status: "通过", location: "恒温柜 A-02", quality: "MSL 已开封计时", rule: "开封 72 小时内使用" },
    ],
  },
  {
    id: "FD-111-A",
    dispatchNo: "D-111",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    operation: "包装入库",
    line: "Line-C",
    station: "PACK-WS-02",
    equipment: "Pack-C",
    operator: "陈洁",
    employeeId: "E1082",
    materialNo: "MAT-BOX-THS",
    materialName: "客户 J 包装盒",
    demandQty: 120,
    feedQty: 130,
    unit: "PCS",
    lockedBatch: "BOXJ-L20260614",
    scannedBatch: "BOXJ-L20260614",
    containerCode: "BOX-PACK-J-003",
    sideLocation: "LS-C-02-04",
    status: "差异待核销",
    iqc: "合格",
    freeze: "未冻结",
    shelfLife: "2027-06-30",
    picked: "已签收",
    variance: "包装盒领用多 10 PCS，需确认余料退回",
    gates: { dispatch: "通过", bom: "通过", batch: "通过", quality: "通过", location: "通过", usage: "待确认" },
    materials: [
      { no: "MAT-BOX-THS", name: "客户 J 包装盒", batch: "BOXJ-L20260614", demand: 120, available: 20, status: "待确认", location: "LS-C-02-04", quality: "IQC 合格", rule: "多领需退料核销" },
      { no: "MAT-LBL-THS", name: "客户 J 标签", batch: "LBLJ-L20260614", demand: 120, available: 120, status: "通过", location: "LS-C-02-05", quality: "模板待工艺确认", rule: "标签模板 R2" },
      { no: "MAT-PEBAG", name: "防静电袋", batch: "BAG-L20260607", demand: 120, available: 140, status: "通过", location: "LS-C-02-06", quality: "合格", rule: "每台 1 PCS" },
    ],
  },
];

const initialHistory = [
  { id: "FH-001", feedingId: "FD-002-A", time: "08:18", action: "模拟投料确认回执", scanType: "模拟批次标签", scanCode: "CN1-L20260605", material: "5P 接线端子 CN1", batch: "CN1-L20260605", station: "DIP-WS-01", dispatchNo: "D-002", qty: "800 PCS", result: "批次、IQC、BOM 和线边库位校验通过，已绑定投料记录" },
  { id: "FH-002", feedingId: "FD-021-A", time: "09:12", action: "模拟投料拦截", scanType: "模拟批次标签", scanCode: "RES10K-L20260528", material: "10K 电阻卷料", batch: "RES10K-L20260528", station: "SMT-WS-02", dispatchNo: "D-021", qty: "0 PCS", result: "模拟扫描批次与排程锁定批次不一致，后台拦截投料回执" },
  { id: "FH-003", feedingId: "FD-111-A", time: "09:46", action: "差异登记", scanType: "模拟余料标签", scanCode: "BOX-PACK-J-003", material: "客户 J 包装盒", batch: "BOXJ-L20260614", station: "PACK-WS-02", dispatchNo: "D-111", qty: "130 PCS", result: "领用多 10 PCS，等待余料退回核销" },
  { id: "FH-004", feedingId: "FD-004-A", time: "10:05", action: "待模拟投料回执", scanType: "模拟物料标签", scanCode: "CASE-A-L20260610", material: "外壳上盖", batch: "CASE-A-L20260610", station: "ASM-WS-03", dispatchNo: "D-004", qty: "0 PCS", result: "等待模拟现场扫码枪/PDA 回传投料确认" },
];

let feedings = structuredClone(initialFeedings);
let history = structuredClone(initialHistory);
let logs = [];
let state = {
  activeFeedingId: "FD-004-A",
  search: "",
  status: "all",
  line: "all",
  operation: "all",
  detailOpen: true,
  feedMode: "模拟批次标签",
  blockReason: "料号不属于当前工序 BOM",
  owner: "物料员",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#feedingModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "station" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "station" && item === "投料确认" ? " class=\"is-active\"" : "";
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

  $("#feedingModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#feedingModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const moduleId = link.dataset.module;
      const entry = link.dataset.entry;
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
      else if (moduleId === "station" && entry === "工位身份回执") window.location.href = "./employee-login.html";
      else if (moduleId === "station" && entry === "扫码开工") window.location.href = "./scan-start.html";
      else if (moduleId === "station" && entry === "工艺指导") window.location.href = "./work-instruction.html";
      else if (moduleId === "station" && entry === "投料确认") window.location.href = "./feeding-confirmation.html";
      else if (moduleId === "station" && entry === "过程记录") window.location.href = "./process-record.html";
      else if (moduleId === "station" && entry === "工序报工") window.location.href = "./operation-report.html";
      else if (moduleId === "station" && entry === "交接班") window.location.href = "./shift-handover.html";
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    feedings = saved.feedings || feedings;
    history = saved.history || history;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.feedingState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ feedings, history, logs, feedingState: state }));
}

function getActiveFeeding() {
  return feedings.find((item) => item.id === state.activeFeedingId) || feedings[0];
}

function getVisibleFeedings() {
  const keyword = state.search.trim().toLowerCase();
  return feedings.filter((item) => {
    const text = `${item.dispatchNo} ${item.orderId} ${item.product} ${item.operation} ${item.station} ${item.materialNo} ${item.materialName} ${item.lockedBatch} ${item.scannedBatch} ${item.operator}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const operationMatch = state.operation === "all" || item.operation === state.operation;
    return keywordMatch && statusMatch && lineMatch && operationMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderTaskList();
  renderTerminal();
  renderGateFlow();
  renderMaterialCards();
  renderTraceCards();
  renderHistory();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".feeding-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#feedingDetailPanel").hidden = !isOpen;
  $("#showFeedingDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const visible = getVisibleFeedings();
  $("#metricConfirmed").textContent = visible.filter((item) => item.status === "已确认").length;
  $("#metricWaiting").textContent = visible.filter((item) => item.status === "待投料").length;
  $("#metricBlocked").textContent = visible.filter((item) => item.status === "已拦截").length;
  $("#metricVariance").textContent = visible.filter((item) => item.status === "差异待核销").length;
}

function renderTaskList() {
  const visible = getVisibleFeedings();
  $("#feedingTaskList").innerHTML = visible.length ? visible.map((item) => `
    <button class="feeding-task-card${item.id === state.activeFeedingId ? " is-active" : ""}${item.status === "已确认" ? " is-confirmed" : ""}${item.status === "已拦截" ? " is-blocked" : ""}${item.status === "差异待核销" ? " is-risk" : ""}" type="button" data-id="${item.id}">
      <div class="feeding-task-card__top">
        <strong>${item.dispatchNo} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="feeding-task-card__role">${item.materialName} · ${item.materialNo}</span>
      <div class="feeding-task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.operator} · ${item.employeeId}</span>
      </div>
      <div class="feeding-task-card__foot">
        <span>需求 ${item.demandQty} / 已投 ${item.feedQty} ${item.unit}</span>
        <span>${getGateText(item)}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有投料确认任务</strong><em>请调整筛选条件</em></div>`;

  $("#feedingTaskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectFeeding(card.dataset.id));
  });
}

function renderTerminal() {
  const active = getActiveFeeding();
  $("#terminalTitle").textContent = active.station;
  $("#terminalStation").textContent = active.station;
  $("#terminalTask").textContent = `${active.dispatchNo} · ${active.operation}`;
  $("#terminalMaterial").textContent = active.materialName;
  $("#terminalDemand").textContent = `BOM 需求 ${active.demandQty} ${active.unit} · ${active.lockedBatch}`;
  document.querySelectorAll("[data-feed-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.feedMode === state.feedMode);
  });
}

function renderGateFlow() {
  const active = getActiveFeeding();
  const gates = [
    ["dispatch", "派工匹配", `${active.dispatchNo} / ${active.station}`],
    ["bom", "BOM 物料", `${active.materialNo} 属于 ${active.operation}`],
    ["batch", "批次防错", active.scannedBatch || active.lockedBatch],
    ["quality", "质量状态", `${active.iqc} / ${active.freeze}`],
    ["location", "线边库位", `${active.sideLocation} · ${active.picked}`],
    ["usage", "用量核销", `${active.feedQty}/${active.demandQty} ${active.unit}`],
  ];
  $("#feedingGateFlow").innerHTML = gates.map(([key, label, desc]) => {
    const status = active.gates[key];
    return `
      <article class="feeding-gate-item ${getGateClass(status)}">
        <span>${label}</span>
        <strong>${desc}</strong>
        <em>${status}</em>
      </article>
    `;
  }).join("");
}

function renderMaterialCards() {
  const active = getActiveFeeding();
  $("#materialCards").innerHTML = active.materials.map((material) => `
    <article class="material-card ${getMaterialClass(material.status)}">
      <span>${material.no}</span>
      <strong>${material.name}</strong>
      <b>${material.batch}</b>
      <p>需求 ${material.demand}，可用 ${material.available} · ${material.location}</p>
      <p>${material.quality} · ${material.rule}</p>
      <em>${material.status}</em>
    </article>
  `).join("");
}

function renderTraceCards() {
  const active = getActiveFeeding();
  const cards = [
    ["批次谱系", active.status === "已确认" ? `${active.lockedBatch} 已绑定` : "等待投料确认", "原料批次进入成品批次谱系"],
    ["过程记录", active.status === "已确认" ? "可继续采集过程参数" : "投料完成后开放", "扭矩、测试值、设备信号引用投料批次"],
    ["用料核销", active.status === "差异待核销" ? active.variance : `${active.feedQty}/${active.demandQty} ${active.unit}`, "标准用量、补料、损耗和余料退回"],
    ["异常闭环", active.status === "已拦截" ? active.variance : "暂无未闭环异常", "错料错批需保留责任人、原因和处置结果"],
  ];
  $("#traceCards").innerHTML = cards.map(([label, value, hint]) => `
    <article class="trace-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");
}

function renderHistory() {
  const visibleIds = new Set(getVisibleFeedings().map((item) => item.id));
  const visible = history.filter((item) => visibleIds.has(item.feedingId)).slice(0, 30);
  $("#feedingHistoryBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.feedingId === state.activeFeedingId ? "is-active" : ""}" data-id="${item.feedingId}">
      <td>${item.time}</td>
      <td>${item.action}</td>
      <td>${item.scanType} / ${item.scanCode}</td>
      <td>${item.material} / ${item.batch}</td>
      <td>${item.station} / ${item.dispatchNo}</td>
      <td>${item.qty}</td>
      <td>${item.result}</td>
    </tr>
  `).join("") : `<tr><td colspan="7">当前筛选条件下没有投料回执履历</td></tr>`;

  $("#feedingHistoryBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectFeeding(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveFeeding();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatch").textContent = item.dispatchNo;
  $("#detailSubtitle").textContent = `${item.operation} · ${item.station}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["产品", item.product],
    ["工序", item.operation],
    ["工位", item.station],
    ["物料", `${item.materialName} · ${item.materialNo}`],
    ["锁定批次", item.lockedBatch],
    ["扫描批次", item.scannedBatch || "未回传"],
    ["料盒 / 库位", `${item.containerCode} / ${item.sideLocation}`],
    ["需求数量", `${item.demandQty} ${item.unit}`],
    ["已投数量", `${item.feedQty} ${item.unit}`],
    ["质量状态", `${item.iqc} / ${item.freeze}`],
    ["有效期", item.shelfLife],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  const gates = [
    ["派工匹配", item.gates.dispatch, `${item.dispatchNo} 属于 ${item.station}`],
    ["BOM 物料", item.gates.bom, `${item.materialNo} 是当前工序需求物料`],
    ["批次防错", item.gates.batch, item.scannedBatch || "等待模拟现场扫码回传"],
    ["质量放行", item.gates.quality, `${item.iqc}，${item.freeze}`],
    ["线边签收", item.gates.location, `${item.sideLocation} · ${item.picked}`],
    ["用量核销", item.gates.usage, `${item.feedQty}/${item.demandQty} ${item.unit}`],
  ];
  $("#gateList").innerHTML = gates.map(([label, status, desc]) => `
    <div class="login-gate-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${desc}</strong>
      <span>${status}</span>
    </div>
  `).join("");
  $("#blockReasonSelect").value = state.blockReason;
  $("#ownerSelect").value = state.owner;
}

function renderLogs() {
  const active = getActiveFeeding();
  const scoped = logs.filter((log) => log.feedingId === active.id).slice(0, 5);
  $("#feedingLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.time}</span>
        <strong>${log.action}</strong>
        <em>${log.result}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.variance || "等待模拟现场扫码枪/PDA 投料回传"}</strong><em>后台记录校验、拦截、放行和核销结果</em></div>`;
}

function getExpectedCode(item) {
  if (state.feedMode === "模拟物料标签") return item.materialNo;
  if (state.feedMode === "模拟料盒标签") return item.containerCode;
  if (state.feedMode === "模拟余料标签") return item.containerCode;
  return item.lockedBatch;
}

function getGateText(item) {
  const blocked = Object.values(item.gates).filter((value) => value === "拦截").length;
  const pending = Object.values(item.gates).filter((value) => value === "待确认").length;
  if (blocked) return `拦截 ${blocked} 项`;
  if (pending) return `待确认 ${pending} 项`;
  return "校验通过";
}

function getGateClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getMaterialClass(status) {
  if (status === "通过") return "is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已确认") return "green";
  if (status === "已拦截") return "red";
  if (status === "差异待核销") return "orange";
  return "blue";
}

function selectFeeding(id) {
  state.activeFeedingId = id;
  state.detailOpen = true;
  recordLog(id, "已打开投料确认任务详情", "后台切换到当前派工单与物料批次");
  saveState();
  renderAll();
}

function updateFeeding(id, patch, message) {
  const index = feedings.findIndex((item) => item.id === id);
  if (index < 0) return;
  feedings[index] = { ...feedings[index], ...patch };
  const next = feedings[index];
  if (patch.status === "已确认") {
    window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, "feedingConfirm", {
      dispatchId: next.dispatchNo,
      station: next.station,
      equipment: next.equipment,
      status: "投料已确认",
      owner: next.operator,
      result: message,
    });
  }
  if (patch.status === "已拦截") {
    window.MES_BUSINESS_FLOW?.applyStationAction?.(next.orderId, "feedingBlock", {
      dispatchId: next.dispatchNo,
      station: next.station,
      equipment: next.equipment,
      status: "已拦截",
      owner: state.owner,
      reason: next.variance || message,
    });
  }
  if (patch.status === "差异待核销") {
    window.MES_BUSINESS_FLOW?.applyMaterialAction?.(next.orderId, "feedingReview", {
      owner: state.owner,
      status: "差异待核销",
      label: "投料差异登记",
      reason: next.variance || message,
    });
  }
  state.activeFeedingId = id;
  recordLog(id, message, "状态已保存到本机演示数据");
  saveState();
  renderAll();
  showToast(message);
}

function confirmFeeding(item, message) {
  const invalid = Object.values(item.gates).some((gate) => gate === "拦截");
  if (invalid) {
    showToast("存在投料拦截项，不能确认回执");
    return;
  }
  const batch = $("#feedCodeInput").value.trim() || getExpectedCode(item);
  if (state.feedMode === "模拟批次标签" && batch !== item.lockedBatch) {
    blockFeeding(item, "物料批次与派工锁定批次不一致", state.owner);
    return;
  }
  const gates = Object.fromEntries(Object.keys(item.gates).map((key) => [key, "通过"]));
  appendHistory(item, {
    action: "模拟投料确认回执",
    scanType: state.feedMode,
    scanCode: batch,
    batch: state.feedMode === "模拟批次标签" ? batch : item.lockedBatch,
    qty: `${item.demandQty} ${item.unit}`,
    result: "料号、批次、IQC、库位和用量校验通过，已绑定投料记录",
  });
  updateFeeding(item.id, {
    status: "已确认",
    feedQty: item.demandQty,
    scannedBatch: item.lockedBatch,
    variance: "",
    gates,
    materials: item.materials.map((material) => material.no === item.materialNo ? { ...material, status: "通过", available: Math.max(0, material.available - item.demandQty) } : material),
  }, message);
  $("#feedCodeInput").value = "";
}

function blockFeeding(item, reason, owner) {
  const gates = { ...item.gates };
  if (reason.includes("BOM") || reason.includes("料号")) gates.bom = "拦截";
  else if (reason.includes("批次")) gates.batch = "拦截";
  else if (reason.includes("IQC") || reason.includes("冻结")) gates.quality = "拦截";
  else if (reason.includes("库位")) gates.location = "拦截";
  else gates.usage = "拦截";
  const scanCode = $("#feedCodeInput").value.trim() || getExpectedCode(item);
  appendHistory(item, {
    action: "模拟投料拦截",
    scanType: state.feedMode,
    scanCode,
    batch: state.feedMode === "模拟批次标签" ? scanCode : item.scannedBatch || item.lockedBatch,
    qty: `${item.feedQty} ${item.unit}`,
    result: `${reason}，责任人：${owner}`,
  });
  updateFeeding(item.id, {
    status: "已拦截",
    scannedBatch: state.feedMode === "模拟批次标签" ? scanCode : item.scannedBatch,
    gates,
    variance: reason,
    materials: item.materials.map((material) => material.no === item.materialNo ? { ...material, status: "拦截" } : material),
  }, "已登记投料拦截");
}

function markVariance(item) {
  const reason = state.blockReason || "超过工序标准用量";
  appendHistory(item, {
    action: "差异登记",
    scanType: state.feedMode,
    scanCode: $("#feedCodeInput").value.trim() || getExpectedCode(item),
    qty: `${item.feedQty || item.demandQty + 10} ${item.unit}`,
    result: `${reason}，等待核销或余料退回`,
  });
  updateFeeding(item.id, {
    status: "差异待核销",
    feedQty: item.feedQty || item.demandQty + 10,
    scannedBatch: item.scannedBatch || item.lockedBatch,
    variance: `${reason}，等待核销或余料退回`,
    gates: { ...item.gates, usage: "待确认", batch: item.gates.batch === "拦截" ? "拦截" : "通过" },
  }, "已登记用料差异");
}

function releaseFeeding(item) {
  const gates = Object.fromEntries(Object.entries(item.gates).map(([key, value]) => [key, value === "拦截" ? "通过" : value]));
  appendHistory(item, {
    action: "处置放行",
    scanType: "后台处置",
    scanCode: item.scannedBatch || item.lockedBatch,
    qty: `${item.feedQty} ${item.unit}`,
    result: "异常已处置，允许模拟现场重新扫码或继续核销",
  });
  updateFeeding(item.id, {
    status: item.status === "差异待核销" ? "已确认" : "待投料",
    gates,
    variance: item.status === "差异待核销" ? "差异已核销" : "拦截已解除，等待模拟现场重新扫码",
    materials: item.materials.map((material) => material.status === "拦截" ? { ...material, status: "待确认" } : material),
  }, "投料异常已处置放行");
}

function appendHistory(item, patch) {
  history = [
    {
      id: `FH-${Date.now()}`,
      feedingId: item.id,
      time: patch.time || nowTime(),
      action: patch.action,
      scanType: patch.scanType || state.feedMode,
      scanCode: patch.scanCode || getExpectedCode(item),
      material: item.materialName,
      batch: patch.batch || item.scannedBatch || item.lockedBatch,
      station: item.station,
      dispatchNo: item.dispatchNo,
      qty: patch.qty || `${item.feedQty} ${item.unit}`,
      result: patch.result || "已记录",
    },
    ...history,
  ].slice(0, 80);
}

function recordLog(feedingId, action, result) {
  logs = [
    { feedingId, action, result, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 70);
}

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

function bindEvents() {
  $("#feedingSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#feedingStatusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#feedingLineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#feedingOperationFilter").addEventListener("change", (event) => {
    state.operation = event.target.value;
    saveState();
    renderAll();
  });
  $("#blockReasonSelect").addEventListener("change", (event) => {
    state.blockReason = event.target.value;
    saveState();
  });
  $("#ownerSelect").addEventListener("change", (event) => {
    state.owner = event.target.value;
    saveState();
  });
  document.querySelectorAll("[data-feed-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.feedMode = button.dataset.feedMode;
      saveState();
      renderAll();
      showToast(`已切换为${state.feedMode}`);
    });
  });
  $("#syncFeedBtn").addEventListener("click", () => confirmFeeding(getActiveFeeding(), "已同步模拟现场投料确认回执"));
  $("#simulateScaleBtn").addEventListener("click", () => {
    const item = getActiveFeeding();
    appendHistory(item, { action: "模拟称重回传", scanType: "模拟电子秤信号", scanCode: item.containerCode, qty: `${item.demandQty} ${item.unit}`, result: "模拟称重结果已绑定当前派工单和物料批次" });
    recordLog(item.id, "已同步模拟称重回传", "称重数据进入用料核销占位");
    saveState();
    renderAll();
    showToast("模拟称重回传已同步");
  });
  $("#simulateBlockBtn").addEventListener("click", () => blockFeeding(getActiveFeeding(), state.blockReason, state.owner));
  $("#nextFeedBtn").addEventListener("click", () => {
    const index = feedings.findIndex((item) => item.id === state.activeFeedingId);
    state.activeFeedingId = feedings[(index + 1) % feedings.length].id;
    saveState();
    renderAll();
    showToast(`已切换到 ${getActiveFeeding().materialName}`);
  });
  $("#refreshFeedingBtn").addEventListener("click", () => {
    recordLog(getActiveFeeding().id, "已刷新投料监控", "已重新读取模拟现场扫码、线边库和质量状态");
    saveState();
    renderLogs();
    showToast("投料监控已刷新");
  });
  $("#closeFeedingDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showFeedingDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#recheckFeedingBtn").addEventListener("click", () => {
    recordLog(getActiveFeeding().id, "已重新执行投料校验", getGateText(getActiveFeeding()));
    saveState();
    renderLogs();
    showToast("投料校验已重新执行");
  });
  $("#detailConfirmBtn").addEventListener("click", () => confirmFeeding(getActiveFeeding(), "已从详情同步模拟投料确认回执"));
  $("#varianceBtn").addEventListener("click", () => markVariance(getActiveFeeding()));
  $("#detailBlockBtn").addEventListener("click", () => blockFeeding(getActiveFeeding(), state.blockReason, state.owner));
  $("#releaseBlockBtn").addEventListener("click", () => releaseFeeding(getActiveFeeding()));
  $("#batchReleaseBtn").addEventListener("click", () => {
    feedings = feedings.map((item) => {
      if (item.status !== "已拦截") return item;
      const gates = Object.fromEntries(Object.entries(item.gates).map(([key]) => [key, "通过"]));
      return {
        ...item,
        status: "待投料",
        gates,
        variance: "批量处置完成，等待模拟现场重新扫码",
        materials: item.materials.map((material) => material.status === "拦截" ? { ...material, status: "待确认" } : material),
      };
    });
    recordLog(state.activeFeedingId, "已批量解除物料拦截", "拦截项已转为通过，等待模拟现场重新扫码");
    saveState();
    renderAll();
    showToast("已批量解除物料拦截");
  });
  $("#resetFeedingBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    feedings = structuredClone(initialFeedings);
    history = structuredClone(initialHistory);
    logs = [];
    state = { activeFeedingId: "FD-004-A", search: "", status: "all", line: "all", operation: "all", detailOpen: true, feedMode: "模拟批次标签", blockReason: "料号不属于当前工序 BOM", owner: "物料员" };
    $("#feedingSearch").value = "";
    $("#feedingStatusFilter").value = "all";
    $("#feedingLineFilter").value = "all";
    $("#feedingOperationFilter").value = "all";
    $("#feedCodeInput").value = "";
    renderAll();
    showToast("投料确认演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#feedingSearch").value = state.search;
$("#feedingStatusFilter").value = state.status;
$("#feedingLineFilter").value = state.line;
$("#feedingOperationFilter").value = state.operation;
bindEvents();
renderAll();
