import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const FormField = ({ id, label, children, required = true }: { id: string; label: string; children: React.ReactNode; required?: boolean }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

interface AddressPageProps {
  data: any;
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const AddressFrame: React.FC<AddressPageProps> = ({ data, setData, setCurrentPage }) => {
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (cep: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar o CEP");
      }
      const addressData = await response.json();
      setData({
        ...data,
        cep: addressData.cep,
        logradouro: addressData.street,
        bairro: addressData.neighborhood,
        cidade: addressData.city,
        estado: addressData.state,
      });
    } catch (error) {
      toast.error("CEP não encontrado ou inválido. Por favor, verifique.");
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setData({ ...data, cep: cep });
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      fetchAddress(cleanedCep);
    }
  };

  const isFormValid = data.cep && data.logradouro && data.numero && data.cidade && data.estado && data.bairro;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col justify-center items-center z-10 rounded-lg">
            <Loader2 className="size-8 animate-spin text-blue-800" />
            <p className="mt-2 text-sm text-gray-600">Buscando CEP...</p>
          </div>
        )}
        <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
          Por último, precisamos do seu endereço
        </p>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4">
          <div className="md:col-span-2">
            <FormField id="cep" label="CEP">
              <input type="text" id="cep" placeholder="00000-000" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.cep || ''} onChange={handleCepChange} maxLength={9} />
            </FormField>
          </div>
          <div className="md:col-span-4">
            <FormField id="logradouro" label="Logradouro">
              <input type="text" id="logradouro" placeholder="Nome da sua rua" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.logradouro || ''} onChange={(e) => setData({ ...data, logradouro: e.target.value })} />
            </FormField>
          </div>
          <div className="md:col-span-2">
            <FormField id="numero" label="Número">
              <input type="text" id="numero" placeholder="Ex: 123" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.numero || ''} onChange={(e) => setData({ ...data, numero: e.target.value })} />
            </FormField>
          </div>
          <div className="md:col-span-4">
            <FormField id="bairro" label="Bairro">
              <input type="text" id="bairro" placeholder="Seu bairro" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.bairro || ''} onChange={(e) => setData({ ...data, bairro: e.target.value })} />
            </FormField>
          </div>
          <div className="md:col-span-3">
            <FormField id="cidade" label="Cidade">
              <input type="text" id="cidade" placeholder="Sua cidade" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.cidade || ''} onChange={(e) => setData({ ...data, cidade: e.target.value })} />
            </FormField>
          </div>
          <div className="md:col-span-3">
            <FormField id="estado" label="Estado">
              <input type="text" id="estado" placeholder="Seu estado" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.estado || ''} onChange={(e) => setData({ ...data, estado: e.target.value })} />
            </FormField>
          </div>
          <div className="md:col-span-6">
            <FormField id="complemento" label="Complemento" required={false}>
              <input type="text" id="complemento" placeholder="Apto, bloco, etc. (opcional)" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" value={data.complemento || ''} onChange={(e) => setData({ ...data, complemento: e.target.value })} />
            </FormField>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            className="w-full sm:w-auto px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer disabled:opacity-50"
            onClick={() => setCurrentPage(7)}
            disabled={!isFormValid}
          >
            Revisar e Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressFrame;