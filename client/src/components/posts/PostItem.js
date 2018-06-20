import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { Link } from "react-router-dom";

class PostItem extends Component {
  onLikeClick = id => {
    this.props.addLike(id);
  };
  //
  onUnlikeClick = id => {
    this.props.removeLike(id);
  };
  //
  finUserLikes = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions && (
              <div>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.finUserLikes(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onUnlikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {auth.user.id === post.user && (
                  <button
                    type="button"
                    onClick={() => this.props.deletePost(post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  deletePost: PropTypes.func.isRequired
});
export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
