import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';
import * as DELF from '../../core/deleteF';
import * as CLPOINTO from './classPointObj';
import * as BPOINT from './point';
import * as CONNPOINT from './connectPoint';

export class PointTool {
  obj = null;

  constructor(params) {
    this.obj = params.obj;
  }

  addEvent() {
    let obj = this.obj;

    MOVEPOINT.startPoint({ obj: obj, clickPos: this.obj.position });

    Build.canvas.onmousemove = (e) => {
      MOUSEE.setStop(true);
      MOVEPOINT.movePoint({ obj: this.obj, event: e });
    };

    Build.canvas.onmousedown = (e) => {
      Build.canvas.onmousemove = null;
      Build.canvas.onmousedown = null;

      MOUSEE.setStop(false);
      MOVEPOINT.endPoint();

      if (e.button == 2) {
        this.deletePoint();
      } else {
        CONNPOINT.finishToolPoint({ obj: obj });
      }
    };
  }

  deletePoint() {
    let obj = this.obj;
    let levelId = obj.userData.level;

    let p = obj.userData.point.joinP[0];
    let w = obj.userData.point.joinW[0];

    DELF.deleteValueFromArrya({ arr: p.userData.point.joinP, obj: obj });

    if (w) {
      DELF.deleteValueFromArrya({ arr: p.userData.point.joinW, obj: w });
      w.geometry.dispose();
      Build.scene.remove(w);
    }

    if (p.userData.point.joinP.length == 0) {
      DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].points, obj: p });
      Build.scene.remove(p);
    }

    Build.scene.remove(obj);
    Build.camOrbit.render();
  }
}
