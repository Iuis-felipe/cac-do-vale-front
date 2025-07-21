import { useMutation } from "@tanstack/react-query";
import { getHorarios } from "../services";

interface IGetHorarios {
  page: number;
  perPage: number;
  search?: string;
}

const useGetHorarios = () => {
   const { data, error, isPending, mutate } = useMutation({
    mutationKey: ["horarios"],
    mutationFn: (body: IGetHorarios) => getHorarios(body.page, body.perPage, body.search),
  })

  return { data, error, isPending, mutate }
}

export default useGetHorarios