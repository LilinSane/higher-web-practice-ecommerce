import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    userId: string | null;
}

const initialState: UserState = {
    userId: localStorage.getItem('userId'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
            localStorage.setItem('userId', action.payload);
        },
        clearProfile: (state) => {
            state.userId = null;
            localStorage.removeItem('userId');
        }
    }
});

export const { setUserId, clearProfile } = userSlice.actions;
export default userSlice.reducer;