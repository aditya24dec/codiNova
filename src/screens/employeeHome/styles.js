
import {H, W} from '../../utils/dimensions';
import {StyleSheet} from 'react-native';


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

  export default styles