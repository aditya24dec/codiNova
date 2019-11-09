import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { H, W } from '../utils/dimensions';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    height: H * 0.065,
    // width: W * 0.9,
    width: '100%',
    borderRadius: 5,
    borderColor: "#ff9900",
    backgroundColor: '#ff9900',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: H * 0.02
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700'
  }
})


export const SubmitButton = (props) => {
  const { buttonText, buttonFunction } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { buttonFunction ? buttonFunction() : console.warn("No function is Assigned here !!") }}
    >
      <Text style={styles.buttonText} >{buttonText}</Text>
    </TouchableOpacity>
  )
}