import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PageTitle from "../../../core/components/organism/PageTitle";
import useGetTodaySchedule from "../hook/useGetTodaySchedule";
import { ClockIcon, Loader2 } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); 

  const { data: schedules, isPending } = useGetTodaySchedule();

  const handleAgendamentos = () => {
    if(isPending) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )
    };

    if(!schedules) return <p className="text-center text-gray-500"> Não há agendamentos </p>

    return (
      <div className="flex flex-col gap-4">
        {schedules.today.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-medium"> {format(new Date(), 'dd/MM/yyyy')} </p>
              <p className="text-md font-medium"> Agendamentos do dia </p>
            </div>
            <Carousel 
              opts={{
                loop: false,
                slidesToScroll: 1,
              }}
              className="w-[90%] ml-10"
            >
              <CarouselContent className="-ml-2">
                {schedules.today.map((it: any) => (
                  <CarouselItem className="pl-2 basis-1/6 cursor-pointer" onClick={() => navigate(`/agendamento/${it.id}`)}>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="size-4" />
                        <p> {it.nome_social || it.nome_civil} </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="size-4" />
                        <p> {it.horario} </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel> 
          </div>
        )}
        {schedules.pending.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-medium"> Próximos atendimentos </p>
            <Carousel 
              opts={{
                loop: false,
                slidesToScroll: 1,
              }}
              className="w-[90%] ml-10"
            >
              <CarouselContent className="-ml-2">
                {schedules.pending.map((it: any) => (
                  <CarouselItem className="pl-2 basis-1/6 cursor-pointer" onClick={() => navigate(`/agendamento/${it.id}`)} >
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="size-5" />
                        <p className="text-md font-medium"> {it.nome_social || it.nome_civil } </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-500"> {format(new Date(it.dia), 'dd/MM/yyyy HH:mm')} </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel> 
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Dashboard administrativo" />
      <div className="flex flex-col gap-6 mt-10">
        {handleAgendamentos()}
      </div>
    </div>
  )
}

export default Dashboard;