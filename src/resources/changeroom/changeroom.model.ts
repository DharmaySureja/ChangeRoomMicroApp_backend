
import { Schema, model } from "mongoose";
import Changeroom from "./changeroom.interface";


const ChangeroomSchema = new Schema(
  {


      roomNo:  {type: Number, required: true },
      customerName: {type: String },
      bookedBy: {type: String },
      occupied: {type: Boolean, required: true },
      help: {type: Boolean, required: true },
  }
);


ChangeroomSchema.set("toJSON", {
  transform: (document: any, returnedObject: { id: any; _id: any; __v: any; }) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Changeroom>("rooms", ChangeroomSchema);
