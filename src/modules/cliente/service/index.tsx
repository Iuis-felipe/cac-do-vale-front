import api from "@/core/api";
import { IScheduleBody } from "@/modules/agendamento/model";

export const createSchedule = async (body: IScheduleBody) => {
  try {
    const { data } = await api.post(`/schedule`, body)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getAvailableHours = async (date: string) => {
  try {
    const { data } = await api.get(`/schedule/available/hours?dia=${date}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}