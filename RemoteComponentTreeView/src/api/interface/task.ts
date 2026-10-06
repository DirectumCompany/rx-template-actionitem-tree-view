import { IAttributes } from "./IAttributes"

export interface ITask {
  Name: string;
  attributes: IAttributes;
  children: ITask[];
}