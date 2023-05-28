import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './message.entity';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { User } from 'src/providers/database';
import { UsersStorage } from './user.storage';

 
@Injectable()
export class ChatService {
  constructor(
    private readonly usersStorage: UsersStorage, 
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  getUserFromSocket(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    const socketId = socket.id;
    const user = this.usersStorage.getUserBySocketId(socketId);
    return user;
  }

  async saveMessage(content: string, author: User) {
    const newMessage = this.messagesRepository.create({
      content,
      author,
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }
}