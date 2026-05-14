import { useMutation } from "@tanstack/react-query";
import { getClinic } from "../services/clinic";

const useGetClinicBySlug = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['clinic', 'slug'],
    mutationFn: (slug: string) => getClinic(slug),
    retry: false
  });

  return { mutate, isPending, data };
}

export default useGetClinicBySlug;