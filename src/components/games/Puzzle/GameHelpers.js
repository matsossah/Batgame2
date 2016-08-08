import _ from 'lodash';


const GameHelpers = {
  getOrderedIndexesWithoutEmpty: (size) => _.range(1, size * size),

  getOrderedIndexes: (size) => GameHelpers.getOrderedIndexesWithoutEmpty(size).concat([null]),

  getMatrixFromIndxes: (indexes, size) => _.chunk(indexes, size),

  getIndexesFromMatrix: (indexes) => _.flatten(indexes),

  isWon: (indexes, size) => _.isEqual(indexes, GameHelpers.getOrderedIndexes(size)),

  sumInversions(indexes) {
    let inv = 0;
    for (let i = 0; i < indexes.length - 1; i++) {
      for (let j = i + 1; j < indexes.length; j++) {
        if (indexes[i] > indexes[j]) {
          inv++;
        }
      }
    }
    return inv;
  },

  getShuffledIndexes(size) {
    let shuffledIndexes;
    do {
      shuffledIndexes = _.shuffle(GameHelpers.getOrderedIndexesWithoutEmpty(size)).concat([null]);
    } while (!(this.sumInversions(shuffledIndexes) % 2));
    return shuffledIndexes;
  },
};

module.exports = GameHelpers;
