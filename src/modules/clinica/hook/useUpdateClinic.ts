import { useMutation } from "@tanstack/react-query"
import { updateClinic } from "../services"
import { IClinicBody } from "../model"

interface IUpdateUserProps {
  id: string
  clinic: IClinicBody
}

const useUpdateUser = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: ({ id, clinic }: IUpdateUserProps) => updateClinic(id, clinic),
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useUpdateUser