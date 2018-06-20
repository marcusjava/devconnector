import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";

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

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/profile/all")
    .then(profile => {
      dispatch({
        type: GET_PROFILES,
        payload: profile.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/profile/handle/${handle}`)
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        payload: profile.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const addExperience = (experience, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profile/experience", experience)
    .then(resp => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const deleteExperience = experience => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profile/experience/${experience}`)
    .then(resp => dispatch({ type: GET_PROFILE, payload: resp.data }))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const addEducation = (education, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/profile/education", education)
    .then(resp => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const deleteEducation = education => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profile/education/${education}`)
    .then(resp => dispatch({ type: GET_PROFILE, payload: resp.data }))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const saveProfile = (profile, history) => dispatch => {
  dispatch(setProfileLoading());
  const data = {
    handle: profile.handle,
    company: profile.company,
    website: profile.website,
    location: profile.location,
    // status: profile.status,
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

export const deleteAccount = (user, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .delete("http://localhost:5000/api/profile", user)
    .then(response => {
      console.log(response);
      // dispatch(clearProfile());
      // dispatch(logoutUser(history));
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
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
