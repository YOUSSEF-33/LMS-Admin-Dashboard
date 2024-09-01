import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../ApiService';
import { Button, Collapse, message, Spin, Table, Tooltip, Tag, Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { CheckPermission } from '../../../utils/isPermissionFound';
import moment from 'moment';

const { Panel } = Collapse;

const ListAssignmentContents = () => {
    const { id, courseId, categoryId, assignmentId } = useParams();
    const facultyId = id;
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState({});
    const [questions, setQuestions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submissionsLoading, setSubmissionsLoading] = useState(true);
    const [error, setError] = useState("");
    const [defaultActiveKey, setDefaultActiveKey] = useState(['1']);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        fetchAssignmentDetails();
        fetchSubmissions();
    }, []);

    const fetchAssignmentDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}`);
            const data = response.data.data;
            setAssignment(data);
            setQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching assignment details:', error);
            setError("حدث خطأ أثناء جلب بيانات الواجب. الرجاء المحاولة لاحقاً.");
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissions = async (page = 1, pageSize = 10) => {
        setSubmissionsLoading(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}/submissions`, {
                params: { page, limit: pageSize }
            });
            const { items, total } = response.data.data;
            
            if (items && items.students && items.students.length) {
                const filteredSubmissions = items.students.filter(submission => submission.submitted_at !== null);
    
                const submissionsWithNavigation = filteredSubmissions.map((submission, index, array) => ({
                    ...submission,
                    next_id: index < array.length - 1 ? array[index + 1].id : null,
                    prev_id: index > 0 ? array[index - 1].id : null
                }));
    
                setSubmissions(submissionsWithNavigation);
                setPagination({
                    ...pagination,
                    current: page,
                    pageSize: pageSize,
                    total: total || 0,
                });
                setAssignment(items);
            } else {
                setSubmissions([]);
                setPagination({
                    ...pagination,
                    current: 1,
                    pageSize: pageSize,
                    total: 0,
                });
                setAssignment({});
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
            message.error('Failed to fetch submissions');
        } finally {
            setSubmissionsLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        fetchSubmissions(pagination.current, pagination.pageSize);
    };

    const handleShowGrades = async () => {
        try {
            await axiosInstance.patch(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}/show-marks-to-students`);
            message.success('تم إظهار الدرجات للطلاب بنجاح');
        } catch (error) {
            console.error('Error showing grades to students:', error);
            message.error('حدث خطأ أثناء محاولة إظهار الدرجات للطلاب');
        }
    };

    const renderQuestion = (question) => {
        const questionTypeText = 
        question.type === 'ONE_CHOICE' ? 'اختيار واحد' : 
        question.type === 'TWO_CHOICES' ? 'اختيارين' : 
        question.type == 'FILES' ? 'مرفقات' :
        question.type == 'TEXT' ? 'مقالي' :
        question.type;

        return (
            <div key={question.id}>
                <p>{question.title}</p>
                <p>نوع السؤال: {questionTypeText}</p>
                <p>العلامات الكلية: {question.total_marks}</p>

                {(question.type === 'ONE_CHOICE' || question.type === 'TWO_CHOICES') && question.options && (
                    <div className="mb-3">
                        {question.options.map((option, index) => {
                            const isCorrect = question.answers && question.answers.includes(option);
                            return (
                                <Tag key={index} color={isCorrect ? 'green' : 'red'} style={{ marginBottom: '5px' }}>
                                    {option}
                                </Tag>
                            );
                        })}
                    </div>
                )}

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
            </div>
        );
    };

    const handleViewSubmission = (record) => {
        navigate(`/admin/faculties/${facultyId}/courses/${courseId}/categories/${categoryId}/assignments/${assignmentId}/submissions/${record.id}`,
            { state: { nextId: record.next_id, prevId: record.prev_id } });
    };

    const submissionColumns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'الكود',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'المجموعة',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'تاريخ التسليم',
            dataIndex: 'submitted_at',
            key: 'submitted_at',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'تاريخ المراجعة',
            dataIndex: 'reviewed_at',
            key: 'reviewed_at',
            render: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'لم تتم المراجعة بعد',
        },
        {
            title: 'النتيجة الإجمالية',
            dataIndex: 'total_result',
            key: 'total_result',
            render: (text) => text || 'لم يتم التقييم بعد',
        },
        {
            title: 'الإجراءات',
            key: 'actions',
            render: (_, record) => (
                <Tooltip title="عرض التفاصيل">
                    <Button
                        onClick={() => handleViewSubmission(record)}
                        type="link"
                    >
                        عرض اجابات الطالب
                    </Button>
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="content container-fluid">
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">{assignment.title}</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/courses/${courseId}/categories/${categoryId}`}>الفئات</Link></li>
                            <li className="breadcrumb-item"><Link to={`/admin/faculties/${facultyId}/courses/${courseId}/categories/${categoryId}/lessons`}>التسليمات</Link></li>
                            <li className="breadcrumb-item active">تفاصيل التسليمات</li>
                        </ul>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className="row">
                        <p className="text-muted">
                            <strong>تاريخ التسليم:</strong> {moment(assignment.dead_line).format('YYYY-MM-DD HH:mm')}
                        </p>
                        <p className="text-muted">
                            <strong>الدرجات الكلية:</strong> {assignment.total_marks}
                        </p>
                        <p className="text-muted">
                            <strong>عدد الطلاب:</strong> {assignment.students_count}
                        </p>
                        <p className="text-muted">
                            <strong>عدد التسليمات:</strong> {assignment.submit_count}
                        </p>
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Spin spinning={loading}>
                <div className="section mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h4>الأسئلة</h4>
                        {CheckPermission("edit_assignment") && (
                            <Link to={`/admin/faculties/${courseId}/courses/${courseId}/categories/${categoryId}/lessons/${assignmentId}/edit-assignment`} className="btn btn-primary">
                                <FeatherIcon icon="edit" /> تعديل الاسئلة
                            </Link>
                        )}
                    </div>
                    <Collapse defaultActiveKey={defaultActiveKey} accordion>
                        {questions.map(question => (
                            <Panel header={question.title} key={question.id}>
                                {renderQuestion(question)}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
                <div className="section mb-4 mt-5">
                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                        <Col>
                            <h4>تسليمات الطلاب</h4>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                onClick={handleShowGrades}
                                disabled={assignment.show_marks_to_students === 1}
                            >
                                {assignment.show_marks_to_students === 1 ? 'تم إظهار الدرجات للطلاب' : 'إظهار الدرجات للطلاب'}
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        loading={submissionsLoading}
                        columns={submissionColumns}
                        dataSource={submissions && submissions}
                        pagination={{
                            ...pagination,
                            showSizeChanger: true,
                            showTotal: (total, range) => `عرض ${range[0]} إلى ${range[1]} من ${total} مدخلات`,
                        }}
                        onChange={handleTableChange}
                        rowKey="id"
                    />
                </div>
            </Spin>
        </div>
    );
};

export default ListAssignmentContents;