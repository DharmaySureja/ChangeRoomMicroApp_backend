
import { Document } from "mongoose";

export default interface Changeroom extends Document {


  roomNo: number;
  customerName: string;
  bookedBy: string;
   occupied: boolean;
  help: boolean;
}
