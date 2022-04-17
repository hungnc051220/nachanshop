import * as api from "../../api";
import * as actionTypes from "../constants/product";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();

    dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsBySearch = (type) => async (dispatch) => {
  try {
    const { data } = await api.fetchProductsBySearch(type);

    dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(product);

    dispatch({ type: actionTypes.ADD_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);

    dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);

    dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
