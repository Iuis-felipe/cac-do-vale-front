import { useQuery } from "@tanstack/react-query";
import { getScheduleById } from "../services";

const useLoadSchedule = (id: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id)
  })

  return { data, isPending, isError, error }
}

export default useLoadSchedule;