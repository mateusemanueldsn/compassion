<?php
/**
 * Template Name: Compassion Brasil - Biblioteca de Materiais
 * Description: Página com materiais metodológicos e recursos para parceiros da Compassion Brasil.
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
  <title>Biblioteca de Materiais — Compassion Brasil</title>
  <meta name="description" content="Acesse materiais metodológicos, guias e recursos da Compassion Brasil para parceiros e igrejas.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

  <?php wp_head(); ?>

  <link rel="stylesheet" href="<?php echo esc_url( $style_uri ); ?>?v=<?php echo filemtime( get_stylesheet_directory() . '/style.css' ); ?>">
  <script src="<?php echo esc_url( $theme_uri . '/assets/js/wireframe.js?v=' . filemtime( get_stylesheet_directory() . '/assets/js/wireframe.js' ) ); ?>" defer></script>
</head>

<body <?php body_class( 'compassion-biblioteca-body' ); ?>>
<?php wp_body_open(); ?>

  <div id="scrollProgress"></div>

  <?php include get_stylesheet_directory() . '/template-parts/section-header.php'; ?>

  <main>
    <?php
    $biblioteca_file = get_stylesheet_directory() . '/template-parts/section-biblioteca.php';
    if ( file_exists( $biblioteca_file ) ) {
        include $biblioteca_file;
    } else {
        echo '<section class="page-content container" style="padding: 80px 24px; min-height: 60vh;">';
        echo '<h1 class="section-title">Biblioteca de Materiais</h1>';
        echo '<p>Conteúdo em breve.</p>';
        echo '</section>';
    }
    ?>
  </main>

  <?php include get_stylesheet_directory() . '/template-parts/section-footer.php'; ?>

  <?php wp_footer(); ?>
</body>
</html>
