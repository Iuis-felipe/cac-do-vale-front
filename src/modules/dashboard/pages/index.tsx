import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PageTitle from "../../../core/components/organism/PageTitle";
import useGetTodaySchedule from "../hook/useGetTodaySchedule";
import { ClockIcon, Loader2, CalendarIcon } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const ScheduleCard = ({ schedule }: { schedule: any }) => {
  const navigate = useNavigate(); 
  const appointmentDate = schedule.dia ? new Date(schedule.dia) : null;

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 h-full text-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white" onClick={() => navigate(`/agendamento/${schedule.id}`)}>
      <div className="flex items-center gap-2 font-medium text-gray-800">
        <UserCircleIcon className="size-4 flex-shrink-0" />
        <p className="truncate">{schedule.nome_civil}</p>
      </div>

      {appointmentDate && (
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="size-4 flex-shrink-0" />
          <p>{format(appointmentDate, "dd/MM/yyyy", { locale: ptBR })}</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-600">
        <ClockIcon className="size-4 flex-shrink-0" />
        <p>{schedule.horario}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data: schedules, isPending } = useGetTodaySchedule();

  const handleAgendamentos = () => {
    if (isPending) {
      return (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-10 h-10 animate-spin text-blue-800" />
        </div>
      );
    }

    if (!schedules || (schedules.today.length === 0 && schedules.pending.length === 0)) {
      return <p className="text-center text-gray-500 mt-10">Não há agendamentos para exibir.</p>;
    }

    return (
      <div className="flex flex-col gap-8">
        {schedules.today.length > 0 && (
          <div>
            <p className="text-xl font-semibold mb-4">Agendamentos do dia</p>
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {schedules.today.map((it: any) => (
                  <CarouselItem key={it.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                    <ScheduleCard schedule={it} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-[-12px]" />
              <CarouselNext className="mr-[-12px]" />
            </Carousel>
          </div>
        )}

        {schedules.pending.length > 0 && (
          <div>
            <p className="text-xl font-semibold mb-4">Atendimentos pendentes</p>
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {schedules.pending.map((it: any) => (
                  <CarouselItem key={it.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                    <ScheduleCard schedule={it} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-[-12px]" />
              <CarouselNext className="mr-[-12px]" />
            </Carousel>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Visão geral dos agendamentos" />
      <div className="mt-10">
        {handleAgendamentos()}
      </div>
    </div>
  );
};

export default Dashboard;
