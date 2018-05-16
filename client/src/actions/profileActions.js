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

export const saveProfile = (profile, history) => dispatch => {
  dispatch(setProfileLoading());
  const data = {
    handle: profile.handle,
    company: profile.company,
    website: profile.website,
    location: profile.location,
    status: profile.status,
    skills: profile.skills,
    githubusername: profile.githubusername,
    bio: profile.bio,
    twitter: profile.twitter,
    facebook: profile.facebook,
    linkedin: profile.linkedin,
    instagram: profile.instagram,
    status: "Active"
  };
  axios
    .post("http://localhost:5000/api/profile", data)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
