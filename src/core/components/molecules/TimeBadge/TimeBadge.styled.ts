import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const TimeBadgeRoot = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'late' | 'soon' | 'ok' }>(({ status }) => ({
  fontSize: 11,
  padding: '2px 8px',
  borderRadius: 20,
  fontWeight: 500,
  border: '1px solid',
  display: 'inline-block',
  ...(status === 'late' && {
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  }),
  ...(status === 'soon' && {
    color: '#D97706',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  }),
  ...(status === 'ok' && {
    color: '#059669',
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  }),
}));
