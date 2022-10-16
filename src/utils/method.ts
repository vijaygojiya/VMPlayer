import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager } from 'react-native-fbsdk-next';
// import authService from '../FSFirebase/auth';

const Method = {
  savePref: (key: string, value: any) => {
    AsyncStorage.setItem(key, JSON.stringify(value), _err => {});
  },
  saveStringPref: (key: string, value: string) => {
    AsyncStorage.setItem(key, value, _err => {});
  },

  removePref: (key: string) => {
    AsyncStorage.removeItem(key);
  },

  startWithReset: (
    navigation: {dispatch: (arg0: CommonActions.Action) => void},
    screenName: any,
  ) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName}],
      }),
    );
  },
  getPref: (key: string) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (_err, result) => {
        if (result) {
          resolve(JSON.parse(result));
        } else {
          reject(false);
        }
      });
    });
  },

  getStringPref: (key: string) => {
    return new Promise((resolve, _reject) => {
      AsyncStorage.getItem(key, (_err, result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(null);
        }
      });
    });
  },

  removeNonNumber: (string = '') => string.replace(/[^\d]/g, ''),

  getDurationTime: (duration: any) => {
    const padTimeValueString = (value: any) =>
      value.toString().padStart(2, '0');

    if (!Number.isFinite(duration)) return '';
    let seconds = Math.floor(duration % 60),
      minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);

    const isHrsZero = hours === 0;
    hours = isHrsZero ? 0 : padTimeValueString(hours);
    minutes = padTimeValueString(minutes);
    seconds = padTimeValueString(seconds);

    if (isHrsZero) {
      return minutes + ':' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
  },
};

export default Method;
