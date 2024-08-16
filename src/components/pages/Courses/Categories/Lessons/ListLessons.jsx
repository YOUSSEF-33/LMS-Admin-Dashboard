import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../../../ApiService';
import { Table, Modal, message, Button } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../../../Pagination";
import moment from 'moment';
import { CheckPermission } from '../../../../../utils/isPermissionFound';

const ListLessons = () => {
    const {id, courseId, categoryId } = useParams();
    const facultyId = id;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [lessonPagination, setLessonPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [assignmentPagination, setAssignmentPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [loadingLessons, setLoadingLessons] = useState(false);
    const [loadingAssignments, setLoadingAssignments] = useState(false);
    const [error, setError] = useState("");
    const fetchFlag = useRef(false);

    useEffect(() => {
        fetchLessons(lessonPagination.current, lessonPagination.pageSize);
        fetchAssignments(assignmentPagination.current, assignmentPagination.pageSize);
    }, []);

    const fetchLessons = async (page, limit) => {
        if (fetchFlag.current) return;
        fetchFlag.current = true;
        setLoadingLessons(true);

        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                setLessonPagination(prev => ({ ...prev, total: data.data.total }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching lessons data:', error);
            setError("حدث خطأ أثناء جلب بيانات الدروس. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoadingLessons(false);
        }
    };

    const fetchAssignments = async (page, limit) => {
        setLoadingAssignments(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setAssignments(data.data.items);
                setAssignmentPagination(prev => ({ ...prev, total: data.data.total }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError("حدث خطأ أثناء جلب بيانات الواجبات. الرجاء المحاولة لاحقاً.");
        } finally {
            setLoadingAssignments(false);
        }
    };

    const handleDeleteLesson = (id) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذا الدرس',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${id}`);
                    setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id));
                    message.success('تم حذف الدرس بنجاح');
                } catch (error) {
                    setError("فشل في حذف هذا الدرس");
                }
            }
        });
    };

    const handleDeleteAssignment = async (assignmentId) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذا الواجب',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/courses/${courseId}/course-content-categories/${categoryId}/assignments/${assignmentId}`);
                    setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment.id !== assignmentId));
                    message.success('تم حذف الواجب بنجاح');
                } catch (error) {
                    setError("فشل في حذف هذا الواجب");
                }
            }
        });
    };

    const handleLessonTableChange = (pagination) => {
        setLessonPagination(pagination);
        fetchLessons(pagination.current, pagination.pageSize);
    };

    const handleAssignmentTableChange = (pagination) => {
        setAssignmentPagination(pagination);
        fetchAssignments(pagination.current, pagination.pageSize);
    };

    const lessonColumns = [
        {
            title: "الاسم",
            dataIndex: "translations",
            key: "title",
            render: (text, record) => (
                <Link to={`/courses/${courseId}/categories/${categoryId}/lessons/${record.id}/view`} className="text-dark">
                    {record.translations.title.ar}
                </Link>
            )
        },
        {
            title: "الوصف",
            dataIndex: "translations",
            key: "description",
            render: (text, record) => (
                <span>{record.translations.description.ar}</span>
            )
        },
        {
            title: "تاريخ الإنشاء",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => moment(text).format('YYYY-MM-DD')
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <div className="actions">
                    {CheckPermission("view_lesson") &&
                        <Link to={`${record.id}/lesson-content`} className="btn btn-sm btn-rounded bg-primary-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon="eye" size="16" />
                        </Link>
                    }
                    {CheckPermission("edit_lesson") &&
                        <Link to={`${record.id}/edit`} className="btn btn-sm bg-success-light me-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="feather-edit">
                                <FeatherIcon icon="edit" size="16" />
                            </i>
                        </Link>
                    }
                    {CheckPermission("delete_lesson") &&
                        <Button onClick={() => handleDeleteLesson(record.id)} className="btn btn-sm bg-danger-light me-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="feather-trash">
                                <FeatherIcon icon="trash" size="16" />
                            </i>
                        </Button>
                    }
                </div>
            )
        },
    ];

    const assignmentColumns = [
        {
            title: "العنوان",
            dataIndex: "title",
            key: "title",
            render: (text, record) => <span>{record.title}</span>
        },
        {
            title: "الوصف",
            dataIndex: "description",
            key: "description",
            render: (text, record) => <span>{record.description}</span>
        },
        {
            title: "الدرجات الكلية",
            dataIndex: "total_marks",
            key: "total_marks"
        },
        {
            title: "تاريخ التسليم",
            dataIndex: "dead_line",
            key: "dead_line",
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <div className="actions">
                    {CheckPermission("view_assignment") &&
                        <Link to={`/admin/faculties/${facultyId}/courses/${courseId}/categories/${categoryId}/lessons/${record.id}/show-assignment`} className="btn btn-sm btn-rounded bg-primary-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon="eye" size="16" />
                        </Link>
                    }
                    {CheckPermission("edit_assignment") &&
                        <Link to={`${record.id}/edit-assignment`} className="btn btn-sm bg-success-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon="edit" size="16" />
                        </Link>
                    }
                    {CheckPermission("delete_assignment") &&
                        <Button onClick={() => handleDeleteAssignment(record.id)} className="btn btn-sm bg-danger-light me-2 rounded-full" style={{ padding: '2px 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon="trash" size="16" />
                        </Button>
                    }
                </div>
            )
        }
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <div className="">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-sub-header">
                                    <h3 className="page-title">الدروس</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to={`/courses/${courseId}/categories/${categoryId}`}>الفئات</Link></li>
                                        <li className="breadcrumb-item active">جميع الدروس</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow mb-4">
                                <div className="card-body">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="page-title">الدروس</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <Link to="#" className="btn btn-outline-primary me-2">
                                                    <i className="fas fa-download" /> تصدير
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <Link to={`create`} className="btn btn-primary">
                                                    <i className="fas fa-plus" /> اضافة درس
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: lessonPagination.total,
                                                showTotal: (total, range) =>
                                                    `عرض ${range[0]} إلى ${range[1]} من ${total} مدخلات`,
                                                showSizeChanger: true,
                                                onShowSizeChange: (current, size) => handleLessonTableChange({ current, pageSize: size }),
                                                itemRender: itemRender,
                                                current: lessonPagination.current,
                                                pageSize: lessonPagination.pageSize,
                                            }}
                                            columns={lessonColumns}
                                            dataSource={dataSource}
                                            rowSelection={rowSelection}
                                            rowKey={(record) => record.id}
                                            onChange={handleLessonTableChange}
                                            loading={loadingLessons}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card card-table comman-shadow">
                                <div className="card-body">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="page-title">التسليمات</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                {CheckPermission("create_assignment") && (
                                                    <Link to={`create-assignment`} className="btn btn-primary">
                                                        <FeatherIcon icon="plus" /> إضافة تسليم
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: assignmentPagination.total,
                                                showTotal: (total, range) =>
                                                    `عرض ${range[0]} إلى ${range[1]} من ${total} مدخلات`,
                                                showSizeChanger: true,
                                                onShowSizeChange: (current, size) => handleAssignmentTableChange({ current, pageSize: size }),
                                                itemRender: itemRender,
                                                current: assignmentPagination.current,
                                                pageSize: assignmentPagination.pageSize,
                                            }}
                                            columns={assignmentColumns}
                                            dataSource={assignments}
                                            rowKey={(record) => record.id}
                                            onChange={handleAssignmentTableChange}
                                            loading={loadingAssignments}
                                        />
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

export default ListLessons;
