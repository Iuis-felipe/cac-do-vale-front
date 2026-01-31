import { useMutation } from "@tanstack/react-query"
import { getAppointmentAvailableHours } from "../services/horarios"

interface GetAppointmentHoursParams {
  date: string;
  clinicSlug?: string;
}

const useGetAppointmentHours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-appointment-hours'],
    mutationFn: ({ date, clinicSlug }: GetAppointmentHoursParams) => getAppointmentAvailableHours(date, clinicSlug),
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useGetAppointmentHours
