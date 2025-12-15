import api from "../api" 

export const getAppointmentAvailableHours = async (date: string) => {
  try {
    const { data } = await api.get(`/availability/day/${date}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getAllUnavailableDays = async () => {
  try {
    const { data } = await api.get(`/availability/unavailable`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

