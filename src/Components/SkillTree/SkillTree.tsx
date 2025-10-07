import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppSelector } from '../../store';
import { SkillNode } from '../SkillNode/SkillNode';
import { SkillEdge } from '../SkillEdge/SkillEdge';

function SkillTree() {
  const nodes = useAppSelector((state) => state.skillNodes);
  const edges = useAppSelector((state) => state.skillEdges);

  return (
    <div
      style={{
        height: 'min(80vh, 400px)',
        width: '100%',
      }}
    >
      <ReactFlow
        draggable={false}
        zoomOnScroll={false}
        nodesDraggable={false}
        nodes={nodes}
        edges={edges}
        nodeTypes={{
          skillNode: SkillNode,
        }}
        edgeTypes={{
          skillEdge: SkillEdge,
        }}
        fitView
        proOptions={{ hideAttribution: true }}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      />
    </div>
  );
}

export default SkillTree;
