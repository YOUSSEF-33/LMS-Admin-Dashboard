import React from 'react'
import { useState,useEffect } from 'react'
import FeatherIcon from "feather-icons-react";
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'
import { pagination, Table } from "antd"
import { onShowSizeChange, itemRender } from "../../Pagination"
import Header from '../../Header/Header'
import SideBar from '../../SideBar/SideBar'
import { avatar04, avatar06, avatar08, avatar10, avatar11, invoicesicon1, invoicesicon2, invoicesicon3, invoicesicon4, invoicesicon5 } from '../../imagepath'

const InvoicePaid = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const datasource =
        [
            {
                id:"1",
                Invoicenumber: "IN093439#@09",
                Createdon: "16 Mar 2022",
                Img: avatar04,
                Invoiceto: "Barbara Moore",
                Amount: "$1,54,220",
                Paidon: "23 Mar 2022",
                Status: "Paid",
                Action: ""
            },
            {
                id:"2",
                Invoicenumber: "IN093439#@10",
                Createdon: "14 Mar 2022",
                Img: avatar06,
                Invoiceto: "Karlene Chaidez",
                Amount: "$1,222",
                Paidon: "18 Mar 2022",
                Status: "Paid",
                Action: ""
            },
            {
                id:"3",
                Invoicenumber: "IN093439#@11",
                Createdon: "7 Mar 2022",
                Img: avatar08,
                Invoiceto: "Russell Copeland",
                Amount: "$3,470",
                Paidon: "10 Mar 2022",
                Status: "Paid",
                Action: ""
            },
            {
                id:"4",
                Invoicenumber: "IN093439#@12",
                Createdon: "24 Mar 2022",
                Img: avatar10 ,
                Invoiceto: "Joseph Collins",
                Amount: "$8,265",
                Paidon: "30 Mar 2022",
                Status: "Paid",
                Action: ""
            },
            {
                id:"5",
                Invoicenumber: "IN093439#@13",
                Createdon: "17 Mar 2022",
                Img: avatar11,
                Invoiceto: "Jennifer Floyd",
                Amount: "$5,200",
                Paidon: "20 Mar 2022",
                Status: "Paid",
                Action: ""
            }
        ]
    console.log(datasource);
    const column = [
        {
            title: "Invoice number",
            dataIndex: "Invoicenumber",
            render: (text,record) => (
                <>
                  <Link to="/viewinvoice">{record.Invoicenumber}</Link>
                </>
            ),
            sorter: (a, b) => a.Invoicenumber.length - b.Invoicenumber.length
        },
        {
            title: "Created on",
            dataIndex: "Createdon",
            sorter: (a, b) => a.Createdon.length - b.Createdon.length
        },
        {
            title: "Invoiceto",
            dataIndex: "Invoiceto",
            render: (text, record) => (
                <>
                    <h2 className="table-avatar">
                        <Link to="/profile" className="avatar avatar-sm me-2">
                            <img
                                className="avatar-img rounded-circle"
                                src={record.Img}
                                alt="User Image"
                            />
                        </Link>
                        <Link className='text-dark' to="/profile">{record.Invoiceto}</Link>
                    </h2>

                </>
            )
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            render: (text,record) => (
                <>
                  <Link to="#">{record.Amount}</Link>
                </>
            ),
            sorter: (a, b) => a.Amount.length - b.Amount.length
        },
        {
            title: "Paid on",
            dataIndex: "Paidon",
            sorter: (a, b) => a.Paidon.length - b.Paidon.length
        },
        {
            title: "Status",
            dataIndex: "Status",
            sorter: (a, b) => a.Status.length - b.Status.length,
        },
        {
            title: "Action",
            dataIndex: "Action",
            render: (text, record) => (
                <>
                <Link
                  to="/editinvoice"
                  className="btn btn-sm btn-white text-success me-2 invoive-edit"
                >
                  <i className="far fa-edit me-1" /> Edit
                </Link>
                <Link
                  className="btn btn-sm btn-white text-danger"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_paid"
                >
                  <i className="far fa-trash-alt me-1" />
                  Delete
                </Link>
              </>
            )
        },

    ]

    const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [show3, setShow3] = useState(false);
	const [menu, setMenu] = useState(false)
	const [date, setDate] = useState(new Date());

	const toggleSetShow = (value) => {
		setShow(value)
		setShow1(false)
		setShow2(false)
		setShow3(false)
	  }
	  const toggleSetShowone = (value) => {
		setShow(false)
		setShow1(value)
		setShow2(false)
		setShow3(false)
	  }
	  const toggleSetShowtwo = (value) => {
		setShow(false)
		setShow1(false)
		setShow2(value)
		setShow3(false)
	  }
	  const toggleSetShowthree = (value) => {
		setShow(false)
		setShow1(false)
		setShow2(false)
		setShow3(value)
	  }
	const toggleMobileMenu = () => {
		setMenu(!menu)
	  }
	  useEffect(() => {
        let elements = Array.from(document.getElementsByClassName('react-datepicker-wrapper'));
        elements.map(element => element.classList.add("width-100"))
	},[]);

    const handleChange = (date) => {
        setDate(date);
    };
	
	const [options, setOptions] = useState([
		{ id: 1, text: 'Select Status' },
		{ id: 2, text: 'Draft' },
		{ id: 3, text: 'Sent' },
		{ id: 4, text: 'Viewed' },
		{ id: 5, text: 'Expired' },
		{ id: 6, text: 'Accepted' },
		{ id: 7, text: 'Rejected' }
	]);
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
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title">Invoices</h3>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="/invoicelist">Invoice</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Invoices Paid</li>
                                    </ul>
                                </div>
                                <div className="col-auto">
                                    <Link to="/invoicelist" className="invoices-links active">
                                        <i className="feather feather-list">
                                            <FeatherIcon icon="list" className="invoice-list"/>
                                        </i>
                                    </Link>
                                    <Link to="/invoicegrid" className="invoices-links">
                                        <i className="feather feather-grid">
                                            <FeatherIcon icon="grid" className="invoice-grid"/>
                                        </i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* /Page Header */}
                        {/* Report Filter */}
                        <div className="card report-card">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="app-listing">
                                            <li>
                                                <div className="multipleSelection">
                                                    <div className="selectBox" onClick={() => toggleSetShow(!show)} >
                                                        <p class="mb-0"><i class="fas fa-user-plus me-1 select-icon"></i> Select User</p>
                                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                                     </div>
                                                    <div id="checkBoxes" style={{ display: show ? "block" : "none" }}>
                                                        <form action="#">
                                                            <p className="checkbox-title">Customer Search</p>
                                                            <div className="form-custom">
                                                                <input type="text" className="form-control bg-grey" placeholder="Enter Customer Name" />
                                                            </div>
                                                            <div className="selectBox-cont">
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span>  Brian Johnson
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span>  Russell Copeland
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span>  Greg Lynch
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span> John Blair
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span> Barbara Moore
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span> Hendry Evan
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="username" />
                                                                    <span className="checkmark"></span> Richard Miles
                                                                </label>
                                                            </div>
                                                            <button type="submit" className="btn w-100 btn-primary">Apply</button>
                                                            <button type="reset" className="btn w-100 btn-grey">Reset</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="multipleSelection">
                                                    <div className="selectBox" onClick={() => toggleSetShowone(!show1)}>
                                                        <p class="mb-0"><i class="fas fa-calendar me-1 select-icon"></i> Select Date</p>
                                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                                    </div>
                                                    <div id="checkBoxes" style={{ display: show1 ? "block" : "none" }}>
                                                        <form action="#">
                                                            <p className="checkbox-title">Date Filter</p>
                                                            <div className="selectBox-cont selectBox-cont-one h-auto">
                                                                <div className="date-picker">
                                                                    <div className="form-custom cal-icon">
                                                                        <DatePicker selected={date} onChange={handleChange} className="form-control datetimepicker" />
                                                                    </div>
                                                                </div>
                                                                <div className="date-picker pe-0">
                                                                    <div className="form-custom cal-icon">
                                                                        <DatePicker selected={date} onChange={handleChange} className="form-control datetimepicker" />
                                                                    </div>
                                                                </div>
                                                                <div className="date-list">
                                                                    <ul>
                                                                        <li><Link to="#" className="btn date-btn">Today</Link ></li>
                                                                        <li><Link to="#" className="btn date-btn">Yesterday</Link ></li>
                                                                        <li><Link to="#" className="btn date-btn">Last 7 days</Link ></li>
                                                                        <li><Link to="#" className="btn date-btn">This month</Link ></li>
                                                                        <li><Link to="#" className="btn date-btn">Last month</Link ></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="multipleSelection">
                                                    <div className="selectBox" onClick={() => toggleSetShowtwo(!show2)}>
                                                        <p class="mb-0"><i class="fas fa-book-open me-1 select-icon"></i> Select Status</p>
                                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                                    </div>
                                                    <div id="checkBoxes" style={{ display: show2 ? "block" : "none" }}>
                                                        <form action="#">
                                                            <p className="checkbox-title">By Status</p>
                                                            <div className="selectBox-cont">
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" defaultChecked />
                                                                    <span className="checkmark"></span> All Invoices
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" />
                                                                    <span className="checkmark"></span> Paid
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" />
                                                                    <span className="checkmark"></span> Overdue
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" />
                                                                    <span className="checkmark"></span> Draft
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" />
                                                                    <span className="checkmark"></span> Recurring
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="name" />
                                                                    <span className="checkmark"></span> Cancelled
                                                                </label>
                                                            </div>
                                                            <button type="submit" className="btn w-100 btn-primary">Apply</button>
                                                            <button type="reset" className="btn w-100 btn-grey">Reset</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="multipleSelection">
                                                    <div className="selectBox" onClick={() => toggleSetShowthree(!show3)}>
                                                        <p class="mb-0"><i class="fas fa-bookmark me-1 select-icon"></i> By Category</p>
                                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                                    </div>
                                                    <div id="checkBoxes" style={{ display: show3 ? "block" : "none" }}>
                                                        <form action="#">
                                                            <p className="checkbox-title">Category</p>
                                                            <div className="form-custom">
                                                                <input type="text" className="form-control bg-grey" placeholder="Enter Category Name" />
                                                            </div>
                                                            <div className="selectBox-cont">
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Advertising
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Food
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Marketing
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Repairs
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Software
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Stationary
                                                                </label>
                                                                <label className="custom_check w-100">
                                                                    <input type="checkbox" name="category" />
                                                                    <span className="checkmark"></span> Travel
                                                                </label>
                                                            </div>
                                                            <button type="submit" className="btn w-100 btn-primary">Apply</button>
                                                            <button type="reset" className="btn w-100 btn-grey">Reset</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="report-btn">
                                                    <Link to="#" className="btn">
                                                        <img src={invoicesicon5} alt="" className="me-2" /> Generate report
                                                    </Link >
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Report Filter */}
                        <div className="card invoices-tabs-card border-0">
                            <div className="card-body card-body pt-0 pb-0">
                                <div className="invoices-main-tabs">
                                    <div className="row align-items-center">
                                        <div className="col-lg-8 col-md-8">
                                            <div className="invoices-tabs">
                                                <ul>
                                                    <li>
                                                        <Link to="/invoicelist">All Invoice</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/invoicepaid" className="active">
                                                            Paid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/invoiceoverdue">Overdue</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/invoicedraft">Draft</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/invoicerecurring">Recurring</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/invoicecancelled">Cancelled</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="invoices-settings-btn">
                                                <Link
                                                    to="/invoicesettings"
                                                    className="invoices-settings-icon"
                                                >
                                                    <i className="feather feather-settings" />
                                                </Link>
                                                <Link to="/addinvoice" className="btn">
                                                <i className="feather feather-plus-circle" >
                                                        <FeatherIcon icon="plus-circle" />
                                                    </i> New Invoice
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card inovices-card">
                                    <div className="card-body">
                                        <div className="inovices-widget-header">
                                            <span className="inovices-widget-icon">
                                                <img src={invoicesicon1} alt="" />
                                            </span>
                                            <div className="inovices-dash-count">
                                                <div className="inovices-amount">$8,78,797</div>
                                            </div>
                                        </div>
                                        <p className="inovices-all">
                                            All Invoices <span>50</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card inovices-card">
                                    <div className="card-body">
                                        <div className="inovices-widget-header">
                                            <span className="inovices-widget-icon">
                                                <img src={invoicesicon2} alt="" />
                                            </span>
                                            <div className="inovices-dash-count">
                                                <div className="inovices-amount">$4,5884</div>
                                            </div>
                                        </div>
                                        <p className="inovices-all">
                                            Paid Invoices <span>60</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card inovices-card">
                                    <div className="card-body">
                                        <div className="inovices-widget-header">
                                            <span className="inovices-widget-icon">
                                                <img src={invoicesicon3} alt="" />
                                            </span>
                                            <div className="inovices-dash-count">
                                                <div className="inovices-amount">$2,05,545</div>
                                            </div>
                                        </div>
                                        <p className="inovices-all">
                                            Unpaid Invoices <span>70</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card inovices-card">
                                    <div className="card-body">
                                        <div className="inovices-widget-header">
                                            <span className="inovices-widget-icon">
                                                <img src={invoicesicon4} alt="" />
                                            </span>
                                            <div className="inovices-dash-count">
                                                <div className="inovices-amount">$8,8,797</div>
                                            </div>
                                        </div>
                                        <p className="inovices-all">
                                            Cancelled Invoices <span>80</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card card-table">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table class="table table-stripped table-hover datatable thead-light "
                                                pagination={{
                                                    total: datasource.length,
                                                    showTotal: (total, range) =>
                                                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true,
                                                    onShowSizeChange: onShowSizeChange,
                                                    itemRender: itemRender,
                                                }}
                                                columns={column}
                                                dataSource={datasource}

                                                rowSelection={rowSelection}
                                                rowKey={(record) => record.id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Paid Modal */}
                <div className="modal custom-modal fade" id="delete_paid" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-header">
                                    <h3>Delete Invoice Paid</h3>
                                    <p>Are you sure want to delete?</p>
                                </div>
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <Link
                                                to="#"
                                                className="btn btn-primary paid-continue-btn w-100"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="#"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-cancel-btn w-100"
                                            >
                                                Cancel
                                            </Link>
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
    )
}

export default InvoicePaid
