
import Changeroom from "./changeroom.interface";

import ChangeroomModel from "./changeroom.model";

export default class ChangeroomService {
  private rooms = ChangeroomModel;


  public async getRoomDetails(rooms:any): Promise<any> {
    try {
      const details = await this.rooms.findOne({roomNo:rooms });
      // console.log(details);
      return details;
    } catch (err) {
      throw new Error("Unable to get room details.");
    }
  }


  public async releaseRoom (rooms:Changeroom): Promise<any> {
    try {
      console.log(rooms);
      const comm = await this.rooms.findOneAndUpdate({ roomNo:rooms.roomNo}, {customerName:"", bookedBy:"", occupied:0, help:0});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to Release Reservation.");
    }
  }
   public async getHelp (rooms:Changeroom): Promise<any> {
    try {
      console.log(rooms);
      const comm = await this.rooms.findOneAndUpdate({ roomNo:rooms.roomNo}, {help:1});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to update help.");
    }
  }

  public async reserveRoom (rooms:Changeroom): Promise<any> {
    try {
      console.log(rooms);
      const comm = await this.rooms.findOneAndUpdate({ roomNo:rooms.roomNo}, {customerName:rooms.customerName, bookedBy:rooms.bookedBy, occupied:1, help:0});
      console.log("Success");
      return comm;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to reserve room.");
    }
  }

  public async addRooms(rooms: Changeroom): Promise<Changeroom> {
    try {
      const create = await this.rooms.create(rooms);
      return create;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to create a Room.");
    }
  }
  public async getRoomList(): Promise<any> {
    try {
      const rooms = await this.rooms.find();
      return rooms;
    } catch (err:any) {
      console.log(err.message);
      throw new Error("Unable to get Rooms.");
    }
  }
}
