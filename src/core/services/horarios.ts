import api from "../api" 

export const getAppointmentAvailableHours = async (date: string, clinicSlug?: string) => {
  try {
    let url = `/availability/day/${date}`;

    if (clinicSlug) {
      url += `?clinicSlug=${clinicSlug}`;
    }
    const { data } = await api.get(url);

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

export const getAllUnavailableDays = async (clinicSlug?: string) => {
  try {
    let url = `/availability/unavailable`;

    if (clinicSlug) {
      url += `?clinicSlug=${clinicSlug}`;
    }

    const { data } = await api.get(url);
    console.log('1', data)

    return data;
  } catch(e: any) {
    throw new Error(e)
  }
}

