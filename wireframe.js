/**
 * WIREFRAME WEB COMPONENTS & MOTION ENGINE - COMPASSION BRASIL
 * Recursos avançados de Motion Graphics, Contadores e Interatividade SaaS
 * Zero dependências externas / Vanilla JS puro
 */

// 1. Web Component de Imagem Reutilizável
class WfImage extends HTMLElement {
    connectedCallback() {
        const ratio = this.getAttribute('ratio') || '16-9';
        const label = this.getAttribute('label') || 'Placeholder de Imagem';
        const dim = this.getAttribute('dim') || '';
        const isCircle = this.hasAttribute('circle');

        const circleClass = isCircle ? 'wf-img-circle' : `wf-img-${ratio}`;

        this.innerHTML = `
            <div class="wf-img-placeholder ${circleClass}">
                <svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span class="wf-img-label">${label}</span>
                ${dim ? `<span class="wf-img-dimension">${dim}</span>` : ''}
            </div>
        `;
    }
}
customElements.define('wf-image', WfImage);

// 2. Inicializador de Motion & Interatividade
document.addEventListener('DOMContentLoaded', () => {
    
    // --- A. Barra de Progresso de Scroll & Header Glassmorphism ---
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.querySelector('.wf-header');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (header) {
            if (window.pageYOffset > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // --- B. Scroll Reveal Observer (Staggered Fade-in) ---
    const revealElements = document.querySelectorAll('.wf-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- C. Contadores Numéricos Animados (Interactive Stat Count-up) ---
    const statNumbers = document.querySelectorAll('.wf-stat-number[data-target]');
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 1800;
                const stepTime = 20;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.innerText = `${prefix}${Math.floor(current).toLocaleString('pt-BR')}${suffix}`;
                }, stepTime);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => countObserver.observe(el));

    // --- D. Filtro Interativo de Programas (Tabs Segmentadas) ---
    const filterButtons = document.querySelectorAll('.wf-tab-btn');
    const programCards = document.querySelectorAll('.wf-programs-grid .wf-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            programCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- E. Carrossel / Slider Interativo de Micro-Histórias ---
    const slides = document.querySelectorAll('.wf-slide');
    const dots = document.querySelectorAll('.wf-dot');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    let currentSlide = 0;

    function showSlide(index) {
        if (!slides.length) return;
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach((s, i) => {
            s.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
    });

    // --- F. SaaS Dashboard Interativo de Treinamentos (Modernização do Moodle) ---
    const saasTabs = document.querySelectorAll('.wf-saas-tab');
    const chartBars = document.querySelectorAll('.wf-chart-bar');
    const metricDisplay = document.getElementById('saasMetricDisplay');

    const saasData = {
        'geral': { metric: '1.240', label: 'Líderes Capacitados no Trimestre', bars: [45, 60, 85, 95, 70, 90] },
        'trilhas': { metric: '14', label: 'Trilhas de Proteção e Discipulado', bars: [30, 50, 65, 75, 80, 60] },
        'certificados': { metric: '98.4%', label: 'Taxa de Conclusão com Excelência', bars: [80, 85, 90, 92, 98, 100] }
    };

    saasTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            saasTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const key = tab.getAttribute('data-tab');
            const data = saasData[key];

            if (data && metricDisplay) {
                metricDisplay.innerHTML = `
                    <div style="font-size: 2.2rem; font-weight: 800; letter-spacing: -1px;">${data.metric}</div>
                    <div style="font-size: 0.82rem; color: var(--wf-gray-500); font-weight: 600;">${data.label}</div>
                `;

                chartBars.forEach((bar, i) => {
                    if (data.bars[i]) {
                        bar.style.height = `${data.bars[i]}%`;
                    }
                });
            }
        });
    });

});
