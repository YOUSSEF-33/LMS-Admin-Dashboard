import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import ErrorModal from "../../CustomComponents/ErrorModal";
import { message } from "antd";

const UpdateGroup = () => {
    const navigate = useNavigate();
    const { id ,groupId } = useParams(); // Get group id from params
    const [formData, setFormData] = useState({
        name: "",
        faculty_id: id,
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchGroupData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/groups/${groupId}`);
            const groupData = response.data.data;
            setFormData({
                name: groupData.name,
                faculty_id: id,
            });
        } catch (error) {
            console.error("Error fetching group data:", error);
            setErrorMessage("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.");
            setShowModal(true);
        }
    };

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
            await axiosInstance.put(`/v1/admin/groups/${groupId}`, formData);
            message.success("تم تحديث المجموعة بنجاح");
            navigate(-1);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.status === 422) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error updating group:", error);
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
                                        <h3 className="page-title">تحديث مجموعة</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/admin/faculties/${formData.faculty_id}/groups`}>المجموعات</Link>
                                            </li>
                                            <li className="breadcrumb-item active">تحديث مجموعة</li>
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
                                                <div className="col-12">
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

export default UpdateGroup;
