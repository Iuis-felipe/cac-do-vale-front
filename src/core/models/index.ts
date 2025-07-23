export interface ISchedule {
  id: string;
  protocolo: string;
  dia: string;
  horario: string;
  email: string;
  telefone: string;
  cpf: string;
  nome_civil: string;
  nome_social: string;
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
  prontuario: string | null;
  forma_pagamento: string;
  status: string;
  atendenteId: string | null;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
