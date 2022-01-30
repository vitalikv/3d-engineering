import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as CLPOINTO from './classPointObj';
import * as CLPOINTT from './classPointTool';
import * as PWALL from '../wall/wall';

let inf: any = {};

inf.geometry_1 = cylinderGeometry();

inf.mat_default = new THREE.MeshPhongMaterial({
  color: 0x222222,
  depthTest: false,
  transparent: true,
  wireframe: false,
});

inf.mat_active = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  wireframe: false,
});

export function crPoint(params: any = {}) {
  let id = params.id;
  let level = params.level;
  let pos = params.pos;
  let tool = params.tool;
  let joinP = params.joinP;

  let obj = new THREE.Mesh(inf.geometry_1, inf.mat_default);

  if (pos) {
    obj.position.copy(pos);
  }

  if (id == undefined) {
    id = Build.id;
    Build.id++;
  }
  obj.userData.id = id;
  obj.userData.tag = 'point';
  obj.userData.level = level ? level : PLANM.inf.actLevelId;

  obj.userData.point = {};
  obj.userData.point.click = {};
  obj.userData.point.click.offset = new THREE.Vector3();

  obj.userData.point.mat = {};
  obj.userData.point.mat.def = inf.mat_default;
  obj.userData.point.mat.act = inf.mat_active;

  obj.userData.point.joinP = [];
  obj.userData.point.joinW = [];

  if (joinP) {
    let arr = joinP;

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) continue;

      PWALL.crWall({ p1: obj, p2: arr[i] });
    }
  }

  if (tool) {
    obj.userData.f = new CLPOINTT.PointTool();
    obj.userData.f.addEvent(obj);
  } else {
    obj.userData.f = new CLPOINTO.PointObj();
    obj.userData.f.addPointInArr(obj);
  }

  Build.scene.add(obj);

  Build.camOrbit.render();

  return obj;
}

function cylinderGeometry(): any {
  let geometry: any = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 18);

  let attrP: any = geometry.getAttribute('position');

  for (let i = 0; i < attrP.array.length; i += 3) {
    attrP.array[i + 0] *= 0.5; // x
    attrP.array[i + 2] *= 0.5; // z

    let y = attrP.array[i + 1];
    if (y < 0) {
      attrP.array[i + 1] = 0;
    }
  }

  geometry.attributes.position.needsUpdate = true;

  geometry.userData.attrP = geometry.getAttribute('position').clone();

  return geometry;
}
