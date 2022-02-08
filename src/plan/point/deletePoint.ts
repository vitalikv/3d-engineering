import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as DELF from '../../core/deleteF';
import * as MOVEPOINT from './movePoint';
import * as PWALL from '../wall/wall';

export function deletePoint(params = { obj: null }) {
  let obj = params.obj;
  let levelId = obj.userData.level;

  let p = obj.userData.point.joinP;
  let w = obj.userData.point.joinW;

  if (p.length > 2) return;

  for (let i = 0; i < p.length; i++) {
    DELF.deleteValueFromArrya({ arr: p[i].userData.point.joinP, obj: obj });

    for (let i2 = 0; i2 < w.length; i2++) {
      DELF.deleteValueFromArrya({ arr: p[i].userData.point.joinW, obj: w[i2] });
      DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].walls, obj: w[i2] });
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
      PWALL.crWall({ p1: p[0], p2: p[1] });
    }
  }

  let arr = [...p, obj];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userData.point.joinP.length > 0) continue;

    console.log(arr[i].userData);

    DELF.deleteValueFromArrya({ arr: PLANM.inf.level[levelId].points, obj: arr[i] });
    Build.scene.remove(arr[i]);
  }

  console.log(PLANM.inf.level[levelId].points);

  Build.camOrbit.stopMove = false;

  Build.camOrbit.render();
}
