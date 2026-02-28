import { Box, Divider } from '@mui/material';
import { Mail, Plus } from 'lucide-react';
import { CardRoot, CardHeader, CardTitle } from '@/components';
import {
  ViewAllLink,
  MemberList,
  MemberItem,
  MemberInfo,
  MemberAvatar,
  MemberName,
  MemberEmail,
  MemberAction,
  AddButton,
  MemberContainer,
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

function getMockAvatar(memberId: string | number): string {
  return `https://i.pravatar.cc/150?img=${memberId}`;
}

export function Team({ members, onViewAll, onAddMember, onEmailMember }: TeamProps) {
  return (
    <CardRoot>
      <CardHeader>
        <CardTitle>Equipe</CardTitle>
        <ViewAllLink onClick={onViewAll}>Ver tudo</ViewAllLink>
      </CardHeader>

      <MemberList>
        {members.map((member, index) => (
          <MemberContainer key={member.id}>
            <MemberItem>
              <MemberInfo>
                <MemberAvatar src={member.avatar || getMockAvatar(member.id)} alt={member.name} />
                <Box>
                  <MemberName>{member.name}</MemberName>
                  <MemberEmail>{member.email}</MemberEmail>
                </Box>
              </MemberInfo>
              <MemberAction onClick={() => onEmailMember?.(member)}>
                <Mail size={24} />
              </MemberAction>
            </MemberItem>
            {index < members.length - 1 && <Divider />}
          </MemberContainer>
        ))}
      </MemberList>

      <AddButton variant="outlined" startIcon={<Plus size={21} />} onClick={onAddMember}>
        Adicionar
      </AddButton>
    </CardRoot>
  );
}