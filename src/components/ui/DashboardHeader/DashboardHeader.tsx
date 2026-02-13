import { RefreshButton } from '@/modules/dashboardv2/components/RefreshButton';
import {
  DashboardHeaderRoot,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
} from './DashboardHeader.styled';

interface DashboardHeaderProps {
  userName: string;
  date: Date;
  onRefresh?: () => void;
  loading?: boolean;
}

function toPascalCase(value: string, separator = ' '): string {
  return value
    .replace(/[-_]/g, separator)
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
}

export function DashboardHeader({ userName, date, onRefresh, loading,  }: DashboardHeaderProps) {
  const weekday = toPascalCase(
    date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    '-'
  );
  const formattedDate = date.toLocaleDateString('pt-BR');

  return (
    <DashboardHeaderRoot>
      <HeaderInfo>
        <HeaderTitle>Olá, {userName}!</HeaderTitle>
        <HeaderSubtitle>{weekday} {formattedDate}</HeaderSubtitle>
      </HeaderInfo>
     {onRefresh && <RefreshButton onClick={onRefresh} loading={loading} />}
    </DashboardHeaderRoot>
  );
}
