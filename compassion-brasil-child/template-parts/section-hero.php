<section class="hero" id="quem-somos" aria-labelledby="heroHeading">

  <!-- CAMADA 1: Vídeo fixo em tela inteira (parallax sticky) -->
  <div class="hero-video-layer" aria-hidden="true">
    <video class="hero-video-bg" id="heroVideo" autoplay muted loop playsinline preload="auto">
      <source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/video/hero-video.mp4" type="video/mp4">
    </video>
    <div class="hero-video-overlay" aria-hidden="true"></div>
    <div class="hero-img-gradient"></div>
  </div>

  <!-- CAMADA 2: Painel de texto que sobe por cima do vídeo -->
  <div class="hero-content-panel">
    <div class="container">
      <div class="hero-grid">

        <!-- Coluna esquerda: eyebrow + título -->
        <div class="hero-col-left">
          <p class="hero-eyebrow reveal" id="heroEyebrow">Conhecidas · Amadas · Protegidas</p>

          <h1 class="hero-title reveal d1" id="heroHeading">
            Libertando crianças<br>
            da pobreza em<br>
            nome de Jesus
          </h1>
        </div>

        <!-- Coluna direita: descrição + botões -->
        <div class="hero-col-right">
          <p class="hero-desc reveal d3">
            A Compassion do Brasil conecta crianças em situação de vulnerabilidade a parceiras locais,
            garantindo que cada uma delas seja conhecida, amada e protegida — para atingir todo o seu
            potencial dado por Deus.
          </p>

          <div class="hero-actions reveal d4">
            <a href="<?php echo esc_url( home_url( '/nossa-historia/' ) ); ?>" class="btn btn-primary" id="heroCta1">
              Conheça nossa história
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="https://www.youtube.com/watch?v=9jlvRIaIzGA" target="_blank" rel="noopener noreferrer"
              class="btn btn-ghost" id="heroCta2">
              ▶ Assistir Vídeo
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>