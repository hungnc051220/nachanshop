import * as actionType from "../constants/auth";
import * as api from "../../api";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: actionType.LOGIN, data });

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: actionType.LOGIN, data });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (navigate) => (dispatch) => {
  dispatch({ type: actionType.LOGOUT });
  navigate("/");
};
