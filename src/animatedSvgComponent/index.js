import React, {useState, useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {styles} from './styles';
import Svg, {G, Path} from 'react-native-svg';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedSvgComponent = ({
  path = '',
  viewBox = '',
  stokeColor = '#000',
  fillColor = 'transparent',
  strokeWidth = 4,
  duration = 2000,
  loop = false,
  backgroundColor = '#fff',
  animation = true,
}) => {
  const [pathLength, setPathLength1] = useState(0);

  const animatedPathLength = useRef(new Animated.Value(0)).current;

  const animatedPathOpacity = useRef(new Animated.Value(0)).current;

  const animatedPathRef = useRef(null);

  useEffect(() => {
    if (animation) {
      animatedPathLength.setValue(pathLength);
      loop
        ? Animated.loop(func_startLoopAnimation()).start()
        : func_singleAnimataion();
    } else {
      animatedPathLength.setValue(0);
      animatedPathOpacity.setValue(1);
    }
  });
  const func_startLoopAnimation = () => {
    return Animated.sequence([
      Animated.timing(animatedPathLength, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPathOpacity, {
        toValue: pathLength,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPathLength, {
        toValue: pathLength,
        useNativeDriver: true,
        duration: duration,
      }),
      Animated.timing(animatedPathOpacity, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
    ]);
  };

  const func_singleAnimataion = () => {
    return Animated.sequence([
      Animated.timing(animatedPathLength, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPathOpacity, {
        toValue: pathLength,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <AnimatedSvg
        viewBox={viewBox}
        height="100%"
        width="100%"
        style={{backgroundColor: backgroundColor}}>
        <G>
          <AnimatedPath
            fill={fillColor}
            fillOpacity={animatedPathOpacity}
            ref={animatedPathRef}
            strokeDasharray={pathLength}
            strokeDashoffset={animatedPathLength}
            onLayout={() =>
              setPathLength1(animatedPathRef?.current?.getTotalLength())
            }
            stroke={stokeColor}
            strokeWidth={strokeWidth}
            d={path}
            fillRule="evenodd"
          />
        </G>
      </AnimatedSvg>
    </View>
  );
};

export default AnimatedSvgComponent;
