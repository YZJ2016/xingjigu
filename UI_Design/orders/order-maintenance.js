(function () {
  const STORAGE_KEY = "xingjigu_mes_production_orders_v2";
  const actionProfiles = {
    orders: {
      title: "计划订单维护动作",
      desc: "计划员维护 MES 生产订单副本，不直接修改 ERP 原始订单。已被排程、派工或追溯引用的订单只允许暂停、作废或调整。",
      badge: "生产订单",
      actions: [
        ["copyOrder", "复制订单"],
        ["importOrder", "模拟导入"],
        ["submitReview", "提交评审"],
        ["pauseOrder", "暂停订单", "warn"],
        ["voidOrder", "作废订单", "danger"],
        ["impactCheck", "影响校验"],
      ],
    },
    review: {
      title: "评审资料与会签维护",
      desc: "维护资料问题、会签意见、退回原因和评审履历，评审结论写入订单准入状态。",
      badge: "订单评审",
      actions: [
        ["dataIssue", "登记资料问题"],
        ["countersign", "新增会签意见"],
        ["returnReason", "填写退回原因", "warn"],
        ["submitReview", "提交评审"],
        ["approveReview", "评审通过"],
        ["history", "查看履历"],
      ],
    },
    schedule: {
      title: "排程草案维护",
      desc: "维护排程草案、工序时间、拆批、锁定、发布和撤回，不后台启动产线或设备。",
      badge: "生产排程",
      actions: [
        ["draftSchedule", "新建草案"],
        ["editOperation", "编辑工序时间"],
        ["splitBatch", "拆批"],
        ["lockPlan", "锁定计划"],
        ["publishPlan", "发布排程"],
        ["withdrawPlan", "撤回排程", "warn"],
      ],
    },
    capacity: {
      title: "产能日历与资源约束维护",
      desc: "维护计划部门可配置的加班窗口、停线窗口、资源约束和均衡建议，不修改 PLC 设备能力事实。",
      badge: "产能负荷",
      actions: [
        ["overtimeWindow", "新增加班窗口"],
        ["stopWindow", "新增停线窗口", "warn"],
        ["resourceLimit", "编辑资源约束"],
        ["balanceAdvice", "登记均衡建议"],
        ["turnAdjustment", "转计划调整"],
        ["history", "查看履历"],
      ],
    },
    warning: {
      title: "交期风险处置维护",
      desc: "维护交期风险、原因拆解、责任分派、升级关闭和转计划调整记录，不直接承诺客户交期或改 ERP 交期。",
      badge: "交期预警",
      actions: [
        ["newWarning", "新增预警"],
        ["editReason", "编辑原因"],
        ["assignOwner", "分派责任"],
        ["escalateWarning", "升级预警", "warn"],
        ["closeWarning", "关闭预警"],
        ["turnAdjustment", "转计划调整"],
      ],
    },
    adjustment: {
      title: "计划调整申请维护",
      desc: "维护调整申请、前后计划、影响评估、审批、生效和回退记录，保留已下达派工和 WIP 影响校验。",
      badge: "计划调整",
      actions: [
        ["newAdjustment", "新建调整申请"],
        ["editPlanChange", "编辑前后计划"],
        ["submitApproval", "提交审批"],
        ["approveAdjustment", "批准生效"],
        ["rollbackAdjustment", "回退调整", "warn"],
        ["history", "查看履历"],
      ],
    },
    kit: {
      title: "齐套复核与开工拦截维护",
      desc: "维护替代料、拆批建议、手工复核和开工拦截，只记录 MES 齐套结论，不直接修改 WMS 库存或 IQC 结论。",
      badge: "齐套检查",
      actions: [
        ["manualKitReview", "手工复核"],
        ["substituteMaterial", "登记替代料"],
        ["splitAdvice", "拆批建议"],
        ["confirmKit", "确认齐套"],
        ["blockStart", "开工拦截", "warn"],
        ["shortageException", "生成缺料异常"],
      ],
    },
  };

  const pageType = document.body?.dataset.orderMaintenance;
  if (!pageType || !actionProfiles[pageType]) return;

  let pendingAction = null;
  const $ = (selector, root = document) => root.querySelector(selector);

  function readStore() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
      if (!Array.isArray(saved.orders) && window.MES_BUSINESS_FLOW?.getOrderStoreShape) {
        return window.MES_BUSINESS_FLOW.getOrderStoreShape("state", saved.state || {});
      }
      return saved;
    } catch (error) {
      return window.MES_BUSINESS_FLOW?.getOrderStoreShape?.("state", {}) || {};
    }
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function getOrders(store) {
    if (Array.isArray(store.orders)) return store.orders;
    if (typeof window.getActiveOrder === "function") {
      const active = window.getActiveOrder();
      return active ? [active] : [];
    }
    return [];
  }

  function getActiveOrder(store) {
    const orders = getOrders(store);
    const knownState = store.state || store.reviewState || store.scheduleState || store.deliveryWarningState || store.adjustmentState || store.kitState || {};
    const activeId = knownState.activeOrderId || window.state?.activeOrderId || orders[0]?.id;
    return orders.find((order) => order.id === activeId) || orders[0] || null;
  }

  function createShell() {
    const main = $(".main");
    const metrics = $(".order-metrics");
    if (!main || !metrics || $("#planMaintenancePanel")) return;
    const profile = actionProfiles[pageType];
    const panel = document.createElement("section");
    panel.id = "planMaintenancePanel";
    panel.className = "plan-maintenance-panel";
    panel.innerHTML = `
      <div class="plan-maintenance-panel__head">
        <div>
          <h2>${profile.title}</h2>
          <p>${profile.desc}</p>
        </div>
        <span class="plan-maintenance-panel__badge">${profile.badge}</span>
      </div>
      <div class="plan-maintenance-grid">
        <div class="plan-maintenance-actions">
          ${profile.actions.map(([action, label, tone]) => `<button type="button" data-plan-action="${action}" ${tone === "danger" ? "data-danger=\"true\"" : ""} ${tone === "warn" ? "data-warn=\"true\"" : ""}>${label}</button>`).join("")}
        </div>
        <div id="planMaintenanceLog" class="plan-maintenance-log" aria-label="计划维护履历"></div>
      </div>
    `;
    main.insertBefore(panel, metrics.nextSibling);
    document.body.insertAdjacentHTML("beforeend", getModalMarkup());
    panel.querySelectorAll("[data-plan-action]").forEach((button) => {
      button.addEventListener("click", () => openAction(button.dataset.planAction));
    });
    $("#planMaintenanceClose")?.addEventListener("click", closeAction);
    $("#planMaintenanceCancel")?.addEventListener("click", closeAction);
    $("#planMaintenanceForm")?.addEventListener("submit", submitAction);
    $("#planMaintenanceConfirmClose")?.addEventListener("click", closeConfirm);
    $("#planMaintenanceConfirmCancel")?.addEventListener("click", closeConfirm);
    $("#planMaintenanceConfirmOk")?.addEventListener("click", confirmAction);
    $("#planMaintenanceBackdrop")?.addEventListener("click", (event) => {
      if (event.target.id === "planMaintenanceBackdrop") closeAction();
    });
    $("#planMaintenanceConfirmBackdrop")?.addEventListener("click", (event) => {
      if (event.target.id === "planMaintenanceConfirmBackdrop") closeConfirm();
    });
    renderMaintenanceLog();
  }

  function getModalMarkup() {
    return `
      <div id="planMaintenanceBackdrop" class="modal-backdrop" hidden>
        <section class="modal plan-maintenance-modal" role="dialog" aria-modal="true" aria-labelledby="planMaintenanceTitle">
          <div class="modal__header">
            <div>
              <div class="drawer__label">订单与计划维护</div>
              <h3 id="planMaintenanceTitle">维护动作</h3>
            </div>
            <button id="planMaintenanceClose" class="icon-button" type="button" aria-label="关闭计划维护表单">×</button>
          </div>
          <form id="planMaintenanceForm" class="plan-maintenance-form">
            <label>
              关联工单
              <select id="planMaintenanceOrder"></select>
            </label>
            <label>
              责任人
              <input id="planMaintenanceOwner" type="text" value="周计划" required />
            </label>
            <label>
              维护对象
              <input id="planMaintenanceObject" type="text" required />
            </label>
            <label>
              新状态 / 结论
              <select id="planMaintenanceStatus"></select>
            </label>
            <label class="is-wide">
              前后值摘要
              <textarea id="planMaintenanceSummary" required></textarea>
            </label>
            <label class="is-wide">
              校验与影响说明
              <textarea id="planMaintenanceImpact" required></textarea>
            </label>
            <div class="modal__actions">
              <button id="planMaintenanceCancel" class="secondary-action" type="button">取消</button>
              <button class="primary-action" type="submit">保存维护记录</button>
            </div>
          </form>
        </section>
      </div>
      <div id="planMaintenanceConfirmBackdrop" class="modal-backdrop" hidden>
        <section class="modal plan-maintenance-confirm" role="dialog" aria-modal="true" aria-labelledby="planMaintenanceConfirmTitle">
          <div class="confirm-modal__head">
            <span class="confirm-badge">需二次确认</span>
            <button id="planMaintenanceConfirmClose" class="icon-button" type="button" aria-label="关闭确认弹窗">×</button>
          </div>
          <h3 id="planMaintenanceConfirmTitle">确认维护动作</h3>
          <p id="planMaintenanceConfirmMessage"></p>
          <div class="modal__actions confirm-actions">
            <button id="planMaintenanceConfirmCancel" class="secondary-action" type="button">取消</button>
            <button id="planMaintenanceConfirmOk" class="primary-action" type="button">确认保存</button>
          </div>
        </section>
      </div>
    `;
  }

  function openAction(action) {
    pendingAction = buildActionContext(action);
    const store = readStore();
    const orders = getOrders(store);
    const active = getActiveOrder(store);
    $("#planMaintenanceTitle").textContent = pendingAction.title;
    $("#planMaintenanceObject").value = pendingAction.object;
    $("#planMaintenanceSummary").value = pendingAction.summary;
    $("#planMaintenanceImpact").value = pendingAction.impact;
    $("#planMaintenanceStatus").innerHTML = pendingAction.statuses.map((status) => `<option value="${status}">${status}</option>`).join("");
    $("#planMaintenanceStatus").value = pendingAction.defaultStatus;
    $("#planMaintenanceOrder").innerHTML = orders.map((order) => `<option value="${order.id}">${order.id} · ${order.product}</option>`).join("");
    if (active) $("#planMaintenanceOrder").value = active.id;
    $("#planMaintenanceBackdrop").hidden = false;
  }

  function buildActionContext(action) {
    const labels = Object.fromEntries(actionProfiles[pageType].actions.map(([key, label]) => [key, label]));
    const base = {
      action,
      title: labels[action] || "维护动作",
      object: labels[action] || "计划维护对象",
      statuses: ["草稿", "待审批", "已提交", "已生效", "已关闭"],
      defaultStatus: "已提交",
      summary: "维护前：待计划员确认；维护后：记录责任人、时间戳、关联工单和闭环结果。",
      impact: "已校验订单评审、排程、齐套、派工准备、物料和质量影响；不直接修改 ERP/WMS/PLC 原始事实。",
      dangerous: ["pauseOrder", "voidOrder", "withdrawPlan", "stopWindow", "escalateWarning", "rollbackAdjustment", "blockStart"].includes(action),
    };
    const overrides = {
      copyOrder: { defaultStatus: "草稿", summary: "复制当前 MES 订单副本，生成未评审的新计划草稿。" },
      importOrder: { title: "模拟导入 ERP 工单", defaultStatus: "待评审", impact: "模拟 ERP 接口回传，MES 只保存执行副本和幂等校验结果。" },
      submitReview: { defaultStatus: "待审批", impact: "提交后进入订单评审，不跳过 BOM、工艺、质量和齐套准入校验。" },
      pauseOrder: { defaultStatus: "已暂停", summary: "维护前：订单可继续排程；维护后：暂停派工准备和备料释放。" },
      voidOrder: { defaultStatus: "已作废", summary: "维护前：订单仍在计划池；维护后：保留引用履历并停止后续计划动作。" },
      dataIssue: { defaultStatus: "待补资料", impact: "资料问题需基础资料、工艺或质量负责人补齐后再评审。" },
      countersign: { defaultStatus: "待会签", summary: "新增物料、质量、设备或计划会签意见。" },
      approveReview: { defaultStatus: "已通过", impact: "评审通过后只进入待排程，不直接下达现场开工。" },
      draftSchedule: { defaultStatus: "草稿", summary: "新增排程草案，等待资源约束确认。" },
      lockPlan: { defaultStatus: "已锁定", impact: "锁定后需撤回或调整申请才能修改工序时间。" },
      publishPlan: { defaultStatus: "已发布", impact: "发布到派工准备和备料协同，不代表现场已接单或已开工。" },
      overtimeWindow: { defaultStatus: "已生效", summary: "登记计划加班窗口，并通知班组、设备和质量资源确认。" },
      stopWindow: { defaultStatus: "待审批", summary: "登记停线窗口，影响排程需计划主管审批。" },
      newWarning: { defaultStatus: "处理中", summary: "新增交期风险并绑定责任人、原因和协同动作。" },
      closeWarning: { defaultStatus: "已关闭", summary: "关闭前需确认风险原因、责任动作和恢复验证记录。" },
      approveAdjustment: { defaultStatus: "已生效", impact: "批准后同步排程草案和派工准备，保留回退链路。" },
      manualKitReview: { defaultStatus: "已复核", impact: "手工复核只修正 MES 齐套判断，不修改 WMS 库存事实。" },
      blockStart: { defaultStatus: "已拦截", impact: "拦截开工准入，现场扫码仍由工位终端执行并回传结果。" },
      shortageException: { defaultStatus: "已转异常", impact: "生成缺料异常草稿，进入异常处理闭环。" },
    };
    return { ...base, ...(overrides[action] || {}) };
  }

  function submitAction(event) {
    event.preventDefault();
    if (pendingAction?.dangerous) {
      $("#planMaintenanceConfirmMessage").textContent = `${pendingAction.title} 会影响排程、派工准备或开工准入。确认后将写入维护履历并保留责任人与时间戳。`;
      $("#planMaintenanceConfirmBackdrop").hidden = false;
      return;
    }
    applyAction();
  }

  function confirmAction() {
    closeConfirm();
    applyAction();
  }

  function applyAction() {
    let store = readStore();
    const orderId = $("#planMaintenanceOrder").value;
    const owner = $("#planMaintenanceOwner").value.trim() || "周计划";
    const status = $("#planMaintenanceStatus").value;
    const object = $("#planMaintenanceObject").value.trim();
    const summary = $("#planMaintenanceSummary").value.trim();
    const impact = $("#planMaintenanceImpact").value.trim();
    let orders = getOrders(store);
    let order = orders.find((item) => item.id === orderId);
    if (pendingAction.action === "copyOrder") {
      const copied = window.MES_BUSINESS_FLOW?.copyOrder?.(orderId, owner);
      if (copied) {
        store = window.MES_BUSINESS_FLOW.getOrderStoreShape("state", { activeOrderId: copied.id, search: "", status: "all", line: "all", risk: "all", page: 1, pageSize: 5 });
        writeStore(store);
        closeAction();
        renderMaintenanceLog();
        if (window.showToast) window.showToast(`已复制生成 ${copied.id}，并进入主数据校验与订单评审`);
        window.dispatchEvent(new CustomEvent("plan-maintenance:changed", { detail: { orderId: copied.id, action: "复制订单" } }));
        return;
      }
    }
    if (pendingAction.action === "submitReview") window.MES_BUSINESS_FLOW?.applyAction?.(orderId, "submitReview", { owner });
    if (pendingAction.action === "approveReview") window.MES_BUSINESS_FLOW?.applyAction?.(orderId, "approveReview", { owner });
    if (pendingAction.action === "publishPlan") window.MES_BUSINESS_FLOW?.applyAction?.(orderId, "publishPlan", { owner });
    if (pendingAction.action === "confirmKit") window.MES_BUSINESS_FLOW?.applyAction?.(orderId, "confirmKit", { owner });
    store = readStore();
    orders = getOrders(store);
    order = orders.find((item) => item.id === orderId);
    const patch = getOrderPatch(pendingAction.action, status);
    if (order && Object.keys(patch).length) Object.assign(order, patch);
    if (!Array.isArray(store.orders) && typeof window.saveState === "function") {
      window.saveState();
      store = readStore();
      orders = getOrders(store);
      order = orders.find((item) => item.id === orderId);
      if (order && Object.keys(patch).length) Object.assign(order, patch);
    }
    const record = {
      id: `PM-${Date.now()}`,
      page: pageType,
      orderId,
      action: pendingAction.title,
      object,
      status,
      owner,
      summary,
      impact,
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
    };
    store.orders = window.MES_BUSINESS_FLOW?.read?.().orders || orders;
    store.planMaintenanceLogs = [record, ...(store.planMaintenanceLogs || [])].slice(0, 80);
    store.integrationLogs = [
      { orderId, action: `${pendingAction.title}：${status} / ${owner}`, time: record.time },
      ...(store.integrationLogs || []),
    ].slice(0, 80);
    writeStore(store);
    closeAction();
    renderMaintenanceLog();
    if (window.showToast) window.showToast(`${pendingAction.title}已保存`);
    window.dispatchEvent(new CustomEvent("plan-maintenance:changed", { detail: record }));
  }

  function getOrderPatch(action, status) {
    const patch = {};
    if (action === "submitReview") Object.assign(patch, { review: "待评审", status: "待评审" });
    if (["dataIssue", "returnReason"].includes(action)) Object.assign(patch, { review: "待评审", status: "待评审", risk: "资料" });
    if (action === "approveReview") Object.assign(patch, { review: "已通过", status: "待排程" });
    if (["draftSchedule", "editOperation", "splitBatch", "withdrawPlan"].includes(action)) Object.assign(patch, { schedule: "待调整", status: "待排程" });
    if (["lockPlan", "publishPlan"].includes(action)) Object.assign(patch, { schedule: "已确认", status: "已排程" });
    if (["turnAdjustment", "newAdjustment", "editPlanChange", "rollbackAdjustment"].includes(action)) Object.assign(patch, { schedule: "待调整" });
    if (action === "approveAdjustment") Object.assign(patch, { schedule: "已确认", status: "已排程" });
    if (["newWarning", "editReason", "assignOwner", "escalateWarning"].includes(action)) Object.assign(patch, { risk: "交期" });
    if (action === "closeWarning") Object.assign(patch, { risk: "正常" });
    if (["manualKitReview", "substituteMaterial", "confirmKit"].includes(action)) Object.assign(patch, { kit: "齐套", materialGap: "手工复核齐套", risk: "正常" });
    if (action === "blockStart") Object.assign(patch, { status: "待备料", kit: "开工拦截", risk: "缺料" });
    if (action === "pauseOrder") Object.assign(patch, { status: "已暂停" });
    if (action === "voidOrder") Object.assign(patch, { status: "已作废" });
    if (status === "已暂停") patch.status = "已暂停";
    if (status === "已作废") patch.status = "已作废";
    return patch;
  }

  function renderMaintenanceLog() {
    const log = $("#planMaintenanceLog");
    if (!log) return;
    const store = readStore();
    const active = getActiveOrder(store);
    const logs = (store.planMaintenanceLogs || []).filter((item) => !active || item.orderId === active.id || item.page === pageType).slice(0, 5);
    log.innerHTML = logs.length
      ? logs.map((item) => `
        <div class="plan-maintenance-log__item">
          <span>${item.orderId}</span>
          <strong>${item.action} · ${item.status}</strong>
          <em>${item.owner} ${item.time}</em>
        </div>
      `).join("")
      : `<div class="plan-maintenance-log__item"><span>暂无履历</span><strong>新增、审批、发布、作废等维护动作会写入 MES 业务流程状态</strong><em>等待业务动作</em></div>`;
    if (!logs.length) {
      const flowLogs = (window.MES_BUSINESS_FLOW?.read?.().logs || []).filter((item) => !active || item.orderId === active.id).slice(0, 5);
      if (flowLogs.length) {
        log.innerHTML = flowLogs.map((item) => `
          <div class="plan-maintenance-log__item">
            <span>${item.orderId}</span>
            <strong>${item.stage} · ${item.action}</strong>
            <em>${item.owner} ${item.time}</em>
          </div>
        `).join("");
      }
    }
  }

  function closeAction() {
    $("#planMaintenanceBackdrop").hidden = true;
    pendingAction = null;
  }

  function closeConfirm() {
    $("#planMaintenanceConfirmBackdrop").hidden = true;
  }

  window.addEventListener("plan-page:rendered", renderMaintenanceLog);
  window.addEventListener("storage", renderMaintenanceLog);
  document.addEventListener("DOMContentLoaded", createShell);
  if (document.readyState !== "loading") createShell();
}());
