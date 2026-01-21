export interface IScheduleBody  {
  clinicId?: string;
  dia: Date;
  horario: string;
  email: string;
  telefone: string;
  cpf: string;
  nome_civil: string;
  nome_social: string;
  data_nascimento?: Date;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  tipo_exame: string;
  origem: string;
  categoria: string;
  forma_pagamento: string;
}

export interface IScheduleBodyUpdate  {
  dia?: Date;
  horario?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  nome_civil?: string;
  nome_social?: string;
  data_nascimento?: Date;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  tipo_exame?: string;
  origem?: string;
  categoria?: string;
  forma_pagamento?: string;
}
