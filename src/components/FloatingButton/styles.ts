import styled, {css} from 'styled-components/native';

interface ContainerProps {
  theme?: 'primary' | 'secondary';
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

  ${({theme}) => {
    switch (theme) {
      case 'primary':
        return css`
          background-color: #00a82d;
        `;
      case 'secondary':
        return css`
          width: 40px;
          height: 40px;
          background-color: #ddd;
          right: 10px;
          top: 10px;
        `;
      default:
        return css`
          background-color: #00a82d;
        `;
    }
  }}
`;

export const Label = styled.Text``;
