import React, { useState, useEffect, useCallback } from 'react';
import Tree from 'react-d3-tree';
import './tree.css';
import {
  IRemoteComponentContext,
  IRemoteComponentCardApi,
  IEntity,
  ControlUpdateHandler,
} from '@directum/sungero-remote-component-types';
import * as rx from './integration-service-connector';
import * as icons from '../../resources/ActionIconsIndex';

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCardApi;
}

interface INodeDatum {
  name: string;
  children: INodeDatum[];
  attributes: IAttributes;
}

interface IAttributes {
  Id?: number;
  Status: string;
  Assignee?: string;
  Deadline?: string;
  SuperiorTaskId?: number;
  Hyperlink: string;
}

type StatusKey = 'Completed' | 'InProcess' | 'InProcessCurrent' | 'Abort';

// Конфигурация стилей и иконок для статусов
const STATUS_CONFIG = {
  Completed: {
    border: '3px solid #6ec479',
    icon: icons.doneSmall,
  },
  InProcess: {
    border: '2px solid #5783db',
    icon: null,
  },
  InProcessCurrent: {
    border: '2px solid #5783db',
    icon: icons.inProgress,
  },
  Abort: {
    border: '2px solid #ff3333',
    icon: icons.abort,
  },
} as const satisfies Record<StatusKey, { border: string; icon: string | null }>;

// Хуки и утилиты
const useTreeData = (entityId: number) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const value = await rx.GetAllActionItemExecutionTaskForLeadTaskAsync(entityId);
      const parsedData: INodeDatum = JSON.parse(value);
      setData(parsedData);
    } catch (err) {
      setError('Не удалось загрузить данные дерева');
      console.error('Ошибка загрузки дерева:', err);
    } finally {
      setIsLoading(false);
    }
  }, [entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
};

// Компоненты
const NodeContent: React.FC<{
  nodeDatum: INodeDatum;
  entityId: number;
  toggleNode: () => void;
}> = ({ nodeDatum, entityId, toggleNode }) => {
  let status = nodeDatum.attributes.Status;
  const isCurrent = nodeDatum.attributes.Id === entityId;

  if (isCurrent && status == 'InProcess')
    status = 'InProcessCurrent';

  const borderStyle = STATUS_CONFIG[status as StatusKey]?.border;
  const iconSrc = STATUS_CONFIG[status as StatusKey]?.icon;

  return (
    <div className="nodeCustomMain">
      <div
        className="nodeCustom"
        onClick={toggleNode}
        style={{ border: borderStyle }}
      >
        <div className="topContent">
          <a href={nodeDatum.attributes.Hyperlink} target="_blank" rel="noreferrer">
            {nodeDatum.name}
          </a>
        </div>
        <div className="bottomContent">
          {nodeDatum.attributes.Assignee && (
            <div>{nodeDatum.attributes.Assignee}</div>
          )}
          {nodeDatum.attributes.Deadline && (
            <div>{nodeDatum.attributes.Deadline}</div>
          )}
        </div>
      </div>
      {iconSrc && (
        <img
          className="statusIcon"
          src={iconSrc}
          alt={status}
        />
      )}
    </div>
  );
};

const TreeView: React.FC<IProps> = ({ initialContext, api }) => {
  const [context, setContext] = useState(initialContext);
  const entity = api.getEntity();

  const { data, error, isLoading, refetch } = useTreeData(entity.Id);

  // Обработчик обновления контекста
  const handleControlUpdate: ControlUpdateHandler = useCallback(
    (updatedContext) => {
      setContext(updatedContext);
      refetch(); // Перезагружаем данные при обновлении контекста
    },
    [refetch]
  );

  useEffect(() => {
    api.onControlUpdate = handleControlUpdate;
  }, [api, handleControlUpdate]);

  // Рендеринг узла через foreignObject
  const renderNode = useCallback(
    ({ nodeDatum, toggleNode }: { nodeDatum: any; toggleNode: () => void }) => (
      <g>
        <foreignObject width={220} height={200} y={-100} x={-110}>
          <NodeContent
            nodeDatum={nodeDatum}
            entityId={entity.Id}
            toggleNode={toggleNode}
          />
        </foreignObject>
      </g>
    ),
    [entity.Id]
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div>Нет данных</div>;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={renderNode}
        translate={{ x: 900, y: 100 }}
        separation={{ siblings: 2, nonSiblings: 2 }}
        pathFunc="step"
        collapsible={false}
      />
    </div>
  );
};

export default TreeView;

