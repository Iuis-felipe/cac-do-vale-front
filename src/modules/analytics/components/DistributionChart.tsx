import { FC } from 'react';

interface DistributionChartProps {
  title: string;
  data: Record<string, number>;
  colors: string[];
  translator?: (key: string) => string;
}

export const DistributionChart: FC<DistributionChartProps> = ({ title, data, colors, translator }) => {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  const maxValue = Math.max(...entries.map(([, value]) => value));

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">Sem dados disponíveis</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {entries.map(([key, value], index) => {
          const percentage = ((value / total) * 100).toFixed(1);
          const width = (value / maxValue) * 100;
          const color = colors[index % colors.length];
          const displayKey = translator ? translator(key) : key;

          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 capitalize">{displayKey}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{value}</span>
                  <span className="text-gray-500">({percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
