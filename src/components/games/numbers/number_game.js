import React, { StyleSheet, Component, PropTypes, View } from 'react-native';
import shuffle from 'lodash/shuffle';
import without from 'lodash/without';

import Template from '../../common/template';
import NumberCell from './number_cell';
import Timer from '../../common/timer';
import Lives from '../../common/lives';

// Spacing in pixels between cells
const CELL_SPACING = 20;
const COLORS = [
  '#5bb578', // green
  '#df7f2f', // orange
  '#de4c3d', // red
  '#fcd866', // yellow
  '#4596da', // blue
];

const styles = StyleSheet.create({
  board: {
    flex: 1,
    // Even though it should be the default, it looks like manually setting
    // flexDirection breaks flexWrap. Will have to investigate
    // flexDirection: 'row',
    flexWrap: 'wrap',
    padding: CELL_SPACING / 2,
    justifyContent: 'center',
  },
  cell: {
    padding: CELL_SPACING / 2,
  },
});

class NumberGame extends Component {
  constructor() {
    super();

    this.state = {
      livesLost: 0,
      currentNumber: 9,
      board: this.generateBoard(),
      cellSize: 0,
    };

    this.startTime = Date.now();
    this.onLayout = this.onLayout.bind(this);
    this.onCellSuccess = this.onCellSuccess.bind(this);
    this.onCellFailure = this.onCellFailure.bind(this);
  }

  onLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      cellSize: (width - CELL_SPACING) / 3,
    });
  }

  onCellSuccess(cell) {
    const nextNumber = cell.number - 1;
    const nextBoard = this.state.board.slice();
    const nextCell = { ...cell, success: true };
    nextBoard.splice(nextBoard.indexOf(cell), 1, nextCell);
    this.setState({
      board: nextBoard,
      currentNumber: nextNumber,
    });
    if (nextNumber === 0) {
      this.props.onAction({ type: 'success' });
    }
  }

  onCellFailure() {
    const livesLost = this.state.livesLost + 1;
    this.setState({ livesLost });
    if (livesLost === this.props.lives) {
      this.props.onAction({ type: 'failure' });
    }
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({
        number: i + 1,
        success: false,
      });
    }
    board = shuffle(board);

    // Never have the same color twice in a row
    for (let i = 0; i < 9; i++) {
      const cell = board[i];
      const forbiddenColors = [];
      if (i - 3 >= 0) { // Top
        forbiddenColors.push(board[i - 3].color);
      }
      if (i % 3 !== 0) { // Left
        forbiddenColors.push(board[i - 1].color);
      }
      if (i - 4 >= 0 && i % 3 !== 0) { // Top left
        forbiddenColors.push(board[i - 4].color);
      }
      if (i - 2 >= 0 && i % 3 !== 2) { // Top right
        forbiddenColors.push(board[i - 2].color);
      }
      const availableColors = COLORS.filter(color =>
        forbiddenColors.indexOf(color) === -1
      );
      const color = availableColors[
        Math.floor(availableColors.length * Math.random())
      ];
      cell.color = color;
    }
    return board;
  }

  render() {
    return (
      <Template
        {...without(this.props, 'onAction')}
        onLayout={this.onLayout}
        header={
          <View>
            <Lives lives={3} livesLost={this.state.livesLost} />
            <Timer startTime={this.startTime} />
          </View>
        }
        footer={
          <View style={styles.board}>
            {this.state.board.map(cell =>
              <View
                key={cell.number}
                style={[styles.cell, {
                  width: this.state.cellSize,
                  height: this.state.cellSize,
                }]}
              >
                <NumberCell
                  cell={cell}
                  current={this.state.currentNumber === cell.number}
                  onSuccess={this.onCellSuccess}
                  onFailure={this.onCellFailure}
                />
              </View>
            )}
          </View>
        }
      />
    );
  }
}

NumberGame.propTypes = {
  lives: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

NumberGame.defaultProps = {
  lives: 3,
};

export default NumberGame;
