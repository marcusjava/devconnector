import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  CLEAR_ERRORS
} from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
