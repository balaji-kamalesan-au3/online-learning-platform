import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Axios from "axios";

class AdminDashboard extends React.Component {
  requestClass = (requestedClass) => {
    console.log(requestedClass);
    const body = {
      id: this.props.auth.user.id,
      subject: requestedClass.subject,
      time: requestedClass.time,
    };
    console.log(body);
    Axios.post("/api/users/requestClass", body).then(alert("Class Requested"));
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <h4>Classes Registered</h4>
            {this.props.auth.classes_taken &&
              this.props.auth.classes_taken.map((current_class) => {
                return (
                  <div className="col s12 m6">
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">{current_class.subject}</span>
                        <p>Time : {current_class.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="row">
            <h4> Requested Classes</h4>
            {this.props.auth.requested_classes &&
              this.props.auth.requested_classes.map((current_class) => {
                return (
                  <div className="col s12 m6">
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">{current_class.subject}</span>
                        <p>Time : {current_class.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="row">
            <h4>Available Classes</h4>
            {this.props.auth.available_classes &&
              this.props.auth.available_classes.map((current_class) => {
                return (
                  <div className="col s12 m6">
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">{current_class.subject}</span>
                        <p>Time : {current_class.time}</p>
                      </div>
                      <div className="card-action">
                        <button
                          className="btn-floating btn-large waves-effect waves-light"
                          onClick={() => this.requestClass(current_class)}
                        >
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  logoutUser,
})(AdminDashboard);
