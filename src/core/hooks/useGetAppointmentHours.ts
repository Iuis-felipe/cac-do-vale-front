import { useMutation } from "@tanstack/react-query"
import { getAppointmentAvailableHours } from "../services/horarios"

const useGetAppointmentHours = () => {
  console.log('Why not?')
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-appointment-hours'],
    mutationFn: (date: string) => getAppointmentAvailableHours(date),
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useGetAppointmentHours
