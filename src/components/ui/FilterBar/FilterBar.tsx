import { Search } from 'lucide-react';
import { MenuItem, InputAdornment } from '@mui/material';
import {
  FilterBarRoot,
  FilterGroup,
  FilterSelect,
  SearchInput,
  SearchContainer,
} from './FilterBar.styled';

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
}

export function FilterBar({ 
  filters = [],
  search = '',
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  showSearch = true,
}: FilterBarProps) {
  return (
    <FilterBarRoot>
      {filters.length > 0 && (
        <FilterGroup>
          {filters.map((filter, index) => (
            <FilterSelect
              key={index}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value as string)}
              displayEmpty
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
            startAdornment={
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
