const MES_NAV_MODULES = [
  { id: "workbench", title: "首页工作台", layer: "日常工作", color: "#007aff", mark: "首", items: ["生产总览", "今日待办", "异常提醒", "交期预警", "车间看板", "我的审批"] },
  { id: "orders", title: "订单与计划", layer: "计划部门", color: "#5856d6", mark: "计", items: ["生产订单", "订单评审", "生产排程", "产能负荷", "交期预警", "计划调整", "齐套检查"] },
  { id: "dispatch", title: "派工与生产任务", layer: "车间管理", color: "#34c759", mark: "任", items: ["派工单", "工序任务", "班组任务", "任务下达", "任务变更", "SOP 查看", "开工检查"] },
  { id: "station", title: "工位作业", layer: "现场终端", color: "#00a6a6", mark: "位", items: ["员工登录", "扫码开工", "工艺指导", "投料确认", "过程记录", "工序报工", "交接班"] },
  { id: "materials", title: "物料与线边库", layer: "物料管理", color: "#34c759", mark: "料", items: ["用料需求", "领料申请", "配送进度", "线边库存", "投料记录", "余料退回", "缺料预警"] },
  { id: "barcode", title: "条码与标签", layer: "现场标识", color: "#00a6a6", mark: "码", items: ["生产批次", "产品序列号", "物料标签", "成品标签", "箱码托盘码", "标签打印", "补打申请"] },
  { id: "quality", title: "质量检验", layer: "质量部门", color: "#ff3b30", mark: "质", items: ["来料检验", "首件检验", "巡检任务", "过程检验", "成品检验", "质量放行", "出货检验", "不良记录", "返工评审"] },
  { id: "equipment", title: "设备与保养", layer: "设备部门", color: "#ff9f0a", mark: "设", items: ["设备状态", "工装夹具", "量检具校准", "点检计划", "保养计划", "维修工单", "停机记录", "备件领用", "设备效率"] },
  { id: "process", title: "过程监控", layer: "生产现场", color: "#ff9f0a", mark: "控", items: ["实时产量", "设备运行", "工艺参数", "报警记录", "停机归因", "过程趋势", "电子看板"] },
  { id: "exceptions", title: "异常处理", layer: "现场协同", color: "#ff3b30", mark: "异", items: ["异常上报", "待处理异常", "停线申请", "缺料处理", "质量问题", "设备故障", "处理复盘"] },
  { id: "warehouse", title: "完工与入库", layer: "仓储协同", color: "#34c759", mark: "入", items: ["工序完工复核", "完工确认", "包装作业", "成品入库", "库存冻结", "退料入库", "单据同步"] },
  { id: "trace", title: "追溯查询", layer: "质量追溯", color: "#8e8e93", mark: "追", items: ["产品追溯", "批次追溯", "物料去向", "生产履历", "检验履历", "设备履历", "客户追溯报告"] },
  { id: "reports", title: "报表与看板", layer: "经营分析", color: "#8e8e93", mark: "表", items: ["生产日报", "良率分析", "交付达成", "设备效率", "停机损失", "物料损耗", "管理驾驶舱"] },
  { id: "basic", title: "基础资料", layer: "资料维护", color: "#007aff", mark: "基", items: ["产品资料", "物料资料", "BOM 清单", "工艺路线", "工序工位", "产线车间", "规则与代码", "班次日历", "客户供应商"] },
  { id: "system", title: "系统设置", layer: "管理配置", color: "#6e6e73", mark: "系", items: ["人员账号", "人员资质", "角色权限", "审批设置", "接口补偿配置", "消息提醒", "操作记录", "数据备份"] },
];

window.MES_NAV_MODULES = MES_NAV_MODULES;

const MES_NAV_ROUTES = {
  orders: {
    生产订单: "orders/production-orders.html",
    订单评审: "orders/order-reviews.html",
    生产排程: "orders/production-schedule.html",
    产能负荷: "orders/capacity-load.html",
    交期预警: "orders/delivery-warning.html",
    计划调整: "orders/plan-adjustment.html",
    齐套检查: "orders/kit-check.html",
  },
  dispatch: {
    派工单: "dispatch/dispatch-orders.html",
    工序任务: "dispatch/operation-tasks.html",
    班组任务: "dispatch/team-tasks.html",
    任务下达: "dispatch/task-release.html",
    任务变更: "dispatch/task-change.html",
    "SOP 查看": "dispatch/sop-view.html",
    开工检查: "dispatch/start-check.html",
  },
  station: {
    员工登录: "station/employee-login.html",
    扫码开工: "station/scan-start.html",
    工艺指导: "station/work-instruction.html",
    投料确认: "station/feeding-confirmation.html",
    过程记录: "station/process-record.html",
    工序报工: "station/operation-report.html",
    交接班: "station/shift-handover.html",
  },
  materials: {
    用料需求: "materials/material-requirements.html",
    领料申请: "materials/picking-requests.html",
    配送进度: "materials/delivery-progress.html",
    线边库存: "materials/line-side-inventory.html",
    投料记录: "materials/feeding-records.html",
    余料退回: "materials/return-materials.html",
    缺料预警: "materials/shortage-alerts.html",
  },
  barcode: {
    生产批次: "barcode/production-batches.html",
    产品序列号: "barcode/product-serials.html",
    物料标签: "barcode/material-labels.html",
    成品标签: "barcode/finished-labels.html",
    箱码托盘码: "barcode/box-pallet-codes.html",
    标签打印: "barcode/label-printing.html",
    补打申请: "barcode/reprint-requests.html",
  },
  quality: {
    来料检验: "quality/incoming-inspection.html",
    首件检验: "quality/first-article.html",
    巡检任务: "quality/patrol-tasks.html",
    过程检验: "quality/process-inspection.html",
    成品检验: "quality/final-inspection.html",
    质量放行: "quality/release.html",
    出货检验: "quality/outgoing-inspection.html",
    不良记录: "quality/defect-records.html",
    返工评审: "quality/rework-review.html",
  },
  equipment: {
    设备状态: "equipment/equipment-status.html",
    工装夹具: "equipment/tooling-fixtures.html",
    量检具校准: "equipment/calibration.html",
    点检计划: "equipment/inspection-plan.html",
    点检任务: "equipment/inspection-plan.html",
    保养计划: "equipment/maintenance-plan.html",
    维修工单: "equipment/repair-orders.html",
    停机记录: "equipment/downtime-records.html",
    备件领用: "equipment/spare-parts.html",
    设备效率: "equipment/equipment-efficiency.html",
  },
  process: {
    实时产量: "monitoring/realtime-output.html",
    设备运行: "monitoring/device-runtime.html",
    工艺参数: "monitoring/process-parameters.html",
    报警记录: "monitoring/alarm-records.html",
    停机归因: "monitoring/downtime-reasons.html",
    停机原因: "monitoring/downtime-reasons.html",
    过程趋势: "monitoring/process-trends.html",
    电子看板: "monitoring/electronic-board.html",
  },
  exceptions: {
    异常上报: "exceptions/exception-report.html",
    待处理异常: "exceptions/pending-exceptions.html",
    停线申请: "exceptions/line-stop.html",
    缺料处理: "exceptions/material-shortage.html",
    质量问题: "exceptions/quality-issues.html",
    设备故障: "exceptions/equipment-faults.html",
    处理复盘: "exceptions/review.html",
  },
  warehouse: {
    工序完工复核: "warehouse/operation-completion.html",
    工序完工: "warehouse/operation-completion.html",
    完工确认: "warehouse/completion-confirmation.html",
    包装作业: "warehouse/packaging.html",
    成品入库: "warehouse/finished-goods-receipt.html",
    库存冻结: "warehouse/inventory-freeze.html",
    退料入库: "warehouse/return-receipt.html",
    单据同步: "warehouse/document-sync.html",
  },
  trace: {
    产品追溯: "traceability/product-trace.html",
    批次追溯: "traceability/batch-trace.html",
    物料去向: "traceability/material-flow.html",
    生产履历: "traceability/production-history.html",
    检验履历: "traceability/inspection-history.html",
    设备履历: "traceability/equipment-history.html",
    客户追溯报告: "traceability/customer-report.html",
  },
  reports: {
    生产日报: "reports/production-daily.html",
    良率分析: "reports/yield-analysis.html",
    交付达成: "reports/delivery-attainment.html",
    设备效率: "reports/equipment-efficiency.html",
    停机损失: "reports/downtime-loss.html",
    物料损耗: "reports/material-loss.html",
    管理驾驶舱: "reports/management-cockpit.html",
  },
  basic: {
    产品资料: "basic/product-master.html",
    物料资料: "basic/material-master.html",
    "BOM 清单": "basic/bom-list.html",
    工艺路线: "basic/routing.html",
    工序工位: "basic/operation-stations.html",
    产线车间: "basic/workshops.html",
    规则与代码: "basic/rules-codes.html",
    班次日历: "basic/shift-calendar.html",
    客户供应商: "basic/partners.html",
  },
  system: {
    人员账号: "settings/personnel-accounts.html",
    人员资质: "settings/personnel-qualification.html",
    角色权限: "settings/role-permissions.html",
    审批设置: "settings/approval-settings.html",
    接口补偿配置: "settings/document-sync.html",
    单据同步: "settings/document-sync.html",
    消息提醒: "settings/message-alerts.html",
    操作记录: "settings/operation-logs.html",
    数据备份: "settings/data-backup.html",
  },
};

const MES_MENU_SCROLL_KEY = "xingjigu_mes_module_menu_scroll";
const MES_TABLE_PAGE_SIZE_KEY = "xingjigu_mes_table_page_size";
const mesTablePaginationState = new WeakMap();
let mesTablePaginationScanTimer = 0;

function ensureMesFavicon() {
  const href = `${getMesNavBase()}favicon.svg`;
  const currentIcon = document.querySelector("link[rel~='icon']");
  if (currentIcon) {
    currentIcon.href = href;
    currentIcon.type = "image/svg+xml";
    return;
  }
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = href;
  document.head.appendChild(icon);
}

function getMesNavBase() {
  const path = window.location.pathname;
  return /\/[^/]+\/[^/]+\.html$/.test(path) ? "../" : "./";
}

function resolveMesRoute(moduleId, entry) {
  if (moduleId === "workbench") return `${getMesNavBase()}index.html`;
  const route = MES_NAV_ROUTES[moduleId]?.[entry];
  return route ? `${getMesNavBase()}${route}` : "";
}

function shouldHandleMesMenuRoute(link) {
  if (link.dataset.module !== "workbench") return true;
  return !document.body.classList.contains("workbench-page");
}

window.resolveMesRoute = resolveMesRoute;
window.restoreMesMenuScroll = restoreMesMenuScroll;
window.refreshMesTablePagination = refreshMesTablePagination;

function saveMesMenuScroll(link) {
  const menu = link.closest(".module-menu");
  if (!menu) return;
  sessionStorage.setItem(MES_MENU_SCROLL_KEY, JSON.stringify({
    top: menu.scrollTop,
    module: link.dataset.module || "",
    entry: link.dataset.entry || "",
  }));
}

function restoreMesMenuScroll() {
  const menu = document.querySelector(".module-menu");
  if (!menu) return;
  const activeLink = menu.querySelector(".submenu a.is-active");
  const activeGroup = activeLink?.closest(".module-group");
  if (!activeGroup) return;
  const saved = readMesMenuScroll();
  if (saved && Number.isFinite(saved.top)) {
    menu.scrollTop = saved.top;
    sessionStorage.removeItem(MES_MENU_SCROLL_KEY);
    keepActiveMenuItemVisible(menu, activeLink, activeGroup);
    return;
  }
  centerActiveMenuGroup(menu, activeGroup);
  keepActiveMenuItemVisible(menu, activeLink, activeGroup);
}

function readMesMenuScroll() {
  try {
    return JSON.parse(sessionStorage.getItem(MES_MENU_SCROLL_KEY) || "null");
  } catch (error) {
    sessionStorage.removeItem(MES_MENU_SCROLL_KEY);
    return null;
  }
}

function scheduleMesMenuScrollRestore() {
  requestAnimationFrame(restoreMesMenuScroll);
  window.setTimeout(restoreMesMenuScroll, 80);
  window.setTimeout(restoreMesMenuScroll, 240);
  window.setTimeout(restoreMesMenuScroll, 600);
  window.setTimeout(restoreMesMenuScroll, 1200);
  window.setTimeout(restoreMesMenuScroll, 2200);
  observeMesMenuRender();
}

function centerActiveMenuGroup(menu, activeGroup) {
  const targetTop = activeGroup.offsetTop - Math.max(16, (menu.clientHeight - activeGroup.offsetHeight) / 2);
  menu.scrollTop = Math.max(0, targetTop);
}

function keepActiveMenuItemVisible(menu, activeLink, activeGroup) {
  if (!activeLink) return;
  const padding = 16;
  const menuRect = menu.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  if (linkRect.top < menuRect.top + padding) {
    menu.scrollTop = Math.max(0, menu.scrollTop - (menuRect.top + padding - linkRect.top));
  } else if (linkRect.bottom > menuRect.bottom - padding) {
    menu.scrollTop = Math.max(0, menu.scrollTop + (linkRect.bottom - menuRect.bottom + padding));
  }
}

function observeMesMenuRender() {
  const observer = new MutationObserver(() => restoreMesMenuScroll());
  const start = () => {
    const menu = document.querySelector(".module-menu");
    if (!menu) return false;
    observer.observe(menu, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    restoreMesMenuScroll();
    window.setTimeout(() => observer.disconnect(), 2000);
    return true;
  };
  if (start()) return;
  const bodyObserver = new MutationObserver(() => {
    if (start()) bodyObserver.disconnect();
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => bodyObserver.disconnect(), 2000);
}

function getMesTablePageSize() {
  const saved = Number(localStorage.getItem(MES_TABLE_PAGE_SIZE_KEY));
  return [5, 10, 20].includes(saved) ? saved : 5;
}

function setMesTablePageSize(value) {
  const size = Number(value);
  if (![5, 10, 20].includes(size)) return;
  localStorage.setItem(MES_TABLE_PAGE_SIZE_KEY, String(size));
  document.querySelectorAll("table").forEach((table) => {
    const state = mesTablePaginationState.get(table);
    if (!state) return;
    state.pageSize = size;
    state.page = 1;
    applyMesTablePagination(table);
  });
}

function shouldSkipMesTablePagination(table) {
  if (!table.tBodies.length || table.dataset.pagination === "manual") return true;
  if (table.closest(".order-list-panel")?.querySelector("#paginationInfo")) return true;
  if (table.closest(".mes-table-pagination-skip")) return true;
  return false;
}

function ensureMesTablePagination(table) {
  if (shouldSkipMesTablePagination(table)) return;
  const tbody = table.tBodies[0];
  if (!tbody) return;
  let state = mesTablePaginationState.get(table);
  if (!state) {
    state = { page: 1, pageSize: getMesTablePageSize(), bar: null, lastRowCount: -1 };
    mesTablePaginationState.set(table, state);
  }
  const currentBar = table.closest(".mes-table-pagination-wrap")?.querySelector(":scope > .mes-table-pagination");
  if (!state.bar || !state.bar.isConnected) {
    state.bar = currentBar || createMesTablePaginationBar(table);
  }
  applyMesTablePagination(table);
}

function createMesTablePaginationBar(table) {
  const wrapper = table.parentElement;
  const host = wrapper?.classList.contains("mes-table-pagination-wrap") ? wrapper : table.parentElement;
  const bar = document.createElement("div");
  bar.className = "mes-table-pagination";
  bar.setAttribute("aria-label", "表格分页");
  bar.innerHTML = `
    <div class="mes-table-pagination__info">共 0 条</div>
    <div class="mes-table-pagination__controls">
      <label>每页
        <select class="mes-table-pagination__size" aria-label="每页条数">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <button class="mes-table-pagination__prev" type="button">上一页</button>
      <div class="mes-table-pagination__pages"></div>
      <button class="mes-table-pagination__next" type="button">下一页</button>
    </div>
  `;
  if (host) {
    host.classList.add("mes-table-pagination-wrap");
    host.insertAdjacentElement("afterend", bar);
  } else {
    table.insertAdjacentElement("afterend", bar);
  }
  bar.addEventListener("click", (event) => {
    const state = mesTablePaginationState.get(table);
    if (!state) return;
    const button = event.target.closest("button");
    if (!button) return;
    const totalPages = getMesTableTotalPages(table, state.pageSize);
    if (button.classList.contains("mes-table-pagination__prev")) state.page = Math.max(1, state.page - 1);
    else if (button.classList.contains("mes-table-pagination__next")) state.page = Math.min(totalPages, state.page + 1);
    else if (button.dataset.page) state.page = Number(button.dataset.page);
    applyMesTablePagination(table);
  });
  bar.querySelector(".mes-table-pagination__size").addEventListener("change", (event) => {
    setMesTablePageSize(event.target.value);
  });
  return bar;
}

function getMesTableRows(table) {
  return Array.from(table.tBodies[0]?.rows || []);
}

function getMesTableTotalPages(table, pageSize) {
  return Math.max(1, Math.ceil(getMesTableRows(table).length / pageSize));
}

function applyMesTablePagination(table) {
  const state = mesTablePaginationState.get(table);
  if (!state || !state.bar?.isConnected) return;
  const rows = getMesTableRows(table);
  const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
  if (rows.length !== state.lastRowCount) {
    state.page = Math.min(state.page, totalPages);
    state.lastRowCount = rows.length;
  }
  state.page = Math.min(Math.max(state.page, 1), totalPages);
  const start = (state.page - 1) * state.pageSize;
  const end = start + state.pageSize;
  rows.forEach((row, index) => {
    row.hidden = index < start || index >= end;
  });
  renderMesTablePaginationBar(state, rows.length, start, Math.min(end, rows.length), totalPages);
}

function renderMesTablePaginationBar(state, total, start, end, totalPages) {
  const bar = state.bar;
  bar.querySelector(".mes-table-pagination__info").textContent = total
    ? `共 ${total} 条 · 第 ${start + 1}-${end} 条 · 第 ${state.page} / ${totalPages} 页`
    : "共 0 条";
  const sizeSelect = bar.querySelector(".mes-table-pagination__size");
  sizeSelect.value = String(state.pageSize);
  bar.querySelector(".mes-table-pagination__prev").disabled = state.page <= 1;
  bar.querySelector(".mes-table-pagination__next").disabled = state.page >= totalPages;
  bar.querySelector(".mes-table-pagination__pages").innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button type="button" class="${page === state.page ? "is-active" : ""}" data-page="${page}" aria-label="第 ${page} 页">${page}</button>`;
  }).join("");
}

function refreshMesTablePagination() {
  document.querySelectorAll("table").forEach(ensureMesTablePagination);
}

function scheduleMesTablePaginationRefresh() {
  window.clearTimeout(mesTablePaginationScanTimer);
  mesTablePaginationScanTimer = window.setTimeout(refreshMesTablePagination, 40);
}

function observeMesTablePagination() {
  refreshMesTablePagination();
  const observer = new MutationObserver(scheduleMesTablePaginationRefresh);
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    ensureMesFavicon();
    scheduleMesMenuScrollRestore();
    observeMesTablePagination();
  });
} else {
  ensureMesFavicon();
  scheduleMesMenuScrollRestore();
  observeMesTablePagination();
}

window.addEventListener("load", scheduleMesMenuScrollRestore);
window.addEventListener("load", refreshMesTablePagination);

document.addEventListener("click", (event) => {
  const link = event.target.closest?.(".module-menu .submenu a[data-module][data-entry]");
  if (!link) return;
  if (!shouldHandleMesMenuRoute(link)) return;
  const route = resolveMesRoute(link.dataset.module, link.dataset.entry);
  if (!route) return;
  saveMesMenuScroll(link);
  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.href = route;
}, true);
