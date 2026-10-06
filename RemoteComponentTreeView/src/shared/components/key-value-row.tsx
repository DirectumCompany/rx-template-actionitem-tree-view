import React from 'react';

import styles from '../styles/demo-view.module.css';

interface IProps {
  label: string;
  value: React.ReactNode;
}

const KeyValueRow: React.FC<IProps> = ({ label, value }) => (
  <tr>
    <td className={styles.key}>{label}</td>
    <td className={styles.value}>{value}</td>
  </tr>
);

export default KeyValueRow;
