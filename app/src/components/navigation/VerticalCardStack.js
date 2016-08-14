import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, NavigationExperimental } from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

const { Transitioner, Card } = NavigationExperimental;

const {
  CardStackPanResponder,
  CardStackStyleInterpolator,
} = Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class VerticalCardStack extends Component {
  constructor() {
    super();

    this.renderScenes = this.renderScenes.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderScenes(props) {
    const scenes = props.scenes.map(
      scene => this.renderScene({
        ...props,
        scene,
      })
    );

    return (
      <View style={styles.container}>
        {scenes}
      </View>
    );
  }

  renderScene(props) {
    const style = CardStackStyleInterpolator.forVertical(props);
    const panHandlersProps = {
      ...props,
      onNavigateBack: this.props.onNavigateBack,
    };
    const panHandlers = this.props.canNavigateBack ?
      CardStackPanResponder.forVertical(panHandlersProps) :
      null;

    return (
      <Card
        {...props}
        key={`card_${props.scene.key}`}
        panHandlers={panHandlers}
        renderScene={this.props.renderScene}
        style={style}
      />
    );
  }

  render() {
    return (
      <Transitioner
        navigationState={this.props.navigationState}
        render={this.renderScenes}
      />
    );
  }
}

VerticalCardStack.propTypes = {
  navigationState: PropTypes.object.isRequired,
  onNavigateBack: PropTypes.func,
  canNavigateBack: PropTypes.bool.isRequired,
  renderScene: PropTypes.func.isRequired,
};


export default VerticalCardStack;
