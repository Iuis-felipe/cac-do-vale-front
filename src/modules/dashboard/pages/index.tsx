import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PageTitle from "../../../core/components/organism/PageTitle";
import useGetTodaySchedule from "../hook/useGetTodaySchedule";
import { ClockIcon, Loader2 } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
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
            <p className="text-lg font-medium"> Agendamentos do dia </p>
            <Carousel 
              opts={{
                loop: false,
                slidesToScroll: 1,
              }}
              className="w-[90%] ml-10"
            >
              <CarouselContent className="-ml-2">
                {schedules.today.map((it: any) => (
                  <CarouselItem className="pl-2 basis-1/6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="size-4" />
                        <p> {it.nome_social} </p>
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
                  <CarouselItem className="pl-2 basis-1/6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="size-4" />
                        <p> {it.nome_social} </p>
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