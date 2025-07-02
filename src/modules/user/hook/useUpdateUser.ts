import { useMutation } from "@tanstack/react-query"
import { IUserUpdateBody } from "../model"
import { updateUser } from "../services"

interface IUpdateUserProps {
  id: string
  user: IUserUpdateBody
}

const useUpdateUser = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: ({ id, user }: IUpdateUserProps) => updateUser(id, user),
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useUpdateUser