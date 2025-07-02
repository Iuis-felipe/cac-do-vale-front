import { useMutation } from "@tanstack/react-query";
import { updateScheduleStatus } from "../services";

interface IUpdateScheduleStatusProps {
  id: string;
  status: string;
}

const useUpdateScheduleStatus = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["update-schedule-status"],
    mutationFn: ({ id, status }: IUpdateScheduleStatusProps) => updateScheduleStatus(id, status)
  })

  return { mutate, isPending, isError, error, isSuccess }
}

export default useUpdateScheduleStatus;