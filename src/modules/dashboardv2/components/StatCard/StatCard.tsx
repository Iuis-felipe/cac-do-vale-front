import {
  StatCardRoot,
  StatCardTitle,
  StatCardSubtitle,
  StatCardValue,
  StatCardBadge,
  StatCardHeader,
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
      <StatCardHeader>
        <StatCardTitle>{title}</StatCardTitle>
        {badge && <StatCardBadge trend={trend}>{badge}</StatCardBadge>}
      </StatCardHeader>
      <StatCardSubtitle>{subtitle}</StatCardSubtitle>
      <StatCardValue>{value}</StatCardValue>
    </StatCardRoot>
  );
}
