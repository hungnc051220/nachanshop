import * as api from "../../api";
import * as actionTypes from "../constants/user";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: actionTypes.FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: actionTypes.DELETE_USER, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

