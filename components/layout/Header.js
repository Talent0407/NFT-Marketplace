import { Grid, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import Router from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ color = false, ...props }) {
  const [phoneMenuShow, setPhoneMenuShow] = useState(false);
  const toggleDrawer = (show) => () => {
    setPhoneMenuShow(show);
  };

  return (
    <div className="fixed w-full flex justify-between items-center bg-white h-16 z-50 py-2 px-4 md:px-20">
      <div className="text-3xl text-blue-600 font-bold">Test Project</div>
      <div className="hidden md:flex flex-row gap-8">
        <div className="cursor-pointer text-gray-700 hover:text-white hover:bg-blue-500 hover:rounded-3xl py-2 px-4">
          Home
        </div>
        <div className="cursor-pointer text-gray-700 hover:text-white hover:bg-blue-500 hover:rounded-3xl py-2 px-4">
          Explore
        </div>
        <div className="cursor-pointer text-gray-700 hover:text-white hover:bg-blue-500 hover:rounded-3xl py-2 px-4">
          Contact Us
        </div>
      </div>
    </div>
  );
}
