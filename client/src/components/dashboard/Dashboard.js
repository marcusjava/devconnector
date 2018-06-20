import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  // Carregar o profile ao exibir a pagina
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete = e => {
    console.log(e);
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      this.props.deleteAccount(this.props.auth.user, this.props.history);
    }
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let DashboardContent;

    if (profile === null || loading) {
      DashboardContent = <Spinner />;
    } else {
      // check if user has profile
      if (Object.keys(profile).length > 0) {
        DashboardContent = (
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  <p className="lead text-muted text-info">
                    <Link
                      className="text-info"
                      to="{`/profile/${profile.handle}`}"
                    >
                      Bem vindo, {user.name}
                    </Link>
                  </p>
                  <ProfileActions />
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />

                  <div style={{ marginBottom: "60px" }}>
                    <button onClick={this.onDelete} className="btn btn-danger">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // user has logged but has no profile
        DashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You not have profile yet please add some info</p>
            <Link to="/createprofile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{DashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
