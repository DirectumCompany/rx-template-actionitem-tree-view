import React from 'react';
import { createPortal } from 'react-dom';

import styles from '../styles/demo-view.module.css';

interface IProps {
  content: string;
  children: React.ReactNode;
}

const renderText = (text: string): React.ReactNode => {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map(part => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={part} className={styles.tooltipCode}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={part}>{part}</React.Fragment>;
  });
};

const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    // WORKAROUND-02: ручной расчёт позиции через getBoundingClientRect — API хоста не даёт позиционирования
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current.offsetHeight;
    setPosition({
      top: rect.top - tooltipHeight - 6,
      left: rect.left + rect.width / 2
    });
  }, []);

  React.useEffect(() => {
    if (!visible) return undefined;
    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [visible, updatePosition]);

  const show = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <span
        ref={triggerRef}
        className={styles.tooltipTrigger}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
      {visible
        ? createPortal(
            <div
              ref={tooltipRef}
              className={styles.tooltip}
              style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)'
              }}
              role='tooltip'
            >
              {renderText(content)}
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default Tooltip;
