import { useMutation } from "@tanstack/react-query"
import { updateCalendarLimit } from "../services";

interface IUpdateCalendarLimitBody {
    isAvailable: boolean;
    clinicId: string;
}

export const useUpdateCalendarLimit = () => {
    const { data, mutate, isPending } = useMutation({
        mutationKey: ['update-calendar-limit'],
        mutationFn: (body: IUpdateCalendarLimitBody) => updateCalendarLimit(body.clinicId, body.isAvailable),
        retry: false
    })

    return { data, mutate, isPending }
}