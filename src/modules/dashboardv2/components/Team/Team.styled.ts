import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Button, IconButton, Stack } from '@mui/material';

export const ViewAllLink = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
  cursor: 'pointer',
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
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
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
  '&:hover': {
    color: theme.palette.custom.green.normalHover,
  },
}));
