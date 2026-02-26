import { InputAdornment, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import {
  FilterRoot as FilterBarRoot,
  FilterGroup,
  FilterSelect,
  SearchContainer,
  SearchInput,
  selectMenuProps,
} from '@/core/components/molecules/FilterBase/FilterBase.styled';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SelectFilter {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

interface FilterBarProps {
  filters?: SelectFilter[];
  search?: string;
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function FilterBar({ 
  filters = [],
  search = '',
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  showSearch = true,
  actions,
}: FilterBarProps) {
  return (
    <FilterBarRoot>
      {filters.length > 0 && (
        <FilterGroup>
          {actions && <>{actions}</>}
          {filters.map((filter, index) => (
            <FilterSelect
              key={index}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value as string)}
              displayEmpty
              MenuProps={selectMenuProps}
            >
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FilterSelect>
          ))}
        </FilterGroup>
      )}

      {showSearch && (
        <SearchContainer>
          <SearchInput
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            endAdornment={
              <InputAdornment position="start">
                <Search size={18} color="#9CA3AF" />
              </InputAdornment>
            }
          />
        </SearchContainer>
      )}
    </FilterBarRoot>
  );
}
