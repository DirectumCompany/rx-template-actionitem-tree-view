import React from 'react';
import { useTranslation } from 'react-i18next';

import KeyValueRow from '../components/key-value-row';
import Section from '../components/section';
import styles from '../styles/demo-view.module.css';

interface IProps {
  tenant: string | null;
}

const STORAGE_KEY = 'demoValue';

const buildKey = (tenant: string | null): string => {
  return `${tenant ?? 'unknown'}_demo-control_${STORAGE_KEY}`;
};

const LocalStorageSection: React.FC<IProps> = ({ tenant }) => {
  const { t } = useTranslation();
  const prefixedKey = buildKey(tenant);
  const [storedValue, setStoredValue] = React.useState<string | null>(() =>
    localStorage.getItem(prefixedKey)
  );

  const handleSet = React.useCallback(() => {
    const value = `${Date.now()}`;
    localStorage.setItem(prefixedKey, value);
    setStoredValue(value);
  }, [prefixedKey]);

  const handleRemove = React.useCallback(() => {
    localStorage.removeItem(prefixedKey);
    setStoredValue(null);
  }, [prefixedKey]);

  return (
    <Section
      title={t('demo.sections.localStorage.title')}
      hint={t('demo.sections.localStorage.hint')}
      advice={t('demo.advice.localStorage')}
      badge={t('demo.badges.guidance')}
      code={`// ❌ Так нельзя:
localStorage.setItem('myKey', value);

// ✅ Только с префиксом:
const key = \`\${tenant}_\${controlName}_myKey\`;
// → "${prefixedKey}"
localStorage.setItem(key, value);`}
    >
      <table className={styles.table}>
        <tbody>
          <KeyValueRow label={t('demo.labels.tenant')} value={prefixedKey.split('_')[0]} />
          <KeyValueRow
            label='Key'
            value={`${prefixedKey.split('_')[1]}_${prefixedKey.split('_')[2]}`}
          />
          <KeyValueRow label='localStorage' value={storedValue ?? t('demo.values.notSet')} />
        </tbody>
      </table>
      <div className={styles.actions}>
        <button type='button' className={styles.button} onClick={handleSet}>
          {t('demo.buttons.set')}
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={handleRemove}
          disabled={!storedValue}
        >
          {t('demo.buttons.remove')}
        </button>
      </div>
    </Section>
  );
};

export default LocalStorageSection;
