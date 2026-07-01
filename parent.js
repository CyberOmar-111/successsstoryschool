"use strict";

const state = {
  parent: null,
  children: [],
  selectedLinkId: null,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Request failed.");
    error.code = payload.code;
    throw error;
  }
  return payload;
}

function setHidden(element, hidden) {
  if (element) {
    element.hidden = hidden;
  }
}

function setMessage(element, message, tone = "") {
  if (!element) {
    return;
  }
  element.textContent = message || "";
  element.dataset.tone = tone;
}

function setBusy(form, busy) {
  const button = $("button[type='submit']", form);
  if (button) {
    button.disabled = busy;
  }
}

function money(amount) {
  const value = Number(amount || 0);
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} JOD`;
}

function gradeAverage(children) {
  const scores = [];
  children.forEach((child) => {
    if (!child.canViewRecords) {
      return;
    }
    (child.records?.grades || []).forEach((grade) => {
      [grade.term_one, grade.term_two].forEach((value) => {
        const number = Number(value);
        if (Number.isFinite(number)) {
          scores.push(number);
        }
      });
    });
  });
  if (!scores.length) {
    return "-";
  }
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return `${Math.round(average)}%`;
}

function statusLabel(status) {
  return {
    approved: "Approved",
    active: "Active",
    pending: "Pending approval",
    declined: "Declined",
  }[status] || status;
}

function classLabel(student) {
  return student?.className || student?.requestedClassName || "No class yet";
}

function showAuth() {
  document.body.classList.remove("parent-dashboard-active");
  setHidden($("[data-auth-view]"), false);
  setHidden($("[data-dashboard]"), true);
}

function showDashboard() {
  document.body.classList.add("parent-dashboard-active");
  setHidden($("[data-auth-view]"), true);
  setHidden($("[data-dashboard]"), false);
}

function setAuthMode(mode) {
  const loginForm = $("[data-parent-login-form]");
  const registerForm = $("[data-parent-register-form]");
  setHidden(loginForm, mode !== "login");
  setHidden(registerForm, mode !== "register");
  $$("[data-auth-tab]").forEach((tab) => {
    const active = tab.dataset.authTab === mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  setMessage($("[data-auth-message]"), "");
}

function selectedChild() {
  if (!state.children.length) {
    return null;
  }
  return state.children.find((child) => String(child.linkId) === String(state.selectedLinkId)) || state.children[0];
}

function renderMetrics() {
  const approved = state.children.filter((child) => child.canViewRecords);
  const fees = approved.flatMap((child) => child.records?.fees || []);
  const due = fees.filter((fee) => fee.status === "due").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  const paid = fees.filter((fee) => fee.status === "paid").reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  $("[data-metric-children]").textContent = String(state.children.length);
  $("[data-metric-due]").textContent = money(due);
  $("[data-metric-paid]").textContent = money(paid);
  $("[data-metric-average]").textContent = gradeAverage(approved);
  $("[data-child-count]").textContent = `${state.children.length} linked`;
}

function renderChildren() {
  const list = $("[data-child-list]");
  if (!list) {
    return;
  }
  if (!state.children.length) {
    list.innerHTML = `
      <article class="parent-empty">
        <h2>No children yet</h2>
        <p>Add your child's student ID below. The school office approves the connection before records appear.</p>
      </article>
    `;
    return;
  }
  list.innerHTML = state.children.map((child) => `
    <button type="button" class="parent-child-button ${String(child.linkId) === String(state.selectedLinkId) ? "active" : ""}" data-select-child="${child.linkId}">
      <strong>${child.student.name}</strong>
      <span>${child.student.studentId} · ${classLabel(child.student)}</span>
      <span class="status-pill ${child.status}">${statusLabel(child.status)}</span>
    </button>
  `).join("");
}

function rowOrEmpty(items, render, empty = "No records yet.") {
  if (!items || !items.length) {
    return `<p class="parent-empty">${empty}</p>`;
  }
  return `<div class="record-list">${items.map(render).join("")}</div>`;
}

function renderRecords() {
  const container = $("[data-records]");
  const child = selectedChild();
  if (!container) {
    return;
  }
  if (!child) {
    container.innerHTML = `
      <article class="parent-panel parent-empty">
        <h2>No child selected</h2>
        <p>Add a child student ID and wait for admin approval to see school records.</p>
      </article>
    `;
    return;
  }
  state.selectedLinkId = child.linkId;
  if (!child.canViewRecords) {
    container.innerHTML = `
      <article class="parent-panel parent-empty">
        <div class="record-title-row">
          <div>
            <h2>${child.student.name}</h2>
            <p>${child.student.studentId} · ${classLabel(child.student)}</p>
          </div>
          <span class="status-pill ${child.status}">${statusLabel(child.status)}</span>
        </div>
        <p>This child connection is waiting for school admin approval. Records stay private until it is approved.</p>
      </article>
    `;
    return;
  }
  const records = child.records || {};
  const transport = child.student.transport === "bus" ? "Uses school bus" : "No bus request";
  container.innerHTML = `
    <article class="parent-panel">
      <div class="record-title-row">
        <div>
          <h2>${child.student.name}</h2>
          <p>${child.student.studentId} · ${classLabel(child.student)} · ${child.relationship || "Parent"}</p>
        </div>
        <span class="status-pill approved">Records visible</span>
      </div>
    </article>

    <div class="parent-record-grid">
      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Billing</h2></div>
        ${rowOrEmpty(records.fees, (fee) => `
          <div class="billing-row">
            <strong>${fee.label}</strong>
            <span>${money(fee.amount)}</span>
            <span class="status-pill ${fee.status === "paid" ? "approved" : "pending"}">${fee.status}</span>
          </div>
        `, "No billing records yet.")}
      </article>

      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Grades</h2></div>
        ${rowOrEmpty(records.grades, (grade) => `
          <div class="record-row">
            <strong>${grade.subject}</strong>
            <span>Term 1: ${grade.term_one ?? "-"} · Term 2: ${grade.term_two ?? "-"}</span>
          </div>
        `, "No grades posted yet.")}
      </article>

      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Attendance</h2></div>
        ${rowOrEmpty(records.attendance, (entry) => `
          <div class="record-row">
            <strong>${entry.school_date}</strong>
            <span>${entry.status}</span>
          </div>
        `, "No attendance records yet.")}
      </article>

      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Homework</h2></div>
        ${rowOrEmpty(records.homework, (entry) => `
          <div class="record-row">
            <strong>${entry.subject}</strong>
            <span>${entry.details}</span>
            <span>${entry.due_date ? `Due ${entry.due_date}` : "No due date"}</span>
          </div>
        `, "No homework posted yet.")}
      </article>

      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Announcements</h2></div>
        ${rowOrEmpty(records.announcements, (entry) => `
          <div class="record-row">
            <strong>${entry.title}</strong>
            <span>${entry.details}</span>
          </div>
        `, "No announcements yet.")}
      </article>

      <article class="parent-panel parent-record-card">
        <div class="record-title-row"><h2>Transportation</h2></div>
        <div class="record-row">
          <strong>Bus details</strong>
          <span>${transport}</span>
        </div>
        <div class="record-row">
          <strong>Class</strong>
          <span>${child.class?.name || classLabel(child.student)}</span>
        </div>
      </article>
    </div>
  `;
}

function renderDashboard(payload) {
  state.parent = payload.parent;
  state.children = payload.children || [];
  if (!state.selectedLinkId && state.children.length) {
    const firstApproved = state.children.find((child) => child.canViewRecords);
    state.selectedLinkId = (firstApproved || state.children[0]).linkId;
  }
  $("[data-parent-name]").textContent = `Welcome, ${state.parent.name}`;
  showDashboard();
  renderMetrics();
  renderChildren();
  renderRecords();
}

async function loadDashboard() {
  const payload = await api("/api/parent/dashboard");
  renderDashboard(payload);
}

async function loadSession() {
  try {
    const session = await api("/api/parent/session");
    if (!session.authenticated) {
      showAuth();
      return;
    }
    await loadDashboard();
  } catch (_error) {
    showAuth();
  }
}

function deviceLabel() {
  const platform = navigator.platform || "Unknown device";
  const size = `${window.screen.width}x${window.screen.height}`;
  return `${platform} ${size}`;
}

function wireEvents() {
  $$("[data-auth-tab]").forEach((tab) => {
    tab.addEventListener("click", () => setAuthMode(tab.dataset.authTab));
  });

  $("[data-parent-login-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = $("[data-auth-message]");
    const data = Object.fromEntries(new FormData(form));
    setBusy(form, true);
    setMessage(message, "");
    try {
      await api("/api/parent/login", {
        method: "POST",
        body: JSON.stringify({ identity: data.identity, password: data.password }),
      });
      await loadDashboard();
    } catch (error) {
      setMessage(message, error.message, "error");
    } finally {
      setBusy(form, false);
    }
  });

  $("[data-parent-register-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = $("[data-auth-message]");
    const data = Object.fromEntries(new FormData(form));
    if (data.password !== data.confirmPassword) {
      setMessage(message, "Passwords do not match.", "error");
      return;
    }
    setBusy(form, true);
    setMessage(message, "");
    try {
      await api("/api/parent/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
          studentId: data.studentId,
          relationship: data.relationship,
          registrationSource: "web_portal",
          registrationDevice: deviceLabel(),
        }),
      });
      form.reset();
      setAuthMode("login");
      setMessage(message, "Account request sent. Sign in after the school office approves it.", "success");
    } catch (error) {
      setMessage(message, error.message, "error");
    } finally {
      setBusy(form, false);
    }
  });

  $("[data-child-list]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-child]");
    if (!button) {
      return;
    }
    state.selectedLinkId = button.dataset.selectChild;
    renderChildren();
    renderRecords();
  });

  $("[data-add-child-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = $("[data-add-child-message]");
    const data = Object.fromEntries(new FormData(form));
    setBusy(form, true);
    setMessage(message, "");
    try {
      await api("/api/parent/children", {
        method: "POST",
        body: JSON.stringify({ studentId: data.studentId, relationship: data.relationship }),
      });
      form.reset();
      setMessage(message, "Child request sent for admin approval.", "success");
      await loadDashboard();
    } catch (error) {
      setMessage(message, error.message, "error");
    } finally {
      setBusy(form, false);
    }
  });

  $("[data-logout]")?.addEventListener("click", async () => {
    await api("/api/parent/logout", { method: "POST", body: "{}" }).catch(() => null);
    state.parent = null;
    state.children = [];
    state.selectedLinkId = null;
    showAuth();
  });
}

wireEvents();
setAuthMode("login");
loadSession();
