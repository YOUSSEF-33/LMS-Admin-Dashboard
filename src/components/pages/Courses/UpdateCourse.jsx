import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Select from "react-select";
import { message } from "antd";

const UpdateCourse = () => {
    const navigate = useNavigate();
    const { id, courseId } = useParams();
    const [formData, setFormData] = useState({
        name: { ar: "" },
        code: "",
        faculty_id: id,
        hours: 0,
        departments: [],
        teachers: []
    });
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchCourseData();
        fetchDepartments();
        fetchTeachers();
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/courses/${courseId}`);
            if (response.data && response.data.data) {
                const course = response.data.data;
                setFormData({
                    name: { ar: course.translations.name.ar },
                    code: course.code,
                    faculty_id: id,
                    hours: course.hours,
                    departments: course.departments.map(dep => dep.id),
                    teachers: course.teachers.map(teacher => teacher.id)
                });
            }
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/faculties/${formData.faculty_id}/departments`);
            if (response.data && response.data.data.items) {
                setDepartments(response.data.data.items.map(dep => ({ value: dep.id, label: dep.name })));
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axiosInstance.get("/v1/admin/teachers");
            if (response.data && response.data.data.items) {
                setTeachers(response.data.data.items.map(teacher => ({ value: teacher.id, label: `${teacher.first_name} ${teacher.last_name}` })));
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
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

    const handleSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions.map(option => option.value) });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.ar) newErrors.name_ar = "اسم المادة بالعربية مطلوب";
        if (!formData.code) newErrors.code = "كود المادة مطلوب";
        if (formData.hours <= 0) newErrors.hours = "عدد الساعات مطلوب";
        if (!formData.departments.length) newErrors.departments = "يجب اختيار الأقسام";
        if (!formData.teachers.length) newErrors.teachers = "يجب اختيار المدرسين";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    console.log(formData.departments, departments)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axiosInstance.put(`/v1/admin/courses/${courseId}`, formData);
            message.success("تم تحديث المادة بنجاح");
            navigate(`/admin/faculties/${formData.faculty_id}/courses`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error updating course:", error);
                message.error("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.");
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
                                        <h3 className="page-title">تحديث مادة</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/faculties/${formData.faculty_id}/courses`}>المواد</Link>
                                            </li>
                                            <li className="breadcrumb-item active">تحديث مادة</li>
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
                                                        معلومات المادة{" "}
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
                                                            عدد الساعات <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            step="0.1"
                                                            name="hours"
                                                            placeholder="أدخل عدد الساعات"
                                                            value={formData.hours}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.hours && (
                                                            <div className="text-danger">{errors.hours}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الأقسام <span className="login-danger">*</span>
                                                        </label>
                                                        <Select
                                                            isMulti
                                                            name="departments"
                                                            options={departments}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            value={departments.filter(dep => formData.departments.includes(dep.value))}
                                                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: "departments" })}
                                                        />
                                                        {errors.departments && (
                                                            <div className="text-danger">{errors.departments}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            المدرسين <span className="login-danger">*</span>
                                                        </label>
                                                        <Select
                                                            isMulti
                                                            name="teachers"
                                                            options={teachers}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            value={teachers.filter(teacher => formData.teachers.includes(teacher.value))}
                                                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, { name: "teachers" })}
                                                        />
                                                        {errors.teachers && (
                                                            <div className="text-danger">{errors.teachers}</div>
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

export default UpdateCourse;
