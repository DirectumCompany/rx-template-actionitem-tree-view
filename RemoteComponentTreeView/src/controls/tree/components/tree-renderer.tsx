import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Tree, { type CustomNodeElementProps } from 'react-d3-tree';
import { NodeContent } from './node-content';
import type { ITask } from '../types';

interface ITreeRendererProps {
  data: ITask;
  entityId: number;
}

const NODE_WIDTH = 220;
const NODE_HEIGHT = 150;
const SEPARATION = { siblings: 2, nonSiblings: 2 };

export const TreeRenderer: React.FC<ITreeRendererProps> = ({ data, entityId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    setTranslate({ x: width / 2, y: height / 2 });
  }, []);

  const renderNode = useCallback(
    ({ nodeDatum, toggleNode }: CustomNodeElementProps) => (
      <g>
        <foreignObject
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          x={-NODE_WIDTH / 2}
          y={-NODE_HEIGHT}
        >
          <NodeContent
            nodeDatum={nodeDatum as unknown as ITask}
            entityId={entityId}
            toggleNode={toggleNode}
          />
        </foreignObject>
      </g>
    ),
    [entityId],
  );

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={renderNode}
        translate={translate}
        separation={SEPARATION}
        pathFunc="step"
        collapsible={false}
        nodeSize={{ x: NODE_WIDTH, y: NODE_HEIGHT + 60 }}
      />
    </div>
  );
};