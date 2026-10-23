import { useEffect, useRef } from "react";

export default function AutoFitText({
    children,
    maxFontSize = 48,
    minFontSize = 12,
    style = {},
    className = "",
    id
}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const resize = () => {
            let size = maxFontSize;

            element.style.fontSize = `${size}px`;

            while (
                element.scrollWidth > element.clientWidth &&
                size > minFontSize
            ) {
                size--;
                element.style.fontSize = `${size}px`;
            }
        };

        const observer = new ResizeObserver(resize);
        observer.observe(element);

        resize();

        return () => observer.disconnect();
    }, [children, maxFontSize, minFontSize]);

    return (
        <span
            ref={ref}
            id={id}
            className={className}
            style={{
                display: "block",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                ...style
            }}
        >
            {children}
        </span>
    );
}
