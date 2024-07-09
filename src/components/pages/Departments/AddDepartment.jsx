import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import ErrorModal from "../../CustomComponents/ErrorModal";
import { message } from "antd";

const AddDepartment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const facultyId = id;
    const [formData, setFormData] = useState({
        name: { en: "", ar: "" },
        faculty_id: parseInt(facultyId, 10),
        year: 0,
        is_active: 1
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("name.")) {
            const lang = name.split(".")[1];
            setFormData({ ...formData, name: { ...formData.name, [lang]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.en) newErrors.name_en = "الاسم بالإنجليزية مطلوب";
        if (!formData.name.ar) newErrors.name_ar = "الاسم بالعربية مطلوب";
        if (formData.year <= 0) newErrors.year = "عدد السنوات مطلوب";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axiosInstance.post("v1/admin/departments", formData);
            message.success("تم انشاء القسم بنجاح");
            navigate(`/admin/faculties/${facultyId}/departments`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.status === 422) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0]; 
                }
                setErrors(newErrors);
            } else {
                console.error("Error creating department:", error);
                setErrorMessage("An unexpected error occurred. Please try again later.");
                setShowModal(true);
            }
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setErrorMessage("");
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
                                        <h3 className="page-title">إضافة قسم</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/admin/faculties/${facultyId}/departments`}>الأقسام</Link>
                                            </li>
                                            <li className="breadcrumb-item active">إضافة قسم</li>
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
                                                        معلومات القسم{" "}
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
                                                            عدد السنوات <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="year"
                                                            placeholder="أدخل عدد السنوات"
                                                            value={formData.year}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.year && (
                                                            <div className="text-danger">{errors.year}</div>
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
                                                <div className="col-12">
                                                    <div className="admin-submit">
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
                        {showModal && (
                            <ErrorModal
                                id="error-modal"
                                errorMessage={""}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddDepartment;
