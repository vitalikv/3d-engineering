import * as THREE from 'three';
import { sbr as Build } from '../index';

export function deleteValueFromArrya(params) {
  let arr = params.arr;
  let obj = params.obj;

  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i] == obj) {
      arr.splice(i, 1);
      break;
    }
  }
}

// очищаем объект из памяти
export function disposeNode(node) {
  if (node.geometry) {
    node.geometry.dispose();
  }

  if (node.material) {
    var materialArray = [];

    if (node.material instanceof Array) {
      materialArray = node.material;
    } else {
      materialArray = [node.material];
    }

    materialArray.forEach(function (mtrl, idx) {
      if (mtrl.map) mtrl.map.dispose();
      if (mtrl.lightMap) mtrl.lightMap.dispose();
      if (mtrl.bumpMap) mtrl.bumpMap.dispose();
      if (mtrl.normalMap) mtrl.normalMap.dispose();
      if (mtrl.specularMap) mtrl.specularMap.dispose();
      if (mtrl.envMap) mtrl.envMap.dispose();
      mtrl.dispose();
    });
  }

  Build.renderer.renderLists.dispose();
}
