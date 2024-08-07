import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../ApiService'; // Ensure this path is correct
import { Table, Modal } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { itemRender } from "../../Pagination";

const ListAnnouncements = () => {
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
            const response = await axiosInstance.get(`v1/admin/announcements?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching announcements data:', error);
            setError("حدث خطأ أثناء جلب بيانات الإعلانات. الرجاء المحاولة لاحقاً.");
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
            title: 'هل أنت متأكد من حذف هذا الإعلان؟',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/announcements/${recordId}`);
                    setDataSource(prevData => prevData.filter(item => item.id !== recordId));
                } catch (error) {
                    console.error('Error deleting announcement:', error);
                    setError("حدث خطأ أثناء حذف الإعلان. الرجاء المحاولة لاحقاً.");
                }
            },
        });
    };

    const columns = [
        {
            title: "العنوان",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <Link to={`/announcements/${record.id}`} className="text-dark">
                    {text}
                </Link>
            )
        },
        {
            title: "المحتوى",
            dataIndex: "content",
            key: "content",
            render: (text) => text.length > 50 ? `${text.substring(0, 50)}...` : text
        },
        {
            title: "عدد الصور",
            dataIndex: "gallery",
            key: "gallery",
            render: (gallery) => gallery.length
        },
        {
            title: "الإجراءات",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <div className="actions">
                    <Link onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light me-2">
                        <FeatherIcon icon="trash" size={16} />
                    </Link>
                    <Link to={`/admin/announcements/${record.id}/edit`} className="btn btn-sm bg-danger-light">
                        <FeatherIcon icon="edit" size={16} />
                    </Link>
                </div>
            )
        },
    ];

    return (
        <>
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">الإعلانات</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">لوحة التحكم</Link></li>
                                <li className="breadcrumb-item active">الإعلانات</li>
                            </ul>
                        </div>
                        <div className="col-auto text-end float-end ms-auto download-grp">
                            <Link to="create" className="btn btn-primary">
                                <i className="fas fa-plus" /> إضافة إعلان
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card card-table">
                            <div className="card-body">
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
        </>
    );
};

export default ListAnnouncements;