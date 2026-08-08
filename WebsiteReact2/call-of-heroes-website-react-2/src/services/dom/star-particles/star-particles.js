const STARS_ANIMATION_STYLE_ID = "stars-animation-style";

function ensureStarsAnimationStyles() {
    if (document.getElementById(STARS_ANIMATION_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STARS_ANIMATION_STYLE_ID;

    style.textContent = `
        .star-burst {
            position: absolute;
            inset: 0;

            pointer-events: none;
            z-index: 100;

            overflow: visible;
        }

        .star-burst-star {
            position: absolute;
            left: 50%;
            top: 50%;

            font-size: var(--star-size);
            color: #ffd900;

            line-height: 1;

            transform: translate(-50%, -50%) scale(0);
            opacity: 0;

            animation: star-burst-animation 0.6s ease-out forwards;
            animation-delay: var(--star-delay);
        }

        @keyframes star-burst-animation {
            0% {
                transform:
                    translate(-50%, -50%)
                    translate(0, 0)
                    rotate(0deg)
                    scale(0);

                opacity: 0;
            }

            15% {
                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    translate(
                        calc(var(--star-x) * 0.15),
                        calc(var(--star-y) * 0.15)
                    )
                    rotate(30deg)
                    scale(1.3);
            }

            70% {
                opacity: 1;
            }

            100% {
                transform:
                    translate(-50%, -50%)
                    translate(
                        var(--star-x),
                        var(--star-y)
                    )
                    rotate(var(--star-rotation))
                    scale(0.4);

                opacity: 0;
            }
        }
    `;

    document.head.appendChild(style);
}

export function playStarsAnimation(element) {
    if (!element) return;

    ensureStarsAnimationStyles();

    const STAR_COUNT = 14;

    const computedStyle = getComputedStyle(element);

    if (computedStyle.position === "static") {
        element.style.position = "relative";
    }

    const burst = document.createElement("div");
    burst.className = "star-burst";

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement("span");

        star.className = "star-burst-star";
        star.textContent = "★";

        const angle =
            (Math.PI * 2 * i) / STAR_COUNT +
            (Math.random() - 0.5) * 0.4;

        const distance = 50 + Math.random() * 70;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        const size = 0.6 + Math.random() * 0.9;
        const rotation = -180 + Math.random() * 360;
        const delay = Math.random() * 0.08;

        star.style.setProperty("--star-x", `${x}px`);
        star.style.setProperty("--star-y", `${y}px`);
        star.style.setProperty("--star-size", `${size}rem`);
        star.style.setProperty("--star-rotation", `${rotation}deg`);
        star.style.setProperty("--star-delay", `${delay}s`);

        burst.appendChild(star);
    }

    element.appendChild(burst);

    setTimeout(() => {
        burst.remove();
    }, 750);
}