import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import drawerIcon from '../../assets/drawerIcon.png';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9900',
    borderBottomColor: '#f1f1f1',
    elevation: 10,
  },
  subContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.15,
  },
  headingView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.7,
  },
  headingText: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default class Appheader extends React.PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {heading} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => this.props.openEmpform()}>
          <Image source={drawerIcon} style={{height: 25, width: 25}} />
        </TouchableOpacity>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>{heading}</Text>
        </View>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => {
            this.props.sortEmpData();
          }}>
          <View>
            <Menu>
              <MenuTrigger>
                <Text>Sort</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => this.props.sortEmpData('firstName')}
                  text="Sort By First Name"
                />
                <MenuOption
                  onSelect={() => this.props.sortEmpData('lastName')}
                  text="Sort By Last Name"
                />
              </MenuOptions>
            </Menu>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
