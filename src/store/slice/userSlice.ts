// app/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    fullname: string;
    email: string;
}

const initialState: UserState = {
    fullname: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
        },
        logoutUser: (state) => {
            state.fullname = '';
            state.email = '';
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
