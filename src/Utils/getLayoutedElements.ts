import { FlatSkillTree } from '../Types/FlatSkillTree';
import dagre from '@dagrejs/dagre';
import { EDGE_TYPE, NODE_TYPE, NODES_HEIGHT, NODES_WIDTH, Edge, Node } from '../Types/ReactFlow';
import { Position } from '@xyflow/react';

interface GetLayoutedElementsProps {
  idRoot: string;
  skills: Record<string, FlatSkillTree>;
}

const buildDagreGraph = (
  idRoot: string,
  skills: Record<string, FlatSkillTree>,
  dagreGraph: dagre.graphlib.Graph<unknown>,
) => {
  const skill = skills[idRoot];
  if (skill) {
    dagreGraph.setNode(skill.id, { width: NODES_WIDTH, height: NODES_HEIGHT });
    skill.children.forEach((id) => {
      buildDagreGraph(id, skills, dagreGraph);
      dagreGraph.setEdge(idRoot, id);
    });
  }
};

export const getLayoutedElements = ({ idRoot, skills }: GetLayoutedElementsProps) => {
  // Horizontal:  'LR' | Vertical: 'TB'
  const dagreGraph = new dagre.graphlib.Graph()
    .setDefaultEdgeLabel(() => ({}))
    .setGraph({ rankdir: 'LR' });

  buildDagreGraph(idRoot, skills, dagreGraph);

  dagre.layout(dagreGraph);

  const { nodes, edges } = Object.values(skills).reduce(
    (acc, skill) => {
      const node = dagreGraph.node(skill.id);

      acc.nodes.push({
        id: skill.id,
        type: NODE_TYPE,
        data: {
          skillNode: skill,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        position: {
          x: node.x - NODES_WIDTH / 2,
          y: node.y - NODES_HEIGHT / 2,
        },
      });

      for (const id of skill.children) {
        acc.edges.push({
          id: `${skill.id}-${id}-edge`,
          source: skill.id,
          target: id,
          type: EDGE_TYPE,
        });
      }

      return acc;
    },
    { nodes: Array<Node>(), edges: Array<Edge>() },
  );

  return { nodes, edges };
};
