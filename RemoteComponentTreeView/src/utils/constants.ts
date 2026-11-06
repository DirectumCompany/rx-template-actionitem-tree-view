import * as icons from '../resources/action-icons-index';
import type { StatusKey, IStatusStyle } from '../controls/tree/types';

export const INTEGRATION_SERVICE_URL_SETTING_KEY = "INTEGRATION_SERVICE_URL";
export const INTEGRATION_SERVICE_ODATA_ENDPOINT = "OData";

export const STATUS_CONFIG: Record<StatusKey, IStatusStyle> = {
  Completed: {
    border: '3px solid #6ec479',
    icon: icons.done,
  },
  InProcess: {
    border: '2px solid #5783db',
    icon: null,
  },
  InProcessCurrent: {
    border: '2px solid #5783db',
    icon: icons.inProgress,
  },
  Aborted: {
    border: '2px solid #ff3333',
    icon: icons.abort,
  },
};