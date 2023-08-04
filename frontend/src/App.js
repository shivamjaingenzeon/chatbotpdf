import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/aboutus" Component={AboutUs}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
