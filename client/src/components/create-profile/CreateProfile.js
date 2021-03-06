import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile, saveProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
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
      socialInputs = (
        <div>
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
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
  loading: state.loading
});
export default connect(mapStateToProps, { getCurrentProfile, saveProfile })(
  withRouter(CreateProfile)
);
