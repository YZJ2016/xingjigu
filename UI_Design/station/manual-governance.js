(function () {
  const pageTitle = document.querySelector(".topbar h1, h1")?.textContent?.trim() || document.title.replace("星技谷 MES |", "").trim() || "工位作业";
  const storageKey = `xingjigu_mes_station_manual_${location.pathname.split("/").pop().replace(".html", "")}_v1`;
  const initial = { logs: [], open: true };
  let state = loadState();

  function loadState() {
    try {
      return { ...initial, ...(JSON.parse(localStorage.getItem(storageKey) || "null") || {}) };
    } catch (error) {
      localStorage.removeItem(storageKey);
      return { ...initial };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function actionsForPage() {
    const file = location.pathname.split("/").pop();
    const common = [{ key: "history", label: "查看履历" }, { key: "exception", label: "转异常" }];
    const map = {
      "employee-login.html": [{ key: "makeup", label: "补录上下工位" }, { key: "review", label: "资质复核" }, { key: "lock", label: "锁定准入", danger: true }],
      "scan-start.html": [{ key: "reviewScan", label: "复核扫码异常" }, { key: "blockReason", label: "登记拦截原因" }, { key: "release", label: "解除拦截申请", danger: true }],
      "work-instruction.html": [{ key: "deviation", label: "登记偏离" }, { key: "version", label: "复核版本" }, { key: "resend", label: "补发终端资料" }],
      "feeding-confirmation.html": [{ key: "reviewFeed", label: "复核投料异常" }, { key: "releaseMat", label: "解除物料拦截", danger: true }, { key: "weight", label: "登记称重差异" }],
      "process-record.html": [{ key: "makeupReason", label: "补录原因" }, { key: "rejudge", label: "复判参数" }, { key: "closeWarn", label: "关闭预警", danger: true }],
      "operation-report.html": [{ key: "reviewReport", label: "复核报工" }, { key: "makeupNote", label: "补录说明" }, { key: "reject", label: "驳回异常报工", danger: true }],
      "shift-handover.html": [{ key: "newItem", label: "新增交接事项" }, { key: "transfer", label: "确认移交" }, { key: "close", label: "关闭交接问题", danger: true }],
    };
    return [...(map[file] || []), ...common];
  }

  function render() {
    let panel = document.querySelector("#stationManualGovernance");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "stationManualGovernance";
      panel.className = "station-manual-governance";
      document.querySelector("main")?.appendChild(panel);
    }
    panel.innerHTML = `
      <div class="station-manual-governance__head">
        <div>
          <span>工位作业复核</span>
          <h3>${pageTitle}</h3>
          <p>后台只维护补录原因、复核结论、解除拦截申请、履历和转异常记录；扫码、投料、报工、刷卡/NFC、PLC/设备信号均为模拟外部回执。</p>
        </div>
        <button type="button" data-station-manual-toggle>${state.open ? "关闭" : "打开"}</button>
      </div>
      <div class="station-manual-governance__body" ${state.open ? "" : "hidden"}>
        <div class="manual-action-row">
          ${actionsForPage().map((action) => `<button type="button" class="${action.danger ? "danger-action" : ""}" data-station-manual="${action.key}">${action.label}</button>`).join("")}
        </div>
        <div class="station-manual-governance__logs">
          ${state.logs.length ? state.logs.slice(0, 6).map((log) => `<div><span>${log.time}</span><strong>${log.text}</strong><em>${log.audit}</em></div>`).join("") : "<div><span>暂无</span><strong>复核、补录、转异常或解除拦截申请后在此留痕</strong><em>localStorage 持久化</em></div>"}
        </div>
      </div>
    `;
    panel.querySelector("[data-station-manual-toggle]")?.addEventListener("click", () => {
      state.open = !state.open;
      saveState();
      render();
    });
    panel.querySelectorAll("[data-station-manual]").forEach((button) => {
      button.addEventListener("click", () => runAction(button.dataset.stationManual));
    });
  }

  function runAction(key) {
    const action = actionsForPage().find((item) => item.key === key) || { label: key };
    if (action.danger && !window.confirm(`${action.label}属于解除拦截、关闭、驳回或锁定类危险动作，将写入审计记录。确认处理？`)) return;
    const now = new Date().toLocaleString("zh-CN", { hour12: false });
    const audit = `责任人：后台复核员；关联页面：${pageTitle}；前后值：现场原始事实只读 -> ${action.label}结论已登记`;
    state.logs.unshift({ time: now, text: `${action.label}已登记`, audit });
    state.logs = state.logs.slice(0, 20);
    saveState();
    window.MES_BUSINESS_FLOW?.recordGovernanceEvent?.({
      domain: "station",
      action: action.label,
      page: pageTitle,
      owner: "后台复核员",
      result: audit,
      time: now,
    });
    showToast(`${action.label}已留痕`);
    render();
  }

  function showToast(text) {
    let toast = document.querySelector("#toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.hidden = false;
    toast.textContent = text;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }

  render();
})();
