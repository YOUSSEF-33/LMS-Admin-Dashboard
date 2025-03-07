import React, { useState } from 'react';
import { login } from '../../imagepath';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'react-feather';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Sign Up</h1>
                  <p className="account-subtitle">
                    Enter details to create your account
                  </p>
                  {/* Form */}
                  <form action="./login">
                    <div className="form-group">
                      <label>
                        Username <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                      <span className="profile-views">
                        <i className="fas fa-user-circle" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        Email <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                      <span className="profile-views">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        Password <span className="login-danger">*</span>
                      </label>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control pass-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff className="react-feather-custom" /> : <Eye className="react-feather-custom" />}
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        Confirm password <span className="login-danger">*</span>
                      </label>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control pass-confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff className="react-feather-custom" /> : <Eye className="react-feather-custom" />}
                      </span>
                    </div>
                    <div className="dont-have">
                      Already Registered? <Link to="/login">Login</Link>
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn btn-primary btn-block" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </div>
                  {/* /Social Login */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
