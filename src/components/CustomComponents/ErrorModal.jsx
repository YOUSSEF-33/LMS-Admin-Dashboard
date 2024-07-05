import React, { useEffect } from "react";
import { Modal } from "bootstrap";

const ErrorModal = ({ id, errorMessage, onClose }) => {
  useEffect(() => {
    const modalElement = document.getElementById(id);
    const modal = new Modal(modalElement);

    if (errorMessage) {
      modal.show();
    } else {
      modal.hide();
    }

    return () => {
      modal.hide();
    };
  }, [id, errorMessage]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-white text-danger">
            <button
              type="button"
              className="btn-close btn-close-red ms-auto"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
              style={{ position: "absolute", left: "1rem" }}
            />
            <h4 className="modal-title" id={`${id}Label`} style={{ marginLeft: "2.5rem", color: "red" }}>
              حدث خطأ
            </h4>
          </div>
          <div className="modal-body">
            <p style={{ color: "red" }}>{errorMessage}</p>
            <p style={{ color: "red" }}>يمكنك المحاولة مرة أخرى</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
