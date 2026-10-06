import React from 'react';

import Tooltip from './tooltip';
import styles from '../styles/demo-view.module.css';

interface IProps {
  title: string;
  hint: string;
  code?: string;
  advice?: string;
  badge?: string;
  children: React.ReactNode;
}

const Section: React.FC<IProps> = ({ title, hint, code, advice, badge, children }) => (
  <div className={styles.section}>
    <div className={styles.headerRow}>
      <div className={styles.header}>
        {title}
        {badge ? <span className={styles.infoBadge}>{badge}</span> : null}
      </div>
      {advice ? (
        <Tooltip content={advice}>
          <span className={styles.adviceIcon}>?</span>
        </Tooltip>
      ) : null}
    </div>
    <div className={styles.hint}>{hint}</div>
    {code ? (
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    ) : null}
    <div className={styles.body}>{children}</div>
  </div>
);

export default Section;
