import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header: React.FunctionComponent = () => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#E02590', '#863BD4']} style={styles.header}>
      <Image style={styles.headerLogo} source={require('../../assets/images/paidy-white.png')} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    paddingTop: 20,
    borderBottomLeftRadius: 30
  },
  headerLogo: {
    width: 150,
    height: 45
  },
});

export default Header;
