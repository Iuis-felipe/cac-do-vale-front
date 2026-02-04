import clinicStore from "@/core/store/clinic";
import api from "../../../core/api"
import { IScheduleBody, IScheduleBodyUpdate } from "../model";

export const getSchedules = async (page: number, perPage: number,  search?: string, order?: string) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    let urlQuery = `pagina=${page}&perPage=${perPage}&clinicId=${clinic.id}`;

    if(search) {
      urlQuery = urlQuery + `&search=${search}`;
    }

    if(order) {
      urlQuery = urlQuery + `&order=${order}`
    }

    const { data } = await api.get(`/schedule?${urlQuery}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const updateScheduleStatus = async (id: string, status: string) => {
  try {
    const { data } = await api.put(`/schedule/${id}/status`, { status })

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getScheduleById = async (id: string) => {
  try {
    const { data } = await api.get(`/schedule/${id}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getScheduleByDate = async (date: string) => {
  try {
    const { data } = await api.get(`/schedule/available/hours?dia=${date}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const createSchedule = async (body: IScheduleBody) => {
  try {
    const clinic = clinicStore.getState().clinic;

    body.clinicSlug = clinic?.slug;
    body.clinicId = clinic?.id;

    const { data } = await api.post(`/schedule`, body)

    return data;
  } catch(e: any) {
    throw new Error(e.response.data.error || e)
  }
}

export const updateSchedule = async (id: string, body: IScheduleBodyUpdate) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    const scheduleBody: any = {
      ...body,
      clinicSlug: clinic.slug
    };

    const { data } = await api.put(`/schedule/${id}`, scheduleBody)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const deleteSchedule = async (id: string) => {
  try {
    const { data } = await api.delete(`/schedule/${id}/permanent`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const uploadScheduleFile = async ({ file, scheduleId }: { file: File, scheduleId: string }) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await api.post(`/file/upload/${scheduleId}`, formData)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}