import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Scrollbars from "react-custom-scrollbars-2";
import axiosInstance from "../../ApiService";
import { CheckPermission } from "../../utils/isPermissionFound";

const Sidebar = () => {
  const [isSideMenu, setSideMenu] = useState("");
  const [faculties, setFaculties] = useState([]);
  const location = useLocation();
  let pathName = location.pathname;

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };

  useEffect(() => {
    function handleMouseOver(e) {
      e.stopPropagation();
      if (document.body.classList.contains('mini-sidebar') && document.querySelector('#toggle_btn').offsetParent !== null) {
        var targ = e.target.closest('.sidebar');
        if (targ) {
          document.body.classList.add('expand-menu');
          document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'block');
        } else {
          document.body.classList.remove('expand-menu');
          document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'none');
        }
        return false;
      }
    }

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on('change', '.sidebar-type-four input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-eight');
        $('.sidebar-menu').addClass('sidebar-menu-eight');
        $('.menu-title').addClass('menu-title-eight');
        $('.header').addClass('header-eight');
        $('.header-left-two').addClass('header-left-eight');
        $('.user-menu').addClass('user-menu-eight');
        $('.dropdown-toggle').addClass('dropdown-toggle-eight');
        $('.white-logo').addClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
        $('.header-two .header-left-two .logo:not(.logo-small)').removeClass('hide-logo');
        $('.header-two .header-left-two .dark-logo').removeClass('show-logo');
      } else {
        $('.sidebar').removeClass('sidebar-eight');
        $('.sidebar-menu').removeClass('sidebar-menu-eight');
        $('.menu-title').removeClass('menu-title-eight');
        $('.header').removeClass('header-eight');
        $('.header-left-two').removeClass('header-left-eight');
        $('.user-menu').removeClass('user-menu-eight');
        $('.dropdown-toggle').removeClass('dropdown-toggle-eight');
        $('.white-logo').removeClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
      }
    });
  }, []);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axiosInstance.get("v1/admin/faculties");
        setFaculties(response.data.data.items);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const isPathActive = (path) => {
    return pathName.startsWith(path);
  };

  const renderMenuItem = (permission, path, icon, label, subMenu = null, activePath) => {
    if (!CheckPermission(permission)) return null;

    const isActive = isPathActive(activePath);

    return (
      <li className={`${isActive ? "active" : ""} ${subMenu ? "submenu" : ""}`}>
        <Link
          to={path}
          className={isSideMenu === label || isActive ? "subdrop" : ""}
          onClick={() => subMenu && toggleSidebar(isSideMenu === label ? "" : label)}
        >
          {icon} <span>{label}</span>
          {subMenu && <span className="menu-arrow" />}
        </Link>
        {subMenu && (isSideMenu === label || isActive) && (
          <ul style={{ display: "block" }}>
            {subMenu.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className={`${isPathActive(item.path) ? "active" : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>القائمة الرئيسية </span>
                </li>
                {renderMenuItem(
                  "view_dashboard",
                  "/",
                  <FeatherIcon icon="grid" />,
                  "Dashboard",
                  [
                    { path: "/", label: "Admin Dashboard" },
                    { path: "/teacherdashboard", label: "Teachers Dashboard" },
                    { path: "/studentdashboard", label: "Students Dashboard" },
                  ],
                  `/`
                )}
                {renderMenuItem(
                  "view_any_admin",
                  "#",
                  <i className="fas fa-graduation-cap" />,
                  "المشرفون",
                  [
                    { path: "/admins/list/view", label: "المشرفون" },
                    { path: "/admins/list/roles", label: "الصلاحيات" },
                  ],
                  "/admins/list"
                )}
                {renderMenuItem(
                  "view_any_teacher",
                  "#",
                  <i className="fas fa-graduation-cap" />,
                  "المدرسون",
                  [
                    { path: "/admins/teachers/view", label: "المدرسون" },
                    { path: "/admins/teachers/roles", label: "الصلاحيات" },
                  ],
                  "/admins/teachers"
                )}
                <li className="menu-title">
                  <span>اعلانات</span>
                </li>
                {renderMenuItem(
                  "view_any_faculty",
                  "/admin/announcements",
                  <FeatherIcon icon="bell" size={18} className="me-2" />,
                  "اعلانات",
                  null,
                  "/admin/announcements"
                )}
                <li className="menu-title">
                  <span>الكليات</span>
                </li>
                {renderMenuItem(
                  "view_any_faculty",
                  "/admin/all-faculties",
                  <i className="fas fa-university" />,
                  "كل الكليات",
                  null,
                  "/admin/all-faculties"
                )}
                {faculties?.map((faculty) => (
                  renderMenuItem(
                    `view_faculty`,
                    `#`,
                    <i key={faculty.id} className="fas fa-university" />,
                    faculty.name,
                    [
                      { path: `/admin/faculties/${faculty.id}/dashboard`, label: "لوحة التحكم" },
                      { path: `/admin/faculties/${faculty.id}/students`, label: "الطلاب" },
                      { path: `/admin/faculties/${faculty.id}/groups`, label: "المجموعات" },
                      { path: `/admin/faculties/${faculty.id}/courses`, label: "المقررات" },
                    ],
                    `/admin/faculties/${faculty.id}`
                  )
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default Sidebar;