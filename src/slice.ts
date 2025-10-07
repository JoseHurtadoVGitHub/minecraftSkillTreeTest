import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlatSkillTree } from './Types/FlatSkillTree';
import { Node, Edge } from './Types/ReactFlow';
import { normalizeSkillTree } from './Utils/normalizeSkillTree';
import { fetchBaseSkillTree } from './Adapters/captaSkillTreeAdapter';

const MINECRAFT_STORAGE_KEY = 'Minecraft-Skill-Tree';

export interface SliceState {
  skillTree: Record<string, FlatSkillTree>;
  skillNodes: Node[];
  skillEdges: Edge[];
}

const initialState: SliceState = {
  skillTree: {},
  skillNodes: [],
  skillEdges: [],
};

export const fetchMinecraftSkillTree = createAsyncThunk(
  `${MINECRAFT_STORAGE_KEY}/fetchMinecraftSkillTree`,
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await fetchBaseSkillTree();
      const { flatTree, nodes, edges } = normalizeSkillTree(data);

      return fulfillWithValue({
        skillTree: flatTree,
        skillNodes: nodes,
        skillEdges: edges,
      });
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch Minecraft skill tree');
    }
  },
);

export const slice = createSlice({
  name: MINECRAFT_STORAGE_KEY,
  initialState,
  reducers: {
    markSkillAsCompleted(state, action: PayloadAction<string>) {
      const skillId = action.payload;
      const skill = state.skillTree[skillId];
      if (skill) skill.isCompleted = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMinecraftSkillTree.fulfilled, (state, action) => {
      const { skillTree, skillEdges, skillNodes } = action.payload;
      state.skillTree = skillTree;
      state.skillEdges = skillEdges;
      state.skillNodes = skillNodes;
    });
  },
});

export const Actions = { ...slice.actions };
export default slice.reducer;
