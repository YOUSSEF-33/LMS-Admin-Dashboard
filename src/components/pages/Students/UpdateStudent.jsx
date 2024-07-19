import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Select from "react-select";
import ErrorModal from "../../CustomComponents/ErrorModal";
import { message } from "antd";

const UpdateStudent = () => {
    const navigate = useNavigate();
    const { id, studentId } = useParams(); // Get faculty id and student id from params
    const facultyId = parseInt(id, 10);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        code: "",
        year: 1,
        faculty_id: facultyId,
        department_id: null,
        birth_date: "",
        group_id: null,
        gender: "MALE",
        address: "",
        national_id: "",
        gpa: "",
        courses: [],
        student_image: null,  // Required image
    });
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const [groups, setGroups] = useState([]);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [studentImagePreview, setStudentImagePreview] = useState(null);
    const [isImageDeleted, setIsImageDeleted] = useState(false);

    useEffect(() => {
        fetchStudentData();
        fetchDepartments();
        fetchGroups();
        fetchCourses();
    }, []);

    const fetchStudentData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/students/${studentId}`);
            if (response.data && response.data.data) {
                const student = response.data.data;
                //console.log(student)
                setFormData({
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    phone: student.phone,
                    code: student.code,
                    year: student.year,
                    faculty_id: facultyId,
                    department_id: student.department.id,
                    birth_date: student.birth_date,
                    group_id: student.group.id,
                    gender: student.gender,
                    address: student.address,
                    national_id: student.national_id,
                    gpa: student.gpa,
                    courses: student.courses.map(course => course.id),
                    student_image: null,
                });
                setStudentImagePreview(student.profile_image.url); // Assuming profile_image_url is the URL of the student's image
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/faculties/${facultyId}/departments`);
            if (response.data && response.data.data.items) {
                setDepartments(response.data.data.items.map(dep => ({ value: dep.id, label: dep.name })));
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get(`/v1/admin/groups`);
            if (response.data && response.data.data.items) {
                setGroups(response.data.data.items.map(group => ({ value: group.id, label: group.name })));
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get("/v1/admin/courses");
            if (response.data && response.data.data.items) {
                setCourses(response.data.data.items.map(course => ({ value: course.id, label: course.name })));
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setFormData({ ...formData, [name]: selectedOption.value });
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        setFormData({ ...formData, [name]: selectedOptions.map(option => option.value) });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudentImagePreview(reader.result);
                setIsImageDeleted(false); // Reset the delete flag when a new image is selected
            };
            reader.readAsDataURL(file);
        }
        setFormData({ ...formData, [name]: file });
    };

    const deleteImage = () => {
        setFormData({ ...formData, student_image: null });
        setStudentImagePreview(null);
        setIsImageDeleted(true); // Set the delete flag when the image is deleted
    };
    
    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = "الاسم الأول مطلوب";
        if (!formData.last_name) newErrors.last_name = "اسم العائلة مطلوب";
        if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
        if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
        if (!formData.code) newErrors.code = "الكود مطلوب";
        if (!formData.department_id) newErrors.department_id = "القسم مطلوب";
        if (!formData.birth_date) newErrors.birth_date = "تاريخ الميلاد مطلوب";
        if (!formData.group_id) newErrors.group_id = "المجموعة مطلوبة";
        if (!formData.address) newErrors.address = "العنوان مطلوب";
        if (!formData.national_id) newErrors.national_id = "الرقم القومي مطلوب";
        if (formData.gpa > 4) newErrors.gpa = "المعدل التراكمي لا يجب ان يكون اكثر من 4";
        if (!formData.courses.length) newErrors.courses = "المقررات مطلوبة";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Create FormData object
        const data = new FormData();
        console.log(Object.keys(formData))
        Object.keys(formData).forEach(key => {
            if (key === "courses") {
                
                formData[key].forEach((course, index) => {
                    data.append(`${key}[${index}]`, course);
                });
            } else {
                console.log(formData[key])
                data.append(key, formData[key]);
            }
        });

        // Append the image separately if it exists
        if (formData.student_image) {
            data.append("profile_image[0]", formData.student_image);
        }
        data.append("_method", "PUT" )
        // Append a flag to delete the image if it was deleted
        if (isImageDeleted) {
            data.append("delete_image", true);
        }
        console.log(data)
        try {
            await axiosInstance.post(`/v1/admin/students/${studentId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            message.success("تم تحديث بيانات الطالب بنجاح");
            navigate(`/admin/faculties/${facultyId}/students`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.status === 422) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error updating student:", error);
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
                                        <h3 className="page-title">تحديث بيانات الطالب</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/admin/faculties/${facultyId}/students`}>الطلاب</Link>
                                            </li>
                                            <li className="breadcrumb-item active">تحديث بيانات الطالب</li>
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
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الاسم الأول <span className="login-danger">*</span>
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
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            اسم العائلة <span className="login-danger">*</span>
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
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            البريد الإلكتروني <span className="login-danger">*</span>
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
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            رقم الهاتف <span className="login-danger">*</span>
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
                                                            سنة الدراسة <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="year"
                                                            placeholder="أدخل سنة الدراسة"
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
                                                            القسم <span className="login-danger">*</span>
                                                        </label>
                                                        <Select
                                                            name="department_id"
                                                            options={departments}
                                                            className="basic-select"
                                                            classNamePrefix="select"
                                                            value={departments.find(dep => dep.value === formData.department_id)}
                                                            onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "department_id" })}
                                                        />
                                                        {errors.department_id && (
                                                            <div className="text-danger">{errors.department_id}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            تاريخ الميلاد <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="birth_date"
                                                            placeholder="أدخل تاريخ الميلاد"
                                                            value={formData.birth_date}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.birth_date && (
                                                            <div className="text-danger">{errors.birth_date}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            المجموعة <span className="login-danger">*</span>
                                                        </label>
                                                        <Select
                                                            name="group_id"
                                                            options={groups}
                                                            className="basic-select"
                                                            classNamePrefix="select"
                                                            value={groups.find(group => group.value === formData.group_id)}
                                                            onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "group_id" })}
                                                        />
                                                        {errors.group_id && (
                                                            <div className="text-danger">{errors.group_id}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الجنس <span className="login-danger">*</span>
                                                        </label>
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
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            العنوان <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="address"
                                                            placeholder="أدخل العنوان"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.address && (
                                                            <div className="text-danger">{errors.address}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            الرقم القومي <span className="login-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="national_id"
                                                            placeholder="أدخل الرقم القومي"
                                                            value={formData.national_id}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.national_id && (
                                                            <div className="text-danger">{errors.national_id}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            المعدل التراكمي <span className="login-danger"></span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            step="0.01"
                                                            name="gpa"
                                                            placeholder="أدخل المعدل التراكمي"
                                                            value={formData.gpa}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.gpa && (
                                                            <div className="text-danger">{errors.gpa}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            المقررات <span className="login-danger">*</span>
                                                        </label>
                                                        <Select
                                                            isMulti
                                                            name="courses"
                                                            options={courses}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            value={courses.filter(course => formData.courses.includes(course.value))}
                                                            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, { name: "courses" })}
                                                        />
                                                        {errors.courses && (
                                                            <div className="text-danger">{errors.courses}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            صورة الطالب <span className="login-danger"></span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="student_image"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                        {studentImagePreview && (
                                                            <div>
                                                                <img src={studentImagePreview} alt="Student Preview" style={{ marginTop: '10px', width: '100%', height: 'auto' }} />
                                                                <button type="button" className="btn btn-danger mt-2" onClick={deleteImage}>حذف الصورة</button>
                                                            </div>
                                                        )}
                                                        {errors.student_image && (
                                                            <div className="text-danger">{errors.student_image}</div>
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

export default UpdateStudent;
