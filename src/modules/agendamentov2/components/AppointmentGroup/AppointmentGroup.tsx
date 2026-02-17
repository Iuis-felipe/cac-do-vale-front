import { AppointmentCard, AppointmentCardData } from '../AppointmentCard';
import {
  GroupRoot,
  GroupHeader,
  GroupDate,
  GroupCount,
  GroupCards,
} from './AppointmentGroup.styled';

interface AppointmentGroupProps {
  date: string;
  appointments: AppointmentCardData[];
  onCardClick?: (id: string) => void;
}

export function AppointmentGroup({ date, appointments, onCardClick }: AppointmentGroupProps) {
  return (
    <GroupRoot>
      <GroupHeader>
        <GroupDate>{date}</GroupDate>
        <GroupCount>{appointments.length} agendamentos</GroupCount>
      </GroupHeader>
      <GroupCards>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            data={appointment}
            onClick={onCardClick}
          />
        ))}
      </GroupCards>
    </GroupRoot>
  );
}
