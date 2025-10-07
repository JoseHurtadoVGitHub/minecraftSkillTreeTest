import { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';
import { FlatSkillTree } from './FlatSkillTree';

export const NODES_WIDTH = 50;
export const NODES_HEIGHT = 50;
export const EDGE_TYPE = 'skillEdge';
export const NODE_TYPE = 'skillNode';

export type Edge = ReactFlowEdge<
  {
    type: 'skillEdge';
  },
  'skillEdge'
>;

export type Node = ReactFlowNode<
  {
    skillNode: FlatSkillTree;
  },
  'skillNode'
>;
