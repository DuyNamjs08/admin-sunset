/* eslint-disable react/prop-types */

import Modal from "react-modal";

export const BaseModal = ({
  isModalOpen,
  onClose,
  children,
  zIndex,
  className,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          position: "fixed",
          inset: 0,
          margin: "auto",
          border: "1px solid #000",
          background: "#fff",
          padding: "20px",
          outline: "none",
        },
        overlay: {
          zIndex: zIndex ?? 70,
        },
      }}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={className}
    >
      {children}
    </Modal>
  );
};
