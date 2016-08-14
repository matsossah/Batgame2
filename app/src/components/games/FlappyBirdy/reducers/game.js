import { TICK, BOUNCE, START, STARTAGAIN, RUNGROUNDALWAYS } from '../constants';

import { vmin, vmax, heightOfPipeUp,
        heightOfPipeDown, heightOfGround, heightOfInvisibleArea,
        positionOfPipeDown,
      } from '../services/viewport';


function getUpdatedVelocity(newPosition, bird, timeLapsed, gravity) {
  let updateVelocity = bird.velocity.y + timeLapsed * gravity;
  if (newPosition.y > 100) {
    updateVelocity = -(updateVelocity);
  }
  return { x: bird.velocity.x, y: updateVelocity };
}


function getUpdatedY(bird, timeLapsed, gravity) {
  const distanceCovered = bird.velocity.y * timeLapsed + 0.5 * gravity * timeLapsed * timeLapsed;
  return { x: bird.position.x, y: bird.position.y + distanceCovered };
}


function getUpdatedVelocityForPipe(pipe) {
  return { x: pipe.velocity.x, y: 0 };
}

function getUpdateDistanceForPipe(pipe, timeLapsed) {
  function getYPosition(pipeName) {
    if (pipeName === 'PipeUp') {
      return 0;
    } else if (pipeName === 'PipeDown') {
      return positionOfPipeDown;
    }
    return heightOfPipeUp;
  }

  const distanceCovered = pipe.velocity.x;

  if (pipe.position.x > 0 - pipe.dimension.width) {
    return { x: pipe.position.x + distanceCovered, y: pipe.position.y };
  }
  return { x: 100, y: getYPosition(pipe.name) };
}


function getUpdatedGroundPosition(ground) {
  const distanceCovered = ground.velocity.x;

  if (ground.position.x > - 97) {
    return { x: ground.position.x + distanceCovered, y: 80 };
  }
  return { x: 100, y: 80 };
}


function updateGroundPosition(gameObjects) {
  const arr = [];
  gameObjects.map((item) => {
    if (item.static === true && item.rigid === false) {
      const newGroundPosition = getUpdatedGroundPosition(item);
      const newGround = Object.assign({}, item, { position: newGroundPosition });
      arr.push(newGround);
    } else {
      arr.push(item);
    }
  });
  return arr;
}


function update(gameObjects, dt = 1000 / 60, gravity = 0.0001) {
  const arr = [];
  gameObjects.map((item) => {
    if (item.static === false) {
      const newPosition = getUpdatedY(item, dt, gravity);
      const updatedVelocity = getUpdatedVelocity(newPosition, item, dt, gravity);
      const newBird = Object.assign({}, item,
        { position: newPosition, velocity: updatedVelocity }
      );
      arr.push(newBird);
    } else if (item.static === true && item.rigid === true) {
      const newPositionOfPipe = getUpdateDistanceForPipe(item, dt);
      const updatedVelocity = getUpdatedVelocityForPipe(item);
      const newPipe = Object.assign({}, item,
        { position: newPositionOfPipe, velocity: updatedVelocity }
      );
      arr.push(newPipe);
    } else if (item.static === true && item.rigid === false) {
      const newGroundPosition = getUpdatedGroundPosition(item);
      const newGround = Object.assign({}, item, { position: newGroundPosition });
      arr.push(newGround);
    } else {
      arr.push(item);
    }
  });
  return arr;
}

function bounce(gameObjects) {
  const arr = [];
  const item = gameObjects[0];
  const bounceUpdatedVelocity = { x: item.velocity.x, y: -0.05 };
  const newBird = Object.assign({}, item, { velocity: bounceUpdatedVelocity });
  arr.push(newBird);
  return arr.concat(gameObjects.slice(1));
}


function detectCollition(bird, visibleObject) {
  const birdXPostion = bird.position.x * vmin;
  const birdYPostion = bird.position.y * vmax;
  const birdWidth = bird.dimension.width * vmin;
  const birdHeight = bird.dimension.height * vmax;

  const visibleObjectXPosition = visibleObject.position.x * vmin;
  const visibleObjectYPosition = visibleObject.position.y * vmax;
  const visibleObjectWidth = visibleObject.dimension.width * vmin;
  const visibleObjectHeight = visibleObject.dimension.height * vmax;

  if (birdXPostion < visibleObjectXPosition + visibleObjectWidth &&
    birdXPostion + birdWidth > visibleObjectXPosition &&
    birdYPostion < visibleObjectYPosition + visibleObjectHeight &&
    birdHeight + birdYPostion > visibleObjectYPosition) {
    return true;
  }
  return false;
}

function checkForCollition(gameObjects) {
  const bird = gameObjects[0];
  const pipeDown = gameObjects[2];
  const pipeUp = gameObjects[1];
  const pipeUpO = gameObjects[4];
  const pipeDownO = gameObjects[5];
  const ground = gameObjects[7];
  const groundO = gameObjects[8];

  if (detectCollition(bird, pipeDown)) {
    return true;
  }
  if (detectCollition(bird, pipeUp)) {
    return true;
  }
  if (detectCollition(bird, pipeUpO)) {
    return true;
  }
  if (detectCollition(bird, pipeDownO)) {
    return true;
  }
  if (detectCollition(bird, ground)) {
    return true;
  }
  if (detectCollition(bird, groundO)) {
    return true;
  }
  return false;
}


function checkForScoreUp(gameObjects, score, collidedArray) {
  let score2 = score;
  const bird = gameObjects[0];
  const invisible = gameObjects[3];
  const invisibleO = gameObjects[6];

  const birdXPostion = bird.position.x * vmin;
  const birdYPostion = bird.position.y * vmax;
  const birdWidth = bird.dimension.width * vmin;
  const birdHeight = bird.dimension.height * vmax;

  const invisibleXPosition = invisible.position.x * vmin;
  const invisibleYPosition = invisible.position.y * vmax;
  const invisibleWidth = invisible.dimension.width * vmin;
  const invisibleHeight = invisible.dimension.height * vmax;

  const invisibleOXPosition = invisibleO.position.x * vmin;
  const invisibleOYPosition = invisible.position.y * vmax;
  const invisibleOWidth = invisibleO.dimension.width * vmin;
  const invisibleOHeight = invisibleO.dimension.height * vmax;

  if (birdXPostion < invisibleXPosition + invisibleWidth &&
    birdXPostion + birdWidth > invisibleXPosition &&
    birdYPostion < invisibleYPosition + invisibleHeight &&
    birdHeight + birdYPostion > invisibleYPosition) {
    if (collidedArray.length === 0) {
      score2++;
    }
    return { score: score2, collidedArray: [invisible.name] };
  }

  if (birdXPostion < invisibleOXPosition + invisibleOWidth &&
    birdXPostion + birdWidth > invisibleOXPosition &&
    birdYPostion < invisibleOYPosition + invisibleOHeight &&
    birdHeight + birdYPostion > invisibleOYPosition) {
    if (collidedArray.length === 0) {
      score2++;
    }
    return { score: score2, collidedArray: [invisible.name] };
  }
  return { score: score2, collidedArray: [] };
}


const startAgainState = {
  game: {
    gravity: 0.0001,
    objects: [{
      name: 'bird',
      position: {
        x: 50,
        y: 55,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      dimension: {
        width: 10,
        height: 8,
      },
      rigid: true,
      static: false,
      invisible: false,
    },
      {
        name: 'PipeUp',
        position: {
          x: 110,
          y: 0,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfPipeUp,
        },
        rigid: true,
        static: true,
        invisible: false,
      },
      {
        name: 'PipeDown',
        position: {
          x: 110,
          y: positionOfPipeDown,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfPipeDown,
        },
        rigid: true,
        static: true,
        invisible: false,
      },
      {
        name: 'Invisible',
        position: {
          x: 110,
          y: heightOfPipeUp,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfInvisibleArea,
        },
        rigid: true,
        static: true,
        invisible: true,
      },
      {
        name: 'PipeUp',
        position: {
          x: 150,
          y: 0,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfPipeUp,
        },
        rigid: true,
        static: true,
        invisible: false,
      },
      {
        name: 'PipeDown',
        position: {
          x: 150,
          y: positionOfPipeDown,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfPipeDown,
        },
        rigid: true,
        static: true,
        invisible: false,
      },
      {
        name: 'Invisible',
        position: {
          x: 150,
          y: heightOfPipeUp,
        },
        velocity: {
          x: -0.9,
          y: 0,
        },
        dimension: {
          width: 15,
          height: heightOfInvisibleArea,
        },
        rigid: true,
        static: true,
        invisible: true,
      },
      {
        name: 'Ground',
        position: {
          x: 0,
          y: 80,
        },
        velocity: {
          x: -1,
          y: 0,
        },
        dimension: {
          width: 100,
          height: heightOfGround,
        },
        rigid: false,
        static: true,
        invisible: true,
      },
      {
        name: 'Ground',
        position: {
          x: 100,
          y: 80,
        },
        velocity: {
          x: -1,
          y: 0,
        },
        dimension: {
          width: 100,
          height: heightOfGround,
        },
        rigid: false,
        static: true,
        invisible: true,
      },
    ],
    score: 0,
    gameOver: false,
    collidedArray: [],
    start: true,
  },
};

const game = (state = {}, action) => {
  switch (action.type) {
    case TICK:
      return Object.assign({}, state,
        { objects: update(state.objects, action.dt, state.gravity),
          gameOver: checkForCollition(state.objects),
          score: checkForScoreUp(state.objects, state.score, state.collidedArray).score,
          collidedArray: checkForScoreUp(state.objects, state.score, state.collidedArray).collidedArray,
        });
    case BOUNCE:
      return Object.assign({}, state, { objects: bounce(state.objects) });
    case START:
      return Object.assign({}, state, { start: true });
    case STARTAGAIN:
      return startAgainState.game;
    case RUNGROUNDALWAYS:
      return Object.assign({}, state, { objects: updateGroundPosition(state.objects) });
    default :
      return state;
  }
};

export default game;
