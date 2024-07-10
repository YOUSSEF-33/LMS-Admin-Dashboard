import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import ErrorModal from "../../CustomComponents/ErrorModal";
import { message } from "antd";

const AddGroup = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get faculty id from params
    const facultyId = parseInt(id, 10);
    const [formData, setFormData] = useState({
        name: "",
        faculty_id: facultyId,
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "اسم المجموعة مطلوب";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axiosInstance.post("v1/admin/groups", formData);
            message.success("تم إنشاء المجموعة بنجاح");
            navigate(`/admin/faculties/${facultyId}/groups`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.status === 422) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error creating group:", error);
                setErrorMessage("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.");
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
                                        <h3 className="page-title">إضافة مجموعة</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/admin/faculties/${facultyId}/groups`}>المجموعات</Link>
                                            </li>
                                            <li className="breadcrumb-item active">إضافة مجموعة</li>
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
                                                        معلومات المجموعة{" "}
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
                                errorMessage={errorMessage}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddGroup;
