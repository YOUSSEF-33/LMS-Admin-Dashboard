import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure axiosInstance is properly imported
import { Table, Modal, message } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const GroupsList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);
    
    const fetchData = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/v1/admin/groups?limit=${limit}&page=${page}`);
            const data = response.data.data;
            if (Array.isArray(data.items)) {
                setDataSource(data.items);
                setPagination({ ...pagination, total: data.total });
            } else {
                console.error('API response is not an array', data);
            }
        } catch (error) {
            console.error('Error fetching groups data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
        setPagination(pagination);
    };

    const handleDelete = (groupId) => {
        Modal.confirm({
            title: 'هل أنت متأكد أنك تريد حذف هذه المجموعة؟',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`/v1/admin/groups/${groupId}`);
                    message.success('تم حذف المجموعة بنجاح');
                    fetchData(pagination.current, pagination.pageSize);
                } catch (error) {
                    console.error('Error deleting group:', error);
                    message.error('فشل في حذف المجموعة');
                }
            },
        });
    };

    const columns = [
        {
            title: "الاسم",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text, record) => (
                <Link to={`/groups/view/${record.id}`} className="text-dark">{record.name}</Link>
            )
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
                            to={`/admin/faculties/${id}/groups/${record.id}/edit`}
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
            <div className="">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-sub-header">
                                <h3 className="page-title">المجموعات</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/groups">المجموعات</Link></li>
                                    <li className="breadcrumb-item active">جميع المجموعات</li>
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
                                            <h3 className="page-title">المجموعات</h3>
                                        </div>
                                        <div className="col-auto text-end float-end ms-auto download-grp">
                                            <Link to="#" className="btn btn-outline-primary me-2">
                                                <i className="fas fa-download" /> تصدير
                                            </Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={`/admin/faculties/${id}/groups/create`} className="btn btn-primary">
                                                <i className="fas fa-plus" /> إضافة مجموعة
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

export default GroupsList;
