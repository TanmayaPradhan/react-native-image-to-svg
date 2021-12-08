
# react-native-image-to-svg

## Installation

`npm install --save @potrace`
`npm install --save @react-native-svg`
`npm install --save react-native-image-to-svg`


## Features

- It converts image to svg and returns svg path
- svg image animation
- User can filter the notifications by clicking filter button.

![demo](https://user-images.githubusercontent.com/40633712/145273377-e9e8ae04-b292-408b-9f82-c5dc606e7242.gif)


### Declarative Usage
```ruby
    import {Image} from 'react-native';
    import {launchImageLibrary} from 'react-native-image-picker';
    import {AnimatedSvgComponent, ConvertImageToSvg} from 'react-native-image-to-svg';
    import logo from '@imgs/logo.png';

    const func_convertLocalImgToSVG = async () => {
        try {
        const imageUri = Image.resolveAssetSource(logo).uri;
        let resp = await imageToSvgContext.func_convertImgToSVG(imageUri);
        func_setImageResp(resp);
        } catch (err) {
        console.error(err);
        }
    };

    OR

    const func_openImagePicker = async () => {
        launchImageLibrary(
        {mediaType: 'photo', includeBase64: true},
        async (response) => {
            if (response.didCancel) {
            } else if (response.errorCode) {
            } else {
            const [img] = response?.assets;
            let resp = await imageToSvgContext.func_convertImgToSVG(img?.uri);
            func_setImageResp(resp);
            }
        });
    };
    const func_setImageResp = svgResp => {
        setViewBox(svgResp?.viewBox);
        setPath(svgResp?.path);
    };
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
```


### Properties

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uri`      | `string` | image uri need to pass for the conversion |
| `path`      | `string` | svg path|
| `viewBox`      | `string` | svg viewBox |
| `stokeColor`      | `string` | svg border color |
| `fillColor`      | `string` | svg fill |
| `strokeWidth`      | `integer` | svg width |
| `duration`      | `integer` | animation duration |
| `loop`      | `boolean` | animation loop |
| `backgroundColor`      | `string` | background color |
| `animation`      | `boolean` | animation |




