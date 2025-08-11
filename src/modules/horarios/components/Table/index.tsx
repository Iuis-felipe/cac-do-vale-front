import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PencilIcon, TrashIcon, CopyIcon, XCircleIcon } from "lucide-react"
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
  isClosed?: boolean;
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
          <TableHead className="text-center">Status</TableHead>
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
            <TableCell className="text-center">
              {schedule.isClosed ? (
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <XCircleIcon className="size-4" />
                  <span className="text-sm font-medium">Fechado</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <div className="size-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Aberto</span>
                </div>
              )}
            </TableCell>
            <TableCell className="text-center">
              {schedule.isClosed ? (
                <span className="text-gray-400">-</span>
              ) : (
                schedule.horarioStart
              )}
            </TableCell>
            <TableCell className="text-center">
              {schedule.isClosed ? (
                <span className="text-gray-400">-</span>
              ) : (
                schedule.horarioEnd
              )}
            </TableCell>
            <TableCell className="text-center">
              {schedule.isClosed ? (
                <span className="text-gray-400">-</span>
              ) : (
                schedule.intervalo
              )}
            </TableCell>
            <TableCell className="text-center">
              {schedule.isClosed ? (
                <span className="text-gray-400">-</span>
              ) : (
                `${schedule.intervaloThreshold} hora`
              )}
            </TableCell>
            <TableCell className="flex items-center gap-4">
              {!schedule.isClosed && (
                <button
                  className="text-green-500 cursor-pointer hover:text-green-700 transition-colors"
                  onClick={() => handleCopyMessage(schedule)}
                  title="Copiar mensagem para WhatsApp"
                >
                  <CopyIcon className="size-5" />
                </button>
              )}
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