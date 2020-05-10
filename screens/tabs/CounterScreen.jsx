/* eslint-disable react/prop-types */
// Imports: Dependencies
import React from 'react';
import {
  Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';

// Screen: Counter
// eslint-disable-next-line react/prefer-stateless-function
class CounterScreen extends React.Component {
  render() {
    const {
      loggedIn,
      reduxLogin,
      reduxIncreaseCounter,
      counter,
      reduxDecreaseCounter,
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loggedInContainer}>
          <Text style={styles.loggedInText}>Logged In: </Text>
          <Text style={styles.loggedInText}>{`${loggedIn}`}</Text>
          <Button
            title="Login"
            onPress={loggedIn === false ? () => reduxLogin(true) : () => reduxLogin(false)}
            style={styles.loginButton}
          />
        </View>
        <Text style={styles.counterTitle}>Counter</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => reduxIncreaseCounter()}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{counter}</Text>
          <TouchableOpacity onPress={() => reduxDecreaseCounter()}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
// Redux Store --> Component
const mapStateToProps = (state) => ({
  counter: state.counterReducer.counter,
  loggedIn: state.authReducer.loggedIn,
});
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The
// Data And Assign It To Your Props)
// Action
const mapDispatchToProps = (dispatch) => ({
  // Increase Counter
  reduxIncreaseCounter: () => dispatch(increaseCounter()),
  // Decrease Counter
  reduxDecreaseCounter: () => dispatch(decreaseCounter()),
  // Login
  reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
});

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 20,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInText: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
  },
  counterTitle: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  counterText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400',
    color: '#000',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 40,
    marginRight: 40,
  },
});

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(CounterScreen);
