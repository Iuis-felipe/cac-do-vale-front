import { useMutation } from "@tanstack/react-query"
import api from "../api"

const useGetDefaultHours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-default-hours'],
    mutationFn: () => api.get('/availability/default').then(res => res.data),
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useGetDefaultHours 