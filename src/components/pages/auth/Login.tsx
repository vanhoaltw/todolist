import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import firebase from "../../../lib/firebase";

const ButtonAuth = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1.5),
  marginTop: 4,
  borderRadius: theme.shape.borderRadius,
}));

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: 350,
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Avatar
        src="/favicon.png"
        sx={{ width: 46, height: 46, borderRadius: 0 }}
      >
        Todolist
      </Avatar>
      <Typography component="h1" variant="h5" marginTop={1}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate mt={3}>
        <ButtonAuth
          variant="contained"
          fullWidth
          sx={{
            background: "#24292e",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
          onClick={firebase.signInWithGithub}
        >
          <IoLogoGithub size={24} />
          &nbsp;
          <span>Continue with Github</span>
        </ButtonAuth>
        <ButtonAuth
          variant="contained"
          fullWidth
          sx={{
            background: "#de5246",
            "&:hover": {
              backgroundColor: "#ef675d",
            },
          }}
          onClick={firebase.signInWithGoogle}
        >
          <IoLogoGoogle size={24} />
          &nbsp;
          <span>Continue with Google</span>
        </ButtonAuth>
      </Box>
    </Box>
  );
}
