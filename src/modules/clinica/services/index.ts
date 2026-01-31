import api from "@/core/api"
import { IClinicBody } from "../model"

export const getClinics = async (page: number, search?: string) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      ...(search && { search })
    });

    const { data } = await api.get(`/clinic?${params.toString()}`);

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createClinic = async (clinic: IClinicBody) => {
  try {
    const response = await api.post("/clinic", clinic)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateClinic = async (id: string, clinic: IClinicBody) => {
  try {
    const response = await api.put(`/clinic/${id}`, clinic)  

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteClinic = async (id: string) => {
  try {
    const response = await api.delete(`/clinic/${id}`) 

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAllClinics = async () => {
  try {
    const { data } = await api.get("/clinic?page=1&perPage=100");

    return data.clinic || [];
  } catch (error) {
    console.error('Erro ao buscar clínicas:', error)
    throw error
  }
}