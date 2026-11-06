import { useCallback, useEffect, useState } from 'react';
import * as clientRX from '../../../api/action-items.client';
import type { ITask } from '../types';

interface IUseTreeDataResult {
  data: ITask | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useTreeData(entityId: number): IUseTreeDataResult {
  const [data, setData] = useState<ITask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const value = await clientRX.getAllActionItemExecutionTaskForLeadTaskAsync(entityId);
      setData(value);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить данные дерева');
      // eslint-disable-next-line no-console
      console.error('Ошибка загрузки дерева:', err);
    } finally {
      setIsLoading(false);
    }
  }, [entityId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}