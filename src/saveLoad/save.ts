import * as THREE from 'three';
import * as PLANM from '../plan/main';

export function saveScene() {
  let arr = PLANM.inf.level;

  let json: any = {};
  json.level = [];

  for (let i = 0; i < arr.length; i++) {
    let floor = arr[i];

    json.level[i] = {};
    json.level[i].point = [];

    for (let i2 = 0; i2 < floor.points.length; i2++) {
      json.level[i].point[i2] = {};
      json.level[i].point[i2].id = floor.points[i2].userData.id;
      json.level[i].point[i2].pos = floor.points[i2].position;

      json.level[i].point[i2].joinP = floor.points[i2].userData.point.joinP.map((o) => o.userData.id);
    }
  }

  return json;
}
