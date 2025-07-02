import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddressPageProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const AddressFrame = ({ data, setData, setCurrentPage }: AddressPageProps) => {
  const [loading, setLoading] = useState(false);

  const handleCEP = async (cep: string) => {
    setLoading(true);
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = await response.json();

    if(addressData.cep) {
      setLoading(false);
      setData({ 
        ...data,
        cep: addressData.cep, 
        logradouro: addressData.logradouro, 
        bairro: addressData.bairro, 
        cidade: addressData.localidade, 
        estado: addressData.uf 
      });
    } else {
      toast.error("CEP não encontrado");
      setLoading(false);
    }
  }

  const handleNextStep = () => {
    setCurrentPage(7)
  }

  return (  
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex flex-col justify-center items-center z-10">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      <p className="text-lg font-semibold"> Por último, precisamos de seu endereço </p>
      <div className="w-[90%] grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="cep" className="text-sm text-gray-500"> 
            CEP <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="CEP" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.cep} 
            onChange={(e) => handleCEP(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="logradouro" className="text-sm text-gray-500"> 
            Logradouro <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Logradouro" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.logradouro} 
            onChange={(e) => setData({ ...data, logradouro: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="numero" className="text-sm text-gray-500"> 
            Número <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Número" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.numero} 
            onChange={(e) => setData({ ...data, numero: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="cidade" className="text-sm text-gray-500"> 
            Cidade <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Cidade" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.cidade} 
            onChange={(e) => setData({ ...data, cidade: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="estado" className="text-sm text-gray-500"> 
            Estado <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Estado" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.estado} 
            onChange={(e) => setData({ ...data, estado: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="bairro" className="text-sm text-gray-500"> 
            Bairro <span className="text-red-500">*</span> 
          </label>
          <input 
            type="text" 
            placeholder="Bairro" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.bairro} 
            onChange={(e) => setData({ ...data, bairro: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="complemento" className="text-sm text-gray-500"> 
            Complemento
          </label>
          <input 
            type="text" 
            placeholder="Complemento" 
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none" 
            value={data.complemento} 
            onChange={(e) => setData({ ...data, complemento: e.target.value })}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3 mt-4">
        <button className="w-[30%] py-2 bg-blue-800 text-white rounded-md cursor-pointer" onClick={handleNextStep}>
          Próximo passo
        </button>
      </div>
    </div>
  )
}

export default AddressFrame;