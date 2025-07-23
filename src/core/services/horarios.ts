import api from "../api" 

export const getAppointmentAvailableHours = async (date: string) => {
  try {
    console.log('Here')
    console.log(date)
    const { data } = await api.get(`/availability/day/${date}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}