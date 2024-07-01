import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Table } from "antd";
import { img1, img10, img2, img3, img4, img5, img6, img7, img8, img9 } from "../../imagepath";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from "../../Pagination";

const StudentsList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const datasource = [
        {
            Id: "1",
            StudentId: "PRE2209",
            Name: "عالية",
            Img: img1,
            Class: "10 أ",
            DOB: "2 فبراير 2002",
            ParentName: "جيفري وونغ",
            MobileNumber: "097 3584 5870",
            Address: "911 دير ريدج درايف، الولايات المتحدة الأمريكية",
            Action: ""
        },
        {
            Id: "2",
            StudentId: "PRE2213",
            Name: "مالين",
            Img: img3,
            Class: "8 أ",
            DOB: "3 يونيو 2010",
            ParentName: "فيلدز مالين",
            MobileNumber: "242 362 3100",
            Address: "طريق باكاردي، صندوق بريد N-4880، نيو بروفيدنس",
            Action: ""
        },
        {
            Id: "3",
            StudentId: "PRE2143",
            Name: "ليفل سكوت",
            Img: img2,
            Class: "10 أ",
            DOB: "12 أبريل 2002",
            ParentName: "جيفري سكوت",
            MobileNumber: "026 7318 4366",
            Address: "صندوق بريد: 41، جابورون",
            Action: ""
        },
        {
            Id: "4",
            StudentId: "PRE2431",
            Name: "ميني",
            Img: img3,
            Class: "11 ج",
            DOB: "24 فبراير 2000",
            ParentName: "جي شافر",
            MobileNumber: "952 512 4909",
            Address: "4771 طريق أورال ليك، جولدن فالي",
            Action: ""
        },
        {
            Id: "5",
            StudentId: "PRE1534",
            Name: "لويس أ",
            Img: img4,
            Class: "10 أ",
            DOB: "22 يوليو 2006",
            ParentName: "كليري وونغ",
            MobileNumber: "413 289 1314",
            Address: "2844 طريق ليفرتون كوف، بالمر",
            Action: ""
        },
        {
            Id: "6",
            StudentId: "PRE2153",
            Name: "كالفن",
            Img: img5,
            Class: "9 ب",
            DOB: "8 ديسمبر 2003",
            ParentName: "ميني جي شافر",
            MobileNumber: "701 753 3810",
            Address: "1900 طريق هيدن ميدو، كريت",
            Action: ""
        },
        {
            Id: "7",
            StudentId: "PRE1252",
            Name: "جو كيلي",
            Img: img6,
            Class: "11 ج",
            DOB: "7 أكتوبر 2000",
            ParentName: "فينسنت هوارد",
            MobileNumber: "402 221 7523",
            Address: "3979 طريق أشوود، أوماها",
            Action: ""
        },
        {
            Id: "8",
            StudentId: "PRE1434",
            Name: "فينسنت",
            Img: img7,
            Class: "10 أ",
            DOB: "4 يناير 2002",
            ParentName: "كيلي جو",
            MobileNumber: "402 221 7523",
            Address: "3979 طريق أشوود، أوماها",
            Action: ""
        },
        {
            Id: "9",
            StudentId: "PRE2345",
            Name: "كوزما تاتاري",
            Img: img8,
            Class: "9 أ",
            DOB: "1 فبراير 2006",
            ParentName: "لومباردي",
            MobileNumber: "04 2239 968",
            Address: "طريق كافاجيس، مركز كوندور، تيرانا",
            Action: ""
        },
        {
            Id: "10",
            StudentId: "PRE2365",
            Name: "جون تشامبرز",
            Img: img9,
            Class: "11 ب",
            DOB: "13 سبتمبر 2003",
            ParentName: "وونغ جيفري",
            MobileNumber: "870 663 2334",
            Address: "4667 طريق صنست، باين بلاف",
            Action: ""
        },
        {
            Id: "11",
            StudentId: "PRE1234",
            Name: "ناثان همفريز",
            Img: img10,
            Class: "10 ب",
            DOB: "26 أبريل 1994",
            ParentName: "ستيفن مارلي",
            MobileNumber: "077 3499 9959",
            Address: "86 طريق لامفي، ثيلنيثام",
            Action: ""
        }
    ];

    const columns = [
        {
            title: "الرقم",
            dataIndex: "StudentId",
            sorter: (a, b) => a.StudentId.length - b.StudentId.length
        },
        {
            title: "الاسم",
            dataIndex: "Name",
            sorter: (a, b) => a.Name.length - b.Name.length,
            render: (text, record) => (
                <>
                    <h2 className="table-avatar">
                        <Link to="/studentsview" className="avatar avatar-sm me-2">
                            <img
                                className="avatar-img rounded-circle"
                                src={record.Img}
                                alt="User Image"
                            />
                        </Link>
                        <Link className='text-dark' to="/studentsview">{record.Name}</Link>
                    </h2>
                </>
            )
        },
        {
            title: "الصف",
            dataIndex: "Class",
            sorter: (a, b) => a.Class.length - b.Class.length
        },
        {
            title: "تاريخ الميلاد",
            dataIndex: "DOB",
            sorter: (a, b) => a.DOB.length - b.DOB.length
        },
        {
            title: "اسم الوالد",
            dataIndex: "ParentName",
            sorter: (a, b) => a.ParentName.length - b.ParentName.length
        },
        {
            title: "رقم الهاتف",
            dataIndex: "MobileNumber",
            sorter: (a, b) => a.MobileNumber.length - b.MobileNumber.length
        },
        {
            title: "العنوان",
            dataIndex: "Address",
            sorter: (a, b) => a.Address.length - b.Address.length
        },
        {
            title: "الإجراءات",
            dataIndex: "Action",
            render: (text, record) => (
                <>
                    <div className="actions">
                        <Link to="#" className="btn btn-sm bg-success-light me-2">
                            <i className="feather-eye">
                                <FeatherIcon icon="eye" />
                            </i>
                        </Link>
                        <Link to="/editstudent" className="btn btn-sm bg-danger-light">
                            <i className="feather-edit">
                                <FeatherIcon icon="edit" className="list-edit" />
                            </i>
                        </Link>
                    </div>
                </>
            )
        },
    ];

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
                                        <h3 className="page-title">الطلاب</h3>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/students">الطلاب</Link></li>
                                            <li className="breadcrumb-item active">جميع الطلاب</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="البحث بواسطة الرقم ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="البحث بواسطة الاسم ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="البحث بواسطة الهاتف ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="search-student-btn">
                                        <button type="btn" className="btn btn-primary">
                                            بحث
                                        </button>
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
                                                    <h3 className="page-title">الطلاب</h3>
                                                </div>
                                                <div className="col-auto text-end float-end ms-auto download-grp">
                                                    <Link
                                                        to="/students"
                                                        className="btn btn-outline-gray me-2 active"
                                                    >
                                                        <FeatherIcon className="feather-list" icon="list" />
                                                    </Link>
                                                    <Link
                                                        to="/studentgrid"
                                                        className="btn btn-outline-gray me-2"
                                                    >
                                                        <FeatherIcon className="feather-grid" icon="grid" />
                                                    </Link>
                                                    <Link to="#" className="btn btn-outline-primary me-2">
                                                        <i className="fas fa-download" /> تنزيل
                                                    </Link>
                                                    <Link to="/addstudent" className="btn btn-primary">
                                                        <i className="fas fa-plus" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <Table
                                                pagination={{
                                                    total: datasource.length,
                                                    showTotal: (total, range) =>
                                                        `عرض ${range[0]} إلى ${range[1]} من ${total} إدخالات`,
                                                    showSizeChanger: true,
                                                    onShowSizeChange: onShowSizeChange,
                                                    itemRender: itemRender,
                                                }}
                                                columns={columns}
                                                dataSource={datasource}
                                                rowSelection={rowSelection}
                                                rowKey={(record) => record.Id}
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

export default StudentsList;
