import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

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
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  tabId: PropTypes.number.isRequired,
  tab: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tabRender: PropTypes.func.isRequired,
    underlayColor: PropTypes.string.isRequired,
  }).isRequired,
};

export default TabButton;
