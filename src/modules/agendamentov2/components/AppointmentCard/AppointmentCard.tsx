import { Calendar, Clock, User2Icon } from "lucide-react";
import { AppointmentCardRoot, CardInfo, CardInfoText, CardName } from "./AppointmentCard.styled";

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
        <CardName>{data.name}</CardName>
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
