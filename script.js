document.addEventListener("DOMContentLoaded", () => {
  // ---------- 語言切換 ----------
  let currentLang = localStorage.getItem("resume-lang") || "zh";

  function applyLang() {
    const elements = document.querySelectorAll(".i18n");
    elements.forEach((el) => {
      const text = el.dataset[currentLang];
      if (text) el.textContent = text;
    });

    document.documentElement.lang = currentLang === "zh" ? "zh-Hant" : "en";

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = currentLang === "zh" ? "EN" : "中";

    const navBtn = document.getElementById("navLangToggle");
    if (navBtn) {
      navBtn.textContent = currentLang === "zh" ? "切換語言：中 → EN" : "Switch to 中文";
    }
  }

  applyLang();

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "zh" ? "en" : "zh";
      localStorage.setItem("resume-lang", currentLang);
      applyLang();
    });
  }

  const navLangBtn = document.getElementById("navLangToggle");
  if (navLangBtn) {
    navLangBtn.addEventListener("click", () => {
      currentLang = currentLang === "zh" ? "en" : "zh";
      localStorage.setItem("resume-lang", currentLang);
      applyLang();
    });
  }

  // ---------- 下載 PDF（桌機按鈕 + 手機選單共用） ----------
  function downloadPdf() {
    if (typeof html2pdf === "undefined") {
      console.warn("html2pdf 尚未載入，請確認已引入 CDN 或本地檔。");
      return;
    }
    const element = document.querySelector(".container");
    if (!element) return;

    const options = {
      margin: [10, 10, 10, 10],
      filename: "AndyWong-Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  }

  const pdfBtn = document.getElementById("btnDownload");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", downloadPdf);
  }

  const navDownloadBtn = document.getElementById("navDownload");
  if (navDownloadBtn) {
    navDownloadBtn.addEventListener("click", () => {
      closeMobileNav();
      downloadPdf();
    });
  }

  // ---------- 手機漢堡選單：右側滑出 ----------
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileBackdrop = document.getElementById("mobileNavBackdrop");

  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add("open");
    if (mobileBackdrop) mobileBackdrop.classList.add("show");
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove("open");
    if (mobileBackdrop) mobileBackdrop.classList.remove("show");
  }

  if (menuToggle && mobileNav && mobileBackdrop) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileBackdrop.addEventListener("click", closeMobileNav);

    // 點選單裡的連結也關閉
    mobileNav.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        // 導航到其他頁面的 a 也會觸發這裡
        closeMobileNav();
      });
    });
  }

  // ---------- Portfolio 側邊欄點擊捲動（只有在 portfolio.html 會生效） ----------
  const pfButtons = document.querySelectorAll(".pf-nav-item");
  if (pfButtons.length > 0) {
    pfButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pfTarget;
        const target = document.getElementById(id);
        if (!target) return;
        pfButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
});