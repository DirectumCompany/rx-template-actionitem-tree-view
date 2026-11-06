import React, { useCallback, useEffect, useState } from 'react';
import {
  ControlUpdateHandler,
} from '@directum/sungero-remote-component-types';
import './tree.css';
import { useTreeData } from '../tree/hooks/use-tree-data';
import { TreeRenderer } from '../tree/components/tree-renderer';
import { StateMessage } from '../tree/components/state-message';
import type { IProps } from './types';

const TreeView: React.FC<IProps> = ({ initialContext, api }) => {
  const [, setContext] = useState(initialContext);
  const entity = api.getEntity();

  const { data, error, isLoading, refetch } = useTreeData(entity.Id);

  const handleControlUpdate: ControlUpdateHandler = useCallback(
    (updatedContext) => {
      setContext(updatedContext);
      refetch();
    },
    [refetch],
  );

  useEffect(() => {
    api.onControlUpdate = handleControlUpdate;
  }, [api, handleControlUpdate]);

return (
  <div className="tree-view">
    {isLoading && <StateMessage variant="loading" text="Загрузка..." />}
    {!isLoading && error && (
      <StateMessage variant="error" text={`Ошибка: ${error}`} onRetry={refetch} />
    )}
    {!isLoading && !error && !data && (
      <StateMessage variant="empty" text="Нет данных" />
    )}
    {!isLoading && !error && data && (
      <TreeRenderer data={data} entityId={entity.Id} />
    )}
  </div>
);
};

export default TreeView;