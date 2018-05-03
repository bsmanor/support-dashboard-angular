export interface Element {
  agent: string;
  start: string;
  end: string;
} 

export interface ChatSchedule {
  year: number;
  weekOfYear: number;
  dayOfYear: number;
  tableContent: Element[];
}
