const STORAGE_KEY = "xingjigu_mes_sop_view_v1";

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

const initialSops = [
  {
    id: "SOP-ASM-016",
    product: "TCU-100 控制器",
    orderId: "MO-202606-0001",
    operation: "整机装配",
    line: "Line-A",
    station: "ASM-WS-03",
    version: "V3.2",
    status: "已发布",
    signStatus: "待确认",
    owner: "工艺部 张琪",
    effective: "2026-06-01",
    expires: "2026-12-31",
    terminal: "已同步 3/4",
    summary: "外壳、主板、线束装配及扭矩复核",
    steps: ["核对派工单与物料批次", "安装主板并扫描序列号", "按对角顺序锁附外壳螺钉", "完成扭矩复核并提交首件"],
    params: [
      { label: "电批扭矩", value: "0.42 N·m", status: "通过" },
      { label: "首件抽检", value: "每班首件 + 变更后首件", status: "待确认" },
      { label: "ESD 防护", value: "腕带在线监测", status: "通过" },
    ],
    attachments: ["装配爆炸图 Rev.C", "扭矩点位图", "首件检验表 QF-ASM-08"],
  },
  {
    id: "SOP-DIP-009",
    product: "TCU-100 控制器",
    orderId: "MO-202606-0001",
    operation: "DIP 插件",
    line: "Line-A",
    station: "DIP-WS-01",
    version: "V2.8",
    status: "待确认",
    signStatus: "待确认",
    owner: "工艺部 王珊",
    effective: "2026-05-20",
    expires: "2026-11-30",
    terminal: "已同步 2/3",
    summary: "插件顺序、极性检查、焊前目检",
    steps: ["扫描 PCB 批次", "按料站顺序插件", "复核电容极性与方向", "送入波峰焊前提交目检"],
    params: [
      { label: "插件节拍", value: "48 秒/件", status: "通过" },
      { label: "极性复核", value: "100% 目检", status: "待确认" },
      { label: "防错夹具", value: "JIG-DIP-04", status: "通过" },
    ],
    attachments: ["插件位置图", "极性样张", "波峰焊前点检表"],
  },
  {
    id: "SOP-SMT-021",
    product: "车载传感器 S2",
    orderId: "MO-202606-0002",
    operation: "SMT 贴片",
    line: "Line-B",
    station: "SMT-WS-02",
    version: "V4.1",
    status: "已发布",
    signStatus: "已签收",
    owner: "工艺部 刘川",
    effective: "2026-05-10",
    expires: "2026-10-31",
    terminal: "已同步 5/5",
    summary: "贴片程序、炉温曲线、首件确认",
    steps: ["确认贴片程序 S2-A11", "校验飞达与料盘批次", "首件 AOI 复核", "炉温曲线绑定批次"],
    params: [
      { label: "炉温曲线", value: "P-S2-2026-05", status: "通过" },
      { label: "锡膏时效", value: "< 4 小时", status: "通过" },
      { label: "AOI 程序", value: "AOI-S2-V17", status: "通过" },
    ],
    attachments: ["炉温曲线图", "贴片料站表", "首件确认单"],
  },
  {
    id: "SOP-AGING-005",
    product: "电源模块 P8",
    orderId: "MO-202606-0003",
    operation: "老化测试",
    line: "Line-C",
    station: "AGING-02",
    version: "V1.9",
    status: "变更中",
    signStatus: "待确认",
    owner: "工艺部 陈越",
    effective: "2026-06-05",
    expires: "2026-09-30",
    terminal: "未同步",
    summary: "老化参数、通道绑定、异常停测处理",
    steps: ["扫描老化架通道", "加载 P8 老化曲线", "确认温度与电压上限", "异常停测后隔离待判"],
    params: [
      { label: "老化时长", value: "240 分钟", status: "待确认" },
      { label: "温度上限", value: "65°C", status: "待确认" },
      { label: "通道容量", value: "AGING-02 余 440", status: "风险" },
    ],
    attachments: ["老化曲线 Rev.B", "异常停测判定表", "通道绑定说明"],
  },
  {
    id: "SOP-PACK-012",
    product: "包装套件 K9",
    orderId: "MO-202606-0011",
    operation: "包装入库",
    line: "Line-C",
    station: "PACK-WS-02",
    version: "V2.1",
    status: "已过期",
    signStatus: "已签收",
    owner: "工艺部 何琳",
    effective: "2025-11-01",
    expires: "2026-05-31",
    terminal: "已同步 1/2",
    summary: "箱码、托盘码、附件复核与入库标签",
    steps: ["扫描产品序列号", "核对附件与说明书", "打印箱码并复核", "托盘码绑定入库单"],
    params: [
      { label: "箱码规则", value: "客户 K9-2026", status: "风险" },
      { label: "附件数量", value: "2 件/箱", status: "通过" },
      { label: "标签模板", value: "待升级", status: "待确认" },
    ],
    attachments: ["包装图 Rev.A", "箱码模板", "附件清单"],
  },
];

let sops = structuredClone(initialSops);
let logs = [];
let state = {
  activeSopId: "SOP-ASM-016",
  search: "",
  status: "all",
  line: "all",
  operation: "all",
  detailOpen: true,
};

const $ = (selector) => document.querySelector(selector);

function nowText() {
  return new Date().toLocaleString("zh-CN", { hour12: false });
}

function defaultSopEvidence(item) {
  return {
    sourceSystem: item.sourceSystem || "模拟 PLM 发布",
    plmDocNo: item.plmDocNo || `PLM-${item.id}-${item.version.replace("V", "")}`,
    approvalNo: item.approvalNo || `APR-${item.id}-202606`,
    effectiveScope: item.effectiveScope || { product: item.product, operations: [item.operation], stations: [item.station], line: item.line },
    terminalSync: item.terminalSync || [{
      terminalId: `${item.station}-TERM`,
      status: item.terminal.startsWith("已同步") ? "ACK" : "待同步",
      ackAt: item.terminal.startsWith("已同步") ? "2026-06-20 07:40:00" : "",
      retryCount: 0,
      failureReason: item.terminal === "未同步" ? "模拟终端未返回 ACK" : "",
    }],
    signoffs: item.signoffs || (item.signStatus === "已签收" ? [{
      team: item.line === "Line-C" ? "C1 班" : item.line === "Line-B" ? "B1 班" : "A1 班",
      user: "班组长",
      source: "模拟工位终端签收回执",
      signedAt: "2026-06-20 07:45:00",
    }] : []),
    blockingReasons: item.blockingReasons || [],
  };
}

function normalizeSop(item) {
  return { ...item, ...defaultSopEvidence(item) };
}

function normalizeSops() {
  sops = sops.map(normalizeSop);
}

function renderFrameMenu() {
  $("#sopModuleMenu").innerHTML = modules.map((module) => {
    const openClass = module.id === "dispatch" ? " is-open" : "";
    const submenu = module.items.map((item, index) => {
      const active = module.id === "dispatch" && item === "SOP 查看" ? " class=\"is-active\"" : "";
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

  $("#sopModuleMenu").querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open"));
  });
  $("#sopModuleMenu").querySelectorAll(".submenu a").forEach((link) => {
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
    sops = saved.sops || sops;
    logs = saved.logs || logs;
    state = { ...state, ...(saved.sopState || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  normalizeSops();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ sops, logs, sopState: state }));
}

function getActiveSop() {
  return sops.find((item) => item.id === state.activeSopId) || sops[0];
}

function getVisibleSops() {
  const keyword = state.search.trim().toLowerCase();
  return sops.filter((item) => {
    const text = `${item.id} ${item.product} ${item.orderId} ${item.operation} ${item.station} ${item.owner}`.toLowerCase();
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
  renderSopList();
  renderTerminalPreview();
  renderParams();
  renderSopTable();
  renderDetail();
  renderLogs();
}

function renderDetailPanelState() {
  const isOpen = state.detailOpen !== false;
  $(".sop-layout").classList.toggle("is-detail-closed", !isOpen);
  $("#sopDetailPanel").hidden = !isOpen;
  $("#showDetailBtn").hidden = isOpen;
}

function renderMetrics() {
  const released = sops.filter((item) => item.status === "已发布").length;
  const needConfirm = sops.filter((item) => item.signStatus === "待确认").length;
  const risks = sops.filter((item) => item.status === "变更中" || item.status === "已过期").length;
  const synced = sops.filter((item) => item.terminal.startsWith("已同步")).length;
  $("#metricReleased").textContent = released;
  $("#metricConfirm").textContent = needConfirm;
  $("#metricRisk").textContent = risks;
  $("#metricCoverage").textContent = `${Math.round((synced / sops.length) * 100)}%`;
}

function renderSopList() {
  const visible = getVisibleSops();
  $("#sopList").innerHTML = visible.length ? visible.map((item) => `
    <button class="task-card${item.id === state.activeSopId ? " is-active" : ""}" type="button" data-id="${item.id}">
      <div class="task-card__top">
        <strong>${item.id} · ${item.version}</strong>
        <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
      </div>
      <span class="task-card__product">${item.product} · ${item.operation}</span>
      <div class="task-card__meta">
        <span>${item.line}</span>
        <span>${item.station}</span>
        <span>${item.signStatus}</span>
      </div>
      <div class="task-card__foot">
        <span>${item.owner}</span>
        <span>${item.summary}</span>
      </div>
    </button>
  `).join("") : `<div class="integration-item"><span>暂无</span><strong>当前筛选条件下没有 SOP</strong><em>请调整筛选条件</em></div>`;

  $("#sopList").querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => selectSop(card.dataset.id));
  });
}

function renderTerminalPreview() {
  const item = getActiveSop();
  $("#activeSopText").textContent = `${item.id} · ${item.station}`;
  $("#terminalPreview").innerHTML = `
    <div class="terminal-head">
      <div>
        <span>模拟工位终端任务卡</span>
        <strong>${item.operation} · ${item.product}</strong>
      </div>
      <span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span>
    </div>
    ${item.steps.map((step, index) => `
      <div class="terminal-step">
        <span>${index + 1}</span>
        <strong>${step}</strong>
        <em>${item.version}</em>
      </div>
    `).join("")}
  `;
}

function renderParams() {
  const item = getActiveSop();
  $("#paramBoard").innerHTML = item.params.map((param) => `
    <article class="param-card${getParamClass(param.status)}">
      <span>${param.label}</span>
      <strong>${param.value}</strong>
      <em>${param.status}</em>
    </article>
  `).join("");
}

function renderSopTable() {
  const visible = getVisibleSops();
  $("#sopTableBody").innerHTML = visible.length ? visible.map((item) => `
    <tr class="${item.id === state.activeSopId ? "is-active" : ""}" data-id="${item.id}">
      <td class="order-no">${item.id}</td>
      <td>${item.product} / ${item.orderId}</td>
      <td>${item.operation}</td>
      <td>${item.version}</td>
      <td>${item.station}</td>
      <td><span class="pill pill--${getStatusStyle(item.status)}">${item.status}</span></td>
      <td>${item.signStatus}</td>
      <td><button type="button" data-id="${item.id}">查看</button></td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有 SOP</td></tr>`;

  $("#sopTableBody").querySelectorAll("[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectSop(row.dataset.id));
  });
}

function renderDetail() {
  const item = getActiveSop();
  $("#detailStatus").textContent = item.status;
  $("#detailSopNo").textContent = item.id;
  $("#detailTitle").textContent = `${item.operation} · ${item.product}`;
  $("#detailGrid").innerHTML = [
    ["工单", item.orderId],
    ["来源系统", item.sourceSystem],
    ["PLM 单号", item.plmDocNo],
    ["审批单", item.approvalNo],
    ["产线", item.line],
    ["工位", item.station],
    ["版本", item.version],
    ["生效日", item.effective],
    ["有效期", item.expires],
    ["生效范围", `${item.effectiveScope.product} / ${item.effectiveScope.operations.join("、")} / ${item.effectiveScope.stations.join("、")}`],
    ["签收", item.signStatus],
    ["终端", item.terminal],
    ["负责人", item.owner],
    ["摘要", item.summary],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

  $("#gateList").innerHTML = buildGateItems(item).map((gate) => `
    <div class="gate-item ${getGateClass(gate.status)}">
      <span>${gate.label}</span>
      <strong>${gate.desc}</strong>
      <span>${gate.status}</span>
    </div>
  `).join("");

  const syncItems = item.terminalSync.map((sync) => `
    <div class="readiness-item ${sync.status === "ACK" ? "is-pass is-ready" : sync.status === "失败" ? "is-blocked" : "is-risk"}">
      <span>终端同步回执</span>
      <strong>${sync.terminalId} · ${sync.status} · 重试 ${sync.retryCount} 次</strong>
      <span>${sync.failureReason || sync.ackAt || "待模拟回执"}</span>
    </div>
  `);
  const signItems = (item.signoffs.length ? item.signoffs : [{ team: "待签收班组", user: "待模拟签收", source: "模拟签收回执未返回", signedAt: "" }]).map((signoff) => `
    <div class="readiness-item ${signoff.signedAt ? "is-pass is-ready" : "is-blocked"}">
      <span>模拟签收明细</span>
      <strong>${signoff.team} · ${signoff.user}</strong>
      <span>${signoff.source} ${signoff.signedAt}</span>
    </div>
  `);
  const blockItems = item.blockingReasons.map((reason) => `
    <div class="readiness-item is-blocked">
      <span>开工阻断原因</span>
      <strong>${reason}</strong>
      <span>本页记录</span>
    </div>
  `);
  $("#attachmentList").innerHTML = [...syncItems, ...signItems, ...blockItems, ...item.attachments.map((attachment) => `
    <div class="readiness-item is-pass is-ready">
      <span>附件</span>
      <strong>${attachment}</strong>
      <span>可查看</span>
    </div>
  `)].join("");
}

function renderLogs() {
  const active = getActiveSop();
  const scoped = logs.filter((log) => log.sopId === active.id).slice(0, 5);
  $("#sopLogList").innerHTML = scoped.length
    ? scoped.map((log) => `
      <div class="integration-item">
        <span>${log.sopId}</span>
        <strong>${log.action}</strong>
        <em>${log.time}</em>
      </div>
    `).join("")
    : `<div class="integration-item"><span>暂无</span><strong>${active.summary}</strong><em>等待查看或同步动作</em></div>`;
}

function buildGateItems(item) {
  const terminalFailed = item.terminalSync.some((sync) => sync.status === "失败");
  const terminalAck = item.terminalSync.some((sync) => sync.status === "ACK");
  const notSigned = item.signStatus !== "已签收" || !item.signoffs.length;
  return [
    { label: "版本状态", desc: `${item.sourceSystem} · ${item.approvalNo} · ${item.version} · ${item.status}`, status: item.status === "已发布" ? "通过" : item.status === "已过期" ? "拦截" : "待确认" },
    { label: "生效范围", desc: `${item.effectiveScope.product} · ${item.effectiveScope.operations.join("、")} · ${item.effectiveScope.stations.join("、")}`, status: item.effectiveScope.stations.length ? "通过" : "拦截" },
    { label: "班组签收", desc: notSigned ? "模拟签收回执未返回，开工检查应拦截" : item.signoffs.map((entry) => `${entry.team}/${entry.user}/${entry.signedAt}`).join("、"), status: notSigned ? "拦截" : "通过" },
    { label: "终端同步", desc: item.terminalSync.map((sync) => `${sync.terminalId}/${sync.status}/重试${sync.retryCount}`).join("、"), status: terminalFailed ? "拦截" : terminalAck ? "通过" : "待确认" },
    { label: "参数确认", desc: item.params.map((param) => param.label).join("、"), status: item.params.some((param) => param.status === "风险") ? "拦截" : item.params.some((param) => param.status === "待确认") ? "待确认" : "通过" },
  ];
}

function getParamClass(status) {
  if (status === "风险") return " is-blocked";
  if (status === "待确认") return " is-risk";
  return "";
}

function getGateClass(status) {
  if (status === "通过") return "is-pass is-ready";
  if (status === "拦截") return "is-blocked";
  return "is-risk";
}

function getStatusStyle(status) {
  if (status === "已发布" || status === "已签收") return "green";
  if (status === "已过期") return "red";
  if (status === "变更中" || status === "待确认") return "orange";
  return "blue";
}

function selectSop(id) {
  state.activeSopId = id;
  state.detailOpen = true;
  recordLog(id, "已打开 SOP 详情");
  saveState();
  renderAll();
}

function updateSop(id, patch, message) {
  const index = sops.findIndex((item) => item.id === id);
  if (index < 0) return;
  sops[index] = { ...sops[index], ...patch };
  syncLedgerSop(sops[index], message);
  if (patch.status === "已发布" || patch.terminal?.includes("已同步") || patch.signStatus === "已签收") {
    window.MES_BUSINESS_FLOW?.applyDispatchAction?.(sops[index].orderId, "generate", { owner: sops[index].owner || "工艺员" });
  }
  state.activeSopId = id;
  recordLog(id, message);
  saveState();
  renderAll();
  showToast(message);
}

function recordLog(sopId, action) {
  logs = [
    { sopId, action, time: new Date().toLocaleString("zh-CN", { hour12: false }) },
    ...logs,
  ].slice(0, 60);
}

function syncLedgerSop(item, message) {
  const ledger = window.MES_DISPATCH_LEDGER;
  if (!ledger) return;
  const row = ledger.getRows?.().find((entry) => entry.orderId === item.orderId && entry.resources?.station === item.station);
  if (!row) return;
  ledger.appendRecord?.(row.dispatchId, message, { owner: item.owner || "工艺员", source: message.includes("模拟") ? "MES SOP 查看接收模拟回执" : "MES SOP 查看" });
}

function setBlockingReasons(item) {
  const reasons = [];
  if (item.status === "已过期") reasons.push(`${item.id} ${item.version} 已过期`);
  if (item.signStatus !== "已签收" || !item.signoffs.length) reasons.push(`${item.id} ${item.version} 未收到模拟签收回执`);
  if (item.terminalSync.some((sync) => sync.status !== "ACK")) reasons.push(`${item.id} ${item.version} 终端同步未收到模拟 ACK`);
  return reasons;
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
  $("#sopSearch").addEventListener("input", (event) => {
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
  $("#operationFilter").addEventListener("change", (event) => {
    state.operation = event.target.value;
    saveState();
    renderAll();
  });
  $("#batchSignBtn").addEventListener("click", () => {
    const targets = sops.filter((item) => item.status === "已发布" && item.signStatus === "待确认");
    if (!targets.length) {
      showToast("没有可批量签收的已发布 SOP");
      return;
    }
    targets.forEach((item) => {
      item.signStatus = "已签收";
      item.signoffs = [{ team: item.line === "Line-C" ? "C1 班" : item.line === "Line-B" ? "B1 班" : "A1 班", user: "班组长", source: "模拟工位终端签收回执", signedAt: nowText() }];
      item.blockingReasons = setBlockingReasons(item);
      recordLog(item.id, "已批量接收模拟班组签收回执");
    });
    state.activeSopId = targets[0].id;
    saveState();
    renderAll();
    showToast(`已签收 ${targets.length} 份 SOP`);
  });
  $("#pushTerminalBtn").addEventListener("click", () => {
    const item = getActiveSop();
    const terminalSync = [{ terminalId: `${item.station}-TERM`, status: "ACK", ackAt: nowText(), retryCount: (item.terminalSync?.[0]?.retryCount || 0) + 1, failureReason: "" }];
    updateSop(item.id, { terminal: "已同步 4/4", terminalSync, blockingReasons: setBlockingReasons({ ...item, terminalSync }) }, "SOP 已同步终端，并记录模拟终端 ACK");
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
  $("#verifyBtn").addEventListener("click", () => {
    recordLog(getActiveSop().id, "已重新校验版本、签收和终端同步状态");
    saveState();
    renderLogs();
    showToast("SOP 版本校验已完成");
  });
  $("#signBtn").addEventListener("click", () => {
    const item = getActiveSop();
    if (!item.terminalSync.some((sync) => sync.status === "ACK")) {
      showToast("终端未同步 ACK，不能记录模拟签收");
      return;
    }
    const signoffs = [{ team: item.line === "Line-C" ? "C1 班" : item.line === "Line-B" ? "B1 班" : "A1 班", user: "班组长", source: "模拟工位终端签收回执", signedAt: nowText() }];
    updateSop(item.id, { signStatus: "已签收", signoffs, blockingReasons: setBlockingReasons({ ...item, signStatus: "已签收", signoffs }) }, "已接收模拟签收回执");
  });
  $("#releaseBtn").addEventListener("click", () => {
    const item = getActiveSop();
    if (!item.approvalNo || !item.effectiveScope?.stations?.length) {
      showToast("缺少审批单或生效范围，不能发布到执行");
      return;
    }
    updateSop(item.id, { status: "已发布", sourceSystem: "模拟 PLM 来源", blockingReasons: setBlockingReasons({ ...item, status: "已发布" }) }, "SOP 已发布到执行，来源为模拟 PLM 版本");
  });
  $("#changeBtn").addEventListener("click", () => updateSop(getActiveSop().id, { status: "变更中", signStatus: "待确认" }, "已发起 SOP 变更"));
  $("#terminalBtn").addEventListener("click", () => {
    const item = getActiveSop();
    const terminalSync = [{ terminalId: `${item.station}-TERM`, status: "ACK", ackAt: nowText(), retryCount: (item.terminalSync?.[0]?.retryCount || 0) + 1, failureReason: "" }];
    updateSop(item.id, { terminal: "已同步 4/4", terminalSync, blockingReasons: setBlockingReasons({ ...item, terminalSync }) }, "已同步终端，并记录模拟终端 ACK 回执");
  });
  $("#printBtn").addEventListener("click", () => {
    recordLog(getActiveSop().id, "已生成工位纸质卡打印记录");
    saveState();
    renderLogs();
    showToast("工位卡打印记录已生成");
  });
  $("#archiveBtn").addEventListener("click", () => {
    const item = getActiveSop();
    updateSop(item.id, { status: "已过期", blockingReasons: setBlockingReasons({ ...item, status: "已过期" }) }, "SOP 已标记过期并记录为开工阻断原因");
  });
  $("#resetSopBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    sops = structuredClone(initialSops);
    logs = [];
    state = { activeSopId: "SOP-ASM-016", search: "", status: "all", line: "all", operation: "all", detailOpen: true };
    $("#sopSearch").value = "";
    $("#statusFilter").value = "all";
    $("#lineFilter").value = "all";
    $("#operationFilter").value = "all";
    renderAll();
    showToast("SOP 查看演示已重置");
  });
}

normalizeSops();
loadState();
renderFrameMenu();
$("#sopSearch").value = state.search;
$("#statusFilter").value = state.status;
$("#lineFilter").value = state.line;
$("#operationFilter").value = state.operation;
bindEvents();
renderAll();
