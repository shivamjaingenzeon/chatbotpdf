import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        borderTop: "1px solid #ddd",
        fontFamily: "Titillium Web",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff", // You can set a background color if needed
      }}
    >
      Your Footer Content Here
    </Box>
  );
};

export default Footer;
