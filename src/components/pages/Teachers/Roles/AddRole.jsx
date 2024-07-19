import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../ApiService";
import Switch from "react-switch";
import { message } from "antd";

const AddTeacherRole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    readable_name: { en: "", ar: "" },
    permissions: []
  });
  const [errors, setErrors] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [permissionCategories, setPermissionCategories] = useState({});
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axiosInstance.get("/v1/admin/teachers-permissions");
      if (response.data && response.data.data.items) {
        const categorizedPermissions = categorizePermissions(response.data.data.items);
        setPermissions(response.data.data.items);
        setPermissionCategories(categorizedPermissions);
        setFormData((prevData) => ({
          ...prevData,
          permissions: response?.data?.data?.items?.map(permission => permission.name)
        }));
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const categorizePermissions = (permissions) => {
    const categories = {};
    permissions?.forEach(permission => {
      const parts = permission.name.split('_');
      const category = parts[parts.length - 1];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(permission);
    });
    return categories;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("readable_name.")) {
      const lang = name.split(".")[1];
      setFormData({ ...formData, readable_name: { ...formData.readable_name, [lang]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggleChange = (permissionName) => {
    setFormData((prevData) => {
      const updatedPermissions = prevData.permissions.includes(permissionName)
        ? prevData.permissions.filter(p => p !== permissionName)
        : [...prevData.permissions, permissionName];
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  const handleSelectAllToggle = () => {
    setSelectAll(!selectAll);
    setFormData((prevData) => ({
      ...prevData,
      permissions: !selectAll ? permissions.map(permission => permission.name) : []
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "اسم الدور مطلوب";
    if (!formData.readable_name.en) newErrors.readable_name_en = "الاسم بالإنجليزية مطلوب";
    if (!formData.readable_name.ar) newErrors.readable_name_ar = "الاسم بالعربية مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axiosInstance.post("/v1/admin/roles/teachers-roles", formData);
      message.success("تم اضافة الصلاحية بنجاح")
      navigate("/admins/teachers/roles");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        message.error("حدث خطأ اثناء التسجيل")
        const newErrors = {};
        for (const key in serverErrors) {
          newErrors[key] = serverErrors[key][0]; // Assuming the server returns an array of error messages for each field
        }
        setErrors(newErrors);
      } else {
        message.error("حدث خطأ اثناء التسجيل")
        console.error("Error creating role:", error);
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
                    <h3 className="page-title">إضافة دور</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/roles">الأدوار</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة دور</li>
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
                            معلومات الدور{" "}
                            <span>
                              <Link to="#">
                                <FeatherIcon icon="more-vertical" />
                              </Link>
                            </span>
                          </h5>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>
                              الاسم <span className="text-danger">*</span>
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
                          <div className="form-group">
                            <label>
                              الاسم بالإنجليزية{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="readable_name.en"
                              placeholder="أدخل الاسم بالإنجليزية"
                              value={formData.readable_name.en}
                              onChange={handleInputChange}
                            />
                            {errors.readable_name_en && (
                              <div className="text-danger">{errors.readable_name_en}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              الاسم بالعربية{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="readable_name.ar"
                              placeholder="أدخل الاسم بالعربية"
                              value={formData.readable_name.ar}
                              onChange={handleInputChange}
                            />
                            {errors.readable_name_ar && (
                              <div className="text-danger">{errors.readable_name_ar}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <h5 className="form-title admin-info d-flex align-items-center justify-content-between">
                            الصلاحيات{" "}
                            <div className="d-flex align-items-center justify-center">
                              <span className="me-2 ml-2">تحديد الكل</span>
                              <Switch
                                checked={selectAll}
                                onChange={handleSelectAllToggle}
                                offColor="#d1d1d1"
                                onColor="#007bff"
                                height={20}
                                width={40}
                                className="ms-2"
                              />
                            </div>
                          </h5>
                        </div>
                        <div className="row">
                          {Object.keys(permissionCategories).map((category) => (
                            <div key={category} className="col-12 col-sm-6 col-md-4 mb-4">
                              <div className="form-group card shadow-sm h-100">
                                <div className="card-header bg-light">
                                  <label className="mb-0 w-100 text-end">
                                    {category} <span className="text-danger">*</span>
                                  </label>
                                </div>
                                <div className="card-body">
                                  {permissionCategories[category].map(permission => (
                                    <div key={permission.name} className="d-flex align-items-center mb-2 justify-content-end">
                                      <label className="ms-2 text-dark w-100 text-end">{permission.readable_name}</label>
                                      <Switch
                                        checked={formData.permissions.includes(permission.name)}
                                        onChange={() => handleToggleChange(permission.name)}
                                        offColor="#d1d1d1"
                                        onColor="#007bff"
                                        height={20}
                                        width={40}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
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

export default AddTeacherRole;
