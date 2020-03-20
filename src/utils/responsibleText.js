import {Platform, StatusBar, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset = width > height ? 0 : StatusBar.currentHeight;

const deviceHeight =
  Platform.OS === 'android' ? standardLength - offset : standardLength;

export function RFPercentage(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
