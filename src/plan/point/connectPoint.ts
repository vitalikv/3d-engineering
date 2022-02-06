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

  let o = RHIT.rayFromPointToObj({ obj: obj, arr: PLANM.inf.level[levelId].points });

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

  let w = { divide: false };

  if (!o) {
    // w = this.divideWall({ obj: obj, tool: true });
  }

  if (!o && !w.divide) {
    obj.userData.f = new CLPOINTO.PointObj({ obj: obj });
    obj.userData.f.addPointInArr();

    let wall = obj.userData.point.joinW[0];
    if (wall) wall.userData.f.addWallInArr();

    BPOINT.crPoint({ tool: true, pos: obj.position.clone(), joinP: [obj] });
  }

  if (o || w.divide) {
    // if(o) { detectRoomZone({type: 'addCheckFloor', point: o}); }
    // else if(w.divide) { for( let i = 0; i < w.p.length; i++ ){ detectRoomZone({type: 'addCheckFloor', point: w.p[i]}); } }
  }
}
