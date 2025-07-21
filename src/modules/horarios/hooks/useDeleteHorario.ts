import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../services";

const useDeleteHorario = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['delete-horario'],
    mutationFn: (id: string) => deleteSchedule(id)
  })

  return { mutate, isPending, data, isError }
}

export default useDeleteHorario