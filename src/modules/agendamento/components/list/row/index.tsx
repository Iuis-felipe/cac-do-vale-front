import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "lucide-react";
import CellItem from "../cell";
import { format } from "date-fns";
import { useDeleteSchedule } from "../../../hook/useDeleteSchedule";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ITableRowProps {
  data: any;
  handleActions: (id: string) => void;
}

const TableRow: React.FC<ITableRowProps> = ({ data, handleActions }) => {
  const { deleteSchedule, isPending } = useDeleteSchedule();
  
  const { nome_civil, nome_social, telefone, cpf, categoria, origem, dia, status } = data;

  const statusColor = (status: string) => {
    if (status === "pendente") {
      return "text-orange-500";
    }

    if (status === "cancelado") {
      return "text-red-500";
    }

    return "text-green-500";
  };

  const handleDeleteSchedule = (id: string) => {
    deleteSchedule(id, {
      onSuccess: () => {
        toast.success("Agendamento deletado com sucesso");
        window.location.reload();
      },
      onError: () => {
        toast.error("Erro ao deletar agendamento");
      },
    });
  };

  return (
    <div className="grid grid-cols-9 border border-gray-200">
      <CellItem text={nome_social || nome_civil} colSpan={2} />
      <CellItem text={telefone} />
      <CellItem text={cpf} />
      <CellItem text={categoria} />
      <CellItem text={origem} />
      <CellItem text={format(new Date(dia), "dd/MM/yyyy HH:mm")} />
      <CellItem text={status} textColor={statusColor(status)} />
      <div className="flex flex-row items-center justify-center gap-3 p-2">
        <button className="p-0 cursor-pointer" onClick={() => handleActions(data.id)}>
          <Cog8ToothIcon className="size-6 text-slate-600" />
        </button>
        <button className="p-0 cursor-pointer" onClick={() => handleDeleteSchedule(data.id)}>
          {isPending ? <Loader2 className="size-5 animate-spin text-red-500" /> : <TrashIcon className="size-5 text-red-500" />}
        </button>
      </div>
    </div>
  );
};

export default TableRow;