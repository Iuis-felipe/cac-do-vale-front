import React from "react";
import { X } from "lucide-react";
import { StyledDialog, StyledDialogTitle, StyledDialogContent, CloseButton } from "./Modal.styled";

function parseTailwindWidth(size: string): string {
  if (size === 'w-1/3') return '33.333%';
  if (size === 'w-1/2') return '50%';
  if (size === 'w-2/3') return '66.667%';
  const match = size.match(/w-\[(.+?)\]/);
  if (match) return match[1];
  return size;
}

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  size?: string;
  height?: string;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, title, size = 'w-1/3', onClose }) => {
  const width = parseTailwindWidth(size);

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width, maxWidth: 'none' } }}
    >
      <StyledDialogTitle>
        {title}
        <CloseButton onClick={onClose} disableRipple>
          <X size={24} />
        </CloseButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default Modal;