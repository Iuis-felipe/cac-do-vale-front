import { useMutation } from "@tanstack/react-query"
import { deleteClinic } from "../services"

const useDeleteClinic = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["deleteClinic"],
    mutationFn: (id: string) => deleteClinic(id),
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useDeleteClinic  