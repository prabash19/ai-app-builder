import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interface from "./components/Interface";
import LandingPage from "./components/LandingPage";
import BasicForm from "./components/BasicForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/result" element={<Interface />} />
        <Route path="/basicForm" element={<BasicForm />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
