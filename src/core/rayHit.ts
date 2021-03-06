import * as THREE from 'three';
import { sbr as Build } from '../index';

export function rayIntersect(event, obj, t) {
  let container = Build.canvas;

  let mouse = getMousePosition(event);

  function getMousePosition(event) {
    let x = ((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1;
    let y = -((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1;

    return new THREE.Vector2(x, y);
  }

  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, Build.camOrbit.activeCam);

  let intersects = null;
  if (t == 'one') {
    intersects = raycaster.intersectObject(obj);
  } else if (t == 'arr') {
    intersects = raycaster.intersectObjects(obj, true);
  }

  return intersects;
}

// пускаем луч из точки на что-то в сцене
export function rayFromPointToObj(params) {
  let obj = params.obj;
  let arr = params.arr;

  obj.updateMatrixWorld();
  obj.geometry.computeBoundingSphere();

  let pos = obj.localToWorld(obj.geometry.boundingSphere.center.clone());
  pos.y += 10;

  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != obj) arr2.push(arr[i]);
  }

  let ray = new THREE.Raycaster();
  ray.set(pos, new THREE.Vector3(0, -1, 0));

  let intersects = ray.intersectObjects(arr2, true);

  let o = null;
  if (intersects.length > 0) {
    o = intersects[0].object;
  }

  return o;
}
