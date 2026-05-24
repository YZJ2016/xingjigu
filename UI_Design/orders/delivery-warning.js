const STORAGE_KEY = "xingjigu_mes_production_orders_v2";

const modules = window.MES_NAV_MODULES || [];

const planDays = ["06-20", "06-21", "06-22", "06-23", "06-24", "06-25", "06-26"];
const baseDate = new Date("2026-06-20T00:00:00");
const getMasterOrders = () => structuredClone(window.MES_MASTER_DATA?.orders || []);
let orders = getMasterOrders();
let schedulePlans = {};
let integrationLogs = [];
let state = {
  activeOrderId: "MO-202606-0005",
  search: "",
  level: "all",
  reason: "all",
};

const $ = (selector) => document.querySelector(selector);

function renderFrameMenu() {
  $("#orderModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "orders" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "orders" && item === "交期预警" ? " class=\"is-active\"" : "";
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

  $("#orderModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#orderModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const moduleId = link.dataset.module;
      const entry = link.dataset.entry;
      if (moduleId === "workbench") window.location.href = "../index.html";
      else if (moduleId === "orders" && entry === "生产订单") window.location.href = "./production-orders.html";
      else if (moduleId === "orders" && entry === "订单评审") window.location.href = "./order-reviews.html";
      else if (moduleId === "orders" && entry === "生产排程") window.location.href = "./production-schedule.html";
      else if (moduleId === "orders" && entry === "产能负荷") window.location.href = "./capacity-load.html";
      else if (moduleId === "orders" && entry === "交期预警") window.location.href = "./delivery-warning.html";
      else if (moduleId === "orders" && entry === "计划调整") window.location.href = "./plan-adjustment.html";
      else if (moduleId === "orders" && entry === "齐套检查") window.location.href = "./kit-check.html";
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
      else showToast(`${entry} 页面待建设`);
    });
  });
}

function loadState() {
  try {
    const flowState = window.MES_BUSINESS_FLOW?.read?.();
    if (flowState?.orders) {
      orders = flowState.orders;
      integrationLogs = flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time }));
    } else {
      orders = getMasterOrders();
    }
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    schedulePlans = saved.schedulePlans || schedulePlans;
    integrationLogs = flowState?.logs ? flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) : saved.integrationLogs || integrationLogs;
    state = { ...state, ...(saved.deliveryWarningState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    orders = getMasterOrders();
  }
}

function saveState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
  const { orders: _ignoredOrders, ...pageState } = saved;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...pageState, schedulePlans, integrationLogs, deliveryWarningState: state }));
}

function getPlan(order) {
  if (!schedulePlans[order.id] || typeof schedulePlans[order.id].dayOffset !== "number" || !schedulePlans[order.id].window) {
    schedulePlans[order.id] = buildPlan(order);
  }
  return schedulePlans[order.id];
}

function buildPlan(order) {
  const dayOffset = getOrderDayOffset(order);
  const duration = getOrderDuration(order);
  return {
    dayOffset,
    duration,
    window: `${planDays[dayOffset]}-${planDays[Math.min(planDays.length - 1, dayOffset + duration - 1)]}`,
  };
}

function getOrderDayOffset(order) {
  const match = order.id.match(/(\d+)$/);
  const numeric = match ? Number(match[1]) : 1;
  const base = { "Line-A": 0, "Line-B": 1, "Line-C": 2 }[order.line] || 0;
  return Math.min(planDays.length - 1, (numeric + base) % 5);
}

function getOrderDuration(order) {
  if (order.qty >= 1500) return 3;
  if (order.qty >= 800 || order.risk !== "正常") return 2;
  return 1;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function daysBetween(start, end) {
  return Math.ceil((end - start) / 86400000);
}

function getWarning(order) {
  const plan = getPlan(order);
  const dueDate = new Date(`${order.due}T00:00:00`);
  const finishDate = addDays(baseDate, plan.dayOffset + plan.duration + getDelayDays(order));
  const buffer = daysBetween(finishDate, dueDate);
  const reasons = getReasons(order, buffer);
  const level = buffer < 0 || order.priority === "紧急" || reasons.some((item) => item.type === "缺料") ? "高" : buffer <= 2 || reasons.length > 1 ? "中" : "低";
  return { order, plan, dueDate, finishDate, buffer, reasons, level };
}

function getDelayDays(order) {
  let days = 0;
  if (order.schedule === "待调整" || order.schedule === "未排程") days += 2;
  if (order.review !== "已通过") days += 2;
  if (order.risk === "缺料") days += 2;
  if (order.risk === "设备") days += 1;
  if (order.risk === "质量") days += 1;
  if (order.priority === "紧急") days -= 1;
  return Math.max(0, days);
}

function getReasons(order, buffer) {
  const reasons = [];
  if (order.review !== "已通过") reasons.push({ type: "评审", desc: "订单评审或资料准入未完成", owner: "计划 / 工艺" });
  if (order.schedule !== "已确认") reasons.push({ type: "产能", desc: "排程未锁定或仍待调整", owner: "计划" });
  if (order.risk === "缺料" || order.kit !== "齐套") reasons.push({ type: "缺料", desc: order.materialGap, owner: "物料" });
  if (order.risk === "设备") reasons.push({ type: "设备", desc: `${order.line} 设备日历或保养窗口待确认`, owner: "设备" });
  if (order.risk === "质量") reasons.push({ type: "质量", desc: "首件或检验要求可能影响放行", owner: "质量" });
  if (buffer < 0) reasons.push({ type: "交期", desc: `预计晚于承诺交期 ${Math.abs(buffer)} 天`, owner: "计划" });
  if (!reasons.length) reasons.push({ type: "正常", desc: "当前排程可覆盖承诺交期", owner: "计划" });
  return reasons;
}

function getWarnings() {
  return orders.map(getWarning).sort((a, b) => {
    const levelRank = { 高: 0, 中: 1, 低: 2 };
    return levelRank[a.level] - levelRank[b.level] || a.buffer - b.buffer;
  });
}

function getFilteredWarnings() {
  const keyword = state.search.trim().toLowerCase();
  return getWarnings().filter((warning) => {
    const text = `${warning.order.id} ${warning.order.product} ${warning.order.customer} ${warning.reasons.map((item) => item.type + item.desc).join(" ")}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const levelMatch = state.level === "all" || warning.level === state.level;
    const reasonMatch = state.reason === "all" || warning.reasons.some((item) => item.type === state.reason);
    return keywordMatch && levelMatch && reasonMatch;
  });
}

function getActiveWarning() {
  return getWarnings().find((warning) => warning.order.id === state.activeOrderId) || getFilteredWarnings()[0] || getWarnings()[0];
}

function renderAll() {
  renderMetrics();
  renderTable();
  renderTimeline();
  renderDetail();
  renderLogs();
}

function renderMetrics() {
  const warnings = getWarnings();
  $("#metricHighRisk").textContent = warnings.filter((warning) => warning.level === "高").length;
  $("#metricMediumRisk").textContent = warnings.filter((warning) => warning.level === "中").length;
  $("#metricDueWeek").textContent = warnings.filter((warning) => daysBetween(baseDate, warning.dueDate) <= 7).length;
  const avg = Math.round(warnings.reduce((sum, warning) => sum + warning.buffer, 0) / warnings.length);
  $("#metricBuffer").textContent = `${avg}天`;
}

function renderTable() {
  const visible = getFilteredWarnings();
  $("#warningTableBody").innerHTML = visible.length ? visible.map((warning) => `
    <tr class="${warning.order.id === state.activeOrderId ? "is-active" : ""}" data-order-id="${warning.order.id}">
      <td class="order-no">${warning.order.id}</td>
      <td class="product-cell"><strong>${warning.order.product}</strong><span>${warning.order.customer} · ${warning.order.qty} 台</span></td>
      <td>${formatDate(warning.dueDate)}</td>
      <td>${formatDate(warning.finishDate)}</td>
      <td class="buffer-cell${warning.buffer < 0 ? " is-negative" : ""}">${warning.buffer >= 0 ? "+" : ""}${warning.buffer} 天</td>
      <td><span class="pill pill--${getLevelStyle(warning.level)}">${warning.level}</span></td>
      <td>${warning.reasons.map((item) => item.type).join(" / ")}</td>
      <td><div class="table-actions"><button type="button" data-action="follow" data-order-id="${warning.order.id}">跟进</button></div></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有交期预警</td></tr>`;

  $("#warningTableBody").querySelectorAll("[data-order-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.activeOrderId = row.dataset.orderId;
      saveState();
      renderAll();
    });
  });
  $("#warningTableBody").querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeOrderId = button.dataset.orderId;
      recordIntegration(button.dataset.orderId, "交期预警已标记跟进");
      saveState();
      renderAll();
      showToast("交期预警已标记跟进");
    });
  });
}

function renderTimeline() {
  const visible = getFilteredWarnings().slice(0, 12);
  $("#deliveryTimeline").innerHTML = `
    <div class="timeline-warning-row timeline-warning-head">
      <div>类型</div>
      ${planDays.map((day) => `<div>${day}</div>`).join("")}
    </div>
    ${["预计完工", "承诺交期"].map((label) => `
      <div class="timeline-warning-row">
        <div class="timeline-warning-label">${label}</div>
        ${planDays.map((day) => {
          const items = visible.filter((warning) => formatDate(label === "预计完工" ? warning.finishDate : warning.dueDate) === day);
          return `<div class="timeline-warning-cell">${items.map((warning) => `
            <button class="warning-chip ${warning.level === "高" ? "is-high" : warning.level === "中" ? "is-medium" : ""}${warning.order.id === state.activeOrderId ? " is-active" : ""}" type="button" data-order-id="${warning.order.id}">
              ${warning.order.id} · ${warning.level}
            </button>
          `).join("")}</div>`;
        }).join("")}
      </div>
    `).join("")}
  `;

  $("#deliveryTimeline").querySelectorAll("[data-order-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeOrderId = button.dataset.orderId;
      saveState();
      renderAll();
    });
  });
}

function renderDetail() {
  const warning = getActiveWarning();
  if (!warning) return;
  $("#detailWarningLevel").textContent = `${warning.level}风险`;
  $("#detailOrderId").textContent = warning.order.id;
  $("#detailProduct").textContent = warning.order.product;
  $("#detailGrid").innerHTML = [
    ["客户", warning.order.customer],
    ["承诺交期", formatDate(warning.dueDate)],
    ["预计完工", formatDate(warning.finishDate)],
    ["交期缓冲", `${warning.buffer >= 0 ? "+" : ""}${warning.buffer} 天`],
    ["产线", warning.order.line],
    ["排程", warning.order.schedule],
    ["齐套", warning.order.kit],
    ["优先级", warning.order.priority],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#reasonList").innerHTML = warning.reasons.map((item) => `
    <div>
      <span>${item.type}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner}</em>
    </div>
  `).join("");

  $("#actionList").innerHTML = getActions(warning).map((item) => `
    <div>
      <span>${item.type}</span>
      <strong>${item.desc}</strong>
      <em>${item.owner}</em>
    </div>
  `).join("");
}

function getActions(warning) {
  const actions = [];
  if (warning.reasons.some((item) => item.type === "缺料")) actions.push({ type: "催料", desc: "确认关键物料到货时间，必要时拆批生产", owner: "物料" });
  if (warning.reasons.some((item) => item.type === "产能")) actions.push({ type: "排程", desc: "调整排程窗口或申请产线加班", owner: "计划" });
  if (warning.reasons.some((item) => item.type === "设备")) actions.push({ type: "设备", desc: "确认保养窗口，释放关键设备能力", owner: "设备" });
  if (warning.reasons.some((item) => item.type === "质量")) actions.push({ type: "质量", desc: "提前确认首件和检验放行要求", owner: "质量" });
  if (warning.buffer < 0) actions.push({ type: "客户", desc: "评估交付承诺调整或分批发运", owner: "计划 / 销售" });
  if (!actions.length) actions.push({ type: "监控", desc: "保持当前排程，跟踪齐套和完工节点", owner: "计划" });
  return actions;
}

function getLevelStyle(level) {
  if (level === "高") return "red";
  if (level === "中") return "orange";
  return "green";
}

function updateOrder(orderId, patch, message) {
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) return;
  const nextOrder = { ...orders[index], ...patch };
  if (window.MES_BUSINESS_FLOW?.upsertOrder) {
    window.MES_BUSINESS_FLOW.upsertOrder(nextOrder, { action: message });
    const flowState = window.MES_BUSINESS_FLOW.read();
    orders = flowState.orders;
    integrationLogs = flowState.logs.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time }));
  } else {
    orders[index] = nextOrder;
  }
  state.activeOrderId = orderId;
  recordIntegration(orderId, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordIntegration(orderId, action) {
  integrationLogs = [
    { orderId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...integrationLogs,
  ].slice(0, 50);
}

function renderLogs() {
  const warning = getActiveWarning();
  const logs = integrationLogs.filter((log) => !warning || log.orderId === warning.order.id).slice(0, 4);
  $("#warningLogList").innerHTML = logs.length
    ? logs.map((log) => `
      <div class="integration-item">
        <span>${log.orderId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>预警处置动作会在这里留下记录</strong><em>待处理</em></div>`;
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

window.addEventListener("plan-maintenance:changed", () => {
  loadState();
  renderAll();
});

function bindEvents() {
  $("#warningSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#levelFilter").addEventListener("change", (event) => {
    state.level = event.target.value;
    saveState();
    renderAll();
  });
  $("#reasonFilter").addEventListener("change", (event) => {
    state.reason = event.target.value;
    saveState();
    renderAll();
  });
  $("#refreshWarningBtn").addEventListener("click", () => {
    renderAll();
    showToast("交期预警已刷新");
  });
  $("#confirmFollowBtn").addEventListener("click", () => {
    const warning = getActiveWarning();
    recordIntegration(warning.order.id, "交期预警已确认跟进");
    saveState();
    renderLogs();
    showToast("交期预警已确认跟进");
  });
  $("#expediteBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { priority: "紧急", risk: "交期", approvalStatus: "加急会签中" }, "已提交加急会签并纳入交期跟进"));
  $("#materialEscalateBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { risk: "缺料", kit: "缺料待补", materialGap: "关键物料到货需升级确认" }, "缺料风险已升级给物料"));
  $("#capacityEscalateBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { schedule: "待调整", risk: "交期" }, "已申请产能协调并退回排程调整"));
  $("#qualityHoldBtn").addEventListener("click", () => updateOrder(getActiveWarning().order.id, { risk: "质量", materialGap: "检验放行要求需质量会签" }, "质量会签已发起"));
  $("#resetWarningPageBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    const flowState = window.MES_BUSINESS_FLOW?.reset?.();
    orders = flowState?.orders || getMasterOrders();
    schedulePlans = {};
    integrationLogs = flowState?.logs?.map((item) => ({ orderId: item.orderId, action: item.stage + "：" + item.action + " - " + item.result, time: item.time })) || [];
    state = { activeOrderId: "MO-202606-0005", search: "", level: "all", reason: "all" };
    $("#warningSearch").value = "";
    $("#levelFilter").value = "all";
    $("#reasonFilter").value = "all";
    renderAll();
    showToast("预警演示已重置");
  });
}

loadState();
renderFrameMenu();
$("#warningSearch").value = state.search;
$("#levelFilter").value = state.level;
$("#reasonFilter").value = state.reason;
bindEvents();
renderAll();
