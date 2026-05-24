# SDD-MES-20260524-010 MES 真实性整改分批实施索引 Spec

## 1. Spec 元信息

| 项目 | 内容 |
| --- | --- |
| Spec 编号 | SDD-MES-20260524-010 |
| 功能名称 | MES 真实性整改分批实施索引 |
| 所属业务域 | 全局 |
| 目标页面或模块 | `UI_Design/**/*.html`，`UI_Design/**/*.js`，`UI_Design/README.md`，`UI_Design/navigation.js` |
| 需求来源 | 全量页面 MES 真实性审查 / 用户补充：部分工厂无 ERP、PLM、WMS、SRM 等外部系统 |
| 编写人 | Codex |
| 状态 | 草稿 |
| 最后更新 | 2026-05-24 |

## 2. 总体前提

并非所有工厂都具备 ERP、PLM、WMS、SRM、QMS、SCADA、PLC 或 BI 等外部系统。因此：

- MES 可以手工维护生产订单、客户、供应商、产品、物料、BOM、工艺、库存和质量记录。
- 允许手工维护不等于允许普通 CRUD。关键对象必须有来源类型、责任人、状态、版本、复核/审批、引用影响和审计履历。
- 有外部系统时，MES 接收外部同步和回执；无外部系统时，MES 维护内部业务事实。
- 后台页面不能表达为直接替代现场扫码、投料、报工、入库、出库、设备启停、维修、质量检验等真实动作。

## 3. 拆分后的 Spec

| 批次 | Spec | 范围 | 优先级 |
| --- | --- | --- | --- |
| 1 | `SDD-MES-20260524-011_navigation_shared_boundary_spec.md` | 全局导航、共享菜单、首页、统一文案规则 | P0 |
| 2 | `SDD-MES-20260524-012_orders_masterdata_manual_mode_spec.md` | 订单与计划、基础资料、客户供应商、手工维护受控模型 | P0 |
| 3 | `SDD-MES-20260524-013_station_material_warehouse_boundary_spec.md` | 工位作业、物料与线边库、条码与标签、完工与入库 | P1 |
| 4 | `SDD-MES-20260524-014_quality_equipment_process_exception_spec.md` | 质量检验、设备与保养、过程监控、异常处理 | P1 |
| 5 | `SDD-MES-20260524-015_trace_reports_settings_docs_spec.md` | 追溯查询、报表与看板、系统设置、README 文档 | P2 |

## 4. 跨批次统一规则

### 4.1 来源模式

所有关键业务对象应支持以下来源表达：

```js
{
  sourceMode: "externalSync | mesManual | excelImport | simulatedCallback | compensation",
  sourceSystem: "ERP | PLM | WMS | SRM | QMS | SCADA | PLC | MES | none",
  sourceDescription: "",
  createdBy: "",
  reviewedBy: "",
  approvedBy: "",
  createdAt: "",
  updatedAt: "",
  auditTrail: []
}
```

### 4.2 现场动作边界

| 现场或外部动作 | 后台可做 | 后台不得表达为 |
| --- | --- | --- |
| 扫码开工 | 查看准入、接收模拟扫码回执、拦截异常 | 后台直接扫码、后台直接开工 |
| 投料 | 查看 BOM/批次校验、接收模拟投料回执 | 后台直接投料、后台直接扣料 |
| 工序报工 | 校验报工条件、接收模拟报工回执、生成回传消息 | 后台直接替现场报工 |
| 质量检验 | 分派、复核、签核、放行、拦截 | 普通按钮替代检验员签核 |
| 入库/出库 | 生成指令、登记 MES 库存记录、接收模拟回执 | 无责任人和批次的直接出入库 |
| 设备启停/维修 | 监控状态、派工、验收、复核 | 后台直接控制设备或直接完成维修 |

### 4.3 模拟动作文案

凡涉及 HMI、扫码枪、PDA、工牌/NFC、PLC、SCADA、ERP、PLM、WMS、QMS、SRM、电子秤、打印机等来源，控件文案、区域标题或占位提示必须出现“模拟”或“回执”。

## 5. 总体验收

- 全量页面加载无 JavaScript 控制台错误。
- 左侧导航在所有页面中一致，路由可达。
- 关键手工维护对象有来源、版本、状态、责任人、复核/审批、引用影响和审计履历。
- 现场动作不再被表达为后台直接执行。
- `UI_Design/README.md` 说明有外部系统和无外部系统两种模式。

