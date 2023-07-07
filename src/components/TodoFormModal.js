import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Todos from "./Singleton";

const TodoFormModal = ({
  isOpen,
  setIsOpen,
  title,
  setTodo,
  todo,
  data,
  isEdit,
}) => {
  const [modalWidth, setModalWidth] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (values) => {
    isEdit
      ? Todos.updateTodo({
          name: values.name,
          creationDate: data.creationDate,
          age: new Date(values.date),
          id: data.id,
        })
      : Todos.addTodo({
          name: values.name,
          creationDate: new Date(),
          age: new Date(values.date),
          id: new Date(),
        });
    setTodo(Todos.todos);
    setIsOpen(false);
  };
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
    reset({
      name: data?.name ? data?.name : "",
      date: data?.age ? new Date(data?.age).toLocaleDateString("en-CA") : "",
    });
  }, [isOpen]);

  useEffect(() => {
    const width = document.documentElement.clientWidth > 1200 ? "50%" : "80%";
    setModalWidth(width);
    window.addEventListener("resize", () => {
      const width = document.documentElement.clientWidth > 900 ? "50%" : "80%";
      setModalWidth(width);
    });
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-between text-2xl font-bold">
          <h1 className="text-[#3881c5]">{title}</h1>
          <button onClick={handleClose}>×</button>
        </div>
        <div className="py-8 text-base">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8 max-md:flex-col">
              <div className="w-1/2 h-9 max-md:w-full">
                <p>
                  Todo Name <span className="text-red-600">*</span>
                </p>
                <input
                  type="text"
                  defaultValue={data?.name}
                  {...register("name", { required: true })}
                  className={`border rounded mt-1 min-w-full min-h-full px-3 ${
                    errors.name && "border-red-600"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-600">Todo name is required</span>
                )}
              </div>
              <div className="w-1/2 h-9 max-md:w-full">
                <p>
                  Due Date <span className="text-red-600">*</span>
                </p>
                <input
                  type="date"
                  defaultValue={data?.date}
                  {...register("date", { required: true })}
                  className={`border rounded px-1 mt-1 min-w-full min-h-full ${
                    errors.date && "border-red-600"
                  }`}
                />
                {errors.date && (
                  <span className="text-red-600">Due date is required</span>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end  mt-20 gap-4">
              <button
                type="button"
                className="rounded 0 px-3 py-1 font-bold bg-red-500 text-white text-lg max-md:w-full w-20"
                onClick={(e) => {
                  e.preventDefault();
                  reset({
                    name: "",
                    date: "",
                  });
                }}
              >
                Clear
              </button>
              <button className="rounded 0 px-3 py-1 font-bold bg-[#3881c5] text-white text-lg max-md:w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TodoFormModal;
