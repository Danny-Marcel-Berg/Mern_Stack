import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  //const [search, setSearch] = useState("");

  return (
    <>
      <header className="shadow-xl py-8 bg-slate-200">
        <div className="flex justify-between">
          <h1 className="text-bold text-sm sm:text-2xl flex flex-wrap  ml-4">
            <span className="text-slate-500">Danny</span>
            <span className="text-slate-700 ml-2">Estate</span>
          </h1>

          <form
            className="flex bg-slate-100 rounded p-3
           items-center

           "
          >
            <input
              className="p-2 border border-gray-300 focus:outline-
                none rounded-md focus:outline-none w-24 sm:w-64"
              type="text"
              placeholder="Enter something"
              maxLength={20}
            />
            <FaSearch />
          </form>
          <ul className="flex gap-4 mr-4 mt-4">
            <Link to="/">
              <li
                className="hidden  sm:inline text-slate-700 sm:text-lg
            md:text-xl  lg:text-xl xl:text-2xl hover:underline
            hover:cursor-pointer"
              >
                Home
              </li>
            </Link>
            <Link to="/about">
              <li
                className="hidden sm:inline text-slate-700 sm:text-lg
                  md:text-xl
            lg:text-xl xl:text-2xl hover:underline hover:cursor-pointer"
              >
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li
                className="hidden sm:inline text-slate-700 sm:text-lg md:text-xl
            lg:text-xl xl:text-2xl hover:underline hover:cursor-pointer"
              >
                Sign-In
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
