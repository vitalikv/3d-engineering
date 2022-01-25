import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './moveWall';

export class WallObj {
  constructor() {}

  addWallInArr(obj) {
    let i = obj.userData.level;
    PLANM.inf.level[i].walls.push(obj);
  }

  addEvent(obj, clickPos) {
    this.aciveMat(obj);
    // MOVEPOINT.startPoint({ obj: obj, clickPos: clickPos });

    // Build.canvas.onmousemove = (e) => {
    //   MOVEPOINT.movePoint({ obj: obj, event: e });
    // };

    // document.onmouseup = (e) => {
    //   Build.canvas.onmousemove = null;
    //   document.onmouseup = null;

    //   MOVEPOINT.endPoint();
    // };
  }

  aciveMat(obj) {
    obj.material = obj.userData.wall.mat.act;
    Build.camOrbit.render();
  }

  deAciveMat(obj) {
    obj.material = obj.userData.wall.mat.def;
    Build.camOrbit.render();
  }

  deleteObj(obj) {
    let i = obj.userData.level;
    this.deleteValueFromArrya({ obj: obj, arr: PLANM.inf.level[i].walls });

    Build.scene.remove(obj);
    Build.camOrbit.render();
  }

  deleteValueFromArrya(params) {
    let arr = params.arr;
    let obj = params.obj;

    for (let i = arr.length - 1; i > -1; i--) {
      if (arr[i] == obj) {
        arr.splice(i, 1);
        break;
      }
    }
  }
}
