import { useMutation } from "@tanstack/react-query";
import { updateIsRecess } from "../services";

interface IUpdateIsRecess {
  id: string;
  body: { isRecess: boolean }
}

const useUpdateIsRecess = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['update-is-recess'],
    mutationFn: (body: IUpdateIsRecess) => updateIsRecess(body.id, body.body)
  })

  return { mutate, isPending, data, isError }
}

export default useUpdateIsRecess