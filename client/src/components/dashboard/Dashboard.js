import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AdminDashboard from "./AdminDashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactiontype: "income",
      transactionCategory: "",
      transactionAmount: 0,
      errors: {},
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log(this.props);
    return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into{" "}
                <span style={{ fontFamily: "monospace" }}>Swiff Learn</span> app
                👏
                <br />
                Here You can find your classes
              </p>
            </h4>

            <AdminDashboard />
            <button
              className="waves-effect waves-light btn"
              onClick={(e) => this.onLogoutClick(e)}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  logoutUser,
})(Dashboard);
