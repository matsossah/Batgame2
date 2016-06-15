import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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
          <TouchableWithoutFeedback
            key={match.id}
            onPress={this.props.onMatchPress.bind(null, match.id)}
          >
            <View>
              <Text>
                {match.participants[0].username}
                {' VS '}
                {match.participants[1].username}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMatchPress: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(MatchesList);
