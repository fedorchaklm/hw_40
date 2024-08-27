import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {notes: Array<string> } = {notes: []};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<string>) {
            state.notes.unshift(action.payload);
        },
        clearNotes: (state) => {
            state.notes = [];
        }
    }
});

export const {addNote, clearNotes} = notesSlice.actions;
export default notesSlice;
