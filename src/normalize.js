import Parse from 'parse/react-native';
import isArray from 'lodash/isArray';

const normalizeObject = (obj, store) => {
  if (obj.className in store && obj.id in store[obj.className]) {
    return obj.id;
  }

  const normalizedObject = {};
  for (const propName of Object.getOwnPropertyNames(obj.attributes)) {
    let propValue = obj.attributes[propName];
    if (propValue instanceof Parse.Object) {
      propValue = normalizeObject(propValue, store);
    } else if (isArray(propValue)) {
      propValue = propValue.map(propItem => {
        if (propItem instanceof Parse.Object) {
          return normalizeObject(propItem, store);
        }
        return propItem;
      });
    }
    normalizedObject[propName] = propValue;
  }
  normalizedObject.id = obj.id;

  store[obj.className] = store[obj.className] || {};
  store[obj.className][obj.id] = normalizedObject;

  return obj.id;
};

export default objects => {
  const store = {};

  const ids = objects.map(obj => normalizeObject(obj, store));

  return { store, ids };
};
