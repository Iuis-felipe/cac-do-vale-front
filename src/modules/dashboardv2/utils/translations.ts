// Traduções para português PT-BR
export const examTypeTranslations: Record<string, string> = {
  'Renewal': 'Renovação',
  'FirstLicense': 'Primeira Licença',
  'ChangeCategory': 'Mudança de Categoria',
  'Addition': 'Adição',
  'renewal': 'Renovação',
  'firstlicense': 'Primeira Licença',
  'changecategory': 'Mudança de Categoria',
  'addition': 'Adição',
};

export const paymentMethodTranslations: Record<string, string> = {
  'Credit': 'Crédito',
  'Debit': 'Débito',
  'Cash': 'Dinheiro',
  'Money': 'Dinheiro',
  'Pix': 'PIX',
  'PIX': 'PIX',
  'credit': 'Crédito',
  'debit': 'Débito',
  'cash': 'Dinheiro',
  'money': 'Dinheiro',
  'pix': 'PIX',
};

export const statusTranslations: Record<string, string> = {
  'pending': 'Pendente',
  'done': 'Concluído',
  'canceled': 'Cancelado',
  'agendado': 'Agendado',
};

// Função para traduzir tipos de exame
export const translateExamType = (type: string): string => {
  return examTypeTranslations[type] || type;
};

// Função para traduzir métodos de pagamento
export const translatePaymentMethod = (method: string): string => {
  return paymentMethodTranslations[method] || method;
};

// Função para traduzir status
export const translateStatus = (status: string): string => {
  return statusTranslations[status] || status;
};

// Função genérica para traduzir qualquer chave
export const translate = (key: string, type: 'examType' | 'payment' | 'status' = 'examType'): string => {
  switch (type) {
    case 'examType':
      return translateExamType(key);
    case 'payment':
      return translatePaymentMethod(key);
    case 'status':
      return translateStatus(key);
    default:
      return key;
  }
};
