import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

interface DaySelectorProps {
  loading: boolean;
  days: string[]; // Horários já ocupados
  selectedDay: Date | undefined;
  selectedHour: string | undefined;
  setSelectedHour: (hour: string | undefined) => void;
}

// Gera a lista completa de horários do dia
const generateTimeSlots = () => {
  const slots = [];
  // Gera horários das 08:00 às 17:45
  for (let i = 0; i < 40; i++) {
    const hour = Math.floor(i / 4) + 8;
    const minute = (i % 4) * 15;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    slots.push(time);
  }
  return slots;
};

const DaySelector = ({ loading, days, selectedDay, selectedHour, setSelectedHour }: DaySelectorProps) => {
  const [visibleCount, setVisibleCount] = useState(12); // NOVO: Controla quantos horários são visíveis

  const allTimeSlots = useMemo(() => generateTimeSlots(), []);
  
  // Filtra apenas os horários disponíveis
  const availableSlots = useMemo(() => {
    return allTimeSlots.filter(time => !days?.includes(time));
  }, [allTimeSlots, days]);

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

  if (!selectedDay || !availableSlots || availableSlots.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
        <p>Não há horários disponíveis para este dia.</p>
      </div>
    );
  }

  const morningSlots = availableSlots.filter(time => parseInt(time.split(':')[0]) < 12);
  const afternoonSlots = availableSlots.filter(time => parseInt(time.split(':')[0]) >= 12);

  // Combina os slots e limita a visibilidade
  const visibleSlots = [...morningSlots, ...afternoonSlots].slice(0, visibleCount);
  
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Horários da Manhã */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Manhã</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {visibleSlots.filter(time => parseInt(time.split(':')[0]) < 12).map(time => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                p-2 w-full rounded-lg text-sm font-medium transition-all duration-200 shadow-sm
                ${selectedHour === time
                  ? 'bg-blue-800 text-white scale-105'
                  : 'bg-white border border-gray-300 text-gray-800 hover:border-blue-800 hover:bg-blue-50'
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {/* Horários da Tarde */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Tarde</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {visibleSlots.filter(time => parseInt(time.split(':')[0]) >= 12).map(time => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                p-2 w-full rounded-lg text-sm font-medium transition-all duration-200 shadow-sm
                ${selectedHour === time
                  ? 'bg-blue-800 text-white scale-105'
                  : 'bg-white border border-gray-300 text-gray-800 hover:border-blue-800 hover:bg-blue-50'
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Botão de "Mostrar Mais" */}
      {visibleCount < availableSlots.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="text-blue-800 font-semibold hover:underline"
          >
            Mostrar mais horários
          </button>
        </div>
      )}
    </div>
  );
};

export default DaySelector;