import { EdgeProps, getSmoothStepPath } from '@xyflow/react';
import { Fragment } from 'react';

export const SkillEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  id,
}: EdgeProps) => {
  const [path] = getSmoothStepPath({
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
  });
  return (
    <Fragment>
      <path
        d={path}
        className="react-flow__edge-path"
        style={{ strokeWidth: 8, stroke: 'black', cursor: 'default' }}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        d={path}
        className="react-flow__edge-path"
        style={{ strokeWidth: 4, cursor: 'default', stroke: 'white', border: '1px solid black' }}
        markerEnd={markerEnd}
      />
    </Fragment>
  );
};
