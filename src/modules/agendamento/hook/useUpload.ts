import { useMutation } from "@tanstack/react-query";
import { uploadScheduleFile } from "../services";

export const useUpload = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-schedule-file"],
    mutationFn: ({ file, scheduleId }: { file: File, scheduleId: string }) => uploadScheduleFile({ file, scheduleId }),
  });

  return {
    uploadScheduleFile: mutate,
    isPending,
  };
};