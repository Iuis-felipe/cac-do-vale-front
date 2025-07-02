interface WelcomeFrameProps {
  setCurrentPage: (page: number) => void;
}

const WelcomeFrame = ({ setCurrentPage }: WelcomeFrameProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Faça seu agendamento aqui!</h1>
      <p className="text-sm text-gray-500">
        Siga o passo a passo para agendar sua consulta.
      </p>
      <p className="text-sm text-gray-500">
        E não se esqueça de preencher todos os campos obrigatórios.
      </p>
      <button className="w-[30%] py-2 bg-blue-800 text-white rounded-md mt-10 cursor-pointer" onClick={() => setCurrentPage(2)}>
        Continuar
      </button>
    </div>
  );
};

export default WelcomeFrame;