import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../../../../ApiService";
import Switch from "react-switch";
import { message, Upload, Button, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddLessonContent = () => {
  const navigate = useNavigate();
  const { courseId, categoryId, lessonId } = useParams();
  const [formData, setFormData] = useState({
    title: { ar: "" },
    description: { ar: "" },
    type: "FILE",
    content: "",
    content_attachments: [],
    is_active: true
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("title.") || name.startsWith("description.")) {
      const key = name.split(".")[0];
      const lang = name.split(".")[1];
      setFormData({ ...formData, [key]: { ...formData[key], [lang]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, is_active: !formData.is_active });
  };

  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const handleUploadChange = ({ fileList }) => {
    setFormData({ ...formData, content_attachments: fileList });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.ar) newErrors.title_ar = "العنوان بالعربية مطلوب";
    if (!formData.description.ar) newErrors.description_ar = "الوصف بالعربية مطلوب";
    if (formData.type === "URL" && !formData.content) newErrors.content = "الرابط مطلوب";
    if (formData.type === "FILE" && formData.content_attachments.length === 0) newErrors.content_attachments = "الملفات مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
    form.append("title[ar]", formData.title.ar);
    form.append("description[ar]", formData.description.ar);
    form.append("type", formData.type);
    form.append("content", formData.content);
    form.append("is_active", formData.is_active);

    formData.content_attachments.forEach(async (file) => {
        
          
            form.append("content_attachments[]", file.originFileObj);
         
    });

    try {
      await axiosInstance.post(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}/contents`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      message.success("تم إضافة المحتوى بنجاح");
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
        console.error("Error creating content:", error);
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
                    <h3 className="page-title">إضافة محتوى</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={`/courses/${courseId}/categories/${categoryId}/lessons/${lessonId}`}>الدروس</Link>
                      </li>
                      <li className="breadcrumb-item active">إضافة محتوى</li>
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
                              name="title.ar"
                              placeholder="أدخل العنوان بالعربية"
                              value={formData.title.ar}
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
                              name="description.ar"
                              placeholder="أدخل الوصف بالعربية"
                              value={formData.description.ar}
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
                          <div className="col-12">
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

export default AddLessonContent;
