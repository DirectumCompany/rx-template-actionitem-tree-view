import React from 'react';
import { useTranslation } from 'react-i18next';

import KeyValueRow from '../components/key-value-row';
import Section from '../components/section';
import Spinner from '../components/spinner';
import styles from '../styles/demo-view.module.css';

interface IProps {
  settings: Record<string, string> | null;
  settingsLoading: boolean;
  onLoadSettings: () => void;
}

/**
 * Демонстрирует api.getSettings — асинхронный метод получения настроек
 * компонента из хоста. Возвращает плоский словарь ключ-значение.
 */
const SettingsSection: React.FC<IProps> = ({ settings, settingsLoading, onLoadSettings }) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('demo.sections.settings.title')}
      hint={t('demo.sections.settings.hint')}
      advice={t('demo.advice.settings')}
      code={`// api.getSettings(): Promise<Record<string, string>>
const settings = await api.getSettings();`}
    >
      <div className={styles.actions}>
        <button
          type='button'
          className={styles.button}
          onClick={onLoadSettings}
          disabled={settingsLoading}
        >
          {settingsLoading ? (
            <>
              <Spinner />
              {t('demo.buttons.loading')}
            </>
          ) : (
            t('demo.buttons.loadSettings')
          )}
        </button>
      </div>
      {settings ? (
        <table className={styles.table}>
          <tbody>
            {Object.entries(settings).map(([key, val]) => (
              <KeyValueRow key={key} label={key} value={val} />
            ))}
          </tbody>
        </table>
      ) : null}
      {settings && Object.keys(settings).length === 0 ? (
        <div className={styles.empty}>{t('demo.values.empty')}</div>
      ) : null}
    </Section>
  );
};

export default SettingsSection;
