import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PencilIcon, TrashIcon } from "lucide-react"
import useDeleteUser from "../../hook/useDeleteUser";
import { useEffect } from "react";
import { toast } from "sonner";

const roleMap: Record<string, string> = {
  ADMIN: "Admin local",
  ATENDENTE: "Gestor",
  OWNER: "Permissão total"
}

interface IUserTable {
  users: { id: string; nome: string; email: string; codigo: string, role: string, ativo: boolean, clinic: { nome: string, id: string } }[];
  isLoading: boolean;
  handleEditUser: (user: { id: string; nome: string; email: string; codigo: string, ativo: boolean, role: string, clinicId: string }) => void;
}

const UserTable: React.FC<IUserTable> = ({ users, isLoading, handleEditUser }) => {   
  const { mutate, isSuccess, isError } = useDeleteUser()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Usuário excluído com sucesso', {
        duration: 1000,
        onAutoClose: () => {
          window.location.reload()
        }
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao excluir usuário', {
        duration: 5000,
      });
    }
  }, [isError]);

  const handleDeleteUser = (id: string) => {
    mutate(id)
  }

  if (isLoading) {
    return <Loader2 className="w-4 h-4 animate-spin" />
  }

  return (
    <Table className="border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Permissão</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Clinica</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.codigo}</TableCell>
            <TableCell>{roleMap[user.role]}</TableCell>
            <TableCell>{user.nome}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.clinic.nome}</TableCell>
            <TableCell>{user.ativo ? "Ativo" : "Inativo"}</TableCell>
            <TableCell className="flex items-center gap-4">
              <button className="text-blue-500 cursor-pointer" onClick={() => handleEditUser({
                ...user,
                clinicId: user.clinic.id
              })}>
                <PencilIcon className="size-5" />
              </button>
              <button className="text-red-500 cursor-pointer" onClick={() => handleDeleteUser(user.id)}>
                <TrashIcon className="size-5" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTable