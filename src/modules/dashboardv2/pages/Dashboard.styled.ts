import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

export const DashboardContainer = styled(Stack)(({ theme }) => ({
  padding: '24px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  gap: 17,
}));

export const StatsRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 24,
  '& > *': {
    flex: '1 1 calc(33.333% - 16px)',
    minWidth: 280,
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
