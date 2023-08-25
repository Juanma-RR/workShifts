import { Shift } from "./Shift";
import { Task } from "./Task";

export interface MonthDayBlocks {
  showDot: boolean;
  dayValue?: number;
  monthValue?: number;
  yearValue?: number;
  disabled: boolean;
  highlight: boolean;
  taskList: Task[];
  color: string[];
  showTask: boolean;
  expanded: boolean;
  date: string;
  shift?:Shift;
}[];