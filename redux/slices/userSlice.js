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
      state.loggedIn = true;
    },
    LoginUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    LogoutUser: (state, action) => {
      state.user = null;
      state.loggedIn = false;
    },
    GenerateMealPlan: (state, action) => {
      state.mealPlan = action.payload;
    },
    GetMealPlan: (state, action) => {
      state.mealPlan = action.payload;
    },
    UpdateMealPlan: (state, action) => {
      state.mealPlan = action.payload;
    },
  },
});

export const {
  CreateUser,
  LoginUser,
  LogoutUser,
  GenerateMealPlan,
  GetMealPlan,
  UpdateMealPlan,
} = userSlice.actions;

export default userSlice.reducer;
