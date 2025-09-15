import { useEffect, useState } from "react";
import PageTitle from "@/core/components/organism/PageTitle";
import { Calendar } from "@/components/ui/calendar";
import { format, set } from "date-fns";
import useCreateSchedule from "../../hook/useCreateSchedule";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/core/api";
import DaySelector from "../../components/daySelector";
import { isValidCpf, isValidPhone } from "@/core/utils/validation";

const AgendamentoRapido = () => {
    const navigate = useNavigate();

    const { mutate: getAvailableHours, isPending: loadingHours, data: unavailableHours } = useMutation({
        mutationKey: ['get-available-hours-quick'],
        mutationFn: (date: string) => api.get(`/schedule/available/hours?dia=${date}`).then(res => res.data),
    });
    const { mutate: createSchedule, isPending: loadingCreateSchedule, isSuccess } = useCreateSchedule();
    const { mutate: getAppointmentHours, isPending: loadingAppointmentHours, data: appointmentHours } = useMutation({
        mutationKey: ['get-appointment-hours-quick'],
        mutationFn: (date: string) => api.get(`/schedule/available/hours?dia=${date}`).then(res => res.data),
    });

    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [validationErrors, setValidationErrors] = useState<{ cpf?: string; telefone?: string }>({});

    const [formData, setFormData] = useState({
        dia: new Date(),
        horario: '',
        nome_civil: '',
        cpf: '',
        telefone: '',
        email: '',
        nome_social: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        tipo_exame: 'FirstLicense',
        origem: 'Agendamento Rápido',
        categoria: 'A',
        forma_pagamento: 'Pix'
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success('Agendamento criado com sucesso', {
                onAutoClose: () => navigate('/agendamento')
            });
        }
    }, [isSuccess]);

    const handleDaySelect = (date: Date | undefined) => {
        setSelectedDay(date);
        if (date) {
            const formatted = format(date, 'yyyy-MM-dd');
            getAvailableHours(formatted);
            getAppointmentHours(formatted);
        }
    };

    const handleTimeSelect = (time: string) => setSelectedTime(time);

    const validate = () => {
        const errors: { cpf?: string; telefone?: string } = {};
        if (!formData.nome_civil) {
            toast.error('Informe o nome');
        }
        if (!formData.cpf || !isValidCpf(formData.cpf)) {
            errors.cpf = 'CPF inválido';
        }
        if (!formData.telefone || !isValidPhone(formData.telefone)) {
            errors.telefone = 'Telefone inválido';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0 && !!formData.nome_civil;
    };

    const handleCreate = () => {
        if (!selectedDay || !selectedTime) {
            toast.error('Selecione dia e horário');
            return;
        }
        if (!validate()) return;

        const body: any = { ...formData };
        body.dia = set(new Date(selectedDay), { hours: parseInt(selectedTime.split(':')[0]), minutes: parseInt(selectedTime.split(':')[1]) });
        body.horario = selectedTime;
        createSchedule(body);
    };

    const renderDaySelector = () => {
        if (appointmentHours && appointmentHours.isHoliday) {
            return <p className="text-red-500 text-center">Não haverá atendimento neste dia</p>;
        }
        if (selectedDay) {
            return (
                <DaySelector
                    loading={loadingHours || loadingAppointmentHours}
                    start={appointmentHours?.horarioStart}
                    end={appointmentHours?.horarioEnd}
                    interval={appointmentHours?.intervalo}
                    intervalThreshold={'0' + appointmentHours?.intervaloThreshold + ':00'}
                    unavailableHours={unavailableHours}
                    selectedTime={selectedTime}
                    setSelectedTime={handleTimeSelect}
                />
            );
        }
        return null;
    };

    return (
        <div>
            <PageTitle title="Agendamento Rápido" subtitle="Cadastro simplificado para lote" />
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
                        Agendamento para: {selectedDay ? format(selectedDay, 'dd/MM/yyyy') : 'Nenhum dia selecionado'} {selectedTime && `${selectedTime}:00`}
                    </p>
                    {renderDaySelector()}
                </div>
            </div>
            <div className="border-b border-gray-300 mt-8 mb-4"></div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                    <input
                        type="text"
                        placeholder="Nome"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.nome_civil}
                        onChange={(e) => setFormData({ ...formData, nome_civil: e.target.value })}
                    />
                </div>
                <div className="col-span-1">
                    <input
                        type="text"
                        placeholder="CPF"
                        className={`w-full p-2 border rounded-md ${validationErrors.cpf ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    />
                    {validationErrors.cpf && <p className="text-xs text-red-600 mt-1">{validationErrors.cpf}</p>}
                </div>
                <div className="col-span-1">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="col-span-1">
                    <input
                        type="text"
                        placeholder="Telefone"
                        className={`w-full p-2 border rounded-md ${validationErrors.telefone ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    />
                    {validationErrors.telefone && <p className="text-xs text-red-600 mt-1">{validationErrors.telefone}</p>}
                </div>
                <div className="col-span-1">
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
                <div className="col-span-1">
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
                        <option value="AC">AC</option>
                        <option value="AD">AD</option>
                        <option value="AE">AE</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="ACC">ACC</option>
                    </select>
                </div>
                <div className="col-span-1">
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
            <div className="mt-10 flex flex-row justify-end gap-2">
                <button className="text-red-500 mr-4 cursor-pointer" onClick={() => navigate('/agendamento')}>
                    cancelar
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleCreate}>
                    {loadingCreateSchedule ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar'}
                </button>
            </div>
        </div>
    );
};

export default AgendamentoRapido;