import { scheduleRoutes } from "@/modules/agendamento/routes";
import { analyticsRoutes } from "@/modules/analytics/routes";
import { authRoutes } from "@/modules/auth/routes";
import { clientRoutes } from "@/modules/cliente/routes";
import { clinicRoutes } from "@/modules/clinica/routes";
import { dashboardRoutes } from "@/modules/dashboard/routes";
import { dashboardsV2Routes } from "@/modules/dashboardv2/routes";
import { schedulesRoutes } from "@/modules/horarios/routes";
import { userRoutes } from "@/modules/user/routes";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import useLoggedBase from "../hooks";
import Template from "../template";

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
    children: [...authRoutes],
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
    children: [...dashboardsV2Routes]
  },
  {
    path: "dashboard",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...dashboardRoutes]
  },
  {
    path: "agendamento",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...scheduleRoutes]
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
    children: [...schedulesRoutes]
  },
  {
    path: "analytics",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...analyticsRoutes]
  },
  {
    path: "clinica",
    element: <LoggedBase><Template><Outlet /></Template></LoggedBase>,
    children: [...clinicRoutes]
  }
]);

export default Router;
