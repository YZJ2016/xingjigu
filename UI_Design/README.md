# 星技谷 MES UI Design

## MES 原型运行边界

本原型支持两种真实工厂模式：有 ERP/PLM/WMS/QMS 等外部系统时，MES 以执行快照、接口回执、状态补偿和追溯引用为主；无外部系统时，MES 可以承担订单、客户、供应商、物料、BOM、工艺、库存等受控手工维护，但必须保留来源类型、版本、生效范围、复核/审批、引用影响和审计记录。

后台页面不替代现场终端真实动作。工位开工、投料、过程采集、报工、点检、维修、包装、入库、出库、退料、刷卡/NFC、扫码枪、PDA、HMI、PLC/SCADA 等现场或外部输入，在静态原型中统一表达为模拟回执、状态监控、准入拦截、后台补录、复核放行或追溯查询。

报表和驾驶舱只展示 MES 已校验生产事实，以快照、复核、锁定、下钻和改善项为闭环，不作为财务、销售、采购综合 BI，也不直接改写原始报工、检验、设备、库存或接口事实。

## Step 1 范围

当前版本完成 MES 静态演示工程的第一阶段页面：

- 业务导航菜单
- 面向工厂日常工作的菜单入口
- 业务子菜单
- 多订单首页工作台
- 订单与计划 / 生产订单独立管理页面
- 订单与计划 / 订单评审独立工作台
- 订单与计划 / 生产排程独立工作台
- 订单与计划 / 产能负荷独立分析页面
- 订单与计划 / 交期预警独立处置页面
- 订单与计划 / 计划调整独立工作台
- 订单与计划 / 齐套检查独立工作台
- 派工与生产任务 / 派工单独立工作台
- 派工与生产任务 / 工序任务独立看板
- 派工与生产任务 / 班组任务独立工作台
- 派工与生产任务 / 任务下达独立控制台
- 派工与生产任务 / 任务变更独立工作台
- 派工与生产任务 / 工艺文件与作业指导独立工作台
- 派工与生产任务 / 开工检查独立工作台
- 工位作业 / 工位身份回执独立终端页面
- 工位作业 / 扫码开工独立终端页面
- 工位作业 / 工艺指导独立终端页面
- 工位作业 / 投料确认独立终端页面
- 工位作业 / 过程记录独立终端页面
- 工位作业 / 工序报工独立终端页面
- 工位作业 / 交接班独立终端页面
- 物料与线边库 / 用料需求独立工作台
- 物料与线边库 / 领料申请独立工作台
- 物料与线边库 / 配送进度独立工作台
- 物料与线边库 / 线边库存独立工作台
- 物料与线边库 / 投料记录独立工作台
- 物料与线边库 / 余料退回独立工作台
- 物料与线边库 / 缺料预警独立工作台
- 条码与标签 / 生产批次独立工作台
- 条码与标签 / 产品序列号独立工作台
- 条码与标签 / 物料标签独立工作台
- 条码与标签 / 成品标签独立工作台
- 条码与标签 / 箱码托盘码独立工作台
- 条码与标签 / 标签打印独立工作台
- 条码与标签 / 补打申请独立工作台
- 质量检验 / 来料检验独立工作台
- 质量检验 / 首件检验独立工作台
- 质量检验 / 巡检任务独立工作台
- 质量检验 / 过程检验独立工作台
- 质量检验 / 成品检验独立工作台
- 质量检验 / 质量放行独立工作台
- 质量检验 / 出货检验独立工作台
- 质量检验 / 不良记录独立工作台
- 质量检验 / 返工评审独立工作台
- 设备与保养 / 设备状态独立工作台
- 设备与保养 / 工装夹具独立工作台
- 设备与保养 / 量检具校准独立工作台
- 设备与保养 / 点检计划独立工作台
- 设备与保养 / 保养计划独立工作台
- 设备与保养 / 维修工单独立工作台
- 设备与保养 / 停机记录独立工作台
- 设备与保养 / 备件领用独立工作台
- 设备与保养 / 设备效率独立工作台
- 过程监控 / 实时产量独立工作台
- 过程监控 / 设备运行独立工作台
- 过程监控 / 工艺参数独立工作台
- 过程监控 / 报警记录独立工作台
- 过程监控 / 停机归因独立工作台
- 过程监控 / 过程趋势独立工作台
- 过程监控 / 电子看板独立工作台
- 异常处理 / 异常上报独立工作台
- 异常处理 / 待处理异常独立工作台
- 异常处理 / 停线申请独立工作台
- 异常处理 / 缺料处理独立工作台
- 异常处理 / 质量问题独立工作台
- 异常处理 / 设备故障独立工作台
- 异常处理 / 处理复盘独立工作台
- 完工与入库 / 工序完工复核独立工作台
- 完工与入库 / 完工确认独立工作台
- 完工与入库 / 包装作业独立工作台
- 完工与入库 / 成品入库独立工作台
- 完工与入库 / 库存冻结独立工作台
- 完工与入库 / 退料入库独立工作台
- 完工与入库 / 单据同步独立工作台
- 追溯查询 / 产品追溯独立工作台
- 追溯查询 / 批次追溯独立工作台
- 追溯查询 / 物料去向独立工作台
- 追溯查询 / 生产履历独立工作台
- 追溯查询 / 检验履历独立工作台
- 追溯查询 / 设备履历独立工作台
- 追溯查询 / 客户追溯报告独立工作台
- 报表与看板 / 生产日报独立分析页面
- 报表与看板 / 良率分析独立分析页面
- 报表与看板 / 交付达成独立分析页面
- 报表与看板 / 设备效率独立分析页面
- 报表与看板 / 停机损失独立分析页面
- 报表与看板 / 物料损耗独立分析页面
- 报表与看板 / MES生产指标驾驶舱独立分析页面
- 基础资料 / 产品资料独立工作台，支持按当前产品版本检查下游订单引用、BOM 发布、工艺路线、标签模板、检验规范和准入阻断；当上游 ERP/PLM 推送 MES 失败时，MES 可主动重新同步选择版本的最新产品资料，并跳转到对应业务页面
- 基础资料 / 物料资料独立工作台，支持从物料档案查看合格供应商引用、供应商状态、资质、质量等级、批次追溯规则和来料检验策略；供应商档案本身仍在“客户供应商”中维护
- 基础资料 / BOM 清单独立工作台，支持按当前 BOM 版本查看子项物料明细、用量规则、使用工序、批次管控、替代料、库存到货和投料防错要求
- 基础资料 / 工艺路线独立工作台
- 基础资料 / 工序工位独立工作台，支持按工位检查工厂/车间/产线归属、设备终端绑定、人员资质、开工准入规则、数据采集方式、现场显示内容和追溯关联
- 基础资料 / 产线车间独立工作台，支持以资源日历矩阵区分车间基准日历、产线继承/覆盖日历、班次窗口、例外停线/保养窗口、瓶颈资源和 TCU-100 首批排程前资源准入检查
- 基础资料 / 规则与代码独立工作台，维护不良代码、停机原因、物料批次规则、标签规则、检验抽样规则等 MES 执行口径，发布后被工位、质量、设备、追溯和接口补偿引用
- 基础资料 / 班次日历独立工作台，维护工厂、产线、工位和设备的班次窗口、例外停线、保养窗口和加班规则，作为排程、派工、OEE 和交接班的统一时间口径
- 基础资料 / 客户供应商独立工作台，按客户与供应商分型展示业务伙伴档案；供应商侧支持查看状态、资质、质量等级、可供物料范围、批次追溯规则和来料检验策略引用，明确不承担库存、领料和线边库执行管理
- 系统设置 / 人员账号独立工作台
- 系统设置 / 人员资质独立工作台，维护岗位、工序、设备、质量签核、电子签名和外部培训资质，供开工准入、首件确认、质量放行、设备维修验收和异常审批校验
- 系统设置 / 角色权限独立工作台
- 系统设置 / 审批设置独立工作台
- 系统设置 / 接口补偿配置独立工作台
- 系统设置 / 消息提醒独立工作台
- 系统设置 / 操作记录独立工作台
- 系统设置 / 数据归档与恢复演练独立工作台
- 基础资料按产品、物料、BOM、工艺路线、工序工位、产线车间、规则代码、班次日历、客户供应商建立主数据治理底座，联动订单评审、齐套检查、派工、工位开工、投料防错、质量检验、完工入库和追溯报告
- 系统设置按账号身份、人员资质、角色授权、审批签名、接口补偿、消息升级、审计留痕和备份恢复建立 MES 治理底座，联动开工准入、质量放行、库存冻结、接口补偿、异常升级和客户稽核
- 系统设置第五轮业务闭环：人员账号、人员资质、角色权限、审批设置、接口补偿配置、消息提醒、操作记录、数据归档与恢复演练已接入统一 `MES_BUSINESS_FLOW.governanceEvents`，新增跨流程治理看板，支持权限复核、发布/启用、停用/锁定、补偿申请、稽核样本、恢复演练等治理动作写入统一业务事实
- 系统设置第五轮深化：新增细粒度治理配置矩阵，把按钮权限、审批流模板、消息规则、接口补偿、审计导出/归档、备份恢复演练落到具体业务页面和控制项，矩阵动作同样写入统一治理事件
- 生产订单新增、编辑、删除、分页、搜索、筛选与联动影响管理
- 订单评审准入校验、会签标记、评审通过、退回补资料与转排程联动
- 生产排程待排订单、7 天产线甘特图、已确认计划、工序计划、约束确认与派工准备联动
- 产能负荷 7 天资源矩阵、超载识别、订单占用明细和均衡建议
- 交期预警风险分级、预计完工对比、原因拆解、处置建议和协同动作
- 计划调整申请池、调整前后对比、影响评估、会签确认和排程同步
- 齐套检查订单状态、BOM 缺口、在途到货、替代料、拆批和排程放行联动
- 订单与计划第三轮手工维护闭环：生产订单、订单评审、生产排程、产能负荷、交期预警、计划调整、齐套检查均补充计划员维护面板，支持复制/导入/提交评审、资料问题、会签意见、排程草案、工序时间、加班/停线窗口、风险分派、调整审批、替代料、开工拦截等维护记录，统一写入 localStorage 履历
- 生产订单删除改为按引用状态判断：未引用订单可删除，已评审、排程或执行引用订单只能作废/暂停并保留下游影响记录
- 派工单筛选、状态统计、资源绑定、开工校验门、执行准备和下达/接单/开工/完工/异常锁定联动
- 工序任务队列、工序进度、WIP 与节拍、现场准入、过程记录和开工/投料/质量放行/报工/交接联动
- 班组任务队列、班组负荷、人员与工位、班组校验和接收/分配/执行/交接/人员异常/负荷均衡联动
- 任务下达队列、下达链路、协同推送、下达校验和批量下达/重发通知/同步协同/拦截/撤回联动
- 任务变更申请池、变更前后对比、影响范围、变更校验和提交审批/批准/生效/同步/驳回/回退联动
- SOP 清单、终端预览、关键参数、版本校验、附件点检和签收/发布/变更/终端同步联动
- 开工检查待开工任务、准入门概览、资源状态、检查明细和确认/放行/催料/首件/设备复位/拦截联动
- 工位身份回执队列、工位终端扫码、人员资质校验、在线覆盖、模拟绑定回执、模拟退出回执、换人回执、交接回执和锁定联动
- 扫码开工任务队列、模拟扫码枪输入、开工准入链路、设备启动信号、条码拦截、首件触发和追溯占位联动
- 工艺指导任务队列、工位终端工步、防错点、版本签收、模拟 HMI 工步完成、工艺偏离呼叫和履历联动
- 投料确认任务队列、模拟扫码枪/PDA 投料回传、BOM/批次/IQC/线边库位/用量校验、错料错批拦截、用料差异和批次追溯联动
- 过程记录任务队列、模拟设备 PLC/工位 HMI/测试台/人工录入回传、参数规格校验、SPC 预警、过程拦截和 SN/批次追溯联动
- 工序报工任务队列、模拟现场报工回传、完工数量/不良数量/报废数量/实际工时校验、报工拦截、ERP 回传和 WIP/质量/用料/追溯联动
- 交接班任务队列、模拟工牌/NFC 双人确认、WIP/异常/设备/质量事项交接、未闭环事项移交和交接履历联动
- 用料需求按排程、派工和 BOM 生成工序级需求，联动锁库、缺口、领料申请和缺料预警
- 领料申请按 MES 领料指令跟踪审批；有 WMS 时接收模拟出库回执，无 WMS 时登记 MES 领料出库记录，并衔接拣货异常和配送
- 配送进度按仓库到线边库过程跟踪配送单、模拟 PDA/AGV 回执、签收、超时和异常
- 线边库存按库位、批次、IQC、冻结、有效期、低水位和补料建议监控现场可投状态
- 投料记录接收工位投料确认模拟回执，跟踪批次校验、拦截、放行、用料差异和追溯引用
- 余料退回按完工、换线和差异触发退料；有 WMS 时接收入库回执，无 WMS 时登记 MES 退料入库记录，并跟踪余料标签、模拟称重和核销结果
- 缺料预警按排程、库存、配送和线边消耗生成影响分析，联动调拨、替代料、计划调整和异常闭环
- 生产批次按派工、BOM 和编码规则生成批次档案，联动 SN、扫码开工、投料和追溯
- 产品序列号按生产批次生成 SN 段，跟踪工位绑定、测试、隔离、作废和包装追溯
- 物料标签按 WMS、IQC、线边库或 MES 手工批次状态管理物料批次标签，支撑投料防错和缺料预警
- 成品标签按 FQC 放行、成品批次和客户模板生成标签，衔接包装、入库和客户追溯
- 箱码托盘码按包装作业绑定 SN、箱码和托盘码，形成出货层级追溯关系
- 标签打印按模板版本、打印机、首打、补打和作废记录管理打印任务
- 补打申请按权限、原因、审批、新旧标签关系和审计记录形成闭环
- 来料检验按 WMS、采购到货和供应商批次生成 IQC 准入任务，联动 WMS 冻结/放行、物料标签、线边库存和缺料预警
- 首件检验按开工、换线、换型、换料触发 FAI，首件合格释放批量生产，不合格锁定派工并生成质量异常
- 巡检任务按产线、工序、频次和风险生成 IPQC 巡检任务，接收模拟 PDA/工位终端回执并联动 NCR 或停线建议
- 过程检验接收工位过程记录、设备 PLC、测试工装和 SPC 趋势，合格放行报工，超限拦截并进入 NCR/MRB
- 成品检验按生产履历、首件、IPQC、过程参数、报工、不良和包装标签执行 FQC 放行，衔接成品标签与入库
- 不良记录按 SN、批次、工序、设备、人员和物料批次形成 NCR，支持隔离、复判、让步、报废和返工评审入口
- 返工评审按 MRB 处置方式、返工路线、责任工位和复检结果形成闭环，回写派工、工位作业和追溯
- 质量放行按 FQC、NCR/MRB、库存冻结、成品标签、包装层级和入库准入执行签核，后台只登记放行、拦截和追溯引用，不替代现场 FQC、包装扫码或 WMS 入库动作
- 出货检验按客户检验规范、包装层级、OQC 抽样、标签版本、放行单和出货批次形成发运前质量门，联动客户追溯报告和质量放行
- 设备状态按 PLC、SCADA、设备 API 和人工复核汇聚运行、待机、故障、满载等状态，联动开工准入、维修工单、停机记录和 OEE
- 工装夹具按工装寿命、绑定工序、点检状态、借用归还、维修封存和追溯引用管理，作为开工准入和过程质量校验条件
- 量检具校准按校准周期、有效期、量具状态、复校结果和使用范围管理，过期或失准时拦截检验签核和关键尺寸记录
- 点检计划按班前、班中和故障后复检管理点检项目，接收模拟 PDA/扫码枪/工牌回执并联动漏检拦截、异常复核和开工检查
- 保养计划按日历、运行时长、生产计数和 CBM 阈值触发预防保养，联动 APS 产能日历、执行验收和设备恢复
- 维修工单按设备报警、扫码报修、点检异常和异常中心触发，跟踪响应、到场、维修、备件、试运行和验收闭环
- 停机记录按 PLC 状态日志、班组补录和维修结果归因，形成停机原因、OEE 扣减、维修复盘和计划重排依据
- 备件领用按维修保养工单绑定备件批次、WMS 出库、安装设备、成本归集和低库存补采购
- 设备效率按设备、产线、班次拆解 OEE 三分项，联动停机 TOP、维修历史、良品结果和 TPM 改善建议
- 实时产量按 PLC 产量脉冲、工位 HMI 和工序报工草稿汇聚产量，绑定工单、派工、批次、设备和时间戳
- 设备运行按 PLC、SCADA 和设备 API 汇聚运行、待机、故障、满载等状态，联动开工准入、维修和排程
- 工艺参数按 PLC、测试台和工位 HMI 采集关键参数，联动规格校验、SPC、过程检验和报工拦截
- 报警记录按 SCADA、设备 API、参数超限和扫码异常生成事件，跟踪等级、派单、响应和关闭结果
- 停机归因按 PLC 停机日志、班组模拟 HMI 补录和维修验收归因，联动 OEE、复盘和计划调整
- 过程趋势按时序参数、产量节拍、设备状态和质量结果聚合趋势，识别 SPC 漂移、瓶颈和失控风险
- 电子看板按 MES 聚合指标发布产量、设备、参数、报警和停机状态，保留现场签收、刷新和追溯入口
- 异常上报按工位终端、PDA、Andon、PLC、质量、物料和人工确认统一生成异常事件，进入分级派单
- 待处理异常按 SLA、责任人、业务联动和恢复验证组织设备、质量、缺料、人员和工艺异常
- 停线申请按异常来源、锁定范围、审批状态、恢复条件和排程影响形成停线闭环
- 缺料处理按 WMS、线边库、采购到货和齐套检查事实联动调拨、替代料、催料和计划调整
- 质量问题按 SN、批次、工序、不良代码形成 NCR/MRB、隔离、返工、停线建议和 CAPA 闭环
- 设备故障按 PLC/SCADA/扫码报修/点检异常触发维修派单、试运行验收、停机归因和 OEE 回写
- 处理复盘按 RCA、CAPA、TPM 改善和有效性验证沉淀重大或重复异常知识
- 工序完工复核接收模拟工位 HMI、扫码枪、PLC 和测试台回执，校验数量、工时、用料、质量和 WIP 结转
- 完工确认按工序、FQC、NCR、SPC、用料核销、批次谱系、成品标签和未关闭异常形成入库前校验门
- 包装作业按 SN、箱码、托盘码、包材批次和客户标签版本形成包装层级追溯
- 成品入库跟踪 MES 入库指令；有 WMS 时接收模拟扫码上架回执，无 WMS 时登记 MES 成品库入库记录，并管理库位建议、箱托校验和成品批次状态
- 库存冻结按质量异常、追溯召回、客户投诉、WMS 回执或 MES 库存状态管理冻结、解冻、拦截和复判闭环
- 退料入库接收余料退回、换线退料、冻结退料的模拟 PDA/电子秤/WMS 回执并核销用料差异
- 单据同步跟踪完工、入库、退料、冻结和工单关闭向 ERP/WMS 的同步、重试、补偿和对账结果；接口补偿配置只维护规则、审批和补偿准入，不直接修改外部系统账务
- 产品追溯按 SN 或成品批次反查工单、物料、工序、检验、设备、包装和出货客户，形成查询快照
- 批次追溯按原料批次或成品批次双向圈定投入、产出、库存和客户影响范围
- 物料去向按物料批次查询 WMS 出库、线边签收、投料消耗、余料退回和成品去向
- 生产履历汇聚工位终端、扫码枪、HMI、PLC、报工和交接记录，支撑单件或批次追因
- 检验履历串联 IQC、FAI、IPQC、FQC、NCR/MRB 和质量放行记录，支撑客户稽核证据
- 设备履历关联 PLC/SCADA、点检、维修、停机、校准和生产批次，用于质量追因和 TPM 改善
- 客户追溯报告汇总客户投诉、出货批次、SN、质量证据、影响范围、审批状态和对外报告快照
- 生产日报按 ERP 工单或 MES 手工工单、MES 报工、质量放行、设备状态、WMS 回执或 MES 入库记录汇聚日结快照，跟踪发布、复核和外部读取状态
- 良率分析按产品、工序、批次和不良代码串联 IQC、FAI、IPQC、FQC、NCR 和返工闭环
- 交付达成按 ERP 交期或 MES 手工交付计划、MES 完工、WMS 回执或 MES 入库记录和未闭环风险分析客户订单达成情况
- 设备效率报表按设备、产线和班次拆解 OEE 三分项，联动停机、维修、质量和 TPM 改善
- 停机损失按 PLC/SCADA 停机事实、班组补录和维修归因计算损失并沉淀复盘入口
- 物料损耗按 BOM 标准、投料确认、报工核销、余料退回和 WMS 回执分析超耗与成本归集
- MES生产指标驾驶舱跨订单、质量、设备、物料、异常和交付汇总已校验的生产事实快照和跨部门改善动作，不扩展为财务、销售、采购综合 BI
- 生产订单池
- 产线负荷
- 当前选中订单闭环进度
- 产品分布
- 现场执行看板
- 风险中心
- 常用业务入口预览
- 首页搜索、筛选、弹窗、抽屉、待办勾选等人机联动
- 使用 localStorage 保存演示过程中的临时业务数据

## 手工维护功能盘点

已新增 `UI_Design/手工维护功能盘点.md`，按现有每个页面梳理后台用户可以手工维护的业务对象、应开放的新增/编辑/停用/审批/导入/补录/发布等动作，以及不应由后台直接替代的现场扫码、PDA、PLC、WMS、ERP 等外部动作。后续补齐页面 CRUD 和维护入口时，应优先参考该清单，并按 P0 基础资料与系统设置、P1 计划执行管理单据、P2 现场回执与监控查询的顺序推进。

页面内容基于根目录中的 MES 系统蓝图、全流程说明和 TCU-100 正向业务闭环资料整理。首页按多产品、多订单、多产线同时运行的实际生产场景组织，同时保留当前选中订单的闭环追踪能力。

页面修改数据后会暂存到浏览器 localStorage。可点击顶部 `重置演示` 恢复初始数据。

## 文件结构

```text
UI_Design/
  index.html
  styles.css
  app.js
  README.md
  orders/
    capacity-load.html
    capacity-load.css
    capacity-load.js
    delivery-warning.html
    delivery-warning.css
    delivery-warning.js
    plan-adjustment.html
    plan-adjustment.css
    plan-adjustment.js
    kit-check.html
    kit-check.css
    kit-check.js
    order-reviews.html
    order-reviews.css
    order-reviews.js
    production-schedule.html
    production-schedule.css
    production-schedule.js
    production-orders.html
    production-orders.css
    production-orders.js
  dispatch/
    dispatch-orders.html
    dispatch-orders.css
    dispatch-orders.js
    operation-tasks.html
    operation-tasks.css
    operation-tasks.js
    team-tasks.html
    team-tasks.css
    team-tasks.js
    task-release.html
    task-release.css
    task-release.js
    task-change.html
    task-change.css
    task-change.js
    sop-view.html
    sop-view.css
    sop-view.js
    start-check.html
    start-check.css
    start-check.js
  station/
    employee-login.html
    employee-login.css
    employee-login.js
    scan-start.html
    scan-start.css
    scan-start.js
    work-instruction.html
    work-instruction.css
    work-instruction.js
    feeding-confirmation.html
    feeding-confirmation.css
    feeding-confirmation.js
    process-record.html
    process-record.css
    process-record.js
    operation-report.html
    operation-report.css
    operation-report.js
    shift-handover.html
    shift-handover.css
    shift-handover.js
  materials/
    material-requirements.html
    picking-requests.html
    delivery-progress.html
    line-side-inventory.html
    feeding-records.html
    return-materials.html
    shortage-alerts.html
    materials.css
    materials.js
  barcode/
    production-batches.html
    product-serials.html
    material-labels.html
    finished-labels.html
    box-pallet-codes.html
    label-printing.html
    reprint-requests.html
    barcode.css
    barcode.js
  quality/
    incoming-inspection.html
    first-article.html
    patrol-tasks.html
    process-inspection.html
    final-inspection.html
    defect-records.html
    rework-review.html
    quality-upstream.css
    quality-upstream.js
    quality-downstream.css
    quality-downstream.js
  equipment/
    equipment-status.html
    inspection-plan.html
    maintenance-plan.html
    repair-orders.html
    downtime-records.html
    spare-parts.html
    equipment-efficiency.html
    equipment.css
    equipment.js
  monitoring/
    realtime-output.html
    device-runtime.html
    process-parameters.html
    alarm-records.html
    downtime-reasons.html
    process-trends.html
    electronic-board.html
    monitoring.css
    monitoring.js
  exceptions/
    exception-report.html
    pending-exceptions.html
    line-stop.html
    material-shortage.html
    quality-issues.html
    equipment-faults.html
    review.html
    exceptions.css
    exceptions.js
  warehouse/
    operation-completion.html
    completion-confirmation.html
    packaging.html
    finished-goods-receipt.html
    inventory-freeze.html
    return-receipt.html
    document-sync.html
    warehouse.css
    warehouse.js
  traceability/
    product-trace.html
    batch-trace.html
    material-flow.html
    production-history.html
    inspection-history.html
    equipment-history.html
    customer-report.html
    traceability.css
    traceability.js
  reports/
    production-daily.html
    yield-analysis.html
    delivery-attainment.html
    equipment-efficiency.html
    downtime-loss.html
    material-loss.html
    management-cockpit.html
    reports.css
    reports.js
  settings/
    personnel-accounts.html
    role-permissions.html
    approval-settings.html
    document-sync.html
    message-alerts.html
    operation-logs.html
    data-backup.html
    settings.css
    settings.js
```

## 打开方式

直接用浏览器打开：

```text
UI_Design/index.html
```

生产订单管理页面：

```text
UI_Design/orders/production-orders.html
```

订单评审工作台：

```text
UI_Design/orders/order-reviews.html
```

生产排程工作台：

```text
UI_Design/orders/production-schedule.html
```

产能负荷分析页面：

```text
UI_Design/orders/capacity-load.html
```

交期预警中心：

```text
UI_Design/orders/delivery-warning.html
```

计划调整工作台：

```text
UI_Design/orders/plan-adjustment.html
```

齐套检查工作台：

```text
UI_Design/orders/kit-check.html
```

齐套检查已接入 `UI_Design/data/mes-backend.js` 作为 localStorage 模拟后端，按生产订单、BOM 展开、库存分层、锁库、替代审批、缺料异常和审计日志计算齐套结果；页面不再只用前端临时数据判断齐套。

派工单工作台：

```text
UI_Design/dispatch/dispatch-orders.html
```

工序任务看板：

```text
UI_Design/dispatch/operation-tasks.html
```

班组任务工作台：

```text
UI_Design/dispatch/team-tasks.html
```

任务下达控制台：

```text
UI_Design/dispatch/task-release.html
```

任务变更工作台：

```text
UI_Design/dispatch/task-change.html
```

工艺文件与作业指导工作台：

```text
UI_Design/dispatch/sop-view.html
```

开工检查工作台：

```text
UI_Design/dispatch/start-check.html
```

工位身份回执工位终端：

```text
UI_Design/station/employee-login.html
```

扫码开工工位终端：

```text
UI_Design/station/scan-start.html
```

工艺指导工位终端：

```text
UI_Design/station/work-instruction.html
```

投料确认工位终端：

```text
UI_Design/station/feeding-confirmation.html
```

过程记录工位终端：

```text
UI_Design/station/process-record.html
```

工序报工工位终端：

```text
UI_Design/station/operation-report.html
```

交接班工位终端：

```text
UI_Design/station/shift-handover.html
```

用料需求工作台：

```text
UI_Design/materials/material-requirements.html
```

领料申请工作台：

```text
UI_Design/materials/picking-requests.html
```

配送进度工作台：

```text
UI_Design/materials/delivery-progress.html
```

线边库存工作台：

```text
UI_Design/materials/line-side-inventory.html
```

投料记录工作台：

```text
UI_Design/materials/feeding-records.html
```

余料退回工作台：

```text
UI_Design/materials/return-materials.html
```

缺料预警工作台：

```text
UI_Design/materials/shortage-alerts.html
```

生产批次工作台：

```text
UI_Design/barcode/production-batches.html
```

产品序列号工作台：

```text
UI_Design/barcode/product-serials.html
```

物料标签工作台：

```text
UI_Design/barcode/material-labels.html
```

成品标签工作台：

```text
UI_Design/barcode/finished-labels.html
```

箱码托盘码工作台：

```text
UI_Design/barcode/box-pallet-codes.html
```

标签打印工作台：

```text
UI_Design/barcode/label-printing.html
```

补打申请工作台：

```text
UI_Design/barcode/reprint-requests.html
```

来料检验工作台：

```text
UI_Design/quality/incoming-inspection.html
```

首件检验工作台：

```text
UI_Design/quality/first-article.html
```

巡检任务工作台：

```text
UI_Design/quality/patrol-tasks.html
```

过程检验工作台：

```text
UI_Design/quality/process-inspection.html
```

成品检验工作台：

```text
UI_Design/quality/final-inspection.html
```

不良记录工作台：

```text
UI_Design/quality/defect-records.html
```

返工评审工作台：

```text
UI_Design/quality/rework-review.html
```

设备状态工作台：

```text
UI_Design/equipment/equipment-status.html
```

点检计划工作台：

```text
UI_Design/equipment/inspection-plan.html
```

保养计划工作台：

```text
UI_Design/equipment/maintenance-plan.html
```

维修工单工作台：

```text
UI_Design/equipment/repair-orders.html
```

停机记录工作台：

```text
UI_Design/equipment/downtime-records.html
```

备件领用工作台：

```text
UI_Design/equipment/spare-parts.html
```

设备效率工作台：

```text
UI_Design/equipment/equipment-efficiency.html
```

实时产量工作台：

```text
UI_Design/monitoring/realtime-output.html
```

设备运行工作台：

```text
UI_Design/monitoring/device-runtime.html
```

工艺参数工作台：

```text
UI_Design/monitoring/process-parameters.html
```

报警记录工作台：

```text
UI_Design/monitoring/alarm-records.html
```

停机原因工作台：

```text
UI_Design/monitoring/downtime-reasons.html
```

过程趋势工作台：

```text
UI_Design/monitoring/process-trends.html
```

电子看板工作台：

```text
UI_Design/monitoring/electronic-board.html
```

异常上报工作台：

```text
UI_Design/exceptions/exception-report.html
```

待处理异常工作台：

```text
UI_Design/exceptions/pending-exceptions.html
```

停线申请工作台：

```text
UI_Design/exceptions/line-stop.html
```

缺料处理工作台：

```text
UI_Design/exceptions/material-shortage.html
```

质量问题工作台：

```text
UI_Design/exceptions/quality-issues.html
```

设备故障工作台：

```text
UI_Design/exceptions/equipment-faults.html
```

处理复盘工作台：

```text
UI_Design/exceptions/review.html
```

产品追溯工作台：

```text
UI_Design/traceability/product-trace.html
```

批次追溯工作台：

```text
UI_Design/traceability/batch-trace.html
```

物料去向工作台：

```text
UI_Design/traceability/material-flow.html
```

生产履历工作台：

```text
UI_Design/traceability/production-history.html
```

检验履历工作台：

```text
UI_Design/traceability/inspection-history.html
```

设备履历工作台：

```text
UI_Design/traceability/equipment-history.html
```

客户追溯报告工作台：

```text
UI_Design/traceability/customer-report.html
```

生产日报分析页面：

```text
UI_Design/reports/production-daily.html
```

良率分析页面：

```text
UI_Design/reports/yield-analysis.html
```

交付达成分析页面：

```text
UI_Design/reports/delivery-attainment.html
```

设备效率报表页面：

```text
UI_Design/reports/equipment-efficiency.html
```

停机损失分析页面：

```text
UI_Design/reports/downtime-loss.html
```

物料损耗分析页面：

```text
UI_Design/reports/material-loss.html
```

MES生产指标驾驶舱页面：

```text
UI_Design/reports/management-cockpit.html
```

也可以在 `UI_Design` 目录启动任意静态服务后访问首页。
