interface FirstQuestionFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const FirstQuestionFrame = ({ data, setData, setCurrentPage }: FirstQuestionFrameProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-6">Primeiro qual a origem do seu agendamento?</p>
      <p className="text-sm text-gray-500">Detran digital, CFC, ou outros. </p>
      <div className="w-[50%] mt-2">
        <input 
          type="text" 
          placeholder="Origem" 
          className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
          value={data.origem} 
          onChange={(e) => setData({ ...data, origem: e.target.value })}
        />
      </div>
      <button className="w-[30%] py-2 bg-blue-800 text-white rounded-md mt-10 cursor-pointer" onClick={() => setCurrentPage(3)}>
        Continuar
      </button>
    </div>
  );
};

export default FirstQuestionFrame;