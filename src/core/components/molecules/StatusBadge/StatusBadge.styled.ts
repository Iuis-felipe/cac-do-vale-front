import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const BadgeRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  display: 'none',
  alignItems: 'center',
  gap: 4,
  fontSize: 10,
  padding: '4px 8px',
  borderRadius: 20,
  fontWeight: 500,
  border: '1px solid',
  '@media (min-width: 900px)': {
    display: 'flex',
  },
  ...(status === 'pending' && {
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  }),
  ...(status === 'done' && {
    color: '#065F46',
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  }),
  ...(status === 'canceled' && {
    color: '#9F1239',
    backgroundColor: '#FFE4E6',
    borderColor: '#FECDD3',
  }),
  ...(!status || status === 'default' ? {
    color: '#1D4ED8',
    backgroundColor: '#DBEAFE',
    borderColor: '#BFDBFE',
  } : {}),
}));
