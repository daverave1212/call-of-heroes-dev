const FLASH_ELEMENT_STYLE_ID = "flash-element-style";

function ensureFlashElementStyles() {
    if (document.getElementById(FLASH_ELEMENT_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = FLASH_ELEMENT_STYLE_ID;

    style.textContent = `
        .flash-element-animation {
            animation: flash-element-glow 0.5s ease-out;
        }

        @keyframes flash-element-glow {
            0% {
                filter: drop-shadow(0 0 0 transparent);
            }

            20% {
                filter:
                    drop-shadow(0 0 0.3rem var(--flash-color))
                    drop-shadow(0 0 0.7rem var(--flash-color));
            }

            45% {
                filter:
                    drop-shadow(0 0 0.5rem var(--flash-color))
                    drop-shadow(0 0 1rem var(--flash-color));
            }

            100% {
                filter: drop-shadow(0 0 0 transparent);
            }
        }
    `;

    document.head.appendChild(style);
}

export function flashElement(element, color) {
    if (!element) return;

    ensureFlashElementStyles();

    element.style.setProperty("--flash-color", color);

    // Remove first so calling it again immediately restarts the animation
    element.classList.remove("flash-element-animation");

    // Force browser to register the removal
    void element.offsetWidth;

    element.classList.add("flash-element-animation");

    setTimeout(() => {
        element.classList.remove("flash-element-animation");
        element.style.removeProperty("--flash-color");
    }, 500);
}