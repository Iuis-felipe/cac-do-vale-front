import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Divider, Typography } from '@mui/material';
import { Plus, Zap } from 'lucide-react';
import { 
  DashboardHeader, 
  Footer, 
  PageHeader, 
  FilterBar, 
  GradientButton, 
  OutlineButton,
  SelectFilter,
} from '@/components';
import { AppointmentGroup } from '../components/AppointmentGroup';
import { AppointmentCardData } from '../components/AppointmentCard';
import {
  AgendamentoContainer,
  ContentArea,
  LoadingContainer,
  EmptyState,
} from './Agendamentos.styled';

// Mock data baseado no print
const mockAppointments: Record<string, AppointmentCardData[]> = {
  '03 DE FEVEREIRO': [
    { id: '1', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '2', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '3', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '4', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '5', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '03 DE FEVEREIRO ': [
    { id: '6', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '7', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '8', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '9', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '10', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '04 DE FEVEREIRO': [
    { id: '11', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '12', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '13', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '14', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '15', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
  '05 DE FEVEREIRO': [
    { id: '16', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'confirmed' },
    { id: '17', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '18', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
    { id: '19', name: 'Luís Felipe Mattos da Silva', date: '23/07/2025', time: '15:00', status: 'waiting' },
  ],
};

const days = [
  { value: 'Dia', label: 'Dia' },
  { value: 'Segunda', label: 'Segunda' },
  { value: 'Terça', label: 'Terça' },
  { value: 'Quarta', label: 'Quarta' },
  { value: 'Quinta', label: 'Quinta' },
  { value: 'Sexta', label: 'Sexta' },
  { value: 'Sábado', label: 'Sábado' },
  { value: 'Domingo', label: 'Domingo' },
];

const months = [
  { value: 'Mês', label: 'Mês' },
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
];

const AgendamentosPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useState('Pam');
  const [currentDate] = useState(new Date(2025, 0, 1));
  const [day, setDay] = useState('Dia');
  const [month, setMonth] = useState('Mês');
  const [search, setSearch] = useState('');
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

  const filters: SelectFilter[] = [
    { value: day, options: days, onChange: setDay },
    { value: month, options: months, onChange: setMonth },
  ];

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

      <FilterBar
        filters={filters}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar agendamento"
      />

      <ContentArea>
        {hasAppointments ? (
          Object.entries(appointments).map(([date, items]) => (
            <AppointmentGroup
              key={date}
              date={date}
              appointments={items}
              onCardClick={handleCardClick}
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
