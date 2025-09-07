import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircleIcon, CalendarIcon, UserIcon, MapPinIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { translateTypeExame } from '@/core/utils/transforms';

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | undefined }) => (
  <div className="flex items-start">
    <Icon className="size-5 text-gray-500 mr-3 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <p className="text-base text-gray-800">{value || 'Não informado'}</p>
    </div>
  </div>
);

const ConfirmationFrame = ({ data }: { data: any }) => {
  if (!data) {
    return (
      <div className="text-center">
        <p className="text-red-500">Ocorreu um erro ao carregar os dados do agendamento.</p>
      </div>
    );
  }

  const handleFinish = () => {
    window.location.href = 'https://cacdovale.com.br/';
  };

  const fullAddress = `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.cidade} - ${data.estado}, CEP: ${data.cep}`;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center p-4">
      <CheckCircleIcon className="size-16 text-green-500 mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Agendamento Confirmado com Sucesso!</h1>
      <p className="mt-2 text-gray-600">
        Obrigado, {data.nome_civil}! Sua consulta foi agendada.
        Uma confirmação também pode ter sido enviada para o seu e-mail e telefone.
      </p>

      <div className="w-full text-left bg-gray-50 border border-gray-200 rounded-lg p-6 my-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">Detalhes do Agendamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem 
            icon={CalendarIcon} 
            label="Data e Hora" 
            value={`${format(new Date(data.dia), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às ${data.horario}`}
          />
          <DetailItem icon={UserIcon} label="Paciente" value={data.nome_civil} />
          <DetailItem icon={UserIcon} label="CPF" value={data.cpf} />
          <DetailItem icon={CreditCardIcon} label="Forma de Pagamento" value={data.forma_pagamento} />
          <DetailItem icon={MapPinIcon} label="Endereço" value={fullAddress} />
          <DetailItem icon={CalendarIcon} label="Tipo de Exame" value={translateTypeExame(data.tipo_exame)} />
        </div>
      </div>
      
      <button
        onClick={handleFinish}
        className="w-full sm:w-auto mt-4 px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer"
      >
        Finalizar
      </button>
    </div>
  );
};

export default ConfirmationFrame;