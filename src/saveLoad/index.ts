import * as THREE from 'three';
import * as BSAVELOAD from './button';
import * as SAVELOADL from './load';
import * as SAVELOADS from './save';

export function initSaveLoad() {
  BSAVELOAD.crButtonSave();
  BSAVELOAD.crButtonLoad();
}

export function saveV1() {
  let json = SAVELOADS.saveScene();
  let data = JSON.stringify(json);

  let csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);

  let link = document.createElement('a');
  document.body.appendChild(link);
  link.href = csvData;
  link.target = '_blank';
  link.download = 'file.json';
  link.click();
  document.body.removeChild(link);
}

//saveV2('file text', 'myfilename.txt', 'text/plain');
function saveV2(data, filename, type) {
  var file = new Blob([data], { type: type });

  var a = document.createElement('a');
  let url = URL.createObjectURL(file);

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function loadFile() {
  let url = 't/file.json';

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

  let inf = await response.json();

  console.log(inf);

  SAVELOADL.loadScene({ json: inf });

  return true;
}
