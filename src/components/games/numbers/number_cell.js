import React, {
  StyleSheet,
  Component,
  PropTypes,
  TouchableWithoutFeedback,
  Text,
  View,
  Animated,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 999,
    borderWidth: 5,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'chalkduster',
    // @TODO: Have the font size and maybe the border width be dependent on
    // the size of the cell.
    fontSize: 45,
    color: 'white',
    backgroundColor: 'transparent',
  },
});

class NumberCell extends Component {
  constructor() {
    super();

    this.state = {
      scale: new Animated.Value(1),
      opacity: new Animated.Value(1),
    };

    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.cell.success && this.props.cell.success) {
      Animated.parallel([
        Animated.spring(
          this.state.scale,
          {
            toValue: 0,
          }
        ),
        Animated.spring(
          this.state.opacity,
          {
            toValue: 0,
            tension: 60,
          }
        ),
      ]).start();
    }
  }

  onPress() {
    if (this.props.current) {
      this.props.onSuccess(this.props.cell);
    } else if (!this.props.cell.success) {
      this.props.onFailure(this.props.cell);
    }
  }

  onPressIn() {
    Animated.spring(
      this.state.scale,
      {
        toValue: 1.2,
        friction: 5,
      }
    ).start();
  }

  onPressOut() {
    Animated.spring(
      this.state.scale,
      {
        toValue: 1,
        friction: 5,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View
        {...this.props}
        style={[
          styles.container,
          {
            opacity: this.state.opacity,
            transform: [
              { scale: this.state.scale },
            ],
          },
        ].concat(this.props.style)}
      >
        <TouchableWithoutFeedback
          onPress={this.onPress}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
        >
          <View
            style={[
              styles.cell,
              {
                borderColor: this.props.cell.color,
              },
            ]}
          >
            <Text style={styles.text}>{this.props.cell.number.toString()}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

NumberCell.propTypes = {
  current: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  cell: PropTypes.shape({
    number: PropTypes.number.isRequired,
    success: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.any,
};

export default NumberCell;
