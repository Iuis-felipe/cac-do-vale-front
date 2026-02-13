import {
  ExamTypesRoot,
  ExamTypesTitle,
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
    <ExamTypesRoot>
      <ExamTypesTitle>Tipos de Exames</ExamTypesTitle>
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
    </ExamTypesRoot>
  );
}
