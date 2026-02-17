import { styled } from '@mui/material/styles';
import { Box, Typography, LinearProgress } from '@mui/material';

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
