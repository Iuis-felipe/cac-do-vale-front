import api from "../api"

export const getClinic = async (slug: string) => {
  try {
    const { data } = await api.get(`/clinic/${slug}`)

    return data;
  } catch(e: any) {
    throw new Error(e)
  } 
}