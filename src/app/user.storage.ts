import { Injectable } from "@nestjs/common";
import { User } from "src/providers/database";

@Injectable()
export class UsersStorage {
  private usersMap: Map<string, User> = new Map();

  setUserForSocket(socketId: string, user: User) {
    this.usersMap.set(socketId, user);
  }

  getUserBySocketId(socketId: string): User | undefined {
    return this.usersMap.get(socketId);
  }

  removeUserForSocket(socketId: string) {
    this.usersMap.delete(socketId);
  }
}