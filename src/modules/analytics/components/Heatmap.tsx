import { FC } from 'react';

interface HeatmapProps {
  data: Record<string, number>;
}

export const Heatmap: FC<HeatmapProps> = ({ data }) => {
  const hours = Array.from({ length: 13 }, (_, i) => (i + 7).toString().padStart(2, '0')); // 7h às 19h
  const maxValue = Math.max(...Object.values(data), 1);

  const getColor = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    const intensity = (value / maxValue) * 100;
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-400';
    if (intensity >= 40) return 'bg-yellow-400';
    if (intensity >= 20) return 'bg-green-400';
    return 'bg-blue-300';
  };

  const getTextColor = (value: number) => {
    if (value === 0) return 'text-gray-400';
    const intensity = (value / maxValue) * 100;
    return intensity >= 40 ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Horários Mais Procurados</h3>
      <div className="grid grid-cols-7 gap-2 sm:grid-cols-13">
        {hours.map((hour) => {
          const value = data[hour] || 0;
          return (
            <div key={hour} className="relative group">
              <div
                className={`${getColor(value)} ${getTextColor(
                  value
                )} aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer`}
              >
                <span className="text-xs font-bold">{hour}h</span>
                <span className="text-lg font-bold">{value}</span>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {value} agendamento{value !== 1 ? 's' : ''}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300 rounded" />
          <span className="text-gray-600">Baixo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded" />
          <span className="text-gray-600">Médio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded" />
          <span className="text-gray-600">Alto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-gray-600">Muito Alto</span>
        </div>
      </div>
    </div>
  );
};
