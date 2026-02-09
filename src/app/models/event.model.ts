export interface Event {
  id: number;
  title: string;
  date: string; // Using string for simplicity, can be Date object
  location: string;
  description: string;
}
