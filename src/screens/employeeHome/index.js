import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Text,
  StyleSheet,
  findNodeHandle,
  UIManager,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {H, W} from '../../utils/dimensions';
import AppHeader from '../../components/appHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {LoadingImage} from '../../utils/loader';
// import  Icon from 'react-native-vector-icons/'
import {storeEmployees,employeeCount,favouriteCount} from '../../store/actions/employees';
import FAB from 'react-native-fab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    height: H * 0.1,
  },
  mainView: {
    height: H * 0.9,
    width: W,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ddd',
    // paddingHorizontal: W * 0.05,
    // paddingTop: H * 0.03
  },
  item: {
    height: H * 0.13,
    width: W * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: W * 0.02,
    borderColor: '#ddd',
    borderWidth: 2,
    margin: W * 0.01,
    paddingHorizontal: W * 0.05,
    paddingVertical: W * 0.008,
  },

  itemText: {
    fontSize: 15,
    color: '#48494B',
    fontWeight: '700',
  },

  avatarContainer: {
    flex: 2,
    padding: W * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#ff9900',
    width: W * 0.16,
    height: W * 0.16,
    borderRadius: (W * 0.16) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: H * 0.025,
    color: '#fff',
    fontWeight: 'bold',
  },
  empDetailContainer: {
    flex: 4,
    padding: H * 0.01,
  },
  empDetailText: {
    fontSize: H * 0.018,
    color: '#000',
    fontWeight: 'bold',
  },
});

class EmployeeHome extends React.PureComponent {
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
    ToastAndroid.show('Sorting done!!!1', ToastAndroid.SHORT);
  };



  // Function to sort the list
  sortEmpData = param => {
    const sortedData = this.props.employees;
    sortedData.sort((a, b) =>
      a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0,
    );
    this.props.dispatch(storeEmployees(sortedData));
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
    this.props.dispatch(favouriteCount(favourite.length))
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
                height: 20,
                width: 20,
                borderRadius: 20 / 2,
                backgroundColor: 'red',
              }}></TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.markFavourite(data.item)}
              style={{
                height: 20,
                width: 20,
                borderRadius: 20 / 2,
                backgroundColor: 'yellow',
              }}></TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  render() {
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
              this.props.navigation.openDrawer()
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
              // onRefresh={this.handleRefresh}
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
  }
}

const mapStateToProps = state => ({
  employees: state.employees.totalEmployees,
});

export default connect(mapStateToProps)(EmployeeHome);
