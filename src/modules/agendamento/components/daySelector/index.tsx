import { generateTimeSlots } from "@/core/utils/time";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

interface IDaySelector {
  loading: boolean;
  start: string;
  end: string;
  interval: string;
  intervalThreshold: string;
  unavailableHours: string[];
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

const DaySelector: React.FC<IDaySelector> = ({ loading, start, end, interval, intervalThreshold, unavailableHours, selectedTime, setSelectedTime }) => {
  const [hours, setHours] = useState<{ time: string; available: boolean }[]>([])  

  useEffect(() => {
    const hours = generateTimeSlots(start, end, unavailableHours, interval, intervalThreshold);
    
    setHours(hours);
  }, [start, end, interval, intervalThreshold, unavailableHours])
  
  if(loading) return <Loader2 className="w-4 h-4 animate-spin" />

  return (
    <div className="flex flex-row flex-wrap items-center gap-2 mt-4">
      {hours.map((it: { time: string; available: boolean }) => {
        return (
          <div 
            onClick={() => it.available && setSelectedTime(it.time)}
            key={it.time} 
            className={`
              w-16 h-10 
              ${selectedTime === it.time ? 'border-1 border-sky-600' : ''}
              ${it.available ? 'bg-gray-200 cursor-pointer hover:bg-gray-300' : 'bg-red-200'} 
              rounded-md flex items-center justify-center
            `}
          >
            <span className="text-sm">{it.time}</span>
          </div>
        )
      })}
    </div>
  )
}

export default DaySelector