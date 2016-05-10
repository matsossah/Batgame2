import React, {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import TabButton from './tabButton';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sections: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  activeTab: {
    color: 'white',
  },
});

class Tabs extends React.Component {
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
  tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    tabRender: React.PropTypes.func.isRequired,
    underlayColor: React.PropTypes.string.isRequired,
  })).isRequired,
};

module.exports = Tabs;
