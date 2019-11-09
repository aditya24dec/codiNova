import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Text,
  StyleSheet,
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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
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
    width: W * 0.18,
    height: W * 0.18,
    borderRadius: (W * 0.18) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: H * 0.035,
    color: '#fff',
    fontWeight: 'bold',
  },
  empDetailContainer: {
    flex: 4,
    padding:H * 0.01
  },
  empDetailText:{
    fontSize:H * 0.018,
    color:'#000',
    fontWeight:'bold'
  }
});

class EmployeeHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isLoad: false,
    };
  }

  componentDidMount() {
    this.getEmployees();
  }

  // Function to fetch the employee list
  getEmployees = () => {};

  renderList = data => {
    return (
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
        </View>
        <View style={styles.empDetailContainer}>
          <Text style={styles.empDetailText}>Aditya Kumar</Text>
          <Text style={[styles.empDetailText,{color:"#h2f2h2"}]} >Developer</Text>
        </View>
        <View style={{flex: 1,}}>
          {/* <Icon name='person-outline' type="MaterialIcons" /> */}
          <FontAwesome name='star' size={20} />
        </View>
      </View>
    );
  };

  render() {
    // const { employees } = this.props;
    const employees = [
      {employee_name: 'aditya', employee_age: '23', employee_salary: '60000'},
    ];
    console.log('employees in home ', employees);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AppHeader heading={'Home'} />
        </View>
        <View style={styles.mainView}>
            <View style={{height: H * 0.03}} />
            {employees.length ? (
              <FlatList
                data={employees}
                renderItem={this.renderList}
                keyExtractor={item => item.id}
              />
            ) : (
              <SkypeIndicator color="#0076c0" />
            )}
        </View>
        <LoadingImage isLoad={this.state.isLoad} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees.totalEmployees,
});

export default connect(mapStateToProps)(EmployeeHome);
