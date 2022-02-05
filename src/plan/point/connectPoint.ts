import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as MOUSEE from '../../mouseEvent';
import * as RHIT from '../../core/rayHit';
import * as PLANM from '../main';

export function finishToolPoint(params) {
  let obj = params.obj;

  let levelId = obj.userData.level;

  let o = RHIT.rayFromPointToObj({ obj: obj, arr: PLANM.inf.level[levelId].points });

  console.log(333, o);

  if (!o) {
    // this.level[this.actLevelId].pps.push(obj);
    // this.crPoint({ pos: obj.position.clone(), cursor: true, tool: true, joinP: [obj] });
  }

  return;

  // точка состыковалась с точкой
  if (o) {
    Build.camOrbit.stopMove = false;
    //-------------

    let p = obj.userData.point.joinP;
    let w = obj.userData.point.joinW;

    if (p.length == 0) {
      this.deletePoint({ obj: obj });
      this.crPoint({ pos: obj.position.clone(), cursor: true, tool: true, joinP: [o] });
    } else {
      this.deleteValueFromArrya({ arr: p[0].userData.point.joinP, obj: obj });
      this.deleteValueFromArrya({ arr: p[0].userData.point.joinW, obj: w[0] });
      w[0].geometry.dispose();
      Build.scene.remove(w[0]);

      this.deleteValueFromArrya({ arr: this.getActLevelArrPoint(), obj: obj });
      Build.scene.remove(obj);

      if (1 == 1) {
        p[0].userData.point.joinP.push(o);
        o.userData.point.joinP.push(p[0]);

        this.crWall({ p1: p[0], p2: o });
      }
    }
  }

  let w = { divide: false };

  if (!o) {
    w = this.divideWall({ obj: obj, tool: true });
  }

  if (!o && !w.divide) {
    this.level[this.actLevelId].pps.push(obj);
    this.crPoint({ pos: obj.position.clone(), cursor: true, tool: true, joinP: [obj] });
  }

  if (o || w.divide) {
    // if(o) { detectRoomZone({type: 'addCheckFloor', point: o}); }
    // else if(w.divide) { for( let i = 0; i < w.p.length; i++ ){ detectRoomZone({type: 'addCheckFloor', point: w.p[i]}); } }
  }
}
