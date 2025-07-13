export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  }
}
