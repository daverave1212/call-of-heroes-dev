/**
 * Displays a auto-dismissing toast notification sliding from top.
 * 
 * @param {string} message - The text content to display.
 * @param {'yellow'|'green'|'blue'|'red'} [type='yellow'] - Color mode variant.
 * @param {number} [duration=3000] - Time in milliseconds before sliding out.
 */
export function showToast(message, type = 'yellow', duration = 3000) {
  const container = document.getElementById('Window');
  if (!container) return;

  // Color scheme definitions (background, text, border)
  const colors = {
    yellow: { bg: '#fef3c7', text: '#78350f', border: '#f59e0b' },
    green:  { bg: '#dcfce7', text: '#14532d', border: '#22c55e' },
    blue:   { bg: '#dbeafe', text: '#1e3a8a', border: '#3b82f6' },
    red:    { bg: '#fee2e2', text: '#7f1d1d', border: '#ef4444' }
  };

  const activeColor = colors[type] || colors.yellow;

  // 1. Create element & apply styles
  const toast = document.createElement('div');
  toast.innerText = message;
  
  Object.assign(toast.style, {
    padding: '1rem',
    fontFamily: 'HomeFont',
    fontSize: '1.25rem',
    position: 'fixed',
    zIndex: 'var(--z-popup)',
    backgroundColor: activeColor.bg,
    color: activeColor.text,
    borderLeft: `6px solid ${activeColor.border}`,
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'fixed',
    top: '4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    pointerEvents: 'auto'
  });

  // 2. Insert as first child of #Window
  container.insertBefore(toast, container.firstChild);

  // 3. Slide in animation
  const slideIn = toast.animate([
    { transform: 'translate(-50%, -120%)', opacity: 0 },
    { transform: 'translate(-50%, 0)', opacity: 1 }
  ], {
    duration: 350,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards'
  });

  // 4. Slide out animation after duration
  slideIn.onfinish = () => {
    setTimeout(() => {
      const slideOut = toast.animate([
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: 'translate(-50%, -120%)', opacity: 0 }
      ], {
        duration: 300,
        easing: 'ease-in',
        fill: 'forwards'
      });

      // Cleanup DOM node after animation finishes
      slideOut.onfinish = () => toast.remove();
    }, duration);
  };
}

// --- Usage Examples ---
// showToast('Warning: Check your input settings');                  // Default (Yellow)
// showToast('Success! File uploaded successfully.', 'green');   // Green mode
// showToast('Info: A new update is available.', 'blue');       // Blue mode
// showToast('Error: Failed to connect to server.', 'red');     // Red mode