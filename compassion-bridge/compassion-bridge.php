<?php
/**
 * Plugin Name: Compassion Brasil - Portal Integrado Bridge
 * Plugin URI: https://compassion.com.br
 * Description: Conecta o domínio WordPress da Compassion Brasil ao frontend hospedado na Netlify (repositório privado), com suporte total a formulários, área do aluno e Moodle LMS.
 * Version: 1.0.0
 * Author: Equipe Compassion
 * License: GPL-2.0+
 */

if (!defined('ABSPATH')) {
    exit;
}

// URL padrão na Netlify (pode ser sobrescrita pelo painel do WordPress em Configurações > Compassion Bridge)
if (!defined('COMPASSION_NETLIFY_URL')) {
    define('COMPASSION_NETLIFY_URL', get_option('compassion_netlify_url', 'https://SEU-PROJETO.netlify.app'));
}

/**
 * Intercepta o carregamento das páginas públicas
 */
add_action('template_redirect', 'compassion_render_bridge', 1);

function compassion_render_bridge() {
    // 1. NUNCA intercepta telas administrativas ou do sistema WordPress
    if (
        is_admin() ||
        strpos($_SERVER['REQUEST_URI'], '/wp-admin') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-login.php') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-json') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-cron.php') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/xmlrpc.php') !== false
    ) {
        return;
    }

    // 2. Permite ao administrador ver o WordPress original adicionando ?preview_wp=1 na URL
    if (isset($_GET['preview_wp']) && $_GET['preview_wp'] === '1' && current_user_can('manage_options')) {
        return;
    }

    // 3. Monta o caminho de destino na Netlify
    $app_url = get_option('compassion_netlify_url', COMPASSION_NETLIFY_URL);
    $request_uri = $_SERVER['REQUEST_URI'];
    $target_url = rtrim($app_url, '/') . $request_uri;

    // 4. Limpa quaisquer buffers de saída e cache do WordPress
    while (ob_get_level()) {
        ob_end_clean();
    }

    // 5. Envia cabeçalhos limpos
    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    header('X-Robots-Tag: index, follow');
    ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title><?php echo esc_html(get_bloginfo('name')); ?> | <?php echo esc_html(get_bloginfo('description')); ?></title>

    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        #compassion-frame {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            display: block;
            z-index: 999999;
        }
    </style>
</head>
<body>

    <iframe 
        id="compassion-frame"
        src="<?php echo esc_url($target_url); ?>"
        title="<?php echo esc_attr(get_bloginfo('name')); ?>"
        allow="autoplay; camera; microphone; clipboard-read; clipboard-write; fullscreen; payment; geolocation"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
    ></iframe>

    <script>
        // Sincroniza a navegação dentro da Netlify com a URL oficial na barra do navegador
        window.addEventListener('message', function(event) {
            try {
                var allowedOrigin = '<?php echo esc_url($app_url); ?>';
                if (event.origin.indexOf(allowedOrigin) !== -1 && event.data && event.data.path) {
                    window.history.replaceState(null, '', event.data.path);
                }
            } catch (e) {}
        });
    </script>
</body>
</html>
    <?php
    exit;
}

/**
 * Cria página de configurações simples no menu de Configurações do WordPress
 */
add_action('admin_menu', 'compassion_bridge_admin_menu');
function compassion_bridge_admin_menu() {
    add_options_page(
        'Compassion Bridge',
        'Compassion Bridge',
        'manage_options',
        'compassion-bridge',
        'compassion_bridge_settings_page'
    );
}

function compassion_bridge_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    // Salva configurações enviadas
    if (isset($_POST['compassion_bridge_save']) && check_admin_referer('compassion_bridge_nonce')) {
        $url = esc_url_raw(trim($_POST['compassion_netlify_url']));
        update_option('compassion_netlify_url', $url);
        echo '<div class="notice notice-success is-dismissible"><p><strong>Configurações salvas com sucesso!</strong></p></div>';
    }

    $current_url = get_option('compassion_netlify_url', COMPASSION_NETLIFY_URL);
    ?>
    <div class="wrap">
        <h1>Compassion Brasil - Portal Integrado (Netlify Bridge)</h1>
        <p>Conecta o domínio oficial diretamente ao projeto hospedado na Netlify (repositório privado).</p>

        <form method="post" action="" style="background: #fff; padding: 24px; border-radius: 12px; max-width: 650px; margin-top: 16px; border: 1px solid #ccd0d4;">
            <?php wp_nonce_field('compassion_bridge_nonce'); ?>

            <table class="form-table" role="presentation">
                <tbody>
                    <tr>
                        <th scope="row"><label for="compassion_netlify_url">URL do Projeto na Netlify</label></th>
                        <td>
                            <input name="compassion_netlify_url" type="url" id="compassion_netlify_url" value="<?php echo esc_attr($current_url); ?>" class="regular-text" placeholder="https://seu-projeto.netlify.app" required style="width: 100%;">
                            <p class="description">Cole aqui o endereço gerado pela Netlify (ex: <code>https://compassion-brasil.netlify.app</code>).</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

            <p class="submit" style="margin: 0; padding: 0;">
                <input type="submit" name="compassion_bridge_save" id="submit" class="button button-primary" value="Salvar Alterações">
            </p>
        </form>

        <div style="background: #f0f6fc; padding: 18px 24px; border-radius: 12px; max-width: 650px; margin-top: 20px; border: 1px solid #c8d8ea;">
            <h3 style="margin-top: 0; color: #0969da;">💡 Dicas de Acesso</h3>
            <ul style="margin-bottom: 0; line-height: 1.6;">
                <li>O painel <code>/wp-admin</code> continua funcionando normalmente.</li>
                <li>Para visualizar o tema antigo do WordPress sem o bridge, acesse: <br><code><?php echo esc_url(home_url('/?preview_wp=1')); ?></code></li>
            </ul>
        </div>
    </div>
    <?php
}

