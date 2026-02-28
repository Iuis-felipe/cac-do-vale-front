import { RouteObject } from 'react-router-dom';
import AgendamentosPage from '../pages/Agendamentos';

export const agendamentosV2Routes: RouteObject[] = [
  {
    path: '',
    element: <AgendamentosPage />,
  },
];
