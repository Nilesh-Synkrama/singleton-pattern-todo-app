import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const DeleteModal = ({ isOpen, setIsOpen, handleDeleteTodo }) => {
  const [modalWidth, setModalWidth] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: modalWidth,
      marginRight: "-50%",
      padding: " 20px 40px 10px 40px",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "5px",
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    },
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const width = document.documentElement.clientWidth > 1200 ? "450px" : "80%";
    setModalWidth(width);
    window.addEventListener("resize", () => {
      const width =
        document.documentElement.clientWidth > 900 ? "450px" : "80%";
      setModalWidth(width);
    });
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex justify-between text-2xl font-bold">
        <h1 className="text-[#3881c5]">Alert!</h1>
        <button onClick={handleClose}>×</button>
      </div>
      <div className="py-8 text-base">
        <p>Are you sure you want to delete this todo?</p>
        <div className="w-full flex justify-end  mt-12 gap-4">
          <button
            type="button"
            className="rounded 0 px-3 py-1 font-bold bg-red-500 text-white text-lg max-md:w-full "
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            No
          </button>
          <button
            className="rounded 0 px-3 py-1 font-bold bg-[#3881c5] text-white text-lg max-md:w-full"
            onClick={() => {
              handleDeleteTodo();
              handleClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
