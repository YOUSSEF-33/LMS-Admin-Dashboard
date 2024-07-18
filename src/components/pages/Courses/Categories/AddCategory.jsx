import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../ApiService";
import Switch from "react-switch";
import Select from "react-select";
import { message } from "antd";

const AddCategory = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    course_id: parseInt(courseId, 10),
    title: { ar: "" },
    description: { ar: "" },
    is_active: true,
    teachers_roles: []
  });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
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
    try {
      await axiosInstance.post("v1/admin/courses/content-categories", formData);
      message.success("تم إضافة الفئة بنجاح");
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
        console.error("Error creating category:", error);
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
                    <h3 className="page-title">إضافة فئة</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={`/courses/${courseId}/categories`}>الفئات</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة فئة</li>
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

export default AddCategory;
