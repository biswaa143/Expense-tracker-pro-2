import axios from "axios";
import { authActions } from "./auth-slice";
import { modalActions } from "./modal-slice";
import { getData } from "./expense-thunks";

const authenticateUser = (user) => {
  return async (dispatch) => {
    let url = "";
    let requestBody = {};

    if (user.lastName && user.firstName) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";
    }
    requestBody = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    try {
      const res = await axios.post(url, requestBody);
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Authentication Successful",
          severity: "success",
        })
      );
      dispatch(
        authActions.login({
          email: res.data.email,
          idToken: res.data.idToken,
        })
      );
      dispatch(getData());
    } catch (error) {
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Authentication Failed!",
          severity: "error",
        })
      );
    }
  };
};

export const verifyMail = () => {
  return async (dispatch) => {
    let idToken = localStorage.getItem("idToken");

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";

    try {
      await axios.post(url, { requestType: "VERIFY_EMAIL", idToken });
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Verification mail sent successfully",
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Something went wrong!",
          severity: "error",
        })
      );
    }
  };
};

export const passwordReset = (email) => {
  return async (dispatch) => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";

    try {
      await axios.post(url, { requestType: "PASSWORD_RESET", email });
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Password reset mail sent successfully",
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        modalActions.popUpAlertHandler({
          message: "Something went wrong!",
          severity: "error",
        })
      );
    }
  };
};

export const loginOnLoad = () => {
  return (dispatch) => {
    let email = localStorage.getItem("email");
    let idToken = localStorage.getItem("idToken");

    if (email && idToken) {
      dispatch(
        authActions.login({
          email,
          idToken,
        })
      );
    }
  };
};

export default authenticateUser;
