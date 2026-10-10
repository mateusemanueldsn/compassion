/* ==========================================================================
   COMPASSION BRASIL — THREAD-DRIVEN INTERACTIONS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. SCROLL PROGRESS BAR ── */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const brandColors = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--teal)"];
    window.addEventListener("scroll", () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const scrollPct = window.scrollY / total;
      progress.style.width = (scrollPct * 100) + "%";

      const colorIndex = Math.min(Math.floor(scrollPct * brandColors.length), brandColors.length - 1);
      progress.style.backgroundColor = brandColors[colorIndex];
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
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
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
  const tooltip = document.getElementById("mapTooltip");
  if (tooltip && tooltip.parentElement !== document.body) {
    document.body.appendChild(tooltip);
  }

  // Mapeamento direto por ID sem modificar classes CSS
  const STATE_LABELS = {
    i1:  { state: "Acre",                region: "Região Norte"    },
    i3:  { state: "Amapá",               region: "Região Norte"    },
    i4:  { state: "Amazonas",            region: "Região Norte"    },
    i11: { state: "Tocantins",           region: "Região Norte"    },
    i14: { state: "Pará",                region: "Região Norte"    },
    i22: { state: "Rondônia",            region: "Região Norte"    },
    i23: { state: "Roraima",             region: "Região Norte"    },
    i2:  { state: "Alagoas / Sergipe",   region: "Região Nordeste" },
    i5:  { state: "Bahia",               region: "Região Nordeste" },
    i6:  { state: "Ceará",               region: "Região Nordeste" },
    i10: { state: "Maranhão",            region: "Região Nordeste" },
    i16: { state: "Paraíba",             region: "Região Nordeste" },
    i17: { state: "Pernambuco",          region: "Região Nordeste" },
    i18: { state: "Piauí",               region: "Região Nordeste" },
    i20: { state: "Rio Grande do Norte", region: "Região Nordeste" },
    i7:  { state: "Distrito Federal",    region: "Região Centro-Oeste" },
    i8:  { state: "Goiás",               region: "Região Centro-Oeste" },
    i9:  { state: "Mato Grosso",         region: "Região Centro-Oeste" },
    i13: { state: "Mato Grosso do Sul",  region: "Região Centro-Oeste" },
    i12: { state: "Minas Gerais",        region: "Região Sudeste"  },
    i15: { state: "Rio de Janeiro",      region: "Região Sudeste"  },
    i19: { state: "São Paulo",           region: "Região Sudeste"  },
    i24: { state: "Espírito Santo",      region: "Região Sudeste"  },
    i21: { state: "Rio Grande do Sul",   region: "Região Sul"      },
    i25: { state: "Santa Catarina",      region: "Região Sul"      },
  };

  if (tooltip) {
    let tooltipVisible = false;

    function showMapTooltip(e, stateName, regionName, infoText) {
      tooltip.innerHTML =
        `<span class="map-tooltip-state">${stateName}</span>` +
        `<span class="map-tooltip-region">${regionName}</span>` +
        (infoText ? `<span class="map-tooltip-info">${infoText}</span>` : "");
      moveMapTooltip(e);
      tooltip.classList.add("visible");
      tooltipVisible = true;
    }

    function moveMapTooltip(e) {
      const offset = 16;
      let x = e.clientX + offset;
      let y = e.clientY + offset;
      if (x + 280 > window.innerWidth)  x = e.clientX - 280 - offset;
      if (y + 120 > window.innerHeight) y = e.clientY - 120 - offset;
      tooltip.style.left = x + "px";
      tooltip.style.top  = y + "px";
    }

    function hideMapTooltip() {
      tooltip.classList.remove("visible");
      tooltipVisible = false;
    }

    // Delegação de evento no SVG root — percorre a árvore DOM até achar o <g id="iX">
    const mapSvg = document.getElementById("brazilMap");
    if (mapSvg) {
      mapSvg.style.cursor = "pointer";
      let lastId = null;

      mapSvg.addEventListener("mousemove", e => {
        // Sobe pelo DOM a partir do target até achar um <g> com ID no STATE_LABELS
        let el = e.target;
        let found = null;
        while (el && el !== mapSvg) {
          if (el.id && STATE_LABELS[el.id]) { found = el; break; }
          el = el.parentNode;
        }
        
        if (found) {
          if (found.id !== lastId) {
            lastId = found.id;
            showMapTooltip(e, STATE_LABELS[found.id].state, STATE_LABELS[found.id].region);
          } else {
            moveMapTooltip(e);
          }
        } else {
          lastId = null;
          hideMapTooltip();
        }
      });

      mapSvg.addEventListener("mouseleave", () => { lastId = null; hideMapTooltip(); });
    }

    // Pin de sede também mostra tooltip
    const mapPin = document.querySelector(".map-pin");
    if (mapPin) {
      mapPin.setAttribute("tabindex", "0");
      mapPin.addEventListener("mouseenter", e => {
        showMapTooltip(e, "Sede Nacional", "Fortaleza, Ceará", "Escritório central da Compassion no Brasil desde 2018");
      });
      mapPin.addEventListener("mousemove", e => {
        if (tooltipVisible) moveMapTooltip(e);
      });
      mapPin.addEventListener("mouseleave", hideMapTooltip);
    }
  }

  /* ── 7. PROGRAM FILTER TABS ── */
  const filterTabs = document.querySelectorAll(".filter-tab");
  const progCards = document.querySelectorAll(".prog-card");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", false); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", true);

      const filter = tab.dataset.filter;
      progCards.forEach(card => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.opacity = match ? "1" : "0.25";
        card.style.transform = match ? "scale(1)" : "scale(0.97)";
        card.style.pointerEvents = match ? "auto" : "none";
      });
    });
  });

  /* ── 8. CATÁLOGO DE CURSOS — SCROLL HORIZONTAL & DRAG-TO-SCROLL ── */
  const coursesTrack = document.getElementById("coursesTrack");
  const btnPrev = document.getElementById("coursesPrev");
  const btnNext = document.getElementById("coursesNext");

  if (coursesTrack) {
    if (btnPrev && btnNext) {
      btnPrev.addEventListener("click", () => {
        coursesTrack.scrollBy({ left: -360, behavior: "smooth" });
      });
      btnNext.addEventListener("click", () => {
        coursesTrack.scrollBy({ left: 360, behavior: "smooth" });
      });
    }

    // Funcionalidade de clicar e arrastar com o mouse (Drag to Scroll)
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    coursesTrack.addEventListener("mousedown", (e) => {
      if (e.target.closest("a, button")) return;
      isDown = true;
      hasDragged = false;
      coursesTrack.classList.add("is-dragging");
      startX = e.pageX - coursesTrack.offsetLeft;
      scrollStart = coursesTrack.scrollLeft;
    });

    coursesTrack.addEventListener("mouseleave", () => {
      if (isDown) {
        isDown = false;
        coursesTrack.classList.remove("is-dragging");
      }
    });

    window.addEventListener("mouseup", () => {
      if (isDown) {
        isDown = false;
        coursesTrack.classList.remove("is-dragging");
      }
    });

    coursesTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - coursesTrack.offsetLeft;
      const walk = (x - startX) * 1.6;
      if (Math.abs(walk) > 5) hasDragged = true;
      coursesTrack.scrollLeft = scrollStart - walk;
    });

    // Previne clique acidental ao soltar se estiver arrastando
    coursesTrack.addEventListener("click", (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  /* ── 8.1 MODAL DE INSCRIÇÃO EM CURSOS (cursos.html) ── */
  const enrollModal = document.getElementById("courseEnrollModal");
  const enrollCourseSelect = document.getElementById("enrollCourseSelect");
  const openEnrollBtns = document.querySelectorAll(".btn-open-enroll");
  const closeEnrollBtn = document.getElementById("closeEnrollModal");

  if (enrollModal) {
    openEnrollBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const courseName = btn.dataset.course;
        if (enrollCourseSelect && courseName) {
          enrollCourseSelect.value = courseName;
        }
        enrollModal.classList.add("open");
      });
    });

    if (closeEnrollBtn) {
      closeEnrollBtn.addEventListener("click", () => {
        enrollModal.classList.remove("open");
      });
    }

    enrollModal.addEventListener("click", (e) => {
      if (e.target === enrollModal) {
        enrollModal.classList.remove("open");
      }
    });

    const enrollForm = document.getElementById("enrollForm");
    if (enrollForm) {
      enrollForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const successEl = document.getElementById("enrollSuccess");
        if (successEl) {
          enrollForm.style.display = "none";
          successEl.style.display = "block";
        }
      });
    }
  }

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
  const cursorEl = document.getElementById("customCursor");
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
          cursorEl.style.transform = `translate(${mouseX - 12}px, ${mouseY - 12}px)`;
          if (!cursorEl.classList.contains("visible")) {
            cursorEl.classList.add("visible");
          }
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
          document.documentElement.style.setProperty("--pulse-r", isDark ? "255" : "26");
          document.documentElement.style.setProperty("--pulse-g", isDark ? "255" : "95");
          document.documentElement.style.setProperty("--pulse-b", isDark ? "255" : "255");
        }
      }
    });

    document.addEventListener("mouseleave", () => { cursorEl.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cursorEl.style.opacity = "1"; });
  }

});


/* -- 7. CAROUSEL DE FASES -- */
const carousel = document.getElementById("phasesCarousel");
const dots = document.querySelectorAll("#phasesDots .carousel-dot");
if (carousel && dots.length > 0) {
  const slides = carousel.querySelectorAll(".phase-slide");

  // Atualiza os dots baseado no scroll
  carousel.addEventListener("scroll", () => {
    let index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }, { passive: true });

  // Clica no dot para scrollar
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      carousel.scrollTo({
        left: i * carousel.offsetWidth,
        behavior: "smooth"
      });
    });
  });
}

