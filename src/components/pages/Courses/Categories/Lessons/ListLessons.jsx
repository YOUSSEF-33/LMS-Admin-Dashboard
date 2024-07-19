import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../../../ApiService';
import { Table, Modal, message } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../../../Pagination";
import moment from 'moment';
import { CheckPermission } from '../../../../../utils/isPermissionFound';

const ListLessons = () => {
    const { courseId, categoryId } = useParams();
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
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching lessons data:', error);
            setError("حدث خطأ أثناء جلب بيانات الدروس. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذا الدرس',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${id}`);
                    setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id));
                    message.success('تم حذف الدرس بنجاح');
                } catch (error) {
                    setError("فشل في حذف هذا الدرس");
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
            key: "title",
            render: (text, record) => (
                <Link to={`/courses/${courseId}/categories/${categoryId}/lessons/${record.id}/view`} className="text-dark">
                    {record.translations.title.ar}
                </Link>
            )
        },
        {
            title: "الوصف",
            dataIndex: "translations",
            key: "description",
            render: (text, record) => (
                <span>{record.translations.description.ar}</span>
            )
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
                    {CheckPermission("view_lesson") &&
                        <Link to={`/courses/${courseId}/categories/${categoryId}/lessons/${record.id}/view`} className="btn btn-sm btn-rounded bg-primary-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon="eye" size="16" />
                        </Link>
                    }
                    {CheckPermission("edit_lesson") ?
                        <Link to={`${record.id}/edit`} className="btn btn-sm bg-success-light me-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="feather-edit">
                                <FeatherIcon icon="edit" size="16" />
                            </i>
                        </Link> :
                        <div></div>
                    }
                    {CheckPermission("delete_lesson") ?
                        <Link onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light me-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="feather-trash">
                                <FeatherIcon icon="trash" size="16" />
                            </i>
                        </Link> :
                        <div></div>
                    }
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
            <div className="">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page-sub-header">
                                    <h3 className="page-title">الدروس</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to={`/courses/${courseId}/categories/${categoryId}`}>الفئات</Link></li>
                                        <li className="breadcrumb-item active">جميع الدروس</li>
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
                                                <h3 className="page-title">الدروس</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <Link to="#" className="btn btn-outline-primary me-2">
                                                    <i className="fas fa-download" /> تصدير
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <Link to={`create`} className="btn btn-primary">
                                                    <i className="fas fa-plus" /> اضافة درس
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

export default ListLessons;
