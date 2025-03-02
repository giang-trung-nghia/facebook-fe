import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";
import { IChat } from "../../models/chat/chat.model";

const initialState: IChat[] = [];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChatGlobal: (state, action: PayloadAction<IChat>) => {
      state.push(action.payload);
    },
    closeChatGlobal: (state, action: PayloadAction<string>) => {
      return state.filter((c) => c.id !== action.payload);
    },
    clearChatGlobal: () => {
      return []
    },
  },
});

export const selectChats = (state: AppState) => state.chat;
export const { openChatGlobal, closeChatGlobal, clearChatGlobal } = chatSlice.actions;
export default chatSlice.reducer;
