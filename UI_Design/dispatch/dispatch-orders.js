const STORAGE_KEY = "xingjigu_mes_dispatch_orders_v1";

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

const initialDispatchOrders = [
  {
    id: "D-001",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: "SMT 贴片",
    seq: "10",
    qty: 800,
    done: 428,
    line: "Line-A",
    workstation: "SMT-WS-01",
    equipment: "SMT-01",
    team: "A1 班",
    operator: "王海",
    planStart: "06-20 08:00",
    planEnd: "06-20 12:00",
    status: "生产中",
    priority: "高",
    mode: "推式",
    sop: "SOP-TCU-SMT V3.2",
    inspection: "首件 + IPQC",
    material: "齐套",
    next: "D-002",
    progressNote: "首件已放行，炉温曲线正常",
  },
  {
    id: "D-002",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: "DIP 插件",
    seq: "20",
    qty: 800,
    done: 0,
    line: "Line-A",
    workstation: "DIP-WS-01",
    equipment: "DIP-Line-A",
    team: "A1 班",
    operator: "待接单",
    planStart: "06-20 13:00",
    planEnd: "06-20 18:00",
    status: "待接单",
    priority: "高",
    mode: "推式",
    sop: "SOP-TCU-DIP V2.8",
    inspection: "IPQC 巡检",
    material: "等待 SMT 转入",
    next: "D-003",
    progressNote: "等待上道批次移交",
  },
  {
    id: "D-003",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: "程序烧录",
    seq: "30",
    qty: 800,
    done: 0,
    line: "Line-A",
    workstation: "Burn-WS-01",
    equipment: "Burn-01",
    team: "A1 班",
    operator: "待分配",
    planStart: "06-21 08:00",
    planEnd: "06-21 12:00",
    status: "待下达",
    priority: "中",
    mode: "混合",
    sop: "SOP-TCU-BURN V1.9",
    inspection: "烧录版本校验",
    material: "待上道转入",
    next: "D-004",
    progressNote: "固件版本已锁定",
  },
  {
    id: "D-004",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: "整机装配",
    seq: "40",
    qty: 800,
    done: 0,
    line: "Line-A",
    workstation: "ASM-WS-03",
    equipment: "Assembly-A",
    team: "A1 班",
    operator: "待分配",
    planStart: "06-21 13:00",
    planEnd: "06-21 18:00",
    status: "待下达",
    priority: "中",
    mode: "推式",
    sop: "SOP-TCU-ASM V4.0",
    inspection: "扭矩抽检",
    material: "外壳上盖缺 120 件",
    next: "D-005",
    progressNote: "第二批注塑件预计 14:00 到线边",
  },
  {
    id: "D-021",
    orderId: "MO-202606-0002",
    product: "工业网关 GW-240",
    customer: "B 客户",
    operation: "SMT 贴片",
    seq: "10",
    qty: 600,
    done: 315,
    line: "Line-B",
    workstation: "SMT-WS-02",
    equipment: "SMT-02",
    team: "B1 班",
    operator: "李敏",
    planStart: "06-20 08:30",
    planEnd: "06-20 12:30",
    status: "生产中",
    priority: "高",
    mode: "推式",
    sop: "SOP-GW-SMT V2.4",
    inspection: "首件 + IPQC",
    material: "齐套",
    next: "D-022",
    progressNote: "客户 B 加急，排在测试队列前置",
  },
  {
    id: "D-031",
    orderId: "MO-202606-0003",
    product: "边缘采集器 ECU-80",
    customer: "C 客户",
    operation: "老化测试",
    seq: "60",
    qty: 1200,
    done: 760,
    line: "Line-C",
    workstation: "AGING-01",
    equipment: "Aging-Room-1",
    team: "C1 班",
    operator: "周强",
    planStart: "06-20 10:00",
    planEnd: "06-20 18:00",
    status: "异常锁定",
    priority: "中",
    mode: "拉式",
    sop: "SOP-ECU-AGING V2.1",
    inspection: "老化参数监控",
    material: "齐套",
    next: "D-032",
    progressNote: "老化房容量接近上限，等待设备组确认",
  },
  {
    id: "D-041",
    orderId: "MO-202606-0004",
    product: "智能传感节点 SEN-20",
    customer: "A 客户",
    operation: "FQC 成品检验",
    seq: "70",
    qty: 2000,
    done: 1280,
    line: "Line-A",
    workstation: "QC-Final",
    equipment: "FQC-01",
    team: "A1 班",
    operator: "QC-001",
    planStart: "06-20 14:00",
    planEnd: "06-20 18:00",
    status: "待接单",
    priority: "中",
    mode: "推式",
    sop: "SOP-SEN-FQC V3.1",
    inspection: "FQC 抽检",
    material: "待检批次已到位",
    next: "入库",
    progressNote: "样本数量待质量组确认",
  },
  {
    id: "D-111",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    customer: "I 客户",
    operation: "包装入库",
    seq: "80",
    qty: 1800,
    done: 1480,
    line: "Line-C",
    workstation: "PACK-WS-02",
    equipment: "Pack-C",
    team: "C1 班",
    operator: "陈洁",
    planStart: "06-20 09:00",
    planEnd: "06-20 17:30",
    status: "生产中",
    priority: "低",
    mode: "推式",
    sop: "SOP-THS-PACK V1.6",
    inspection: "箱码复核",
    material: "包装材料齐套",
    next: "入库",
    progressNote: "等待尾批 FQC 放行",
  },
];

let dispatchOrders = structuredClone(initialDispatchOrders);
let dispatchLogs = [];
let state = {
  activeDispatchId: "D-001",
  search: "",
  status: "all",
  line: "all",
  team: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#dispatchModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "派工单" ? " class=\"is-active\"" : "";
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

  $("#dispatchModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#dispatchModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
      else if (moduleId === "dispatch" && entry === "派工单") window.location.href = "./dispatch-orders.html";
      else if (moduleId === "dispatch" && entry === "工序任务") window.location.href = "./operation-tasks.html";
      else if (moduleId === "dispatch" && entry === "班组任务") window.location.href = "./team-tasks.html";
      else if (moduleId === "dispatch" && entry === "任务下达") window.location.href = "./task-release.html";
      else if (moduleId === "dispatch" && entry === "任务变更") window.location.href = "./task-change.html";
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "./sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "./start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
      else if (moduleId === "station" && entry === "扫码开工") window.location.href = "../station/scan-start.html";
      else if (moduleId === "station" && entry === "工艺指导") window.location.href = "../station/work-instruction.html";
      else if (moduleId === "station" && entry === "投料确认") window.location.href = "../station/feeding-confirmation.html";
      else if (moduleId === "station" && entry === "过程记录") window.location.href = "../station/process-record.html";
      else if (moduleId === "station" && entry === "工序报工") window.location.href = "../station/operation-report.html";
      else if (moduleId === "station" && entry === "交接班") window.location.href = "../station/shift-handover.html";
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    dispatchOrders = window.MES_DISPATCH_LEDGER?.getOrderRows?.() || saved?.dispatchOrders || dispatchOrders;
    if (!saved) {
      mergeFlowDispatchRows();
      return;
    }
    dispatchLogs = saved.dispatchLogs || dispatchLogs;
    state = { ...state, ...(saved.dispatchState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  mergeFlowDispatchRows();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ dispatchOrders, dispatchLogs, dispatchState: state }));
}

function syncDispatchOrdersFromLedger() {
  const ledgerRows = window.MES_DISPATCH_LEDGER?.getOrderRows?.();
  if (!ledgerRows?.length) return;
  dispatchOrders = ledgerRows;
  if (!dispatchOrders.some((item) => item.id === state.activeDispatchId)) state.activeDispatchId = dispatchOrders[0]?.id || "";
}

function mergeFlowDispatchRows() {
  const flowRows = window.MES_BUSINESS_FLOW?.getDispatchRows?.() || [];
  if (!flowRows.length) return;
  const existing = new Map(dispatchOrders.map((item) => [item.id, item]));
  flowRows.forEach((item) => {
    if (!existing.has(item.id)) dispatchOrders.push(item);
  });
  if (!dispatchOrders.some((item) => item.id === state.activeDispatchId)) state.activeDispatchId = dispatchOrders[0]?.id || "";
}

function getActiveDispatch() {
  return dispatchOrders.find((item) => item.id === state.activeDispatchId) || dispatchOrders[0];
}

function getVisibleDispatchOrders() {
  const keyword = state.search.trim().toLowerCase();
  return dispatchOrders.filter((item) => {
    const text = `${item.id} ${item.orderId} ${item.product} ${item.customer} ${item.operation} ${item.team} ${item.operator}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const teamMatch = state.team === "all" || item.team === state.team;
    return keywordMatch && statusMatch && lineMatch && teamMatch;
  });
}

function renderAll() {
  syncDispatchOrdersFromLedger();
  mergeFlowDispatchRows();
  renderDetailPanelState();
  renderMetrics();
  renderDispatchList();
  renderOperationFlow();
  renderResourceBoard();
  renderDispatchTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".dispatch-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#dispatchDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  $("#metricDraft").textContent = dispatchOrders.filter((item) => item.status === "待下达").length;
  $("#metricReleased").textContent = dispatchOrders.filter((item) => ["待接单", "待开工", "可开工"].includes(item.status)).length;
  $("#metricRunning").textContent = dispatchOrders.filter((item) => item.status === "生产中").length;
  $("#metricBlocked").textContent = dispatchOrders.filter((item) => ["异常锁定", "下达拦截", "开工拦截", "报工拦截"].includes(item.status)).length;
}

function renderDispatchList() {
  const visible = getVisibleDispatchOrders();
  $("#dispatchList").innerHTML = visible.length ? visible.map((item) => {
    const percent = Math.round((item.done / Math.max(1, item.qty)) * 100);
    return `
      <button class="dispatch-card${item.id === state.activeDispatchId ? " is-active" : ""}" type="button" data-id="${item.id}">
        <div class="dispatch-card__top">
          <strong>${item.id} · ${item.operation}</strong>
          <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
        </div>
        <span class="dispatch-card__product">${item.orderId} · ${item.product}</span>
        <div class="dispatch-card__meta">
          <span>${item.line}</span>
          <span>${item.workstation}</span>
          <span>${item.team}</span>
          <span>${item.planStart}-${item.planEnd.split(" ").pop()}</span>
        </div>
        <div class="mini-progress"><span style="width:${percent}%"></span></div>
        <div class="dispatch-card__foot">
          <span>${item.done} / ${item.qty} 台</span>
          <span>${item.material}</span>
        </div>
      </button>
    `;
  }).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有派工单</strong><em>请调整筛选条件</em></div>`;

  $("#dispatchList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectDispatch(card.dataset.id));
  });
}

function renderOperationFlow() {
  const active = getActiveDispatch();
  const sameOrder = dispatchOrders
    .filter((item) => item.orderId === active.orderId)
    .sort((a, b) => Number(a.seq) - Number(b.seq));
  $("#flowOrderText").textContent = `${active.orderId} · ${active.product}`;
  $("#operationFlow").innerHTML = sameOrder.map((item) => `
    <article class="flow-node${item.id === active.id ? " is-active" : ""}">
      <span>${item.seq} · ${item.id}</span>
      <strong>${item.operation}</strong>
      <em>${item.status} · ${item.done}/${item.qty}</em>
    </article>
  `).join("");
}

function renderResourceBoard() {
  const active = getActiveDispatch();
  const lineOrders = dispatchOrders.filter((item) => item.line === active.line);
  const groups = [
    ["设备", active.equipment, lineOrders.filter((item) => item.equipment === active.equipment).length],
    ["工位", active.workstation, lineOrders.filter((item) => item.workstation === active.workstation).length],
    ["班组", active.team, lineOrders.filter((item) => item.team === active.team).length],
  ];
  $("#resourceBoard").innerHTML = groups.map(([label, value, count]) => `
    <article class="resource-item">
      <div class="resource-item__top">
        <span>${label}</span>
        <span>${count} 单</span>
      </div>
      <strong>${value}</strong>
      <em>${active.line} · ${active.planStart}-${active.planEnd.split(" ").pop()}</em>
    </article>
  `).join("");
}

function renderDispatchTable() {
  const visible = getVisibleDispatchOrders();
  $("#dispatchTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeDispatchId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.orderId} · ${item.product}</td>
      <td>${item.seq} · ${item.operation}</td>
      <td>${item.planStart}-${item.planEnd.split(" ").pop()}</td>
      <td>${item.workstation} / ${item.equipment} / ${item.team}</td>
      <td>${item.done} / ${item.qty}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-action="select" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有派工单</td></tr>`;

  $("#dispatchTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectDispatch(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveDispatch();
  $("#detailStatus").textContent = item.status;
  $("#detailDispatchNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.operation} · ${item.product}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["客户", item.customer],
    ["数量", `${item.done} / ${item.qty} 台`],
    ["产线", item.line],
    ["工位", item.workstation],
    ["设备", item.equipment],
    ["工装", item.tooling || "待绑定"],
    ["班组", item.team],
    ["操作员", item.operator],
    ["计划窗口", `${item.planStart}-${item.planEnd.split(" ").pop()}`],
    ["派工模式", item.mode],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status} · ${gate.source || "MES 校验"}</span>
    </div>
  `).join("");

  $("#readinessList").innerHTML = [
    ["SOP", item.sop, item.sop.includes("V") ? "已下发" : "待确认"],
    ["检验计划", item.inspection, item.inspection ? "已配置" : "待配置"],
    ["物料", item.material, getMaterialStatus(item)],
    ["下道任务", item.next, item.next === "入库" ? "末道" : "已关联"],
    ["派工版本", item.ledger?.dispatchVersion || "V1", "已关联"],
    ["追溯引用", item.ledger?.references?.traceId || "待生成", item.ledger?.references?.traceId ? "已关联" : "待确认"],
  ].map(([label, value, status]) => `
    <div class="readiness-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveDispatch();
  const logs = dispatchLogs.filter((log) => log.dispatchId === active.id).slice(0, 5);
  const ledgerLogs = (active.ledger?.records || []).slice(0, 5).map((record) => ({
    dispatchId: active.id,
    action: `${record.action}（${record.source || "MES 后台"}）`,
    time: record.time,
  }));
  const visibleLogs = [...logs, ...ledgerLogs].slice(0, 5);
  $("#dispatchLogList").innerHTML = visibleLogs.length
    ? visibleLogs.map((log) => `
      <div class="integration-item">
        <span>${log.dispatchId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.progressNote}</strong><em>等待现场动作</em></div>`;
}

function buildGateItems(item) {
  const materialStatus = getMaterialStatus(item);
  return [
    { label: "派工状态", desc: item.status === "待下达" ? "尚未推送到工位终端" : "已进入现场队列", status: item.status === "待下达" ? "待确认" : "通过", source: "派工主账本" },
    { label: "工位匹配", desc: `${item.operation} 绑定 ${item.workstation}`, status: "通过", source: "基础资料" },
    { label: "设备可用", desc: item.status === "异常锁定" ? `${item.equipment} 需设备组确认` : `${item.equipment} 可用`, status: item.status === "异常锁定" ? "拦截" : "通过", source: "模拟 PLC/设备状态" },
    { label: "人员资质", desc: item.operator === "待分配" || item.operator === "待接单" ? "操作员待班组确认" : `${item.operator} 资质有效`, status: item.operator.includes("待") ? "待确认" : "通过", source: "人员资质矩阵" },
    { label: "物料齐套", desc: item.material, status: materialStatus === "已准备" ? "通过" : "待确认", source: "齐套检查/WMS 模拟回执" },
    { label: "质量要求", desc: item.inspection, status: "通过", source: "质量计划" },
  ];
}

function getMaterialStatus(item) {
  if (item.material.includes("缺")) return "待确认";
  if (item.material.includes("等待") || item.material.includes("待")) return "待确认";
  return "已准备";
}

function getGateClass(status) {
  if (["通过", "已准备", "已下发", "已配置", "已关联", "末道"].includes(status)) return "is-pass is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "生产中" || status === "已完工") return "green";
  if (["异常锁定", "下达拦截", "开工拦截", "报工拦截"].includes(status)) return "red";
  if (["待接单", "待开工", "待报工", "可开工"].includes(status)) return "orange";
  return "blue";
}

function selectDispatch(id) {
  state.activeDispatchId = id;
  state.detailOpen = true;
  saveState();
  renderAll();
}

function updateDispatch(id, patch, message) {
  const index = dispatchOrders.findIndex((item) => item.id === id);
  if (index < 0) return;
  const ledgerPatch = {};
  if (typeof patch.done === "number") ledgerPatch.outputQty = patch.done;
  if (patch.operator) ledgerPatch.operator = patch.operator;
  if (patch.team) ledgerPatch.team = patch.team;
  if (patch.status) {
    const result = window.MES_DISPATCH_LEDGER?.updateStatus?.(id, patch.status, {
      ...ledgerPatch,
      owner: patch.operator || dispatchOrders[index].operator || dispatchOrders[index].team,
      source: message.includes("模拟") ? "模拟现场回执" : "MES 后台",
      action: message,
    });
    if (result && !result.ok) {
      showToast(result.reason);
      return;
    }
  }
  dispatchOrders[index] = { ...dispatchOrders[index], ...patch };
  if (patch.status === "待接单") {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(dispatchOrders[index].orderId, "release", { owner: dispatchOrders[index].operator || "车间主任" });
  } else if (patch.status === "异常锁定") {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(dispatchOrders[index].orderId, "hold", { owner: dispatchOrders[index].operator || "车间主任", reason: message });
  } else {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(dispatchOrders[index].orderId, "generate", { owner: dispatchOrders[index].operator || "车间主任" });
  }
  state.activeDispatchId = id;
  recordLog(id, message);
  if (!patch.status) window.MES_DISPATCH_LEDGER?.appendRecord?.(id, message, { source: "MES 后台" });
  saveState();
  renderAll();
  showToast(message);
}

function recordLog(dispatchId, action) {
  dispatchLogs = [
    { dispatchId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...dispatchLogs,
  ].slice(0, 60);
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
  $("#dispatchSearch").addEventListener("input", (event) => {
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
  $("#teamFilter").addEventListener("change", (event) => {
    state.team = event.target.value;
    saveState();
    renderAll();
  });
  $("#releaseReadyBtn").addEventListener("click", () => {
    const targets = dispatchOrders.filter((item) => item.status === "待下达" && getMaterialStatus(item) === "已准备");
    if (!targets.length) {
      showToast("没有可批量下达的派工单");
      return;
    }
    targets.forEach((item) => {
      window.MES_DISPATCH_LEDGER?.updateStatus?.(item.id, "待接单", {
        owner: item.operator || "车间主任",
        source: "MES 后台",
        action: "派工单已批量下达到工位终端",
      });
      item.status = "待接单";
      recordLog(item.id, "派工单已批量下达到工位终端");
      window.MES_BUSINESS_FLOW?.applyDispatchAction?.(item.orderId, "release", { owner: item.operator || "车间主任" });
    });
    state.activeDispatchId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已下达 ${targets.length} 张派工单`);
  });
  $("#exportTaskBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    recordLog(item.id, "已生成后台任务卡，包含 SOP、检验计划和物料清单");
    window.MES_DISPATCH_LEDGER?.appendRecord?.(item.id, "已生成后台任务卡", { source: "MES 后台" });
    saveState();
    renderLogs();
    showToast("任务卡已生成");
  });
  $("#closeDetailBtn").addEventListener("click", () => {
    state.detailOpen = false;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已关闭");
  });
  $("#showDetailBtn").addEventListener("click", () => {
    state.detailOpen = true;
    saveState();
    renderDetailPanelState();
    showToast("详情面板已打开");
  });
  $("#runGateBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    recordLog(item.id, "已重新执行开工校验门");
    saveState();
    renderLogs();
    showToast("开工校验已刷新");
  });
  $("#releaseBtn").addEventListener("click", () => updateDispatch(getActiveDispatch().id, { status: "待接单" }, "派工单已下达到班组和工位终端"));
  $("#acceptBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    updateDispatch(item.id, { status: "待开工", operator: item.operator.includes("待") ? "班组长模拟接收" : item.operator }, "已接收模拟班组接收回执，等待开工检查");
  });
  $("#startBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    const blockedGate = buildGateItems(item).find((gate) => gate.status === "拦截");
    if (blockedGate) {
      showToast(`${blockedGate.label}未通过，不能开工`);
      return;
    }
    updateDispatch(item.id, { status: "生产中", operator: item.operator.includes("待") ? "现场操作员" : item.operator }, "模拟扫码开工回执通过，派工单进入生产中");
  });
  $("#completeBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    updateDispatch(item.id, { status: "已完工", done: item.qty }, "模拟工位完工回执通过，已触发下道派工或入库准备");
  });
  $("#blockBtn").addEventListener("click", () => updateDispatch(getActiveDispatch().id, { status: "异常锁定" }, "派工单已异常锁定，等待责任人处理"));
  $("#reassignBtn").addEventListener("click", () => {
    const item = getActiveDispatch();
    const nextTeam = item.team === "A1 班" ? "设备组" : "A1 班";
    updateDispatch(item.id, { team: nextTeam, operator: "待接单", status: "待接单" }, "资源已重分配并推送到新责任班组");
  });
  $("#resetDispatchBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    window.MES_DISPATCH_LEDGER?.reset?.();
    dispatchOrders = structuredClone(window.MES_DISPATCH_LEDGER?.getOrderRows?.() || window.MES_BUSINESS_FLOW?.getDispatchRows?.() || initialDispatchOrders);
    dispatchLogs = [];
    state = { activeDispatchId: "D-001", search: "", status: "all", line: "all", team: "all", detailOpen: true };
    $("#dispatchSearch").value = "";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    $("#teamFilter").value = "all";
    renderAll();
    showToast("派工演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#dispatchSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
$("#teamFilter").value = state.team;
bindEvents();
window.addEventListener("mes-flow:changed", () => {
  mergeFlowDispatchRows();
  renderAll();
});
renderAll();
