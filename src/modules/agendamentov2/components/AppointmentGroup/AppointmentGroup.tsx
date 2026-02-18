import { AppointmentCard, AppointmentCardData } from '../AppointmentCard';
import {
  GroupCards,
  GroupCount,
  GroupDate,
  GroupHeader,
  GroupRoot,
} from './AppointmentGroup.styled';

type ViewMode = 'grid' | 'list';

interface AppointmentGroupProps {
  date: string;
  appointments: AppointmentCardData[];
  onCardClick?: (id: string) => void;
  view?: ViewMode;
}

export function AppointmentGroup({ date, appointments, onCardClick, view }: AppointmentGroupProps) {
  return (
    <GroupRoot>
      <GroupHeader>
        <GroupDate>{date}</GroupDate>
        <GroupCount>{appointments.length} agendamentos</GroupCount>
      </GroupHeader>
      <GroupCards view={view}>
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
