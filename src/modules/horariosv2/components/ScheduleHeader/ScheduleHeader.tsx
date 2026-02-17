import { Plus, Calendar } from 'lucide-react';
import {
  ScheduleHeaderRoot,
  HeaderTitle,
  ButtonsContainer,
  PeriodButton,
  AddButton,
} from './ScheduleHeader.styled';

interface ScheduleHeaderProps {
  title: string;
  onCreatePeriod?: () => void;
  onAdd?: () => void;
}

export function ScheduleHeader({ title, onCreatePeriod, onAdd }: ScheduleHeaderProps) {
  return (
    <ScheduleHeaderRoot>
      <HeaderTitle>{title}</HeaderTitle>
      <ButtonsContainer>
        <PeriodButton
          variant="contained"
          startIcon={<Calendar size={18} />}
          onClick={onCreatePeriod}
        >
          Criar período
        </PeriodButton>
        <AddButton
          variant="outlined"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Adicionar
        </AddButton>
      </ButtonsContainer>
    </ScheduleHeaderRoot>
  );
}
