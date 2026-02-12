import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCardApi } from '@directum/sungero-remote-component-types';

import TreeView from '../controls/tree/tree';

/**
 * Загрузчик контрола для контекста обложки модуля.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<TreeView initialContext={args.initialContext} api={args.api as IRemoteComponentCardApi} />);
  return Promise.resolve(() => root.unmount());
};
