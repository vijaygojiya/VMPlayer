import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';
import GS from '../../../utils/styles';

const styles = StyleSheet.create({
  saContainer: {
    paddingVertical: styleConfig.smartScale(10),
    backgroundColor: colors.blue,
    paddingBottom: styleConfig.smartScale(15),
    ...GS.shadowEffect,
  },
  vToolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pIconContainer: {
    marginHorizontal: styleConfig.smartWidthScale(18),
    justifyContent: 'center',
  },
  iBack: {
    width: styleConfig.countPixelRatio(25),
    height: styleConfig.countPixelRatio(25),
    resizeMode: 'contain',
  },
  tTitle: {
    flex: 1,
    fontSize: styleConfig.countPixelRatio(22),
    textAlign: 'left',
  },
  iconStyle: {
    width: styleConfig.countPixelRatio(25),
    height: styleConfig.countPixelRatio(25),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});

export default styles;
