import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import AppHeader from '../../components/appHeader';
import {SkypeIndicator} from 'react-native-indicators';
import {LoadingImage} from '../../utils/loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import FAB from 'react-native-fab';
import styles from './styles';
import {H, W} from '../../utils/dimensions';


const EmployeeHomeRender = function() {
  const {employees} = this.props;
  console.log('this.props', this.props);
  console.log('This state', this.state);
  const {favourite} = this.state;
  // const employees = [
  //   {employee_name: 'aditya', employee_age: '23', employee_salary: '60000',id:'865858586586'},
  // ];
  console.log('employees in home ', employees);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppHeader
          heading={'Home'}
          openEmpform={() => {
            // this.drawer.openDrawer();
            this.props.navigation.openDrawer();
          }}
          sortEmpData={this.sortEmpData}
        />
      </View>
      <View style={styles.mainView}>
        <View style={{height: H * 0.03}} />
        {employees.length ? (
          <FlatList
            data={this.props.employees}
            renderItem={this.renderList}
            refreshing={this.state.refreshing}
            extraData={this.state.refreshing}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        ) : (
          <SkypeIndicator color="#0076c0" />
        )}
      </View>
      <LoadingImage isLoad={this.state.isLoad} />

      <FAB
        buttonColor="#ff9900"
        iconTextColor="#FFFFFF"
        onClickAction={() => this.redirectToEmpForm()}
        visible={true}
      />
    </View>
  );
};

export default EmployeeHomeRender;
