import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";

interface IChat {
    id: string,
    toUserId: string,
    updatedAt: Date
}


const initialState: IChat[] =  []

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChat: (state, action: PayloadAction<IChat>) => {
            state.push(action.payload)
        },
        close: (state, action: PayloadAction<IChat>) => {
            state.filter(c => c.id != action.payload.id)
        },
    }
})

export const selectChats = (state: AppState) => state
export const { openChat } = chatSlice.actions
export default chatSlice.reducer;