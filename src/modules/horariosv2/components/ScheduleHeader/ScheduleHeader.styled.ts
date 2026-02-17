import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, Button } from '@mui/material';

export const ScheduleHeaderRoot = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
});

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 28,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.custom.grey.normalActive,
}));

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: 12,
});

export const PeriodButton = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlueHorizontal,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 14,
  padding: '10px 20px',
  borderRadius: 8,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.gradient.blueToGreenHorizontal,
    transform: 'translateY(-1px)',
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.custom.grey.normalActive,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 14,
  padding: '10px 20px',
  borderRadius: 8,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.custom.grey.lightHover,
    transform: 'translateY(-1px)',
  },
}));
