import * as actionTypes from "../constants/cart";
import toast from "react-hot-toast";

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

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        toast.success("Đã thêm vào giỏ hàng", { id: "addToCart" });
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id
              ? { ...x, quantity: x.quantity + item.quantity }
              : x
          ),
        };
      } else {
        toast.success("Đã thêm vào giỏ hàng", { id: "addToCart" });
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.UPDATE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === action.payload._id
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
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
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
