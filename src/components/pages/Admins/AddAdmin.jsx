import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import ErrorModal from "../../CustomComponents/ErrorModal";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [genericError, setGenericError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.name) newErrors.name = "الاسم مطلوب";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "تأكيد كلمة المرور لا يتطابق";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axiosInstance.post("v1/admins/register", formData);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const serverErrors = error.response.data.errors;
        const newErrors = {};
        for (const key in serverErrors) {
          newErrors[key] = serverErrors[key][0]; // Assuming the server returns an array of error messages for each field
        }
        setErrors(newErrors);
      } else {
        console.error("Error creating admin:", error);
        setGenericError("حدث خطأ أثناء إنشاء المشرف. حاول مرة أخرى.");
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">إضافة مشرف</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/admins">المشرفين</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة مشرف</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card comman-shadow">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <h5 className="form-title admin-info">
                            معلومات المشرف{" "}
                            <span>
                              <Link to="#">
                                <FeatherIcon icon="more-vertical" />
                              </Link>
                            </span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group local-forms">
                            <label>
                              الاسم <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              placeholder="أدخل الاسم"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            {errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group local-forms">
                            <label>
                              البريد الإلكتروني{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="أدخل البريد الإلكتروني"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group local-forms">
                            <label>
                              كلمة المرور <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              placeholder="أدخل كلمة المرور"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            {errors.password && (
                              <div className="text-danger">{errors.password}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group local-forms">
                            <label>
                              تأكيد كلمة المرور{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name="password_confirmation"
                              placeholder="أدخل تأكيد كلمة المرور"
                              value={formData.password_confirmation}
                              onChange={handleInputChange}
                            />
                            {errors.password_confirmation && (
                              <div className="text-danger">
                                {errors.password_confirmation}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="admin-submit">
                            <button type="submit" className="btn btn-primary">
                              إضافة
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    {genericError && (
                      <ErrorModal
                        id="error-modal"
                        errorMessage={genericError}
                        onClose={() => setGenericError("")}
                      />
                    )}
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

export default AddAdmin;
