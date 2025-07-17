import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { isToday } from 'date-fns'; 

interface DaySelectorProps {
  loading: boolean;
  days: string[];
  selectedDay: Date | undefined;
  selectedHour: string | undefined;
  setSelectedHour: (hour: string | undefined) => void;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 40; i++) {
    const hour = Math.floor(i / 4) + 8;
    const minute = (i % 4) * 15;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    slots.push(time);
  }
  return slots;
};

const DaySelector = ({ loading, days, selectedDay, selectedHour, setSelectedHour }: DaySelectorProps) => {
  const [] = useState(12);

  const allTimeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlots = useMemo(() => {
    let slots = allTimeSlots.filter(time => !days?.includes(time));

    if (selectedDay && isToday(selectedDay)) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      slots = slots.filter(time => {
        const [slotHour, slotMinute] = time.split(':').map(Number);

        return slotHour > currentHour || (slotHour === currentHour && slotMinute > currentMinute);
      });
    }

    return slots;
  }, [allTimeSlots, days, selectedDay]);

  const handleTimeSelect = (time: string) => {
    setSelectedHour(time);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Loader2 className="size-6 animate-spin text-blue-800" />
      </div>
    );
  }

  if (!selectedDay || availableSlots.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
        <p>{!selectedDay ? "Selecione um dia para ver os horários." : "Não há horários disponíveis para este dia."}</p>
      </div>
    );
  }

  const morningSlots = availableSlots.filter(time => parseInt(time.split(':')[0]) < 12);
  const afternoonSlots = availableSlots.filter(time => parseInt(time.split(':')[0]) >= 12);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {morningSlots.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Manhã</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {morningSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`p-2 w-full rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${selectedHour === time ? 'bg-blue-800 text-white scale-105' : 'bg-white border border-gray-300 text-gray-800 hover:border-blue-800 hover:bg-blue-50'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Tarde</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {afternoonSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`p-2 w-full rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${selectedHour === time ? 'bg-blue-800 text-white scale-105' : 'bg-white border border-gray-300 text-gray-800 hover:border-blue-800 hover:bg-blue-50'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelector;