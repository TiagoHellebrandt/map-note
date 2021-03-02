import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 200px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 5px;
  padding-top: 30px;
  font-size: 18px;
  height: 100px;
  justify-content: flex-start;
  align-items: flex-start;
`;
