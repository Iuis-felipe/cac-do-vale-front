import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

export const DashboardContainer = styled(Stack)(() => ({
  gap: 20,
}));

export const StatsRow = styled(Stack)({
  flexWrap: 'wrap',
  flexDirection: 'row',
  gap: 20,
  '& > *': {
    flex: '1 1 366px',
  },
});

export const ContentRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const BottomRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 24,
  '& > *': {
    flex: '1 1 calc(50% - 12px)',
    minWidth: 300,
  },
});

export const LoadingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  flexDirection: 'column',
  gap: 16,
});
