import React from 'react';
import {
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {H, W} from '../../utils/dimensions';
import {SubmitButton} from '../../components/button';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import {employeeCount, storeEmployees} from '../../store/actions/employees';
import {connect} from 'react-redux';
import {LoadingImage} from '../../utils/loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: H * 0.1
  },
  formView: {
    height: H * 0.7,
    width: W,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    height: H * 0.09,
    width: W * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: H * 0.028,
    color: '#ff9900',
    fontWeight: 'bold',
  },

  formItemContainer: {
    height: H * 0.09,
    width: W * 0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: H * 0.02,
  },
  formFieldName: {
    color: '#151515',
    fontSize: H * 0.016,
    padding: H * 0.01,
    fontWeight: '700',
  },

  textInputContainer: {
    height: H * 0.06,
    width: '100%',
    // paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

class CreateEmployeeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      salary: '',
      isLoad: false,
    };

  }

  // Function to ad employee
  addEmployee = async () => {
    const {dispatch} = this.props;
    const {firstName, lastName, jobTitle, salary} = this.state;
    if (firstName != '' && lastName != '' && jobTitle != '' && salary != '') {
      this.setState({isLoad: true});

      const temp = {
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        salary: salary,
        id: firstName + lastName + new Date().getTime(),
      };

      AsyncStorage.getItem('empData')
        .then(async emp => {
          if (emp) {
            const empData = JSON.parse(emp);
            const newEmpData = {...empData};
            newEmpData.empList.push(temp);
            console.log('NEW DATA', newEmpData);
            await AsyncStorage.setItem('empData', JSON.stringify(newEmpData));
            this.setState({
              firstName: '',
              lastName: '',
              salary: '',
              jobTitle: '',
            });
            dispatch(storeEmployees(newEmpData.empList));
            dispatch(employeeCount(newEmpData.empList.length));

            ToastAndroid.show(
              'Employee detail has ben saved !!!',
              ToastAndroid.SHORT,
            );

            // this.props.navigation.navigate('EmployeeHome');

            // empList.unshift(temp);
          } else {
            const empData = {
              empList: [temp],
              isEmpExist: true,
            };

            await AsyncStorage.setItem('empData', JSON.stringify(empData));
            this.setState({
              firstName: '',
              lastName: '',
              salary: '',
              jobTitle: '',
            });
            dispatch(storeEmployees(empData.empList));
            dispatch(employeeCount(empData.empList.length));
            ToastAndroid.show(
              'Employee detail has ben saved !!!',
              ToastAndroid.SHORT,
            );
            // this.setState({isLoad: false});
          }
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'EmployeeHome' })],
          });
          this.props.navigation.dispatch(resetAction);
          this.setState({isLoad: false});


        })
        .catch(err => {
          console.log('error', err);
          this.setState({isLoad: false});
        });
    } else {
      Alert.alert('Error', 'Please fill all the fields');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.formView}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Enter Employee Details</Text>
          </View>
          <View style={styles.formItemContainer}>
            <Text style={styles.formFieldName}>First Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.firstName}
                underlineColorAndroid={'#ff9900'}
                style={styles.textInput}
                onChangeText={text => {
                  this.setState({firstName: text});
                }}
              />
            </View>
          </View>

          <View style={styles.formItemContainer}>
            <Text style={styles.formFieldName}>Last Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.lastName}
                underlineColorAndroid={'#ff9900'}
                style={styles.textInput}
                onChangeText={text => {
                  this.setState({lastName: text});
                }}
              />
            </View>
          </View>

          <View style={styles.formItemContainer}>
            <Text style={styles.formFieldName}>Job Title</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.jobTitle}
                underlineColorAndroid={'#ff9900'}
                style={styles.textInput}
                onChangeText={text => {
                  this.setState({jobTitle: text});
                }}
              />
            </View>
          </View>

          <View style={styles.formItemContainer}>
            <Text style={styles.formFieldName}>Salary</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.salary}
                underlineColorAndroid={'#ff9900'}
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={text => {
                  this.setState({salary: text});
                }}
              />
            </View>
          </View>

          <View style={styles.formItemContainer}>
            <SubmitButton
              buttonText={'add'}
              buttonFunction={this.addEmployee}
            />
          </View>
        </KeyboardAvoidingView>
        <LoadingImage isLoad={this.state.isLoad} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  employees: state,
});
export default connect(mapStateToProps)(CreateEmployeeScreen);
