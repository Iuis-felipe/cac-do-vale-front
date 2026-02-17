import { ReactNode } from 'react';
import {
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderActions,
} from './PageHeader.styled';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <PageHeaderRoot>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      {children && <PageHeaderActions>{children}</PageHeaderActions>}
    </PageHeaderRoot>
  );
}
