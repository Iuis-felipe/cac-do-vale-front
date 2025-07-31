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

export const createWeekdaySchedules = async (dates: string[], body: { start?: string, end: string }) => {
  try {
    const promises = dates.map(date => {
      return api.post(`/availability`, {
        dia: date,
        horarioStart: body.start || "08:00",
        horarioEnd: body.end,
        intervalo: "01:00", // Default interval - pode ser configurável se necessário
        intervaloThreshold: "00:30" // Default threshold - pode ser configurável se necessário
      });
    });

    const responses = await Promise.all(promises);
    return responses.map(response => response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  