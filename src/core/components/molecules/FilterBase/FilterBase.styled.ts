import { styled } from '@mui/material/styles';
import { Box, Select, InputBase } from '@mui/material';

// ---------------------------------------------------------------------------
// Base filter layout — shared by all filter bars across the app.
// Import these in feature-specific *.styled.ts and re-export (or extend).
// ---------------------------------------------------------------------------

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
    fontSize: 13,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.custom.grey.lightActive,
  },
}));

export const selectMenuProps = {
  PaperProps: {
    sx: {
      borderRadius: 2,
      mt: 0.5,
      '& .MuiMenuItem-root': {
        fontSize: 13,
        minHeight: 'unset',
        padding: '6px 12px',
      },
    },
  },
};

/** Pill-shaped search input — default search style across the app. */
export const SearchInput = styled(InputBase)(({ theme }) => ({
  minWidth: 285,
  borderRadius: 24,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  padding: '10px 5px 10px 16px',
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
