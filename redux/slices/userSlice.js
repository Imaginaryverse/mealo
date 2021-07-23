import { createSlice } from '@reduxjs/toolkit';

export const initState = {
  loggedIn: false,
  user: null,
  mealPlan: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    CreateUser: (state, action) => {
      state.user = action.payload;
    },
    LoginUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    LogoutUser: (state, action) => {
      state.user = null;
      state.loggedIn = false;
      state.mealPlan = null;
    },
    UpdateMealPlan: (state, action) => {
      state.mealPlan = action.payload;
    },
    UpdateUserProfile: (state, action) => {
      state.user.profile = action.payload;
      state.loggedIn = true;
    },
  },
});

export const {
  CreateUser,
  LoginUser,
  LogoutUser,
  UpdateMealPlan,
  UpdateUserProfile,
} = userSlice.actions;

export default userSlice.reducer;
