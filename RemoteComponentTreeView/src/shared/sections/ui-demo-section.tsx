import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../components/modal';
import Section from '../components/section';
import ToastContainer from '../components/toast';
import Tooltip from '../components/tooltip';
import { useToast } from '../hooks/use-toast';
import styles from '../styles/demo-view.module.css';

/**
 * Демонстрирует UI-компоненты, используемые в контролах.
 *
 * Все три компонента (Modal, Tooltip, Toast) рендерятся через createPortal
 * в document.body — они находятся вне DOM-дерева контрола и не подвержены
 * CSS-изоляции. Для стилизации используются переменные --theme_* напрямую.
 */
const UiDemoSection: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const { toasts, addToast } = useToast();

  return (
    <>
      <Section
        title={t('demo.sections.ui.title')}
        hint={t('demo.sections.ui.hint')}
        advice={t('demo.advice.ui')}
        badge={t('demo.badges.guidance')}
        code={`// Модал: createPortal в document.body
// Тултип: getBoundingClientRect + Portal + scroll-слежение
// Тосты: Portal-стек с автоудалением через setTimeout`}
      >
        <div className={styles.actions}>
          <button type='button' className={styles.button} onClick={() => setModalOpen(true)}>
            {t('demo.buttons.openModal')}
          </button>
          <Tooltip content={t('demo.sections.ui.tooltipText')}>
            <button type='button' className={styles.button}>
              {t('demo.buttons.showTooltip')}
            </button>
          </Tooltip>
          <button
            type='button'
            className={styles.button}
            onClick={() => addToast('info', t('demo.sections.ui.toastText', { type: 'info' }))}
          >
            {t('demo.buttons.toastInfo')}
          </button>
          <button
            type='button'
            className={styles.button}
            onClick={() =>
              addToast('success', t('demo.sections.ui.toastText', { type: 'success' }))
            }
          >
            {t('demo.buttons.toastSuccess')}
          </button>
          <button
            type='button'
            className={styles.button}
            onClick={() => addToast('error', t('demo.sections.ui.toastText', { type: 'error' }))}
          >
            {t('demo.buttons.toastError')}
          </button>
        </div>
      </Section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={t('demo.modal.title')}>
        <p>{t('demo.modal.portal')}</p>
        <p>{t('demo.modal.cssModules')}</p>
        <p>{t('demo.modal.theme')}</p>
        <p>{t('demo.modal.escape')}</p>
        <p>{t('demo.modal.focus')}</p>
        <p>{t('demo.modal.stopPropagation')}</p>
      </Modal>
      <ToastContainer toasts={toasts} />
    </>
  );
};

export default UiDemoSection;
