import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../services";

export const useDeleteSchedule = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-schedule-permanent"],
    mutationFn: deleteSchedule,
  });

  return {
    deleteSchedule: mutate,
    isPending,
  };
};