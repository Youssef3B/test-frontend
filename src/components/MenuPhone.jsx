import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";

import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthContext";

function MenuPhone() {
  const { logout, user } = useAuthUser();

  return (
    <div className="">
      <ul className="flex space-x-2 justify-center items-center ">
        <Link to={"/"}>
          <li className="hover:text-sky-600 transition-all">
            <p className="flex flex-col items-center  space-x-3 text-sm font-bold">
              <IoHomeOutline size={18} />
              <span>Home</span>
            </p>
          </li>
        </Link>
        <Link to={"explore"}>
          <li className="hover:text-sky-600 transition-all">
            <p className="flex flex-col items-center justify-center  space-x-3 text-sm font-bold">
              <MdOutlineExplore size={18} />
              <span>Explore</span>
            </p>
          </li>
        </Link>
        <Link to={"peoples"}>
          <li className="hover:text-sky-600 transition-all">
            <p className="flex flex-col items-center  space-x-3 text-sm font-bold">
              <IoPeopleOutline size={18} />
              <span>People</span>
            </p>
          </li>
        </Link>
        <Link to={"saves"}>
          <li className="hover:text-sky-600 transition-all">
            <p className="flex flex-col items-center  space-x-3 text-sm font-bold">
              <FaRegBookmark size={18} />
              <span>Saves</span>
            </p>
          </li>
        </Link>
        <Link to={user && `profile/${user._id}`}>
          <li className="hover:text-sky-600 transition-all">
            <p className="flex flex-col items-center  space-x-3 text-sm font-bold">
              <LuUser2 size={18} />
              <span>Profile</span>
            </p>
          </li>
        </Link>
        <li
          onClick={logout}
          className="hover:text-sky-600 transition-all cursor-pointer"
        >
          <p className="flex flex-col items-center justify-center  space-x-3 text-sm font-bold">
            <CiLogin size={18} />
            <span> Log Out</span>
          </p>
        </li>{" "}
      </ul>
      {/* <button
          onClick={logout}
          className="bg-sky-500 py-3 rounded-full text-white font-bold transition-all hover:bg-sky-600"
        >
          Log Out
        </button> */}
    </div>
  );
}

export default MenuPhone;
