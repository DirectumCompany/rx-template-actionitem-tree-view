import React from 'react';
import { createPortal } from 'react-dom';

import styles from '../styles/demo-view.module.css';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isOpen, onClose, title, children }) => {
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
      return undefined;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // WORKAROUND-03: ручной keyboard trap и блокировка скролла — API хоста не даёт модального окна
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={title}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <button
            type='button'
            className={styles.modalClose}
            onClick={onClose}
            aria-label='Закрыть'
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
