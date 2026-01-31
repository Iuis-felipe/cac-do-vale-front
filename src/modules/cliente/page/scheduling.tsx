import { useState } from "react";
import { isSaturday, isSunday } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { isValidCpf, isValidEmail, isValidPhone } from "@/core/utils/validation";

import Pagination from "../components/schduling/pagination";
import WelcomeFrame from "../components/schduling/frames/page-1";
import DaySelectionFrame from "../components/schduling/frames/page-2";
import HourSelectionFrame from "../components/schduling/frames/page-3";
import PersonalDataFrame from "../components/schduling/frames/page-4";
import AddressFrame from "../components/schduling/frames/page-5";
import FinishFrame from "../components/schduling/frames/page-6";
import ConfirmationFrame from "../../../components/frames/ConfirmationFrame";

const initialFormData = {
  dia: undefined,
  horario: "",
  email: "",
  telefone: "",
  cpf: "",
  nome_civil: "",
  nome_social: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  tipo_exame: "",
  origem: "Site",
  categoria: "",
  forma_pagamento: "Pix",
};

const Scheduling = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [confirmedAppointmentData, setConfirmedAppointmentData] = useState<any | null>(null);

  const totalPages = 6;

  const pageTitles: { [key: number]: string } = {
    1: "Bem-vindo ao Agendamento",
    2: "Escolha o Melhor Dia",
    3: "Escolha o Melhor Horário",
    4: "Seus Dados Pessoais",
    5: "Seu Endereço",
    6: "Revisão e Finalização",
  };

  const isNextStepDisabled = () => {
    switch (currentPage) {
      case 2:
        return !formData.dia || isSaturday(formData.dia) || isSunday(formData.dia);
      case 3:
        return !formData.horario;
      case 4: {
        const hasRequiredFields =
          formData.nome_civil &&
          formData.cpf &&
          formData.telefone &&
          formData.forma_pagamento &&
          formData.categoria &&
          formData.tipo_exame;
        const isCpfValid = isValidCpf(formData.cpf);
        const isPhoneValid = isValidPhone(formData.telefone);
        const isEmailValid = !formData.email || isValidEmail(formData.email);
        return !hasRequiredFields || !isCpfValid || !isPhoneValid || !isEmailValid;
      }
      case 5:
        return !(
          formData.cep &&
          formData.logradouro &&
          formData.numero &&
          formData.cidade &&
          formData.estado &&
          formData.bairro
        );
      default:
        return false;
    }
  };

  // const handleReset = () => {
  //   setConfirmedAppointmentData(null);
  //   setFormData(initialFormData);
  //   setCurrentPage(1);
  // };

  const BackButton = () => (
    <button
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer"
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      <ChevronLeftIcon className="size-4" />
      Voltar
    </button>
  );

  const NextButton = () => (
    <button
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={isNextStepDisabled()}
    >
      Avançar
      <ChevronRightIcon className="size-4" />
    </button>
  );

  const NavigationControls = () => (
    <div className="w-full max-w-md grid grid-cols-2 gap-4">
      <div>{currentPage > 1 && <BackButton />}</div>
      <div>{currentPage < totalPages && <NextButton />}</div>
    </div>
  );

  if (confirmedAppointmentData) {
    return (
      <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden p-6 sm:p-8">
          <ConfirmationFrame data={confirmedAppointmentData} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <header className="p-6 border-b border-gray-200 flex flex-col items-center gap-y-6">
          <h1 className="text-xl font-bold text-center text-gray-800">{pageTitles[currentPage]}</h1>
          <div className="w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
          {currentPage > 1 && <NavigationControls />}
        </header>

        <main className="p-6 sm:p-8 flex-grow min-h-[50vh] flex items-center justify-center">
          {currentPage === 1 && <WelcomeFrame setCurrentPage={setCurrentPage} />}
          {currentPage === 2 && (
            <DaySelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 3 && (
            <HourSelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 4 && (
            <PersonalDataFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 5 && (
            <AddressFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 6 && (
            <FinishFrame data={formData} onSuccess={setConfirmedAppointmentData} />
          )}
        </main>

        {currentPage > 1 && currentPage < totalPages && (
          <div className="p-6 border-t border-gray-200 flex justify-center">
            <NavigationControls />
          </div>
        )}
      </div>

      <footer className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Sistema de Agendamento CAC do Vale &copy; {new Date().getFullYear()}
          <br /> Desenvolvido por:{" "}
          <a
            href="https://novadevelopments.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-semibold text-blue-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#20E673] hover:to-[#05E3EA] transition-all duration-300 ease-in-out"
          >
            @novadevelopments
          </a>{" "}
        </p>
      </footer>
    </div>
  );
};

export default Scheduling;
