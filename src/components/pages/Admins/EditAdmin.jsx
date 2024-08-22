import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the admin ID from the URL parameters
  const [formData, setFormData] = useState({
    admin_id: id,
    role_id: "",
  });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]); // To store the list of roles

  useEffect(() => {
    // Fetch the roles from the API when the component mounts
    axiosInstance.get("/v1/admin/roles").then((response) => {
      setRoles(response.data.data.items);
    }).catch((error) => {
      console.error("Error fetching roles:", error);
    });
  }, []);

  //console.log(roles)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role_id) newErrors.role_id = "الدور مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData)
    try {
      await axiosInstance.post("v1/admin/roles/sync", formData);
      navigate(-1);
    } catch (error) {
      console.error("Error updating admin role:", error);
      console.log(error.response.data.message)
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">تعديل دور المشرف</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/admins">المشرفين</Link>
                      </li>
                      <li className="breadcrumb-item active">تعديل دور المشرف</li>
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
                              الدور <span className="login-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              name="role_id"
                              value={formData.role_id}
                              onChange={handleInputChange}
                            >
                              <option value="">اختر دور</option>
                              {roles?.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                            {errors.role_id && (
                              <div className="text-danger">{errors.role_id}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="admin-submit">
                            <button type="submit" className="btn btn-primary">
                              تحديث
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

export default EditAdmin;
