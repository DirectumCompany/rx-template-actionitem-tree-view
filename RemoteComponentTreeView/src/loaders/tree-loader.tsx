import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCardApi } from '@directum/sungero-remote-component-types';

import TreeView from '../controls/tree/tree';
import { setIntegrationServiceUrlFromConfig } from '../utils/settings';

/**
 * Загрузчик контрола для контекста обложки модуля.
 * @param args Аргументы загрузчика.
 */
export default async (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  await setIntegrationServiceUrlFromConfig(args.api);

  root.render(<TreeView initialContext={args.initialContext} api={args.api as IRemoteComponentCardApi} />);
  return Promise.resolve(() => root.unmount());
};
