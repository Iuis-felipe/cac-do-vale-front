import { useMutation } from "@tanstack/react-query"
import { createUser } from "../services"
import { IUserBody } from "../model"

const useCreateUser = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (user: IUserBody) => createUser(user)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useCreateUser