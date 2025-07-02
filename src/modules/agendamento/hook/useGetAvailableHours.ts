import { useMutation } from "@tanstack/react-query";
import { getScheduleByDate } from "../services";

const useGetAvailableHours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-available-hours'],
    mutationFn: getScheduleByDate,
  })

  return {
    mutate,
    isPending,
    data
  }
}

export default useGetAvailableHours;