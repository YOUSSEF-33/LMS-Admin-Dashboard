import React from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import { user5, user6, user7 } from "../../imagepath";

const Media = () => {
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
                <div className="col">
                  <h3 className="page-title">Media</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Components</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-xxl-6">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Examples</h4>
                  </div>
                  {/* end card header */}
                  <div className="card-body">
                    <p className="text-muted mb-4">
                      Use few flex utilities that allow even more flexibility
                      and customization than before.
                    </p>
                    <div className="d-flex align-items-start text-muted mb-4">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user5}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Media heading</h5>
                        This is some content from a media component. You can
                        replace this with any content and adjust it as needed.
                      </div>
                    </div>
                    <div className="d-flex align-items-start text-muted mb-4">
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Media heading</h5>
                        This is some content from a media component. You can
                        replace this with any content and adjust it as needed.
                      </div>
                      <div className="flex-shrink-0 ms-3">
                        <img
                          src={user6}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-start text-muted">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user7}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Media heading</h5>
                        This is some content from a media component. You can
                        replace this with any content and adjust it as needed.
                      </div>
                    </div>
                  </div>
                  {/* end card-body */}
                </div>
                {/* end card */}
              </div>
              {/* end col */}
              <div className="col-xxl-6">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Nesting Example
                    </h4>
                  </div>
                  {/* end card header */}
                  <div className="card-body">
                    <p className="text-muted mb-4">
                      Media objects can be infinitely nested, though we suggest
                      you stop at some point. Place nested{" "}
                      <code>d-flex align-items-start</code> within the{" "}
                      <code>flex-grow-1</code> of a parent media object.
                    </p>
                    <div className="d-flex align-items-start text-muted mb-4">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user5}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Media heading</h5>
                        This is some content from a media component. You can
                        replace this with any content and adjust it as needed.
                        <div className="d-flex align-items-start text-muted mt-3">
                          <div className="flex-shrink-0 me-3">
                            <img
                              src={user6}
                              className="avatar-sm rounded"
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="fs-14">Media heading</h5>
                            This is some content from a media component. You can
                            replace this with any content and adjust it as
                            needed.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-start text-muted">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user7}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Media heading</h5>
                        This is some content from a media component. You can
                        replace this with any content and adjust it as needed.
                      </div>
                    </div>
                  </div>
                  {/* end card-body */}
                </div>
                {/* end card */}
              </div>
              {/* end col */}
            </div>
            {/* end row */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Media Alignment
                    </h4>
                  </div>
                  {/* end card header */}
                  <div className="card-body">
                    <p className="text-muted mb-4">
                      The images or other media can be aligned top, middle, or
                      bottom. The default is top aligned.
                    </p>
                    <div className="d-flex align-items-start text-muted mb-4">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user5}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Top Aligned media</h5>
                        <p className="mb-1">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                          Donec lacinia congue felis in faucibus.
                        </p>
                        <p className="mb-0">
                          Donec sed odio dui. Nullam quis risus eget urna mollis
                          ornare vel eu leo. Cum sociis natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center text-muted mb-4">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user6}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Center Aligned media</h5>
                        <p className="mb-1">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                          Donec lacinia congue felis in faucibus.
                        </p>
                        <p className="mb-0">
                          Donec sed odio dui. Nullam quis risus eget urna mollis
                          ornare vel eu leo. Cum sociis natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-end text-muted">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={user7}
                          className="avatar-sm rounded"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-14">Bottom Aligned media</h5>
                        <p className="mb-1">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin.Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                          Donec lacinia congue felis in faucibus.
                        </p>
                        <p className="mb-0">
                          Donec sed odio dui. Nullam quis risus eget urna mollis
                          ornare vel eu leo. Cum sociis natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* end card-body */}
                </div>
                {/* end card */}
              </div>
              {/* end col */}
            </div>
            {/* end row */}
          </div>
          {/* Footer */}
          <Footer />
        </div>

        {/* /Page Wrapper */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Media;
