import { FC } from 'react';
import { TrendingUp, Trophy } from 'lucide-react';

interface TopListProps {
  title: string;
  items: Array<{ hour: string; count: number }>;
  icon?: React.ReactNode;
}

export const TopList: FC<TopListProps> = ({ title, items, icon }) => {
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon || <Trophy className="size-5 text-amber-500" />}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Sem dados disponíveis</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.hour}
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-transparent hover:from-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{medals[index] || '🏅'}</span>
                <div>
                  <p className="font-semibold text-gray-800">{item.hour}</p>
                  <p className="text-xs text-gray-500">Horário mais popular</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-green-500" />
                <span className="text-lg font-bold text-gray-700">{item.count}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
