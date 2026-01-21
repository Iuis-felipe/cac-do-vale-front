import { useQuery } from "@tanstack/react-query"
import { getAllClinics } from "../services"

const useGetAllClinics = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["all-clinics"],
    queryFn: () => getAllClinics(),
  })

  return { data, isPending, isError, error, isSuccess }
}

export default useGetAllClinics
