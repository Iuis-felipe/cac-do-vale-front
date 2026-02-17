import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Button, IconButton } from '@mui/material';

export const ViewAllLink = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.custom.grey.lightActive,
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
  color: theme.palette.custom.grey.normalActive,
}));

export const MemberEmail = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.custom.grey.lightActive,
}));

export const MemberAction = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
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
  backgroundImage: `linear-gradient(white, white), ${theme.palette.gradient.blueToGreenHorizontal}`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  color: theme.palette.custom.grey.normalActive,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 14,
  padding: '10px 16px',
  '&:hover': {
    color: theme.palette.custom.green.normalHover,
  },
}));
