import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Snackbar = ({ message, type }) => {
  const { showSnackbar, setShowSnackbar } = useContext(AppContext);
  let bgColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-500";
  }
  useEffect(() => {
    showSnackbar &&
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
  }, [showSnackbar]);
  return (
    <>
      {showSnackbar && (
        <div
          className={`fixed top-20  rounded px-4 py-2 text-white ${bgColor}`}
          style={{
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Snackbar;
