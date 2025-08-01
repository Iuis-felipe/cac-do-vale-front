export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidCpf(cpf: string): boolean {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length >= 10;
}

export interface ValidationErrors {
  cpf?: string;
  email?: string;
  telefone?: string;
}

export function validateFormData(data: {
  cpf?: string;
  email?: string;
  telefone?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (data.cpf && !isValidCpf(data.cpf)) {
    errors.cpf = 'CPF inválido.';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Formato de e-mail inválido.';
  }

  if (data.telefone && !isValidPhone(data.telefone)) {
    errors.telefone = 'Telefone incompleto.';
  }

  return errors;
} 