import { styled } from '@mui/material/styles';
import { Box, Select, InputBase } from '@mui/material';

export const FilterRoot = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  marginBottom: 24,
});

export const FilterGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const FilterSelect = styled(Select)(({ theme }) => ({
  minWidth: 100,
  height: 40,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  '& .MuiSelect-select': {
    padding: '8px 12px',
    fontSize: 14,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.custom.grey.lightActive,
  },
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  height: 40,
  minWidth: 250,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  padding: '0 16px',
  fontSize: 14,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.custom.grey.lightActive,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 0 0 2px ${theme.palette.secondary.main}20`,
  },
  '& .MuiInputBase-input': {
    padding: 0,
  },
}));

export const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});
