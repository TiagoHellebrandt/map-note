import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Label} from './styles';

interface FloatingButtonProps extends TouchableOpacityProps {
  icon?: string;
  theme?: 'primary' | 'secondary';
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
      {icon && <Icon name={icon} color={'#fff'} size={18} />}
      {label && <Label>{label}</Label>}
    </Container>
  );
};

export default FloatingButton;
