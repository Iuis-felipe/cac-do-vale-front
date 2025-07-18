import React, { useEffect, useState } from "react";
import useCreateClientSchedule from "@/modules/cliente/hook/useCreateClientSchedule";
import { set } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface FinishFrameProps {
  data: any;
}

const FinishFrame: React.FC<FinishFrameProps> = ({ data }) => {
  const { mutate, isPending, isSuccess, isError: isMutationError } = useCreateClientSchedule();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleValidation = () => {
    if (!data) {
      setValidationError("Houve um erro ao carregar os dados. Tente novamente.");
      return false;
    }

    const requiredFields = ['dia', 'horario', 'email', 'telefone', 'cpf', 'nome_civil', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado', 'tipo_exame', 'origem', 'categoria', 'forma_pagamento'];
    const hasError = []

    for (const field of requiredFields) {
      if (!data[field]) {
        hasError.push(field)
      }
    }

    if(hasError.length > 0) {
      setValidationError(`Os campos ${hasError.join(', ')} são obrigatórios.`)
      return false
    }

    if (new Date(data.dia) < new Date()) {
      setValidationError("A data selecionada já passou. Volte e selecione uma data futura.");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleCreateSchedule = () => {
    if (!handleValidation()) {
      return;
    }
    const newSchedule = { ...data };
    const [hours, minutes] = data.horario.split(':').map(Number);
    newSchedule.dia = set(new Date(data.dia), { hours, minutes });
    mutate(newSchedule);
  };

  useEffect(() => {
    if (isMutationError) {
      toast.error("Houve um erro ao criar o agendamento. Tente novamente.");
    }
  }, [isMutationError]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
      {isSuccess && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-20 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="flex justify-center">
              <CheckCircleIcon className="size-16 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-4 text-gray-800">Agendamento realizado!</p>
            <p className="text-base text-gray-500 mt-2">
              Esperamos você no dia e horário marcados. Você pode fechar esta janela.
            </p>
            <button
              className="w-full mt-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer"
              onClick={() => window.location.href = 'https://cacdovale.com.br'}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Pronto para finalizar?</h1>
        <p className="mt-3 text-base text-gray-500">
          Revise seus dados com atenção antes de confirmar o agendamento.
        </p>

        {validationError && (
          <div className="flex items-center gap-3 mt-6 p-3 w-full rounded-lg bg-red-100 border border-red-300 text-red-800">
            <ExclamationTriangleIcon className="size-6 flex-shrink-0" />
            <p className="text-sm text-left">{validationError}</p>
          </div>
        )}

        <button
          className="w-full sm:w-auto mt-10 inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
          onClick={handleCreateSchedule}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Finalizando...
            </>
          ) : (
            "Confirmar Agendamento"
          )}
        </button>
      </div>
    </div>
  );
};

export default FinishFrame;