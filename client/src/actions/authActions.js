import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import decodeJWT from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(user => {
      history.push("/login");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Login User
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(user => {
      //  Save in localstorage
      const { token } = user.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      // DEcode token to get user date
      const decoded = decodeJWT(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  // remove from localstorage
  localStorage.removeItem("token");
  // remove auth header
  setAuthToken(false);
  // Set current user to {} which will set is Authenticated to false
  dispatch(setCurrentUser({}));
  history.push("/");
};
