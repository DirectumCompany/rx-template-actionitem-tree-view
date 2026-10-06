import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import Section from '../components/section';
import styles from '../styles/demo-view.module.css';

interface IProps {
  renderCrash: boolean;
  onThrowRenderError: () => void;
  onThrowAsyncError: () => void;
  onSafeAsyncCall: () => void;
  safeAsyncResult: 'idle' | 'success' | 'error';
}

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorFallback}>
      <div className={styles.errorTitle}>{t('demo.errors.caught')}</div>
      <pre className={styles.errorMessage}>{error.message}</pre>
    </div>
  );
};

const CrashableBlock: React.FC<{ crash: boolean }> = ({ crash }) => {
  if (crash) {
    throw new Error('Render error: caught by ErrorBoundary');
  }
  return null;
};

/**
 * Демонстрирует обработку ошибок в контроле.
 *
 * Важно: ErrorBoundary ловит только ошибки рендера (синхронные).
 * Асинхронные ошибки (setTimeout, Promise) проходят мимо —
 * их нужно ловить через try/catch и логировать через context.logger.error.
 */
const ErrorHandlingSection: React.FC<IProps> = ({
  renderCrash,
  onThrowRenderError,
  onThrowAsyncError,
  onSafeAsyncCall,
  safeAsyncResult
}) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('demo.sections.errorHandling.title')}
      hint={t('demo.sections.errorHandling.hint')}
      advice={t('demo.advice.errorHandling')}
      code={`// ErrorBoundary: ловит ошибки рендера
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <CrashableBlock crash={renderCrash} />
</ErrorBoundary>

// Асинхронные ошибки: только try/catch + logger
setTimeout(() => { throw err; }, 0);  // ❌ мимо ErrorBoundary

try {
  await riskyOperation();
} catch (err) {
  context.logger.error(err);  // ✅ поймано и залогировано
}`}
    >
      <div className={styles.loggerBlock}>
        <div className={styles.loggerBlockTitle}>{t('demo.errors.catchesRender')}</div>
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[renderCrash]}>
          <CrashableBlock crash={renderCrash} />
        </ErrorBoundary>
        <div className={styles.actions}>
          <button type='button' className={styles.button} onClick={onThrowRenderError}>
            {t('demo.buttons.throwRenderError')}
          </button>
        </div>
      </div>

      <div className={styles.loggerBlock}>
        <div className={styles.loggerBlockTitle}>{t('demo.errors.asyncNotCaught')}</div>
        <div className={styles.actions}>
          <button type='button' className={styles.button} onClick={onThrowAsyncError}>
            {t('demo.buttons.throwAsyncError')}
          </button>
        </div>
      </div>

      <div className={styles.loggerBlock}>
        <div className={styles.loggerBlockTitle}>try/catch + context.logger.error</div>
        <div className={styles.actions}>
          <button type='button' className={styles.button} onClick={onSafeAsyncCall}>
            {t('demo.buttons.safeAsyncCall')}
          </button>
          {safeAsyncResult === 'error' && (
            <span className={styles.badge}>{t('demo.errors.caughtAndLogged')}</span>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ErrorHandlingSection;
