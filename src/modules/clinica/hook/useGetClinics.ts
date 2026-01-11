import { useMutation } from "@tanstack/react-query"
import { getClinics } from "../services"

interface IGetClinicsProps {
  page: number
  search?: string
}

const useGetClinics = () => {
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationKey: ["clinics"],
    mutationFn: ({ page, search }: IGetClinicsProps) => getClinics(page, search),
  })


  return { mutate, isPending, isError, error, isSuccess, data }
}

export default useGetClinics