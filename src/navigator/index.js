import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import {
  View,
  StyleSheet
} from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import EmployeeHomeScreen from '../screens/employeeHome';
import launchScreen from '../screens/launchScreen';
import CreateEmployeeScreen from '../screens/createEmployee'
import SideDrawer from '../screens/drawer/index'
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
    CreateEmployee:{screen:CreateEmployeeScreen,navigationOptions}

  },
  {
    initialRouteName: 'launch'
  }
);

const AuthContainer = createAppContainer(AuthRoot);


const AppRoot = createDrawerNavigator(
  {
    launch: { screen: launchScreen, navigationOptions },
    EmployeeHome: { screen:EmployeeHomeScreen, navigationOptions },
    CreateEmployee:{screen:CreateEmployeeScreen,navigationOptions}
  },
  {
    initialRouteName: 'EmployeeHome',
    contentComponent : SideDrawer
  }
);

const AppContainer = createAppContainer(AppRoot);


class Source extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEmpExist: true,
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
    const { loading,isEmpExist} = this.state;
    if (loading) {
      return (
        <View style={styles.container} >
          <SkypeIndicator color='#0076c0' />
        </View>
      )
    } else {
      return (
        <View style={styles.container} >
          {isEmpExist ? <AppContainer  /> : <AuthContainer />}
          
        </View>
      )
    }
  }
}

export default connect()(Source);

