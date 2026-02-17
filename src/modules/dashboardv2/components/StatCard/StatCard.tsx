import { CardTitle, CardSubtitle } from '@/components';
import {
  StatCardRoot,
  StatCardValue,
  StatCardBadge,
  StatCardHeader,
  StatCardContainer,
} from './StatCard.styled';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  trend?: 'up' | 'down';
}

export function StatCard({ title, value, subtitle, badge, trend }: StatCardProps) {
  return (
    <StatCardRoot>
      <StatCardContainer>
        <StatCardHeader>
          <CardTitle>{title}</CardTitle>
          {badge && <StatCardBadge trend={trend}>{badge}</StatCardBadge>}
        </StatCardHeader>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </StatCardContainer>
      <StatCardValue>{value}</StatCardValue>
    </StatCardRoot>
  );
}
