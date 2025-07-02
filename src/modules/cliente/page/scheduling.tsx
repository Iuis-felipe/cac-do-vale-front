import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Pagination from "../components/schduling/pagination";
import WelcomeFrame from "../components/schduling/frames/page-1";
import DaySelectionFrame from "../components/schduling/frames/page-3";
import PersonalDataFrame from "../components/schduling/frames/page-5";
import AddressFrame from "../components/schduling/frames/page-6";
import FinishFrame from "../components/schduling/frames/page-7";
import HourSelectionFrame from "../components/schduling/frames/page-4";
import FirstQuestionFrame from "../components/schduling/frames/page-2";

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

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen w-full overflow-hidden">
      <div className="w-3/4 h-2/4 flex flex-row justify-between items-center">
        <button 
          className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`} 
          disabled={currentPage === 1} 
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
        >
          <ChevronLeftIcon className="size-6 text-blue-800 stroke-3" />
        </button>
        <div className="w-3/4 h-full bg-white rounded-lg shadow-lg border border-gray-100 p-4">
          {currentPage === 1 && <WelcomeFrame setCurrentPage={setCurrentPage} />}
          {currentPage === 2 && <FirstQuestionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 3 && <DaySelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 4 && <HourSelectionFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 5 && <PersonalDataFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 6 && <AddressFrame data={formData} setData={setFormData} setCurrentPage={setCurrentPage} />}
          {currentPage === 7 && <FinishFrame data={formData} />}
        </div>
        <button 
          className={`cursor-pointer ${currentPage === 5 ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`} 
          disabled={currentPage === 5} 
          onClick={() => currentPage < 7 && setCurrentPage(currentPage + 1)}
        >
          <ChevronRightIcon className="size-6 text-blue-800 stroke-3" />
        </button>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Scheduling;