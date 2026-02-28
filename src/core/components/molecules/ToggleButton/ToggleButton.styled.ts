import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const ToggleButtonRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const ToggleButtonItem = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  height: 36,
  width: 36,
  borderRadius: 8,
  border: `1px solid ${isActive ? theme.palette.custom.grey.lightActive : theme.palette.custom.grey.lightHover}`,
  backgroundColor: isActive ? theme.palette.custom.grey.lightHover : 'transparent',
  color: theme.palette.custom.grey.normalActive,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.custom.grey.lightHover,
  },
}));
