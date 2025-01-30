import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    fullname: string;
    email: string;
    isLogin: boolean;
}

const initialState: UserState = {
    fullname: '',
    email: '',
    isLogin: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
            state.isLogin = action.payload.isLogin;
        },
        logoutUser: (state) => {
            state.fullname = '';
            state.email = '';
            state.isLogin = false;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
