import { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Snackbar from "./components/Snackbar";

export const AppContext = createContext({});
function App() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const displaySnackbar = (obj) => {
    setShowSnackbar(true);
    setMessage(obj.message);
    setType("success");
  };
  return (
    <AppContext.Provider
      value={{
        showSnackbar: showSnackbar,
        setShowSnackbar: setShowSnackbar,
        displaySnackbar: displaySnackbar,
      }}
    >
      <div className="font-mono">
        <Navbar />
        <div className="flex justify-center items-center max-md:block max-md:mt-0 mt-8">
          <Table />
        </div>
      </div>
      {<Snackbar {...{ type, message }} />}
    </AppContext.Provider>
  );
}
export default App;
