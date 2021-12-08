import React, {useRef} from 'react';
var potrace = require('potrace');

const ConvertImageToSvg = () => {
  const awaitingPromiseRef = useRef();
  let svgObj = {
    path: '',
    viewBox: '',
  };

  /**
   * 
   * @param {*} imageUri 
   * @description this function takes imageUri as parameter and return the svg data as object
   * @returns 
   */
  const func_convertImgToSVG = async (imageUri = '') => {
    const img = {
      uri: imageUri,
    };
    try {
      await fun_convert(img);
      return svgObj;
    } catch (e) {
      throw e;
    }
  };
  /**
   * 
   * @param {*} img 
   * @description this function takes image and convert to svg using potrace
   * @returns 
   */
  const fun_convert = (img) => {
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = {resolve, reject};
      potrace.trace(img.uri, (err, svg) => {
        if (err) {
          throw err;
        }
        func_findPath(svg);
      });
    });
  };
  /**
   * 
   * @param {*} svg 
   * @description this function takes svg string as parameter and returns svg path and view box
   */
  const func_findPath = (svg) => {
    let sentences = svg.split(/[="]/);
    let [path] = sentences.filter((item) => item.startsWith('M'));
    let [viewBox] = sentences.filter((item) => item.startsWith('0'));
    svgObj.path = path;
    svgObj.viewBox = viewBox;
    awaitingPromiseRef.current.resolve();
  };
  return {func_convertImgToSVG};
};
export default ConvertImageToSvg;
