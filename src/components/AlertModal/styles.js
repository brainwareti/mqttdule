import styled from 'styled-components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils/responsibles';

import {RFPercentage as rf} from '../../utils/responsibleText';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: ${props => (props.emergency ? 'center' : 'flex-start')};
  position: absolute;
  background-color: rgba(52, 52, 52, 0.6);
`;

export const ModalContainer = styled.View`
  height: ${hp('40%')}px;
  width: ${wp('73%')}px;
  background-color: white;
  align-self: center;
  margin-top: 18px;
`;

export const Status = styled.View`
  height: ${hp('2.4%')}px;
  width: ${wp('73%')}px;
  background-color: ${props => props.color};
`;

export const ContentModal = styled.View`
  height: ${hp('37.6%')}px;
  width: ${wp('73%')}px;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: ${hp('37.6%')}px;
  width: ${hp('37.4%')}px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

export const Notification = styled.Image`
  height: ${hp('18%')}px;
  width: ${hp('18%')}px;
`;

export const DescriptionTitleContainer = styled.View`
  height: ${hp('37.6%')}px;
  width: ${wp('73%') - hp('37.4%')}px;
  justify-content: space-between;
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${props => props.color};
  font-size: ${rf(3)}px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  color: black;
  font-size: ${rf(2.4)}px;
  width: ${props => (props.emergency ? wp('100%') : wp('33%'))}px;
`;

export const Button = styled.TouchableOpacity`
  padding-horizontal: 28px;
  padding-vertical: 8px;
  background-color: ${props => props.color};
  border-radius: 4px;
  align-self: flex-end;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${rf(2.2)}px;
`;

export const ButtonContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

export const DescriptionTitle = styled.View`
  width: 100%;
`;
