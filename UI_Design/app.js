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

const STORAGE_KEY = "xingjigu_mes_workbench_v2";

const initialOrders = [
  { id: "MO-202606-0001", product: "智能温控控制器 TCU-100", customer: "A 客户", qty: 1000, done: 428, due: "2026-06-30", line: "Line-A", status: "已下达", priority: "高", risk: "缺料", quality: 98.7, oee: 86.4 },
  { id: "MO-202606-0002", product: "工业网关 GW-240", customer: "B 客户", qty: 600, done: 315, due: "2026-06-28", line: "Line-B", status: "生产中", priority: "高", risk: "交期", quality: 97.9, oee: 83.8 },
  { id: "MO-202606-0003", product: "边缘采集器 ECU-80", customer: "C 客户", qty: 1200, done: 760, due: "2026-07-02", line: "Line-C", status: "生产中", priority: "中", risk: "设备", quality: 99.1, oee: 88.2 },
  { id: "MO-202606-0004", product: "智能传感节点 SEN-20", customer: "A 客户", qty: 2000, done: 1280, due: "2026-07-05", line: "Line-A", status: "待检", priority: "中", risk: "质量", quality: 98.4, oee: 87.1 },
  { id: "MO-202606-0005", product: "电源控制模块 PCM-60", customer: "D 客户", qty: 900, done: 120, due: "2026-06-27", line: "Line-B", status: "待备料", priority: "紧急", risk: "缺料", quality: 96.8, oee: 81.6 },
  { id: "MO-202606-0006", product: "显示控制面板 HMI-70", customer: "E 客户", qty: 500, done: 0, due: "2026-07-01", line: "Line-C", status: "待排程", priority: "中", risk: "资料", quality: 0, oee: 0 },
  { id: "MO-202606-0007", product: "无线采集终端 WDT-30", customer: "F 客户", qty: 1500, done: 980, due: "2026-07-03", line: "Line-A", status: "生产中", priority: "中", risk: "正常", quality: 99.0, oee: 88.5 },
  { id: "MO-202606-0008", product: "智能继电控制器 RLY-12", customer: "G 客户", qty: 750, done: 470, due: "2026-06-29", line: "Line-B", status: "生产中", priority: "高", risk: "设备", quality: 97.6, oee: 82.9 },
  { id: "MO-202606-0009", product: "环境监测模块 ENV-45", customer: "H 客户", qty: 1100, done: 220, due: "2026-07-06", line: "Line-C", status: "已排程", priority: "中", risk: "正常", quality: 98.8, oee: 86.9 },
  { id: "MO-202606-0010", product: "伺服驱动板 SRV-90", customer: "B 客户", qty: 420, done: 260, due: "2026-06-26", line: "Line-A", status: "生产中", priority: "紧急", risk: "交期", quality: 97.2, oee: 84.3 },
  { id: "MO-202606-0011", product: "温湿度采集器 THS-10", customer: "I 客户", qty: 1800, done: 1480, due: "2026-07-08", line: "Line-C", status: "包装中", priority: "低", risk: "正常", quality: 99.3, oee: 89.1 },
  { id: "MO-202606-0012", product: "工业触控终端 HMI-100", customer: "J 客户", qty: 320, done: 80, due: "2026-06-30", line: "Line-B", status: "待首检", priority: "高", risk: "质量", quality: 96.9, oee: 80.8 },
];

const flowSteps = [
  { name: "ERP 工单", meta: "MO-202606-0001 接收成功", status: "done", owner: "计划员", action: "查看订单" },
  { name: "生产资料检查", meta: "BOM / 工艺 / 作业指导 / 检验要求通过", status: "done", owner: "工艺工程师", action: "查看资料" },
  { name: "生产排程", meta: "第一批 800 台，老化测试为瓶颈", status: "done", owner: "计划主管", action: "调整排程" },
  { name: "任务下达", meta: "SMT 至包装任务已生成", status: "current", owner: "车间主任", action: "查看任务" },
  { name: "物料齐套", meta: "温度传感器第二批待到货", status: "todo", owner: "物料员", action: "催料" },
  { name: "现场生产", meta: "SMT / DIP / 烧录 / 装配", status: "todo", owner: "班组长", action: "进入看板" },
  { name: "质量放行", meta: "FAI / IPQC / FQC", status: "todo", owner: "质量工程师", action: "查看检验" },
  { name: "入库回传", meta: "WMS 入库，ERP 完工回传", status: "todo", owner: "仓库主管", action: "查看单据" },
];

const initialOperations = [
  { id: "op-smt-1", orderId: "MO-202606-0001", line: "Line-A", name: "SMT 贴片", status: "生产中", style: "blue", progress: 54, meta: ["SMT-01", "D-001", "428 / 800"], detail: "当前炉温正常，首件已放行。", paused: false },
  { id: "op-dip-1", orderId: "MO-202606-0001", line: "Line-A", name: "DIP 插件", status: "待接单", style: "orange", progress: 0, meta: ["DIP-Line-A", "D-002", "13:00 计划开工"], detail: "等待 SMT 批次转入。", paused: false },
  { id: "op-smt-2", orderId: "MO-202606-0002", line: "Line-B", name: "SMT 贴片", status: "生产中", style: "blue", progress: 52, meta: ["SMT-02", "D-021", "315 / 600"], detail: "客户 B 订单交期靠前，已加急。", paused: false },
  { id: "op-test-2", orderId: "MO-202606-0002", line: "Line-B", name: "功能测试", status: "排队中", style: "orange", progress: 0, meta: ["Test-B", "2 个工位占用", "预计 15:20"], detail: "测试工位排队，需协调换线。", paused: false },
  { id: "op-asm-3", orderId: "MO-202606-0003", line: "Line-C", name: "整机装配", status: "生产中", style: "blue", progress: 63, meta: ["Assembly-C", "D-031", "760 / 1200"], detail: "装配节拍稳定，线边库存充足。", paused: false },
  { id: "op-fqc-4", orderId: "MO-202606-0004", line: "Line-A", name: "FQC 检验", status: "待检", style: "green", progress: 64, meta: ["QC-Final", "D-041", "抽样 50 件"], detail: "等待质量放行后入库。", paused: false },
  { id: "op-prep-5", orderId: "MO-202606-0005", line: "Line-B", name: "备料确认", status: "缺料", style: "red", progress: 13, meta: ["Line-B", "传感器短缺", "120 / 900"], detail: "关键外购件未齐套，影响开工。", paused: false },
  { id: "op-pack-11", orderId: "MO-202606-0011", line: "Line-C", name: "包装作业", status: "生产中", style: "blue", progress: 82, meta: ["Pack-C", "D-111", "1480 / 1800"], detail: "包装材料齐套，等待尾批入库。", paused: false },
  { id: "op-fai-12", orderId: "MO-202606-0012", line: "Line-B", name: "首件检验", status: "待首检", style: "orange", progress: 25, meta: ["QC-B", "D-121", "80 / 320"], detail: "客户 J 订单首件尺寸项待确认。", paused: false },
];

const initialRisks = [
  { id: "risk-aging", orderId: "MO-202606-0003", name: "老化房容量接近上限", type: "设备", style: "orange", meta: ["Aging-Room-1", "预计 16:40 排队", "责任人：设备组"], level: "中", owner: "设备组", done: false },
  { id: "risk-sensor", orderId: "MO-202606-0001", name: "温度传感器缺 200 件", type: "缺料", style: "red", meta: ["SEN-L20260605", "预计明日 14:00 到货", "已通知采购"], level: "高", owner: "物料组", done: false },
  { id: "risk-sync", orderId: "MO-202606-0004", name: "完工数据同步延迟", type: "单据", style: "blue", meta: ["平均延迟 4.2s", "无失败单据", "监控中"], level: "低", owner: "IT", done: false },
  { id: "risk-fqc", orderId: "MO-202606-0004", name: "FQC 抽检任务待确认", type: "质量", style: "green", meta: ["QC-Final", "样本 32 件", "检验员 QC-001"], level: "中", owner: "质量组", done: false },
  { id: "risk-due", orderId: "MO-202606-0002", name: "GW-240 交期压缩", type: "交期", style: "red", meta: ["B 客户", "交期 2026-06-28", "建议动态重排"], level: "高", owner: "计划组", done: false },
  { id: "risk-master", orderId: "MO-202606-0006", name: "HMI-70 检验要求未确认", type: "资料", style: "orange", meta: ["待工艺确认", "影响排程", "责任人：工艺组"], level: "中", owner: "工艺组", done: false },
  { id: "risk-srv-due", orderId: "MO-202606-0010", name: "SRV-90 当日交付压力", type: "交期", style: "red", meta: ["B 客户", "交期 2026-06-26", "建议优先放行"], level: "高", owner: "计划组", done: false },
  { id: "risk-hmi-quality", orderId: "MO-202606-0012", name: "HMI-100 首件尺寸待确认", type: "质量", style: "red", meta: ["首件检验", "尺寸项待判定", "责任人：质量组"], level: "高", owner: "质量组", done: false },
];

const initialTodos = [
  { id: "todo-1", text: "确认 Line-A 13:00 DIP 接单人员", tag: "车间", done: false },
  { id: "todo-2", text: "跟进温度传感器 200 件到货时间", tag: "物料", done: false },
  { id: "todo-3", text: "审批客户 A 成品标签补打申请", tag: "标签", done: false },
  { id: "todo-4", text: "复核 FQC 抽检样本数量", tag: "质量", done: true },
];

const initialState = {
  line: "全部产线",
  shift: "白班",
  activeOrderId: "MO-202606-0001",
  activeKpi: "",
  orderView: "all",
  orderPoolExpanded: false,
  openMenus: [],
};

let orders = structuredClone(initialOrders);
let operations = structuredClone(initialOperations);
let risks = structuredClone(initialRisks);
let todos = structuredClone(initialTodos);
let state = structuredClone(initialState);

function loadDemoState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    orders = saved.orders || orders;
    operations = saved.operations || operations;
    risks = saved.risks || risks;
    todos = saved.todos || todos;
    state = { ...state, ...(saved.state || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveDemoState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders, operations, risks, todos, state }));
}

function resetDemoState() {
  localStorage.removeItem(STORAGE_KEY);
  orders = structuredClone(initialOrders);
  operations = structuredClone(initialOperations);
  risks = structuredClone(initialRisks);
  todos = structuredClone(initialTodos);
  state = structuredClone(initialState);
  $("#lineSelect").value = state.line;
  $("#shiftSelect").value = state.shift;
  renderAllProduction();
  renderTodos();
  setContext("生产总览", "演示数据已恢复到初始状态。");
  showToast("演示数据已重置");
}

const $ = (selector) => document.querySelector(selector);
const menu = $("#moduleMenu");
const timeline = $("#flowTimeline");
const operationList = $("#operationList");
const riskList = $("#riskList");
const submenuPreview = $("#submenuPreview");
const todoList = $("#todoList");
const orderPool = $("#orderPool");
const lineLoad = $("#lineLoad");
const productMix = $("#productMix");
const heroSummary = $("#heroSummary");

function getActiveOrder() {
  return orders.find((order) => order.id === state.activeOrderId) || orders[0];
}

function getVisibleOrders() {
  let list = state.line === "全部产线" ? orders : orders.filter((order) => order.line === state.line);
  if (state.orderView === "output") list = [...list].sort((a, b) => b.done / b.qty - a.done / a.qty);
  if (state.orderView === "quality") list = list.filter((order) => order.quality > 0).sort((a, b) => a.quality - b.quality);
  if (state.orderView === "equipment") list = list.filter((order) => order.oee > 0).sort((a, b) => a.oee - b.oee);
  if (state.orderView === "risk") list = list.filter((order) => risks.some((risk) => !risk.done && risk.orderId === order.id));
  return list;
}
function renderMenu() {
  menu.innerHTML = modules
    .map((module, index) => {
      const openClass = state.openMenus.includes(module.id) ? " is-open" : "";
      const submenu = module.items.map((item, itemIndex) => `<a href="#${module.id}-${itemIndex}" data-module="${module.id}" data-entry="${item}">${item}</a>`).join("");
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
    })
    .join("");

  menu.querySelectorAll(".module-button").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".module-group");
      group.classList.toggle("is-open");
      const moduleId = button.dataset.module;
      state.openMenus = group.classList.contains("is-open")
        ? [...new Set([...state.openMenus, moduleId])]
        : state.openMenus.filter((id) => id !== moduleId);
      saveDemoState();
      setContext("业务导航", `${button.querySelector(".module-title").textContent} 已展开，可继续选择具体业务入口。`);
    });
  });

  menu.querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveLink(link);
      applyMenuEntry(link.dataset.module, link.dataset.entry);
    });
  });
}

function applyMenuEntry(moduleId, entry) {
  const order = getActiveOrder();
  if (moduleId === "orders" && entry === "生产订单") {
    window.location.href = "./orders/production-orders.html";
    return;
  }
  if (moduleId === "orders" && entry === "订单评审") {
    window.location.href = "./orders/order-reviews.html";
    return;
  }
  if (moduleId === "orders" && entry === "生产排程") {
    window.location.href = "./orders/production-schedule.html";
    return;
  }
  if (moduleId === "orders" && entry === "产能负荷") {
    window.location.href = "./orders/capacity-load.html";
    return;
  }
  if (moduleId === "orders" && entry === "交期预警") {
    window.location.href = "./orders/delivery-warning.html";
    return;
  }
  if (moduleId === "orders" && entry === "计划调整") {
    window.location.href = "./orders/plan-adjustment.html";
    return;
  }
  if (moduleId === "orders" && entry === "齐套检查") {
    window.location.href = "./orders/kit-check.html";
    return;
  }
  const actions = {
    生产总览: () => {
      state.line = "全部产线";
      state.orderView = "all";
      $("#lineSelect").value = state.line;
      setActiveKpi("");
      renderAllProduction();
      openDrawer("生产总览", "全车间运行概览", detailRows([
        ["在制订单", `${orders.length} 个`],
        ["运行产线", "Line-A / Line-B / Line-C"],
        ["未关闭风险", `${risks.filter((risk) => !risk.done).length} 个`],
        ["当前选中", `${order.id} · ${order.product}`],
      ]));
      setContext("生产总览", "已切换到全车间总览，订单池、产线负荷、产品分布和风险列表均显示全量数据。");
    },
    今日待办: () => {
      setActiveKpi("");
      renderTodos();
      openDrawer("今日待办", "待处理事项", detailRows(todos.map((todo) => [todo.tag, `${todo.done ? "已完成" : "待处理"} · ${todo.text}`])));
      setContext("今日待办", "已聚焦个人待办，可在右侧“我的待办”中直接勾选完成。");
    },
    异常提醒: () => {
      setActiveKpi("risk");
      renderRisks();
      openDrawer("异常提醒", "未关闭风险", detailRows(risks.filter((risk) => !risk.done).map((risk) => [risk.type, `${risk.name} · ${risk.owner}`])));
      setContext("异常提醒", "已筛选未关闭风险，风险中心显示当前需要跟进的异常事项。");
    },
    交期预警: () => {
      const urgent = orders.find((item) => item.risk === "交期" || item.priority === "紧急") || orders[0];
      state.activeOrderId = urgent.id;
      setActiveKpi("risk");
      renderAllProduction();
      openDrawer("交期预警", urgent.id, detailRows([
        ["产品", urgent.product],
        ["客户", urgent.customer],
        ["交期", urgent.due],
        ["当前状态", urgent.status],
      ]));
      setContext("交期预警", `已定位到 ${urgent.id}，优先查看交期或紧急订单。`);
    },
    车间看板: () => {
      setActiveKpi("output");
      renderOperations();
      openDrawer("车间看板", `${state.line} 现场状态`, detailRows(operations.slice(0, 6).map((item) => [item.line, `${item.orderId} · ${item.name} · ${item.status}`])));
      setContext("车间看板", "已聚焦现场执行，现场执行列表展示当前产线和订单任务。");
    },
    我的审批: () => {
      openDrawer("我的审批", "待审批事项", detailRows([
        ["标签补打", "客户 A 成品标签补打申请待审批"],
        ["报工补录", "Line-B 夜班报工补录待确认"],
        ["质量放行", "SEN-20 FQC 放行待签核"],
      ]));
      setContext("我的审批", "已打开审批事项，可继续进入补打、补录和质量放行业务。");
    },
  };

  if (actions[entry]) {
    actions[entry]();
  } else {
    const module = modules.find((item) => item.id === moduleId);
    setContext(entry, `已切换到「${entry}」业务视角，来源：${module ? module.title : "业务导航"}。`);
    openDrawer(module ? module.title : "业务入口", entry, detailRows([
      ["入口", entry],
      ["当前订单", `${order.id} · ${order.product}`],
      ["当前产线", state.line],
      ["下一步", "后续页面会在该入口下继续扩展"],
    ]));
  }
  saveDemoState();
  showToast(`已定位到 ${entry}`);
}

function setActiveKpi(type) {
  document.querySelectorAll(".kpi-card").forEach((card) => {
    card.classList.toggle("is-active", Boolean(type) && card.dataset.kpi === type);
  });
}

function renderTimeline() {
  const order = getActiveOrder();
  $("#flowSubtitle").textContent = `${order.id} · ${order.customer} · ${order.product}`;
  timeline.innerHTML = flowSteps
    .map((step, index) => {
      const className = step.status === "done" ? "is-done" : step.status === "current" ? "is-current" : "";
      return `
        <button class="flow-step ${className}" type="button" data-index="${index}">
          <div class="flow-step__index">${step.status === "done" ? "✓" : index + 1}</div>
          <div class="flow-step__name">${step.name}</div>
          <div class="flow-step__meta">${step.meta}</div>
        </button>
      `;
    })
    .join("");

  timeline.querySelectorAll(".flow-step").forEach((stepEl) => {
    stepEl.addEventListener("click", () => {
      const step = flowSteps[Number(stepEl.dataset.index)];
      setContext(step.name, `${step.meta}。负责人：${step.owner}。建议动作：${step.action}。`);
      openDrawer("流程节点", step.name, detailRows([
        ["当前状态", step.status === "done" ? "已完成" : step.status === "current" ? "进行中" : "待开始"],
        ["节点说明", step.meta],
        ["负责人", step.owner],
        ["下一动作", step.action],
      ]));
    });
  });
}

function renderOperations() {
  const order = getActiveOrder();
  const list = operations.filter((item) => (state.line === "全部产线" || item.line === state.line) && item.orderId === order.id);
  $("#operationSubtitle").textContent = `${state.line} · ${state.shift} · ${order.id}`;
  operationList.innerHTML = (list.length ? list : operations.filter((item) => state.line === "全部产线" || item.line === state.line).slice(0, 4))
    .map((item) => `
      <div class="operation-item ${item.paused ? "is-paused" : ""}">
        <div class="operation-item__top">
          <div class="operation-item__name">${item.name}</div>
          <span class="pill pill--${item.style}">${item.status}</span>
        </div>
        <div class="operation-item__meta">${item.meta.map((meta) => `<span>${meta}</span>`).join("")}</div>
        <div class="mini-progress"><span style="width:${item.progress}%"></span></div>
        <div class="row-actions">
          <button type="button" data-action="detail" data-id="${item.id}">详情</button>
          <button type="button" data-action="report" data-id="${item.id}">报工 +20</button>
          <button type="button" data-action="pause" data-id="${item.id}">${item.paused ? "恢复" : "暂停"}</button>
        </div>
      </div>
    `)
    .join("");

  operationList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleOperationAction(button.dataset.action, button.dataset.id));
  });
}

function renderRisks(filter = "") {
  const order = getActiveOrder();
  const scoped = risks.filter((risk) => risk.orderId === order.id || state.line === "全部产线");
  const list = filter ? scoped.filter((risk) => risk.type === filter || risk.style === filter) : scoped;
  riskList.innerHTML = list
    .map((item) => `
      <div class="risk-item ${item.done ? "is-done" : ""}">
        <div class="risk-item__top">
          <div class="risk-item__name">${item.name}</div>
          <span class="pill pill--${item.style}">${item.type}</span>
        </div>
        <div class="risk-item__meta">${item.meta.map((meta) => `<span>${meta}</span>`).join("")}</div>
        <div class="row-actions">
          <button type="button" data-action="detail" data-id="${item.id}">查看</button>
          <button type="button" data-action="assign" data-id="${item.id}">派给我</button>
          <button type="button" data-action="close" data-id="${item.id}">${item.done ? "已关闭" : "关闭"}</button>
        </div>
      </div>
    `)
    .join("");

  riskList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleRiskAction(button.dataset.action, button.dataset.id));
  });
}

function renderTodos() {
  todoList.innerHTML = todos
    .map((todo) => `
      <label class="todo-item ${todo.done ? "is-done" : ""}">
        <input type="checkbox" data-id="${todo.id}" ${todo.done ? "checked" : ""} />
        <span>${todo.text}</span>
        <em>${todo.tag}</em>
      </label>
    `)
    .join("");

  todoList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const todo = todos.find((item) => item.id === input.dataset.id);
      todo.done = input.checked;
      saveDemoState();
      renderTodos();
      showToast(todo.done ? "待办已完成" : "待办已恢复");
    });
  });
}

function renderPreview() {
  submenuPreview.innerHTML = modules
    .slice(0, 6)
    .map((module) => `
      <button class="preview-card" type="button" data-title="${module.title}">
        <div class="preview-card__title">
          <span class="preview-card__dot" style="background:${module.color}"></span>
          ${module.title}
        </div>
        <ul>${module.items.slice(0, 5).map((item) => `<li>${item}</li>`).join("")}</ul>
      </button>
    `)
    .join("");

  submenuPreview.querySelectorAll(".preview-card").forEach((card) => {
    card.addEventListener("click", () => {
      setContext(card.dataset.title, `已从常用业务入口进入「${card.dataset.title}」。`);
      showToast(`打开 ${card.dataset.title}`);
    });
  });
}

function renderKpis() {
  const visibleOrders = getVisibleOrders();
  const totalQty = visibleOrders.reduce((sum, order) => sum + order.qty, 0);
  const totalDone = visibleOrders.reduce((sum, order) => sum + order.done, 0);
  const qualityOrders = visibleOrders.filter((order) => order.quality > 0);
  const oeeOrders = visibleOrders.filter((order) => order.oee > 0);
  const avgQuality = qualityOrders.reduce((sum, order) => sum + order.quality, 0) / Math.max(1, qualityOrders.length);
  const avgOee = oeeOrders.reduce((sum, order) => sum + order.oee, 0) / Math.max(1, oeeOrders.length);
  const activeOrder = getActiveOrder();
  $("#kpiOutput").textContent = totalDone.toLocaleString("zh-CN");
  $("#kpiQuality").textContent = `${avgQuality.toFixed(1)}%`;
  $("#kpiOee").textContent = `${avgOee.toFixed(1)}%`;
  $("#kpiRisks").textContent = risks.filter((risk) => !risk.done && visibleOrders.some((order) => order.id === risk.orderId)).length;
  $("#orderNo").textContent = activeOrder.id;
  $("#orderStatus").textContent = activeOrder.status;
  $("#orderProduct").textContent = activeOrder.product;
  $("#orderMeta").innerHTML = `<span>${activeOrder.customer}</span><span>完成 ${activeOrder.done} / ${activeOrder.qty}</span><span>交期 ${activeOrder.due}</span>`;
  $("#orderProgressBar").style.width = `${Math.min(100, (activeOrder.done / activeOrder.qty) * 100)}%`;
  $("#statusLine").lastChild.textContent = ` ${visibleOrders.length} 个订单 · ${totalDone.toLocaleString("zh-CN")} / ${totalQty.toLocaleString("zh-CN")} 台`;
  renderHeroSummary(visibleOrders, totalQty, totalDone, avgQuality, avgOee);
}

function renderHeroSummary(visibleOrders, totalQty, totalDone, avgQuality, avgOee) {
  const runningOrders = visibleOrders.filter((order) => !["待排程", "关闭"].includes(order.status)).length;
  const urgentOrders = visibleOrders.filter((order) => order.priority === "紧急" || order.risk === "交期").length;
  const highRiskOrderList = visibleOrders.filter((order) => order.priority === "紧急" || ["缺料", "交期", "质量", "设备"].includes(order.risk));
  const openRisks = risks.filter((risk) => !risk.done && visibleOrders.some((order) => order.id === risk.orderId)).length;
  const completion = Math.round((totalDone / Math.max(1, totalQty)) * 100);
  heroSummary.innerHTML = [
    ["运行订单", `${runningOrders}`, `${visibleOrders.length} 个订单在当前范围内`],
    ["计划完成", `${completion}%`, `${totalDone.toLocaleString("zh-CN")} / ${totalQty.toLocaleString("zh-CN")} 台`],
    ["高风险订单", `${highRiskOrderList.length}`, "紧急、缺料、交期、质量、设备"],
    ["待处理风险", `${openRisks}`, `${urgentOrders} 个交期或紧急订单`],
  ]
    .map(([label, value, hint]) => `
      <button class="hero-summary-card" type="button" data-summary="${label}">
        <span>${label}</span>
        <strong>${value}</strong>
        <em>${hint}</em>
      </button>
    `)
    .join("");

  heroSummary.querySelectorAll(".hero-summary-card").forEach((card) => {
    card.addEventListener("click", () => {
      const label = card.dataset.summary;
      if (label === "待处理风险") applyMenuEntry("workbench", "异常提醒");
      else if (label === "高风险订单") {
        if (highRiskOrderList[0]) state.activeOrderId = highRiskOrderList[0].id;
        saveDemoState();
        renderAllProduction();
        openDrawer("高风险订单", "风险订单清单", riskOrderCards(highRiskOrderList));
      }
      else if (label === "运行订单") applyMenuEntry("workbench", "生产总览");
      else if (label === "计划完成") setActiveKpi("output");
      setContext(label, `已从生产运行摘要切换到「${label}」视角。`);
    });
  });
}

function renderOrders() {
  const visibleOrders = getVisibleOrders();
  const pinned = visibleOrders.filter((order) => order.priority === "紧急" || order.priority === "高" || order.id === state.activeOrderId);
  const normal = visibleOrders.filter((order) => !pinned.some((item) => item.id === order.id));
  const sortedOrders = [...pinned, ...normal];
  const displayOrders = state.orderPoolExpanded ? sortedOrders : sortedOrders.slice(0, 4);
  $("#toggleOrderPoolBtn").textContent = state.orderPoolExpanded ? "收起" : `展开 ${Math.max(0, sortedOrders.length - displayOrders.length)}`;
  $("#toggleOrderPoolBtn").disabled = sortedOrders.length <= 4;
  orderPool.classList.toggle("is-collapsed", !state.orderPoolExpanded);
  orderPool.innerHTML = displayOrders
    .map((order) => {
      const percent = Math.round((order.done / order.qty) * 100);
      const active = order.id === state.activeOrderId ? " is-active" : "";
      const riskStyle = order.risk === "缺料" || order.risk === "交期" ? "red" : order.risk === "正常" ? "green" : "orange";
      return `
        <button class="order-card${active}" type="button" data-id="${order.id}">
          <div class="order-card__top">
            <strong>${order.id}</strong>
            <span class="pill pill--${riskStyle}">${order.risk}</span>
          </div>
          <div class="order-card__product">${order.product}</div>
          <div class="order-card__meta">
            <span>${order.customer}</span>
            <span>${order.line}</span>
            <span>${order.due}</span>
          </div>
          <div class="mini-progress"><span style="width:${percent}%"></span></div>
          <div class="order-card__foot">
            <span>${order.done} / ${order.qty}</span>
            <span>${order.status}</span>
          </div>
        </button>
      `;
    })
    .join("");

  if (!state.orderPoolExpanded && sortedOrders.length > displayOrders.length) {
    orderPool.insertAdjacentHTML("beforeend", `
      <button class="order-more-card" type="button" data-action="expand">
        <strong>还有 ${sortedOrders.length - displayOrders.length} 个订单</strong>
        <span>点击展开查看全部在制订单</span>
      </button>
    `);
  }

  orderPool.querySelectorAll(".order-card").forEach((card) => {
    card.addEventListener("click", () => selectOrder(card.dataset.id));
  });
  const moreCard = orderPool.querySelector(".order-more-card");
  if (moreCard) {
    moreCard.addEventListener("click", () => {
      state.orderPoolExpanded = true;
      saveDemoState();
      renderOrders();
      showToast("订单池已展开");
    });
  }
}

function renderLineLoad() {
  const lines = ["Line-A", "Line-B", "Line-C"].map((line) => {
    const lineOrders = orders.filter((order) => order.line === line);
    const qty = lineOrders.reduce((sum, order) => sum + order.qty, 0);
    const done = lineOrders.reduce((sum, order) => sum + order.done, 0);
    const load = Math.round((done / Math.max(1, qty)) * 100);
    const openRisks = risks.filter((risk) => !risk.done && lineOrders.some((order) => order.id === risk.orderId)).length;
    return { line, load, openRisks, orders: lineOrders.length };
  });

  lineLoad.innerHTML = lines.map((item) => `
    <button class="load-item" type="button" data-line="${item.line}">
      <div>
        <strong>${item.line}</strong>
        <span>${item.orders} 个订单 · ${item.openRisks} 个风险</span>
      </div>
      <em>${item.load}%</em>
      <div class="mini-progress"><span style="width:${item.load}%"></span></div>
    </button>
  `).join("");

  lineLoad.querySelectorAll(".load-item").forEach((item) => {
    item.addEventListener("click", () => {
    state.line = item.dataset.line;
      state.orderView = "all";
      $("#lineSelect").value = state.line;
      const first = orders.find((order) => order.line === state.line);
      if (first) state.activeOrderId = first.id;
      saveDemoState();
      renderAllProduction();
      setContext("产线负荷", `已切换到 ${state.line}，查看该产线订单、任务和风险。`);
    });
  });
}

function renderProductMix() {
  productMix.innerHTML = getVisibleOrders().map((order) => {
    const percent = Math.round((order.done / order.qty) * 100);
    return `
      <button class="mix-item" type="button" data-id="${order.id}">
        <span>${order.product}</span>
        <strong>${percent}%</strong>
        <div class="mini-progress"><span style="width:${percent}%"></span></div>
      </button>
    `;
  }).join("");

  productMix.querySelectorAll(".mix-item").forEach((item) => {
    item.addEventListener("click", () => selectOrder(item.dataset.id));
  });
}

function selectOrder(orderId) {
  state.activeOrderId = orderId;
  state.orderView = "all";
  const order = getActiveOrder();
  saveDemoState();
  renderAllProduction();
  setContext(order.id, `${order.product} · ${order.customer} · ${order.line} · 交期 ${order.due}`);
  showToast(`已切换到 ${order.id}`);
}

function renderAllProduction() {
  renderOrders();
  renderLineLoad();
  renderProductMix();
  renderTimeline();
  renderOperations();
  renderRisks();
  renderKpis();
}
function bindKpis() {
  document.querySelectorAll(".kpi-card").forEach((card) => {
    card.addEventListener("click", () => {
      applyKpiView(card.dataset.kpi);
    });
  });
}

function applyKpiView(type) {
  setActiveKpi(type);
  state.orderView = type;
  state.orderPoolExpanded = true;
  const visible = getVisibleOrders();
  if (visible[0]) state.activeOrderId = visible[0].id;
  saveDemoState();
  renderAllProduction();

  if (type === "output") {
    openDrawer("今日产量", "订单完成率排行", riskOrderCards(visible.slice(0, 10)));
    setContext("今日产量", "订单池已按完成率从高到低排序，现场执行同步切换到当前完成率最高的订单。");
  }
  if (type === "quality") {
    openDrawer("良品率", "低良率订单", detailRows(visible.slice(0, 8).map((order) => [order.id, `${order.product} · 良率 ${order.quality.toFixed(1)}% · ${order.line}`])));
    renderRisks("质量");
    setContext("良品率", "订单池已按良率从低到高排序，风险中心聚焦质量相关事项。");
  }
  if (type === "equipment") {
    openDrawer("设备 OEE", "低 OEE 订单", detailRows(visible.slice(0, 8).map((order) => [order.id, `${order.product} · OEE ${order.oee.toFixed(1)}% · ${order.line}`])));
    renderRisks("设备");
    setContext("设备 OEE", "订单池已按 OEE 从低到高排序，风险中心聚焦设备相关事项。");
  }
  if (type === "risk") {
    openDrawer("异常待闭环", "未关闭风险订单", riskOrderCards(visible));
    renderRisks();
    setContext("异常待闭环", "订单池已筛选存在未关闭风险的订单，优先处理高等级异常。");
  }
}

function bindTopbar() {
  $("#searchToggle").addEventListener("click", () => {
    $("#searchPanel").hidden = !$("#searchPanel").hidden;
    if (!$("#searchPanel").hidden) $("#globalSearch").focus();
  });
  $("#messageToggle").addEventListener("click", () => {
    openDrawer("消息中心", "最新提醒", detailRows([
      ["缺料预警", "温度传感器缺 200 件，采购已回复预计明日到货"],
      ["设备提醒", "老化房容量接近上限，建议提前分批"],
      ["质量提醒", "FQC 抽检任务待确认"],
    ]));
  });
  $("#newExceptionBtn").addEventListener("click", openModal);
  $("#resetDemoBtn").addEventListener("click", resetDemoState);
  $("#refreshDataBtn").addEventListener("click", refreshData);
  document.querySelectorAll("[data-hero-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.heroAction;
      if (action === "urgent") applyMenuEntry("workbench", "交期预警");
      if (action === "risk") applyMenuEntry("workbench", "异常提醒");
      if (action === "line") {
        state.line = "Line-B";
        $("#lineSelect").value = state.line;
        const first = getVisibleOrders()[0];
        if (first) state.activeOrderId = first.id;
        saveDemoState();
        renderAllProduction();
        setContext("繁忙产线", "已切换到当前压力较高的 Line-B。");
      }
    });
  });
  $("#lineSelect").addEventListener("change", (event) => {
    state.line = event.target.value;
    state.orderView = "all";
    const first = getVisibleOrders()[0];
    if (first) state.activeOrderId = first.id;
    saveDemoState();
    renderAllProduction();
    setContext("产线切换", `当前已切换到 ${state.line}。`);
  });
  $("#shiftSelect").addEventListener("change", (event) => {
    state.shift = event.target.value;
    saveDemoState();
    renderOperations();
    setContext("班次切换", `当前已切换到 ${state.shift}。`);
  });
  $("#clearContextBtn").addEventListener("click", () => setContext("生产总览", "点击 KPI、流程节点、现场任务或风险项，可在这里切换工作上下文。"));
  $("#showAllRisksBtn").addEventListener("click", () => {
    renderRisks();
    setContext("全部风险", "已显示所有未关闭和已关闭的风险事项。");
  });
  $("#showAllOrdersBtn").addEventListener("click", () => {
    state.line = "全部产线";
    state.orderView = "all";
    $("#lineSelect").value = state.line;
    saveDemoState();
    renderAllProduction();
    setContext("全部订单", "已显示当前车间所有在制订单。");
  });
  $("#toggleOrderPoolBtn").addEventListener("click", () => {
    state.orderPoolExpanded = !state.orderPoolExpanded;
    saveDemoState();
    renderOrders();
    showToast(state.orderPoolExpanded ? "订单池已展开" : "订单池已收起");
  });
}

function bindSearch() {
  $("#globalSearch").addEventListener("input", (event) => {
    const keyword = event.target.value.trim().toLowerCase();
    const data = [
      ...orders.map((item) => ({ title: item.id, desc: `${item.product} · ${item.customer} · ${item.line}`, type: "生产订单" })),
      ...operations.map((item) => ({ title: item.name, desc: item.meta.join(" · "), type: "生产任务" })),
      ...risks.map((item) => ({ title: item.name, desc: item.meta.join(" · "), type: item.type })),
      ...modules.flatMap((module) => module.items.map((item) => ({ title: item, desc: module.title, type: "业务入口" }))),
    ];
    const results = keyword ? data.filter((item) => `${item.title} ${item.desc} ${item.type}`.toLowerCase().includes(keyword)).slice(0, 8) : [];
    $("#searchResults").innerHTML = results.length
      ? results.map((item) => `<button type="button" data-title="${item.title}" data-desc="${item.desc}"><strong>${item.title}</strong><span>${item.type} · ${item.desc}</span></button>`).join("")
      : keyword ? `<div class="empty-state">没有找到匹配结果</div>` : "";
    $("#searchResults").querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const order = orders.find((item) => item.id === button.dataset.title);
        if (order) state.activeOrderId = order.id;
        saveDemoState();
        renderAllProduction();
        setContext(button.dataset.title, button.dataset.desc);
        $("#searchPanel").hidden = true;
      });
    });
  });
}

function bindModal() {
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalCancel").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (event) => {
    if (event.target.id === "modalBackdrop") closeModal();
  });
  $("#exceptionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const type = $("#exceptionType").value;
    const step = $("#exceptionStep").value;
    const desc = $("#exceptionDesc").value.trim() || "现场新建异常，待补充详细说明";
    const style = type === "质量" || type === "缺料" ? "red" : type === "设备" ? "orange" : "blue";
    risks.unshift({
      id: `risk-${Date.now()}`,
      orderId: state.activeOrderId,
      name: `${step}：${desc.slice(0, 18)}`,
      type,
      style,
      meta: [step, "刚刚创建", "责任人：待分配"],
      level: type === "缺料" || type === "质量" ? "高" : "中",
      owner: "待分配",
      done: false,
    });
    $("#exceptionDesc").value = "";
    closeModal();
    saveDemoState();
    renderAllProduction();
    setContext("新建异常", `已提交 ${type} 异常，影响工序：${step}。`);
    showToast("异常已创建");
  });
}

function handleOperationAction(action, id) {
  const item = operations.find((operation) => operation.id === id);
  if (!item) return;
  if (action === "detail") {
    setContext(item.name, item.detail);
    openDrawer("生产任务", item.name, detailRows([["状态", item.status], ["进度", `${item.progress}%`], ["任务信息", item.meta.join(" · ")], ["现场说明", item.detail]]));
  }
  if (action === "report") {
    const order = orders.find((itemOrder) => itemOrder.id === item.orderId);
    item.progress = Math.min(100, item.progress + 8);
    if (order) order.done = Math.min(order.qty, order.done + 20);
    if (order && item.meta[item.meta.length - 1].includes("/")) item.meta[item.meta.length - 1] = `${order.done} / ${order.qty}`;
    if (item.progress >= 100) {
      item.status = "已完成";
      item.style = "green";
    }
    saveDemoState();
    renderAllProduction();
    showToast(`${item.name} 已报工`);
  }
  if (action === "pause") {
    item.paused = !item.paused;
    item.status = item.paused ? "已暂停" : item.progress > 0 ? "生产中" : "待接单";
    item.style = item.paused ? "red" : item.progress > 0 ? "blue" : "orange";
    saveDemoState();
    renderOperations();
    showToast(item.paused ? `${item.name} 已暂停` : `${item.name} 已恢复`);
  }
}

function handleRiskAction(action, id) {
  const item = risks.find((risk) => risk.id === id);
  if (!item) return;
  if (action === "detail") {
    setContext(item.name, `${item.type}风险，等级：${item.level}，责任人：${item.owner}。`);
    openDrawer("风险详情", item.name, detailRows([["类型", item.type], ["等级", item.level], ["责任人", item.owner], ["状态", item.done ? "已关闭" : "待处理"], ["说明", item.meta.join(" · ")]]));
  }
  if (action === "assign") {
    item.owner = "生产经理";
    item.meta[item.meta.length - 1] = "责任人：生产经理";
    saveDemoState();
    renderRisks();
    showToast("已派给生产经理");
  }
  if (action === "close" && !item.done) {
    item.done = true;
    saveDemoState();
    renderAllProduction();
    showToast("风险已关闭");
  }
}

function refreshData() {
  const visibleOrders = getVisibleOrders().filter((order) => order.status !== "待排程");
  visibleOrders.forEach((order) => {
    order.done = Math.min(order.qty, order.done + Math.floor(4 + Math.random() * 18));
    if (order.quality > 0) order.quality = Math.max(96.5, Math.min(99.6, order.quality + (Math.random() > 0.5 ? 0.1 : -0.1)));
    if (order.oee > 0) order.oee = Math.max(80, Math.min(90, order.oee + (Math.random() > 0.45 ? 0.3 : -0.2)));
  });
  operations.forEach((operation) => {
    const order = orders.find((item) => item.id === operation.orderId);
    if (order && !operation.paused) {
      operation.progress = Math.min(100, operation.progress + 1);
      if (operation.meta[operation.meta.length - 1].includes("/")) operation.meta[operation.meta.length - 1] = `${order.done} / ${order.qty}`;
    }
  });
  saveDemoState();
  renderAllProduction();
  setContext("数据刷新", `${state.line} ${state.shift} 数据已刷新。`);
  showToast("数据已刷新");
}

function setActiveLink(activeLink) {
  document.querySelectorAll(".submenu a").forEach((link) => link.classList.remove("is-active"));
  activeLink.classList.add("is-active");
}

function setContext(title, text) {
  $("#contextTitle").textContent = title;
  $("#contextText").textContent = text;
}

function openDrawer(label, title, body) {
  $("#drawerLabel").textContent = label;
  $("#drawerTitle").textContent = title;
  $("#drawerBody").innerHTML = body;
  $("#drawer").hidden = false;
  $("#drawerBody").querySelectorAll("[data-order-id]").forEach((card) => {
    card.addEventListener("click", () => selectOrder(card.dataset.orderId));
  });
}

function detailRows(rows) {
  return `<div class="detail-list">${rows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
}

function riskOrderCards(items) {
  if (!items.length) return `<div class="empty-state">当前范围内没有高风险订单</div>`;
  return `
    <div class="drawer-card-list">
      ${items.map((order) => `
        <button class="drawer-order-card" type="button" data-order-id="${order.id}">
          <div>
            <strong>${order.id}</strong>
            <span>${order.product}</span>
          </div>
          <em>${order.risk}</em>
          <small>${order.customer} · ${order.line} · ${order.due} · ${order.priority}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function openModal() {
  $("#modalBackdrop").hidden = false;
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
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

$("#drawerClose").addEventListener("click", () => {
  $("#drawer").hidden = true;
});

loadDemoState();
$("#lineSelect").value = state.line;
$("#shiftSelect").value = state.shift;
renderMenu();
renderAllProduction();
renderTodos();
renderPreview();
bindKpis();
bindTopbar();
bindSearch();
bindModal();
