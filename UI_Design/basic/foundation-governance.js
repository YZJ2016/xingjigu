const pageConfig = window.FOUNDATION_PAGE || { id: "rules", title: "规则与代码", eyebrow: "基础资料 / 规则与代码" };
const STORAGE_KEY = `xingjigu_mes_foundation_${pageConfig.id}_v1`;

const seedData = {
  rules: [
    { id: "RULE-SN-TCU-V3", type: "编码规则", name: "TCU-100 产品 SN 规则", version: "V3.2", scope: "产品 TCU-100 / Line-A", source: "MES 编码规则 + PLM 产品版本", status: "已发布", owner: "编码管理员 许航", updated: "2026-06-20 09:10", impact: "生产批次、产品序列号、箱码托盘码、客户追溯报告", check: "SN 前缀、流水段、客户模板均已审批", next: "继续供条码与标签、追溯查询引用", risk: "规则停用前必须确认无在制批次引用" },
    { id: "DEF-SMT-SOLDER", type: "不良代码", name: "SMT 虚焊 / 连锡代码", version: "V2.1", scope: "SMT 贴片 / 过程检验 / FQC", source: "QMS 不良代码 + MES 质量基础", status: "待审批", owner: "质量工程师 孟可", updated: "2026-06-20 10:22", impact: "过程检验、不良记录、返工评审、良率分析", check: "新增客户 A 代码映射待质量主管会签", next: "审批后用于 NCR 和良率下钻", risk: "未发布前不得作为客户报告口径" },
    { id: "DT-REASON-MATWAIT", type: "停机原因", name: "换料等待 / 物料未到位", version: "V1.6", scope: "Line-A / Line-B / 全部设备", source: "设备 TPM + 生产原因代码", status: "已发布", owner: "设备员 周诚", updated: "2026-06-19 16:45", impact: "停机归因、停机损失、OEE、缺料处理", check: "原因代码与设备停机记录、班组补录一致", next: "供过程监控停机归因引用", risk: "归因错误会影响 OEE 和计划重排" },
    { id: "GATE-START-SMT", type: "开工准入", name: "SMT 开工人机料法环测准入", version: "V4.0", scope: "SMT 工序 / SMT-WS-01 / SMT-01", source: "MES 准入规则 + 工艺路线 + 设备状态", status: "已发布", owner: "车间主任 陈伟", updated: "2026-06-20 08:30", impact: "任务下达、开工检查、扫码开工、设备状态、投料确认", check: "人员资质、SOP、物料齐套、设备点检、首件计划必须通过", next: "扫码开工前自动引用", risk: "规则变更需评估所有待开工派工" },
  ],
  calendar: [
    { id: "CAL-LINEA-202606", type: "产线日历", name: "Line-A 白夜班资源日历", version: "2026-06", scope: "华东一厂 / 电子装配车间 / Line-A", source: "生产管理 + 设备保养计划", status: "已发布", owner: "计划主管 许晨", updated: "2026-06-18 08:20", impact: "生产排程、产能负荷、电子看板、任务下达", check: "白班 08:00-20:00，夜班 20:00-08:00，SMT-01 继承产线日历", next: "APS 排程和产能负荷已引用", risk: "例外停线需同步任务下达和交期预警" },
    { id: "CAL-PM-SMT01", type: "保养窗口", name: "SMT-01 夜班保养窗口", version: "2026-W25", scope: "SMT-01 / Line-A", source: "设备保养计划", status: "待审批", owner: "设备主管 梁溪", updated: "2026-06-20 11:05", impact: "生产排程、设备状态、任务下达、停机记录", check: "06-22 02:00-04:00 计划停机，需计划员确认改排", next: "审批后锁定设备产能", risk: "若未同步 APS，可能下达到不可用设备" },
    { id: "CAL-QC-FINAL", type: "检验资源", name: "FQC 终检资源日历", version: "2026-06", scope: "QC-Final / FQC 检验台", source: "质量检验资源", status: "已发布", owner: "质量主管 周雅", updated: "2026-06-19 09:40", impact: "成品检验、质量放行、完工确认、成品入库", check: "FQC 每班 2 人，抽样加严时折减 1 小时能力", next: "供完工确认排队和交期预警引用", risk: "资源不足会导致入库前积压" },
  ],
  qualification: [
    { id: "QUAL-SMT-OP-018", type: "岗位技能", name: "SMT 操作员资质", version: "V2.0", scope: "员工 EMP-018 / SMT-WS-01", source: "HR 在职 + 班组排班 + 培训记录", status: "已发布", owner: "班组长 郑峰", updated: "2026-06-20 07:55", impact: "员工登录、扫码开工、开工检查", check: "SMT 上料、换线、首件配合资质有效至 2026-12-31", next: "允许模拟工牌登录并接收 SMT 任务", risk: "资质过期将拦截开工" },
    { id: "QUAL-QA-FQC-031", type: "质量签核", name: "FQC 放行签核资质", version: "V1.8", scope: "质量员 QC-031 / FQC / 质量放行", source: "QMS 资质 + 电子签名", status: "需复核", owner: "质量负责人 周雅", updated: "2026-06-20 09:12", impact: "成品检验、质量放行、库存冻结、客户追溯报告", check: "FQC 放行资质 06-25 到期，需复核延期", next: "复核后继续允许质量放行签核", risk: "到期后必须拦截质量放行按钮" },
    { id: "QUAL-TPM-IP-022", type: "设备点检", name: "SMT 点检与复位资质", version: "V2.4", scope: "设备员 EQ-022 / SMT-01", source: "设备 TPM 资质", status: "已发布", owner: "设备主管 梁溪", updated: "2026-06-18 14:25", impact: "点检计划、开工检查、设备状态、维修工单", check: "允许班前点检、故障后复位和保养验收", next: "设备状态和开工准入可引用", risk: "无资质复位会影响设备履历可信度" },
  ],
};

const pageDefinitions = {
  rules: {
    title: "规则与代码",
    eyebrow: "基础资料 / 规则与代码",
    user: "基础规则管理员",
    metrics: ["规则总数", "已发布", "待审批", "影响页面"],
    columns: ["规则编码", "类型", "名称 / 版本", "生效范围", "状态", "下游影响", "责任人", "下一步"],
    tableTitle: "生产规则、原因代码与准入口径",
    tableHint: "以业务语言维护编码、不良、停机、抽检和开工准入规则，不暴露技术状态机概念",
    actionTitle: "规则发布 / 停用复核",
  },
  calendar: {
    title: "班次日历",
    eyebrow: "基础资料 / 班次日历",
    user: "计划主管",
    metrics: ["日历对象", "已发布", "待审批", "影响排程"],
    columns: ["日历编码", "类型", "日历 / 版本", "资源范围", "状态", "下游影响", "责任人", "下一步"],
    tableTitle: "班次、资源日历与例外窗口",
    tableHint: "日历约束排程、产能负荷、设备保养和 FQC 资源，不等同于车间组织资料",
    actionTitle: "日历例外 / 发布复核",
  },
  qualification: {
    title: "人员资质",
    eyebrow: "系统设置 / 人员资质",
    user: "权限与资质管理员",
    metrics: ["资质记录", "有效", "需复核", "准入引用"],
    columns: ["资质编码", "类型", "资质 / 版本", "适用范围", "状态", "下游影响", "责任人", "下一步"],
    tableTitle: "岗位技能、点检与质量签核资质",
    tableHint: "人员账号只证明身份，人员资质决定开工、点检、质量放行等生产准入资格",
    actionTitle: "资质复核 / 到期拦截",
  },
};

let rows = structuredClone(seedData[pageConfig.id]);
let state = { activeId: rows[0]?.id || "", search: "", status: "all", type: "all" };
let logs = [];

const $ = (selector) => document.querySelector(selector);
const def = pageDefinitions[pageConfig.id];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    rows = saved.rows || rows;
    state = { ...state, ...(saved.state || {}) };
    logs = saved.logs || [];
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, state, logs }));
}

function getVisibleRows() {
  const keyword = state.search.trim().toLowerCase();
  return rows.filter((row) => {
    const text = Object.values(row).join(" ").toLowerCase();
    return (!keyword || text.includes(keyword)) && (state.status === "all" || row.status === state.status) && (state.type === "all" || row.type === state.type);
  });
}

function getActive() {
  return rows.find((row) => row.id === state.activeId) || getVisibleRows()[0] || rows[0];
}

function styleStatus(status) {
  if (/停用|过期|拦截/.test(status)) return "red";
  if (/待|需复核|审批/.test(status)) return "orange";
  if (/发布|有效/.test(status)) return "green";
  return "blue";
}

function pill(status) {
  return `<span class="pill ${styleStatus(status)}">${status}</span>`;
}

function renderMenu() {
  const menu = $("#foundationModuleMenu");
  menu.innerHTML = window.MES_NAV_MODULES.map((module) => {
    const isOpen = module.id === (pageConfig.id === "qualification" ? "system" : "basic");
    const submenu = module.items.map((item, index) => {
      const active = item === def.title ? " class=\"is-active\"" : "";
      return `<a href="#${module.id}-${index}"${active} data-module="${module.id}" data-entry="${item}">${item}</a>`;
    }).join("");
    return `<section class="module-group${isOpen ? " is-open" : ""}"><button class="module-button" type="button"><span class="module-icon" style="background:${module.color}">${module.mark}</span><span><span class="module-title">${module.title}</span><span class="module-layer">${module.layer}</span></span><span class="chevron">›</span></button><div class="submenu">${submenu}</div></section>`;
  }).join("");
  menu.querySelectorAll(".module-button").forEach((button) => button.addEventListener("click", () => button.closest(".module-group").classList.toggle("is-open")));
}

function renderChrome() {
  document.title = `星技谷 MES | ${def.title}`;
  $("#pageEyebrow").textContent = def.eyebrow;
  $("#pageTitle").textContent = def.title;
  $("#pageSubtitle").textContent = def.tableHint;
  $("#userRole").textContent = def.user;
  $("#tableTitle").textContent = def.tableTitle;
  $("#tableHint").textContent = def.tableHint;
  $("#actionTitle").textContent = def.actionTitle;
  $("#statusFilter").innerHTML = `<option value="all">全部状态</option>${[...new Set(rows.map((row) => row.status))].map((status) => `<option value="${status}">${status}</option>`).join("")}`;
  $("#typeFilter").innerHTML = `<option value="all">全部类型</option>${[...new Set(rows.map((row) => row.type))].map((type) => `<option value="${type}">${type}</option>`).join("")}`;
  $("#tableHead").innerHTML = `<tr>${def.columns.map((col) => `<th>${col}</th>`).join("")}</tr>`;
}

function renderMetrics() {
  const visible = getVisibleRows();
  const values = [
    visible.length,
    visible.filter((row) => row.status === "已发布").length,
    visible.filter((row) => /待|需复核|审批/.test(row.status)).length,
    [...new Set(visible.flatMap((row) => row.impact.split("、")))].length,
  ];
  $("#foundationMetrics").innerHTML = def.metrics.map((label, index) => `<article><span>${label}</span><strong>${values[index]}</strong></article>`).join("");
}

function renderBusinessFocus() {
  let focus = $("#foundationFocus");
  if (!focus) {
    focus = document.createElement("section");
    focus.id = "foundationFocus";
    focus.className = "foundation-focus";
    $("#foundationMetrics").after(focus);
  }
  const active = getActive();
  const visible = getVisibleRows();
  const blocked = visible.filter((row) => /待|需复核|拦截|风险|异常|影响/.test(`${row.status} ${row.risk} ${row.next}`)).slice(0, 4);
  const focusMap = {
    rules: ["规则准入矩阵", "按规则状态、发布版本、影响页面和拦截风险判断是否允许被生产执行引用", "规则状态", "引用窗口"],
    calendar: ["班次排程矩阵", "按班次窗口、例外停线、保养窗口和资源范围判断排程与派工可用性", "日历状态", "资源窗口"],
    qualification: ["人员资质准入矩阵", "按资质状态、有效期、岗位范围和签核资格判断生产动作准入", "资质状态", "有效窗口"],
  };
  const [title, hint, stateTitle, windowTitle] = focusMap[pageConfig.id] || focusMap.rules;
  focus.innerHTML = `
    <div class="foundation-focus__head">
      <div>
        <span>本页业务重点</span>
        <h2>${title}</h2>
        <p>${hint}</p>
      </div>
      <strong>${active?.id || "未选中"} · ${active?.scope || "全部范围"}</strong>
    </div>
    <div class="foundation-focus__grid">
      <article class="foundation-state-map">
        <span>${stateTitle}</span>
        ${visible.slice(0, 4).map((row) => `
          <div class="foundation-state-map__row">
            <b class="foundation-dot foundation-dot--${styleStatus(row.status)}"></b>
            <strong>${row.name}</strong>
            <em>${row.status}</em>
            <small>${row.scope}</small>
          </div>
        `).join("")}
      </article>
      <article class="foundation-window-map">
        <span>${windowTitle}</span>
        ${visible.slice(0, 4).map((row) => `
          <div>
            <strong>${row.version}</strong>
            <em>${row.id}</em>
            <small>${row.next}</small>
          </div>
        `).join("")}
      </article>
      <article class="foundation-risk-stack">
        <span>闭环风险</span>
        ${blocked.length ? blocked.map((row) => `
          <div>
            <strong>${row.id}</strong>
            <em>${row.risk}</em>
            <small>${row.owner}</small>
          </div>
        `).join("") : `<div><strong>当前无阻断风险</strong><em>可继续执行发布复核</em><small>${def.user} 负责复核</small></div>`}
      </article>
    </div>
  `;
}

function renderTable() {
  const visible = getVisibleRows();
  $("#foundationTableBody").innerHTML = visible.length ? visible.map((row) => `
    <tr class="${row.id === state.activeId ? "is-active" : ""}" data-id="${row.id}">
      <td><strong>${row.id}</strong><span>${row.source}</span></td>
      <td>${row.type}</td>
      <td><strong>${row.name}</strong><span>${row.version}</span></td>
      <td>${row.scope}</td>
      <td>${pill(row.status)}</td>
      <td>${row.impact}</td>
      <td>${row.owner}<span>${row.updated}</span></td>
      <td>${row.next}</td>
    </tr>
  `).join("") : `<tr><td colspan="8">当前筛选条件下没有${def.title}记录</td></tr>`;
  $("#foundationTableBody").querySelectorAll("tr[data-id]").forEach((row) => row.addEventListener("click", () => {
    state.activeId = row.dataset.id;
    saveState();
    renderAll();
  }));
}

function renderCards() {
  $("#foundationCards").innerHTML = getVisibleRows().slice(0, 4).map((row) => `
    <article class="foundation-card">
      <span>${row.type} · ${row.status}</span>
      <strong>${row.name}</strong>
      <p>${row.check}</p>
      <em>${row.risk}</em>
    </article>
  `).join("");
}

function renderDetail() {
  const active = getActive();
  $("#detailStatus").innerHTML = pill(active.status);
  $("#detailTitle").textContent = active.name;
  $("#detailSubtitle").textContent = `${active.id} · ${active.scope}`;
  $("#detailKv").innerHTML = [
    ["来源", active.source],
    ["版本", active.version],
    ["检查结果", active.check],
    ["下游影响", active.impact],
    ["风险", active.risk],
    ["下一步", active.next],
  ].map(([key, value]) => `<article><span>${key}</span><strong>${value}</strong></article>`).join("");
  $("#timelineList").innerHTML = [...logs.filter((log) => log.id === active.id).slice(-4).reverse(), { action: "当前状态", result: active.check, time: active.updated, owner: active.owner }].map((log) => `<article><span>${log.time} · ${log.owner}</span><strong>${log.action}</strong><p>${log.result}</p></article>`).join("");
}

function updateActive(status, action, result) {
  const active = getActive();
  active.status = status;
  active.updated = new Date().toLocaleString("zh-CN", { hour12: false });
  active.check = result;
  logs.push({ id: active.id, action, result, owner: def.user, time: active.updated });
  saveState();
  renderAll();
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
  $("#typeFilter").addEventListener("change", (event) => {
    state.type = event.target.value;
    saveState();
    renderAll();
  });
  $("#primaryActionBtn").addEventListener("click", () => updateActive("已发布", "发布 / 复核通过", "版本、范围、责任人和下游影响已复核，允许生产业务引用"));
  $("#secondaryActionBtn").addEventListener("click", () => updateActive("待审批", "退回补充依据", "影响范围或审批意见不足，暂不允许生产业务引用"));
  $("#resetFoundationBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    rows = structuredClone(seedData[pageConfig.id]);
    state = { activeId: rows[0]?.id || "", search: "", status: "all", type: "all" };
    logs = [];
    renderAll();
  });
}

function renderAll() {
  renderChrome();
  $("#searchInput").value = state.search;
  $("#statusFilter").value = state.status;
  $("#typeFilter").value = state.type;
  renderMetrics();
  renderBusinessFocus();
  renderTable();
  renderCards();
  renderDetail();
}

loadState();
renderMenu();
renderAll();
bindEvents();
