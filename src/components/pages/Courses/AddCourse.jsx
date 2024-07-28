import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Select from "react-select";
import { message } from "antd";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'align': []}],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
        [{ 'direction': 'rtl' }]
    ],
    clipboard: {
        matchVisual: false,
    }
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'align', 'direction'
];

const AddCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const facultyId = id;
    const [formData, setFormData] = useState({
        name: { ar: "", en: "" },
        code: "",
        faculty_id: parseInt(facultyId, 10),
        start_year: 0,
        hours: 0,
        departments: [],
        teachers: [],
        objectives: [""]
    });
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courseImage, setCourseImage] = useState(null);

    useEffect(() => {
        fetchDepartments();
        fetchTeachers();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/faculties/${facultyId}/departments`);
            if (response.data && response.data.data.items) {
                setDepartments(response.data.data.items.map(dep => ({ value: dep.id, label: dep.translations.name.ar })));
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

    const handleObjectiveChange = (index, value) => {
        const updatedObjectives = formData.objectives.map((obj, i) =>
            i === index ? value : obj
        );
        setFormData({ ...formData, objectives: updatedObjectives });
    };


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCourseImage(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.ar) newErrors.name_ar = "اسم المادة بالعربية مطلوب";
        if (!formData.name.en) newErrors.name_en = "اسم المادة بالإنجليزية مطلوب";
        if (!formData.code) newErrors.code = "كود المادة مطلوب";
        if (formData.start_year <= 0) newErrors.start_year = "سنة البدء مطلوبة";
        if (formData.hours <= 0) newErrors.hours = "عدد الساعات مطلوب";
        if (!formData.departments.length) newErrors.departments = "يجب اختيار الأقسام";
        if (!formData.teachers.length) newErrors.teachers = "يجب اختيار المدرسين";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key === 'name') {
                    formDataToSend.append('name[ar]', formData.name.ar);
                    formDataToSend.append('name[en]', formData.name.en);
                } else if (key === 'objectives') {
                    formData.objectives.filter(obj => obj.trim()).forEach((obj, index) => {
                        formDataToSend.append(`objectives[${index}]`, obj);
                    });
                } else if (Array.isArray(formData[key])) {
                    formData[key].forEach((value, index) => {
                        formDataToSend.append(`${key}[${index}]`, value);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
            if (courseImage) {
                formDataToSend.append('image', courseImage);
            }
            await axiosInstance.post("/v1/admin/courses", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("تم اضافة المادة بنجاح");
            navigate(`/faculties/${facultyId}/courses`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error creating course:", error);
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
                                        <h3 className="page-title">إضافة مادة</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/faculties/${facultyId}/courses`}>المواد</Link>
                                            </li>
                                            <li className="breadcrumb-item active">إضافة مادة</li>
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
                                                <div className="col-12">
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
                                                            سنة البدء <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="start_year"
                                                            placeholder="أدخل سنة البدء"
                                                            value={formData.start_year}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.start_year && (
                                                            <div className="text-danger">{errors.start_year}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
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
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الأهداف  <span className="login-danger"></span>
                                                        </label>
                                                        {formData.objectives.map((objective, index) => (
                                                            <div key={index} className="objective-item mb-3">
                                                                <ReactQuill
                                                                    value={objective}
                                                                    onChange={(value) => handleObjectiveChange(index, value)}
                                                                    placeholder="أدخل هنا..."
                                                                    modules={modules}
                                                                    formats={formats}
                                                                    style={{ direction: 'ltr' }}
                                                                />
                                                            </div>
                                                        ))}
                                                    
                                                        {errors.objectives && (
                                                            <div className="text-danger">{errors.objectives}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            صورة المادة
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCourse;