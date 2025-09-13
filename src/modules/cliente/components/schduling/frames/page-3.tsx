import { useEffect } from "react";
import DaySelector from "../day-selector";
import useGetAvailableHours from "@/modules/cliente/hook/useGetAvailableHours";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useGetAppointmentHours from "@/core/hooks/useGetAppointmentHours";
import useGetDefaultHours from "@/core/hooks/useGetDefaultHours";
import { XCircle } from "lucide-react";

interface HourSelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const HourSelectionFrame = ({ data, setData, setCurrentPage }: HourSelectionFrameProps) => {
  const { mutate, isPending, data: availableHours } = useGetAvailableHours();
  const { mutate: getAppointmentHours, isPending: loadingAppointmentHours, data: appointmentHours } = useGetAppointmentHours()
  const { mutate: getDefaultHours, isPending: loadingDefaultHours, data: defaultHours } = useGetDefaultHours()

  useEffect(() => {
    if (data.dia) {
      mutate(format(data.dia, "yyyy-MM-dd"));
      getAppointmentHours(format(data.dia, "yyyy-MM-dd"));
      getDefaultHours();
    }
  }, [data.dia]);

  if (!data.dia) {
    return (
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center text-center p-4">
        <p className="text-lg font-semibold text-gray-700">Por favor, selecione um dia primeiro.</p>
        <button onClick={() => setCurrentPage(3)} className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          Voltar
        </button>
      </div>
    );
  }

  if (appointmentHours && appointmentHours.isHoliday) {
    return (
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center text-center p-4">
        <div className="text-center text-gray-500 bg-red-50 p-8 rounded-lg border border-red-200 max-w-md">
          <XCircle className="size-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            O dia <span className="font-semibold">{format(data.dia, "EEEE, dd 'de' MMMM", { locale: ptBR })}</span> não possui horários disponíveis para agendamento.
          </p>
          <button 
            onClick={() => setCurrentPage(2)} 
            className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition cursor-pointer"
          >
            Escolher outro dia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center p-4">
      <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
        Qual o melhor horário para <br />
        <span className="font-bold text-blue-800">{format(data.dia, "EEEE, dd 'de' MMMM", { locale: ptBR })}?</span>
      </p>

      <DaySelector
        loading={isPending || loadingAppointmentHours || loadingDefaultHours}
        selectedDay={data.dia}
        selectedHour={data.horario}
        days={availableHours}
        availableHours={appointmentHours || defaultHours}
        setSelectedHour={(hour) => setData({ ...data, horario: hour })}
      />

      <div className="w-full max-w-md flex flex-col items-center gap-3 mt-4 text-center">
        {data.horario && (
          <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md">
            Sua consulta será no dia {format(data.dia, "dd/MM/yyyy")} às <strong>{data.horario}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default HourSelectionFrame;