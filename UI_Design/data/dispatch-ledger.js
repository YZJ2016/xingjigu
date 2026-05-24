const DISPATCH_LEDGER_KEY = "xingjigu_mes_dispatch_ledger_v1";

const DISPATCH_LEDGER_SEED = [
  {
    dispatchId: "D-001",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0001-OP10",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: { id: "OP-0010", seq: 10, name: "SMT 贴片", previous: "", next: "OP-0020" },
    plan: { qty: 800, startAt: "06-20 08:00", endAt: "06-20 12:00", priority: "高", mode: "推式" },
    resources: { line: "Line-A", station: "SMT-WS-01", equipment: "SMT-01", tooling: "JIG-SMT-01", team: "A1 班", operator: "王海" },
    controls: { sopId: "SOP-TCU-SMT", sopVersion: "V3.2", inspectionPlan: "首件 + IPQC", materialStatus: "齐套" },
    execution: { status: "生产中", inputQty: 800, outputQty: 428, defectQty: 3, actualStartAt: "06-20 08:05", actualEndAt: "" },
    references: { releaseId: "REL-001", changeIds: [], exceptionIds: [], reportIds: [], traceId: "PH-D-001" },
    records: [
      { action: "模拟工位终端扫码开工回执通过", owner: "王海", source: "模拟扫码枪", time: "2026-06-20 08:05:00", before: "可开工", after: "生产中" },
    ],
  },
  {
    dispatchId: "D-002",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0001-OP20",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: { id: "OP-0020", seq: 20, name: "DIP 插件", previous: "OP-0010", next: "OP-0030" },
    plan: { qty: 800, startAt: "06-20 13:00", endAt: "06-20 18:00", priority: "高", mode: "推式" },
    resources: { line: "Line-A", station: "DIP-WS-01", equipment: "DIP-Line-A", tooling: "JIG-DIP-04", team: "A1 班", operator: "待接单" },
    controls: { sopId: "SOP-TCU-DIP", sopVersion: "V2.8", inspectionPlan: "IPQC 巡检", materialStatus: "等待 SMT 转入" },
    execution: { status: "待接单", inputQty: 0, outputQty: 0, defectQty: 0, actualStartAt: "", actualEndAt: "" },
    references: { releaseId: "REL-002", changeIds: ["CHG-001"], exceptionIds: [], reportIds: [], traceId: "" },
    records: [],
  },
  {
    dispatchId: "D-003",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0001-OP30",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: { id: "OP-0030", seq: 30, name: "程序烧录", previous: "OP-0020", next: "OP-0040" },
    plan: { qty: 800, startAt: "06-21 08:00", endAt: "06-21 12:00", priority: "中", mode: "混合" },
    resources: { line: "Line-A", station: "Burn-WS-01", equipment: "Burn-01", tooling: "JIG-BURN-02", team: "A1 班", operator: "待分配" },
    controls: { sopId: "SOP-TCU-BURN", sopVersion: "V1.9", inspectionPlan: "烧录版本校验", materialStatus: "待上道转入" },
    execution: { status: "待下达", inputQty: 0, outputQty: 0, defectQty: 0, actualStartAt: "", actualEndAt: "" },
    references: { releaseId: "", changeIds: [], exceptionIds: [], reportIds: [], traceId: "" },
    records: [],
  },
  {
    dispatchId: "D-004",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0001-OP40",
    orderId: "MO-202606-0001",
    product: "智能温控控制器 TCU-100",
    customer: "A 客户",
    operation: { id: "OP-0040", seq: 40, name: "整机装配", previous: "OP-0030", next: "OP-0050" },
    plan: { qty: 800, startAt: "06-21 13:00", endAt: "06-21 18:00", priority: "中", mode: "推式" },
    resources: { line: "Line-A", station: "ASM-WS-03", equipment: "Assembly-A", tooling: "JIG-ASM-16", team: "A1 班", operator: "待分配" },
    controls: { sopId: "SOP-TCU-ASM", sopVersion: "V4.0", inspectionPlan: "扭矩抽检", materialStatus: "外壳上盖缺 120 件" },
    execution: { status: "待下达", inputQty: 0, outputQty: 0, defectQty: 0, actualStartAt: "", actualEndAt: "" },
    references: { releaseId: "REL-003", changeIds: ["CHG-002"], exceptionIds: ["EXC-MAT-004"], reportIds: [], traceId: "" },
    records: [],
  },
  {
    dispatchId: "D-021",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0002-OP10",
    orderId: "MO-202606-0002",
    product: "工业网关 GW-240",
    customer: "B 客户",
    operation: { id: "OP-0210", seq: 10, name: "SMT 贴片", previous: "", next: "OP-0220" },
    plan: { qty: 600, startAt: "06-20 08:30", endAt: "06-20 12:30", priority: "高", mode: "推式" },
    resources: { line: "Line-B", station: "SMT-WS-02", equipment: "SMT-02", tooling: "JIG-SMT-02", team: "B1 班", operator: "李敏" },
    controls: { sopId: "SOP-GW-SMT", sopVersion: "V2.4", inspectionPlan: "首件 + IPQC", materialStatus: "齐套" },
    execution: { status: "生产中", inputQty: 600, outputQty: 315, defectQty: 2, actualStartAt: "06-20 08:32", actualEndAt: "" },
    references: { releaseId: "REL-004", changeIds: ["CHG-004"], exceptionIds: [], reportIds: [], traceId: "PH-D-021" },
    records: [],
  },
  {
    dispatchId: "D-031",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0003-OP60",
    orderId: "MO-202606-0003",
    product: "边缘采集器 ECU-80",
    customer: "C 客户",
    operation: { id: "OP-0310", seq: 60, name: "老化测试", previous: "OP-0300", next: "OP-0320" },
    plan: { qty: 1200, startAt: "06-20 10:00", endAt: "06-20 18:00", priority: "中", mode: "拉式" },
    resources: { line: "Line-C", station: "AGING-01", equipment: "Aging-Room-1", tooling: "AGING-RACK-01", team: "C1 班", operator: "周强" },
    controls: { sopId: "SOP-ECU-AGING", sopVersion: "V2.1", inspectionPlan: "老化参数监控", materialStatus: "齐套" },
    execution: { status: "异常锁定", inputQty: 820, outputQty: 760, defectQty: 5, actualStartAt: "06-20 10:05", actualEndAt: "" },
    references: { releaseId: "REL-005", changeIds: ["CHG-003"], exceptionIds: ["EXC-EQ-031"], reportIds: [], traceId: "PH-D-031" },
    records: [],
  },
  {
    dispatchId: "D-041",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0004-OP70",
    orderId: "MO-202606-0004",
    product: "智能传感节点 SEN-20",
    customer: "A 客户",
    operation: { id: "OP-0410", seq: 70, name: "FQC 成品检验", previous: "OP-0400", next: "入库" },
    plan: { qty: 2000, startAt: "06-20 14:00", endAt: "06-20 18:00", priority: "中", mode: "推式" },
    resources: { line: "Line-A", station: "QC-Final", equipment: "FQC-01", tooling: "QC-FIXTURE-01", team: "A1 班", operator: "QC-001" },
    controls: { sopId: "SOP-SEN-FQC", sopVersion: "V3.1", inspectionPlan: "FQC 抽检", materialStatus: "待检批次已到位" },
    execution: { status: "待接单", inputQty: 1280, outputQty: 0, defectQty: 0, actualStartAt: "", actualEndAt: "" },
    references: { releaseId: "REL-006", changeIds: [], exceptionIds: [], reportIds: [], traceId: "" },
    records: [],
  },
  {
    dispatchId: "D-111",
    dispatchVersion: "V1",
    sourceScheduleId: "SCH-202606-0011-OP80",
    orderId: "MO-202606-0011",
    product: "温湿度采集器 THS-10",
    customer: "I 客户",
    operation: { id: "OP-1110", seq: 80, name: "包装入库", previous: "OP-1100", next: "入库" },
    plan: { qty: 1800, startAt: "06-20 09:00", endAt: "06-20 17:30", priority: "低", mode: "推式" },
    resources: { line: "Line-C", station: "PACK-WS-02", equipment: "Pack-C", tooling: "PACK-FIXTURE-02", team: "C1 班", operator: "陈洁" },
    controls: { sopId: "SOP-THS-PACK", sopVersion: "V1.6", inspectionPlan: "箱码复核", materialStatus: "包装材料齐套" },
    execution: { status: "生产中", inputQty: 1480, outputQty: 1480, defectQty: 0, actualStartAt: "06-20 09:10", actualEndAt: "" },
    references: { releaseId: "REL-007", changeIds: ["CHG-005"], exceptionIds: [], reportIds: [], traceId: "PH-D-111" },
    records: [],
  },
];

const DISPATCH_LEDGER_TRANSITIONS = {
  "待生成": ["待校验"],
  "待校验": ["待下达", "下达拦截", "异常锁定"],
  "待下达": ["待接单", "已撤回", "下达拦截"],
  "下达拦截": ["待校验", "已撤回", "异常锁定"],
  "待接单": ["待开工", "待接单", "异常锁定"],
  "待开工": ["可开工", "开工拦截", "异常锁定"],
  "开工拦截": ["待开工", "异常锁定"],
  "可开工": ["生产中", "异常锁定"],
  "生产中": ["待报工", "异常锁定", "暂停", "已完工"],
  "暂停": ["生产中", "异常锁定"],
  "待报工": ["报工待复核", "报工拦截", "已完工"],
  "报工拦截": ["待报工", "异常锁定"],
  "报工待复核": ["已完工", "报工拦截"],
  "已完工": ["已交接", "已关闭"],
  "已交接": ["已关闭"],
  "异常锁定": ["待校验", "生产中", "已关闭"],
};

function cloneDispatchLedger(value) {
  return structuredClone(value);
}

function readDispatchLedger() {
  try {
    const saved = JSON.parse(localStorage.getItem(DISPATCH_LEDGER_KEY) || "null");
    if (saved?.dispatches?.length) return saved;
  } catch (error) {
    localStorage.removeItem(DISPATCH_LEDGER_KEY);
  }
  const seeded = { dispatches: cloneDispatchLedger(DISPATCH_LEDGER_SEED), updatedAt: new Date().toISOString() };
  localStorage.setItem(DISPATCH_LEDGER_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeDispatchLedger(ledger) {
  const next = { ...ledger, updatedAt: new Date().toISOString() };
  localStorage.setItem(DISPATCH_LEDGER_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("dispatch-ledger:changed", { detail: next }));
  return next;
}

function getDispatchLedgerRows() {
  return cloneDispatchLedger(readDispatchLedger().dispatches);
}

function getDispatchLedgerItem(dispatchId) {
  return getDispatchLedgerRows().find((item) => item.dispatchId === dispatchId);
}

function resetDispatchLedger() {
  const seeded = { dispatches: cloneDispatchLedger(DISPATCH_LEDGER_SEED), updatedAt: new Date().toISOString() };
  localStorage.setItem(DISPATCH_LEDGER_KEY, JSON.stringify(seeded));
  window.dispatchEvent(new CustomEvent("dispatch-ledger:changed", { detail: seeded }));
  return seeded;
}

function appendDispatchLedgerRecord(dispatchId, action, options = {}) {
  const ledger = readDispatchLedger();
  const index = ledger.dispatches.findIndex((item) => item.dispatchId === dispatchId);
  if (index < 0) return { ok: false, reason: "未找到派工主记录" };
  const item = ledger.dispatches[index];
  item.records = [
    {
      action,
      owner: options.owner || item.resources.operator || item.resources.team || "车间主任",
      source: options.source || "MES 后台",
      time: options.time || new Date().toLocaleString("zh-CN", { hour12: false }),
      before: options.before || item.execution.status,
      after: options.after || item.execution.status,
      result: options.result || "记录",
    },
    ...(item.records || []),
  ].slice(0, 80);
  writeDispatchLedger(ledger);
  return { ok: true, item: cloneDispatchLedger(item) };
}

function updateDispatchLedgerStatus(dispatchId, nextStatus, options = {}) {
  const ledger = readDispatchLedger();
  const index = ledger.dispatches.findIndex((item) => item.dispatchId === dispatchId);
  if (index < 0) return { ok: false, reason: "未找到派工主记录" };
  const item = ledger.dispatches[index];
  const current = item.execution.status;
  const allowed = DISPATCH_LEDGER_TRANSITIONS[current] || [];
  if (options.strict && !allowed.includes(nextStatus) && current !== nextStatus) {
    return { ok: false, reason: `${current} 不能直接流转到 ${nextStatus}` };
  }
  item.execution.status = nextStatus;
  if (typeof options.outputQty === "number") item.execution.outputQty = options.outputQty;
  if (typeof options.inputQty === "number") item.execution.inputQty = options.inputQty;
  if (typeof options.defectQty === "number") item.execution.defectQty = options.defectQty;
  if (options.operator) item.resources.operator = options.operator;
  if (options.team) item.resources.team = options.team;
  if (options.actualStartAt) item.execution.actualStartAt = options.actualStartAt;
  if (options.actualEndAt) item.execution.actualEndAt = options.actualEndAt;
  item.records = [
    {
      action: options.action || `状态更新为 ${nextStatus}`,
      owner: options.owner || item.resources.operator || item.resources.team || "车间主任",
      source: options.source || "MES 后台",
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      before: current,
      after: nextStatus,
      result: options.result || "通过",
    },
    ...(item.records || []),
  ].slice(0, 80);
  writeDispatchLedger(ledger);
  return { ok: true, item: cloneDispatchLedger(item) };
}

function toDispatchOrderRow(item) {
  return {
    id: item.dispatchId,
    orderId: item.orderId,
    product: item.product,
    customer: item.customer,
    operation: item.operation.name,
    seq: String(item.operation.seq),
    qty: item.plan.qty,
    done: item.execution.outputQty,
    line: item.resources.line,
    workstation: item.resources.station,
    equipment: item.resources.equipment,
    tooling: item.resources.tooling,
    team: item.resources.team,
    operator: item.resources.operator,
    planStart: item.plan.startAt,
    planEnd: item.plan.endAt,
    status: item.execution.status,
    priority: item.plan.priority,
    mode: item.plan.mode,
    sop: `${item.controls.sopId} ${item.controls.sopVersion}`,
    inspection: item.controls.inspectionPlan,
    material: item.controls.materialStatus,
    next: item.operation.next === "入库" ? "入库" : item.operation.next?.replace("OP-", "D-") || "待确认",
    progressNote: (item.records || [])[0]?.action || "等待现场模拟回执",
    ledger: item,
  };
}

function getDispatchOrderRowsFromLedger() {
  return getDispatchLedgerRows().map(toDispatchOrderRow);
}

window.MES_DISPATCH_LEDGER = {
  key: DISPATCH_LEDGER_KEY,
  getRows: getDispatchLedgerRows,
  getOrderRows: getDispatchOrderRowsFromLedger,
  getItem: getDispatchLedgerItem,
  updateStatus: updateDispatchLedgerStatus,
  appendRecord: appendDispatchLedgerRecord,
  reset: resetDispatchLedger,
  toDispatchOrderRow,
};
