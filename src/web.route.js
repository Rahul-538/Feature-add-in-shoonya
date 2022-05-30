import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Landing from "./ui/pages/container/Landing/index";
import Login from "./ui/pages/container/UserManagement/Login";
import ForgotPassword from "./ui/pages/container/UserManagement/ForgotPassword";
import Dashboard from "./ui/pages/container/Dashboard";
import Projects from "./ui/pages/container/Projects";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "login", element: <Login /> },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "dashboard", element: <Dashboard />},
    { path: "projects/:id", element: <Projects />},
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
