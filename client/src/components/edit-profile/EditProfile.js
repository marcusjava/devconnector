import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile, saveProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    console.log("Receive props", nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }
  componentDidMount() {
    console.log("component mounted");
    this.props.getCurrentProfile();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createProfile = e => {
    e.preventDefault();
    this.props.saveProfile(this.state, this.props.history);
  };
  render() {
    const { errors } = this.props;
    const { loading } = this.props.profile;
    const options = [
      { value: 0, label: "* Select Professional Status" },
      { value: "Developer", label: "Developer" },
      { value: "Junior Developer", label: "Junior Developer" },
      { value: "Senior Developer", label: "Senior Developer" },
      { value: "Manager", label: "Manager" },
      { value: "Student or Learning", label: "Student or Learning" },
      { value: "Instructor", label: "Instructor" },
      { value: "Intern", label: "Intern" },
      { value: "Other", label: "Other" }
    ];
    let socialInputs;
    if (this.state.displaySocialInputs) {
      socialInputs = <div />;
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">Update your informations</p>
              {loading ? (
                <Spinner />
              ) : (
                <div>
                  <small className="d-block pb-3">* = required field</small>
                  <form onSubmit={this.createProfile}>
                    <div className="form-group">
                      <TextFieldGroup
                        name="handle"
                        type="text"
                        placeholder="*Profile Handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL. Your full name,company name, nickname, etc"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <SelectListGroup
                        name="status"
                        options={options}
                        value={this.state.status}
                        onChange={this.onChange}
                        error={errors.status}
                        info="Give us an ideia of where you are at in your carreer"
                      />
                    </div>
                    <div className="form-group">
                      <TextFieldGroup
                        type="text"
                        placeholder="Company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        name="company"
                        info="Could be your own company or one you work for"
                      />
                    </div>
                    <div className="form-group">
                      <TextFieldGroup
                        type="text"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        placeholder="Website"
                        name="website"
                        info="Could be your own or a company website"
                      />
                    </div>
                    <div className="form-group">
                      <TextFieldGroup
                        type="text"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        name="location"
                        info="City & state suggested (eg. Boston, MA)"
                      />
                    </div>
                    <div className="form-group">
                      <TextFieldGroup
                        type="text"
                        placeholder="Location"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        name="skills"
                        info="Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)"
                      />
                    </div>
                    <div className="form-group">
                      <TextFieldGroup
                        type="text"
                        placeholder="GitHub username"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        name="githubusername"
                        info="If you want your latest repos and a Github link, include your username"
                      />
                    </div>
                    <div className="form-group">
                      <TextAreaFieldGroup
                        name="bio"
                        placeholder="A short bio of yourself"
                        value={this.state.bio}
                        info=" Tell us a little about yourself"
                        onChange={this.onChange}
                        error={errors.bio}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="input-group mb-3">
                        <InputGroup
                          type="text"
                          icon="fab fa-twitter"
                          placeholder="Twitter Profile URL"
                          name="twitter"
                          onChange={this.onChange}
                          value={this.state.twitter}
                          error={errors.twitter}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <InputGroup
                          type="text"
                          icon="fab fa-facebook"
                          placeholder="Facebook Page URL"
                          name="facebook"
                          onChange={this.onChange}
                          value={this.state.facebook}
                          error={errors.facebook}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <InputGroup
                          type="text"
                          icon="fab fa-linkedin"
                          placeholder="Linkedin Profile URL"
                          name="linkedin"
                          onChange={this.onChange}
                          value={this.state.linkedin}
                          error={errors.linkedin}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <InputGroup
                          type="text"
                          icon="fab fa-youtube"
                          placeholder="YouTube Channel URL"
                          name="youtube"
                          onChange={this.onChange}
                          value={this.state.youtube}
                          error={errors.youtube}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <InputGroup
                          type="text"
                          icon="fab fa-instagram"
                          placeholder="Instagram Page URL"
                          name="instagram"
                          onChange={this.onChange}
                          value={this.state.instagram}
                          error={errors.instagram}
                        />
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
  loading: state.loading
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, saveProfile }
)(withRouter(EditProfile));
