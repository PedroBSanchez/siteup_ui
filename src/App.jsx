import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screens/Login";
import Home from "./screens/Home";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
