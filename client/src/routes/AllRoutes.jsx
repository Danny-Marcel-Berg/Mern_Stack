import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
