import React from 'react';
import { useTranslation } from 'react-i18next';

import KeyValueRow from '../components/key-value-row';
import Section from '../components/section';
import styles from '../styles/demo-view.module.css';

interface IProps {
  logCount: { info: number; warn: number; error: number };
  onLog: (level: 'info' | 'warn' | 'error') => void;
}

/**
 * Демонстрирует context.logger — встроенный логгер хоста.
 * Поддерживает три уровня: info, warning, error. Для error обязательно
 * передавать первым аргументом объект Error.
 *
 * Имя логгера задаётся через WORKAROUND-04: принудительная запись в свойство name.
 * ILogger не экспонирует name, но в runtime свойство перезаписываемо.
 */
const LoggerSection: React.FC<IProps> = ({ logCount, onLog }) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('demo.sections.logger.title')}
      hint={t('demo.sections.logger.hint')}
      advice={t('demo.advice.logger')}
      code={`// WORKAROUND-04: установка имени логгера
import { setLoggerName } from './shared/utils/set-logger-name';
setLoggerName(context.logger, 'CardApiDemo');

context.logger.info('message');
context.logger.warning('message');
context.logger.error(new Error(msg), 'template', ...args);`}
    >
      <div className={styles.actions}>
        <button type='button' className={styles.button} onClick={() => onLog('info')}>
          {t('demo.buttons.logInfo')}
        </button>
        <button type='button' className={styles.button} onClick={() => onLog('warn')}>
          {t('demo.buttons.logWarn')}
        </button>
        <button type='button' className={styles.button} onClick={() => onLog('error')}>
          {t('demo.buttons.logError')}
        </button>
      </div>
      <table className={styles.table}>
        <tbody>
          <KeyValueRow label='Info' value={logCount.info} />
          <KeyValueRow label='Warn' value={logCount.warn} />
          <KeyValueRow label='Error' value={logCount.error} />
        </tbody>
      </table>
    </Section>
  );
};

export default LoggerSection;
