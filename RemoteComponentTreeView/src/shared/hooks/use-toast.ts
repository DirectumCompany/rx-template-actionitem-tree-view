import React from 'react';

import { IToast } from '../components/toast';

const TOAST_AUTO_REMOVE_MS = 4000;

export function useToast(): {
  toasts: IToast[];
  addToast: (type: IToast['type'], message: string) => void;
} {
  const toastIdCounterRef = React.useRef(0);
  const [toasts, setToasts] = React.useState<IToast[]>([]);

  const addToast = React.useCallback((type: IToast['type'], message: string) => {
    const id = String(++toastIdCounterRef.current);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, TOAST_AUTO_REMOVE_MS);
  }, []);

  return { toasts, addToast };
}
