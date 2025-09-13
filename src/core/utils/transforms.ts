export const translateTypeExame = (type: string) => {
  switch (type) {
    case 'FirstLicense':
      return 'Primeira Licença';
    case 'Renewal':
      return 'Renovação';
    case 'Addition':
      return 'Adição';
    case 'ChangeCategory':
      return 'Mudança de Categoria';
    default:
      return 'Tipo de Exame';
  }
}