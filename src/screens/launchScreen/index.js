import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {SubmitButton} from '../../components/button';
import AsyncStorage from '@react-native-community/async-storage';
import {SkypeIndicator} from 'react-native-indicators';
import {H, W} from '../../utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: H,
    width: W,
    backgroundColor: '#ffffff',
  },
});

class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpExist: false,
      loading: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('empData').then(emp => {
      if (emp) {
        const empData = JSON.parse(emp);
        const {isEmpExist} = empData;
        if (isEmpExist) {
          this.setState({isEmpExist: true, loading: false});
          this.props.navigation.navigate('EmployeeHome');
        } else {
          this.setState({loading: false});
        }
      } else {
        this.setState({loading: false});
      }
    });
  }

  render() {
    const {isEmpExist, loading} = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <SkypeIndicator color="#ff9900" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: Dimensions.get('window').width * 0.06,
          }}>
          <SubmitButton buttonText={'Add Employee'} buttonFunction={()=>this.props.navigation.navigate('CreateEmployee')}/>
        </View>
      );
    }
  }
}

export default LaunchScreen;
