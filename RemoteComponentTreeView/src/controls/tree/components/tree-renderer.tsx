import React, { useCallback } from 'react';
import Tree, { type CustomNodeElementProps } from 'react-d3-tree';
import { NodeContent } from './node-content';
import type { ITask } from '../types';

interface ITreeRendererProps {
  data: ITask;
  entityId: number;
}

const NODE_WIDTH = 220;
const NODE_HEIGHT = 200;
const TRANSLATE = { x: 900, y: 100 };
const SEPARATION = { siblings: 2, nonSiblings: 2 };

export const TreeRenderer: React.FC<ITreeRendererProps> = ({ data, entityId }) => {
  const renderNode = useCallback(
    ({ toggleNode }: CustomNodeElementProps) => (
      <g>
        <foreignObject
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          x={-NODE_WIDTH / 2}
          y={-NODE_HEIGHT / 2}
        >
          <NodeContent
            nodeDatum={data}
            entityId={entityId}
            toggleNode={toggleNode}
          />
        </foreignObject>
      </g>
    ),
    [entityId],
  );


  return (
    <Tree
      data={data}
      orientation="vertical"
      renderCustomNodeElement={renderNode}
      translate={TRANSLATE}
      separation={SEPARATION}
      pathFunc="step"
      collapsible={false}
    />
  );
};