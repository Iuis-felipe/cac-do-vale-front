import PageTitle from "../../../core/components/organism/PageTitle";
import useGetUsers from "../hook/useGetUsers";
import { useEffect, useState } from "react";
import UserTable from "../components/Table";
import UserFilter from "../components/Filter";
import UserPagination from "../components/Pagination";
import { PlusIcon } from "lucide-react";
import UserFormModal from "../components/Modal";

const UserPage = () => {
  const { mutate, isPending, data } = useGetUsers()

  const [search, setSearch] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<{ id: string; nome: string; email: string; codigo: string, ativo: boolean, role: string, clinicId: string } | undefined>(undefined)

  useEffect(() => {
    mutate({ page: 1, name: "" })
  }, [])

  const handleSearch = () => {
    mutate({ page: page, name: search })
  }

  const handleEditUser = (user: { id: string; nome: string; email: string; codigo: string, ativo: boolean, role: string, clinicId: string }) => {
    setUser(user)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setUser(undefined)
  }

  return (
    <div>
      <UserFormModal
        user={user}
        isOpen={isOpen}
        handleCloseModalActions={handleCloseModal}
        reloadData={() => mutate({ page: 1, name: "" })}
      />
      <PageTitle title="Administradores" subtitle="Gerênciamento dos usuários" />
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-row items-center justify-between mb-10">
          <UserFilter search={search} setSearch={setSearch} setPage={setPage} handleSearch={handleSearch} />
          <button
            className="py-2 px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md flex flex-row items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="size-5" />
            <p className="text-sm font-semibold">Adicionar</p>
          </button>
        </div>
        <UserTable users={data?.data || []} isLoading={isPending} handleEditUser={handleEditUser} />
        <UserPagination totalPages={data?.totalPages || 1} currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default UserPage;