import React, { useState, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { teacherlogin } from "../../imagepath";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [greeting, setGreeting] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("صباح الخير أستاذ");
    } else {
      setGreeting("مساء الخير أستاذ");
    }
  }, []);

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={teacherlogin} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>{greeting}</h1>
                  <p className="account-subtitle">
                    هل أنت مشرف؟ <Link to="/login-admin">تسجيل الدخول كمشرف</Link>
                  </p>
                  <h2>تسجيل الدخول</h2>
                  {/* Form */}
                  <form action="">
                    <div className="form-group">
                      <label>
                        اسم المستخدم <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                      <span className="profile-views">
                        <i className="fas fa-user-circle" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        كلمة المرور <span className="login-danger">*</span>
                      </label>

                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control pass-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeOff className="react-feather-custom" />
                        ) : (
                          <Eye className="react-feather-custom" />
                        )}
                      </span>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        تسجيل الدخول
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">أو</span>
                  </div>
                  <div className="form-group">
                    <Link to="/login-admin" className="btn btn-secondary btn-block">
                      تسجيل الدخول كمشرف
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
