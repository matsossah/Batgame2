import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 310,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    paddingTop: 30,
  },
  bottom: {
    flex: 2,
  },
  formSubmit: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'flex-start',
    fontSize: 14,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});
