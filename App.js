import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import AppSource from './src/navigator';
import { Provider } from 'react-redux';
import store from "./src/store";
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider style={{ flex: 1, }} store={store} >
        <SafeAreaView style={{ flex: 1 }}>
          <MenuProvider>

          <AppSource />
          </MenuProvider>
        </SafeAreaView>
      </Provider>
    );
  }
};