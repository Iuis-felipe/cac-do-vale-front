import { useEffect } from "react";
import DaySelector from "../day-selector";
import useGetAvailableHours from "@/modules/cliente/hook/useGetAvailableHours";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HourSelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const HourSelectionFrame = ({ data, setData, setCurrentPage }: HourSelectionFrameProps) => {
  const { mutate, isPending, data: availableHours } = useGetAvailableHours();

  useEffect(() => {
    if (data.dia) {
      mutate(format(data.dia, "yyyy-MM-dd"));
    }
  }, [data.dia, mutate]);

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

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center p-4">
      <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
        Qual o melhor horário para <br />
        <span className="font-bold text-blue-800">{format(data.dia, "EEEE, dd 'de' MMMM", { locale: ptBR })}?</span>
      </p>

      <DaySelector
        loading={isPending}
        selectedDay={data.dia}
        selectedHour={data.horario}
        days={availableHours}
        setSelectedHour={(hour) => setData({ ...data, horario: hour })}
      />

      <div className="w-full max-w-md flex flex-col items-center gap-3 mt-4 text-center">
        {data.horario && (
          <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md">
            Sua consulta será no dia {format(data.dia, "dd/MM/yyyy")} às <strong>{data.horario}</strong>
          </p>
        )}
        <button
          className="w-full mt-4 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
          onClick={() => setCurrentPage(5)}
          disabled={!data.horario}
        >
          Preencher dados pessoais
        </button>
      </div>
    </div>
  );
};

export default HourSelectionFrame;