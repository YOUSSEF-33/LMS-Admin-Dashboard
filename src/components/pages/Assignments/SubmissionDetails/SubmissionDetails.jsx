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
    const [studentId, setStudentId] = useState(null);

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
            const studentId = response.data.data.students[0]?.id; 
            setStudentId(studentId);

            const initialMarks = {};
            const initialMarkingTypes = {};
            response.data.data.questions.forEach(question => {
                if (question.submitted_answers.length === 0) {
                    initialMarks[question.id] = 0;
                    marks[question.id] = 0;
                    initialMarkingTypes[question.id] = 'zero';
                } else {
                    question.submitted_answers.forEach(answer => {
                        const key = question.id;
                        const isCorrect = isAnswerCorrect(question, answer);
                        if (question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') {
                            initialMarks[key] = isCorrect ? question.total_marks : 0;
                            marks[key] =  isCorrect ? question.total_marks : 0;
                            initialMarkingTypes[key] = isCorrect ? 'full' : 'zero';
                        } else if (isCorrect) {
                            initialMarks[key] = question.total_marks;
                            marks[key] = question.total_marks;
                            initialMarkingTypes[key] = 'full';
                        } else {
                            marks[key] = answer.result || 0;
                            initialMarks[key] = answer.result || 0;
                            initialMarkingTypes[key] = answer.result == 0 ? 'zero' : 'custom';
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

    const handleMarkChange = (questionId, value, type) => {
        const key = questionId;
        if (isNaN(value)) {
            value = 0;
        }
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
        return question.total_marks === submittedAnswer.result;
    };

    const handleSubmit = async () => {
        try {
            for (const [key, value] of Object.entries(marks)) {
                const questionId = key;
                await axiosInstance.put(`v1/admin/questions/${questionId}/marks/${studentId}`, { marks: value });
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
        let currentIndex = 0;
        for(let i = 0; i < submissions.length; i++ ){
           if(submissions[i] == submissionId){
             currentIndex = i;
             break;
           }
        }
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
            {console.log(submission)}
            <Card title="تفاصيل التسليم" className="mb-4">
                <h4>{submission.title}</h4>
                {submission.students[0].total_result &&
                (
                     <p> درجة الطالب الحالية : {submission.students[0].total_result} </p>
                )}
                <p> الدرجة الكاملة: {submission.total_marks}</p>
                <p>تم التسليم في: {moment(submission.students[0].submitted_at).format('YYYY-MM-DD hh:mm A')}</p>
                {submission.students[0].reviewed_at &&
                (
                     <p>تم المراجعة في: {moment(submission.students[0].reviewed_at).format('YYYY-MM-DD hh:mm A')}</p>
                )}
            </Card>

            {submission.questions.map((question, index) => (
                <Card key={question.id} title={`سؤال ${index + 1}: ${question.title}`} className="mb-4">
                    <p> الدرجة الكاملة للسؤال : {question.total_marks}</p>

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
                            const key = question.id;
                            return (
                                <Card 
                                    key={answer.id} 
                                    style={{ 
                                        marginBottom: '10px',
                                        backgroundColor: isCorrect === true ? 'rgba(0, 255, 0, 0.1)' : 'transparent'
                                    }}
                                >
                                    {answer.text && (
                                        <>
                                        <b>اجابة الطالب:</b>
                                        <p>{JSON.parse(answer.text).join(', ')}</p>
                                        </>
                                    ) }
                                    {answer.text == null && answer.answer_attachments.length == 0 && (
                                        <b>لم يتم تقديم اجابة لهذا السؤال</b>
                                    )}

                                    {answer.answer_attachments && answer.answer_attachments.length > 0 && (
                                        <div>
                                            <h6>مرفقات اجابة الطالب:</h6>
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
                                    <hr />
                                    <p>النتيجة الحالية: {marks[key]}</p>
                                    <Tag color={isCorrect ? 'green' : 'red'}>
                                        {isCorrect ? 'صحيحة' : 'غير صحيحة'}
                                    </Tag>

                                    <div style={{ marginTop: '10px' }}>
                                        <Radio.Group 
                                            value={markingTypes[key]}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                {console.log(e.target.value)}
                                                if (value === 'full') {
                                                    handleMarkChange(question.id, question.total_marks, 'full');
                                                } else if (value === 'zero') {
                                                    handleMarkChange(question.id, 0, 'zero');
                                                } else {
                                                    handleMarkChange(question.id, marks[key], 'custom');
                                                }
                                            }}
                                        >
                                            <Radio.Button value="full">
                                                <CheckCircleOutlined /> الدرجة الكاملة
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
                                                onChange={(e) => handleMarkChange(question.id, parseFloat(e.target.value), 'custom')}
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
        <b>لم يتم تقديم إجابة لهذا السؤال.</b>
        <br />
        <p> {marks[question.id] !== null ? 'الدرجة الحالية: ' + marks[question.id] : 'الدرجة الافتراضية: 0' } </p>
        <div style={{ marginTop: '10px' }}>
            <Radio.Group 
                value={markingTypes[question.id]}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'full') {
                        handleMarkChange(question.id, question.total_marks, 'full');
                    } else if (value === 'zero') {
                        handleMarkChange(question.id, 0, 'zero');
                    } else {
                        handleMarkChange(question.id, marks[question.id], 'custom');
                    }
                }}
            >
                <Radio.Button value="full">
                    <CheckCircleOutlined /> الدرجة الكاملة
                </Radio.Button>
                <Radio.Button value="zero">
                    <CloseCircleOutlined /> صفر
                </Radio.Button>
                <Radio.Button value="custom">
                    علامة مخصصة
                </Radio.Button>
            </Radio.Group>
            {markingTypes[`${question.id}`] === 'custom' && (
                <Input
                    style={{ width: '100px', marginLeft: '10px' }}
                    type="number"
                    value={marks[question.id]}
                    onChange={(e) => handleMarkChange(question.id, parseFloat(e.target.value), 'custom')}
                />
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
