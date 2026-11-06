import React from 'react';
import './state-message.css';

interface IStateMessageProps {
  text: string;
  variant?: 'loading' | 'error' | 'empty';
  onRetry?: () => void;
}

export const StateMessage: React.FC<IStateMessageProps> = ({
  text,
  variant = 'empty',
  onRetry,
}) => {
  return (
    <div className="state-message">
      {variant === 'loading' && <div className="state-message__spinner" />}
      <span className="state-message__text">{text}</span>
      {/* {variant === 'error' && onRetry && (
        <button className="state-message__retry" onClick={onRetry}>
          Повторить
        </button>
      )} */}
    </div>
  );
};