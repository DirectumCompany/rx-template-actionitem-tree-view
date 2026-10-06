import React from 'react';
import { IRemoteComponentContext, Theme } from '@directum/sungero-remote-component-types';
import { useTranslation } from 'react-i18next';

import KeyValueRow from '../components/key-value-row';
import Section from '../components/section';
import styles from '../styles/demo-view.module.css';

interface IProps {
  context: IRemoteComponentContext;
}

/**
 * Демонстрирует IRemoteComponentContext — контекст, передаваемый хостом.
 * Содержит информацию о пользователе, культуре, теме оформления,
 * идентификаторе клиента, тенанте и лицензиях модулей.
 */
const ContextSection: React.FC<IProps> = ({ context }) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('demo.sections.context.title')}
      hint={t('demo.sections.context.hint')}
      advice={t('demo.advice.context')}
      code={`// IRemoteComponentContext
const { userId, currentCulture, theme, clientId, tenant, moduleLicenses } = initialContext;`}
    >
      <table className={styles.table}>
        <tbody>
          <KeyValueRow
            label={t('demo.labels.userId')}
            value={context.userId !== null ? context.userId : t('demo.values.notSet')}
          />
          <KeyValueRow
            label={t('demo.labels.currentCulture')}
            value={context.currentCulture ?? t('demo.values.notSet')}
          />
          <KeyValueRow
            label={t('demo.labels.theme')}
            value={context.theme === Theme.Default ? 'Default' : 'Night'}
          />
          <KeyValueRow
            label={t('demo.labels.clientId')}
            value={context.clientId ?? t('demo.values.notSet')}
          />
          <KeyValueRow
            label={t('demo.labels.tenant')}
            value={context.tenant ?? t('demo.values.notSet')}
          />
        </tbody>
      </table>
      {context.moduleLicenses.length > 0 && (
        <>
          <div className={styles.subheader}>{t('demo.labels.moduleLicenses')}</div>
          <div className={styles.licenseGrid}>
            {context.moduleLicenses.map(l => (
              <div key={l.name} className={styles.licenseItem}>
                <span className={styles.licenseName}>{l.name}</span>
                <span className={styles.licenseVersion}>{l.version}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
};

export default ContextSection;
