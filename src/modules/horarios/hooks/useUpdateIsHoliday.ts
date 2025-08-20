import { useMutation } from "@tanstack/react-query"
import { updateIsHoliday } from "../services"

const useUpdateIsHoliday = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['update-is-holiday'],
    mutationFn: ({ id, body }: { id: string, body: { isHoliday: boolean } }) => updateIsHoliday(id, body),
  })
 
  return {
    mutate,
    isPending,
    data
  }
}

export default useUpdateIsHoliday