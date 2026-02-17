import { styled } from '@mui/material/styles';
import { Box, TableContainer, Table, TableHead, TableBody, IconButton, Typography } from '@mui/material';

export const TableWrapper = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
}));

export const StyledTable = styled(Table)({
  minWidth: 800,
});

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.custom.grey.lightHover,
  '& .MuiTableCell-head': {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.custom.grey.normalActive,
    fontSize: 14,
    padding: '12px 16px',
    borderBottom: 'none',
  },
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.custom.grey.lightHover + '40',
    },
  },
  '& .MuiTableCell-body': {
    fontSize: 14,
    padding: '12px 16px',
    color: theme.palette.custom.grey.normalActive,
    borderBottom: `1px solid ${theme.palette.custom.grey.lightHover}`,
  },
}));

export const StatusBadge = styled(Box)<{ status: 'open' | 'closed' | 'recess' }>(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 10px',
  borderRadius: 20,
  fontSize: 12,
  fontWeight: theme.typography.fontWeightMedium,
  ...(status === 'open' && {
    color: theme.palette.custom.green.normal,
    backgroundColor: theme.palette.custom.green.normal + '15',
  }),
  ...(status === 'closed' && {
    color: '#EF4444',
    backgroundColor: '#EF444415',
  }),
  ...(status === 'recess' && {
    color: '#F59E0B',
    backgroundColor: '#F59E0B15',
  }),
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 6,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.custom.grey.lightHover,
    transform: 'scale(1.1)',
  },
}));

export const ActionButtonEdit = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.custom.blue.normalHover,
}));

export const ActionButtonDelete = styled(ActionButton)({
  color: '#EF4444',
});

export const ActionButtonCopy = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
}));

export const ActionButtonToggle = styled(ActionButton)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.custom.green.normal : '#EF4444',
}));

export const ActionsCell = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const EmptyCell = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
  textAlign: 'center',
}));
