import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { useAuthState } from "../contexts/UserContext";
import firebase from "../../lib/firebase";

const Header = () => {
  const { state } = useAuthState();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={1} direction="row">
            <Avatar
              src="/favicon.png"
              sx={{ width: 30, height: 30, borderRadius: 0 }}
            />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              TODOLIST
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button
                variant="text"
                sx={{ textTransform: "none" }}
                onClick={(e) => setAnchorElUser(e.currentTarget)}
              >
                <Typography color="white" mr={1}>
                  {state?.user?.displayName}
                </Typography>
                <Avatar alt="Remy Sharp" src={state?.user?.photoURL || ""} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorElUser(null);
                  firebase.auth.signOut();
                }}
              >
                <Typography display="flex" alignItems="center" gap={1}>
                  <IoMdLogOut /> Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
