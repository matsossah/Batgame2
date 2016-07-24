import React, { Component, PropTypes } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { popModals } from '../../actions/navigation';

import Template from '../common/Template';
import Title from '../common/Title';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  middleFooter: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bottomFooter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3D50',
  },
  backBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  back: {
    fontSize: 50,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: '#FFD664',
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: 1,
    borderWidth: 9,
    borderColor: '#34485E',
    color: 'white',
    fontFamily: 'chalkduster',
  },
});

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.setSearchText = this.setSearchText.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }
  onBackPress() {
    this.props.dispatch(popModals());
  }
  setSearchText(event) {
    const searchText = event.nativeEvent.text;
    this.setState({ searchText });
  }
  render() {
    return (
      <Template
        header={<Title>{I18n.t('search')}</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.topFooter}>
              <TextInput
                style={styles.searchBar}
                value={this.state.searchText}
                onChange={this.setSearchText}
                placeholder={I18n.t('startSearch')}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#34485E"
              />
            </View>
            <View style={styles.middleFooter} />
            <View style={styles.bottomFooter}>
              <View style={styles.backBox}>
                <TouchableHighlight
                  onPress={this.onBackPress}
                  underlayColor="transparent"
                >
                  <View style={styles.backButton}>
                    <Text style={styles.back}>{'<'}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        }
      />
    );
  }
}

SearchScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchScreen);
