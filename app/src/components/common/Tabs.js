import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import TabButton from './TabButton';

const styles = StyleSheet.create({
  sections: {
    flexDirection: 'row',
    marginTop: 55,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  activeTab: {
    color: 'white',
  },
});

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
    this.onTabToggle = this.onTabToggle.bind(this);
  }
  onTabToggle(idx) {
    this.setState({
      activeTabIndex: idx,
    });
  }
  render() {
    const activeTab = this.props.tabs[this.state.activeTabIndex];
    return (
      <View style={styles.container}>
        <View style={[styles.sections]}>
          {this.props.tabs.map((tab, idx) =>
            <TabButton
              key={idx}
              tabId={idx}
              tab={tab}
              isActive={idx === this.state.activeTabIndex}
              onPress={this.onTabToggle}
            />
          )}
        </View>
        <View style={styles.tabContent}>
          {activeTab.tabRender()}
        </View>
      </View>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    tabRender: PropTypes.func.isRequired,
    underlayColor: PropTypes.string.isRequired,
  })).isRequired,
};

export default Tabs;
