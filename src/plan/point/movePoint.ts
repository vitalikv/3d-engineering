import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as PLANM from '../main';
import * as MOUSEE from '../../mouseEvent';
import * as RHIT from '../../core/rayHit';
import * as BPOINT from './point';
import * as PWALL from '../wall/wall';

export function startPoint(params) {
  let obj = params.obj;
  let clickPos = params.clickPos;

  obj.userData.point.click.offset = new THREE.Vector3().subVectors(obj.position, clickPos);

  let planeMath = PLANM.inf.planeMath;

  planeMath.position.set(0, obj.position.y, 0);
  planeMath.rotation.set(-Math.PI / 2, 0, 0);
  planeMath.updateMatrixWorld();

  Build.camOrbit.stopMove = true;
}

export function movePoint(params) {
  let obj = params.obj;
  let event = params.event;

  let intersects = RHIT.rayIntersect(event, PLANM.inf.planeMath, 'one');

  if (intersects.length == 0) return;

  obj.userData.point.click.offset.y = 0;
  let pos = new THREE.Vector3().addVectors(intersects[0].point, obj.userData.point.click.offset);

  obj.position.copy(pos);

  PWALL.updateWall({ obj: obj });

  Build.camOrbit.render();
}

export function endPoint() {
  Build.camOrbit.stopMove = false;
}
