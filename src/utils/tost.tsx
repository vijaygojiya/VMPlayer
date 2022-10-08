import Toast from 'react-native-simple-toast';

export const showToast = (msg: string) => {
  Toast.show(msg, Toast.SHORT, ['UIAlertController']);
};
