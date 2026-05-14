import { useState, useEffect } from 'react';
import { useGetSchedule } from '@/modules/agendamento/hook/useGetSchedule';
import { useAnalytics } from '../hooks/useAnalytics';
import PageTitle from '@/core/components/organism/PageTitle';
import { StatCard } from '../components/StatCard';
import { DistributionChart } from '../components/DistributionChart';
import { WeeklyTimeline } from '../components/WeeklyTimeline';
import { Heatmap } from '../components/Heatmap';
import { TopList } from '../components/TopList';
import { translateExamType, translatePaymentMethod, translateStatus } from '../utils/translations';
import {
  CalendarIcon,
  CheckCircle2,
  Hourglass,
  TrendingUp,
  Clock,
  RefreshCw,
} from 'lucide-react';

const AnalyticsPage = () => {
  const { mutate, isPending } = useGetSchedule();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const analytics = useAnalytics(schedules);

  // Carregar todos os agendamentos (com paginação interna)
  const loadAllSchedules = async () => {
    setIsLoadingAll(true);
    const allSchedules: any[] = [];
    let currentPage = 1;
    let hasMore = true;

    try {
      while (hasMore) {
        const response: any = await new Promise((resolve) => {
          mutate(
            { page: currentPage, perPage: 100 },
            {
              onSuccess: (data) => resolve(data),
            }
          );
        });

        if (response?.data) {
          allSchedules.push(...response.data);
          const totalPages = Math.ceil(response.total / response.perPage);
          hasMore = currentPage < totalPages;
          currentPage++;
        } else {
          hasMore = false;
        }
      }

      setSchedules(allSchedules);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setIsLoadingAll(false);
    }
  };

  useEffect(() => {
    loadAllSchedules();
  }, []);

  const handleRefresh = () => {
    loadAllSchedules();
  };

  if (isPending || isLoadingAll) {
    return (
      <div>
        <PageTitle title="Analytics & Insights" subtitle="Análises e estatísticas dos agendamentos" />
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="size-12 text-blue-500 animate-spin" />
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Analytics & Insights" subtitle="Análises e estatísticas dos agendamentos" />
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
          disabled={isLoadingAll}
        >
          <RefreshCw className={`size-4 ${isLoadingAll ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Total de Agendamentos"
          value={analytics.totalSchedules}
          icon={<CalendarIcon className="size-6" />}
          color="text-blue-600"
          subtitle="Todos os registros"
        />
        <StatCard
          title="Média por Dia"
          value={analytics.averagePerDay}
          icon={<TrendingUp className="size-6" />}
          color="text-purple-600"
          subtitle="Agendamentos/dia"
        />
        <StatCard
          title="Concluídos"
          value={analytics.statusDistribution.done || 0}
          icon={<CheckCircle2 className="size-6" />}
          color="text-emerald-600"
          subtitle={`${(
            ((analytics.statusDistribution.done || 0) / analytics.totalSchedules) *
            100
          ).toFixed(1)}% do total`}
        />
        <StatCard
          title="Pendentes"
          value={analytics.statusDistribution.pending || 0}
          icon={<Hourglass className="size-6" />}
          color="text-amber-600"
          subtitle="Aguardando atendimento"
        />
      </div>

      {/* Weekly Timeline */}
      <div className="mt-8">
        <WeeklyTimeline data={analytics.weeklyTimeline} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <DistributionChart
          title="Distribuição por Status"
          data={analytics.statusDistribution}
          colors={[
            'bg-emerald-500',
            'bg-amber-500',
            'bg-rose-500',
            'bg-blue-500',
            'bg-purple-500',
          ]}
          translator={translateStatus}
        />
        <DistributionChart
          title="Tipos de Exames"
          data={analytics.examTypeDistribution}
          colors={[
            'bg-blue-500',
            'bg-indigo-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-rose-500',
          ]}
          translator={translateExamType}
        />
        <DistributionChart
          title="Formas de Pagamento"
          data={analytics.paymentDistribution}
          colors={[
            'bg-green-500',
            'bg-teal-500',
            'bg-cyan-500',
            'bg-sky-500',
            'bg-blue-500',
          ]}
          translator={translatePaymentMethod}
        />
        <DistributionChart
          title="Origem dos Pacientes"
          data={analytics.originDistribution}
          colors={[
            'bg-orange-500',
            'bg-amber-500',
            'bg-yellow-500',
            'bg-lime-500',
            'bg-green-500',
          ]}
        />
      </div>

      {/* Heatmap and Top Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Heatmap data={analytics.hourDistribution} />
        </div>
        <div>
          <TopList title="Top 5 Horários" items={analytics.topHours} icon={<Clock className="size-5 text-blue-500" />} />
        </div>
      </div>

      {/* Category Distribution */}
      {Object.keys(analytics.categoryDistribution).length > 0 && (
        <div className="mt-8">
          <DistributionChart
            title="Distribuição por Categoria"
            data={analytics.categoryDistribution}
            colors={[
              'bg-violet-500',
              'bg-fuchsia-500',
              'bg-pink-500',
              'bg-rose-500',
              'bg-red-500',
            ]}
            translator={(key) => key}
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
