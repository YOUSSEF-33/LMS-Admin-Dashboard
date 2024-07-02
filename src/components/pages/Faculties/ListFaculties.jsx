import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure this path is correct
import SideBar from '../../SideBar/SideBar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const ListFaculties = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const fetchData = async (page, limit) => {
        try {
            const response = await axiosInstance.get(`v1/admin/faculties?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                setPagination({ ...pagination, total: data.data.total });
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching faculties data:', error);
        }
    };

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
        setPagination(pagination);
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "translations",
            key: "name",
            render: (text, record) => (
                <Link to={`/faculties/${record.id}/dashboard`} className="text-dark">
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
            title: "الأدوار",
            dataIndex: "roles",
            key: "roles",
            render: (text, record) => (
                <span>
                    {record.roles.map(role => role.readable_name).join(", ")}
                </span>
            )
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <div className="actions">
                    <Link to={`/faculties/${record.id}`} className="btn btn-sm bg-success-light me-2">
                        <i className="feather-eye">
                            <FeatherIcon icon="eye" />
                        </i>
                    </Link>
                    <Link to={`/admin/faculties/edit/${record.id}`} className="btn btn-sm bg-danger-light">
                        <i className="feather-edit">
                            <FeatherIcon icon="edit" className="list-edit" />
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
            <div className="main-wrapper">
                {/* Header */}
                <Header />
                {/* Sidebar */}
                <SideBar />
                {/* Page Wrapper */}
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">الكليات</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/faculties">الكليات</Link></li>
                                            <li className="breadcrumb-item active">جميع الكليات</li>
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
                                                    <h3 className="page-title">الكليات</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تصدير
                                                    </Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/admin/faculties/create" className="btn btn-primary">
                                                        <i className="fas fa-plus" /> اضافة كلية
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
                                                onChange={handleTableChange}
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

export default ListFaculties;
