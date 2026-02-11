import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

export const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  marginBottom: 24,
});

export const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  marginBottom: 24,
});

export const BottomGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
});

export const LoadingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  flexDirection: 'column',
  gap: 16,
});
