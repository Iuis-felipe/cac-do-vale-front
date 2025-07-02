import { useMutation } from "@tanstack/react-query"
import { getUsers } from "../services"

interface IGetUsersProps {
  page: number
  name?: string
}

const useGetUsers = () => {
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationKey: ["users"],
    mutationFn: ({ page, name }: IGetUsersProps) => getUsers(page, name),
  })


  return { mutate, isPending, isError, error, isSuccess, data }
}

export default useGetUsers