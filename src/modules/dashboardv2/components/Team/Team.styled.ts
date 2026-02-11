import { styled } from '@mui/material/styles';
import { Card, Box, Typography, Avatar, Button, IconButton } from '@mui/material';

export const TeamRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: '24px',
  background: theme.palette.background.paper,
}));

export const TeamHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
});

export const TeamTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.palette.grey[500],
}));

export const ViewAllLink = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.grey[200],
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export const MemberList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const MemberItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const MemberInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const MemberAvatar = styled(Avatar)(() => ({
  width: 40,
  height: 40,
}));

export const MemberName = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

export const MemberEmail = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.grey[200],
}));

export const MemberAction = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[200],
  padding: 8,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: 16,
  borderRadius: 24,
  border: '1px solid transparent',
  backgroundImage: `linear-gradient(white, white), ${theme.palette.gradient.secondary}`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  color: theme.palette.grey[500],
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 14,
  padding: '10px 16px',
  '&:hover': {
    color: theme.palette.green.normalHover,
  },
}));
