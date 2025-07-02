import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthRoutes } from "../../modules/auth/routes";
import { DashboardRoutes } from "../../modules/dashboard/routes";
import Template from "../template";
import { ScheduleRoutes } from "../../modules/agendamento/routes";
import { userRoutes } from "../../modules/user/routes";
import clientRoutes from "@/modules/cliente/routes";

const Router = createBrowserRouter([
  {
    path: "/auth",
    element: <Outlet />,
    children: [...AuthRoutes],
  },
  {
    path: "/",
    element: (
      <Template>
        <Outlet />
      </Template>
    ),
    children: [...DashboardRoutes]
  },
  {
    path: "agendamento",
    element: (
      <Template>
        <Outlet />
      </Template>
    ),
    children: [...ScheduleRoutes]
  },
  {
    path: "usuario",
    element: (
      <Template>
        <Outlet />
      </Template>
    ),
    children: [...userRoutes]
  },
  {
    path: "cliente",
    element: <Outlet />,
    children: [...clientRoutes]
  }
]);

export default Router;
