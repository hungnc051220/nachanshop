import * as actionTypes from "../constants/product";

const products = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return action.payload;

    case actionTypes.ADD_PRODUCT:
      return [...state, action.payload];
      
    case actionTypes.UPDATE_PRODUCT:
      return state;

    case actionTypes.DELETE_PRODUCT:
      return state.filter((product) => product._id !== action.payload);

    default:
      return state;
  }
};

export default products;
