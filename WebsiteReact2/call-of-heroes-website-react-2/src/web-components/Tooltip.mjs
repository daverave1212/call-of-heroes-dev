const tagName = 'tooltip'
const style = `{
    :root {
        --tooltip-arrow-side-length: 16px;
    }
    :host {
        position: absolute;

        z-index: 99999;
    }
    :host .hidden {
        display: none;
    }
    :host .arrow {
        z-index: 99997;
        position: absolute;
        width: var(--tooltip-arrow-side-length);
        height: var(--tooltip-arrow-side-length);
        background-color: #333;
        transform: rotate(45deg);
    }
    :host .content {
        position: relative;
        z-index: 99998;

        background-color: #333;
        color: #EEE;
        font-size: 1rem;
        padding: 1rem;
        border-radius: 0.75rem;
    }
}`

class MyBox extends HTMLElement {

    static get observedAttributes() {
        return ['is-shown', 'top', 'left', 'width', 'has-arrow', 'is-lefty']
    }    

    render() {
        const isShown = this.getAttribute('is-shown')
        const top = this.getAttribute('top')
        const left = this.getAttribute('left')
        const width = this.getAttribute('width')
        const hasArrow = this.getAttribute('has-arrow')
        const isLefty = this.getAttribute('is-lefty')

        const tooltipLeftNormal = `calc(${left} - ${width} / 2)`
        const tooltipLeftLefty = `calc(${left} - 2rem)`
        const tooltipLeft = isLefty? tooltipLeftLefty : tooltipLeftNormal
        const arrowLeftNormal = `calc(${width} / 2)`
        const arrowLeftLefty = `calc(2rem)`
        const arrowLeft = isLefty? arrowLeftLefty: arrowLeftNormal
        const arrowTop = `calc(-16px / 2 + 1px)`

        this.className = 'tooltip'
        this.style.left = tooltipLeft
        this.style.top = top;
        this.style.width = width

        if (isShown) {
            this.classList.add('hidden')
        } else {
            this.classList.remove('hidden')
        }


        shadow.innerHTML = `
            <style>${style}</style>
            <div class="content">
                <slot></slot>
            </div>
            ${hasArrow == false? '': `
                <div class="arrow" style="left: ${arrowLeft}; top: ${arrowTop};"></div>
            `}
        `;
    }
    
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.render()
    }
}

if (customElements == null) {
    console.error(`window.customElements is undefined for defining webcomponent ${tagName}`)
}
if (!customElements.get(tagName)) {
    customElements.define(tagName, MyBox);
}
