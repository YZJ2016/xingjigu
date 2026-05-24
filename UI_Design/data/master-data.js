window.MES_MASTER_DATA = (() => {
  const products = [
    { id: "PRD-TCU-100", code: "TCU-100", name: "智能温控控制器 TCU-100", version: "V3.2", source: "PLM 发布 + ERP 物料", status: "已发布", customer: "A 客户", customerId: "CUS-A", line: "Line-A", bom: "BOM-TCU-100-V3.2", routing: "RT-TCU-100-V2.6", labelTemplate: "TPL-FG-A-V6", inspection: "FAI/IPQC/FQC 已配置", owner: "主数据工程师 赵岚", time: "06-18 09:12", risk: "资料齐套，支持开工准入", downstream: "订单评审、BOM、工艺路线、成品标签、产品追溯" },
    { id: "PRD-GW-240", code: "GW-240", name: "工业网关 GW-240", version: "V2.1", source: "ERP 新增 + PLM 工艺", status: "已发布", customer: "B 客户", customerId: "CUS-B", line: "Line-B", bom: "BOM-GW-240-V2.1", routing: "RT-GW-240-V1.8", labelTemplate: "TPL-FG-B-V3", inspection: "功能测试和 FQC 已配置", owner: "主数据工程师 赵岚", time: "06-18 10:40", risk: "客户优先级高，标签模板已确认", downstream: "生产订单、派工单、箱码托盘码" },
    { id: "PRD-PCM-60", code: "PCM-60", name: "电源控制模块 PCM-60", version: "V1.8", source: "PLM + 客户指定批次", status: "待替代审批", customer: "D 客户", customerId: "CUS-D", line: "Line-B", bom: "BOM-PCM-60-V1.8", routing: "RT-PCM-60-V1.8", labelTemplate: "TPL-FG-D-V2", inspection: "电源老化和 FQC 已配置", owner: "物料主管 何敏", time: "06-18 11:35", risk: "电源芯片指定批次冻结，阻止开工", downstream: "齐套检查、缺料处理、计划调整" },
    { id: "PRD-HMI-70", code: "HMI-70", name: "显示控制面板 HMI-70", version: "V1.0", source: "PLM 首版", status: "待质量确认", customer: "E 客户", customerId: "CUS-E", line: "Line-C", bom: "BOM-HMI-70-V1.0", routing: "RT-HMI-70-V1.0", labelTemplate: "TPL-FG-E-V1", inspection: "FQC 检验要求待审批", owner: "质量工程师 孟可", time: "06-18 14:05", risk: "FQC 检验要求未确认，阻止排程", downstream: "订单评审、生产排程、成品检验" },
    { id: "PRD-SRV-90", code: "SRV-90", name: "伺服驱动板 SRV-90", version: "V1.4", source: "PLM 变更 ECN-2406", status: "影响评估中", customer: "B 客户", customerId: "CUS-B", line: "Line-A", bom: "BOM-SRV-90-V1.4", routing: "RT-SRV-90-V1.4", labelTemplate: "TPL-FG-B-V3", inspection: "老化缩短需质量签核", owner: "工艺工程师 林澈", time: "06-18 15:20", risk: "版本切换会影响在制批次追溯", downstream: "BOM 清单、投料确认、客户追溯报告" },
  ];

  const materials = [
    { id: "MAT-PCB-TCU", name: "PCB 主板", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + IQC 规则", status: "可投料", supplier: "SUP-PCB-01", supplierName: "苏州精密电路", iqc: "AQL II / 关键尺寸", batch: "PCB-L20260608", owner: "物料主数据员 吴琳", time: "06-18 10:05", risk: "批次与 SN 谱系必须绑定", downstream: "物料标签、投料确认、批次追溯" },
    { id: "MAT-SEN-T100", name: "温度传感器", type: "关键外购件", batchRule: "批次必管", source: "ERP 物料 + WMS 库存", status: "可投料", supplier: "SUP-SEN-01", supplierName: "传感器供应商 S-01", iqc: "IQC 合格后可投 / FIFO", batch: "SEN-L20260605", owner: "物料主数据员 吴琳", time: "06-18 09:35", risk: "TCU-100 第二批缺 200 件", downstream: "齐套检查、领料申请、线边库存、投料记录" },
    { id: "MAT-CASE-TOP", name: "外壳上盖", type: "结构件", batchRule: "批次必管", source: "ERP 物料 + WMS 库存", status: "可投料", supplier: "SUP-CASE-01", supplierName: "昆山注塑件厂", iqc: "外观 / 尺寸抽检", batch: "CASE-TOP-L20260612", owner: "物料主数据员 吴琳", time: "06-18 10:18", risk: "装配工序需校验颜色和客户版本", downstream: "用料需求、投料确认、成品追溯" },
    { id: "MAT-CASE-BOT", name: "外壳下盖", type: "结构件", batchRule: "批次必管", source: "ERP 物料 + WMS 库存", status: "可投料", supplier: "SUP-CASE-01", supplierName: "昆山注塑件厂", iqc: "外观 / 尺寸抽检", batch: "CASE-BOT-L20260612", owner: "物料主数据员 吴琳", time: "06-18 10:20", risk: "需与外壳上盖成套追溯", downstream: "用料需求、投料确认、成品追溯" },
    { id: "MAT-DISPLAY-24", name: "显示屏", type: "外购显示模块", batchRule: "批次必管", source: "ERP 物料 + QMS 规则", status: "可投料", supplier: "SUP-DSP-03", supplierName: "上海显示模组", iqc: "点亮测试 / 外观", batch: "DSP-L20260610", owner: "质量员 孟可", time: "06-18 10:48", risk: "来料需保留亮点抽检记录", downstream: "来料检验、过程检验、客户报告" },
    { id: "MAT-PWR-IC60", name: "电源芯片", type: "客户指定料", batchRule: "客户指定批次", source: "ERP 物料 + QMS 冻结", status: "冻结待复核", supplier: "SUP-PWR-02", supplierName: "电源芯片供应商 P-02", iqc: "MRB 复判后可投", batch: "PWRIC-L20260602", owner: "质量员 孟可", time: "06-18 11:18", risk: "冻结批次不可投料，需替代料审批", downstream: "缺料处理、来料检验、库存冻结" },
    { id: "MAT-SCREW-M3", name: "螺丝 M3", type: "标准件", batchRule: "可选批次", source: "ERP 物料 + WMS 库存", status: "可投料", supplier: "SUP-STD-01", supplierName: "标准件供应商 S-01", iqc: "尺寸抽检 / 免批次强控", batch: "SCR-L20260611", owner: "物料主数据员 吴琳", time: "06-18 10:52", risk: "按工单标准用量核销，异常超耗需复核", downstream: "用料需求、投料确认、物料损耗" },
    { id: "MAT-BOX-A", name: "客户 A 包装盒", type: "包装材料", batchRule: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "可投料", supplier: "SUP-PKG-01", supplierName: "包装供应商 P-01", iqc: "箱唛版本核对", batch: "BOXA-L20260614", owner: "包装工程师 李娟", time: "06-18 13:50", risk: "标签模板变更需重新复核", downstream: "成品标签、包装作业、余料退回" },
    { id: "MAT-PCB-GW", name: "网关控制板", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + IQC 规则", status: "可投料", supplier: "SUP-PCB-01", supplierName: "苏州精密电路", iqc: "AQL II / 程序版本核对", batch: "GWPCB-L20260608", owner: "物料主数据员 吴琳", time: "06-18 10:58", risk: "需与烧录程序版本绑定", downstream: "BOM、投料确认、产品追溯" },
    { id: "MAT-RES-10K", name: "10K 电阻卷料", type: "电子标准料", batchRule: "卷料批次", source: "ERP 物料 + WMS 库存", status: "可投料", supplier: "SUP-ELE-02", supplierName: "电子料供应商 E-02", iqc: "阻值抽检 / 卷料标签", batch: "RES10K-L20260609", owner: "物料主数据员 吴琳", time: "06-18 11:02", risk: "替代料已批准，需保留替代审批号", downstream: "BOM、SMT 投料、防错追溯" },
    { id: "MAT-BOX-B", name: "客户 B 包装盒", type: "包装材料", batchRule: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "可投料", supplier: "SUP-PKG-01", supplierName: "包装供应商 P-01", iqc: "箱唛版本核对", batch: "BOXB-L20260614", owner: "包装工程师 李娟", time: "06-18 13:54", risk: "客户 B 标签模板需按订单版本打印", downstream: "成品标签、包装作业、客户追溯报告" },
    { id: "MAT-HMI-PCB", name: "HMI 控制板", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + IQC 规则", status: "可投料", supplier: "SUP-PCB-01", supplierName: "苏州精密电路", iqc: "AQL II / 程序版本核对", batch: "HMIPCB-L20260613", owner: "物料主数据员 吴琳", time: "06-18 14:10", risk: "首版产品需保留程序版本追溯", downstream: "BOM、装配投料、产品追溯" },
    { id: "MAT-DISPLAY-70", name: "7 寸显示屏", type: "外购显示模块", batchRule: "批次必管", source: "ERP 物料 + QMS 规则", status: "待IQC放行", supplier: "SUP-DSP-03", supplierName: "上海显示模组", iqc: "点亮测试 / 外观", batch: "DSP70-L20260613", owner: "质量员 孟可", time: "06-18 14:12", risk: "检验规范待签核前只允许试产评估", downstream: "来料检验、装配投料、成品检验" },
    { id: "MAT-BOX-E", name: "客户 E 包装盒", type: "包装材料", batchRule: "按客户标签版本", source: "ERP 物料 + 客户模板", status: "待IQC放行", supplier: "SUP-PKG-01", supplierName: "包装供应商 P-01", iqc: "箱唛版本核对", batch: "BOXE-L20260614", owner: "包装工程师 李娟", time: "06-18 14:15", risk: "客户 E 标签模板待质量确认后放行", downstream: "成品标签、包装作业、客户追溯报告" },
    { id: "MAT-SRV-PCB", name: "伺服驱动 PCB", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + IQC 规则", status: "可投料", supplier: "SUP-PCB-01", supplierName: "苏州精密电路", iqc: "AQL II / 老化批次核对", batch: "SRVPCB-L20260615", owner: "物料主数据员 吴琳", time: "06-18 15:05", risk: "版本切换时需锁定旧版在制批次", downstream: "BOM、SMT 投料、客户追溯报告" },
    { id: "MAT-DRV-IC", name: "驱动芯片", type: "关键电子料", batchRule: "批次必管", source: "ERP 物料 + QMS 规则", status: "替代料评估中", supplier: "SUP-ELE-03", supplierName: "驱动芯片供应商 D-03", iqc: "功能抽检 / 批次 COA", batch: "DRVIC-L20260615", owner: "质量员 孟可", time: "06-18 15:08", risk: "替代料评估中，未放行前不可混用", downstream: "BOM、投料确认、客户追溯报告" },
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
      { materialNo: "MAT-PCB-TCU", name: "PCB 主板", needPer: 1, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-WS-01", usageRule: "1 PCS/台", lossRate: "0.8%", batchControl: "批次必扫", antiError: "料号 + 批次 + Feeder 位校验", available: 1080, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-SEN-T100", name: "温度传感器", needPer: 1, unit: "PCS", operation: "20 DIP 插件", station: "DIP-A-02", usageRule: "1 PCS/台", lossRate: "1.2%", batchControl: "批次必扫", antiError: "批次/IQC/线边库位校验", available: 800, transit: 0, eta: "06-21 14:00", substitute: "可评估 SEN-T100B" },
      { materialNo: "MAT-CASE-TOP", name: "外壳上盖", needPer: 1, unit: "PCS", operation: "40 整机装配", station: "ASM-A-01", usageRule: "1 PCS/台", lossRate: "1.0%", batchControl: "批次必扫", antiError: "颜色 + 客户版本校验", available: 1080, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-CASE-BOT", name: "外壳下盖", needPer: 1, unit: "PCS", operation: "40 整机装配", station: "ASM-A-01", usageRule: "1 PCS/台", lossRate: "1.0%", batchControl: "批次必扫", antiError: "结构件批次 + 成套关系校验", available: 1050, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-DISPLAY-24", name: "显示屏", needPer: 1, unit: "PCS", operation: "40 整机装配", station: "ASM-A-01", usageRule: "1 PCS/台", lossRate: "0.6%", batchControl: "批次必扫", antiError: "点亮测试记录 + 批次校验", available: 1020, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-SCREW-M3", name: "螺丝 M3", needPer: 4, unit: "PCS", operation: "40 整机装配", station: "ASM-A-01", usageRule: "4 PCS/台", lossRate: "2.0%", batchControl: "可选批次", antiError: "标准件用量核销", available: 5200, transit: 0, eta: "库存可用", substitute: "同规格 M3-08" },
      { materialNo: "MAT-BOX-A", name: "客户 A 包装盒", needPer: 1, unit: "PCS", operation: "80 包装", station: "PACK-A-01", usageRule: "1 PCS/台", lossRate: "0.5%", batchControl: "批次必扫", antiError: "客户标签版本 + 包装工位校验", available: 1060, transit: 0, eta: "库存可用", substitute: "无" },
    ],
    "BOM-GW-240-V2.1": [
      { materialNo: "MAT-PCB-GW", name: "网关控制板", needPer: 1, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-B-01", usageRule: "1 PCS/台", lossRate: "0.8%", batchControl: "批次必扫", antiError: "料号 + 批次 + 程序版本校验", available: 680, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-RES-10K", name: "10K 电阻卷料", needPer: 6, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-B-01", usageRule: "6 PCS/台", lossRate: "1.8%", batchControl: "卷料批次", antiError: "Feeder 位 + 替代料放行校验", available: 4200, transit: 0, eta: "库存可用", substitute: "MAT-RES-10K-B 已批准" },
      { materialNo: "MAT-BOX-B", name: "客户 B 包装盒", needPer: 1, unit: "PCS", operation: "50 包装", station: "PACK-B-01", usageRule: "1 PCS/台", lossRate: "0.5%", batchControl: "批次必扫", antiError: "客户标签模板 + 箱码规则校验", available: 720, transit: 0, eta: "库存可用", substitute: "无" },
    ],
    "BOM-PCM-60-V1.8": [
      { materialNo: "MAT-PCB-TCU", name: "PCB 主板", needPer: 1, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-WS-01", usageRule: "1 PCS/台", lossRate: "0.8%", batchControl: "批次必扫", antiError: "料号 + 批次 + Feeder 位校验", available: 980, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-PWR-IC60", name: "电源芯片", needPer: 1, unit: "PCS", operation: "20 DIP 插件", station: "DIP-B-01", usageRule: "1 PCS/台", lossRate: "1.5%", batchControl: "客户指定批次", antiError: "指定批次 + MRB 放行校验", available: 740, transit: 0, eta: "待 MRB 复判", substitute: "PWR-IC60B 待审批" },
      { materialNo: "MAT-CASE-TOP", name: "外壳上盖", needPer: 1, unit: "PCS", operation: "40 整机装配", station: "ASM-B-01", usageRule: "1 PCS/台", lossRate: "1.0%", batchControl: "批次必扫", antiError: "颜色 + 客户版本校验", available: 920, transit: 0, eta: "库存可用", substitute: "无" },
    ],
    "BOM-HMI-70-V1.0": [
      { materialNo: "MAT-HMI-PCB", name: "HMI 控制板", needPer: 1, unit: "PCS", operation: "10 装配", station: "ASM-C-01", usageRule: "1 PCS/台", lossRate: "0.8%", batchControl: "批次必扫", antiError: "料号 + 批次 + 程序版本校验", available: 1060, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-DISPLAY-70", name: "7 寸显示屏", needPer: 1, unit: "PCS", operation: "10 装配", station: "ASM-C-01", usageRule: "1 PCS/台", lossRate: "0.7%", batchControl: "批次必扫", antiError: "点亮测试记录待质量确认", available: 1040, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-BOX-E", name: "客户 E 包装盒", needPer: 1, unit: "PCS", operation: "40 包装", station: "PACK-C-02", usageRule: "1 PCS/台", lossRate: "0.5%", batchControl: "批次必扫", antiError: "客户标签模板待确认", available: 1080, transit: 0, eta: "库存可用", substitute: "无" },
    ],
    "BOM-SRV-90-V1.4": [
      { materialNo: "MAT-SRV-PCB", name: "伺服驱动 PCB", needPer: 1, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-WS-01", usageRule: "1 PCS/台", lossRate: "0.9%", batchControl: "批次必扫", antiError: "料号 + 批次 + 旧版锁定校验", available: 1080, transit: 0, eta: "库存可用", substitute: "无" },
      { materialNo: "MAT-DRV-IC", name: "驱动芯片", needPer: 1, unit: "PCS", operation: "10 SMT 贴片", station: "SMT-WS-01", usageRule: "1 PCS/台", lossRate: "1.2%", batchControl: "批次必扫", antiError: "替代料影响评估未完成", available: 1040, transit: 0, eta: "库存可用", substitute: "DRV-IC-B 评估中" },
      { materialNo: "MAT-BOX-B", name: "客户 B 包装盒", needPer: 1, unit: "PCS", operation: "40 FQC 后包装", station: "PACK-A-01", usageRule: "1 PCS/台", lossRate: "0.5%", batchControl: "批次必扫", antiError: "客户标签模板 + 版本切换校验", available: 1100, transit: 0, eta: "库存可用", substitute: "无" },
    ],
  };

  const routings = [
    { id: "RT-TCU-100-V2.6", productCode: "TCU-100", name: "TCU-100 标准路线", version: "V2.6", source: "PLM 工艺发布", status: "已发布", steps: "SMT>DIP>烧录>装配>测试>老化>FQC>包装", sop: "SOP-TCU-2.6", owner: "工艺工程师 林澈", time: "06-18 09:58", risk: "老化测试为瓶颈资源", downstream: "生产排程、工序任务、工艺指导、检验履历" },
    { id: "RT-GW-240-V1.8", productCode: "GW-240", name: "GW-240 标准路线", version: "V1.8", source: "PLM 工艺发布", status: "已发布", steps: "SMT>烧录>功能测试>FQC>包装", sop: "SOP-GW-1.8", owner: "工艺工程师 林澈", time: "06-18 10:44", risk: "功能测试工位排队", downstream: "产能负荷、过程检验、报工" },
    { id: "RT-HMI-70-V1.0", productCode: "HMI-70", name: "HMI-70 首版路线", version: "V1.0", source: "PLM 首版", status: "待现场签收", steps: "装配>测试>FQC>包装", sop: "SOP-HMI-1.0", owner: "车间工艺员 许诺", time: "06-18 14:22", risk: "终端 SOP 未签收，开工检查拦截", downstream: "SOP 查看、开工检查、成品检验" },
    { id: "RT-SRV-90-V1.4", productCode: "SRV-90", name: "SRV-90 加急路线", version: "V1.4", source: "PLM ECN-2406", status: "影响评估中", steps: "SMT>测试>老化>FQC", sop: "SOP-SRV-1.4", owner: "质量工程师 孟可", time: "06-18 15:42", risk: "检验放行条件未完成", downstream: "首件检验、计划调整、质量放行" },
  ];

  const stations = [
    { id: "SMT-WS-01", name: "SMT 贴片工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "SMT 贴片", equipment: "SMT-01", equipmentStatus: "待生产前点检", terminal: "工位终端 + 扫码枪 + Feeder 绑定", qualification: "SMT 贴片资质 / 料站绑定授权", accessRules: ["派工单 D-001 已下达", "人员具备 SMT 贴片资质", "SMT-01 完成班前点检", "SOP-TCU100-V2026.06 已签收", "PCB 主板批次齐套", "前序状态：首站"], dataCapture: "模拟扫码枪开工、Feeder 料站绑定、HMI 过程参数回传", display: "任务卡、电子 SOP、Feeder 表、物料清单、首件检验提醒、异常呼叫", trace: "工单、批次、工序、设备、人员、Feeder 位和物料批次写入 SMT 履历", status: "工位启用", owner: "车间工艺员 许诺", time: "06-18 08:55", risk: "需校验首件放行和料站绑定", downstream: "扫码开工、投料确认、过程记录、设备履历" },
    { id: "DIP-A-02", name: "DIP 插件工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "DIP 插件", equipment: "DIP-Line-A", equipmentStatus: "可用", terminal: "工牌 NFC + HMI + 周转箱扫码", qualification: "DIP 插件资质 / 班组接单权限", accessRules: ["D-002 派工已生成", "上道 SMT 批次已报工", "操作员工牌/NFC 有效", "插件物料齐套", "DIP-Line-A 线体可用", "转序接收规则已配置"], dataCapture: "模拟工牌/NFC 接单、HMI 接收 WIP、扫码确认周转箱", display: "班组任务、上道批次、插件清单、SOP、工序报工入口、交接提示", trace: "记录接单人员、接收时间、上道批次、工位和转序结果", status: "待转序接收", owner: "班组长 郑峰", time: "06-18 09:18", risk: "等待 SMT 批次转入", downstream: "班组任务、工序报工、交接班" },
    { id: "BURN-A-01", name: "程序烧录工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "程序烧录", equipment: "Burn-01", equipmentStatus: "可用", terminal: "烧录设备 API + SN 扫码枪", qualification: "烧录作业资质 / 程序版本确认", accessRules: ["D-003 派工已下达", "前序 DIP 已完成", "SN 规则已启用", "烧录程序版本已发布", "烧录治具点检有效", "不允许跳工序"], dataCapture: "模拟烧录设备结果回传、SN 与程序版本绑定", display: "SN 扫描、程序版本、烧录结果、失败复测入口、异常代码", trace: "SN、程序版本、设备编号、治具编号、烧录结果和时间戳入履历", status: "工位启用", owner: "工艺工程师 林澈", time: "06-18 09:26", risk: "需确认程序版本与 TCU-100 批次一致", downstream: "程序烧录、过程记录、SN 追溯" },
    { id: "ASM-A-01", name: "整机装配工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "整机装配", equipment: "Assembly-A", equipmentStatus: "可用", terminal: "PDA + 工位终端 + 扭矩工具", qualification: "装配资质 / 扭矩工具使用授权", accessRules: ["D-004 派工已下达", "烧录工序已完成", "外壳与显示屏批次齐套", "扭矩工具校验有效", "装配 SOP 已签收", "关键部件需绑定 SN"], dataCapture: "模拟 PDA 关键部件绑定、扭矩工具结果回传、工位终端过程确认", display: "装配步骤、关键部件条码、扭矩标准、物料清单、异常呼叫", trace: "SN 绑定外壳、显示屏、人员、扭矩结果和装配时间", status: "工位启用", owner: "装配班长 刘洋", time: "06-18 09:34", risk: "需校验关键部件批次和扭矩工具有效期", downstream: "装配过程记录、功能测试、生产履历" },
    { id: "TEST-A-01", name: "功能测试工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "功能测试", equipment: "Test-A", equipmentStatus: "可用", terminal: "测试台 API + 工位 HMI", qualification: "功能测试资质", accessRules: ["D-005 派工已下达", "装配工序已完成", "测试程序版本已发布", "测试台状态可用", "参数规格已生效", "不良代码字典已配置"], dataCapture: "模拟测试台 API 回传测试结果、参数曲线和不良代码", display: "测试项目、上下限、实时结果、复测入口、SPC 预警", trace: "SN、测试程序、设备、参数、结果、不良代码和测试人员入履历", status: "工位启用", owner: "测试工程师 周启", time: "06-18 09:42", risk: "需确认测试程序和参数规格为 TCU-100 当前版本", downstream: "过程参数、过程检验、设备效率" },
    { id: "AGING-A-01", name: "老化测试工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "老化测试", equipment: "Aging-Room-1", equipmentStatus: "容量可用", terminal: "老化房 HMI + 温度曲线采集", qualification: "老化房操作资质 / 设备员复核", accessRules: ["D-006 派工已下达", "功能测试合格", "老化房容量满足 800 台", "老化曲线规格已生效", "进出房扫码规则已配置", "异常温度报警可回传"], dataCapture: "模拟老化房 HMI 进出房、温度曲线、时长和报警回传", display: "老化批次、进出房时间、温度曲线、剩余时长、报警状态", trace: "SN/批次、老化房、温度曲线、时长、报警和设备员确认入履历", status: "工位启用", owner: "设备员 赵宁", time: "06-18 09:50", risk: "老化房为瓶颈资源，需监控容量和时长", downstream: "老化过程记录、FQC、设备履历" },
    { id: "QC-FINAL", name: "FQC 成品检验位", factory: "华东一厂", workshop: "电子装配车间", line: "共用资源", operation: "FQC 成品检验", equipment: "QC-Final", equipmentStatus: "可用", terminal: "QMS 抽样台 + 检验终端", qualification: "FQC 检验资质", accessRules: ["D-007 派工已下达", "老化测试已完成", "FQC 检验计划已生效", "检验员资质有效", "不良代码字典已配置", "NCR/MRB 入口可用"], dataCapture: "模拟检验终端录入抽样结果、缺陷代码和质量放行意见", display: "检验项目、抽样方案、缺陷代码、NCR 入口、放行按钮", trace: "SN、检验项目、结果、不良代码、检验员和放行时间入履历", status: "工位启用", owner: "质量工程师 孟可", time: "06-18 10:02", risk: "检验项目缺失会拦截入库", downstream: "成品检验、完工确认、客户追溯报告" },
    { id: "PACK-A-01", name: "包装入库工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-A", operation: "包装入库", equipment: "Pack-A", equipmentStatus: "可用", terminal: "包装工位终端 + 标签打印机 + 扫码枪", qualification: "包装资质 / 标签打印权限", accessRules: ["D-008 派工已下达", "FQC 已放行", "客户 A 标签模板已发布", "箱码托盘码规则有效", "打印机在线", "包装盒批次可投"], dataCapture: "模拟扫码枪绑定 SN、箱码、托盘码，标签打印机回传打印履历", display: "客户标签模板、箱码托盘码、包装清单、补打审批、入库待办", trace: "SN、箱码、托盘码、客户标签、打印履历、包装人员和入库批次入履历", status: "工位启用", owner: "包装班长 李娟", time: "06-18 10:12", risk: "标签模板变更或打印机离线会拦截包装", downstream: "包装作业、成品标签、成品入库、客户追溯报告" },
    { id: "TEST-B-01", name: "功能测试工位", factory: "华东一厂", workshop: "电子装配车间", line: "Line-B", operation: "功能测试", equipment: "Test-B", equipmentStatus: "负荷偏高", terminal: "测试台 API", qualification: "测试资质", accessRules: ["测试台状态可用", "测试程序有效", "人员资质有效"], dataCapture: "测试台 API 参数自动采集", display: "测试任务、参数上下限、排队任务", trace: "SN、测试台、参数和人员履历", status: "负荷预警", owner: "设备工程师 周启", time: "06-18 10:32", risk: "测试工位排队影响交期", downstream: "过程参数、过程检验、设备效率" },
  ];

  const workshops = [
    { id: "FAC-EAST-01", level: "车间", name: "华东一厂 · 电子装配车间", calendarId: "CAL-WKS-EC-202606", parentCalendar: "工厂工作日历", shifts: "白班 08:00-20:00 / 夜班 20:00-08:00", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "车间基准日历", source: "MES 资源模型", status: "资源启用", capacity: "Line-A / Line-B / Line-C", capacityModel: "车间每日 36h 基准，产线可继承或覆盖", exceptions: "06-22 夜班检修窗口 02:00-04:00", owner: "车间主任 陈伟", time: "06-18 08:20", risk: "车间日历只定义车间可生产窗口，产线仍需独立确认班次、停线和瓶颈资源", downstream: "首页工作台、生产排程、电子看板" },
    { id: "LINE-A", level: "产线", workshop: "电子装配车间", name: "Line-A 电子装配线", calendarId: "CAL-LINE-A-202606", parentCalendar: "CAL-WKS-EC-202606", shifts: "白班 08:00-20:00", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间白班，覆盖老化瓶颈窗口", source: "APS 产能日历", status: "可排程", capacity: "SMT-01 / DIP-Line-A / Burn-01 / Assembly-A / Test-A / Aging-Room-1 / QC-Final / Pack-A", capacityModel: "首批 800 台；老化房 1 为瓶颈资源；线边库 LS-A 已启用", exceptions: "06-21 18:00-20:00 Aging-Room-1 预留保养，不占用装配工位", owner: "计划主管 李敏", time: "06-18 08:35", risk: "TCU-100 首批可排程，但老化测试需锁定容量和时长", downstream: "产能负荷、派工单、设备运行" },
    { id: "LINE-B", level: "产线", workshop: "电子装配车间", name: "Line-B 模块装配线", calendarId: "CAL-LINE-B-202606", parentCalendar: "CAL-WKS-EC-202606", shifts: "白班 08:00-20:00 / 加班 20:00-22:00", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间日历，追加加班窗口", source: "APS + 设备保养计划", status: "负荷预警", capacity: "SMT-B / Test-B / Assembly-B / Pack-B", capacityModel: "测试台 B2 为瓶颈；加班窗口需车间主任确认", exceptions: "06-20 15:00-17:00 Test-B2 故障复测，APS 暂不释放", owner: "计划主管 李敏", time: "06-18 10:16", risk: "功能测试与物料冻结双风险", downstream: "交期预警、缺料处理、设备效率" },
    { id: "LINE-C", level: "产线", workshop: "电子装配车间", name: "Line-C 包装与装配线", calendarId: "CAL-LINE-C-202606", parentCalendar: "CAL-WKS-EC-202606", shifts: "白班 08:00-18:00", calendarRange: "2026-06-20 至 2026-06-23", calendarMode: "继承车间日历，缩短包装线班次", source: "MES 资源模型", status: "可排程", capacity: "Assembly-C / Aging-C / Pack-C", capacityModel: "包装节拍优先，HMI-70 资料未签收时不释放", exceptions: "06-23 16:00-18:00 包装线客户稽核预留", owner: "包装主管 李娟", time: "06-18 13:26", risk: "HMI-70 工艺资料待签收", downstream: "包装作业、成品入库、交接班" },
  ];

  const partners = [
    { id: "CUS-A", name: "A 客户", type: "客户", level: "优先级高", source: "ERP 客户资料", status: "业务生效", qualification: "年度框架订单有效", qualityLevel: "交付优先级 A", rule: "客户标签模板 A-V1.4", supplyScope: "TCU-100 / 客户 A 包装盒", traceRule: "按成品 SN、箱码、托盘码生成客户追溯报告", iqcPolicy: "不适用，客户侧引用 FQC / OQC 要求", owner: "业务资料管理员 沈清", time: "06-18 09:02", risk: "标签补打需审批", downstream: "订单评审、成品标签、客户追溯报告" },
    { id: "CUS-B", name: "B 客户", type: "客户", level: "交期敏感", source: "ERP 客户资料", status: "业务生效", qualification: "重点客户有效", qualityLevel: "OTD 重点监控", rule: "OTD 重点监控 / 客户 B 标签模板", supplyScope: "GW-240 / SRV-90", traceRule: "按订单交付批次生成受控追溯资料", iqcPolicy: "不适用，客户侧引用 OQC 放行策略", owner: "计划主管 李敏", time: "06-18 10:08", risk: "交期压缩需计划调整", downstream: "交期预警、计划调整、交付达成" },
    { id: "CUS-D", name: "D 客户", type: "客户", level: "指定批次", source: "ERP 客户资料 + QMS 客户要求", status: "业务生效", qualification: "专项订单有效", qualityLevel: "客户指定料重点管控", rule: "客户 D 指定批次 / 标签模板 D-V2", supplyScope: "PCM-60 / 客户指定电源芯片批次", traceRule: "客户指定批次、MRB 放行号、成品 SN 必须进入客户追溯报告", iqcPolicy: "引用 FQC / OQC 放行策略，关键料冻结需质量签核", owner: "业务资料管理员 沈清", time: "06-18 11:28", risk: "指定批次冻结会阻止备料和投料", downstream: "订单评审、齐套检查、客户追溯报告" },
    { id: "CUS-E", name: "E 客户", type: "客户", level: "首版试产", source: "ERP 客户资料 + PLM 首版资料", status: "待质量复核", qualification: "试产订单有效", qualityLevel: "首版检验重点监控", rule: "客户 E 标签模板待确认", supplyScope: "HMI-70 / 客户 E 包装盒", traceRule: "首版试产需绑定 FAI、FQC、包装版本和客户签收记录", iqcPolicy: "引用 FAI / FQC 放行策略，检验规范未确认前不允许排程放行", owner: "质量工程师 孟可", time: "06-18 14:18", risk: "检验要求未确认，订单评审需拦截", downstream: "订单评审、生产排程、成品检验" },
    { id: "SUP-SEN-01", name: "传感器供应商 S-01", type: "供应商", level: "A级供应商", source: "QMS 供应商档案", status: "待到货复核", qualification: "合格供方 / 资质有效至 2026-12-31", qualityLevel: "A级 / 近 3 批 IQC 合格率 98.8%", rule: "IQC-SEN-AQL-II / SEN-L20260605", supplyScope: "MAT-SEN-T100 温度传感器；可供 TCU-100、SEN-20", traceRule: "供应商批次 + 来料批次必填，投料后绑定工单、工序和成品 SN", iqcPolicy: "正常检验；逾期到货自动转加严复核", owner: "采购跟单 袁青", time: "06-18 11:10", risk: "到货延迟影响第二批开工", downstream: "来料检验、缺料预警、批次追溯" },
    { id: "SUP-PWR-02", name: "电源芯片供应商 P-02", type: "供应商", level: "质量观察", source: "QMS 冻结规则", status: "冻结待复核", qualification: "临时放行需 MRB 审批", qualityLevel: "观察级 / 近期失效率超阈值", rule: "MRB-PWR-202606 / PWRIC-L20260602", supplyScope: "MAT-PWR-IC60 电源芯片；仅限 PCM-60 指定批次", traceRule: "客户指定批次 + MRB 放行号必填，冻结批次禁止进入投料准入", iqcPolicy: "加严检验；功能项全检后才允许库存解冻", owner: "质量员 孟可", time: "06-18 11:42", risk: "需 MRB 或替代料审批", downstream: "来料检验、库存冻结、缺料处理" },
  ];

  const orders = [
    { id: "MO-202606-0001", productCode: "TCU-100", product: "智能温控控制器 TCU-100", customer: "A 客户", customerId: "CUS-A", qty: 1000, done: 428, due: "2026-06-30", line: "Line-A", status: "已下达", priority: "高", risk: "缺料", quality: 98.7, oee: 86.4, review: "已通过", schedule: "已确认", kit: "缺 200 件", batchPlan: "800 + 200", planner: "周计划", materialGap: "温度传感器缺 200 件" },
    { id: "MO-202606-0013", productCode: "TCU-100", product: "智能温控控制器 TCU-100", customer: "A 客户", customerId: "CUS-A", qty: 300, done: 0, due: "2026-07-05", line: "Line-A", status: "待评审", priority: "中", risk: "资料", quality: 0, oee: 0, review: "待评审", schedule: "未排程", kit: "待检查", batchPlan: "未拆批", planner: "待分配", materialGap: "等待资料复核" },
    { id: "MO-202606-0002", productCode: "GW-240", product: "工业网关 GW-240", customer: "B 客户", customerId: "CUS-B", qty: 600, done: 315, due: "2026-06-28", line: "Line-B", status: "生产中", priority: "高", risk: "交期", quality: 97.9, oee: 83.8, review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "600", planner: "李计划", materialGap: "齐套" },
    { id: "MO-202606-0014", productCode: "GW-240", product: "工业网关 GW-240", customer: "B 客户", customerId: "CUS-B", qty: 480, done: 0, due: "2026-07-04", line: "Line-B", status: "已排程", priority: "中", risk: "正常", quality: 0, oee: 0, review: "已通过", schedule: "已确认", kit: "齐套", batchPlan: "480", planner: "李计划", materialGap: "齐套" },
    { id: "MO-202606-0005", productCode: "PCM-60", product: "电源控制模块 PCM-60", customer: "D 客户", customerId: "CUS-D", qty: 900, done: 120, due: "2026-06-27", line: "Line-B", status: "待备料", priority: "紧急", risk: "缺料", quality: 96.8, oee: 81.6, review: "已通过", schedule: "待调整", kit: "缺 160 件", batchPlan: "500 + 400", planner: "李计划", materialGap: "电源芯片缺 160 件" },
    { id: "MO-202606-0006", productCode: "HMI-70", product: "显示控制面板 HMI-70", customer: "E 客户", customerId: "CUS-E", qty: 500, done: 0, due: "2026-07-01", line: "Line-C", status: "待评审", priority: "中", risk: "资料", quality: 0, oee: 0, review: "待评审", schedule: "未排程", kit: "待检查", batchPlan: "未拆批", planner: "待分配", materialGap: "检验要求未确认" },
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
    const partnerById = (id) => partners.find((partner) => partner.id === id);
    return {
      products: products.map((item) => ({ id: item.id, name: item.name, version: item.version, source: item.source, status: item.status, ref: `${item.bom} / ${item.routing} / ${item.labelTemplate}`, impact: `${orders.find((order) => order.productCode === item.code)?.id || "待关联工单"} ${item.status.includes("待") ? "阻止排程" : "可排程"}`, owner: item.owner, time: item.time, scope: `${item.customer} / ${item.line} / 电子装配`, risk: item.risk, downstream: item.downstream })),
      materials: materials.map((item) => {
        const supplier = partnerById(item.supplier);
        return {
          id: item.id,
          name: item.name,
          materialType: item.type,
          version: item.batchRule,
          source: item.source,
          status: item.status,
          supplierId: item.supplier,
          supplierName: item.supplierName,
          supplierStatus: supplier?.status || "供应商档案待维护",
          supplierQualification: supplier?.qualification || "合格供方关系待维护",
          supplierQualityLevel: supplier?.qualityLevel || "质量等级待维护",
          supplierTraceRule: supplier?.traceRule || "供应商批次规则待维护",
          supplierIqcPolicy: supplier?.iqcPolicy || item.iqc,
          ref: `${item.iqc} / ${item.batch}`,
          impact: item.risk,
          owner: item.owner,
          time: item.time,
          scope: `${item.supplierName} / ${item.type}`,
          risk: item.risk,
          downstream: item.downstream,
        };
      }),
      bom: bomHeaders.map((item) => ({ id: item.id, name: item.productName, version: item.version, source: item.source, status: item.status, ref: `${(bomLines[item.id] || []).length || 3} 个关键物料 / 损耗 ${item.lossRate}`, impact: `${orders.find((order) => order.productCode === item.productCode)?.id || "待关联工单"} ${item.risk}`, owner: item.owner, time: item.time, scope: `${item.productName} / ${item.version}`, risk: item.risk, downstream: item.downstream })),
      routing: routings.map((item) => ({ id: item.id, name: item.name, version: item.version, source: item.source, status: item.status, ref: `${item.steps} / ${item.sop}`, impact: `${orders.find((order) => order.productCode === item.productCode)?.id || "待关联工单"} 引用`, owner: item.owner, time: item.time, scope: `${item.productCode} / ${item.sop}`, risk: item.risk, downstream: item.downstream })),
      stations: stations.map((item) => ({ ...item, version: item.line, source: "MES 维护 + 设备/终端状态", ref: `${item.equipment} / ${item.terminal}`, impact: `${item.operation} 开工准入`, scope: `${item.operation} / ${item.line}` })),
      workshops: workshops.map((item) => ({ ...item, version: item.shifts, ref: item.capacity, impact: item.risk, scope: `${item.level} / ${item.name}`, downstream: item.downstream })),
      partners: partners.map((item) => ({ id: item.id, partnerType: item.type, name: item.name, version: item.level, source: item.source, status: item.status, qualification: item.qualification, qualityLevel: item.qualityLevel, ref: item.rule, supplyScope: item.supplyScope, traceRule: item.traceRule, iqcPolicy: item.iqcPolicy, impact: item.risk, owner: item.owner, time: item.time, scope: `${item.type} / ${item.name}`, risk: item.risk, downstream: item.downstream })),
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

  const toolingCalibrationOqcCapaRows = {
    equipment: {
      tooling: [
        { id: "MD-TOOL-JIG-GW240", equipment: "GW-240 功能测试治具", equipmentNo: "JIG-GW240-02", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "主数据工装台账 + 模拟扫码绑定", status: "校准到期", statusDetail: "测试治具 / 功能测试 / 寿命 29600/30000 次", duration: "校准到期 2026-06-20", oee: 0, downtime: 0, owner: "计量员 许宁", risk: "校准到期，阻止新批次功能测试开工", next: "登记模拟校准回执后恢复准入", trace: "tooling_master MD-TOOL-JIG-GW240" },
      ],
      calibration: [
        { id: "MD-CAL-FQC-BENCH-02", equipment: "FQC 功能检验台 02", equipmentNo: "FQC-BENCH-02", line: "Line-B", station: "FQC-B", order: "MO-202606-0002", dispatch: "PKG-021", source: "主数据计量台账 + 校准证书", status: "校准有效", statusDetail: "测试台 / FQC 与 OQC 引用 / 证书 CERT-FQC-2606", duration: "有效期至 2026-09-18", oee: 0, downtime: 0, owner: "FQC 孟可", risk: "FQC 放行和 OQC 客户报告可引用", next: "出货检验报告引用证书号", trace: "calibration_master CERT-FQC-2606" },
      ],
    },
    qualityDownstream: {
      oqc: [
        { id: "MD-OQC-GW240-001", order: "MO-202606-0002", dispatch: "SHP-GW240-0620A", operation: "出货检验", line: "OQC-A区", product: "工业网关 GW-240", sn: "SN-GW240-000001~000120", batch: "LOT-GW240-20260620-002", equipment: "FQC-BENCH-02 / OQC-SCAN-01", materialBatch: "BOXB-L20260614", source: "FQC + 质量放行 + WMS 出货批次", parameter: "客户 B AQL II 抽 32；标签模板 TPL-FG-B-V3；校准证书 CERT-FQC-2606", status: "待检", action: "复核客户标签、FQC 放行和出货报告证据", owner: "OQC 沈清", time: "2026-06-20 17:10", result: "FQC 待签核，OQC 暂不放行", next: "FQC 和质量放行完成后生成客户追溯报告", risk: "FQC 未放行前禁止出货" },
      ],
    },
    exceptions: {
      review: [
        { id: "MD-CAPA-240620-01", type: "质量 NCR 8D", severity: "高", line: "Line-B", station: "TEST-WS-02", order: "MO-202606-0002", dispatch: "D-024", source: "NCR-240620-07 / JIG-ICT-GW240-02", status: "RCA 待补", sla: "2026-06-20 17:00 前完成 RCA", owner: "质量主管 罗岚", impact: "测试不良 19 件隔离，返工工时预计 2.5 小时", action: "补齐 5Why、测试治具校准复核和复测验证计划", trace: "defect_record NCR-240620-07", rootCause: "待确认测试治具针床接触、程序版本和校准到期影响", correction: "隔离影响 SN 段，切换备用治具并完成复测", prevention: "治具校准到期前 3 天触发开工准入预警", dueAt: "2026-06-20 17:00", verificationResult: "RCA 未签核，禁止关闭 CAPA" },
      ],
    },
  };

  function toDemoRows() {
    const quality = toQualityRows();
    const equipmentRows = toEquipmentRows();
    const qualityDownstreamRows = quality.downstream;
    const exceptionRows = toExceptionRows();
    return {
      materials: toMaterialRows(),
      barcode: toBarcodeRows(),
      qualityUpstream: quality.upstream,
      qualityDownstream: { ...qualityDownstreamRows, ...toolingCalibrationOqcCapaRows.qualityDownstream },
      equipment: { ...equipmentRows, ...toolingCalibrationOqcCapaRows.equipment },
      monitoring: toMonitoringRows(),
      exceptions: { ...exceptionRows, ...toolingCalibrationOqcCapaRows.exceptions },
      warehouse: toWarehouseRows(),
      traceability: toTraceRows(),
      reports: { daily: toReportRows(), yield: toReportRows(), delivery: toReportRows(), equipment: toReportRows(), downtime: toReportRows(), material: toReportRows(), cockpit: toReportRows() },
    };
  }

  return { products, materials, bomHeaders, bomLines, routings, stations, workshops, partners, orders, productByCode, bomByProduct, routingByProduct, getBomMaterials, basicRows: toBasicRows(), demoRows: toDemoRows() };
})();
