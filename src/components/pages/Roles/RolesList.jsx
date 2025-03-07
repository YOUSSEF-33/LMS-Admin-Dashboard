import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance, { fetchRoles } from '../../../ApiService'; // Ensure fetchRoles is properly imported
import SideBar from '../../SideBar/SideBar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Table, Modal, message } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const RolesList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);
    
    const fetchData = async (page, limit) => {
        try {
            const data = await fetchRoles(limit, page); // Use the fetchRoles function from your API service
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                //setPagination({ ...pagination, total: data.data.total });
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching roles data:', error);
        }
    };

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
        setPagination(pagination);
    };

    const handleDelete = (roleId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this role?',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/roles/${roleId}`);
                    message.success('Role deleted successfully');
                    fetchData(pagination.current, pagination.pageSize);
                } catch (error) {
                    console.error('Error deleting role:', error);
                    message.error('Failed to delete role');
                }
            },
        });
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "name",
            sorter: (a, b) => a.translations.readable_name.ar.length - b.translations.readable_name.ar.length,
            render: (text, record) => (
                <>
                    <Link to={`/roles/view/${record.id}`} className="text-dark">{record.translations.readable_name.ar}</Link>
                </>
            )
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            render: (text, record) => (
                <>
                    <div className="actions">
                        <Link onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light me-2">
                            <i className="feather-trash">
                                <FeatherIcon size={14} icon="trash" />
                            </i>
                        </Link>
                        <Link to={`/roles/edit/${record.id}`} className="btn btn-sm bg-danger-light">
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
                {/* Page Wrapper */}
                <div className="">
                    <div className="content container-fluid">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">الأدوار</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/roles">الأدوار</Link></li>
                                            <li className="breadcrumb-item active">جميع الأدوار</li>
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
                                                    <h3 className="page-title">الأدوار</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تصدير
                                                    </Link>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/admins/roles/create" className="btn btn-primary">
                                                        <i className="fas fa-plus" /> اضافة دور
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
            </div>
            {/* /Main Wrapper */}
        </>
    );
};

export default RolesList;
