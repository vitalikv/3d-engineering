import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';
import * as CLPOINTO from './classPointObj';
import * as BPOINT from './point';

export class PointTool {
  constructor() {}

  addEvent(obj) {
    MOVEPOINT.startPoint({ obj: obj, clickPos: obj.position });

    Build.canvas.onmousemove = (e) => {
      MOVEPOINT.movePoint({ obj: obj, event: e });
    };

    Build.canvas.onmousedown = (e) => {
      Build.canvas.onmousemove = null;
      Build.canvas.onmousedown = null;

      MOVEPOINT.endPoint();

      if (e.button == 2) {
        this.deletePoint(obj);
      } else {
        obj.userData.f = new CLPOINTO.PointObj();
        obj.userData.f.addPointInArr(obj);

        let wall = obj.userData.point.joinW[0];
        if (wall) wall.userData.f.addWallInArr(wall);

        BPOINT.crPoint({ tool: true, pos: obj.position.clone(), joinP: [obj] });
      }
    };
  }

  deletePoint(obj) {
    this.deleteWall(obj);
    Build.scene.remove(obj);
    Build.camOrbit.render();
  }

  deleteWall(obj) {
    let p = obj.userData.point.joinP;
    let w = obj.userData.point.joinW;

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
