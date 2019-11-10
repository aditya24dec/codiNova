import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import {H, W} from '../../utils/dimensions';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
  },
  container: {
    height: H * 0.02,
    padding: H * 0.025,
  },
});

class SideDrawer extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text>Total Employees : {this.props.employeeCount} </Text>
        </View>
        <View style={styles.container}>
          <Text>Total Favourite : {this.props.favouriteCount}</Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  employeeCount: state.employees.employeeCount,
  favouriteCount: state.employees.favouriteCount,
});

export default connect(mapStateToProps)(SideDrawer);
