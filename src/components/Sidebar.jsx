import React, { useContext } from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
import { DisplayNoneContext } from "../context/DisplayNoneContext";

const Sidebar = () => {
  const { displayNone } = useContext(DisplayNoneContext);

  return (
    <div className={`sidebar ${Object.entries(displayNone)[0][1] === true && "hiddenMobile"}`}>

      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
