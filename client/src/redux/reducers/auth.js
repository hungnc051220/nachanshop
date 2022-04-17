import * as actionType from '../constants/auth';

const authData = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile"))
  : null;

const authInitial = {
  authData: authData,
  loading: "",
  errors: ""
};

const authReducer = (state = authInitial, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;