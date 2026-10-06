// Точка входа для отладки контролов в режиме standalone (отдельное приложение, без веб клиента Sungero).
//
// Запуск: npm run start:dev:standalone  →  http://localhost:3001
//   Или: npm run build:dev:standalone && npm run serve
//
// Выпадашка вверху страницы позволяет переключаться между контролами на лету,
// без правки кода и пересборки. При сборке импортируются все 6 контролов —
// это нормально только для dev-режима, production-бандл собирается через build:release.

import loaders from './component.loaders';
import api from './host-api-stub';
import context from './host-context-stub';

const container = document.getElementById('app');
const selector = document.getElementById('control-selector');

const controlInfo = { propertyName: 'Subject' };
let unmount;

async function mountControl(loaderName) {
  unmount?.();
  const loader = loaders[loaderName].default;
  unmount = await loader({ container, initialContext: context, api, controlInfo });
}

selector.addEventListener('change', e => mountControl(e.target.value));
mountControl(selector.value);
