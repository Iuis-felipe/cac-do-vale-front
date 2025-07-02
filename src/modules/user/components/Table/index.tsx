import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PencilIcon, TrashIcon } from "lucide-react"

interface IUserTable {
  users: { id: string; nome: string; email: string; codigo: string, ativo: boolean }[];
  isLoading: boolean;
  handleEditUser: (user: { id: string; nome: string; email: string; codigo: string, ativo: boolean }) => void;
}

const UserTable: React.FC<IUserTable> = ({ users, isLoading, handleEditUser }) => {

  if (isLoading) {
    return <Loader2 className="w-4 h-4 animate-spin" />
  }

  return (
    <Table className="border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.codigo}</TableCell>
            <TableCell>{user.nome}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.ativo ? "Ativo" : "Inativo"}</TableCell>
            <TableCell className="flex items-center gap-4">
              <button className="text-blue-500" onClick={() => handleEditUser(user)}>
                <PencilIcon className="size-5" />
              </button>
              <button className="text-red-500">
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