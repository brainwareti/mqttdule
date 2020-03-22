import React from 'react';
import {useSelector} from 'react-redux';
import Icone from '../../images/notification.png';

import {
  Container,
  ModalContainer,
  Status,
  ContentModal,
  DescriptionTitleContainer,
  IconContainer,
  Notification,
  Description,
  Title,
  ButtonText,
  Button,
  ButtonContainer,
  DescriptionTitle,
} from './styles';

const alerts = [
  {
    type: 'chamada',
    status: 'success',
    title: 'Chamada aceita',
    description: 'A chamada à Eng. de Teste foi aceita',
    color: '#6ea204',
  },

  {
    type: 'chamada',
    status: 'unavailable',
    title: 'Time indisponível',
    description: 'O time Eng. de Teste está indisponível no momento',
    color: '#007DB6',
  },

  {
    type: 'chamada',
    status: 'refused',
    title: 'Chamada negada',
    description: 'A chamada à Eng. de Teste foi negada',
    color: '#F2AF00',
  },

  {
    type: 'material',
    title: 'Material a caminho',
    description: 'O material solicitado será entregue em breve',
    color: '#6ea204',
  },

  {
    type: 'emergency',
    title: 'Alerta',
    description: 'Direcionar-se à saída de emergência mais próxima',
    color: '#CE1126',
  },
];

const AlertModal = () => {
  const receivedAlert = useSelector(state => state.connection.alert);
  const topic = useSelector(state => state.connection.topic);

  const alertSelected = alerts.filter(alert => {
    if (alert.type === receivedAlert.type) {
      if (receivedAlert.status) {
        if (alert.status === receivedAlert.status) {
          return alert;
        }
      } else {
        return alert;
      }
    }
  })[0];

  const color = alertSelected.color;
  const emergency = alertSelected.type === 'emergency';

  const modal = () => (
    <Container emergency={emergency}>
      <ModalContainer>
        <Status color={color} />
        <ContentModal>
          <IconContainer>
            <Notification
              source={Icone}
              resizeMethod="resize"
              resizeMode="contain"
              tintColor={color}
            />
          </IconContainer>
          <DescriptionTitleContainer>
            <DescriptionTitle>
              <Title color={color}>{alertSelected.title}</Title>
              <Description emergency={emergency}>
                {alertSelected.description}
              </Description>
            </DescriptionTitle>
            {!emergency && (
              <ButtonContainer>
                <Button color={color}>
                  <ButtonText>OK</ButtonText>
                </Button>
              </ButtonContainer>
            )}
          </DescriptionTitleContainer>
        </ContentModal>
      </ModalContainer>
    </Container>
  );

  return modal();
};

export default AlertModal;
