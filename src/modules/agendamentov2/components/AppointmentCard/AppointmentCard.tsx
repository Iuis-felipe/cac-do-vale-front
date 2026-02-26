import { Calendar, Clock, User2Icon } from "lucide-react";
import { AppointmentCardRoot, CardInfo, CardInfoText, CardName, truncateText } from "./AppointmentCard.styled";

export interface AppointmentCardData {
  id: string;
  name: string;
  date: string;
  time: string;
  status?: "confirmed" | "waiting" | "cancelled";
}

interface AppointmentCardProps {
  data: AppointmentCardData;
  onClick?: (id: string) => void;
  view?: 'grid' | 'list';
}

export function AppointmentCard({ data, onClick, view = 'grid' }: AppointmentCardProps) {
  const textLimit = view === 'list' ? 200 : 40;

  return (
    <AppointmentCardRoot onClick={() => onClick?.(data.id)}>
      <CardInfo>
        <User2Icon size={20} color="#212121" />
        <CardName>{truncateText(data.name, textLimit)}</CardName>
      </CardInfo>

      <CardInfo>
        <Calendar size={20} color="#212121" />
        <CardInfoText>{data.date}</CardInfoText>
      </CardInfo>
      <CardInfo>
        <Clock size={20} color="#212121" />
        <CardInfoText>{data.time}</CardInfoText>
      </CardInfo>
    </AppointmentCardRoot>
  );
}
