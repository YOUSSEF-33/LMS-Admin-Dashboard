import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../../../ApiService";
import Switch from "react-switch";
import { message, Upload, Button, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UpdateLessonContent = () => {
    const navigate = useNavigate();
    const { courseId, categoryId, lessonId, contentId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "FILE",
        content: "",
        content_attachments: [],
        is_active: true
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContentDetails();
    }, []);

    const fetchContentDetails = async () => {
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}/contents/${contentId}`);
            const data = response.data.data;

            // Fetch file contents for existing files
            const filePromises = data.content_attachments.map(async file => {
                const fileResponse = await fetch(file.url);
                const blob = await fileResponse.blob();
                return {
                    uid: file.id,
                    name: file.name,
                    status: 'done',
                    url: file.url,
                    size: blob.size,
                    type: blob.type,
                    originFileObj: new File([blob], file.name, { type: blob.type })
                };
            });

            const resolvedFiles = await Promise.all(filePromises);

            setFormData({
                title: data.title,
                description: data.description,
                type: data.type,
                content: data.content || "",
                content_attachments: resolvedFiles,
                is_active: data.is_active
            });
        } catch (error) {
            console.error('Error fetching content details:', error);
            message.error("Failed to fetch content details");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = () => {
        setFormData(prev => ({ ...prev, is_active: !prev.is_active }));
    };

    const handleTypeChange = (value) => {
        setFormData(prev => ({ ...prev, type: value }));
    };

    const handleUploadChange = ({ fileList }) => {
        setFormData(prev => ({
            ...prev,
            content_attachments: fileList
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title_ar = "العنوان بالعربية مطلوب";
        if (!formData.description) newErrors.description_ar = "الوصف بالعربية مطلوب";
        if (formData.type === "URL" && !formData.content) newErrors.content = "الرابط مطلوب";
        if (formData.type === "TEXT" && !formData.content) newErrors.content = "النص مطلوب";
        if (formData.type === "FILE" && formData.content_attachments.length === 0) {
            newErrors.content_attachments = "الملفات مطلوبة";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const form = new FormData();
        form.append("_method", "PUT");
        form.append("title[ar]", formData.title);
        form.append("description[ar]", formData.description);
        form.append("type", formData.type);
        form.append("is_active", formData.is_active);

        if (formData.type === "URL" || formData.type === "TEXT") {
            form.append("content", formData.content);
        }

        if (formData.type === "FILE") {
            if (formData.content_attachments.length === 0) {
                setErrors({ content_attachments: "الملفات مطلوبة" });
                return;
            }

            formData.content_attachments.forEach((file, index) => {
                console.log(file)
                form.append(`content_attachments[${index}]`, file.originFileObj);

            });
        }

        try {
            await axiosInstance.post(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}/contents/${contentId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("تم تحديث المحتوى بنجاح");
            navigate(-1);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                for (const key in serverErrors) {
                    newErrors[key] = serverErrors[key][0];
                }
                setErrors(newErrors);
            } else {
                console.error("Error updating content:", error);
                message.error("Failed to update content");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="">
                <div className="">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">تحديث محتوى</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={`/courses/${courseId}/categories/${categoryId}/lessons/${lessonId}`}>الدروس</Link>
                                            </li>
                                            <li className="breadcrumb-item active">تحديث محتوى</li>
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
                                                        معلومات المحتوى{" "}
                                                        <span>
                                                            <Link to="#">
                                                                <FeatherIcon icon="more-vertical" />
                                                            </Link>
                                                        </span>
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            العنوان بالعربية <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="title"
                                                            placeholder="أدخل العنوان بالعربية"
                                                            value={formData.title}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.title_ar && (
                                                            <div className="text-danger">{errors.title_ar}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            الوصف بالعربية <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="description"
                                                            placeholder="أدخل الوصف بالعربية"
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.description_ar && (
                                                            <div className="text-danger">{errors.description_ar}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>
                                                            النوع <span className="text-danger">*</span>
                                                        </label>
                                                        <Select
                                                            value={formData.type}
                                                            onChange={handleTypeChange}
                                                            className="w-100"
                                                        >
                                                            <Option value="FILE">ملف</Option>
                                                            <Option value="URL">رابط</Option>
                                                            <Option value="TEXT">نص</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                {formData.type === "URL" && (
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                الرابط <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="content"
                                                                placeholder="أدخل الرابط"
                                                                value={formData.content}
                                                                onChange={handleInputChange}
                                                            />
                                                            {errors.content && (
                                                                <div className="text-danger">{errors.content}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.type === "TEXT" && (
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>
                                                                النص <span className="text-danger">*</span>
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                name="content"
                                                                placeholder="أدخل النص"
                                                                value={formData.content}
                                                                onChange={handleInputChange}
                                                            />
                                                            {errors.content && (
                                                                <div className="text-danger">{errors.content}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.type === "FILE" && (
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>
                                                                المرفقات <span className="text-danger">*</span>
                                                            </label>
                                                            <Upload
                                                                fileList={formData.content_attachments}
                                                                onChange={handleUploadChange}
                                                                beforeUpload={() => false}
                                                                multiple
                                                            >
                                                                <Button icon={<UploadOutlined />}>اختر الملفات</Button>
                                                            </Upload>
                                                            {errors.content_attachments && (
                                                                <div className="text-danger">{errors.content_attachments}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="col-12 col-sm-6">
                                                    <div className="form-group d-flex align-items-center">
                                                        <label className="m-3">نشط</label>
                                                        <Switch
                                                            checked={formData.is_active}
                                                            onChange={handleToggleChange}
                                                            offColor="#d1d1d1"
                                                            onColor="#007bff"
                                                            height={20}
                                                            width={40}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
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

export default UpdateLessonContent;
