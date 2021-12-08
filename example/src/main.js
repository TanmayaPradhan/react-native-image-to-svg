import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  AnimatedSvgComponent,
  ConvertImageToSvg,
} from 'react-native-image-to-svg';
import {launchImageLibrary} from 'react-native-image-picker';

import panda from './panda.jpeg';
const Main = () => {
  const [path, setPath] = useState('');
  const [viewBox, setViewBox] = useState('');
  const imageToSvgContext = ConvertImageToSvg();

  const func_openImagePicker = async () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      async response => {
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else {
          const [img] = response?.assets;
          let resp = await imageToSvgContext.func_convertImgToSVG(img?.uri);
          func_setImageResp(resp);
        }
      },
    );
  };
  const func_convertLocalImgToSVG = async () => {
    try {
      const imageUri = Image.resolveAssetSource(panda).uri;
      let resp = await imageToSvgContext.func_convertImgToSVG(imageUri);
      func_setImageResp(resp);
    } catch (err) {
      console.error(err);
    }
  };
  const func_setImageResp = svgResp => {
    setViewBox(svgResp?.viewBox);
    setPath(svgResp?.path);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.animationWrapper}>
        <AnimatedSvgComponent
          path={path}
          viewBox={viewBox}
          fillColor={'#000'}
          strokeWidth={5}
          stokeColor="#98D1DA"
          duration={4000}
          backgroundColor="#fff"
          animation={true}
        />
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity onPress={func_openImagePicker} style={styles.buttons}>
        <Text style={styles.text}>Image Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={func_convertLocalImgToSVG}
        style={styles.buttons}>
        <Text style={styles.text}>Local Image</Text>
      </TouchableOpacity>

      {/* {newSvg !== '' && <SvgXml xml={newSvg} width="100%" height="100%" />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animationWrapper: {height: 500},
  buttons: {
    marginHorizontal: 20,
    backgroundColor: '#027',
    height: 40,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Main;
