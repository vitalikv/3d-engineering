import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as DELF from '../../core/deleteF';
import * as MOVEPOINT from './movePoint';
import * as PWALL from '../wall/wall';
import * as DELPOINT from './deletePoint';

export class PointObj {
  obj = null;

  constructor(params) {
    this.obj = params.obj;

    this.addPointInArr();
  }

  addPointInArr() {
    let obj = this.obj;
    let levelId = obj.userData.level;

    let exsist = PLANM.inf.level[levelId].points.find((p) => p == obj);

    if (!exsist) {
      PLANM.inf.level[levelId].points.push(obj);
    }
  }

  addEvent(clickPos) {
    let obj = this.obj;
    this.aciveMat();
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

  aciveMat() {
    let obj = this.obj;
    obj.material = obj.userData.point.mat.act;
    Build.camOrbit.render();
  }

  deAciveMat() {
    let obj = this.obj;
    obj.material = obj.userData.point.mat.def;
    Build.camOrbit.render();
  }

  deleteObj() {
    DELPOINT.deletePoint({ obj: this.obj });
  }
}
