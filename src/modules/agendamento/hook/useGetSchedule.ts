import { useMutation } from "@tanstack/react-query"
import { getSchedules } from "../services";

interface IGetSchedules {
  page: number;
  perPage: number;
  search?: string;
  order?: string;
}

export const useGetSchedule = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['get-schedules'],
    mutationFn: (body: IGetSchedules) => getSchedules(body.page, body.perPage, body.search, body.order)
  })

  return { mutate, isPending, data, isError }
}