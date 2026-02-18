import ViewToggleButton from '@/core/components/molecules/ToggleButton';
import { InputAdornment, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import {
  FilterGroup,
  FilterRoot,
  FilterSelect,
  SearchContainer,
  SearchInput,
} from './AppointmentFilter.styled';


type ViewMode = 'grid' | 'list';

interface AppointmentFilterProps {
  day?: string;
  month?: string;
  search?: string;
  onDayChange?: (day: string) => void;
  onMonthChange?: (month: string) => void;
  onSearchChange?: (search: string) => void;
  view?: ViewMode;
  setView?: (view: ViewMode) => void;
}

const days = ['Dia', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const months = ['Mês', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


export function AppointmentFilter({ 
  day = 'Dia', 
  month = 'Mês', 
  search = '',
  onDayChange,
  onMonthChange,
  onSearchChange,
  view = 'grid',
  setView,
}: AppointmentFilterProps) {
  return (
    <FilterRoot>
      <FilterGroup>
        <FilterSelect
          value={day}
          onChange={(e) => onDayChange?.(e.target.value as string)}
          displayEmpty
        >
          {days.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </FilterSelect>
        <FilterSelect
          value={month}
          onChange={(e) => onMonthChange?.(e.target.value as string)}
          displayEmpty
        >
          {months.map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </FilterSelect>
        {setView && <ViewToggleButton view={view} setView={setView} />}
      </FilterGroup>

      <SearchContainer>
        <SearchInput
          placeholder="Buscar agendamento"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search size={18} color="#9CA3AF" />
            </InputAdornment>
          }
        />
      </SearchContainer>
    </FilterRoot>
  );
}
