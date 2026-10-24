<section class="courses-catalog-section" id="cursos" aria-labelledby="cursosHeading">
      <div class="container">

        <div class="courses-header-row reveal">
          <div class="courses-header-left">
            <div class="section-eyebrow">
              <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/logo/skipping.svg" alt="" class="eyebrow-skipping-icon" aria-hidden="true">
              Plataforma de Capacitação
            </div>
            <h2 class="section-title" id="cursosHeading">Cursos & Formação</h2>
            <p class="section-subtitle">
              Equipando líderes, educadores, voluntários, igrejas e parceiras com ferramentas práticas para proteger,
              acolher e transformar a vida de crianças e adolescentes.
            </p>
          </div>

          <div class="courses-nav-btns">
            <span class="courses-drag-hint">↔ Arraste para navegar</span>
            <a href="<?php echo esc_url( home_url( '/cursos/' ) ); ?>" class="btn btn-ghost"
              style="padding: 10px 20px; font-size: .88rem; font-weight: 700;">
              Ver todos os cursos →
            </a>
            <button class="btn-carousel-nav" id="coursesPrev" aria-label="Curso anterior">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button class="btn-carousel-nav" id="coursesNext" aria-label="Próximo curso">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Trilho horizontal estilo streaming -->
        <div class="courses-track-wrap reveal d1">
          <div class="courses-track" id="coursesTrack">

            <!-- Curso 1 -->
            <article class="course-card">
              <div class="course-thumb-ph">
                <span class="course-thumb-badge" style="border-left: 3px solid var(--yellow);">Proteção</span>
                <div class="course-thumb-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span class="course-thumb-meta">40h · 100% Online</span>
              </div>
              <div class="course-card-content">
                <span class="course-cat-tag">Salvaguarda & Defesa</span>
                <h3 class="course-card-title">Oficial de Proteção e Salvaguarda Infantil</h3>
                <p class="course-card-desc">
                  Capacitação prática em protocolos institucionais, prevenção de violências, acolhimento e atuação
                  integrada com igrejas locais.
                </p>
                <div class="course-card-footer">
                  <span class="course-card-meta">Certificado Reconhecido</span>
                  <a href="<?php echo esc_url( home_url( '/cursos/#inscricao' ) ); ?>" class="course-card-btn">Ver Detalhes →</a>
                </div>
              </div>
            </article>

            <!-- Curso 2 -->
            <article class="course-card">
              <div class="course-thumb-ph">
                <span class="course-thumb-badge" style="border-left: 3px solid var(--blue);">Mães & Bebês</span>
                <div class="course-thumb-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span class="course-thumb-meta">30h · 100% Online</span>
              </div>
              <div class="course-card-content">
                <span class="course-cat-tag">Primeira Infância</span>
                <h3 class="course-card-title">Cuidado Integral e Vínculo Materno-Infantil</h3>
                <p class="course-card-desc">
                  Orientações para acompanhamento de gestantes, aleitamento materno, neurodesenvolvimento e visitas
                  domiciliares humanizadas.
                </p>
                <div class="course-card-footer">
                  <span class="course-card-meta">Certificado Reconhecido</span>
                  <a href="<?php echo esc_url( home_url( '/cursos/#inscricao' ) ); ?>" class="course-card-btn">Ver Detalhes →</a>
                </div>
              </div>
            </article>

            <!-- Curso 3 -->
            <article class="course-card">
              <div class="course-thumb-ph">
                <span class="course-thumb-badge" style="border-left: 3px solid var(--orange);">Juventude</span>
                <div class="course-thumb-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span class="course-thumb-meta">45h · 100% Online</span>
              </div>
              <div class="course-card-content">
                <span class="course-cat-tag">Protagonismo Jovem</span>
                <h3 class="course-card-title">Liderança Servidora e Mentoria de Jovens</h3>
                <p class="course-card-desc">
                  Ferramentas para equipar adolescentes com inteligência socioemocional, projeto de vida e impacto nas
                  comunidades.
                </p>
                <div class="course-card-footer">
                  <span class="course-card-meta">Certificado Reconhecido</span>
                  <a href="<?php echo esc_url( home_url( '/cursos/#inscricao' ) ); ?>" class="course-card-btn">Ver Detalhes →</a>
                </div>
              </div>
            </article>

            <!-- Curso 4 -->
            <article class="course-card">
              <div class="course-thumb-ph">
                <span class="course-thumb-badge" style="border-left: 3px solid var(--green);">Discipulado</span>
                <div class="course-thumb-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span class="course-thumb-meta">25h · 100% Online</span>
              </div>
              <div class="course-card-content">
                <span class="course-cat-tag">Desenvolvimento Espiritual</span>
                <h3 class="course-card-title">Discipulado e Educação Bíblica Criativa</h3>
                <p class="course-card-desc">
                  Metodologias práticas e amorosas para o ensino bíblico centrado na pessoa de Jesus para crianças em
                  situação de vulnerabilidade.
                </p>
                <div class="course-card-footer">
                  <span class="course-card-meta">Certificado Reconhecido</span>
                  <a href="<?php echo esc_url( home_url( '/cursos/#inscricao' ) ); ?>" class="course-card-btn">Ver Detalhes →</a>
                </div>
              </div>
            </article>

            <!-- Curso 5 -->
            <article class="course-card">
              <div class="course-thumb-ph">
                <span class="course-thumb-badge" style="border-left: 3px solid var(--teal);">Gestão</span>
                <div class="course-thumb-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span class="course-thumb-meta">35h · 100% Online</span>
              </div>
              <div class="course-card-content">
                <span class="course-cat-tag">Igrejas Parceiras</span>
                <h3 class="course-card-title">Gestão de Projetos Sociais Comunitários</h3>
                <p class="course-card-desc">
                  Governança responsável, transparência, mobilização de voluntários locais e mensuração de impacto
                  transformador.
                </p>
                <div class="course-card-footer">
                  <span class="course-card-meta">Certificado Reconhecido</span>
                  <a href="<?php echo esc_url( home_url( '/cursos/#inscricao' ) ); ?>" class="course-card-btn">Ver Detalhes →</a>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>
    </section>