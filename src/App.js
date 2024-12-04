import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Adduser from "./components/AddUser/AddUser";
import Editinfo from "./components/Editinfo";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Adduser} />
        <Route path="/home" Component={Home} />
        <Route path="/edit-info" Component={Editinfo} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
