import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Switch from "react-switch";

const UpdateFaculty = () => {
    const { id } = useParams(); // Assuming you're passing the faculty ID via URL params
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: { en: "", ar: "" },
        code: "",
        years: 0,
        is_active: 1,
        type: "HOURS",
        roles: []
    });
    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        fetchRoles();
        fetchFacultyData();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axiosInstance.get("/v1/admin/roles");
            if (response.data && response.data.data.items) {
                setRoles(response.data.data.items);
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const fetchFacultyData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/faculties/${id}`);
            if (response.data && response.data.data) {
                const faculty = response.data.data;
                setFormData({
                    name: faculty.translations.name,
                    code: faculty.code,
                    years: faculty.years,
                    is_active: faculty.is_active,
                    type: faculty.type,
                    roles: faculty.roles.map(role => role.id)
                });
                setSelectAll(faculty.roles.length === roles.length);
            }
        } catch (error) {
            console.error("Error fetching faculty data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("name.")) {
            const lang = name.split(".")[1];
            setFormData({ ...formData, name: { ...formData.name, [lang]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleToggleChange = (roleId) => {
        setFormData((prevData) => {
            const updatedRoles = prevData.roles.includes(roleId)
                ? prevData.roles.filter(id => id !== roleId)
                : [...prevData.roles, roleId];
            return { ...prevData, roles: updatedRoles };
        });
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setFormData((prevData) => ({
                ...prevData,
                roles: []
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                roles: roles.map(role => role.id)
            }));
        }
        setSelectAll(!selectAll);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.en) newErrors.name_en = "الاسم بالإنجليزية مطلوب";
        if (!formData.name.ar) newErrors.name_ar = "الاسم بالعربية مطلوب";
        if (!formData.code) newErrors.code = "الكود مطلوب";
        if (formData.years <= 0) newErrors.years = "عدد السنوات مطلوب";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axiosInstance.put(`/v1/admin/faculties/${id}`, formData);
            navigate("/admin/faculties");
        } catch (error) {
            console.error("Error updating faculty:", error);
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
                                        <h3 className="page-title">تحديث كلية</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/faculties">الكليات</Link>
                                            </li>
                                            <li className="breadcrumb-item active">تحديث كلية</li>
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
                                                        معلومات الكلية{" "}
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
                                                            الاسم بالإنجليزية <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="name.en"
                                                            placeholder="أدخل الاسم بالإنجليزية"
                                                            value={formData.name.en}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.name_en && (
                                                            <div className="text-danger">{errors.name_en}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الاسم بالعربية <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="name.ar"
                                                            placeholder="أدخل الاسم بالعربية"
                                                            value={formData.name.ar}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.name_ar && (
                                                            <div className="text-danger">{errors.name_ar}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الكود <span className="login-danger">*</span>
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
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            عدد السنوات <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="years"
                                                            placeholder="أدخل عدد السنوات"
                                                            value={formData.years}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.years && (
                                                            <div className="text-danger">{errors.years}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الحالة <span className="login-danger">*</span>
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            name="is_active"
                                                            value={formData.is_active}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value={1}>نشط</option>
                                                            <option value={0}>غير نشط</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            النوع <span className="login-danger">*</span>
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            name="type"
                                                            value={formData.type}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="HOURS">نظام الساعات المعتمدة</option>
                                                            <option value="YEARS">السنين الدراسية</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="form-title admin-info d-flex align-items-center justify-content-between">
                                                            <div>
                                                                الأدوار{" "}
                                                                <span>
                                                                    <Link to="#">
                                                                        <FeatherIcon icon="more-vertical" />
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center mx-3 justify-center">
                                                                <label className="me-2 mx-2">تحديد الكل</label>
                                                                <Switch
                                                                    checked={selectAll}
                                                                    onChange={handleSelectAllChange}
                                                                    offColor="#888"
                                                                    onColor="#007bff"
                                                                    width={40}
                                                                    height={20}
                                                                />
                                                            </div>
                                                        </h5>
                                                    </div>
                                                    <div className="row mb-4">
                                                        {roles.map((role) => (
                                                            <div key={role.id} className="col-12 col-sm-6 col-md-4 mb-3 d-flex align-items-center">
                                                                <Switch
                                                                    checked={formData.roles.includes(role.id)}
                                                                    onChange={() => handleToggleChange(role.id)}
                                                                    offColor="#888"
                                                                    onColor="#007bff"
                                                                    width={40}
                                                                    height={20}
                                                                />
                                                                <label className="me-2 mb-0 flex-grow-1 text-black">{role.readable_name}</label>
                                                            </div>
                                                        ))}
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

export default UpdateFaculty;
