export interface IClinicBody {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  color?: string;
  cnpj?: string;
}

export interface IClinic {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  cor: string;
  cnpj?: string;
}