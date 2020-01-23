import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content, List } from 'native-base';

import MorpherResponsesPageTitle from './MorpherResponsesPageTitle';
import MorpherResponse from './MorpherResponse';
import BackButton from '../../components/BackButton/BackButton';

export default function MorpherResponsesPage({ navigation }) {
  const responses = navigation.getParam('responses', []);

  const onResponseSelected = response => {
    navigation.navigate('MorpherResponse', {
      response
    });
  };

  return (
    <Container>
      <Content padder>
        <List>
          {
            responses.map((response, index) => (
              <MorpherResponse
                key={index}
                response={response}
                onResponseSelected={() => onResponseSelected(response)}
              />
            ))
          }
        </List>
      </Content>
    </Container>
  );
}

MorpherResponsesPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

MorpherResponsesPage.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <MorpherResponsesPageTitle />,
  headerLeft: () => <BackButton navigation={navigation} />
});
