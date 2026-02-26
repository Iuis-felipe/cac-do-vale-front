import { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Stack,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/core/components/organism/Modal";
import { GradientButton, OutlineButton } from "@/components";
import useCreateHorarios from "@/modules/horarios/hooks/useCreateHorarios";
import useUpdateHorario from "@/modules/horarios/hooks/useUpdateHorario";

interface ScheduleForm {
  id?: string;
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isHoliday: boolean;
  isRecess: boolean;
}

interface ScheduleCreateModalProps {
  isOpen: boolean;
  schedule?: ScheduleForm;
  onClose: () => void;
  reloadData: () => void;
}

const EMPTY_FORM: ScheduleForm = {
  dia: "",
  horarioStart: "08:00",
  horarioEnd: "18:00",
  intervalo: "12:00",
  intervaloThreshold: "01:00",
  isHoliday: false,
  isRecess: false,
};

export function ScheduleCreateModal({
  isOpen,
  schedule,
  onClose,
  reloadData,
}: ScheduleCreateModalProps) {
  const { mutate: createSchedule, isPending: loadingCreate } =
    useCreateHorarios();
  const { mutate: updateSchedule, isPending: loadingUpdate } =
    useUpdateHorario();

  const [form, setForm] = useState<ScheduleForm>(EMPTY_FORM);

  const isLoading = loadingCreate || loadingUpdate;
  const isEditing = !!schedule?.id;

  useEffect(() => {
    if (schedule) {
      setForm({ ...EMPTY_FORM, ...schedule });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [schedule, isOpen]);

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const validate = (): boolean => {
    if (!form.dia) {
      toast.error("Selecione o dia");
      return false;
    }
    if (!form.isHoliday && !form.isRecess) {
      if (
        !form.horarioStart ||
        !form.horarioEnd ||
        !form.intervalo ||
        !form.intervaloThreshold
      ) {
        toast.error("Preencha todos os horários");
        return false;
      }
    }
    return true;
  };

  const buildBody = (f: ScheduleForm) => ({
    dia: f.dia,
    horarioStart: f.isHoliday ? "00:00" : f.horarioStart,
    horarioEnd: f.isHoliday ? "00:00" : f.horarioEnd,
    intervalo: f.isHoliday ? "00:00" : f.intervalo,
    intervaloThreshold: f.isHoliday ? "0" : f.intervaloThreshold,
    isHoliday: f.isHoliday,
    isRecess: f.isRecess,
  });

  const handleSubmit = () => {
    if (!validate()) return;
    const body = buildBody(form);

    const callbacks = {
      onSuccess: () => {
        reloadData();
        handleClose();
        toast.success(
          isEditing
            ? "Horário atualizado com sucesso"
            : "Horário criado com sucesso",
        );
      },
      onError: (error: any) => {
        toast.error(
          isEditing ? "Erro ao atualizar horário" : "Erro ao criar horário",
          {
            description: error?.response?.data?.message || error?.message,
          },
        );
      },
    };

    if (isEditing) {
      updateSchedule({ id: schedule!.id!, body }, callbacks);
    } else {
      createSchedule(body, callbacks);
    }
  };

  const set = (field: keyof ScheduleForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const timePickerSx = {
    '& input::-webkit-calendar-picker-indicator': { display: 'none' },
  };

  const timeAdornment = (
    <InputAdornment position="start">
      <Clock size={18} color="#9CA3AF" />
    </InputAdornment>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? "Editar horário" : "Criar horário"}
      size="580px"
      onClose={handleClose}
    >
      <Stack spacing={2.5} pt={0.5}>

        {/* Dia */}
        <TextField
          label="Selecione o Dia"
          type="date"
          size="small"
          fullWidth
          value={form.dia ? new Date(form.dia).toISOString().split("T")[0] : ""}
          onChange={(e) => set("dia", e.target.value)}
          sx={timePickerSx}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarDays size={18} color="#9CA3AF" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Início / Fim */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Início do Expediente"
              type="time"
              size="small"
              fullWidth
              disabled={form.isHoliday || form.isRecess}
              value={form.horarioStart}
              onChange={(e) => set("horarioStart", e.target.value)}
              sx={timePickerSx}
              slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: timeAdornment } }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Fim do Expediente"
              type="time"
              size="small"
              fullWidth
              disabled={form.isHoliday || form.isRecess}
              value={form.horarioEnd}
              onChange={(e) => set("horarioEnd", e.target.value)}
              sx={timePickerSx}
              slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: timeAdornment } }}
            />
          </Grid>
        </Grid>

        {/* Intervalo / Duração */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Horário do Intervalo"
              type="time"
              size="small"
              fullWidth
              disabled={form.isHoliday || form.isRecess}
              value={form.intervalo}
              onChange={(e) => set("intervalo", e.target.value)}
              sx={timePickerSx}
              slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: timeAdornment } }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Duração do intervalo"
              type="time"
              size="small"
              fullWidth
              disabled={form.isHoliday || form.isRecess}
              value={form.intervaloThreshold}
              onChange={(e) => set("intervaloThreshold", e.target.value)}
              sx={timePickerSx}
              slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Clock size={18} color="#9CA3AF" />
                  </InputAdornment>
                ),
              },
            }}
            />
          </Grid>
        </Grid>

        {/* Checkboxes */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isHoliday}
                onChange={(e) => set("isHoliday", e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">Dia(s) sem expediente</Typography>}
          />
          <Box />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isRecess}
                onChange={(e) => set("isRecess", e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">Dia(s) de recesso</Typography>}
          />
        </Box>

        {/* Ações */}
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} pt={0.5}>
          <OutlineButton onClick={handleClose} disabled={isLoading}>
            Cancelar
          </OutlineButton>
          <GradientButton
            onClick={handleSubmit}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={14} color="inherit" /> : undefined}
          >
            {isEditing ? "Salvar" : "Gerar Horário"}
          </GradientButton>
        </Stack>

      </Stack>
    </Modal>
  );
}
