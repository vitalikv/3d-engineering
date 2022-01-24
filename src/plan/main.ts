import * as THREE from 'three';
import { sbr as Build } from '../index';
import * as BPOINT from './point/point';
import * as MOUSEE from '../mouseEvent';
import * as BUTPOINTT from './point/buttonPointTool';

export let inf: any = {};

export function init() {
  inf.actLevelId = 0;
  inf.level = [];
  inf.planeMath = initPlaneMath();

  BUTPOINTT.createButtonPoint();

  inf.level[0] = new Level();
}

export class Level {
  points = [];
  walls = [];

  constructor() {}

  deleteLevel() {
    this.points = [];
    this.walls = [];
  }
}

function initPlaneMath(): any {
  let geometry: any = new THREE.PlaneGeometry(10000, 10000);
  let material: any = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
  });
  material.visible = false;

  let planeMath: any = new THREE.Mesh(geometry, material);
  planeMath.rotation.set(-Math.PI / 2, 0, 0);

  Build.scene.add(planeMath);

  return planeMath;
}
