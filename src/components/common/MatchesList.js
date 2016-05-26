import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

class MatchesList extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.matches.map(match =>
          <Text key={match.id}>
            {match.participants[0].username}
            {' VS '}
            {match.participants[1].username}
          </Text>
        )}
      </View>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MatchesList;
