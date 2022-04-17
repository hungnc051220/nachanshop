import * as actionTypes from "../constants/cart";

const cartFromLocal = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const CART_INITIAL_STATE = {
  cartItems: cartFromLocal,
};

const cart = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId
              ? { ...x, quantity: x.quantity + item.quantity }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.UPDATE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.productId === action.payload.productId
            ? {
                ...x,
                quantity:
                  action.payload.typeUpdate === null
                    ? Number(action.payload.quantity)
                    : action.payload.typeUpdate === "minus"
                    ? x.quantity - 1
                    : x.quantity + 1,
              }
            : x
        ),
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };

      case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cart;
