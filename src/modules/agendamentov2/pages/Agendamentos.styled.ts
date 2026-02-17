import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

export const AgendamentoContainer = styled(Stack)({
  gap: 20,
});

export const ContentArea = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const LoadingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  flexDirection: 'column',
  gap: 16,
});

export const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 16,
  padding: 48,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  border: `2px dashed ${theme.palette.custom.grey.lightHover}`,
}));
