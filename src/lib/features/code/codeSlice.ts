import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CodeVersion } from '@/lib/features/code/code';

export interface CodeState {
  code: string;
  currentVersion: number | null;
  isEdited: boolean;
  versions: CodeVersion[];
}

const test =
  "import 'ace-builds/src-noconflict/mode-javascript';\n" +
  "import 'ace-builds/src-noconflict/theme-dracula';\n" +
  "import 'ace-builds/src-noconflict/ext-language_tools';\n" +
  "import styles from './codeEditor.module.css';\n" +
  '\n' +
  'function formatVersion(currentVersion, isEdited) {\n' +
  '  if (currentVersion === null) {\n' +
  "    return '';\n" +
  '  }\n' +
  "  return `Version #${currentVersion + 1}${isEdited ? '* (edited)' : ''}`;\n" +
  '}\n' +
  '\n' +
  '\n' +
  'function formatVersion(currentVersion, isEdited) {\n' +
  '  if (currentVersion === null) {\n' +
  "    return '';\n" +
  '  }\n' +
  "  return `Version #${currentVersion + 1}${isEdited ? '* (edited)' : ''}`;\n" +
  '}\n' +
  '\n' +
  '\n' +
  'function formatVersion(currentVersion, isEdited) {\n' +
  '  if (currentVersion === null) {\n' +
  "    return '';\n" +
  '  }\n' +
  "  return `Version #${currentVersion + 1}${isEdited ? '* (edited)' : ''}`;\n" +
  '}\n';

const initialState: CodeState = {
  code: test,
  currentVersion: 0,
  isEdited: false,
  versions: [{ id: 0, code: test }],
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
    clearCodeVersions: (state) => {
      state.code = '';
      state.currentVersion = null;
      state.isEdited = false;
      state.versions = [];
    },
  },
});

export const { editCurrentCodeVersion, pushCodeVersion, clearCodeVersions } = codeSlice.actions;

export default codeSlice.reducer;
