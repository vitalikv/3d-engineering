import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';
import * as PWALL from '../wall/wall';

export class PointObj {
  constructor() {}

  addPointInArr(obj) {
    let i = obj.userData.level;
    PLANM.inf.level[i].points.push(obj);
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
    let p = obj.userData.point.joinP;
    let w = obj.userData.point.joinW;

    if (p.length > 2) return;

    for (let i = 0; i < p.length; i++) {
      this.deleteValueFromArrya({ arr: p[i].userData.point.joinP, obj: obj });

      for (let i2 = 0; i2 < w.length; i2++) {
        this.deleteValueFromArrya({ arr: p[i].userData.point.joinW, obj: w[i2] });
        w[i2].geometry.dispose();
        Build.scene.remove(w[i2]);
      }
    }

    obj.userData.point.joinP = [];
    obj.userData.point.joinW = [];

    if (p.length == 2) {
      let exsist1 = p[0].userData.point.joinP.find((point) => point == p[1]);
      let exsist2 = p[1].userData.point.joinP.find((point) => point == p[0]);

      // когда удалем точку из треугольника стен, чтобы не создавать стену в стене
      if (!exsist1 && !exsist2) {
        p[0].userData.point.joinP.push(p[1]);
        p[1].userData.point.joinP.push(p[0]);

        PWALL.crWall({ p1: p[0], p2: p[1] });
      }
    }

    let arr = [...p, obj];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].userData.point.joinP.length > 0) continue;

      let n = obj.userData.level;
      this.deleteValueFromArrya({ arr: PLANM.inf.level[n].points, obj: arr[i] });
      Build.scene.remove(arr[i]);
    }

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
