import { useMutation } from "@tanstack/react-query";
import { createSchedule } from "../services";
import { IScheduleBody } from "../model";

const useCreateSchedule = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["create-schedule"],
    mutationFn: (body: IScheduleBody) => createSchedule(body)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useCreateSchedule;