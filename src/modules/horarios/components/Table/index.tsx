import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PencilIcon, TrashIcon, CopyIcon } from "lucide-react"
import { addHours, format } from "date-fns"
import { toast } from "sonner"
import { generateWhatsAppMessage, copyToClipboard } from "../../utils/messageGenerator"

interface ISchedule {
  created_at: string;
  dia: string;
  horarioEnd: string;
  horarioStart: string;
  id: string;
  intervalo: string;
  intervaloThreshold: string;
  updated_at: string;
}


interface IScheduleTable {
  schedules: ISchedule[];
  isLoading: boolean;
  handleEditSchedule: (schedule: ISchedule) => void;
  handleDeleteSchedule: (id: string) => void;
}

const ScheduleTable: React.FC<IScheduleTable> = ({ schedules, isLoading, handleEditSchedule, handleDeleteSchedule }) => {

  const handleCopyMessage = async (schedule: ISchedule) => {
    try {
      const message = await generateWhatsAppMessage(schedule);
      const success = await copyToClipboard(message);

      if (success) {
        toast.success("Mensagem copiada para a área de transferência!");
      } else {
        toast.error("Erro ao copiar mensagem. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao gerar mensagem. Tente novamente.");
    }
  };

  if (isLoading) {
    return <Loader2 className="w-4 h-4 animate-spin" />
  }

  return (
    <Table className="border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Dia</TableHead>
          <TableHead className="text-center">Inicio expediente</TableHead>
          <TableHead className="text-center">Fim expediente</TableHead>
          <TableHead className="text-center">Intervalo</TableHead>
          <TableHead className="text-center">Duração do intervalo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell>{format(addHours(schedule.dia, 3), "dd/MM/yyyy")}</TableCell>
            <TableCell className="text-center">{schedule.horarioStart}</TableCell>
            <TableCell className="text-center">{schedule.horarioEnd}</TableCell>
            <TableCell className="text-center">{schedule.intervalo}</TableCell>
            <TableCell className="text-center">{schedule.intervaloThreshold} hora</TableCell>
            <TableCell className="flex items-center gap-4">
              <button
                className="text-green-500 cursor-pointer hover:text-green-700 transition-colors"
                onClick={() => handleCopyMessage(schedule)}
                title="Copiar mensagem para WhatsApp"
              >
                <CopyIcon className="size-5" />
              </button>
              <button className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => handleEditSchedule(schedule)}>
                <PencilIcon className="size-5" />
              </button>
              <button className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDeleteSchedule(schedule.id)}>
                <TrashIcon className="size-5" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ScheduleTable