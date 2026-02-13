import { styled } from '@mui/material/styles';
import { Card, Box, Typography, LinearProgress } from '@mui/material';

export const ExamTypesRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
  padding: '24px',
  background: theme.palette.background.paper,
}));

export const ExamTypesTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normal,
  marginBottom: 20,
}));

export const ExamItem = styled(Box)({
  marginBottom: 16,
  '&:last-child': {
    marginBottom: 0,
  },
});

export const ExamItemHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 6,
});

export const ExamItemName = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.custom.grey.normalActive,
}));

export const ExamItemStats = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.custom.grey.lightActive,
}));

export const ExamProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.custom.grey.lightHover,
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background: theme.palette.gradient.greenToBlueHorizontal,
  },
}));
