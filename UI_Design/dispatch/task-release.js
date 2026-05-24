const STORAGE_KEY = "xingjigu_mes_task_release_v1";

const modules = window.MES_NAV_MODULES || [
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

const initialReleases = [
  { id: "REL-001", orderId: "MO-202606-0001", dispatchId: "D-001", product: "智能温控控制器 TCU-100", operation: "SMT 贴片", target: "工位终端", line: "Line-A", station: "SMT-WS-01", team: "A1 班", qty: 800, status: "已下达", terminal: "在线", sop: "SOP-TCU-SMT V3.2", material: "齐套", quality: "首件计划已触发", payload: ["任务卡", "SOP", "工艺参数", "检验要求"], channels: { station: "已送达", team: "已送达", material: "已确认", quality: "已触发" }, note: "SMT 任务卡已显示在工位终端" },
  { id: "REL-002", orderId: "MO-202606-0001", dispatchId: "D-002", product: "智能温控控制器 TCU-100", operation: "DIP 插件", target: "班组任务", line: "Line-A", station: "DIP-WS-01", team: "A1 班", qty: 800, status: "校验通过", terminal: "在线", sop: "SOP-TCU-DIP V2.8", material: "等待上道转入", quality: "IPQC 巡检已配置", payload: ["班组任务", "任务卡", "工装要求"], channels: { station: "待发送", team: "待发送", material: "无需配送", quality: "待触发" }, note: "可下达到 A1 班，等待车间主任确认" },
  { id: "REL-003", orderId: "MO-202606-0001", dispatchId: "D-004", product: "智能温控控制器 TCU-100", operation: "整机装配", target: "物料配送", line: "Line-A", station: "ASM-WS-03", team: "A1 班", qty: 800, status: "下达拦截", terminal: "在线", sop: "SOP-TCU-ASM V4.0", material: "外壳上盖缺 120 件", quality: "扭矩抽检已配置", payload: ["物料配送指令", "装配任务卡"], channels: { station: "未发送", team: "未发送", material: "拦截", quality: "未触发" }, note: "物料未齐套，禁止下达装配任务" },
  { id: "REL-004", orderId: "MO-202606-0002", dispatchId: "D-021", product: "工业网关 GW-240", operation: "SMT 贴片", target: "工位终端", line: "Line-B", station: "SMT-WS-02", team: "B1 班", qty: 600, status: "已下达", terminal: "在线", sop: "SOP-GW-SMT V2.4", material: "齐套", quality: "首件已触发", payload: ["任务卡", "SOP", "优先级标记"], channels: { station: "已送达", team: "已送达", material: "已确认", quality: "已触发" }, note: "客户 B 加急任务已推送" },
  { id: "REL-005", orderId: "MO-202606-0003", dispatchId: "D-031", product: "边缘采集器 ECU-80", operation: "老化测试", target: "工位终端", line: "Line-C", station: "AGING-01", team: "C1 班", qty: 1200, status: "下达拦截", terminal: "离线", sop: "SOP-ECU-AGING V2.1", material: "齐套", quality: "老化参数监控", payload: ["老化任务卡", "参数采集绑定"], channels: { station: "终端离线", team: "待发送", material: "已确认", quality: "待触发" }, note: "AGING-01 终端离线，需恢复后重发" },
  { id: "REL-006", orderId: "MO-202606-0004", dispatchId: "D-041", product: "智能传感节点 SEN-20", operation: "FQC 成品检验", target: "质量检验", line: "Line-A", station: "QC-Final", team: "A1 班", qty: 2000, status: "待下达", terminal: "在线", sop: "SOP-SEN-FQC V3.1", material: "待检批次已到位", quality: "样本数量待确认", payload: ["FQC 检验任务", "抽样要求"], channels: { station: "待发送", team: "待发送", material: "无需配送", quality: "待确认" }, note: "等待质量组确认样本数量" },
  { id: "REL-007", orderId: "MO-202606-0011", dispatchId: "D-111", product: "温湿度采集器 THS-10", operation: "包装入库", target: "班组任务", line: "Line-C", station: "PACK-WS-02", team: "C1 班", qty: 1800, status: "校验通过", terminal: "在线", sop: "SOP-THS-PACK V1.6", material: "包装材料齐套", quality: "箱码复核规则已配置", payload: ["包装任务卡", "标签模板", "箱码规则"], channels: { station: "待发送", team: "待发送", material: "已确认", quality: "已配置" }, note: "可推送包装任务，等待尾批 FQC 放行" },
];

let releases = structuredClone(initialReleases);
let logs = [];
let state = {
  activeReleaseId: "REL-002",
  search: "",
  status: "all",
  target: "all",
  line: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function nowText() {
  return new Date().toLocaleString("zh-CN", { hour12: false });
}

function buildMessageId(releaseId, channelKey, retryCount = 0) {
  return `MSG-${releaseId.replace("REL-", "")}-${channelKey.toUpperCase()}-${String(retryCount).padStart(2, "0")}`;
}

function normalizeRelease(item) {
  const baseReceipts = {
    station: {
      channel: "模拟工位终端回执",
      messageId: buildMessageId(item.id, "station"),
      ackStatus: item.channels.station?.includes("已") ? "ACK" : item.channels.station?.includes("离线") ? "失败" : "待发送",
      retryCount: 0,
      failureReason: item.channels.station?.includes("离线") ? "终端离线未 ACK" : "",
      ackAt: item.channels.station?.includes("已") ? "2026-06-20 08:00:00" : "",
    },
    team: {
      channel: "模拟班组接收回执",
      messageId: buildMessageId(item.id, "team"),
      ackStatus: item.channels.team?.includes("已") ? "ACK" : "待发送",
      retryCount: 0,
      failureReason: "",
      ackAt: item.channels.team?.includes("已") ? "2026-06-20 08:00:00" : "",
    },
    material: {
      channel: "模拟物料协同回执",
      messageId: buildMessageId(item.id, "material"),
      ackStatus: item.channels.material?.includes("拦截") ? "失败" : item.channels.material?.includes("已") || item.channels.material?.includes("无需") ? "ACK" : "待发送",
      retryCount: 0,
      failureReason: item.channels.material?.includes("拦截") ? item.material : "",
      ackAt: item.channels.material?.includes("已") || item.channels.material?.includes("无需") ? "2026-06-20 08:00:00" : "",
    },
    quality: {
      channel: "模拟质量计划回执",
      messageId: buildMessageId(item.id, "quality"),
      ackStatus: item.channels.quality?.includes("待") || item.channels.quality?.includes("未") ? "待发送" : "ACK",
      retryCount: 0,
      failureReason: "",
      ackAt: item.channels.quality?.includes("待") || item.channels.quality?.includes("未") ? "" : "2026-06-20 08:00:00",
    },
  };
  return { ...item, channelReceipts: { ...baseReceipts, ...(item.channelReceipts || {}) } };
}

function normalizeReleases() {
  releases = releases.map(normalizeRelease);
}

function renderFrameMenu() {
  $("#releaseModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "任务下达" ? " class=\"is-active\"" : "";
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

  $("#releaseModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#releaseModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    if (!saved) return;
    releases = saved.releases || releases;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.releaseState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  normalizeReleases();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ releases, logs, releaseState: state }));
}

function getActiveRelease() {
  return releases.find((item) => item.id === state.activeReleaseId) || releases[0];
}

function getVisibleReleases() {
  const keyword = state.search.trim().toLowerCase();
  return releases.filter((item) => {
    const text = `${item.id} ${item.orderId} ${item.dispatchId} ${item.product} ${item.operation} ${item.station}`.toLowerCase();
    const keywordMatch = !keyword || text.includes(keyword);
    const statusMatch = state.status === "all" || item.status === state.status;
    const targetMatch = state.target === "all" || item.target === state.target;
    const lineMatch = state.line === "all" || item.line === state.line;
    return keywordMatch && statusMatch && targetMatch && lineMatch;
  });
}

function renderAll() {
  renderDetailPanelState();
  renderMetrics();
  renderReleaseList();
  renderReleaseFlow();
  renderChannels();
  renderReleaseTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".release-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#releaseDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  $("#metricPending").textContent = releases.filter((item) => item.status === "待下达").length;
  $("#metricReady").textContent = releases.filter((item) => item.status === "校验通过").length;
  $("#metricReleased").textContent = releases.filter((item) => item.status === "已下达").length;
  $("#metricBlocked").textContent = releases.filter((item) => item.status === "下达拦截").length;
}

function renderReleaseList() {
  const visible = getVisibleReleases();
  $("#releaseList").innerHTML = visible.length ? visible.map((item) => `
    <button class="task-card${item.id === state.activeReleaseId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="task-card__top">
        <strong>${item.id} · ${item.operation}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="task-card__product">${item.orderId} · ${item.dispatchId} · ${item.product}</span>
      <div class="task-card__meta">
        <span>${item.target}</span>
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.terminal}</span>
      </div>
      <div class="task-card__foot">
        <span>${item.qty} 台</span>
        <span>${item.note}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有下达任务</strong><em>请调整筛选条件</em></div>`;

  $("#releaseList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectRelease(card.dataset.id));
  });
}

function renderReleaseFlow() {
  const item = getActiveRelease();
  const steps = [
    ["排程确认", "已完成"],
    ["资源绑定", item.team],
    ["校验门", item.status === "下达拦截" ? "拦截" : "通过"],
    ["任务推送", item.status === "已下达" ? "已送达" : "待发送"],
    ["现场接单", item.status === "已下达" ? "待接单" : "未开始"],
  ];
  $("#activeReleaseText").textContent = `${item.id} · ${item.dispatchId}`;
  $("#releaseFlow").innerHTML = steps.map(([label, value], index) => `
    <article class="release-step${index <= getFlowIndex(item) ? " is-active" : ""}">
      <span>${label}</span>
      <strong>${value}</strong>
      <em>${item.operation}</em>
    </article>
  `).join("");
}

function getFlowIndex(item) {
  if (item.status === "已下达") return 4;
  if (item.status === "校验通过") return 2;
  if (item.status === "下达拦截") return 2;
  if (item.status === "已撤回") return 1;
  return 1;
}

function renderChannels() {
  const item = getActiveRelease();
  const channels = Object.values(item.channelReceipts);
  $("#channelBoard").innerHTML = channels.map((receipt) => `
    <article class="channel-card">
      <span>${receipt.channel}</span>
      <strong>${receipt.messageId} · ${receipt.ackStatus}</strong>
      <em>重试 ${receipt.retryCount} 次${receipt.failureReason ? ` · ${receipt.failureReason}` : ""}</em>
    </article>
  `).join("");
}

function renderReleaseTable() {
  const visible = getVisibleReleases();
  $("#releaseTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeReleaseId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.orderId} / ${item.dispatchId}</td>
      <td>${item.target}</td>
      <td>${item.line} / ${item.station}</td>
      <td>${item.qty}</td>
      <td>${item.terminal}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有下达任务</td></tr>`;

  $("#releaseTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectRelease(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveRelease();
  $("#detailStatus").textContent = item.status;
  $("#detailReleaseNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.dispatchId} · ${item.operation}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["派工单", item.dispatchId],
    ["对象", item.target],
    ["产线", item.line],
    ["工位", item.station],
    ["班组", item.team],
    ["数量", `${item.qty} 台`],
    ["终端", item.terminal],
    ["SOP", item.sop],
    ["质量", item.quality],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status} · ${gate.source} · ${gate.checkedAt}</span>
    </div>
  `).join("");

  $("#payloadList").innerHTML = [
    ["下达内容", item.payload.join("、"), "通过"],
    ["物料", item.material, getReadyStatus(item.material)],
    ["SOP", item.sop, "通过"],
    ["通知", `${item.target} / ${item.team}`, item.status === "已下达" ? "已发送" : "待发送"],
  ].map(([label, value, status]) => `
    <div class="readiness-item ${getGateClass(status)}">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${status}</span>
    </div>
  `).join("");
}

function renderLogs() {
  const active = getActiveRelease();
  const scoped = logs.filter((log) => log.releaseId === active.id).slice(0, 5);
  $("#releaseLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.releaseId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.note}</strong><em>等待下达动作</em></div>`;
}

function buildGateItems(item) {
  const checkedAt = item.lastCheckedAt || "2026-06-20 07:55:00";
  return [
    { label: "终端在线", desc: `${item.station} 终端 ${item.terminal}`, status: item.terminal === "在线" ? "通过" : "拦截", source: "模拟工位终端回执", checkedAt },
    { label: "SOP 有效", desc: item.sop, status: item.sop.includes("V") ? "通过" : "待确认", source: "SOP 查看", checkedAt },
    { label: "物料/WIP", desc: item.material, status: getReadyStatus(item.material), source: "模拟 WMS 齐套回执", checkedAt },
    { label: "质量计划", desc: item.quality, status: item.quality.includes("待确认") ? "待确认" : "通过", source: "QMS 首件计划", checkedAt },
    { label: "状态允许", desc: item.status, status: item.status === "下达拦截" ? "拦截" : "通过", source: "MES 派工状态", checkedAt },
  ];
}

function getReadyStatus(value) {
  if (value.includes("缺") || value.includes("离线")) return "拦截";
  if (value.includes("等待") || value.includes("待确认")) return "待确认";
  return "通过";
}

function getGateClass(status) {
  if (["通过", "已发送"].includes(status)) return "is-pass is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已下达") return "green";
  if (status === "下达拦截") return "red";
  if (status === "校验通过") return "orange";
  return "blue";
}

function selectRelease(id) {
  state.activeReleaseId = id;
  state.detailOpen = true;
  saveState();
  renderAll();
}

function updateRelease(id, patch, message) {
  const index = releases.findIndex((item) => item.id === id);
  if (index < 0) return;
  releases[index] = { ...releases[index], ...patch };
  syncLedgerRelease(releases[index], patch, message);
  if (patch.status === "已下达") {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(releases[index].orderId, "release", { owner: releases[index].team || "车间主任" });
  } else if (patch.status === "下达拦截" || patch.status === "已撤回") {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(releases[index].orderId, "hold", { owner: releases[index].team || "车间主任", reason: message });
  }
  state.activeReleaseId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordLog(releaseId, action) {
  logs = [
    { releaseId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 60);
}

function syncLedgerRelease(item, patch, message) {
  const ledger = window.MES_DISPATCH_LEDGER;
  if (!ledger) return;
  const statusMap = { "校验通过": "待下达", "已下达": "待接单", "下达拦截": "下达拦截", "已撤回": "已撤回" };
  const nextStatus = statusMap[patch.status];
  if (nextStatus) {
    ledger.updateStatus?.(item.dispatchId, nextStatus, {
      owner: item.team || "车间主任",
      source: message.includes("模拟") ? "MES 后台接收模拟回执" : "MES 后台",
      action: message,
      result: nextStatus.includes("拦截") ? "拦截" : "通过",
    });
  } else {
    ledger.appendRecord?.(item.dispatchId, message, { owner: item.team || "车间主任", source: "MES 后台" });
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

function canRelease(item) {
  return !buildGateItems(item).some((gate) => gate.status === "拦截") && item.status !== "已下达";
}

function releasedChannels(item) {
  return {
    station: "已送达",
    team: "已送达",
    material: item.channels.material === "无需配送" ? "无需配送" : "已确认",
    quality: item.channels.quality === "已配置" ? "已配置" : "已触发",
  };
}

function releasedReceipts(item, isResend = false) {
  const current = normalizeRelease(item).channelReceipts;
  return Object.fromEntries(Object.entries(current).map(([key, receipt]) => {
    const retryCount = isResend ? receipt.retryCount + 1 : receipt.retryCount;
    const failed = key === "station" && item.terminal !== "在线" || key === "material" && getReadyStatus(item.material) === "拦截";
    return [key, {
      ...receipt,
      messageId: buildMessageId(item.id, key, retryCount),
      ackStatus: failed ? "失败" : "ACK",
      retryCount,
      failureReason: failed ? (key === "station" ? "模拟工位终端离线未 ACK" : item.material) : "",
      ackAt: failed ? "" : nowText(),
    }];
  }));
}

function bindEvents() {
  $("#releaseSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderAll();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    saveState();
    renderAll();
  });
  $("#targetFilter").addEventListener("change", (event) => {
    state.target = event.target.value;
    saveState();
    renderAll();
  });
  $("#lineFilter").addEventListener("change", (event) => {
    state.line = event.target.value;
    saveState();
    renderAll();
  });
  $("#releaseReadyBtn").addEventListener("click", () => {
    const targets = releases.filter((item) => item.status === "校验通过" && canRelease(item));
    if (!targets.length) {
      showToast("没有可批量下达的任务");
      return;
    }
    targets.forEach((item) => {
      item.status = "已下达";
      item.channels = releasedChannels(item);
      item.channelReceipts = releasedReceipts(item);
      recordLog(item.id, "任务已批量下达并接收模拟工位终端 ACK / 模拟班组接收回执");
      syncLedgerRelease(item, { status: "已下达" }, "任务已批量下达并接收模拟回执");
    });
    state.activeReleaseId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已下达 ${targets.length} 项任务`);
  });
  $("#noticeBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    recordLog(item.id, "已生成通知记录，等待模拟推送回执");
    saveState();
    renderLogs();
    showToast("通知记录已生成");
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
  $("#checkReleaseBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    const nextStatus = canRelease(item) ? "校验通过" : "下达拦截";
    updateRelease(item.id, { status: nextStatus, lastCheckedAt: nowText() }, "已重新执行下达校验并记录结构化来源");
  });
  $("#checkBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    const nextStatus = canRelease(item) ? "校验通过" : "下达拦截";
    updateRelease(item.id, { status: nextStatus, lastCheckedAt: nowText() }, "下达校验已完成并记录结构化来源");
  });
  $("#releaseBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    if (!canRelease(item)) {
      showToast("校验未通过，不能下达");
      return;
    }
    updateRelease(item.id, { status: "已下达", channels: releasedChannels(item), channelReceipts: releasedReceipts(item) }, "任务已确认下达，并记录模拟 ACK 回执");
  });
  $("#resendBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    if (item.status === "已撤回") {
      showToast("任务已撤回，不能重发模拟回执");
      return;
    }
    updateRelease(item.id, { channels: releasedChannels(item), channelReceipts: releasedReceipts(item, true) }, "通知已重发并接收模拟回执");
  });
  $("#syncBtn").addEventListener("click", () => {
    const item = getActiveRelease();
    updateRelease(item.id, { channels: { ...item.channels, material: "已确认", quality: "已触发" }, channelReceipts: releasedReceipts({ ...item, material: "齐套" }, true) }, "协同模块已同步并记录模拟物料/质量回执");
  });
  $("#blockBtn").addEventListener("click", () => updateRelease(getActiveRelease().id, { status: "下达拦截" }, "任务已标记为下达拦截"));
  $("#withdrawBtn").addEventListener("click", () => updateRelease(getActiveRelease().id, { status: "已撤回", channels: { station: "已撤回", team: "已撤回", material: "已撤回", quality: "已撤回" } }, "任务下达已撤回"));
  $("#resetReleaseBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    releases = structuredClone(initialReleases);
    logs = [];
    state = { activeReleaseId: "REL-002", search: "", status: "all", target: "all", line: "all", detailOpen: true };
    $("#releaseSearch").value = "";
    $("#statusFilter").value = "all";
    $("#targetFilter").value = "all";
    $("#lineFilter").value = "all";
    renderAll();
    showToast("任务下达演示已重置");
  });
}

normalizeReleases();
loadState();
renderFrameMenu();
$("#releaseSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#targetFilter").value = state.target;
$("#lineFilter").value = state.line;
bindEvents();
renderAll();
