import React from 'react';
import {View, TouchableOpacity, ToastAndroid, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'
import {H, W} from '../../utils/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  storeEmployees,
  employeeCount,
  favouriteCount,
} from '../../store/actions/employees';

class EmployeeHomeBase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isLoad: false,
      isDrawer: false,
      favourite: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getEmployees();
  }

  // Function to fetch the employee list
  getEmployees = async () => {
    await AsyncStorage.getItem('empData').then(emp => {
      if (emp) {
        const empData = JSON.parse(emp);
        const {empList} = empData;
        this.props.dispatch(storeEmployees(empList));
        this.props.dispatch(employeeCount(empList.length));
      } else {
        Alert.alert('Error', 'No Record Found');
      }
    });
  };

  // Function to redirect
  redirectToEmpForm = () => {
    this.props.navigation.navigate('CreateEmployee');
  };

  // Function to sort the list
  sortEmpData = param => {
    const sortedData = this.props.employees;
    sortedData.sort((a, b) =>
      a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0,
    );
    this.props.dispatch(storeEmployees(sortedData));
    ToastAndroid.show('Sorting done!!!', ToastAndroid.SHORT);
  };

  // Function will mark and unmark the faourite
  markFavourite = item => {
    console.log('favourue called', item, this.state.favourite);

    const {favourite} = this.state;
    let index = favourite.indexOf(item.id);
    if (index >= 0) {
      favourite.splice(index, 1); //to delete the item
    } else {
      favourite.push(item.id);
    }
    this.props.dispatch(favouriteCount(favourite.length));
    this.setState({favourite: favourite, refreshing: !this.state.refreshing});
  };

  // Function to render the list item
  renderList = data => {
    console.log('List render', data, this.state.favourite);
    return (
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {data.item.firstName[0].toUpperCase()}{' '}
              {data.item.lastName[0].toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.empDetailContainer}>
          <Text style={styles.empDetailText}>
            {data.item.firstName} {data.item.lastName}
          </Text>
          <Text style={[styles.empDetailText]}>{data.item.jobTitle}</Text>
        </View>
        <View style={{flex: 1}}>
          {this.state.favourite.length &&
          this.state.favourite.indexOf(data.item.id) >= 0 ? (
            <TouchableOpacity
              onPress={() => this.markFavourite(data.item)}
              style={{
                // height: 20,
                // width: 20,
                // borderRadius: 20 / 2,
                // backgroundColor: 'red',
              }}><Icon name="star" size={30} color="#fee12b"/></TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.markFavourite(data.item)}
              style={{
                // height: 20,
                // width: 20,
                // borderRadius: 20 / 2,
                // backgroundColor: 'yellow',
              }}><Icon name="star-o" size={30} color="#000"/></TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
}

export default EmployeeHomeBase;
