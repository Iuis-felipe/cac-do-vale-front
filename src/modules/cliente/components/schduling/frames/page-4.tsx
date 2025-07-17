import React, { useState } from 'react';
import { InputMask } from '@react-input/mask';

function isValidEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidCpf(cpf: string): boolean {
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

const PersonalDataFrame: React.FC<PersonalDataFrameProps> = ({ data, setData }) => {
  const [errors, setErrors] = useState({
    cpf: '',
    email: '',
    telefone: '',
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'cpf':
        setErrors(prev => ({ ...prev, cpf: isValidCpf(value) ? '' : 'CPF inválido.' }));
        break;
      case 'email':
        setErrors(prev => ({ ...prev, email: isValidEmail(value) ? '' : 'Formato de e-mail inválido.' }));
        break;
      case 'telefone':
        const phoneDigits = value.replace(/\D/g, '');
        setErrors(prev => ({ ...prev, telefone: phoneDigits.length >= 10 ? '' : 'Telefone incompleto.' }));
        break;
      default:
        break;
    }
  };

  const isFormValid =
    data.nome_civil &&
    data.cpf && !errors.cpf &&
    data.email && !errors.email &&
    data.telefone && !errors.telefone &&
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

          <FormField id="nome_social" label="Nome Social (Opcional)" required={false}>
            <input type="text" id="nome_social" placeholder="Como prefere ser chamado(a)" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.nome_social || ''} onChange={(e) => setData({ ...data, nome_social: e.target.value })} />
          </FormField>

          <FormField id="cpf" label="CPF">
            <InputMask
              id="cpf"
              mask="___.___.___-__"
              replacement={{ _: /\d/ }}
              value={data.cpf || ''}
              onChange={(e) => setData({ ...data, cpf: e.target.value })}
              onBlur={handleBlur}
              placeholder="000.000.000-00"
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 ${errors.cpf ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
            />
            {errors.cpf && <p className="text-xs text-red-600 mt-1">{errors.cpf}</p>}
          </FormField>

          <FormField id="email" label="Email">
            <input type="email" id="email" placeholder="seu.email@exemplo.com" className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300'}`} value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value })} onBlur={handleBlur} />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </FormField>

          <FormField id="telefone" label="Telefone">
            <InputMask
              id="telefone"
              mask="(__) _____-____"
              replacement={{ _: /\d/ }}
              value={data.telefone || ''}
              onChange={(e) => setData({ ...data, telefone: e.target.value })}
              onBlur={handleBlur}
              placeholder="(99) 99999-9999"
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 ${errors.telefone ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
            />
            {errors.telefone && <p className="text-xs text-red-600 mt-1">{errors.telefone}</p>}
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
        
        </div>
      </div>
  );
};

export default PersonalDataFrame;
