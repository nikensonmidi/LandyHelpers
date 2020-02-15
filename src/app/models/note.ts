import { Supervisor } from './supervisor';

export class Note {
  $key: string;
  name: string;
  dateCreated: string;
  supervisors: Supervisor[];

}
