import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const OverviewChartRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
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
  fontSize: 24,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normal,
}));

export const OverviewChartSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
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
  width: 20,
  height: 20,
  borderRadius: 4,
  backgroundColor: color,
}));

export const LegendText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
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

export const BarsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 8,
  height: 180,
  borderBottom: `2px solid ${theme.palette.custom.grey.lightHover}`,
}));

export const Bar = styled(Box)<{ height: number; color: string }>(({ height, color }) => ({
  width: 62,
  height: `${height}%`,
  backgroundColor: color,
  borderRadius: '4px 4px 0 0',
  minHeight: 4,
  transition: 'height 0.3s ease',
}));

export const BarLabel = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
}));
