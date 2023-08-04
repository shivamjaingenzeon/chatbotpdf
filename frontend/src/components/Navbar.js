import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import bgimage from "../images/logo1.png";
import { useAppStore } from "./appStore";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  const handleOnClick1 = () => {
    navigate("/");
  };

  const handleOnClick2 = () => {
    navigate("/aboutus");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleOnClick1}
          >
            <Box marginTop={1}>
              <img src={bgimage} alt="logo" width={30}></img>
            </Box>
          </Typography>
          <Button color="inherit" onClick={handleOnClick2}>
            About Us
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
