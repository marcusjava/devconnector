import React, { Component } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

class PostList extends Component {
  render() {
    const { posts } = this.props;
    const postList = posts.map(post => <PostItem key={post._id} post={post} />);
    return <div className="posts">{postList}</div>;
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
