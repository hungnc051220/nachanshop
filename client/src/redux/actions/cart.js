import * as actionTypes from "../constants/cart";
import * as api from "../../api";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await api.getProduct(id);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: { ...data, quantity: quantity },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const updateToCart =
  (id, quantity, typeUpdate) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.UPDATE_TO_CART,
      payload: {
        productId: id,
        quantity,
        typeUpdate,
      },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_CART,
  });
};
