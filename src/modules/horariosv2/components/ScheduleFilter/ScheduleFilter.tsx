import { Search } from 'lucide-react';
import { MenuItem, InputAdornment } from '@mui/material';
import {
  FilterRoot,
  FilterGroup,
  FilterSelect,
  SearchInput,
  SearchContainer,
  selectMenuProps,
} from '@/core/components/molecules/FilterBase/FilterBase.styled';

interface ScheduleFilterProps {
  day?: string;
  month?: string;
  search?: string;
  onDayChange?: (day: string) => void;
  onMonthChange?: (month: string) => void;
  onSearchChange?: (search: string) => void;
}

const days = ['Dia', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const months = ['Mês', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function ScheduleFilter({ 
  day = 'Dia', 
  month = 'Mês', 
  search = '',
  onDayChange,
  onMonthChange,
  onSearchChange,
}: ScheduleFilterProps) {
  return (
    <FilterRoot>
      <FilterGroup>
        <FilterSelect
          value={day}
          onChange={(e) => onDayChange?.(e.target.value as string)}
          displayEmpty
          MenuProps={selectMenuProps}
        >
          {days.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </FilterSelect>
        <FilterSelect
          value={month}
          onChange={(e) => onMonthChange?.(e.target.value as string)}
          displayEmpty
          MenuProps={selectMenuProps}
        >
          {months.map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </FilterSelect>
      </FilterGroup>

      <SearchContainer>
        <SearchInput
          placeholder="Buscar agendamento"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Search size={18} color="#9CA3AF" />
            </InputAdornment>
          }
        />
      </SearchContainer>
    </FilterRoot>
  );
}
