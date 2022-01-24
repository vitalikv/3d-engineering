import { sbr as Build } from '../index';

export function createBaseUI(params) {
  let el = params.el;

  let html = htmlBase();

  el.innerHTML = html;

  addEventButtonCamera({ el: el });
}

function addEventButtonCamera(params) {
  let el = params.el;

  let elem2D = el.querySelector('[nameId="cam2D"]');
  let elem3D = el.querySelector('[nameId="cam3D"]');

  elem2D.onmousedown = function () {
    changeCamera({ active: '3D', butt: { elem2D: elem2D, elem3D: elem3D } });
  };
  elem3D.onmousedown = function () {
    changeCamera({ active: '2D', butt: { elem2D: elem2D, elem3D: elem3D } });
  };

  function changeCamera(params) {
    let active = params.active;
    let butt = params.butt;

    if (active == '2D') {
      butt.elem3D.style.display = 'none';
      butt.elem2D.style.display = '';
    }

    if (active == '3D') {
      butt.elem2D.style.display = 'none';
      butt.elem3D.style.display = '';
    }

    Build.camOrbit.setActiveCam({ cam: active });
  }
}

function htmlBase() {
  let html = `<div style="display: flex; flex-direction: column; position: absolute; width: 100%; height: 100%; font-family: Arial, Helvetica, sans-serif;">

        <div nameId="panelT" style="width: 100%; height: 40px; background: #F0F0F0; border-bottom: 1px solid #D1D1D1;">
        </div>


        <div style="display: flex; height: 100%;">
            <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
                <div style="display: flex; position: relative; height: 0; top: 0; left: 0; right: 0;">		
                    
                    <div nameId="blockButton_save_1" style="display: flex; flex-direction: column; margin: 10px auto auto auto;">
                        
                    </div>
                    
                    <div nameId="blockButton_load_1" style="display: flex; flex-direction: column; margin: 10px auto auto auto;">
                        
                    </div>					
                    
                    <div nameId="blockButton_1" style="display: flex; flex-direction: column; margin: 10px auto auto auto;">
                        
                    </div>
                    
                    <div style="display: flex; margin: 10px 10px auto auto;">
                        <div nameId="cam2D" class="button1 gradient_1">2D</div>
                        <div nameId="cam3D" class="button1 gradient_1" style="display: none;">3D</div>
                    </div>
                </div>			
            
                <div nameId="containerScene" style="width: 100%; height: 100%; touch-action: none;"></div>				
            </div>
            
            <div nameId="panelR" style="position: relative; flex-basis: 310px; background: #F0F0F0; border-left: 1px solid #D1D1D1;">
                <div nameId="wrapLevel">
                
                </div>
            </div>
        </div>
    </div>`;

  return html;
}
