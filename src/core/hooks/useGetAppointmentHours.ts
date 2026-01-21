import { useMutation } from "@tanstack/react-query"
import { getAppointmentAvailableHours } from "../services/horarios"

interface GetAppointmentHoursParams {
  date: string;
  clinicId?: string;
}

const useGetAppointmentHours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-appointment-hours'],
    mutationFn: ({ date, clinicId }: GetAppointmentHoursParams) => getAppointmentAvailableHours(date, clinicId),
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useGetAppointmentHours
