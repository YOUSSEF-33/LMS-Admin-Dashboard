import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const ListExams = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });

    const dataSource = [
        {
            id: 1,
            name: 'Math Exam',
            description: 'Final exam for the math course',
            date: '2024-06-15'
        },
        {
            id: 2,
            name: 'Physics Exam',
            description: 'Midterm exam for the physics course',
            date: '2024-07-01'
        },
        // Add more static exam data as needed
    ];

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: "اسم الامتحان",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text, record) => (
                <>
                    <Link to={`/exams/view/${record.id}`} className="text-dark">{record.name}</Link>
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
            title: "التاريخ",
            dataIndex: "date",
            render: (text, record) => (
                <>
                    {record.date}
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
                            <i className="feather-delete">
                                <FeatherIcon icon="eye" />
                            </i>
                        </Link>
                        <Link to={`/exams/edit/${record.id}`} className="btn btn-sm bg-danger-light">
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
                                        <h3 className="page-title">الامتحانات</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/exams">الامتحانات</Link></li>
                                            <li className="breadcrumb-item active">جميع الامتحانات</li>
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
                                                    <h3 className="page-title">الامتحانات</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تصدير
                                                    </Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/admins/exams/create" className="btn btn-primary">
                                                        <i className="fas fa-plus" /> اضافة امتحان
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <Table
                                                pagination={{
                                                    total: dataSource.length,
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
            </div>
            {/* /Main Wrapper */}
        </>
    );
};

export default ListExams;
