import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Label } from './styles';

interface FloatingButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  theme?: 'primary' |  'secondary';
  label?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon, 
  theme, 
  label, 
  ...props 
}) => {
  return (
    <Container theme={theme} {...props}>
      {icon}
      {label && <Label>{label}</Label>}
    </Container>
  );
};

export default FloatingButton;