import axios from 'axios';
import { BaseSkillTree } from '../Types/BaseSkillTree';
import localBaseSkillTree from '../assets/BaseSkillTree.json';

export async function fetchBaseSkillTree() {
  let data: BaseSkillTree;
  try {
    const MINECRAFT_SKILL_TREE_URL = import.meta.env.VITE_MINECRAFT_SKILL_TREE_URL;
    const { data: response } = await axios.get<BaseSkillTree>(MINECRAFT_SKILL_TREE_URL);
    data = response;
  } catch (error) {
    console.error(error);
    data = localBaseSkillTree as BaseSkillTree;
  }
  return data;
}
