import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Dimensions from 'Dimensions';
import GameHelpers from './GameHelpers';
import Tile from './Tile';
import _ from 'lodash';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#34485E',
  },
});

class GameBoard extends Component {
  render() {
    const indexesMatrix = GameHelpers.getMatrixFromIndxes(this.props.indexes, this.props.boardSize);
    const orderedIndexesMatrix = GameHelpers.getMatrixFromIndxes(GameHelpers.getOrderedIndexes(this.props.boardSize), this.props.boardSize);
    const tiles = _.flatten(indexesMatrix.map((row, i) => {
      return row.map((index, j) => {
        let axis;
        let direction;
        let moveTo;
        if (i > 0 && indexesMatrix[i - 1][j] === null) {
          axis = 'y';
          direction = -1;
          moveTo = { x: j, y: i - 1 };
        } else if (i < this.props.boardSize - 1 && indexesMatrix[i + 1][j] === null) {
          axis = 'y';
          direction = 1;
          moveTo = { x: j, y: i + 1 };
        } else if (j > 0 && indexesMatrix[i][j - 1] === null) {
          axis = 'x';
          direction = -1;
          moveTo = { x: j - 1, y: i };
        } else if (j < this.props.boardSize - 1 && indexesMatrix[i][j + 1] === null) {
          axis = 'x';
          direction = 1;
          moveTo = { x: j + 1, y: i };
        }
        return index ? (
          <Tile
            index={index}
            coordinates={{ x: j, y: i }}
            axis={axis}
            direction={direction}
            size={(deviceWidth - 20) / this.props.boardSize}
            onMoved={() => this.props.onMoved({ x: j, y: i }, moveTo)}
            isPlacedCorrectly={orderedIndexesMatrix[i][j] === index}
            key={index}
            visible={this.props.tilesVisible}
          />
        ) : null;
      });
    }));

    return (
      <View
        style={
        [styles.board, {
          width: deviceWidth - 20,
          height: deviceWidth - 20,
        }]}
      >
        {tiles}
      </View>
    );
  }
}

GameBoard.propTypes = {
  boardSize: PropTypes.number.isRequired,
  indexes: PropTypes.array.isRequired,
  tilesVisible: PropTypes.bool.isRequired,
  onMoved: PropTypes.func.isRequired,
};

module.exports = GameBoard;
