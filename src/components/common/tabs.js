import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'chalkduster',
  },
  sections: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  activeTab: {
    color: 'red',
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
            <TouchableHighlight underlayColor={"none"} onPress={this.onTabToggle.bind(this, idx)} key={idx}>
              <Text style={[
                styles.label,
                this.state.activeTabIndex === idx && styles.activeTab,
              ]}>
                {tab.title}
              </Text>
            </TouchableHighlight>
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
  })).isRequired,
};

module.exports = Tabs;
