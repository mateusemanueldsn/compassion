/**
 * WIREFRAME WEB COMPONENTS - COMPASSION BRASIL
 * Componentes nativos sem frameworks (Zero Redundância)
 * Compatível com navegadores modernos e ideal para importação no Figma
 */

class WfImage extends HTMLElement {
    connectedCallback() {
        const ratio = this.getAttribute('ratio') || '16-9';
        const label = this.getAttribute('label') || 'Placeholder de Imagem';
        const dim = this.getAttribute('dim') || '';
        const isCircle = this.hasAttribute('circle');

        const circleClass = isCircle ? 'wf-img-circle' : `wf-img-${ratio}`;

        this.innerHTML = `
            <div class="wf-img-placeholder ${circleClass}">
                <svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span class="wf-img-label">${label}</span>
                ${dim ? `<span class="wf-img-dimension">${dim}</span>` : ''}
            </div>
        `;
    }
}

customElements.define('wf-image', WfImage);
