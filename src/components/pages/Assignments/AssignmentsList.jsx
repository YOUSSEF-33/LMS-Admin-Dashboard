import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const ListAssignments = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });

    const dataSource = [
        {
            id: 1,
            title: 'الواجب 1',
            description: 'واجب رياضيات حول الجبر',
            dueDate: '2024-06-20'
        },
        {
            id: 2,
            title: 'الواجب 2',
            description: 'واجب فيزياء حول الميكانيكا',
            dueDate: '2024-07-05'
        },
        // Add more static assignment data as needed
    ];

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: "عنوان الواجب",
            dataIndex: "title",
            sorter: (a, b) => a.title.length - b.title.length,
            render: (text, record) => (
                <>
                    <Link to={`/assignments/view/${record.id}`} className="text-dark">{record.title}</Link>
                </>
            )
        },
        {
            title: "الوصف",
            dataIndex: "description",
            render: (text, record) => (
                <>
                    {record.description}
                </>
            )
        },
        {
            title: "تاريخ الاستحقاق",
            dataIndex: "dueDate",
            render: (text, record) => (
                <>
                    {record.dueDate}
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
                        <Link to={`/assignments/edit/${record.id}`} className="btn btn-sm bg-danger-light">
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
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">الواجبات</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/assignments">الواجبات</Link></li>
                                            <li className="breadcrumb-item active">جميع الواجبات</li>
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
                                                    <h3 className="page-title">الواجبات</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تصدير
                                                    </Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/admins/assignments/create" className="btn btn-primary">
                                                        <i className="fas fa-plus" /> اضافة واجب
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <Table
                                                pagination={{
                                                    total: dataSource.length,
                                                    showTotal: (total, range) =>
                                                        `عرض ${range[0]} إلى ${range[1]} من ${total} إدخالات`,
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
}

export default ListAssignments;
