import React, { useState, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { adminlogin } from "../../imagepath";
import { Link, useHistory } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import { adminLogin, fetchAdminData} from "../../../ApiService"; // Import the API service

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("صباح الخير مشرف");
    } else {
      setGreeting("مساء الخير مشرف");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(email, password);
      // Check response status and handle accordingly
      if (response.status === 200) {
          console.log( response.data);
          let data = response.data.data;
          localStorage.setItem('token', data.token);
          console.log(localStorage.getItem('token'));

          // call admin me endpoint
          const adminData = await fetchAdminData(localStorage.getItem('token'));
          localStorage.setItem('me', JSON.stringify(adminData));
          console.log(localStorage.getItem('me'));

          console.log('Login successful:', adminData);

        // Handle success (e.g., save token, redirect to dashboard)
        // history.push('/admindashboard'); // Replace with your admin dashboard route
      } else {
        setError('خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError('خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    }
  }

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={adminlogin} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>{greeting}</h1>
                  <h2>تسجيل الدخول</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>
                        البريد الالكتروني <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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
                    <Link to="/login" className="btn btn-secondary btn-block">
                      تسجيل الدخول كمدرس
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

export default AdminLogin;
