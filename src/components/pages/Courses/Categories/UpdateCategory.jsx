import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../ApiService";
import Switch from "react-switch";
import Select from "react-select";
import { message, Spin } from "antd";

const UpdateCategory = () => {
  const { courseId, categoryId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_id: parseInt(courseId, 10),
    title: { ar: "" },
    description: { ar: "" },
    is_active: true,
    teachers_roles: []
  });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state for data fetching
  const [submitting, setSubmitting] = useState(false); // Added loading state for form submission

  useEffect(() => {
    fetchCategoryData();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get("/v1/admin/roles/teachers-roles");
      const rolesData = response.data.data.items.map(role => ({ value: role.id, label: role.translations.readable_name.ar }));
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axiosInstance.get(`v1/admin/courses/content-categories/${categoryId}`);
      const data = response.data.data;
      setFormData({
        course_id: data.course_id,
        title: data.translations.title,
        description: data.translations.description,
        is_active: data.is_active,
        teachers_roles: data.teachers_roles.map(role => role.id)
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

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

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({ ...formData, teachers_roles: selectedRoles });
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, is_active: !formData.is_active });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.ar) newErrors.title_ar = "العنوان بالعربية مطلوب";
    if (!formData.description.ar) newErrors.description_ar = "الوصف بالعربية مطلوب";
    if (!formData.teachers_roles.length) newErrors.teachers_roles = "الأدوار مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true); // Set submitting to true when form submission starts
    try {
      await axiosInstance.put(`v1/admin/courses/content-categories/${categoryId}`, formData);
      message.success("تم تحديث الفئة بنجاح");
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
        console.error("Error updating category:", error);
      }
    } finally {
      setSubmitting(false); // Set submitting to false after form submission completes
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
                    <h3 className="page-title">تعديل فئة</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={`/courses/${courseId}/categories`}>الفئات</Link>
                      </li>
                      <li className="breadcrumb-item active">تعديل فئة</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card comman-shadow">
                  <div className="card-body">
                    {loading ? ( // Show loading spinner if loading is true
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                        <Spin size="large" />
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12">
                            <h5 className="form-title admin-info">
                              معلومات الفئة{" "}
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
                          <div className="col-12">
                            <div className="form-group">
                              <label>
                                الأدوار <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                value={roles.filter(role => formData.teachers_roles.includes(role.value))}
                                options={roles}
                                onChange={handleRoleChange}
                                placeholder="اختر الأدوار"
                                classNamePrefix="select"
                              />
                              {errors.teachers_roles && (
                                <div className="text-danger">{errors.teachers_roles}</div>
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
                                {submitting ? "انتظر..." : "تحديث"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
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

export default UpdateCategory;
