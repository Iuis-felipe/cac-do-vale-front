import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

/**
 * FilterBar uses a compact rectangular search input instead of the pill shape.
 * All other filter primitives come straight from FilterBase.styled.ts.
 */
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
