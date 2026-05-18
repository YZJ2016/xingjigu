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
    不良记录: "quality/defect-records.html",
    返工评审: "quality/rework-review.html",
  },
  equipment: {
    设备状态: "equipment/equipment-status.html",
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
    客户供应商: "basic/partners.html",
  },
  system: {
    人员账号: "settings/personnel-accounts.html",
    角色权限: "settings/role-permissions.html",
    审批设置: "settings/approval-settings.html",
    单据同步: "settings/document-sync.html",
    消息提醒: "settings/message-alerts.html",
    操作记录: "settings/operation-logs.html",
    数据备份: "settings/data-backup.html",
  },
};

function getMesNavBase() {
  const path = window.location.pathname;
  return /\/UI_Design\/[^/]+\/[^/]+\.html$/.test(path) ? "../" : "./";
}

function resolveMesRoute(moduleId, entry) {
  if (moduleId === "workbench") return `${getMesNavBase()}index.html`;
  const route = MES_NAV_ROUTES[moduleId]?.[entry];
  return route ? `${getMesNavBase()}${route}` : "";
}

window.resolveMesRoute = resolveMesRoute;

document.addEventListener("click", (event) => {
  const link = event.target.closest?.(".module-menu .submenu a[data-module][data-entry]");
  if (!link) return;
  const route = resolveMesRoute(link.dataset.module, link.dataset.entry);
  if (!route) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.href = route;
}, true);
