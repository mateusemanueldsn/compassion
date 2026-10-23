<?php
/**
 * Template Name: Compassion Brasil - Cursos e Capacitação
 * Description: Modelo oficial e autônomo da Página de Cursos e Capacitação da Compassion Brasil.
 */

$theme_uri = get_stylesheet_directory_uri();
if ( is_ssl() || ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) || ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) ) {
    $theme_uri = set_url_scheme( $theme_uri, 'https' );
}
$style_uri = is_ssl() ? set_url_scheme( get_stylesheet_uri(), 'https' ) : get_stylesheet_uri();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cursos e Capacitação — Compassion Brasil</title>
  <meta name="description"
    content="Plataforma de cursos e formação da Compassion Brasil. Capacitando pastores, líderes, voluntários e educadores na proteção, cuidado e desenvolvimento integral da criança.">

  <!-- Google Fonts oficiais -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

  <?php wp_head(); ?>

  <!-- Design System Compassion injetado diretamente -->
  <link rel="stylesheet" href="<?php echo esc_url( $style_uri ); ?>?v=<?php echo filemtime( get_stylesheet_directory() . '/style.css' ); ?>">

  <!-- JS Principal carregado com defer -->
  <script src="<?php echo esc_url( $theme_uri . '/assets/js/wireframe.js?v=' . filemtime( get_stylesheet_directory() . '/assets/js/wireframe.js' ) ); ?>" defer></script>
</head>

<body <?php body_class( 'compassion-cursos-body' ); ?>>
<?php wp_body_open(); ?>

  <!-- Barra de progresso de leitura (gradiente multicolor das threads) -->
  <div id="scrollProgress"></div>



  <?php
  // Header institucional oficial Compassion
  include get_stylesheet_directory() . '/template-parts/section-header.php';
  ?>

  <main>
  <?php
  // Catálogo completo, hero e inscrições
  include get_stylesheet_directory() . '/template-parts/section-cursos-catalogo.php';
  ?>
  </main>

  <?php
  // Footer institucional oficial Compassion
  include get_stylesheet_directory() . '/template-parts/section-footer.php';
  ?>

  <?php wp_footer(); ?>
</body>

</html>
