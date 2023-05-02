import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";

export default function SecureLayout() {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Outlet />
    </Container>
  );
}
