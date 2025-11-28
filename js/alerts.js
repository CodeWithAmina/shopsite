// Enhanced Alert System
class AlertManager {
    static show(message, type = 'info', duration = 3000) {
        const alertId = 'alert-' + Date.now();
        
        const alertHTML = `
            <div id="${alertId}" class="alert-container alert-${type}">
                <div class="alert-content">
                    <span class="alert-icon">${this.getIcon(type)}</span>
                    <span class="alert-message">${message}</span>
                    <button class="alert-close" onclick="AlertManager.close('${alertId}')">×</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        if (duration > 0) {
            setTimeout(() => this.close(alertId), duration);
        }
    }

    static close(alertId) {
        const alert = document.getElementById(alertId);
        if (alert) {
            alert.classList.add('alert-closing');
            setTimeout(() => alert.remove(), 300);
        }
    }

    static success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    static error(message, duration = 4000) {
        this.show(message, 'error', duration);
    }

    static warning(message, duration = 3500) {
        this.show(message, 'warning', duration);
    }

    static info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }

    static loading(message) {
        return this.show(message, 'loading', 0);
    }

    static getIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'loading': '⏳'
        };
        return icons[type] || '📌';
    }
}

// Add styles for alerts
const alertStyles = document.createElement('style');
alertStyles.innerHTML = `
    .alert-container {
        position: fixed;
        top: 2rem;
        right: 2rem;
        max-width: 450px;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
    }

    .alert-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.2rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        font-weight: 600;
        font-size: 0.95rem;
        backdrop-filter: blur(10px);
    }

    .alert-icon {
        font-size: 1.3rem;
        flex-shrink: 0;
    }

    .alert-message {
        flex: 1;
        line-height: 1.4;
    }

    .alert-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .alert-close:hover {
        opacity: 1;
    }

    /* Success Alert */
    .alert-success .alert-content {
        background: linear-gradient(135deg, rgba(0, 168, 107, 0.95) 0%, rgba(0, 200, 130, 0.95) 100%);
        color: white;
        border-left: 5px solid #00a86b;
    }

    /* Error Alert */
    .alert-error .alert-content {
        background: linear-gradient(135deg, rgba(233, 69, 96, 0.95) 0%, rgba(220, 53, 69, 0.95) 100%);
        color: white;
        border-left: 5px solid #e94560;
    }

    /* Warning Alert */
    .alert-warning .alert-content {
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.95) 0%, rgba(255, 152, 0, 0.95) 100%);
        color: #333;
        border-left: 5px solid #ffc107;
    }

    /* Info Alert */
    .alert-info .alert-content {
        background: linear-gradient(135deg, rgba(78, 127, 255, 0.95) 0%, rgba(52, 105, 254, 0.95) 100%);
        color: white;
        border-left: 5px solid #4E7FFF;
    }

    /* Loading Alert */
    .alert-loading .alert-content {
        background: linear-gradient(135deg, rgba(100, 100, 100, 0.95) 0%, rgba(80, 80, 80, 0.95) 100%);
        color: white;
        border-left: 5px solid #999;
    }

    .alert-loading .alert-icon {
        animation: spin 1s linear infinite;
    }

    .alert-closing {
        animation: slideOutRight 0.3s ease forwards;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(500px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(500px);
            opacity: 0;
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 600px) {
        .alert-container {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
        }

        .alert-content {
            padding: 1rem 1.2rem;
            font-size: 0.9rem;
        }
    }
`;
document.head.appendChild(alertStyles);
