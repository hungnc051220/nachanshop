import * as actionTypes from "../constants/user";

const users = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS:
      return action.payload;

    case actionTypes.ADD_USER:
      return [...state, action.payload];
      
    case actionTypes.UPDATE_USER:
      return state;

    case actionTypes.DELETE_USER:
      return state.filter((user) => user._id !== action.payload);

    default:
      return state;
  }
};

export default users;
