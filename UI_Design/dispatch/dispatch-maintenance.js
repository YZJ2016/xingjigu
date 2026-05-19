const DISPATCH_MAINTENANCE_KEY = "xingjigu_mes_dispatch_maintenance_v1";

const dispatchMaintenanceRecipes = {
  "dispatch-orders": ["派工单", "编辑资源并下达", "撤回/关闭派工", "车间计划员 陈伟"],
  "operation-tasks": ["工序任务调整", "分配工位并挂起/恢复", "关闭任务调整", "车间主任 陈伟"],
  "team-tasks": ["班组任务分配", "调整班组负荷并移交", "关闭交接事项", "班组长 郑峰"],
  "task-release": ["下达批次", "复核拦截并重发通知", "撤回未接收任务", "派工协调员 林璐"],
  "task-change": ["任务变更申请", "审批影响范围并生效", "回退/关闭变更", "计划主管 李敏"],
  "sop-view": ["SOP 执行快照", "发布到执行并复核签收", "撤回未生效版本", "工艺员 陈锐"],
  "start-check": ["开工准入复核", "放行/拦截准入项", "关闭准入异常", "车间主任 陈伟"],
};

function getDispatchPageId() {
  return location.pathname.split("/").pop().replace(".html", "");
}

function readDispatchMaintenance() {
  try {
    return JSON.parse(localStorage.getItem(DISPATCH_MAINTENANCE_KEY) || "[]");
  } catch (error) {
    localStorage.removeItem(DISPATCH_MAINTENANCE_KEY);
    return [];
  }
}

function writeDispatchMaintenance(records) {
  localStorage.setItem(DISPATCH_MAINTENANCE_KEY, JSON.stringify(records.slice(0, 80)));
}

function getDispatchContext() {
  const activeRow = document.querySelector("tr.is-active, .is-active[data-id], [aria-selected='true']");
  const text = activeRow?.innerText || document.querySelector("tbody tr")?.innerText || document.body.innerText;
  const order = text.match(/MO-\d{6}-\d{4}/)?.[0] || "MO-202606-0001";
  const dispatch = text.match(/\bD-\d{3,}(?:-\d{2})?\b/)?.[0] || "D-001";
  const status = text.match(/待下达|待接单|生产中|异常锁定|已下达|待审批|已发布|待复核/)?.[0] || "待维护";
  return { order, dispatch, status };
}

function getDispatchRecipe() {
  const pageId = getDispatchPageId();
  const [create, process, close, owner] = dispatchMaintenanceRecipes[pageId] || dispatchMaintenanceRecipes["dispatch-orders"];
  return { pageId, create, process, close, owner };
}

function renderDispatchMaintenancePanel() {
  const main = document.querySelector("main");
  if (!main || document.querySelector("#dispatchMaintenancePanel")) return;
  const metrics = main.querySelector(".dispatch-metrics, .release-metrics, .change-metrics, .sop-metrics, .team-metrics, .check-metrics, .operation-metrics");
  const layout = main.querySelector("section[class*='-layout']");
  const anchor = layout || metrics?.nextElementSibling;
  const panel = document.createElement("section");
  panel.id = "dispatchMaintenancePanel";
  panel.className = "dispatch-maintenance-panel";
  if (anchor) main.insertBefore(panel, anchor);
  else main.appendChild(panel);
  updateDispatchMaintenancePanel();
}

function updateDispatchMaintenancePanel() {
  const panel = document.querySelector("#dispatchMaintenancePanel");
  if (!panel) return;
  const records = readDispatchMaintenance();
  const recipe = getDispatchRecipe();
  const context = getDispatchContext();
  const current = records.find((item) => item.pageId === recipe.pageId);
  panel.innerHTML = `
    <div class="dispatch-maintenance-head">
      <div>
        <span>本页手工维护</span>
        <h2>${recipe.create}闭环</h2>
        <p>后台只维护派工生成、资源调整、审批下达、撤回关闭和准入复核；现场接单、扫码开工、报工和终端签收均保留为模拟回执。</p>
      </div>
      <strong>${context.order} · ${context.dispatch}</strong>
    </div>
    <div class="dispatch-maintenance-flow">
      <button type="button" data-dispatch-maintenance="create">新增/生成 ${recipe.create}</button>
      <button type="button" data-dispatch-maintenance="process"${current ? "" : " disabled"}>${recipe.process}</button>
      <button type="button" class="danger-action" data-dispatch-maintenance="close"${current ? "" : " disabled"}>${recipe.close}</button>
    </div>
    <div class="dispatch-maintenance-record">
      ${current ? `
        <div><span>维护单</span><strong>${current.id} · ${current.status}</strong></div>
        <div><span>关联单据</span><strong>${current.related}</strong></div>
        <div><span>责任/时间</span><strong>${current.owner} · ${current.time}</strong></div>
        <div><span>前后值摘要</span><strong>${current.before} -> ${current.after}</strong></div>
      ` : `<div><span>暂无维护单</span><strong>可基于当前派工上下文新增管理类单据</strong></div>`}
    </div>
    <div class="dispatch-maintenance-log">
      ${records.slice(0, 4).map((item) => `<div><span>${item.time}</span><strong>${item.id} ${item.action}：${item.status}</strong></div>`).join("") || `<div><span>操作记录</span><strong>新增、下达、审批、撤回、关闭会写入 localStorage 和统一业务流</strong></div>`}
    </div>
  `;
  panel.querySelectorAll("[data-dispatch-maintenance]").forEach((button) => {
    button.addEventListener("click", () => handleDispatchMaintenance(button.dataset.dispatchMaintenance));
  });
}

function handleDispatchMaintenance(action) {
  const recipe = getDispatchRecipe();
  const context = getDispatchContext();
  const records = readDispatchMaintenance();
  let record = records.find((item) => item.pageId === recipe.pageId);
  const now = new Date().toLocaleString("zh-CN", { hour12: false });
  if (action === "create") {
    record = {
      id: `DISP-MAINT-${Date.now().toString().slice(-6)}`,
      pageId: recipe.pageId,
      action: recipe.create,
      status: "待处理",
      related: `${context.order} / ${context.dispatch}`,
      owner: recipe.owner,
      time: now,
      before: context.status,
      after: `已发起${recipe.create}`,
    };
    records.unshift(record);
  } else {
    if (!record) return;
    if (action === "close" && !confirm(`确认${recipe.close}？派工维护记录会保留审计，不能无痕删除。`)) return;
    record.action = action === "process" ? recipe.process : recipe.close;
    record.status = action === "process" ? "已处理/已下达" : "已关闭";
    record.time = now;
    record.before = record.after;
    record.after = action === "process" ? `${recipe.process}完成，等待现场模拟接单/回执` : `${recipe.close}完成，派工履历已归档`;
  }
  writeDispatchMaintenance(records);
  window.MES_BUSINESS_FLOW?.applyDispatchAction?.(context.order, action === "close" ? "hold" : action === "create" ? "generate" : "release", {
    owner: record.owner,
    reason: `${record.id} ${record.before} -> ${record.after}`,
  });
  window.MES_BUSINESS_FLOW?.applyGovernanceAction?.({ id: record.id, name: recipe.create, owner: record.owner }, "dispatch", record.action, {
    orderId: context.order,
    status: record.status,
    source: "派工与生产任务后台维护",
    result: record.after,
    auditRef: record.related,
  });
  showDispatchMaintenanceToast(`${record.id} 已保存`);
  updateDispatchMaintenancePanel();
}

function showDispatchMaintenanceToast(text) {
  let toast = document.querySelector("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.hidden = false;
  toast.textContent = text;
  clearTimeout(showDispatchMaintenanceToast.timer);
  showDispatchMaintenanceToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

document.addEventListener("DOMContentLoaded", renderDispatchMaintenancePanel);
