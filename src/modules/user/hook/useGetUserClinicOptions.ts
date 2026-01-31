import { useQuery } from "@tanstack/react-query"
import { getClinics } from "../services"

const useGetUserClinicOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['clinics'],
    queryFn: getClinics
  })
    
  return {
    clinics: data,
    isLoading,
    error
  }
}

export default useGetUserClinicOptions