(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const defaultAccounts = [
    { id: "yt1", platform: "YouTube", name: "YOUTUBE 1", url: "", status: "disconnected" },
    { id: "yt2", platform: "YouTube", name: "YOUTUBE 2", url: "", status: "disconnected" },
    { id: "yt3", platform: "YouTube", name: "YOUTUBE 3", url: "", status: "disconnected" },
    { id: "tt1", platform: "TikTok", name: "TIK TOK 1", url: "", status: "disconnected" },
    { id: "tt2", platform: "TikTok", name: "TIK TOK 2", url: "", status: "disconnected" },
    { id: "fb1", platform: "Facebook", name: "FACEBOOK 1", url: "", status: "disconnected" },
    { id: "ig1", platform: "Instagram", name: "INSTAGRAM 1", url: "", status: "disconnected" }
  ];

  const translations = {
    en: {
      workspace: "WORKSPACE",
      overview: "Overview",
      accounts: "All Accounts",
      content: "Content Manager",
      reports: "Reports & Export",
      connectedAccounts: "CONNECTED ACCOUNTS",
      apiStatus: "API Status",
      notConnected: "Not connected",
      settings: "Settings",
      demoMode: "DEMO MODE",
      socialOverview: "SOCIAL OVERVIEW",
      overviewTitle: "Your community, one view.",
      overviewSubtitle: "Track your seven social accounts in one place.",
      manageAccounts: "Manage accounts",
      demoNoticeTitle: "Live data is not connected",
      demoNotice: "This dashboard shows connection states and sample visualizations only. Connect approved APIs before relying on metrics.",
      totalViews: "Total Views / Plays",
      totalEngagement: "Total Engagement",
      audience: "Followers / Subscribers",
      awaitingData: "Waiting for API data",
      separateMetrics: "Tracked separately by platform",
      connectionNeeds: "API authorization required",
      growthOverview: "Growth overview",
      growthCaption: "Account metrics appear after API connection",
      accountHealth: "Account health",
      accountHealthCaption: "Connection status by platform",
      accountSnapshot: "Account snapshot",
      accountSnapshotCaption: "Each account keeps its own details and reports",
      viewAll: "View all →",
      allAccountsTitle: "All seven accounts",
      allAccountsSubtitle: "Select an account to view its dedicated dashboard.",
      addAccount: "Add account",
      accountDataTitle: "Account-specific data",
      accountDataNotice: "Metrics below remain unavailable until this account is connected through an approved API. Profile URLs alone do not unlock private analytics.",
      viewsPlays: "Views / Plays",
      likes: "Likes",
      comments: "Comments",
      notAvailable: "Not available",
      noAnalytics: "No analytics available",
      connectForData: "Connect this account using its official API to load permitted data here.",
      contentTitle: "Content manager",
      contentSubtitle: "Organize your own video and post links across accounts.",
      addContent: "Add content",
      noContent: "No content saved yet",
      addContentHint: "Add a post or video link to organize it here.",
      reportsTitle: "Reports & export",
      reportsSubtitle: "Export account lists and content records. Analytics exports require connected data.",
      settingsTitle: "Settings",
      settingsSubtitle: "Manage account labels and dashboard preferences.",
      accountSettings: "Account settings",
      accountSettingsText: "Edit account names and URLs. This only saves locally in this browser.",
      security: "Security",
      securityText: "This static frontend does not provide secure admin authentication. Add a server-side auth provider before production use.",
      dataPrivacy: "Data & privacy",
      dataPrivacyText: "Never place API secrets or access tokens in public repository files."
    },

    bn: {
      workspace: "কর্মক্ষেত্র",
      overview: "ওভারভিউ",
      accounts: "সব অ্যাকাউন্ট",
      content: "কনটেন্ট ম্যানেজার",
      reports: "রিপোর্ট ও এক্সপোর্ট",
      connectedAccounts: "সংযুক্ত অ্যাকাউন্ট",
      apiStatus: "API অবস্থা",
      notConnected: "সংযুক্ত নয়",
      settings: "সেটিংস",
      demoMode: "ডেমো মোড",
      socialOverview: "সোশ্যাল ওভারভিউ",
      overviewTitle: "সব কমিউনিটি, এক জায়গায়।",
      overviewSubtitle: "তোমার সাতটি সোশ্যাল অ্যাকাউন্ট এক জায়গা থেকে দেখো।",
      manageAccounts: "অ্যাকাউন্ট পরিচালনা",
      demoNoticeTitle: "লাইভ ডেটা সংযুক্ত নয়",
      demoNotice: "এখানে সংযোগের অবস্থা ও ড্যাশবোর্ডের কাঠামো দেখা যাচ্ছে। প্রকৃত মেট্রিকের জন্য অনুমোদিত API যুক্ত করো।",
      totalViews: "মোট ভিউ / প্লে",
      totalEngagement: "মোট এনগেজমেন্ট",
      audience: "ফলোয়ার / সাবস্ক্রাইবার",
      awaitingData: "API ডেটার অপেক্ষায়",
      separateMetrics: "প্ল্যাটফর্ম অনুযায়ী আলাদা হিসাব",
      connectionNeeds: "API অনুমোদন প্রয়োজন",
      growthOverview: "গ্রোথ ওভারভিউ",
      growthCaption: "API সংযোগের পর অ্যাকাউন্টের মেট্রিক দেখা যাবে",
      accountHealth: "অ্যাকাউন্টের অবস্থা",
      accountHealthCaption: "প্ল্যাটফর্ম অনুযায়ী সংযোগের অবস্থা",
      accountSnapshot: "অ্যাকাউন্টের সারাংশ",
      accountSnapshotCaption: "প্রতিটি অ্যাকাউন্টের তথ্য ও রিপোর্ট আলাদা",
      viewAll: "সব দেখুন →",
      allAccountsTitle: "সাতটি অ্যাকাউন্ট",
      allAccountsSubtitle: "নিজস্ব ড্যাশবোর্ড দেখতে একটি অ্যাকাউন্ট বেছে নাও।",
      addAccount: "অ্যাকাউন্ট যোগ",
      accountDataTitle: "নির্বাচিত অ্যাকাউন্টের তথ্য",
      accountDataNotice: "অনুমোদিত API সংযোগ না হওয়া পর্যন্ত নিচের মেট্রিক পাওয়া যাবে না। শুধু প্রোফাইল লিংক দিয়ে ব্যক্তিগত অ্যানালিটিক্স পাওয়া যায় না।",
      viewsPlays: "ভিউ / প্লে",
      likes: "লাইক",
      comments: "কমেন্ট",
      notAvailable: "পাওয়া যায়নি",
      noAnalytics: "এখনো অ্যানালিটিক্স নেই",
      connectForData: "অনুমোদিত ডেটা দেখতে এই অ্যাকাউন্টের অফিসিয়াল API যুক্ত করো।",
      contentTitle: "কনটেন্ট ম্যানেজার",
      contentSubtitle: "সব অ্যাকাউন্টের নিজের ভিডিও ও পোস্টের লিংক গুছিয়ে রাখো।",
      addContent: "কনটেন্ট যোগ",
      noContent: "এখনো কোনো কনটেন্ট সংরক্ষিত নেই",
      addContentHint: "এখানে সাজাতে পোস্ট বা ভিডিওর লিংক যোগ করো।",
      reportsTitle: "রিপোর্ট ও এক্সপোর্ট",
      reportsSubtitle: "অ্যাকাউন্ট তালিকা ও কনটেন্ট রেকর্ড ডাউনলোড করো। লাইভ অ্যানালিটিক্সের জন্য API দরকার।",
      settingsTitle: "সেটিংস",
      settingsSubtitle: "অ্যাকাউন্টের নাম ও ড্যাশবোর্ডের পছন্দ নিয়ন্ত্রণ করো।",
      accountSettings: "অ্যাকাউন্ট সেটিংস",
      accountSettingsText: "অ্যাকাউন্টের নাম ও URL বদলানো যাবে। এই পরিবর্তন শুধু এই ব্রাউজারে সংরক্ষিত হবে।",
      security: "নিরাপত্তা",
      securityText: "এই static frontend প্রকৃত নিরাপদ Admin Login দেয় না। প্রকাশের আগে সার্ভার-সাইড Authentication যুক্ত করো।",
      dataPrivacy: "ডেটা ও গোপনীয়তা",
      dataPrivacyText: "Public repository-তে API Secret বা Access Token রেখো না।"
    }
  };

  let language = "en";
  let currentAccountId = "yt1";
  let currentDetailTab = "analytics";
  let toastTimer;
  let accounts = loadAccounts();
  let contentItems = [];
  let chart = null;

  function loadAccounts() {
    try {
      const saved = JSON.parse(localStorage.getItem("agcm_accounts") || "null");
      if (Array.isArray(saved) && saved.length === 7) {
        return defaultAccounts.map(d => ({
          ...d,
          ...saved.find(x => x.id === d.id)
        }));
      }
    } catch (e) {}
    return defaultAccounts.map(a => ({ ...a }));
  }

  function saveAccounts() {
    try {
      localStorage.setItem("agcm_accounts", JSON.stringify(accounts));
    } catch (e) {
      showToast("Could not save in this browser.");
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function iconFor(platform) {
    return ({
      YouTube: "YT",
      TikTok: "TT",
      Facebook: "f",
      Instagram: "IG"
    })[platform] || "AG";
  }

  function statusLabel(a) {
    return a.status === "connected" ? "Connected" : "Not connected";
  }

  function showToast(message) {
    const t = $("#toast");
    t.textContent = message;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  function translate() {
    document.documentElement.lang = language;

    $$("[data-i18n]").forEach(el => {
      const val = translations[language][el.dataset.i18n];
      if (val) el.textContent = val;
    });

    $("#languageToggle").textContent =
      language === "en" ? "বাংলা" : "English";

    renderAll();
  }

  function renderAccountNav() {
    const nav = $("#accountNav");

    nav.innerHTML = accounts.map(a => `
      <button class="nav-item account-link ${currentAccountId === a.id ? "active" : ""}"
              data-account="${a.id}">
        <span class="platform-dot">${iconFor(a.platform)}</span>
        <span>${escapeHTML(a.name)}</span>
      </button>
    `).join("");
  }

  function accountRow(a) {
    return `
      <tr>
        <td>
          <div class="account-cell">
            <span class="platform-dot">${iconFor(a.platform)}</span>
            <div>
              <strong>${escapeHTML(a.name)}</strong>
              <small>${escapeHTML(a.platform)}</small>
            </div>
          </div>
        </td>
        <td>${escapeHTML(a.platform)}</td>
        <td><span class="status-pill ${a.status}">${statusLabel(a)}</span></td>
        <td>—</td>
        <td><button class="table-action" data-open-account="${a.id}">Open →</button></td>
      </tr>
    `;
  }

  function renderOverview() {
    $("#overviewAccounts").innerHTML = accounts.map(accountRow).join("");

    $("#connectedCount").textContent =
      `${accounts.filter(a => a.status === "connected").length} / 7`;

    $("#healthList").innerHTML = accounts.map(a => `
      <div class="health-item">
        <span class="platform-dot">${iconFor(a.platform)}</span>
        <div class="health-text">
          <strong>${escapeHTML(a.name)}</strong>
          <small>${escapeHTML(a.platform)}</small>
        </div>
        <span class="status-pill ${a.status}">${statusLabel(a)}</span>
      </div>
    `).join("");

    if (chart) {
      chart.destroy();
      chart = null;
    }

    const canvas = $("#growthChart");

    if (window.Chart && canvas) {
      chart = new Chart(canvas, {
        type: "line",
        data: {
          labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
          datasets: [{
            label: "Live data unavailable",
            data: [null, null, null, null, null, null, null],
            borderColor: "#39bdf8",
            backgroundColor: "#39bdf820",
            spanGaps: false,
            tension: 0.35
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: {
              grid: { color: "#202a3d" },
              ticks: { color: "#8290a8" }
            },
            y: {
              grid: { color: "#202a3d" },
              ticks: { color: "#8290a8" }
            }
          }
        }
      });
    }

    $("#chartEmpty").style.display = "grid";
  }

  function renderAccountCards() {
    $("#accountCards").innerHTML = accounts.map(a => `
      <article class="account-card">
        <div class="account-card-top">
          <div class="account-card-identity">
            <span class="platform-dot">${iconFor(a.platform)}</span>
            <div>
              <h3>${escapeHTML(a.name)}</h3>
              <p>${escapeHTML(a.platform)}</p>
            </div>
          </div>
          <span class="status-pill ${a.status}">${statusLabel(a)}</span>
        </div>

        <div class="account-url">
          ${a.url ? escapeHTML(a.url) : "No profile URL added"}
        </div>

        <div class="account-card-stats">
          <div><span>Views / Plays</span><strong>—</strong></div>
          <div><span>Audience</span><strong>—</strong></div>
        </div>

        <div class="account-card-actions">
          <button class="secondary-btn" data-open-account="${a.id}">View details</button>
          <button class="icon-btn" data-edit-account="${a.id}" aria-label="Edit ${escapeHTML(a.name)}">✎</button>
        </div>
      </article>
    `).join("");
  }

  function renderDetail() {
    const a = accounts.find(x => x.id === currentAccountId) || accounts[0];

    $("#detailName").textContent = a.name;
    $("#detailPlatform").textContent = `${a.platform.toUpperCase()} · ACCOUNT DETAILS`;
    $("#detailUrl").textContent = a.url || "No profile URL added yet.";
    $("#detailStatus").textContent = statusLabel(a);
    $("#detailStatus").className = `status-pill ${a.status}`;

    $("#audienceMetricLabel").textContent =
      a.platform === "YouTube" ? "Subscribers" : "Followers";

    renderDetailTab();
  }

  function renderDetailTab() {
    const a = accounts.find(x => x.id === currentAccountId) || accounts[0];
    const panel = $("#detailTabPanel");

    if (currentDetailTab === "content") {
      panel.innerHTML = `
        <div class="empty-state">
          <span>▶</span>
          <h2>Videos / Posts</h2>
          <p>No platform content has been imported. Add links in Content Manager or connect an approved API.</p>
          <button class="secondary-btn" data-page="content">Open Content Manager</button>
        </div>`;
    } else if (currentDetailTab === "reports") {
      panel.innerHTML = `
        <div class="empty-state">
          <span>▤</span>
          <h2>Report for ${escapeHTML(a.name)}</h2>
          <p>Account configuration can be exported. Analytics reports will be available after API data is connected.</p>
          <button class="secondary-btn" data-export-one="${a.id}">Export account CSV</button>
        </div>`;
    } else if (currentDetailTab === "comments") {
      panel.innerHTML = `
        <div class="empty-state">
          <span>☷</span>
          <h2>Comments</h2>
          <p>Comment data and moderation actions require the platform's specific API permissions.</p>
          <span class="status-pill disconnected">Permission required</span>
        </div>`;
    } else if (currentDetailTab === "growth") {
      panel.innerHTML = `
        <div class="empty-state">
          <span>⌁</span>
          <h2>Growth history</h2>
          <p>No historical metrics have been synced for ${escapeHTML(a.name)}.</p>
          <span class="status-pill disconnected">API required</span>
        </div>`;
    } else {
      panel.innerHTML = `
        <div class="empty-state">
          <span>⌁</span>
          <h2>${language === "bn" ? "কোনো লাইভ অ্যানালিটিক্স নেই" : "No analytics available"}</h2>
          <p>${language === "bn"
            ? "অনুমোদিত ডেটা দেখতে এই অ্যাকাউন্টের অফিসিয়াল API যুক্ত করো।"
            : "Connect this account using its official API to load permitted data here."}</p>
          <button class="secondary-btn" id="connectionHelpBtn">Connection setup</button>
        </div>`;
    }
  }

  function renderContent() {
    const q = ($("#contentSearch").value || "").toLowerCase();
    const filter = $("#contentAccountFilter").value;

    const shown = contentItems.filter(c =>
      (filter === "all" || c.accountId === filter) &&
      (`${c.title} ${c.url}`).toLowerCase().includes(q)
    );

    $("#contentRows").innerHTML = shown.map((c, i) => `
      <tr>
        <td>${escapeHTML(c.title)}</td>
        <td>${escapeHTML((accounts.find(a => a.id === c.accountId) || {}).name || "Unknown")}</td>
        <td><a href="${escapeHTML(c.url)}" target="_blank" rel="noopener noreferrer">Open link ↗</a></td>
        <td>${escapeHTML(c.date)}</td>
        <td><button class="table-action" data-delete-content="${i}">Delete</button></td>
      </tr>
    `).join("");

    $("#contentEmpty").style.display = shown.length ? "none" : "flex";
  }

  function renderAll() {
    renderAccountNav();
    renderOverview();
    renderAccountCards();
    renderDetail();
    $("#contentAccountFilter").innerHTML =
      '<option value="all">All accounts</option>' +
      accounts.map(a => `<option value="${a.id}">${escapeHTML(a.name)}</option>`).join("");
    renderContent();
  }

  function navigate(page) {
    $$(".page").forEach(p => p.classList.toggle("active", p.id === `page-${page}`));

    $$(".nav-item[data-page]").forEach(b =>
      b.classList.toggle("active", b.dataset.page === page)
    );

    const title = ({
      overview: "Overview",
      accounts: "All Accounts",
      detail: "Account Details",
      content: "Content Manager",
      reports: "Reports & Export",
      settings: "Settings"
    })[page] || "Overview";

    $("#pageCrumb").textContent = title;
    $("#sidebar").classList.remove("open");

    if (page === "detail") renderDetail();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openAccount(id) {
    currentAccountId = id;
    currentDetailTab = "analytics";

    $$(".detail-tab").forEach(b =>
      b.classList.toggle("active", b.dataset.tab === "analytics")
    );

    renderAccountNav();
    renderDetail();
    navigate("detail");
  }

  function openModal(id) {
    const a = accounts.find(x => x.id === id);

    $("#accountForm").reset();
    $("#accountId").value = a?.id || "";
    $("#accountName").value = a?.name || "";
    $("#accountUrl").value = a?.url || "";
    $("#modalTitle").textContent = a ? "Edit account" : "Add account";
    $("#modalBackdrop").hidden = false;
    $("#accountName").focus();
  }

  function closeModal() {
    $("#modalBackdrop").hidden = true;
  }

  function validUrl(value) {
    if (!value) return true;

    try {
      const u = new URL(value);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch (e) {
      return false;
    }
  }

  function csvEscape(v) {
    return '"' + String(v ?? "").replace(/"/g, '""') + '"';
  }

  function downloadCSV(filename, rows) {
    const csv = "\uFEFF" + rows
      .map(row => row.map(csvEscape).join(","))
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showToast("CSV export started.");
  }

  function exportAccounts(ids) {
    const selected = accounts.filter(a => !ids || ids.includes(a.id));

    downloadCSV("ag-online-accounts.csv", [
      ["Account ID", "Name", "Platform", "Profile URL", "Connection Status"],
      ...selected.map(a => [
        a.id, a.name, a.platform, a.url, statusLabel(a)
      ])
    ]);
  }

  function exportContent() {
    downloadCSV("ag-online-content.csv", [
      ["Title", "Account", "URL", "Date Added"],
      ...contentItems.map(c => [
        c.title,
        (accounts.find(a => a.id === c.accountId) || {}).name || "",
        c.url,
        c.date
      ])
    ]);
  }

  function addContent() {
    const title = prompt("Content title:");

    if (title === null) return;

    if (!title.trim()) {
      showToast("Please enter a title.");
      return;
    }

    const url = prompt("Video or post URL (https://...):");

    if (url === null) return;

    if (!validUrl(url) || !url) {
      showToast("Enter a valid http(s) URL.");
      return;
    }

    const accountId = prompt(
      "Account ID: yt1, yt2, yt3, tt1, tt2, fb1, ig1",
      currentAccountId
    );

    if (accountId === null) return;

    if (!accounts.some(a => a.id === accountId)) {
      showToast("Unknown account ID.");
      return;
    }

    contentItems.unshift({
      title: title.trim(),
      url,
      accountId,
      date: new Date().toLocaleDateString()
    });

    renderContent();
    showToast("Content saved for this browser session.");
  }

  function bindEvents() {
    document.addEventListener("click", e => {
      const page = e.target.closest("[data-page]");

      if (page) {
        e.preventDefault();
        navigate(page.dataset.page);
        return;
      }

      const open = e.target.closest("[data-open-account]");

      if (open) {
        openAccount(open.dataset.openAccount);
        return;
      }

      const edit = e.target.closest("[data-edit-account]");

      if (edit) {
        openModal(edit.dataset.editAccount);
        return;
      }

      const exp = e.target.closest("[data-export-one]");

      if (exp) {
        exportAccounts([exp.dataset.exportOne]);
        return;
      }

      const del = e.target.closest("[data-delete-content]");

      if (del) {
        contentItems.splice(Number(del.dataset.deleteContent), 1);
        renderContent();
        showToast("Content removed from this session.");
        return;
      }

      const tab = e.target.closest("[data-tab]");

      if (tab) {
        currentDetailTab = tab.dataset.tab;

        $$(".detail-tab").forEach(b =>
          b.classList.toggle("active", b === tab)
        );

        renderDetailTab();
      }
    });

    $("#menuToggle").addEventListener("click", () =>
      $("#sidebar").classList.toggle("open")
    );

    $("#languageToggle").addEventListener("click", () => {
      language = language === "en" ? "bn" : "en";
      translate();
    });

    $("#addAccountBtn").addEventListener("click", () =>
      showToast("Seven account slots are predefined. Edit an existing account instead.")
    );

    $("#editAccountBtn").addEventListener("click", () =>
      openModal(currentAccountId)
    );

    $("#accountForm").addEventListener("submit", e => {
      e.preventDefault();

      const id = $("#accountId").value;
      const name = $("#accountName").value.trim();
      const url = $("#accountUrl").value.trim();

      if (!name) {
        showToast("Enter an account name.");
        return;
      }

      if (!validUrl(url)) {
        showToast("Use a valid http(s) URL.");
        return;
      }

      const a = accounts.find(x => x.id === id);

      if (!a) {
        showToast("Account slot not found.");
        return;
      }

      a.name = name;
      a.url = url;

      saveAccounts();
      closeModal();
      renderAll();
      showToast("Account details saved in this browser.");
    });

    $("#closeModal").addEventListener("click", closeModal);
    $("#cancelModal").addEventListener("click", closeModal);

    $("#modalBackdrop").addEventListener("click", e => {
      if (e.target === $("#modalBackdrop")) closeModal();
    });

    $("#exportAccountsBtn").addEventListener("click", () => exportAccounts());
    $("#exportAccountsBtn2").addEventListener("click", () => exportAccounts());
    $("#exportContentBtn").addEventListener("click", exportContent);

    $("#addContentBtn").addEventListener("click", addContent);
    $("#contentSearch").addEventListener("input", renderContent);
    $("#contentAccountFilter").addEventListener("change", renderContent);

    $("#settingsAccountsBtn").addEventListener("click", () =>
      navigate("accounts")
    );

    $("#clearLocalBtn").addEventListener("click", () => {
      if (confirm("Clear content saved in this page session?")) {
        contentItems = [];
        renderContent();
        showToast("Session content cleared.");
      }
    });

    $("#adminButton").addEventListener("click", () =>
      showToast("Admin login is not implemented. Secure server-side authentication is required.")
    );

    $("#connectionHelpBtn").addEventListener("click", () =>
      showToast("Official API approval and a secure backend are required.")
    );

    $("#dateFilter").addEventListener("change", () =>
      showToast("Date range applies when historical API data is connected.")
    );

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }

  bindEvents();
  renderAll();
})();
