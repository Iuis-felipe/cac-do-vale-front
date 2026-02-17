import { Calendar, Clock } from 'lucide-react';
import {
  AppointmentCardRoot,
  CardName,
  CardInfo,
  CardInfoText,
  StatusIndicator,
  CardWrapper,
} from './AppointmentCard.styled';

export interface AppointmentCardData {
  id: string;
  name: string;
  date: string;
  time: string;
  status?: 'confirmed' | 'waiting' | 'cancelled';
}

interface AppointmentCardProps {
  data: AppointmentCardData;
  onClick?: (id: string) => void;
}

export function AppointmentCard({ data, onClick }: AppointmentCardProps) {
  return (
    <CardWrapper>
      <StatusIndicator status={data.status} />
      <AppointmentCardRoot onClick={() => onClick?.(data.id)}>
        <CardName>{data.name}</CardName>
        <CardInfo>
          <Calendar size={14} color="#9CA3AF" />
          <CardInfoText>{data.date}</CardInfoText>
        </CardInfo>
        <CardInfo>
          <Clock size={14} color="#9CA3AF" />
          <CardInfoText>{data.time}</CardInfoText>
        </CardInfo>
      </AppointmentCardRoot>
    </CardWrapper>
  );
}
