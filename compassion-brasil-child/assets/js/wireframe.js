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

  /* ── 8.1 MODAL DE AVISO: AMBIENTE EM DESENVOLVIMENTO (capacitacoes.html) ── */
  const enrollModal = document.getElementById("courseEnrollModal");
  const modalCourseNotice = document.getElementById("modalCourseNotice");
  const openEnrollBtns = document.querySelectorAll(".btn-open-enroll");
  const closeEnrollBtn = document.getElementById("closeEnrollModal");
  const btnAcknowledgeNotice = document.getElementById("btnAcknowledgeNotice");

  if (enrollModal) {
    const closeModal = () => {
      enrollModal.classList.remove("open");
    };

    openEnrollBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const courseName = btn.dataset.course;
        if (modalCourseNotice) {
          if (courseName) {
            modalCourseNotice.innerHTML = `O curso <strong>"${courseName}"</strong> e todo o ambiente de capacitação da Compassion Brasil estão em fase de desenvolvimento.<br><br>Em breve, disponibilizaremos o acesso completo às inscrições, aulas e certificações para todos os projetos parceiros.`;
          } else {
            modalCourseNotice.innerHTML = `Este ambiente de cursos e capacitações da Compassion Brasil está em fase de desenvolvimento. Em breve, disponibilizaremos o acesso completo às inscrições, aulas e certificações para todos os projetos parceiros.`;
          }
        }
        enrollModal.classList.add("open");
      });
    });

    if (closeEnrollBtn) {
      closeEnrollBtn.addEventListener("click", closeModal);
    }

    if (btnAcknowledgeNotice) {
      btnAcknowledgeNotice.addEventListener("click", closeModal);
    }

    enrollModal.addEventListener("click", (e) => {
      if (e.target === enrollModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && enrollModal.classList.contains("open")) {
        closeModal();
      }
    });
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

  /* ── 11. CURSOR CUSTOMIZADO REMOVIDO (utiliza cursor padrão) ── */
});


/* ── 7. CAROUSEL DE FASES (Inicialização com proteção contra execução prematura) ── */
function initPhasesCarousel() {
  const carousel = document.getElementById("phasesCarousel");
  if (!carousel) return;

  const dots = document.querySelectorAll("#phasesDots .carousel-dot");
  const prevBtn = document.getElementById("phasesPrev");
  const nextBtn = document.getElementById("phasesNext");
  const slides = carousel.querySelectorAll(".phase-slide");

  function scrollToSlide(index) {
    if (!slides[index]) return;
    const slide = slides[index];
    const targetLeft = slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2;
    carousel.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth"
    });
  }

  function getActiveIndex() {
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(carouselCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });
    return closestIndex;
  }

  function updateCarouselState() {
    const activeIndex = getActiveIndex();
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });

    if (prevBtn) {
      prevBtn.disabled = false;
      prevBtn.style.opacity = "1";
      prevBtn.style.cursor = "pointer";
    }
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
      nextBtn.style.cursor = "pointer";
    }
  }

  carousel.addEventListener("scroll", updateCarouselState, { passive: true });

  // Autoplay com rotação contínua (4.5s)
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 4500;

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const current = getActiveIndex();
      const nextIndex = (current + 1) % slides.length;
      scrollToSlide(nextIndex);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausa ao passar o mouse ou tocar no carrossel
  const wrapper = carousel.closest(".phases-carousel-wrapper") || carousel;
  wrapper.addEventListener("mouseenter", stopAutoplay);
  wrapper.addEventListener("mouseleave", startAutoplay);
  wrapper.addEventListener("touchstart", stopAutoplay, { passive: true });
  wrapper.addEventListener("touchend", startAutoplay, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      scrollToSlide(i);
      resetAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const current = getActiveIndex();
      const prevIndex = current > 0 ? current - 1 : slides.length - 1;
      scrollToSlide(prevIndex);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const current = getActiveIndex();
      const nextIndex = (current + 1) % slides.length;
      scrollToSlide(nextIndex);
      resetAutoplay();
    });
  }

  // Define estado inicial das setas e dots e inicia autoplay
  updateCarouselState();
  startAutoplay();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhasesCarousel);
} else {
  initPhasesCarousel();
}

