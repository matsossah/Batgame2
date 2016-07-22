import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from 'react-native';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  round: {
    height: 60,
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD664',
    alignItems: 'center',
    backgroundColor: '#34485E',
  },
  game: {
    height: 50,
    width: 80,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#2C3D50',
  },
  won: {
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#4EB479',
  },
  lost: {
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#E74C3C',
  },
  title: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  action: {
    fontSize: 10,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  gameName: {
    fontSize: 6,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  playButton: {
    height: 30,
    width: 90,
    backgroundColor: 'green',
  },
  image: {
    width: 53,
    height: 30,
  },
});

class Round extends Component {
  render() {
    const {
      round, isCurrent, isActive, roundIdx, currentUser,
      ...otherProps,
    } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>ROUND {(roundIdx + 1).toString()}</Text>
        </View>
        <TouchableWithoutFeedback {...otherProps}>
          <View style={styles.round}>
            {round.games.map(game =>
              !game.gamePicked ?
                (
                  isActive ?
                    <View style={styles.game} key={game.id}>
                      <Text style={styles.action}>{I18n.t('yourTurn2')}</Text>
                    </View>
                  :
                    <View style={styles.game} key={game.id}>
                      <View style={styles.container}>
                        <Image
                          style={styles.image}
                          source={require('../../assets/logo.png')}
                        />
                      </View>
                    </View>
                )
              :
                game.isFinished ?
                  game.bestScore.users.includes(currentUser) ?
                    <View style={styles.won} key={game.id}>
                      <Text style={styles.gameName}>{I18n.t(game.info.name)}</Text>
                    </View>
                  :
                    <View style={styles.lost} key={game.id}>
                      <Text style={styles.gameName}>{I18n.t(game.info.name)}</Text>
                    </View>
                :
                  game.myScore ?
                    <View style={styles.game} key={game.id}>
                      <Text style={styles.action}>{I18n.t('waiting')}</Text>
                    </View>
                  :
                    <View style={styles.game} key={game.id}>
                      <Text style={styles.action}>{I18n.t('yourTurn2')}</Text>
                    </View>
                )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Round.propTypes = {
  round: PropTypes.object.isRequired,
  roundIdx: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Round;
