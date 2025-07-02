import { useMutation } from "@tanstack/react-query";
import { createSchedule } from "@/modules/agendamento/services";
import { IScheduleBody } from "@/modules/agendamento/model";

const useCreateClientSchedule = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["create-client-schedule"],
    mutationFn: (body: IScheduleBody) => createSchedule(body)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useCreateClientSchedule;