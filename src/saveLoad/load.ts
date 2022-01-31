import * as THREE from 'three';
import { sbr as Build } from '../index';
import * as PLANM from '../plan/main';
import * as BPOINT from '../plan/point/point';

export function loadScene(params) {
  //this.resetScene();

  let json = params.json;
  Build.id = -1;

  for (let i = 0; i < json.level.length; i++) {
    let floor = json.level[i];

    for (let i2 = 0; i2 < floor.point.length; i2++) {
      let point = floor.point[i2];

      let pos = new THREE.Vector3(point.pos.x, point.pos.y, point.pos.z);

      let joinP = point.joinP.map((id) => {
        return findObj({ arr: PLANM.inf.level[i].points, id: id });
      });

      BPOINT.crPoint({ id: point.id, pos: pos, joinP: joinP });

      if (Build.id < point.id) {
        Build.id = point.id;
      }
    }
  }
  //let arrId = json.point.map(o => o.id);
  //let maxId = Math.max(...arrId);

  console.log(Build.id);

  return true;
}

function findObj(params) {
  let id = params.id;
  let arr = params.arr;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userData.id == id) {
      return arr[i];
    }
  }

  return null;
}
