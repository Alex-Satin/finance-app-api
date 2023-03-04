import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, User, UpdateUserDto } from 'src/common';

@Injectable()
export class UsersService {
  private users: User[] = [];
  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }
    return user;
  }

  createUser(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      createdAt: new Date(),
      id: uuid(),
      email: '',
    };
    this.users.push(user);
    return user;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...dto,
    };
    return this.users[userIndex];
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return id;
  }
}
