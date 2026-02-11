import { RouteObject } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";

export const dashboardsV2Routes: RouteObject[] = [
  {
    path: "",
    element: <DashboardPage />
  }
];
