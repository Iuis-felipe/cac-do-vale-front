import api from "@/core/api";

export const getHorarios = async (page: number, perPage: number, search?: string) => {
  try {
    let urlQuery = `page=${page}&perPage=${perPage}`;

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

export const buildSchedule = async (period: string, body: { start?: string, end: string }) => {
  try {
    const response = await api.post(`/availability/bulk/${period}`, body)

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

export const updateSchedule = async (id: string, body: { horarioStart?: string, horarioEnd?: string, intervalo?: string, intervaloThreshold?: string }) => {
  try {
    const response = await api.put(`/availability/${id}`, body)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createSchedule = async (body: { dia: string, horarioStart: string, horarioEnd: string, intervalo: string, intervaloThreshold: string }) => {
  try {
    const response = await api.post(`/availability`, body)

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