import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PencilIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner";
import useDeleteClinic from "../../hook/useDeleteClinic";
import { IClinic } from "../../model";

interface IUserTable {
  clinics: IClinic[];
  isLoading: boolean;
  handleEditClinic: (clinic: IClinic) => void;
}

const ClinicTable: React.FC<IUserTable> = ({ clinics, isLoading, handleEditClinic }) => {   
  const { mutate, isPending } = useDeleteClinic()

  const handleDeleteUser = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Clinica excluída com sucesso', {
          duration: 1000,
          onAutoClose: () => {
            window.location.reload()
          }
        });
      },
      onError: () => {
        toast.error('Erro ao excluir usuário', {
          duration: 5000,
        });
      }
    })
  }

  if (isLoading) {
    return <Loader2 className="w-4 h-4 animate-spin" />
  }

  return (
    <Table className="border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clinics.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.nome}</TableCell>
            <TableCell>{it.cnpj}</TableCell>
            <TableCell>{it.telefone}</TableCell>
            <TableCell>{it.email}</TableCell>
            <TableCell>{it.endereco}</TableCell>
            <TableCell className="flex items-center gap-4">
              <button className="text-blue-500 cursor-pointer" onClick={() => handleEditClinic(it)}>
                <PencilIcon className="size-5" />
              </button>
              <button className="text-red-500 cursor-pointer" onClick={() => handleDeleteUser(it.id)}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrashIcon className="size-5" />}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ClinicTable;