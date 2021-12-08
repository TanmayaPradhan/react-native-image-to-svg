
# react-native-image-to-svg

## Installation

`npm install --save @potrace`
`npm install --save @react-native-svg`
`npm install --save react-native-image-to-svg`


## Features

- It converts image to svg and returns svg path
- svg image animation
- User can filter the notifications by clicking filter button.

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
| `uri`      | `string` | notification messageId|
| `path`      | `string` | notification messageId|
| `viewBox`      | `string` | notification user_name |
| `stokeColor`      | `integer` | notification is read or unread |
| `fillColor`      | `string` | notification title |
| `strokeWidth`      | `string` | notification body |
| `duration`      | `string` | notification time |
| `loop`      | `string` | notification title |
| `backgroundColor`      | `string` | notification body |
| `animation`      | `string` | notification time |




