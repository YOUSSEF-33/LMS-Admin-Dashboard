import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Scrollbars from "react-custom-scrollbars-2";
import axiosInstance from "../../ApiService"; // Adjust the import according to your project structure
import { CheckPermission } from "../../utils/isPermissionFound"; // Adjust the import according to your project structure

const Sidebar = () => {
  const [isSideMenu, setSideMenu] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [hasFacultyPermission, setHasFacultyPermission] = useState(false);

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
    $(document).on('change', '.sidebar-type-four input', function() {
	    if($(this).is(':checked')) {
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

  const location = useLocation();
  let pathName = location.pathname;

  useEffect(() => {
    // Fetch faculties from API
    const fetchFaculties = async () => {
      try {
        const response = await axiosInstance.get("v1/admin/faculties"); // Adjust the endpoint according to your API
        setFaculties(response.data.data.items);
        //console.log(response.data)
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
    setHasFacultyPermission(CheckPermission("view_any_faculty"));
  }, []);

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
                  <span>Main Menu</span>
                </li>
                <li
                  className={`${
                    "/" === pathName ||
                    "/teacherdashboard" === pathName ||
                    "/studentdashboard" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu === "index" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu === "index" ? "" : "index")
                    }
                  >
                    <FeatherIcon icon="grid" /> <span>Dashboard</span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu === "index" ? (
                    <ul
                      style={{
                        display: isSideMenu === "index" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/"
                          className={`${
                            "/" === pathName ? "active" : ""
                          }`}
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/teacherdashboard"
                          className={`${
                            "/teacherdashboard" === pathName ? "active" : ""
                          }`}
                        >
                          Teachers Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/studentdashboard"
                          className={`${
                            "/studentdashboard" === pathName ? "active" : ""
                          }`}
                        >
                          Students Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/admins" === pathName ||
                    "/studentview" === pathName ||
                    "/admins/create" === pathName ||
                    "/editadmin" === pathName ||
                    "/admins/roles" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu === "Admins" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu === "Admins" ? "" : "Admins")
                    }
                  >
                    <i className="fas fa-graduation-cap" />{" "}
                    <span> المشرفون</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu === "Admins" ? (
                    <ul
                      style={{
                        display: isSideMenu === "Admins" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/admins"
                          className={`${
                            "/admins" === pathName ? "active" : ""
                          }`}
                        >
                          المشرفون
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admins/roles"
                          className={`${
                            "/admins/roles" === pathName ? "active" : ""
                          }`}
                        >
                          الصلاحيات
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/admins/teachers" === pathName ||
                    "/admins/teachers/create" === pathName ||
                    "/admins/teacher/edit/:id" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu === "Teachers" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu === "Teachers" ? "" : "Teachers")
                    }
                  >
                    <i className="fas fa-graduation-cap" />{" "}
                    <span> المدرسون</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu === "Teachers" ? (
                    <ul
                      style={{
                        display: isSideMenu === "Teachers" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/admins/teachers"
                          className={`${
                            "/admins/teachers" === pathName ? "active" : ""
                          }`}
                        >
                          المدرسون
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="menu-title">
                  <span>الكليات</span>
                </li>
                {hasFacultyPermission && (
                  <li className={`submenu ${isSideMenu === `all_faculties` ? "active" : ""}`}>
                    <Link
                      to="/admin/faculties"
                      className={isSideMenu === `all_faculties` ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu === `all_faculties` ? "" : `all_faculties`)
                      }
                    >
                      <i className="fas fa-university" /> <span>كل الكليات</span>
                    </Link>
                  </li>
                )}
                {faculties?.map((faculty) => (
                  <li
                    key={faculty.id}
                    className={`submenu ${isSideMenu === `faculty_${faculty.id}` ? "active" : ""}`}
                  >
                    <Link
                      className={isSideMenu === `faculty_${faculty.id}` ? "subdrop" : ""}
                      onClick={() =>
                        toggleSidebar(isSideMenu === `faculty_${faculty.id}` ? "" : `faculty_${faculty.id}`)
                      }
                    >
                      <i className="fas fa-university" /> <span>{faculty.name}</span> <span className="menu-arrow" />
                    </Link>
                    {isSideMenu === `faculty_${faculty.id}` && (
                      <ul style={{ display: "block" }}>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/dashboard`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/dashboard` ? "active" : ""}`}
                          >
                            لوحة التحكم
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/students`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/students` ? "active" : ""}`}
                          >
                            الطلاب
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/groups`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/groups` ? "active" : ""}`}
                          >
                            المجموعات
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/assignments`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/assignments` ? "active" : ""}`}
                          >
                            الواجبات
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/exams`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/exams` ? "active" : ""}`}
                          >
                            الامتحانات
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/admin/faculties/${faculty.id}/courses`}
                            className={`${pathName === `/admin/faculties/${faculty.id}/courses` ? "active" : ""}`}
                          >
                            الكورسات
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
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
