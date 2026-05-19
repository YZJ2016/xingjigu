window.MES_MASTER_DATA = (() => {
  const products = [
    { id: "PRD-TCU-100", code: "TCU-100", name: "智能温控控制器 TCU-100", version: "V3.2", source: "PLM 发布 + ERP 物料", status: "已发布", customer: "A 客户", customerId: "CUS-A", line: "Line-A", bom: "BOM-TCU-100-V3.2", routing: "RT-TCU-100-V2.6", labelTemplate: "TPL-FG-A-V6", inspection: "FAI/IPQC/FQC 已配置", owner: "主数据工程师 赵岚", time: "06-18 09:12", risk: "资料齐套，支持开工准入", downstream: "订单评审、BOM、工艺路线、成品标签、产品追溯" },
    { id: "PRD-GW-240", code: "GW-240", name: "工业网关 GW-240", version: "V2.1", source: "ERP 新增 + PLM 工艺", status: "已发布", customer: "B 客户", customerId: "CUS-B", line: "Line-B", bom: "BOM-GW-240-V2.1", routing: "RT-GW-240-V1.8", labelTemplate: "TPL-FG-B-V3", inspection: "功能测试和 FQC 已配置", owner: "主数据工程师 赵岚", time: "06-18 10:40", risk: "客户优先级高，标签模板已确认", downstream: "生产订单、派工单、箱码托盘码" },
    { id: "PRD-PCM-60", code: "PCM-60", name: "电源控制模块 PCM-60", version: "V1.8", source: "PLM + 客户指定批次", status: "待替代审批", customer: "D 客户", customerId: "CUS-D", line: "Line-B", bom: "BOM-PCM-60-V1.8", routing: "RT-PCM-60-V1.8", labelTemplate: "TPL-FG-D-V2", inspection: "电源老化和 FQC 已配置", owner: "物料主管 何敏", time: "06-18 11:35", risk: "电源芯片指定批次冻结，阻止开工", downstream: "齐套检查、缺料处理、计划调整" },
    { id: "PRD-HMI-70", code: "HMI-70", name: "显示控制面板 HMI-70", version: "V1.0", source: "PLM 首版", status: "待质量确认", customer: "E 客户", customerId: "CUS-E", line: "Line-C", bom: "BOM-HMI-70-V1.0", routing: "RT-HMI-70-V1.0", labelTemplate: "TPL-FG-E-V1", inspection: "FQC 检验要求待审批", owner: "质量工程师 孟可", time: "06-18 14:05", risk: "FQC 检验要求未确认，阻止排程", downstream: "订单评审、生产排程、成品检验" },
    { id: "PRD-SRV-90", code: "SRV-90", name: "伺服驱动板 SRV-90", version: "V1.4", source: "PLM 变更 ECN-2406", status: "影响评估中", customer: "B 客户", customerId: "CUS-B", line: "Line-A", bom: "BOM-SRV-90-V1.4", routing: "RT-SRV-90-V1.4", labelTemplate: "TPL-FG-B-V3", inspection: "老化缩短需质量签核", owner: "工艺工程师 林澈", time: "06-18 15:20", risk: "版本切换会影响在制批次追溯", downstream: "BOM 清单、投料确认、客户追溯报告" },
  ];

  const materials = [
    { id: "MAT-PCB-TCU", name: "PCB 主板", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + IQC 规则", status: "已发布", supplier: "SUP-PCB-01", supplierName: "苏州精密电路", iqc: "AQL II / 关键尺寸", batch: "PCB-L20260608", owner: "物料主数据员 吴琳", time: "06-18 10:05", risk: "批次与 SN 谱系必须绑定", downstream: "物料标签、投料确认、批次追溯" },
    { id: "MAT-SEN-T100", name: "温度传感器", type: "关键外购件", batchRule: "批次必管", source: "ERP 物料 + WMS 库存", status: "已发布", supplier: "SUP-SEN-01", supplierName: "传感器供应商 S-01", iqc: "IQC 合格后可投 / FIFO", batch: "SEN-L20260605", owner: "物料主数据员 吴琳", time: "06-18 09:35", risk: "TCU-100 第二批缺 200 件", downstream: "齐套检查、领料申请、线边库存、投料记录" },
    { id: "MAT-CASE-TOP", name: "外壳上盖", type: "结构件", batchRule: "批次必管", source: "ERP 物料 + WMS 库存", status: "已发布", supplier: "SUP-CASE-01", supplierName: "昆山注塑件厂", iqc: "外观 / 尺寸抽检", batch: "CASE-TOP-L20260612", owner: "物料主数据员 吴琳", time: "06-18 10:18", risk: "装配工序需校验颜色和客户版本", downstream: "用料需求、投料确认、成品追溯" },
    { id: "MAT-DISPLAY-24", name: "显示屏", type: "外购显示模块", batchRule: "批次必管", source: "ERP 物料 + QMS 规则", status: "已发布", supplier: "SUP-DSP-03", supplierName: "上海显示模组", iqc: "点亮测试 / 外观", batch: "DSP-L20260610", owner: "质量员 孟可", time: "06-18 10:48", risk: "来料需保留亮点抽检记录", downstream: "来料检验、过程检验、客户报告" },
    { id: "MAT-PWR-IC60", name: "电源芯片", type: "客户指定料", batchRule: "客户指定批次", source: "ERP 物料 + QMS 冻结", status: "冻结待复核", supplier: "SUP-PWR-02", supplierName: "电源芯片供应商 P-02", iqc: "MRB 复判后可投", batch: "PWRIC-L20260602", owner: "质量员 孟可", time: "06-18 11:18", risk: "冻结批次不可投料，需替代料审批", downstream: "缺料处理、来料检验、库存冻结" },
    { id: "MAT-BOX-A", name: "客户 A 包装盒", type: "包装材料", batchRule: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "已发布", supplier: "SUP-PKG-01", supplierName: "包装供应商 P-01", iqc: "箱唛版本核对", batch: "BOXA-L20260614", owner: "包装工程师 李娟", time: "06-18 13:50", risk: "标签模板变更需重新复核", downstream: "成品标签、包装作业、余料退回" },
  ];

  const bomHeaders = [
    { id: "BOM-TCU-100-V3.2", productCode: "TCU-100", productName: "智能温控控制器 TCU-100", version: "V3.2", source: "PLM 发布 ECN-20260612", status: "已发布", lossRate: "1.5%", owner: "BOM 工程师 王珂", time: "06-18 09:50", risk: "温度传感器二批待到货", downstream: "用料需求、领料申请、投料防错、物料损耗" },
    { id: "BOM-GW-240-V2.1", productCode: "GW-240", productName: "工业网关 GW-240", version: "V2.1", source: "PLM 发布", status: "已发布", lossRate: "1.2%", owner: "BOM 工程师 王珂", time: "06-18 10:28", risk: "10K 电阻卷料替代料已批准", downstream: "生产排程、线边库存、投料记录" },
    { id: "BOM-PCM-60-V1.8", productCode: "PCM-60", productName: "电源控制模块 PCM-60", version: "V1.8", source: "PLM + 客户指定批次", status: "待替代审批", lossRate: "1.8%", owner: "物料主管 何敏", time: "06-18 11:35", risk: "电源芯片冻结导致 160 件缺口", downstream: "齐套检查、缺料处理、计划调整" },
    { id: "BOM-HMI-70-V1.0", productCode: "HMI-70", productName: "显示控制面板 HMI-70", version: "V1.0", source: "PLM 首版", status: "待质量确认", lossRate: "1.0%", owner: "质量工程师 孟可", time: "06-18 14:22", risk: "检验规范未签核，暂不放行排程", downstream: "订单评审、生产排程、成品检验" },
    { id: "BOM-SRV-90-V1.4", productCode: "SRV-90", productName: "伺服驱动板 SRV-90", version: "V1.4", source: "PLM 变更待评估", status: "影响评估中", lossRate: "1.3%", owner: "工艺工程师 林澈", time: "06-18 15:28", risk: "驱动芯片替代料影响追溯一致性", downstream: "任务变更、投料确认、客户报告" },
  ];

  const bomLines = {
    "BOM-TCU-100-V3.2": [
      { materialNo: "MAT-PCB-TCU", name: "PCB 主板", needPer: 1, available: 1080, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-SEN-T100", name: "温度传感器", needPer: 1, available: 800, transit: 0, eta: "06-21 14:00", substitute: "可评估 SEN-T100B" },
      { materialNo: "MAT-CASE-TOP", name: "外壳上盖", needPer: 1, available: 880, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-DISPLAY-24", name: "显示屏", needPer: 1, available: 1020, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-BOX-A", name: "客户 A 包装盒", needPer: 1, available: 1060, transit: 0, eta: "库存可用", substitute: "无" },
    ],
    "BOM-PCM-60-V1.8": [
      { materialNo: "MAT-PCB-TCU", name: "PCB 主板", needPer: 1, available: 980, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-PWR-IC60", name: "电源芯片", needPer: 1, available: 740, transit: 0, eta: "待 MRB 复判", substitute: "PWR-IC60B 待审批" },
      { materialNo: "MAT-CASE-TOP", name: "外壳上盖", needPer: 1, available: 920, transit: 0, eta: "库存可用", substitute: "无" },
    ],
  };

  const routings = [
    { id: "RT-TCU-100-V2.6", productCode: "TCU-100", name: "TCU-100 标准路线", version: "V2.6", source: "PLM 工艺发布", status: "已发布", steps: "SMT>DIP>烧录>装配>测试>老化>FQC>包装", sop: "SOP-TCU-2.6", owner: "工艺工程师 林澈", time: "06-18 09:58", risk: "老化测试为瓶颈资源", downstream: "生产排程、工序任务、工艺指导、检验履历" },
    { id: "RT-GW-240-V1.8", productCode: "GW-240", name: "GW-240 标准路线", version: "V1.8", source: "PLM 工艺发布", status: "已发布", steps: "SMT>烧录>功能测试>FQC>包装", sop: "SOP-GW-1.8", owner: "工艺工程师 林澈", time: "06-18 10:44", risk: "功能测试工位排队", downstream: "产能负荷、过程检验、报工" },
    { id: "RT-HMI-70-V1.0", productCode: "HMI-70", name: "HMI-70 首版路线", version: "V1.0", source: "PLM 首版", status: "待现场签收", steps: "装配>测试>FQC>包装", sop: "SOP-HMI-1.0", owner: "车间工艺员 许诺", time: "06-18 14:22", risk: "终端 SOP 未签收，开工检查拦截", downstream: "SOP 查看、开工检查、成品检验" },
    { id: "RT-SRV-90-V1.4", productCode: "SRV-90", name: "SRV-90 加急路线", version: "V1.4", source: "PLM ECN-2406", status: "影响评估中", steps: "SMT>测试>老化>FQC", sop: "SOP-SRV-1.4", owner: "质量工程师 孟可", time: "06-18 15:42", risk: "检验放行条件未完成", downstream: "首件检验、计划调整、质量放行" },
  ];

  const stations = [
    { id: "SMT-WS-01", name: "SMT 贴片工位", line: "Line-A", operation: "SMT 贴片", equipment: "SMT-01", terminal: "工位终端 + 扫码枪 + Feeder 绑定", qualification: "SMT 贴片资质", status: "可执行", owner: "车间工艺员 许诺", time: "06-18 08:55", risk: "需校验首件放行和料站绑定", downstream: "扫码开工、投料确认、过程记录、设备履历" },
    { id: "DIP-A-02", name: "DIP 插件工位", line: "Line-A", operation: "DIP 插件", equipment: "DIP-A1", terminal: "工牌 NFC + HMI", qualification: "DIP 插件资质", status: "待接单", owner: "班组长 郑峰", time: "06-18 09:18", risk: "等待 SMT 批次转入", downstream: "班组任务、工序报工、交接班" },
    { id: "TEST-B-01", name: "功能测试工位", line: "Line-B", operation: "功能测试", equipment: "Test-B", terminal: "测试台 API", qualification: "测试资质", status: "负荷偏高", owner: "设备工程师 周启", time: "06-18 10:32", risk: "测试工位排队影响交期", downstream: "过程参数、过程检验、设备效率" },
    { id: "QC-FINAL", name: "FQC 成品检验位", line: "共用资源", operation: "FQC 成品检验", equipment: "FQC-BENCH-01", terminal: "QMS 抽样台", qualification: "FQC 检验资质", status: "待规范确认", owner: "质量工程师 孟可", time: "06-18 14:30", risk: "检验项目缺失会拦截入库", downstream: "成品检验、完工确认、客户追溯报告" },
  ];

  const workshops = [
    { id: "FAC-EAST-01", name: "华东一厂 · 电子装配车间", shifts: "2026 白班日历", source: "MES 资源模型", status: "已生效", capacity: "Line-A / Line-B / Line-C", owner: "车间主任 陈伟", time: "06-18 08:20", risk: "支持多产线并行和班次交接", downstream: "首页工作台、生产排程、电子看板" },
    { id: "LINE-A", name: "Line-A 电子装配线", shifts: "白班 08:00-20:00", source: "APS 产能日历", status: "可排程", capacity: "SMT-01 / DIP-A1 / Pack-A", owner: "计划主管 李敏", time: "06-18 08:35", risk: "老化房为跨线瓶颈", downstream: "产能负荷、派工单、设备运行" },
    { id: "LINE-B", name: "Line-B 模块装配线", shifts: "白班 + 加班窗口", source: "APS + 设备保养计划", status: "负荷预警", capacity: "Test-B / Assembly-B", owner: "计划主管 李敏", time: "06-18 10:16", risk: "功能测试与物料冻结双风险", downstream: "交期预警、缺料处理、设备效率" },
    { id: "LINE-C", name: "Line-C 包装与装配线", shifts: "白班 08:00-20:00", source: "MES 资源模型", status: "可排程", capacity: "Assembly-C / Pack-C", owner: "包装主管 李娟", time: "06-18 13:26", risk: "HMI-70 工艺资料待签收", downstream: "包装作业、成品入库、交接班" },
  ];

  const partners = [
    { id: "CUS-A", name: "A 客户", type: "客户", level: "优先级高", source: "ERP 客户资料", status: "已生效", rule: "客户标签模板 A-V1.4", owner: "业务资料管理员 沈清", time: "06-18 09:02", risk: "标签补打需审批", downstream: "订单评审、成品标签、客户追溯报告" },
    { id: "CUS-B", name: "B 客户", type: "客户", level: "交期敏感", source: "ERP 客户资料", status: "已生效", rule: "OTD 重点监控", owner: "计划主管 李敏", time: "06-18 10:08", risk: "交期压缩需计划调整", downstream: "交期预警、计划调整、交付达成" },
    { id: "SUP-SEN-01", name: "传感器供应商 S-01", type: "供应商", level: "A级供应商", source: "QMS 供应商档案", status: "待到货复核", rule: "SEN-L20260605 / IQC 加严", owner: "采购跟单 袁青", time: "06-18 11:10", risk: "到货延迟影响第二批开工", downstream: "来料检验、缺料预警、批次追溯" },
    { id: "SUP-PWR-02", name: "电源芯片供应商 P-02", type: "供应商", level: "质量观察", source: "QMS 冻结规则", status: "冻结待复核", rule: "PWRIC-L20260602", owner: "质量员 孟可", time: "06-18 11:42", risk: "需 MRB 或替代料审批", downstream: "来料检验、库存冻结、缺料处理" },
  ];

  const orders = [
    { id: "MO-202606-0001", productCode: "TCU-100", product: "智能温控控制器 TCU-100", customer: "A 客户", customerId: "CUS-A", qty: 1000, done: 428, due: "2026-06-30", line: "Line-A", status: "已下达", priority: "高", risk: "缺料", quality: 98.7, oee: 86.4, review: "已通过", schedule: "已确认", kit: "缺 200 件", batchPlan: "800 + 200", planner: "周计划", materialGap: "温度传感器缺 200 件" },
    { id: "MO-202606-0002", productCode: "GW-240", product: "工业网关 GW-240", customer: "B 客户", customerId: "CUS-B", qty: 600, done: 315, due: "2026-06-28", line: "Line-B", status: "生产中", priority: "高", risk: "交期", quality: 97.9, oee: 83.8, review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "600", planner: "李计划", materialGap: "齐套" },
    { id: "MO-202606-0005", productCode: "PCM-60", product: "电源控制模块 PCM-60", customer: "D 客户", customerId: "CUS-D", qty: 900, done: 120, due: "2026-06-27", line: "Line-B", status: "待备料", priority: "紧急", risk: "缺料", quality: 96.8, oee: 81.6, review: "已通过", schedule: "待调整", kit: "缺 160 件", batchPlan: "500 + 400", planner: "李计划", materialGap: "电源芯片缺 160 件" },
    { id: "MO-202606-0006", productCode: "HMI-70", product: "显示控制面板 HMI-70", customer: "E 客户", customerId: "CUS-E", qty: 500, done: 0, due: "2026-07-01", line: "Line-C", status: "待排程", priority: "中", risk: "资料", quality: 0, oee: 0, review: "待评审", schedule: "未排程", kit: "待检查", batchPlan: "未拆批", planner: "待分配", materialGap: "检验要求未确认" },
    { id: "MO-202606-0010", productCode: "SRV-90", product: "伺服驱动板 SRV-90", customer: "B 客户", customerId: "CUS-B", qty: 420, done: 260, due: "2026-06-26", line: "Line-A", status: "生产中", priority: "紧急", risk: "交期", quality: 97.2, oee: 84.3, review: "已通过", schedule: "待调整", kit: "齐套", batchPlan: "420", planner: "王计划", materialGap: "齐套" },
  ];

  function productByCode(code) {
    return products.find((item) => item.code === code || item.name.includes(code));
  }

  function bomByProduct(code) {
    const product = productByCode(code);
    return bomHeaders.find((item) => item.id === product?.bom || item.productCode === code);
  }

  function routingByProduct(code) {
    const product = productByCode(code);
    return routings.find((item) => item.id === product?.routing || item.productCode === code);
  }

  function getBomMaterials(productCode, qty) {
    const bom = bomByProduct(productCode);
    const lines = bomLines[bom?.id] || [
      { materialNo: "MAT-PCB-TCU", name: "PCB 主板", needPer: 1, available: qty + 80, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-CASE-TOP", name: "外壳组件", needPer: 1, available: qty + 120, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-BOX-A", name: "包装材料", needPer: 1, available: qty + 60, transit: 0, eta: "库存可用", substitute: "无" },
    ];
    return lines.map((line) => {
      const need = Math.ceil(qty * line.needPer);
      const available = Math.min(line.available, need + 80);
      const transit = line.transit || 0;
      return { name: line.name, materialNo: line.materialNo, need, available, transit, eta: line.eta, substitute: line.substitute, gap: Math.max(0, need - available - transit) };
    });
  }

  function toBasicRows() {
    return {
      products: products.map((item) => ({ id: item.id, name: item.name, version: item.version, source: item.source, status: item.status, ref: `${item.bom} / ${item.routing} / ${item.labelTemplate}`, impact: `${orders.find((order) => order.productCode === item.code)?.id || "待关联工单"} ${item.status.includes("待") ? "阻止排程" : "可排程"}`, owner: item.owner, time: item.time, scope: `${item.customer} / ${item.line} / 电子装配`, risk: item.risk, downstream: item.downstream })),
      materials: materials.map((item) => ({ id: item.id, name: item.name, version: item.batchRule, source: item.source, status: item.status, ref: `${item.iqc} / ${item.batch}`, impact: item.risk, owner: item.owner, time: item.time, scope: `${item.supplierName} / ${item.type}`, risk: item.risk, downstream: item.downstream })),
      bom: bomHeaders.map((item) => ({ id: item.id, name: item.productName, version: item.version, source: item.source, status: item.status, ref: `${(bomLines[item.id] || []).length || 3} 个关键物料 / 损耗 ${item.lossRate}`, impact: `${orders.find((order) => order.productCode === item.productCode)?.id || "待关联工单"} ${item.risk}`, owner: item.owner, time: item.time, scope: `${item.productName} / ${item.version}`, risk: item.risk, downstream: item.downstream })),
      routing: routings.map((item) => ({ id: item.id, name: item.name, version: item.version, source: item.source, status: item.status, ref: `${item.steps} / ${item.sop}`, impact: `${orders.find((order) => order.productCode === item.productCode)?.id || "待关联工单"} 引用`, owner: item.owner, time: item.time, scope: `${item.productCode} / ${item.sop}`, risk: item.risk, downstream: item.downstream })),
      stations: stations.map((item) => ({ id: item.id, name: item.name, version: item.line, source: "MES 维护 + 设备/终端状态", status: item.status, ref: `${item.equipment} / ${item.terminal}`, impact: `${item.operation} 开工准入`, owner: item.owner, time: item.time, scope: `${item.operation} / ${item.line}`, risk: item.risk, downstream: item.downstream })),
      workshops: workshops.map((item) => ({ id: item.id, name: item.name, version: item.shifts, source: item.source, status: item.status, ref: item.capacity, impact: item.risk, owner: item.owner, time: item.time, scope: item.name, risk: item.risk, downstream: item.downstream })),
      partners: partners.map((item) => ({ id: item.id, name: item.name, version: item.level, source: item.source, status: item.status, ref: item.rule, impact: item.risk, owner: item.owner, time: item.time, scope: `${item.type} / ${item.name}`, risk: item.risk, downstream: item.downstream })),
    };
  }

  function lineStation(line) {
    return stations.find((item) => item.line === line) || stations[0];
  }

  function materialById(id) {
    return materials.find((item) => item.id === id) || materials[0];
  }

  function orderContext(order, index = 0) {
    const product = productByCode(order.productCode);
    const bom = bomByProduct(order.productCode);
    const routing = routingByProduct(order.productCode);
    const station = lineStation(order.line);
    const bomMaterial = getBomMaterials(order.productCode, order.qty).find((item) => item.gap > 0) || getBomMaterials(order.productCode, order.qty)[0];
    const material = materialById(bomMaterial?.materialNo);
    const dispatch = `D-${String(index + 1).padStart(3, "0")}`;
    const lot = `LOT-${order.productCode}-${order.id.slice(-4)}`;
    const snPrefix = `SN-${order.productCode}`;
    const status = order.status;
    const shortRisk = order.materialGap || product?.risk || "齐套";
    return { order, product, bom, routing, station, material, bomMaterial, dispatch, lot, snPrefix, status, shortRisk };
  }

  function toMaterialRows() {
    const contexts = orders.map(orderContext);
    return {
      requirements: contexts.map((ctx, index) => ({ id: `MR-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batchRule, qty: ctx.bomMaterial.need, available: ctx.bomMaterial.available, gap: ctx.bomMaterial.gap, time: `06-2${index} ${10 + index}:30`, status: ctx.bomMaterial.gap > 0 ? "缺口待处理" : "已锁库", owner: "物料员 吴琳", source: `生产排程 + ${ctx.bom?.id || "制造 BOM"}`, next: ctx.bomMaterial.gap > 0 ? "缺料预警 / 替代评估" : "转领料申请", risk: ctx.shortRisk })),
      picking: contexts.map((ctx, index) => ({ id: `PK-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: Math.min(ctx.bomMaterial.need, ctx.bomMaterial.available), available: ctx.bomMaterial.available, gap: ctx.bomMaterial.gap, time: `06-2${index} ${9 + index}:40`, status: ctx.bomMaterial.gap > 0 ? "异常驳回" : "已出库", owner: "仓管员 梁启", source: `MES 领料指令 ${ctx.order.id}`, next: ctx.bomMaterial.gap > 0 ? "冻结/缺口复核" : "进入配送", risk: ctx.material.risk })),
      delivery: contexts.map((ctx, index) => ({ id: `DL-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: ctx.bomMaterial.available, available: ctx.bomMaterial.available, gap: ctx.bomMaterial.gap, time: ctx.bomMaterial.gap > 0 ? "计划待确认 / 实际 --" : `计划 10:${index}0 / 实际 10:${index}6`, status: ctx.bomMaterial.gap > 0 ? "异常停滞" : "已签收", owner: "配送员 罗峰", source: "WMS 出库 + 模拟 PDA 签收", next: `${ctx.station.id} 线边签收`, risk: ctx.shortRisk })),
      inventory: contexts.map((ctx, index) => ({ id: `LS-${ctx.order.line.replace("Line-", "")}-${String(index + 1).padStart(2, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.id, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: ctx.bomMaterial.available, available: Math.max(0, ctx.bomMaterial.available - ctx.order.done), gap: ctx.bomMaterial.gap, time: "有效期 2026-12-31", status: ctx.material.status.includes("冻结") ? "冻结" : ctx.bomMaterial.gap > 0 ? "低水位" : "可投料", owner: "线边库管 吴琳", source: "WMS 出库 + 线边库 PDA 回执", next: ctx.bomMaterial.gap > 0 ? "触发补料" : "投料确认", risk: ctx.material.risk })),
      feeding: contexts.map((ctx, index) => ({ id: `FD-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.id, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: Math.min(ctx.order.done, ctx.bomMaterial.available), available: ctx.bomMaterial.available, gap: ctx.bomMaterial.gap, time: `${10 + index}:58`, status: ctx.material.status.includes("冻结") ? "已拦截" : ctx.bomMaterial.gap > 0 ? "待投料" : "已放行", owner: "操作员 刘洋", source: "模拟扫码枪批次回传", next: "批次谱系追溯", risk: ctx.material.status.includes("冻结") ? "冻结批次不可投料" : ctx.material.risk })),
      returns: contexts.map((ctx, index) => ({ id: `RT-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: Math.max(0, ctx.bomMaterial.available - ctx.order.done), available: Math.max(0, ctx.bomMaterial.available - ctx.order.done), gap: ctx.bomMaterial.gap, time: `${15 + index}:10`, status: ctx.bomMaterial.gap > 0 ? "冻结待退" : "待签收", owner: "仓管员 谢然", source: `投料记录 ${ctx.order.id}`, next: "模拟 WMS 入库", risk: ctx.material.risk })),
      shortage: contexts.filter((ctx) => ctx.bomMaterial.gap > 0 || ctx.order.risk !== "正常").map((ctx, index) => ({ id: `SA-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, material: ctx.material.name, materialNo: ctx.material.id, batch: ctx.material.batch, qty: ctx.bomMaterial.gap, available: ctx.bomMaterial.available, gap: ctx.bomMaterial.gap, time: ctx.bomMaterial.gap > 0 ? "预计班内断料" : "观察中", status: ctx.bomMaterial.gap > 0 ? "已升级" : "观察中", owner: "物料异常协调员 何敏", source: "齐套检查 + 线边消耗", next: ctx.bomMaterial.gap > 0 ? "调拨 / 替代 / 计划调整" : "持续监控", risk: ctx.shortRisk })),
    };
  }

  function toBarcodeRows() {
    const contexts = orders.map(orderContext);
    const labelMaterial = (ctx) => materialById(ctx.bomMaterial.materialNo);
    return {
      batch: contexts.map((ctx) => ({ id: ctx.lot, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: ctx.station.operation, codeType: "生产批次", template: `RULE-LOT-${ctx.order.productCode}`, qty: ctx.order.qty, range: `${ctx.snPrefix}-000001-${String(ctx.order.qty).padStart(6, "0")}`, status: ctx.order.status === "待排程" ? "待启用" : "已下发", source: `${ctx.dispatch} + ${ctx.bom?.id || "BOM"}`, owner: "条码员 林澈", next: "产品序列号", risk: `${ctx.routing?.id || "工艺路线"} / ${ctx.product?.labelTemplate || "标签模板"}` })),
      serial: contexts.map((ctx) => ({ id: `${ctx.snPrefix}-000001-${String(ctx.order.qty).padStart(6, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: ctx.routing?.steps || ctx.station.operation, codeType: "产品 SN", template: `RULE-SN-${ctx.order.productCode}`, qty: ctx.order.qty, range: `已绑定 ${ctx.order.done} / ${ctx.order.qty}`, status: ctx.order.done > 0 ? "部分绑定" : "待绑定", source: `生产批次 ${ctx.lot}`, owner: "工位终端", next: "过程记录 / FQC", risk: ctx.product?.risk || "" })),
      material: contexts.map((ctx) => { const mat = labelMaterial(ctx); return { id: `ML-${mat.batch}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: mat.name, operation: `${ctx.station.operation} 投料`, codeType: "物料标签", template: "TPL-MAT-IQC-V4", qty: ctx.bomMaterial.available, range: mat.batch, status: mat.status.includes("冻结") ? "冻结标签" : "线边已签收", source: `${mat.source} / ${mat.supplierName}`, owner: mat.owner, next: "投料确认", risk: mat.risk }; }),
      finished: contexts.map((ctx) => ({ id: `FG-LBL-${ctx.order.productCode}-${ctx.order.id.slice(-4)}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: "FQC 放行", codeType: "成品标签", template: ctx.product?.labelTemplate || "TPL-FG", qty: ctx.order.done, range: `FG-${ctx.order.productCode}-${ctx.order.id.slice(-4)}`, status: ctx.order.done > 0 ? "待 FQC 放行" : "待生产", source: "FQC 抽检任务 + 客户标签规则", owner: "成品标签员 许宁", next: "成品入库", risk: ctx.product?.inspection || "" })),
      package: contexts.map((ctx) => ({ id: `BOX-${ctx.order.productCode}-${ctx.order.id.slice(-4)}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: "包装入库", codeType: "箱码", template: `RULE-BOX-${ctx.order.customerId || "CUS"}`, qty: Math.max(1, Math.ceil(ctx.order.done / 20)), range: `${ctx.snPrefix} 已完工段`, status: ctx.order.done > 0 ? "待绑定" : "等待完工", source: "包装派工 + 模拟扫码枪回执", owner: "包装班长 李娟", next: "托盘码 / 入库", risk: ctx.product?.customer || ctx.order.customer })),
      printing: contexts.map((ctx) => ({ id: `PRN-${ctx.order.id.slice(-4)}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: "标签打印", codeType: "批次/成品标签", template: `${ctx.product?.labelTemplate || "TPL-FG"} / Zebra-A01`, qty: 2, range: ctx.lot, status: ctx.product?.status === "已发布" ? "已打印" : "模板待审批", source: "首次打印", owner: "打印管理员 戴然", next: "工位签收", risk: ctx.product?.risk || "" })),
      reprint: contexts.map((ctx) => ({ id: `RP-${ctx.order.id.slice(-4)}`, order: ctx.order.id, dispatch: ctx.dispatch, line: ctx.order.line, product: ctx.order.product, operation: "标签补打", codeType: "补打申请", template: ctx.product?.labelTemplate || "TPL-FG", qty: 1, range: `FG-LBL-${ctx.order.productCode}`, status: ctx.product?.status === "已发布" ? "待审批" : "权限拦截", source: "标签破损 / 模拟审批回执", owner: "标签审批员 沈清", next: "审批后打印", risk: "补打需作废原标签并保留原因" })),
    };
  }

  function toQualityRows() {
    const contexts = orders.map(orderContext);
    return {
      upstream: {
        incoming: materials.map((mat, index) => ({ id: `IQC-${String(index + 1).padStart(4, "0")}`, order: `ASN-${mat.batch}`, dispatch: mat.supplier, operation: "WMS 收货暂存区", line: `IQC-${index % 2 ? "B" : "A"}区`, product: mat.name, materialNo: mat.id, batch: mat.batch, supplier: mat.supplierName, sample: mat.iqc, checks: `${mat.type} / ${mat.batchRule}`, status: mat.status.includes("冻结") ? "冻结待 MRB" : "已放行", action: mat.status.includes("冻结") ? "WMS 冻结 / 禁止投产" : "WMS 解冻 / 标签可用", owner: mat.owner, time: `2026-06-20 ${8 + index}:42`, source: mat.source, result: mat.status.includes("冻结") ? "抽样异常，待复判" : "抽样合格，电子签核", next: mat.downstream, risk: mat.risk })),
        firstArticle: contexts.map((ctx, index) => ({ id: `FAI-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, product: ctx.order.product, materialNo: ctx.order.productCode, batch: ctx.lot, supplier: "内部工序", sample: "首件 5 台", checks: ctx.product?.inspection || "FAI/IPQC/FQC", status: ctx.product?.status === "已发布" ? "已放行" : "等待签核", action: ctx.product?.status === "已发布" ? "派工批量生产已解锁" : "批量生产暂停", owner: "首件检验员 赵宁", time: `2026-06-20 ${9 + index}:00`, source: `扫码开工 + ${ctx.routing?.sop || "SOP"}`, result: ctx.product?.status === "已发布" ? "首件合格" : ctx.product?.risk || "待复核", next: "放行后进入批量生产", risk: ctx.product?.risk || "" })),
        patrol: contexts.map((ctx, index) => ({ id: `IPQC-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, product: ctx.order.product, materialNo: ctx.order.productCode, batch: ctx.lot, supplier: "内部工序", sample: "每 2 小时 / 抽 10 台", checks: "外观、参数、工位状态", status: ctx.order.risk === "质量" ? "已生成 NCR" : "待执行", action: ctx.order.risk === "质量" ? "建议质量复核" : "到点提醒 IPQC", owner: "IPQC 王珊", time: `2026-06-20 ${10 + index}:30`, source: "巡检计划 + 工位终端回执", result: ctx.order.risk === "质量" ? "发现异常并生成 NCR" : "等待模拟 PDA 巡检记录", next: "合格写入工序履历，异常生成 NCR", risk: ctx.order.risk })),
      },
      downstream: {
        process: contexts.map((ctx, index) => ({ id: `PQC-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, product: ctx.order.product, sn: `${ctx.snPrefix}-${String(index + 1).padStart(6, "0")}`, batch: ctx.lot, source: "测试台 API + 工位 HMI", equipment: ctx.station.equipment, parameter: "关键参数；SPC 趋势", status: ctx.order.risk === "质量" ? "超限拦截" : "合格放行", action: ctx.order.risk === "质量" ? "进入 NCR/MRB" : "允许报工", owner: "过程检验员 何洁", result: "过程检验记录", next: "工序报工", risk: ctx.order.risk, materialBatch: ctx.material.batch })),
        final: contexts.map((ctx, index) => ({ id: `FQC-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: "FQC 成品检验", line: ctx.order.line, product: ctx.order.product, sn: `${ctx.snPrefix}-完工段`, batch: ctx.lot, source: "FQC 抽样 + 生产履历", equipment: "FQC-BENCH-01", parameter: ctx.product?.inspection || "FQC", status: ctx.order.done > 0 ? "待放行" : "待完工", action: "检验后生成成品标签", owner: "FQC 检验员 许宁", result: "等待检验结论", next: "成品标签 / 入库", risk: ctx.product?.risk || "", materialBatch: ctx.material.batch })),
        defect: contexts.filter((ctx) => ctx.order.risk !== "正常").map((ctx, index) => ({ id: `NCR-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: ctx.station.operation, line: ctx.order.line, product: ctx.order.product, sn: `${ctx.snPrefix}-待复核`, batch: ctx.lot, source: "质量检验 / 异常中心", equipment: ctx.station.equipment, parameter: ctx.shortRisk, status: "待复判", action: "隔离并发起 MRB", owner: "质量工程师 孟可", result: "待复判", next: "返工评审", risk: ctx.shortRisk, materialBatch: ctx.material.batch })),
        rework: contexts.filter((ctx) => ctx.order.risk !== "正常").map((ctx, index) => ({ id: `MRB-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, operation: "返工评审", line: ctx.order.line, product: ctx.order.product, sn: `${ctx.snPrefix}-影响段`, batch: ctx.lot, source: "NCR/MRB 评审", equipment: ctx.station.equipment, parameter: `责任工位 ${ctx.station.id}；物料 ${ctx.material.id}`, status: "评审中", action: "确认返工路线与复检要求", owner: "质量经理 周妍", result: "等待 MRB 会签", next: "返工派工 / 复检", risk: ctx.shortRisk, materialBatch: ctx.material.batch })),
      },
    };
  }

  function toEquipmentRows() {
    const contexts = orders.map(orderContext);
    const base = contexts.map((ctx, index) => ({ id: `EQ-${String(index + 1).padStart(3, "0")}`, equipment: ctx.station.equipment, equipmentNo: ctx.station.id, line: ctx.order.line, station: ctx.station.name, order: ctx.order.id, dispatch: ctx.dispatch, source: ctx.station.terminal, status: ctx.station.status.includes("负荷") ? "负荷偏高" : ctx.order.risk === "设备" ? "故障待复核" : "运行", statusDetail: ctx.station.risk, owner: ctx.station.owner, risk: ctx.order.risk === "设备" ? "影响开工准入" : ctx.station.risk, next: ctx.station.downstream, oee: ctx.order.oee || 82 + index, duration: `${2 + index}h`, downtime: ctx.order.risk === "设备" ? 35 : 0, trace: `${ctx.order.id} / ${ctx.lot}` }));
    return { status: base, inspection: base, maintenance: base, repair: base, downtime: base, spare: base, efficiency: base };
  }

  function toMonitoringRows() {
    const contexts = orders.map(orderContext);
    const base = contexts.map((ctx, index) => ({ id: `MON-${String(index + 1).padStart(3, "0")}`, primary: ctx.order.product, item: ctx.station.operation, line: ctx.order.line, station: ctx.station.id, equipment: ctx.station.equipment, order: ctx.order.id, dispatch: ctx.dispatch, source: `${ctx.station.terminal} / ${ctx.routing?.sop || "SOP"}`, value: `${ctx.order.done} / ${ctx.order.qty}`, standard: ctx.routing?.steps || "按工艺路线", status: ctx.order.risk === "正常" ? "稳定" : "预警", action: ctx.order.risk === "正常" ? "继续监控" : "联动异常/计划复核", owner: ctx.station.owner, batch: ctx.lot, trace: `${ctx.bom?.id || "BOM"} / ${ctx.material.batch}` }));
    return { output: base, runtime: base, parameters: base, alarms: base, downtime: base, trends: base, board: base };
  }

  function toExceptionRows() {
    const contexts = orders.map(orderContext).filter((ctx) => ctx.order.risk !== "正常");
    const base = contexts.map((ctx, index) => ({ id: `EX-${String(index + 1).padStart(4, "0")}`, type: ctx.order.risk === "缺料" ? "缺料异常" : ctx.order.risk === "质量" ? "质量异常" : ctx.order.risk === "设备" ? "设备异常" : "交期异常", severity: ctx.order.priority, line: ctx.order.line, station: ctx.station.id, order: ctx.order.id, dispatch: ctx.dispatch, source: ctx.order.risk === "缺料" ? "齐套检查" : ctx.station.terminal, status: "待处理", owner: ctx.order.risk === "缺料" ? "物料主管 何敏" : ctx.station.owner, impact: ctx.shortRisk, action: ctx.order.risk === "缺料" ? "调拨 / 替代 / 催料" : "责任人复核并闭环", trace: `${ctx.product?.id || ctx.order.productCode} / ${ctx.material.id}`, sla: "2h" }));
    return { report: base, pending: base, lineStop: base, shortage: base.filter((item) => item.type === "缺料异常"), quality: base.filter((item) => item.type === "质量异常"), equipment: base.filter((item) => item.type === "设备异常"), review: base };
  }

  function toWarehouseRows() {
    const contexts = orders.map(orderContext);
    const base = contexts.map((ctx, index) => ({ id: `WH-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, product: ctx.order.product, operation: ctx.station.operation, station: ctx.station.id, line: ctx.order.line, batch: ctx.lot, qty: ctx.order.done, bad: Math.max(0, Math.round(ctx.order.done * 0.01)), scrap: Math.max(0, Math.round(ctx.order.done * 0.002)), source: "工位 HMI / FQC / WMS 模拟回执", check: ctx.order.done > 0 ? "待完工确认" : "等待生产履历", risk: ctx.shortRisk, status: ctx.order.done > 0 ? "待确认" : "待完工", owner: "完工确认员 王珂", pack: `BOX-${ctx.order.productCode}-${ctx.order.id.slice(-4)}`, location: ctx.order.line === "Line-C" ? "FG-C-01" : "FG-A-01", next: "WMS 入库 / ERP 回传" }));
    return { operation: base, confirmation: base, packaging: base, receipt: base, freeze: base.map((item) => ({ ...item, status: /缺料|质量|资料/.test(item.risk) ? "冻结待复判" : "观察", next: "解冻/隔离复核" })), return: base, sync: base };
  }

  function toTraceRows() {
    const contexts = orders.map(orderContext);
    const base = contexts.map((ctx, index) => ({ id: `TR-${String(index + 1).padStart(4, "0")}`, order: ctx.order.id, dispatch: ctx.dispatch, product: ctx.order.product, customer: ctx.order.customer, line: ctx.order.line, batch: ctx.lot, material: ctx.material.name, type: "产品批次追溯", scope: `${ctx.bom?.id || "BOM"} / ${ctx.routing?.id || "路线"}`, evidence: `${ctx.material.batch} / ${ctx.station.equipment} / ${ctx.product?.labelTemplate || "标签"}`, status: ctx.order.risk === "正常" ? "证据完整" : "待复核", source: "MES 生产履历 + 基础资料", owner: "追溯工程师 许宁", action: ctx.shortRisk, next: "生成客户追溯报告" }));
    return { product: base, batch: base, material: base, production: base, inspection: base, equipment: base, customer: base };
  }

  function toReportRows() {
    return orders.map((order, index) => {
      const ctx = orderContext(order, index);
      return { id: `RPT-${String(index + 1).padStart(3, "0")}`, order: order.id, product: order.product, customer: order.customer, line: order.line, metric: `${order.done} / ${order.qty}`, value: `${Math.round((order.done / order.qty) * 100)}%`, target: "按订单计划", status: order.risk === "正常" ? "达成" : "预警", source: `${ctx.bom?.id || "BOM"} / ${ctx.routing?.id || "路线"}`, owner: order.planner, action: order.materialGap, risk: order.risk };
    });
  }

  function toDemoRows() {
    const quality = toQualityRows();
    return {
      materials: toMaterialRows(),
      barcode: toBarcodeRows(),
      qualityUpstream: quality.upstream,
      qualityDownstream: quality.downstream,
      equipment: toEquipmentRows(),
      monitoring: toMonitoringRows(),
      exceptions: toExceptionRows(),
      warehouse: toWarehouseRows(),
      traceability: toTraceRows(),
      reports: { daily: toReportRows(), yield: toReportRows(), delivery: toReportRows(), equipment: toReportRows(), downtime: toReportRows(), material: toReportRows(), cockpit: toReportRows() },
    };
  }

  return { products, materials, bomHeaders, bomLines, routings, stations, workshops, partners, orders, productByCode, bomByProduct, routingByProduct, getBomMaterials, basicRows: toBasicRows(), demoRows: toDemoRows() };
})();
