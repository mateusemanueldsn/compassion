<?php
/**
 * Index Fallback Template - Compassion Brasil
 */
if ( is_front_page() || is_home() ) {
    include get_stylesheet_directory() . '/page-templates/template-compassion-home.php';
} else {
    get_header();
    ?>
    <main class="site-main" style="min-height: 60vh; padding: 120px 20px 60px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <?php
        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();
                the_content();
            }
        }
        ?>
      </div>
    </main>
    <?php
    get_footer();
}
