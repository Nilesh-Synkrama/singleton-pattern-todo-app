import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  return (
    <div className="font-mono">
      <Navbar />
      <div className="flex justify-center items-center max-md:block max-md:mt-0 mt-8">
        <Table />
      </div>
    </div>
  );
}
export default App;
