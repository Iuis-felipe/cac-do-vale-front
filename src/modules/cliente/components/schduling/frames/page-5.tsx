import React from 'react';

const FormField = ({ id, label, children, required = true }: { id: string; label: string; children: React.ReactNode; required?: boolean }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

interface PersonalDataFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const PersonalDataFrame: React.FC<PersonalDataFrameProps> = ({ data, setData, setCurrentPage }) => {
  const isFormValid =
    data.nome_civil &&
    data.cpf &&
    data.email &&
    data.telefone &&
    data.forma_pagamento &&
    data.categoria &&
    data.tipo_exame;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
          Precisamos de alguns dados para prosseguir
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <FormField id="nome_civil" label="Nome Civil">
            <input type="text" id="nome_civil" placeholder="Seu nome completo" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.nome_civil || ''} onChange={(e) => setData({ ...data, nome_civil: e.target.value })} />
          </FormField>
          <FormField id="nome_social" label="Nome Social" required={false}>
            <input type="text" id="nome_social" placeholder="Como prefere ser chamado(a)" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.nome_social || ''} onChange={(e) => setData({ ...data, nome_social: e.target.value })} />
          </FormField>
          <FormField id="cpf" label="CPF">
            <input type="text" id="cpf" placeholder="000.000.000-00" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.cpf || ''} onChange={(e) => setData({ ...data, cpf: e.target.value })} />
          </FormField>
          <FormField id="email" label="Email">
            <input type="email" id="email" placeholder="seu.email@exemplo.com" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </FormField>
          <FormField id="telefone" label="Telefone">
            <input type="tel" id="telefone" placeholder="(99) 99999-9999" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.telefone || ''} onChange={(e) => setData({ ...data, telefone: e.target.value })} />
          </FormField>

          <FormField id="forma_pagamento" label="Forma de Pagamento">
            <select id="forma_pagamento" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.forma_pagamento || ''} onChange={(e) => setData({ ...data, forma_pagamento: e.target.value })}>
              <option value="" disabled>Selecione...</option>
              <option value="Pix">Pix</option>
              <option value="Money">Dinheiro</option>
            </select>
          </FormField>
          <FormField id="categoria" label="Categoria">
            <select id="categoria" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.categoria || ''} onChange={(e) => setData({ ...data, categoria: e.target.value })}>
              <option value="" disabled>Selecione...</option>
              <option value="A">A</option><option value="AB">AB</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="ACC">ACC</option>
            </select>
          </FormField>
          <FormField id="tipo_exame" label="Tipo de Exame">
            <select id="tipo_exame" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.tipo_exame || ''} onChange={(e) => setData({ ...data, tipo_exame: e.target.value })}>
              <option value="" disabled>Selecione...</option>
              <option value="FirstLicense">Primeira Licença</option><option value="Renewal">Renovação</option><option value="Addition">Adicionar Categoria</option><option value="ChangeCategory">Mudança de Categoria</option>
            </select>
          </FormField>
        </div>

        <div className="mt-10 text-center">
          <button
            className="w-full sm:w-auto px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
            onClick={() => setCurrentPage(6)}
            disabled={!isFormValid}
          >
            Próximo passo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataFrame;