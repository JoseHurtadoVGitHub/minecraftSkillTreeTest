import axios from 'axios';
import { BaseSkillTree } from '../Types/BaseSkillTree';

export async function fetchBaseSkillTree() {
  let data: BaseSkillTree;
  try {
    const MINECRAFT_SKILL_TREE_URL = import.meta.env.VITE_MINECRAFT_SKILL_TREE_URL;
    const { data: response } = await axios.get<BaseSkillTree>(MINECRAFT_SKILL_TREE_URL);
    data = response;
  } catch (error) {
    console.error(error);
    const { data: response } = await axios.get<BaseSkillTree>('BaseSkillTree.json');
    data = response;
  }
  return data;
}
