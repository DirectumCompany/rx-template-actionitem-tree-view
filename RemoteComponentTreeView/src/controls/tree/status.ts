import type { StatusKey } from './types';

/**
 * Вычисляет эффективный статус узла.
 * Если узел — текущий и находится в процессе, помечаем его как InProcessCurrent.
 */
export function resolveStatusKey(
  status: string,
  isCurrent: boolean,
): StatusKey {
  if (isCurrent && status === 'InProcess') {
    return 'InProcessCurrent';
  }
  return status as StatusKey;
}