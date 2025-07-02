import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface DaySelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const DaySelectionFrame = ({ data, setData, setCurrentPage }: DaySelectionFrameProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  
  useEffect(() => {
    if(data.dia && data.horario) {
      setSelectedDay(data.dia);
    }
  }, [data]);

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
    setData({
      ...data,
      dia: date,
    })
  }

  return (
    <div className="w-full h-full flex flex-row gap-6 justify-center items-center">
      <div className="w-1/2 flex flex-row items-center justify-center">
        <Calendar
          mode="single"
          selected={selectedDay}
          onSelect={handleDaySelect}
          className="rounded-lg border"
        />
      </div>
      <div className="w-1/2 flex flex-col items-center gap-4"> 
        <div className={`transition-opacity duration-300 ${selectedDay ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-lg font-semibold">
            <span className="text-blue-800">{selectedDay ? format(selectedDay, "dd/MM/yyyy") : ''}</span> <br/>
            é o melhor dia para a consulta?
          </p>
        </div>
        <div className={`transition-opacity duration-300 absolute ${selectedDay ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-lg font-semibold">Qual o melhor dia para a consulta?</p>
        </div>
        
        <button className="w-[50%] py-2 bg-blue-800 text-white rounded-md cursor-pointer" onClick={() => setCurrentPage(4)}>
          Selecionar horário
        </button>
      </div>
    </div>
  );
};

export default DaySelectionFrame;