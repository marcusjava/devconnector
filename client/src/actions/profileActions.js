import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";
import axios from "axios";

// Register User
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/profile")
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        payload: profile.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
