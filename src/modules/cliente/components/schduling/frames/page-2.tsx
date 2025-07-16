interface FirstQuestionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const FirstQuestionFrame = ({ data, setData, setCurrentPage }: FirstQuestionFrameProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
      <div className="w-full max-w-md">
        <p className="text-xl md:text-2xl font-semibold text-gray-800">
          Qual a origem do seu agendamento?
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Ex: Detran Digital, CFC, particular, etc.
        </p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Digite a origem aqui"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={data.origem || ''}
            onChange={(e) => setData({ ...data, origem: e.target.value })}
          />
        </div>

        <button
          className="w-full mt-10 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
          onClick={() => setCurrentPage(3)}
          disabled={!data.origem}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default FirstQuestionFrame;