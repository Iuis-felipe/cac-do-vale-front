import AgendamentoForm from "../pages/Adicionar";
import AgendamentoUpdate from "../pages/Atualizar";
import AgendamentoDetail from "../pages/Detail";
import AgendamentoList from "../pages/List";
import AgendamentoRapido from "../pages/AdicionarRapido";

export const scheduleRoutes = [
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
    path: "adicionar-rapido",
    element: <AgendamentoRapido />
  },
  {
    path: "update/:scheduleId",
    element: <AgendamentoUpdate />
  }
]