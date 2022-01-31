import * as ISAVELOAD from './index';

export function crButtonSave() {
  let el = document.querySelector('[nameId="blockButton_save_1"]');
  let html = '<div class="button1 gradient_1" nameId="sv">save 1</div>';
  let div = document.createElement('div');
  div.innerHTML = html;
  let elem = div.firstChild;
  el.append(elem);
  elem['onmousedown'] = () => {
    ISAVELOAD.saveV1();
  };
}

export function crButtonLoad() {
  let el = document.querySelector('[nameId="blockButton_load_1"]');
  let html = '<div class="button1 gradient_1" nameId="ld">load 1</div>';
  let div = document.createElement('div');
  div.innerHTML = html;
  let elem = div.firstChild;
  el.append(elem);
  elem['onmousedown'] = () => {
    ISAVELOAD.loadFile();
  };
}
