import { useMutation } from "@tanstack/react-query";
import { getAvailableHours } from "../service";

interface GetAvailableHoursParams {
  date: string;
  clinicId?: string;
}

const useGetAvailableHours = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['get-available-hours'],
    mutationFn: ({ date, clinicId }: GetAvailableHoursParams) => getAvailableHours(date, clinicId),
  })

  return {
    mutate,
    isError,
    isPending,
    data
  }
}

export default useGetAvailableHours;