import { useParams } from "react-router-dom"
import PageTitle from "../../../../core/components/organism/PageTitle"
import useLoadSchedule from "../../hook/useLoadSchedule"
import AgendamentoDetails from "../../components/details"

const AgendamentoDetail = () => {
  const { scheduleId } = useParams()

  const { data: schedule, isPending } = useLoadSchedule(scheduleId || "") 

  return (
    <div>
      <PageTitle title="Agendamento" subtitle="Detalhes do agendamento" />
      <div className="flex flex-col gap-4 mt-8">
        <AgendamentoDetails schedule={schedule} isLoading={isPending} />
      </div>
    </div>
  )
}

export default AgendamentoDetail