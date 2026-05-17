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
- 生产订单新增、编辑、删除、分页、搜索、筛选与联动影响管理
- 订单评审准入校验、会签标记、评审通过、退回补资料与转排程联动
- 生产排程待排订单、7 天产线甘特图、已确认计划、工序计划、约束确认与派工准备联动
- 产能负荷 7 天资源矩阵、超载识别、订单占用明细和均衡建议
- 交期预警风险分级、预计完工对比、原因拆解、处置建议和协同动作
- 计划调整申请池、调整前后对比、影响评估、会签确认和排程同步
- 齐套检查订单状态、BOM 缺口、在途到货、替代料、拆批和排程放行联动
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

也可以在 `UI_Design` 目录启动任意静态服务后访问首页。
