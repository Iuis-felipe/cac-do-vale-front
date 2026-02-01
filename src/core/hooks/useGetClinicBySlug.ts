import { useMutation } from "@tanstack/react-query";
import { getClinic } from "../services/clinic";
import clinicStore from "../store/clinic";

const useGetClinicBySlug = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['clinic', 'slug'],
    mutationFn: (slug: string) => getClinic(slug),
    retry: false,
    onSuccess: (data) => {
      const setClinic = clinicStore.getState().setClinic;
      setClinic(data);
    }
  });

  return { mutate, isPending };
}

export default useGetClinicBySlug;