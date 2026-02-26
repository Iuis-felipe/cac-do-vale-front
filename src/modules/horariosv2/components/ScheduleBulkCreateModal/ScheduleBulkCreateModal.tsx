import { useState } from 'react';
import { TextField, InputAdornment, Checkbox, FormControlLabel, CircularProgress, Stack, Grid, Box, Typography } from '@mui/material';
import { CalendarDays, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '@/core/components/organism/Modal';
import { GradientButton, OutlineButton } from '@/components';
import useCreateBulkHorarios from '@/modules/horarios/hooks/useCreateBulkHorarios';

interface ScheduleBulkCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  reloadData: () => void;
}

export function ScheduleBulkCreateModal({ isOpen, onClose, reloadData }: ScheduleBulkCreateModalProps) {
  const { mutate: createBulk, isPending } = useCreateBulkHorarios();

  const [periods, setPeriods] = useState<number>(1);
  const [inicio, setInicio] = useState('08:00');
  const [fim, setFim] = useState('18:00');
  const [isClosed, setIsClosed] = useState(false);
  const [isRecess, setIsRecess] = useState(false);

  const handleClose = () => {
    setPeriods(1);
    setInicio('08:00');
    setFim('18:00');
    setIsClosed(false);
    setIsRecess(false);
    onClose();
  };

  const handleSubmit = () => {
    if (periods < 1) { toast.error('Informe uma quantidade válida de dias'); return; }

    createBulk(
      {
        period: periods.toString(),
        body: {
          start: isClosed || isRecess ? undefined : inicio,
          end: isClosed || isRecess ? undefined : fim,
          isHoliday: isClosed,
          isRecess,
        },
      },
      {
        onSuccess: () => {
          reloadData();
          handleClose();
          toast.success('Período criado com sucesso');
        },
        onError: (error: any) => {
          toast.error('Erro ao criar período', {
            description: error?.response?.data?.message || error?.message,
          });
        },
      }
    );
  };

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
      title="Criar período"
      size="580px"
      onClose={handleClose}
    >
      <Stack spacing={2.5} pt={0.5}>

        {/* Quantidade de dias */}
        <TextField
          label="Quantidade de dias"
          type="number"
          size="small"
          fullWidth
          value={periods}
          onChange={e => setPeriods(Number(e.target.value))}
          slotProps={{
            htmlInput: { min: 1, max: 365 },
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
        <Stack direction="row" spacing={2}>
          <TextField
            label="Início do Expediente"
            type="time"
            size="small"
            fullWidth
            disabled={isClosed || isRecess}
            value={inicio}
            onChange={e => setInicio(e.target.value)}
            sx={timePickerSx}
            slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: timeAdornment } }}
          />
          <TextField
            label="Fim do Expediente"
            type="time"
            size="small"
            fullWidth
            disabled={isClosed || isRecess}
            value={fim}
            onChange={e => setFim(e.target.value)}
            sx={timePickerSx}
            slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: timeAdornment } }}
          />
        </Stack>

        {/* Checkboxes */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={isClosed}
                onChange={e => setIsClosed(e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">Dia(s) sem expediente</Typography>}
          />
          <Box />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRecess}
                onChange={e => setIsRecess(e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">Dia(s) de recesso</Typography>}
          />
        </Box>

        {/* Ações */}
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} pt={0.5}>
          <OutlineButton onClick={handleClose} disabled={isPending}>
            Cancelar
          </OutlineButton>
          <GradientButton onClick={handleSubmit} disabled={isPending || periods < 1} startIcon={isPending ? <CircularProgress size={14} color="inherit" /> : undefined}>
            Gerar Horários
          </GradientButton>
        </Stack>

      </Stack>
    </Modal>
  );
}
