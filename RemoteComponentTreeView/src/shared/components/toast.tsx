import React from 'react';
import { createPortal } from 'react-dom';

import styles from '../styles/demo-view.module.css';

export interface IToast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface IToastContainerProps {
  toasts: IToast[];
}

const TOAST_ICONS: Record<IToast['type'], string> = {
  info: 'i',
  success: '✓',
  error: '✕'
};

const TOAST_CLASS: Record<IToast['type'], string> = {
  info: styles.toastInfo,
  success: styles.toastSuccess,
  error: styles.toastError
};

const ToastContainer: React.FC<IToastContainerProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.toastContainer}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${TOAST_CLASS[t.type]}`}>
          <span className={styles.toastIcon}>{TOAST_ICONS[t.type]}</span>
          <span className={styles.toastMessage}>{t.message}</span>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
