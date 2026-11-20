// ============================================================================
// ADD FUTURE VERSIONS HERE (Newest version first!)
// Just duplicate an entry, bump version/date/notes, and point `apkUrl` to your
// new APK file (e.g. "files/word-ladder-v1.1.apk" or a GitHub Release URL).
// ============================================================================
const RELEASES = [
  
  {
    version: "2.0.4",
    channel: "stable", // "stable" | "beta"
    date: "2026-11-16",
    minAndroid: "Android 7.0+ (API 24)",
    size: "APK",
    apkUrl: "../files/v2.0.4/app-debug.apk",
    fileName: "WordLadder-v2.0.4.apk",
    notes: [
      "51,000+ English dictionary supporting 4, 5, 6, and 7-letter word ladders.",
      "Optional per-session speed timer (up to 2.5x points) toggleable before or during any match, plus flexible detour backtracking.",
      "Dedicated Home, Online, Rooms, and Settings bottom navigation tabs with Back buttons, early End Game, and Close/Leave Room controls.",
      "Live turn alerts, system notifications, Quick Matchmaking, direct player challenges, and customizable themes & tile materials."
    ]
  }
];

const DEMO_LADDER = [
  { word: "MILK", prev: null, tag: "START" },
  { word: "SILK", prev: "MILK", tag: "+20 PTS" },
  { word: "SICK", prev: "SILK", tag: "+20 PTS" },
  { word: "SOCK", prev: "SICK", tag: "+20 PTS" },
  { word: "SOUK", prev: "SOCK", tag: "+20 PTS" },
  { word: "SOUP", prev: "SOUK", tag: "TARGET" }
];

function renderHeroLatest() {
  const latest = RELEASES[0];
  const box = document.getElementById("latestDownloadBox");
  const note = document.getElementById("latestMetaNote");
  if (!latest || !box) return;

  box.innerHTML = `
    <a class="tactile-btn" href="${latest.apkUrl}" download="${latest.fileName}">
      DOWNLOAD v${latest.version} APK
    </a>
    <a class="tactile-btn emerald" href="demo.html">
      PLAY WEB (iOS &amp; PC)
    </a>
    <a class="tactile-btn secondary" href="#releases">
      ALL VERSIONS (${RELEASES.length})
    </a>
  `;

  note.textContent = `Latest: v${latest.version} • ${latest.date} • ${latest.minAndroid} • ${latest.apkUrl}`;
}

function renderReleases(filter = "all") {
  const list = document.getElementById("releaseList");
  const footerCount = document.getElementById("footerCount");
  if (!list) return;

  const visible = RELEASES.filter((r) => filter === "all" || r.channel === filter);
  footerCount.textContent = `${RELEASES.length} RELEASE${RELEASES.length === 1 ? "" : "S"} LISTED`;

  if (visible.length === 0) {
    list.innerHTML = `<div class="release-card"><p class="subtitle" style="margin:0">No releases in this channel yet.</p></div>`;
    return;
  }

  list.innerHTML = visible
    .map((rel, idx) => {
      const isLatest = idx === 0 && filter === "all";
      const notesHtml = rel.notes.map((n) => `<li>${n}</li>`).join("");
      return `
        <article class="release-card">
          <div class="release-info">
            <div class="release-title-row">
              <span class="version-pill">v${rel.version}</span>
              <span class="channel-pill ${rel.channel}">${isLatest ? "LATEST • " : ""}${rel.channel}</span>
              <span class="release-date">${rel.date} • ${rel.minAndroid}</span>
            </div>
            <ul class="release-notes">${notesHtml}</ul>
          </div>
          <div class="release-actions">
            <button class="tactile-btn secondary small copy-link-btn" data-url="${rel.apkUrl}" type="button">
              COPY LINK
            </button>
            <a class="tactile-btn emerald small" href="${rel.apkUrl}" download="${rel.fileName}">
              DOWNLOAD APK
            </a>
          </div>
        </article>
      `;
    })
    .join("");

  list.querySelectorAll(".copy-link-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const relative = btn.getAttribute("data-url");
      const fullUrl = new URL(relative, window.location.href).href;
      try {
        await navigator.clipboard.writeText(fullUrl);
        btn.textContent = "COPIED";
        setTimeout(() => (btn.textContent = "COPY LINK"), 1500);
      } catch {
        btn.textContent = relative;
      }
    });
  });
}

function renderDemoLadder() {
  const container = document.getElementById("demoLadder");
  const label = document.getElementById("demoStepLabel");
  if (!container) return;

  container.innerHTML = DEMO_LADDER.map((step, index) => {
    const tiles = step.word
      .split("")
      .map((ch, i) => {
        let cls = "tile";
        if (index === 0) cls += " start";
        else if (index === DEMO_LADDER.length - 1) cls += " target";
        else if (step.prev && step.prev[i] !== ch) cls += " changed";
        return `<span class="${cls}">${ch}</span>`;
      })
      .join("");

    return `
      <div class="ladder-row" data-index="${index}">
        <div class="tiles-group">${tiles}</div>
        <span class="row-meta">${step.tag}</span>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".ladder-row").forEach((row) => {
    row.addEventListener("click", () => {
      container.querySelectorAll(".ladder-row").forEach((r) => r.classList.remove("selected"));
      row.classList.add("selected");
      const idx = Number(row.getAttribute("data-index"));
      const item = DEMO_LADDER[idx];
      if (idx === 0) {
        label.textContent = "START: MILK";
      } else {
        const diffIdx = item.word.split("").findIndex((c, i) => c !== item.prev[i]);
        label.textContent = `${item.prev} → ${item.word} (POS ${diffIdx + 1})`;
      }
    });
  });
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("wl_theme");
  const isDark = saved ? saved === "dark" : true;

  const apply = (dark) => {
    document.body.classList.toggle("dark", dark);
    btn.textContent = dark ? "WARM OAK" : "SLATE NIGHT";
  };

  apply(isDark);
  btn.addEventListener("click", () => {
    const next = !document.body.classList.contains("dark");
    localStorage.setItem("wl_theme", next ? "dark" : "light");
    apply(next);
  });
}

function setupFilters() {
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderReleases(chip.getAttribute("data-filter"));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  renderHeroLatest();
  renderReleases("all");
  renderDemoLadder();
  setupFilters();
});
document.getElementById("changePage").addEventListener("click", () => {
  window.location.href = "../index.html";
});