import * as api from "../../api";
import * as actionTypes from "../constants/order";
import * as actionTypesCart from "../constants/cart";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();

    dispatch({ type: actionTypes.FETCH_ORDERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addOrder = (order, navigate) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(order);

    dispatch({ type: actionTypes.ADD_ORDER, payload: data });
    localStorage.removeItem("cart");
    dispatch({ type: actionTypesCart.CLEAR_CART });
    navigate("/success");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    const { data } = await api.updateOrder(id, order);

    dispatch({ type: actionTypes.UPDATE_ORDER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
