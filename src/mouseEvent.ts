import * as THREE from 'three';
import { sbr as Build } from './index';
import * as PLANM from './plan/main';

let inf: any = {};
inf.obj = { down: null, up: null };

export function initMouseEvent() {
  Build.canvas.addEventListener('mousedown', (event) => {
    mouseDown(event);
  });

  Build.canvas.addEventListener('mousemove', (event) => {
    mouseMove(event);
  });

  Build.canvas.addEventListener('mouseup', (event) => {
    mouseUp(event);
  });

  document.addEventListener('keydown', () => {
    deleteKey();
  });
}

function deleteKey() {
  if (!inf.obj.down) return;

  let obj = inf.obj.down;
  obj.userData.f.deleteObj(obj);
}

function mouseDown(event) {
  if (inf.obj.down) {
    let obj = inf.obj.down;
    obj.userData.f.deAciveMat(obj);
  }

  inf.obj.down = null;
  let button = '';

  switch (event.button) {
    case 0:
      button = 'left';
      break;
    case 1:
      button = 'right';
      break;
    case 2:
      button = 'right';
      break;
  }

  if (button == 'right') {
    return;
  }

  let rayhit = clickRayHit(event);
  clickMouseActive({ rayhit: rayhit, type: 'down' });
}

function clickRayHit(event) {
  let rayhit = null;

  let i = PLANM.inf.actLevelId;

  if (!rayhit) {
    var ray = rayIntersect(event, PLANM.inf.level[i].points, 'arr');
    if (ray.length > 0) {
      rayhit = ray[0];
    }
  }

  if (!rayhit) {
    var ray = rayIntersect(event, PLANM.inf.level[i].walls, 'arr');
    if (ray.length > 0) {
      rayhit = ray[0];
    }
  }

  return rayhit;
}

function clickMouseActive(params) {
  if (!params.rayhit) return;

  let rayhit = params.rayhit;
  let type = params.type;

  let obj = rayhit.object;
  let tag = obj.userData.tag;

  console.log('selectObj', obj.userData);

  if (type == 'down') {
    if (tag == 'point') {
      inf.obj.down = obj;

      obj.userData.f.addEvent(obj, rayhit.point);
    }

    if (tag == 'wall') {
      inf.obj.down = obj;

      obj.userData.f.addEvent(obj, rayhit.point);
    }
  }
}

function mouseMove(event) {
  // let obj = inf.obj.down;
  // if (!obj) return;
  // if (obj) {
  //   let tag = obj.userData.tag;
  //   if (tag == 'point') {
  //     obj.userData.f.movePoint(obj, event);
  //   }
  // }
}

function mouseUp(event) {
  // let obj = inf.obj.down;
  // if (!obj) return;
  // if (obj) {
  //   let tag = obj.userData.tag;
  //   if (tag == 'point') {
  //     obj.userData.f.upPoint();
  //   }
  // }
  // inf.obj.down = null;
}

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
