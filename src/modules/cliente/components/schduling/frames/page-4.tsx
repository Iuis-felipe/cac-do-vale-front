import { useEffect } from "react";
import DaySelector from "../day-selector";
import useGetAvailableHours from "@/modules/cliente/hook/useGetAvailableHours";
import { format } from "date-fns";

interface HourSelectionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const HourSelectionFrame = ({ data, setData, setCurrentPage }: HourSelectionFrameProps) => {
  const { mutate, isPending, data: availableHours } = useGetAvailableHours();

  useEffect(() => {
    if(data.dia) {
      mutate(format(data.dia, "yyyy-MM-dd"));
    }
  }, [data]);

  const handleSelectHour = (hour: string | undefined) => {
    if(hour) {
      setData({ ...data, horario: hour });
    }
  }

  if(!data.dia) {
    return (
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
        <p className="text-lg font-semibold"> Por favor, selecione o dia da consulta </p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
      <p className="text-lg font-semibold"> Qual o melhor horário para a consulta? </p>
      <DaySelector
        loading={isPending}
        selectedDay={data.dia}
        selectedHour={data.horario}
        days={availableHours}
        setSelectedHour={handleSelectHour}
      />
      <div className="w-full flex flex-col items-center gap-3 mt-4">
        {data.horario && data.dia && (
          <p className="text-sm text-gray-500"> Sua consulta será no dia {format(data.dia, "dd/MM/yyyy")} às {data.horario} </p>
        )}
        <button className="w-[30%] py-2 bg-blue-800 text-white rounded-md cursor-pointer" onClick={() => setCurrentPage(5)}>
          Dados pessoais
        </button>
      </div>
    </div>
  )
}

export default HourSelectionFrame;