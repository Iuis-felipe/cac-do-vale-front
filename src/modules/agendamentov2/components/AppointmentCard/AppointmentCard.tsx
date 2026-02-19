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
}

export function AppointmentCard({ data, onClick }: AppointmentCardProps) {
  return (
    <AppointmentCardRoot onClick={() => onClick?.(data.id)}>
      <CardInfo>
        <User2Icon size={20} color="#212121" />
        <CardName>{truncateText(data.name, 25)}</CardName>
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
