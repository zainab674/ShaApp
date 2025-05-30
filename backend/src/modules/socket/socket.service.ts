import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Socket, SocketDocument } from './socket.schema';
import { Model } from 'mongoose';
// import { responseSuccessMessage } from 'src/constants';
// import { responseFailedMessage } from 'src/constants';


@Injectable()
export class SocketService {


  constructor(
    @InjectModel(Socket.name) private socketModel: Model<SocketDocument>,
  ) { }



  async create(createSocketDto: CreateSocketDto): Promise<any> {
    console.log("CreateSocketDto before save:", createSocketDto);

    try {
      const createdSocket = new this.socketModel(createSocketDto);
      const result = await createdSocket.save();

      console.log("Saved result:", result);
      return result;
    } catch (error) {
      console.error("Error saving socket:", error);
      throw new Error("Failed to save socket");
    }
  }





  async getAll(id: string): Promise<any> {
    const messages = await this.socketModel
      .find({
        userId: id
      })

      .exec();

    return messages;
  }
  async delete(id: string): Promise<any> {
    const message = await this.socketModel.findByIdAndDelete(id).exec();
    return message;
  }







}
