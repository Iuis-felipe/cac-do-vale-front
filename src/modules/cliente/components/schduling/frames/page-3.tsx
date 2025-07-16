import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DaySelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const DaySelectionFrame = ({ data, setData, setCurrentPage }: DaySelectionFrameProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(data.dia ? new Date(data.dia) : undefined);

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
    setData({ ...data, dia: date });
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 justify-center items-center p-4">
      <div className="w-full max-w-sm flex justify-center">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={selectedDay}
          onSelect={handleDaySelect}
          className="rounded-lg border shadow-sm"
          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
        />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
        <div className="h-24 flex items-center">
          {selectedDay ? (
            <p className="text-xl font-semibold text-gray-800">
              <span className="font-bold text-blue-800">{format(selectedDay, "dd/MM/yyyy")}</span> <br />
              é o melhor dia para a consulta?
            </p>
          ) : (
            <p className="text-xl font-semibold text-gray-800">Qual o melhor dia para a consulta?</p>
          )}
        </div>

        <button
          className="w-full max-w-xs mt-4 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
          onClick={() => setCurrentPage(4)}
          disabled={!selectedDay}
        >
          Selecionar horário
        </button>
      </div>
    </div>
  );
};

export default DaySelectionFrame;