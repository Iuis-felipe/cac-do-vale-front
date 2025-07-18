import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthRoutes } from "../../modules/auth/routes";
import { DashboardRoutes } from "../../modules/dashboard/routes";
import Template from "../template";
import { ScheduleRoutes } from "../../modules/agendamento/routes";
import { userRoutes } from "../../modules/user/routes";
import clientRoutes from "@/modules/cliente/routes";
import useLoggedBase from "../hooks";
import horariosRoutes from "@/modules/horarios/routes";

const LoggedBase = ({ children }: { children: React.ReactNode }) => {
  const isLogged = useLoggedBase();

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

const Router = createBrowserRouter([
  {
    path: "/auth",
    element: <LoggedBase><Outlet /></LoggedBase>,
    children: [...AuthRoutes],
  },
  {
    path: "/",
    element: (
      <LoggedBase>
        <Template>
          <Outlet />
        </Template>
      </LoggedBase>
    ),
    children: [...DashboardRoutes]
  },
  {
    path: "agendamento",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...ScheduleRoutes]
  },
  {
    path: "usuario",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...userRoutes]
  },
  {
    path: "cliente",
    element: <Outlet />,
    children: [...clientRoutes]
  },
  {
    path: "horarios",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...horariosRoutes]
  }
]);

export default Router;
