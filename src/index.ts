import './style/index.scss';

import * as THREE from 'three';
import { custMath } from './fMath.js';
import * as CAM from './camera.js';
import * as UIBASE from './ui/base';
import * as TESTTS from './test';
import * as PLAN from './plan/main';
import * as MOUSEE from './mouseEvent';

export let sbr: any = {};
sbr.scene = null;
sbr.camOrbit = null;
sbr.elRoot = null;
sbr.canvas = null;
sbr.id = 0;

function init() {
  let elRoot: any = document.querySelector('[nameId="root"]');
  sbr.elRoot = elRoot;

  if (!elRoot) return;

  elRoot.style.position = 'absolute';
  elRoot.style.right = 0;
  elRoot.style.top = 0;
  elRoot.style.bottom = 0;
  elRoot.style.left = 0;

  UIBASE.createBaseUI({ el: elRoot });

  let container = elRoot.querySelector('[nameId="containerScene"]');

  let scene = new THREE.Scene();
  sbr.scene = scene;
  scene.background = new THREE.Color(0xffffff);

  let renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.outline = 'none';

  renderer.domElement.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  sbr.canvas = renderer.domElement;

  container.appendChild(renderer.domElement);

  scene.add(new THREE.GridHelper(10, 10));
  //scene.add( new THREE.AxesHelper( 10000 ) );

  initLight({ scene: scene });

  let n = custMath.isNumeric(5);

  console.log(999999, n);

  let result = TESTTS.test(10, 6);
  console.log(result);
  TESTTS.test2();

  PLAN.init();
  MOUSEE.initMouseEvent();

  let camOrbit = new CAM.CameraOrbit({
    container: renderer.domElement,
    renderer: renderer,
    scene: scene,
    setCam: '2D',
  });
  camOrbit.render();
  sbr.camOrbit = camOrbit;
}

function initLight(params) {
  let scene = params.scene;

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  let lights = [];
  lights[0] = new THREE.PointLight(0x222222, 0.7, 0);
  lights[1] = new THREE.PointLight(0x222222, 0.5, 0);
  lights[2] = new THREE.PointLight(0x222222, 0.8, 0);
  lights[3] = new THREE.PointLight(0x222222, 0.2, 0);

  lights[0].position.set(-1000, 200, 1000);
  lights[1].position.set(-1000, 200, -1000);
  lights[2].position.set(1000, 200, -1000);
  lights[3].position.set(1000, 200, 1000);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  scene.add(lights[3]);
}

document.addEventListener('DOMContentLoaded', init);
