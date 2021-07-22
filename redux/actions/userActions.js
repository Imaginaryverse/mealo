export const CreateUser = data => dispatch => {
  dispatch({
    type: 'CREATE_USER',
    payload: data,
  });
};

export const LoginUser = data => dispatch => {
  dispatch({
    type: 'LOGIN_USER',
    payload: data,
  });
};

export const LogoutUser = data => dispatch => {
  dispatch({
    type: 'LOGOUT_USER',
    payload: data,
  });
};

export const CreateMealPlan = data => dispatch => {
  dispatch({
    type: 'CREATE_MEALPLAN',
    payload: data,
  });
};

export const GetMealPlan = data => dispatch => {
  dispatch({
    type: 'GET_MEALPLAN',
    payload: data,
  });
};

export const UpdateMealPlan = data => dispatch => {
  dispatch({
    type: 'UPDATE_MEALPLAN',
    payload: data,
  });
};
