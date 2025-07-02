import { useMutation } from "@tanstack/react-query";
import { updateSchedule } from "../services";
import { IScheduleBodyUpdate } from "../model";

interface IUpdateScheduleProps {
  id: string;
  body: IScheduleBodyUpdate;
}

const useUpdateSchedule = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["update-schedule"],
    mutationFn: ({ id, body }: IUpdateScheduleProps) => updateSchedule(id, body)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useUpdateSchedule;