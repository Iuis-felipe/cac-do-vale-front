export interface IUserBody {
  nome: string;
  email: string;
  senha: string;
  clinicaId: string;
  role: string;
}

export interface IUserUpdateBody {
  nome?: string;
  email?: string;
  senha?: string;
  clinicaId?: string;
  role?: string;
}