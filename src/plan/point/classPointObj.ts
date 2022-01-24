import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';

export class PointObj {
  constructor() {}

  addPointInArr(obj) {
    let i = PLANM.inf.actLevelId;
    PLANM.inf.level[i].points.push(obj);
    console.log(PLANM.inf.level[i]);
  }

  addEvent(obj, clickPos) {
    this.aciveMat(obj);
    MOVEPOINT.startPoint({ obj: obj, clickPos: clickPos });

    Build.canvas.onmousemove = (e) => {
      MOVEPOINT.movePoint({ obj: obj, event: e });
    };

    document.onmouseup = (e) => {
      Build.canvas.onmousemove = null;
      document.onmouseup = null;

      MOVEPOINT.endPoint();
    };
  }

  aciveMat(obj) {
    obj.material = obj.userData.point.mat.act;
    Build.camOrbit.render();
  }

  deAciveMat(obj) {
    obj.material = obj.userData.point.mat.def;
    Build.camOrbit.render();
  }

  deleteObj(obj) {
    let i = PLANM.inf.actLevelId;

    this.deleteValueFromArrya({ obj: obj, arr: PLANM.inf.level[i].points });

    Build.scene.remove(obj);
    Build.camOrbit.render();

    console.log(PLANM.inf.level[i]);
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
