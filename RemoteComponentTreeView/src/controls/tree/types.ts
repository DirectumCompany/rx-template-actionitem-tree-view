import {
  IRemoteComponentContext,
  IRemoteComponentCardApi,
} from '@directum/sungero-remote-component-types';

export interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCardApi;
}

export type IAttributes = {
  Id?: number;
  Status: string;
  Assignee?: string;
  Deadline?: string;
  SuperiorTaskId?: number;
  Hyperlink: string;
}

export interface ITask {
  name: string;
  attributes: IAttributes;
  children: ITask[];
}

export type StatusKey =
  | 'Completed'
  | 'InProcess'
  | 'InProcessCurrent'
  | 'Aborted';

export interface IStatusStyle {
  border: string;
  icon: string | null;
}