import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './moveWall';
import * as DELF from '../../core/deleteF';

export class WallObj {
  obj = null;

  constructor(params) {
    this.obj = params.obj;

    this.addWallInArr();
  }

  addWallInArr() {
    let obj = this.obj;
    let levelId = obj.userData.level;
    PLANM.inf.level[levelId].walls.push(obj);
  }

  addEvent(clickPos) {
    let obj = this.obj;

    this.aciveMat();
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

  aciveMat() {
    let obj = this.obj;
    obj.material = obj.userData.wall.mat.act;
    Build.camOrbit.render();
  }

  deAciveMat() {
    let obj = this.obj;
    obj.material = obj.userData.wall.mat.def;
    Build.camOrbit.render();
  }

  deleteObj() {
    let obj = this.obj;
    let levelId = obj.userData.level;
    DELF.deleteValueFromArrya({ obj: obj, arr: PLANM.inf.level[levelId].walls });

    Build.scene.remove(obj);
    Build.camOrbit.render();
  }
}
