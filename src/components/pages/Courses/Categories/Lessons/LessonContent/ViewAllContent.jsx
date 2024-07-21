import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../../../../../ApiService';
import { Button, Collapse, message, Spin, Modal } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { CheckPermission } from '../../../../../../utils/isPermissionFound';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Panel } = Collapse;

const ListLessonContents = () => {
    const { courseId, categoryId, lessonId } = useParams();
    const [lesson, setLesson] = useState({});
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLessonDetails();
        fetchLessonContents();
    }, []);

    const fetchLessonDetails = async () => {
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}`);
            setLesson(response.data.data);
        } catch (error) {
            console.error('Error fetching lesson details:', error);
            setError("حدث خطأ أثناء جلب بيانات الدرس. الرجاء المحاولة لاحقاً.");
        }
    };

    const fetchLessonContents = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}/contents`);
            setContents(response.data.data.items);
        } catch (error) {
            console.error('Error fetching lesson contents:', error);
            setError("حدث خطأ أثناء جلب بيانات المحتويات. الرجاء المحاولة لاحقاً.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContent = async (contentId) => {
        Modal.confirm({
            title: 'هل انت متأكد بأنك تريد حذف هذا المحتوى',
            content: 'يمكنك عدم تنفيذ هذا',
            okText: 'حذف',
            okType: 'danger',
            cancelText: 'تراجع',
            onOk: async () => {
                try {
                    await axiosInstance.delete(`v1/admin/courses/${courseId}/content-categories/${categoryId}/lessons/${lessonId}/contents/${contentId}`);
                    setContents(prevContents => prevContents.filter(content => content.id !== contentId));
                    message.success('تم حذف المحتوى بنجاح');
                } catch (error) {
                    setError("فشل في حذف هذا المحتوى");
                }
            }
        });
    };

    const renderContent = (content) => {
        if (content.type === "FILE" && content.content_attachments.length > 0) {
            return content.content_attachments.map((attachment) => {
                const fileTypes = ["pdf", "docx", "pptx", "jpg", "jpeg", "png"];
                const fileExtension = attachment.url.split('.').pop().toLowerCase();

                return (
                    <div key={attachment.id}>
                        {fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ? (
                            <img src={attachment.url} alt={attachment.name} style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <iframe
                                src={`https://docs.google.com/gview?url=${attachment.url}&embedded=true`}
                                style={{ width: '100%', height: '500px' }}
                                frameBorder="0"
                            ></iframe>
                        )}
                        <a href={attachment.url} download className="btn btn-primary mt-2">
                            <FeatherIcon icon="download" /> تحميل
                        </a>
                    </div>
                );
            });
        }
        return (
            <>
                <div className="input-group" style={{ position: 'relative' }}>
                    <input type="text" readOnly value={content.content} className="form-control relative" style={{ paddingRight: '40px' }} />
                    <CopyToClipboard text={content.content}>
                        <Button
                            icon={<FeatherIcon icon="copy" />}
                            onClick={() => message.success('تم نسخ الرابط بنجاح')}
                            style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)' }}
                        />
                    </CopyToClipboard>
                </div>
                <Button type="link" href={content.content} target="_blank" style={{ marginLeft: '10px' }}>
                    الانتقال إلى الرابط
                </Button>
            </>
        );
    };

    return (
        <div className="content container-fluid">
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">{lesson.translations?.title?.ar}</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/courses/${courseId}/categories/${categoryId}`}>الفئات</Link></li>
                            <li className="breadcrumb-item"><Link to={`/courses/${courseId}/categories/${categoryId}/lessons`}>الدروس</Link></li>
                            <li className="breadcrumb-item active">تفاصيل الدرس</li>
                        </ul>
                    </div>
                    <div className="col-auto text-end float-end ms-auto">
                        {CheckPermission("create_course_content_category") && (
                            <Link to={`create`} className="btn btn-primary">
                                <FeatherIcon icon="plus" /> إضافة محتوى
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Spin spinning={loading}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="المرفقات" key="1">
                        <Collapse accordion>
                            {contents.map(content => (
                                <Panel
                                    header={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{content.title}</span>
                                            <div className="actions d-flex">
                                                {CheckPermission("edit_course_content_category") && (
                                                    <Link to={`${content.id}/edit`} className="btn btn-sm bg-success-light me-2 rounded-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FeatherIcon icon="edit" size="16" />
                                                    </Link>
                                                )}
                                                {CheckPermission("delete_course_content_category") && (
                                                    <Button onClick={() => handleDeleteContent(content.id)} className="btn btn-sm bg-danger-light me-2 rounded-full" style={{ padding: '2px 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FeatherIcon icon="trash" size="16" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    }
                                    key={content.id}
                                >
                                    <p>{content.description}</p>
                                    {renderContent(content)}
                                </Panel>
                            ))}
                        </Collapse>
                    </Panel>
                </Collapse>
            </Spin>
        </div>
    );
};

export default ListLessonContents;
