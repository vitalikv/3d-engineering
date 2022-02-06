import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as MOVEPOINT from './movePoint';
import * as DELF from '../../core/deleteF';
import * as CLPOINTO from './classPointObj';
import * as BPOINT from './point';
import * as CONNPOINT from './connectPoint';
import * as DELPOINT from './deletePoint';

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
        this.deleteObj();
      } else {
        CONNPOINT.finishToolPoint({ obj: obj });
      }
    };
  }

  deleteObj() {
    DELPOINT.deletePoint({ obj: this.obj });
  }
}
