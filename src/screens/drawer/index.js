import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
  },
});

class SideDrawer extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <View style={styles.main}>
        <Text>Total Employees : {this.props.employeeCount} </Text>
        <Text>Total Favourite : {this.props.favouriteCount}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  employeeCount: state.employees.employeeCount,
  favouriteCount: state.employees.favouriteCount,
});

export default connect(mapStateToProps)(SideDrawer);
