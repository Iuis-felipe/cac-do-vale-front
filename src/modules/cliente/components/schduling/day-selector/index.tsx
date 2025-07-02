import { Loader2 } from "lucide-react";

interface DaySelectorProps {
  loading: boolean;
  days: string[];
  selectedDay: Date | undefined;
  selectedHour: string | undefined;
  setSelectedHour: (hour: string | undefined) => void;
}

const DaySelector = ({ loading, days, selectedDay, selectedHour, setSelectedHour }: DaySelectorProps) => {
  const handleTimeSelect = (time: string) => {
    setSelectedHour(time);
  }

  const handleChipColor = (isAvailable: boolean, isSelected: boolean) => {
    if(isAvailable) {
      if(isSelected) {
        return 'bg-sky-600 text-white'
      }

      return 'bg-gray-200 cursor-pointer hover:bg-gray-300'
    }

    return 'bg-red-200 cursor-not-allowed'
  }

  if(loading) {
    return <Loader2 className="w-4 h-4 animate-spin" />
  }

  if(!selectedDay || !days) {
    return null
  }

  return (
    <div className="w-[90%] flex flex-col gap-2">
      <div className="flex flex-row flex-wrap items-center gap-4">
        {Array.from({ length: 37 }, (_, i) => {
          const hour = Math.floor(i / 4) + 8;
          const minute = (i % 4) * 15;
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              
          const isAvailable = !days ? true : !days.includes(time);

          if(!isAvailable) {
            return null
          }
                
          return (
            <div 
              onClick={() => isAvailable && handleTimeSelect(time)}
              key={time} 
              className={`
                w-13 h-9 
                ${handleChipColor(isAvailable, selectedHour === time)}
                rounded-sm flex items-center justify-center cursor-pointer
                shadow-md
              `}
            >
              <span className="text-sm">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;