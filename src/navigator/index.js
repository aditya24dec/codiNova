import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation'
import {
  View,
  StyleSheet
} from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import EmployeeHomeScreen from '../screens/employeeHome';
import launchScreen from '../screens/launchScreen';
import { connect } from "react-redux";
import {H ,W} from "../utils/dimensions"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: H,
    width: W,
    backgroundColor: '#ffffff'
  }
})

const navigationOptions = { header: null };

const AuthRoot = createStackNavigator(
  {
    launch: { screen: launchScreen, navigationOptions },
  },
  {
    initialRouteName: 'launch'
  }
);

const AuthContainer = createAppContainer(AuthRoot);


const AppRoot = createStackNavigator(
  {
    EmployeeHome: { screen: EmployeeHomeScreen, navigationOptions },
  },
  {
    initialRouteName: 'EmployeeHome'
  }
);

const AppContainer = createAppContainer(AppRoot);

class Source extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEmpExist: false,
      loading: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('empData').then((emp) => {
      if (emp) {
        const empData = JSON.parse(emp);
        const { isEmpExist } = empData;
        if (isEmpExist) {
          this.setState({ isEmpExist: true, loading: false });
        } else {
          this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { loading} = this.state;
    if (loading) {
      return (
        <View style={styles.container} >
          <SkypeIndicator color='#0076c0' />
        </View>
      )
    } else {
      return (
        <View style={styles.container} >
          <AppContainer  />
        </View>
      )
    }
  }
}

export default connect()(Source);

