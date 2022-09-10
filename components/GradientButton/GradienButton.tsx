import * as React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IGradientButtonProps {
  onPress?: () => void;
  style?: ViewStyle
}

const GradientButton: React.FunctionComponent<IGradientButtonProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress ?? (() => null)} testID={'gradientButtonPress'}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#E02590', '#863BD4']} style={styles.gradient}>
        { children }
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});

export default GradientButton;
