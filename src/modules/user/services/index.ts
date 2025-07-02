import api from "@/core/api"
import { IUserBody, IUserUpdateBody } from "../model"

export const getUsers = async (page: number, name?: string) => {
  try {
    const response = await api.get(`/admin?perPage=10&pagina=${page}&nome=${name}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createUser = async (user: IUserBody) => {
  try {
    const response = await api.post("/admin", user)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateUser = async (id: string, user: IUserUpdateBody) => {
  try {
    const response = await api.put(`/admin/${id}`, user)  

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/admin/${id}`) 

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}