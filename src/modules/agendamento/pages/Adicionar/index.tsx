import { useEffect, useState } from "react";
import PageTitle from "../../../../core/components/organism/PageTitle";
import { Calendar } from "@/components/ui/calendar"
import { format, set } from "date-fns";
import useGetAvailableHours from "../../hook/useGetAvailableHours";
import useCreateSchedule from "../../hook/useCreateSchedule";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AgendamentoForm = () => {
  const navigate = useNavigate();

  const { mutate: getAvailableHours, isPending: loadingHours, data: unavailableHours } = useGetAvailableHours();
  const { mutate: createSchedule, isPending: loadingCreateSchedule, isSuccess } = useCreateSchedule();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const [formData, setFormData] = useState({
    dia: new Date(),
    horario: '',
    email: '',
    telefone: '',
    cpf: '',
    nome_civil: '',
    nome_social: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    tipo_exame: '',
    origem: '',
    categoria: '',
    forma_pagamento: 'Pix'
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Agendamento criado com sucesso', {
        onAutoClose: () => {
          navigate('/agendamento');
        }
      });
    }
  }, [isSuccess]);

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);

    if (date) {
      getAvailableHours(format(date, "yyyy-MM-dd"));
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  }

  const handleCreateSchedule = () => {
    if (!selectedDay || !selectedTime) return;

    const newSchedule = {...formData};
    
    newSchedule.dia = set(new Date(selectedDay), { hours: parseInt(selectedTime?.split(':')[0] || '0'), minutes: parseInt(selectedTime?.split(':')[1] || '0') });
    newSchedule.horario = selectedTime;

    createSchedule(newSchedule);
  }

  return (
    <div>
      <PageTitle title="Agendamento" subtitle="Adicionar manualmente agendamento" />
      <div className="flex flex-row items-start gap-10 mt-8">
        <div className="w-fit flex flex-row items-center justify-center gap-2">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={handleDaySelect}
            className="rounded-lg border"
          />
        </div>
        <div className="w-fit">
          <p className="text-md font-semibold"> 
            Agendamento para: {selectedDay ? format(selectedDay, "dd/MM/yyyy") : "Nenhum dia selecionado"} {selectedTime && `${selectedTime}:00`}
          </p>
          { loadingHours && <Loader2 className="w-4 h-4 animate-spin" /> }
          { !loadingHours && selectedDay && unavailableHours && (
            <div className="flex flex-row flex-wrap items-center gap-2 mt-4">
              {Array.from({ length: 37 }, (_, i) => {
                const hour = Math.floor(i / 4) + 8;
                const minute = (i % 4) * 15;
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                
                const isAvailable = !unavailableHours.includes(time);
                
                return (
                  <div 
                    onClick={() => isAvailable && handleTimeSelect(time)}
                    key={time} 
                    className={`
                      w-16 h-10 
                      ${selectedTime === time ? 'border-1 border-sky-600' : ''}
                      ${isAvailable ? 'bg-gray-200 cursor-pointer hover:bg-gray-300' : 'bg-red-200'} 
                      rounded-md flex items-center justify-center
                    `}
                  >
                    <span className="text-sm">{time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-gray-300 mt-8 mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <p className="text-lg font-bold"> Dados pessoais </p>
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Nome Civil" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.nome_civil} 
            onChange={(e) => setFormData({ ...formData, nome_civil: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Nome Social" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.nome_social} 
            onChange={(e) => setFormData({ ...formData, nome_social: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="CPF" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.cpf} 
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Telefone" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.telefone} 
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <select 
            name="forma_pagamento" 
            id="forma_pagamento" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.forma_pagamento} 
            onChange={(e) => setFormData({ ...formData, forma_pagamento: e.target.value })}
          >
            <option value="Pix">Pix</option>
            <option value="Money">Dinheiro</option>
          </select>
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Origem" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.origem} 
            onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <select 
            name="categoria" 
            id="categoria" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.categoria} 
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
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
        <div className="col-span-1 mt-2">
          <select 
            name="tipo_exame" 
            id="tipo_exame" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.tipo_exame} 
            onChange={(e) => setFormData({ ...formData, tipo_exame: e.target.value })}
          >
            <option value="FirstLicense">Primeira Licença</option>
            <option value="Renewal">Renovação</option>
            <option value="Addition">Adicionar Categoria</option>
            <option value="ChangeCategory">Mudança de Categoria</option>
          </select>
        </div>
      </div>
      <div className="border-b border-gray-300 mt-8 mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <p className="text-lg font-bold"> Endereço </p>
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="CEP" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.cep} 
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          />
        </div>
        <div className="col-span-2 mt-2">
          <input 
            type="text" 
            placeholder="Logradouro" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.logradouro} 
            onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Número" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.numero} 
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Complemento" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.complemento} 
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Estado" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.estado} 
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          />
        </div>
        <div className="col-span-2 mt-2">
          <input 
            type="text" 
            placeholder="Bairro" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.bairro} 
            onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
          />
        </div>
        <div className="col-span-1 mt-2">
          <input 
            type="text" 
            placeholder="Cidade" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            value={formData.cidade} 
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-row justify-end gap-2">
        <button className="text-red-500 mr-4 cursor-pointer" onClick={() => navigate('/agendamento')}>
          cancelar
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleCreateSchedule}>
          {loadingCreateSchedule ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar agendamento"}
        </button>
      </div>
    </div>
  )
}

export default AgendamentoForm;