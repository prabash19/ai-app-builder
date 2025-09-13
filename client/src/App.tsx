import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[2000px] px-4">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
