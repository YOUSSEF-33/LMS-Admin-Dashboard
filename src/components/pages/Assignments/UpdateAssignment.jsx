import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axiosInstance from "../../../ApiService";
import Select from "react-select";
import { message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const questionTypes = [
    { value: 'ONE_CHOICE', label: 'اختيار واحد' },
    { value: 'TWO_CHOICES', label: 'اختياران' },
    { value: 'FILES', label: 'ملفات' },
    { value: 'TEXT', label: 'نص' }
];

const UpdateAssignment = () => {
    const { courseId, categoryId, assignmentId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: { en: "", ar: "" },
        description: { en: "", ar: "" },
        groups: [],
        total_marks: 0,
        dead_line: null,
        questions: []
    });
    const [errors, setErrors] = useState({});
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        fetchGroups();
        fetchAssignmentData();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get("v1/admin/groups");
            setGroupOptions(response.data.data.items.map(group => ({ value: group.id, label: group.name })));
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    const fetchAssignmentData = async () => {
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}`);
            const assignmentData = response.data.data;

            let validatedDeadLine = null;
            if (assignmentData.dead_line) {
                const parsedDate = moment(assignmentData.dead_line);
                if (parsedDate.isValid()) {
                    validatedDeadLine = parsedDate.toDate();
                } else {
                    console.error("Invalid date format received from backend");
                    message.error("Invalid deadline date received from the server");
                }
            }

            const questionPromises = assignmentData.questions.map(async q => {
                if (q.question_attatchments) {
                    const filePromises = q.question_attatchments.map(async file => {
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
                    return {
                        ...q,
                        question_attachments: resolvedFiles
                    };
                }
                return q;
            });

            const resolvedQuestions = await Promise.all(questionPromises);

            setFormData({
                title: { en: assignmentData.title, ar: assignmentData.title },
                description: { en: assignmentData.description, ar: assignmentData.description },
                groups: assignmentData.groups.map(group => group.id),
                total_marks: assignmentData.total_marks,
                dead_line: validatedDeadLine,
                questions: resolvedQuestions
            });
        } catch (error) {
            console.error("Error fetching assignment data:", error);
            message.error("Failed to load assignment data");
        }
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

    const handleGroupChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            groups: selectedOptions.map(option => option.value)
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({ ...prev, dead_line: date }));
    };

    const handleAddQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, {
                title: "",
                total_marks: 0,
                type: "ONE_CHOICE",
                options: ["", ""],
                answers: [],
                question_attachments: []
            }]
        }));
    };

    const handleDeleteQuestion = (index) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === index ? { ...q, [field]: value } : q
            )
        }));
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === questionIndex ? {
                    ...q,
                    options: q.options.map((opt, j) => j === optionIndex ? value : opt)
                } : q
            )
        }));
    };

    const handleAnswerChange = (questionIndex, selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === questionIndex ? { ...q, answers: selectedOptions.map(option => option.value) } : q
            )
        }));
    };

    const handleAttachmentChange = (questionIndex, { fileList }) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === questionIndex ? { ...q, question_attachments: fileList } : q
            )
        }));
    };

    const calculateTotalMarks = () => {
        return formData.questions.reduce((total, question) => total + parseFloat(question.total_marks || 0), 0);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.en) newErrors.title_en = "عنوان المهمة مطلوب";
        if (formData.groups.length === 0) newErrors.groups = "يجب اختيار مجموعة واحدة على الأقل";
        if (!formData.dead_line) newErrors.dead_line = "تاريخ الاستحقاق مطلوب";
        if (formData.questions.length === 0) newErrors.questions = "يجب إضافة سؤال واحد على الأقل";

        formData.questions.forEach((question, index) => {
            if (!question.title) newErrors[`question_${index}_title`] = "عنوان السؤال مطلوب";
            if (!question.total_marks) newErrors[`question_${index}_marks`] = "درجات السؤال مطلوبة";
            if (question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') {
                if (question.options.length < 2) newErrors[`question_${index}_options`] = "يجب إضافة خيارين على الأقل";
                if (question.answers.length === 0) newErrors[`question_${index}_answer`] = "يجب اختيار إجابة واحدة على الأقل";
                if (question.type === 'TWO_CHOICES' && question.answers.length < 2) newErrors[`question_${index}_answer`] = "يجب اختيار إجابتين على الأقل";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const totalQuestionMarks = calculateTotalMarks();
        if (totalQuestionMarks !== parseFloat(formData.total_marks)) {
            message.error("مجموع درجات الأسئلة لا يساوي إجمالي الدرجات");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('title[en]', formData.title.en);
        formDataToSend.append('title[ar]', formData.title.ar);
        formDataToSend.append('description[en]', formData.description.en);
        formDataToSend.append('description[ar]', formData.description.ar);
        formData.groups.forEach(group => formDataToSend.append('groups[]', group));
        formDataToSend.append('total_marks', formData.total_marks);
        formDataToSend.append('dead_line', formData.dead_line?.getTime());
        formDataToSend.append('_method', "PUT");

        formData.questions.forEach((question, index) => {
            if (question.id) {
                formDataToSend.append(`questions[${index}][id]`, question.id);
            }
            formDataToSend.append(`questions[${index}][title]`, question.title);
            formDataToSend.append(`questions[${index}][total_marks]`, question.total_marks);
            formDataToSend.append(`questions[${index}][type]`, question.type);

            if (question.type === "ONE_CHOICE" || question.type === "TWO_CHOICES") {
                question.options.forEach((option, optionIndex) => {
                    formDataToSend.append(`questions[${index}][options][${optionIndex}]`, String(option));
                });

                question.answers.forEach((answer, answerIndex) => {
                    formDataToSend.append(`questions[${index}][answers][${answerIndex}]`, String(answer));
                });
            }

            if (question.question_attachments) {
                question.question_attachments.forEach((file, fileIndex) => {
                    formDataToSend.append(`questions[${index}][question_attachments]`, file.originFileObj);
                });
            }
        });

        try {
            await axiosInstance.post(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("تم تحديث المهمة بنجاح");
            navigate("/admin/assignments");
        } catch (error) {
            console.error("Error updating assignment:", error);
            message.error("حدث خطأ أثناء تحديث المهمة");
        }
    };



    const datePickerStyles = {
        input: {
            width: '100%',
            padding: '10px 15px',
            fontSize: '14px',
            border: '1px solid #e5e5e5',
            borderRadius: '4px',
        },
    };


    return (
        <>
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col-sm-12">
                            <div className="page-sub-header">
                                <h3 className="page-title">تحديث المهمة</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/assignments">المهام</Link>
                                    </li>
                                    <li className="breadcrumb-item active">تحديث المهمة</li>
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
                                            <h5 className="form-title student-info">معلومات المهمة <span><FeatherIcon icon="more-vertical" /></span></h5>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group local-forms">
                                                <label>العنوان (بالإنجليزية) <span className="login-danger">*</span></label>
                                                <input type="text" name="title.en" className="form-control" placeholder="أدخل عنوان المهمة بالإنجليزية" value={formData.title.en} onChange={handleInputChange} />
                                                {errors.title_en && <div className="text-danger">{errors.title_en}</div>}
                                            </div>
                                            <div className="form-group local-forms">
                                                <label>العنوان (بالعربية)</label>
                                                <input type="text" name="title.ar" className="form-control" placeholder="أدخل عنوان المهمة بالعربية" value={formData.title.ar} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group local-forms">
                                                <label>الوصف (بالإنجليزية)</label>
                                                <textarea name="description.en" className="form-control" placeholder="أدخل وصف المهمة بالإنجليزية" value={formData.description.en} onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group local-forms">
                                                <label>الوصف (بالعربية)</label>
                                                <textarea name="description.ar" className="form-control" placeholder="أدخل وصف المهمة بالعربية" value={formData.description.ar} onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group local-forms">
                                                <label>المجموعات <span className="login-danger">*</span></label>
                                                <Select
                                                    isMulti
                                                    options={groupOptions}
                                                    value={groupOptions.filter(option => formData.groups.includes(option.value))}
                                                    onChange={handleGroupChange}
                                                />
                                                {errors.groups && <div className="text-danger">{errors.groups}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group local-forms">
                                                <label>إجمالي الدرجات <span className="login-danger">*</span></label>
                                                <input type="number" name="total_marks" className="form-control" placeholder="أدخل إجمالي الدرجات" value={formData.total_marks} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group local-forms">
                                                <label>تاريخ الانتهاء <span className="login-danger">*</span></label>
                                                <DatePicker
                                                    selected={formData.dead_line}
                                                    onChange={handleDateChange}
                                                    className="form-control"
                                                    showTimeSelect
                                                    dateFormat="yyyy-MM-dd HH:mm"
                                                    placeholderText="اختر تاريخ الانتهاء"
                                                    popperClassName="form-control"
                                                />
                                                {errors.dead_line && <div className="text-danger">{errors.dead_line}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <h5 className="form-title">الأسئلة <span><FeatherIcon icon="more-vertical" /></span></h5>
                                            {errors.questions && <div className="text-danger">{errors.questions}</div>}
                                        </div>
                                        {formData.questions.map((question, index) => (
                                            <div key={index} className="col-12 border p-3 mb-3">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group local-forms">
                                                            <label>عنوان السؤال <span className="login-danger">*</span></label>
                                                            <input type="text" className="form-control" value={question.title} onChange={(e) => handleQuestionChange(index, 'title', e.target.value)} />
                                                            {errors[`question_${index}_title`] && <div className="text-danger">{errors[`question_${index}_title`]}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group local-forms">
                                                            <label>الدرجات <span className="login-danger">*</span></label>
                                                            <input type="number" className="form-control" value={question.total_marks} onChange={(e) => handleQuestionChange(index, 'total_marks', e.target.value)} />
                                                            {errors[`question_${index}_marks`] && <div className="text-danger">{errors[`question_${index}_marks`]}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="form-group local-forms">
                                                            <label>نوع السؤال <span className="login-danger">*</span></label>
                                                            <Select
                                                                options={questionTypes}
                                                                value={questionTypes.find(type => type.value === question.type)}
                                                                onChange={(selectedOption) => handleQuestionChange(index, 'type', selectedOption.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {(question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') && (
                                                        <>
                                                            <div className="col-12">
                                                                <h6>الخيارات</h6>
                                                                {question.options.map((option, optionIndex) => (
                                                                    <div key={optionIndex} className="col-12 mb-2">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={option}
                                                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                                            placeholder={`الخيار ${optionIndex + 1}`}
                                                                        />
                                                                    </div>
                                                                ))}
                                                                <div className="col-12 mb-2">
                                                                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleQuestionChange(index, 'options', [...question.options, ''])}>
                                                                        إضافة خيار
                                                                    </button>
                                                                </div>
                                                                {errors[`question_${index}_options`] && <div className="text-danger">{errors[`question_${index}_options`]}</div>}
                                                            </div>
                                                            <div className="col-12 mb-2">
                                                                <label>الإجابة الصحيحة <span className="login-danger">*</span></label>
                                                                <Select
                                                                    isMulti={question.type === 'TWO_CHOICES'}
                                                                    options={question.options.map((option, i) => ({ value: option, label: option }))}
                                                                    value={question.answers.map(answer => ({ value: answer, label: answer }))}
                                                                    onChange={(selectedOptions) => handleAnswerChange(index, selectedOptions)}
                                                                />
                                                                {errors[`question_${index}_answer`] && <div className="text-danger">{errors[`question_${index}_answer`]}</div>}
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="col-12 mb-2">
                                                        <label>المرفقات</label>
                                                        <Upload
                                                            listType="picture"
                                                            fileList={question.question_attachments}
                                                            onChange={(info) => handleAttachmentChange(index, info)}
                                                            beforeUpload={() => false}
                                                            multiple
                                                        >
                                                            <Button icon={<UploadOutlined />}>اختر الملفات</Button>
                                                        </Upload>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(index)}>
                                                            حذف السؤال
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="col-12 mb-3">
                                            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
                                                إضافة سؤال
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <div className="student-submit">
                                                <button type="submit" className="btn btn-primary">تحديث المهمة</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateAssignment;
