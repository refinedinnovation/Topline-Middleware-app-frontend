import { Document, ObjectId } from 'mongoose';
import { CronStatus } from './enums';

export interface ICron extends Document {
  [x: string]: any;
  _id: ObjectId;
 ftp: ObjectId;
  operations: string[];
  schedule: string;
  path:string;
  status: CronStatus;
  lastRun?: Date;
  nextRun: Date;
  createdBy: ObjectId;
}
  