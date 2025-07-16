import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Pagination from "../components/schduling/pagination";
import WelcomeFrame from "../components/schduling/frames/page-1";
import FirstQuestionFrame from "../components/schduling/frames/page-2";
import DaySelectionFrame from "../components/schduling/frames/page-3";
import HourSelectionFrame from "../components/schduling/frames/page-4";
import PersonalDataFrame from "../components/schduling/frames/page-5";
import AddressFrame from "../components/schduling/frames/page-6";
import FinishFrame from "../components/schduling/frames/page-7";

const Scheduling = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    dia: new Date(),
    horario: '',
    email: '',
    telefone: '',
    cpf: '',
    nome_civil: '',
    nome_social: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    tipo_exame: '',
    origem: '',
    categoria: '',
    forma_pagamento: 'Pix'
  });

  const pageTitles: { [key: number]: string } = {
    1: "Bem-vindo ao Agendamento",
    2: "Origem do Agendamento",
    3: "Escolha o Melhor Dia",
    4: "Escolha o Melhor Horário",
    5: "Seus Dados Pessoais",
    6: "Seu Endereço",
    7: "Revisão e Finalização",
  };

  const isNextStepDisabled = () => {
    switch (currentPage) {
      case 2: return !formData.origem;
      case 3: return !formData.dia;
      case 4: return !formData.horario;
      case 5: return !(formData.nome_civil && formData.nome_social && formData.cpf && formData.email && formData.telefone && formData.forma_pagamento && formData.categoria && formData.tipo_exame);
      case 6: return !(formData.cep && formData.logradouro && formData.numero && formData.cidade && formData.estado && formData.bairro);
      default: return false;
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

        <header className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
            {pageTitles[currentPage]}
          </h1>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </header>

        <main className="p-6 sm:p-8 flex-grow min-h-[50vh] flex items-center justify-center">
          {currentPage === 1 && <WelcomeFrame setCurrentPage={setCurrentPage} />}
          {currentPage === 2 && <FirstQuestionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 3 && <DaySelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 4 && <HourSelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 5 && <PersonalDataFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 6 && <AddressFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 7 && <FinishFrame data={formData} />}
        </main>

        {currentPage > 1 && currentPage < 7 && (
          <footer className="w-full flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeftIcon className="size-4" />
              Voltar
            </button>

            <button
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={isNextStepDisabled()}
            >
              Avançar
              <ChevronRightIcon className="size-4" />
            </button>
          </footer>
        )}
      </div>

      <footer className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Sistema de Agendamento CAC do Vale &copy; {new Date().getFullYear()}<br /> Desenvolvido por:{" "}
          <a
            href="https://novadevelopment.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-semibold text-blue-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#20E673] hover:to-[#05E3EA] transition-all duration-300 ease-in-out">
            @novadevelopments
          </a>{" "}

        </p>
      </footer>
    </div>
  );
};

export default Scheduling;