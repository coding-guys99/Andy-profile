// ===== 全部等 DOM 載完再動手 =====
document.addEventListener("DOMContentLoaded", () => {
  // ---------- 語言切換 ----------
  let currentLang = localStorage.getItem("resume-lang") || "zh";

  function applyLang() {
    const elements = document.querySelectorAll(".i18n");
    elements.forEach((el) => {
      const text = el.dataset[currentLang];
      if (text) el.textContent = text;
    });

    document.documentElement.lang =
      currentLang === "zh" ? "zh-Hant" : "en";

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = currentLang === "zh" ? "EN" : "中";
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

  // ---------- 下載 PDF（html2pdf） ----------
  const pdfBtn = document.getElementById("btnDownload");
  if (pdfBtn) {
    if (typeof html2pdf === "undefined") {
      console.warn("html2pdf 尚未載入，請確認 index.html 有正確引入 CDN。");
    } else {
      pdfBtn.addEventListener("click", () => {
        const element = document.querySelector(".container");
        if (!element) return;

        const options = {
          margin:       [10, 10, 10, 10],              // mm
          filename:     "AndyWong-Resume.pdf",
          image:        { type: "jpeg", quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak:    { mode: ["css", "legacy"] },
        };

        html2pdf().set(options).from(element).save();
      });
    }
  }
  
    // ---------- Portfolio 側邊欄點擊 → 捲到對應區塊 ----------
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

  // ---------- 手機漢堡選單 ----------
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const visible = mobileNav.style.display === "block";
      mobileNav.style.display = visible ? "none" : "block";
    });

    // 點到連結時收起
    mobileNav.querySelectorAll(".nav-item").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.style.display = "none";
      });
    });
  }
  
});
