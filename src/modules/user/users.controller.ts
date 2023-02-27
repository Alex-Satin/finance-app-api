import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { CreateUserDto, UpdateUserDto } from 'src/common';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    getUsers() {
      return this.usersService.getUsers();
    }
  
    @Get(':id')
    getUser(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.usersService.getUser(id);
    }
  
    @Post()
    createUser(@Body() dto: CreateUserDto) {
      return this.usersService.createUser(dto);
    }
  
    @Put(':id')
    updateUser(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() dto: UpdateUserDto,
    ) {
      return this.usersService.updateUser(id, dto);
    }
  
    @Delete(':id')
    deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.usersService.deleteUser(id);
    }
  }
  