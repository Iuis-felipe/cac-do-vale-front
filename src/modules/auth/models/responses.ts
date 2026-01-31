export interface ILoginUser {
  id: string;
  nome: string;
  email: string;
  role: string;
}

export interface ILoginClinic {
  id: string;
  nome: string;
  cor: string;
}

export interface LoginResponse {
  access_token: string;
  user: ILoginUser;
  clinic: ILoginClinic;
}
