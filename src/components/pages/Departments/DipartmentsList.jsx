import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure this path is correct
import Footer from '../../Footer/Footer';
import { Table, Modal } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const DepartmentsList = () => {
    const { id } = useParams();
    const facultyId = id;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchFlag = useRef(false);

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, []);

    const fetchData = async (page, limit) => {
        if (fetchFlag.current) return;
        fetchFlag.current = true;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`v1/admin/faculties/${facultyId}/departments?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                setPagination(prev => ({ ...prev, total: data.data.total, current: page, pageSize: limit }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching departments data:', error);
            setError("حدث خطأ أثناء جلب بيانات الأقسام. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
        fetchData(pagination.current, pagination.pageSize);
    };

    const handleDelete = async (recordId) => {
        Modal.confirm({
            title: 'هل أنت متأكد من حذف هذا القسم؟',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/departments/${recordId}`);
                    setDataSource(prevData => prevData.filter(item => item.id !== recordId));
                } catch (error) {
                    console.error('Error deleting department:', error);
                    setError("حدث خطأ أثناء حذف القسم. الرجاء المحاولة لاحقاً.");
                }
            },
        });
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "translations",
            key: "name",
            render: (text, record) => (
                <Link to={`/departments/${record.id}/dashboard`} className="text-dark">
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
            title: "عدد السنوات",
            dataIndex: "years",
            key: "years",
        },
        {
            title: "الحالة",
            dataIndex: "is_active",
            key: "is_active",
            render: (text, record) => (
                <span className={record.is_active ? "badge bg-success" : "badge bg-danger"}>
                    {record.is_active ? "نشط" : "غير نشط"}
                </span>
            )
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <div className="actions">
                    <button onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light me-2">
                        <FeatherIcon icon="trash" size={16} />
                    </button>
                    <Link to={`/admin/departments/edit/${record.id}`} className="btn btn-sm bg-danger-light">
                        <FeatherIcon icon="edit" size={16} />
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
                                    <h3 className="page-title">الأقسام</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/faculties">الكليات</Link></li>
                                        <li className="breadcrumb-item"><Link to={`/faculties/${facultyId}/departments`}>الأقسام</Link></li>
                                        <li className="breadcrumb-item active">جميع الأقسام</li>
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
                                                <h3 className="page-title">الأقسام</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <Link to="#" className="btn btn-outline-primary me-2">
                                                    <i className="fas fa-download" /> تصدير
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <Link to={`/admin/faculties/${facultyId}/departments/create`} className="btn btn-primary">
                                                    <i className="fas fa-plus" /> اضافة قسم
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

export default DepartmentsList;
