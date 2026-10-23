<?php
/**
 * Compassion Brasil Child Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Forçar HTTPS em URLs de assets caso a conexão seja segura ou via proxy/Cloudflare
add_filter( 'stylesheet_directory_uri', function( $uri ) {
    if ( is_ssl() || ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) || ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) ) {
        $uri = set_url_scheme( $uri, 'https' );
    }
    return $uri;
} );

add_filter( 'stylesheet_uri', function( $uri ) {
    if ( is_ssl() || ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) || ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) ) {
        $uri = set_url_scheme( $uri, 'https' );
    }
    return $uri;
} );

/**
 * Enfileirar estilos e scripts do projeto
 */
function compassion_child_enqueue_assets() {
    $theme_dir = get_stylesheet_directory_uri();
    $theme_path = get_stylesheet_directory();

    // 1. Google Fonts oficiais
    wp_enqueue_style(
        'compassion-google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
        array(),
        null
    );

    // 2. CSS Principal via style.css do tema (contém todo o Design System)
    $css_version = file_exists( $theme_path . '/style.css' ) ? filemtime( $theme_path . '/style.css' ) : '1.0.8';
    wp_enqueue_style(
        'compassion-child-style',
        get_stylesheet_uri(),
        array(),
        $css_version
    );

    // 2.1 Reforço inline de fontes com URL absoluta e garantia de peso Bold Black (900/800)
    $font_url_heavy = esc_url( $theme_dir . '/assets/fonts/Neighbour%20Sans/Webfont/NeighbourSans-Heavy.woff2' );
    $font_url_extrabold = esc_url( $theme_dir . '/assets/fonts/Neighbour%20Sans/Webfont/NeighbourSans-ExtraBold.woff2' );
    $font_url_bold = esc_url( $theme_dir . '/assets/fonts/Neighbour%20Sans/Webfont/NeighbourSans-Bold.woff2' );
    $font_url_regular = esc_url( $theme_dir . '/assets/fonts/Neighbour%20Sans/Webfont/NeighbourSans-Regular.woff2' );
    $ballinger_url = esc_url( $theme_dir . '/assets/fonts/Ballinger%20Condensed%20Series/Fonts/ballingercondensed-bold.otf' );

    $inline_typography = "
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_url_heavy}') format('woff2');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_url_extrabold}') format('woff2');
        font-weight: 800;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_url_bold}') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Neighbour Sans';
        src: url('{$font_url_regular}') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Ballinger Condensed';
        src: url('{$ballinger_url}') format('opentype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }
    :root {
        --font: 'Neighbour Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    h1, h2, h3, .hero-title, h1.hero-title, .page-hero-title, h1.page-hero-title, .section-title, h2.section-title, .elementor-heading-title, .elementor-widget-heading .elementor-heading-title {
        font-family: 'Neighbour Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 900 !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
    }
    h4, .phase-ed-title, .prog-card-title, .prog-full-title, .course-card-title, h3.course-card-title {
        font-family: 'Neighbour Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 800 !important;
    }
    ";
    wp_add_inline_style( 'compassion-child-style', $inline_typography );

    // 3. JS Principal (wireframe.js)
    $js_version = file_exists( $theme_path . '/assets/js/wireframe.js' ) ? filemtime( $theme_path . '/assets/js/wireframe.js' ) : '1.0.8';
    wp_enqueue_script(
        'compassion-wireframe-js',
        $theme_dir . '/assets/js/wireframe.js',
        array('jquery'),
        $js_version,
        true // footer
    );
}
add_action( 'wp_enqueue_scripts', 'compassion_child_enqueue_assets', 30 );

/**
 * Permitir upload de arquivos SVG com segurança
 */
function compassion_allow_svg_upload( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'compassion_allow_svg_upload' );

/**
 * Shortcodes para uso no Elementor e Páginas
 */
function compassion_register_shortcode_part( $slug ) {
    ob_start();
    $file = get_stylesheet_directory() . '/template-parts/' . $slug . '.php';
    if ( file_exists( $file ) ) {
        include $file;
    } else {
        echo '<!-- Template part ' . esc_html( $slug ) . ' not found -->';
    }
    return ob_get_clean();
}

add_shortcode( 'compassion_header', function() { return compassion_register_shortcode_part( 'section-header' ); } );
add_shortcode( 'compassion_hero', function() { return compassion_register_shortcode_part( 'section-hero' ); } );
add_shortcode( 'compassion_stats', function() { return compassion_register_shortcode_part( 'section-stats' ); } );
add_shortcode( 'compassion_fases', function() { return compassion_register_shortcode_part( 'section-fases' ); } );
add_shortcode( 'compassion_programas', function() { return compassion_register_shortcode_part( 'section-programas' ); } );
add_shortcode( 'compassion_mapa_brasil', function() { return compassion_register_shortcode_part( 'section-mapa' ); } );
add_shortcode( 'compassion_cursos', function() { return compassion_register_shortcode_part( 'section-cursos' ); } );
add_shortcode( 'compassion_pagina_cursos', function() { return compassion_register_shortcode_part( 'section-cursos-catalogo' ); } );
add_shortcode( 'compassion_contato', function() { return compassion_register_shortcode_part( 'section-contato' ); } );
add_shortcode( 'compassion_footer', function() { return compassion_register_shortcode_part( 'section-footer' ); } );

/**
 * Desativar Header e Footer legados do Elementor Theme Builder (da agência antiga)
 * nas páginas oficiais da Compassion para garantir 100% de controle do Design System
 */
add_filter( 'elementor/theme/need_override_location', function( $need_override, $location ) {
    if ( $location === 'header' || $location === 'footer' ) {
        return false;
    }
    return $need_override;
}, 999, 2 );

/**
 * Suportes essenciais do tema
 */
add_action( 'after_setup_theme', function() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
} );


