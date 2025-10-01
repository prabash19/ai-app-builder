import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interface from "./components/Interface";
import LandingPage from "./components/LandingPage";
import BasicForm from "./components/BasicForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/result" element={<Interface />} />
        <Route path="/basicForm" element={<BasicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
