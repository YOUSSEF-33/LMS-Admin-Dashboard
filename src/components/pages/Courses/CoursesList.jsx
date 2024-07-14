import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure this path is correct
import Footer from '../../Footer/Footer';
import { Modal, Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";
import moment from 'moment'; 

const ListCourses = () => {
    const { id } = useParams();
    const facultyId = id;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const fetchFlag = useRef(false);

    useEffect(() => {
        fetchFacultyName();
        fetchData(pagination.current, pagination.pageSize);
    }, []);

    const fetchFacultyName = async () => {
        try {
            const response = await axiosInstance.get(`v1/admin/faculties/${id}`);
            const data = response.data;
            if (data && data.data && data.data.translations && data.data.translations.name) {
                setFacultyName(data.data.translations.name.ar);
            } else {
                console.error('API response does not contain faculty name', data);
            }
        } catch (error) {
            console.error('Error fetching faculty name:', error);
            setError("حدث خطأ أثناء جلب بيانات الكلية. الرجاء المحاولة لاحقاً.");
        }
    };

    const fetchData = async (page, limit) => {
        if (fetchFlag.current) return;
        fetchFlag.current = true;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`v1/admin/courses?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                setPagination(prev => ({ ...prev, total: data.data.total, current: page, pageSize: limit }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching courses data:', error);
            setError("حدث خطأ أثناء جلب بيانات المقررات. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذه المادة',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/courses/${id}`);
                    setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id));
                } catch (error) {
                    setError("فشل في حذف هذه المادة");
                }
            }
        });
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
        fetchData(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "translations",
            key: "name",
            render: (text, record) => (
                <Link to={`/courses/${record.id}/dashboard`} className="text-dark">
                    {record.translations.name.ar}
                </Link>
            )
        },
        {
            title: "الكود",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "عدد الساعات",
            dataIndex: "hours",
            key: "hours",
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
                    <Link onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="feather-trash">
                            <FeatherIcon icon="trash" size="16" />
                        </i>
                    </Link>
                    <Link to={`/admin/faculties/${facultyId}/courses/${record.id}/edit`} className="btn btn-sm bg-success-light me-2">
                        <i className="feather-edit">
                            <FeatherIcon icon="edit" />
                        </i>
                    </Link>
                </div>
            )
        },
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
            {/* Page Wrapper */}
            <div className="">
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-sub-header">
                                    <h3 className="page-title">  مقررات {facultyName}</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/courses">المقررات</Link></li>
                                        <li className="breadcrumb-item active">جميع المقررات</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow">
                                <div className="card-body">
                                    {/* Page Header */}
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="page-title">المقررات</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <Link to="#" className="btn btn-outline-primary me-2">
                                                    <i className="fas fa-download" /> تصدير
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <Link to={`/admin/faculties/${id}/courses/create`} className="btn btn-primary">
                                                    <i className="fas fa-plus" /> اضافة مقرر
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: pagination.total,
                                                showTotal: (total, range) =>
                                                    `عرض ${range[0]} إلى ${range[1]} من ${total} مدخلات`,
                                                showSizeChanger: true,
                                                onShowSizeChange: (current, size) => handleTableChange({ current, pageSize: size }),
                                                itemRender: itemRender,
                                                current: pagination.current,
                                                pageSize: pagination.pageSize,
                                            }}
                                            columns={columns}
                                            dataSource={dataSource}
                                            rowSelection={rowSelection}
                                            rowKey={(record) => record.id}
                                            onChange={handleTableChange}
                                            loading={loading}
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

export default ListCourses;
