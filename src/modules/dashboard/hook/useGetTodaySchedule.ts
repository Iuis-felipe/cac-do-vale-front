import { useQuery } from "@tanstack/react-query";
import { getDashboardSchedules } from "../services";

const useGetTodaySchedule = () => {
  const { data, isPending } = useQuery({
    queryKey: ['today-schedules'],
    queryFn: () => getDashboardSchedules(),
  });

  return { data, isPending };
}

export default useGetTodaySchedule; 