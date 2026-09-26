const apps = [
  {
    name: "Spin Winner",
    url: "https://pspinwinner.com/?code=SDND6XPM7GA&t=1790021813",
    badge: "HOT"
  },
     {
    name: "JaiHo Rummy",
    url: "https://jaihoclud.com/?code=E74GT2ZBVS6&t=1790221269",
    badge: "HOT"
},
  {
    name: "Ok Rummy",
    url: "https://www.okrummy18.com/?code=H2GGDU7RSBW&t=1790188944",
    badge: "HOT"
},
  {
    name: "Ind Club",
    url: "https://indclubjjj.com/?code=34ULJ13EXHT&t=1790223546",
    badge: "NEW"
},
  {
    name: "Joy Rummy 11",
    url: "https://www.joyrummy11.com/?code=J5K7CCG46NH&t=1790018739",
    badge: "HOT"
  },
  {
    name: "IND Rummy",
    url: "https://yonocom.net/?code=2BAMQ4EMXL4&t=1790019715",
    badge: "NEW"
  },
  {
    name: "Jai Slots VIP",
    url: "https://www.jaihoslotsvip.com/?code=EGPX7VR84NA&t=1790019751",
    badge: "NEW"
  },
];

const cards = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const dialog = document.getElementById("infoDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogEyebrow = document.getElementById("dialogEyebrow");
const dialogText = document.getElementById("dialogText");

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join("").toUpperCase();
}

function render(list) {
  cards.innerHTML = list.map((app, index) => `
    <article class="card">
      <div class="app-icon" aria-hidden="true">${initials(app.name)}</div>
      <div class="card-main">
        <div class="card-title-row">
          <h3>${app.name}</h3>
          <span class="badge ${app.badge === "HOT" ? "hot" : "new"}">${app.badge}</span>
        </div>
        <div class="card-meta">Available through Destin Presents</div>
      </div>
      <a class="card-btn" href="${app.url}" target="_blank" rel="noopener noreferrer">
        OPEN <span>↗</span>
      </a>
    </article>
  `).join("");

  resultCount.textContent = `${list.length} ${list.length === 1 ? "pick" : "picks"}`;
  emptyState.hidden = list.length !== 0;
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  render(apps.filter(app => app.name.toLowerCase().includes(q)));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
});

document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Destin Presents",
    text: "Discover games and apps in one place.",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Main page link copied!");
    } else {
      showToast("Copy this page URL from your browser.");
    }
  } catch (err) {
    if (err.name !== "AbortError") showToast("Share cancelled.");
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function setTheme(light) {
  document.documentElement.classList.toggle("light", light);
  themeIcon.textContent = light ? "☀" : "☾";
  localStorage.setItem("destin-theme", light ? "light" : "dark");
}

themeToggle.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("light"));
});

setTheme(localStorage.getItem("destin-theme") === "light");

function openInfo(type) {
  if (type === "privacy") {
    dialogEyebrow.textContent = "PRIVACY";
    dialogTitle.textContent = "Privacy";
    dialogText.textContent =
      "Destin Presents is designed as a static page and does not require an account or database. Search and theme preferences are handled locally in your browser. External links open the respective third-party service, whose privacy policy and terms apply when you leave this site.";
  } else {
    dialogEyebrow.textContent = "DISCLAIMER";
    dialogTitle.textContent = "Disclaimer";
    dialogText.textContent =
      "Destin Presents is an independent link directory. External services are operated by their respective owners. Some links may be referral links. Please independently check a service's authenticity, eligibility, terms, age requirements and applicable laws before using it.";
  }
  dialog.showModal();
}

document.getElementById("privacyLink").addEventListener("click", (e) => {
  e.preventDefault();
  openInfo("privacy");
});

document.getElementById("disclaimerLink").addEventListener("click", (e) => {
  e.preventDefault();
  openInfo("disclaimer");
});

document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

document.getElementById("year").textContent = new Date().getFullYear();
render(apps);
