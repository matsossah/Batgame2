import React, { StyleSheet, Component, PropTypes, View } from 'react-native';
import shuffle from 'lodash/shuffle';
import without from 'lodash/without';

import Template from '../../common/template';
import NumberCell from './number_cell';
import Timer from '../../common/timer';
import Lives from '../../common/lives';

// Spacing in pixels between cells
const cellSpacing = 20;

const styles = StyleSheet.create({
  board: {
    flex: 1,
    // Even though it should be the default, it looks like manually setting
    // flexDirection breaks flexWrap. Will have to investigate
    // flexDirection: 'row',
    flexWrap: 'wrap',
    padding: cellSpacing / 2,
    justifyContent: 'center',
  },
  cell: {
    padding: cellSpacing / 2,
  },
});

class NumberGame extends Component {
  constructor() {
    super();

    this.state = {
      currentNumber: 9,
      board: this.generateBoard(),
      cellSize: 0,
    };

    this.startTime = Date.now();
    this.onLayout = this.onLayout.bind(this);
    this.onCellPress = this.onCellPress.bind(this);
  }

  onLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      cellSize: (width - cellSpacing) / 3,
    });
  }

  onCellPress(cell) {
    if (cell.valid) {
      return;
    }

    if (cell.number === this.state.currentNumber) {
      if (this.state.currentNumber === 1) {
        this.props.onAction({ type: 'success' });
      } else {
        const { nextBoard } = this.updateCell(cell, { valid: true });
        this.setState({
          board: nextBoard,
          currentNumber: this.state.currentNumber - 1,
        });
      }
    } else {
      const { nextBoard, nextCell } = this.updateCell(cell, { error: true });
      this.props.onAction({ type: 'failure' });
      // Notify the cell's component that it should render an error.
      this.setState({ board: nextBoard }, () => {
        const {
          nextBoard: nextBoard2,
        } = this.updateCell(nextCell, { error: true });
        this.setState({ board: nextBoard2 });
      });
    }
  }

  updateCell(cell, update) {
    const nextBoard = this.state.board.slice();
    const nextCell = {
      ...cell,
      ...update,
    };
    nextBoard.splice(nextBoard.indexOf(cell), 1, nextCell);
    return { nextBoard, nextCell };
  }

  generateBoard() {
    const board = [];
    for (let i = 1; i < 10; i++) {
      board.push({
        number: i,
        valid: false,
        error: false,
      });
    }
    return shuffle(board);
  }

  render() {
    return (
      <Template
        {...without(this.props, 'onAction')}
        onLayout={this.onLayout}
        header={
          <View>
            <Timer startTime={this.startTime} />
            <Lives lives={3} livesLost={0} />
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
                  onPress={this.onCellPress}
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
  onAction: PropTypes.func.isRequired,
};

export default NumberGame;
