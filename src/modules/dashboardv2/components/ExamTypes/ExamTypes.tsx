import { CardRoot, CardTitle } from '@/components';
import {
  ExamItem,
  ExamItemHeader,
  ExamItemName,
  ExamItemStats,
  ExamProgressBar,
} from './ExamTypes.styled';

interface ExamData {
  name: string;
  count: number;
  percentage: number;
}

interface ExamTypesProps {
  data: ExamData[];
}

export function ExamTypes({ data }: ExamTypesProps) {
  return (
    <CardRoot>
      <CardTitle>Tipos de Exames</CardTitle>
      {data.map((item, index) => (
        <ExamItem key={index}>
          <ExamItemHeader>
            <ExamItemName>{item.name}</ExamItemName>
            <ExamItemStats>
              {item.count.toLocaleString('pt-BR')} ({item.percentage.toFixed(1)}%)
            </ExamItemStats>
          </ExamItemHeader>
          <ExamProgressBar variant="determinate" value={item.percentage} />
        </ExamItem>
      ))}
    </CardRoot>
  );
}
