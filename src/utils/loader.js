import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Modal
} from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';


export class LoadingImage extends Component {

    render() {
        let isLoad = this.props.isLoad;
        return (
            <Modal
            animationType={"fade"}
            transparent={true}
            visible={isLoad}
            onRequestClose={() => {}}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'black', opacity: 0.7}} />
                    <SkypeIndicator color='#0076c0' />
                </View>
            </Modal>
        )
    }
}
