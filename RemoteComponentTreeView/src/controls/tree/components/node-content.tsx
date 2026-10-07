import React, { useMemo } from 'react';
import { STATUS_CONFIG } from '../../../utils/constants';
import type { ITask } from '../../tree/types';
import { resolveStatusKey } from '../status';

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
    <div className="nodeCustomMain">
      <div
        className="nodeCustom"
        onClick={toggleNode}
        style={{ border: style.border }}
      >
        <div className="topContent">
          <a href={attributes.Hyperlink} target="_blank" rel="noreferrer">
            {name}
          </a>
        </div>
        <div className="bottomContent">
          {attributes.Assignee && <div>{attributes.Assignee}</div>}
          {attributes.Deadline && <div>{attributes.Deadline}</div>}
        </div>
      </div>
      {style.icon && (
        <img className="statusIcon" src={style.icon} alt={statusKey} />
      )}
    </div>
  );
};