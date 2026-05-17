const STORAGE_KEY = "xingjigu_mes_task_change_v1";

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
      else if (moduleId === "dispatch" && entry === "SOP 查看") window.location.href = "./sop-view.html";
      else if (moduleId === "dispatch" && entry === "开工检查") window.location.href = "./start-check.html";
      else if (moduleId === "station" && entry === "员工登录") window.location.href = "../station/employee-login.html";
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
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  $("#syncList").innerHTML = [
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
  return [
    { label: "影响评估", desc: item.risk === "高" ? "影响交期、质量或设备资源" : "影响范围可控", status: item.status === "待评估" ? "待确认" : "通过" },
    { label: "资源冲突", desc: `${item.after.team} · ${item.after.station}`, status: item.risk === "高" ? "待确认" : "通过" },
    { label: "审批要求", desc: item.risk === "高" ? "需计划/质量/车间会签" : "班组长审批即可", status: ["待审批", "已批准", "已生效"].includes(item.status) ? "通过" : "待确认" },
    { label: "终端同步", desc: "工位任务卡需刷新", status: item.status === "已生效" ? "通过" : "待确认" },
  ];
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
    recordLog(item.id, "已生成变更通知和影响范围清单");
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
  $("#evaluateBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "待审批" }, "变更影响已重新评估"));
  $("#submitBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "待审批" }, "变更已提交审批"));
  $("#approveBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "已批准" }, "变更已批准"));
  $("#effectiveBtn").addEventListener("click", () => updateChange(getActiveChange().id, { status: "已生效" }, "变更已执行生效"));
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

loadState();
renderFrameMenu();
$("#changeSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#typeFilter").value = state.type;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
