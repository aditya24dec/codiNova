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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {H, W} from '../../utils/dimensions';
import {SubmitButton} from '../../components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: H * 0.1
  },
  formView: {
    height: H * 0.5,
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
  }

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
                underlineColorAndroid={'#ff9900'}
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={text => {
                  this.setState({salary: text});
                }}
              />
            </View>
          </View>

          <View style={styles.formItemContainer}>
            <SubmitButton buttonText={'add'} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default CreateEmployeeScreen;
