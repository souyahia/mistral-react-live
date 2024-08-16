import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CodeVersion } from '@/lib/features/code/code';

export interface CodeState {
  code: string;
  currentVersion: number | null;
  isEdited: boolean;
  versions: CodeVersion[];
}

const initialState: CodeState = {
  code: '',
  currentVersion: null,
  isEdited: false,
  versions: [],
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    editCurrentCodeVersion: (state, action: PayloadAction<string>) => {
      if (state.currentVersion !== null) {
        state.code = action.payload;
        state.isEdited = state.versions[state.currentVersion].code !== action.payload;
      }
    },
    pushCodeVersion: (state, action: PayloadAction<string>) => {
      const id = state.versions.length;
      const code = action.payload;
      state.versions.push({ id, code });
      state.code = code;
      state.currentVersion = id;
      state.isEdited = false;
    },
    loadVersion: (state, action: PayloadAction<number>) => {
      state.code = state.versions[action.payload].code;
      state.currentVersion = action.payload;
      state.isEdited = false;
    },
    clearCodeVersions: (state) => {
      state.code = '';
      state.currentVersion = null;
      state.isEdited = false;
      state.versions = [];
    },
  },
});

export const { editCurrentCodeVersion, pushCodeVersion, loadVersion, clearCodeVersions } =
  codeSlice.actions;

export default codeSlice.reducer;
