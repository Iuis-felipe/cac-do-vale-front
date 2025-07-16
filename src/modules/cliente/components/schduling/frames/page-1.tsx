import { ArrowRightIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

interface WelcomeFrameProps {
  setCurrentPage: (page: number) => void;
}

const WelcomeFrame = ({ setCurrentPage }: WelcomeFrameProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <CalendarDaysIcon className="size-16 text-blue-800" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Faça seu agendamento aqui!</h1>
        <p className="mt-3 text-base text-gray-500">
          Siga o passo a passo para agendar sua consulta. <br />
          Não se esqueça de preencher todos os campos obrigatórios.
        </p>

        <button
          className="w-full sm:w-auto mt-10 inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer"
          onClick={() => setCurrentPage(2)}
        >
          Começar
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeFrame;