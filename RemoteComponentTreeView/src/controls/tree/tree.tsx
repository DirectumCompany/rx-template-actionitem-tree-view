import React, { useCallback, useEffect, useState } from 'react';
import {
  ControlUpdateHandler,
} from '@directum/sungero-remote-component-types';
import './tree.css';
import { useTreeData } from '../tree/hooks/use-tree-data';
import { TreeRenderer } from '../tree/components/tree-renderer';
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

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div>Нет данных</div>;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TreeRenderer data={data} entityId={entity.Id} />
    </div>
  );
};

export default TreeView;