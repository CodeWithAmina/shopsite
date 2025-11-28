// Modal Alert System for Center Screen
class ModalAlert {
    static show(title, message, type = 'info', buttons = null) {
        const modalId = 'modal-alert-' + Date.now();
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop-alert';
        backdrop.id = modalId + '-backdrop';
        
        let buttonHTML = '';
        if (buttons) {
            buttonHTML = buttons.map(btn => `
                <button class="modal-btn modal-btn-${btn.type || 'primary'}" 
                        onclick="${btn.onClick || `ModalAlert.close('${modalId}')`}">
                    ${btn.text}
                </button>
            `).join('');
        } else {
            buttonHTML = `<button class="modal-btn modal-btn-primary" onclick="ModalAlert.close('${modalId}')">Close</button>`;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-alert-container';
        modal.id = modalId;
        modal.innerHTML = `
            <div class="modal-alert-content modal-alert-${type}">
                <button class="modal-alert-close" onclick="ModalAlert.close('${modalId}')">×</button>
                <div class="modal-alert-icon">${this.getIcon(type)}</div>
                <h2 class="modal-alert-title">${title}</h2>
                <p class="modal-alert-message">${message}</p>
                <div class="modal-alert-buttons">
                    ${buttonHTML}
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
        
        // Trigger animation
        setTimeout(() => {
            backdrop.classList.add('modal-backdrop-show');
            modal.classList.add('modal-alert-show');
        }, 10);
    }

    static success(title, message, buttons = null) {
        this.show(title, message, 'success', buttons || [
            { text: 'Great!', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }
        ]);
    }

    static error(title, message, buttons = null) {
        this.show(title, message, 'error', buttons || [
            { text: 'Okay', type: 'danger', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }
        ]);
    }

    static warning(title, message, buttons = null) {
        this.show(title, message, 'warning', buttons || [
            { text: 'Understood', type: 'warning', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }
        ]);
    }

    static info(title, message, buttons = null) {
        this.show(title, message, 'info', buttons || [
            { text: 'OK', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }
        ]);
    }

    static confirm(title, message, onConfirm, onCancel = null) {
        const id = 'modal-alert-' + Date.now();
        this.show(title, message, 'warning', [
            { 
                text: 'Cancel', 
                type: 'secondary', 
                onClick: `${onCancel || `ModalAlert.close('${id}')`}` 
            },
            { 
                text: 'Confirm', 
                type: 'danger', 
                onClick: onConfirm 
            }
        ]);
    }

    static close(modalId) {
        const modal = document.getElementById(modalId);
        const backdrop = document.getElementById(modalId + '-backdrop');
        
        if (modal) {
            modal.classList.remove('modal-alert-show');
            setTimeout(() => modal.remove(), 300);
        }
        if (backdrop) {
            backdrop.classList.remove('modal-backdrop-show');
            setTimeout(() => backdrop.remove(), 300);
        }
    }

    static getIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || '📌';
    }
}

// Add Modal Alert Styles
const modalAlertStyles = document.createElement('style');
modalAlertStyles.innerHTML = `
    .modal-backdrop-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        z-index: 9998;
        transition: background 0.3s ease;
    }

    .modal-backdrop-alert.modal-backdrop-show {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
    }

    .modal-alert-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.7);
        opacity: 0;
        z-index: 9999;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .modal-alert-container.modal-alert-show {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    .modal-alert-content {
        background: white;
        border-radius: 20px;
        padding: 3rem 2.5rem;
        max-width: 500px;
        min-width: 350px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        position: relative;
        border-top: 5px solid #e94560;
    }

    .modal-alert-content.modal-alert-success {
        border-top-color: #00a86b;
    }

    .modal-alert-content.modal-alert-error {
        border-top-color: #dc3545;
    }

    .modal-alert-content.modal-alert-warning {
        border-top-color: #ffc107;
    }

    .modal-alert-content.modal-alert-info {
        border-top-color: #4E7FFF;
    }

    .modal-alert-close {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
        transition: color 0.2s ease;
        padding: 0;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-alert-close:hover {
        color: #333;
    }

    .modal-alert-icon {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        animation: bounceIn 0.6s ease;
    }

    .modal-alert-title {
        font-size: 1.8rem;
        font-weight: 900;
        color: #1a1a2e;
        margin-bottom: 0.8rem;
        letter-spacing: 0.5px;
    }

    .modal-alert-message {
        font-size: 1rem;
        color: #666;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .modal-alert-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .modal-btn {
        padding: 0.85rem 2.5rem;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        min-width: 120px;
    }

    .modal-btn-primary {
        background: linear-gradient(135deg, #4E7FFF 0%, #3E6FFF 100%);
        color: white;
    }

    .modal-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(78, 127, 255, 0.4);
    }

    .modal-btn-success {
        background: linear-gradient(135deg, #00a86b 0%, #009659 100%);
        color: white;
    }

    .modal-btn-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 168, 107, 0.4);
    }

    .modal-btn-danger {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        color: white;
    }

    .modal-btn-danger:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }

    .modal-btn-warning {
        background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
        color: white;
    }

    .modal-btn-warning:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 193, 7, 0.4);
    }

    .modal-btn-secondary {
        background: linear-gradient(135deg, #999 0%, #777 100%);
        color: white;
    }

    .modal-btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(100, 100, 100, 0.4);
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        70% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (max-width: 600px) {
        .modal-alert-content {
            min-width: 85vw;
            padding: 2rem 1.5rem;
        }

        .modal-alert-title {
            font-size: 1.5rem;
        }

        .modal-alert-message {
            font-size: 0.9rem;
        }

        .modal-alert-buttons {
            flex-direction: column;
        }

        .modal-btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(modalAlertStyles);
