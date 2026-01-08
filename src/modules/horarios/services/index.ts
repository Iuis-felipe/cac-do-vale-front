import api from "@/core/api";
import { ICreateBulkHorarios, ICreateHorarios } from "../model";
import clinicStore from "@/core/store/clinic";

export const getHorarios = async (page: number, perPage: number, search?: string) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    let urlQuery = `page=${page}&perPage=${perPage}&clinicId=${clinic.id}`;

    if(search) {
      urlQuery = urlQuery + `&dia=${search}`;
    }

    const response = await api.get(`/availability?${urlQuery}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const buildSchedule = async (period: string, body: ICreateBulkHorarios) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    const scheduleBody: any = {
      ...body,
      clinicId: clinic.id
    };

    const response = await api.post(`/availability/bulk/${period}`, scheduleBody)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteSchedule = async (id: string) => {
  try {
    const response = await api.delete(`/availability/${id}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateSchedule = async (id: string, body: ICreateHorarios) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    const scheduleBody: any = {
      ...body,
      clinicId: clinic.id
    };

    const response = await api.put(`/availability/${id}`, scheduleBody)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createSchedule = async (body: ICreateHorarios) => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    const scheduleBody: any = {
      ...body,
      clinicId: clinic.id
    };
    
    const response = await api.post(`/availability`, scheduleBody)

    return response.data
  } catch (error) {
    console.log(error)
    throw "Horário já cadastrado"
  }
}
  
export const updateIsHoliday = async (id: string, body: { isHoliday: boolean }) => {
  try {
    const response = await api.put(`/availability/isHoliday/${id}`, body)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateIsRecess = async (id: string, body: { isRecess: boolean }) => {
  try {
    const response = await api.put(`/availability/isRecess/${id}`, body)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}