import { useMutation } from "@tanstack/react-query"
import api from "../api"

interface DefaultHoursResponse {
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  closedDays?: string[];
}

const useGetDefaultHours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['get-default-hours'],
    mutationFn: (clinicId?: string): Promise<DefaultHoursResponse> => {
      let url = '/availability/default';
      if (clinicId) {
        url += `?clinicId=${clinicId}`;
      }
      return api.get(url).then(res => res.data);
    },
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useGetDefaultHours 