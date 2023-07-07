import React, { useState } from "react";
import TodoFormModal from "./TodoFormModal";
import Todos from "./Singleton";
import moment from "moment/moment";

const Table = () => {
  const [todo, setTodo] = useState(Todos.todos);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Add Todo");
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const isSearch =
    search.length > 0
      ? todo?.filter((item) => {
          return item?.name?.includes(search);
        })
      : todo;
  const todoData = isSearch?.slice(page * 5, (page + 1) * 5);
  return (
    <div className="h-[700px] max-md:h-[1160px] w-[80%] max-md:w-full shadow-2xl px-8 py-6 bg-white rounded relative">
      <div className="flex gap-2 justify-between max-sm:flex-col">
        <div>
          <input
            placeholder="Search todo"
            className="border border-black rounded px-2 py-1 w-full"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-[#3881c5] rounded py-1 px-4 text-lg text-white font-bold"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
            setTitle("Add Todo");
            setData({});
            setIsEdit(false);
          }}
        >
          Add todo
        </button>
      </div>
      <table className="w-full rounded mt-8 text-base relative">
        <thead className="bg-blue-100 rounded">
          <tr className="text-left pl-2 w-full ">
            <th className="pl-4 w-[30%] py-2 font-bold">
              <span className="max-md:hidden">Name</span>
              <span className="hidden max-md:block ">Todos</span>
            </th>
            <th className="w-[20%] max-md:hidden">Create Date</th>
            <th className="w-[20%] text-center max-md:hidden">Due Date</th>
            <th className="w-[30%] text-center"></th>
          </tr>
        </thead>
        <tbody>
          <>
            {todoData.length > 0 ? (
              todoData?.map((item) => {
                return (
                  <tr key={item.id} className="border-b">
                    <td className=" pl-4 py-8 border-b">
                      <div className="font-bold text-lg">{item.name}</div>
                      <div className="hidden max-md:block">
                        Create date :{" "}
                        {moment(item.creationDate).format("DD-MM-YYYY")}
                      </div>
                      <div className="hidden max-md:block">
                        Due date : {moment(item.age).format("DD-MM-YYYY")}
                      </div>
                    </td>
                    <td className="border-b max-md:hidden">
                      {moment(item.creationDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="border-b text-center max-md:hidden">
                      {moment(item.age).format("DD-MM-YYYY")}
                    </td>
                    <td className=" flex justify-end gap-2 py-8">
                      <button
                        className="bg-orange-400 rounded px-2 py-1 text-base text-white "
                        onClick={() => {
                          setIsOpen(true);
                          setTitle("Edit Todo");
                          setData(item);
                          setIsEdit(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 rounded-sm px-2 py-1 text-base text-white font-bold"
                        onClick={() => {
                          Todos.removeTodo(item);
                          setTodo(Todos.todos);
                          console.log(page);
                          todoData.length === 1 &&
                            page !== 0 &&
                            setPage(page - 1);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="w-full text-center absolute mt-10">
                <p className="text-lg">No Records Found</p>
              </div>
            )}
          </>
        </tbody>
      </table>
      <div className="absolute bottom-8 right-6 flex justify-end gap-4 items-center">
        <p className="text-sm">
          {todoData.length > 0 ? page * 5 + 1 : 0} to {todoData.length} of{" "}
          {isSearch.length} records
        </p>
        <button
          onClick={() => {
            page > 0 ? setPage(page - 1) : setPage(page);
          }}
          className={`font-bold text-2xl ${page > 0 ? "" : "text-gray-300"}`}
        >
          {"<"}
        </button>
        <h1 className="font-bold text-xl text-white bg-[#3881c5] px-2 rounded-[50%]">
          {page + 1}
        </h1>
        <button
          onClick={() => {
            isSearch?.slice((page + 1) * 5, (page + 2) * 5).length > 0 &&
              setPage(page + 1);
          }}
          className={`font-bold text-2xl ${
            isSearch?.slice((page + 1) * 5, (page + 2) * 5).length > 0
              ? ""
              : "text-gray-300"
          }`}
        >
          {">"}
        </button>
      </div>
      <TodoFormModal
        {...{ isOpen, setIsOpen, title, setTodo, todo, data, isEdit }}
      />
    </div>
  );
};

export default Table;
