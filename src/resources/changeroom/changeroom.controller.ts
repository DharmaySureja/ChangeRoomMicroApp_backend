
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";

import ChangeroomService from "./changeroom.service";
import ChangeroomModel from "./changeroom.model";
const rn = require("random-number");

export default class ChangeroomController implements Controller {
  public path = "/changeroom";
  public router = Router();
  private ChangeroomService = new ChangeroomService();
  constructor() {
    this.initialiseRoutes();

  }

  private initialiseRoutes(): void {

    this.router.post(`${this.path}/addroom`, this.addRoom);
    this.router.get(`${this.path}/getroom`, this.getRoomList);
    this.router.post(`${this.path}/getroom`, this.getRoomDetails);
    this.router.post(`${this.path}/gethelp`, this.getHelp);
    this.router.post(`${this.path}/reserve`, this.reserveRoom);
    this.router.post(`${this.path}/release`, this.releaseRoom);


  }

  private getRoomDetails = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<Response | void> => {
        try {
          const { roomNo } = req.body;
          const rooms = await this.ChangeroomService.getRoomDetails(roomNo);
          res.send({ rooms: rooms });
        } catch (error: any) {
          console.log(error.message);

        }
      };

  private releaseRoom = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomNo } = req.body;
      const rooms = new ChangeroomModel();
      rooms.roomNo = roomNo;

      const reserve = await this.ChangeroomService.releaseRoom(rooms);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private reserveRoom = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomNo, customerName, bookedBy, occupied} = req.body;
      const rooms = new ChangeroomModel();
      rooms.roomNo = roomNo;
      rooms.customerName = customerName;
      rooms.bookedBy = bookedBy;
      rooms.occupied = occupied;
      const reserve = await this.ChangeroomService.reserveRoom(rooms);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private getHelp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomNo, customerName, bookedBy, occupied, help} = req.body;
      const rooms = new ChangeroomModel();
      rooms.roomNo = roomNo;
      const gethelp = await this.ChangeroomService.getHelp(rooms);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private getRoomList = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<Response | void> => {
        try {
          const rooms = await this.ChangeroomService.getRoomList();
          res.send({ rooms: rooms });
        } catch (error: any) {
          console.log(error.message);

        }
      };

  private addRoom = async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomNo } = req.body;

      const rooms = new ChangeroomModel();
      rooms.roomNo = roomNo;
      rooms.customerName = "";
      rooms.bookedBy = "";
      rooms.occupied = false;
      rooms.help = false;

      const addRoom = await this.ChangeroomService.addRooms(rooms);
      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
    }
  };

}
