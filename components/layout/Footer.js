import React, { useState, useEffect } from "react";
import { Container, Divider, Grid } from "@mui/material";
import Router from "next/router";
export default function Footer({ ...props }) {
  return (
    <>
      <div className="w-full h-full bg-blue-400 p-4 md:px-12 text-white text-center">
        Copyright © 2023 NFT Marketplace Co., Ltd. All rights reserved. Designed
        by leopard
      </div>
    </>
  );
}
