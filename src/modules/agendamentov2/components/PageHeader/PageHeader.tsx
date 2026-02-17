import { Plus, Zap } from 'lucide-react';
import {
  PageHeaderRoot,
  PageTitle,
  ButtonsContainer,
  QuickButton,
  AddButton,
} from './PageHeader.styled';

interface PageHeaderProps {
  title: string;
  onQuickAdd?: () => void;
  onAdd?: () => void;
  showQuickButton?: boolean;
}

export function PageHeader({ title, onQuickAdd, onAdd, showQuickButton = true }: PageHeaderProps) {
  return (
    <PageHeaderRoot>
      <PageTitle>{title}</PageTitle>
      <ButtonsContainer>
        {showQuickButton && (
          <QuickButton
            variant="contained"
            startIcon={<Zap size={18} />}
            onClick={onQuickAdd}
          >
            Agendamento Rápido
          </QuickButton>
        )}
        <AddButton
          variant="outlined"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Adicionar
        </AddButton>
      </ButtonsContainer>
    </PageHeaderRoot>
  );
}
