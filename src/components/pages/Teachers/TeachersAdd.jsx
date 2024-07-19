import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Switch from "react-switch";
import Select from "react-select";
import { message } from "antd";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    code: "",
    birth_date: "",
    gender: "MALE",
    is_active: true,
    role_id: null,  // Added for role selection
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
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (selectedOption) => {
    setFormData({ ...formData, role_id: selectedOption ? selectedOption.value : null });
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, is_active: !formData.is_active });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "الاسم الأول مطلوب";
    if (!formData.last_name) newErrors.last_name = "اسم العائلة مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.code) newErrors.code = "الكود مطلوب";
    if (!formData.role_id) newErrors.role_id = "الدور مطلوب";  // Added validation for role
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axiosInstance.post("v1/admin/teachers", formData);
      const teacherId = response.data.data.id;

      // Sync role with the teacher
      await axiosInstance.post("/v1/admin/roles/teachers-roles/sync", {
        teacher_id: teacherId,
        role_id: formData.role_id,
      });

      message.success("تم إضافة المدرس بنجاح");
      navigate("/admins/teachers");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const newErrors = {};
        for (const key in serverErrors) {
          newErrors[key] = serverErrors[key][0];
        }
        setErrors(newErrors);
      } else {
        console.error("Error creating teacher:", error);
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
                    <h3 className="page-title">إضافة معلم</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/teachers">المعلمين</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة معلم</li>
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
                            معلومات المعلم{" "}
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
                              الاسم الأول <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="first_name"
                              placeholder="أدخل الاسم الأول"
                              value={formData.first_name}
                              onChange={handleInputChange}
                            />
                            {errors.first_name && (
                              <div className="text-danger">{errors.first_name}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              اسم العائلة <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="last_name"
                              placeholder="أدخل اسم العائلة"
                              value={formData.last_name}
                              onChange={handleInputChange}
                            />
                            {errors.last_name && (
                              <div className="text-danger">{errors.last_name}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              البريد الإلكتروني <span className="text-danger">*</span>
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
                          <div className="form-group">
                            <label>
                              رقم الهاتف <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="phone"
                              placeholder="أدخل رقم الهاتف"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {errors.phone && (
                              <div className="text-danger">{errors.phone}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              الكود <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="code"
                              placeholder="أدخل الكود"
                              value={formData.code}
                              onChange={handleInputChange}
                            />
                            {errors.code && (
                              <div className="text-danger">{errors.code}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>تاريخ الميلاد</label>
                            <input
                              className="form-control"
                              type="date"
                              name="birth_date"
                              placeholder="أدخل تاريخ الميلاد"
                              value={formData.birth_date}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>النوع</label>
                            <select
                              className="form-control"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="MALE">ذكر</option>
                              <option value="FEMALE">أنثى</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>
                              الدور <span className="text-danger">*</span>
                            </label>
                            <Select
                              options={roles}
                              onChange={handleRoleChange}
                              placeholder="اختر الدور"
                              classNamePrefix="select"
                            />
                            {errors.role_id && (
                              <div className="text-danger">{errors.role_id}</div>
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

export default AddTeacher;
