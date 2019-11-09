import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';

import { SubmitButton } from '../../components/button'

class LaunchScreen extends React.Component {

  render() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingHorizontal:Dimensions.get('window').width * 0.06 }}>
               <SubmitButton buttonText={'Add Employee'} />
           </View>
  }
}

export default LaunchScreen;