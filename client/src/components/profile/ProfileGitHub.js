import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// Client ID
//     029d7c1d9c5a68604164
// Client Secret
//     6563bdd2d3385341f0200bee14459a20f5e48345

class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "029d7c1d9c5a68604164",
      clientSecret: "6563bdd2d3385341f0200bee14459a20f5e48345",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(resp => resp.json())
      .then(data => console.log(data));
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(resp => resp.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(error => console.log(error));
  }
  render() {
    const { repos } = this.state;
    // const repoItems = repos.map(repo => (
    //   <div key={repo.id} className="card card-body mb-2">
    //     <div className="row">
    //       <div className="col-md-6">
    //         <h4>
    //           <Link to={repo.html_url} className="text-info" target="_blank">
    //             {" "}
    //             {repo.name}
    //           </Link>
    //         </h4>
    //         <p>{repo.description}</p>
    //       </div>
    //       <div className="col-md-6">
    //         <span className="badge badge-info mr-1">
    //           Stars: {repo.startgazzers_count}
    //         </span>
    //         <span className="badge badge-secondary mr-1">
    //           Watchers: {repo.watchers_count}
    //         </span>
    //         <span className="badge badge-success">
    //           Forks: {repo.forks_count}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
      </div>
    );
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGitHub;
