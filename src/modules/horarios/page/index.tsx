import PageTitle from "../../../core/components/organism/PageTitle";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import ScheduleFilter from "../components/Filter";
import SchedulePagination from "../components/Pagination";
import useGetHorarios from "../hooks/useGetHorarioos";
import ScheduleFormModal from "../components/modal/Create";
import ScheduleTable from "../components/Table";
import { ISchedule } from "../model";
import ScheduleDeleteModal from "../components/modal/Delete";
import ScheduleBulkCreateModal from "../components/modal/BulkCreate";
import useUpdateIsHoliday from "../hooks/useUpdateIsHoliday";
import { toast } from "sonner";

const Horarios = () => {
  const { data, isPending, mutate } = useGetHorarios()
  const { mutate: updateIsHoliday, isPending: isPendingUpdateIsHoliday } = useUpdateIsHoliday()

  const [search, setSearch] = useState<string | undefined>(undefined)
  const [scheduleId, setScheduleId] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<ISchedule | undefined>(undefined)
  const [isOpenBulkCreate, setIsOpenBulkCreate] = useState<boolean>(false)

  useEffect(() => {
    mutate({ page: 1, perPage: 10, search: "" })
  }, [])

  const handleSearch = () => {
    mutate({ page: page, perPage: 10, search: search })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    mutate({ page: page, perPage: 10, search: search })
  }

  const handleEditSchedule = (schedule: ISchedule) => {
    setSchedule(schedule)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setSchedule(undefined)
  }

  const handleDeleteSchedule = (id: string) => {
    setScheduleId(id)
    setIsOpenDelete(true)
  }

  const handleUpdateIsHoliday = (id: string, isHoliday: boolean) => {
    updateIsHoliday({ id, body: { isHoliday } }, {
      onSuccess: () => {
        toast.success("Horário atualizado com sucesso!")
        mutate({ page: 1, perPage: 10, search: "" })
      }
    })
  }

  console.log('1', Math.floor(data?.total / data?.perPage))
  return (
    <div>
      <ScheduleFormModal
        schedule={schedule}
        isOpen={isOpen}
        handleCloseModalActions={handleCloseModal}
        reloadData={() => mutate({ page: 1, perPage: 10, search: "" })}
      />
      <ScheduleDeleteModal
        isOpen={isOpenDelete}
        scheduleId={scheduleId || ""}
        reloadData={() => mutate({ page: 1, perPage: 10, search: "" })}
        onClose={() => setIsOpenDelete(false)}
      />
      <ScheduleBulkCreateModal
        isOpen={isOpenBulkCreate}
        reloadData={() => mutate({ page: 1, perPage: 10, search: "" })}
        onClose={() => setIsOpenBulkCreate(false)}
      />
      <PageTitle title="Horários" subtitle="Gerênciamento dos horários" />
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-row items-center justify-between mb-10">
          <ScheduleFilter search={search} setSearch={setSearch} setPage={setPage} handleSearch={handleSearch} />
          <div className="flex flex-row items-center gap-2">
            <button
              className="py-2 px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md flex flex-row items-center gap-2"
              onClick={() => setIsOpenBulkCreate(true)}
            >
              <PlusIcon className="size-5" />
              <p className="text-sm font-semibold">Criar período</p>
            </button>
            <button
              className="py-2 px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md flex flex-row items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <PlusIcon className="size-5" />
              <p className="text-sm font-semibold">Adicionar</p>
            </button>
          </div>
        </div>
        <ScheduleTable
          schedules={data?.data || []}
          isLoading={isPending || isPendingUpdateIsHoliday}
          handleEditSchedule={handleEditSchedule}
          handleDeleteSchedule={handleDeleteSchedule}
          handleUpdateStatus={handleUpdateIsHoliday}
        />
        <SchedulePagination
          totalPages={Math.ceil(data?.total / data?.perPage) || 1}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Horarios;