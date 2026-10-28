<?php
$is_front        = is_front_page() || is_home();
$home_base       = $is_front ? '' : home_url( '/' );
$is_trabalhamos  = is_page( 'como-trabalhamos' ) || ( isset( $post ) && ( $post->post_name === 'como-trabalhamos' || get_page_template_slug() === 'page-templates/template-compassion-como-trabalhamos.php' ) );
$is_cursos       = is_page( array( 'cursos', 'capacitacoes' ) ) || ( isset( $post ) && ( in_array( $post->post_name, array( 'cursos', 'capacitacoes' ) ) || get_page_template_slug() === 'page-templates/template-compassion-cursos.php' ) );
?>
<header class="site-header" id="siteHeader">
    <div class="header-inner">
      <!-- Logo oficial Compassion Brasil -->
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo-wrap" aria-label="Compassion Brasil - Home">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/logo/logo_azul.svg" alt="Compassion Brasil" class="header-logo-img">
      </a>

      <nav aria-label="Navegação principal">
        <ul class="nav-list">
          <li><a href="<?php echo esc_url( $home_base . '#quem-somos' ); ?>" class="nav-link<?php echo ($is_front && !$is_trabalhamos && !$is_cursos) ? ' active' : ''; ?>">Quem Somos<span class="nav-thread"></span></a></li>
          <li><a href="<?php echo esc_url( home_url( '/como-trabalhamos/' ) ); ?>" class="nav-link<?php echo $is_trabalhamos ? ' active' : ''; ?>">Como Trabalhamos<span class="nav-thread"></span></a></li>
          <li><a href="<?php echo esc_url( $home_base . '#impacto' ); ?>" class="nav-link">Onde Atuamos<span class="nav-thread"></span></a></li>
          <li><a href="<?php echo $is_cursos ? '#catalogo' : esc_url( $home_base . '#capacitacoes' ); ?>" class="nav-link<?php echo $is_cursos ? ' active' : ''; ?>">Capacitações<span class="nav-thread"></span></a></li>
          <li><a href="<?php echo esc_url( $home_base . '#contato' ); ?>" class="nav-link">Contato<span class="nav-thread"></span></a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <a href="https://compassioncauses.com/en?country=BR#cause-browser" target="_blank" rel="noopener noreferrer"
          class="btn-nav-cta btn-nav-causes" id="headerCauses">
          Compassion Causas
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a href="https://www.compassion.com/sponsor-a-child/?AgeMaxFilter=22&amp;AgeMinFilter=1&amp;CountryFilter=Peru&amp;ageMax=22&amp;ageMin=1&amp;countries=BR&amp;home_hero=true"
          target="_blank" rel="noopener noreferrer" class="btn-nav-cta" id="headerCta">
          Apadrinhe uma Criança
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </header>