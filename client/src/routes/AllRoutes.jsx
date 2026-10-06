import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Listing from "../pages/Listing";
import Search from "../pages/Search";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
