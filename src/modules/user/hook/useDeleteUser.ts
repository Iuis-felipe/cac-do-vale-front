import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../services"

const useDeleteUser = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: string) => deleteUser(id),
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useDeleteUser  