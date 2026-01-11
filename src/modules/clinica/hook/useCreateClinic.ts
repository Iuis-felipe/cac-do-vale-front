import { useMutation } from "@tanstack/react-query" 
import { createClinic } from "../services"
import { IClinicBody } from "../model"

const useCreateClinic = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["createClinic"],
    mutationFn: (clinic: IClinicBody) => createClinic(clinic)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useCreateClinic