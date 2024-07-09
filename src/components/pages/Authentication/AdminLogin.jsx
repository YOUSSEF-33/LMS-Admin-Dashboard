import React, { useState, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { adminlogin } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import axiosInstance, { adminLogin, fetchAdminData } from "../../../ApiService";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminInfo, setCredentials, setRole } from "./authSlice";
import { getCanVGrowWithinCell } from "@fullcalendar/core/internal";
import { message } from "antd";

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setLoading(true);
    setError(null);
    try {
      //const response = await adminLogin(email, password);
      const response = await axiosInstance.post('v1/admins/login', { email, password })
        const data = response.data.data;
        const token = data.token;
        if(token){
          const adminData = await fetchAdminData(token);
          const userData = { adminData, data: response.data.data };
          dispatch(setCredentials(userData));
          dispatch(setRole('admin'));
          message.success("تم تسجيل دخولك بنجاح")
          navigate('/'); 
        }
      
    } catch (error) {
      console.log(error)
      message.error("فشل في تسجيل الدخول , يرجى المحاولة مره اخرى.")
      setError('خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };


  return (
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
                      required
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
                      required
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
                      disabled={loading}
                    >
                      {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </button>
                  </div>
                </form>
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
  );
};

export default AdminLogin;
