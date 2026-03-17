import { IRemoteControlLoader } from '@directum/sungero-remote-component-types';

import * as TreeLoader from './src/loaders/tree-loader'

// Загрузчики контролов компонента.
const loaders: Record<string, IRemoteControlLoader> = {
  'tree-loader': TreeLoader
};

export default loaders;
