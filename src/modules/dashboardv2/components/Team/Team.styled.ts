import { styled } from '@mui/material/styles';
import { Typography, Avatar, Button, IconButton, Stack } from '@mui/material';

export const ViewAllLink = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export const MemberList = styled(Stack)({
  gap: 20,
});

export const MemberItem = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const MemberContainer = styled(Stack)({
  gap: 20
});

export const MemberInfo = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
});

export const MemberAvatar = styled(Avatar)(() => ({
  width: 46,
  height: 46,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const MemberName = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
}));

export const MemberEmail = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.custom.grey.lightActive,
}));

export const MemberAction = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
  padding: 8,
  transition: 'color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
    transform: 'scale(1.1)',
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: 20,
  borderRadius: 24,
  border: '1px solid transparent',
  backgroundImage: `linear-gradient(white, white), ${theme.palette.gradient.blueToGreenHorizontal}`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  color: theme.palette.custom.grey.normalActive,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 16,
  padding: '10px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.gradient.greenToBlueHorizontal,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));
