import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';
import * as CLPOINTO from './classPointObj';
import * as BPOINT from './point';
import * as CONNPOINT from './connectPoint';

export class PointTool {
  constructor() {}

  addEvent(obj) {
    MOVEPOINT.startPoint({ obj: obj, clickPos: obj.position });

    Build.canvas.onmousemove = (e) => {
      MOUSEE.setStop(true);
      MOVEPOINT.movePoint({ obj: obj, event: e });
    };

    Build.canvas.onmousedown = (e) => {
      Build.canvas.onmousemove = null;
      Build.canvas.onmousedown = null;

      MOUSEE.setStop(false);
      MOVEPOINT.endPoint();

      if (e.button == 2) {
        this.deletePoint(obj);
      } else {
        CONNPOINT.finishToolPoint({ obj: obj });
        obj.userData.f = new CLPOINTO.PointObj();
        obj.userData.f.addPointInArr(obj);

        let wall = obj.userData.point.joinW[0];
        if (wall) wall.userData.f.addWallInArr(wall);

        BPOINT.crPoint({ tool: true, pos: obj.position.clone(), joinP: [obj] });
      }
    };
  }

  deletePoint(obj) {
    this.deleteJointWP(obj);
    Build.scene.remove(obj);
    Build.camOrbit.render();
  }

  deleteJointWP(obj) {
    let p = obj.userData.point.joinP[0];
    let w = obj.userData.point.joinW[0];

    this.deleteValueFromArrya({ arr: p.userData.point.joinP, obj: obj });

    if (w) {
      this.deleteValueFromArrya({ arr: p.userData.point.joinW, obj: w });
      w.geometry.dispose();
      Build.scene.remove(w);
    }

    if (p.userData.point.joinP.length == 0) {
      let i = p.userData.level;
      this.deleteValueFromArrya({ arr: PLANM.inf.level[i].points, obj: p });
      Build.scene.remove(p);
    }
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
