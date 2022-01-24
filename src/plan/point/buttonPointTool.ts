import * as THREE from 'three';
import { sbr as Build } from '../../index';
import * as BPOINT from './point';
import * as MOUSEE from '../../mouseEvent';
import * as PLANM from '../main';

export function createButtonPoint(): void {
  let el = Build.elRoot.querySelector('[nameId="blockButton_1"]');
  let html = '<div class="button1 gradient_1">point 1</div>';
  let div = document.createElement('div');
  div.innerHTML = html;
  let elem = div.firstChild;
  el.append(elem);
  elem['onmouseup'] = () => {
    if (Build.camOrbit.activeCam == Build.camOrbit.cam2D) {
      promise_1().then((data) => {
        let obj = BPOINT.crPoint({ tool: true, pos: data.pos });
      });
    }
  };

  function promise_1(): Promise<any> {
    let container = Build.canvas;

    let planeMath = PLANM.inf.planeMath;
    planeMath.position.set(0, 0, 0);
    planeMath.rotation.set(-Math.PI / 2, 0, 0);
    planeMath.updateMatrixWorld();

    return new Promise((resolve, reject) => {
      document.onmousemove = function (event) {
        if (event.target == container) {
          document.onmousemove = null;
          let intersects = MOUSEE.rayIntersect(event, planeMath, 'one');
          if (intersects.length == 0) reject();

          resolve({ pos: intersects[0].point });
        }
      };
    });
  }
}
