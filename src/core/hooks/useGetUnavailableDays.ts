import { useMutation } from "@tanstack/react-query";
import { getAllUnavailableDays } from "../services/horarios";

const useGetUnavailableDays = () => {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ['unavailable-days'],
    mutationFn: () => getAllUnavailableDays(),
  });

  return { data, mutate, isPending };
};

export default useGetUnavailableDays;