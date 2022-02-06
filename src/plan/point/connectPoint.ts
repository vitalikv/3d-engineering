import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as MOUSEE from '../../mouseEvent';
import * as RHIT from '../../core/rayHit';
import * as DELF from '../../core/deleteF';
import * as PLANM from '../main';
import * as CLPOINTO from './classPointObj';
import * as BPOINT from './point';
import * as PWALL from '../wall/wall';

export function finishToolPoint(params) {
  let obj = params.obj;

  let levelId = obj.userData.level;

  let o = null;
  let w = null;

  o = RHIT.rayFromPointToObj({ obj: obj, arr: PLANM.inf.level[levelId].points });

  // точка состыковалась с точкой
  if (o) {
    let p = obj.userData.point.joinP;
    let w = obj.userData.point.joinW;

    if (p.length == 1 && p[0] == o) {
      obj.userData.f.deletePoint(obj);
    } else {
      DELF.deleteValueFromArrya({ arr: p[0].userData.point.joinP, obj: obj });
      DELF.deleteValueFromArrya({ arr: p[0].userData.point.joinW, obj: w[0] });

      w[0].geometry.dispose();
      Build.scene.remove(w[0]);
      DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].walls, obj: w[0] });

      Build.scene.remove(obj);
      DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].points, obj: obj });

      if (1 == 1) {
        PWALL.crWall({ p1: p[0], p2: o });
      }
    }
  }

  if (!o) {
    let arr = [];
    let arrW = PLANM.inf.level[levelId].walls;
    let jW = obj.userData.point.joinW;

    for (let i = 0; i < arrW.length; i++) {
      let add = true;

      for (let i2 = 0; i2 < jW.length; i2++) {
        if (arrW[i] == jW[i2]) {
          add = false;
          continue;
        }
      }

      if (add) arr.push(arrW[i]);
    }

    w = RHIT.rayFromPointToObj({ obj: obj, arr: arr });
  }

  if (w) {
    console.log(222, w);
    let p = w.userData.wall.joinP;

    DELF.deleteValueFromArrya({ arr: p[0].userData.point.joinP, obj: p[1] });
    DELF.deleteValueFromArrya({ arr: p[1].userData.point.joinP, obj: p[0] });

    DELF.deleteValueFromArrya({ arr: p[0].userData.point.joinW, obj: w });
    DELF.deleteValueFromArrya({ arr: p[1].userData.point.joinW, obj: w });

    w.geometry.dispose();
    Build.scene.remove(w);
    DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].walls, obj: w });

    for (let i = 0; i < p.length; i++) {
      PWALL.crWall({ p1: obj, p2: p[i] });
    }
  }

  if (!o && !w) {
    obj.userData.f = new CLPOINTO.PointObj({ obj: obj });

    BPOINT.crPoint({ tool: true, pos: obj.position.clone(), joinP: [obj] });
  }

  if (o || w) {
    // if(o) { detectRoomZone({type: 'addCheckFloor', point: o}); }
    // else if(w.divide) { for( let i = 0; i < w.p.length; i++ ){ detectRoomZone({type: 'addCheckFloor', point: w.p[i]}); } }
  }
}
