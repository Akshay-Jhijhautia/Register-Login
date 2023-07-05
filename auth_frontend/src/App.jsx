import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import SignUp from "./components/SignUp";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Details />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="*" element={<h1>ERROR 404: BAD PATHWAY</h1>} />
      </Routes>
    </>
  );
}

export default App;
