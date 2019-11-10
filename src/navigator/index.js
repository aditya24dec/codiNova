import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {View, StyleSheet} from 'react-native';
import EmployeeHomeScreen from '../screens/employeeHome';
import launchScreen from '../screens/launchScreen';
import CreateEmployeeScreen from '../screens/createEmployee';
import SideDrawer from '../screens/drawer/index';
import {connect} from 'react-redux';
import {H, W} from '../utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: H,
    width: W,
    backgroundColor: '#ffffff',
  },
});

const navigationOptions = {header: null};

const home = createStackNavigator(
  {
    launch: {screen: launchScreen, navigationOptions},
    EmployeeHome: {screen: EmployeeHomeScreen, navigationOptions},
    CreateEmployee: {screen: CreateEmployeeScreen, navigationOptions},
  },{
    initialRouteName:'launch'
  }
)

const AppRoot = createDrawerNavigator(
  {
    home: {screen: home, navigationOptions},
  },
  {
    initialRouteName: 'home',
    contentComponent: SideDrawer,
  },
);

const AppContainer = createAppContainer(AppRoot);

class Source extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

export default connect()(Source);
