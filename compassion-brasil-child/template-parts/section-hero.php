<section class="hero" id="quem-somos" aria-labelledby="heroHeading">

  <!-- CAMADA 1: Vídeo fixo em tela inteira (parallax sticky) -->
  <div class="hero-video-layer" aria-hidden="true">
    <iframe class="hero-video-bg"
      src="https://www.youtube.com/embed/Cas6bKgTXHI?autoplay=1&mute=1&loop=1&playlist=Cas6bKgTXHI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0"
      title="Vídeo institucional Compassion Brasil" frameborder="0" allow="autoplay; encrypted-media"
      aria-hidden="true"></iframe>
    <div class="hero-video-overlay" aria-hidden="true"></div>
    <div class="hero-img-gradient"></div>
  </div>

  <!-- CAMADA 2: Painel de texto que sobe por cima do vídeo -->
  <div class="hero-content-panel">
    <div class="container">
      <div class="hero-grid">

        <!-- Coluna esquerda: eyebrow + título -->
        <div class="hero-col-left">
          <p class="hero-eyebrow reveal" id="heroEyebrow">Conhecido · Amado · Protegido</p>

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
            <a href="https://www.youtube.com/watch?v=Cas6bKgTXHI" target="_blank" rel="noopener noreferrer"
              class="btn btn-ghost" id="heroCta2">
              ▶ Assistir Vídeo
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>