import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../../ApiService";
import Switch from "react-switch";
import { message } from "antd";

const AddLesson = () => {
  const navigate = useNavigate();
  const { courseId, categoryId } = useParams();
  const [formData, setFormData] = useState({
    title: { ar: "" },
    description: { ar: "" },
    is_active: true
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("title.") || name.startsWith("description.")) {
      const key = name.split(".")[0];
      const lang = name.split(".")[1];
      setFormData({ ...formData, [key]: { ...formData[key], [lang]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, is_active: !formData.is_active });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.ar) newErrors.title_ar = "العنوان بالعربية مطلوب";
    if (!formData.description.ar) newErrors.description_ar = "الوصف بالعربية مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axiosInstance.post(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons`, formData);
      message.success("تم إضافة الدرس بنجاح");
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const newErrors = {};
        for (const key in serverErrors) {
          newErrors[key] = serverErrors[key][0];
        }
        setErrors(newErrors);
      } else {
        console.error("Error creating lesson:", error);
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
                    <h3 className="page-title">إضافة درس</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={`/courses/${courseId}/categories/${categoryId}/lessons`}>الدروس</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة درس</li>
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
                            معلومات الدرس{" "}
                            <span>
                              <Link to="#">
                                <FeatherIcon icon="more-vertical" />
                              </Link>
                            </span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              العنوان بالعربية <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="title.ar"
                              placeholder="أدخل العنوان بالعربية"
                              value={formData.title.ar}
                              onChange={handleInputChange}
                            />
                            {errors.title_ar && (
                              <div className="text-danger">{errors.title_ar}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              الوصف بالعربية <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="description.ar"
                              placeholder="أدخل الوصف بالعربية"
                              value={formData.description.ar}
                              onChange={handleInputChange}
                            />
                            {errors.description_ar && (
                              <div className="text-danger">{errors.description_ar}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group d-flex align-items-center">
                            <label className="m-3">نشط</label>
                            <Switch
                              checked={formData.is_active}
                              onChange={handleToggleChange}
                              offColor="#d1d1d1"
                              onColor="#007bff"
                              height={20}
                              width={40}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                              إضافة
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default AddLesson;