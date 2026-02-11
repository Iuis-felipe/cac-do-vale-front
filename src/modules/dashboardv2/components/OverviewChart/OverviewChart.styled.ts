import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const OverviewChartRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: '24px',
  background: theme.palette.background.paper,
}));

export const OverviewChartHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
});

export const OverviewChartTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.palette.grey[500],
}));

export const OverviewChartSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.grey[200],
}));

export const OverviewChartLegend = styled(Box)({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
});

export const LegendItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const LegendDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: 4,
  backgroundColor: color,
}));

export const LegendText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.grey[500],
}));

export const ChartContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  height: 200,
  gap: 16,
  paddingTop: 16,
});

export const BarGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  gap: 8,
});

export const BarsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  height: 180,
});

export const Bar = styled(Box)<{ height: number; color: string }>(({ height, color }) => ({
  width: 32,
  height: `${height}%`,
  backgroundColor: color,
  borderRadius: '4px 4px 0 0',
  minHeight: 4,
  transition: 'height 0.3s ease',
}));

export const BarLabel = styled(Typography)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.grey[500],
  textAlign: 'center',
}));
