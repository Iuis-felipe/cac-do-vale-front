import api from "../../../core/api";
import { LoginResponse } from "../models/responses";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await api.post("/auth/login", { email, senha: password });

    return data;
  } catch(e) {
    throw new Error("Erro ao fazer login");
  }
};