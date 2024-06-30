import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = () => {
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenuLevel, setSideMenuLevel] = useState("");
  const [isSideMenuLevel2, setSideMenuLevel2] = useState("");

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  
  const toggleSidebar1 = (value) => {
    setSideMenuLevel(value);
  };

  const toggleSidebar2 = (value) => {
    setSideMenuLevel2(value);
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
              {/* Main Menu */}
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
                    "/editadmin" === pathName
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
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default Sidebar;

