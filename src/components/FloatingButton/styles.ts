import styled, {css} from 'styled-components/native';

interface ContainerProps {
  theme?: 'primary' | 'secondary';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  position: absolute;
  right: 10px;
  bottom: 20px;
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
          background-color: #999;
          right: 10px;
          bottom: 90px;
        `;
      default:
        return css`
          background-color: #00a82d;
        `;
    }
  }}
`;

export const Label = styled.Text``;
