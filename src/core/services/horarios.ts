import api from "../api" 

export const getAppointmentAvailableHours = async (date: string, clinicId?: string) => {
  try {
    let url = `/availability/day/${date}`;
    if (clinicId) {
      url += `?clinicSlug=${clinicId}`;
    }
    const { data } = await api.get(url);

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getAllUnavailableDays = async (clinicId?: string) => {
  try {
    let url = `/availability/unavailable`;
    if (clinicId) {
      url += `?clinicSlug=${clinicId}`;
    }
    const { data } = await api.get(url);

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

