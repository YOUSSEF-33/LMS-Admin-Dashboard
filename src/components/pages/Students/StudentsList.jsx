import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure axiosInstance is properly imported
import { Table, Modal, message } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { FaUserCircle } from 'react-icons/fa'; // Import the profile icon
import { onShowSizeChange, itemRender } from "../../Pagination";

const StudentsList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const fetchData = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/v1/admin/students?limit=${limit}&page=${page}`);
            const data = response.data.data;
            if (Array.isArray(data.items)) {
                setDataSource(data.items);
                //setPagination({ ...pagination, total: data.total });
            } else {
                console.error('API response is not an array', data);
            }
        } catch (error) {
            console.error('Error fetching students data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
        setPagination(pagination);
    };

    const handleDelete = (studentId) => {
        Modal.confirm({
            title: 'هل أنت متأكد أنك تريد حذف هذا الطالب؟',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`/v1/admin/students/${studentId}`);
                    message.success('تم حذف الطالب بنجاح');
                    fetchData(pagination.current, pagination.pageSize);
                } catch (error) {
                    console.error('Error deleting student:', error);
                    message.error('فشل في حذف الطالب');
                }
            },
        });
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "first_name",
            sorter: (a, b) => a.first_name.length - b.first_name.length,
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {record.profile_image ? (
                        <img 
                            src={record.profile_image.url} 
                            alt={`${record.first_name} ${record.last_name}`} 
                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }}
                        />
                    ) : (
                        <FaUserCircle style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                    )}
                    <Link to={`/students/view/${record.id}`} className="text-dark">{`${record.first_name} ${record.last_name}`}</Link>
                </div>
            )
        },
        {
            title: "البريد الإلكتروني",
            dataIndex: "email",
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "رقم الهاتف",
            dataIndex: "phone",
            sorter: (a, b) => a.phone.length - b.phone.length,
        },
        {
            title: "الكود",
            dataIndex: "code",
            sorter: (a, b) => a.code.length - b.code.length,
        },
        {
            title: "سنة الدراسة",
            dataIndex: "year",
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            render: (text, record) => (
                <>
                    <div className="actions" style={{ display: 'flex', gap: '10px' }}>
                        <Link
                            onClick={() => handleDelete(record.id)}
                            className="btn btn-sm bg-danger-light"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}
                        >
                            <FeatherIcon size={14} icon="trash-2" />
                        </Link>
                        <Link
                            to={`/admin/faculties/${id}/students/${record.id}/edit`}
                            className="btn btn-sm bg-success-light"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}
                        >
                            <FeatherIcon size={14} icon="edit" />
                        </Link>
                    </div>
                </>
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
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-sub-header">
                                <h3 className="page-title">الطلاب</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/students">الطلاب</Link></li>
                                    <li className="breadcrumb-item active">جميع الطلاب</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card card-table comman-shadow">
                            <div className="card-body">
                                <div className="page-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="page-title">الطلاب</h3>
                                        </div>
                                        <div className="col-auto text-end float-end ms-auto download-grp">
                                            <Link to="#" className="btn btn-outline-primary me-2">
                                                <i className="fas fa-download" /> تصدير
                                            </Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={`/admin/faculties/${id}/students/create`} className="btn btn-primary">
                                                <i className="fas fa-plus" /> إضافة طالب
                                            </Link>
                                        </div>
                                    </div>
                                </div>
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
                                        loading={loading}
                                        onChange={handleTableChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentsList;
