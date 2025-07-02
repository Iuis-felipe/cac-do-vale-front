export interface IUserBody {
  nome: string;
  email: string;
  senha: string;
}

export interface IUserUpdateBody {
  nome?: string;
  email?: string;
  senha?: string;
}