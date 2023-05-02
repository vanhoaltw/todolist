// import "./App.css";
import {
  BrowserRouter,
  RouteObject,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import AuthProvider, {
  useSignIn,
  useSignOut,
} from "./components/contexts/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import MainLayout from "./components/layouts/MainLayout";
import SecureLayout from "./components/layouts/SecureLayout";
import firebase from "./lib/firebase";

const IndexPage = lazy(() => import("./components/pages/index/Index"));
const LoginPage = lazy(() => import("./components/pages/auth/Login"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <SecureLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
];

function InnerRouter() {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  const element = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = firebase.auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        signIn(user);
        navigate("/");
      } else {
        navigate("/auth/login");
        signOut();
      }
    });
  }, []);

  return <Suspense fallback="Loading...">{element}</Suspense>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <InnerRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
