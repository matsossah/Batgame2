import React, {
  Component,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  activeTab: {
    color: 'white',
  },
  label: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'chalkduster',
  },
});

class TabButton extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.tabId);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onPress} underlayColor={this.props.tab.underlayColor}>
        <Text
          style={[
            styles.label,
            this.props.isActive && styles.activeTab,
          ]}
        >
          {this.props.tab.title}
        </Text>
      </TouchableHighlight>
    );
  }
}

TabButton.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  onPress: React.PropTypes.func.isRequired,
  tabId: React.PropTypes.number.isRequired,
  tab: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    tabRender: React.PropTypes.func.isRequired,
    underlayColor: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = TabButton;
