import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../ApiService';
import { Button, Spin, message, Card, Input, Radio, Tag } from 'antd';
import { LeftOutlined, RightOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const SubmissionDetails = () => {
    const { id, courseId, categoryId, assignmentId, submissionId } = useParams();
    const facultyId = id;
    const navigate = useNavigate();

    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [marks, setMarks] = useState({});
    const [markingTypes, setMarkingTypes] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalSubmissions, setTotalSubmissions] = useState(0);

    useEffect(() => {
        fetchSubmissionDetails();
    }, [submissionId]);

    useEffect(() => {
        fetchAllSubmissions();
    }, [currentPage]);

    const fetchAllSubmissions = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}/submissions`, {
                params: {
                    page: currentPage,
                    limit: 25,
                },
            });
            const data = response.data.data;
            setTotalSubmissions(data.total); // assuming the total number of submissions is returned by the API
            const submissionIds = data.items.students?.map(item => item.id);
            setSubmissions(submissionIds);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissionDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}/submissions/${submissionId}`);
            setSubmission(response.data.data);

            const initialMarks = {};
            const initialMarkingTypes = {};
            response.data.data.questions.forEach(question => {
                if (question.submitted_answers.length === 0) {
                    initialMarks[`${question.id}-no-answer`] = 0;
                    initialMarkingTypes[`${question.id}-no-answer`] = 'zero';
                } else {
                    question.submitted_answers.forEach(answer => {
                        const key = `${question.id}-${answer.id}`;
                        if (question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') {
                            const isCorrect = isAnswerCorrect(question, answer);
                            initialMarks[key] = isCorrect ? question.total_marks : 0;
                            initialMarkingTypes[key] = isCorrect ? 'full' : 'zero';
                        } else {
                            initialMarks[key] = answer.result || 0;
                            initialMarkingTypes[key] = 'custom';
                        }
                    });
                }
            });
            setMarks(initialMarks);
            setMarkingTypes(initialMarkingTypes);
        } catch (error) {
            console.error('Error fetching submission details:', error);
            setError("حدث خطأ أثناء جلب بيانات التسليم. الرجاء المحاولة لاحقاً.");
        } finally {
            setLoading(false);
        }
    };

    const navigateToSubmission = (submissionId) => {
        navigate(`/admin/faculties/${facultyId}/courses/${courseId}/categories/${categoryId}/assignments/${assignmentId}/submissions/${submissionId}`);
    };

    const handleMarkChange = (questionId, answerId, value, type) => {
        const key = `${questionId}-${answerId}`;
        setMarks(prevMarks => ({
            ...prevMarks,
            [key]: value
        }));
        setMarkingTypes(prevTypes => ({
            ...prevTypes,
            [key]: type
        }));
    };

    const isAnswerCorrect = (question, submittedAnswer) => {
        if (question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') {
            const submittedChoices = JSON.parse(submittedAnswer.text);
            return question.answers.every(answer => submittedChoices.includes(answer)) &&
                   submittedChoices.every(choice => question.answers.includes(choice));
        }
        return null; // Return null for other question types
    };

    const handleSubmit = async () => {
        try {
            for (const [key, value] of Object.entries(marks)) {
                const [questionId, answerId] = key.split('-');
                if (answerId !== 'no-answer') {
                    await axiosInstance.put(`v1/admin/questions/${questionId}/marks/${answerId}`, { marks: value });
                }
            }
            await axiosInstance.patch(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}/submissions/${submissionId}`);
            message.success('تم حفظ وتقديم العلامات بنجاح');
            fetchSubmissionDetails();
        } catch (error) {
            console.error('Error submitting marks:', error);
            message.error('حدث خطأ أثناء حفظ وتقديم العلامات');
        }
    };

    const goToNextSubmission = () => {
        console.log(submissions);
        let currentIndex = 0;
        for(let i = 0; i < submissions.length; i++ ){
           if(submissions[i] == submissionId){
             currentIndex = i;
             break;
           }
        }
        console.log(currentIndex);
        if (currentIndex === submissions.length - 1 && submissions.length === 25) {
            // If at the last submission of the current page and there might be more submissions, load the next page
            setCurrentPage(prevPage => prevPage + 1);
        } else if (currentIndex < submissions.length - 1) {
            navigateToSubmission(submissions[currentIndex + 1]);
        }
    };

    const goToPreviousSubmission = () => {
        let currentIndex = 0;
        for(let i = 0; i < submissions.length; i++ ){
           if(submissions[i] == submissionId){
             currentIndex = i;
             break;
           }
        }
        console.log(currentIndex);
        if (currentIndex === 0 && currentPage > 1) {
            // If at the first submission of the current page and there might be more submissions on the previous page
            setCurrentPage(prevPage => prevPage - 1);
        } else if (currentIndex > 0) {
            navigateToSubmission(submissions[currentIndex - 1]);
        }
    };

    if (loading) return <Spin size="large" />;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!submission) return <div>لا توجد بيانات للتسليم</div>;

    return (
        <div className="content container-fluid">
            <Card title="تفاصيل التسليم" className="mb-4">
                <h4>{submission.title}</h4>
                <p>{submission.description}</p>
                <p>العلامات الإجمالية: {submission.total_marks}</p>
                <p>تاريخ التسليم النهائي: {moment(submission.dead_line).format('YYYY-MM-DD HH:mm:ss')}</p>
            </Card>

            {submission.questions.map((question, index) => (
                <Card key={question.id} title={`سؤال ${index + 1}: ${question.title}`} className="mb-4">
                    <p>نوع السؤال: {question.type}</p>
                    <p>العلامات الإجمالية للسؤال: {question.total_marks}</p>

                    {question.question_attatchments && question.question_attatchments.length > 0 && (
                        <div>
                            <h6>مرفقات السؤال:</h6>
                            <ul>
                                {question.question_attatchments.map((attachment) => (
                                    <li key={attachment.id}>
                                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                            {attachment.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {question.submitted_answers && question.submitted_answers.length > 0 ? (
                        question.submitted_answers.map((answer) => {
                            const isCorrect = isAnswerCorrect(question, answer);
                            const key = `${question.id}-${answer.id}`;
                            return (
                                <Card 
                                    key={answer.id} 
                                    style={{ 
                                        marginBottom: '10px',
                                        backgroundColor: isCorrect === true ? 'rgba(0, 255, 0, 0.1)' : 'transparent'
                                    }}
                                >
                                    <p>الاجابات: {answer.text && answer.text !== "null" ? JSON.parse(answer.text).join(', ') : "لا يوجد نص"}</p>
                                    <p>النتيجة الحالية: {marks[key]}</p>
                                    {(question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') && (
                                        <Tag color={isCorrect ? 'green' : 'red'}>
                                            {isCorrect ? 'صحيحة' : 'غير صحيحة'}
                                        </Tag>
                                    )}

                                    {answer.answer_attachments && answer.answer_attachments.length > 0 && (
                                        <div>
                                            <h6>مرفقات الإجابة:</h6>
                                            <ul>
                                                {answer.answer_attachments.map((attachment) => (
                                                    <li key={attachment.id}>
                                                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                                            {attachment.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div style={{ marginTop: '10px' }}>
                                        <Radio.Group 
                                            value={markingTypes[key]}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === 'full') {
                                                    handleMarkChange(question.id, answer.id, question.total_marks, 'full');
                                                } else if (value === 'zero') {
                                                    handleMarkChange(question.id, answer.id, 0, 'zero');
                                                } else {
                                                    handleMarkChange(question.id, answer.id, marks[key], 'custom');
                                                }
                                            }}
                                        >
                                            <Radio.Button value="full">
                                                <CheckCircleOutlined /> العلامة الكاملة
                                            </Radio.Button>
                                            <Radio.Button value="zero">
                                                <CloseCircleOutlined /> صفر
                                            </Radio.Button>
                                            <Radio.Button value="custom">
                                                علامة مخصصة
                                            </Radio.Button>
                                        </Radio.Group>
                                        {markingTypes[key] === 'custom' && (
                                            <Input
                                                style={{ width: '100px', marginLeft: '10px' }}
                                                type="number"
                                                value={marks[key]}
                                                onChange={(e) => handleMarkChange(question.id, answer.id, parseFloat(e.target.value), 'custom')}
                                            />
                                        )}
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <Card 
                            style={{ 
                                marginBottom: '10px',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <p>لم يتم تقديم إجابة لهذا السؤال.</p>
                            <p>العلامة الافتراضية: 0</p>
                            <div>
                                {question.options && question.options.length > 0 && (
                                    <div className="mb-3">
                                        <h6>الخيارات:</h6>
                                        {question.options.map((option, index) => (
                                            <Tag key={index} color="blue" style={{ marginBottom: '5px' }}>
                                                {option}
                                            </Tag>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                </Card>
            ))}

            <Button 
                type="primary" 
                onClick={handleSubmit} 
                style={{ marginBottom: '20px' }}
            >
                حفظ وتقديم المراجعة
            </Button>

            <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '30px' }}>
                <Button 
                    icon={<LeftOutlined />} 
                    onClick={goToPreviousSubmission}
                    disabled={submissions.indexOf(Number(submissionId)) === 0 && currentPage === 1}
                >
                    السابق
                </Button>
                <Button 
                    icon={<RightOutlined />} 
                    onClick={goToNextSubmission}
                    disabled={submissions.indexOf(Number(submissionId)) === submissions.length - 1 && currentPage * 25 >= totalSubmissions}
                >
                    التالي
                </Button>
            </div>
        </div>
    );
};

export default SubmissionDetails;
