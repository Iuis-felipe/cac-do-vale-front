interface PersonalDataFrameProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const PersonalDataFrame = ({ data, setData, setCurrentPage }: PersonalDataFrameProps) => {

  const handleNextStep = () => {
    setCurrentPage(6)
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
      <p className="text-lg font-semibold"> Precisamos de alguns dados seus para prosseguir </p>
      <div className="w-[90%] grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="nome_civil" className="text-sm text-gray-500"> 
            Nome Civil <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Nome Civil" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.nome_civil} 
            onChange={(e) => setData({ ...data, nome_civil: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="nome_social" className="text-sm text-gray-500"> 
            Nome Social <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Nome Social" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.nome_social} 
            onChange={(e) => setData({ ...data, nome_social: e.target.value })}
          />
        </div>
      </div>
      <div className="w-[90%] grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="cpf" className="text-sm text-gray-500"> 
            CPF <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="CPF" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.cpf} 
            onChange={(e) => setData({ ...data, cpf: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="email" className="text-sm text-gray-500"> 
            Email <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.email} 
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="telefone" className="text-sm text-gray-500"> 
            Telefone <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Telefone" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.telefone} 
            onChange={(e) => setData({ ...data, telefone: e.target.value })}
          />
        </div>
      </div>
      <div className="w-[90%] grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="forma_pagamento" className="text-sm text-gray-500"> 
            Forma de Pagamento <span className="text-red-500">*</span> 
          </label>
          <select 
            name="forma_pagamento" 
            id="forma_pagamento" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.forma_pagamento} 
            onChange={(e) => setData({ ...data, forma_pagamento: e.target.value })}
          >
            <option value="Pix">Pix</option>
            <option value="Money">Dinheiro</option>
          </select>
        </div>
        <div className="col-span-1">
          <label htmlFor="categoria" className="text-sm text-gray-500"> 
            Categoria <span className="text-red-500">*</span> 
          </label>
          <select 
            name="categoria" 
            id="categoria" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none" 
            value={data.categoria} 
            onChange={(e) => setData({ ...data, categoria: e.target.value })}
          >
            <option value="A">A</option>
            <option value="AB">AB</option>
            <option value="B">B</option> 
            <option value="ABC">ABC</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="ACC">ACC</option>
          </select>
        </div>
        <div className="col-span-1">
          <label htmlFor="tipo_exame" className="text-sm text-gray-500"> 
            Tipo de Exame <span className="text-red-500">*</span> 
          </label>
          <select 
            name="tipo_exame" 
            id="tipo_exame" 
            className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none"
            value={data.tipo_exame} 
            onChange={(e) => setData({ ...data, tipo_exame: e.target.value })}
          >
            <option value="FirstLicense">Primeira Licença</option>
            <option value="Renewal">Renovação</option>
            <option value="Addition">Adicionar Categoria</option>
            <option value="ChangeCategory">Mudança de Categoria</option>
          </select>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3 mt-4">
        <button className="w-[30%] py-2 bg-blue-800 text-white rounded-md cursor-pointer" onClick={handleNextStep}>
          Próximo passo
        </button>
      </div>
    </div>
  );
};

export default PersonalDataFrame;