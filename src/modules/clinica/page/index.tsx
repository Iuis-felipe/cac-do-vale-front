import PageTitle from "../../../core/components/organism/PageTitle";
import ClinicFilter from "../components/Filter";
import ClinicTable from "../components/Table";
import ClinicPagination from "../components/Pagination";
import { PlusIcon } from "lucide-react";
import useGetClinics from "../hook/useGetClinics";
import { useEffect, useState } from "react";
import { IClinic } from "../model";
import ClinicFormModal from "../components/Modal";

const ClinicPage = () => {
  const { mutate, isPending, data } = useGetClinics()

  const [search, setSearch] = useState<string | undefined>("")
  const [page, setPage] = useState<number>(1)
  const [clinic, setClinic] = useState<IClinic | undefined>(undefined)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSearch = () => {
    mutate({ page, search })
  }

  const handleEditClinic = (clinic: IClinic) => {
    setClinic(clinic)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setClinic(undefined)
  }

  useEffect(() => {
    mutate({ page: 1, search: "" })
  }, [])
  
  return (
    <div>
      <ClinicFormModal
        clinic={clinic}
        isOpen={isOpen}
        handleCloseModalActions={handleCloseModal}
        reloadData={() => mutate({ page: 1, search })}
      />
      <PageTitle title="Clinica" subtitle="Gerênciamento das clinicas" />
       <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-row items-center justify-between mb-10">
          <ClinicFilter 
            search={search} 
            setSearch={setSearch}
            handleSearch={handleSearch} 
            handleClear={() => {
              setSearch("")
              setPage(1)
              mutate({ page: 1, search: "" })
            }}
          />
          <button
            className="py-2 px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md flex flex-row items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="size-5" />
            <p className="text-sm font-semibold">Adicionar</p>
          </button>
        </div>
        <ClinicTable clinics={data?.clinic || []} isLoading={isPending} handleEditClinic={handleEditClinic} />
        <ClinicPagination totalPages={data?.totalPages || 1} currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default ClinicPage;