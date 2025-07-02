import useCreateClientSchedule from "@/modules/cliente/hook/useCreateClientSchedule";
import { set } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FinishFrameProps {
  data: any;
}

const FinishFrame = ({ data }: FinishFrameProps) => {
  const { mutate, isPending, isSuccess, isError } = useCreateClientSchedule();
  const [error, setError] = useState<string | null>(null);

  const hasError = () => {
    if (!data) {
      setError("Houve um erro ao carregar os dados, tente novamente");
      return true;
    }

    if (!data.dia || !data.horario || !data.email || !data.telefone || !data.cpf || !data.nome_civil || !data.nome_social || !data.cep || !data.logradouro || !data.numero || !data.bairro || !data.cidade || !data.estado || !data.tipo_exame || !data.origem || !data.categoria || !data.forma_pagamento) {
      setError("Que pena, algum campo obrigatório não foi preenchido, volte e preencha todos os campos obrigatórios");
      return true;
    }

    if (data.dia < new Date()) {
      setError("Que pena, a data selecionada já passou, volte e selecione uma data futura");
      return true;
    }

    setError(null);
    return false;
  }

  const handleCreateSchedule = () => {
    if (hasError()) {
      return;
    }

    const newSchedule = {...data};
    
    newSchedule.dia = set(new Date(data.dia), { hours: parseInt(data.horario?.split(':')[0] || '0'), minutes: parseInt(data.horario?.split(':')[1] || '0') });
    newSchedule.horario = data.horario;

    mutate(newSchedule);
  }

  const handleCloseModal = () => {
    window.close();
  }

  useEffect(() => {
    if (isError) {
      toast.error("Houve um erro ao criar o agendamento, tente novamente");
    }
  }, [isError]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {isSuccess && <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center z-10">
        <div className="w-[30%] h-fit p-5 bg-white rounded-md">
          <p className="text-lg font-semibold">Agendamento realizado com sucesso!</p>
          <p className="text-sm text-gray-500">
            Esperamos você no dia e horario marcados!
          </p>
          <button 
            className="w-full py-2 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2 mt-4"
            onClick={handleCloseModal}
          >
            Fechar e voltar para a página inicial
          </button>
        </div>
      </div>}
      <h1 className="text-3xl font-bold mb-6">Pronto para finalizar?</h1>
      <p className="text-sm text-gray-500">
        Caso necessário volte e revise seus dados antes de finalizar.
      </p>
      <button 
        className="w-[30%] py-2 bg-blue-800 text-white rounded-md mt-10 cursor-pointer" 
        onClick={handleCreateSchedule}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Finalizar agendamento"}
      </button>
      {error && <p className="text-sm text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default FinishFrame;