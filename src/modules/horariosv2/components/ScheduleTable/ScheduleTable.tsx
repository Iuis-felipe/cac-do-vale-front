import { TableRow, TableCell, CircularProgress, Box } from '@mui/material';
import { Pencil, Trash2, Copy, CalendarCheck, CalendarX } from 'lucide-react';
import {
  TableWrapper,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StatusBadge,
  TableActionButtonEdit,
  TableActionButtonDelete,
  TableActionButtonCopy,
  TableActionButtonToggle,
  ActionsCell,
  EmptyTableCell,
} from '@/components';

export interface ScheduleData {
  id: string;
  date: string;
  status: 'open' | 'closed' | 'recess';
  startTime: string;
  endTime: string;
  breakTime: string;
  breakDuration: string;
  isHoliday: boolean;
}

interface ScheduleTableProps {
  data: ScheduleData[];
  isLoading?: boolean;
  onEdit?: (schedule: ScheduleData) => void;
  onDelete?: (id: string) => void;
  onCopy?: (schedule: ScheduleData) => void;
  onToggleStatus?: (id: string, isHoliday: boolean) => void;
}

const getStatusVariant = (status: 'open' | 'closed' | 'recess'): 'success' | 'error' | 'warning' => {
  const variants = {
    open: 'success' as const,
    closed: 'error' as const,
    recess: 'warning' as const,
  };
  return variants[status];
};

const getStatusLabel = (status: 'open' | 'closed' | 'recess') => {
  const labels = {
    open: 'Aberto',
    closed: 'Fechado',
    recess: 'Recesso',
  };
  return labels[status];
};

export function ScheduleTable({ 
  data, 
  isLoading,
  onEdit, 
  onDelete, 
  onCopy,
  onToggleStatus,
}: ScheduleTableProps) {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <TableWrapper>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Início do Expediente</TableCell>
            <TableCell align="center">Fim do Expediente</TableCell>
            <TableCell align="center">Intervalo</TableCell>
            <TableCell align="center">Duração do Intervalo</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyTableCell>Nenhum horário cadastrado</EmptyTableCell>
              </TableCell>
            </TableRow>
          ) : (
            data.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell align="center">{schedule.date}</TableCell>
                <TableCell align="center">
                  <StatusBadge variant={getStatusVariant(schedule.status)}>
                    {getStatusLabel(schedule.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell align="center">
                  {schedule.status === 'closed' ? '-' : schedule.startTime}
                </TableCell>
                <TableCell align="center">
                  {schedule.status === 'closed' ? '-' : schedule.endTime}
                </TableCell>
                <TableCell align="center">
                  {schedule.status === 'closed' ? '-' : schedule.breakTime}
                </TableCell>
                <TableCell align="center">
                  {schedule.status === 'closed' ? '-' : schedule.breakDuration}
                </TableCell>
                <TableCell>
                  <ActionsCell>
                     <TableActionButtonCopy size="small" onClick={() => onCopy?.(schedule)}>
                      <Copy size={20} />
                    </TableActionButtonCopy>
                    <TableActionButtonEdit size="small" onClick={() => onEdit?.(schedule)}>
                      <Pencil size={20} />
                    </TableActionButtonEdit>
                    <TableActionButtonDelete size="small" onClick={() => onDelete?.(schedule.id)}>
                      <Trash2 size={20} />
                    </TableActionButtonDelete>
                    <TableActionButtonToggle 
                      size="small" 
                      isActive={!schedule.isHoliday}
                      onClick={() => onToggleStatus?.(schedule.id, !schedule.isHoliday)}
                    >
                      {schedule.isHoliday ? <CalendarX size={20} /> : <CalendarCheck size={20} />}
                    </TableActionButtonToggle>
                  </ActionsCell>
                </TableCell>
              </TableRow>
            ))
          )}
        </StyledTableBody>
      </StyledTable>
    </TableWrapper>
  );
}
