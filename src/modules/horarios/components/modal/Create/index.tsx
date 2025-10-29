import Modal from "@/core/components/organism/Modal";
import { Loader2Icon, CalendarIcon, ClockIcon, CoffeeIcon, TimerIcon, AlertCircleIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useCreateHorarios from "@/modules/horarios/hooks/useCreateHorarios";
import useUpdateHorario from "@/modules/horarios/hooks/useUpdateHorario";
import { InputMask } from "@react-input/mask";

interface IActionModalProps {
  schedule?: IScheduleForm;
  isOpen: boolean;
  handleCloseModalActions: () => void;
  reloadData: () => void;
}

interface IScheduleForm {
  id?: string;
  dia?: string;
  horarioStart?: string;
  horarioEnd?: string;
  intervalo?: string;
  intervaloThreshold?: string;
  isHoliday: boolean;
}

const ScheduleFormModal: React.FC<IActionModalProps> = ({ schedule, isOpen, handleCloseModalActions, reloadData }) => {
  const { mutate: createSchedule, isPending: loadingCreate } = useCreateHorarios();
  const { mutate: updateSchedule, isPending: loadingUpdate } = useUpdateHorario();

  const [form, setForm] = useState<IScheduleForm>({
    dia: "",
    horarioStart: "",
    horarioEnd: "",
    intervalo: "",
    intervaloThreshold: "",
    isHoliday: false,
  });

  useEffect(() => {
    if (schedule) {
      setForm({
        dia: schedule.dia,
        horarioStart: schedule.horarioStart,
        horarioEnd: schedule.horarioEnd,
        intervalo: schedule.intervalo,
        intervaloThreshold: schedule.intervaloThreshold,
        isHoliday: schedule.isHoliday || false,
      });
    }
  }, [schedule]);

  const formatTimeInput = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length === 0) return "";
    if (numbers.length === 1) return `0${numbers}:00`;
    if (numbers.length === 2) return `${numbers}:00`;
    if (numbers.length === 3) return `0${numbers[0]}:${numbers.slice(1)}`;
    if (numbers.length >= 4) return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;

    return value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof IScheduleForm) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const currentValue = form[field] as string;

      if (!currentValue || currentValue.length < 5) return;

      const [hours, minutes] = currentValue.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) return;

      let totalMinutes = hours * 60 + minutes;
      const increment = e.shiftKey ? 60 : 15;

      if (e.key === "ArrowUp") {
        totalMinutes += increment;
      } else {
        totalMinutes -= increment;
      }

      totalMinutes = Math.max(0, Math.min(1439, totalMinutes));

      const newHours = Math.floor(totalMinutes / 60);
      const newMinutes = totalMinutes % 60;
      const newValue = `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;

      setForm({ ...form, [field]: newValue });
    }
  };

  const handleTimeBlur = (field: keyof IScheduleForm) => {
    const value = form[field] as string;
    if (value && value.length > 0 && value.length < 5) {
      const formatted = formatTimeInput(value);
      setForm({ ...form, [field]: formatted });
    }
  };

  const handleCreateSchedule = (data: IScheduleForm) => {
    if (!data.dia) {
      toast.error("Preencha o campo dia");
      return;
    }

    if (!data.horarioStart || !data.horarioEnd || !data.intervalo || !data.intervaloThreshold) {
      toast.error("Preencha todos os campos");
      return;
    }

    const body = {
      dia: data.dia,
      horarioStart: data.isHoliday ? "00:00" : data.horarioStart,
      horarioEnd: data.isHoliday ? "00:00" : data.horarioEnd,
      intervalo: data.isHoliday ? "00:00" : data.intervalo,
      intervaloThreshold: data.isHoliday ? "0" : data.intervaloThreshold,
      isHoliday: data.isHoliday,
    };

    createSchedule(body, {
      onSuccess: () => {
        reloadData();
        handleCloseModal();
        toast.success("Horário criado com sucesso", {
          dismissible: true,
        });
      },
      onError: (error: any) => {
        console.error("Erro ao criar horário:", error);
        toast.error("Erro ao criar horário", {
          dismissible: true,
          description:
            error?.response?.data?.message || error?.message || "Erro ao criar horário, procure o suporte por favor.",
        });
      },
    });
  };

  const handleUpdateSchedule = (data: IScheduleForm) => {
    const body = {
      dia: data.dia,
      horarioStart: data.isHoliday ? "00:00" : data.horarioStart,
      horarioEnd: data.isHoliday ? "00:00" : data.horarioEnd,
      intervalo: data.isHoliday ? "00:00" : data.intervalo,
      intervaloThreshold: data.isHoliday ? "0" : data.intervaloThreshold,
      isHoliday: data.isHoliday,
    };

    updateSchedule(
      { id: schedule?.id || "", body },
      {
        onSuccess: () => {
          reloadData();
          handleCloseModal();
          toast.success(data.isHoliday ? "Dia marcado como fechado com sucesso" : "Horário atualizado com sucesso", {
            dismissible: true,
          });
        },
        onError: (error: any) => {
          console.error("Erro ao atualizar horário:", error);
          toast.error(data.isHoliday ? "Erro ao marcar dia como fechado" : "Erro ao atualizar horário", {
            description:
              error?.response?.data?.message || error?.message || "Erro ao atualizar, procure o suporte por favor.",
          });
        },
      }
    );
  };

  const handleCloseModal = () => {
    setForm({
      dia: "",
      horarioStart: "",
      horarioEnd: "",
      intervalo: "",
      intervaloThreshold: "",
      isHoliday: false,
    });

    handleCloseModalActions();
  };

  return (
    <Modal
      size="w-[45%]"
      isOpen={isOpen}
      title={schedule ? "Editar horário" : "Criar horário"}
      onClose={handleCloseModal}
    >
      <div className="space-y-6">
        {/* Seção de Data */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-700">Data do Expediente</h3>
          </div>
          <div>
            <label htmlFor="dia" className="text-sm font-medium text-gray-600 mb-1 block">
              Selecione o dia
            </label>
            <input
              type="date"
              id="dia"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={form.dia ? new Date(form.dia).toISOString().split("T")[0] : ""}
              onChange={(e) => setForm({ ...form, dia: e.target.value })}
            />
          </div>
        </div>

        {/* Seção de Horários */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <ClockIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-bold text-gray-700">Horários de Funcionamento</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="horarioStart" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>Início</span>
                {form.horarioStart && !form.isHoliday && (
                  <span className="text-xs text-green-600">({form.horarioStart})</span>
                )}
              </label>
              <div className="relative">
                <InputMask
                  id="horarioStart"
                  mask="__:__"
                  replacement={{ _: /\d/ }}
                  type="text"
                  placeholder="07:00"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={form.horarioStart}
                  onChange={(e) => setForm({ ...form, horarioStart: e.target.value })}
                  onBlur={() => handleTimeBlur("horarioStart")}
                  onKeyDown={(e) => handleKeyDown(e, "horarioStart")}
                  disabled={form.isHoliday}
                />
                <ClockIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label htmlFor="horarioEnd" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>Fim</span>
                {form.horarioEnd && !form.isHoliday && (
                  <span className="text-xs text-green-600">({form.horarioEnd})</span>
                )}
              </label>
              <div className="relative">
                <InputMask
                  id="horarioEnd"
                  mask="__:__"
                  replacement={{ _: /\d/ }}
                  type="text"
                  placeholder="18:00"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={form.horarioEnd}
                  onChange={(e) => setForm({ ...form, horarioEnd: e.target.value })}
                  onBlur={() => handleTimeBlur("horarioEnd")}
                  onKeyDown={(e) => handleKeyDown(e, "horarioEnd")}
                  disabled={form.isHoliday}
                />
                <ClockIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Intervalo */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <CoffeeIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-gray-700">Configuração de Intervalo</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="intervalo" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>Horário do Intervalo</span>
                {form.intervalo && !form.isHoliday && (
                  <span className="text-xs text-amber-600">({form.intervalo})</span>
                )}
              </label>
              <div className="relative">
                <InputMask
                  id="intervalo"
                  mask="__:__"
                  replacement={{ _: /\d/ }}
                  type="text"
                  placeholder="12:00"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={form.intervalo}
                  onChange={(e) => setForm({ ...form, intervalo: e.target.value })}
                  onBlur={() => handleTimeBlur("intervalo")}
                  onKeyDown={(e) => handleKeyDown(e, "intervalo")}
                  disabled={form.isHoliday}
                />
                <CoffeeIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label
                htmlFor="intervaloThreshold"
                className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1"
              >
                <span>Duração</span>
                {form.intervaloThreshold && !form.isHoliday && (
                  <span className="text-xs text-amber-600">({form.intervaloThreshold})</span>
                )}
              </label>
              <div className="relative">
                <InputMask
                  id="interval_threshold"
                  mask="__:__"
                  replacement={{ _: /\d/ }}
                  type="text"
                  placeholder="01:00"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={form.intervaloThreshold}
                  onChange={(e) => setForm({ ...form, intervaloThreshold: e.target.value })}
                  onBlur={() => handleTimeBlur("intervaloThreshold")}
                  onKeyDown={(e) => handleKeyDown(e, "intervaloThreshold")}
                  disabled={form.isHoliday}
                />
                <TimerIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Dica de Uso */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">Dicas de Uso</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>
                  • Use as teclas{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-blue-200 rounded text-xs font-mono">↑</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-blue-200 rounded text-xs font-mono">↓</kbd> para
                  ajustar em 15 minutos
                </li>
                <li>
                  • Pressione{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-blue-200 rounded text-xs font-mono">Shift</kbd> +{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-blue-200 rounded text-xs font-mono">↑↓</kbd> para
                  ajustar em 1 hora
                </li>
                <li>• Digite apenas números (ex: "7" → "07:00", "930" → "09:30")</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Opção de Dia Sem Expediente */}
        <div
          className={`${
            form.isHoliday ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200" : "bg-gray-50 border-gray-200"
          } border rounded-lg p-4 transition-all duration-300`}
        >
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.isHoliday}
              onChange={(e) => setForm({ ...form, isHoliday: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer transition-all"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <AlertCircleIcon
                  className={`w-5 h-5 ${form.isHoliday ? "text-red-600" : "text-gray-400"} transition-colors`}
                />
                <span
                  className={`text-sm font-bold ${form.isHoliday ? "text-red-700" : "text-gray-600"} transition-colors`}
                >
                  Dia sem expediente
                </span>
              </div>
              <p className={`text-xs mt-1 ${form.isHoliday ? "text-red-600" : "text-gray-500"} transition-colors`}>
                {form.isHoliday
                  ? "⚠️ Este dia não aparecerá como disponível para agendamento"
                  : "Marque esta opção para feriados ou dias de fechamento"}
              </p>
            </div>
          </label>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleCloseModal}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => (schedule ? handleUpdateSchedule(form) : handleCreateSchedule(form))}
            disabled={loadingCreate || loadingUpdate}
            className={`
              px-6 py-2.5 rounded-lg font-semibold text-sm text-white
              flex items-center justify-center gap-2 min-w-[120px]
              transition-all duration-200 transform cursor-pointer
              ${
                loadingCreate || loadingUpdate
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {loadingCreate || loadingUpdate ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <span>{schedule ? "Atualizar" : "Criar"}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleFormModal;
