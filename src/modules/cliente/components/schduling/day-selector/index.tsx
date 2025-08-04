import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { generateTimeSlots } from '@/core/utils/time';

interface DaySelectorProps {
  loading: boolean;
  days: string[];
  availableHours?: {
    horarioStart: string;
    horarioEnd: string;
    intervalo: string;
    intervaloThreshold: string;
  };
  selectedDay: Date | undefined;
  selectedHour: string | undefined;
  setSelectedHour: (hour: string | undefined) => void;
}

const DaySelector = ({ loading, days, availableHours, selectedDay, selectedHour, setSelectedHour }: DaySelectorProps) => {
  const timeSlotsWithStatus = useMemo(() => {
    if (!selectedDay) return [];

    const threshold = availableHours?.intervaloThreshold ? `${availableHours.intervaloThreshold}:00` : '01:00'
    const times = generateTimeSlots(availableHours?.horarioStart, availableHours?.horarioEnd, days, availableHours?.intervalo, threshold)

    return times
      .filter(it => it.available) 
      .map(it => {
        const isPast = it.time.split(':').map(Number)[0] < selectedDay.getHours() && it.time.split(':').map(Number)[1] < selectedDay.getMinutes()
        
        return {
          time: it.time,
          isBooked: false, 
          isPast: isPast
        }
      })
  }, [availableHours, selectedDay, days]);

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

  if (!selectedDay) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
        <p>Selecione um dia para ver os horários.</p>
      </div>
    );
  }

  if (timeSlotsWithStatus.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
        <p>Não há horários disponíveis para este dia.</p>
      </div>
    );
  }

  const morningSlots = timeSlotsWithStatus.filter(slot => parseInt(slot.time.split(':')[0]) < 12);
  const afternoonSlots = timeSlotsWithStatus.filter(slot => parseInt(slot.time.split(':')[0]) >= 12);

  const renderSlotButton = (slot: { time: string; isBooked: boolean }) => {
    const { time } = slot;

    let buttonClass = 'p-2 w-full rounded-lg text-sm font-medium transition-all duration-200 shadow-sm';

    if (selectedHour === time) {
      buttonClass += ' bg-blue-800 text-white scale-105 shadow-lg';
    } else {
      buttonClass += ' bg-white border border-gray-300 text-gray-800 hover:border-blue-800 hover:bg-blue-50';
    }

    return (
      <button
        key={time}
        onClick={() => handleTimeSelect(time)}
        className={buttonClass}
      >
        {time}
      </button>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {morningSlots.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Manhã</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {morningSlots.map(renderSlotButton)}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Tarde</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {afternoonSlots.map(renderSlotButton)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
