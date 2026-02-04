import { PlusIcon } from "@heroicons/react/16/solid";
import { BoltIcon } from "@heroicons/react/24/outline";
import PageTitle from "../../../../core/components/organism/PageTitle";
import { useEffect, useState } from "react";
import { useGetSchedule } from "../../hook/useGetSchedule";
import Filter from "../../components/filter";
import Table from "../../components/list/table";
import ActionModal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import userStore from "@/core/store/user";

const AgendamentoList = () => {
  const navigate = useNavigate()
  const user = userStore(state => state.user)
  const { mutate, isPending, data } = useGetSchedule()

  const [order, setOrder] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0);
  const [schedules, setSchedules] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [actionId, setActionId] = useState<string | undefined>();

  useEffect(() => {
    mutate({ page, perPage: 10, order: order })
  }, [order, page])

  useEffect(() => {
    if(data) {
      const totalPages = Math.ceil(data.total/data.perPage);

      setTotalPages(totalPages)
      setSchedules(data.data)
    }
  }, [data])

  const handleSearch = () => {
    mutate({ page, perPage: 10, search: search, order: order })
  }

  const handleOpenModalActions = (id: string) => {
    setIsOpen(true)
    setActionId(id)
  }

  const handleCloseModalActions = () => {
    setIsOpen(false)
    setActionId(undefined)
  }

  const handleReloadData = () => {
    if (search) {
      handleSearch()
    } else {
      mutate({ page, perPage: 10, order: order })
    }
  }

  const handleAddSchedule = () => {
    navigate("/agendamento/adicionar")
  }

  const handleAddQuickSchedule = () => {
    navigate("/agendamento/adicionar-rapido")
  }

  return (
    <div>
      <ActionModal 
        scheduleId={actionId} 
        prontuario={schedules.find(it => it.id === actionId)?.prontuario || undefined}
        isOpen={isOpen} 
        handleCloseModalActions={handleCloseModalActions} 
        reloadData={handleReloadData}
      />
      <PageTitle title="Agendamentos" subtitle="Lista dos agendamentos" />
      <div className="flex flex-row items-center justify-between mt-10">
        <Filter setSearch={setSearch} setOrder={setOrder} setPage={setPage} order={order} handleSearch={handleSearch} />
        <div className="flex gap-2">
          <button 
            onClick={handleAddSchedule}
            className="py-2 px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md flex flex-row items-center gap-2"
          >
            <PlusIcon className="size-5"/>
            <p className="text-sm font-semibold">Adicionar</p>
          </button>
          <button 
            onClick={handleAddQuickSchedule}
            className="py-2 px-4 cursor-pointer bg-amber-500 hover:bg-amber-600 transition-colors text-white rounded-md flex flex-row items-center gap-2"
          >
            <BoltIcon className="size-5"/>
            <p className="text-sm font-semibold">Rápido</p>
          </button>
        </div>
      </div>
      <Table 
        schedules={schedules} 
        totalPages={totalPages} 
        page={page} 
        setPage={setPage} 
        loading={isPending} 
        handleActions={handleOpenModalActions} 
        orderBy={order}
      />
    </div>
  )
}

export default AgendamentoList;