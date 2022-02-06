import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as CLWALLO from './classWallObj';

let inf: any = {};

inf.mat_default = new THREE.MeshPhongMaterial({ color: 0xe3e3e5, wireframe: false });
inf.mat_active = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false });

export function crWall(params: any = {}) {
  let id = params.id;
  let level = params.level;
  let p1 = params.p1;
  let p2 = params.p2;
  let tool = params.tool;

  let obj = new THREE.Mesh(new THREE.BufferGeometry(), inf.mat_default);

  if (id == undefined) {
    id = Build.id;
    Build.id++;
  }
  obj.userData.id = id;
  obj.userData.tag = 'wall';
  obj.userData.level = level ? level : PLANM.inf.actLevelId;

  obj.userData.wall = {};
  obj.userData.wall.click = {};
  obj.userData.wall.click.offset = new THREE.Vector3();

  obj.userData.wall.mat = {};
  obj.userData.wall.mat.def = inf.mat_default;
  obj.userData.wall.mat.act = inf.mat_active;

  obj.userData.wall.joinP = [p1, p2];

  p1.userData.point.joinP.push(p2);
  p2.userData.point.joinP.push(p1);

  if (tool) {
    obj.userData.f = new CLWALLO.WallObj({ obj: obj });
  } else {
    obj.userData.f = new CLWALLO.WallObj({ obj: obj });
    obj.userData.f.addWallInArr();
  }

  Build.scene.add(obj);

  p1.userData.point.joinW.push(obj);
  p2.userData.point.joinW.push(obj);

  console.log('crWall', p1.userData.id, p2.userData.id, p1.userData.point.joinW, p2.userData.point.joinW);

  updateWall({ obj: p1 });
}

export function updateWall(params) {
  let obj = params.obj;

  if (obj.userData.point.joinW.length == 0) return;

  let arrW = obj.userData.point.joinW;

  for (let i = 0; i < arrW.length; i++) {
    let geometry = updateGeomWall({ p1: arrW[i].userData.wall.joinP[0], p2: arrW[i].userData.wall.joinP[1] });
    arrW[i].geometry.dispose();
    arrW[i].geometry = geometry;
  }

  //line.geometry.verticesNeedUpdate = true;
  //line.geometry.elementsNeedUpdate = true;
}

function updateGeomWall(params) {
  let p1 = params.p1;
  let p2 = params.p2;

  let dir = new THREE.Vector2(p1.position.z - p2.position.z, p1.position.x - p2.position.x).normalize(); // перпендикуляр
  let width = 0.02;
  let offsetL = new THREE.Vector2(dir.x * -width, dir.y * -width);
  let offsetR = new THREE.Vector2(dir.x * width, dir.y * width);

  let arr = [];

  arr[arr.length] = new THREE.Vector2(p1.position.x, -p1.position.z).add(offsetR);
  arr[arr.length] = new THREE.Vector2(p1.position.x, -p1.position.z + 0);
  arr[arr.length] = new THREE.Vector2(p1.position.x, -p1.position.z).add(offsetL);
  arr[arr.length] = new THREE.Vector2(p2.position.x, -p2.position.z).add(offsetL);
  arr[arr.length] = new THREE.Vector2(p2.position.x, -p2.position.z + 0);
  arr[arr.length] = new THREE.Vector2(p2.position.x, -p2.position.z).add(offsetR);

  let shape = new THREE.Shape(arr);
  let geometry = new THREE.ExtrudeGeometry(shape, { bevelEnabled: false, depth: 3 });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, p1.position.y, 0);

  return geometry;
}
