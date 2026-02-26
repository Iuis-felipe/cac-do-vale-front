import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  '& .MuiDialog-paper': {
    borderRadius: 8,
    padding: 16,
  },
});

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  marginBottom: 16,
  fontSize: 18,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
}));

export const StyledDialogContent = styled(DialogContent)({
  padding: 0,
  marginTop: 16,
});

export const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
  padding: 4,
  '&:hover': {
    color: theme.palette.custom.grey.normalActive,
    backgroundColor: 'transparent',
  },
}));
