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
    mutationFn: (clinicSlug?: string): Promise<DefaultHoursResponse> => {
      let url = '/availability/default';
      if (clinicSlug) {
        url += `?clinicSlug=${clinicSlug}`;
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