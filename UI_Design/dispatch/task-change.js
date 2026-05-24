const STORAGE_KEY = "xingjigu_mes_task_change_v1";

const modules = window.MES_NAV_MODULES || [];

const initialChanges = [
  { id: "CHG-001", orderId: "MO-202606-0001", dispatchId: "D-002", operation: "DIP 插件", type: "改派人员", line: "Line-A", reason: "下午班操作员临时请假", owner: "钱佳", status: "待审批", risk: "中", before: { team: "A1 班", station: "DIP-WS-01", operator: "待接单", qty: "800", window: "13:00-18:00" }, after: { team: "A1 班", station: "DIP-WS-01", operator: "补员1、补员2", qty: "800", window: "13:20-18:20" }, impacts: { dispatch: "重新推送班组任务", material: "不影响", quality: "巡检时间后移 20 分钟", schedule: "轻微后移" }, note: "人员改派后需更新工位终端任务卡" },
  { id: "CHG-002", orderId: "MO-202606-0001", dispatchId: "D-004", operation: "整机装配", type: "改数量", line: "Line-A", reason: "外壳上盖缺 120 件", owner: "物料组", status: "待评估", risk: "高", before: { team: "A1 班", station: "ASM-WS-03", operator: "赵杰", qty: "800", window: "13:00-18:00" }, after: { team: "A1 班", station: "ASM-WS-03", operator: "赵杰", qty: "680 + 120", window: "13:00-20:00" }, impacts: { dispatch: "需拆批重下达", material: "触发补料跟催", quality: "扭矩抽检分批", schedule: "影响老化开始" }, note: "缺料导致装配拆批，需计划主管确认" },
  { id: "CHG-003", orderId: "MO-202606-0003", dispatchId: "D-031", operation: "老化测试", type: "改工位", line: "Line-C", reason: "AGING-01 容量占满", owner: "设备组", status: "待审批", risk: "高", before: { team: "C1 班", station: "AGING-01", operator: "周强", qty: "1200", window: "10:00-18:00" }, after: { team: "C1 班", station: "AGING-02", operator: "周强", qty: "760 + 440", window: "14:00-22:00" }, impacts: { dispatch: "改派到 AGING-02", material: "WIP 转运", quality: "老化参数重新绑定", schedule: "触发 APS 重排" }, note: "设备容量冲突，需要同步过程监控绑定关系" },
  { id: "CHG-004", orderId: "MO-202606-0002", dispatchId: "D-021", operation: "SMT 贴片", type: "改时间", line: "Line-B", reason: "客户 B 加急优先", owner: "周计划", status: "已批准", risk: "中", before: { team: "B1 班", station: "SMT-WS-02", operator: "李敏", qty: "600", window: "08:30-12:30" }, after: { team: "B1 班", station: "SMT-WS-02", operator: "李敏", qty: "600", window: "08:00-12:00" }, impacts: { dispatch: "提前推送", material: "线边提前确认", quality: "首件提前触发", schedule: "交期风险下降" }, note: "加急任务已批准，待同步终端" },
  { id: "CHG-005", orderId: "MO-202606-0011", dispatchId: "D-111", operation: "包装入库", type: "异常改派", line: "Line-C", reason: "夜班包装人员支援", owner: "罗琴", status: "已生效", risk: "低", before: { team: "C1 班", station: "PACK-WS-02", operator: "陈洁、马岚", qty: "1800", window: "09:00-17:30" }, after: { team: "C1 班 + 夜班", station: "PACK-WS-02", operator: "陈洁、马岚、夜班1", qty: "1800", window: "09:00-20:00" }, impacts: { dispatch: "已生成交接", material: "不影响", quality: "箱码复核延续", schedule: "尾批入库可保持" }, note: "交接记录已生成并同步包装终端" },
];

let changes = structuredClone(initialChanges);
let logs = [];
let state = {
  activeChangeId: "CHG-001",
  search: "",
  status: "all",
  type: "all",
  line: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function nowText() {
  return new Date().toLocaleString("zh-CN", { hour12: false });
}

function defaultApprovals(item) {
  const base = [
    { role: "计划主管", user: "李敏", result: item.status === "已生效" || item.status === "已批准" ? "同意" : "待审批", signedAt: item.status === "已生效" || item.status === "已批准" ? "2026-06-20 07:35:00" : "", comment: "确认排程窗口和派工版本" },
    { role: "质量工程师", user: "孟可", result: item.risk === "高" ? "待会签" : "同意", signedAt: item.risk === "高" ? "" : "2026-06-20 07:36:00", comment: "确认首件、巡检和追溯要求" },
    { role: "设备员", user: "周强", result: item.risk === "高" ? "待会签" : "不涉及", signedAt: item.risk === "高" ? "" : "2026-06-20 07:36:00", comment: "确认工位、设备和程序绑定" },
    { role: "物料员", user: "吴倩", result: item.risk === "高" ? "待会签" : "不涉及", signedAt: item.risk === "高" ? "" : "2026-06-20 07:36:00", comment: "确认齐套、拆批和线边转运" },
  ];
  return base;
}

function normalizeChange(item) {
  return {
    ...item,
    approvals: item.approvals || defaultApprovals(item),
    effectiveScope: item.effectiveScope || {
      dispatchVersion: item.status === "已生效" ? "V2" : "待生成",
      stations: [item.after.station],
      qty: item.after.qty,
      startCheckRequired: item.risk !== "低",
    },
  };
}

function normalizeChanges() {
  changes = changes.map(normalizeChange);
}

function renderFrameMenu() {
  $("#changeModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "任务变更" ? " class=\"is-active\"" : "";
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

  $("#changeModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#changeModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
      else if (moduleId === "dispatch" && entry === "工艺文件与作业指导") window.location.href = "./sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "./start-check.html";
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
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    changes = saved.changes || changes;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.changeState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  normalizeChanges();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ changes, logs, changeState: state }));
}

function getActiveChange() {
  return changes.find((item) => item.id === state.activeChangeId) || changes[0];
}

function getVisibleChanges() {
  const keyword = state.search.trim().toLowerCase();
  return changes.filter((item) => {
    const text = `${item.id} ${item.orderId} ${item.dispatchId} ${item.operation} ${item.reason} ${item.owner}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const typeMatch = state.type === "all" || item.type === state.type;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && typeMatch && lineMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderChangeList();
  renderCompare();
  renderImpacts();
  renderChangeTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".change-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#changeDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  $("#metricReview").textContent = changes.filter((item) => item.status === "待评估").length;
  $("#metricApprove").textContent = changes.filter((item) => item.status === "待审批" || item.status === "已批准").length;
  $("#metricEffective").textContent = changes.filter((item) => item.status === "已生效").length;
  $("#metricRisk").textContent = changes.filter((item) => item.risk === "高").length;
}

function renderChangeList() {
  const visible = getVisibleChanges();
  $("#changeList").innerHTML = visible.length ? visible.map((item) => `
    <button class="task-card${item.id === state.activeChangeId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="task-card__top">
        <strong>${item.id} · ${item.type}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="task-card__product">${item.orderId} · ${item.dispatchId} · ${item.operation}</span>
      <div class="task-card__meta">
        <span>${item.line}</span>
        <span>${item.reason}</span>
        <span>风险 ${item.risk}</span>
      </div>
      <div class="task-card__foot">
        <span>${item.owner}</span>
        <span>${item.note}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有任务变更</strong><em>请调整筛选条件</em></div>`;

  $("#changeList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectChange(card.dataset.id));
  });
}

function renderCompare() {
  const item = getActiveChange();
  $("#activeChangeText").textContent = `${item.id} · ${item.dispatchId}`;
  $("#compareBoard").innerHTML = [
    ["变更前", item.before],
    ["变更后", item.after],
  ].map(([label, data]) => `
    <article class="compare-card">
      <span>${label}</span>
      <strong>${data.team} · ${data.station}</strong>
      <em>${data.operator} · ${data.qty} · ${data.window}</em>
    </article>
  `).join("");
}

function renderImpacts() {
  const item = getActiveChange();
  $("#impactBoard").innerHTML = Object.entries(item.impacts).map(([key, value]) => {
    const label = { dispatch: "派工", material: "物料", quality: "质量", schedule: "排程" }[key];
    const className = value.includes("影响") || value.includes("重排") ? " is-blocked" : value.includes("后移") || value.includes("触发") ? " is-risk" : "";
    return `
      <article class="impact-card${className}">
        <span>${label}</span>
        <strong>${value}</strong>
        <em>${item.risk}风险</em>
      </article>
    `;
  }).join("");
}

function renderChangeTable() {
  const visible = getVisibleChanges();
  $("#changeTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeChangeId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.orderId} / ${item.dispatchId}</td>
      <td>${item.type}</td>
      <td>${item.reason}</td>
      <td>${item.risk}</td>
      <td>${item.owner}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有任务变更</td></tr>`;

  $("#changeTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectChange(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveChange();
  $("#detailStatus").textContent = item.status;
  $("#detailChangeNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.type} · ${item.dispatchId}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["派工单", item.dispatchId],
    ["工序", item.operation],
    ["类型", item.type],
    ["产线", item.line],
    ["风险", item.risk],
    ["负责人", item.owner],
    ["原因", item.reason],
    ["原窗口", item.before.window],
    ["新窗口", item.after.window],
    ["生效版本", item.effectiveScope.dispatchVersion],
    ["生效范围", `${item.effectiveScope.stations.join("、")} / ${item.effectiveScope.qty}`],
    ["开工复核", item.effectiveScope.startCheckRequired ? "需要" : "不需要"],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  const approvalEvidence = item.approvals.map((approval) => [
    `${approval.role}会签`,
    `${approval.user} · ${approval.comment}`,
    `${approval.result}${approval.signedAt ? ` · ${approval.signedAt}` : ""}`,
  ]);
  $("#syncList").innerHTML = [
    ...approvalEvidence,
    ["派工同步", item.impacts.dispatch, item.status === "已生效" ? "已同步" : "待同步"],
    ["物料同步", item.impacts.material, item.impacts.material === "不影响" ? "无需同步" : "待同步"],
    ["质量同步", item.impacts.quality, item.status === "已生效" ? "已同步" : "待同步"],
    ["排程同步", item.impacts.schedule, item.impacts.schedule.includes("不") ? "无需同步" : "待同步"],
  ].map(([label, value, status]) => `
    <div class="readiness-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveChange();
  const scoped = logs.filter((log) => log.changeId === active.id).slice(0, 5);
  $("#changeLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.changeId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.note}</strong><em>等待变更动作</em></div>`;
}

function buildGateItems(item) {
  const missingApprovals = getMissingApprovals(item);
  return [
    { label: "影响评估", desc: item.risk === "高" ? "影响交期、质量或设备资源" : "影响范围可控", status: item.status === "待评估" ? "待确认" : "通过" },
    { label: "资源冲突", desc: `${item.after.team} · ${item.after.station}`, status: item.risk === "高" && missingApprovals.includes("设备员") ? "待确认" : "通过" },
    { label: "审批要求", desc: item.risk === "高" ? `需计划/质量/设备/物料会签${missingApprovals.length ? `，缺：${missingApprovals.join("、")}` : ""}` : "班组长审批即可", status: missingApprovals.length ? "待确认" : "通过" },
    { label: "生效范围", desc: `${item.effectiveScope.dispatchVersion} · ${item.effectiveScope.stations.join("、")} · ${item.effectiveScope.qty}`, status: item.effectiveScope.dispatchVersion === "待生成" ? "待确认" : "通过" },
    { label: "终端同步", desc: "工位任务卡需刷新，生效后需开工复核", status: item.status === "已生效" ? "通过" : "待确认" },
  ];
}

function getMissingApprovals(item) {
  if (item.risk !== "高") return [];
  const required = ["计划主管", "质量工程师", "设备员", "物料员"];
  return required.filter((role) => {
    const approval = item.approvals.find((entry) => entry.role === role);
    return !approval || approval.result !== "同意";
  });
}

function signRequiredApprovals(item) {
  const required = item.risk === "高" ? ["计划主管", "质量工程师", "设备员", "物料员"] : ["计划主管"];
  return item.approvals.map((approval) => {
    if (!required.includes(approval.role)) return approval;
    return { ...approval, result: "同意", signedAt: nowText(), comment: `${approval.comment}，已形成会签证据` };
  });
}

function getGateClass(status) {
  if (["通过", "已同步", "无需同步"].includes(status)) return "is-pass is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已生效" || status === "已批准") return "green";
  if (status === "已驳回") return "red";
  if (status === "待审批") return "orange";
  return "blue";
}

function selectChange(id) {
  state.activeChangeId = id;
  state.detailOpen = true;
  saveState();
  renderAll();
}

function updateChange(id, patch, message) {
  const index = changes.findIndex((item) => item.id === id);
  if (index < 0) return;
  changes[index] = { ...changes[index], ...patch };
  syncLedgerChange(changes[index], patch, message);
  if (patch.status === "已生效") window.MES_BUSINESS_FLOW?.applyDispatchAction?.(changes[index].orderId, "release", { owner: changes[index].owner || "车间主任" });
  if (patch.status === "待审批" || patch.status === "待评估") window.MES_BUSINESS_FLOW?.applyDispatchAction?.(changes[index].orderId, "hold", { owner: changes[index].owner || "车间主任", reason: message });
  state.activeChangeId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordLog(changeId, action) {
  logs = [
    { changeId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 60);
}

function syncLedgerChange(item, patch, message) {
  const ledger = window.MES_DISPATCH_LEDGER;
  if (!ledger) return;
  if (patch.status === "已生效") {
    ledger.appendRecord?.(item.dispatchId, message, { owner: item.owner || "计划主管", source: "MES 任务变更审批", result: "已生效" });
  } else {
    ledger.appendRecord?.(item.dispatchId, message, { owner: item.owner || "计划主管", source: "MES 任务变更审批" });
  }
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
  $("#changeSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#typeFilter").addEventListener("change", (event) => {
    state.type = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#approveReadyBtn").addEventListener("click", () => {
    const targets = changes.filter((item) => item.status === "待审批" && item.risk !== "高");
    if (!targets.length) {
      showToast("没有可批量批准的低风险变更");
      return;
    }
    targets.forEach((item) => {
      item.status = "已批准";
      recordLog(item.id, "低风险变更已批量批准");
    });
    state.activeChangeId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已批准 ${targets.length} 项低风险变更`);
  });
  $("#changeNoticeBtn").addEventListener("click", () => {
    const item = getActiveChange();
    recordLog(item.id, "已生成变更通知、会签证据和生效范围清单");
    saveState();
    renderLogs();
    showToast("变更通知已生成");
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
  $("#evaluateBtn").addEventListener("click", () => {
    const item = getActiveChange();
    updateChange(item.id, { status: item.risk === "高" ? "待审批" : "待审批", approvals: item.approvals }, "变更影响已重新评估，等待会签审批证据");
  });
  $("#submitBtn").addEventListener("click", () => {
    const item = getActiveChange();
    updateChange(item.id, { status: "待审批", approvals: signRequiredApprovals(item) }, "变更已提交审批并模拟记录计划/质量/设备/物料会签");
  });
  $("#approveBtn").addEventListener("click", () => {
    const item = getActiveChange();
    const missing = getMissingApprovals(item);
    if (missing.length) {
      showToast(`高风险变更缺少会签：${missing.join("、")}`);
      recordLog(item.id, `高风险变更批准被拦截，缺少会签：${missing.join("、")}`);
      saveState();
      renderLogs();
      return;
    }
    updateChange(item.id, { status: "已批准" }, "变更已校验会签后批准");
  });
  $("#effectiveBtn").addEventListener("click", () => {
    const item = getActiveChange();
    if (item.status !== "已批准") {
      showToast("变更未批准，不能执行生效");
      return;
    }
    updateChange(item.id, { status: "已生效", effectiveScope: { ...item.effectiveScope, dispatchVersion: item.effectiveScope.dispatchVersion === "待生成" ? "V2" : item.effectiveScope.dispatchVersion } }, "变更已按生效范围执行生效，开工检查需复核");
  });
  $("#syncBtn").addEventListener("click", () => {
    const item = getActiveChange();
    updateChange(item.id, { status: item.status === "已批准" ? "已生效" : item.status }, "变更已同步到派工、终端和协同模块");
  });
  $("#rejectBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "已驳回" }, "变更已驳回"));
  $("#rollbackBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "待评估" }, "变更方案已回退重新评估"));
  $("#resetChangeBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    changes = structuredClone(initialChanges);
    logs = [];
    state = { activeChangeId: "CHG-001", search: "", status: "all", type: "all", line: "all", detailOpen: true };
    $("#changeSearch").value = "";
    $("#statusFilter").value = "all";
    $("#typeFilter").value = "all";
    $("#lineFilter").value = "all";
    renderAll();
    showToast("任务变更演示已重置");
  });
}

normalizeChanges();
loadState();
renderFrameMenu();
$("#changeSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#typeFilter").value = state.type;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
