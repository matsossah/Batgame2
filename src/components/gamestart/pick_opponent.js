import React, {
	View,
	Text,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#34485E',
    flex: 25,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    backgroundColor: '#FFD664',
  },
  options: {
    backgroundColor: '#2C3D50',
    flex: 29,
  },
  footer: {
    backgroundColor: '#2C3D50',
    flex: 75,
    alignSelf: 'stretch',
  },
  blue: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orange: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purple: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class PickOpponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
	return (
      <View style={[styles.container, styles.centered]}>
        <View style={[styles.header, styles.centered]}>
          <Text style={styles.title}>PICK YOUR VICTIM!</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={[styles.options, styles.centered]}>
            <Text style={styles.title}>OPTIONS</Text>
          </View>
        </View>
      </View>
	);
  }
}

module.exports = PickOpponent;
