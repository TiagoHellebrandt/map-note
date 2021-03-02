import React from 'react';

import { Container } from './styles';

interface ModalProps {
  isVisible: boolean;
}

const Modal: React.FC<ModalProps> = ({ isVisible, children }) => {

  if (!isVisible) return null;

  return (
    <Container>
      {children}
    </Container>
  );
};

export default Modal;