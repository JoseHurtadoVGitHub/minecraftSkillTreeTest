import { BaseSkillTree } from '../Types/BaseSkillTree';
import { FlatSkillTree } from '../Types/FlatSkillTree';
import { v4 as uuidv4 } from 'uuid';

export function flattenTree(
  flatTree: Record<string, FlatSkillTree>,
  tree: BaseSkillTree,
  path: string[] = [],
): string {
  const id: string = uuidv4();

  flatTree[id] = {
    id: id,
    ...tree,
    children: tree.children.map((child): string => flattenTree(flatTree, child, [...path, id])),
    path,
  };

  return id;
}
