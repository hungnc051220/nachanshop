import * as actionTypes from "../constants/order";

const orders = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      return action.payload;

    case actionTypes.ADD_ORDER:
      return {...state, currentOrder: action.payload };

    case actionTypes.UPDATE_ORDER:
      return state.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );

    default:
      return state;
  }
};

export default orders;
