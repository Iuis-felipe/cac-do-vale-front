import { useMutation } from "@tanstack/react-query";
import { getAvailableHours } from "../service";

const useGetAvailableHours = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['get-available-hours'],
    mutationFn: getAvailableHours,
  })

  return {
    mutate,
    isError,
    isPending,
    data
  }
}

export default useGetAvailableHours;