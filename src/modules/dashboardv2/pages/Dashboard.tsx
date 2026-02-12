import { useState, useEffect } from 'react';
import { CircularProgress, Divider, Typography } from '@mui/material';
import { DashboardHeader } from '../components/DashboardHeader';
import { StatCard } from '../components/StatCard';
import { OverviewChart } from '../components/OverviewChart';
import { ExamTypes } from '../components/ExamTypes';
import { Team } from '../components/Team';
import {
  DashboardContainer,
  StatsRow,
  ContentRow,
  BottomRow,
  LoadingContainer,
} from './Dashboard.styled';

// Mock data conforme o print
const mockStats = {
  totalAgendamentos: '2.023',
  mediaPorDia: '35',
  mediaPorDiaTrend: '-5,6%' as const,
  mediaPorMes: '500',
  mediaPorMesTrend: '+5,6%' as const,
};

const mockWeeklyData = [
  { day: 'Segunda-Feira', waiting: 90, confirmed: 100 },
  { day: 'Terça-Feira', waiting: 30, confirmed: 20 },
  { day: 'Quarta-Feira', waiting: 85, confirmed: 95 },
  { day: 'Quinta-Feira', waiting: 25, confirmed: 15 },
  { day: 'Sexta-Feira', waiting: 70, confirmed: 100 },
];

const mockExamesData = [
  { name: 'Renovação', count: 1930, percentage: 79.2 },
  { name: 'Primeira Licença', count: 423, percentage: 17.4 },
  { name: 'Mudança De Categoria', count: 53, percentage: 2.2 },
  { name: 'Adição', count: 30, percentage: 1.2 },
];

const mockTeamMembers = [
  { id: 1, name: 'Mariana Bastos', email: 'mariana.bs@gmail.com', avatar: '' },
  { id: 2, name: 'Paola Oliveira', email: 'paola.ol@gmail.com', avatar: '' },
  { id: 3, name: 'Cristiano Ronaldo', email: 'cristiano.r@gmail.com', avatar: '' },
  { id: 4, name: 'Cristiano Ronaldo', email: 'cristiano.r@gmail.com', avatar: '' },
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useState('Pam');
  const [currentDate] = useState(new Date(2025, 0, 1)); // Quarta-Feira 01/01/2025

  useEffect(() => {
    // Simula loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <CircularProgress color="secondary" size={48} />
          <Typography color="text.secondary">Carregando dados...</Typography>
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader
        userName={userName}
        date={currentDate}
        onRefresh={handleRefresh}
        loading={isLoading}
      />

      <Divider />

      {/* Stats Cards */}
      <StatsRow>
        <StatCard
          title="Total de Agendamentos"
          subtitle="Todos os registros"
          value={mockStats.totalAgendamentos}
        />
        <StatCard
          title="Média por Dia"
          subtitle="Agendamentos/Dia"
          value={mockStats.mediaPorDia}
          badge={mockStats.mediaPorDiaTrend}
          trend="down"
        />
        <StatCard
          title="Média por Mês"
          subtitle="Agendamentos/Mês"
          value={mockStats.mediaPorMes}
          badge={mockStats.mediaPorMesTrend}
          trend="up"
        />
      </StatsRow>

      {/* Overview Chart */}
      <ContentRow>
        <OverviewChart data={mockWeeklyData} month="Fevereiro" year="2025" />
      </ContentRow>

      {/* Bottom Row: Exam Types + Team */}
      <BottomRow>
        <ExamTypes data={mockExamesData} />
        <Team
          members={mockTeamMembers}
          onViewAll={() => console.log('Ver tudo')}
          onAddMember={() => console.log('Adicionar membro')}
          onEmailMember={(member) => console.log('Email:', member.email)}
        />
      </BottomRow>
    </DashboardContainer>
  );
};

export default DashboardPage;
