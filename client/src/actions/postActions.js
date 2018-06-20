import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  CLEAR_ERRORS,
  POST_LOADING
} from "../actions/types";

const url = "http://localhost:5000/api";

const setPostLoading = () => ({ type: POST_LOADING });
const clearErrors = () => ({ type: CLEAR_ERRORS });

// ADD POST
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${url}/posts`, postData)
    .then(resp => {
      dispatch({ type: ADD_POST, payload: resp.data });
      dispatch(getPosts());
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// ADD COMMENT
export const addComment = (postId, comment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${url}/posts/comment/${postId}`, comment)
    .then(resp => {
      dispatch({ type: GET_POST, payload: resp.data });
      dispatch(getPosts());
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// DELETE COMMENT
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .delete(`${url}/posts/${postId}/comment/${commentId}`)
    .then(resp => {
      dispatch({ type: GET_POST, payload: resp.data });
      dispatch(getPosts());
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// GET POST
export const getPost = postId => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get(`${url}/posts/${postId}`)
    .then(resp => {
      dispatch({ type: GET_POST, payload: resp.data });
    })
    .catch(error => dispatch({ type: GET_POST, payload: null }));
};

// Like
export const addLike = postId => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .post(`${url}/posts/likes/${postId}`)
    .then(resp => {
      dispatch(getPosts());
    })
    .catch(error => dispatch(getPosts()));
};

// Unlike
export const removeLike = postId => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .post(`${url}/posts/unlikes/${postId}`)
    .then(resp => {
      dispatch(getPosts());
    })
    .catch(error => dispatch(getPosts()));
};

export const deletePost = postId => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .delete(`${url}/posts/${postId}`)
    .then(resp => {
      dispatch(getPosts());
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// GET POSTS
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`${url}/posts`)
    .then(resp => dispatch({ type: GET_POSTS, payload: resp.data }))
    .catch(error => dispatch({ type: GET_POSTS, payload: null }));
};
