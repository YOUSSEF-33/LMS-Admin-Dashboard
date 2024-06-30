import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

const Sidebar = () => {
  useEffect(() => {
    var Sidemenu = function () {
      this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
      var $this = Sidemenu;
      $('#sidebar-menu a').on('click', function (e) {
        if ($(this).parent().hasClass('submenu')) {
          e.preventDefault();
        }
        if (!$(this).hasClass('subdrop')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('subdrop');
          $(this).next('ul').slideDown(350);
          $(this).addClass('subdrop');
        } else if ($(this).hasClass('subdrop')) {
          $(this).removeClass('subdrop');
          $(this).next('ul').slideUp(350);
        }
      });
      $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }

    $(document).on('mouseover', function (e) {
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        var targ = $(e.target).closest('.sidebar').length;
        if (targ) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
        }
        return false;
      }
    });
    // Sidebar Initiate
    init();
  }, []);

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="100vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>القائمة الرئيسية</span>
                </li>
                <li className="submenu active">
                  <a><i className="fas fa-user-graduate"></i> <span> لوحة التحكم</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/dashboard" className="active">لوحة تحكم المشرف</Link></li>
                    <li><Link to="/teacherdashboard">لوحة تحكم المعلم</Link></li>
                    <li><Link to="/studentdashboard">لوحة تحكم الطالب</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-user-graduate"></i> <span> الطلاب</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/students">قائمة الطلاب</Link></li>
                    <li><Link to="/studentdetails">عرض الطالب</Link></li>
                    <li><Link to="/addstudents">إضافة طالب</Link></li>
                    <li><Link to="/editstudents">تعديل الطالب</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-chalkboard-teacher"></i> <span> المعلمين</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/teachers">قائمة المعلمين</Link></li>
                    <li><Link to="/teacherdetails">عرض المعلم</Link></li>
                    <li><Link to="/addteacher">إضافة معلم</Link></li>
                    <li><Link to="/Editteacher">تعديل المعلم</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-building"></i> <span> الأقسام</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/departments">قائمة الأقسام</Link></li>
                    <li><Link to="/adddepartment">إضافة قسم</Link></li>
                    <li><Link to="/Editdepartments">تعديل القسم</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-book-reader"></i> <span> المواد الدراسية</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/Subject">قائمة المواد</Link></li>
                    <li><Link to="/addsubject">إضافة مادة</Link></li>
                    <li><Link to="/editsubject">تعديل مادة</Link></li>
                  </ul>
                </li>
                <li className="menu-title">
                  <span>الإدارة</span>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-file-invoice-dollar"></i> <span> الحسابات</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/Feescollection">تحصيل الرسوم</Link></li>
                    <li><Link to="/expenses">المصروفات</Link></li>
                    <li><Link to="/salary">الراتب</Link></li>
                    <li><Link to="/addfeescollection">إضافة رسوم</Link></li>
                    <li><Link to="/addexpenses">إضافة مصروف</Link></li>
                    <li><Link to="/addsalary">إضافة راتب</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/holiday"><i className="fas fa-holly-berry"></i> <span>العطلات</span></Link>
                </li>
                <li>
                  <Link to="/fees"><i className="fas fa-comment-dollar"></i> <span>الرسوم</span></Link>
                </li>
                <li>
                  <Link to="/exam"><i className="fas fa-clipboard-list"></i> <span>قائمة الامتحانات</span></Link>
                </li>
                <li>
                  <Link to="/event"><i className="fas fa-calendar-day"></i> <span>الأحداث</span></Link>
                </li>
                <li>
                  <Link to="/timetable"><i className="fas fa-table"></i> <span>الجدول الزمني</span></Link>
                </li>
                <li>
                  <Link to="/library"><i className="fas fa-book"></i> <span>المكتبة</span></Link>
                </li>
                <li className="menu-title">
                  <span>الصفحات</span>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-shield-alt"></i> <span> التوثيق </span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/register">التسجيل</Link></li>
                    <li><Link to="/forgotpassword">نسيت كلمة المرور</Link></li>
                    <li><Link to="/Page404">صفحة الخطأ</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/Blankpage"><i className="fas fa-file"></i> <span>صفحة فارغة</span></Link>
                </li>
                <li className="menu-title">
                  <span>أخرى</span>
                </li>
                <li>
                  <Link to="/sports"><i className="fas fa-baseball-ball"></i> <span>الرياضة</span></Link>
                </li>
                <li>
                  <Link to="/hostel"><i className="fas fa-hotel"></i> <span>النزل</span></Link>
                </li>
                <li>
                  <Link to="/transport"><i className="fas fa-bus"></i> <span>النقل</span></Link>
                </li>
                <li className="menu-title">
                  <span>واجهة المستخدم</span>
                </li>
                <li>
                  <Link to="/components"><i className="fas fa-vector-square"></i> <span>المكونات</span></Link>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-columns"></i> <span> النماذج </span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/formbasicinputs">المدخلات الأساسية</Link></li>
                    <li><Link to="/forminputgroups">مجموعات المدخلات</Link></li>
                    <li><Link to="/formhorizontal">النموذج الأفقي</Link></li>
                    <li><Link to="/formvertical">النموذج العمودي</Link></li>
                    <li><Link to="/formmask"> قناع النموذج</Link></li>
                    <li><Link to="/formvalidation">تحقق النموذج</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-table"></i> <span> الجداول </span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link to="/tables-basic">الجداول الأساسية</Link></li>
                    <li><Link to="/datatable">جدول البيانات</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a><i className="fas fa-code"></i> <span>مستوى متعدد</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li className="submenu">
                      <a> <span>المستوى 1</span> <span className="menu-arrow"></span></a>
                      <ul>
                        <li><a><span>المستوى 2</span></a></li>
                        <li className="submenu">
                          <a> <span> المستوى 2</span> <span className="menu-arrow"></span></a>
                          <ul>
                            <li><a>المستوى 3</a></li>
                            <li><a>المستوى 3</a></li>
                          </ul>
                        </li>
                        <li><a> <span>المستوى 2</span></a></li>
                      </ul>
                    </li>
                    <li>
                      <a> <span>المستوى 1</span></a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
}

export default Sidebar;
