<?php
/**
 * Compassion Brasil — Tema Standalone
 * Sem dependência de tema pai (hello-elementor removido)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ─────────────────────────────────────────────
// 1. SUPORTES DO TEMA
// ─────────────────────────────────────────────
add_action( 'after_setup_theme', function() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'
    ) );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'wp-block-styles' );

    // Menus de navegação
    register_nav_menus( array(
        'primary' => __( 'Menu Principal', 'compassion-brasil' ),
        'footer'  => __( 'Menu Rodapé', 'compassion-brasil' ),
    ) );
} );

// ─────────────────────────────────────────────
// 2. FORÇAR HTTPS EM URLS DE ASSETS
// ─────────────────────────────────────────────
add_filter( 'stylesheet_directory_uri', function( $uri ) {
    if ( is_ssl()
        || ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' )
        || ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' )
    ) {
        $uri = set_url_scheme( $uri, 'https' );
    }
    return $uri;
} );

add_filter( 'stylesheet_uri', function( $uri ) {
    if ( is_ssl()
        || ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' )
        || ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' )
    ) {
        $uri = set_url_scheme( $uri, 'https' );
    }
    return $uri;
} );

// ─────────────────────────────────────────────
// 3. ENFILEIRAR ASSETS
// ─────────────────────────────────────────────
function compassion_enqueue_assets() {
    $theme_dir  = get_stylesheet_directory_uri();
    $theme_path = get_stylesheet_directory();

    // Google Fonts
    wp_enqueue_style(
        'compassion-google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
        array(),
        null
    );

    // CSS principal (Design System completo)
    $css_version = file_exists( $theme_path . '/style.css' ) ? filemtime( $theme_path . '/style.css' ) : '1.2.0';
    wp_enqueue_style(
        'compassion-style',
        get_stylesheet_uri(),
        array(),
        $css_version
    );

    // Inline: declarações @font-face das fontes locais
    $font_dir = $theme_dir . '/assets/fonts';
    $inline_fonts = "
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_dir}/Neighbour%20Sans/Webfont/NeighbourSans-Heavy.woff2') format('woff2');
        font-weight: 900; font-style: normal; font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_dir}/Neighbour%20Sans/Webfont/NeighbourSans-ExtraBold.woff2') format('woff2');
        font-weight: 800; font-style: normal; font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_dir}/Neighbour%20Sans/Webfont/NeighbourSans-Bold.woff2') format('woff2');
        font-weight: 700; font-style: normal; font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_dir}/Neighbour%20Sans/Webfont/NeighbourSans-Regular.woff2') format('woff2');
        font-weight: 400; font-style: normal; font-display: swap;
    }
    @font-face {
        font-family: 'Ballinger Condensed';
        src: url('{$font_dir}/Ballinger%20Condensed%20Series/Fonts/ballingercondensed-bold.otf') format('opentype');
        font-weight: 700; font-style: normal; font-display: swap;
    }
    ";
    wp_add_inline_style( 'compassion-style', $inline_fonts );

    // JS principal
    $js_version = file_exists( $theme_path . '/assets/js/wireframe.js' ) ? filemtime( $theme_path . '/assets/js/wireframe.js' ) : '1.2.0';
    wp_enqueue_script(
        'compassion-wireframe',
        $theme_dir . '/assets/js/wireframe.js',
        array( 'jquery' ),
        $js_version,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'compassion_enqueue_assets', 10 );

// ─────────────────────────────────────────────
// 4. DESABILITAR CSS DESNECESSÁRIOS DO WORDPRESS
// ─────────────────────────────────────────────
add_action( 'wp_enqueue_scripts', function() {
    // Remove estilo padrão do bloco editor que interfere no layout
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'global-styles' );
    wp_dequeue_style( 'classic-theme-styles' );
}, 100 );

// ─────────────────────────────────────────────
// 5. UPLOAD DE SVG
// ─────────────────────────────────────────────
add_filter( 'upload_mimes', function( $mimes ) {
    $mimes['svg']  = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
} );

// ─────────────────────────────────────────────
// 6. SHORTCODES DAS SEÇÕES
// ─────────────────────────────────────────────
function compassion_get_section( $slug ) {
    ob_start();
    $file = get_stylesheet_directory() . '/template-parts/' . $slug . '.php';
    if ( file_exists( $file ) ) {
        include $file;
    } else {
        echo '<!-- Section not found: ' . esc_html( $slug ) . ' -->';
    }
    return ob_get_clean();
}

add_shortcode( 'compassion_header',       function() { return compassion_get_section( 'section-header' ); } );
add_shortcode( 'compassion_hero',         function() { return compassion_get_section( 'section-hero' ); } );
add_shortcode( 'compassion_stats',        function() { return compassion_get_section( 'section-stats' ); } );
add_shortcode( 'compassion_fases',        function() { return compassion_get_section( 'section-fases' ); } );
add_shortcode( 'compassion_programas',    function() { return compassion_get_section( 'section-programas' ); } );
add_shortcode( 'compassion_mapa_brasil',  function() { return compassion_get_section( 'section-mapa' ); } );
add_shortcode( 'compassion_cursos',       function() { return compassion_get_section( 'section-cursos' ); } );
add_shortcode( 'compassion_pagina_cursos',function() { return compassion_get_section( 'section-cursos-catalogo' ); } );
add_shortcode( 'compassion_contato',      function() { return compassion_get_section( 'section-contato' ); } );
add_shortcode( 'compassion_footer',       function() { return compassion_get_section( 'section-footer' ); } );
