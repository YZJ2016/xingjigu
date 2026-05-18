# 星技谷 MES UI Design

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
- 派工与生产任务 / SOP 查看独立工作台
- 派工与生产任务 / 开工检查独立工作台
- 工位作业 / 员工登录独立终端页面
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
- 质量检验 / 不良记录独立工作台
- 质量检验 / 返工评审独立工作台
- 生产订单新增、编辑、删除、分页、搜索、筛选与联动影响管理
- 订单评审准入校验、会签标记、评审通过、退回补资料与转排程联动
- 生产排程待排订单、7 天产线甘特图、已确认计划、工序计划、约束确认与派工准备联动
- 产能负荷 7 天资源矩阵、超载识别、订单占用明细和均衡建议
- 交期预警风险分级、预计完工对比、原因拆解、处置建议和协同动作
- 计划调整申请池、调整前后对比、影响评估、会签确认和排程同步
- 齐套检查订单状态、BOM 缺口、在途到货、替代料、拆批和排程放行联动
- 派工单筛选、状态统计、资源绑定、开工校验门、执行准备和下达/接单/开工/完工/异常锁定联动
- 工序任务队列、工序进度、WIP 与节拍、现场准入、过程记录和开工/投料/质量放行/报工/交接联动
- 班组任务队列、班组负荷、人员与工位、班组校验和接收/分配/执行/交接/人员异常/负荷均衡联动
- 任务下达队列、下达链路、协同推送、下达校验和批量下达/重发通知/同步协同/拦截/撤回联动
- 任务变更申请池、变更前后对比、影响范围、变更校验和提交审批/批准/生效/同步/驳回/回退联动
- SOP 清单、终端预览、关键参数、版本校验、附件点检和签收/发布/变更/终端同步联动
- 开工检查待开工任务、准入门概览、资源状态、检查明细和确认/放行/催料/首件/设备复位/拦截联动
- 员工登录队列、工位终端扫码、人员资质校验、在线覆盖、登录/退出/换人/交接/锁定联动
- 扫码开工任务队列、模拟扫码枪输入、开工准入链路、设备启动信号、条码拦截、首件触发和追溯占位联动
- 工艺指导任务队列、工位终端工步、防错点、版本签收、模拟 HMI 工步完成、工艺偏离呼叫和履历联动
- 投料确认任务队列、模拟扫码枪/PDA 投料回传、BOM/批次/IQC/线边库位/用量校验、错料错批拦截、用料差异和批次追溯联动
- 过程记录任务队列、模拟设备 PLC/工位 HMI/测试台/人工录入回传、参数规格校验、SPC 预警、过程拦截和 SN/批次追溯联动
- 工序报工任务队列、模拟现场报工回传、完工数量/不良数量/报废数量/实际工时校验、报工拦截、ERP 回传和 WIP/质量/用料/追溯联动
- 交接班任务队列、模拟工牌/NFC 双人确认、WIP/异常/设备/质量事项交接、未闭环事项移交和交接履历联动
- 用料需求按排程、派工和 BOM 生成工序级需求，联动锁库、缺口、领料申请和缺料预警
- 领料申请按 MES 领料指令跟踪审批、WMS 模拟出库回执、拣货异常和配送衔接
- 配送进度按仓库到线边库过程跟踪配送单、模拟 PDA/AGV 回执、签收、超时和异常
- 线边库存按库位、批次、IQC、冻结、有效期、低水位和补料建议监控现场可投状态
- 投料记录接收工位投料确认模拟回执，跟踪批次校验、拦截、放行、用料差异和追溯引用
- 余料退回按完工、换线和差异触发退料，跟踪余料标签、模拟称重、WMS 入库和核销结果
- 缺料预警按排程、库存、配送和线边消耗生成影响分析，联动调拨、替代料、计划调整和异常闭环
- 生产批次按派工、BOM 和编码规则生成批次档案，联动 SN、扫码开工、投料和追溯
- 产品序列号按生产批次生成 SN 段，跟踪工位绑定、测试、隔离、作废和包装追溯
- 物料标签按 WMS、IQC 和线边库状态管理物料批次标签，支撑投料防错和缺料预警
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
- 生产订单池
- 产线负荷
- 当前选中订单闭环进度
- 产品分布
- 现场执行看板
- 风险中心
- 常用业务入口预览
- 首页搜索、筛选、弹窗、抽屉、待办勾选等人机联动
- 使用 localStorage 保存演示过程中的临时业务数据

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

SOP 查看工作台：

```text
UI_Design/dispatch/sop-view.html
```

开工检查工作台：

```text
UI_Design/dispatch/start-check.html
```

员工登录工位终端：

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

也可以在 `UI_Design` 目录启动任意静态服务后访问首页。
