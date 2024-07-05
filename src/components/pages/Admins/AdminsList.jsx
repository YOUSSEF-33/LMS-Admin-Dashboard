import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance, { fetchAdmins } from '../../../ApiService';
import Footer from '../../Footer/Footer';
import { Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const Admins = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchFlag = useRef(false);

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, []);
    console.log(pagination)
    const fetchData = async (page, limit) => {
        if (fetchFlag.current) return;
        fetchFlag.current = true;
        setLoading(true);

        try {
            const data = await fetchAdmins(limit, page);
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                //setPagination(prev => ({ ...prev, total: data.data.total, current: page, pageSize: limit }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setError("حدث خطأ أثناء جلب بيانات المشرفين. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        console.log(pagination.current)
        setPagination(pagination);
        fetchData(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text, record) => (
                <>
                    <Link to="/adminsview" className="text-dark">{record.name}</Link>
                </>
            )
        },
        {
            title: "الايميل",
            dataIndex: "email",
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "الدور",
            dataIndex: "role",
            sorter: (a, b) => a.roles?.[0].name.length - b.roles?.[0].name.length,
            render: (text, record) => (
                <>
                    <Link to="/adminsview" className="text-dark">{record.roles?.[0]?.name}</Link>
                </>
            )
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            render: (text, record) => (
                <>
                    <div className="actions">
                        <Link to="#" className="btn btn-sm bg-success-light me-2">
                            <i className="feather-eye">
                                <FeatherIcon icon="eye" />
                            </i>
                        </Link>
                        <Link to={`/admins/edit/${record.id}`} className="btn btn-sm bg-danger-light">
                            <i className="feather-edit">
                                <FeatherIcon icon="edit" className="list-edit" />
                            </i>
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
            <div className="">
                <div className="">
                    <div className="content container-fluid">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">المشرفون</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/admins">المشرفون</Link></li>
                                            <li className="breadcrumb-item active">جميع المشرفون</li>
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
                                                    <h3 className="page-title">المشرفون</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تصدير
                                                    </Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/admins/create" className="btn btn-primary">
                                                        <i className="fas fa-plus" /> اضافة مشرف
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
                <Footer />
                {/* /Page Wrapper */}
            </div>
            {/* /Main Wrapper */}
        </>
    );
};

export default Admins;
