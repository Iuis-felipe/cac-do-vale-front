import { FC } from 'react';

interface WeeklyTimelineProps {
  data: Array<{ day: string; fullDate: string; count: number }>;
}

export const WeeklyTimeline: FC<WeeklyTimelineProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Agendamentos da Semana</h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const heightPercentage = (item.count / maxCount) * 100;
          const isWeekend = index === 0 || index === 6;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center h-40">
                {item.count > 0 && (
                  <>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isWeekend ? 'bg-purple-400' : 'bg-blue-500'
                      } hover:opacity-80 relative group`}
                      style={{ height: `${heightPercentage}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {item.count} agendamento{item.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
                      {item.count}
                    </span>
                  </>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700 uppercase">{item.day}</p>
                <p className="text-xs text-gray-500">{item.fullDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
