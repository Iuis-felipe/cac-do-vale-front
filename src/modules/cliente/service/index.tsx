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

export const getAvailableHours = async (date: string, clinicSlug?: string) => {
  try {
    let url = `/schedule/available/hours?dia=${date}`;
    if (clinicSlug) {
      url += `&clinicSlug=${clinicSlug}`;
    }
    const { data } = await api.get(url);

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getClinics = async (slug: string) => {
  try {
    const { data } = await api.get(`/clinic/by-slug/${slug}`)
    
    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}
