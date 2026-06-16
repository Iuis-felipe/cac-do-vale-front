import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "lucide-react";
import { useGetSchedulingAvailableDays } from "@/modules/cliente/hook/useGetAvailableDays";

interface DaySelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const DaySelectionFrame = ({ data, setData, setCurrentPage }: DaySelectionFrameProps) => {
  const domain = window.location.hostname;
  
  const { availableDays, isLoading } = useGetSchedulingAvailableDays(
    domain ? domain.includes("blumed") ? "cac-blumed" : "cac-do-vale" : "cac-do-vale"
  );

  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  
  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDay(date);
    setData({ ...data, dia: date });
  };

  const dataset = new Set(availableDays || []);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 justify-center items-center p-4">
      {isLoading ? (
        <div className="w-full max-w-sm flex justify-center">
          <Loader className="w-12 h-12 animate-spin" />
        </div>
      ) : (
        <div className="w-full max-w-sm flex justify-center">
          <Calendar
            locale={ptBR}
            mode="single"
            selected={selectedDay}
            onSelect={handleDaySelect}
            className="rounded-lg border shadow-sm"
            disabled={(date) => {
              const formatted = format(date, "yyyy-MM-dd")

              // disable everything NOT in the available list
              return !dataset.has(formatted)
            }}
          />
        </div>
      )}
      <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
        <div className="h-24 flex items-center">
          {selectedDay ? (
            <p className="text-xl font-semibold text-gray-800">
              <span className="font-bold text-blue-800">{format(selectedDay, "dd/MM/yyyy")}</span> <br />é o melhor dia
              para a consulta?
            </p>
          ) : (
            <p className="text-xl font-semibold text-gray-800">Qual o melhor dia para a consulta?</p>
          )}
        </div>

        <button
          className="w-full max-w-xs mt-4 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
          onClick={() => setCurrentPage(3)}
          disabled={!selectedDay}
        >
          Selecionar horário
        </button>
      </div>
    </div>
  );
};

export default DaySelectionFrame;
