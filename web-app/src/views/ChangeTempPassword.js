
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import './Login.css';

class ChangeTempPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      password: '',
      confirmedPassword: ''
    };
  }

  componentDidMount() {
    const thisNode = ReactDOM.findDOMNode(this);
    if (thisNode) {
      const { ownerDocument } = thisNode;
      ownerDocument.addEventListener("keydown", this.onKeyDown);
    }
  }

  componentWillUnmount() {
    const thisNode = ReactDOM.findDOMNode(this);
    if (thisNode) {
      const { ownerDocument } = thisNode;
      ownerDocument.removeEventListener('keydown', this.onKeyDown);
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.changePassword();
    }
  }

  changePassword = () => {
    const {
      password,
      confirmedPassword
    } = this.state;

    if (password && confirmedPassword
        && password === confirmedPassword) {
      if (password.length < 8) {
        this.setState({
          errorMsg: `Use 8 or more characters.`
        });
        return;
      }

      const user = {
        password: password
      }

      axios.post('/auth/login/change-password', user)
        .then(res => {
          const loginResponse = res.data || {};
          if (loginResponse.error) {
            this.setState({
              errorMsg: loginResponse.error
            });
          } else {
            this.props.history.push('/workspace/report');
          }
        });
    } else {
      this.setState({
        errorMsg: `Those passwords didn't match.`
      });
    }
  }

  render() {
    const titleStyle = {
      fontSize: '22px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '15px'
    }

    const tipStyle = {
      fontWeight: 'bold',
      marginBottom: '5px',
      fontSize: '15px'
    }

    return (
      <div className="login-view">
        <div className="login-panel">
          <div style={titleStyle}>Change password</div>
          <div className="login-error-msg">{this.state.errorMsg}</div>
          <div className="login-panel-body">
            <div className="form-panel">
              <div style={tipStyle}>* Use 8 or more characters</div>
              <label>New password</label>
              <input 
                className="form-input"
                type="password" 
                name="password" 
                value={this.state.username}
                onChange={this.handleInputChange} />
              <label>Confirm password</label>
              <input 
                className="form-input"
                type="password" 
                name="confirmedPassword" 
                value={this.state.confirmedPassword}
                onChange={this.handleInputChange} />
              <button className="button login-button button-green" onClick={this.changePassword}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangeTempPassword);