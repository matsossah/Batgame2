import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import GameBoard from './GameBoard';
import GameHelpers from './GameHelpers';
import Template from '../../common/Template';
import Timer from '../../common/Timer';
import Duration from '../../common/Duration';
import I18n from '../../../config/i18n';
import Fabric from 'react-native-fabric';

const { Answers } = Fabric;

const styles = StyleSheet.create({
  headerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  topFooter: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  bottomFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  restart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4EB479',
    alignSelf: 'stretch',
    opacity: 0.8,
  },
  giveUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    alignSelf: 'stretch',
    opacity: 0.8,
  },
  header: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  header2: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  label: {
    opacity: 0.8,
    fontFamily: 'chalkduster',
    fontWeight: '200',
    color: 'white',
  },
  wonDialog: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  buttonWrapper: {
    backgroundColor: '#FF3366',
    height: 55,
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'chalkduster',
  },
});

const BOARD_SIZE = 4;

class PuzzleGame extends Component {
  constructor() {
    super();
    this.state = {
      indexes: GameHelpers.getShuffledIndexes(BOARD_SIZE),
      tilesVisible: false,
      running: true,
      startTime: Date.now(),
      score: null,
    };

    this.onRestart = this.onRestart.bind(this);
    this.onGiveUp = this.onGiveUp.bind(this);
    this.onMoved = this.onMoved.bind(this);
  }

  componentDidMount() {
    this.setState({ tilesVisible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  onGiveUp() {
    Answers.logCustom('Puzzle GiveUp');
    const score = 1800000;
    this.setState({
      running: false,
      score,
    });
    this.props.onEnd({ score });
  }

  onRestart() {
    this.setState({
      tilesVisible: false,
    });
    setTimeout(() => {
      this.setState({
        indexes: GameHelpers.getShuffledIndexes(BOARD_SIZE),
      }, () => this.setState({ tilesVisible: true, startTime: Date.now() }));
    }, 200 + 20 * 15); // animation length + delay of each tile
  }

  onMoved(moveFrom, moveTo) {
    const indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, BOARD_SIZE);
    indexesMatrix[moveTo.y][moveTo.x] = indexesMatrix[moveFrom.y][moveFrom.x];
    indexesMatrix[moveFrom.y][moveFrom.x] = null;
    this.setState({
      indexes: GameHelpers.getIndexesFromMatrix(indexesMatrix),
    });
    if (GameHelpers.isWon(this.state.indexes, BOARD_SIZE) === true) {
      const score = Date.now() - this.state.startTime;
      this.setState({
        running: false,
        score,
      });
      this.props.onEnd({ score });
    }
  }

  render() {
    return (
      <Template
        header={
          <View>
            {this.state.running ?
              <Timer startTime={this.state.startTime} />
            :
              <Duration duration={this.state.score} />
            }
          </View>
        }
        footer={
          <View style={styles.footer}>
            <View style={styles.topFooter}>
              <GameBoard
                boardSize={BOARD_SIZE}
                indexes={this.state.indexes}
                onMoved={this.onMoved}
                tilesVisible={this.state.tilesVisible}
              />
            </View>
            {this.state.tilesVisible &&
              <View style={styles.bottomFooter}>
                {
                // <View style={styles.restart}>
                //   <TouchableOpacity onPress={this.onRestart}>
                //     <Text style={styles.label}>{I18n.t('restart')}</Text>
                //   </TouchableOpacity>
                // </View>
                }
                <View style={styles.giveUp}>
                  <TouchableOpacity onPress={this.onGiveUp} style={styles.giveUp}>
                    <Text style={styles.label}>{I18n.t('giveUp')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        }
      />
    );
  }
}

PuzzleGame.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

module.exports = PuzzleGame;
