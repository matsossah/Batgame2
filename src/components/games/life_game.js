import React, { StyleSheet, Component, PropTypes, Text } from 'react-native';

const styles = StyleSheet.create({
  heart: {

  },
});

export default function createLifeGame(Composed) {
  class LifeGame extends Component {
    constructor() {
      super();

      this.state = {
        livesLost: 0,
      };

      this.onFailure = this.onFailure.bind(this);
    }

    onFailure() {
      const livesLost = this.state.livesLost + 1;
      if (livesLost === this.props.lives) {
        this.props.onFailure();
      } else {
        this.setState({ livesLost });
      }
    }

    render() {
      const { lives, header, ...otherProps } = this.props;
      const { livesLost } = this.state;
      const hearts = [];
      for (let i = 0; i < lives - livesLost; i++) {
        hearts.push(<Text style={styles.heart}>{'<3'}</Text>);
      }
      return (
        <Composed
          {...otherProps}
          header={[
            hearts,
          ].concat(header)}
          onFailure={this.onFailure}
        />
      );
    }
  }

  LifeGame.propTypes = {
    lives: PropTypes.number.isRequired,
    onFailure: PropTypes.func.isRequired,
    header: PropTypes.node,
  };

  return LifeGame;
}
