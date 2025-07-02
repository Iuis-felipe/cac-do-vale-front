import AgendamentoForm from "../pages/Adicionar";
import AgendamentoUpdate from "../pages/Atualizar";
import AgendamentoDetail from "../pages/Detail";
import AgendamentoList from "../pages/List";

export const ScheduleRoutes = [
  {
    path: "",
    element: <AgendamentoList />
  },
  {
    path: ":scheduleId",
    element: <AgendamentoDetail />
  },
  {
    path: "adicionar",
    element: <AgendamentoForm />
  },
  {
    path: "update/:scheduleId",
    element: <AgendamentoUpdate />
  }
]