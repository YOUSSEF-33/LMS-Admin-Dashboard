import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../../ApiService'; // Ensure this path is correct
import { Modal, Table } from "antd";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../../Pagination";
import moment from 'moment';

const ListCategory = () => {
    const { id, courseId, categoryId } = useParams();
    const facultyId = id;
    console.log(facultyId, courseId)
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
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories?limit=${limit}&page=${page}`);
            const data = response.data;
            if (Array.isArray(data.data.items)) {
                setDataSource(data.data.items);
                //setPagination(prev => ({ ...prev, total: data.data.total, current: page, pageSize: limit }));
            } else {
                console.error('API response is not an array', data.data);
            }
        } catch (error) {
            console.error('Error fetching categories data:', error);
            setError("حدث خطأ أثناء جلب بيانات الفئات. الرجاء المحاولة لاحقاً.");
        } finally {
            fetchFlag.current = false;
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذه الفئة',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/courses/${courseId}/content-categories/${id}`);
                    setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id));
                } catch (error) {
                    setError("فشل في حذف هذه الفئة");
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
            title: "العنوان",
            dataIndex: "translations",
            key: "title",
            render: (text, record) => (
                <Link to={`/categories/${record.id}/dashboard`} className="text-dark">
                    {record.translations.title.ar}
                </Link>
            )
        },
        {
            title: "الوصف",
            dataIndex: "translations",
            key: "description",
            render: (text, record) => record.translations.description.ar
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
                <div className="actions" style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/admin/faculties/${facultyId}/courses/${courseId}/categories/${record.id}/lessons`} className="btn btn-sm btn-rounded bg-primary-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FeatherIcon icon="eye" size="16" />
                    </Link>
                    <Link to={`${record.id}/edit`} className="btn btn-sm bg-success-light me-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FeatherIcon icon="edit" size="16" />
                    </Link>
                    <Link onClick={() => handleDelete(record.id)} className="btn btn-sm bg-danger-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FeatherIcon icon="trash" size="16" />
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
                                    <h3 className="page-title">الفئات</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/categories">الفئات</Link></li>
                                        <li className="breadcrumb-item active">جميع الفئات</li>
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
                                                <h3 className="page-title">الفئات</h3>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <Link to="#" className="btn btn-outline-primary me-2">
                                                    <i className="fas fa-download" /> تصدير
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <Link to={`create`} className="btn btn-primary">
                                                    <i className="fas fa-plus" /> اضافة فئة
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

export default ListCategory;
