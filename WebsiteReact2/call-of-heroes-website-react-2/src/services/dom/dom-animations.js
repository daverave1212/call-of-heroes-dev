import { isFunction, isNumber } from "../../utils";

export function slideInFromOpacity0(domElement, delay, duration, callback) {
    domElement.style.opacity = 0
    setTimeout(() => {
        domElement.style.opacity = 1
    }, delay - 100)
    setTimeout(() => {
        slideIn(domElement, duration, callback)
    }, delay)
}

export function slideIn(domElement, duration = 600, callback) {
    if (isFunction(duration)) {
        callback = duration
        duration = 600
    }
    setTimeout(callback, 600)
    return domElement.animate([
        { 
            opacity: 0, 
            transform: 'translateY(100px)'
        },
        { 
            opacity: 1, 
            transform: 'translateY(0)'      // normal y
        }
    ], {
        duration,                                    // Duration in ms (adjust as needed)
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'                                  // Keeps the element in its final state
    });
}