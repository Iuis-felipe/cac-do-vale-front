import { useQuery } from "@tanstack/react-query";
import { getSchedulingAvailableDays } from "../service";

export const useGetSchedulingAvailableDays = (clinicSlug: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['schedulingAvailableDays', clinicSlug],
        queryFn: () => getSchedulingAvailableDays(clinicSlug),
        enabled: !!clinicSlug,
    });

    return {
        availableDays: data,
        isLoading,
    }
}