const STORAGE_KEY = "xingjigu_mes_operation_tasks_v1";

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

const initialTasks = [
  { id: "OP-0010", dispatchId: "D-001", orderId: "MO-202606-0001", product: "智能温控控制器 TCU-100", operation: "SMT 贴片", type: "贴片", seq: 10, line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", operator: "王海", planQty: 800, inputQty: 800, outputQty: 428, defectQty: 3, takt: "32 秒/片", status: "进行中", material: "PCB、传感器、显示屏已投料", quality: "首件已放行", parameter: "炉温曲线正常", next: "OP-0020", note: "当前节拍稳定，预计 11:58 完成 SMT 批次" },
  { id: "OP-0020", dispatchId: "D-002", orderId: "MO-202606-0001", product: "智能温控控制器 TCU-100", operation: "DIP 插件", type: "装配", seq: 20, line: "Line-A", station: "DIP-WS-01", equipment: "DIP-Line-A", operator: "待接单", planQty: 800, inputQty: 0, outputQty: 0, defectQty: 0, takt: "46 秒/台", status: "待开工", material: "等待 SMT 转入", quality: "IPQC 巡检已配置", parameter: "工装已点检", next: "OP-0030", note: "等待上道批次转入后扫码开工" },
  { id: "OP-0030", dispatchId: "D-003", orderId: "MO-202606-0001", product: "智能温控控制器 TCU-100", operation: "程序烧录", type: "测试", seq: 30, line: "Line-A", station: "BURN-WS-01", equipment: "Burn-01", operator: "待分配", planQty: 800, inputQty: 0, outputQty: 0, defectQty: 0, takt: "18 秒/台", status: "待开工", material: "待上道转入", quality: "烧录版本校验", parameter: "固件 TCU-20260620 已锁定", next: "OP-0040", note: "烧录程序版本已审核" },
  { id: "OP-0040", dispatchId: "D-004", orderId: "MO-202606-0001", product: "智能温控控制器 TCU-100", operation: "整机装配", type: "装配", seq: 40, line: "Line-A", station: "ASM-WS-03", equipment: "Assembly-A", operator: "待分配", planQty: 800, inputQty: 0, outputQty: 0, defectQty: 0, takt: "58 秒/台", status: "异常停滞", material: "外壳上盖缺 120 件", quality: "扭矩抽检已配置", parameter: "电批扭矩待复核", next: "OP-0050", note: "注塑件未到线边，当前不允许开工" },
  { id: "OP-0210", dispatchId: "D-021", orderId: "MO-202606-0002", product: "工业网关 GW-240", operation: "SMT 贴片", type: "贴片", seq: 10, line: "Line-B", station: "SMT-WS-02", equipment: "SMT-02", operator: "李敏", planQty: 600, inputQty: 600, outputQty: 315, defectQty: 2, takt: "35 秒/片", status: "进行中", material: "齐套并已投料", quality: "首件已放行", parameter: "贴片压力正常", next: "OP-0220", note: "客户 B 加急，测试工位已预留" },
  { id: "OP-0310", dispatchId: "D-031", orderId: "MO-202606-0003", product: "边缘采集器 ECU-80", operation: "老化测试", type: "测试", seq: 60, line: "Line-C", station: "AGING-01", equipment: "Aging-Room-1", operator: "周强", planQty: 1200, inputQty: 820, outputQty: 760, defectQty: 5, takt: "8 小时/批", status: "异常停滞", material: "齐套", quality: "老化参数监控", parameter: "老化房容量接近上限", next: "OP-0320", note: "等待设备组释放第二老化架" },
  { id: "OP-0410", dispatchId: "D-041", orderId: "MO-202606-0004", product: "智能传感节点 SEN-20", operation: "FQC 成品检验", type: "检验", seq: 70, line: "Line-A", station: "QC-Final", equipment: "FQC-01", operator: "QC-001", planQty: 2000, inputQty: 1280, outputQty: 0, defectQty: 0, takt: "抽样 50 件/批", status: "待开工", material: "待检批次已到位", quality: "样本数量待确认", parameter: "检验规范 V3.1", next: "入库", note: "质量组确认样本后开检" },
  { id: "OP-1110", dispatchId: "D-111", orderId: "MO-202606-0011", product: "温湿度采集器 THS-10", operation: "包装入库", type: "包装", seq: 80, line: "Line-C", station: "PACK-WS-02", equipment: "Pack-C", operator: "陈洁", planQty: 1800, inputQty: 1480, outputQty: 1480, defectQty: 0, takt: "42 秒/台", status: "待报工", material: "包装材料齐套", quality: "箱码复核通过", parameter: "客户标签模板已锁定", next: "入库", note: "产出已达当前进站数量，等待扫码报工" },
];

let tasks = structuredClone(initialTasks);
let logs = [];
let state = {
  activeTaskId: "OP-0010",
  search: "",
  status: "all",
  line: "all",
  type: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#operationModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "工序任务" ? " class=\"is-active\"" : "";
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

  $("#operationModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#operationModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    tasks = saved.tasks || tasks;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.operationState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, logs, operationState: state }));
}

function getActiveTask() {
  return tasks.find((item) => item.id === state.activeTaskId) || tasks[0];
}

function getVisibleTasks() {
  const keyword = state.search.trim().toLowerCase();
  return tasks.filter((item) => {
    const text = `${item.id} ${item.dispatchId} ${item.orderId} ${item.product} ${item.operation} ${item.station}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const lineMatch = state.line === "all" || item.line === state.line;
    const typeMatch = state.type === "all" || item.type === state.type;
    return keywordMatch && statusMatch && lineMatch && typeMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderTaskList();
  renderProcessFlow();
  renderWipBoard();
  renderTaskTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".operation-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#operationDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  $("#metricReady").textContent = tasks.filter((item) => item.status === "待开工").length;
  $("#metricRunning").textContent = tasks.filter((item) => item.status === "进行中").length;
  $("#metricReport").textContent = tasks.filter((item) => item.status === "待报工").length;
  $("#metricBlocked").textContent = tasks.filter((item) => item.status === "异常停滞").length;
}

function renderTaskList() {
  const visible = getVisibleTasks();
  $("#taskList").innerHTML = visible.length ? visible.map((item) => {
    const percent = Math.round((item.outputQty / Math.max(1, item.planQty)) * 100);
    return `
      <button class="task-card${item.id === state.activeTaskId ? " is-active" : ""}" type="button" data-id="${item.id}">
        <div class="task-card__top">
          <strong>${item.id} · ${item.operation}</strong>
          <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
        </div>
        <span class="task-card__product">${item.orderId} · ${item.product}</span>
        <div class="task-card__meta">
          <span>${item.dispatchId}</span>
          <span>${item.line}</span>
          <span>${item.station}</span>
          <span>${item.operator}</span>
        </div>
        <div class="mini-progress"><span style="width:${percent}%"></span></div>
        <div class="task-card__foot">
          <span>出站 ${item.outputQty} / ${item.planQty}</span>
          <span>不良 ${item.defectQty}</span>
        </div>
      </button>
    `;
  }).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有工序任务</strong><em>请调整筛选条件</em></div>`;

  $("#taskList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectTask(card.dataset.id));
  });
}

function renderProcessFlow() {
  const active = getActiveTask();
  const sameOrder = tasks.filter((item) => item.orderId === active.orderId).sort((a, b) => a.seq - b.seq);
  $("#activeOrderText").textContent = `${active.orderId} · ${active.product}`;
  $("#processFlow").innerHTML = sameOrder.map((item) => `
    <article class="process-node${item.id === active.id ? " is-active" : ""}">
      <span>${item.seq} · ${item.dispatchId}</span>
      <strong>${item.operation}</strong>
      <em>${item.status} · ${item.outputQty}/${item.planQty}</em>
    </article>
  `).join("");
}

function renderWipBoard() {
  const active = getActiveTask();
  const passQty = Math.max(0, active.outputQty - active.defectQty);
  const waitQty = Math.max(0, active.inputQty - active.outputQty);
  $("#wipBoard").innerHTML = [
    ["进站", active.inputQty, "已扫码进入当前工序"],
    ["出站", active.outputQty, "完成当前工序"],
    ["待处理", waitQty, "在制或等待判定"],
    ["不良", active.defectQty, `合格 ${passQty}`],
  ].map(([label, value, hint]) => `
    <article class="wip-card">
      <div class="wip-card__top">
        <span>${label}</span>
        <span>台</span>
      </div>
      <strong>${value}</strong>
      <em>${hint}</em>
    </article>
  `).join("");
}

function renderTaskTable() {
  const visible = getVisibleTasks();
  $("#taskTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeTaskId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.orderId} · ${item.product}</td>
      <td>${item.dispatchId}</td>
      <td>${item.station} / ${item.equipment}</td>
      <td>${item.planQty} / ${item.outputQty}</td>
      <td>${item.takt}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有工序任务</td></tr>`;

  $("#taskTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectTask(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveTask();
  $("#detailStatus").textContent = item.status;
  $("#detailTaskNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.operation} · ${item.product}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["派工单", item.dispatchId],
    ["产线", item.line],
    ["工位", item.station],
    ["设备", item.equipment],
    ["操作员", item.operator],
    ["计划/出站", `${item.planQty} / ${item.outputQty}`],
    ["节拍", item.takt],
    ["下道", item.next],
    ["不良", `${item.defectQty} 台`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  $("#processRecordList").innerHTML = [
    ["物料", item.material, getReadyStatus(item.material)],
    ["质量", item.quality, getReadyStatus(item.quality)],
    ["参数", item.parameter, getReadyStatus(item.parameter)],
    ["说明", item.note, item.status === "异常停滞" ? "需处理" : "记录中"],
  ].map(([label, value, status]) => `
    <div class="readiness-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveTask();
  const scoped = logs.filter((log) => log.taskId === active.id).slice(0, 5);
  $("#operationLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.taskId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.note}</strong><em>等待现场动作</em></div>`;
}

function buildGateItems(item) {
  return [
    { label: "任务状态", desc: item.status === "异常停滞" ? "任务被异常锁定" : "状态允许现场操作", status: item.status === "异常停滞" ? "拦截" : "通过" },
    { label: "工位匹配", desc: `${item.operation} 绑定 ${item.station}`, status: "通过" },
    { label: "人员资质", desc: item.operator.includes("待") ? "操作员待确认" : `${item.operator} 资质有效`, status: item.operator.includes("待") ? "待确认" : "通过" },
    { label: "物料/WIP", desc: item.material, status: item.material.includes("缺") || item.material.includes("等待") || item.material.includes("待") ? "待确认" : "通过" },
    { label: "质量门", desc: item.quality, status: item.quality.includes("待") ? "待确认" : "通过" },
  ];
}

function getReadyStatus(value) {
  if (value.includes("缺") || value.includes("等待") || value.includes("待")) return "待确认";
  if (value.includes("接近上限") || value.includes("异常")) return "需处理";
  return "通过";
}

function getGateClass(status) {
  if (["通过", "记录中"].includes(status)) return "is-pass is-ready";
  if (["拦截", "需处理"].includes(status)) return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "进行中" || status === "已完成") return "green";
  if (status === "异常停滞") return "red";
  if (status === "待报工") return "orange";
  return "blue";
}

function selectTask(id) {
  state.activeTaskId = id;
  state.detailOpen = true;
  saveState();
  renderAll();
}

function updateTask(id, patch, message) {
  const index = tasks.findIndex((item) => item.id === id);
  if (index < 0) return;
  tasks[index] = { ...tasks[index], ...patch };
  state.activeTaskId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordLog(taskId, action) {
  logs = [
    { taskId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
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
  $("#operationSearch").addEventListener("input", (event) => {
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
  $("#typeFilter").addEventListener("change", (event) => {
    state.type = event.target.value;
    saveState();
    renderAll();
  });
  $("#startReadyBtn").addEventListener("click", () => {
    const targets = tasks.filter((item) => item.status === "待开工" && !buildGateItems(item).some((gate) => gate.status === "拦截"));
    if (!targets.length) {
      showToast("没有可批量开工的工序任务");
      return;
    }
    targets.forEach((item) => {
      item.status = "进行中";
      item.operator = item.operator.includes("待") ? "现场操作员" : item.operator;
      item.inputQty = item.inputQty || item.planQty;
      recordLog(item.id, "批量扫码开工成功");
    });
    state.activeTaskId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已开工 ${targets.length} 个工序任务`);
  });
  $("#reportReadyBtn").addEventListener("click", () => {
    const item = getActiveTask();
    recordLog(item.id, "已生成报工草稿，等待操作员扫码确认");
    saveState();
    renderLogs();
    showToast("报工草稿已生成");
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
  $("#checkGateBtn").addEventListener("click", () => {
    const item = getActiveTask();
    recordLog(item.id, "已刷新现场准入校验");
    saveState();
    renderLogs();
    showToast("现场准入已刷新");
  });
  $("#startBtn").addEventListener("click", () => {
    const item = getActiveTask();
    const blockedGate = buildGateItems(item).find((gate) => gate.status === "拦截");
    if (blockedGate) {
      showToast(`${blockedGate.label}未通过，不能开工`);
      return;
    }
    updateTask(item.id, { status: "进行中", operator: item.operator.includes("待") ? "现场操作员" : item.operator, inputQty: item.inputQty || item.planQty }, "扫码开工成功");
  });
  $("#feedBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, { material: "物料已扫码确认，批次绑定完成", inputQty: item.inputQty || item.planQty }, "投料确认完成，已建立批次绑定");
  });
  $("#qualityBtn").addEventListener("click", () => updateTask(getActiveTask().id, { quality: "质量门已放行" }, "质量门已放行"));
  $("#reportBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, { status: "已完成", outputQty: item.planQty }, "工序报工完成，实绩已记录");
  });
  $("#blockBtn").addEventListener("click", () => updateTask(getActiveTask().id, { status: "异常停滞" }, "工序任务已异常停滞，等待责任人处理"));
  $("#handoverBtn").addEventListener("click", () => {
    const item = getActiveTask();
    updateTask(item.id, { status: item.status === "已完成" ? "已完成" : "待报工" }, "已生成下道交接记录");
  });
  $("#resetOperationBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    tasks = structuredClone(initialTasks);
    logs = [];
    state = { activeTaskId: "OP-0010", search: "", status: "all", line: "all", type: "all", detailOpen: true };
    $("#operationSearch").value = "";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    $("#typeFilter").value = "all";
    renderAll();
    showToast("工序演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#operationSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
$("#typeFilter").value = state.type;
bindEvents();
renderAll();
