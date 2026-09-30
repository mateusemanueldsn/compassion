/* ==========================================================================
   COMPASSION BRASIL — THREAD-DRIVEN INTERACTIONS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. SCROLL PROGRESS BAR ── */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    window.addEventListener("scroll", () => {
      const total = document.body.scrollHeight - window.innerHeight;
      progress.style.width = (window.scrollY / total * 100) + "%";
    }, { passive: true });
  }

  /* ── 2. HEADER SCROLL STATE ── */
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 3. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(".reveal, .reveal-x");
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── 4. STAT THREADS — animação da barra colorida no topo ── */
  const statItems = document.querySelectorAll(".stat-item");
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  statItems.forEach(el => statObs.observe(el));

  /* ── 5. NAV ACTIVE LINK (IntersectionObserver) ── */
  const sections  = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
        // Hero thread nav
        const heroNavItems = document.querySelectorAll(".hero-nav-item");
        heroNavItems.forEach(item => {
          item.classList.toggle("active", item.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObs.observe(s));

  /* ── 6. MAPA INTERATIVO — Tooltip nos estados ── */
  const tooltip    = document.getElementById("mapTooltip");
  const mapStates  = document.querySelectorAll(".br-state");

  if (tooltip && mapStates.length) {
    let tooltipVisible = false;

    function showTooltip(e, stateName, regionName, infoText) {
      tooltip.innerHTML =
        `<span class="map-tooltip-state">${stateName}</span>` +
        `<span class="map-tooltip-region">${regionName}</span>` +
        (infoText ? `<span class="map-tooltip-info">${infoText}</span>` : "");
      positionTooltip(e);
      tooltip.classList.add("visible");
      tooltipVisible = true;
    }

    function positionTooltip(e) {
      const offset = 16;
      let x = e.clientX + offset;
      let y = e.clientY + offset;
      // Evita sair da viewport pela direita
      if (x + 280 > window.innerWidth) x = e.clientX - 280 - offset;
      // Evita sair da viewport por baixo
      if (y + 120 > window.innerHeight) y = e.clientY - 120 - offset;
      tooltip.style.left = x + "px";
      tooltip.style.top  = y + "px";
    }

    function hideTooltip() {
      tooltip.classList.remove("visible");
      tooltipVisible = false;
    }

    mapStates.forEach(path => {
      path.addEventListener("mouseenter", e => {
        showTooltip(e, path.dataset.state, path.dataset.region, path.dataset.info);
      });
      path.addEventListener("mousemove", e => {
        if (tooltipVisible) positionTooltip(e);
      });
      path.addEventListener("mouseleave", hideTooltip);
      // Acessibilidade: teclado
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", `${path.dataset.state} — ${path.dataset.region}`);
      path.addEventListener("focus", e => {
        const rect = path.getBoundingClientRect();
        const fakeE = { clientX: rect.left + rect.width / 2, clientY: rect.top };
        showTooltip(fakeE, path.dataset.state, path.dataset.region, path.dataset.info);
      });
      path.addEventListener("blur", hideTooltip);
    });

    // Pin de sede também mostra tooltip
    const mapPin = document.querySelector(".map-pin");
    if (mapPin) {
      mapPin.setAttribute("tabindex", "0");
      mapPin.addEventListener("mouseenter", e => {
        showTooltip(e, "Sede Nacional", "Fortaleza, Ceará", "Escritório central da Compassion no Brasil desde 2018");
      });
      mapPin.addEventListener("mousemove", e => {
        if (tooltipVisible) positionTooltip(e);
      });
      mapPin.addEventListener("mouseleave", hideTooltip);
    }
  }

  /* ── 7. PROGRAM FILTER TABS ── */
  const filterTabs  = document.querySelectorAll(".filter-tab");
  const progCards   = document.querySelectorAll(".prog-card");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", false); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", true);

      const filter = tab.dataset.filter;
      progCards.forEach(card => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.opacity   = match ? "1"       : "0.25";
        card.style.transform = match ? "scale(1)" : "scale(0.97)";
        card.style.pointerEvents = match ? "auto"  : "none";
      });
    });
  });

  /* ── 8. DASHBOARD TABS ── */
  const dashTabs = document.querySelectorAll(".dash-tab");
  const dashData = {
    geral:        { num: "1.240", lbl: "Líderes capacitados no trimestre" },
    trilhas:      { num: "14",    lbl: "Trilhas de formação ativas" },
    certificados: { num: "387",   lbl: "Certificados emitidos este mês" }
  };

  dashTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dashTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", false); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", true);

      const data = dashData[tab.dataset.tab];
      const numEl = document.getElementById("dashBigNum");
      const lblEl = document.getElementById("dashBigLbl");
      if (numEl && data) { numEl.textContent = data.num; }
      if (lblEl && data) { lblEl.textContent = data.lbl; }
    });
  });

  /* ── 9. HERO THREAD NAV (tooltip hover já é CSS; click = scroll) ── */
  const heroNavItems = document.querySelectorAll(".hero-nav-item");
  heroNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.section);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ── 10. THREAD ACCENT ANIMATION (re-trigger on scroll) ── */
  const threadAccent = document.querySelector(".title-thread-accent");
  if (threadAccent) {
    const tObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const spans = e.target.querySelectorAll("span");
          spans.forEach((s, i) => {
            s.style.animationDelay = (i * 0.08) + "s";
            s.style.animationPlayState = "running";
          });
        }
      });
    }, { threshold: 0.5 });
    tObs.observe(threadAccent);
  }

  /* ── 11. CURSOR CUSTOMIZADO (skipping.svg) ── */
  const cursorEl   = document.getElementById("customCursor");
  const cursorPath = document.getElementById("cursorPath");

  // Seções de fundo escuro — cursor vira branco
  const darkSelectors = [
    ".stats-section",
    ".map-section",
    ".cta-section",
    ".site-footer",
    ".section-dark",
  ];

  if (cursorEl && cursorPath) {
    let mouseX = -100, mouseY = -100;
    let rafId = null;
    let isDarkMode = false;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          cursorEl.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
          rafId = null;
        });
      }

      // Detecta fundo escuro pelo elemento sob o cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isDark = darkSelectors.some(sel => el.closest(sel) !== null);
        if (isDark !== isDarkMode) {
          isDarkMode = isDark;
          cursorPath.setAttribute("fill", isDark ? "#FFFFFF" : "#1A5FFF");
        }
      }
    });

    document.addEventListener("mouseleave", () => { cursorEl.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cursorEl.style.opacity = "1"; });
  }

});

