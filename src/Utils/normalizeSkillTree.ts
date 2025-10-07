import { BaseSkillTree } from '../Types/BaseSkillTree';
import { FlatSkillTree } from '../Types/FlatSkillTree';
import { flattenTree } from './flattenTree';
import { getLayoutedElements } from './getLayoutedElements';

export function normalizeSkillTree(data: BaseSkillTree) {
  const flatTree: Record<string, FlatSkillTree> = {};
  const idRoot = flattenTree(flatTree, data);

  const { nodes, edges } = getLayoutedElements({ idRoot, skills: flatTree });

  return { flatTree, nodes, edges };
}
