import React, { useMemo } from 'react';
import { STATUS_CONFIG } from '../../../utils/constants';
import type { ITask } from '../../tree/types';
import { resolveStatusKey } from '../status';

import { Card, Tag, Typography  } from 'antd';

const { Text } = Typography;

interface INodeContentProps {
  nodeDatum: ITask;
  entityId: number;
  toggleNode: () => void;
}

export const NodeContent: React.FC<INodeContentProps> = ({
  nodeDatum,
  entityId,
  toggleNode,
}) => {
  const { attributes, name } = nodeDatum;

    console.log(attributes, name);

  const statusKey = useMemo(
    () => resolveStatusKey(attributes.Status, attributes.Id === entityId),
    [attributes.Status, attributes.Id, entityId],
  );

  const style = STATUS_CONFIG[statusKey];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Card
        title={name}
        hoverable={false}
        onClick={() =>
          attributes.Hyperlink &&
          window.open(attributes.Hyperlink, '_blank', 'noopener,noreferrer')
        }
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          border: style.border,     // ← цвет рамки по статусу
        }}
        styles={{
          header: {
            fontSize: 14,
            fontWeight: 600,
            padding: '0 12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          body: { padding: 12 },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Исполнитель */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Исполнитель:
            </Text>
            <Text
              strong
              style={{
                fontSize: 12,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {attributes.Assignee}
            </Text>
          </div>

          {/* Срок */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Срок:
            </Text>
            <Tag color="blue" style={{ marginInlineEnd: 0 }}>
              {attributes.Deadline}
            </Tag>
          </div>
        </div>
      </Card>

      {/* Иконка статуса в правом нижнем углу */}
      {style.icon && (
        <img
          src={style.icon}
          alt={statusKey}
          style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            width: 20,
            height: 20,
            pointerEvents: 'none', // чтобы клик по иконке не мешал клику по карточке
          }}
        />
      )}
    </div>
  );
};