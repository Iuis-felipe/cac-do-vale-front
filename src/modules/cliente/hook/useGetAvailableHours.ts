import { useMutation } from "@tanstack/react-query";
import { getAvailableHours } from "../service";

interface GetAvailableHoursParams {
  date: string;
  clinicSlug?: string;
}

const useGetAvailableHours = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['get-available-hours'],
    mutationFn: ({ date, clinicSlug }: GetAvailableHoursParams) => getAvailableHours(date, clinicSlug), 
  })

  return {
    mutate,
    isError,
    isPending,
    data
  }
}

export default useGetAvailableHours;