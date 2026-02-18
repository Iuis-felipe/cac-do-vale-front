import {
  DashboardHeader,
  Footer,
  GradientButton,
  OutlineButton,
  PageHeader,
} from '@/components';
import { CircularProgress, Divider, Typography } from '@mui/material';
import { Plus, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentCardData } from '../components/AppointmentCard';
import { AppointmentFilter } from '../components/AppointmentFilter';
import { AppointmentGroup } from '../components/AppointmentGroup';
import {
  AgendamentoContainer,
  ContentArea,
  EmptyState,
  LoadingContainer,
} from './Agendamentos.styled';

// Mock data baseado no print
const mockAppointments: Record<string, AppointmentCardData[]> = {
  '03 DE FEVEREIRO': [
    { id: '1', name: 'Luís Felipe Mattos da Silva Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '2', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '3', name: 'Luís Felipe Mattos da Silva Mattos da SilvaMattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' }, //Teste pra ver como se comporta
    { id: '4', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '5', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '6', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '7', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '04 DE FEVEREIRO ': [
    { id: '6', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '7', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '8', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '9', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '10', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '05 DE FEVEREIRO': [
    { id: '11', name: 'Luís Felipe Mattos da Silva Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '12', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '13', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '14', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '15', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '06 DE FEVEREIRO': [
    { id: '16', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '17', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '18', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '19', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
};



const AgendamentosPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useState('Pam');
  const [currentDate] = useState(new Date(2025, 0, 1));
  const [day, setDay] = useState('Dia');
  const [month, setMonth] = useState('Mês');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [appointments] = useState(mockAppointments);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAdd = () => {
    navigate('/agendamento/adicionar-rapido');
  };

  const handleAdd = () => {
    navigate('/agendamento/adicionar');
  };

  const handleCardClick = (id: string) => {
    navigate(`/agendamento/${id}`);
  };

  if (isLoading) {
    return (
      <AgendamentoContainer>
        <LoadingContainer>
          <CircularProgress color="secondary" size={48} />
          <Typography color="text.secondary">Carregando agendamentos...</Typography>
        </LoadingContainer>
      </AgendamentoContainer>
    );
  }

  const hasAppointments = Object.keys(appointments).length > 0;

  return (
    <AgendamentoContainer>
      <DashboardHeader
        userName={userName}
        date={currentDate}
      />

      <Divider />

      <PageHeader title="Agendamentos">
        <GradientButton startIcon={<Zap size={18} />} onClick={handleQuickAdd}>
          Agendamento Rápido
        </GradientButton>
        <OutlineButton startIcon={<Plus size={18} />} onClick={handleAdd}>
          Adicionar
        </OutlineButton>
      </PageHeader>

      <AppointmentFilter
        day={day}
        month={month}
        search={search}
        onDayChange={setDay}
        onMonthChange={setMonth}
        onSearchChange={setSearch}
        view={view}
        setView={setView}
      />

      <ContentArea>
        {hasAppointments ? (
          Object.entries(appointments).map(([date, items]) => (
            <AppointmentGroup
              key={date}
              date={date}
              appointments={items}
              onCardClick={handleCardClick}
              view={view}
            />
          ))
        ) : (
          <EmptyState>
            <Typography color="text.secondary">
              Nenhum agendamento encontrado
            </Typography>
          </EmptyState>
        )}
      </ContentArea>

      <Footer />
    </AgendamentoContainer>
  );
};

export default AgendamentosPage;
