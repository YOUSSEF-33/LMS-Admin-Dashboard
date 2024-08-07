import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Select from "react-select";
import { message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const segmentationOptions = [
    { value: 'all', label: 'الكل' },
    { value: 'courses', label: 'المواد' },
    { value: 'users', label: 'المستخدمين' },
    { value: 'faculties', label: 'الكليات' },
    { value: 'years', label: 'السنوات' }
];

const AddAnnouncement = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: { ar: "", en: "" },
        content: { ar: "", en: "" },
        segmentation: {
            type: "all",
            values: {
                users: [],
                faculties: [],
                courses: [],
                years: []
            }
        },
        gallery: []
    });
    const [errors, setErrors] = useState({});
    const [options, setOptions] = useState({
        users: [],
        faculties: [],
        courses: [],
        years: []
    });

    useEffect(() => {
        fetchOptions();
    }, []);

    useEffect(() => {
        if (formData.segmentation.values.faculties?.length > 0) {
            fetchYearsFromFaculties();
        }
    }, [formData.segmentation.values?.faculties]);

    const fetchOptions = async () => {
        try {
            const [usersResponse, facultiesResponse, coursesResponse] = await Promise.all([
                axiosInstance.get("/v1/admin/students"),
                axiosInstance.get("/v1/admin/faculties"),
                axiosInstance.get("/v1/admin/courses")
            ]);

            setOptions({
                users: usersResponse.data.data.items.map(user => ({ value: user.id, label: `${user.first_name} ${user.last_name}` })),
                faculties: facultiesResponse.data.data.items.map(faculty => ({ value: faculty.id, label: faculty.translations.name.ar, years: faculty.years })),
                courses: coursesResponse.data.data.items.map(course => ({ value: course.id, label: course.translations.name.ar })),
                years: []
            });
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const fetchYearsFromFaculties = () => {
        const selectedFaculties = options.faculties.filter(faculty => formData.segmentation.values.faculties.includes(faculty.value));
        const years = [];
        selectedFaculties.forEach(faculty => {
            for (let year = 1; year <= faculty.years; year++) {
                years.push({ value: year, label: `Year ${year}` });
            }
        });
        setOptions(prev => ({
            ...prev,
            years
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [field, lang] = name.split(".");
            setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSegmentationTypeChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            segmentation: {
                type: selectedOption.value,
                values: {
                    users: [],
                    faculties: [],
                    courses: [],
                    years: []
                }
            }
        }));
    };

    const handleMultiSelectChange = (selectedOptions, { name }) => {
        setFormData(prev => ({
            ...prev,
            segmentation: {
                ...prev.segmentation,
                values: {
                    ...prev.segmentation.values,
                    [name]: selectedOptions ? selectedOptions.map(option => option.value) : []
                }
            }
        }));
    };

    const handleYearChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            segmentation: {
                ...prev.segmentation,
                values: {
                    ...prev.segmentation.values,
                    years: selectedOptions ? selectedOptions.map(option => option.value) : []
                }
            }
        }));
    };

    const handleGalleryChange = ({ fileList }) => {
        setFormData(prev => ({ ...prev, gallery: fileList }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.ar) newErrors.title_ar = "عنوان الإعلان بالعربية مطلوب";
        if (!formData.title.en) newErrors.title_en = "عنوان الإعلان بالإنجليزية مطلوب";
        if (!formData.content.ar) newErrors.content_ar = "محتوى الإعلان بالعربية مطلوب";
        if (!formData.content.en) newErrors.content_en = "محتوى الإعلان بالإنجليزية مطلوب";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key === 'title' || key === 'content') {
                    formDataToSend.append(`${key}[ar]`, formData[key].ar);
                    formDataToSend.append(`${key}[en]`, formData[key].en);
                } else if (key === 'segmentation') {
                    formDataToSend.append(`segmentation[type]`, formData.segmentation.type);
                    if (formData.segmentation.type !== 'all') {
                        const values = formData.segmentation.values;
                        Object.keys(values).forEach(subKey => {
                            if (values[subKey].length) {
                                if (Array.isArray(values[subKey])) {
                                    values[subKey].forEach((val, index) => {
                                        formDataToSend.append(`segmentation[values][${subKey}][]`, val);
                                    });
                                } else {
                                    formDataToSend.append(`segmentation[values][${subKey}]`, values[subKey]);
                                }
                            }
                        });
                    } else {
                        const values = formData.segmentation.values;
                        formDataToSend.append(`segmentation[values][nothing][0]`, [1, 2]);
                    }
                } else if (key === 'gallery') {
                    formData.gallery.forEach((file, index) => {
                        formDataToSend.append(`gallery[${index}]`, file.originFileObj);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            await axiosInstance.post("/v1/admin/announcements", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("تم إضافة الإعلان بنجاح");
            navigate("/admin/announcements");
        } catch (error) {
            console.error("Error creating announcement:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
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
                                        <h3 className="page-title">إضافة إعلان</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/announcements">الإعلانات</Link>
                                            </li>
                                            <li className="breadcrumb-item active">إضافة إعلان</li>
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
                                                    <h5 className="form-title student-info">معلومات الإعلان <span><FeatherIcon icon="more-vertical" /></span></h5>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>العنوان بالعربية <span className="login-danger">*</span></label>
                                                        <input type="text" name="title.ar" className="form-control" placeholder="أدخل العنوان بالعربية" value={formData.title.ar} onChange={handleInputChange} />
                                                        {errors.title_ar && <div className="text-danger">{errors.title_ar}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>العنوان بالإنجليزية <span className="login-danger">*</span></label>
                                                        <input type="text" name="title.en" className="form-control" placeholder="Enter title in English" value={formData.title.en} onChange={handleInputChange} />
                                                        {errors.title_en && <div className="text-danger">{errors.title_en}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>المحتوى بالعربية <span className="login-danger">*</span></label>
                                                        <textarea name="content.ar" className="form-control" placeholder="أدخل المحتوى بالعربية" value={formData.content.ar} onChange={handleInputChange}></textarea>
                                                        {errors.content_ar && <div className="text-danger">{errors.content_ar}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>المحتوى بالإنجليزية <span className="login-danger">*</span></label>
                                                        <textarea name="content.en" className="form-control" placeholder="Enter content in English" value={formData.content.en} onChange={handleInputChange}></textarea>
                                                        {errors.content_en && <div className="text-danger">{errors.content_en}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group local-forms">
                                                        <label>نوع التقسيم <span className="login-danger">*</span></label>
                                                        <Select
                                                            options={segmentationOptions}
                                                            value={segmentationOptions.find(option => option.value === formData.segmentation.type)}
                                                            onChange={handleSegmentationTypeChange}
                                                        />
                                                    </div>
                                                </div>
                                                {formData.segmentation.type !== 'all' && formData.segmentation.type !== 'years' && (
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group local-forms">
                                                            <label>قيم التقسيم <span className="login-danger">*</span></label>
                                                            <Select
                                                                isMulti
                                                                name={formData.segmentation.type}
                                                                options={options[formData.segmentation.type]}
                                                                value={options[formData.segmentation.type].filter(option => formData.segmentation.values[formData.segmentation.type].includes(option.value))}
                                                                onChange={handleMultiSelectChange}
                                                            />
                                                            {errors.segmentation && <div className="text-danger">{errors.segmentation}</div>}
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.segmentation.type === 'years' && (
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group local-forms">
                                                            <label>الكليات <span className="login-danger">*</span></label>
                                                            <Select
                                                                isMulti
                                                                name="faculties"
                                                                options={options.faculties}
                                                                value={options.faculties.filter(option => formData.segmentation.values.faculties.includes(option.value))}
                                                                onChange={handleMultiSelectChange}
                                                            />
                                                            {errors.faculties && <div className="text-danger">{errors.faculties}</div>}
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.segmentation.type === 'years' && formData.segmentation.values.faculties.length > 0 && (
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group local-forms">
                                                            <label>السنة <span className="login-danger">*</span></label>
                                                            <Select
                                                                isMulti
                                                                name="years"
                                                                options={options.years}
                                                                value={options.years.filter(option => formData.segmentation.values.years.includes(option.value))}
                                                                onChange={handleYearChange}
                                                            />
                                                            {errors.year && <div className="text-danger">{errors.year}</div>}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="col-12">
                                                    <div className="form-group local-forms">
                                                        <label>معرض الصور</label>
                                                        <Upload
                                                            listType="picture"
                                                            fileList={formData.gallery}
                                                            onChange={handleGalleryChange}
                                                            beforeUpload={() => false}
                                                            multiple
                                                        >
                                                            <Button icon={<UploadOutlined />}>اختر الملفات</Button>
                                                        </Upload>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="student-submit">
                                                        <button type="submit" className="btn btn-primary">إضافة</button>
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

export default AddAnnouncement;
