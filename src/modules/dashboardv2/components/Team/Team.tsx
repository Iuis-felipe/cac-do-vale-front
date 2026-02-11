import { Box } from '@mui/material';
import { Mail, Plus } from 'lucide-react';
import {
  TeamRoot,
  TeamHeader,
  TeamTitle,
  ViewAllLink,
  MemberList,
  MemberItem,
  MemberInfo,
  MemberAvatar,
  MemberName,
  MemberEmail,
  MemberAction,
  AddButton,
} from './Team.styled';

interface TeamMember {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
}

interface TeamProps {
  members: TeamMember[];
  onViewAll?: () => void;
  onAddMember?: () => void;
  onEmailMember?: (member: TeamMember) => void;
}

export function Team({ members, onViewAll, onAddMember, onEmailMember }: TeamProps) {
  return (
    <TeamRoot>
      <TeamHeader>
        <TeamTitle>Equipe</TeamTitle>
        <ViewAllLink onClick={onViewAll}>Ver tudo</ViewAllLink>
      </TeamHeader>

      <MemberList>
        {members.map((member) => (
          <MemberItem key={member.id}>
            <MemberInfo>
              <MemberAvatar src={member.avatar} alt={member.name}>
                {member.name.charAt(0)}
              </MemberAvatar>
              <Box>
                <MemberName>{member.name}</MemberName>
                <MemberEmail>{member.email}</MemberEmail>
              </Box>
            </MemberInfo>
            <MemberAction onClick={() => onEmailMember?.(member)}>
              <Mail size={18} />
            </MemberAction>
          </MemberItem>
        ))}
      </MemberList>

      <AddButton variant="outlined" startIcon={<Plus size={16} />} onClick={onAddMember}>
        Adicionar
      </AddButton>
    </TeamRoot>
  );
}
