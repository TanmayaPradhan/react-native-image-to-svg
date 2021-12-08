import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  AnimatedSvgComponent,
  ConvertImageToSvg,
} from 'react-native-image-to-svg';
import panda from './panda.jpeg';
import {launchImageLibrary} from 'react-native-image-picker';

const Main = () => {
  const [svgObj, setSvgObj] = useState({svgPath: '', svgViewBox: ''});
  const convertImageToSvg = ConvertImageToSvg();

  const func_localFileImage = async () => {
    const imageUri = Image.resolveAssetSource(panda).uri;
    try {
      const svgResp = await convertImageToSvg.func_convertImgToSVG(imageUri);
      setSvgObj({svgPath: svgResp.path, svgViewBox: svgResp.viewBox});
    } catch (err) {
      console.error(err);
    }
  };

  const func_openImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}).then(async response => {
      if (response.didCancel) {
        console.log('canceled');
      } else if (response.errorCode) {
        console.log('error');
      } else {
        const [img] = response.assets;
        const svgResp = await convertImageToSvg.func_convertImgToSVG(img.uri);
        setSvgObj({svgPath: svgResp.path, svgViewBox: svgResp.viewBox});
      }
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.svgContainer}>
          <AnimatedSvgComponent
            path={svgObj.svgPath}
            viewBox={svgObj.svgViewBox}
            strokeWidth={2}
            fillColor={'#000'}
            stokeColor={'red'}
            animation={true}
            loop={true}
          />
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity onPress={func_openImagePicker} style={styles.button}>
          <Text style={styles.text}>Image Picker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={func_localFileImage} style={styles.button}>
          <Text style={styles.text}>Local File Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svgContainer: {
    height: 400,
    backgroundColor: '#ccc',
  },
  spacer: {
    flex: 1,
  },
  button: {
    height: 40,
    backgroundColor: '#009866',
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Main;
