<?php
/**
 * Template Part: Seção Catálogo e Inscrição de Cursos
 * Compassion Brasil
 */
?>
<!-- ═══════════════════════════════════════════════
     HERO DA PÁGINA DE CURSOS
     ═══════════════════════════════════════════════ -->
<section class="page-hero">
  <div class="container">
    <div class="section-eyebrow reveal">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/logo/skipping.svg" alt="" class="eyebrow-skipping-icon" aria-hidden="true">
      Plataforma de Formação Compassion
    </div>
    <h1 class="page-hero-title reveal d1">
      Capacitando Líderes para<br>
      Proteger, Cuidar e Servir
    </h1>
    <p class="page-hero-subtitle reveal d2">
      Conheça o catálogo completo de cursos e trilhas formativas da Compassion do Brasil. Um ambiente desenvolvido
      para capacitar igrejas, voluntários, pastores, educadores e projetos parceiros, integrando referencial
      bíblico, rigor técnico, fundamentação teórica e metodológica e excelência prática.
    </p>

    <div class="page-stats-row reveal d3">
      <div class="page-stat-badge">
        <span class="page-stat-dot" style="background:var(--blue)"></span>
        +14 Trilhas Formativas
      </div>
      <div class="page-stat-badge">
        <span class="page-stat-dot" style="background:var(--green)"></span>
        100% Online & Flexível
      </div>
      <div class="page-stat-badge">
        <span class="page-stat-dot" style="background:var(--yellow)"></span>
        Certificação Oficial
      </div>
      <div class="page-stat-badge">
        <span class="page-stat-dot" style="background:var(--orange)"></span>
        Gratuito para Igrejas Parceiras
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     CATÁLOGO COMPLETO DE CURSOS
     ═══════════════════════════════════════════════ -->
<section class="section section-white" id="catalogo">
  <div class="container">

    <div class="section-header center reveal">
      <div class="section-eyebrow">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/logo/skipping.svg" alt="" class="eyebrow-skipping-icon" aria-hidden="true">
        Catálogo de Cursos
      </div>
      <h2 class="section-title">Explore Nossas Trilhas de Formação</h2>
      <p class="section-subtitle">
        Selecione uma categoria ou navegue pelos cursos abaixo para conhecer a ementa e garantir sua vaga.
      </p>
    </div>

    <!-- Grade Completa de Cursos (3 por linha com fundo cinza) -->
    <div class="programs-grid" id="coursesGrid">

      <!-- Curso 01 -->
      <article class="course-card reveal">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--yellow)">Proteção & Salvaguarda</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">40 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Trilha Obrigatória para Parceiros</span>
          <h3 class="course-card-title">Oficial de Proteção e Salvaguarda Infantil</h3>
          <p class="course-card-desc">
            Formação aprofundada nos protocolos institucionais de prevenção, encaminhamento legal, acolhimento de
            denúncias e manutenção de ambientes seguros para crianças e adolescentes.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado com Chancela</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Oficial de Proteção e Salvaguarda Infantil" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

      <!-- Curso 02 -->
      <article class="course-card reveal d1">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--blue)">Primeira Infância</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">30 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Desenvolvimento 0 a 5 Anos</span>
          <h3 class="course-card-title">Acolhimento e Vínculo Materno-Infantil</h3>
          <p class="course-card-desc">
            Capacitação para agentes comunitários em visitação domiciliar, cuidados na gestação, estímulo sensorial
            precoce e fortalecimento do apego seguro entre mãe e bebê.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado Incluso</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Acolhimento e Vínculo Materno-Infantil" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

      <!-- Curso 03 -->
      <article class="course-card reveal d2">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--orange)">Juventude</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">45 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Liderança & Mentoria</span>
          <h3 class="course-card-title">Liderança Servidora e Protagonismo Jovem</h3>
          <p class="course-card-desc">
            Estratégias de mentoria e facilitação de grupos para adolescentes. Desenvolvimento de resiliência,
            liderança comunitária, projeto de vida e transição para o mercado profissional.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado Incluso</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Liderança Servidora e Protagonismo Jovem" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

      <!-- Curso 04 -->
      <article class="course-card reveal">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--green)">Discipulado</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">25 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Formação Bíblica e Espiritual</span>
          <h3 class="course-card-title">Discipulado e Educação Bíblica Criativa</h3>
          <p class="course-card-desc">
            Metodologias pedagógicas dinâmicas para educadores cristãos ensinarem a Palavra de Deus às crianças de
            maneira cativante, amorosa e contextualizada.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado Incluso</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Discipulado e Educação Bíblica Criativa" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

      <!-- Curso 05 -->
      <article class="course-card reveal d1">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--teal)">Gestão Social</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">35 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Igrejas e Projetos Locais</span>
          <h3 class="course-card-title">Gestão e Sustentabilidade de Projetos Sociais</h3>
          <p class="course-card-desc">
            Governança sem fins lucrativos, gestão financeira e contábil transparente, organização de equipes
            voluntárias e planejamento de longo prazo para projetos com crianças.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado Incluso</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Gestão e Sustentabilidade de Projetos Sociais" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

      <!-- Curso 06 -->
      <article class="course-card reveal d2">
        <div class="course-thumb-ph">
          <span class="course-thumb-badge" style="border-left: 3px solid var(--yellow)">Saúde Mental</span>
          <div class="course-thumb-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span class="course-thumb-meta">30 horas · 100% Online</span>
        </div>
        <div class="course-card-content">
          <span class="course-cat-tag">Apoio Emocional</span>
          <h3 class="course-card-title">Cuidado Pós-Trauma e Saúde Emocional</h3>
          <p class="course-card-desc">
            Abordagem sensível e orientada por princípios científicos e bíblicos para acolher crianças em sofrimento
            emocional, perdas e situações de vulnerabilidade aguda.
          </p>
          <div class="course-card-footer">
            <span class="course-card-meta">Certificado Incluso</span>
            <button type="button" class="btn btn-primary btn-open-enroll"
              data-course="Cuidado Pós-Trauma e Saúde Emocional" style="padding:7px 14px;font-size:.78rem">
              Inscrever-se
            </button>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     SEÇÃO DE INSCRIÇÃO DIRETA
     ═══════════════════════════════════════════════ -->
<section class="section section-dark" id="inscricao">
  <div class="container">
    <div class="contact-layout">

      <!-- Lado esquerdo: informações -->
      <div class="contact-text reveal">
        <div class="section-eyebrow" style="color:var(--white)">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/logo/skipping_branco.svg" alt="" class="eyebrow-skipping-icon" aria-hidden="true">
          Matrícula e Cadastro
        </div>
        <h2 class="contact-heading" style="color:var(--white)">
          Comece sua<br>jornada de capacitação<br>hoje mesmo
        </h2>
        <p class="contact-desc" style="color:rgba(255,255,255,0.75)">
          Nossos cursos são disponibilizados gratuitamente para colaboradores, lideranças locais, pastores e
          voluntários (de igrejas), educadores sociais e profissionais na política de assistência social parceiras
          da Compassion do Brasil. Preencha seus dados para solicitar acesso imediato à plataforma.
        </p>

        <ul style="list-style:none;display:flex;flex-direction:column;gap:16px;margin-top:28px">
          <li style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.85);font-size:.92rem">
            <span style="color:var(--green);font-size:1.1rem;font-weight:900">✓</span> Acesso a videoaulas, manuais
            práticos e cartilhas em PDF
          </li>
          <li style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.85);font-size:.92rem">
            <span style="color:var(--green);font-size:1.1rem;font-weight:900">✓</span> Tutoria e suporte com a
            equipe técnica da Compassion Brasil
          </li>
          <li style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.85);font-size:.92rem">
            <span style="color:var(--green);font-size:1.1rem;font-weight:900">✓</span> Certificado de conclusão
            nominal validado
          </li>
        </ul>
      </div>

      <!-- Lado direito: status do ambiente -->
      <div class="contact-form-col reveal d1">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--yellow);box-shadow:0 0 0 4px rgba(245,196,0,0.25)"></span>
          <span style="font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--dark)">Ambiente em Construção</span>
        </div>

        <h3 style="font-size:1.45rem;font-weight:900;color:var(--dark);margin-bottom:12px;line-height:1.25">
          Plataforma de Formação em Desenvolvimento
        </h3>
        <p style="font-size:.92rem;color:var(--g700);line-height:1.65;margin-bottom:24px">
          Estamos estruturando as trilhas pedagógicas, videoaulas e materiais de apoio com excelência para todas as igrejas e lideranças parceiras da Compassion do Brasil. As inscrições e o acesso aos módulos serão disponibilizados em breve.
        </p>

        <div style="background:var(--cream);border-radius:var(--r-md);padding:20px 22px;margin-bottom:26px;border:1px solid rgba(0,0,0,0.06)">
          <div style="font-size:.85rem;font-weight:800;color:var(--dark);margin-bottom:12px">O que estará disponível:</div>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;font-size:.86rem;color:var(--g700)">
            <li style="display:flex;align-items:center;gap:10px"><span style="color:var(--green);font-weight:900">✓</span> Acesso 100% online às trilhas de formação</li>
            <li style="display:flex;align-items:center;gap:10px"><span style="color:var(--green);font-weight:900">✓</span> Manuais práticos, cartilhas e materiais em PDF</li>
            <li style="display:flex;align-items:center;gap:10px"><span style="color:var(--green);font-weight:900">✓</span> Certificados oficiais validados pela Compassion Brasil</li>
          </ul>
        </div>

        <a href="#catalogo" class="btn btn-secondary" style="width:100%;justify-content:center;font-weight:700">
          Ver Catálogo de Cursos ↑
        </a>
      </div>

    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════════════
     MODAL DE AVISO: AMBIENTE EM DESENVOLVIMENTO
     ═══════════════════════════════════════════════ -->
<div class="course-enroll-modal" id="courseEnrollModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="course-enroll-card" style="text-align:center;max-width:480px;padding:36px 28px">
    <button class="course-enroll-close" id="closeEnrollModal" aria-label="Fechar">&times;</button>

    <div style="width:60px;height:60px;background:rgba(26,95,255,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;color:var(--blue)">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>

    <span style="display:inline-block;font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--blue);background:rgba(26,95,255,0.08);padding:4px 14px;border-radius:9999px;margin-bottom:12px">
      Em Breve
    </span>

    <h3 id="modalTitle" style="font-size:1.45rem;font-weight:900;color:var(--dark);margin-bottom:12px;line-height:1.25">
      Ambiente em Desenvolvimento
    </h3>

    <p id="modalCourseNotice" style="font-size:.92rem;color:var(--g700);line-height:1.65;margin-bottom:26px">
      Este ambiente de cursos e capacitações da Compassion Brasil está em fase de desenvolvimento. Em breve, disponibilizaremos o acesso completo às inscrições, aulas e certificações para todos os projetos parceiros.
    </p>

    <button type="button" class="btn btn-primary" id="btnAcknowledgeNotice" style="width:100%;justify-content:center;padding:12px 24px;font-weight:700">
      Entendido
    </button>
  </div>
</div>
