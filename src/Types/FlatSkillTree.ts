import { BaseSkillTree } from './BaseSkillTree';

export type FlatSkillTree = {
  id: string;
  children: string[];
  path: string[];
  isCompleted?: boolean;
} & Omit<BaseSkillTree, 'children'>;
