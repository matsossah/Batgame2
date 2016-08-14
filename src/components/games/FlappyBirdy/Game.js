import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { vw, vh, vmin, vmax } from './services/viewport';

import Bird from "./components/Bird";
import PipeUp from "./components/PipeUp";
import PipeDown from "./components/PipeDown";
import GameOver from "./components/GameOver";
import Score from "./components/Score";
import Invisible from "./components/Invisible";
import Ground from "./components/Ground";
import Start from "./components/Start";
import StartAgain from "./components/StartAgain";

let time = new Date();
const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#34485E',
    width: null,
  },
});

const timeLapsed = 1000 / 60;

class Game extends Component {
  constructor() {
    super();
    this.gravity = 0.0001;
    this.state = { rotation: 0 };

    this.clickMeToBounce = this.clickMeToBounce.bind(this);
    this.startFlappyBird = this.startFlappyBird.bind(this);
    this.startFlappyBirdAgain = this.startFlappyBirdAgain.bind(this);
    this.update = this.update.bind(this);
    this.updateGround = this.updateGround.bind(this);
  }

  componentDidMount() {
    this.updateGroundInterval = setInterval(this.updateGround, timeLapsed);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.bird.position.y < nextProps.bird.position.y) {
      this.setState({ rotation: 30 });
    } else if (this.props.bird.position.y > nextProps.bird.position.y) {
      this.setState({ rotation: -30 });
    }

    if (nextProps.gameOver) {
      clearInterval(this.intervalId);
    }
  }


  updateGround() {
    this.props.updateGround();
  }

  update() {
    const timediff = new Date() - time;
    time = new Date();
    console.log('Inside Update', timediff);
    this.props.tick(timediff);
    requestAnimationFrame(this.update);
  }


  startFlappyBird() {
    this.props.startGame();
    clearInterval(this.updateGroundInterval);

    requestAnimationFrame(this.update);
    this.intervalId = setInterval(this.update, timeLapsed);
  }


  startFlappyBirdAgain() {
    this.props.startGameAgain();
    this.intervalId = setInterval(this.update, timeLapsed);
  }


  clickMeToBounce() {
    this.props.bounce();
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.clickMeToBounce} style={styles.backGround}>
        <View
          style={styles.backGround}
        >
          <View style={{ position: 'absolute', top: 0, left: 0 }}>
            {!this.props.start ? <Start onStart={this.startFlappyBird} /> : <Text />}
            {this.props.gameOver ? <GameOver /> : <Text />}

            <PipeUp
              x={this.props.pipeUp.position.x * vmin}
              y={this.props.pipeUp.position.y}
              height={this.props.pipeUp.dimension.height}
              width={this.props.pipeUp.dimension.width}
            />

            <PipeUp
              x={this.props.pipeUpO.position.x * vmin}
              y={this.props.pipeUpO.position.y}
              height={this.props.pipeUpO.dimension.height}
              width={this.props.pipeUpO.dimension.width}
            />

            <Ground
              x={this.props.ground.position.x * vmin}
              y={this.props.ground.position.y}
              height={this.props.ground.dimension.height}
              width={this.props.ground.dimension.width}
            />

            <Ground
              x={this.props.groundO.position.x * vmin}
              y={this.props.groundO.position.y}
              height={this.props.groundO.dimension.height}
              width={this.props.groundO.dimension.width}
            />

            <Invisible
              x={this.props.invisible.position.x * vmin}
              y={this.props.invisible.position.y}
              height={this.props.invisible.dimension.height}
              width={this.props.invisible.dimension.width}
            />

            <Invisible
              x={this.props.invisibleO.position.x * vmin}
              y={this.props.invisibleO.position.y}
              height={this.props.invisibleO.dimension.height}
              width={this.props.invisibleO.dimension.width}
            />

            <PipeDown
              x={this.props.pipeDown.position.x * vmin}
              y={this.props.pipeDown.position.y * vmax}
              height={this.props.pipeDown.dimension.height}
              width={this.props.pipeDown.dimension.width}
            />

            <PipeDown
              x={this.props.pipeDownO.position.x * vmin}
              y={this.props.pipeDownO.position.y * vmax}
              height={this.props.pipeDownO.dimension.height}
              width={this.props.pipeDownO.dimension.width}
            />

            <Bird
              x={this.props.bird.position.x * vw}
              y={this.props.bird.position.y * vh}
              rotation={this.state.rotation}
              animate={this.state.animate}
              height={this.props.bird.dimension.height}
              width={this.props.bird.dimension.width}
            />

            <Score score={this.props.score} />
              {(this.props.gameOver && this.props.start) ?
                <StartAgain onStartAgain={this.startFlappyBirdAgain} /> : <Text />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Game;
