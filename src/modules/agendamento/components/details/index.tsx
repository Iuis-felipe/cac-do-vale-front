import { ISchedule } from "@/core/models"
import { ArrowPathIcon, CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { endOfDay, format, isAfter } from "date-fns";
import { LoaderIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUpdateScheduleStatus from "../../hook/useUpdateScheduleStatus";
import { useEffect, useRef } from "react";
import { toast } from "sonner";


interface IAgendamentoDetailsProps {
  schedule: ISchedule;
  isLoading: boolean;
}

const AgendamentoDetails: React.FC<IAgendamentoDetailsProps> = ({ schedule, isLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { mutate: updateScheduleStatus, isPending, isSuccess } = useUpdateScheduleStatus()

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <ArrowPathIcon className="size-6 text-slate-600 animate-spin"/>
      </div>
    )
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "guardando":
        return "text-yellow-400"
      case "cancelado":
        return "text-red-400"
      case "confirmado":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const typeConverter = (type: string) => {
    switch (type) {
      case "FirstLicense":
        return "Primeira Licença"
      case "Renewal":
        return "Renovação"
      case "Addition":
        return "Adição"
      case "ChangeCategory":
        return "Mudança de Categoria"
      default:
        return type
    }
  }

  const handleShowButtons = () => {
    const endOfDayDate = endOfDay(new Date(schedule.dia))
    
    if(isAfter(new Date(), endOfDayDate)) {
      return false;
    }

    return true;
  }

  const handleActions = (action: string) => {
    switch (action) {
      case "confirmar":
        updateScheduleStatus({ id: schedule.id, status: "confirmado" })
        break
      case "cancelar":
        updateScheduleStatus({ id: schedule.id, status: "cancelado" })
        break
      case "excluir":
        break;
      case "prontuario":
        inputRef.current?.click()
        break;
      case "editar":
        navigate(`/agendamento/update/${schedule.id}`)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Agendamento atualizado com sucesso", {
        onAutoClose: () => {
          window.location.reload()
        }
      })
    }
  }, [isSuccess])

  return (
    <div className="flex flex-col gap-8">
      <input type="file" ref={inputRef} className="hidden" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-start gap-8">
          <div className="border border-gray-200 rounded-lg shadow-md w-[200px]"> 
            <div className="p-4 flex flex-col items-center justify-center gap-1">
              <p className="text-[3em] font-bold"> {format(new Date(schedule.dia), "dd")} </p>
              <p className="text-lg font-semibold"> {format(new Date(schedule.dia), "MM/yyyy")} </p>
            </div>
            <div className="p-2 flex flex-col items-center justify-center bg-red-400 rounded-b-lg w-full">
              <p className="text-lg font-semibold text-white"> {schedule.horario} </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold"> {schedule.nome_civil} </p>
            <div className="flex flex-col">
              <p className="text-sm font-semibold"> Protocolo </p>
              <p className="text-md"> {schedule.protocolo} </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold"> Status </p>
              <p className={`text-md capitalize font-semibold ${statusColor(schedule.status)}`}> {schedule.status} </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-[150px]">
          <button 
            onClick={() => handleActions("editar")}
            className="bg-blue-500 text-white py-2 rounded-md flex flex-row items-center justify-center gap-2 w-full cursor-pointer"
          >
            <PencilIcon className="size-4" />
            <p className="text-sm font-semibold"> Editar </p>
          </button>
          <button 
            onClick={() => handleActions("prontuario")}
            className="bg-sky-700 text-white py-2 rounded-md flex flex-row items-center justify-center gap-2 w-full cursor-pointer"
          >
            <Upload className="size-4" />
            <p className="text-sm font-semibold"> Prontuario </p>
          </button>
          {schedule.status !== "confirmado" && handleShowButtons() && (
            <button 
              onClick={() => handleActions("confirmar")}
              className="bg-green-500 text-white py-2 rounded-md flex flex-row items-center justify-center gap-2 w-full cursor-pointer"
            >
              {isPending ? <LoaderIcon className="size-4 animate-spin" /> : <CheckIcon className="size-4" />}
              <p className="text-sm font-semibold"> Confirmar </p>
            </button>
          )}
          {schedule.status !== "cancelado" && handleShowButtons() && (
            <button 
              onClick={() => handleActions("cancelar")}
              className="bg-red-500 text-white py-2 rounded-md flex flex-row items-center justify-center gap-2 w-full cursor-pointer"
            >
              {isPending ? <LoaderIcon className="size-4 animate-spin" /> : <XMarkIcon className="size-4" />}
              <p className="text-sm font-semibold"> Cancelar </p>
            </button>
          )}
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5">
          <p className="text-lg font-bold"> Dados pessoais </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Nome social </p>
          <p className="text-md"> {schedule.nome_social} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> CPF </p>
          <p className="text-md"> {schedule.cpf} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Email </p>
          <p className="text-md"> {schedule.email} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Telefone </p>
          <p className="text-md"> {schedule.telefone} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Forma de pagamento </p>
          <p className="text-md"> {schedule.forma_pagamento} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Origem </p>
          <p className="text-md"> {schedule.origem} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Categoria </p>
          <p className="text-md"> {schedule.categoria} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Tipo de exame </p>
          <p className="text-md"> {typeConverter(schedule.tipo_exame)} </p>
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5">
          <p className="text-lg font-bold"> Endereço </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> CEP </p>
          <p className="text-md"> {schedule.cep} </p>
        </div>
        <div className="col-span-2 mt-2">
          <p className="text-sm font-semibold"> Logradouro </p>
          <p className="text-md"> {schedule.logradouro} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Número </p>
          <p className="text-md"> {schedule.numero} </p>
        </div>        
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Estado </p>
          <p className="text-md"> {schedule.estado} </p>
        </div>
        <div className="col-span-2 mt-2">
          <p className="text-sm font-semibold"> Bairro </p>
          <p className="text-md"> {schedule.bairro} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Cidade </p>
          <p className="text-md"> {schedule.cidade} </p>
        </div>
        <div className="col-span-1 mt-2">
          <p className="text-sm font-semibold"> Complemento </p>
          <p className="text-md"> {schedule.complemento} </p>
        </div>
      </div>
    </div>
  )
}

export default AgendamentoDetails