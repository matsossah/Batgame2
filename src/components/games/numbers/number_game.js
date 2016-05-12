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
      cellSize: (width - cellSpacing) / 3,
    });
  }

  onCellSuccess(cell) {
    const nextNumber = cell.number + 1;
    const nextBoard = this.state.board.slice();
    const nextCell = { ...cell, success: true };
    nextBoard.splice(nextBoard.indexOf(cell), 1, nextCell);
    this.setState({
      board: nextBoard,
      nextNumber,
    });
    if (nextNumber === 10) {
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
    const board = [];
    for (let i = 1; i < 10; i++) {
      board.push({
        number: i,
        success: false,
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
