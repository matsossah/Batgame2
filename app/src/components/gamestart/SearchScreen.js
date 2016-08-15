import React, { Component, PropTypes } from 'react';
import { Alert, Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { joinMatchAgainst } from '../../actions/application';
import { popModals } from '../../actions/navigation';

import Template from '../common/Template';
import Title from '../common/Title';
import I18n from '../../config/i18n';
import Fabric from 'react-native-fabric';

const { Answers } = Fabric;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  topFooter: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomFooter: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  backButton: {
    width: 100,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#34485E',
  },
  backBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  titleBox: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  back: {
    fontSize: 50,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: '#FFD664',
  },
  searchBar: {
    paddingLeft: 30,
    alignSelf: 'stretch',
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
    this.onSubmit = this.onSubmit.bind(this);
  }
  onBackPress() {
    Answers.logCustom('userSearch Back');
    this.props.dispatch(popModals());
  }
  onSubmit() {
    this.props.dispatch(joinMatchAgainst(this.state.searchText.toLowerCase()))
      .catch(() => {
        Answers.logCustom('Username unknown');
        Alert.alert(I18n.t('unknownUser'));
      });
    Answers.logCustom('Username found');
  }
  setSearchText(event) {
    const searchText = event.nativeEvent.text;
    this.setState({ searchText });
  }
  render() {
    return (
      <Template
        header={
          <TouchableHighlight
            onPress={this.onBackPress}
            underlayColor="transparent"
            style={styles.header}
          >
            <View style={styles.header}>
              <View style={styles.backBox}>
                <View style={styles.backButton}>
                  <Text style={styles.back}>{'<'}</Text>
                </View>
              </View>
              <View style={styles.titleBox}>
                <Title>
                  {I18n.t('search')}
                </Title>
              </View>
            </View>
          </TouchableHighlight>
        }
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
                onSubmitEditing={this.onSubmit}
                returnKeyType="done"
              />
            </View>
            <View style={styles.bottomFooter} />
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
