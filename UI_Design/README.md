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

也可以在 `UI_Design` 目录启动任意静态服务后访问首页。
