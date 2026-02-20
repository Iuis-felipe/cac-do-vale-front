import { useState, useEffect } from 'react';
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
import { ScheduleTable, ScheduleData } from '../components/ScheduleTable';
import {
  HorariosContainer,
  ContentArea,
  LoadingContainer,
} from './Horarios.styled';

// Mock data baseado no print
const mockSchedules: ScheduleData[] = [
  { id: '1', date: '05/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '2', date: '06/02/2026', status: 'closed', startTime: '', endTime: '', breakTime: '', breakDuration: '', isHoliday: true },
  { id: '3', date: '07/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '4', date: '08/02/2026', status: 'closed', startTime: '', endTime: '', breakTime: '', breakDuration: '', isHoliday: true },
  { id: '5', date: '09/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '6', date: '10/02/2026', status: 'closed', startTime: '', endTime: '', breakTime: '', breakDuration: '', isHoliday: true },
  { id: '7', date: '11/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '8', date: '12/02/2026', status: 'open', startTime: '13:05', endTime: '17:06', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '9', date: '13/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '10', date: '14/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '11', date: '15/02/2026', status: 'closed', startTime: '', endTime: '', breakTime: '', breakDuration: '', isHoliday: true },
  { id: '12', date: '16/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '13', date: '17/02/2026', status: 'closed', startTime: '', endTime: '', breakTime: '', breakDuration: '', isHoliday: true },
  { id: '14', date: '18/02/2026', status: 'open', startTime: '13:05', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
  { id: '15', date: '19/02/2026', status: 'open', startTime: '13:06', endTime: '17:00', breakTime: '12:00', breakDuration: '01:05 hora', isHoliday: false },
];

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

const HorariosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useState('Luís Felipe');
  const [currentDate] = useState(new Date(2025, 0, 1));
  const [day, setDay] = useState('Dia');
  const [month, setMonth] = useState('Mês');
  const [search, setSearch] = useState('');
  const [schedules, setSchedules] = useState<ScheduleData[]>(mockSchedules);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreatePeriod = () => {
    console.log('Criar período');
  };

  const handleAdd = () => {
    console.log('Adicionar horário');
  };

  const handleEdit = (schedule: ScheduleData) => {
    console.log('Editar:', schedule);
  };

  const handleDelete = (id: string) => {
    console.log('Deletar:', id);
  };

  const handleCopy = (schedule: ScheduleData) => {
    console.log('Copiar:', schedule);
  };

  const handleToggleStatus = (id: string, isHoliday: boolean) => {
    setSchedules(prev => 
      prev.map(s => 
        s.id === id 
          ? { ...s, isHoliday, status: isHoliday ? 'closed' as const : 'open' as const } 
          : s
      )
    );
  };

  if (isLoading) {
    return (
      <HorariosContainer>
        <LoadingContainer>
          <CircularProgress color="secondary" size={48} />
          <Typography color="text.secondary">Carregando horários...</Typography>
        </LoadingContainer>
      </HorariosContainer>
    );
  }

  const filters: SelectFilter[] = [
    { value: day, options: days, onChange: setDay },
    { value: month, options: months, onChange: setMonth },
  ];

  return (
    <HorariosContainer>
      <DashboardHeader
        userName={userName}
        date={currentDate}
      />

      <Divider />

      <PageHeader title="Horários">
        <GradientButton startIcon={<Zap size={18} />} onClick={handleCreatePeriod}>
          Criar período
        </GradientButton>
        <OutlineButton startIcon={<Plus size={18} />} onClick={handleAdd}>
          Adicionar
        </OutlineButton>
      </PageHeader>

      <FilterBar
        filters={filters}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar horário"
      />

      <ContentArea>
        <ScheduleTable
          data={schedules}
          isLoading={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onToggleStatus={handleToggleStatus}
        />
      </ContentArea>

      <Footer />
    </HorariosContainer>
  );
};

export default HorariosPage;
