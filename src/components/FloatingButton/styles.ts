import styled, { css } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface ContainerProps {
  theme?: 'primary' |  'secondary';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  position: absolute;
  right: 10px;
  bottom: 10px;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;

  ${({ theme }) => {
    switch (theme) {
      case 'primary':
        return css`
          background-color: #B6D52E;
        `;
      case 'secondary':
        return css`
          background-color: #ddd;
        `;
      default:
        return css`
          background-color: #B6D52E;
        `;
    }
  }}
`;

export const Label = styled.Text``;